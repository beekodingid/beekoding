import React, { useState } from 'react';
import {
  type LearningResource,
  type ResourceType,
  type ResourceAccessTier,
  type ResourceFileFormat,
} from '../../services/adminStorage';
import { X, FolderDown, AlertCircle, Link2, Tag } from 'lucide-react';

interface AdminResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: Omit<LearningResource, 'id' | 'downloadsCount' | 'createdAt' | 'updatedAt'>
  ) => void;
  resource?: LearningResource | null;
  isDark: boolean;
}

export const AdminResourceModal: React.FC<AdminResourceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  resource,
  isDark,
}) => {
  const [title, setTitle] = useState(resource?.title || '');
  const [description, setDescription] = useState(resource?.description || '');
  const [tier, setTier] = useState<ResourceAccessTier>(resource?.tier || 'all');
  const [sessionNumber, setSessionNumber] = useState<number | undefined>(
    resource?.sessionNumber
  );
  const [type, setType] = useState<ResourceType>(resource?.type || 'worksheet');
  const [fileFormat, setFileFormat] = useState<ResourceFileFormat>(
    resource?.fileFormat || 'pdf'
  );
  const [fileSize, setFileSize] = useState(resource?.fileSize || '2.5 MB');
  const [downloadUrl, setDownloadUrl] = useState(
    resource?.downloadUrl || 'https://assets.beekoding.id/resources/worksheet.pdf'
  );
  const [previewUrl, setPreviewUrl] = useState(resource?.previewUrl || '');
  const [isFeatured, setIsFeatured] = useState(resource?.isFeatured ?? false);
  const [tagsInput, setTagsInput] = useState(resource?.tags?.join(', ') || '');
  const [formError, setFormError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Judul materi pembelajaran tidak boleh kosong.');
      return;
    }
    if (!downloadUrl.trim()) {
      setFormError('Tautan unduh berkas wajib diisi.');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim(),
      description: description.trim(),
      tier,
      sessionNumber: sessionNumber && sessionNumber > 0 ? Number(sessionNumber) : undefined,
      type,
      fileFormat,
      fileSize: fileSize.trim() || undefined,
      downloadUrl: downloadUrl.trim(),
      previewUrl: previewUrl.trim() || undefined,
      isFeatured,
      tags: tags.length > 0 ? tags : ['Beekoding', 'Modul'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          isDark ? 'bg-[#121624] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/70 border-amber-200/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <FolderDown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {resource ? 'Edit Bahan Ajar / Modul' : 'Tambah Bahan Ajar / Modul Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Pusat materi, lembar kerja PDF, starter code, dan cheatsheet siswa
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
          {formError && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Judul Materi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
              Judul Bahan Ajar / Modul *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Lembar Kerja Logika Perulangan Loop Scratch 3.0"
              className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
              }`}
              required
            />
          </div>

          {/* Jenjang & Sesi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Jenjang Sasaran *
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value as ResourceAccessTier)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              >
                <option value="all">Semua Jenjang (Universal)</option>
                <option value="junior">Junior Explorer (6-9 Thn)</option>
                <option value="middle">Middle Coder (10-12 Thn)</option>
                <option value="teens">Teens Innovator (13-17 Thn)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Nomor Sesi (1-12)
              </label>
              <input
                type="number"
                min="1"
                max="12"
                value={sessionNumber || ''}
                onChange={(e) =>
                  setSessionNumber(e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="Kosongkan jika umum"
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Tipe Materi *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ResourceType)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              >
                <option value="worksheet">Worksheet / Lembar Kerja</option>
                <option value="slide">Slide Presentasi</option>
                <option value="cheatsheet">Cheatsheet Ringkas</option>
                <option value="starter_code">Starter Code & Template</option>
                <option value="guide">Buku Panduan & Ebook</option>
                <option value="video">Video Tutorial</option>
              </select>
            </div>
          </div>

          {/* Format & Ukuran */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Format Berkas *
              </label>
              <select
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value as ResourceFileFormat)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              >
                <option value="pdf">PDF Dokumen</option>
                <option value="zip">ZIP / Archive</option>
                <option value="scratch">Scratch Project (.sb3)</option>
                <option value="github">GitHub Repository</option>
                <option value="slides">Google Slides</option>
                <option value="mp4">Video MP4</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Estimasi Ukuran Berkas
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="Contoh: 3.2 MB atau Cloud Link"
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Tautan Unduh & Preview */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Tautan Unduh / File URL *</span>
              </label>
              <input
                type="url"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                placeholder="https://assets.beekoding.id/resources/..."
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-slate-400" />
                <span>Tautan Preview / Tayangan Langsung (Opsional)</span>
              </label>
              <input
                type="url"
                value={previewUrl}
                onChange={(e) => setPreviewUrl(e.target.value)}
                placeholder="https://..."
                className={`w-full px-4 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Tags & Unggulan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Tags / Kata Kunci (Pisahkan dengan koma)</span>
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Scratch 3.0, Algoritma, Puzzle"
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded-sm text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Materi Unggulan ⭐
                </span>
              </label>
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
              Deskripsi Singkat Isi Materi *
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan ringkasan materi, manfaat belajar, atau petunjuk pengerjaan lembar kerja..."
              className={`w-full px-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
              }`}
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              {resource ? 'Simpan Perubahan' : 'Terbitkan Materi Ajar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
