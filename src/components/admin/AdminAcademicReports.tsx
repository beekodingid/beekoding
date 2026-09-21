import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Plus,
  Download,
  RotateCcw,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Calendar,
  BookOpen,
  Printer,
  Edit2,
  Trash2,
  Send,
} from 'lucide-react';
import {
  type StudentAcademicReport,
  getAcademicReports,
  deleteAcademicReport,
  resetAcademicReportsToDefault,
  calculateReportStats,
  exportReportsCSV,
  getBatches,
} from '../../services/adminStorage';
import { AdminAcademicReportModal } from './AdminAcademicReportModal';
import { AdminPrintableReportModal } from './AdminPrintableReportModal';

interface AdminAcademicReportsProps {
  isDark?: boolean;
}

const TIER_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  junior: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/25',
  },
  middle: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/25',
  },
  teens: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/25',
  },
};

const GRADE_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  'A+': {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-500 dark:text-emerald-400 font-black',
    border: 'border-emerald-500/30',
  },
  A: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400 font-bold',
    border: 'border-emerald-500/20',
  },
  'B+': {
    bg: 'bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400 font-bold',
    border: 'border-amber-500/30',
  },
  B: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400 font-medium',
    border: 'border-amber-500/20',
  },
  C: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400 font-bold',
    border: 'border-rose-500/20',
  },
};

