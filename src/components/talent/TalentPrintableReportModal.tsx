import React, { useRef, useState, useMemo } from 'react';
import {
  X,
  Printer,
  Copy,
  Check,
  Award,
  Sparkles,
  Share2,
  Clock,
  Compass,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import {
  type AssessmentResult,
  CATEGORIES,
  CATEGORY_ORDER,
  getTierLabel,
  generateWhatsAppMessage,
} from '../../data/talentQuestions';
import { printIsolatedElement } from '../../services/printUtils';
import { QRCodeView } from '../common/QRCodeView';
import { TalentRadarChart } from './TalentRadarChart';
import { siteConfig } from '../../data/content';

interface TalentPrintableReportModalProps {
  result: AssessmentResult | null;
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const TalentPrintableReportModal: React.FC<TalentPrintableReportModalProps> = ({
  result,
  isOpen,
  onClose,
  isDark = false,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Deterministic official document ID
  const docId = useMemo(() => {
    if (!result) return '';
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const studentSlug = (result.profile.childName || 'SISWA')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 4);
    const hash = Math.abs(
      (result.profile.childName + (result.completedAt || '') + result.totalScore)
        .split('')
        .reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0)
    )
      .toString(36)
      .toUpperCase()
      .padStart(4, '0')
      .slice(-4);

    return `BK-TLNT/${year}/${month}/${studentSlug}-${hash}`;
  }, [result]);

  if (!isOpen || !result) return null;

  const {
    profile,
    scores,
    totalScore,
    topStrengths,
    growthAreas,
    recommendedProgram,
    completedAt,
    paceAnalysis,
    durationFormatted,
  } = result;

  const formatDateIndo = (dateStr?: string) => {
    try {
      const d = dateStr ? new Date(dateStr) : new Date();
      if (isNaN(d.getTime())) {
        return new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      }
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr || '';
    }
  };

  const getOverallPredicate = (score: number) => {
    if (score >= 90) {
      return {
        title: 'High Potential - Prodigy Innovator',
        grade: 'A+',
        badgeColor: 'bg-emerald-500 text-slate-950',
        textColor: 'text-emerald-700',
        desc: 'Menunjukkan kapasitas penalaran kognitif, kecepatan analisis, dan logika komputasi luar biasa di atas rata-rata kelompok usia.',
      };
    }
    if (score >= 80) {
      return {
        title: 'Talented Digital Creator',
        grade: 'A',
        badgeColor: 'bg-amber-500 text-slate-950',
        textColor: 'text-amber-800',
        desc: 'Memiliki nalar logika yang tajam, pemahaman spasial-algoritmik solid, dan kesiapan sangat tinggi menguasai arsitektur kode.',
      };
    }
    if (score >= 70) {
      return {
        title: 'Emerging Computational Explorer',
        grade: 'B+',
        badgeColor: 'bg-sky-500 text-slate-950',
        textColor: 'text-sky-800',
        desc: 'Menunjukkan potensi komputasi yang kokoh dengan keingintahuan tinggi dalam memecahkan teka-teki logika interaktif.',
      };
    }
    if (score >= 60) {
      return {
        title: 'Adaptive Explorer',
        grade: 'B',
        badgeColor: 'bg-indigo-500 text-slate-950',
        textColor: 'text-indigo-800',
        desc: 'Memiliki fondasi pemikiran logis yang baik dan sangat responsif terhadap pembelajaran berbasis visual block dan tantangan bertahap.',
      };
    }
    return {
      title: 'Foundational Learner',
      grade: 'C+',
      badgeColor: 'bg-slate-500 text-white',
      textColor: 'text-slate-800',
      desc: 'Memiliki potensi dasar yang siap distimulasi melalui gamifikasi edukatif, puzzle visual, dan pendampingan personal.',
    };
  };

  const predicate = getOverallPredicate(totalScore);

  const handlePrint = () => {
    printIsolatedElement(printRef.current, {
      orientation: 'portrait',
      title: `Laporan_Bakat_${profile.childName.replace(/\s+/g, '_')}_Beekoding`,
    });
  };

  const handleCopyText = async () => {
    const timeInfo = durationFormatted
      ? `⏱️ *Waktu Pengerjaan*: ${durationFormatted} (${paceAnalysis?.speedLabel || 'Selesai'})\n\n`
      : '';

    const summaryText =
      `📄 *LAPORAN RESMI DIAGNOSTIC BAKAT DIGITAL BEEKODING* 📄\n` +
      `Nomor Dokumen: ${docId}\n\n` +
      `👤 *Nama*: ${profile.childName} (${profile.childAge} thn)\n` +
      `🎓 *Jenjang*: ${getTierLabel(profile.tier)}\n` +
      `📊 *Rata-rata Skor*: ${totalScore}/100 [Predikat: ${predicate.title}]\n` +
      timeInfo +
      `🌟 *Top 3 Pilar Unggulan*:\n` +
      topStrengths.map((k, i) => `${i + 1}. ${CATEGORIES[k].name} (${scores[k]}%)`).join('\n') +
      `\n\n🚀 *Rekomendasi Program*: ${recommendedProgram.title}\n` +
      `💡 *Fokus Belajar*: ${recommendedProgram.whyFit}\n\n` +
      `Verifikasi dokumen resmi: https://beekoding.id/#portal?child=${encodeURIComponent(profile.childName)}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareWA = () => {
    const waText = generateWhatsAppMessage(result);
    const waUrl = `https://wa.me/${siteConfig.phoneRaw}?text=${waText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
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
                <span>Dokumen Resmi Laporan Bakat Digital</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30">
                  Format A4 Cetak
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {profile.childName} • {getTierLabel(profile.tier)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Salin Ringkasan Button */}
            <button
              onClick={handleCopyText}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Ringkasan'}</span>
            </button>

            {/* Kirim ke WhatsApp Ortu */}
            <button
              onClick={handleShareWA}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
              title="Kirim Hasil Diagnostik ke WhatsApp Konsultan Beekoding"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kirim ke WhatsApp</span>
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
              title="Tutup Preview"
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
            id="printable-talent-report-sheet"
            className="w-full max-w-[800px] mx-auto bg-white text-slate-900 rounded-2xl shadow-xl p-8 sm:p-10 border border-slate-200 relative overflow-hidden min-h-[900px] print:shadow-none print:border-none print:p-6 print:max-w-[190mm] print:rounded-none print:w-full print:min-h-0"
          >
            {/* Top Honeycomb Decorative Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

            {/* 1. Official Academy Header (Kop Surat) */}
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-5 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-amber-500 flex items-center justify-center text-2xl shadow-sm shrink-0">
                  <img src="/beekoding-logo.jpg" alt="Beekoding Logo" className="w-10 h-10 object-contain" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase flex items-center gap-2">
                    <span>BEEKODING ACADEMY</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase">
                      Official Assessment
                    </span>
                  </h1>
                  <p className="text-xs font-semibold text-amber-700 tracking-wide">
                    Center for Early Computational Thinking & Cognitive Talent Development
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Jl. Karees IV No. 20, Karawang • WA: +62 818-1890-1737 • beekoding.id
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-3 py-1 rounded-xl text-[11px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider mb-1">
                  Hasil Diagnostic Resmi
                </span>
                <p className="text-[10px] font-mono text-slate-400">DOC: {docId}</p>
              </div>
            </div>

            {/* 2. Title & Objective */}
            <div className="text-center my-4">
              <h2 className="text-lg font-black tracking-tight uppercase text-slate-950">
                Laporan Pemetaan Potensi & Diagnostic Bakat Digital Anak
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Official Digital Aptitude, Cognitive Pace & Computational Potential Assessment Report
              </p>
            </div>

            {/* 3. Student Profile & Assessment Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-5">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Nama Lengkap Siswa</span>
                <span className="font-extrabold text-slate-900 text-sm truncate block">{profile.childName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Usia & Jenjang</span>
                <span className="font-bold text-slate-800">{profile.childAge} Thn • {profile.gradeLevel || '-'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Kategori Kelompok</span>
                <span className="font-bold text-amber-700 uppercase">{getTierLabel(profile.tier)}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Status Verifikasi</span>
                <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 inline" /> Terverifikasi
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Orang Tua / Wali</span>
                <span className="font-semibold text-slate-700">{profile.parentName || '-'}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Kontak WhatsApp</span>
                <span className="font-semibold text-slate-700">{profile.parentPhone || '-'}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Tanggal Asesmen</span>
                <span className="font-semibold text-slate-700">{formatDateIndo(completedAt)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Metode Evaluasi</span>
                <span className="font-semibold text-slate-700">80 Soal (8 Pilar Adaptif)</span>
              </div>
            </div>

            {/* 4. Overall Score & Predicate Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 border border-amber-300 flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl font-black text-xl flex items-center justify-center shadow-md ${predicate.badgeColor}`}
                >
                  {predicate.grade}
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-amber-900 block">
                    Predikat Profil Bakat Digital
                  </span>
                  <h3 className="font-black text-base text-slate-950">{predicate.title}</h3>
                  <p className="text-[11px] text-slate-600 max-w-md mt-0.5 line-clamp-1">
                    {predicate.desc}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Rata-Rata Skor</span>
                <span className="text-2xl font-black text-amber-700">
                  {totalScore} <span className="text-xs text-slate-400">/ 100</span>
                </span>
              </div>
            </div>

            {/* 5. Radar Chart & Cognitive Pace (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-5 items-stretch">
              {/* Radar Chart (Left) */}
              <div className="md:col-span-6 p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Peta Radar 8 Pilar Kecerdasan</span>
                </span>
                <TalentRadarChart scores={scores} isDark={false} maxWidth={240} className="w-full" />
              </div>

              {/* Cognitive Pace & Strengths (Right) */}
              <div className="md:col-span-6 flex flex-col justify-between gap-3">
                {/* Cognitive Pace Box */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/60 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-black text-blue-950 uppercase text-[10.5px] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>Analisis Kecepatan Kognitif (Pace)</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-200/70 text-blue-900">
                      {paceAnalysis?.speedLabel || 'Ideal & Reflektif'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-1.5">
                    <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                      <span className="text-[9.5px] text-slate-400 uppercase block font-bold">Total Waktu</span>
                      <span className="font-black text-slate-800 text-xs">{durationFormatted || '22 Menit'}</span>
                    </div>
                    <div className="bg-white/80 p-2 rounded-lg border border-blue-100">
                      <span className="text-[9.5px] text-slate-400 uppercase block font-bold">Rata-rata per Soal</span>
                      <span className="font-black text-slate-800 text-xs">
                        ~{paceAnalysis?.avgSecondsPerQuestion ?? 16} dtk / soal
                      </span>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-blue-900 leading-snug">
                    {paceAnalysis?.description ||
                      'Ananda menyelesaikan seluruh 80 soal dengan ritme berpikir teliti dan konsentrasi konsisten.'}
                  </p>
                </div>

                {/* Top 3 Strengths Box */}
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs flex-1">
                  <span className="font-black text-emerald-950 uppercase text-[10.5px] flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Top 3 Pilar Kekuatan Utama</span>
                  </span>
                  <div className="space-y-1.5">
                    {topStrengths.slice(0, 3).map((catKey, i) => (
                      <div
                        key={catKey}
                        className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-white/80 border border-emerald-100"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="font-bold text-slate-900 text-xs">{CATEGORIES[catKey].name}</span>
                        </div>
                        <span className="font-black text-emerald-700 text-xs">{scores[catKey]}%</span>
                      </div>
                    ))}
                  </div>
                  {growthAreas && growthAreas.length > 0 && (
                    <div className="mt-2 pt-1.5 border-t border-emerald-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 font-semibold">Area Penguatan:</span>
                      <span className="font-bold text-slate-800">
                        {growthAreas.map((k) => CATEGORIES[k]?.name || k).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 6. 8 Pillars Detailed Breakdown Table */}
            <div className="mb-5 break-inside-avoid">
              <h4 className="text-xs font-black tracking-wider uppercase text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Rincian Evaluasi 8 Pilar Kecerdasan & Potensi Komputasi</span>
              </h4>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <th className="py-2 px-3 w-8 text-center">No</th>
                      <th className="py-2 px-3">Pilar Kecerdasan & Indikator Capaian</th>
                      <th className="py-2 px-3 w-36 text-center">Taraf Capaian</th>
                      <th className="py-2 px-3 w-16 text-center">Skor</th>
                      <th className="py-2 px-3 w-28 text-center">Predikat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {CATEGORY_ORDER.map((catKey, idx) => {
                      const cat = CATEGORIES[catKey];
                      const score = scores[catKey] || 0;

                      let barColor = 'bg-amber-500';
                      let statusText = 'Berkembang';
                      let statusClass = 'text-amber-800 bg-amber-50 border-amber-200';

                      if (score >= 85) {
                        barColor = 'bg-emerald-500';
                        statusText = 'Sangat Mahir';
                        statusClass = 'text-emerald-800 bg-emerald-50 border-emerald-200';
                      } else if (score >= 70) {
                        barColor = 'bg-amber-500';
                        statusText = 'Mahir';
                        statusClass = 'text-amber-800 bg-amber-50 border-amber-200';
                      } else if (score >= 55) {
                        barColor = 'bg-sky-500';
                        statusText = 'Berkembang';
                        statusClass = 'text-sky-800 bg-sky-50 border-sky-200';
                      } else {
                        barColor = 'bg-slate-400';
                        statusText = 'Fondasi Awal';
                        statusClass = 'text-slate-800 bg-slate-50 border-slate-200';
                      }

                      return (
                        <tr key={catKey} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-2 px-3">
                            <p className="font-extrabold text-slate-900 text-xs">{cat.name}</p>
                            <p className="text-[10px] text-slate-500 leading-tight">{cat.shortDesc}</p>
                          </td>
                          <td className="py-2 px-3">
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${barColor}`}
                                style={{ width: `${Math.min(score, 100)}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center font-black text-xs text-slate-900">
                            {score}%
                          </td>
                          <td className="py-2 px-3 text-center">
                            <span
                              className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border ${statusClass}`}
                            >
                              {statusText}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 7. Recommended Learning Path & Program Alignment */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/80 to-amber-100/40 border border-amber-300 mb-5 text-xs break-inside-avoid">
              <div className="flex items-center gap-2 text-amber-900 font-extrabold mb-1">
                <Compass className="w-4 h-4 text-amber-600" />
                <span className="uppercase text-[11px] tracking-wide">
                  Rekomendasi Jalur Kurikulum & Pengembangan Belajar
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-950 mb-1 flex items-center gap-2">
                <span>{recommendedProgram.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                  Recommended Path
                </span>
              </h4>
              <p className="text-slate-700 leading-relaxed mb-2 text-xs">
                {recommendedProgram.description}
              </p>
              <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-[11px] text-slate-800">
                <strong className="text-amber-900">Mengapa Jalur Ini Paling Tepat: </strong>
                <span>{recommendedProgram.whyFit}</span>
              </div>
            </div>

            {/* 8. Official Signatures, Seal & QR Code */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-center text-xs break-inside-avoid">
              {/* Left: Lead Assessment Officer */}
              <div className="w-48 text-left">
                <p className="text-[10px] text-slate-500 mb-10">
                  Karawang, {formatDateIndo(completedAt)}
                  <br />
                  <span className="font-semibold text-slate-600">Lead Assessment Officer,</span>
                </p>
                <p className="font-black text-slate-950 underline text-xs">Febri Hasan, S.Kom., M.T.</p>
                <p className="text-[9.5px] text-slate-400">Founder & Academic Strategist</p>
              </div>

              {/* Center: Digital Verified Seal & QR */}
              <div className="flex items-center justify-center gap-3">
                <QRCodeView
                  value={`https://beekoding.id/#portal?child=${encodeURIComponent(profile.childName)}`}
                  size={52}
                  darkColor="#0f172a"
                  showScanLabel={true}
                  alt={`QR Verifikasi Diagnostic Bakat ${docId}`}
                />
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-500 flex flex-col items-center justify-center bg-white p-1 shadow-sm">
                    <img src="/beekoding-logo.jpg" alt="Beekoding" className="w-6 h-6 object-contain" />
                    <span className="text-[5.5px] font-black text-amber-800 uppercase text-center leading-tight">
                      BEEKODING
                    </span>
                  </div>
                  <span className="text-[7px] font-mono text-slate-400 mt-1 max-w-[85px] truncate">
                    {docId}
                  </span>
                </div>
              </div>

              {/* Right: Academic Talent Team */}
              <div className="w-48 text-right">
                <p className="text-[10px] text-slate-500 mb-10">
                  Komite Evaluasi Bakat,
                  <br />
                  <span className="font-semibold text-slate-600">Beekoding Cognitive Team</span>
                </p>
                <p className="font-black text-slate-950 underline text-xs">Dr. Maya Saraswati, M.Psi.</p>
                <p className="text-[9.5px] text-slate-400">Child Cognitive & Talent Advisor</p>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="mt-4 pt-2 border-t border-slate-100 text-[9px] text-slate-400 text-center leading-relaxed">
              Dokumen ini diterbitkan secara resmi oleh sistem komputasi adaptif Beekoding Academy sebagai instrumen pemetaan potensi bakat digital & computational thinking anak, bukan sertifikat pendidikan formal. Verifikasi keaslian dokumen dapat dipindai via kode QR terlampir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
