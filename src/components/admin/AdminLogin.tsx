import React, { useState } from 'react';
import {
  loginWithSupabase,
  resetPasswordInSystemUsers,
} from '../../services/supabaseAuth';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { useTheme } from '../../context/ThemeContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  LogIn,
  CheckCircle2,
  KeyRound,
  X,
  AlertCircle,
  PhoneCall,
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome?: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome: _onBackToHome }) => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State untuk Modal Lupa Kata Sandi
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [showForgotConfirm, setShowForgotConfirm] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotFeedback, setForgotFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotFeedback(null);

    const cleanPass = forgotNewPass.trim();
    const cleanConfirm = forgotConfirmPass.trim();

    if (cleanPass.length < 6) {
      setForgotFeedback({
        type: 'error',
        text: 'Kata sandi baru minimal harus 6 karakter.',
      });
      return;
    }

    if (cleanPass !== cleanConfirm) {
      setForgotFeedback({
        type: 'error',
        text: 'Konfirmasi kata sandi tidak cocok. Kata sandi baru dan konfirmasi kata sandi harus sama persis.',
      });
      return;
    }

    setForgotLoading(true);
    try {
      const res = await resetPasswordInSystemUsers(forgotEmail, cleanPass);
      if (res.success) {
        setForgotFeedback({ type: 'success', text: res.message });
        setEmail(forgotEmail);
        setPassword(cleanPass);
        setTimeout(() => {
          setShowForgotModal(false);
          setForgotNewPass('');
          setForgotConfirmPass('');
          setForgotFeedback(null);
        }, 1800);
      } else {
        setForgotFeedback({ type: 'error', text: res.message });
      }
    } catch (err: any) {
      setForgotFeedback({ type: 'error', text: err?.message || 'Gagal mengatur ulang kata sandi.' });
    } finally {
      setForgotLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginWithSupabase(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.');
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat memproses login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-hidden ${
        isDark ? 'bg-[#0d0f15] text-slate-100' : 'bg-[#fbf9f3] text-slate-800'
      }`}
    >
      {/* Background glowing blur effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar */}
      {/* <header className="p-4 sm:p-6 flex items-center justify-between relative z-10">
        <button
          type="button"
          onClick={onBackToHome}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors ${
            isDark
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website Utama</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </header> */}

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Brand Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-0.5 shadow-xl shadow-amber-500/30 mb-4 animate-bounce-subtle">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                  isDark ? 'bg-[#121520]' : 'bg-white'
                }`}
              >
                <img
                  src="/favicon.png"
                  alt="Beekoding Mascot"
                  className="w-11 h-11 object-contain"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-1.5">
              <span className="text-2xl font-black tracking-tight">
                bee<span className="text-amber-500">koding</span>
              </span>
              <span className="text-xs font-bold text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25">
                Admin Portal
              </span>
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pusat Pengelolaan Data Siswa & Bank Soal Asesmen Bakat Anak
            </p>
          </div>

          {/* Login Card Form */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
              isDark
                ? 'bg-[#151928]/95 border-amber-500/20 shadow-black/60 backdrop-blur-xl'
                : 'bg-white/95 border-amber-200 shadow-amber-900/10 backdrop-blur-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <h2 className="font-extrabold text-base tracking-tight">Autentikasi Petugas</h2>
              </div>
              <div className="flex items-center gap-2">
                {isSupabaseConfigured() ? (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    title="Terhubung ke Supabase Cloud Auth"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Cloud Auth
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    title="Mode Lokal Aktif (Offline Resilient)"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Mode Lokal
                  </span>
                )}
                <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">256-bit</span>
              </div>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium flex items-center gap-2.5">
                <span className="text-base">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email / Username */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                  Email / Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@beekoding.id"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark
                        ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Lupa Kata Sandi Trigger */}
                <div className="flex items-center justify-end pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(email);
                      setForgotFeedback(null);
                      setShowForgotModal(true);
                    }}
                    className="text-sm font-semibold text-amber-500 hover:text-amber-400 hover:underline transition-colors cursor-pointer"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Masuk</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="p-4 text-center text-xs text-slate-400 relative z-10">
        © 2026 Beekoding Assessment Platform • Hak Akses Terbatas untuk Administrator
      </footer>

      {/* Modal Lupa Kata Sandi */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all ${
              isDark
                ? 'bg-[#151928] border-amber-500/30 text-slate-100 shadow-black/80'
                : 'bg-white border-amber-200 text-slate-800 shadow-amber-900/15'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-dashed border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight">Pemulihan Kata Sandi</h3>
                  <p className="text-[11px] text-slate-400">Atur ulang akses portal staf BeeKoding</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6">
              {forgotFeedback && (
                <div
                  className={`mb-4 p-3.5 rounded-xl border text-xs font-medium flex items-start gap-2.5 ${
                    forgotFeedback.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                  }`}
                >
                  {forgotFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed">{forgotFeedback.text}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-3.5">
                {/* Email Terdaftar */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Email Terdaftar
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="88ihsan@gmail.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Kata Sandi Baru */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Kata Sandi Baru
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showForgotPass ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      placeholder="Minimal 6 karakter"
                      className={`w-full pl-10 pr-11 py-2 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotPass(!showForgotPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                    >
                      {showForgotPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Konfirmasi Kata Sandi Baru */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    {forgotConfirmPass.length > 0 && (
                      <span
                        className={`text-[11px] font-bold flex items-center gap-1 ${
                          forgotNewPass === forgotConfirmPass ? 'text-emerald-500' : 'text-rose-500'
                        }`}
                      >
                        {forgotNewPass === forgotConfirmPass ? '✓ Cocok' : '✕ Tidak cocok'}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showForgotConfirm ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={forgotConfirmPass}
                      onChange={(e) => setForgotConfirmPass(e.target.value)}
                      placeholder="Ketik ulang kata sandi baru"
                      className={`w-full pl-10 pr-11 py-2 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        forgotConfirmPass.length > 0
                          ? forgotNewPass === forgotConfirmPass
                            ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                            : 'border-rose-500/80 focus:ring-rose-500/30'
                          : isDark
                          ? 'bg-slate-900 border-slate-700 focus:ring-amber-500'
                          : 'bg-slate-50 border-slate-300 focus:ring-amber-500'
                      } ${
                        isDark ? 'bg-slate-900 text-white placeholder-slate-500' : 'bg-slate-50 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowForgotConfirm(!showForgotConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                    >
                      {showForgotConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {forgotConfirmPass.length > 0 && forgotNewPass !== forgotConfirmPass && (
                    <p className="text-[11px] text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
                      <span>⚠️ Kata sandi baru dan konfirmasi kata sandi harus sama persis.</span>
                    </p>
                  )}
                  {forgotConfirmPass.length > 0 && forgotNewPass === forgotConfirmPass && forgotNewPass.length >= 6 && (
                    <p className="text-[11px] text-emerald-500 mt-1.5 flex items-center gap-1 font-medium">
                      <span>✓ Kata sandi cocok dan siap disimpan.</span>
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={forgotLoading || (forgotConfirmPass.length > 0 && forgotNewPass !== forgotConfirmPass)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? (
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Simpan & Perbarui Kata Sandi</span>
                    </>
                  )}
                </button>
              </form>

              {/* Bantuan WhatsApp Super Admin */}
              <div className="mt-5 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 text-center">
                <p className="text-[11px] text-slate-400 mb-2">
                  Lupa email atau butuh bantuan verifikasi manual?
                </p>
                <a
                  href={`https://wa.me/6285311317127?text=${encodeURIComponent(
                    `Halo Super Admin BeeKoding, saya membutuhkan bantuan untuk reset kata sandi akun portal staf saya (${forgotEmail || email}). Mohon bantuannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Bantuan Super Admin via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

