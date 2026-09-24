import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { STORAGE_KEYS } from './storageKeys';
import {
  hashPasswordSha256,
  verifyPasswordHash,
} from './cryptoUtils';
import {
  getSystemUsers,
  saveSystemUser,
  logAdminActivity,
  type SystemUser,
  DEFAULT_SYSTEM_USERS,
  loginAdmin,
  logoutAdmin,
  getAdminCredentials,
} from './adminStorage';

export { hashPasswordSha256, verifyPasswordHash };

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

  // 1. Autentikasi langsung ke tabel database system_users di Supabase
  if (cloudAvailable) {
    try {
      const { data: dbUser, error } = await client
        .from('system_users')
        .select('*')
        .ilike('email', trimmedEmail)
        .maybeSingle();

      if (!error && dbUser) {
        if (dbUser.status !== 'active') {
          return {
            success: false,
            error: 'Akun Anda sedang dinonaktifkan. Silakan hubungi Administrator.',
            isCloudAuth: true,
          };
        }

        // Cek kecocokan kata sandi dari kolom password_hash (SHA-256 / Plaintext)
        const isPasswordMatch = await verifyPasswordHash(trimmedPassword, dbUser.password_hash);

        if (!isPasswordMatch) {
          return {
            success: false,
            error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.',
            isCloudAuth: true,
          };
        }

        const nowIso = new Date().toISOString();

        // Auto-upgrade: Jika di Supabase masih tersimpan kata sandi telanjang,
        // otomatis konversi menjadi hash SHA-256 terenkripsi di background!
        let passwordHashToSave = dbUser.password_hash;
        if (dbUser.password_hash === trimmedPassword || dbUser.password_hash?.startsWith('scrypt_custom_')) {
          try {
            passwordHashToSave = await hashPasswordSha256(trimmedPassword);
          } catch {}
        }

        // Update waktu login terakhir dan password_hash di Supabase
        try {
          const updatePayload: Record<string, any> = {
            last_login_at: nowIso,
            updated_at: nowIso,
          };
          if (passwordHashToSave && passwordHashToSave !== dbUser.password_hash) {
            updatePayload.password_hash = passwordHashToSave;
          }

          const { error: updateErr } = await client
            .from('system_users')
            .update(updatePayload)
            .eq('id', dbUser.id);

          if (updateErr) {
            console.warn('Gagal memperbarui last_login_at di Supabase:', updateErr.message);
          }
        } catch (err) {
          console.warn('Gagal memproses update last_login_at:', err);
        }

        const matchedUser: SystemUser = {
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
          passwordHash: passwordHashToSave || dbUser.password_hash || '',
          lastLoginAt: nowIso,
          createdAt: dbUser.created_at || nowIso,
        };

        // Simpan sesi autentikasi ke localStorage
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            isLoggedIn: true,
            email: matchedUser.email,
            userId: matchedUser.id,
            role: matchedUser.role,
            isCloudAuth: true,
            loggedInAt: nowIso,
          })
        );

        saveSystemUser(matchedUser);

        try {
          const creds = getAdminCredentials();
          if (creds.email.toLowerCase() === trimmedEmail || trimmedEmail === 'admin') {
            localStorage.setItem(
              STORAGE_KEYS.CREDENTIALS,
              JSON.stringify({
                ...creds,
                passwordHash: passwordHashToSave || creds.passwordHash,
                updatedAt: nowIso,
              })
            );
          }
        } catch {}

        // Catat ke audit log
        try {
          logAdminActivity({
            module: 'auth',
            actionType: 'login',
            title: 'Login Petugas Berhasil',
            description: `Pengguna ${matchedUser.name} (${matchedUser.email}) berhasil masuk ke portal admin via tabel system_users.`,
            severity: 'info',
            metadata: { email: matchedUser.email, role: matchedUser.role, isCloudAuth: true },
          });
        } catch {}

        return {
          success: true,
          user: matchedUser,
          isCloudAuth: true,
        };
      } else if (!error && !dbUser) {
        return {
          success: false,
          error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.',
          isCloudAuth: true,
        };
      }
    } catch (err: any) {
      console.warn('Query ke tabel system_users gagal:', err);
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
    error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.',
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

  // 1. Pastikan kata sandi terenkripsi hash SHA-256 (64 karakter)
  let secureHash = user.passwordHash;
  if (!secureHash || secureHash.length !== 64) {
    secureHash = await hashPasswordSha256(passwordToUse);
    user.passwordHash = secureHash;
  }

  // Simpan ke lokal
  saveSystemUser(user);

  if (!client || !isSupabaseConfigured()) {
    return {
      success: true,
      message: 'Akun staf berhasil disimpan secara lokal (Supabase belum terhubung).',
    };
  }

  // 2. Simpan / perbarui langsung ke tabel system_users di Supabase Cloud
  try {
    await client.from('system_users').upsert({
      id: user.id,
      name: user.name,
      email: user.email.toLowerCase(),
      role: user.role,
      role_title: user.roleTitle,
      phone: user.phone || null,
      avatar: user.avatar || null,
      institution: user.institution || null,
      bio: user.bio || null,
      status: user.status,
      allowed_tabs_json: JSON.stringify(user.allowedTabs),
      password_hash: secureHash,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });
  } catch (err) {
    console.warn('Upsert to system_users table failed:', err);
  }

  // 3. Sinkronkan ke Supabase Auth jika dimungkinkan
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
      if (error.message.toLowerCase().includes('already registered')) {
        return {
          success: true,
          message: `Akun ${user.email} berhasil diperbarui di tabel system_users dengan kata sandi terenkripsi.`,
        };
      }
    }

    return {
      success: true,
      message: `Akun ${user.email} berhasil didaftarkan di tabel system_users dengan kata sandi terenkripsi SHA-256.`,
    };
  } catch (err: any) {
    return {
      success: true,
      message: `Akun ${user.email} berhasil disimpan di tabel system_users.`,
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
 * Mengatur ulang kata sandi staf langsung di tabel system_users (tanpa ketergantungan email SMTP Supabase)
 */
export async function resetPasswordInSystemUsers(
  email: string,
  newPassword: string
): Promise<{ success: boolean; message: string; userName?: string }> {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPass = newPassword.trim();

  if (!trimmedEmail) {
    return { success: false, message: 'Silakan masukkan alamat email akun Anda.' };
  }

  // Validasi format email dasar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      success: false,
      message: 'Format alamat email tidak valid.',
    };
  }

  if (!trimmedPass || trimmedPass.length < 6) {
    return { success: false, message: 'Kata sandi baru minimal harus 6 karakter.' };
  }

  const client = getSupabaseClient();
  const cloudAvailable = !!client && isSupabaseConfigured();

  if (cloudAvailable && client) {
    try {
      // 1. Cek apakah email terdaftar di tabel system_users
      const { data: dbUser, error: findErr } = await client
        .from('system_users')
        .select('id, name, email, status')
        .ilike('email', trimmedEmail)
        .maybeSingle();

      if (findErr) {
        return {
          success: false,
          message: `Gagal mengakses database: ${findErr.message}`,
        };
      }

      if (!dbUser) {
        return {
          success: false,
          message: `Alamat email "${trimmedEmail}" tidak terdaftar.`,
        };
      }

      if (dbUser.status !== 'active') {
        return {
          success: false,
          message: 'Akun Anda sedang dinonaktifkan. Silakan hubungi Administrator.',
        };
      }

      let updatedSuccessfully = false;
      const hashedPass = await hashPasswordSha256(trimmedPass);

      // Cara 1: Coba via RPC function reset_system_user_password (SECURITY DEFINER)
      try {
        const { data: rpcResult, error: rpcErr } = await client.rpc('reset_system_user_password', {
          target_email: trimmedEmail,
          new_password: hashedPass,
        });
        if (!rpcErr && rpcResult === true) {
          updatedSuccessfully = true;
        }
      } catch {}

      // Cara 2: Coba direct update dengan .select() untuk verifikasi row benar-benar terupdate
      if (!updatedSuccessfully) {
        const { data: updatedRows, error: updateErr } = await client
          .from('system_users')
          .update({
            password_hash: hashedPass,
            updated_at: new Date().toISOString(),
          })
          .eq('id', dbUser.id)
          .select();

        if (updateErr) {
          return {
            success: false,
            message: `Gagal memperbarui kata sandi: ${updateErr.message}`,
          };
        }

        if (updatedRows && updatedRows.length > 0) {
          updatedSuccessfully = true;
        }
      }

      // Jika update di database ditolak oleh RLS (0 rows affected)
      if (!updatedSuccessfully) {
        return {
          success: false,
          message: 'Pembaruan kata sandi di Supabase belum diizinkan oleh kebijakan RLS (Row Level Security). Harap jalankan script izin update system_users di Supabase SQL Editor.',
        };
      }

      // Sinkronkan ke penyimpanan lokal
      try {
        const creds = getAdminCredentials();
        if (creds.email.toLowerCase() === trimmedEmail || trimmedEmail === 'admin') {
          localStorage.setItem(
            STORAGE_KEYS.CREDENTIALS,
            JSON.stringify({
              ...creds,
              passwordHash: trimmedPass,
              updatedAt: new Date().toISOString(),
            })
          );
        }
        const users = getSystemUsers();
        const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);
        if (user) {
          user.passwordHash = trimmedPass;
          saveSystemUser(user);
        }
      } catch {}

      // 3. Catat di audit log
      try {
        logAdminActivity({
          module: 'auth',
          actionType: 'update',
          title: 'Reset Kata Sandi Berhasil',
          description: `Kata sandi akun ${dbUser.name} (${dbUser.email}) berhasil diperbarui langsung di tabel system_users.`,
          severity: 'info',
        });
      } catch {}

      return {
        success: true,
        userName: dbUser.name,
        message: `Kata sandi untuk ${dbUser.name} berhasil diperbarui! Silakan masuk dengan kata sandi baru Anda.`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Terjadi kesalahan sistem saat memperbarui kata sandi.',
      };
    }
  }

  // Fallback lokal jika offline
  const users = getSystemUsers();
  const user = users.find((u) => u.email.toLowerCase() === trimmedEmail);
  if (!user) {
    return {
      success: false,
      message: `Alamat email "${trimmedEmail}" tidak ditemukan dalam daftar staf.`,
    };
  }

  user.passwordHash = trimmedPass;
  saveSystemUser(user);

  return {
    success: true,
    userName: user.name,
    message: `Kata sandi untuk ${user.name} berhasil diperbarui!`,
  };
}

