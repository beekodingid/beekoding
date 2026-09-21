import React, { useState, useMemo } from 'react';
import {
  getClassAnnouncements,
  createClassAnnouncement,
  updateClassAnnouncement,
  deleteClassAnnouncement,
  togglePinAnnouncement,
  exportAnnouncementsCSV,
  generateWhatsAppBroadcastMessage,
  resetClassAnnouncementsToDefault,
  type ClassAnnouncement,
  type AnnouncementCategory,
  type AnnouncementAudience,
  type AnnouncementStatus,
} from '../../services/adminStorage';
import { AdminAnnouncementModal } from './AdminAnnouncementModal';
import {
  Megaphone,
  Plus,
  Search,
  Pin,
  Send,
  Trash2,
  Edit2,
  Download,
  CheckCircle2,
  X,
  AlertTriangle,
  Calendar,
  Users,
  Copy,
  Check,
  ExternalLink,
  RotateCcw,
  Eye,
} from 'lucide-react';

interface AdminAnnouncementsProps {
  isDark: boolean;
}

export const AdminAnnouncements: React.FC<AdminAnnouncementsProps> = ({ isDark }) => {
  const [announcements, setAnnouncements] = useState<ClassAnnouncement[]>(() =>
    getClassAnnouncements()
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<AnnouncementCategory | 'all'>('all');
  const [audienceFilter, setAudienceFilter] = useState<AnnouncementAudience | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<AnnouncementStatus | 'all'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<ClassAnnouncement | null>(null);

  // WhatsApp Broadcast Modal State
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastTargetAnnouncement, setBroadcastTargetAnnouncement] =
    useState<ClassAnnouncement | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Alert State
  const [alertInfo, setAlertInfo] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'info' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 4000);
  };

  const refreshData = () => {
    setAnnouncements(getClassAnnouncements());
  };

  // 4 Top Metrics
  const metrics = useMemo(() => {
    const totalPublished = announcements.filter((a) => a.status === 'published').length;
    const pinnedCount = announcements.filter((a) => a.pinned).length;
    const urgentCount = announcements.filter((a) => a.priority === 'urgent').length;
    const totalReads = announcements.reduce((acc, a) => acc + (a.readCount || 0), 0);

    return {
      totalPublished,
      pinnedCount,
      urgentCount,
      totalReads,
    };
  }, [announcements]);

  // Filtered List
  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((a) => {
        const matchCategory = categoryFilter === 'all' || a.category === categoryFilter;
        const matchAudience = audienceFilter === 'all' || a.audience === audienceFilter;
        const matchStatus = statusFilter === 'all' || a.status === statusFilter;
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          (a.batchName && a.batchName.toLowerCase().includes(q));

        return matchCategory && matchAudience && matchStatus && matchSearch;
      })
      .sort((a, b) => {
        // Pinned first, then newest
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [announcements, categoryFilter, audienceFilter, statusFilter, searchQuery]);

  // Handlers
  const handleOpenCreateModal = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (a: ClassAnnouncement) => {
    setEditingAnnouncement(a);
    setIsModalOpen(true);
  };

  const handleSave = (
    data: Omit<ClassAnnouncement, 'id' | 'createdAt' | 'updatedAt' | 'readCount'>
  ) => {
    if (editingAnnouncement) {
      const updated = updateClassAnnouncement(editingAnnouncement.id, data);
      if (updated) {
        refreshData();
        showAlert('success', `Pengumuman "${updated.title}" berhasil diperbarui.`);
        setIsModalOpen(false);
      }
    } else {
      const created = createClassAnnouncement(data);
      refreshData();
      showAlert('success', `Pengumuman "${created.title}" berhasil diterbitkan.`);
      setIsModalOpen(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Hapus pengumuman "${title}" secara permanen?`)) {
      const ok = deleteClassAnnouncement(id);
      if (ok) {
        refreshData();
        showAlert('success', `Pengumuman berhasil dihapus.`);
      }
    }
  };

  const handleTogglePin = (id: string) => {
    togglePinAnnouncement(id);
    refreshData();
  };

  const handleOpenBroadcastModal = (a: ClassAnnouncement) => {
    setBroadcastTargetAnnouncement(a);
    setCopiedText(false);
    setBroadcastModalOpen(true);
  };

  const handleCopyBroadcast = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset seluruh daftar pengumuman kembali ke contoh bawaan pabrik?')) {
      resetClassAnnouncementsToDefault();
      refreshData();
      showAlert('info', 'Daftar pengumuman berhasil direset ke data default.');
    }
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
            <CheckCircle2 className="w-4 h-4 shrink-0" />
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
              Pengumuman Kelas & Siaran WhatsApp
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
              Broadcast Manager
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sebarkan info libur, jadwal ujian capstone, kompetisi, dan siaran pesan resmi ke grup WA wali murid.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => exportAnnouncementsCSV(announcements)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className={`p-2 rounded-xl border text-slate-400 hover:text-amber-500 transition-colors cursor-pointer ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300'
            }`}
            title="Reset ke Pengumuman Default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Pengumuman</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-1">
            <span>Tayang Aktif</span>
            <Megaphone className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {metrics.totalPublished}
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
            Tampil di Portal Siswa
          </p>
        </div>

        {/* Metric 2 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-1">
            <span>Disematkan (PIN)</span>
            <Pin className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {metrics.pinnedCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Prioritas Baris Teratas</p>
        </div>

        {/* Metric 3 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-1">
            <span>Mendesak / Urgent</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-rose-600 dark:text-rose-400">
            {metrics.urgentCount}
          </div>
          <p className="text-[11px] text-rose-500 font-semibold mt-0.5">Perlu Tindak Lanjut</p>
        </div>

        {/* Metric 4 */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase mb-1">
            <span>Total Pembaca</span>
            <Eye className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {metrics.totalReads}x
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">Interaksi Wali & Siswa</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
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
            placeholder="Cari judul pengumuman, kata kunci isi teks, atau nama batch..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Kategori</option>
            <option value="academic">Akademik</option>
            <option value="holiday">Hari Libur</option>
            <option value="event">Event & Lomba</option>
            <option value="urgent">Mendesak</option>
            <option value="general">Umum</option>
          </select>

          <select
            value={audienceFilter}
            onChange={(e) => setAudienceFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Audiens</option>
            <option value="junior">Junior</option>
            <option value="middle">Middle</option>
            <option value="teens">Teens</option>
            <option value="specific_batch">Batch Tertentu</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none ${
              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="published">Tayang</option>
            <option value="draft">Draft</option>
            <option value="archived">Arsip</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="py-16 text-center text-slate-400 border border-dashed rounded-3xl">
            <Megaphone className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
            <p className="font-semibold text-sm">Tidak ada pengumuman yang sesuai filter</p>
            <p className="text-xs text-slate-500 mt-1">
              Ubah kriteria pencarian atau klik tombol "Buat Pengumuman" di atas.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map((item) => (
            <div
              key={item.id}
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                item.pinned
                  ? isDark
                    ? 'bg-gradient-to-r from-amber-500/10 via-[#121624] to-[#121624] border-amber-500/40 shadow-sm shadow-amber-500/5'
                    : 'bg-gradient-to-r from-amber-50/80 via-white to-white border-amber-300 shadow-xs'
                  : isDark
                  ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.pinned && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950">
                        <Pin className="w-3 h-3" /> PINNED
                      </span>
                    )}

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        item.priority === 'urgent'
                          ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                          : item.priority === 'important'
                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      Prioritas: {item.priority}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                      {item.category === 'holiday'
                        ? '🏖️ Libur Nasional'
                        : item.category === 'academic'
                        ? '🎓 Akademik'
                        : item.category === 'event'
                        ? '🏆 Event'
                        : item.category === 'urgent'
                        ? '⚠️ Mendesak'
                        : '📌 Umum'}
                    </span>

                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {item.audience === 'all'
                        ? 'Semua Siswa'
                        : item.audience === 'junior'
                        ? 'Junior Explorer'
                        : item.audience === 'middle'
                        ? 'Middle Coder'
                        : item.audience === 'teens'
                        ? 'Teens Innovator'
                        : item.batchName || 'Batch Khusus'}
                    </span>
                  </div>

                  <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>

                {/* Top Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTogglePin(item.id)}
                    className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                      item.pinned
                        ? 'bg-amber-500 text-slate-950 border-amber-500'
                        : isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title={item.pinned ? 'Lepas Pin' : 'Sematkan ke Atas'}
                  >
                    <Pin className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenBroadcastModal(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
                    title="Siarkan ke WhatsApp Wali Murid"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Siarkan WA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className={`p-2 rounded-xl border text-slate-400 hover:text-amber-500 transition-colors cursor-pointer ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                    }`}
                    title="Edit Pengumuman"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.title)}
                    className={`p-2 rounded-xl border text-slate-400 hover:text-rose-500 transition-colors cursor-pointer ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                    }`}
                    title="Hapus Pengumuman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Content Body */}
              <div className="py-3.5">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {item.content}
                </p>
              </div>

              {/* Footer Meta */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    Terbit: <strong>{item.publishedAt}</strong>
                  </span>
                  {item.expiresAt && (
                    <span>
                      Berakhir: <strong>{item.expiresAt}</strong>
                    </span>
                  )}
                  <span>
                    Oleh: <strong className="text-slate-700 dark:text-slate-300">{item.authorName}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Dibaca {item.readCount || 0} kali
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : item.status === 'draft'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                        : 'bg-slate-500/15 text-slate-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal 1: Create / Edit Announcement */}
      <AdminAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        announcement={editingAnnouncement}
        isDark={isDark}
      />

      {/* Modal 2: WhatsApp Broadcast Generator */}
      {broadcastModalOpen && broadcastTargetAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setBroadcastModalOpen(false)}
          />

          <div
            className={`relative w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 transition-all ${
              isDark
                ? 'bg-[#111422] border-emerald-500/30 text-white'
                : 'bg-white border-emerald-300 text-slate-900'
            }`}
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg font-['Space_Grotesk']">
                    Siaran Broadcast WhatsApp
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kirim pengumuman resmi ke grup kelas atau kontak wali murid
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBroadcastModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Pesan telah diformat otomatis dengan emoji, struktur bold, dan tautan portal kesiswaan:
              </div>

              <div
                className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto select-all ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-emerald-800'
                }`}
              >
                {generateWhatsAppBroadcastMessage(broadcastTargetAnnouncement)}
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleCopyBroadcast(
                      generateWhatsAppBroadcastMessage(broadcastTargetAnnouncement)
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Format Pesan</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://web.whatsapp.com/send?text=${encodeURIComponent(
                    generateWhatsAppBroadcastMessage(broadcastTargetAnnouncement)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25 transition-all"
                >
                  <span>Buka WhatsApp Web</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
