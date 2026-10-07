import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { X, ChevronDown, ChevronUp, Megaphone } from 'lucide-react';

interface AdSenseStickyFooterProps {
  slotId?: string;
  onVisibilityChange?: (isVisible: boolean) => void;
}

export const AdSenseStickyFooter: React.FC<AdSenseStickyFooterProps> = ({
  slotId = '5878990472',
  onVisibilityChange,
}) => {
  const { isDark } = useTheme();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isPushedRef = useRef(false);

  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-6361492236129824';
  const isLiveAdSense = Boolean(adsenseClientId && adsenseClientId.startsWith('ca-pub-'));

  // Cek apakah user sudah menutup iklan di sesi ini
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('beekoding_sticky_ad_dismissed') === 'true';
      if (dismissed) {
        setIsDismissed(true);
      }
    }
  }, []);

  // Monitor scroll: tampilkan setelah scroll melewati 350px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isVisible = hasScrolled && !isDismissed;

  // Beritahu parent component untuk penyesuaian posisi floating action bar
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible && !isCollapsed);
    }
  }, [isVisible, isCollapsed, onVisibilityChange]);

  // Push AdSense hanya sekali ketika terlihat
  useEffect(() => {
    if (isVisible && isLiveAdSense && !isPushedRef.current && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushedRef.current = true;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          console.debug('Sticky footer ad init skipped or handled:', err);
        }
      }
    }
  }, [isVisible, isLiveAdSense]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('beekoding_sticky_ad_dismissed', 'true');
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  if (!hasScrolled || isDismissed) {
    return null;
  }

  return (
    <aside
      aria-label="Iklan Sponsor Melayang"
      style={{ contain: 'layout paint' }}
      className={`fixed bottom-0 inset-x-0 z-30 transition-transform duration-300 ease-in-out ${
        isCollapsed ? 'translate-y-[calc(100%-28px)]' : 'translate-y-0'
      }`}
    >
      <div
        className={`max-w-4xl mx-auto border-t sm:border-x sm:rounded-t-2xl shadow-2xl backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#0f131d]/95 border-amber-500/30 text-white shadow-black/80'
            : 'bg-white/95 border-amber-300/80 text-slate-900 shadow-slate-900/15'
        }`}
      >
        {/* Top Control Bar (AdSense Policy Compliant Label + Actions) */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-1.5 border-b border-amber-500/15 text-[10px] font-bold">
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <Megaphone className="w-3 h-3 text-amber-500" />
            <span>Sponsor Edukasi</span>
            <span className="hidden sm:inline text-slate-400 font-normal lowercase">• google adsense</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleToggleCollapse}
              className="px-2 py-0.5 rounded-md hover:bg-amber-500/10 text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
              title={isCollapsed ? 'Buka Iklan' : 'Kecilkan Iklan'}
            >
              <span>{isCollapsed ? 'Buka' : 'Sembunyikan'}</span>
              {isCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-md hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Tutup Iklan untuk Sesi Ini"
              aria-label="Tutup Iklan"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ad Container with Fixed Height & Anti-CLS */}
        {!isCollapsed && (
          <div className="p-2 sm:p-2.5 flex justify-center items-center overflow-hidden min-h-[60px] sm:min-h-[90px] max-h-[100px]">
            {isLiveAdSense ? (
              <div className="w-full flex justify-center">
                <ins
                  className="adsbygoogle block w-full"
                  style={{ display: 'inline-block', width: '100%', height: '90px', maxHeight: '90px' }}
                  data-ad-client={adsenseClientId}
                  data-ad-slot={slotId}
                  data-ad-format="horizontal"
                  data-full-width-responsive="true"
                />
              </div>
            ) : (
              <div className="w-full py-2 px-3 rounded-lg bg-amber-500/10 border border-dashed border-amber-400/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                    Ruang Iklan Sticky Footer AdSense (Anti-CLS Mode)
                  </span>
                </div>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono hidden sm:inline">
                  320x50 / 728x90 Auto Responsive
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
