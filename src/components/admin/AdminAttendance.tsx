import React, { useState, useMemo } from 'react';
import {
  ClipboardCheck,
  Search,
  Plus,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Share2,
  Edit2,
  Trash2,
  Calendar,
  User,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from 'lucide-react';
import {
  type SessionAttendanceRecord,
  getAttendanceRecords,
  deleteAttendanceRecord,
  resetAttendanceToDefault,
  calculateAttendanceStats,
  exportAttendanceCSV,
  getBatches,
} from '../../services/adminStorage';
import { AdminAttendanceModal } from './AdminAttendanceModal';

interface AdminAttendanceProps {
  isDark?: boolean;
}

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
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

export const AdminAttendance: React.FC<AdminAttendanceProps> = ({ isDark = false }) => {
  const [records, setRecords] = useState<SessionAttendanceRecord[]>(() => getAttendanceRecords());
  const [batches] = useState(() => getBatches());

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState<string>('all');
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<SessionAttendanceRecord | null>(null);

  // Expanded details toggle for class notes / homework
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  // Reload data
  const reloadData = () => {
    setRecords(getAttendanceRecords());
  };

  // Handle Delete
  const handleDelete = (id: string, batchName: string, sessionNum: number) => {
    if (
      window.confirm(
        `Yakin ingin menghapus rekaman presensi Sesi ${sessionNum} untuk ${batchName}? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      deleteAttendanceRecord(id);
      reloadData();
    }
  };

  // Handle Reset to Default
  const handleResetDefault = () => {
    if (
      window.confirm(
        'Kembalikan data presensi ke sampel default pabrik? Data baru yang belum diekspor akan terhapus.'
      )
    ) {
      resetAttendanceToDefault();
      reloadData();
    }
  };

  // Toggle expanded note
  const toggleExpanded = (id: string) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered and Sorted Records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // Filter by batch
        if (selectedBatchFilter !== 'all' && rec.batchId !== selectedBatchFilter) {
          return false;
        }

        // Filter by tier
        if (selectedTierFilter !== 'all' && rec.tier !== selectedTierFilter) {
          return false;
        }

        // Filter by search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTopic = rec.sessionTopic.toLowerCase().includes(q);
          const matchBatch = rec.batchName.toLowerCase().includes(q);
          const matchInstructor = rec.instructorName.toLowerCase().includes(q);
          const matchNotes = (rec.classNotes || '').toLowerCase().includes(q);
          const matchHomework = (rec.homeworkAssigned || '').toLowerCase().includes(q);
          const matchStudent = rec.students.some(
            (st) =>
              st.studentName.toLowerCase().includes(q) ||
              (st.parentName || '').toLowerCase().includes(q) ||
              (st.notes || '').toLowerCase().includes(q)
          );

          if (!matchTopic && !matchBatch && !matchInstructor && !matchNotes && !matchHomework && !matchStudent) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });
  }, [records, selectedBatchFilter, selectedTierFilter, searchQuery, sortOrder]);

  // Attendance Metrics
  const stats = useMemo(() => calculateAttendanceStats(records), [records]);

  // Share WA for specific session record
  const handleShareWA = (rec: SessionAttendanceRecord) => {
    const presentList = rec.students.filter((s) => s.status === 'present');
    const lateList = rec.students.filter((s) => s.status === 'late');
    const excusedList = rec.students.filter((s) => s.status === 'excused');
    const absentList = rec.students.filter((s) => s.status === 'absent');

    const lines = [
      `🐝 *LAPORAN PRESENSI & EVALUASI KELAS BEEKODING* 🐝`,
      `---------------------------------------`,
      `📚 *Batch*: ${rec.batchName}`,
      `🎯 *Jenjang*: ${rec.tier.toUpperCase()}`,
      `📌 *Pertemuan*: Sesi ${rec.sessionNumber} - ${rec.sessionTopic}`,
      `📅 *Tanggal*: ${rec.date}`,
      `👨‍🏫 *Instruktur*: ${rec.instructorName}`,
      ``,
      `*STATUS KEHADIRAN SISWA:*`,
      `✅ *Hadir (${presentList.length}/${rec.students.length})*:`,
      presentList.length > 0
        ? presentList.map((s, i) => `  ${i + 1}. ${s.studentName}`).join('\n')
        : '  (Tidak ada)',
    ];

    if (lateList.length > 0) {
      lines.push(
        ``,
        `⏰ *Terlambat (${lateList.length})*:`,
        ...lateList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (excusedList.length > 0) {
      lines.push(
        ``,
        `📩 *Izin / Sakit (${excusedList.length})*:`,
        ...excusedList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (absentList.length > 0) {
      lines.push(
        ``,
        `❌ *Alpa (${absentList.length})*:`,
        ...absentList.map((s) => `  • ${s.studentName}${s.notes ? ` (${s.notes})` : ''}`)
      );
    }

    if (rec.classNotes) {
      lines.push(``, `📝 *Catatan Kemajuan Sesi*:`, `"${rec.classNotes}"`);
    }

    if (rec.homeworkAssigned) {
      lines.push(``, `💡 *Tugas Mandiri / PR*:`, `"${rec.homeworkAssigned}"`);
    }

    lines.push(
      ``,
      `Terima kasih atas partisipasi aktif ananda hari ini! ✨`,
      `_BeeKoding - Next Gen Coding & AI Academy for Kids & Teens_`
    );

    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            <ClipboardCheck className="w-4 h-4" />
            <span>Manajemen Akademik & Presensi Siswa</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Presensi & Absensi Pertemuan
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Catat kehadiran murid tiap sesi, evaluasi catatan belajar instruktur, serta kirim rekap
            laporan otomatis ke grup WhatsApp orang tua dalam 1-klik.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleResetDefault}
            title="Reset ke Sampel Default"
            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => exportAttendanceCSV(filteredRecords)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <Download className="w-4 h-4 text-amber-500" />
            <span>Ekspor CSV Rekap</span>
          </button>

          <button
            onClick={() => {
              setEditingRecord(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Presensi Sesi</span>
          </button>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Overall Attendance Rate */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Tingkat Kehadiran</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-black ${
                stats.overallAttendanceRate >= 90
                  ? 'text-emerald-500'
                  : stats.overallAttendanceRate >= 80
                  ? 'text-amber-500'
                  : 'text-rose-500'
              }`}
            >
              {stats.overallAttendanceRate}%
            </span>
            <span className="text-xs text-slate-400 font-semibold">Rata-rata</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Dari {stats.totalStudentAttendances} total entri presensi siswa
          </p>
        </div>

        {/* Metric 2: Sessions Conducted */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Sesi Terlaksana</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500">
              {stats.totalSessionsConducted}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Pertemuan</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Terdokumentasi lengkap dengan catatan materi</p>
        </div>

        {/* Metric 3: Present Count */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Siswa Hadir Tepat Waktu</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500">
              {stats.totalPresentCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Kehadiran</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            + {stats.totalLateCount} siswa hadir dengan status terlambat
          </p>
        </div>

        {/* Metric 4: Excused & Absent */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Izin, Sakit & Alpa</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500">
              {stats.totalExcusedCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">Izin / Sakit</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {stats.totalAbsentCount} alpa (rekaman kelas wajib dibagikan)
          </p>
        </div>
      </div>

      {/* 3. Filter Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari murid, batch, materi sesi, instruktur, atau catatan..."
            className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400'
            }`}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Batch Filter */}
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

          {/* Jenjang Filter */}
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
            <option value="junior">Junior Explorer (Scratch)</option>
            <option value="middle">Middle Coder (Roblox)</option>
            <option value="teens">Teens Innovator (Web & AI)</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className={`px-3 py-2 rounded-xl text-xs border font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {sortOrder === 'desc' ? '📅 Tanggal Terbaru' : '📅 Tanggal Terlama'}
          </button>
        </div>
      </div>

      {/* 4. Session Attendance Cards List */}
      {filteredRecords.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <ClipboardCheck className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base mb-1">Tidak ada data presensi yang sesuai</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Coba ubah kata kunci pencarian atau buat presensi sesi baru dengan klik tombol &quot;Catat
            Presensi Sesi&quot; di atas.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedBatchFilter('all');
              setSelectedTierFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((rec) => {
            const tierStyle = TIER_COLORS[rec.tier] || TIER_COLORS.junior;
            const totalInSession = rec.students.length;
            const presentInSession = rec.students.filter(
              (s) => s.status === 'present' || s.status === 'late'
            ).length;
            const sessionRate =
              totalInSession > 0 ? Math.round((presentInSession / totalInSession) * 100) : 0;
            const isExpanded = expandedNotes[rec.id];

            return (
              <div
                key={rec.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Session Card Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Sesi badge */}
                    <span className="px-3 py-1 rounded-xl text-xs font-black bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20">
                      Sesi {rec.sessionNumber}
                    </span>

                    {/* Tier badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border uppercase tracking-wider ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}
                    >
                      {rec.tier}
                    </span>

                    {/* Batch Name */}
                    <span className="font-extrabold text-sm tracking-tight">{rec.batchName}</span>
                  </div>

                  {/* Date & Instructor */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold text-slate-300 dark:text-slate-300">
                        {rec.date}
                      </span>
                    </div>

                    <span className="text-slate-600">•</span>

                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-500" />
                      <span>{rec.instructorName}</span>
                    </div>
                  </div>
                </div>

                {/* Session Topic & Attendance Bar */}
                <div className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                      <h4 className="font-bold text-sm text-slate-100 dark:text-slate-100">
                        {rec.sessionTopic}
                      </h4>
                    </div>

                    {/* Rate pill */}
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs text-slate-400">Kehadiran:</span>
                      <span
                        className={`text-xs font-black px-2 py-0.5 rounded-md ${
                          sessionRate >= 90
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}
                      >
                        {presentInSession}/{totalInSession} Siswa ({sessionRate}%)
                      </span>
                    </div>
                  </div>

                  {/* Student Status Badges Grid */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {rec.students.map((st) => {
                      let badgeColor =
                        'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
                      let icon = '✅';
                      let label = 'Hadir';

                      if (st.status === 'excused') {
                        badgeColor = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                        icon = '📩';
                        label = 'Izin';
                      } else if (st.status === 'late') {
                        badgeColor = 'bg-sky-500/10 text-sky-500 border-sky-500/20';
                        icon = '⏰';
                        label = 'Terlambat';
                      } else if (st.status === 'absent') {
                        badgeColor = 'bg-rose-500/10 text-rose-500 border-rose-500/20';
                        icon = '❌';
                        label = 'Alpa';
                      }

                      return (
                        <div
                          key={st.studentId}
                          title={st.notes ? `Catatan: ${st.notes}` : undefined}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${badgeColor}`}
                        >
                          <span>{icon}</span>
                          <span className="font-bold">{st.studentName}</span>
                          <span className="text-[10px] opacity-75">({label})</span>
                          {st.notes && (
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Expandable Class Notes & Homework */}
                  {(rec.classNotes || rec.homeworkAssigned) && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleExpanded(rec.id)}
                        className="text-xs font-bold text-slate-400 hover:text-amber-500 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Sembunyikan Catatan Sesi & PR' : 'Lihat Catatan Evaluasi & PR'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isExpanded && (
                        <div
                          className={`mt-2.5 p-3.5 rounded-2xl border space-y-2 text-xs leading-relaxed animate-in fade-in duration-150 ${
                            isDark
                              ? 'bg-slate-800/40 border-slate-700/60 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {rec.classNotes && (
                            <div>
                              <span className="font-bold text-amber-500 flex items-center gap-1.5 mb-0.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Evaluasi Pembelajaran:</span>
                              </span>
                              <p className="italic">{rec.classNotes}</p>
                            </div>
                          )}

                          {rec.homeworkAssigned && (
                            <div className="pt-1 border-t border-slate-700/40">
                              <span className="font-bold text-purple-400 flex items-center gap-1.5 mb-0.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Tantangan Mandiri / PR:</span>
                              </span>
                              <p className="italic">{rec.homeworkAssigned}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Session Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400">
                    ID: <code className="font-mono text-slate-400">{rec.id}</code>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Share WA Button */}
                    <button
                      type="button"
                      onClick={() => handleShareWA(rec)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Laporan WA</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditingRecord(rec);
                        setIsModalOpen(true);
                      }}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                      }`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleDelete(rec.id, rec.batchName, rec.sessionNumber)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Rekaman Presensi"
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

      {/* Modal Presensi */}
      {isModalOpen && (
        <AdminAttendanceModal
          key={editingRecord ? editingRecord.id : 'new-attendance'}
          record={editingRecord}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingRecord(null);
          }}
          onSaved={() => {
            reloadData();
          }}
          isDark={isDark}
        />
      )}
    </div>
  );
};
