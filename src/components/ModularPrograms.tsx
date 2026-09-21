import React from 'react';
import { modularPrograms } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Bot,
  Glasses,
  Lightbulb,
  GraduationCap,
  TrendingUp,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

interface ModularProgramsProps {
  onSelectProgramForInquiry: (title: string) => void;
}

export const ModularPrograms: React.FC<ModularProgramsProps> = ({
  onSelectProgramForInquiry,
}) => {
  const { isDark } = useTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return Bot;
      case 'Glasses':
        return Glasses;
      case 'Lightbulb':
        return Lightbulb;
      case 'GraduationCap':
        return GraduationCap;
      case 'TrendingUp':
        return TrendingUp;
      default:
        return Sparkles;
    }
  };

  return (
    <section
      id="modules"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0c0e15] border-amber-500/20' : 'bg-[#f4efe4] border-amber-300/50'
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
            <span>Modul & Workshop Aplikatif</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Modul Pembelajaran <span className="text-gradient-honey">Spesifik & Fleksibel</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Sekolah dan komunitas dapat memilih modul spesifik (Robotik, VR 360°, Workshop AI)
            atau menggabungkannya sebagai paket kegiatan kurikuler yang berdampak tinggi.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modularPrograms.map((mod) => {
            const Icon = getIcon(mod.icon);

            return (
              <div
                key={mod.id}
                className={`rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between group shadow-lg ${
                  isDark
                    ? 'bg-[#131723]/90 border-amber-500/20 hover:border-amber-400/50 hover:bg-[#181d2c]'
                    : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-amber-900/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isDark
                          ? 'bg-amber-500/15 border border-amber-500/30 group-hover:bg-amber-500/25'
                          : 'bg-amber-100/70 border border-amber-300 group-hover:bg-amber-200/70'
                      }`}
                    >
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                          isDark
                            ? 'bg-[#1c2234] border-slate-700/80 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <Clock className="w-3 h-3 text-sky-500" />
                        {mod.duration}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold mb-1 font-['Space_Grotesk'] transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-amber-300'
                        : 'text-slate-900 group-hover:text-amber-600'
                    }`}
                  >
                    {mod.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold mb-4 italic ${
                      isDark ? 'text-amber-400/90' : 'text-amber-700'
                    }`}
                  >
                    {mod.tagline}
                  </p>

                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {mod.description}
                  </p>

                  <div
                    className={`space-y-2 pt-2 border-t mb-6 ${
                      isDark ? 'border-slate-800/80' : 'border-amber-100'
                    }`}
                  >
                    {mod.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between ${
                    isDark ? 'border-slate-800' : 'border-amber-100'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 text-xs ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{mod.students}</span>
                  </div>

                  <a
                    href="#contact"
                    onClick={() => onSelectProgramForInquiry(mod.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Ajukan Modul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
