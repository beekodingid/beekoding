import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Download, X, Smartphone, CheckCircle2 } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_STORAGE_KEY = 'beekoding_pwa_dismissed_until';
const DISMISS_DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 hari

export const PWAInstallPrompt: React.FC = () => {
  const { isDark } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // 1. Cek apakah sudah berjalan di mode standalone (sudah terpasang)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      // @ts-expect-error - navigator.standalone is iOS Safari specific
      window.navigator.standalone === true;

    if (isStandalone) {
      return;
    }

    // 2. Cek apakah user pernah menekan "Nanti Saja" belum lama ini
    const dismissedUntil = localStorage.getItem(DISMISS_STORAGE_KEY);
    const isDismissed = dismissedUntil && Date.now() < Number(dismissedUntil);

    // 3. Listener event beforeinstallprompt dari browser
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (!isDismissed) {
        // Tampilkan prompt setelah delay kecil agar tidak mengganggu first paint
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    };

    // 4. Listener jika aplikasi berhasil di-install
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(true);
      setInstalledSuccess(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsVisible(false);
      }
      setDeferredPrompt(null);
    } catch {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Simpan ke localStorage agar tidak muncul lagi selama 3 hari
    localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now() + DISMISS_DURATION_MS));
  };

  if (!isVisible) {
    return null;
  }

  // Notifikasi sukses setelah berhasil dipasang
  if (installedSuccess) {
    return (
      <div className="fixed bottom-6 left-4 sm:left-6 z-50 animate-bounce">
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-2xl">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs sm:text-sm">Aplikasi Beekoding berhasil dipasang di layar Anda!</span>
        </div>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label="Pasang Aplikasi Beekoding"
      className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 max-w-sm sm:max-w-md animate-fadeIn"
    >
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-2xl backdrop-blur-xl relative transition-all duration-300 ${
          isDark
            ? 'bg-[#121624]/95 border-amber-500/30 text-white shadow-black/60'
            : 'bg-[#fffdfa]/95 border-amber-300 text-slate-900 shadow-amber-950/15'
        }`}
      >
        {/* Tombol Tutup / Dismiss */}
        <button
          type="button"
          onClick={handleDismiss}
          className={`absolute top-3.5 right-3.5 p-1.5 rounded-full transition-colors ${
            isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-amber-100'
          }`}
          aria-label="Tutup saran instalasi"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* App Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px] flex-shrink-0 shadow-md shadow-amber-500/30">
            <div className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden ${isDark ? 'bg-[#0f131f]' : 'bg-white'}`}>
              <img src="/icon-192.png" alt="Beekoding App" className="w-9 h-9 object-contain" />
            </div>
          </div>

          <div className="flex-1 pr-6">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-black uppercase tracking-wider text-amber-500 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" />
                Aplikasi Web (PWA)
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-extrabold leading-snug">
              Pasang Beekoding di HP / Layar Anda
            </h4>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Buka asesmen bakat, portal siswa, & kurikulum instan tanpa browser, lebih hemat kuota.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3.5">
              <button
                type="button"
                onClick={handleInstallClick}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Pasang Sekarang</span>
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/60'
                }`}
              >
                Nanti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
