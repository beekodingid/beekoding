import React from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, ArrowRight, Compass, Rocket, ChevronDown, Heart, Brain, Calendar } from 'lucide-react';

interface HeroProps {
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenTrialEvents?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-[96vh] flex flex-col justify-center pt-32 pb-20 overflow-hidden bg-honeycomb-pattern bg-radial-honey transition-colors duration-300"
    >
      {/* Background ambient lighting effects in honey gold and wing cyan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-honey-pulse" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-400/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Glowing Honey Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md shadow-lg transition-colors ${
                isDark
                  ? 'bg-[#1c202e]/90 border border-amber-500/40 text-amber-300 shadow-amber-500/10'
                  : 'bg-white/90 border border-amber-300 text-amber-900 shadow-amber-500/10'
              }`}
            >
              <span className="text-base">🐝</span>
              <span>{siteConfig.tagline}</span>
              <span className="hidden sm:inline text-amber-500/60">•</span>
              <span className={`hidden sm:inline ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Generasi Kreator Digital
              </span>
            </div>

            {/* Main Title */}
            <h1
              className={`text-4xl sm:text-6xl lg:text-6xl font-black tracking-tight leading-[1.14] font-['Space_Grotesk'] transition-colors ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Belajar Coding & AI Jadi Seru Bersama{' '}
              <span className="text-gradient-honey drop-shadow-sm">Beekoding</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal transition-colors ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              {siteConfig.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 xl:gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenTalentAssessment}
                className="whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 xl:px-7 py-3.5 xl:py-4 rounded-full text-sm xl:text-base font-extrabold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Brain className="w-5 h-5 flex-shrink-0 text-slate-950 animate-pulse" />
                <span className="whitespace-nowrap">Tes Bakat Anak</span>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 ml-1">
                  Gratis
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </button>

              <button
                onClick={onOpenBootcampModal}
                className={`whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 xl:px-7 py-3.5 xl:py-4 rounded-full text-sm xl:text-base font-bold shadow-lg hover:-translate-y-0.5 transition-all duration-200 group ${
                  isDark
                    ? 'bg-[#171b26]/90 hover:bg-[#1f2433] text-white border border-amber-500/40 hover:border-amber-400 shadow-amber-500/10'
                    : 'bg-white hover:bg-amber-50 text-slate-900 border border-amber-400/80 shadow-amber-500/10'
                }`}
              >
                <Rocket className="w-5 h-5 text-amber-500 group-hover:rotate-12 transition-transform flex-shrink-0" />
                <span className="whitespace-nowrap">Bootcamp 2026</span>
              </button>

              <a
                href="#programs"
                className={`whitespace-nowrap flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 xl:px-6 py-3.5 xl:py-4 rounded-full text-sm xl:text-base font-semibold border backdrop-blur-sm transition-all duration-200 ${
                  isDark
                    ? 'text-slate-300 hover:text-white border-slate-700/80 hover:border-amber-500/40 bg-[#121520]/60'
                    : 'text-slate-700 hover:text-slate-950 border-amber-300/80 hover:border-amber-500 bg-white/70'
                }`}
              >
                <Compass className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="whitespace-nowrap">Explore Program</span>
              </a>
            </div>

            {/* Trust Pill */}
            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <button
                type="button"
                onClick={onOpenTrialEvents}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all hover:scale-105 cursor-pointer font-bold ${
                  isDark
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25 shadow-xs'
                    : 'bg-amber-100/90 border-amber-300 text-amber-900 hover:bg-amber-200 shadow-xs'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Jadwal Trial Class & Workshop Gratis</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                  isDark ? 'bg-[#171a25] border-amber-500/20' : 'bg-white border-amber-200 shadow-sm'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Pendaftaran Batch Baru Dibuka</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors ${
                  isDark ? 'bg-[#171a25] border-amber-500/20' : 'bg-white border-amber-200 shadow-sm'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                <span>Ramah & Menyenangkan untuk Pemula</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bee Mascot Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[420px] flex items-center justify-center">
              {/* Radial glow ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-sky-400/20 rounded-full blur-3xl" />

              {/* Speech bubble above mascot */}
              <div className="absolute -top-6 right-2 sm:right-6 z-20 animate-bounce duration-1000">
                <div
                  className={`border-2 border-amber-400 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-2xl text-xs font-bold flex items-center gap-2 ${
                    isDark ? 'bg-[#1c2130] text-slate-100' : 'bg-white text-slate-900 shadow-amber-900/10'
                  }`}
                >
                  <span className="text-base">🐝</span>
                  <span>Bzz! Yuk belajar coding bareng aku! ✨</span>
                </div>
              </div>

              {/* Central Mascot Container */}
              <div className="relative z-10 animate-bee-float flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  {/* Decorative golden honey pedestal circle */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 bg-amber-500/20 rounded-[100%] blur-md" />

                  {/* The Bee Mascot Image */}
                  <img
                    src="/bee-mascot.png"
                    alt="Beekoding Mascot"
                    className="w-64 sm:w-80 h-auto object-contain drop-shadow-[0_20px_35px_rgba(245,158,11,0.35)] hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Floating Interactive Badge Pills */}
                <div className="w-full mt-4 flex flex-wrap justify-center gap-2 z-20">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                      isDark
                        ? 'bg-[#181d2a]/95 border-amber-500/40 text-amber-300'
                        : 'bg-white/95 border-amber-300 text-amber-900 shadow-amber-500/10'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Visual Scratch & Python</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                      isDark
                        ? 'bg-[#181d2a]/95 border-sky-400/40 text-sky-300'
                        : 'bg-white/95 border-sky-300 text-sky-900 shadow-sky-500/10'
                    }`}
                  >
                    <span>🤖</span>
                    <span>AI & Machine Learning</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
                      isDark
                        ? 'bg-[#181d2a]/95 border-amber-500/40 text-yellow-300'
                        : 'bg-white/95 border-amber-300 text-amber-900 shadow-amber-500/10'
                    }`}
                  >
                    <span>🏆</span>
                    <span>Sertifikat Resmi</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid Banner with Theme Adaptive Classes */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group ${
                isDark
                  ? 'bg-[#141824]/80 border-amber-500/20 hover:border-amber-400/50 hover:bg-[#1a1f30]'
                  : 'bg-white/90 border-amber-200/90 hover:border-amber-400 hover:bg-white shadow-md shadow-amber-900/5'
              }`}
            >
              <div className="text-2xl sm:text-4xl font-black text-amber-500 mb-1 font-['Space_Grotesk'] tracking-tight group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div
                className={`text-xs sm:text-sm font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div> */}

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <a
            href="#about"
            className="text-amber-500/80 hover:text-amber-400 transition-colors p-2 animate-bounce"
            aria-label="Scroll ke Bawah"
          >
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};
