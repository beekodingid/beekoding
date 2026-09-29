import React, { useState } from 'react';
import {
  type AssessmentResult,
  CATEGORIES,
  CATEGORY_ORDER,
  generateWhatsAppMessage,
  getTierLabel,
} from '../../data/talentQuestions';
import { siteConfig } from '../../data/content';
import { TalentRadarChart } from './TalentRadarChart';
import { ConfettiCelebration } from './ConfettiCelebration';
import { TalentPrintableReportModal } from './TalentPrintableReportModal';
import {
  Sparkles,
  Award,
  MessageCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Share2,
  Printer,
  Copy,
  Check,
  Clock,
  Zap,
} from 'lucide-react';

interface TalentResultViewProps {
  result: AssessmentResult;
  isDark: boolean;
  onRetake: () => void;
  onBackToHome: () => void;
}

export const TalentResultView: React.FC<TalentResultViewProps> = ({
  result,
  isDark,
  onRetake,
  onBackToHome,
}) => {
  const { profile, scores, totalScore, topStrengths, growthAreas, recommendedProgram, completedAt } =
    result;

  const whatsappMessage = generateWhatsAppMessage(result);
  const whatsappUrl = `https://wa.me/${siteConfig.phoneRaw}?text=${whatsappMessage}`;

  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const handleCopyText = async () => {
    const timeInfo = result.durationFormatted
      ? `⏱️ *Waktu Pengerjaan*: ${result.durationFormatted} (${result.paceAnalysis?.speedLabel || 'Selesai'})\n\n`
      : '';

    const summaryText =
      `✨ *Hasil Diagnostic Bakat Digital Beekoding* ✨\n\n` +
      `👤 *Nama*: ${profile.childName}\n` +
      `🎓 *Jenjang*: ${getTierLabel(profile.tier)}\n` +
      `📊 *Rata-rata Skor*: ${totalScore}/100\n` +
      timeInfo +
      `🌟 *Top 3 Pilar Unggulan*:\n` +
      topStrengths.map((k, i) => `${i + 1}. ${CATEGORIES[k].name} (${scores[k]}%)`).join('\n') +
      `\n\n🚀 *Rekomendasi Program*: ${recommendedProgram.title}\n\n` +
      `Yuk cek potensi & bakat digital anak di: https://beekoding.pages.dev/#talent`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareNative = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const timePart = result.durationFormatted ? ` • Durasi: ${result.durationFormatted}` : '';
        await navigator.share({
          title: `Hasil Diagnostic Bakat Digital - ${profile.childName}`,
          text: `Peta Bakat Digital Ananda ${profile.childName}: Skor ${totalScore}/100${timePart}. Rekomendasi: ${recommendedProgram.title}.`,
          url: 'https://beekoding.pages.dev/#talent',
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      handleCopyText();
    }
  };

  const handlePrint = () => {
    setIsPrintModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 sm:px-6 animate-fadeIn relative">
      {/* Celebratory Confetti on Complete */}
      {showConfetti && <ConfettiCelebration onComplete={() => setShowConfetti(false)} />}

      {/* Header Banner */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-extrabold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4" />
          <span>Hasil Diagnostic Assessment Bakat Digital</span>
        </div>
        <h1
          className={`text-2xl sm:text-4xl font-black tracking-tight mb-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Peta Bakat & Potensi Ananda{' '}
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
            {profile.childName}
          </span>
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Jenjang: <strong>{getTierLabel(profile.tier)}</strong> • Tanggal Evaluasi: {completedAt}
        </p>
      </div>

      {/* Quick Action Toolbar (Share, Copy, Print PDF, Confetti) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        <button
          type="button"
          onClick={handleShareNative}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
            isDark
              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
          }`}
        >
          <Share2 className="w-4 h-4" />
          <span>Bagikan Hasil</span>
        </button>

        <button
          type="button"
          onClick={handleCopyText}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-sm'
          }`}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Tersalin ke Clipboard! ✨' : 'Salin Ringkasan'}</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
            isDark
              ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/40'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
          }`}
        >
          <Printer className="w-4 h-4 text-amber-500" />
          <span>Cetak / Simpan PDF</span>
        </button>

        <button
          type="button"
          onClick={() => setShowConfetti(true)}
          title="Rayakan lagi!"
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            isDark
              ? 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>🎉</span>
        </button>
      </div>

      {/* Main Score & Radar Hero Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border mb-8 relative overflow-hidden transition-all ${
          isDark
            ? 'bg-[#151928] border-amber-500/25 shadow-2xl shadow-black/50'
            : 'bg-white border-amber-300 shadow-2xl shadow-amber-900/10'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Radar Chart (Left/Center) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="text-center mb-2">
              <span className="text-[11px] uppercase tracking-widest font-extrabold text-amber-500">
                Radar Visualisasi 8 Pilar Kecerdasan
              </span>
            </div>
            <TalentRadarChart scores={scores} isDark={isDark} />
            <p className="text-[11px] text-slate-400 text-center max-w-sm mt-1">
              Setiap sudut mewakili salah satu dari 8 pilar pemikiran digital dengan skor maksimal 100%.
            </p>
          </div>

          {/* Quick Summary Score & Profile (Right) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Big Score Box */}
            <div
              className={`p-6 rounded-2xl border text-center relative overflow-hidden ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-amber-50/80 border-amber-200'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Rata-rata Skor Keseluruhan
              </span>
              <div className="flex items-center justify-center gap-1 my-2">
                <span className="text-5xl sm:text-6xl font-black text-amber-500">
                  {totalScore}
                </span>
                <span className="text-xl font-bold text-slate-400">/100</span>
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {totalScore >= 80
                  ? 'Kategori: Luar Biasa (High Aptitude Explorer) 🌟'
                  : totalScore >= 60
                  ? 'Kategori: Sangat Baik & Berbakat (Promising Coder) 🚀'
                  : 'Kategori: Berkembang & Siap Dilatih (Developing Potential) 🌱'}
              </p>
            </div>

            {/* Waktu Pengerjaan & Analisis Ketangkasan */}
            {result.durationFormatted && (
              <div
                className={`p-4 rounded-2xl border text-xs transition-all ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                    : 'bg-white border-amber-200 text-slate-800 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-500">
                    <Clock className="w-4 h-4" />
                    <span>Waktu Pengerjaan: {result.durationFormatted}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    {result.paceAnalysis?.speedLabel || 'Selesai'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  {result.paceAnalysis?.description ||
                    'Menyelesaikan 80 butir soal asesmen dengan ritme konsentrasi yang baik.'}
                </p>
                {result.paceAnalysis?.avgSecondsPerQuestion && (
                  <p className="text-[10px] font-mono text-slate-500 mt-1.5 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span>Rata-rata: {result.paceAnalysis.avgSecondsPerQuestion} detik/soal (80 Soal)</span>
                  </p>
                )}
              </div>
            )}

            {/* Quick Strengths Summary */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Top 3 Pilar Paling Menonjol:
              </span>
              {topStrengths.map((catKey, idx) => {
                const cat = CATEGORIES[catKey];
                return (
                  <div
                    key={catKey}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xs font-black font-mono text-amber-500">
                      {scores[catKey]}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA WA Direct Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Kirim Hasil ke Konsultan Beekoding</span>
            </a>
          </div>
        </div>
      </div>

      {/* Recommended Beekoding Program Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border mb-8 relative overflow-hidden transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#1c1b2f] to-[#121520] border-purple-500/30 shadow-xl'
            : 'bg-gradient-to-br from-amber-50/80 to-purple-50/50 border-purple-200 shadow-xl'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rekomendasi Jalur Belajar Terbaik Beekoding</span>
            </div>
            <h3
              className={`text-xl sm:text-2xl font-black ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {recommendedProgram.title}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {recommendedProgram.description}
            </p>
            <div
              className={`p-3 rounded-xl border text-xs leading-relaxed mt-2 ${
                isDark
                  ? 'bg-purple-950/30 border-purple-500/20 text-purple-200'
                  : 'bg-purple-50 border-purple-200 text-purple-900'
              }`}
            >
              <strong>💡 Mengapa program ini pas untuk Ananda?</strong> {recommendedProgram.whyFit}
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 whitespace-nowrap px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <span>Konsultasi Kelas Ini</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* 8 Pillars Breakdown Details */}
      <div className="mb-8">
        <h3
          className={`text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5 text-amber-500" />
          <span>Rincian Nilai 8 Pilar Pemikiran:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORY_ORDER.map((catKey) => {
            const cat = CATEGORIES[catKey];
            const score = scores[catKey];
            const isTop = topStrengths.includes(catKey);
            const isGrowth = growthAreas.includes(catKey);

            return (
              <div
                key={catKey}
                className={`p-5 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-[#151928]/90 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200/80 hover:border-amber-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span
                      className={`text-sm font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {cat.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isTop && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30">
                        Unggul ⭐
                      </span>
                    )}
                    {isGrowth && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/30">
                        Potensi 🌱
                      </span>
                    )}
                    <span className="text-sm font-black font-mono text-amber-500">{score}%</span>
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed mb-3 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {cat.shortDesc}
                </p>

                {/* Individual Progress Bar */}
                <div
                  className={`h-2 w-full rounded-full overflow-hidden ${
                    isDark ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${score}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onRetake}
          className={`w-full sm:w-auto px-5 py-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Asesmen (Ganti Profil / Usia)</span>
        </button>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Hasil Resmi A4</span>
          </button>

          <button
            type="button"
            onClick={onBackToHome}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
            }`}
          >
            Kembali ke Beranda
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto whitespace-nowrap px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Official A4 Printable Report Modal */}
      <TalentPrintableReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        result={result}
        isDark={isDark}
      />
    </div>
  );
};
