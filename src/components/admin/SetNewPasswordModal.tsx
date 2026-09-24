import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { updateUserPassword } from '../../services/supabaseAuth';
import { Lock, KeyRound, Eye, EyeOff, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface SetNewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (savedPassword: string) => void;
}

export const SetNewPasswordModal: React.FC<SetNewPasswordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isDark } = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const cleanPass = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (cleanPass.length < 6) {
      setFeedback({
        type: 'error',
        text: 'Kata sandi baru minimal harus 6 karakter.',
      });
      return;
    }

    if (cleanPass !== cleanConfirm) {
      setFeedback({
        type: 'error',
        text: 'Konfirmasi kata sandi tidak cocok. Kata sandi baru dan konfirmasi kata sandi harus sama persis.',
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await updateUserPassword(cleanPass);
      if (res.success) {
        setFeedback({
          type: 'success',
          text: res.message,
        });

        // Bersihkan token dari URL bar untuk keamanan
        if (typeof window !== 'undefined' && window.history) {
          window.history.replaceState(null, '', window.location.pathname + '#admin');
        }

        setTimeout(() => {
          if (onSuccess) {
            onSuccess(cleanPass);
          } else {
            onClose();
          }
        }, 1800);
      } else {
        setFeedback({
          type: 'error',
          text: res.message,
        });
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err?.message || 'Gagal menyimpan kata sandi baru.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-[#151928] border-amber-500/30 text-slate-100 shadow-black/80'
            : 'bg-white border-amber-200 text-slate-800 shadow-amber-900/15'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">Buat Kata Sandi Baru</h3>
              <p className="text-[11px] text-slate-400">Sesi pemulihan akun staf terverifikasi</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {feedback && (
            <div
              className={`mb-4 p-3.5 rounded-xl border text-xs font-medium flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 dark:text-emerald-400'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{feedback.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Kata Sandi Baru */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Konfirmasi Kata Sandi Baru */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Konfirmasi Kata Sandi Baru
                </label>
                {confirmPassword.length > 0 && (
                  <span
                    className={`text-[11px] font-bold flex items-center gap-1 ${
                      newPassword === confirmPassword ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {newPassword === confirmPassword ? '✓ Cocok' : '✕ Tidak cocok'}
                  </span>
                )}
              </div>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi baru"
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                    confirmPassword.length > 0
                      ? newPassword === confirmPassword
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                <p className="text-[11px] text-rose-500 mt-1.5 flex items-center gap-1 font-medium">
                  <span>⚠️ Kata sandi baru dan konfirmasi kata sandi harus sama persis.</span>
                </p>
              )}
              {confirmPassword.length > 0 && newPassword === confirmPassword && newPassword.length >= 6 && (
                <p className="text-[11px] text-emerald-500 mt-1.5 flex items-center gap-1 font-medium">
                  <span>✓ Kata sandi cocok dan siap disimpan.</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (confirmPassword.length > 0 && newPassword !== confirmPassword)}
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Simpan Kata Sandi Baru</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
