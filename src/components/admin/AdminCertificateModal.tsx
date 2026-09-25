import React, { useRef, useState } from 'react';
import { type StudentCertificate } from '../../services/adminStorage';
import { triggerPrintWithOrientation } from '../../services/printUtils';
import {
  Printer,
  Share2,
  Copy,
  X,
  CheckCircle2,
  Award,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface AdminCertificateModalProps {
  certificate: StudentCertificate;
  isDark: boolean;
  onClose: () => void;
}

export const AdminCertificateModal: React.FC<AdminCertificateModalProps> = ({
  certificate,
  isDark,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const formatDateIndo = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return isoDate;
    }
  };

  const handlePrint = () => {
    triggerPrintWithOrientation('landscape');
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      `🎉 *SELAMAT! SERTIFIKAT KELULUSAN BEEKODING* 🎓🐝`,
      `---------------------------------------`,
      `Kepada Yth. *${certificate.parentName || 'Orang Tua / Wali'}*,`,
      ``,
      `Kami segenap tim akademik *Beekoding* mengucapkan selamat atas pencapaian luar biasa ananda:`,
      `⭐ *${certificate.studentName.toUpperCase()}* ⭐`,
      ``,
      `Telah resmi dinyatakan *LULUS & MENYELESAIKAN* program:`,
      `📚 *${certificate.programName}*`,
      certificate.batchName ? `🏷️ *Batch*: ${certificate.batchName}` : '',
      `🏅 *Predikat*: *${certificate.honorsTitle}*`,
      `📜 *No. Registrasi Sertifikat*: \`${certificate.certificateNumber}\``,
      `🔐 *Kode Verifikasi*: \`${certificate.verificationCode}\``,
      `📅 *Tanggal Terbit*: ${formatDateIndo(certificate.issueDate)}`,
      ``,
      `Sertifikat ini merupakan bukti penguasaan kemampuan computational thinking, logika pemrograman, dan kesiapan teknologi masa depan.`,
      ``,
      `Semoga prestasi ini memicu semangat ananda untuk terus berkreasi dan berinovasi di era kecerdasan buatan! 🚀`,
      ``,
      `Salam hangat & bangga,`,
      `*Febri Hasan, S.Kom., M.T.*`,
      `_Founder & Lead Educator Beekoding_`,
      `🌐 www.beekoding.id`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    if (!certificate.parentPhone) return;
    const cleanPhone = certificate.parentPhone.replace(/\D/g, '');
    let target = cleanPhone;
    if (target.startsWith('0')) {
      target = '62' + target.substring(1);
    }
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${target}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Container Modal */}
      <div
        className={`relative w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:rounded-none ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Header Modal - Hidden on Print */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b print:hidden ${
            isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold shadow-inner">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Studio Sertifikat Resmi Siswa
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  A4 Landscape
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{certificate.certificateNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            {certificate.parentPhone && (
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Kirim Ucapan & Sertifikat ke WhatsApp Orang Tua"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Kirim WA</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Salin Rincian Sertifikat"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area (A4 Landscape Formatted) */}
        <div className="p-4 sm:p-8 bg-slate-950/20 overflow-x-auto flex justify-center print:p-0 print:bg-white">
          <div
            ref={printRef}
            className="w-[1000px] h-[705px] min-w-[1000px] min-h-[705px] bg-[#fffdfa] text-slate-900 p-8 relative flex flex-col justify-between shadow-2xl border-[12px] border-amber-900/10 rounded-2xl overflow-hidden print:border-[10px] print:rounded-none print:shadow-none print:w-full print:h-screen print:min-w-0 print:min-h-0"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              fontFamily: '"Cinzel", "Playfair Display", "Times New Roman", serif, sans-serif',
            }}
          >
            {/* Ornate Outer Gold Border Frame */}
            <div className="absolute inset-3 border-2 border-amber-500/40 rounded-xl pointer-events-none" />
            <div className="absolute inset-5 border border-dashed border-amber-600/30 rounded-lg pointer-events-none" />

            {/* Corner Ornaments */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

            {/* Watermark Logo Background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-[280px]">🐝</span>
            </div>

            {/* Top Bar: Beekoding Logo & Header */}
            <div className="relative z-10 text-center pt-2">
              <div className="inline-flex items-center justify-center gap-3 mb-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-2xl shadow-md text-slate-950">
                  🐝
                </div>
                <div className="text-left">
                  <h2 className="text-2xl font-black tracking-wider text-slate-900 uppercase font-sans">
                    Bee<span className="text-amber-600">Koding</span>
                  </h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] font-sans">
                    Academy of Computational Thinking & AI
                  </p>
                </div>
              </div>

              {/* Diploma Title */}
              <div className="mt-3">
                <span className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-amber-700 font-sans border-b border-amber-500/40 pb-0.5">
                  Official Academic Award
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-slate-900 mt-1">
                  Certificate of Excellence
                </h1>
                <p className="text-xs italic text-slate-500 mt-0.5 font-serif">
                  Piagam Penghargaan & Kelulusan Resmi
                </p>
              </div>
            </div>

            {/* Center Body: Presented To & Student Name */}
            <div className="relative z-10 text-center my-auto py-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-sans">
                Diberikan dengan penuh rasa bangga dan apresiasi kepada:
              </p>

              {/* Student Name */}
              <div className="my-3">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-wide font-serif capitalize">
                  {certificate.studentName}
                </h3>
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
              </div>

              {/* Achievement Description */}
              <div className="max-w-2xl mx-auto px-4 font-sans text-xs text-slate-700 leading-relaxed">
                {certificate.description || (
                  <p>
                    Telah berhasil menyelesaikan seluruh kurikulum intensif, tantangan logika algoritma,
                    dan proyek teknologi interaktif dengan dedikasi serta kreativitas luar biasa.
                  </p>
                )}
                {certificate.customNote && (
                  <p className="mt-1.5 text-[11px] text-amber-800 font-medium italic">
                    "{certificate.customNote}"
                  </p>
                )}
              </div>

              {/* Program & Honors Pill */}
              <div className="mt-4 flex items-center justify-center gap-2 flex-wrap font-sans">
                <span className="px-4 py-1.5 rounded-full bg-slate-900 text-amber-400 text-xs font-bold shadow-sm tracking-wide">
                  {certificate.programName}
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-800 border border-amber-500/50 text-xs font-bold tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>{certificate.honorsTitle}</span>
                </span>
              </div>
            </div>

            {/* Bottom Footer: Signatures, Gold Seal & Verification */}
            <div className="relative z-10 grid grid-cols-3 items-end pt-4 border-t border-slate-200/80 font-sans">
              {/* Left Signatory: Founder & Lead Educator */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center">
                  <span className="font-serif italic text-lg font-bold text-slate-800 rotate-[-5deg] select-none">
                    Febri Hasan
                  </span>
                </div>
                <div className="w-36 h-px bg-slate-400 mx-auto" />
                <h5 className="font-bold text-xs text-slate-900 mt-1">{certificate.instructorName}</h5>
                <p className="text-[10px] text-slate-500">Founder & Chief Educator</p>
              </div>

              {/* Center: Official Embossed Gold Seal Badge */}
              <div className="flex flex-col items-center justify-center -translate-y-2">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-300 border-4 border-amber-200/80 shadow-xl flex flex-col items-center justify-center text-slate-950 p-2 text-center">
                  <div className="absolute -inset-1 rounded-full border border-dashed border-amber-700/50 pointer-events-none" />
                  <span className="text-[7px] font-black uppercase tracking-widest text-amber-950">
                    BEEKODING
                  </span>
                  <span className="text-2xl leading-none my-0.5">🎖️</span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-amber-950">
                    VERIFIED SEAL
                  </span>
                </div>

                {/* Verification Code Box */}
                <div className="mt-2 text-center font-mono text-[10px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                  ID: <span className="font-bold text-slate-800">{certificate.certificateNumber}</span>
                </div>
              </div>

              {/* Right Signatory: Academic Advisor / Co-Signature */}
              <div className="text-center">
                <div className="h-14 flex items-center justify-center">
                  <span className="font-serif italic text-lg font-bold text-slate-800 rotate-[-3deg] select-none">
                    Hendra Wijaya
                  </span>
                </div>
                <div className="w-36 h-px bg-slate-400 mx-auto" />
                <h5 className="font-bold text-xs text-slate-900 mt-1">{certificate.advisorName}</h5>
                <p className="text-[10px] text-slate-500">Academic Board Advisor</p>
              </div>
            </div>

            {/* Bottom Meta Bar: Issue Date & Authenticity */}
            <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 font-sans">
              <span>
                Diterbitkan pada:{' '}
                <strong className="text-slate-600">{formatDateIndo(certificate.issueDate)}</strong>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Kode Validasi Keaslian: <strong className="font-mono text-slate-700">{certificate.verificationCode}</strong>
              </span>
              <span>PT Beekoding Edukasi Nusantara</span>
            </div>
          </div>
        </div>

        {/* Copy Notification Toast */}
        {copied && (
          <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs shadow-lg flex items-center gap-2 border border-slate-700 animate-bounce print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Format ucapan & data sertifikat disalin ke clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
