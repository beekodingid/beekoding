import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import {
  getSystemUsers,
  saveSystemUser,
  logAdminActivity,
  type SystemUser,
  DEFAULT_SYSTEM_USERS,
  loginAdmin,
  logoutAdmin,
  STORAGE_KEYS,
} from './adminStorage';

const AUTH_STORAGE_KEY = STORAGE_KEYS.AUTH;

export interface AuthResult {
  success: boolean;
  user?: SystemUser;
  error?: string;
  isCloudAuth?: boolean;
}

export interface ProvisionResult {
  success: boolean;
  createdCount: number;
  existingCount: number;
  errors: string[];
}

/**
 * Memeriksa apakah ada sesi aktif di Supabase Cloud atau penyimpanan lokal
 */
export async function checkSupabaseSession(): Promise<SystemUser | null> {
  const client = getSupabaseClient();
  if (client && isSupabaseConfigured()) {
    try {
      const { data: { session }, error } = await client.auth.getSession();
      if (!error && session && session.user && session.user.email) {
        const users = getSystemUsers();
        const matched = users.find(
          (u) => u.email.toLowerCase() === session.user.email?.toLowerCase()
        );
        if (matched) {
          // Sinkronkan state sesi lokal
          localStorage.setItem(
            AUTH_STORAGE_KEY,
            JSON.stringify({
              isLoggedIn: true,
              email: matched.email,
              userId: matched.id,
              role: matched.role,
              supabaseUserId: session.user.id,
              isCloudAuth: true,
              loggedInAt: new Date().toISOString(),
            })
          );
          return matched;
        }
      }
    } catch (err) {
      console.warn('checkSupabaseSession cloud check failed:', err);
    }
  }

  // Fallback membaca penyimpanan lokal
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const auth = JSON.parse(raw);
      if (auth?.isLoggedIn) {
        const users = getSystemUsers();
        const matched = users.find(
          (u) => u.id === auth.userId || u.email.toLowerCase() === auth.email?.toLowerCase()
        );
        return matched || users[0] || DEFAULT_SYSTEM_USERS[0];
      }
    }
  } catch {}

  return null;
}

/**
 * Login pengguna menggunakan Supabase Auth dengan graceful fallback ke kredensial lokal
 */
export async function loginWithSupabase(
  email: string,
  password: string
): Promise<AuthResult> {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { success: false, error: 'Silakan isi email dan kata sandi.' };
  }

  const client = getSupabaseClient();
  const cloudAvailable = !!client && isSupabaseConfigured();

  // 1. Jika Supabase terhubung, coba autentikasi ke Supabase Cloud terlebih dahulu
  if (cloudAvailable) {
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (!error && data.session && data.user) {
        // Ambil profil staf dari PostgreSQL atau cache
        let users = getSystemUsers();
        let matchedUser = users.find(
          (u) => u.email.toLowerCase() === trimmedEmail
        );

        // Jika profil belum ada di lokal, coba query ke tabel system_users di Supabase
        if (!matchedUser) {
          try {
            const { data: dbUser } = await client
              .from('system_users')
              .select('*')
              .eq('email', trimmedEmail)
              .maybeSingle();

            if (dbUser) {
              matchedUser = {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role as any,
                roleTitle: dbUser.role_title,
                phone: dbUser.phone || undefined,
                avatar: dbUser.avatar || undefined,
                institution: dbUser.institution || undefined,
                bio: dbUser.bio || undefined,
                status: dbUser.status as any,
                allowedTabs: dbUser.allowed_tabs_json
                  ? JSON.parse(dbUser.allowed_tabs_json)
                  : ['dashboard'],
                passwordHash: '',
                lastLoginAt: new Date().toISOString(),
                createdAt: dbUser.created_at || new Date().toISOString(),
              };
              saveSystemUser(matchedUser);
            }
          } catch (fetchErr) {
            console.warn('Gagal memuat profil user dari Supabase:', fetchErr);
          }
        }

        // Jika tetap belum ditemukan, buat profil fallback dari metadata
        if (!matchedUser) {
          matchedUser = {
            id: `usr-${data.user.id.slice(0, 8)}`,
            name: data.user.user_metadata?.name || trimmedEmail.split('@')[0],
            email: trimmedEmail,
            role: (data.user.user_metadata?.role as any) || 'administrator',
            roleTitle: data.user.user_metadata?.roleTitle || 'Administrator Sistem',
            status: 'active',
            allowedTabs: ['dashboard', 'students', 'inquiries', 'batches', 'settings'],
            passwordHash: '',
            lastLoginAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };
          saveSystemUser(matchedUser);
        }

        // Simpan sesi autentikasi
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            isLoggedIn: true,
            email: matchedUser.email,
            userId: matchedUser.id,
            role: matchedUser.role,
            supabaseUserId: data.user.id,
            isCloudAuth: true,
            loggedInAt: new Date().toISOString(),
          })
        );

        // Log aktivitas login berhasil
        try {
          logAdminActivity({
            module: 'auth',
            actionType: 'login',
            title: 'Cloud Supabase Login Berhasil',
            description: `Pengguna ${matchedUser.name} (${matchedUser.email}) berhasil masuk via Cloud Supabase Auth.`,
            severity: 'info',
            metadata: { email: matchedUser.email, role: matchedUser.role, isCloudAuth: true },
          });
        } catch {}

        return {
          success: true,
          user: matchedUser,
          isCloudAuth: true,
        };
      }

      // Jika error spesifik seperti invalid credentials atau belum terdaftar di Supabase Auth,
      // kita coba cek apakah ini akun bawaan yang bisa di-fallback lokal
      console.warn('Supabase Auth signIn error:', error?.message);
    } catch (err: any) {
      console.warn('Supabase Auth exception, falling back to local auth:', err);
    }
  }

  // 2. Fallback ke sistem autentikasi lokal
  const localRes = loginAdmin(trimmedEmail, trimmedPassword);
  if (localRes.success && localRes.user) {
    return {
      success: true,
      user: localRes.user,
      isCloudAuth: false,
    };
  }

  return {
    success: false,
    error: localRes.error || 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.',
    isCloudAuth: false,
  };
}

