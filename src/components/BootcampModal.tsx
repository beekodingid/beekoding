import React, { useEffect } from 'react';
import { bootcampCurriculum } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import {
  X,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  Layers,
  FileCheck,
  Send,
} from 'lucide-react';

interface BootcampModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollClick: () => void;
}

export const BootcampModal: React.FC<BootcampModalProps> = ({
  isOpen,
  onClose,
  onEnrollClick,
}) => {
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-4xl border-2 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[92vh] flex flex-col transition-colors ${
          isDark
            ? 'bg-[#10141e] border-amber-500/40 text-white'
            : 'bg-[#fffdf8] border-amber-400 text-slate-800 shadow-amber-900/20'
        }`}
      >
        {/* Header with Mascot */}
        <div
          className={`p-6 sm:p-8 border-b flex items-start justify-between relative transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#171c2b] via-[#121622] to-[#171c2b] border-amber-500/25'
              : 'bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-start gap-4 sm:gap-6">
            <img
              src="/bee-mascot.png"
              alt="Beekoding Mascot"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md flex-shrink-0"
            />
            <div className="space-y-1.5">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    : 'bg-amber-100 border border-amber-300 text-amber-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Summer 2026 Flagship Edition • Beekoding</span>
              </div>
              <h2
                className={`text-2xl sm:text-4xl font-black font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Summer AI & Coding <span className="text-gradient-honey">Bootcamp 2026</span>
              </h2>
              <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Program Junior AI & Coding Pioneer • 24 Sesi Hands-on untuk Siswa Grade 4–10.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2.5 rounded-full transition-colors ${
              isDark
                ? 'bg-[#1e2436] text-slate-300 hover:text-white hover:bg-amber-500/20'
                : 'bg-amber-100/80 text-slate-700 hover:text-slate-900 hover:bg-amber-200'
            }`}
            aria-label="Tutup jendela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div
          className={`px-6 sm:px-8 py-3.5 border-b flex flex-wrap items-center justify-between gap-4 text-xs font-semibold ${
            isDark
              ? 'bg-[#141824] border-amber-500/20 text-slate-300'
              : 'bg-amber-50/80 border-amber-200 text-slate-700'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
            <span>25 Hari Pelaksanaan / 24 Sesi Padat Karya</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-500" />
            <span className="text-amber-600 font-bold">Maksimal 25 Siswa per Kelas</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-500" />
            <span>Sertifikat Resmi Junior AI Expert</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="space-y-1">
            <h3
              className={`text-lg font-bold font-['Space_Grotesk'] flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Roadmap Kurikulum Lengkap 5 Fase</span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Disusun berjenjang dari pengenalan AI kreatif, logika coding visual, Python, machine learning, hingga peluncuran aplikasi mandiri.
            </p>
          </div>

          <div className="space-y-4">
            {bootcampCurriculum.map((phase, idx) => (
              <div
                key={idx}
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 ${
                  isDark
                    ? 'bg-[#141926] border-amber-500/20 hover:border-amber-400/50'
                    : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-600 font-black text-xs flex items-center justify-center border border-amber-500/40">
                      0{idx + 1}
                    </span>
                    <h4
                      className={`text-base sm:text-lg font-bold font-['Space_Grotesk'] ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {phase.title}
                    </h4>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-auto border ${
                      isDark
                        ? 'bg-[#1b2234] text-amber-300 border-amber-500/30'
                        : 'bg-amber-100/70 text-amber-900 border-amber-300'
                    }`}
                  >
                    {phase.days}
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-sm mb-4 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {phase.description}
                </p>

                <div
                  className={`grid sm:grid-cols-2 gap-2.5 pt-3 border-t ${
                    isDark ? 'border-slate-800' : 'border-amber-100'
                  }`}
                >
                  {phase.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Outcome & Certification Card */}
          <div
            className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
              isDark
                ? 'bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-transparent border-amber-500/40'
                : 'bg-amber-50/90 border-amber-300'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <FileCheck className="w-4 h-4" />
                <span>Portofolio Mandiri & Sertifikat Kelulusan</span>
              </div>
              <h5
                className={`text-base font-bold font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Setiap lulusan membawa pulang portofolio 3+ proyek AI siap pamer
              </h5>
              <p className={`text-xs max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Siswa belajar mempresentasikan idenya secara percaya diri, memiliki model machine learning sendiri, dan siap menghadapi era masa depan.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onEnrollClick();
              }}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:brightness-110 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Daftar Batch 2026</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 sm:p-6 border-t flex items-center justify-between text-xs transition-colors ${
            isDark
              ? 'bg-[#131724] border-slate-800 text-slate-400'
              : 'bg-amber-50/60 border-amber-200 text-slate-500'
          }`}
        >
          <span>Pendaftaran awal mendapatkan starter kit AI & stiker eksklusif Beekoding.</span>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl transition-colors ${
              isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-slate-700 hover:text-slate-900 hover:bg-amber-100'
            }`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