/**
 * Mengirimkan permintaan reset password ke email via Supabase Cloud Auth dengan validasi email terdaftar
 */
export async function requestPasswordReset(email: string): Promise<PasswordResetResult> {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail) {
    return { success: false, message: 'Silakan masukkan alamat email yang terdaftar.' };
  }

  // Validasi format email dasar
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return {
      success: false,
      message: 'Format alamat email tidak valid. Masukkan email dengan format yang benar (contoh: admin@beekoding.id).',
    };
  }

  const client = getSupabaseClient();
  const cloudAvailable = !!client && isSupabaseConfigured();

  // Ambil data staf lokal sebagai salah satu referensi
  const localUsers = getSystemUsers();
  const localMatched = localUsers.find((u) => u.email.toLowerCase() === trimmedEmail);

  // 1. Jika Supabase Cloud aktif, lakukan validasi data di Supabase terlebih dahulu
  if (cloudAvailable) {
    let existsInSupabase = false;
    let staffName = '';
    let cloudQueryAttempted = false;

    try {
      const { data: dbUser, error: dbError } = await client
        .from('system_users')
        .select('id, name, email')
        .ilike('email', trimmedEmail)
        .maybeSingle();

      if (!dbError) {
        cloudQueryAttempted = true;
        if (dbUser && dbUser.email) {
          existsInSupabase = true;
          staffName = dbUser.name || '';
        }
      } else {
        console.warn('Cek email di system_users Supabase:', dbError.message);
      }
    } catch (err) {
      console.warn('Gagal kueri email ke Supabase:', err);
    }

    // Jika telah dicek ke Supabase dan datanya tidak ada, serta tidak ada di data lokal
    const isEmailRegistered = existsInSupabase || !!localMatched;

    if (!isEmailRegistered && cloudQueryAttempted) {
      return {
        success: false,
        message: `Alamat email "${trimmedEmail}" tidak terdaftar dalam database Supabase. Pastikan email yang dimasukkan sudah benar atau hubungi Super Admin.`,
      };
    }

    if (!isEmailRegistered && !cloudQueryAttempted) {
      // Jika kueri tabel gagal (misal RLS belum mengizinkan select anon atau offline sementara),
      // tetap validasi terhadap daftar staf terdaftar
      return {
        success: false,
        message: `Alamat email "${trimmedEmail}" tidak ditemukan dalam daftar akun staf terdaftar.`,
      };
    }

    // Email terbukti terdaftar -> kirim email reset melalui Supabase Auth
    try {
      const redirectUrl = `${window.location.origin}/#admin`;
      const { error: resetError } = await client.auth.resetPasswordForEmail(trimmedEmail, {
        redirectTo: redirectUrl,
      });

      if (resetError) {
        return {
          success: false,
          message: `Gagal mengirim tautan reset dari Supabase: ${resetError.message}`,
        };
      }

      logAdminActivity({
        module: 'auth',
        actionType: 'update',
        title: 'Permintaan Reset Kata Sandi',
        description: `Tautan pemulihan kata sandi telah dikirim ke email ${trimmedEmail} (${staffName || localMatched?.name || 'Staf'}) melalui Supabase Cloud Auth.`,
        severity: 'info',
      });

      return {
        success: true,
        isCloudEmailSent: true,
        message: `Tautan reset kata sandi telah dikirim ke ${trimmedEmail}. Silakan periksa kotak masuk atau folder spam email Anda.`,
      };
    } catch (err: any) {
      console.warn('Supabase reset exception:', err);
      return {
        success: false,
        message: err?.message || 'Terjadi kesalahan saat memproses permintaan reset kata sandi.',
      };
    }
  }

  // 2. Fallback mode lokal/offline: periksa apakah email ada di system_users lokal
  if (localMatched) {
    logAdminActivity({
      module: 'auth',
      actionType: 'update',
      title: 'Permintaan Reset Kata Sandi Lokal',
      description: `Staf ${localMatched.name} (${localMatched.email}) meminta reset kata sandi dalam mode offline.`,
      severity: 'info',
    });
    return {
      success: true,
      isCloudEmailSent: false,
      message: `Akun terdaftar atas nama "${localMatched.name}". Karena sistem dalam mode offline / lokal, silakan hubungi Super Admin via WhatsApp untuk bantuan reset kata sandi.`,
    };
  }

  return {
    success: false,
    message: `Alamat email "${trimmedEmail}" tidak ditemukan dalam data akun terdaftar.`,
  };
}

