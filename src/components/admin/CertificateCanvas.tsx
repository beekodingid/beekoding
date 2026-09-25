import React from 'react';
import { type StudentCertificate } from '../../services/adminStorage';
import { type CertificateThemeId, getCertificateTheme } from '../../services/certificateThemes';
import { QRCodeView } from '../common/QRCodeView';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Cpu,
  Star,
  CheckCircle,
  Hexagon,
} from 'lucide-react';

interface CertificateCanvasProps {
  certificate: StudentCertificate;
  themeId: CertificateThemeId;
  printRef?: React.RefObject<HTMLDivElement | null>;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  certificate,
  themeId,
  printRef,
}) => {
  const theme = getCertificateTheme(themeId);

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

  const portalVerificationUrl = `https://beekoding.id/#portal?cert=${encodeURIComponent(
    certificate.certificateNumber
  )}`;

  /* -------------------------------------------------------------
   * THEME 1: ROYAL GOLD & PARCHMENT (Klasik & Prestisius)
   * ----------------------------------------------------------- */
  if (themeId === 'royal_gold') {
    return (
      <div
        ref={printRef}
        className="w-[1000px] h-[705px] min-w-[1000px] min-h-[705px] bg-[#fffdf8] text-slate-900 p-8 relative flex flex-col justify-between shadow-2xl border-[12px] border-amber-900/15 rounded-2xl overflow-hidden print:border-[10px] print:rounded-none print:shadow-none print:w-[287mm] print:h-[200mm] print:max-w-[287mm] print:max-h-[200mm] print:min-w-0 print:min-h-0 print:m-0"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          fontFamily: theme.fontFamily,
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
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
          <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-[300px] h-[300px] object-contain" />
        </div>

        {/* Top Bar: Beekoding Logo & Header */}
        <div className="relative z-10 text-center pt-2">
          <div className="inline-flex items-center justify-center gap-3 mb-1">
            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-500 flex items-center justify-center text-2xl shadow-sm">
              <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-10 h-10 object-contain" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black tracking-wider text-slate-900 font-sans">
                Bee<span className="text-amber-500">koding</span>
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.25em] font-sans">
                Academy of Computational Thinking & AI
              </p>
            </div>
          </div>

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

          <div className="my-3">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-wide font-serif capitalize">
              {certificate.studentName}
            </h3>
            <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-2" />
          </div>

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
          {/* Left Signatory */}
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

          {/* Center: Gold Seal Badge & Verification QR */}
          <div className="flex items-center justify-center gap-4 -translate-y-2">
            <div className="flex flex-col items-center">
              <QRCodeView
                value={portalVerificationUrl}
                size={64}
                darkColor="#78350f"
                showScanLabel={true}
                alt={`QR Verifikasi ${certificate.certificateNumber}`}
              />
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 border-amber-700/40 shadow-md flex items-center justify-center text-amber-950 font-bold p-1">
                <div className="w-full h-full rounded-full border border-amber-800/30 flex flex-col items-center justify-center text-center p-0.5">
                  <Award className="w-5 h-5 text-amber-900" />
                  <span className="text-[6.5px] uppercase font-black tracking-tighter leading-tight mt-0.5">
                    VERIFIED
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5 -mt-1.5 z-0">
                <div className="w-3 h-5 bg-amber-600 clip-ribbon transform -rotate-12 shadow-sm" />
                <div className="w-3 h-5 bg-amber-600 clip-ribbon transform rotate-12 shadow-sm" />
              </div>
            </div>
          </div>

          {/* Right Signatory */}
          <div className="text-center">
            <div className="h-14 flex items-center justify-center">
              <span className="font-serif italic text-lg font-bold text-slate-800 rotate-[-3deg] select-none">
                Hendra Wijaya
              </span>
            </div>
            <div className="w-36 h-px bg-slate-400 mx-auto" />
            <h5 className="font-bold text-xs text-slate-900 mt-1">{certificate.advisorName}</h5>
            <p className="text-[10px] text-slate-500">Academic & Technology Advisor</p>
          </div>
        </div>

        {/* Bottom Meta Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 font-sans">
          <span>
            Diterbitkan pada: <strong className="text-slate-600">{formatDateIndo(certificate.issueDate)}</strong>
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Kode Validasi: <strong className="font-mono text-slate-700">{certificate.verificationCode}</strong>
          </span>
          <span>PT Beekoding Edukasi Nusantara</span>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * THEME 2: CYBERPUNK & NEON TECH (Futuristik & Dark Mode)
   * ----------------------------------------------------------- */
  if (themeId === 'cyber_dark') {
    return (
      <div
        ref={printRef}
        className="w-[1000px] h-[705px] min-w-[1000px] min-h-[705px] bg-[#07090e] text-slate-100 p-8 relative flex flex-col justify-between shadow-2xl border-[10px] border-cyan-950/70 rounded-2xl overflow-hidden print:border-[10px] print:rounded-none print:shadow-none print:w-[287mm] print:h-[200mm] print:max-w-[287mm] print:max-h-[200mm] print:min-w-0 print:min-h-0 print:m-0"
        style={{
          boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.25)',
          fontFamily: theme.fontFamily,
        }}
      >
        {/* Futuristic Neon Borders */}
        <div className="absolute inset-3 border border-cyan-500/40 rounded-xl pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.15)]" />
        <div className="absolute inset-5 border border-dashed border-indigo-500/30 rounded-lg pointer-events-none" />

        {/* Cyber Tech Corner Brackets */}
        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-cyan-400 pointer-events-none shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-cyan-400 pointer-events-none shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-cyan-400 pointer-events-none shadow-[0_0_8px_#06b6d4]" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-cyan-400 pointer-events-none shadow-[0_0_8px_#06b6d4]" />

        {/* Cyber Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
          <Cpu className="w-[320px] h-[320px] text-cyan-400" />
        </div>

        {/* Top Bar */}
        <div className="relative z-10 text-center pt-2">
          <div className="inline-flex items-center justify-center gap-3 mb-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.35)]">
              <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-10 h-10 object-contain rounded-lg" />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black tracking-wider text-white font-sans flex items-center gap-1">
                <span>BEE</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  KODING
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono ml-1">
                  AI-GEN
                </span>
              </h2>
              <p className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-[0.25em] font-mono">
                Academy of Computational Thinking & AI
              </p>
            </div>
          </div>

          <div className="mt-3">
            <span className="inline-block text-[11px] font-bold tracking-[0.3em] uppercase text-cyan-400 font-mono border-b border-cyan-500/40 pb-0.5">
              Verified Digital Credential
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-amber-200 mt-1">
              Certificate of Excellence
            </h1>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Piagam Penghargaan & Akreditasi Kemampuan Teknologi Digital
            </p>
          </div>
        </div>

        {/* Center Body */}
        <div className="relative z-10 text-center my-auto py-2">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70 font-mono">
            Diberikan dengan apresiasi tertinggi kepada:
          </p>

          <div className="my-3">
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-amber-300 font-sans">
              {certificate.studentName}
            </h3>
            <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-2 shadow-[0_0_8px_#06b6d4]" />
          </div>

          <div className="max-w-2xl mx-auto px-4 font-sans text-xs text-slate-300 leading-relaxed">
            {certificate.description || (
              <p>
                Telah berhasil menyelesaikan seluruh kurikulum intensif, tantangan logika algoritma,
                dan proyek teknologi interaktif dengan dedikasi serta kreativitas luar biasa.
              </p>
            )}
            {certificate.customNote && (
              <p className="mt-1.5 text-[11px] text-cyan-300 font-medium italic font-mono">
                "{certificate.customNote}"
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap font-mono">
            <span className="px-4 py-1.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)] tracking-wide">
              {certificate.programName}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 text-xs font-bold tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{certificate.honorsTitle}</span>
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 grid grid-cols-3 items-end pt-4 border-t border-cyan-950/80 font-sans">
          {/* Left Signatory */}
          <div className="text-center">
            <div className="h-14 flex items-center justify-center">
              <span className="font-serif italic text-lg font-bold text-cyan-200 rotate-[-5deg] select-none">
                Febri Hasan
              </span>
            </div>
            <div className="w-36 h-px bg-cyan-700/60 mx-auto shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            <h5 className="font-bold text-xs text-white mt-1">{certificate.instructorName}</h5>
            <p className="text-[10px] text-slate-400 font-mono">Founder & Chief Educator</p>
          </div>

          {/* Center: Holographic Hexagon Seal & QR */}
          <div className="flex items-center justify-center gap-4 -translate-y-2">
            <div className="flex flex-col items-center bg-white p-1 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <QRCodeView
                value={portalVerificationUrl}
                size={62}
                darkColor="#0891b2"
                showScanLabel={true}
                alt={`QR Verifikasi ${certificate.certificateNumber}`}
              />
            </div>

            <div className="relative flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-900 via-teal-800 to-slate-900 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center text-cyan-300 p-1">
                <div className="w-full h-full rounded-xl border border-cyan-300/40 flex flex-col items-center justify-center text-center p-0.5">
                  <Hexagon className="w-5 h-5 text-cyan-300" />
                  <span className="text-[6.5px] uppercase font-mono font-black tracking-tighter leading-tight mt-0.5 text-cyan-200">
                    AI-VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Signatory */}
          <div className="text-center">
            <div className="h-14 flex items-center justify-center">
              <span className="font-serif italic text-lg font-bold text-cyan-200 rotate-[-3deg] select-none">
                Hendra Wijaya
              </span>
            </div>
            <div className="w-36 h-px bg-cyan-700/60 mx-auto shadow-[0_0_6px_rgba(6,182,212,0.4)]" />
            <h5 className="font-bold text-xs text-white mt-1">{certificate.advisorName}</h5>
            <p className="text-[10px] text-slate-400 font-mono">Academic & Technology Advisor</p>
          </div>
        </div>

        {/* Bottom Meta Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 font-mono">
          <span>
            Issue Date: <strong className="text-cyan-300">{formatDateIndo(certificate.issueDate)}</strong>
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Validation: <strong className="font-mono text-cyan-200">{certificate.verificationCode}</strong>
          </span>
          <span>PT Beekoding Edukasi Nusantara</span>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * THEME 3: MODERN MINIMALIST & SLATE (Elegan & Kontemporer)
   * ----------------------------------------------------------- */
  if (themeId === 'modern_minimal') {
    return (
      <div
        ref={printRef}
        className="w-[1000px] h-[705px] min-w-[1000px] min-h-[705px] bg-[#ffffff] text-slate-900 p-8 relative flex flex-col justify-between shadow-2xl border-[12px] border-slate-900 rounded-2xl overflow-hidden print:border-[10px] print:rounded-none print:shadow-none print:w-[287mm] print:h-[200mm] print:max-w-[287mm] print:max-h-[200mm] print:min-w-0 print:min-h-0 print:m-0"
        style={{
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          fontFamily: theme.fontFamily,
        }}
      >
        {/* Left Vertical Architectural Accent Stripe */}
        <div className="absolute top-0 bottom-0 left-0 w-3.5 bg-gradient-to-b from-blue-700 via-indigo-600 to-slate-900" />

        {/* Minimal Inner Hairline Frame */}
        <div className="absolute inset-4 border border-slate-200 rounded-lg pointer-events-none" />

        {/* Watermark Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-[280px] h-[280px] object-contain" />
        </div>

        {/* Top Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-200 pb-4 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-sm">
              <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-8 h-8 object-contain rounded-md" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-950">
                Beekoding Academy
              </h2>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Center for Computational Thinking & AI Excellence
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold px-3 py-1 rounded-full uppercase bg-slate-100 text-slate-700 tracking-wider">
              Official Credential
            </span>
            <p className="text-[10px] font-mono text-slate-400 mt-1">{certificate.certificateNumber}</p>
          </div>
        </div>

        {/* Center Body */}
        <div className="relative z-10 text-center my-auto py-2">
          <div className="mb-2">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-950">
              Certificate of Completion
            </h1>
            <p className="text-xs text-blue-700 font-semibold tracking-wide uppercase mt-0.5">
              Standar Akreditasi Pendidikan Pemrograman & AI
            </p>
          </div>

          <p className="text-xs text-slate-500 uppercase tracking-wider mt-4">
            Sertifikat ini secara resmi dianugerahkan kepada:
          </p>

          <div className="my-2.5">
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight capitalize">
              {certificate.studentName}
            </h3>
            <div className="w-32 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
          </div>

          <div className="max-w-2xl mx-auto px-4 text-xs text-slate-600 leading-relaxed mt-2">
            {certificate.description || (
              <p>
                Telah berhasil menyelesaikan seluruh kurikulum intensif, tantangan logika algoritma,
                dan proyek teknologi interaktif dengan dedikasi serta kreativitas luar biasa.
              </p>
            )}
            {certificate.customNote && (
              <p className="mt-1 text-[11px] text-blue-900 font-semibold italic">
                "{certificate.customNote}"
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <span className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold tracking-wide">
              {certificate.programName}
            </span>
            <span className="px-3.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold tracking-wide flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
              <span>{certificate.honorsTitle}</span>
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 grid grid-cols-3 items-end pt-4 border-t border-slate-200 text-slate-800">
          {/* Left Signatory */}
          <div className="text-center">
            <div className="h-12 flex items-center justify-center">
              <span className="font-serif italic text-lg font-bold text-slate-900 select-none">
                Febri Hasan
              </span>
            </div>
            <div className="w-32 h-px bg-slate-300 mx-auto" />
            <h5 className="font-bold text-xs text-slate-950 mt-1">{certificate.instructorName}</h5>
            <p className="text-[10px] text-slate-500">Lead Assessment Officer</p>
          </div>

          {/* Center: Minimal Seal & QR */}
          <div className="flex items-center justify-center gap-4 -translate-y-1">
            <QRCodeView
              value={portalVerificationUrl}
              size={60}
              darkColor="#0f172a"
              showScanLabel={true}
              alt={`QR Verifikasi ${certificate.certificateNumber}`}
            />
            <div className="w-14 h-14 rounded-xl border-2 border-slate-900 flex flex-col items-center justify-center text-center p-1 bg-slate-50">
              <Award className="w-5 h-5 text-slate-900" />
              <span className="text-[6.5px] font-black uppercase tracking-tight text-slate-900 mt-0.5">
                CERTIFIED
              </span>
            </div>
          </div>

          {/* Right Signatory */}
          <div className="text-center">
            <div className="h-12 flex items-center justify-center">
              <span className="font-serif italic text-lg font-bold text-slate-900 select-none">
                Hendra Wijaya
              </span>
            </div>
            <div className="w-32 h-px bg-slate-300 mx-auto" />
            <h5 className="font-bold text-xs text-slate-950 mt-1">{certificate.advisorName}</h5>
            <p className="text-[10px] text-slate-500">Academic Board Advisor</p>
          </div>
        </div>

        {/* Bottom Meta Bar */}
        <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-2 font-mono">
          <span>Date: {formatDateIndo(certificate.issueDate)}</span>
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            Verification: {certificate.verificationCode}
          </span>
          <span>PT Beekoding Edukasi Nusantara</span>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * THEME 4: KIDS WONDERLAND & CREATIVE (Ceria & Playful)
   * ----------------------------------------------------------- */
  return (
    <div
      ref={printRef}
      className="w-[1000px] h-[705px] min-w-[1000px] min-h-[705px] bg-gradient-to-br from-[#fffdf0] via-[#fefce8] to-[#f0fdf4] text-slate-900 p-8 relative flex flex-col justify-between shadow-2xl border-[12px] border-amber-400 rounded-3xl overflow-hidden print:border-[10px] print:rounded-none print:shadow-none print:w-[287mm] print:h-[200mm] print:max-w-[287mm] print:max-h-[200mm] print:min-w-0 print:min-h-0 print:m-0"
      style={{
        boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.25)',
        fontFamily: theme.fontFamily,
      }}
    >
      {/* Playful Dashed Inner Border */}
      <div className="absolute inset-4 border-3 border-dashed border-amber-400/80 rounded-2xl pointer-events-none" />

      {/* Cheerful Corner Embellishments */}
      <div className="absolute top-6 left-6 text-2xl select-none">⭐</div>
      <div className="absolute top-6 right-6 text-2xl select-none">🚀</div>
      <div className="absolute bottom-6 left-6 text-2xl select-none">🎨</div>
      <div className="absolute bottom-6 right-6 text-2xl select-none">🐝</div>

      {/* Watermark Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
        <Star className="w-[320px] h-[320px] text-amber-500 fill-amber-500" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 text-center pt-2">
        <div className="inline-flex items-center justify-center gap-3 mb-1">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center text-3xl shadow-md rotate-[-3deg]">
            🐝
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-black tracking-tight text-amber-950 font-sans">
              Bee<span className="text-amber-600">koding</span> Kids
            </h2>
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest font-sans">
              Coding & AI Junior Champions Academy
            </p>
          </div>
        </div>

        <div className="mt-2">
          <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase bg-amber-200/80 text-amber-900 px-3 py-0.5 rounded-full border border-amber-300">
            🌟 Piagam Juara Coder Cilik Berprestasi 🌟
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-amber-950 mt-1">
            Super Coder Certificate
          </h1>
          <p className="text-xs text-amber-800 font-bold mt-0.5">
            Tanda Kelulusan & Penguasaan Logika Coding Kreatif
          </p>
        </div>
      </div>

      {/* Center Body */}
      <div className="relative z-10 text-center my-auto py-1">
        <p className="text-xs uppercase tracking-wider font-bold text-amber-800">
          Diberikan dengan rasa bangga & apresiasi kepada bintang coding cilik:
        </p>

        <div className="my-2.5">
          <h3 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-wide font-sans capitalize">
            {certificate.studentName}
          </h3>
          <div className="w-48 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 mx-auto mt-2 rounded-full shadow-sm" />
        </div>

        <div className="max-w-2xl mx-auto px-4 font-sans text-xs text-slate-800 leading-relaxed font-medium">
          {certificate.description || (
            <p>
              Telah berhasil menyelesaikan seluruh petualangan belajar coding, memecahkan teka-teki logika
              algoritma, dan merancang game seru dengan penuh imajinasi dan semangat luar biasa!
            </p>
          )}
          {certificate.customNote && (
            <p className="mt-1 text-[11px] text-amber-900 font-bold italic">
              "{certificate.customNote}"
            </p>
          )}
        </div>

        <div className="mt-3.5 flex items-center justify-center gap-2 flex-wrap font-sans">
          <span className="px-4 py-1.5 rounded-2xl bg-amber-500 text-slate-950 text-xs font-black shadow-sm tracking-wide">
            🎮 {certificate.programName}
          </span>
          <span className="px-4 py-1.5 rounded-2xl bg-emerald-500 text-white text-xs font-black shadow-sm tracking-wide flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-white" />
            <span>{certificate.honorsTitle}</span>
          </span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 grid grid-cols-3 items-end pt-3 border-t border-amber-300/80 font-sans">
        {/* Left Signatory */}
        <div className="text-center">
          <div className="h-12 flex items-center justify-center">
            <span className="font-serif italic text-lg font-bold text-amber-950 rotate-[-5deg] select-none">
              Febri Hasan
            </span>
          </div>
          <div className="w-32 h-0.5 bg-amber-400 mx-auto" />
          <h5 className="font-bold text-xs text-amber-950 mt-1">{certificate.instructorName}</h5>
          <p className="text-[10px] text-amber-800 font-semibold">Chief Coding Mentor</p>
        </div>

        {/* Center: Cheerful Seal Badge & QR */}
        <div className="flex items-center justify-center gap-4 -translate-y-1">
          <div className="bg-white p-1 rounded-2xl border-2 border-amber-300 shadow-sm">
            <QRCodeView
              value={portalVerificationUrl}
              size={62}
              darkColor="#b45309"
              showScanLabel={true}
              alt={`QR Verifikasi ${certificate.certificateNumber}`}
            />
          </div>

          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 border-3 border-amber-600/40 shadow-lg flex flex-col items-center justify-center text-amber-950 p-1 rotate-[5deg]">
            <span className="text-xl">🏆</span>
            <span className="text-[6.5px] uppercase font-black tracking-tight leading-tight mt-0.5">
              CHAMPION
            </span>
          </div>
        </div>

        {/* Right Signatory */}
        <div className="text-center">
          <div className="h-12 flex items-center justify-center">
            <span className="font-serif italic text-lg font-bold text-amber-950 rotate-[-3deg] select-none">
              Hendra Wijaya
            </span>
          </div>
          <div className="w-32 h-0.5 bg-amber-400 mx-auto" />
          <h5 className="font-bold text-xs text-amber-950 mt-1">{certificate.advisorName}</h5>
          <p className="text-[10px] text-amber-800 font-semibold">Academic Advisor</p>
        </div>
      </div>

      {/* Bottom Meta Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-amber-800 font-bold pt-2 font-sans">
        <span>Tanggal: {formatDateIndo(certificate.issueDate)}</span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          Nomor: <strong className="font-mono text-amber-950">{certificate.certificateNumber}</strong>
        </span>
        <span>Beekoding Kids Academy</span>
      </div>
    </div>
  );
};
