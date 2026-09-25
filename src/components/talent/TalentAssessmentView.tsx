import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  type UserProfile,
  type AssessmentResult,
  calculateAssessmentResult,
} from '../../data/talentQuestions';
import { TalentOnboarding } from './TalentOnboarding';
import { TalentQuizRunner } from './TalentQuizRunner';
import { TalentResultView } from './TalentResultView';
import { ArrowLeft } from 'lucide-react';
import { saveSubmission } from '../../services/adminStorage';

interface TalentAssessmentViewProps {
  onClose: () => void;
}

type AssessmentStep = 'onboarding' | 'quiz' | 'result';

export const TalentAssessmentView: React.FC<TalentAssessmentViewProps> = ({ onClose }) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('onboarding');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleStartQuiz = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setCurrentStep('quiz');
  };

  const handleFinishQuiz = (answers: Record<string, string>) => {
    if (!profile) return;
    const computedResult = calculateAssessmentResult(profile, answers);
    saveSubmission(computedResult, answers);
    setResult(computedResult);
    setCurrentStep('result');
  };

  const handleRetake = () => {
    setResult(null);
    setCurrentStep('onboarding');
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-[#0d0f15] text-slate-100' : 'bg-[#fbf9f3] text-slate-800'
      }`}
    >
      {/* Top Sticky Header */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors py-3.5 px-4 sm:px-8 ${
          isDark
            ? 'bg-[#0d0f15]/90 border-amber-500/20'
            : 'bg-white/90 border-amber-200 shadow-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Back button & Brand Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-[2px] shadow-md shadow-amber-500/30">
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#121520]' : 'bg-white'
                  }`}
                >
                  <img
                    src="/beekoding-logo.png"
                    alt="Beekoding Mascot"
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                    <span
                className={`text-lg sm:text-xl font-black tracking-tight flex items-center font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Bee<span className="text-amber-500">koding</span>
              </span>
                    <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      Talenta
                    </span>
                  </div>
            </div>
          </div>

          {/* Stepper Pill Indicator */}
          <div className="hidden md:flex items-center gap-2 text-xs font-semibold">
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                currentStep === 'onboarding'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'text-slate-400 border-transparent'
              }`}
            >
              1. Profil Anak
            </span>
            <span className="text-slate-500">➔</span>
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                currentStep === 'quiz'
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                  : 'text-slate-400 border-transparent'
              }`}
            >
              2. Asesmen 8 Babak
            </span>
            <span className="text-slate-500">➔</span>
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                currentStep === 'result'
                  ? 'bg-emerald-500 text-white font-bold border-emerald-400'
                  : 'text-slate-400 border-transparent'
              }`}
            >
              3. Hasil & Radar
            </span>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main View Body */}
      <main className="flex-1">
        {currentStep === 'onboarding' && (
          <TalentOnboarding onStart={handleStartQuiz} isDark={isDark} />
        )}

        {currentStep === 'quiz' && profile && (
          <TalentQuizRunner
            profile={profile}
            isDark={isDark}
            onFinish={handleFinishQuiz}
          />
        )}

        {currentStep === 'result' && result && (
          <TalentResultView
            result={result}
            isDark={isDark}
            onRetake={handleRetake}
            onBackToHome={onClose}
          />
        )}
      </main>
    </div>
  );
};
