import React, { useState } from 'react';
import {
  type ConsultationInquiry,
  type InquiryStatus,
  updateInquiryStatus,
  updateInquiryNotes,
} from '../../services/adminStorage';
import {
  X,
  MessageSquare,
  User,
  Phone,
  Mail,
  BookOpen,
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Tag,
  ShieldCheck,
} from 'lucide-react';

interface AdminInquiryModalProps {
  inquiry: ConsultationInquiry;
  isDark: boolean;
  onClose: () => void;
  onUpdate: (updated: ConsultationInquiry) => void;
}

export const AdminInquiryModal: React.FC<AdminInquiryModalProps> = ({
  inquiry,
  isDark,
  onClose,
  onUpdate,
}) => {
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [notes, setNotes] = useState(inquiry.adminNotes || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Format nomor WhatsApp
  const phoneStr = inquiry.phone || '';
  const rawPhone = phoneStr.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;

  // Draf pesan WhatsApp siap kirim
  const waGreeting =
    (inquiry.role || '') === 'Orang Tua'
      ? `Bapak/Ibu ${inquiry.name || 'Wali Murid'}`
      : (inquiry.name || 'Sahabat Beekoding');

  const waText = encodeURIComponent(
    `Halo ${waGreeting} 👋,\n\n` +
      `Salam hangat dari Beekoding! 🐝\n` +
      `Kami telah menerima formulir ${
        inquiry.type === 'pendaftaran' ? 'pendaftaran' : 'permohonan konsultasi'
      } Anda untuk program *${inquiry.program}*.\n\n` +
      (inquiry.message ? `💬 *Pesan/Pertanyaan Anda:* "${inquiry.message}"\n\n` : '') +
      `Perkenalkan saya dari Tim Konselor & Akademik Beekoding. Apakah ada waktu luang hari ini untuk berdiskusi seputar detail jadwal, kurikulum, dan rekomendasi kelas yang paling pas? Terima kasih banyak! 🙏`
  );

  const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

  const handleSave = () => {
    updateInquiryStatus(inquiry.id, status);
    updateInquiryNotes(inquiry.id, notes);
    onUpdate({
      ...inquiry,
      status,
      adminNotes: notes,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const getStatusBadge = (st: InquiryStatus) => {
    switch (st) {
      case 'baru':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/15 text-blue-500 border border-blue-500/30">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Baru Masuk</span>
          </span>
        );
      case 'dihubungi':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Sudah Dihubungi</span>
          </span>
        );
      case 'jadwal_konsultasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-500 border border-purple-500/30">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Jadwal Konsultasi</span>
          </span>
        );
      case 'terdaftar':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Terdaftar (Closing)</span>
          </span>
        );
      case 'batal':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Batal / Ditunda</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl my-auto transition-all overflow-hidden flex flex-col max-h-[92vh] ${
          isDark
            ? 'bg-[#121622] border-slate-700 text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Modal */}
        <div
          className={`p-5 sm:p-6 border-b flex items-center justify-between sticky top-0 z-20 ${
            isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Detail Permohonan & Follow-Up
                </h3>
                <span
                  className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
                    inquiry.type === 'pendaftaran'
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                  }`}
                >
                  {inquiry.type === 'pendaftaran' ? 'Pendaftaran' : 'Konsultasi'}
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                ID: {inquiry.id} • Diterima: {inquiry.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              title="Kirim pesan WhatsApp follow-up resmi"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hubungi WA</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark
                  ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Status Saat Ini */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Status Follow-Up Saat Ini
              </span>
              <div>{getStatusBadge(status)}</div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 block">Jalur Masuk:</span>
              <span className="text-xs font-bold text-amber-500 flex items-center gap-1 justify-end">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Formulir Website Publik</span>
              </span>
            </div>
          </div>

          {/* Profil Pemohon */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>Informasi Calon Peserta / Pemohon</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Nama Lengkap:</span>
                <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white block">
                  {inquiry.name}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Status / Peran:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 inline-block px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  {inquiry.role}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Nomor WhatsApp:</span>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono text-sm">{inquiry.phone}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Alamat Email:</span>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-amber-500 hover:underline inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{inquiry.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Program & Pesan Tambahan */}
          <div
            className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Program yang Diminati & Pesan Awal</span>
            </h4>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1">Pilihan Program:</span>
              <div
                className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}
              >
                <Tag className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{inquiry.program}</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-1">
                Pesan / Pertanyaan / Catatan Usia Anak:
              </span>
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {inquiry.message ? (
                  <span>"{inquiry.message}"</span>
                ) : (
                  <span className="italic text-slate-400">Tidak ada pesan tambahan.</span>
                )}
              </div>
            </div>
          </div>

          {/* Form Follow-Up & Catatan Internal Petugas */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>Manajemen Tindak Lanjut Petugas Beekoding</span>
              </h4>

              <div className="flex items-center gap-2 text-xs">
                <label className="font-semibold text-slate-400">Ubah Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InquiryStatus)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <option value="baru">🔵 Baru Masuk</option>
                  <option value="dihubungi">🟡 Sudah Dihubungi</option>
                  <option value="jadwal_konsultasi">🟣 Jadwal Konsultasi</option>
                  <option value="terdaftar">🟢 Terdaftar (Closing)</option>
                  <option value="batal">⚪ Batal / Ditunda</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-400">
                Catatan Internal Follow-Up:
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tuliskan hasil pembicaraan, jadwal pertemuan, kendala, atau kesepakatan harga..."
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status dan catatan berhasil disimpan!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Perubahan akan langsung tersimpan di sistem admin.
                </span>
              )}

              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div
          className={`p-4 sm:p-5 border-t flex items-center justify-between sticky bottom-0 z-20 ${
            isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <span className="text-xs text-slate-400 hidden sm:block">
            Gunakan tombol WhatsApp untuk menghubungi pemohon dengan draf pesan otomatis.
          </span>
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ml-auto cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
