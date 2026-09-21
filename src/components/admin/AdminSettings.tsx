import React, { useState } from 'react';
import {
  type AdminUser,
  getAdminProfile,
  updateAdminProfile,
  updateAdminPassword,
  exportFullSystemBackupJSON,
  resetEntireSystemToFactory,
  exportFullSystemMigrationSQLFile,
  generateFullSystemMigrationSQL,
  type SqlDialect,
  getSubmissions,
  getAllQuestions,
  getInquiries,
} from '../../services/adminStorage';
import {
  User,
  Lock,
  Bell,
  Database,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  Download,
  RotateCcw,
  Sparkles,
  Clock,
  Laptop,
  FileCode2,
  Copy,
  Check,
  X,
  Terminal,
} from 'lucide-react';

interface AdminSettingsProps {
  isDark: boolean;
  onProfileUpdated?: (user: AdminUser) => void;
  onRefreshAllData?: () => void;
}

type SettingsTab = 'profile' | 'security' | 'preferences' | 'backup';

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  isDark,
  onProfileUpdated,
  onRefreshAllData,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [profile, setProfile] = useState<AdminUser>(getAdminProfile());

  // Form State Profile
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [role, setRole] = useState(profile.role || '');
  const [institution, setInstitution] = useState(profile.institution || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [avatar, setAvatar] = useState(profile.avatar || '/febri-hasan.png');

  // Form State Password
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Preference Toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    profile.notificationsEnabled ?? true
  );
  const [leadAlertsEnabled, setLeadAlertsEnabled] = useState(
    profile.leadAlertsEnabled ?? true
  );
  const [soundEnabled, setSoundEnabled] = useState(profile.soundEnabled ?? true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    profile.twoFactorEnabled ?? false
  );

  // Status Alerts
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Factory Reset Confirmation Modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetConfirmInput, setResetConfirmInput] = useState('');

  // SQL Migration Modal State
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlDialect, setSqlDialect] = useState<SqlDialect>('postgresql');
  const [sqlModalTab, setSqlModalTab] = useState<'all' | 'ddl' | 'seed'>('all');
  const [sqlPreviewText, setSqlPreviewText] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  const handleOpenSqlModal = (dialect: SqlDialect = sqlDialect) => {
    const fullSql = generateFullSystemMigrationSQL(dialect);
    setSqlPreviewText(fullSql);
    setShowSqlModal(true);
    setCopiedSql(false);
  };

  const handleSwitchDialect = (newDialect: SqlDialect) => {
    setSqlDialect(newDialect);
    const fullSql = generateFullSystemMigrationSQL(newDialect);
    setSqlPreviewText(fullSql);
    setCopiedSql(false);
  };

  const handleCopySql = () => {
    let textToCopy = sqlPreviewText;
    if (sqlModalTab === 'ddl') {
      const splitIdx = sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI');
      textToCopy = splitIdx !== -1 ? sqlPreviewText.substring(0, splitIdx) : sqlPreviewText;
    } else if (sqlModalTab === 'seed') {
      const splitIdx = sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI');
      textToCopy = splitIdx !== -1 ? sqlPreviewText.substring(splitIdx) : sqlPreviewText;
    }
    navigator.clipboard.writeText(textToCopy);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // Counts for Backup tab
  const submissionsCount = getSubmissions().length;
  const questionsCount = Object.values(getAllQuestions()).reduce(
    (acc, list) => acc + (Array.isArray(list) ? list.length : 0),
    0
  );
  const inquiriesCount = getInquiries().length;

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage(null);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // 1. Simpan Perubahan Profil
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showError('Nama lengkap dan email tidak boleh kosong.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const updated = updateAdminProfile({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: role.trim(),
        institution: institution.trim(),
        bio: bio.trim(),
        avatar,
        notificationsEnabled,
        leadAlertsEnabled,
        soundEnabled,
        twoFactorEnabled,
      });

      setProfile(updated);
      setIsSaving(false);
      showSuccess('Profil administrator berhasil diperbarui dan tersimpan!');
      if (onProfileUpdated) {
        onProfileUpdated(updated);
      }
    }, 400);
  };

  // 2. Ganti Password
  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword) {
      showError('Harap masukkan password saat ini.');
      return;
    }
    if (newPassword.length < 6) {
      showError('Password baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showError('Konfirmasi password baru tidak cocok.');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const result = updateAdminPassword(oldPassword, newPassword);
      setIsSaving(false);
      if (result.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showSuccess('Password akun admin berhasil diubah! Kredensial baru sekarang aktif.');
      } else {
        showError(result.error || 'Gagal mengubah password.');
      }
    }, 400);
  };

  // 3. Simpan Preferensi
  const handleSavePreferences = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated = updateAdminProfile({
        notificationsEnabled,
        leadAlertsEnabled,
        soundEnabled,
        twoFactorEnabled,
      });
      setProfile(updated);
      setIsSaving(false);
      showSuccess('Preferensi sistem & notifikasi berhasil disimpan!');
      if (onProfileUpdated) {
        onProfileUpdated(updated);
      }
    }, 300);
  };

  // 4. Eksekusi Factory Reset
  const handleExecuteFactoryReset = () => {
    if (resetConfirmInput.trim() !== 'RESET') {
      showError('Ketik kata "RESET" dengan huruf kapital untuk mengonfirmasi.');
      return;
    }

    resetEntireSystemToFactory();
    setShowResetConfirm(false);
    setResetConfirmInput('');
    showSuccess('Seluruh database telah direset kembali ke setelan awal pabrik.');
    if (onRefreshAllData) {
      onRefreshAllData();
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, label: 'Kosong', color: 'bg-slate-300' };
    let score = 0;
    if (newPassword.length >= 6) score += 1;
    if (newPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(newPassword)) score += 1;
    if (/[0-9]/.test(newPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

    if (score <= 2) return { score: 33, label: 'Lemah', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'Sedang', color: 'bg-amber-500' };
    return { score: 100, label: 'Kuat & Aman', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Pengaturan */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-[#161a29] to-[#111420] border-amber-500/20'
            : 'bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border-amber-200 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Account & Security Settings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Pengaturan Akun & Sistem
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kelola profil administrator Anda, perbarui password login, atur preferensi notifikasi
            sistem, dan lakukan pencadangan data (*backup*) menyeluruh.
          </p>
        </div>

        {/* User Mini Identity Card */}
        <div
          className={`flex items-center gap-3.5 p-3.5 rounded-2xl border ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-amber-200 shadow-xs'
          }`}
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
            <img
              src={avatar || '/febri-hasan.png'}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('febri-hasan.png')) {
                  target.src = '/febri-hasan.png';
                } else {
                  target.src = '/bee-mascot.png';
                }
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-xs sm:text-sm truncate max-w-[180px]">
              {name || 'Administrator'}
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[180px]">{email}</div>
            <span className="inline-block mt-1 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/25">
              {role || 'Petugas Asesmen'}
            </span>
          </div>
        </div>
      </div>

      {/* Notifications Alert Banner */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center gap-3 text-xs sm:text-sm font-bold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center gap-3 text-xs sm:text-sm font-bold animate-fadeIn">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 overflow-x-auto pb-px">
        {[
          { id: 'profile' as SettingsTab, label: 'Profil Saya', icon: User },
          { id: 'security' as SettingsTab, label: 'Ganti Password & Keamanan', icon: Lock },
          { id: 'preferences' as SettingsTab, label: 'Preferensi & Notifikasi', icon: Bell },
          { id: 'backup' as SettingsTab, label: 'Database & Cadangan', icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setSuccessMessage(null);
                setErrorMessage(null);
              }}
              className={`py-3 px-4 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border-b-2 -mb-px ${
                isActive
                  ? 'border-amber-500 text-amber-500 bg-amber-500/10 font-black'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: PROFIL SAYA (MY PROFILE)                           */}
      {/* ========================================================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold mb-1">Informasi Pribadi & Kontak</h3>
            <p className="text-xs text-slate-400 mb-6">
              Detail ini akan ditampilkan pada portal admin dan kop laporan hasil asesmen siswa.
            </p>

            <div className="space-y-5">
              {/* Pilihan Avatar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Foto Profil / Avatar Petugas
                </label>
                <div className="flex flex-wrap items-center gap-4">
                  {[
                    { id: '/febri-hasan.png', label: 'Febri Hasan (Founder)' },
                    { id: '/bee-mascot.png', label: 'Maskot Beekoding' },
                    { id: '/bee-mascot-raw.png', label: 'Cyber Bee 3D' },
                  ].map((av) => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setAvatar(av.id)}
                      className={`p-2 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                        avatar === av.id
                          ? 'border-amber-500 bg-amber-500/10 text-amber-500 ring-2 ring-amber-500/20 font-bold'
                          : isDark
                          ? 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={av.id}
                        alt={av.label}
                        className="w-10 h-10 rounded-xl object-contain bg-slate-800/10"
                      />
                      <span className="text-xs pr-2">{av.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid 2 Kolom: Nama & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Lengkap Petugas"
                    required
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Alamat Email (Login Utama)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@beekoding.id"
                    required
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Grid 2 Kolom: WhatsApp & Jabatan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Nomor WhatsApp / Kontak Resmi
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+62 853-1131-7127"
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Jabatan / Role dalam Asesmen
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Lead Assessment Officer"
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Institusi / Lembaga */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Lembaga / Institusi Edukasi
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Beekoding & Akar Inti Teknologi"
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Bio Singkat */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Bio / Catatan Pengantar Profil
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  placeholder="Deskripsi singkat latar belakang pendidik atau instruktur..."
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan Profil'}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ========================================================= */}
      {/* TAB 2: KEAMANAN & GANTI PASSWORD (SECURITY & PASSWORD)    */}
      {/* ========================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Form Ganti Password */}
          <form onSubmit={handleSavePassword}>
            <div
              className={`p-6 sm:p-8 rounded-3xl border ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Perbarui Kata Sandi (Password)</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">
                Pastikan Anda menggunakan kata sandi yang aman dengan kombinasi huruf besar, angka,
                dan simbol.
              </p>

              <div className="space-y-4 max-w-xl">
                {/* Password Lama */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Password Saat Ini
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPass ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Masukkan password saat ini (default: admin123)"
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium pr-10 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password Baru */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium pr-10 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Bar */}
                  {newPassword && (
                    <div className="mt-2 space-y-1">
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>Kekuatan Password:</span>
                        <span className="font-bold text-slate-200">{strength.label}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Konfirmasi Password Baru */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ketik ulang password baru"
                      required
                      className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium pr-10 focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showConfirmPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSaving ? 'Menyimpan...' : 'Perbarui Password Akun'}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Sesi Login Aktif & 2FA */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold mb-4">Sesi & Keamanan Perangkat</h3>

            <div className="space-y-4">
              {/* Device Session Info */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm flex items-center gap-2">
                      <span>Peramban Web Aktif (Windows / Desktop)</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-bold">
                        Sesi Saat Ini
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>
                        Login Terakhir: {profile.lastLoginAt ? new Date(profile.lastLoginAt).toLocaleString('id-ID') : 'Hari ini'}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-bold text-emerald-500">Terverifikasi</span>
              </div>

              {/* Two Factor Authentication Switch */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm">
                      Verifikasi Dua Langkah (Two-Factor Authentication / 2FA)
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Meminta konfirmasi OTP tambahan saat login dari peramban baru.
                    </div>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorEnabled}
                    onChange={(e) => {
                      setTwoFactorEnabled(e.target.checked);
                      updateAdminProfile({ twoFactorEnabled: e.target.checked });
                      showSuccess(
                        e.target.checked
                          ? '2FA diaktifkan untuk perlindungan ekstra.'
                          : '2FA dinonaktifkan.'
                      );
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PREFERENSI & NOTIFIKASI                            */}
      {/* ========================================================= */}
      {activeTab === 'preferences' && (
        <div className="space-y-6 animate-fadeIn">
          <div
            className={`p-6 sm:p-8 rounded-3xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold mb-1">Pengaturan Notifikasi Sistem</h3>
            <p className="text-xs text-slate-400 mb-6">
              Tentukan bagaimana Anda ingin menerima peringatan aktivitas siswa dan konsultasi baru.
            </p>

            <div className="space-y-4">
              {/* Notifikasi Siswa Baru */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    Peringatan Hasil Tes Bakat Masuk (*Student Assessment Alert*)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Tampilkan badge notifikasi saat ada siswa yang menyelesaikan kuis 8 pilar.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Notifikasi Leads Konsultasi */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    Peringatan Permohonan Konsultasi & Pendaftaran (*Inquiries Alert*)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Tampilkan badge merah dan hitungan pesan baru di sidebar menu konsultasi.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={leadAlertsEnabled}
                    onChange={(e) => setLeadAlertsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Suara Efek */}
              <div
                className={`p-4 rounded-2xl border flex items-center justify-between ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    Efek Suara Notifikasi (*Audio Feedback*)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Bunyikan nada lembut saat aksi berhasil disimpan atau saat data baru masuk.
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={handleSavePreferences}
                disabled={isSaving}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Menyimpan...' : 'Simpan Preferensi'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: DATABASE & CADANGAN (BACKUP & RESET)               */}
      {/* ========================================================= */}
      {activeTab === 'backup' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Ringkasan Data Tersimpan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase">Submisi Tes Bakat</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-500 mt-1">
                {submissionsCount} <span className="text-xs font-normal text-slate-400">siswa</span>
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase">Bank Soal Kuis</div>
              <div className="text-2xl sm:text-3xl font-black text-blue-500 mt-1">
                {questionsCount} <span className="text-xs font-normal text-slate-400">pertanyaan</span>
              </div>
            </div>

            <div
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase">Konsultasi & Leads</div>
              <div className="text-2xl sm:text-3xl font-black text-purple-500 mt-1">
                {inquiriesCount} <span className="text-xs font-normal text-slate-400">permohonan</span>
              </div>
            </div>
          </div>

          {/* Ekspor & Migrasi Basis Data SQL */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden ${
              isDark
                ? 'bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/20 border-emerald-500/30'
                : 'bg-gradient-to-br from-white via-emerald-50/20 to-teal-50/30 border-emerald-200 shadow-sm'
            }`}
          >
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <h4 className="font-black text-base flex items-center gap-2">
                  <span>Migrasi Basis Data Relasional (.SQL)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                    33 Tabel • Production Ready
                  </span>
                </h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ekspor seluruh struktur tabel (DDL), relasi foreign key, indeks performa, views analitik
                dashboard, dan data aktif (DML) dalam format berkas query SQL standar. Pilih dialek database
                yang sesuai untuk menjamin 100% kompatibilitas tanpa error sintaks.
              </p>

              {/* Dialect Selector */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-400">Target Database:</span>
                <button
                  type="button"
                  onClick={() => setSqlDialect('postgresql')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    sqlDialect === 'postgresql'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <span>🐘 PostgreSQL / Supabase</span>
                  {sqlDialect === 'postgresql' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>}
                </button>
                <button
                  type="button"
                  onClick={() => setSqlDialect('mysql')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    sqlDialect === 'mysql'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 shadow-xs'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <span>🐬 MySQL / phpMyAdmin</span>
                  {sqlDialect === 'mysql' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleOpenSqlModal(sqlDialect)}
                className="px-4 py-3 rounded-xl text-xs font-bold border border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Lihat & Salin Query</span>
              </button>

              <button
                type="button"
                onClick={() => exportFullSystemMigrationSQLFile(sqlDialect)}
                className="px-5 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File .SQL ({sqlDialect === 'postgresql' ? 'PostgreSQL' : 'MySQL'})</span>
              </button>
            </div>
          </div>

          {/* Ekspor Backup JSON */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-amber-500" />
                <h4 className="font-bold text-base">Cadangkan Seluruh Database (.JSON)</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unduh salinan lengkap seluruh data siswa, data permohonan konsultasi, profil admin,
                dan butir-butir soal kuis dalam satu berkas format JSON terenkripsi lokal.
              </p>
            </div>

            <button
              type="button"
              onClick={exportFullSystemBackupJSON}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Cadangan JSON</span>
            </button>
          </div>

          {/* Danger Zone: Factory Reset */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border border-rose-500/30 ${
              isDark ? 'bg-rose-500/5' : 'bg-rose-50/50'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-500 font-bold text-sm sm:text-base mb-2">
              <AlertCircle className="w-5 h-5" />
              <span>Zona Berbahaya: Reset ke Pengaturan Awal Pabrik</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-2xl">
              Tindakan ini akan mengembalikan seluruh data submisi siswa, konsultasi, dan bank soal
              ke kondisi sampel awal Beekoding. Pastikan Anda telah mengunduh cadangan sebelum
              melanjutkan.
            </p>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="px-5 py-2.5 rounded-xl border border-rose-500/40 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Seluruh Sistem Database</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Factory Reset */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
              isDark ? 'bg-[#121520] border-rose-500/30 text-white' : 'bg-white border-rose-200 text-slate-900'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black">Konfirmasi Reset Sistem</h3>
              <p className="text-xs text-slate-400">
                Tindakan ini tidak dapat dibatalkan. Seluruh data yang belum dicadangkan akan
                terhapus permanen.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-500/10 border border-slate-500/20 text-xs">
              Ketik kata <strong className="text-rose-500 font-black">RESET</strong> di bawah ini
              untuk melanjutkan:
            </div>

            <input
              type="text"
              value={resetConfirmInput}
              onChange={(e) => setResetConfirmInput(e.target.value)}
              placeholder="Ketik RESET"
              className={`w-full px-4 py-2.5 rounded-xl border text-center font-black tracking-widest text-sm focus:outline-hidden ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-rose-500'
              }`}
            />

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  setResetConfirmInput('');
                }}
                className="flex-1 py-2.5 rounded-xl border text-xs font-bold text-slate-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleExecuteFactoryReset}
                disabled={resetConfirmInput.trim() !== 'RESET'}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white disabled:opacity-40 cursor-pointer shadow-md"
              >
                Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Preview & Copy SQL Migration */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm">
          <div
            className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
              isDark ? 'bg-[#121520] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-base sm:text-lg">Pratinjau Query SQL Migrasi BeeKoding</h3>
                    <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      v2.0.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    33 Tabel Relasional • Foreign Keys • Indexes • Analytical Dashboard Views
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick CLI Import Cheatsheet & Dialect Switcher */}
            <div
              className={`px-5 py-3 border-b text-xs flex flex-wrap items-center justify-between gap-3 shrink-0 ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-[11px] uppercase tracking-wider text-amber-500">
                  Dialek Basis Data:
                </span>
                <button
                  type="button"
                  onClick={() => handleSwitchDialect('postgresql')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sqlDialect === 'postgresql'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                      : 'bg-black/30 text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  🐘 PostgreSQL / Supabase
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchDialect('mysql')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sqlDialect === 'mysql'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                      : 'bg-black/30 text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  🐬 MySQL / MariaDB
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className="text-slate-400">CLI:</span>
                {sqlDialect === 'postgresql' ? (
                  <code className="px-2 py-0.5 rounded-md bg-black/40 text-sky-400 font-mono border border-white/5">
                    psql -U postgres -d beekoding_db -f migration.sql
                  </code>
                ) : (
                  <code className="px-2 py-0.5 rounded-md bg-black/40 text-emerald-400 font-mono border border-white/5">
                    mysql -u root -p beekoding_db &lt; migration.sql
                  </code>
                )}
              </div>
            </div>

            {/* Subtabs Filter */}
            <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSqlModalTab('all')}
                  className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
                    sqlModalTab === 'all'
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Semua (Turnkey Script)
                </button>
                <button
                  type="button"
                  onClick={() => setSqlModalTab('ddl')}
                  className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
                    sqlModalTab === 'ddl'
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Skema Saja (DDL)
                </button>
                <button
                  type="button"
                  onClick={() => setSqlModalTab('seed')}
                  className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
                    sqlModalTab === 'seed'
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Data Saja (DML)
                </button>
              </div>

              <div className="text-[11px] text-slate-400 hidden sm:block">
                Ukuran Query: {Math.round(sqlPreviewText.length / 1024)} KB
              </div>
            </div>

            {/* SQL Content Box */}
            <div className="flex-1 p-4 overflow-y-auto bg-[#0d1117] text-slate-300 font-mono text-xs leading-relaxed selection:bg-emerald-500 selection:text-black min-h-[250px] max-h-[450px]">
              <pre className="whitespace-pre-wrap break-words">
                {sqlModalTab === 'all' && sqlPreviewText}
                {sqlModalTab === 'ddl' &&
                  (sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI') !== -1
                    ? sqlPreviewText.substring(0, sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI'))
                    : sqlPreviewText)}
                {sqlModalTab === 'seed' &&
                  (sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI') !== -1
                    ? sqlPreviewText.substring(sqlPreviewText.indexOf('-- DATA AKTIF SISTEM SAAT INI'))
                    : sqlPreviewText)}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                💡 Query ini diekspor langsung dari data operasional BeeKoding saat ini.
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedSql ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSql ? 'Tersalin!' : 'Salin Query'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportFullSystemMigrationSQLFile(sqlDialect)}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh File .SQL ({sqlDialect === 'postgresql' ? 'PostgreSQL' : 'MySQL'})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
