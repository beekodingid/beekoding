import React from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Brain, Cpu, Lightbulb, Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { isDark } = useTheme();

  const pillars = [
    {
      title: 'Thinkers',
      desc: 'Membangun cara berpikir logis, computational thinking, dan kemampuan analisa terstruktur sejak usia dini.',
      icon: Brain,
      color: isDark ? 'from-amber-500/20 to-amber-500/5' : 'from-amber-100/70 to-amber-50/30',
      border: isDark ? 'border-amber-500/30' : 'border-amber-300',
      iconColor: 'text-amber-500',
      tag: 'Logika & Nalar',
    },
    {
      title: 'Creators',
      desc: 'Mengubah anak dari sekadar pengguna gadget pasif menjadi kreator yang aktif merancang game, animasi, dan bot AI.',
      icon: Cpu,
      color: isDark ? 'from-yellow-500/20 to-yellow-500/5' : 'from-yellow-100/70 to-yellow-50/30',
      border: isDark ? 'border-yellow-500/30' : 'border-yellow-300',
      iconColor: 'text-amber-500',
      tag: 'Kreativitas Coding',
    },
    {
      title: 'Innovators',
      desc: 'Mengasah kepekaan memecahkan masalah nyata lingkungan dan kehidupan sehari-hari menggunakan teknologi terapan.',
      icon: Lightbulb,
      color: isDark ? 'from-sky-500/20 to-sky-500/5' : 'from-sky-100/70 to-sky-50/30',
      border: isDark ? 'border-sky-500/30' : 'border-sky-300',
      iconColor: 'text-sky-500',
      tag: 'Solusi Digital',
    },
    {
      title: 'Implementers',
      desc: 'Menanamkan disiplin eksekusi proyek, ketekunan menyelesaikan bug, kerjasama tim, dan kemampuan presentasi karya.',
      icon: Target,
      color: isDark ? 'from-orange-500/20 to-orange-500/5' : 'from-orange-100/70 to-orange-50/30',
      border: isDark ? 'border-orange-500/30' : 'border-orange-300',
      iconColor: 'text-orange-500',
      tag: 'Karya & Portofolio',
    },
  ];

  const comparisonPoints = [
    { old: 'Hafalan teori ujian semata', modern: 'Praktik langsung membuat game & aplikasi yang berfungsi' },
    { old: 'Pasif menatap layar gadget', modern: 'Produktif berkarya dengan Scratch, Python, dan AI Tools' },
    { old: 'Kurikulum kaku & membosankan', modern: 'Petualangan belajar interaktif bersama maskot Bee yang seru' },
    { old: 'Belajar secara terisolasi', modern: 'Kolaborasi tim & pameran karya akhir (Demo Day)' },
  ];

  return (
    <section
      id="about"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0c0e15] border-amber-500/20' : 'bg-[#f4efe4] border-amber-300/50'
      }`}
    >
      {/* Background glow in honey amber */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Comparison */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                isDark
                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                  : 'bg-amber-100 border border-amber-300 text-amber-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tentang Beekoding</span>
            </div>

            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-['Space_Grotesk'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Lebih dari Belajar Coding.{' '}
              <br />
              <span className="text-gradient-honey">Membangun Masa Depan Gemilang.</span>
            </h2>

            <p
              className={`text-lg leading-relaxed font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {siteConfig.aboutText1}
            </p>

            <p
              className={`text-base leading-relaxed font-light ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {siteConfig.aboutText2}
            </p>

            {/* Philosophy Card */}
            <div
              className={`p-6 rounded-2xl border-l-4 border-amber-500 shadow-md ${
                isDark
                  ? 'bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent bg-[#141824]/80'
                  : 'bg-white/90 border border-amber-200 shadow-amber-900/5'
              }`}
            >
              <p
                className={`text-lg font-bold italic font-['Space_Grotesk'] ${
                  isDark ? 'text-amber-200' : 'text-amber-950'
                }`}
              >
                "{siteConfig.aboutQuote}"
              </p>
              <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                — Filosofi Pembelajaran Beekoding
              </p>
            </div>

            {/* Old vs New Way Comparison */}
            <div className="pt-4 space-y-3">
              <h3
                className={`text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'text-amber-400' : 'text-amber-800'
                }`}
              >
                Mengapa Belajar di Sarang Inovasi Beekoding?
              </h3>
              <div className="space-y-2.5">
                {comparisonPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm transition-colors ${
                      isDark
                        ? 'bg-[#141824]/90 border-slate-800'
                        : 'bg-white border-amber-200/80 shadow-sm'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span
                        className={`line-through text-xs mr-2 ${
                          isDark ? 'text-slate-400' : 'text-slate-400'
                        }`}
                      >
                        {item.old}
                      </span>
                      <span
                        className={`font-semibold block sm:inline ${
                          isDark ? 'text-slate-100' : 'text-slate-800'
                        }`}
                      >
                        {item.modern}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 4 Capability Pillars with Mascot Mini Badge */}
          <div className="lg:col-span-6 space-y-6">
            {/* Friendly Mascot Accent Box */}
            <div
              className={`p-4 rounded-2xl border flex items-center gap-4 shadow-lg transition-colors ${
                isDark
                  ? 'bg-gradient-to-r from-amber-500/10 via-[#181d2a] to-[#141824] border-amber-500/30'
                  : 'bg-white border-amber-300 shadow-amber-900/5'
              }`}
            >
              <img
                src="/bee-mascot.png"
                alt="Beekoding Mascot"
                className="w-16 h-16 object-contain flex-shrink-0"
              />
              <div>
                <h4
                  className={`text-sm font-bold flex items-center gap-1.5 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span>Sarang Pembelajaran 4 Pilar Beekoding</span>
                  <span className="text-xs text-amber-500">🐝</span>
                </h4>
                <p
                  className={`text-xs mt-0.5 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  Setiap modul dirancang selangkah demi selangkah agar anak belajar dengan ceria dan penuh percaya diri.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl bg-gradient-to-b ${pillar.color} border ${pillar.border} backdrop-blur-sm hover:scale-[1.02] hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between ${
                      isDark ? 'bg-[#141824]/90' : 'bg-white shadow-md shadow-amber-900/5'
                    }`}
                  >
                    <div>
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border shadow-md ${
                          isDark
                            ? 'bg-[#0e1017] border-slate-700/80'
                            : 'bg-white border-amber-200'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                      </div>
                      <h4
                        className={`text-xl font-bold mb-2 font-['Space_Grotesk'] flex items-center justify-between ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        <span>{pillar.title}</span>
                        <span
                          className={`text-[11px] font-semibold ${
                            isDark ? 'text-amber-400/80' : 'text-amber-600'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </h4>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {pillar.desc}
                      </p>
                    </div>
                    <div
                      className={`mt-5 pt-3 border-t flex items-center justify-between text-xs ${
                        isDark
                          ? 'border-slate-800/80 text-slate-400'
                          : 'border-amber-200/60 text-slate-500'
                      }`}
                    >
                      <span>Fokus</span>
                      <span className="text-amber-500 font-bold">{pillar.tag}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
