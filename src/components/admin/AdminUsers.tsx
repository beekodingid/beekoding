import React, { useState, useEffect } from 'react';
import {
  type SystemUser,
  type UserRole,
  type AdminTab,
  getSystemUsers,
  saveSystemUser,
  deleteSystemUser,
  switchActiveSystemUser,
  getCurrentSystemUser,
  ALL_ADMIN_TABS,
  INSTRUCTOR_RECOMMENDED_TABS,
  COUNSELOR_RECOMMENDED_TABS,
  exportUsersCSV,
} from '../../services/adminStorage';
import {
  provisionDefaultStaffAccounts,
  registerStaffUserInCloud,
  hashPasswordSha256,
} from '../../services/supabaseAuth';
import {
  pushUserToSupabase,
  deleteUserFromSupabase,
  fetchSystemUsersFromCloud,
} from '../../services/supabaseSync';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { uploadAvatar } from '../../services/supabaseStorage';
import {
  Users,
  ShieldCheck,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  FileSpreadsheet,
  Sparkles,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  X,
  LogIn,
  Upload,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  User,
} from 'lucide-react';

interface AdminUsersProps {
  isDark: boolean;
  onRoleSwitched?: () => void;
}

const MENU_CATEGORIES: {
  category: string;
  items: { id: AdminTab; label: string; desc: string }[];
}[] = [
  {
    category: 'Utama',
    items: [
      { id: 'dashboard', label: 'Dashboard', desc: 'Ringkasan performa, siswa, dan statistik kelas' },
    ],
  },
  {
    category: 'Penerimaan & Konsultasi',
    items: [
      { id: 'students', label: 'Data Siswa', desc: 'Profil anak, minat bakat, dan kontak wali murid' },
      { id: 'inquiries', label: 'Konsultasi & Registrasi', desc: 'Prospek leads pendaftaran calon murid baru' },
      { id: 'events', label: 'Event & Trial Class', desc: 'Jadwal workshop koding dan trial class' },
      { id: 'counseling', label: 'Konseling & Bimbingan', desc: 'Sesi mentoring privat 1-on-1 dengan siswa/ortu' },
      { id: 'templates', label: 'Template Pesan WA', desc: 'Format pesan resmi penagihan, follow-up & info' },
      { id: 'announcements', label: 'Pengumuman & Siaran', desc: 'Broadcast massal untuk siswa dan pengajar' },
      { id: 'gateway', label: 'WhatsApp Gateway & Otomasi', desc: 'Mesin antrean & pemicu notifikasi WhatsApp' },
    ],
  },
  {
    category: 'Akademik & Pengajaran',
    items: [
      { id: 'batches', label: 'Jadwal & Batch Kelas', desc: 'Kelola kelas aktif, sesi, dan link Google Meet/Zoom' },
      { id: 'attendance', label: 'Presensi & Absensi', desc: 'Catat kehadiran siswa dan ringkasan materi harian' },
      { id: 'reports', label: 'Rapor Belajar Siswa', desc: 'Nilai kompetensi koding, rapor bulanan & feedback' },
      { id: 'curriculum', label: 'Silabus Kurikulum', desc: 'Panduan target modul dan capaian pembelajaran' },
      { id: 'resources', label: 'Bahan Ajar & Modul', desc: 'Starter code, slide presentasi, panduan praktik' },
      { id: 'instructors', label: 'Tim Instruktur', desc: 'Manajemen master profil dan data pengajar' },
    ],
  },
  {
    category: 'Gamifikasi & Prestasi',
    items: [
      { id: 'quests', label: 'Tantangan & Quest', desc: 'Misi koding mandiri dan validasi submission tugas' },
      { id: 'quizzes', label: 'Kuis & Evaluasi Belajar', desc: 'Ujian pemahaman konsep komputasi & logika' },
      { id: 'certificates', label: 'Sertifikat Siswa', desc: 'Verifikasi kelayakan dan penerbitan sertifikat' },
      { id: 'showcase', label: 'Karya & Portofolio', desc: 'Kurasi & code review game/web buatan siswa' },
    ],
  },
  {
    category: 'Keuangan & Pemasaran',
    items: [
      { id: 'transactions', label: 'Transaksi & Biaya', desc: 'Data omzet, mutasi pembayaran SPP siswa' },
      { id: 'vouchers', label: 'Kupon & Promo', desc: 'Manajemen kode promo diskon pendaftaran' },
      { id: 'payroll', label: 'Penggajian Instruktur', desc: 'Honor per sesi mengajar dan slip gaji A4' },
      { id: 'referrals', label: 'Duta & Referral', desc: 'Komisi program afiliasi mitra dan duta belajar' },
    ],
  },
  {
    category: 'Sistem & Evaluasi',
    items: [
      { id: 'questions', label: 'Bank Soal', desc: 'Kumpulan soal asesmen bakat dan latihan logika' },
      { id: 'users', label: 'Manajemen User & Hak Akses', desc: 'Pengaturan akun staf dan pembagian izin menu' },
      { id: 'audit', label: 'Log Aktivitas & Audit', desc: 'Jejak audit forensik keamanan mutasi data' },
      { id: 'settings', label: 'Pengaturan Sistem', desc: 'Profil instansi, backup database, dan konfigurasi' },
    ],
  },
];

