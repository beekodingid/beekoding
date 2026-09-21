import React, { useState } from 'react';
import {
  type AssessmentSubmission,
  updateSubmissionNotes,
  updateSubmissionStatus,
  type FollowUpStatus,
} from '../../services/adminStorage';
import { CATEGORIES, CATEGORY_ORDER, getTierLabel } from '../../data/talentQuestions';
import { TalentRadarChart } from '../talent/TalentRadarChart';
import {
  X,
  Printer,
  MessageCircle,
  Award,
  Sparkles,
  User,
  GraduationCap,
  Save,
  CheckCircle2,
  Phone,
  ExternalLink,
  Target,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

interface AdminReportModalProps {
  submission: AssessmentSubmission;
  isDark: boolean;
  onClose: () => void;
  onUpdate: (updated: AssessmentSubmission) => void;
}

export const AdminReportModal: React.FC<AdminReportModalProps> = ({
  submission,
  isDark,
  onClose,
  onUpdate,
}) => {
  const { profile, scores, totalScore, topStrengths, growthAreas, recommendedProgram, completedAt } =
    submission;

  const [notes, setNotes] = useState(submission.notes || '');
  const [status, setStatus] = useState<FollowUpStatus>(submission.status);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveNotes = () => {
    updateSubmissionNotes(submission.id, notes);
    updateSubmissionStatus(submission.id, status);
    onUpdate({
      ...submission,
      notes,
      status,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Format nomor telepon untuk WhatsApp
  const rawPhone = profile.parentPhone.replace(/[^0-9]/g, '');
  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;

  // Draf pesan konsultasi WhatsApp
  const strengthsText = topStrengths
    .map((s) => `• *${CATEGORIES[s].name}* (${scores[s]}/100)`)
    .join('\n');

  const growthText = growthAreas
    .map((g) => `• *${CATEGORIES[g].name}* (${scores[g]}/100)`)
    .join('\n');

  const waText = encodeURIComponent(
    `Halo Bapak/Ibu ${profile.parentName || ''} 👋,\n\n` +
      `Salam hangat dari Beekoding! 🐝\n` +
      `Kami telah mereview hasil Diagnostic Aptitude & Talent Test ananda *${profile.childName}* (${profile.childAge} thn, ${profile.gradeLevel || 'Siswa'}).\n\n` +
      `📊 *Ringkasan Hasil Evaluasi 8 Pilar:*\n` +
      `• Rata-rata Skor: *${totalScore}/100*\n` +
      `• Kekuatan Utama:\n${strengthsText}\n\n` +
      `🌱 *Area yang Ingin Ditumbuhkan:*\n${growthText}\n\n` +
      `🎯 *Rekomendasi Program Belajar:*\n` +
      `*${recommendedProgram.title}*\n` +
      `_${recommendedProgram.whyFit}_\n\n` +
      `Apakah Bapak/Ibu bersedia meluangkan waktu untuk sesi konsultasi kurikulum gratis bersama Lead Instructor kami? Terima kasih! 🙏`
  );

  const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

  const getScoreBadgeText = (score: number) => {
    if (score >= 80) return 'Potensi Luar Biasa (High Aptitude) 🌟';
    if (score >= 60) return 'Sangat Baik & Berbakat (Promising Coder) 🚀';
    return 'Berkembang & Siap Dilatih (Developing Potential) 🌱';
  };

  return (
    <div className="admin-report-modal-root fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto print:p-0 print:m-0 print:bg-white print:static print:inset-auto print:overflow-visible print:block print:w-full print:h-auto">
      {/* Print CSS Rules for Exact 1-Page A4 Printing */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media screen {
              #beekoding-print-sheet {
                display: none !important;
              }
            }
            @media print {
              @page {
                size: A4 landscape;
                margin: 6mm 8mm 6mm 8mm;
              }
              html, body, #root {
                background: #ffffff !important;
                color: #0f172a !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .admin-report-modal-root {
                position: static !important;
                inset: auto !important;
                padding: 0 !important;
                margin: 0 !important;
                background: #ffffff !important;
                backdrop-filter: none !important;
                overflow: visible !important;
                display: block !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
              }
              .admin-screen-dialog,
              .print\\:hidden {
                display: none !important;
              }
              #beekoding-print-sheet {
                display: block !important;
                visibility: visible !important;
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
                color: #0f172a !important;
                page-break-inside: avoid !important;
                page-break-after: avoid !important;
                break-inside: avoid !important;
              }
            }
          `,
        }}
      />

      {/* ========================================================================= */}
      {/* 1. ON-SCREEN INTERACTIVE MODAL (HIDDEN IN PRINT)                          */}
      {/* ========================================================================= */}
      <div
        className={`admin-screen-dialog w-full max-w-4xl rounded-3xl border shadow-2xl my-auto transition-all overflow-hidden flex flex-col max-h-[92vh] print:hidden ${
          isDark ? 'bg-[#121622] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`p-4 sm:p-6 border-b flex items-center justify-between sticky top-0 z-20 ${
            isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Laporan Hasil Tes Bakat Anak
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-500 border border-amber-500/25">
                  ID: {submission.id}
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Disubmit pada: {completedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
              title="Cetak Laporan / Simpan PDF"
            >
              <Printer className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Cetak PDF</span>
            </button>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              title="Kirim Laporan via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Kirim ke WA</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6">
          {/* Student Profile Card */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Nama Siswa</span>
                <div className="font-bold text-sm sm:text-base flex items-center gap-1.5 text-amber-500">
                  <User className="w-4 h-4" />
                  <span>{profile.childName}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Usia & Jenjang</span>
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  <span>
                    {profile.childAge} Tahun • {profile.gradeLevel || '-'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">{getTierLabel(profile.tier)}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Nama Orang Tua</span>
                <div className="font-bold text-sm">{profile.parentName || '-'}</div>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">WhatsApp Orang Tua</span>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{profile.parentPhone}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Scores Overview & Radar Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Radar Chart (Left/Center) */}
            <div
              className={`lg:col-span-7 p-4 sm:p-6 rounded-2xl border flex flex-col items-center justify-center ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
                Visualisasi Radar 8 Pilar Kecerdasan Digital
              </h4>
              <TalentRadarChart scores={scores} isDark={isDark} />
              <p className="text-[11px] text-slate-400 text-center mt-1">
                Grafik merepresentasikan pemetaan 8 dimensi kognitif dan perilaku anak.
              </p>
            </div>

            {/* Score Summary Box (Right) */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-5 rounded-2xl border text-center ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-200 shadow-sm'
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Rata-rata Skor Keseluruhan
                </span>
                <div className="flex items-center justify-center gap-1 my-2">
                  <span className="text-5xl font-black text-amber-500">{totalScore}</span>
                  <span className="text-xl font-bold text-slate-400">/100</span>
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/25">
                  {getScoreBadgeText(totalScore)}
                </div>
              </div>

              {/* Strengths & Growth highlights */}
              <div
                className={`p-4 rounded-2xl border text-xs space-y-3 ${
                  isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <span className="font-extrabold text-emerald-500 uppercase tracking-wider block mb-1">
                    🌟 3 Pilar Kekuatan Utama:
                  </span>
                  <ul className="space-y-1">
                    {topStrengths.map((catKey) => (
                      <li key={catKey} className="flex items-center justify-between font-medium">
                        <span>• {CATEGORIES[catKey].name}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {scores[catKey]}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="font-extrabold text-amber-500 uppercase tracking-wider block mb-1">
                    🌱 Area yang Perlu Distimulasi:
                  </span>
                  <ul className="space-y-1">
                    {growthAreas.map((catKey) => (
                      <li key={catKey} className="flex items-center justify-between font-medium">
                        <span>• {CATEGORIES[catKey].name}</span>
                        <span className="font-bold text-slate-400">{scores[catKey]}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown 8 Pilar Cards */}
          <div>
            <h4 className="text-sm font-bold tracking-tight mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Rincian Nilai 8 Pilar Pemikiran</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {CATEGORY_ORDER.map((catKey) => {
                const cat = CATEGORIES[catKey];
                const score = scores[catKey];
                return (
                  <div
                    key={catKey}
                    className={`p-3.5 rounded-xl border text-xs ${
                      isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold truncate" title={cat.name}>
                        {cat.name}
                      </span>
                      <span className="font-black text-sm ml-2" style={{ color: cat.color }}>
                        {score}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${score}%`,
                          backgroundColor: cat.color,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                      {cat.shortDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Program */}
          <div
            className={`p-5 rounded-2xl border ${
              isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Rekomendasi Program Beekoding untuk Ananda</span>
            </div>
            <h4 className="font-extrabold text-base sm:text-lg mb-1.5">
              {recommendedProgram.title}
            </h4>
            <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {recommendedProgram.description}
            </p>
            <div
              className={`p-3 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-200'
              }`}
            >
              <strong className="text-amber-500 block mb-0.5">Mengapa Cocok:</strong>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                {recommendedProgram.whyFit}
              </p>
            </div>
          </div>

          {/* Admin Internal Management & Notes */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <span>Catatan & Status Follow-Up Petugas</span>
              </h4>
              <div className="flex items-center gap-2 text-xs">
                <label className="font-semibold text-slate-400">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as FollowUpStatus)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <option value="baru">Baru Masuk</option>
                  <option value="dihubungi">Sudah Dihubungi</option>
                  <option value="terdaftar">Terdaftar Bootcamp</option>
                  <option value="selesai">Selesai Konsultasi</option>
                </select>
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tulis catatan internal hasil diskusi atau preferensi orang tua di sini..."
                className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center justify-between">
              {saveSuccess ? (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Catatan & status berhasil disimpan!</span>
                </span>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Perubahan akan langsung tersimpan di penyimpanan admin.
                </span>
              )}

              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`p-4 sm:p-5 border-t flex items-center justify-between sticky bottom-0 z-20 ${
            isDark ? 'bg-[#151a2a] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="text-xs text-slate-400 hidden sm:block">
            Gunakan tombol <strong>Cetak PDF</strong> untuk mengunduh laporan pas dalam 1 lembar A4 mendatar.
          </div>
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

      {/* ========================================================================= */}
      {/* 2. DEDICATED 1-PAGE A4 PRINT TEMPLATE (ONLY VISIBLE WHEN PRINTING)        */}
      {/* ========================================================================= */}
      <div
        id="beekoding-print-sheet"
        className="print-sheet-single-page bg-white text-slate-900 font-sans text-xs"
      >
        {/* Print Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-amber-500">
          <div className="flex items-center gap-2.5">
            <img src="/bee-mascot.png" alt="Beekoding" className="w-9 h-9 object-contain" />
            <div>
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-lg font-black tracking-tight text-slate-950">
                  bee<span className="text-amber-500">koding</span>
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  Talent Lab
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-semibold mt-0.5">
                Diagnostic Aptitude & Digital Assessment Report
              </p>
            </div>
          </div>

          <div className="text-right text-[9px] text-slate-500 leading-tight">
            <p className="font-bold text-slate-800">Dokumen ID: {submission.id}</p>
            <p>Tanggal Tes: {completedAt}</p>
            <p className="text-amber-600 font-semibold">www.beekoding.id</p>
          </div>
        </div>

        {/* Section Profil Siswa (Kompak 4 Kolom) */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-2 mb-2">
          <div className="grid grid-cols-4 gap-2 text-[10px]">
            <div>
              <span className="text-slate-500 block text-[9px]">Nama Siswa:</span>
              <span className="font-extrabold text-slate-900 text-[11px] truncate block">
                {profile.childName}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">Usia & Jenjang:</span>
              <span className="font-bold text-slate-800 block">
                {profile.childAge} Thn • {profile.gradeLevel || '-'}
              </span>
              <span className="text-[8.5px] text-slate-500">{getTierLabel(profile.tier).split('(')[0]}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">Nama Orang Tua:</span>
              <span className="font-bold text-slate-800 block truncate">
                {profile.parentName || '-'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[9px]">WhatsApp:</span>
              <span className="font-bold text-slate-800 block font-mono">
                {profile.parentPhone}
              </span>
            </div>
          </div>
        </div>

        {/* Main 3-Column Grid for Landscape Layout */}
        <div className="grid grid-cols-12 gap-2.5 mb-2 items-stretch">
          {/* Kolom 1 (Kiri - 4/12): Radar Chart & Rata-rata Skor */}
          <div className="col-span-4 border border-slate-200 rounded-lg p-2 flex flex-col items-center justify-between text-center bg-slate-50/50">
            <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-amber-600 block">
              Radar 8 Pilar Kecerdasan Digital
            </span>

            <div className="my-auto py-1">
              <TalentRadarChart scores={scores} isDark={false} maxWidth={175} />
            </div>

            <div className="w-full bg-white border border-amber-200 rounded p-1.5 mt-auto">
              <span className="text-[8.5px] text-slate-500 uppercase tracking-wider block">
                Rata-rata Skor Keseluruhan
              </span>
              <div className="flex items-baseline justify-center gap-1 my-0.5">
                <span className="text-2xl font-black text-amber-600 leading-none">
                  {totalScore}
                </span>
                <span className="text-[11px] font-bold text-slate-400">/100</span>
              </div>
              <span className="text-[8px] font-extrabold text-emerald-700 block">
                {totalScore >= 80
                  ? 'High Aptitude Explorer 🌟'
                  : totalScore >= 60
                  ? 'Promising Coder 🚀'
                  : 'Developing Potential 🌱'}
              </span>
            </div>
          </div>

          {/* Kolom 2 (Tengah - 4/12): Kekuatan Utama & Area Stimulasi */}
          <div className="col-span-4 border border-slate-200 rounded-lg p-2 flex flex-col justify-between space-y-2 bg-white">
            {/* Top 3 Kekuatan Utama */}
            <div>
              <div className="flex items-center gap-1 text-emerald-700 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Top 3 Kekuatan Utama Ananda:</span>
              </div>
              <div className="space-y-1">
                {topStrengths.map((catKey) => {
                  const cat = CATEGORIES[catKey];
                  return (
                    <div key={catKey} className="bg-emerald-50/80 border border-emerald-200 rounded p-1.5 text-[9.5px]">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-emerald-950">🌟 {cat.name}</span>
                        <span className="text-emerald-700 font-mono font-extrabold">{scores[catKey]}%</span>
                      </div>
                      <p className="text-[8.5px] text-slate-600 leading-tight mt-0.5">
                        {cat.shortDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Area yang Perlu Distimulasi (WAJIB TERCANTUM) */}
            <div>
              <div className="flex items-center gap-1 text-amber-700 font-extrabold text-[10px] uppercase tracking-wider mb-1">
                <Target className="w-3.5 h-3.5" />
                <span>Area yang Perlu Distimulasi:</span>
              </div>
              <div className="space-y-1">
                {growthAreas.map((catKey) => {
                  const cat = CATEGORIES[catKey];
                  return (
                    <div key={catKey} className="bg-amber-50/80 border border-amber-200 rounded p-1.5 text-[9.5px]">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-amber-950">🌱 {cat.name}</span>
                        <span className="text-amber-700 font-mono font-extrabold">{scores[catKey]}%</span>
                      </div>
                      <p className="text-[8.5px] text-slate-600 leading-tight mt-0.5">
                        Fokus bimbingan: {cat.shortDesc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kolom 3 (Kanan - 4/12): Rincian 8 Pilar & Rekomendasi Program */}
          <div className="col-span-4 flex flex-col justify-between space-y-2">
            {/* Rincian Nilai 8 Pilar Pemikiran (Grid 2 Kolom x 4 Baris) */}
            <div className="border border-slate-200 rounded-lg p-2 bg-slate-50/40">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Rincian 8 Pilar Pemikiran Digital</span>
                </span>
                <span className="text-[8px] text-slate-500 font-medium">Skala 100%</span>
              </div>

              <div className="grid grid-cols-2 gap-1 text-[9px]">
                {CATEGORY_ORDER.map((catKey) => {
                  const cat = CATEGORIES[catKey];
                  const score = scores[catKey];
                  return (
                    <div key={catKey} className="bg-white border border-slate-200 rounded p-1 shadow-2xs">
                      <div className="flex items-center justify-between font-bold leading-tight mb-0.5">
                        <span className="truncate text-slate-900 text-[8.5px]" title={cat.name}>
                          {cat.name.split(' ')[0]}
                        </span>
                        <span className="font-mono text-[9px] font-black" style={{ color: cat.color }}>
                          {score}%
                        </span>
                      </div>
                      {/* Mini Progress Bar */}
                      <div className="w-full h-1 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${score}%`, backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rekomendasi Program Beekoding */}
            <div className="border-2 border-amber-400 bg-amber-50/60 rounded-lg p-2">
              <div className="flex items-center gap-1 text-amber-800 font-extrabold text-[9px] uppercase tracking-wider mb-0.5">
                <Award className="w-3 h-3 text-amber-600" />
                <span>Rekomendasi Program Beekoding:</span>
              </div>

              <h4 className="font-extrabold text-xs text-slate-900 leading-tight mb-0.5">
                {recommendedProgram.title}
              </h4>
              <p className="text-[8px] text-slate-700 leading-tight mb-1">
                {recommendedProgram.description}
              </p>

              <div className="bg-white/95 border border-amber-200 rounded p-1.5 text-[8px] text-slate-700 leading-tight">
                <strong className="text-amber-800">Mengapa Cocok: </strong>
                <span>{recommendedProgram.whyFit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Print Footer Resmi (1 Halaman Landscape) */}
        <div className="pt-1.5 border-t border-slate-300 flex items-center justify-between text-[8px] text-slate-500 leading-tight">
          <div>
            <p className="font-bold text-slate-700">Beekoding Talent Assessment System • Sarang Edukasi Coding & AI Generasi Baru</p>
            <p>Hotline Konsultasi: 0851-8912-3490 • Email: info@beekoding.id • Website: beekoding.id</p>
          </div>
          <div className="text-right flex items-center gap-1.5">
            <div className="border border-emerald-500 bg-emerald-50 text-emerald-800 font-black text-[7.5px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
              <span>OFFICIAL ASSESSMENT REPORT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
