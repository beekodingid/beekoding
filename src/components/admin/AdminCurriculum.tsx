import React, { useState } from 'react';
import {
  BookOpen,
  Layers,
  Plus,
  Search,
  Filter,
  ExternalLink,
  FileText,
  Code2,
  Presentation,
  Sparkles,
  Target,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Printer,
  Clock,
  X,
} from 'lucide-react';
import {
  type LessonSession,
  type CurriculumTier,
  type SessionDifficulty,
  getCurriculumSessions,
  createCurriculumSession,
  updateCurriculumSession,
  deleteCurriculumSession,
  toggleSessionActive,
  resetCurriculumToDefault,
  calculateCurriculumStats,
} from '../../services/adminStorage';
import { AdminCurriculumModal } from './AdminCurriculumModal';

interface AdminCurriculumProps {
  isDark?: boolean;
}

export const AdminCurriculum: React.FC<AdminCurriculumProps> = ({ isDark = false }) => {
  const [sessions, setSessions] = useState<LessonSession[]>(() => getCurriculumSessions());
  const [selectedTier, setSelectedTier] = useState<CurriculumTier>('junior');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);

  // Edit / Add Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<LessonSession | null>(null);

  // Form Fields
  const [formTier, setFormTier] = useState<CurriculumTier>('junior');
  const [formSessionNumber, setFormSessionNumber] = useState<number>(1);
  const [formTitle, setFormTitle] = useState('');
  const [formDuration, setFormDuration] = useState<number>(90);
  const [formDifficulty, setFormDifficulty] = useState<SessionDifficulty>('beginner');
  const [formConcepts, setFormConcepts] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formProjectOutcome, setFormProjectOutcome] = useState('');
  const [formSlideUrl, setFormSlideUrl] = useState('');
  const [formStarterCodeUrl, setFormStarterCodeUrl] = useState('');
  const [formWorksheetUrl, setFormWorksheetUrl] = useState('');
  const [formHomeworkTask, setFormHomeworkTask] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  // Toast / Feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    const data = getCurriculumSessions();
    setSessions(data);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const stats = calculateCurriculumStats(sessions);

  // Filtered Sessions
  const tierSessions = sessions.filter((s) => s.tier === selectedTier);
  const filteredSessions = tierSessions
    .filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.projectOutcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.coreConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchDiff =
        selectedDifficulty === 'all' || s.difficulty === selectedDifficulty;

      return matchSearch && matchDiff;
    })
    .sort((a, b) => a.sessionNumber - b.sessionNumber);

  const handleOpenAdd = () => {
    setEditingSession(null);
    setFormTier(selectedTier);
    const existingTierSessions = sessions.filter((s) => s.tier === selectedTier);
    const nextNum = existingTierSessions.length > 0
      ? Math.max(...existingTierSessions.map((s) => s.sessionNumber)) + 1
      : 1;
    setFormSessionNumber(nextNum);
    setFormTitle('');
    setFormDuration(90);
    setFormDifficulty('beginner');
    setFormConcepts('');
    setFormDescription('');
    setFormProjectOutcome('');
    setFormSlideUrl('');
    setFormStarterCodeUrl('');
    setFormWorksheetUrl('');
    setFormHomeworkTask('');
    setFormIsActive(true);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (session: LessonSession) => {
    setEditingSession(session);
    setFormTier(session.tier);
    setFormSessionNumber(session.sessionNumber);
    setFormTitle(session.title);
    setFormDuration(session.durationMinutes);
    setFormDifficulty(session.difficulty);
    setFormConcepts(session.coreConcepts.join(', '));
    setFormDescription(session.description);
    setFormProjectOutcome(session.projectOutcome);
    setFormSlideUrl(session.slideUrl || '');
    setFormStarterCodeUrl(session.starterCodeUrl || '');
    setFormWorksheetUrl(session.worksheetUrl || '');
    setFormHomeworkTask(session.homeworkTask || '');
    setFormIsActive(session.isActive);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Judul sesi wajib diisi!');
      return;
    }

    const conceptsArray = formConcepts
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    if (editingSession) {
      updateCurriculumSession(editingSession.id, {
        tier: formTier,
        sessionNumber: Number(formSessionNumber),
        title: formTitle.trim(),
        durationMinutes: Number(formDuration),
        difficulty: formDifficulty,
        coreConcepts: conceptsArray.length > 0 ? conceptsArray : ['Logika Dasar'],
        description: formDescription.trim(),
        projectOutcome: formProjectOutcome.trim() || 'Hasil karya proyek mandiri siswa',
        slideUrl: formSlideUrl.trim() || undefined,
        starterCodeUrl: formStarterCodeUrl.trim() || undefined,
        worksheetUrl: formWorksheetUrl.trim() || undefined,
        homeworkTask: formHomeworkTask.trim() || undefined,
        isActive: formIsActive,
      });
      showToast('Sesi kurikulum berhasil diperbarui!');
    } else {
      createCurriculumSession({
        tier: formTier,
        sessionNumber: Number(formSessionNumber),
        title: formTitle.trim(),
        durationMinutes: Number(formDuration),
        difficulty: formDifficulty,
        coreConcepts: conceptsArray.length > 0 ? conceptsArray : ['Logika Dasar'],
        description: formDescription.trim(),
        projectOutcome: formProjectOutcome.trim() || 'Hasil karya proyek mandiri siswa',
        slideUrl: formSlideUrl.trim() || undefined,
        starterCodeUrl: formStarterCodeUrl.trim() || undefined,
        worksheetUrl: formWorksheetUrl.trim() || undefined,
        homeworkTask: formHomeworkTask.trim() || undefined,
        isActive: formIsActive,
      });
      showToast('Sesi kurikulum baru berhasil ditambahkan!');
    }

    setIsFormModalOpen(false);
    loadData();
  };

  const handleToggleActive = (id: string) => {
    toggleSessionActive(id);
    loadData();
    showToast('Status aktif sesi berhasil diperbarui.');
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Hapus sesi "${title}" dari kurikulum?`)) {
      deleteCurriculumSession(id);
      loadData();
      showToast('Sesi telah dihapus.');
    }
  };

  const handleResetToDefault = () => {
    if (
      confirm(
        'Kembalikan seluruh silabus kurikulum ke kondisi bawaan awal BeeKoding (36 Sesi Lengkap)?'
      )
    ) {
      resetCurriculumToDefault();
      loadData();
      showToast('Silabus kurikulum berhasil direset ke setelan standar.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <span>Manajemen Kurikulum & Silabus Sesi</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Susunan rencana pembelajaran 12 sesi per jenjang, modul bahan ajar, dan dokumen silabus resmi siap cetak.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsSyllabusModalOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center space-x-2 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Dokumen Silabus Cetak / PDF</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Sesi Baru</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            title="Reset ke Silabus Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Sesi Terdaftar
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalSessions}
            </span>
            <span className="text-xs text-slate-400">Pertemuan</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {stats.activeSessions} sesi aktif siap diajarkan
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Modul Slide Canva/Slides
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Presentation className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalSlideMaterials}
            </span>
            <span className="text-xs text-slate-400">Presentasi</span>
          </div>
          <div className="mt-1 text-[11px] text-blue-600 dark:text-blue-400">
            Tersedia untuk pengajar & siswa
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Starter Code & Template
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalStarterCodes}
            </span>
            <span className="text-xs text-slate-400">Proyek Awal</span>
          </div>
          <div className="mt-1 text-[11px] text-purple-600 dark:text-purple-400">
            Scratch, Replit & GitHub
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Lembar Kerja & Worksheet
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalWorksheets}
            </span>
            <span className="text-xs text-slate-400">Panduan PDF</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            Latihan mandiri di rumah
          </div>
        </div>
      </div>

      {/* Tier Selection Tabs */}
      <div
        className={`p-1.5 rounded-2xl border flex flex-wrap gap-1.5 ${
          isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-100/80 border-slate-200'
        }`}
      >
        <button
          onClick={() => setSelectedTier('junior')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-left font-bold text-xs transition-all flex items-center justify-between ${
            selectedTier === 'junior'
              ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:bg-slate-800'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span className="text-lg">🐱</span>
            <div>
              <div className="font-extrabold text-sm">Junior Explorer (6–9 thn)</div>
              <div
                className={`text-[11px] ${
                  selectedTier === 'junior' ? 'text-slate-800 font-medium' : 'text-slate-400'
                }`}
              >
                Scratch 3.0 & Computational Thinking
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              selectedTier === 'junior'
                ? 'bg-black/15 text-slate-900'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {stats.juniorCount} Sesi
          </span>
        </button>

        <button
          onClick={() => setSelectedTier('middle')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-left font-bold text-xs transition-all flex items-center justify-between ${
            selectedTier === 'middle'
              ? 'bg-blue-600 text-white shadow-md scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:bg-slate-800'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span className="text-lg">🐍</span>
            <div>
              <div className="font-extrabold text-sm">Middle Coder (10–12 thn)</div>
              <div
                className={`text-[11px] ${
                  selectedTier === 'middle' ? 'text-blue-100 font-medium' : 'text-slate-400'
                }`}
              >
                Python Logic & Roblox Studio Lua 3D
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              selectedTier === 'middle'
                ? 'bg-black/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {stats.middleCount} Sesi
          </span>
        </button>

        <button
          onClick={() => setSelectedTier('teens')}
          className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl text-left font-bold text-xs transition-all flex items-center justify-between ${
            selectedTier === 'teens'
              ? 'bg-purple-600 text-white shadow-md scale-[1.01]'
              : isDark
              ? 'text-slate-300 hover:bg-slate-800'
              : 'text-slate-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <span className="text-lg">⚡</span>
            <div>
              <div className="font-extrabold text-sm">Teens Innovator (13–17 thn)</div>
              <div
                className={`text-[11px] ${
                  selectedTier === 'teens' ? 'text-purple-100 font-medium' : 'text-slate-400'
                }`}
              >
                Modern Fullstack Web & AI Engineering
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
              selectedTier === 'teens'
                ? 'bg-black/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {stats.teensCount} Sesi
          </span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari topik sesi, konsep, proyek..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <div className="flex items-center space-x-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Tingkat:</span>
          </div>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Tingkat</option>
            <option value="beginner">Dasar / Beginner</option>
            <option value="intermediate">Menengah / Intermediate</option>
            <option value="advanced">Mahir / Advanced</option>
          </select>
        </div>
      </div>

      {/* Session Cards List */}
      <div className="space-y-4">
        {filteredSessions.length === 0 ? (
          <div
            className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-slate-800/30 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-50" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              Tidak ada sesi kurikulum yang cocok dengan pencarian
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Silakan ubah kata kunci pencarian atau klik "Tambah Sesi Baru" untuk membuat modul baru.
            </p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className={`p-5 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-200 hover:border-amber-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Session Header & Title */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-300/40 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                    #{session.sessionNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {session.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                          session.difficulty === 'beginner'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            : session.difficulty === 'intermediate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                        }`}
                      >
                        {session.difficulty}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.durationMinutes} menit</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {session.description}
                    </p>

                    {/* Core Concepts */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        Konsep Logika:
                      </span>
                      {session.coreConcepts.map((concept, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Toggle & Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0 self-start">
                  <button
                    onClick={() => handleToggleActive(session.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-colors ${
                      session.isActive
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}
                    title="Klik untuk mengubah status aktif"
                  >
                    {session.isActive ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                    )}
                    <span>{session.isActive ? 'Aktif' : 'Nonaktif'}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(session)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'border-slate-700 text-slate-300 hover:bg-slate-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    title="Edit Sesi Kurikulum"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(session.id, session.title)}
                    className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                    title="Hapus Sesi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Project Outcome & Material Links Bar */}
              <div
                className={`mt-4 pt-3.5 border-t grid grid-cols-1 md:grid-cols-2 gap-3 text-xs ${
                  isDark ? 'border-slate-700/80' : 'border-slate-100'
                }`}
              >
                {/* Target Project Box */}
                <div
                  className={`p-2.5 rounded-xl border flex items-start space-x-2 ${
                    isDark ? 'bg-amber-950/20 border-amber-800/40 text-amber-300' : 'bg-amber-50/60 border-amber-200 text-amber-900'
                  }`}
                >
                  <Target className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider block">
                      Target Karya Siswa:
                    </span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {session.projectOutcome}
                    </span>
                  </div>
                </div>

                {/* Homework / Challenge Box */}
                <div
                  className={`p-2.5 rounded-xl border flex items-start space-x-2 ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[11px] uppercase tracking-wider block text-blue-600 dark:text-blue-400">
                      Tantangan Mandiri / PR:
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {session.homeworkTask || 'Eksplorasi mandiri sesuai panduan instruktur.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Resource Material Pills */}
              <div className="mt-3 flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">Bahan Ajar:</span>

                {session.slideUrl ? (
                  <a
                    href={session.slideUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 transition-colors"
                  >
                    <Presentation className="w-3.5 h-3.5 text-blue-500" />
                    <span>Slide Presentasi</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">Slide belum ditautkan</span>
                )}

                {session.starterCodeUrl && (
                  <a
                    href={session.starterCodeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5 text-purple-500" />
                    <span>Starter Code</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}

                {session.worksheetUrl && (
                  <a
                    href={session.worksheetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Lembar Kerja PDF</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Session Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${
              isDark ? 'bg-slate-900 border border-slate-700 text-slate-100' : 'bg-white border border-slate-200 text-slate-900'
            }`}
          >
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50/70 border-amber-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base">
                  {editingSession ? 'Edit Sesi Kurikulum' : 'Tambah Sesi Kurikulum Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Jenjang (Tier)
                  </label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as CurriculumTier)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="junior">Junior Explorer (6–9 thn)</option>
                    <option value="middle">Middle Coder (10–12 thn)</option>
                    <option value="teens">Teens Innovator (13–17 thn)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Nomor Sesi (1-24)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={formSessionNumber}
                    onChange={(e) => setFormSessionNumber(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Tingkat Kesulitan
                  </label>
                  <select
                    value={formDifficulty}
                    onChange={(e) => setFormDifficulty(e.target.value as SessionDifficulty)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="beginner">Dasar / Beginner</option>
                    <option value="intermediate">Menengah / Intermediate</option>
                    <option value="advanced">Mahir / Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Judul Sesi Pembelajaran *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Variabel Dinamis, Sistem Skor & Countdown Timer"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Deskripsi Singkat & Tujuan Pembelajaran
                </label>
                <textarea
                  rows={2}
                  placeholder="Jelaskan apa yang dipelajari siswa dalam sesi ini..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Konsep Logika / Pilar Utama (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Algoritma, Looping, Variables, Collision Detection"
                  value={formConcepts}
                  onChange={(e) => setFormConcepts(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Target Output Proyek Siswa
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Game Tangkap Madu Jatuh dengan Skor dan Timer 30 Detik"
                  value={formProjectOutcome}
                  onChange={(e) => setFormProjectOutcome(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Tautan Slide Presentasi (Canva / Google Slides)
                  </label>
                  <input
                    type="url"
                    placeholder="https://slides.google.com/..."
                    value={formSlideUrl}
                    onChange={(e) => setFormSlideUrl(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Tautan Starter Code / Project Base
                  </label>
                  <input
                    type="url"
                    placeholder="https://scratch.mit.edu/projects/... atau Replit"
                    value={formStarterCodeUrl}
                    onChange={(e) => setFormStarterCodeUrl(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Tautan Worksheet / Lembar Panduan PDF
                  </label>
                  <input
                    type="url"
                    placeholder="https://assets.beekoding.id/...pdf"
                    value={formWorksheetUrl}
                    onChange={(e) => setFormWorksheetUrl(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Durasi Sesi (Menit)
                  </label>
                  <input
                    type="number"
                    min={30}
                    max={180}
                    value={formDuration}
                    onChange={(e) => setFormDuration(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Tantangan Mandiri / Tugas Rumah (Homework)
                </label>
                <input
                  type="text"
                  placeholder="Tambahkan 2 fitur unik pada game buatanmu di rumah..."
                  value={formHomeworkTask}
                  onChange={(e) => setFormHomeworkTask(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="formIsActive"
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                />
                <label htmlFor="formIsActive" className="text-xs font-semibold">
                  Sesi ini aktif dan masuk ke dalam silabus berjalan
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-all"
                >
                  {editingSession ? 'Simpan Perubahan' : 'Buat Sesi Baru'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Syllabus Document Modal (Print & WA Share) */}
      <AdminCurriculumModal
        isOpen={isSyllabusModalOpen}
        tier={selectedTier}
        sessions={tierSessions}
        onClose={() => setIsSyllabusModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
};
