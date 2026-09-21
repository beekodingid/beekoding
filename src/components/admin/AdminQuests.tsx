import React, { useState, useMemo } from 'react';
import {
  type CodingQuest,
  type AchievementBadge,
  type StudentGamificationProfile,
  type QuestDifficulty,
  type QuestStatus,
  getCodingQuests,
  createCodingQuest,
  updateCodingQuest,
  deleteCodingQuest,
  resetCodingQuestsToDefault,
  getAchievementBadges,
  getGamificationProfiles,
  awardBadgeToStudent,
  awardXpToStudent,
  resetGamificationToDefault,
  exportQuestsCSV,
} from '../../services/adminStorage';
import { AdminQuestModal } from './AdminQuestModal';
import {
  Trophy,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  Download,
  RotateCcw,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  Flame,
  Award,
  Crown,
  Medal,
} from 'lucide-react';

interface AdminQuestsProps {
  isDark: boolean;
}

export const AdminQuests: React.FC<AdminQuestsProps> = ({ isDark }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quests' | 'badges' | 'leaderboard'>('quests');
  const [quests, setQuests] = useState<CodingQuest[]>(() => getCodingQuests());
  const [badges, setBadges] = useState<AchievementBadge[]>(() => getAchievementBadges());
  const [profiles, setProfiles] = useState<StudentGamificationProfile[]>(() =>
    getGamificationProfiles()
  );

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'junior' | 'middle' | 'teens'>('all');
  const [statusFilter, setStatusFilter] = useState<QuestStatus | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<QuestDifficulty | 'all'>('all');

  // Modal States
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [editingQuest, setEditingQuest] = useState<CodingQuest | null>(null);

  // Award Modal State
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awardStudentName, setAwardStudentName] = useState('');
  const [selectedBadgeId, setSelectedBadgeId] = useState('');
  const [awardXpAmount, setAwardXpAmount] = useState<number>(50);

  // Alert State
  const [alertInfo, setAlertInfo] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'info' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  const refreshAll = () => {
    setQuests(getCodingQuests());
    setBadges(getAchievementBadges());
    setProfiles(getGamificationProfiles());
  };

  // Top Metrics Calculation
  const metrics = useMemo(() => {
    const activeQuests = quests.filter((q) => q.status === 'active').length;
    const totalXpDistributed = profiles.reduce((sum, p) => sum + p.totalXp, 0);
    const totalBadgesAwarded = badges.reduce((sum, b) => sum + b.awardCount, 0);
    const topCoder = [...profiles].sort((a, b) => b.totalXp - a.totalXp)[0]?.studentName || 'Kenzo Alvaro';

    return {
      activeQuests,
      totalXpDistributed,
      totalBadgesAwarded,
      topCoder,
    };
  }, [quests, profiles, badges]);

  // Filtered Quests
  const filteredQuests = useMemo(() => {
    return quests.filter((q) => {
      const matchTier = tierFilter === 'all' || q.tier === tierFilter || q.tier === 'all';
      const matchStatus = statusFilter === 'all' || q.status === statusFilter;
      const matchDifficulty = difficultyFilter === 'all' || q.difficulty === difficultyFilter;
      const qLower = searchQuery.toLowerCase().trim();
      const matchSearch =
        !qLower ||
        q.title.toLowerCase().includes(qLower) ||
        q.description.toLowerCase().includes(qLower);

      return matchTier && matchStatus && matchDifficulty && matchSearch;
    });
  }, [quests, tierFilter, statusFilter, difficultyFilter, searchQuery]);

  // Sorted Leaderboard
  const sortedProfiles = useMemo(() => {
    return [...profiles]
      .filter((p) => tierFilter === 'all' || p.tier === tierFilter)
      .sort((a, b) => b.totalXp - a.totalXp);
  }, [profiles, tierFilter]);

  // Handlers for Quests
  const handleOpenCreateModal = () => {
    setEditingQuest(null);
    setIsQuestModalOpen(true);
  };

  const handleOpenEditModal = (q: CodingQuest) => {
    setEditingQuest(q);
    setIsQuestModalOpen(true);
  };

  const handleSaveQuest = (
    data: Omit<CodingQuest, 'id' | 'createdAt' | 'updatedAt' | 'completedCount'>
  ) => {
    if (editingQuest) {
      const updated = updateCodingQuest(editingQuest.id, data);
      if (updated) {
        refreshAll();
        showAlert('success', `Tantangan "${updated.title}" berhasil diperbarui.`);
        setIsQuestModalOpen(false);
      }
    } else {
      const created = createCodingQuest(data);
      refreshAll();
      showAlert('success', `Tantangan baru "${created.title}" berhasil diterbitkan!`);
      setIsQuestModalOpen(false);
    }
  };

  const handleDeleteQuest = (id: string, title: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tantangan "${title}"?`)) {
      deleteCodingQuest(id);
      refreshAll();
      showAlert('info', `Tantangan "${title}" telah dihapus.`);
    }
  };

  const handleToggleQuestStatus = (q: CodingQuest) => {
    const nextStatus: QuestStatus = q.status === 'active' ? 'completed' : 'active';
    updateCodingQuest(q.id, { status: nextStatus });
    refreshAll();
    showAlert(
      'success',
      `Status tantangan diubah menjadi ${nextStatus === 'active' ? 'Aktif' : 'Selesai'}.`
    );
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Kembalikan seluruh data tantangan koding, lencana, dan profil gamifikasi ke data awal pabrik?'
      )
    ) {
      resetCodingQuestsToDefault();
      resetGamificationToDefault();
      refreshAll();
      showAlert('success', 'Data gamifikasi berhasil dikembalikan ke default realistis.');
    }
  };

  // Handlers for Awarding Badges & XP
  const handleOpenAwardModal = (defaultStudentName?: string, defaultBadgeId?: string) => {
    setAwardStudentName(defaultStudentName || sortedProfiles[0]?.studentName || '');
    setSelectedBadgeId(defaultBadgeId || badges[0]?.id || '');
    setAwardXpAmount(50);
    setIsAwardModalOpen(true);
  };

  const handleSubmitAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardStudentName.trim()) {
      showAlert('error', 'Silakan pilih atau masukkan nama siswa.');
      return;
    }

    let message = '';
    if (selectedBadgeId) {
      const ok = awardBadgeToStudent(awardStudentName.trim(), selectedBadgeId);
      if (ok) {
        const badge = badges.find((b) => b.id === selectedBadgeId);
        message += `Lencana "${badge?.title}" dianugerahkan! `;
      } else {
        showAlert('info', 'Siswa tersebut telah memiliki lencana ini.');
      }
    }

    if (awardXpAmount > 0) {
      awardXpToStudent(awardStudentName.trim(), awardXpAmount);
      message += `+${awardXpAmount} Bee-XP berhasil ditambahkan.`;
    }

    refreshAll();
    if (message) showAlert('success', message);
    setIsAwardModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Alert Notification Toast */}
      {alertInfo && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg transition-all animate-fade-in ${
            alertInfo.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : alertInfo.type === 'error'
              ? 'bg-rose-500/15 border-rose-500/30 text-rose-600 dark:text-rose-400'
              : 'bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{alertInfo.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlertInfo(null)}
            className="p-1 rounded-lg hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] tracking-tight text-slate-900 dark:text-white">
              Gamifikasi & Tantangan Koding
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              Bee-XP & Quests
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pengelolaan misi mingguan berhadiah Bee-XP, katalog lencana prestasi digital, dan papan Hall of Fame.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleResetToDefault}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Kembalikan data default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={() => exportQuestsCSV(quests)}
            className={`px-3 py-2 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Ekspor rekap CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenAwardModal()}
            className="px-3.5 py-2 rounded-2xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Anugerahkan Lencana</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Rilis Quest Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Tantangan Aktif
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {metrics.activeQuests}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Dari total {quests.length} quest</p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Total Bee-XP
            </span>
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {metrics.totalXpDistributed.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Tersalurkan ke seluruh siswa</p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Lencana Diberikan
            </span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {metrics.totalBadgesAwarded}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Dari 8 koleksi lencana resmi</p>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Juara 1 Hall of Fame
            </span>
            <Crown className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-lg sm:text-xl font-black font-['Space_Grotesk'] text-amber-600 dark:text-amber-400 truncate">
            {metrics.topCoder}
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">Peringkat tertinggi</p>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div
        className={`flex items-center gap-2 p-1.5 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveSubTab('quests')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeSubTab === 'quests'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Tantangan Mingguan ({quests.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('badges')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeSubTab === 'badges'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Katalog Lencana ({badges.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeSubTab === 'leaderboard'
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm'
              : isDark
              ? 'text-slate-400 hover:text-white'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Hall of Fame & Leaderboard ({profiles.length})</span>
        </button>
      </div>

      {/* ========================================== */}
      {/* SUB-TAB 1: WEEKLY QUESTS                   */}
      {/* ========================================== */}
      {activeSubTab === 'quests' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul tantangan atau instruksi..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="all">Semua Jenjang</option>
                <option value="junior">Junior Explorer</option>
                <option value="middle">Middle Coder</option>
                <option value="teens">Teens Innovator</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="completed">Selesai</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value as any)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="all">Semua Kesulitan</option>
                <option value="beginner">Pemula (Beginner)</option>
                <option value="intermediate">Menengah (Intermediate)</option>
                <option value="advanced">Mahir (Advanced)</option>
              </select>
            </div>
          </div>

          {/* Quests Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuests.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400">
                <Flame className="w-8 h-8 mx-auto mb-2 opacity-30 text-amber-500" />
                <p className="font-semibold text-sm">Tidak ada tantangan koding yang cocok</p>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah kata kunci pencarian atau reset filter.
                </p>
              </div>
            ) : (
              filteredQuests.map((q) => {
                const badgeReward = badges.find((b) => b.id === q.badgeRewardId);
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                      isDark
                        ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40'
                        : 'bg-white border-slate-200 hover:border-amber-400 shadow-xs'
                    }`}
                  >
                    <div>
                      {/* Card Header Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                          {q.tier.toUpperCase()}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            q.difficulty === 'mudah'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : q.difficulty === 'sedang'
                              ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                              : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                        {q.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                        {q.description}
                      </p>

                      {/* Reward Chip */}
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>+{q.xpReward} XP</span>
                        </span>

                        {badgeReward && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <span>{badgeReward.iconEmoji}</span>
                            <span>{badgeReward.title}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Batas: {q.deadline}</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {q.completedCount} Tuntas
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleToggleQuestStatus(q)}
                          className={`text-xs px-2.5 py-1 rounded-xl font-bold border transition-colors cursor-pointer ${
                            q.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-slate-500/10 text-slate-500 border-slate-500/30 hover:bg-slate-500/20'
                          }`}
                        >
                          {q.status === 'active' ? '● Aktif' : '○ Selesai'}
                        </button>

                        <div className="flex items-center gap-1">
                          {q.starterLink && (
                            <a
                              href={q.starterLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                              title="Buka Template"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(q)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
                            title="Edit Tantangan"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuest(q.id, q.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Hapus Tantangan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* SUB-TAB 2: BADGES CATALOG                  */}
      {/* ========================================== */}
      {activeSubTab === 'badges' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-5 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  b.rarity === 'legendary'
                    ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent'
                    : b.rarity === 'epic'
                    ? 'border-purple-500/40 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent'
                    : b.rarity === 'rare'
                    ? 'border-sky-500/30 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent'
                    : isDark
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                        b.rarity === 'legendary'
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : b.rarity === 'epic'
                          ? 'bg-purple-500 text-white'
                          : b.rarity === 'rare'
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {b.rarity}
                    </span>
                    <span className="text-xs font-bold text-amber-500">+{b.xpBonus} XP</span>
                  </div>

                  <div className="text-4xl sm:text-5xl my-2 text-center select-none">{b.iconEmoji}</div>

                  <h4 className="font-black text-center text-base text-slate-900 dark:text-white mt-2">
                    {b.title}
                  </h4>
                  <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{b.awardCount} Siswa Meraih</span>
                  <button
                    type="button"
                    onClick={() => handleOpenAwardModal(undefined, b.id)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    Beri ke Siswa →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* SUB-TAB 3: HALL OF FAME LEADERBOARD        */}
      {/* ========================================== */}
      {activeSubTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* Rank 2 (Silver) */}
            {sortedProfiles[1] && (
              <div
                className={`p-6 rounded-3xl border text-center relative overflow-hidden order-2 sm:order-1 ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-700'
                    : 'bg-gradient-to-b from-slate-100 to-white border-slate-300'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-400/20 text-slate-400 flex items-center justify-center font-black text-xl mb-2">
                  🥈
                </div>
                <div className="text-xs font-bold uppercase text-slate-400">Peringkat 2</div>
                <h4 className="font-black text-lg text-slate-900 dark:text-white mt-1">
                  {sortedProfiles[1].studentName}
                </h4>
                <p className="text-xs text-amber-500 font-semibold">{sortedProfiles[1].levelTitle}</p>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {sortedProfiles[1].totalXp} <span className="text-xs font-normal text-slate-400">XP</span>
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  {sortedProfiles[1].earnedBadges.map((b, i) => (
                    <span key={i} title={b.badgeTitle} className="text-base">
                      {badges.find((bg) => bg.id === b.badgeId)?.iconEmoji || '🏅'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rank 1 (Gold) */}
            {sortedProfiles[0] && (
              <div
                className={`p-6 rounded-3xl border-2 text-center relative overflow-hidden order-1 sm:order-2 shadow-xl shadow-amber-500/10 ${
                  isDark
                    ? 'bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-900 border-amber-500/60'
                    : 'bg-gradient-to-b from-amber-100/70 via-white to-amber-50 border-amber-400'
                }`}
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-2xl mb-2">
                  👑
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Juara 1 Hall of Fame
                </div>
                <h4 className="font-black text-xl text-slate-900 dark:text-white mt-1">
                  {sortedProfiles[0].studentName}
                </h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                  {sortedProfiles[0].levelTitle}
                </p>
                <div className="text-3xl font-black text-amber-500 mt-2">
                  {sortedProfiles[0].totalXp} <span className="text-xs font-normal text-slate-400">XP</span>
                </div>
                <div className="flex justify-center gap-1.5 mt-2">
                  {sortedProfiles[0].earnedBadges.map((b, i) => (
                    <span key={i} title={b.badgeTitle} className="text-lg">
                      {badges.find((bg) => bg.id === b.badgeId)?.iconEmoji || '🏅'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {sortedProfiles[2] && (
              <div
                className={`p-6 rounded-3xl border text-center relative overflow-hidden order-3 sm:order-3 ${
                  isDark
                    ? 'bg-slate-900/60 border-amber-900/40'
                    : 'bg-gradient-to-b from-amber-50 to-white border-amber-300'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-700/20 text-amber-700 flex items-center justify-center font-black text-xl mb-2">
                  🥉
                </div>
                <div className="text-xs font-bold uppercase text-amber-700 dark:text-amber-500">
                  Peringkat 3
                </div>
                <h4 className="font-black text-lg text-slate-900 dark:text-white mt-1">
                  {sortedProfiles[2].studentName}
                </h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {sortedProfiles[2].levelTitle}
                </p>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {sortedProfiles[2].totalXp} <span className="text-xs font-normal text-slate-400">XP</span>
                </div>
                <div className="flex justify-center gap-1 mt-2">
                  {sortedProfiles[2].earnedBadges.map((b, i) => (
                    <span key={i} title={b.badgeTitle} className="text-base">
                      {badges.find((bg) => bg.id === b.badgeId)?.iconEmoji || '🏅'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Full Leaderboard Table */}
          <div
            className={`rounded-3xl border overflow-hidden ${
              isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Medal className="w-4 h-4 text-amber-500" />
                <span>Peringkat Keseluruhan Siswa</span>
              </h3>
              <span className="text-xs text-slate-500">{sortedProfiles.length} Siswa Terdaftar</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead
                  className={`border-b font-bold ${
                    isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-600'
                  }`}
                >
                  <tr>
                    <th className="py-3 px-4 w-12 text-center">Rank</th>
                    <th className="py-3 px-4">Nama Siswa & Jenjang</th>
                    <th className="py-3 px-4">Level Lebah</th>
                    <th className="py-3 px-4 text-center">Total XP</th>
                    <th className="py-3 px-4">Lencana Koleksi</th>
                    <th className="py-3 px-4 text-center">Quest Tuntas</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                  {sortedProfiles.map((p, idx) => (
                    <tr
                      key={p.studentId}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-4 text-center font-black">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{p.studentName}</div>
                        <span className="text-[11px] text-slate-500 uppercase">{p.tier}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {p.levelTitle}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-mono font-black text-purple-600 dark:text-purple-400 text-base">
                          {p.totalXp}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 flex-wrap">
                          {p.earnedBadges.map((b, i) => {
                            const badgeData = badges.find((bg) => bg.id === b.badgeId);
                            return (
                              <span
                                key={i}
                                title={`${b.badgeTitle} (${b.earnedAt})`}
                                className="text-base cursor-help"
                              >
                                {badgeData?.iconEmoji || '🏅'}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-600">
                        {p.completedQuestsCount} Misi
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleOpenAwardModal(p.studentName)}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          + Beri XP/Badge
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Quest Modal Create/Edit */}
      {isQuestModalOpen && (
        <AdminQuestModal
          quest={editingQuest}
          isDark={isDark}
          onClose={() => setIsQuestModalOpen(false)}
          onSave={handleSaveQuest}
        />
      )}

      {/* Award Modal */}
      {isAwardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 transition-colors ${
              isDark ? 'bg-[#121624] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Anugerahkan Lencana / Bonus XP</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAwardModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitAward} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Nama Siswa Penerima *
                </label>
                <input
                  type="text"
                  list="students-list"
                  value={awardStudentName}
                  onChange={(e) => setAwardStudentName(e.target.value)}
                  placeholder="Ketik atau pilih nama siswa..."
                  className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                />
                <datalist id="students-list">
                  {sortedProfiles.map((p) => (
                    <option key={p.studentId} value={p.studentName} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pilih Lencana Digital
                </label>
                <select
                  value={selectedBadgeId}
                  onChange={(e) => setSelectedBadgeId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <option value="">Hanya Bonus XP (Tanpa Lencana)</option>
                  {badges.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.iconEmoji} {b.title} (+{b.xpBonus} XP - {b.rarity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Tambahan Bonus Bee-XP
                </label>
                <input
                  type="number"
                  min={0}
                  step={25}
                  value={awardXpAmount}
                  onChange={(e) => setAwardXpAmount(Number(e.target.value) || 0)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-amber-400' : 'bg-slate-50 border-slate-300 text-amber-600'
                  }`}
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAwardModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20"
                >
                  Anugerahkan Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