/**
 * Logout dari Supabase Cloud dan bersihkan sesi lokal
 */
export async function logoutWithSupabase(): Promise<void> {
  const client = getSupabaseClient();
  if (client && isSupabaseConfigured()) {
    try {
      await client.auth.signOut();
    } catch (err) {
      console.warn('Supabase Auth signOut error:', err);
    }
  }
  logoutAdmin();
}

/**
 * Mendaftarkan akun staf baru ke Supabase Auth dan tabel system_users
 */
export async function registerStaffUserInCloud(
  user: SystemUser,
  password?: string
): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  const passwordToUse = password || user.passwordHash || 'admin123';

  // Simpan ke lokal dan tabel system_users terlebih dahulu
  saveSystemUser(user);

  if (!client || !isSupabaseConfigured()) {
    return {
      success: true,
      message: 'Akun staf berhasil disimpan secara lokal (Supabase belum terhubung).',
    };
  }

  try {
    const { error } = await client.auth.signUp({
      email: user.email,
      password: passwordToUse,
      options: {
        data: {
          name: user.name,
          role: user.role,
          roleTitle: user.roleTitle,
          institution: user.institution || 'Beekoding Tech Academy',
        },
      },
    });

    if (error) {
      // Jika akun sudah terdaftar, bukan masalah kritis
      if (error.message.toLowerCase().includes('already registered')) {
        return {
          success: true,
          message: `Akun ${user.email} sudah terdaftar di Supabase Auth. Data profil telah diperbarui.`,
        };
      }
      return {
        success: false,
        message: `Gagal mendaftarkan ke Supabase Auth: ${error.message}`,
      };
    }

    return {
      success: true,
      message: `Akun ${user.email} berhasil didaftarkan di Supabase Auth & database staf.`,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Terjadi kesalahan saat mendaftarkan akun staf ke cloud.',
    };
  }
}

/**
 * Mendaftarkan seluruh akun staf bawaan (Admin, Mentor, Konselor, Akademik) ke Supabase Auth
 */