export const AdminUsers: React.FC<AdminUsersProps> = ({ isDark, onRoleSwitched }) => {
  const [users, setUsers] = useState<SystemUser[]>(() => getSystemUsers());
  const [currentUser, setCurrentUser] = useState<SystemUser>(() => getCurrentSystemUser());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('instructor');
  const [formRoleTitle, setFormRoleTitle] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAvatar, setFormAvatar] = useState('');
  const [formInstitution, setFormInstitution] = useState('Beekoding Academy');
  const [formBio, setFormBio] = useState('');
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');
  const [formAllowedTabs, setFormAllowedTabs] = useState<AdminTab[]>([...INSTRUCTOR_RECOMMENDED_TABS]);
  const [isUploadingStaffAvatar, setIsUploadingStaffAvatar] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  // Otomatis tarik data pengguna sistem dari Cloud Supabase saat komponen dibuka
  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchSystemUsersFromCloud().then((cloudUsers) => {
        if (cloudUsers && cloudUsers.length > 0) {
          setUsers(cloudUsers);
          setCurrentUser(getCurrentSystemUser());
        }
      });
    }
  }, []);

  // State Validasi Form Pengguna
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formTouched, setFormTouched] = useState<Record<string, boolean>>({});
  const [showFormPassword, setShowFormPassword] = useState(false);

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'name': {
        const val = value.trim();
        if (!val) return 'Nama lengkap wajib diisi.';
        if (val.length < 3) return 'Nama lengkap minimal 3 karakter.';
        if (val.length > 70) return 'Nama lengkap maksimal 70 karakter.';
        if (!/^[a-zA-ZÀ-ÿ\s.,'-]+$/.test(val)) {
          return 'Nama hanya boleh berupa huruf dan tanda baca umum (titik/koma untuk gelar).';
        }
        return '';
      }
      case 'email': {
        const val = value.trim().toLowerCase();
        if (!val) return 'Email pengguna wajib diisi.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(val)) {
          return 'Format email tidak valid (contoh: staf@beekoding.id).';
        }
        const duplicate = users.find(
          (u) => u.email.toLowerCase() === val && (!editingUser || u.id !== editingUser.id)
        );
        if (duplicate) {
          return `Email sudah terdaftar untuk pengguna: ${duplicate.name}.`;
        }
        return '';
      }
      case 'password': {
        const val = value.trim();
        if (!editingUser && !val) return 'Kata sandi wajib diisi untuk pengguna baru.';
        if (val && val.length < 6) return 'Kata sandi minimal harus 6 karakter.';
        if (val && val.length > 60) return 'Kata sandi maksimal 60 karakter.';
        return '';
      }
      case 'role': {
        if (!value) return 'Peran (role) utama wajib dipilih.';
        const validRoles: UserRole[] = ['administrator', 'instructor', 'counselor', 'custom'];
        if (!validRoles.includes(value as UserRole)) {
          return 'Peran yang dipilih tidak valid.';
        }
        return '';
      }
      case 'phone': {
        const val = value.trim();
        if (!val) return 'No. WhatsApp / telepon wajib diisi.';
        const digitsOnly = val.replace(/[^0-9]/g, '');
        if (digitsOnly.length < 10) return 'Nomor telepon terlalu pendek (minimal 10 digit).';
        if (digitsOnly.length > 15) return 'Nomor telepon terlalu panjang (maksimal 15 digit).';
        const cleanForPrefix = val.replace(/[\s.-]/g, '');
        if (!cleanForPrefix.startsWith('08') && !cleanForPrefix.startsWith('+628') && !cleanForPrefix.startsWith('628')) {
          return 'Gunakan format nomor Indonesia yang valid (diawali 08... atau +628...).';
        }
        return '';
      }
      default:
        return '';
    }
  };

  const handleFieldBlur = (field: string, value: string) => {
    setFormTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFieldChange = (field: string, value: string, setter: (v: string) => void) => {
    setter(value);
    if (formTouched[field]) {
      const error = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleStaffAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingStaffAvatar(true);
    try {
      const res = await uploadAvatar(file, formEmail || formName || 'staff');
      if (res.success && res.url) {
        setFormAvatar(res.url);
        showToast(
          res.isCloudStorage
            ? 'Foto profil staf berhasil diunggah ke Supabase Storage!'
            : 'Foto profil staf berhasil dimuat secara lokal (Base64).'
        );
      } else {
        showToast(res.error || 'Gagal mengunggah foto profil.');
      }
    } catch (err: any) {
      showToast(err?.message || 'Terjadi kesalahan saat unggah avatar.');
    } finally {
      setIsUploadingStaffAvatar(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const refreshData = () => {
    const list = getSystemUsers();
    setUsers(list);
    setCurrentUser(getCurrentSystemUser());
  };

  const [isSyncingStaff, setIsSyncingStaff] = useState(false);

  const handleSyncStaffToCloud = async () => {
    setIsSyncingStaff(true);
    try {
      const res = await provisionDefaultStaffAccounts();
      if (res.success) {
        showToast(`Sukses: ${res.createdCount} akun baru dibuat, ${res.existingCount} akun sudah aktif di Supabase Auth.`);
      } else {
        showToast(`Selesai: ${res.createdCount} dibuat, ${res.existingCount} ada. Catatan: ${res.errors.join(', ')}`);
      }
    } catch (err: any) {
      showToast(err?.message || 'Gagal menyinkronkan akun staf ke Supabase Auth.');
    } finally {
      setIsSyncingStaff(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormName('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('instructor');
    setFormRoleTitle('Coding Instructor & Mentor');
    setFormPhone('');
    setFormAvatar('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80');
    setFormInstitution('Beekoding Academy');
    setFormBio('');
    setFormStatus('active');
    setFormAllowedTabs([...INSTRUCTOR_RECOMMENDED_TABS]);
    setFormErrors({});
    setFormTouched({});
    setShowFormPassword(false);
    setShowModal(true);
  };

  const handleOpenEditModal = (user: SystemUser) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword(user.passwordHash || '');
    setFormRole(user.role);
    setFormRoleTitle(user.roleTitle);
    setFormPhone(user.phone || '');
    setFormAvatar(user.avatar || '');
    setFormInstitution(user.institution || 'Beekoding Academy');
    setFormBio(user.bio || '');
    setFormStatus(user.status);
    setFormAllowedTabs([...user.allowedTabs]);
    setFormErrors({});
    setFormTouched({});
    setShowFormPassword(false);
    setShowModal(true);
  };

  const handleRoleChangeInForm = (newRole: UserRole) => {
    setFormRole(newRole);
    if (!editingUser) {
      if (newRole === 'administrator') {
        setFormRoleTitle('Super Administrator & Academic Strategist');
        setFormAllowedTabs([...ALL_ADMIN_TABS]);
      } else if (newRole === 'instructor') {
        setFormRoleTitle('Senior Coding Mentor & Python Specialist');
        setFormAllowedTabs([...INSTRUCTOR_RECOMMENDED_TABS]);
      } else if (newRole === 'counselor') {
        setFormRoleTitle('Academic Counselor & Student Advisor');
        setFormAllowedTabs([...COUNSELOR_RECOMMENDED_TABS]);
      } else {
        setFormRoleTitle('Staf Khusus Sistem');
      }
    }
  };

  const handleApplyPreset = (preset: 'admin' | 'instructor' | 'counselor') => {
    if (preset === 'admin') {
      setFormAllowedTabs([...ALL_ADMIN_TABS]);
      showToast('Akses penuh seluruh 25 menu berhasil diterapkan!');
    } else if (preset === 'instructor') {
      setFormAllowedTabs([...INSTRUCTOR_RECOMMENDED_TABS]);
      showToast('Scope 13 menu instruktur berhasil diterapkan!');
    } else if (preset === 'counselor') {
      setFormAllowedTabs([...COUNSELOR_RECOMMENDED_TABS]);
      showToast('Scope 9 menu konselor berhasil diterapkan!');
    }
  };

  const handleToggleTab = (tabId: AdminTab) => {
    setFormAllowedTabs((prev) => {
      if (prev.includes(tabId)) {
        return prev.filter((id) => id !== tabId);
      } else {
        return [...prev, tabId];
      }
    });
  };

  const handleToggleCategory = (tabsInCategory: AdminTab[]) => {
    const allSelected = tabsInCategory.every((id) => formAllowedTabs.includes(id));
    if (allSelected) {
      setFormAllowedTabs((prev) => prev.filter((id) => !tabsInCategory.includes(id)));
    } else {
      setFormAllowedTabs((prev) => Array.from(new Set([...prev, ...tabsInCategory])));
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tandai semua field telah disentuh
    setFormTouched({
      name: true,
      email: true,
      password: true,
      role: true,
      phone: true,
    });

    const nameErr = validateField('name', formName);
    const emailErr = validateField('email', formEmail);
    const passErr = validateField('password', formPassword);
    const roleErr = validateField('role', formRole);
    const phoneErr = validateField('phone', formPhone);

    const newErrors: Record<string, string> = {};
    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (passErr) newErrors.password = passErr;
    if (roleErr) newErrors.role = roleErr;
    if (phoneErr) newErrors.phone = phoneErr;

    if (formAllowedTabs.length === 0) {
      newErrors.tabs = 'Pengguna setidaknya harus memiliki izin ke minimal 1 menu modul.';
    }

    setFormErrors(newErrors);

    // Jika ada error, hentikan proses penyimpanan
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSavingUser(true);
    try {
      // Enkripsi kata sandi menggunakan hash SHA-256 (64 karakter)
      let securePasswordHash = editingUser?.passwordHash || '';
      if (formPassword.trim()) {
        securePasswordHash = await hashPasswordSha256(formPassword.trim());
      } else if (!securePasswordHash) {
        securePasswordHash = await hashPasswordSha256('admin123');
      }

      const saved = saveSystemUser({
        id: editingUser ? editingUser.id : undefined,
        name: formName.trim(),
        email: formEmail.trim().toLowerCase(),
        passwordHash: securePasswordHash,
        role: formRole,
        roleTitle: formRoleTitle.trim() || (formRole === 'administrator' ? 'Administrator' : 'Instruktur / Mentor'),
        phone: formPhone.trim(),
        avatar: formAvatar.trim() || '/febri-hasan.png',
        institution: formInstitution.trim(),
        bio: formBio.trim(),
        status: formStatus,
        allowedTabs: formAllowedTabs,
      });

      let cloudStatusNote = '';
      if (isSupabaseConfigured()) {
        try {
          // 1. Simpan langsung ke tabel system_users di Supabase Cloud (dual-write real-time)
          await pushUserToSupabase(saved);
          // 2. Daftarkan / sinkronkan ke Supabase Auth
          await registerStaffUserInCloud(saved, formPassword.trim() || undefined);
          cloudStatusNote = ' (Langsung tersimpan di Supabase Cloud & Lokal)';
        } catch (cloudErr) {
          console.warn('Gagal sinkronisasi langsung ke Supabase Cloud:', cloudErr);
          cloudStatusNote = ' (Tersimpan di lokal, sinkronisasi cloud tertunda)';
        }
      }

      refreshData();
      setShowModal(false);
      showToast(
        editingUser
          ? `Perubahan akun "${saved.name}" berhasil disimpan${cloudStatusNote}.`
          : `Pengguna baru "${saved.name}" berhasil ditambahkan & aktif${cloudStatusNote}.`
      );
    } catch (err: any) {
      alert(`Gagal menyimpan akun pengguna: ${err?.message || 'Terjadi kesalahan sistem'}`);
    } finally {
      setIsSavingUser(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun pengguna "${name}"?`)) {
      const res = deleteSystemUser(id);
      if (res.success) {
        if (isSupabaseConfigured()) {
          try {
            await deleteUserFromSupabase(id);
          } catch (cloudErr) {
            console.warn('Gagal menghapus user dari Supabase:', cloudErr);
          }
        }
        refreshData();
        showToast(`Akun "${name}" berhasil dihapus dari sistem & database Supabase.`);
      } else {
        alert(res.error || 'Gagal menghapus pengguna.');
      }
    }
  };

  const handleSwitchSession = (user: SystemUser) => {
    const res = switchActiveSystemUser(user.id);
    if (res.success) {
      refreshData();
      showToast(`Sesi aktif berhasil dialihkan ke: ${user.name} (${user.roleTitle})`);
      if (onRoleSwitched) {
        onRoleSwitched();
      }
    } else {
      alert(res.error || 'Gagal beralih akun.');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'administrator').length;
  const instructorCount = users.filter((u) => u.role === 'instructor').length;
  const counselorCount = users.filter((u) => u.role === 'counselor').length;

  return (
    <div className="space-y-6">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/40 text-amber-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div
        className={`p-6 rounded-3xl border relative overflow-hidden transition-all ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 shadow-xl shadow-black/20'
            : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                Role-Based Access Control (RBAC)
              </span>
              <span className="text-xs text-slate-400">• Multi-User & Multi-Role</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Manajemen Pengguna & Kontrol Hak Akses Menu
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
              Atur hak akses staf, instruktur pengajar, dan konselor secara granular. Menu navigasi akan otomatis
              menyesuaikan dengan wewenang akun masing-masing.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {isSupabaseConfigured() && (
              <button
                type="button"
                onClick={handleSyncStaffToCloud}
                disabled={isSyncingStaff}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                title="Sinkronisasi massal seluruh akun staf default ke Supabase Auth (Catatan: Penambahan/Perubahan pengguna individual sudah otomatis tersimpan langsung ke database Supabase secara real-time tanpa perlu tombol ini)"
              >
                <Sparkles className={`w-4 h-4 text-emerald-500 ${isSyncingStaff ? 'animate-spin' : ''}`} />
                <span>{isSyncingStaff ? 'Menyinkronkan...' : 'Daftarkan Staf ke Supabase Auth (Massal)'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={exportUsersCSV}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Ekspor Data Pengguna ke CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Ekspor CSV</span>
            </button>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pengguna</span>
            </button>
          </div>
        </div>
      </div>

      {/* Educational Callout: Scope Rekomendasi Instruktur */}
      <div
        className={`p-5 rounded-3xl border transition-all ${
          isDark
            ? 'bg-amber-500/5 border-amber-500/20 text-slate-300'
            : 'bg-amber-50/70 border-amber-200/80 text-slate-800'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-500">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                💡 Rekomendasi Ruang Lingkup (Scope) untuk Instruktur / Mentor Pengajar
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                13 Menu Mengajar
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Instruktur difokuskan pada aktivitas pedagogik: <strong>Dashboard, Data Siswa, Jadwal Batch, Presensi, Rapor, Silabus, Bahan Ajar, Quest, Kuis, Sertifikat, Portofolio, Bank Soal, dan Konseling</strong>.
              Menu sensitif seperti <em>Transaksi Keuangan, Kupon Promo, Slip Payroll Guru Lain, Referral, dan Audit Trail</em> dibatasi untuk menjaga kerahasiaan institusi.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Akun</span>
            <Users className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalUsers}</div>
          <p className="text-[11px] text-slate-500 mt-1">Terdaftar dalam sistem</p>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Administrator</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-500">{adminCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Akses penuh 25 menu</p>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Instruktur / Mentor</span>
            <GraduationCap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-500">{instructorCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Scope pengajaran & siswa</p>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Konselor & CS</span>
            <Briefcase className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-black text-indigo-500">{counselorCount}</div>
          <p className="text-[11px] text-slate-500 mt-1">Scope konseling & leads</p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, email, atau jabatan..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {(
            [
              { id: 'all', label: 'Semua Peran' },
              { id: 'administrator', label: 'Administrator' },
              { id: 'instructor', label: 'Instruktur' },
              { id: 'counselor', label: 'Konselor' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setRoleFilter(filter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                roleFilter === filter.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          const isCurrent = currentUser.id === user.id;
          const isAdmin = user.role === 'administrator';
          const isInstructor = user.role === 'instructor';
          const isCounselor = user.role === 'counselor';

          return (
            <div
              key={user.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between relative ${
                isCurrent
                  ? 'ring-2 ring-amber-500/50 bg-amber-500/5 border-amber-500/40 shadow-lg shadow-amber-500/10'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                {/* Active Session Ribbon */}
                {isCurrent && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>Sesi Aktif</span>
                  </div>
                )}

                {/* User Info Header */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="relative">
                    <img
                      src={user.avatar || '/febri-hasan.png'}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-amber-500/20"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/febri-hasan.png';
                      }}
                    />
                    <span
                      className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 ${
                        isDark ? 'border-slate-900' : 'border-white'
                      } ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}
                      title={user.status === 'active' ? 'Akun Aktif' : 'Akun Non-Aktif'}
                    />
                  </div>

                  <div className="min-w-0 flex-1 pr-14">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                      {user.name}
                    </h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate">
                      {user.roleTitle}
                    </p>
                  </div>
                </div>

                {/* Role Badge & Status */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isAdmin
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : isInstructor
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : isCounselor
                        ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'
                        : 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    {user.role}
                  </span>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {user.allowedTabs.length} dari 25 Menu
                  </span>
                </div>

                {/* Contact Details */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                </div>

                {/* Allowed Menu Chips Preview */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Menu yang Diizinkan:
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                    {user.allowedTabs.slice(0, 6).map((tabId) => (
                      <span
                        key={tabId}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {tabId}
                      </span>
                    ))}
                    {user.allowedTabs.length > 6 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-500 font-bold">
                        +{user.allowedTabs.length - 6} lainnya
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
                {!isCurrent ? (
                  <button
                    type="button"
                    onClick={() => handleSwitchSession(user)}
                    className="flex-1 py-1.5 px-3 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Beralih peran dan uji tampilan menu sebagai pengguna ini"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Uji / Simulasi Role</span>
                  </button>
                ) : (
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5 px-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sedang Digunakan</span>
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(user)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                    title="Edit Pengguna & Hak Akses"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  {user.email !== 'admin@beekoding.id' && (
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id, user.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Pengguna"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Add / Edit User */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-3xl rounded-3xl border shadow-2xl p-6 transition-all my-8 max-h-[90vh] flex flex-col ${
              isDark ? 'bg-[#151928] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  {editingUser ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-extrabold text-base">
                    {editingUser ? `Edit Akun: ${editingUser.name}` : 'Tambah Pengguna Sistem Baru'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Konfigurasikan profil akun dan centang hak akses menu yang diizinkan.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSaveUser} className="flex-1 overflow-y-auto pr-1 py-4 space-y-5">
              {/* Form Validation Errors Banner */}
              {Object.keys(formErrors).length > 0 && Object.values(formErrors).some(Boolean) && (
                <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  <div className="space-y-1">
                    <p className="font-bold">Mohon periksa dan lengkapi data berikut:</p>
                    <ul className="list-disc list-inside text-[11px] space-y-0.5">
                      {Object.values(formErrors)
                        .filter(Boolean)
                        .map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Account Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Nama Lengkap */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Nama Lengkap *
                    </label>
                    {formTouched.name && (
                      <span className={`text-[10px] font-bold ${formErrors.name ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {formErrors.name ? '✕ Tidak Valid' : '✓ Valid'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => handleFieldChange('name', e.target.value, setFormName)}
                      onBlur={(e) => handleFieldBlur('name', e.target.value)}
                      placeholder="Contoh: Sarah Melati, S.Kom."
                      className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                        formTouched.name && formErrors.name
                          ? 'border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/5'
                          : formTouched.name && !formErrors.name && formName.trim().length >= 3
                          ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {formTouched.name && formErrors.name && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                      <span>⚠️ {formErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* 2. Email Pengguna */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Email Pengguna (Username Login) *
                    </label>
                    {formTouched.email && (
                      <span className={`text-[10px] font-bold ${formErrors.email ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {formErrors.email ? '✕ Tidak Valid' : '✓ Valid'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => handleFieldChange('email', e.target.value, setFormEmail)}
                      onBlur={(e) => handleFieldBlur('email', e.target.value)}
                      placeholder="mentor@beekoding.id"
                      className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                        formTouched.email && formErrors.email
                          ? 'border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/5'
                          : formTouched.email && !formErrors.email && formEmail.trim().length > 0
                          ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {formTouched.email && formErrors.email && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                      <span>⚠️ {formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* 3. Kata Sandi (Password) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Kata Sandi (Password) *
                    </label>
                    {formTouched.password && (
                      <span className={`text-[10px] font-bold ${formErrors.password ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {formErrors.password ? '✕ Kurang' : '✓ Aman'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showFormPassword ? 'text' : 'password'}
                      required={!editingUser}
                      value={formPassword}
                      onChange={(e) => handleFieldChange('password', e.target.value, setFormPassword)}
                      onBlur={(e) => handleFieldBlur('password', e.target.value)}
                      placeholder={editingUser ? 'Kosongkan jika tidak ingin diubah' : 'Minimal 6 karakter'}
                      className={`w-full pl-9 pr-10 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                        formTouched.password && formErrors.password
                          ? 'border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/5'
                          : formTouched.password && !formErrors.password && formPassword.trim().length >= 6
                          ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowFormPassword(!showFormPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      {showFormPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {formTouched.password && formErrors.password ? (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                      <span>⚠️ {formErrors.password}</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">
                      {editingUser ? 'Isi hanya jika ingin memperbarui kata sandi staf.' : 'Minimal 6 karakter kombinasi huruf atau angka.'}
                    </p>
                  )}
                </div>

                {/* 4. Peran (Role) Utama */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Peran (Role) Utama *
                    </label>
                    {formTouched.role && (
                      <span className={`text-[10px] font-bold ${formErrors.role ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {formErrors.role ? '✕ Pilih Role' : '✓ Terpilih'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formRole}
                      onChange={(e) => {
                        handleRoleChangeInForm(e.target.value as UserRole);
                        handleFieldChange('role', e.target.value, () => {});
                      }}
                      onBlur={(e) => handleFieldBlur('role', e.target.value)}
                      className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                        formTouched.role && formErrors.role
                          ? 'border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/5'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-amber-500'
                      }`}
                    >
                      <option value="instructor">Instruktur / Mentor Pengajar</option>
                      <option value="administrator">Super Administrator</option>
                      <option value="counselor">Konselor Akademik & Student Advisor</option>
                      <option value="custom">Kustom (Peran Khusus)</option>
                    </select>
                  </div>
                  {formTouched.role && formErrors.role && (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                      <span>⚠️ {formErrors.role}</span>
                    </p>
                  )}
                </div>

                {/* 5. Gelar / Jabatan Spesialisasi */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Gelar / Jabatan Spesialisasi
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={formRoleTitle}
                      onChange={(e) => setFormRoleTitle(e.target.value)}
                      placeholder="Contoh: Senior Coding Mentor & Python Specialist"
                      className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* 6. No. WhatsApp / Telepon */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                      No. WhatsApp / Telepon *
                    </label>
                    {formTouched.phone && (
                      <span className={`text-[10px] font-bold ${formErrors.phone ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {formErrors.phone ? '✕ Tidak Valid' : '✓ Valid'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => handleFieldChange('phone', e.target.value, setFormPhone)}
                      onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                      placeholder="Contoh: 081234567890 / +6281234567890"
                      className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 transition-all ${
                        formTouched.phone && formErrors.phone
                          ? 'border-rose-500/80 focus:ring-rose-500/30 bg-rose-500/5'
                          : formTouched.phone && !formErrors.phone && formPhone.trim().length >= 10
                          ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 text-white focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-amber-500'
                      }`}
                    />
                  </div>
                  {formTouched.phone && formErrors.phone ? (
                    <p className="text-[11px] text-rose-500 mt-1 font-medium flex items-center gap-1">
                      <span>⚠️ {formErrors.phone}</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Gunakan format Indonesia (awali 08 atau +628, 10-15 digit).
                    </p>
                  )}
                </div>

                {/* Foto Profil / Avatar */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Foto Avatar / Profil Staf (Supabase Storage)
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shrink-0 flex items-center justify-center">
                      <img
                        src={formAvatar || '/febri-hasan.png'}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/febri-hasan.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <label className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm">
                          {isUploadingStaffAvatar ? (
                            <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>{isUploadingStaffAvatar ? 'Mengunggah...' : 'Pilih Foto Baru'}</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleStaffAvatarUpload}
                            disabled={isUploadingStaffAvatar}
                            className="hidden"
                          />
                        </label>
                        {formAvatar && (
                          <button
                            type="button"
                            onClick={() => setFormAvatar('/febri-hasan.png')}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          >
                            Reset Default
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {formAvatar
                          ? formAvatar.startsWith('data:')
                            ? '💾 Disimpan di cache lokal (Base64)'
                            : formAvatar.startsWith('http')
                            ? '☁️ Tersimpan di Cloud Storage'
                            : 'Avatar bawaan sistem'
                          : 'Belum ada foto khusus, menggunakan default'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Akun */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Status Akun
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formStatus === 'active'}
                      onChange={() => setFormStatus('active')}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <span>Aktif (Dapat Login & Akses Menu)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formStatus === 'inactive'}
                      onChange={() => setFormStatus('inactive')}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <span className="text-slate-400">Non-Aktif (Akses Ditangguhkan)</span>
                  </label>
                </div>
              </div>

              {/* Preset Buttons for Quick Scope Assignment */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Pilih Menu yang Diizinkan ({formAllowedTabs.length} dari 25 Terpilih)
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('instructor')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                    >
                      Preset Instruktur (13 Menu)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyPreset('admin')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer"
                    >
                      Pilih Semua (25 Menu)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormAllowedTabs([])}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
                    >
                      Kosongkan
                    </button>
                  </div>
                </div>

                {/* Categorized Menu Checklist */}
                {formErrors.tabs && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2 mb-3 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>⚠️ {formErrors.tabs}</span>
                  </div>
                )}
                <div className="space-y-4 pt-1">
                  {MENU_CATEGORIES.map((cat) => {
                    const categoryTabIds = cat.items.map((i) => i.id);
                    const selectedCount = categoryTabIds.filter((id) => formAllowedTabs.includes(id)).length;
                    const allSelected = selectedCount === categoryTabIds.length;

                    return (
                      <div
                        key={cat.category}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2.5 pb-1.5 border-b border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                              {cat.category}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200 dark:bg-slate-800 text-slate-500">
                              {selectedCount}/{categoryTabIds.length}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleToggleCategory(categoryTabIds)}
                            className="text-[10px] font-bold text-amber-500 hover:underline cursor-pointer"
                          >
                            {allSelected ? 'Batal Pilih Kategori' : 'Pilih Semua Kategori'}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.items.map((item) => {
                            const isChecked = formAllowedTabs.includes(item.id);
                            return (
                              <label
                                key={item.id}
                                className={`p-2 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                                  isChecked
                                    ? 'bg-amber-500/10 border-amber-500/40 text-slate-900 dark:text-white'
                                    : isDark
                                    ? 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700'
                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleTab(item.id)}
                                  className="mt-0.5 rounded text-amber-500 focus:ring-amber-400 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-xs truncate">{item.label}</div>
                                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                    {item.desc}
                                  </div>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingUser}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 cursor-pointer transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingUser && <Sparkles className="w-3.5 h-3.5 animate-spin text-slate-950" />}
                  <span>
                    {isSavingUser
                      ? 'Menyimpan langsung ke Supabase...'
                      : editingUser
                      ? 'Simpan Perubahan Akun'
                      : 'Buat Pengguna Baru'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
