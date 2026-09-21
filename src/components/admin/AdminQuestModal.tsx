import React, { useState } from 'react';
import {
  type CodingQuest,
  type QuestDifficulty,
  type QuestStatus,
  getAchievementBadges,
} from '../../services/adminStorage';
import { X, Trophy, Sparkles, AlertCircle, Link, Calendar, CheckCircle2 } from 'lucide-react';

interface AdminQuestModalProps {
  quest: CodingQuest | null;
  isDark: boolean;
  onClose: () => void;
  onSave: (questData: Omit<CodingQuest, 'id' | 'createdAt' | 'updatedAt' | 'completedCount'>) => void;
}

export const AdminQuestModal: React.FC<AdminQuestModalProps> = ({
  quest,
  isDark,
  onClose,
  onSave,
}) => {
  const isEditing = !!quest;
  const badges = getAchievementBadges();

  const [title, setTitle] = useState(quest?.title || '');
  const [tier, setTier] = useState<'junior' | 'middle' | 'teens' | 'all'>(quest?.tier || 'all');
  const [difficulty, setDifficulty] = useState<QuestDifficulty>(quest?.difficulty || 'sedang');
  const [xpReward, setXpReward] = useState<number>(quest?.xpReward || 150);
  const [badgeRewardId, setBadgeRewardId] = useState<string>(quest?.badgeRewardId || '');
  const [submissionFormat, setSubmissionFormat] = useState<CodingQuest['submissionFormat']>(
    quest?.submissionFormat || 'link_scratch'
  );
  const [starterLink, setStarterLink] = useState(quest?.starterLink || 'https://scratch.mit.edu');
  const [deadline, setDeadline] = useState(
    () => quest?.deadline || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [status, setStatus] = useState<QuestStatus>(quest?.status || 'active');
  const [description, setDescription] = useState(quest?.description || '');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Judul tantangan koding wajib diisi.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Instruksi dan deskripsi tantangan koding wajib diisi.');
      return;
    }
    if (xpReward <= 0) {
      setErrorMsg('Hadiah Bee-XP minimal 10 XP.');
      return;
    }

    onSave({
      title: title.trim(),
      tier,
      difficulty,
      xpReward,
      badgeRewardId: badgeRewardId || undefined,
      submissionFormat,
      starterLink: starterLink.trim() || undefined,
      deadline,
      status,
      description: description.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-xs">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          isDark ? 'bg-[#121624] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-gradient-to-r from-amber-50 to-yellow-50 border-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base font-['Space_Grotesk']">
                {isEditing ? 'Edit Tantangan Koding' : 'Rilis Tantangan Koding Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tantangan koding mingguan berhadiah Bee-XP & Lencana Prestasi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Judul Tantangan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Judul Tantangan Koding *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Labirin Lebah Pengumpul Madu 2D"
              className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Jenjang & Tingkat Kesulitan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Jenjang Sasaran
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
                className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="all">Semua Jenjang (Junior / Middle / Teens)</option>
                <option value="junior">Junior Explorer (Scratch & Visual AI)</option>
                <option value="middle">Middle Coder (Python & Roblox Studio)</option>
                <option value="teens">Teens Innovator (Web & Cloud AI)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Tingkat Kesulitan
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as QuestDifficulty)}
                className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="mudah">Mudah (+100 XP)</option>
                <option value="sedang">Sedang (+150 - 200 XP)</option>
                <option value="menantang">Menantang (+250 - 300 XP)</option>
              </select>
            </div>
          </div>

          {/* Hadiah XP & Lencana */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Hadiah Bee-XP *
              </label>
              <div className="relative">
                <Sparkles className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500" />
                <input
                  type="number"
                  min={10}
                  step={10}
                  value={xpReward}
                  onChange={(e) => setXpReward(Number(e.target.value) || 0)}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-2xl border text-sm font-bold ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-amber-400'
                      : 'bg-slate-50 border-slate-300 text-amber-600'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Bonus Lencana Digital
              </label>
              <select
                value={badgeRewardId}
                onChange={(e) => setBadgeRewardId(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="">Tanpa Lencana (Hanya XP)</option>
                {badges.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.iconEmoji} {b.title} (+{b.xpBonus} XP)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Format Submission & Starter Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Format Pengumpulan
              </label>
              <select
                value={submissionFormat}
                onChange={(e) => setSubmissionFormat(e.target.value as any)}
                className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="link_scratch">Tautan Scratch Proyek (Web)</option>
                <option value="file_python">File Python (.py) / Google Colab</option>
                <option value="link_github">Tautan GitHub / Live Demo Web</option>
                <option value="text">Teks Kode / Script Lua Roblox</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Starter Code / Template URL
              </label>
              <div className="relative">
                <Link className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={starterLink}
                  onChange={(e) => setStarterLink(e.target.value)}
                  placeholder="https://scratch.mit.edu"
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-2xl border text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Batas Waktu & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Batas Waktu Pengumpulan (Deadline)
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className={`w-full pl-10 pr-3.5 py-2.5 rounded-2xl border text-sm font-medium ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Status Quest
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as QuestStatus)}
                className={`w-full px-3.5 py-2.5 rounded-2xl border text-sm font-medium outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="active">Aktif (Tampil di Portal Siswa)</option>
                <option value="draft">Draft (Disimpan Sementara)</option>
                <option value="completed">Selesai (Ditutup)</option>
                <option value="archived">Diarsipkan</option>
              </select>
            </div>
          </div>

          {/* Deskripsi & Instruksi Tantangan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Instruksi & Deskripsi Misi *
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan tujuan misi koding, aturan mekanik yang harus dicapai, dan kriteria penilaian..."
              className={`w-full p-3.5 rounded-2xl border text-sm font-medium outline-none leading-relaxed ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Batal
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-950" />
              <span>{isEditing ? 'Simpan Perubahan' : 'Terbitkan Misi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
