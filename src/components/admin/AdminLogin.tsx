import React, { useState } from 'react';
import { loginWithSupabase } from '../../services/supabaseAuth';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  LogIn,
  CheckCircle2,
} from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToHome }) => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('admin@beekoding.id');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await loginWithSupabase(email, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Login gagal. Periksa kembali email dan kata sandi.');
      }
    } catch (err: any) {
      setError(err?.message || 'Terjadi kesalahan saat memproses login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFastLogin = async (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
    setIsLoading(true);
    try {
      const res = await loginWithSupabase(demoEmail, demoPass);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Login gagal.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login gagal.');
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
      <header className="p-4 sm:p-6 flex items-center justify-between relative z-10">
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
      </header>

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
              </div>

              {/* Quick Preset Info Card */}
              {/* <div
                className={`p-3 rounded-xl border text-xs space-y-2 ${
                  isDark
                    ? 'bg-amber-500/5 border-amber-500/20 text-slate-300'
                    : 'bg-amber-50/70 border-amber-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="font-bold text-[11px] uppercase tracking-wider text-amber-500">
                    Akun Uji Coba Multi-Role:
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block text-amber-500">👑 Super Admin</span>
                    <span className="text-slate-500 font-mono text-[10px]">admin@beekoding.id</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="font-bold block text-emerald-500">🎓 Mentor Pengajar</span>
                    <span className="text-slate-500 font-mono text-[10px]">mentor@beekoding.id</span>
                  </div>
                </div>
              </div> */}

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

              {/* 1-Click Fast Login Multi-Role Demo Buttons */}
              {/* <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleFastLogin('admin@beekoding.id', 'admin123')}
                  disabled={isLoading}
                  className={`py-2 px-3 rounded-xl font-bold text-[11px] border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800 hover:border-amber-500/40'
                      : 'bg-white border-slate-300 text-amber-700 hover:bg-amber-50 hover:border-amber-400 shadow-xs'
                  }`}
                  title="Masuk sebagai Super Administrator (Akses Penuh Semua Menu)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFastLogin('mentor@beekoding.id', 'mentor123')}
                  disabled={isLoading}
                  className={`py-2 px-3 rounded-xl font-bold text-[11px] border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-emerald-400 hover:bg-slate-800 hover:border-emerald-500/40'
                      : 'bg-white border-slate-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400 shadow-xs'
                  }`}
                  title="Masuk sebagai Instruktur / Mentor (Scope Menu Mengajar)"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Demo Mentor</span>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="p-4 text-center text-xs text-slate-400 relative z-10">
        © 2026 Beekoding Assessment Platform • Hak Akses Terbatas untuk Administrator
      </footer>
    </div>
  );
};
