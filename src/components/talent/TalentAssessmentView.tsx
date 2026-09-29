import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  type UserProfile,
  type AssessmentResult,
  type TalentQuestion,
  type AssessmentCategory,
  calculateAssessmentResult,
  getSampledQuestionsForSession,
} from '../../data/talentQuestions';
import { TalentOnboarding } from './TalentOnboarding';
import { TalentQuizRunner } from './TalentQuizRunner';
import { TalentResultView } from './TalentResultView';
import { ArrowLeft } from 'lucide-react';
import { saveSubmission, getQuestionsByTier, processSingleQueuedMessage } from '../../services/adminStorage';
import { queueToWhatsAppGateway, generateTalentAssessmentNotification } from '../../services/parentNotification';

interface TalentAssessmentViewProps {
  onClose: () => void;
}

type AssessmentStep = 'onboarding' | 'quiz' | 'result';

export const TalentAssessmentView: React.FC<TalentAssessmentViewProps> = ({ onClose }) => {
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('onboarding');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<TalentQuestion[]>([]);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleStartQuiz = (newProfile: UserProfile) => {
    setProfile(newProfile);
    // Ambil kumpulan pool soal tier (termasuk soal baru dari Admin jika ada)
    const pool = getQuestionsByTier(newProfile.tier);
    // Random sample 10 soal per kategori (total 80 soal untuk sesi ini)
    const sampled = getSampledQuestionsForSession(newProfile.tier, 10, pool);
    setSessionQuestions(sampled);
    setCurrentStep('quiz');
  };

  const handleFinishQuiz = (
    answers: Record<string, string>,
    durationSeconds: number,
    sectionDurations: Record<AssessmentCategory, number>
  ) => {
    if (!profile) return;
    const computedResult = calculateAssessmentResult(
      profile,
      answers,
      sessionQuestions,
      durationSeconds,
      sectionDurations
    );
    saveSubmission(computedResult, answers);

    // Auto-enqueue & dispatch WhatsApp notification to parent
    try {
      if (profile.parentPhone) {
        const notifPayload = generateTalentAssessmentNotification(computedResult);
        const queuedMsg = queueToWhatsAppGateway(
          profile.parentPhone,
          profile.parentName || `Orang Tua ${profile.childName}`,
          'talent_assessment_completed',
          notifPayload.whatsappText
        );
        if (queuedMsg?.id) {
          processSingleQueuedMessage(queuedMsg.id);
        }
      }
    } catch (e) {
      console.warn('Auto WhatsApp notification queue error:', e);
    }

    setResult(computedResult);
    setCurrentStep('result');
  };

  const handleRetake = () => {
    setResult(null);
    setSessionQuestions([]);
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
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
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
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  Talent Test
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Status Indicators */}
          <div className="hidden md:flex items-center gap-2 text-xs font-bold">
            <span
              className={`px-3 py-1 rounded-full border transition-all ${
                currentStep === 'onboarding'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              1. Data Ananda
            </span>
            <span className="text-slate-500">→</span>
            <span
              className={`px-3 py-1 rounded-full border transition-all ${
                currentStep === 'quiz'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              2. 80 Soal Asesmen (Random)
            </span>
            <span className="text-slate-500">→</span>
            <span
              className={`px-3 py-1 rounded-full border transition-all ${
                currentStep === 'result'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              3. Radar & Hasil
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
            questions={sessionQuestions}
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
