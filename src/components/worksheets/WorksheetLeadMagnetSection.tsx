import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PRINTABLE_WORKSHEETS } from '../../data/worksheetsData';
import { Download, Printer, Sparkles, CheckCircle2, ArrowRight, Gift } from 'lucide-react';

interface WorksheetLeadMagnetSectionProps {
  onOpenWorksheets: () => void;
}

export const WorksheetLeadMagnetSection: React.FC<WorksheetLeadMagnetSectionProps> = ({
  onOpenWorksheets,
}) => {
  const { isDark } = useTheme();

  return (
    <section
      id="worksheet-gratis"
      className={`py-16 sm:py-20 relative overflow-hidden border-y transition-colors duration-300 ${
        isDark
          ? 'bg-[#0b0e16] border-amber-500/20'
          : 'bg-gradient-to-b from-amber-50/80 via-[#fbf9f3] to-amber-50/40 border-amber-300/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`rounded-3xl p-6 sm:p-10 lg:p-12 border-2 transition-all ${
            isDark
              ? 'bg-gradient-to-br from-[#131926] via-[#0f1420] to-[#0b0e17] border-amber-500/35 shadow-2xl shadow-amber-500/5'
              : 'bg-white border-amber-400 shadow-xl shadow-amber-500/10'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                <Gift className="w-3.5 h-3.5" />
                <span>Bonus Orang Tua • 100% Gratis (PDF A4)</span>
              </div>

              <h2
                className={`text-2xl sm:text-4xl font-black tracking-tight font-['Space_Grotesk'] leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Download Gratis: <span className="text-amber-500">6 Lembar Kerja Logika Koding</span>, Labirin &amp; Mewarnai Beeby!
              </h2>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Ingin anak belajar berpikir logis tanpa harus terus menatap layar HP? Unduh paket{' '}
                <strong>Printable Logic Worksheets (Unplugged Coding)</strong> untuk dicetak di rumah
                — lengkap dengan kunci jawaban &amp; nama anak tertera di lembar kerja!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  '🐝 Labirin Algoritma Beeby (Usia 5–8 Thn)',
                  '🔍 Detektif Pola & Dekomposisi Roket',
                  '🐞 Misi Debugging: Cari Kesalahan Kode',
                  '🎨 Mewarnai Maskot Beeby & Pixel Art',
                  '🤖 Sandi Rahasia Biner & Pohon AI',
                  '🎮 Blueprint Perancang Game Scratch/Roblox',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenWorksheets}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Ambil 6 Paket Worksheet Gratis (PDF)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <span
                  className={`text-xs font-semibold flex items-center gap-1.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5 text-amber-500" />
                  Siap cetak ukuran A4 • Dilengkapi Kunci Jawaban
                </span>
              </div>
            </div>

            {/* Right Interactive Preview Stack */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {PRINTABLE_WORKSHEETS.slice(0, 4).map((ws) => (
                  <div
                    key={ws.id}
                    onClick={onOpenWorksheets}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all hover:-translate-y-1 ${
                      isDark
                        ? 'bg-[#0b0f17] border-slate-800 hover:border-amber-500/50'
                        : 'bg-amber-50/60 border-amber-200 hover:border-amber-400 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{ws.iconEmoji}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500/20 text-amber-500">
                        PDF A4
                      </span>
                    </div>
                    <div
                      className={`text-xs font-black font-['Space_Grotesk'] line-clamp-2 mb-1 ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {ws.title}
                    </div>
                    <div className="text-[11px] font-semibold text-amber-500">
                      {ws.ageRange}
                    </div>
                  </div>
                ))}
              </div>
              <div
                onClick={onOpenWorksheets}
                className={`mt-3 p-3 rounded-xl border text-center text-xs font-bold cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                    : 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/70'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                Lihat Seluruh 6 Misi + Bundel Lengkap 6-in-1 &rarr;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
