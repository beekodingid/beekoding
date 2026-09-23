import React, { useState } from 'react';
import {
  type ClassAnnouncement,
  type AnnouncementCategory,
  type AnnouncementAudience,
  type AnnouncementStatus,
  type AnnouncementPriority,
  getBatches,
} from '../../services/adminStorage';
import { X, Megaphone, AlertCircle, Send } from 'lucide-react';

interface AdminAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: Omit<ClassAnnouncement, 'id' | 'createdAt' | 'updatedAt' | 'readCount'>
  ) => void;
  announcement?: ClassAnnouncement | null;
  isDark: boolean;
}

export const AdminAnnouncementModal: React.FC<AdminAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onSave,
  announcement,
  isDark,
}) => {
  const batches = getBatches();

  const [title, setTitle] = useState(announcement?.title || '');
  const [category, setCategory] = useState<AnnouncementCategory>(
    announcement?.category || 'academic'
  );
  const [audience, setAudience] = useState<AnnouncementAudience>(
    announcement?.audience || 'all'
  );
  const [batchId, setBatchId] = useState(announcement?.batchId || '');
  const [content, setContent] = useState(announcement?.content || '');
  const [priority, setPriority] = useState<AnnouncementPriority>(
    announcement?.priority || 'normal'
  );
  const [pinned, setPinned] = useState(announcement?.pinned || false);
  const [authorName, setAuthorName] = useState(
    announcement?.authorName || 'Admin Akademik Beekoding'
  );
  const [publishedAt, setPublishedAt] = useState(
    () => announcement?.publishedAt || new Date().toISOString().split('T')[0]
  );
  const [expiresAt, setExpiresAt] = useState(announcement?.expiresAt || '');
  const [status, setStatus] = useState<AnnouncementStatus>(
    announcement?.status || 'published'
  );
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Judul pengumuman wajib diisi.');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Isi teks pengumuman tidak boleh kosong.');
      return;
    }

    const selectedBatch = batches.find((b) => b.id === batchId);

    onSave({
      title: title.trim(),
      category,
      audience,
      batchId: audience === 'specific_batch' ? batchId : undefined,
      batchName: audience === 'specific_batch' ? selectedBatch?.name : undefined,
      content: content.trim(),
      priority,
      pinned,
      authorName: authorName.trim() || 'Admin Akademik',
      publishedAt,
      expiresAt: expiresAt || undefined,
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 my-8 transition-all ${
          isDark
            ? 'bg-[#111422] border-amber-500/30 text-white'
            : 'bg-white border-amber-300 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg font-['Space_Grotesk']">
                {announcement ? 'Edit Pengumuman Kelas' : 'Buat Pengumuman / Siaran Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Informasikan jadwal, libur, event, atau perubahan sesi ke siswa & orang tua
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Judul Pengumuman */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Judul Pengumuman <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: 📢 Penyesuaian Jadwal Kelas Sesi 8 & Ujian Capstone"
              className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Grid Kategori & Prioritas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="academic">🎓 Akademik & Kurikulum</option>
                <option value="holiday">🏖️ Hari Libur & Kalender</option>
                <option value="event">🏆 Event & Kompetisi</option>
                <option value="urgent">⚠️ Peringatan Mendesak</option>
                <option value="general">📌 Informasi Umum</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Tingkat Prioritas
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="normal">Normal (Informasi Rutin)</option>
                <option value="important">Penting (Highlight Emas)</option>
                <option value="urgent">Mendesak / Darurat (Highlight Merah)</option>
              </select>
            </div>
          </div>

          {/* Grid Sasaran Audiens & Batch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Sasaran Penerima (Audiens)
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as AnnouncementAudience)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="all">🌐 Seluruh Siswa & Wali Murid</option>
                <option value="junior">Junior Explorer (6-9 Thn)</option>
                <option value="middle">Middle Coder (10-12 Thn)</option>
                <option value="teens">Teens Innovator (13-17 Thn)</option>
                <option value="specific_batch">🎯 Batch Kelas Tertentu</option>
              </select>
            </div>

            {audience === 'specific_batch' ? (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Pilih Batch Kelas
                </label>
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <option value="">-- Pilih Batch Kelas --</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                  Nama Penulis / Pembuat
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Contoh: Admin Akademik Beekoding"
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border outline-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
            )}
          </div>

          {/* Grid Tanggal Terbit & Tanggal Berakhir */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Tanggal Terbit
              </label>
              <input
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Berakhir Pada (Opsional)
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Status Publikasi
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AnnouncementStatus)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-medium border outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="published">Tayang (Published)</option>
                <option value="draft">Draft (Simpan Sementara)</option>
                <option value="archived">Arsip</option>
              </select>
            </div>
          </div>

          {/* Sakelar Pinned */}
          <div
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div>
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                Sematkan Pengumuman (*Pin to Top*) 📌
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Pengumuman yang disematkan akan selalu berada di baris paling atas portal siswa.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          {/* Isi Pengumuman */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Isi Teks Pengumuman <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan isi pengumuman secara rinci, jadwal, link dokumen, instruksi untuk wali murid..."
              className={`w-full p-3.5 rounded-xl text-xs sm:text-sm font-medium border outline-none leading-relaxed ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{announcement ? 'Simpan Perubahan' : 'Terbitkan Pengumuman'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
