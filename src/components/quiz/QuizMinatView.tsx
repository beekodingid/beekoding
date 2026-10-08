import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  QUIZ_QUESTIONS,
  ARCHETYPES,
  calculateQuizResult,
  generateWhatsAppShareUrl,
  generateWhatsAppConsultationUrl,
  type DigitalArchetypeKey,
  type DigitalArchetype,
} from '../../data/quizMinatData';
import { ConfettiCelebration } from '../talent/ConfettiCelebration';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
  Copy,
  Check,
  Award,
  Zap,
  Compass,
  Star,
  Users,
} from 'lucide-react';

interface QuizMinatViewProps {
  onBackToHome: () => void;
  onOpenTrialEvents?: () => void;
}

type QuizStep = 'intro' | 'question' | 'calculating' | 'result';

const AGE_OPTIONS = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const QuizMinatView: React.FC<QuizMinatViewProps> = ({
  onBackToHome,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();

  // State
  const [step, setStep] = useState<QuizStep>('intro');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(9);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, DigitalArchetypeKey>>({});

  // Result state
  const [result, setResult] = useState<{
    primary: DigitalArchetype;
    secondary: DigitalArchetype;
    matchPercentage: number;
  } | null>(null);

  const [copiedLink, setCopiedLink] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = 'Kuis Minat Coding & AI Anak (1 Menit) | Beekoding';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = 'Beekoding - Next-Gen Coding & AI Academy for Kids';
    };
  }, [step]);

  const handleStartQuiz = () => {
    setStep('question');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const handleSelectOption = (target: DigitalArchetypeKey) => {
    const q = QUIZ_QUESTIONS[currentQuestionIndex];
    const newAnswers = { ...answers, [q.id]: target };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 180);
    } else {
      // Selesai kuis, transisi ke kalkulasi
      setStep('calculating');
      setTimeout(() => {
        const calculated = calculateQuizResult(newAnswers);
        setResult(calculated);
        setStep('result');
        setShowConfetti(true);
      }, 1000);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStep('intro');
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setShowConfetti(false);
  };

  const handleShareWhatsApp = () => {
    if (!result) return;
    const url = generateWhatsAppShareUrl(childName, result.primary, result.matchPercentage);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleConsultWhatsApp = () => {
    if (!result) return;
    const url = generateWhatsAppConsultationUrl(childName, childAge, result.primary);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    const shareUrl = window.location.origin + '/cek-minat-anak';
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 font-sans ${
        isDark ? 'bg-[#0a0d14] text-slate-100' : 'bg-[#fffdf9] text-slate-900'
      }`}
    >
      {showConfetti && <ConfettiCelebration onComplete={() => setShowConfetti(false)} />}

      {/* Top Floating Navbar */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
          isDark
            ? 'bg-[#0d111a]/90 border-slate-800'
            : 'bg-white/90 border-amber-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-sm font-bold">
              🐝
            </span>
            <span className="font-extrabold text-xs sm:text-sm font-['Space_Grotesk']">
              Beekoding <span className="text-amber-500">Kuis Minat</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[11px] font-extrabold border border-amber-500/30">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>1-2 Menit</span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* ========================================================================= */}
        {/* 1. INTRO / WELCOME SCREEN                                                 */}
        {/* ========================================================================= */}
        {step === 'intro' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Hero Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-500 shadow-xs">
                <Compass className="w-3.5 h-3.5" />
                <span>Analisis Potensi Digital Buah Hati</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight leading-tight">
                Cek Minat & Bakat <span className="text-gradient-honey">Koding Anak</span>
              </h1>

              <p
                className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Apakah buah hati Bunda seorang <span className="font-bold text-amber-500">Game Creator</span>,{' '}
                <span className="font-bold text-blue-500">Logic Sleuth</span>,{' '}
                <span className="font-bold text-teal-500">Web Designer</span>, atau{' '}
                <span className="font-bold text-purple-500">AI Builder</span>? Temukan gaya belajar digital terbaiknya dalam 5 pertanyaan santai!
              </p>

              {/* Social Proof Pill */}
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                <span>Diikuti 1.200+ Orang Tua di Indonesia</span>
                <span>•</span>
                <span className="flex items-center text-amber-500">
                  <Star className="w-3 h-3 fill-current inline mr-0.5" /> 4.9/5
                </span>
              </div>
            </div>

            {/* 4 Archetypes Preview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.values(ARCHETYPES).map((arch) => (
                <div
                  key={arch.key}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-white border-amber-200/80 shadow-xs'
                  }`}
                >
                  <span className="text-2xl mb-1 block">{arch.icon}</span>
                  <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{arch.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{arch.badge}</p>
                </div>
              ))}
            </div>

            {/* Form Input Personalization */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-5 ${
                isDark
                  ? 'bg-[#121624] border-amber-500/25 shadow-xl'
                  : 'bg-white border-amber-300 shadow-lg shadow-amber-900/5'
              }`}
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Nama Panggilan Ananda (Opsional)
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Contoh: Kenzo / Alya"
                  className={`w-full px-4 py-3 rounded-2xl text-sm border transition-all ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Usia Ananda Saat Ini: <span className="font-extrabold text-amber-500">{childAge} Tahun</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AGE_OPTIONS.map((age) => (
                    <button
                      type="button"
                      key={age}
                      onClick={() => setChildAge(age)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        childAge === age
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-black scale-105'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartQuiz}
                className="w-full py-4 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 text-slate-950 hover:brightness-110 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Mulai Kuis 1 Menit Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. QUESTION SCREEN                                                        */}
        {/* ========================================================================= */}
        {step === 'question' && currentQ && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Navigation & Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <button
                  type="button"
                  onClick={handlePreviousQuestion}
                  className="hover:text-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>
                <span>
                  Pertanyaan <span className="text-amber-500">{currentQuestionIndex + 1}</span> dari{' '}
                  {QUIZ_QUESTIONS.length}
                </span>
                <span className="font-extrabold text-amber-500">{progressPercent}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                isDark
                  ? 'bg-[#121624] border-slate-800 shadow-xl'
                  : 'bg-white border-amber-200 shadow-lg shadow-amber-900/5'
              }`}
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-500 mb-2 block">
                  Soal #{currentQuestionIndex + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] leading-snug">
                  {currentQ.question}
                </h3>
                <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {currentQ.subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = answers[currentQ.id] === option.target;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(option.target)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3.5 cursor-pointer group ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-400 ring-2 ring-amber-500/30'
                          : isDark
                          ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:border-amber-500/50 hover:bg-slate-800/80'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                        {option.icon}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-xs sm:text-sm leading-snug">{option.text}</h4>
                        <p className={`text-[11px] sm:text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {option.subtext}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CALCULATING ANIMATION SCREEN                                           */}
        {/* ========================================================================= */}
        {step === 'calculating' && (
          <div className="text-center py-20 space-y-6 animate-in fade-in duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin" />
              <div className="w-full h-full flex items-center justify-center text-3xl">🧠</div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk']">
                Menganalisis Gaya Belajar {childName ? childName : 'Ananda'}...
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                Mencocokkan 4 arketipe kecerdasan digital & kurikulum coding Beekoding paling relevan.
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. RESULT SCREEN WITH VIRAL WHATSAPP SHARE                                */}
        {/* ========================================================================= */}
        {step === 'result' && result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header Result Badge */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Analisis Selesai</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk']">
                Arketipe Digital {childName ? childName : 'Ananda'}:
              </h2>
            </div>

            {/* Main Archetype Card */}
            <div
              className={`p-6 sm:p-9 rounded-3xl border relative overflow-hidden transition-all shadow-2xl ${
                isDark
                  ? 'bg-gradient-to-br from-[#121626] via-[#0e121d] to-[#151928] border-amber-500/30'
                  : 'bg-gradient-to-br from-white via-amber-50/40 to-amber-100/50 border-amber-300'
              }`}
            >
              {/* Glow Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header Archetype Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg shadow-amber-500/30 ring-4 ring-amber-400/20">
                    {result.primary.icon}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-amber-500">
                        {result.primary.badge}
                      </span>
                      <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        {result.matchPercentage}% Cocok
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
                      {result.primary.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-400">
                      "{result.primary.tagline}"
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  {result.primary.description}
                </p>

                {/* 3 Superpowers */}
                <div className="space-y-2 pt-2 border-t border-slate-700/20 dark:border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>3 Kekuatan Super Alami {childName ? childName : 'Ananda'}</span>
                  </h4>
                  <div className="space-y-1.5">
                    {result.primary.superpowers.map((power, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200"
                      >
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="font-medium">{power}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rekomendasi Kurikulum Belajar Beekoding */}
                <div className="space-y-3 pt-2 border-t border-slate-700/20 dark:border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Rekomendasi Modul Belajar Beekoding</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.primary.recommendedModules.map((mod, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                          isDark
                            ? 'bg-slate-900/80 border-slate-800'
                            : 'bg-white/90 border-amber-200 shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {mod.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            Jenjang {mod.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          {mod.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Potensi Karier Masa Depan */}
                <div className="pt-2 border-t border-slate-700/20 dark:border-slate-800 text-xs flex flex-wrap items-center gap-2">
                  <span className="font-bold text-slate-400">Peluang Masa Depan:</span>
                  {result.primary.futureCareers.map((career, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full bg-slate-500/10 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* VIRAL SHARE SECTION: WhatsApp Paguyuban & Salin Link */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-4 text-center ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/80 border-emerald-300'
              }`}
            >
              <div className="space-y-1">
                <span className="text-2xl">📲</span>
                <h4 className="text-lg font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Ajak Teman & Grup Paguyuban Sekolah Ikut Kuis Ini!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Bagikan hasil kuis {childName ? childName : 'ananda'} ke grup WhatsApp orang tua agar bisa saling membandingkan tipe arketipe digital anak lainnya.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Bagikan ke Grup WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-4 py-3.5 rounded-2xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 cursor-pointer ${
                    copiedLink
                      ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500'
                      : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Tersalin!' : 'Salin Link Kuis'}</span>
                </button>
              </div>
            </div>

            {/* ACTION CTA: Claim Free Trial Class */}
            <div
              className={`p-6 sm:p-7 rounded-3xl border space-y-4 text-center ${
                isDark
                  ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-yellow-500/10 border-amber-500/30'
                  : 'bg-gradient-to-r from-amber-100/60 via-amber-50 to-yellow-100/60 border-amber-300'
              }`}
            >
              <div className="space-y-1">
                <span className="text-2xl">🎁</span>
                <h4 className="text-xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Klaim Free Trial Class Sesuai Minat Ananda
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Coba 1 sesi kelas online interaktif gratis bersama mentor ramah Beekoding untuk memverifikasi langsung antusiasme belajar {childName ? childName : 'ananda'}.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleConsultWhatsApp}
                  className="px-7 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Konsultasi & Klaim Trial via WhatsApp</span>
                </button>

                {onOpenTrialEvents && (
                  <button
                    type="button"
                    onClick={onOpenTrialEvents}
                    className="px-5 py-3.5 rounded-2xl font-bold text-xs sm:text-sm border border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-all cursor-pointer"
                  >
                    Lihat Jadwal Workshop
                  </button>
                )}
              </div>
            </div>

            {/* Repeat Quiz Button */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis untuk Anak Lain</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Minimal */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-700/20">
        <p>© 2026 Beekoding. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
};