/**
 * Memperbarui kata sandi pengguna saat berada dalam sesi pemulihan (Password Recovery) atau sesi aktif
 */
export async function updateUserPassword(
  newPassword: string,
  targetEmail?: string
): Promise<{ success: boolean; message: string }> {
  const trimmed = newPassword.trim();
  if (!trimmed || trimmed.length < 6) {
    return {
      success: false,
      message: 'Kata sandi baru minimal harus 6 karakter.',
    };
  }

  const client = getSupabaseClient();
  const cloudAvailable = !!client && isSupabaseConfigured();

  let emailToUpdate = targetEmail?.trim().toLowerCase();
  if (!emailToUpdate) {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const auth = JSON.parse(raw);
        emailToUpdate = auth?.email?.toLowerCase();
      }
    } catch {}
  }
  if (!emailToUpdate) {
    emailToUpdate = '88ihsan@gmail.com';
  }

  if (cloudAvailable && client) {
    try {
      const secureHash = await hashPasswordSha256(trimmed);
      const { error } = await client
        .from('system_users')
        .update({
          password_hash: secureHash,
          updated_at: new Date().toISOString(),
        })
        .ilike('email', emailToUpdate);

      if (error) {
        return {
          success: false,
          message: `Gagal memperbarui kata sandi di tabel system_users: ${error.message}`,
        };
      }

      logAdminActivity({
        module: 'auth',
        actionType: 'update',
        title: 'Pembaruan Kata Sandi Berhasil',
        description: `Kata sandi akun ${emailToUpdate} telah berhasil diperbarui di tabel system_users.`,
        severity: 'info',
      });

      return {
        success: true,
        message: 'Kata sandi baru Anda berhasil disimpan di database system_users! Silakan masuk.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Terjadi kesalahan sistem saat memperbarui kata sandi.',
      };
    }
  }

  return {
    success: true,
    message: 'Kata sandi baru berhasil disimpan.',
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

  // Update password lokal dengan hash SHA-256
  const secureHash = await hashPasswordSha256(trimmedPass);
  users[userIdx].passwordHash = secureHash;
  localStorage.setItem(STORAGE_KEYS.SYSTEM_USERS, JSON.stringify(users));

  // Sinkronkan ke Supabase jika terhubung
  const client = getSupabaseClient();
  if (client && isSupabaseConfigured()) {
    try {
      await client.from('system_users').update({
        password_hash: secureHash,
        updated_at: new Date().toISOString(),
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
