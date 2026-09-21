import React from 'react';
import { whyChooseUs } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="why-us"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0c0e15] border-amber-500/20' : 'bg-[#f4efe4] border-amber-300/50'
      }`}
    >
      {/* Background glow in honey amber */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
              isDark
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Kelebihan Kami</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Mengapa Memilih <span className="text-gradient-honey">Beekoding?</span>
          </h2>
          <p
            className={`text-lg sm:text-xl leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Kami tidak mendidik anak hanya untuk menghafal rumus.{' '}
            <strong className={isDark ? 'text-amber-400 font-semibold' : 'text-amber-700 font-bold'}>
              Kami melatih mereka menjadi pencipta masa depan yang percaya diri.
            </strong>
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-5xl mx-auto mb-16">
          {whyChooseUs.map((reason, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-200 flex items-start gap-4 group shadow-md ${
                isDark
                  ? 'bg-[#131723]/90 border-amber-500/20 hover:border-amber-400/50 hover:bg-[#181e2e]'
                  : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-amber-900/5'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  isDark
                    ? 'bg-amber-500/15 border border-amber-500/30 group-hover:bg-amber-500/25'
                    : 'bg-amber-100 border border-amber-300 group-hover:bg-amber-200'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-amber-500" />
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm sm:text-base font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-200 group-hover:text-white'
                      : 'text-slate-800 group-hover:text-slate-950'
                  }`}
                >
                  {reason}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership Banner with Bee Mascot */}
        <div
          className={`max-w-5xl mx-auto rounded-3xl p-8 sm:p-10 border-2 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-[#181d2a] via-[#141824] to-[#181d2a] border-amber-500/40 text-white'
              : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-400 text-slate-900 shadow-amber-900/10'
          }`}
        >
          <div className="flex items-center gap-6">
            <img
              src="/bee-mascot.png"
              alt="Beekoding Mascot"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0 drop-shadow-lg"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div
                className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Kemitraan Transformasi Sekolah & Lab Coding</span>
              </div>
              <h3
                className={`text-xl sm:text-2xl font-bold font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Siap hadirkan sarang teknologi & lab AI di sekolah Anda?
              </h3>
              <p
                className={`text-xs sm:text-sm max-w-xl ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Dapatkan paket kurikulum siap pakai, modul mobile planetarium kubah 360°, dan bimbingan guru profesional.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 hover:brightness-110 transition-all"
          >
            <span>Ajukan Kerjasama</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
