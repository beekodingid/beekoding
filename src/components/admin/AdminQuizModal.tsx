import React, { useState } from 'react';
import {
  type QuizExam,
  type QuizLevel,
  type QuizTopic,
  type QuizQuestionItem,
} from '../../services/adminStorage';
import {
  X,
  Plus,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
  Sparkles,
  Layers,
  BookOpen,
  Info,
} from 'lucide-react';

interface AdminQuizModalProps {
  quiz: QuizExam | null; // null for create mode
  isDark: boolean;
  onClose: () => void;
  onSave: (quizData: Omit<QuizExam, 'id' | 'createdAt'>, id?: string) => void;
}

export const AdminQuizModal: React.FC<AdminQuizModalProps> = ({
  quiz,
  isDark,
  onClose,
  onSave,
}) => {
  const isEditing = !!quiz;

  // Form State
  const [title, setTitle] = useState(quiz?.title || '');
  const [description, setDescription] = useState(quiz?.description || '');
  const [tier, setTier] = useState<QuizLevel>(quiz?.tier || 'junior');
  const [topic, setTopic] = useState<QuizTopic>(quiz?.topic || 'scratch_basics');
  const [sessionNumber, setSessionNumber] = useState<number>(quiz?.sessionNumber || 4);
  const [durationMinutes, setDurationMinutes] = useState<number>(quiz?.durationMinutes || 15);
  const [passingScore, setPassingScore] = useState<number>(quiz?.passingScore || 70);
  const [xpReward, setXpReward] = useState<number>(quiz?.xpReward || 150);
  const [isActive, setIsActive] = useState<boolean>(quiz?.isActive ?? true);

  // Questions State
  const [questions, setQuestions] = useState<QuizQuestionItem[]>(() => {
    if (quiz && quiz.questions.length > 0) {
      return quiz.questions;
    }
    return [
      {
        id: `q-${Date.now()}-1`,
        question: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        explanation: '',
      },
    ];
  });

  const [activeQuestionTab, setActiveQuestionTab] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handlers
  const handleAddQuestion = () => {
    const newQ: QuizQuestionItem = {
      id: `q-${Date.now()}-${questions.length + 1}`,
      question: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      explanation: '',
    };
    setQuestions([...questions, newQ]);
    setActiveQuestionTab(questions.length);
  };

  const handleRemoveQuestion = (idx: number) => {
    if (questions.length <= 1) {
      setErrorMsg('Kuis harus memiliki minimal 1 butir pertanyaan.');
      return;
    }
    const filtered = questions.filter((_, i) => i !== idx);
    setQuestions(filtered);
    if (activeQuestionTab >= filtered.length) {
      setActiveQuestionTab(Math.max(0, filtered.length - 1));
    }
  };

  const handleUpdateCurrentQuestion = (field: keyof QuizQuestionItem, value: any) => {
    const updated = [...questions];
    updated[activeQuestionTab] = {
      ...updated[activeQuestionTab],
      [field]: value,
    };
    setQuestions(updated);
  };

  const handleUpdateOption = (optIdx: number, val: string) => {
    const currentQ = questions[activeQuestionTab];
    const newOpts = [...currentQ.options] as [string, string, string, string];
    newOpts[optIdx] = val;
    handleUpdateCurrentQuestion('options', newOpts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Judul kuis wajib diisi.');
      return;
    }

    if (questions.length === 0) {
      setErrorMsg('Kuis harus memiliki minimal 1 pertanyaan.');
      return;
    }

    // Validate all questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setErrorMsg(`Soal nomor ${i + 1} belum memiliki teks pertanyaan.`);
        setActiveQuestionTab(i);
        return;
      }
      for (let j = 0; j < 4; j++) {
        if (!q.options[j].trim()) {
          setErrorMsg(`Opsi ${String.fromCharCode(65 + j)} pada soal nomor ${i + 1} belum diisi.`);
          setActiveQuestionTab(i);
          return;
        }
      }
    }

    onSave(
      {
        title: title.trim(),
        description: description.trim(),
        tier,
        topic,
        sessionNumber: Number(sessionNumber) || 1,
        durationMinutes: Number(durationMinutes) || 15,
        passingScore: Number(passingScore) || 70,
        xpReward: Number(xpReward) || 150,
        questions,
        isActive,
      },
      quiz?.id
    );
  };

  const currentQ = questions[activeQuestionTab] || questions[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isDark ? 'bg-[#111420] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-[#161a2b]' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-['Space_Grotesk']">
                {isEditing ? 'Edit Paket Kuis & Ujian' : 'Rancang Paket Kuis Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Atur konfigurasi waktu, passing grade, reward Bee-XP, dan butir soal interaktif.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Metadata Kuis */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>1. Informasi Umum & Pengaturan Kuis</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  Judul Kuis / Ujian <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Logika Animasi & Event Interaktif Scratch 3.0"
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  Deskripsi Singkat & Capaian Belajar
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan cakupan materi dan kompetensi yang diuji dalam kuis ini..."
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  Jenjang Usia Belajar
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as QuizLevel)}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="junior">Junior Explorer (Usia 6-9 thn / Scratch)</option>
                  <option value="middle">Middle Coder (Usia 10-13 thn / Roblox & Lua)</option>
                  <option value="teens">Teens Innovator (Usia 14-18 thn / Python & Web)</option>
                  <option value="all">Semua Jenjang (General Logic & CT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">
                  Topik Materi Kurikulum
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as QuizTopic)}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="scratch_basics">Scratch & Block Logic</option>
                  <option value="roblox_lua">Roblox Studio & Lua 3D</option>
                  <option value="python_fundamentals">Python Fundamentals & Data</option>
                  <option value="computational_thinking">Computational Thinking & Logic</option>
                  <option value="web_development">Web Development (HTML/CSS/JS)</option>
                  <option value="game_design">Game Design & Physics</option>
                </select>
              </div>

              {/* Parameter Scoring & Time */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                  <span>Durasi Ujian (Menit)</span>
                </label>
                <input
                  type="number"
                  min={5}
                  max={90}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Passing Grade Kelulusan (0 - 100)</span>
                </label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Reward Bee-XP Kelulusan</span>
                </label>
                <input
                  type="number"
                  min={50}
                  max={500}
                  step={10}
                  value={xpReward}
                  onChange={(e) => setXpReward(Number(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-500" />
                  <span>Terkait Sesi Pertemuan Ke-</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={sessionNumber}
                  onChange={(e) => setSessionNumber(Number(e.target.value))}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="activeQuiz"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
              />
              <label htmlFor="activeQuiz" className="text-xs font-semibold cursor-pointer">
                Publikasikan kuis ini sekarang agar langsung dapat diakses siswa di Portal Siswa
              </label>
            </div>
          </div>

          <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

          {/* Section 2: Butir Soal Kuis */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <span>2. Daftar Butir Pertanyaan ({questions.length} Soal)</span>
              </h4>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Soal Baru</span>
              </button>
            </div>

            {/* Question Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {questions.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveQuestionTab(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeQuestionTab === idx
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Soal #{idx + 1}
                </button>
              ))}
            </div>

            {/* Active Question Editor Card */}
            {currentQ && (
              <div
                className={`p-5 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                    Editor Soal #{activeQuestionTab + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(activeQuestionTab)}
                      className="px-2.5 py-1 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Butir Ini</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">
                    Teks Pertanyaan <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={currentQ.question}
                    onChange={(e) => handleUpdateCurrentQuestion('question', e.target.value)}
                    placeholder="Tuliskan pertanyaan konsep koding yang jelas..."
                    className={`w-full px-4 py-2.5 rounded-2xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* 4 Options with radio button */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Pilihan Jawaban (Pilih lingkaran radio untuk menandai kunci jawaban yang benar) <span className="text-rose-500">*</span>
                  </label>

                  {currentQ.options.map((opt, optIdx) => {
                    const isCorrect = currentQ.correctOptionIndex === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);
                    return (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all ${
                          isCorrect
                            ? isDark
                              ? 'bg-emerald-500/10 border-emerald-500/30'
                              : 'bg-emerald-50 border-emerald-300'
                            : isDark
                            ? 'bg-slate-900/40 border-slate-800'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <input
                          type="radio"
                          id={`correct-${activeQuestionTab}-${optIdx}`}
                          name={`correct-opt-${activeQuestionTab}`}
                          checked={isCorrect}
                          onChange={() => handleUpdateCurrentQuestion('correctOptionIndex', optIdx)}
                          className="w-4 h-4 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                        />
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isCorrect
                              ? 'bg-emerald-500 text-white'
                              : isDark
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {letter}
                        </span>
                        <input
                          type="text"
                          required
                          value={opt}
                          onChange={(e) => handleUpdateOption(optIdx, e.target.value)}
                          placeholder={`Pilihan Jawaban ${letter}...`}
                          className={`flex-1 px-3 py-1.5 rounded-xl border text-xs font-medium focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors ${
                            isDark
                              ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                          }`}
                        />
                        {isCorrect && (
                          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Kunci Benar</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">
                    Penjelasan / Pembahasan Pedagogik (Ditampilkan kepada siswa setelah kuis selesai)
                  </label>
                  <textarea
                    rows={2}
                    value={currentQ.explanation}
                    onChange={(e) => handleUpdateCurrentQuestion('explanation', e.target.value)}
                    placeholder="Jelaskan mengapa pilihan ini benar agar siswa belajar dari hasil ujian..."
                    className={`w-full px-4 py-2 rounded-2xl border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isEditing ? 'Simpan Perubahan Kuis' : 'Terbitkan Paket Kuis'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
