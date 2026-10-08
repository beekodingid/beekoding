import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Download, X, Smartphone, CheckCircle2, Share, PlusSquare, Sparkles, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_STORAGE_KEY = 'beekoding_pwa_dismissed_until';
const DISMISS_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 hari

export const PWAInstallPrompt: React.FC = () => {
  const { isDark } = useTheme();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);
  const [showAlreadyInstalledToast, setShowAlreadyInstalledToast] = useState(false);
  const [showIosGuideModal, setShowIosGuideModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. Cek apakah perangkat iOS
    const isIOSDevice =
      typeof navigator !== 'undefined' &&
      /iphone|ipad|ipod/i.test(navigator.userAgent || '') &&
      !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    // 2. Cek apakah sudah berjalan di mode standalone (sudah terpasang)
    const checkStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(checkStandalone);

    if (checkStandalone) {
      return;
    }

    // 3. Cek apakah user pernah menekan "Nanti" dalam periode dismiss
    const dismissedUntil = localStorage.getItem(DISMISS_STORAGE_KEY);
    const isDismissed = dismissedUntil && Date.now() < Number(dismissedUntil);

    // 4. Listener event beforeinstallprompt (Android / Chrome Desktop / Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      if (!isDismissed) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 3500);
        return () => clearTimeout(timer);
      }
    };

    // 5. Listener jika aplikasi berhasil di-install
    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      setShowIosGuideModal(false);
      setInstalledSuccess(true);
      setTimeout(() => {
        setInstalledSuccess(false);
      }, 4500);
    };

    // 6. Manual trigger listener dari Navbar / Footer
    const handleManualTrigger = () => {
      // Re-check standalone
      const standaloneActive =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      if (standaloneActive) {
        setShowAlreadyInstalledToast(true);
        setTimeout(() => setShowAlreadyInstalledToast(false), 3500);
        return;
      }

      if (isIOSDevice) {
        setShowIosGuideModal(true);
      } else if (deferredPrompt) {
        setIsVisible(true);
      } else {
        // Fallback jika browser desktop atau Android tanpa prompt tertunda
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('beekoding:open-pwa-install', handleManualTrigger);

    // Untuk iOS Safari yang tidak memiliki event beforeinstallprompt, tampilkan saran setelah delay jika belum di-dismiss
    let iosTimer: ReturnType<typeof setTimeout> | null = null;
    if (isIOSDevice && !isDismissed && !checkStandalone) {
      iosTimer = setTimeout(() => {
        setIsVisible(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('beekoding:open-pwa-install', handleManualTrigger);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setIsVisible(false);
      setShowIosGuideModal(true);
      return;
    }

    if (deferredPrompt) {
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
    } else {
      // Jika browser tidak mendukung direct prompt (misal desktop Chrome sudah terpasang atau Safari Mac)
      setShowIosGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now() + DISMISS_DURATION_MS));
  };

  return (
    <>
      {/* Toast: Sudah terpasang sebelumnya */}
      {showAlreadyInstalledToast && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold shadow-2xl border border-amber-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">
              Aplikasi Beekoding sudah terpasang dan aktif di perangkat Anda! 🚀
            </span>
          </div>
        </div>
      )}

      {/* Toast: Berhasil terpasang baru saja */}
      {installedSuccess && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 animate-bounce">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold shadow-2xl border border-emerald-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs sm:text-sm">
              Hebat! Aplikasi Beekoding berhasil ditambahkan ke Layar Utama Anda.
            </span>
          </div>
        </div>
      )}

      {/* Floating Prompt Card (Banner Bawah) */}
      {isVisible && !isStandalone && (
        <div
          role="dialog"
          aria-label="Pasang Aplikasi Beekoding"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:right-auto sm:left-6 z-50 max-w-sm sm:max-w-md animate-fadeIn"
        >
          <div
            className={`p-4 sm:p-5 rounded-3xl border shadow-2xl backdrop-blur-xl relative transition-all duration-300 ${
              isDark
                ? 'bg-[#121624]/95 border-amber-500/30 text-white shadow-black/70'
                : 'bg-[#fffdfa]/95 border-amber-300 text-slate-900 shadow-amber-950/20'
            }`}
          >
            {/* Tombol Tutup / Dismiss */}
            <button
              type="button"
              onClick={handleDismiss}
              className={`absolute top-3.5 right-3.5 p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-amber-100'
              }`}
              aria-label="Tutup saran instalasi"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5">
              {/* App Icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px] flex-shrink-0 shadow-md shadow-amber-500/30">
                <div
                  className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#0f131f]' : 'bg-white'
                  }`}
                >
                  <img src="/icon-192.png" alt="Beekoding App" className="w-9 h-9 object-contain" />
                </div>
              </div>

              <div className="flex-1 pr-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Smartphone className="w-3 h-3" />
                    Aplikasi Web (PWA)
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-500 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    Hemat Kuota
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold leading-snug">
                  Pasang Beekoding di Layar HP
                </h4>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {isIOS
                    ? 'Akses cepat kuis minat, asesmen bakat, & materi coding layaknya aplikasi resmi App Store.'
                    : 'Buka tes bakat, portal raport siswa, & kurikulum instan tanpa browser, lebih cepat & hemat memori.'}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-3.5">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isIOS ? 'Lihat Cara Pasang' : 'Pasang Sekarang'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      isDark
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/60'
                    }`}
                  >
                    Nanti
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Panduan Instalasi Khusus iOS Safari / Desktop Manual */}
      {showIosGuideModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Panduan Pasang Aplikasi Beekoding"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowIosGuideModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 relative transition-all duration-300 ${
              isDark
                ? 'bg-[#121624] border-amber-500/30 text-white'
                : 'bg-[#fffdfa] border-amber-300 text-slate-900'
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowIosGuideModal(false)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-amber-100'
              }`}
              aria-label="Tutup panduan"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px] shadow-lg shadow-amber-500/30 flex-shrink-0">
                <div
                  className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#0f131f]' : 'bg-white'
                  }`}
                >
                  <img src="/icon-192.png" alt="Beekoding App" className="w-9 h-9 object-contain" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {isIOS ? 'Pengguna iPhone & iPad' : 'Panduan Pasang Layar'}
                </span>
                <h3 className="text-base sm:text-lg font-black mt-1">
                  Pasang Beekoding di Layar Utama
                </h3>
              </div>
            </div>

            {/* Steps Guide */}
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </div>
                <div>
                  <p className="font-bold flex items-center gap-1.5">
                    Ketuk tombol Bagikan (Share)
                    <Share className="w-4 h-4 text-sky-400 inline-block" />
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {isIOS
                      ? 'Terletak di bilah bawah Safari (ikon kotak dengan panah mengarah ke atas).'
                      : 'Atau buka menu titik tiga di browser Chrome/Edge Anda.'}
                  </p>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </div>
                <div>
                  <p className="font-bold flex items-center gap-1.5">
                    Pilih &apos;Tambahkan ke Layar Utama&apos;
                    <PlusSquare className="w-4 h-4 text-emerald-400 inline-block" />
                  </p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Geser opsi ke bawah pada menu pop-up sampai menemukan opsi <em>Add to Home Screen</em>.
                  </p>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <div className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </div>
                <div>
                  <p className="font-bold">Ketuk &apos;Tambah&apos; (Add)</p>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Ikon aplikasi Beekoding akan langsung muncul di layar utama gadget Anda layaknya aplikasi native!
                  </p>
                </div>
              </div>
            </div>

            {/* Keunggulan PWA */}
            <div className={`mt-5 p-3 rounded-2xl text-[11px] flex items-center gap-2 ${
              isDark ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-amber-100/70 text-amber-900 border border-amber-300'
            }`}>
              <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Tanpa App Store:</strong> Lebih ringan (di bawah 1 MB), tanpa registrasi Apple ID/Play Store yang rumit, dan selalu ter-update otomatis.
              </span>
            </div>

            {/* Tombol Mengerti */}
            <button
              type="button"
              onClick={() => setShowIosGuideModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 cursor-pointer transition-all"
            >
              Saya Mengerti, Terima Kasih!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
