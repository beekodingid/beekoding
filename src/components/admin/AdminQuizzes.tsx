import React, { useState, useMemo } from 'react';
import {
  type QuizExam,
  type QuizLevel,
  type QuizTopic,
  type QuizAttempt,
  getQuizExams,
  createQuizExam,
  updateQuizExam,
  deleteQuizExam,
  resetQuizzesToDefault,
  getQuizAttempts,
  exportQuizAttemptsCSV,
} from '../../services/adminStorage';
import { AdminQuizModal } from './AdminQuizModal';
import { AdminQuizAttemptsModal } from './AdminQuizAttemptsModal';
import {
  HelpCircle,
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  Clock,
  Award,
  Sparkles,
  Users,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

interface AdminQuizzesProps {
  isDark: boolean;
}

export const AdminQuizzes: React.FC<AdminQuizzesProps> = ({ isDark }) => {
  const [quizzes, setQuizzes] = useState<QuizExam[]>(() => getQuizExams());
  const [attempts, setAttempts] = useState<QuizAttempt[]>(() => getQuizAttempts());

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<QuizLevel | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<QuizTopic | 'all'>('all');

  // Modals
  const [editingQuiz, setEditingQuiz] = useState<QuizExam | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attemptsModalQuiz, setAttemptsModalQuiz] = useState<QuizExam | null>(null);
  const [isAttemptsModalOpen, setIsAttemptsModalOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Refresh
  const handleRefresh = () => {
    setQuizzes(getQuizExams());
    setAttempts(getQuizAttempts());
  };

  // Filtered Quizzes
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        q.title.toLowerCase().includes(query) ||
        q.description.toLowerCase().includes(query);

      const matchTier = tierFilter === 'all' || q.tier === tierFilter;
      const matchTopic = topicFilter === 'all' || q.topic === topicFilter;

      return matchSearch && matchTier && matchTopic;
    });
  }, [quizzes, searchQuery, tierFilter, topicFilter]);

  // Overall Statistics
  const totalQuizzes = quizzes.length;
  const activeQuizzes = quizzes.filter((q) => q.isActive).length;
  const totalAttemptsCount = attempts.length;
  const avgOverallScore =
    totalAttemptsCount > 0
      ? Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / totalAttemptsCount)
      : 0;
  const passedAttemptsCount = attempts.filter((a) => a.passed).length;
  const overallPassRate =
    totalAttemptsCount > 0 ? Math.round((passedAttemptsCount / totalAttemptsCount) * 100) : 0;

  // Handlers
  const handleOpenCreate = () => {
    setEditingQuiz(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (q: QuizExam) => {
    setEditingQuiz(q);
    setIsModalOpen(true);
  };

  const handleSaveQuiz = (data: Omit<QuizExam, 'id' | 'createdAt'>, id?: string) => {
    if (id) {
      updateQuizExam(id, data);
    } else {
      createQuizExam(data);
    }
    handleRefresh();
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteQuizExam(id);
    setConfirmDeleteId(null);
    handleRefresh();
  };

  const handleResetDefault = () => {
    resetQuizzesToDefault();
    setConfirmResetOpen(false);
    handleRefresh();
  };

  const handleOpenAttempts = (quiz?: QuizExam) => {
    setAttemptsModalQuiz(quiz || null);
    setIsAttemptsModalOpen(true);
  };

  const handleExportCSV = () => {
    exportQuizAttemptsCSV();
  };

  const getTierBadge = (t: QuizLevel) => {
    switch (t) {
      case 'junior':
        return {
          bg: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
          label: 'Junior Explorer (Scratch)',
        };
      case 'middle':
        return {
          bg: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
          label: 'Middle Coder (Roblox)',
        };
      case 'teens':
        return {
          bg: 'bg-sky-500/10 text-sky-500 border-sky-500/30',
          label: 'Teens Innovator (Python)',
        };
      default:
        return {
          bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
          label: 'Semua Jenjang',
        };
    }
  };

  const getTopicLabel = (topic: QuizTopic) => {
    switch (topic) {
      case 'scratch_basics':
        return 'Scratch & Block Logic';
      case 'roblox_lua':
        return 'Roblox Studio & Lua 3D';
      case 'python_fundamentals':
        return 'Python Fundamentals';
      case 'computational_thinking':
        return 'Computational Thinking';
      case 'web_development':
        return 'Web Development';
      case 'game_design':
        return 'Game Design';
      default:
        return topic;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark
            ? 'bg-gradient-to-r from-[#121624] via-slate-900 to-[#121624] border-slate-800'
            : 'bg-gradient-to-r from-amber-50/60 via-white to-orange-50/60 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold shadow-xs">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  Arena Kuis & Evaluasi Capaian Belajar
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {activeQuizzes} Kuis Aktif
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Rancang evaluasi konsep koding berkala (Scratch, Roblox, Python, CT), pantau tingkat kelulusan siswa, dan beri reward Bee-XP langsung ke akun portal anak.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleRefresh}
              className={`p-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
              title="Segarkan Data"
            >
              <RotateCcw className="w-4 h-4 text-blue-500" />
            </button>

            <button
              type="button"
              onClick={() => handleOpenAttempts()}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Users className="w-4 h-4 text-purple-500" />
              <span>Rekap Hasil Ujian</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Ekspor Nilai CSV</span>
            </button>

            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Kuis Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Kuis */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Paket Kuis
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {totalQuizzes}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>{activeQuizzes} kuis berstatus aktif</span>
          </p>
        </div>

        {/* Metric 2: Total Pengerjaan */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Pengerjaan
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-blue-600 dark:text-blue-400">
            {totalAttemptsCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Percobaan ujian dari siswa
          </p>
        </div>

        {/* Metric 3: Rata-rata Skor */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Rata-rata Skor
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {avgOverallScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold mt-1">
            Indeks pemahaman konsep akademi
          </p>
        </div>

        {/* Metric 4: Tingkat Kelulusan */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Tingkat Kelulusan
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {overallPassRate}%
          </div>
          <p className="text-[11px] text-purple-500 font-semibold mt-1">
            {passedAttemptsCount} dari {totalAttemptsCount} percobaan lulus
          </p>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div
        className={`p-5 rounded-3xl border space-y-4 ${
          isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari judul kuis atau topik materi..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* Filter Jenjang */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value as any)}
              className={`px-3 py-2.5 rounded-2xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-300 text-slate-700 shadow-xs'
              }`}
            >
              <option value="all">Semua Jenjang Usia</option>
              <option value="junior">Junior Explorer (Scratch)</option>
              <option value="middle">Middle Coder (Roblox)</option>
              <option value="teens">Teens Innovator (Python)</option>
            </select>

            {/* Filter Topik */}
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value as any)}
              className={`px-3 py-2.5 rounded-2xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-300 text-slate-700 shadow-xs'
              }`}
            >
              <option value="all">Semua Topik</option>
              <option value="scratch_basics">Scratch & Block Logic</option>
              <option value="roblox_lua">Roblox Studio & Lua 3D</option>
              <option value="python_fundamentals">Python Fundamentals</option>
              <option value="computational_thinking">Computational Thinking</option>
              <option value="web_development">Web Development</option>
              <option value="game_design">Game Design</option>
            </select>

            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className={`px-3 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1 cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200'
              }`}
              title="Reset ke paket kuis bawaan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Quizzes */}
      {filteredQuizzes.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-slate-900/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          <HelpCircle className="w-10 h-10 mx-auto mb-3 text-slate-400 opacity-60" />
          <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
            Tidak ada paket kuis yang ditemukan
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            Coba sesuaikan kata kunci pencarian atau filter jenjang untuk menemukan modul evaluasi yang Anda cari.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredQuizzes.map((quiz) => {
            const tierBadge = getTierBadge(quiz.tier);
            const quizAttempts = attempts.filter((a) => a.quizId === quiz.id);
            const attemptsCount = quizAttempts.length;
            const quizAvgScore =
              attemptsCount > 0
                ? Math.round(
                    quizAttempts.reduce((acc, curr) => acc + curr.score, 0) / attemptsCount
                  )
                : 0;
            const quizPassCount = quizAttempts.filter((a) => a.passed).length;
            const quizPassRate =
              attemptsCount > 0 ? Math.round((quizPassCount / attemptsCount) * 100) : 0;

            return (
              <div
                key={quiz.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group ${
                  isDark
                    ? 'bg-[#121624] border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${tierBadge.bg}`}
                    >
                      {tierBadge.label}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        quiz.isActive
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                      }`}
                    >
                      {quiz.isActive ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>

                  {/* Title & Topic */}
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors font-['Space_Grotesk'] leading-snug">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-amber-500 font-semibold">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{getTopicLabel(quiz.topic)} &bull; Sesi #{quiz.sessionNumber}</span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {quiz.description}
                  </p>

                  {/* Quiz Parameters Pills */}
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/40">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{quiz.durationMinutes} Menit</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Pass: {quiz.passingScore}+</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>+{quiz.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Student Stats Mini Bar */}
                  <div
                    className={`mt-4 p-3 rounded-2xl border text-xs flex items-center justify-between ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Pengerjaan
                      </span>
                      <span className="font-black text-sm text-slate-900 dark:text-white">
                        {attemptsCount} Siswa
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Rata-rata
                      </span>
                      <span className="font-black text-sm text-blue-500">
                        {quizAvgScore} / 100
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Kelulusan
                      </span>
                      <span className="font-black text-sm text-emerald-500">
                        {quizPassRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenAttempts(quiz)}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Lihat Nilai ({attemptsCount})</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(quiz)}
                      className={`p-2 rounded-xl text-slate-400 hover:text-amber-500 transition-colors cursor-pointer ${
                        isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                      title="Edit Kuis & Butir Soal"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(quiz.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Kuis"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Quiz Creator / Editor */}
      {isModalOpen && (
        <AdminQuizModal
          quiz={editingQuiz}
          isDark={isDark}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuiz}
        />
      )}

      {/* Modal Quiz Attempts Inspection */}
      {isAttemptsModalOpen && (
        <AdminQuizAttemptsModal
          quiz={attemptsModalQuiz}
          attempts={attempts}
          isDark={isDark}
          onClose={() => setIsAttemptsModalOpen(false)}
        />
      )}

      {/* Confirmation Modal: Delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-4 ${
              isDark ? 'bg-[#111420] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-base font-['Space_Grotesk']">
                Hapus Paket Kuis Ini?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Tindakan ini akan menghapus paket kuis dari direktori. Riwayat pengerjaan siswa yang sudah tercatat sebelumnya tetap tersimpan di audit log.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white transition-colors cursor-pointer"
              >
                Ya, Hapus Kuis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Reset Default */}
      {confirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-4 ${
              isDark ? 'bg-[#111420] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-base font-['Space_Grotesk']">
                Kembalikan ke Kuis Bawaan?
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Paket kuis dan riwayat pengerjaan demo akan dikembalikan ke data standar bawaan akademi.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmResetOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                }`}
              >
                Batal
              </button>
              <button
                onClick={handleResetDefault}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
              >
                Ya, Pulihkan Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
