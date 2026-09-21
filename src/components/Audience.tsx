import React from 'react';
import { targetAudience } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, BookOpen, Award, HeartHandshake, School } from 'lucide-react';

export const Audience: React.FC = () => {
  const { isDark } = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return BookOpen;
      case 'Award':
        return Award;
      case 'HeartHandshake':
        return HeartHandshake;
      case 'School':
        return School;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090b10] border-amber-500/20' : 'bg-[#fbf9f3] border-amber-300/60'
      }`}
    >
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
            <span>Ekosistem Sasaran</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Siapa yang <span className="text-gradient-honey">Kami Bimbing?</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Membuka gerbang inovasi teknologi untuk siswa, keluarga, dan para pendidik di setiap jenjang.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((item, idx) => {
            const Icon = getIcon(item.icon);

            return (
              <div
                key={idx}
                className={`p-8 rounded-2xl border hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center group shadow-md ${
                  isDark
                    ? 'bg-[#131723]/90 border-amber-500/20 hover:border-amber-400/50'
                    : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-amber-900/5'
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-md ${
                    isDark
                      ? 'bg-[#1a1f30] border border-amber-500/30 group-hover:bg-amber-500/15'
                      : 'bg-amber-50 border border-amber-300 group-hover:bg-amber-100'
                  }`}
                >
                  <Icon className="w-7 h-7 text-amber-500" />
                </div>

                <h3
                  className={`text-xl font-bold mb-1 font-['Space_Grotesk'] ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {item.title}
                </h3>
                <span
                  className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                    isDark ? 'text-amber-400/90' : 'text-amber-600'
                  }`}
                >
                  {item.subtitle}
                </span>

                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
