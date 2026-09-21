import React, { useState } from 'react';
import {
  type UserProfile,
  type TalentQuestion,
  type AssessmentCategory,
  QUESTION_BANK,
  CATEGORIES,
  CATEGORY_ORDER,
} from '../../data/talentQuestions';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Award,
  Zap,
} from 'lucide-react';

interface TalentQuizRunnerProps {
  profile: UserProfile;
  isDark: boolean;
  onFinish: (answers: Record<string, string>) => void;
}

export const TalentQuizRunner: React.FC<TalentQuizRunnerProps> = ({
  profile,
  isDark,
  onFinish,
}) => {
  // Ambil bank soal tier yang sesuai
  const allQuestions = QUESTION_BANK[profile.tier];

  // State
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0); // 0 sampai 7
  const [currentQuestionIndexInSection, setCurrentQuestionIndexInSection] = useState<number>(0); // 0 sampai 4
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [showIntermission, setShowIntermission] = useState<boolean>(false);

  const currentCategoryKey: AssessmentCategory = CATEGORY_ORDER[currentSectionIndex];
  const currentCategoryInfo = CATEGORIES[currentCategoryKey];

  // 5 pertanyaan di babak saat ini
  const currentSectionQuestions = allQuestions.filter(
    (q) => q.category === currentCategoryKey
  );

  const currentQuestion: TalentQuestion | undefined =
    currentSectionQuestions[currentQuestionIndexInSection];

  // Hitung total progres (0 - 40)
  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = allQuestions.length; // 40
  const overallProgressPercentage = Math.round((totalAnswered / totalQuestions) * 100);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndexInSection < 4) {
      setCurrentQuestionIndexInSection((prev) => prev + 1);
    } else {
      // Selesai babak 5 soal -> Munculkan intermission screen
      setShowIntermission(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndexInSection > 0) {
      setCurrentQuestionIndexInSection((prev) => prev - 1);
    }
  };

  const handleContinueToNextSection = () => {
    setShowIntermission(false);
    if (currentSectionIndex < 7) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndexInSection(0);
    } else {
      // Babak terakhir selesai! Kirim jawaban untuk dihitung
      onFinish(answers);
    }
  };

  if (!currentQuestion) {
    return <div>Memuat soal asesmen...</div>;
  }

  const selectedOptionId = answers[currentQuestion.id];

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-4 sm:px-6">
      {/* Top Header & Global Progress */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
                Babak {currentSectionIndex + 1} dari 8
              </span>
              <span className="text-slate-400">•</span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${currentCategoryInfo.bgColor}`}
              >
                {currentCategoryInfo.name}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Peserta: <strong className="text-amber-500">{profile.childName}</strong> (
              {profile.childAge} Thn)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              Progres Total: <strong className="text-amber-500">{totalAnswered}</strong> / 40 Soal
            </span>
            <span className="text-xs font-mono font-bold text-amber-500">
              {overallProgressPercentage}%
            </span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div
          className={`h-2.5 w-full rounded-full overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-slate-200'
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 transition-all duration-300 rounded-full"
            style={{ width: `${overallProgressPercentage}%` }}
          />
        </div>
      </div>

      {/* 5-Question Stepper in Current Section */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          {currentSectionQuestions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentQuestionIndexInSection;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndexInSection(idx)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-105 shadow-md shadow-amber-500/30'
                    : isAnswered
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-right">
          <span className="text-xs font-medium text-slate-400">
            Soal {currentQuestionIndexInSection + 1} dari 5 di babak ini
          </span>
        </div>
      </div>

      {/* Question Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark
            ? 'bg-[#151928] border-amber-500/20 shadow-xl shadow-black/40'
            : 'bg-white border-amber-200 shadow-xl shadow-amber-900/5'
        }`}
      >
        {/* Category Description Banner */}
        <div
          className={`px-4 py-2 rounded-2xl mb-6 text-xs flex items-center gap-2 border ${currentCategoryInfo.bgColor}`}
        >
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>Fokus Pilar:</strong> {currentCategoryInfo.shortDesc}
          </span>
        </div>

        {/* Prompt */}
        <h2
          className={`text-base sm:text-lg md:text-xl font-bold leading-relaxed mb-6 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {currentQuestion.prompt}
        </h2>

        {/* Visual Hint / Diagram Box (jika ada) */}
        {currentQuestion.visualHint && (
          <div
            className={`mb-6 p-4 sm:p-5 rounded-2xl border text-center font-mono text-sm sm:text-base leading-relaxed tracking-wide ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 text-amber-300 shadow-inner'
                : 'bg-amber-50/70 border-amber-200 text-amber-900 shadow-inner'
            }`}
          >
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-400 mb-1">
              Petunjuk Visual / Skenario
            </div>
            <div className="whitespace-pre-wrap">{currentQuestion.visualHint}</div>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-center gap-3.5 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/10 border-amber-500 text-amber-500 font-semibold shadow-md shadow-amber-500/10 scale-[1.008]'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                {/* Option Letter Badge */}
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                      : 'bg-white border border-slate-300 text-slate-700 group-hover:border-amber-400'
                  }`}
                >
                  {option.id}
                </div>

                <span className="flex-1 text-xs sm:text-sm leading-relaxed">{option.text}</span>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndexInSection === 0}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors ${
              currentQuestionIndexInSection === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!selectedOptionId}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all ${
              !selectedOptionId
                ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
                : currentQuestionIndexInSection === 4
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20'
                : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
            }`}
          >
            <span>
              {currentQuestionIndexInSection === 4
                ? currentSectionIndex === 7
                  ? 'Selesai & Lihat Hasil'
                  : 'Selesai Babak Ini'
                : 'Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal Intermission Antar Babak (Jeda Istirahat & Motivasi) */}
      {showIntermission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden transition-all ${
              isDark
                ? 'bg-[#151928] border-amber-500/30 text-white shadow-2xl shadow-black/80'
                : 'bg-white border-amber-300 text-slate-900 shadow-2xl shadow-amber-900/20'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20 animate-bounce">
              {currentSectionIndex === 7 ? (
                <Award className="w-8 h-8" />
              ) : (
                <Zap className="w-8 h-8" />
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black mb-2">
              {currentSectionIndex === 7
                ? 'Luar Biasa! Semua Babak Selesai! 🎉'
                : `Hore! Babak ${currentSectionIndex + 1} Selesai! 👏`}
            </h3>

            <p className={`text-xs sm:text-sm mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {currentSectionIndex === 7
                ? 'Ananda telah menyelesaikan seluruh 40 soal tantangan bakat digital. Mari kita lihat peta potensi dan radar kecerdasan ananda!'
                : `Hebat sekali ${profile.childName}! Kamu baru saja menyelesaikan 5 soal ${currentCategoryInfo.name}. Boleh minum air dulu sejenak sebelum lanjut ke babak berikutnya.`}
            </p>

            <div
              className={`p-3.5 rounded-2xl border text-xs font-semibold mb-6 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {currentSectionIndex === 7 ? (
                <span>🏆 Seluruh 8 pilar siap dianalisis secara akurat.</span>
              ) : (
                <span>
                  Babak berikutnya:{' '}
                  <strong className="text-amber-500">
                    Babak {currentSectionIndex + 2}: {CATEGORIES[CATEGORY_ORDER[currentSectionIndex + 1]].name}
                  </strong>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleContinueToNextSection}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <span>
                {currentSectionIndex === 7
                  ? 'Buka Laporan Hasil Bakat (Radar Chart)'
                  : `Lanjut ke Babak ${currentSectionIndex + 2}`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