export const AdminAcademicReports: React.FC<AdminAcademicReportsProps> = ({
  isDark = false,
}) => {
  const [reports, setReports] = useState<StudentAcademicReport[]>(() => getAcademicReports());
  const [batches] = useState(() => getBatches());

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>('all');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');
  const [selectedPeriodFilter, setSelectedPeriodFilter] = useState<string>('all');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('all');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingReport, setEditingReport] = useState<StudentAcademicReport | null>(null);

  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [selectedPrintReport, setSelectedPrintReport] = useState<StudentAcademicReport | null>(
    null
  );

  const reloadData = () => {
    setReports(getAcademicReports());
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Hapus data rapor akademik untuk ${name}? Tindakan ini tidak dapat dibatalkan.`)) {
      deleteAcademicReport(id);
      reloadData();
    }
  };

  const handleResetDefault = () => {
    if (
      window.confirm(
        'Kembalikan seluruh data rapor ke sampel bawaan akademi? Data yang belum diekspor akan terhapus.'
      )
    ) {
      resetAcademicReportsToDefault();
      reloadData();
    }
  };

  // Filtered reports
  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (selectedBatchFilter !== 'all' && r.batchId !== selectedBatchFilter) return false;
      if (selectedTierFilter !== 'all' && r.tier !== selectedTierFilter) return false;
      if (selectedPeriodFilter !== 'all' && r.reportPeriod !== selectedPeriodFilter) return false;
      if (selectedGradeFilter !== 'all' && r.gradeLetter !== selectedGradeFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchStudent = r.studentName.toLowerCase().includes(q);
        const matchParent = r.parentName.toLowerCase().includes(q);
        const matchBatch = r.batchName.toLowerCase().includes(q);
        const matchProject = r.capstoneProjectTitle.toLowerCase().includes(q);
        const matchNotes = r.instructorNotes.toLowerCase().includes(q);
        const matchInstructor = r.instructorName.toLowerCase().includes(q);

        if (
          !matchStudent &&
          !matchParent &&
          !matchBatch &&
          !matchProject &&
          !matchNotes &&
          !matchInstructor
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    reports,
    selectedBatchFilter,
    selectedTierFilter,
    selectedPeriodFilter,
    selectedGradeFilter,
    searchQuery,
  ]);

  // Analytics
  const stats = useMemo(() => calculateReportStats(reports), [reports]);

  // 1-Click WhatsApp Direct
  const handleDirectWA = (r: StudentAcademicReport) => {
    const periodLabel =
      r.reportPeriod === 'final_term' ? 'Akhir Sesi (Final-Term)' : 'Tengah Sesi (Mid-Term)';

    const text = [
      `🐝 *RAPOR HASIL BELAJAR SISWA BEEKODING* 📊`,
      `---------------------------------------`,
      `Yth. Bapak/Ibu *${r.parentName}*,`,
      ``,
      `Berikut adalah rangkuman evaluasi belajar ananda:`,
      `⭐ *${r.studentName.toUpperCase()}*`,
      `📚 *Kelas*: ${r.batchName} (${r.tier.toUpperCase()})`,
      `🗓️ *Periode*: ${periodLabel}`,
      `✅ *Kehadiran*: ${r.attendanceRate}%`,
      `🎯 *Nilai Rata-rata*: *${r.averageScore} / 100*`,
      `🏅 *Predikat*: *${r.gradeLetter}* (${r.predicateTitle})`,
      ``,
      `🚀 *Karya Capstone Project*:`,
      `"${r.capstoneProjectTitle}"`,
      ``,
      `📝 *Catatan Mentor (${r.instructorName})*:`,
      `"${r.instructorNotes}"`,
      ``,
      `💡 *Rekomendasi Level*:`,
      `"${r.nextStepRecommendation}"`,
      ``,
      `_BeeKoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    ].join('\n');

    const cleanPhone = r.parentPhone.replace(/\D/g, '');
    const normalizedPhone = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.substring(1)
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : '62' + cleanPhone;

    window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Manajemen Evaluasi & Hasil Belajar Siswa</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Rapor Kemajuan Belajar Siswa
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Penerbitan rapor berkala (Mid-Term & Final-Term), rubrik penilaian 5 pilar kompetensi
            coding, cetak lembar resmi A4 PDF, dan pengiriman pesan evaluasi ke WhatsApp wali murid.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetDefault}
            title="Reset ke Data Bawaan"
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => exportReportsCSV(filteredReports)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Ekspor CSV Rekap Nilai</span>
          </button>

          <button
            onClick={() => {
              setEditingReport(null);
              setIsFormModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Terbitkan Rapor Siswa</span>
          </button>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Reports */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Rapor Terbit</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500">{stats.totalReports}</span>
            <span className="text-xs text-slate-400 font-semibold">Dokumen</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Mid-Term & Final Capstone Project</p>
        </div>

        {/* Card 2: Academy Average Score */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Rata-rata Skor Akademi</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500">{stats.averageScore}</span>
            <span className="text-xs text-slate-400 font-semibold">/ 100</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Dari 5 pilar kompetensi teknis & sikap</p>
        </div>

        {/* Card 3: High Distinction */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Predikat Sangat Memuaskan</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-purple-400">
              {stats.highDistinctionCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Siswa (A / A+)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Siap direkomendasikan naik tingkat</p>
        </div>

        {/* Card 4: Attendance Average */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Kehadiran Siswa Terlapor</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-blue-400">
              {stats.averageAttendanceRate}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">Rata-rata</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sinkron dengan modul presensi pertemuan</p>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama siswa, orang tua, batch, proyek capstone, atau instruktur..."
            className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400'
            }`}
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch */}
          <select
            value={selectedBatchFilter}
            onChange={(e) => setSelectedBatchFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Batch Kelas</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Jenjang */}
          <select
            value={selectedTierFilter}
            onChange={(e) => setSelectedTierFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior (Scratch)</option>
            <option value="middle">Middle (Roblox/Python)</option>
            <option value="teens">Teens (Web/AI)</option>
          </select>

          {/* Periode */}
          <select
            value={selectedPeriodFilter}
            onChange={(e) => setSelectedPeriodFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Periode</option>
            <option value="final_term">Akhir Sesi (Final)</option>
            <option value="mid_term">Tengah Sesi (Mid)</option>
          </select>

          {/* Grade Letter */}
          <select
            value={selectedGradeFilter}
            onChange={(e) => setSelectedGradeFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Nilai</option>
            <option value="A+">Grade A+ (High Distinction)</option>
            <option value="A">Grade A (Proficient)</option>
            <option value="B+">Grade B+ (Good Progress)</option>
            <option value="B">Grade B (Developing)</option>
            <option value="C">Grade C (Needs Practice)</option>
          </select>
        </div>
      </div>

      {/* 4. Report Cards Grid */}
      {filteredReports.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base mb-1">Tidak ada data rapor yang sesuai</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Coba sesuaikan kata kunci pencarian atau klik tombol &quot;Terbitkan Rapor Siswa&quot; untuk
            membuat rapor baru.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBatchFilter('all');
              setSelectedTierFilter('all');
              setSelectedPeriodFilter('all');
              setSelectedGradeFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((r) => {
            const tierStyle = TIER_BADGES[r.tier] || TIER_BADGES.junior;
            const gradeStyle = GRADE_STYLES[r.gradeLetter] || GRADE_STYLES['A'];

            return (
              <div
                key={r.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Badges & Grade */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}
                        >
                          {r.tier}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-800 text-slate-300 dark:bg-slate-800 dark:text-slate-300">
                          {r.reportPeriod === 'final_term' ? 'Final-Term' : 'Mid-Term'}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-500">
                          {r.attendanceRate}% Hadir
                        </span>
                      </div>

                      <h3 className="text-base font-black tracking-tight text-slate-100 dark:text-slate-100">
                        {r.studentName}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{r.batchName}</p>
                    </div>

                    {/* Grade Score Bubble */}
                    <div
                      className={`px-3 py-1.5 rounded-2xl border text-center shrink-0 ${gradeStyle.bg} ${gradeStyle.text} ${gradeStyle.border}`}
                    >
                      <span className="text-lg font-black leading-none block">{r.gradeLetter}</span>
                      <span className="text-[10px] font-bold block mt-0.5">
                        {r.averageScore} <span className="opacity-70 font-normal">/100</span>
                      </span>
                    </div>
                  </div>

                  {/* Predicate & Capstone Project Preview */}
                  <div className="py-3 space-y-2.5">
                    <div>
                      <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400">
                        {r.predicateTitle}
                      </span>
                    </div>

                    {/* 5 Competencies Mini Bars */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                        <span>Logika & Comp. Thinking:</span>
                        <span className="font-bold text-slate-200">
                          {r.scores.computationalThinking}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${r.scores.computationalThinking}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-1">
                        <span>Kreativitas & Desain:</span>
                        <span className="font-bold text-slate-200">{r.scores.creativityDesign}</span>
                      </div>
                      <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-purple-500 h-full rounded-full"
                          style={{ width: `${r.scores.creativityDesign}%` }}
                        />
                      </div>
                    </div>

                    {/* Capstone Project Box */}
                    <div
                      className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                        isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-slate-200 dark:text-slate-200 mb-0.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <span className="line-clamp-1">{r.capstoneProjectTitle}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                        &quot;{r.instructorNotes}&quot;
                      </p>
                    </div>

                    {/* Mentor & Issue Date */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Mentor: {r.instructorName}</span>
                      <span>{r.issueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* View & Print A4 Report */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPrintReport(r);
                        setIsPrintModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 border border-amber-500/20 transition-all cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Lembar Rapor A4</span>
                    </button>

                    {/* Send WA */}
                    <button
                      type="button"
                      onClick={() => handleDirectWA(r)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all cursor-pointer"
                      title="Kirim Ringkasan Rapor via WhatsApp ke Orang Tua"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim WA</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingReport(r);
                        setIsFormModalOpen(true);
                      }}
                      className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                      title="Edit Rapor"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(r.id, r.studentName)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Rapor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Input & Edit */}
      {isFormModalOpen && (
        <AdminAcademicReportModal
          key={editingReport ? editingReport.id : 'new-report'}
          report={editingReport}
          isOpen={isFormModalOpen}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingReport(null);
          }}
          onSaved={() => {
            reloadData();
          }}
          isDark={isDark}
        />
      )}

      {/* Modal Cetak Lembar Rapor A4 */}
      {isPrintModalOpen && selectedPrintReport && (
        <AdminPrintableReportModal
          report={selectedPrintReport}
          isOpen={isPrintModalOpen}
          onClose={() => {
            setIsPrintModalOpen(false);
            setSelectedPrintReport(null);
          }}
          isDark={isDark}
        />
      )}
    </div>
  );
};
