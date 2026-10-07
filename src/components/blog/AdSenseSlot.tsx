import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Megaphone, ExternalLink, Sparkles } from 'lucide-react';

export interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'in-article';
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '5878990472',
  format = 'auto',
  className = '',
  label = 'Sponsor & Iklan Edukasi',
}) => {
  const { isDark } = useTheme();
  const adRef = useRef<HTMLDivElement>(null);
  const isPushedRef = useRef(false);
  const adsenseClientId = import.meta.env.VITE_ADSENSE_CLIENT_ID || 'ca-pub-6361492236129824';
  const isLiveAdSense = Boolean(adsenseClientId && adsenseClientId.startsWith('ca-pub-'));

  useEffect(() => {
    if (isLiveAdSense && !isPushedRef.current && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushedRef.current = true;
      } catch (err) {
        // Prevent console pollution from double push in StrictMode
        if (process.env.NODE_ENV !== 'production') {
          console.debug('AdSense slot init skipped or handled:', err);
        }
      }
    }
  }, [isLiveAdSense, slotId]);

  // Height reservation to guarantee 0 Cumulative Layout Shift (CLS)
  const minHeightClass =
    format === 'rectangle'
      ? 'min-h-[280px]'
      : format === 'horizontal'
      ? 'min-h-[120px]'
      : format === 'in-article'
      ? 'min-h-[160px] sm:min-h-[200px]'
      : 'min-h-[140px]';

  return (
    <div
      ref={adRef}
      style={{ contain: 'layout paint' }}
      className={`w-full my-6 p-3 sm:p-4 rounded-2xl border transition-all duration-300 ${minHeightClass} ${
        isDark
          ? 'bg-[#121622]/90 border-amber-500/20 shadow-inner shadow-black/20'
          : 'bg-amber-50/70 border-amber-200/80 shadow-xs'
      } ${className}`}
    >
      {/* Label AdSense Policy Compliant */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-amber-500/10 text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
        <span className="flex items-center gap-1.5">
          <Megaphone className="w-3 h-3 text-amber-500" />
          <span>{label}</span>
        </span>
        <span className="text-[9px] opacity-70">Google AdSense Partner</span>
      </div>

      {isLiveAdSense ? (
        <div className="overflow-hidden flex justify-center items-center min-h-[90px] w-full">
          {format === 'in-article' ? (
            <ins
              className="adsbygoogle block w-full"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-layout="in-article"
              data-ad-format="fluid"
              data-ad-layout-key="-fb+5w+4e-db+86"
              data-ad-client={adsenseClientId}
              data-ad-slot={slotId}
            />
          ) : (
            <ins
              className="adsbygoogle block w-full"
              style={{ display: 'block', textAlign: 'center' }}
              data-ad-client={adsenseClientId}
              data-ad-slot={slotId}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          )}
        </div>
      ) : (
        /* Preview / Placeholder Banner with Zero Layout Shift */
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-sky-500/10 border border-dashed border-amber-400/40 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Ruang Monetisasi Google AdSense (Preview)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              Unit iklan ini aktif otomatis begitu akun AdSense disetujui. Layout telah terkunci dengan reservasi tinggi tetap demi menjamin skor Core Web Vitals (CLS = 0).
            </p>
          </div>
          <a
            href="https://www.google.com/adsense/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-xs"
          >
            <span>Panduan AdSense</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
};
