import React from 'react';
import { founderData } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Quote, Award, ArrowRight } from 'lucide-react';

export const Founder: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="founder"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090b10] border-amber-500/20' : 'bg-[#fbf9f3] border-amber-300/60'
      }`}
    >
      {/* Background glow */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

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
            <span>Kepemimpinan Akademik</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Visi <span className="text-gradient-honey">Pendiri Beekoding</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Dipimpin oleh praktisi pendidikan dan teknologi yang berdedikasi membangun ekosistem
            belajar yang ramah, hangat, dan berstandar global.
          </p>
        </div>

        <div
          className={`max-w-5xl mx-auto rounded-3xl p-8 sm:p-12 backdrop-blur-md shadow-2xl border transition-colors ${
            isDark
              ? 'bg-[#131723]/90 border-amber-500/30'
              : 'bg-white border-amber-300/80 shadow-amber-900/10'
          }`}
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Avatar & Badges Column */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-2xl shadow-amber-500/25">
                  <div
                    className={`w-full h-full rounded-[22px] flex flex-col items-center justify-center p-6 text-center overflow-hidden relative transition-colors ${
                      isDark ? 'bg-[#0e1119]' : 'bg-amber-50'
                    }`}
                  >
                    <div className="relative mb-3">
                      <img
                        src="/febri-hasan.png"
                        alt="Febri Hasan"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-2 border-amber-400"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/images/febri-hasan.png';
                        }}
                      />
                    </div>
                    <span
                      className={`text-lg font-bold font-['Space_Grotesk'] ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      Febri Hasan
                    </span>
                    <span
                      className={`text-xs font-semibold mt-0.5 ${
                        isDark ? 'text-amber-400' : 'text-amber-700'
                      }`}
                    >
                      Founder Beekoding
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 w-full max-w-xs">
                <div
                  className={`flex items-center justify-center gap-2 text-xs font-bold px-3 py-1.5 rounded-xl border ${
                    isDark
                      ? 'bg-[#1b2030] border-amber-500/30 text-amber-300'
                      : 'bg-amber-100/70 border-amber-300 text-amber-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>12+ Tahun Inovasi Pendidikan</span>
                </div>
              
              </div>
            </div>

            {/* Narrative & Quote Column */}
            <div className="md:col-span-8 space-y-6">
              <div>
                <h3
                  className={`text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {founderData.name}
                </h3>
                <p
                  className={`font-semibold text-sm mt-1 ${
                    isDark ? 'text-amber-400' : 'text-amber-700'
                  }`}
                >
                  {founderData.title}
                </p>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {founderData.credentials}
                </p>
              </div>

              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {founderData.bio1}
              </p>

              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {founderData.bio2}
              </p>

              {/* Quote block */}
              <div
                className={`p-6 rounded-2xl border-l-4 border-amber-500 relative shadow-sm ${
                  isDark
                    ? 'bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent bg-[#0c0f16]/90'
                    : 'bg-amber-50/70 border border-amber-200'
                }`}
              >
                <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4" />
                <p
                  className={`text-base sm:text-lg font-bold italic font-['Space_Grotesk'] leading-snug ${
                    isDark ? 'text-amber-100' : 'text-amber-950'
                  }`}
                >
                  "{founderData.quote}"
                </p>
                <span
                  className={`block text-xs font-bold mt-2 ${
                    isDark ? 'text-amber-400' : 'text-amber-700'
                  }`}
                >
                  — Febri Hasan, Founder Beekoding
                </span>
              </div>

              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 group"
                >
                  <span>Konsultasi Roadmap Kurikulum Sekolah Anda</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