export async function provisionDefaultStaffAccounts(): Promise<ProvisionResult> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) {
    return {
      success: false,
      createdCount: 0,
      existingCount: 0,
      errors: ['Supabase belum dikonfigurasi. Silakan simpan Project URL dan Anon Key terlebih dahulu.'],
    };
  }

  const staffToProvision = [
    {
      email: 'admin@beekoding.id',
      password: 'admin123',
      name: 'Febri Hasan',
      role: 'administrator',
      roleTitle: 'Super Administrator & Academic Strategist',
    },
    {
      email: 'mentor@beekoding.id',
      password: 'mentor123',
      name: 'Kak Sarah Amalia',
      role: 'instructor',
      roleTitle: 'Senior Coding Instructor & Curriculum Lead',
    },
    {
      email: 'konselor@beekoding.id',
      password: 'konselor123',
      name: 'Bunda Dian Lestari',
      role: 'counselor',
      roleTitle: 'Talent & Student Counseling Specialist',
    },
    {
      email: 'akademik@beekoding.id',
      password: 'akademik123',
      name: 'Dr. Ir. Hendra Wijaya',
      role: 'academic_lead',
      roleTitle: 'Academic Director & Assessment Auditor',
    },
  ];

  let createdCount = 0;
  let existingCount = 0;
  const errors: string[] = [];

  for (const staff of staffToProvision) {
    try {
      const { data, error } = await client.auth.signUp({
        email: staff.email,
        password: staff.password,
        options: {
          data: {
            name: staff.name,
            role: staff.role,
            roleTitle: staff.roleTitle,
            institution: 'Beekoding Tech Academy',
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('already registered')) {
          existingCount++;
        } else {
          errors.push(`${staff.email}: ${error.message}`);
        }
      } else if (data.user) {
        createdCount++;
      }
    } catch (err: any) {
      errors.push(`${staff.email}: ${err?.message || 'Gagal mendaftar'}`);
    }
  }

  return {
    success: errors.length === 0,
    createdCount,
    existingCount,
    errors,
  };
}

export interface PasswordResetResult {
  success: boolean;
  message: string;
  isCloudEmailSent?: boolean;
}

/**
 * Mengirimkan permintaan reset password ke email via Supabase Cloud Auth atau validasi lokal
 */
export async function requestPasswordReset(email: string): Promise<PasswordResetResult> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, message: 'Silakan masukkan alamat email yang terdaftar.' };
  }

  const client = getSupabaseClient();
  const cloudAvailable = !!client && isSupabaseConfigured();

  // 1. Coba kirim via Supabase Cloud Auth jika terkonfigurasi
  if (cloudAvailable) {
    try {
      const redirectUrl = `${window.location.origin}/#admin`;
      const { error } = await client.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: redirectUrl,
      });

      if (!error) {
        logAdminActivity({
          module: 'auth',
          actionType: 'update',
          title: 'Permintaan Reset Kata Sandi',
          description: `Tautan pemulihan kata sandi telah dikirim ke email ${trimmedEmail} melalui Supabase Cloud Auth.`,
          severity: 'info',
        });
        return {
          success: true,
          isCloudEmailSent: true,
          message: `Tautan reset kata sandi telah dikirim ke ${trimmedEmail}. Silakan periksa kotak masuk atau folder spam email Anda.`,
        };
      } else {
        console.warn('Supabase resetPasswordForEmail warning:', error.message);
      }
    } catch (err: any) {
      console.warn('Supabase reset exception:', err);
    }
  }

  // 2. Fallback lokal: periksa apakah email ada di system_users
  const users = getSystemUsers();
  const matched = users.find((u) => u.email.toLowerCase() === trimmedEmail);

  if (matched) {
    logAdminActivity({
      module: 'auth',
      actionType: 'update',
      title: 'Permintaan Reset Kata Sandi Lokal',
      description: `Staf ${matched.name} (${matched.email}) meminta reset kata sandi.`,
      severity: 'info',
    });
    return {
      success: true,
      isCloudEmailSent: false,
      message: `Akun terdaftar atas nama "${matched.name}". Dalam mode lokal, Anda dapat menggunakan PIN Otorisasi Cepat (default: 2026) untuk langsung membuat kata sandi baru.`,
    };
  }

  return {
    success: false,
    message: `Alamat email "${trimmedEmail}" tidak ditemukan dalam daftar staf terdaftar.`,
  };
}

/**
 * Menyetel ulang kata sandi dengan verifikasi Master PIN Keamanan
 */
export async function resetPasswordWithPin(
  email: string,
  pin: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPin = pin.trim();
  const trimmedPass = newPassword.trim();

  if (!trimmedEmail || !trimmedPin || !trimmedPass) {
    return { success: false, message: 'Semua kolom wajib diisi.' };
  }

  if (trimmedPass.length < 6) {
    return { success: false, message: 'Kata sandi baru minimal 6 karakter.' };
  }

  // Master PIN keamanan darurat: 2026 atau 8888 atau 1131
  const validPins = ['2026', '8888', '1131'];
  if (!validPins.includes(trimmedPin)) {
    return {
      success: false,
      message: 'PIN Otorisasi Darurat salah. Hubungi Super Admin (+62 853-1131-7127) untuk mendapatkan PIN bantuan.',
    };
  }

  const users = getSystemUsers();
  const userIdx = users.findIndex((u) => u.email.toLowerCase() === trimmedEmail);

  if (userIdx === -1) {
    return { success: false, message: 'Email staf tidak ditemukan dalam basis data sistem.' };
  }

  // Update password lokal
  users[userIdx].passwordHash = `scrypt_custom_${trimmedPass}`;
  localStorage.setItem(STORAGE_KEYS.SYSTEM_USERS, JSON.stringify(users));

  // Sinkronkan ke Supabase jika terhubung
  const client = getSupabaseClient();
  if (client && isSupabaseConfigured()) {
    try {
      await client.from('system_users').update({
        password_hash: users[userIdx].passwordHash,
      }).eq('id', users[userIdx].id);
    } catch (e) {
      console.warn('Sync updated password to supabase failed:', e);
    }
  }

  logAdminActivity({
    module: 'auth',
    actionType: 'update',
    title: 'Reset Kata Sandi Berhasil',
    description: `Kata sandi staf ${users[userIdx].name} (${users[userIdx].email}) berhasil direset menggunakan PIN Otorisasi.`,
    severity: 'warning',
  });

  return {
    success: true,
    message: `Kata sandi untuk ${users[userIdx].name} berhasil diperbarui! Silakan masuk dengan kata sandi baru Anda.`,
  };
}
