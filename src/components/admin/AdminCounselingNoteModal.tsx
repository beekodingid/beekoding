import React from 'react';
import {
  type CounselingSession,
  generateCounselingWhatsAppReminder,
} from '../../services/adminStorage';
import {
  X,
  Printer,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Send,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface AdminCounselingNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CounselingSession;
  isDark: boolean;
}

export const AdminCounselingNoteModal: React.FC<AdminCounselingNoteModalProps> = ({
  isOpen,
  onClose,
  session,
  isDark,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWA = () => {
    const text = generateCounselingWhatsAppReminder(session);
    const cleanPhone = session.parentPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const dateFormatted = new Date(session.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-fadeIn print:p-0 print:bg-white">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden transition-all my-8 print:border-none print:shadow-none print:m-0 print:w-full print:max-w-none ${
          isDark
            ? 'bg-[#121624] border-amber-500/30 text-white'
            : 'bg-white border-amber-200 text-slate-900'
        }`}
      >
        {/* Top Control Bar (Hidden on Print) */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-900/50 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <HeartHandshake className="w-4 h-4 text-amber-500" />
            <span>Lembar Catatan Konseling A4 Resmi (Siap Cetak)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSendWA}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Kirim via WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Ringkasan WA</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen A4</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* PRINTABLE A4 CONTENT CONTAINER             */}
        {/* ========================================== */}
        <div className="p-8 sm:p-12 max-h-[80vh] overflow-y-auto print:max-h-none print:p-8 print:overflow-visible bg-white text-slate-900">
          {/* Header Kop Surat Resmi */}
          <div className="flex items-center justify-between border-b-2 border-amber-500 pb-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center p-2">
                <img src="/bee-mascot.png" alt="Beekoding" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black font-['Space_Grotesk'] text-slate-950 tracking-tight">
                  BEEKODING ACADEMY
                </h1>
                <p className="text-xs text-slate-600">
                  Lembaga Edukasi Koding, Pemrograman & AI Generasi Muda Indonesia
                </p>
                <p className="text-[10px] text-slate-400">
                  www.beekoding.id • halo@beekoding.id • WhatsApp: +62 853-1131-7127
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                Official Academic Note
              </span>
              <div className="font-mono text-xs font-bold text-slate-700 mt-1.5">
                {session.sessionNumber}
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-6">
            <h2 className="text-base font-black uppercase tracking-wider text-slate-900 underline decoration-amber-500 decoration-2 underline-offset-4">
              LEMBAR OBSERVASI & KONSULTASI AKADEMIK SISWA
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Catatan Bimbingan Personal 1-on-1 Bersama Instruktur & Wali Murid
            </p>
          </div>

          {/* Student & Session Data Table */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 text-xs mb-6">
            <div className="space-y-1.5">
              <div className="flex">
                <span className="w-32 text-slate-500">Nama Siswa:</span>
                <span className="font-bold text-slate-900">{session.studentName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Jenjang Belajar:</span>
                <span className="font-semibold text-slate-800">{session.tier}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Orang Tua / Wali:</span>
                <span className="font-semibold text-slate-800">{session.parentName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Kontak WhatsApp:</span>
                <span className="font-mono text-slate-700">{session.parentPhone}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex">
                <span className="w-32 text-slate-500">Hari, Tanggal:</span>
                <span className="font-semibold text-slate-800">{dateFormatted}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Waktu Sesi:</span>
                <span className="font-semibold text-slate-800">{session.time}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Konselor / Mentor:</span>
                <span className="font-bold text-slate-900">{session.counselorName}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-slate-500">Media Pertemuan:</span>
                <span className="font-semibold text-slate-800">
                  {session.sessionType === 'online_zoom'
                    ? 'Zoom Cloud Meeting'
                    : session.sessionType === 'online_gmeet'
                    ? 'Google Meet'
                    : session.sessionType === 'offline_studio'
                    ? 'Studio Offline'
                    : 'WhatsApp Call'}
                </span>
              </div>
            </div>
          </div>

          {/* Observation Section 1: Strengths */}
          <div className="space-y-4 text-xs">
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5 text-amber-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>1. Kelebihan, Bakat & Karakter Unik Ananda</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {session.studentStrengths || 'Ananda memiliki ketertarikan tinggi pada logika komputasi dan kreativitas visual.'}
              </p>
            </div>

            {/* Observation Section 2: Challenges */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5 text-blue-700">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>2. Tantangan Belajar & Kendala Fokus yang Diidentifikasi</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {session.challengesFaced || 'Perlu pembiasaan manajemen waktu screen-time dan pembagian fokus koding secara terstruktur.'}
              </p>
            </div>

            {/* Observation Section 3: Action Plan */}
            <div className="border border-slate-200 rounded-xl p-4 bg-amber-50/40">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5 text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. Kesepakatan & Rencana Aksi di Rumah (*Agreed Home Action Plan*)</span>
              </div>
              <p className="text-slate-800 leading-relaxed font-medium">
                {session.actionPlan || 'Menerapkan waktu latihan koding 20-30 menit per hari dan mengapresiasi setiap bug yang berhasil diselesaikan.'}
              </p>
            </div>

            {/* Observation Section 4: Recommendation */}
            <div className="border border-slate-200 rounded-xl p-4">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-1.5 text-purple-700">
                <ShieldCheck className="w-4 h-4 text-purple-500" />
                <span>4. Rekomendasi Kurikulum & Milestone Berikutnya</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {session.curriculumRecommendation || 'Melanjutkan ke modul kurikulum semester lanjutan dengan bimbingan intensif mentor.'}
              </p>
            </div>

            {/* Parent Feedback (if any) */}
            {session.parentFeedback && (
              <div className="border border-slate-200 rounded-xl p-3 bg-slate-50 text-[11px]">
                <span className="font-bold text-slate-600">Catatan/Harapan Orang Tua: </span>
                <span className="text-slate-700 italic">"{session.parentFeedback}"</span>
              </div>
            )}
          </div>

          {/* Signatures & Stamp */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
            <div className="text-center w-52">
              <div className="text-slate-500 mb-14">Mengetahui Orang Tua / Wali,</div>
              <div className="font-bold text-slate-900 border-b border-slate-400 pb-0.5">
                ( {session.parentName} )
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Wali Murid</div>
            </div>

            {/* Verification Stamp */}
            <div className="text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-amber-500/80 flex flex-col items-center justify-center text-[8px] font-black text-amber-800 uppercase tracking-widest leading-tight -rotate-12 select-none shadow-xs">
                <span>BEEKODING</span>
                <span>★ VERIFIED ★</span>
                <span>COUNSELING</span>
              </div>
            </div>

            <div className="text-center w-52">
              <div className="text-slate-500 mb-14">Konselor / Lead Mentor,</div>
              <div className="font-bold text-slate-900 border-b border-slate-400 pb-0.5">
                ( {session.counselorName} )
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{session.counselorTitle}</div>
            </div>
          </div>

          {/* Print Footer Note */}
          <div className="mt-8 pt-3 border-t border-slate-200 text-[9px] text-slate-400 text-center">
            Dokumen resmi ini diterbitkan oleh Beekoding Academy sebagai rekaman bimbingan akademik siswa. Dicetak secara otomatis melalui Beekoding Academic Portal pada {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.
          </div>
        </div>
      </div>
    </div>
  );
};
