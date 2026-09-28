import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../data/content';
import {
  MessageCircle,
  X,
  Sparkles,
  GraduationCap,
  Gift,
  Brain,
  Building2,
  ChevronRight,
  Send,
} from 'lucide-react';

interface QuickQuestion {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  query: string;
  tagColor: string;
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'schedule-pricing',
    icon: GraduationCap,
    title: 'Info Biaya & Jadwal Kelas',
    subtitle: 'Opsi jadwal hari/jam & detail biaya program',
    query: 'Halo Beekoding, saya ingin tanya informasi biaya dan jadwal kelas Coding & AI terbaru untuk anak.',
    tagColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 'free-trial',
    icon: Gift,
    title: 'Daftar Free Trial Class',
    subtitle: 'Coba 1 sesi kelas interaktif 100% gratis',
    query: 'Halo Beekoding, saya ingin mendaftarkan anak saya untuk Free Trial Class Coding & AI gratis.',
    tagColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 'talent-test',
    icon: Brain,
    title: 'Konsultasi Hasil Tes Bakat',
    subtitle: 'Diskusi rekomendasi jalur belajar anak',
    query: 'Halo Beekoding, saya ingin konsultasi mengenai rekomendasi jalur belajar berdasarkan hasil Tes Bakat Digital anak saya.',
    tagColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
  },
  {
    id: 'school-collab',
    icon: Building2,
    title: 'Kerjasama Sekolah / In-House',
    subtitle: 'Ekstrakurikuler, workshop & kemitraan kurikulum',
    query: 'Halo Beekoding, saya tertarik untuk mendiskusikan program ekstrakurikuler atau workshop coding di sekolah/organisasi kami.',
    tagColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  },
];

export const FloatingWhatsApp: React.FC = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectQuestion = (queryText: string) => {
    const url = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(queryText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end">
      {/* Quick Question Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Menu Bantuan Cepat WhatsApp"
          className={`mb-3 w-[calc(100vw-2.5rem)] sm:w-[380px] rounded-3xl shadow-2xl overflow-hidden border backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${
            isDark
              ? 'bg-[#131722]/95 border-amber-500/30 text-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
              : 'bg-white/95 border-amber-400/50 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.2)]'
          }`}
        >
          {/* Card Header */}
          <div className="relative p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-white/90 p-1 flex items-center justify-center shadow-md">
                  <img src="/bee-mascot.png" alt="Mascot Beekoding" className="w-8 h-8 object-contain" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-base leading-tight">Si Lebah Beekoding</h3>
                  <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                </div>
                <p className="text-xs font-medium text-amber-950/80 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                  Online • Siap Membantu
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Tutup menu pertanyaan cepat"
              className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-slate-950 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 sm:p-5 space-y-3.5 max-h-[62vh] overflow-y-auto">
            {/* Greeting speech bubble */}
            <div
              className={`p-3.5 rounded-2xl rounded-tl-sm text-xs sm:text-sm leading-relaxed border ${
                isDark
                  ? 'bg-slate-800/70 border-slate-700/60 text-slate-200'
                  : 'bg-amber-50/80 border-amber-200/60 text-slate-700'
              }`}
            >
              <p>
                Halo Ayah & Bunda! 👋 Mau konsultasi kelas coding, jadwal, atau promo trial gratis untuk anak tercinta? Pilih topik di bawah yuk:
              </p>
            </div>

            {/* Quick Question Buttons */}
            <div className="space-y-2">
              {QUICK_QUESTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectQuestion(item.query)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center gap-3 group hover:scale-[1.01] ${
                      isDark
                        ? 'bg-slate-800/40 hover:bg-amber-500/10 border-slate-700/50 hover:border-amber-500/40'
                        : 'bg-slate-50 hover:bg-amber-50/80 border-slate-200 hover:border-amber-400/50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${item.tagColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold truncate group-hover:text-amber-500 transition-colors">
                        {item.title}
                      </p>
                      <p
                        className={`text-[11px] truncate ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-1 border-t border-slate-200 dark:border-slate-800">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Langsung via WhatsApp</span>
                <Send className="w-3.5 h-3.5 opacity-80" />
              </a>
              <p
                className={`text-[10px] text-center mt-2 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Nomor Resmi: {siteConfig.phoneDisplay}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Mascot & Action Trigger */}
      <div className="flex items-center gap-3">
        {/* Speech bubble / tooltip toggle */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Buka menu pertanyaan cepat"
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl rounded-br-none border shadow-xl backdrop-blur-md text-xs font-bold transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-[#181d2a]/95 border-amber-500/40 text-amber-300 shadow-amber-500/10'
                : 'bg-white/95 border-amber-400/60 text-slate-800 shadow-slate-900/10'
            }`}
          >
            <span>Ada pertanyaan? Tanya Si Lebah yuk!</span>
            <img src="/bee-mascot.png" alt="Mascot" className="w-5 h-5 object-contain" />
          </button>
        )}

        {/* WhatsApp & Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup menu WhatsApp' : 'Buka menu pertanyaan cepat WhatsApp'}
          className="relative group focus:outline-none focus:ring-4 focus:ring-amber-400/40 rounded-full"
        >
          {/* Cute Mascot sitting on top of the button */}
          <div
            className={`absolute -top-7 -left-3 z-10 pointer-events-none transition-transform duration-300 ${
              isOpen ? 'opacity-0 scale-75' : 'group-hover:-translate-y-1.5'
            }`}
          >
            <img
              src="/bee-mascot.png"
              alt="Mascot"
              className="w-10 h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* Main Button Container */}
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative border-2 ${
              isOpen
                ? 'bg-slate-900 text-white border-amber-400 shadow-amber-500/30 rotate-90'
                : 'bg-gradient-to-tr from-emerald-800 to-teal-500 hover:from-emerald-600 hover:to-teal-300 text-slate-950 border-amber-400/50 shadow-emerald-500/40 hover:scale-105'
            }`}
          >
            {!isOpen && (
              <>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 animate-ping" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-300 border-2 border-[#0d0f15]" />
                <img
                  src="/whatsapp.png"
                  alt="WhatsApp Button"
                  className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-300"
                />
              </>
            )}

            {isOpen && <X className="w-6 h-6 text-amber-400 -rotate-90" />}
          </div>
        </button>
      </div>
    </div>
  );
};
