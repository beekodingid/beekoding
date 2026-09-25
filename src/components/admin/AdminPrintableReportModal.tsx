import React, { useRef, useState } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Award,
  Sparkles,
  BookOpen,
  Send,
} from 'lucide-react';
import type { StudentAcademicReport } from '../../services/adminStorage';
import { printIsolatedElement } from '../../services/printUtils';

interface AdminPrintableReportModalProps {
  report: StudentAcademicReport | null;
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

const COMPETENCY_META = [
  {
    key: 'computationalThinking' as const,
    title: 'Logika Algoritma & Computational Thinking',
    desc: 'Pemahaman alur sekuensial, percabangan (if-else), struktur perulangan (loops), dan variabel data.',
  },
  {
    key: 'creativityDesign' as const,
    title: 'Kreativitas & Desain Proyek',
    desc: 'Keunikan konsep game/web, estetika antarmuka, pemilihan aset visual/audio, dan pengalaman pengguna (UX).',
  },
  {
    key: 'problemSolving' as const,
    title: 'Kemandirian Debugging & Problem Solving',
    desc: 'Daya juang menelusuri bug galat logika secara sistematis dan mencari solusi alternatif mandiri.',
  },
  {
    key: 'codeMastery' as const,
    title: 'Penguasaan Sintaks & Manipulasi Alat',
    desc: 'Kecepatan mengoperasikan antarmuka Scratch/Roblox Studio/VS Code, penulisan script, dan arsitektur file.',
  },
  {
    key: 'teamworkAttitude' as const,
    title: 'Sikap Belajar, Keaktifan & Kolaborasi',
    desc: 'Kedisiplinan hadir tepat waktu, antusiasme bertanya di sesi diskusi, dan etika komunikasi positif.',
  },
];

export const AdminPrintableReportModal: React.FC<AdminPrintableReportModalProps> = ({
  report,
  isOpen,
  onClose,
  isDark = false,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !report) return null;

  const handlePrint = () => {
    printIsolatedElement(printRef.current, {
      orientation: 'portrait',
      title: `Rapor-${report.studentName.replace(/\s+/g, '_')}`,
    });
  };

  const formatDateIndo = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const generateWhatsAppMessage = () => {
    const periodLabel =
      report.reportPeriod === 'final_term' ? 'Akhir Sesi (Final-Term)' : 'Tengah Sesi (Mid-Term)';

    const lines = [
      `🐝 *RAPOR HASIL BELAJAR SISWA BEEKODING* 📊`,
      `---------------------------------------`,
      `Yth. Bapak/Ibu *${report.parentName}*,`,
      ``,
      `Berikut adalah rangkuman evaluasi kemajuan belajar ananda:`,
      `⭐ *${report.studentName.toUpperCase()}*`,
      `📚 *Kelas*: ${report.batchName}`,
      `🎯 *Jenjang*: ${report.tier.toUpperCase()}`,
      `🗓️ *Periode*: ${periodLabel}`,
      `📅 *Tanggal Terbit*: ${formatDateIndo(report.issueDate)}`,
      `✅ *Tingkat Kehadiran*: ${report.attendanceRate}%`,
      ``,
      `*PENCAPAIAN KOMPETENSI CODING:*`,
      `• Nilai Rata-rata: *${report.averageScore} / 100*`,
      `• Predikat: *${report.gradeLetter}* (${report.predicateTitle})`,
      ``,
      `*DETAIL 5 ASPEK KOMPETENSI:*`,
      `1. Logika & Computational Thinking: ${report.scores.computationalThinking}/100`,
      `2. Kreativitas & Desain: ${report.scores.creativityDesign}/100`,
      `3. Problem Solving & Debugging: ${report.scores.problemSolving}/100`,
      `4. Penguasaan Sintaks & Alat: ${report.scores.codeMastery}/100`,
      `5. Sikap Belajar & Kolaborasi: ${report.scores.teamworkAttitude}/100`,
      ``,
      `🚀 *Karya Proyek Capstone*:`,
      `"${report.capstoneProjectTitle}"`,
      report.capstoneProjectDesc ? `_${report.capstoneProjectDesc}_` : '',
      ``,
      `📝 *Catatan Evaluasi Instruktur (${report.instructorName})*:`,
      `"${report.instructorNotes}"`,
      ``,
      `💡 *Rekomendasi Langkah Berikutnya*:`,
      `"${report.nextStepRecommendation}"`,
      ``,
      `Terima kasih atas kepercayaan Bapak/Ibu mendampingi ananda belajar coding & AI bersama Beekoding. Lembar rapor resmi A4 PDF dapat diunduh melalui portal sekolah.`,
      `_Beekoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    ]
      .filter(Boolean)
      .join('\n');

    return lines;
  };

  const handleCopyWA = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWA = () => {
    const text = generateWhatsAppMessage();
    const cleanPhone = report.parentPhone.replace(/\D/g, '');
    const normalizedPhone = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.substring(1)
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : '62' + cleanPhone;

    window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto print:overflow-visible">
      {/* Container Dialog */}
      <div
        className={`w-full max-w-4xl max-h-[96vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:rounded-none print:max-h-none print:overflow-visible ${
          isDark ? 'bg-[#10131b] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Modal Top Action Toolbar (Hidden in Print) */}
        <div
          className={`print:hidden px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight flex items-center gap-2">
                <span>Rapor Evaluasi Belajar Siswa</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  {report.reportPeriod === 'final_term' ? 'Final-Term' : 'Mid-Term'}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {report.studentName} • {report.batchName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Salin WA Button */}
            <button
              onClick={handleCopyWA}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Pesan WA'}</span>
            </button>

            {/* Kirim Langsung WA ke Orang Tua */}
            <button
              onClick={handleOpenWA}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim WA ke Orang Tua</span>
            </button>

            {/* Cetak PDF / A4 */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Sheet Container */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1 bg-slate-100 dark:bg-[#0b0d13] print:p-0 print:bg-white print:overflow-visible">
          {/* Official A4 Document Sheet */}
          <div
            ref={printRef}
            id="printable-report-sheet"
            className="w-full max-w-[800px] mx-auto bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-200 relative overflow-hidden min-h-[900px] print:shadow-none print:border-none print:p-6 print:max-w-[190mm] print:rounded-none print:w-full print:min-h-0"
          >
            {/* Top Honeycomb Decorative Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

            {/* 1. Official Academy Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-5 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border-2 border-amber-500 flex items-center justify-center text-2xl shadow-sm">
                  🐝
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase flex items-center gap-2">
                    <span>BEEKODING ACADEMY</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                      Official
                    </span>
                  </h1>
                  <p className="text-xs font-semibold text-amber-700 tracking-wide">
                    Next-Gen Coding & Artificial Intelligence Academy for Kids & Teens
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Jl. Terusan Babakan Jeruk No. 88, Pasteur, Bandung • WA: +62 853-1131-7127 •
                    beekoding.id
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-xl text-xs font-black bg-amber-500 text-slate-950 uppercase tracking-wider mb-1">
                  {report.reportPeriod === 'final_term' ? 'Laporan Kelulusan (Final)' : 'Laporan Tengah Sesi'}
                </span>
                <p className="text-[10px] font-mono text-slate-400">ID: {report.id}</p>
              </div>
            </div>

            {/* Title */}
            <div className="text-center my-4">
              <h2 className="text-lg font-black tracking-tight uppercase text-slate-950">
                Laporan Hasil Belajar & Evaluasi Kompetensi Siswa
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Student Academic Progress Report & Competency Assessment Card
              </p>
            </div>

            {/* 2. Student Info & Attendance Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Nama Siswa</span>
                <span className="font-extrabold text-slate-900 text-sm">{report.studentName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Batch / Kelas</span>
                <span className="font-bold text-slate-800">{report.batchName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Jenjang Program</span>
                <span className="font-bold text-amber-700 uppercase">{report.tier} Explorer</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tingkat Kehadiran</span>
                <span className="font-extrabold text-emerald-600">{report.attendanceRate}% Hadir</span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Orang Tua / Wali</span>
                <span className="font-semibold text-slate-700">{report.parentName}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">No. WhatsApp</span>
                <span className="font-semibold text-slate-700">{report.parentPhone}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Instruktur Mentor</span>
                <span className="font-semibold text-slate-700">{report.instructorName}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tanggal Terbit</span>
                <span className="font-semibold text-slate-700">{formatDateIndo(report.issueDate)}</span>
              </div>
            </div>

            {/* 3. Overall Score & Predicate Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-300 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md shadow-amber-500/30">
                  {report.gradeLetter}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-900 block">
                    Predikat Capaian Akademik
                  </span>
                  <h3 className="font-black text-base text-slate-950">{report.predicateTitle}</h3>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Nilai Rata-Rata</span>
                <span className="text-2xl font-black text-amber-700">
                  {report.averageScore} <span className="text-xs text-slate-400">/ 100</span>
                </span>
              </div>
            </div>

            {/* 4. 5 Pillars Competency Evaluation Table */}
            <div className="mb-6">
              <h4 className="text-xs font-black tracking-wider uppercase text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Rincian Evaluasi 5 Pilar Kompetensi Coding</span>
              </h4>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3 w-10 text-center">No</th>
                      <th className="py-2.5 px-3">Aspek Kompetensi & Indikator Capaian</th>
                      <th className="py-2.5 px-3 w-40 text-center">Taraf Capaian</th>
                      <th className="py-2.5 px-3 w-20 text-center">Skor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {COMPETENCY_META.map((comp, idx) => {
                      const score = report.scores[comp.key] || 0;
                      let barColor = 'bg-amber-500';
                      if (score >= 90) barColor = 'bg-emerald-500';
                      else if (score >= 75) barColor = 'bg-amber-500';
                      else barColor = 'bg-sky-500';

                      return (
                        <tr key={comp.key} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-2.5 px-3">
                            <p className="font-extrabold text-slate-900">{comp.title}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{comp.desc}</p>
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${Math.min(score, 100)}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-slate-500 block text-center mt-1">
                              {score >= 90
                                ? 'Sangat Mahir'
                                : score >= 80
                                ? 'Mahir'
                                : score >= 70
                                ? 'Berkembang'
                                : 'Perlu Latihan'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-black text-sm text-slate-900">
                            {score}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. Capstone Project Showcase Box */}
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 mb-6 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold mb-1">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span className="uppercase text-[11px]">Proyek Kelulusan Siswa (Capstone Project)</span>
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1">{report.capstoneProjectTitle}</h4>
              <p className="text-slate-700 leading-relaxed italic">{report.capstoneProjectDesc}</p>
            </div>

            {/* 6. Qualitative Instructor Feedback & Recommendation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">
                  Catatan Evaluasi Pengajar:
                </span>
                <p className="text-slate-700 leading-relaxed italic">&quot;{report.instructorNotes}&quot;</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-amber-900 block mb-1">
                  Rekomendasi Level Pembelajaran Berikutnya:
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  &quot;{report.nextStepRecommendation}&quot;
                </p>
              </div>
            </div>

            {/* 7. Official Signatures & Digital Seal */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-center text-xs">
              {/* Left: Class Mentor */}
              <div className="w-48">
                <p className="text-[11px] text-slate-500 mb-12">Instruktur Pembimbing Kelas,</p>
                <p className="font-black text-slate-950 underline">{report.instructorName}</p>
                <p className="text-[10px] text-slate-400">Beekoding Academic Mentor</p>
              </div>

              {/* Center: Digital Verified Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-500 flex flex-col items-center justify-center bg-amber-50/70 p-1">
                  <span className="text-base">🐝</span>
                  <span className="text-[7px] font-black text-amber-800 uppercase text-center leading-tight">
                    BEEKODING VERIFIED
                  </span>
                </div>
                <span className="text-[8px] font-mono text-slate-400 mt-1">
                  SECURE-REPORT-{report.id}
                </span>
              </div>

              {/* Right: Founder & Lead Officer */}
              <div className="w-48">
                <p className="text-[11px] text-slate-500 mb-12">Lead Assessment Officer,</p>
                <p className="font-black text-slate-950 underline">Febri Hasan, S.Kom., M.T.</p>
                <p className="text-[10px] text-slate-400">Founder & Academic Strategist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
