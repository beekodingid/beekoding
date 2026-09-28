import React, { useState, useEffect, useRef } from 'react';
import {
  type UserProfile,
  type TalentQuestion,
  type AssessmentCategory,
  CATEGORIES,
  CATEGORY_ORDER,
  formatDuration,
} from '../../data/talentQuestions';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  Zap,
  Clock,
  Timer,
  Pause,
} from 'lucide-react';

interface TalentQuizRunnerProps {
  questions: TalentQuestion[];
  profile: UserProfile;
  isDark: boolean;
  onFinish: (
    answers: Record<string, string>,
    durationSeconds: number,
    sectionDurations: Record<AssessmentCategory, number>
  ) => void;
}

export const TalentQuizRunner: React.FC<TalentQuizRunnerProps> = ({
  questions,
  profile,
  isDark,
  onFinish,
}) => {
  // 80 pertanyaan sesi ini (10 per babak)
  const allQuestions = questions;

  // State navigasi & jawaban
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0); // 0 sampai 7
  const [currentQuestionIndexInSection, setCurrentQuestionIndexInSection] = useState<number>(0); // 0 sampai 9
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [showIntermission, setShowIntermission] = useState<boolean>(false);

  // State Pengukur Waktu Sesi (Stopwatch & Section Timer)
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState<number>(0);
  const [sectionSeconds, setSectionSeconds] = useState<number>(0);
  const [sectionDurations, setSectionDurations] = useState<Record<AssessmentCategory, number>>({
    logical: 0,
    numerical: 0,
    spatial: 0,
    pattern: 0,
    creativity: 0,
    problem_solving: 0,
    language: 0,
    persistence: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Jalankan stopwatch real-time (otomatis jeda/pause saat sesi istirahat antar babak)
  useEffect(() => {
    if (showIntermission) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTotalElapsedSeconds((prev) => prev + 1);
      setSectionSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showIntermission]);

  const formatStopwatch = (totalSecs: number): string => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentCategoryKey: AssessmentCategory = CATEGORY_ORDER[currentSectionIndex];
  const currentCategoryInfo = CATEGORIES[currentCategoryKey];

  // 10 pertanyaan di babak saat ini
  const currentSectionQuestions = allQuestions.filter(
    (q) => q.category === currentCategoryKey
  );

  const currentQuestion: TalentQuestion | undefined =
    currentSectionQuestions[currentQuestionIndexInSection];

  // Hitung total progres (0 - 80)
  const totalAnswered = Object.keys(answers).length;
  const totalQuestionsCount = allQuestions.length > 0 ? allQuestions.length : 80;
  const overallProgressPercentage = Math.round((totalAnswered / totalQuestionsCount) * 100);

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndexInSection < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndexInSection((prev) => prev + 1);
    } else {
      // Rekam durasi murni babak yang baru saja selesai
      const currentDuration = sectionSeconds;
      setSectionDurations((prev) => ({
        ...prev,
        [currentCategoryKey]: currentDuration,
      }));
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
    setSectionSeconds(0); // Reset timer babak untuk babak berikutnya

    if (currentSectionIndex < 7) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndexInSection(0);
    } else {
      // Babak ke-8 selesai! Selesaikan kuis dan kirim hasil beserta data waktu
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      onFinish(answers, totalElapsedSeconds, sectionDurations);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-bold text-amber-500">Menyiapkan 80 butir soal asesmen...</p>
      </div>
    );
  }

  const selectedOptionId = answers[currentQuestion.id];
  const isLastQuestionInSection =
    currentQuestionIndexInSection === currentSectionQuestions.length - 1;

  // Durasi babak: saat jeda gunakan waktu terekam babak tersebut, saat babak aktif gunakan sectionSeconds
  const currentSectionDurationSecs = showIntermission
    ? sectionDurations[currentCategoryKey] || sectionSeconds
    : sectionSeconds;
  const currentSectionAvgSecs =
    Math.max(0.1, Math.round((currentSectionDurationSecs / 10) * 10) / 10);

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-4 sm:px-6">
      {/* Top Header & Global Progress */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
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

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Live Stopwatch Badge (Menampilkan status Berjalan vs Dijeda) */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-colors ${
                showIntermission
                  ? isDark
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-amber-100 border-amber-400 text-amber-950 shadow-sm'
                  : isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                  : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
              }`}
              title={
                showIntermission
                  ? 'Timer dijeda otomatis selama sesi istirahat'
                  : 'Waktu pengerjaan tes berjalan'
              }
            >
              {showIntermission ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  <span>⏱️ {formatStopwatch(totalElapsedSeconds)} (Dijeda)</span>
                </>
              ) : (
                <>
                  <Timer className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                  <span>⏱️ {formatStopwatch(totalElapsedSeconds)}</span>
                </>
              )}
            </div>

            {/* Total Questions Count & Percentage */}
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              >
                Progres: <strong className="text-amber-500">{totalAnswered}</strong> / {totalQuestionsCount} Soal
              </span>
              <span className="text-xs font-mono font-bold text-amber-500">
                {overallProgressPercentage}%
              </span>
            </div>
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

      {/* 10-Question Stepper in Current Section (Responsive Grid 10 buttons) */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-400">
            Daftar Soal Babak Ini (10 Soal Acak):
          </span>
          <span className="text-xs font-medium text-slate-400">
            Soal <strong>{currentQuestionIndexInSection + 1}</strong> dari 10
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {currentSectionQuestions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentQuestionIndexInSection;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndexInSection(idx)}
                className={`h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-900 scale-105 shadow-md shadow-amber-500/30'
                    : isAnswered
                    ? isDark
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-300 hover:bg-emerald-200'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
                }`}
              >
                <span>{idx + 1}</span>
              </button>
            );
          })}
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

        {/* Visual Hint / Diagram (if available) */}
        {currentQuestion.visualHint && (
          <div
            className={`p-4 rounded-2xl mb-6 text-center text-sm sm:text-base font-mono border ${
              isDark
                ? 'bg-slate-900/60 border-slate-800 text-amber-300'
                : 'bg-amber-50/60 border-amber-100 text-amber-950'
            }`}
          >
            <span>{currentQuestion.visualHint}</span>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 text-amber-500 font-semibold shadow-md shadow-amber-500/10 scale-[1.01]'
                    : isDark
                    ? 'bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    : 'bg-slate-50/80 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/30'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {option.id}
                </div>
                <div className="flex-1 pt-0.5 leading-relaxed">{option.text}</div>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndexInSection === 0}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              currentQuestionIndexInSection === 0
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!selectedOptionId}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
              !selectedOptionId
                ? 'opacity-50 cursor-not-allowed bg-slate-700 text-slate-400'
                : isLastQuestionInSection
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20'
                : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
            }`}
          >
            <span>
              {isLastQuestionInSection
                ? currentSectionIndex === 7
                  ? 'Selesai & Lihat Hasil'
                  : 'Selesai Babak Ini'
                : 'Berikutnya'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal Intermission Antar Babak (Jeda Istirahat, Evaluasi Waktu & Motivasi) */}
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
                ? 'Luar Biasa! Seluruh 80 Soal Tuntas! 🎉'
                : `Hore! Babak ${currentSectionIndex + 1} Selesai! 👏`}
            </h3>

            <p className={`text-xs sm:text-sm mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {currentSectionIndex === 7
                ? `Ananda telah menyelesaikan 80 soal dari 8 pilar kecerdasan digital dalam waktu ${formatDuration(
                    totalElapsedSeconds
                  )}. Peta radar potensi ananda siap dianalisis!`
                : `Hebat sekali ${profile.childName}! Kamu baru saja menyelesaikan 10 soal ${currentCategoryInfo.name}. Boleh tarik napas dan minum air sejenak.`}
            </p>

            {/* Waktu Babak Card dengan indikator Auto-Pause */}
            <div
              className={`p-3.5 rounded-2xl border text-xs mb-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 ${
                isDark
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Waktu Babak Ini: <strong>{formatDuration(currentSectionDurationSecs)}</strong> (rata-rata{' '}
                  {currentSectionAvgSecs} dtk/soal)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Timer Dijeda (Istirahat Santai)</span>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-xs font-semibold mb-6 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              {currentSectionIndex === 7 ? (
                <span>🏆 8 Pilar Komprehensif Siap Ditampilkan pada Radar Chart.</span>
              ) : (
                <span>
                  Babak berikutnya:{' '}
                  <strong className="text-amber-500">
                    Babak {currentSectionIndex + 2}:{' '}
                    {CATEGORIES[CATEGORY_ORDER[currentSectionIndex + 1]].name}
                  </strong>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleContinueToNextSection}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
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
