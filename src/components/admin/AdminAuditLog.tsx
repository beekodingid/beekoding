import React, { useState, useMemo } from 'react';
import {
  type AuditLogEntry,
  type AuditModule,
  type AuditSeverity,
  type AuditActionType,
  getAuditLogs,
  clearAuditLogs,
  resetAuditLogsToDefault,
  exportAuditLogsCSV,
} from '../../services/adminStorage';
import { AdminAuditLogDetailModal } from './AdminAuditLogDetailModal';
import {
  ScrollText,
  Search,
  Download,
  RotateCcw,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Info,
  Clock,
  User,
  Eye,
  CheckCircle2,
  Layers,
  List,
  Activity,
  Terminal,
} from 'lucide-react';

interface AdminAuditLogProps {
  isDark: boolean;
}

export const AdminAuditLog: React.FC<AdminAuditLogProps> = ({ isDark }) => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(() => getAuditLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<AuditModule | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<AuditSeverity | 'all'>('all');
  const [actionFilter, setActionFilter] = useState<AuditActionType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline');
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        log.title.toLowerCase().includes(q) ||
        log.description.toLowerCase().includes(q) ||
        log.actorName.toLowerCase().includes(q) ||
        log.module.toLowerCase().includes(q) ||
        (log.targetName && log.targetName.toLowerCase().includes(q)) ||
        (log.targetId && log.targetId.toLowerCase().includes(q));

      const matchModule = moduleFilter === 'all' || log.module === moduleFilter;
      const matchSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchAction = actionFilter === 'all' || log.actionType === actionFilter;

      return matchSearch && matchModule && matchSeverity && matchAction;
    });
  }, [logs, searchQuery, moduleFilter, severityFilter, actionFilter]);

  // Metrics
  const totalLogs = logs.length;

  const todayLogs = useMemo(() => {
    const todayStr = new Date(now).toISOString().split('T')[0];
    return logs.filter((l) => l.timestamp.startsWith(todayStr)).length;
  }, [logs, now]);

  const financialLogs = useMemo(() => {
    return logs.filter(
      (l) => l.module === 'transactions' || l.module === 'payroll' || l.module === 'vouchers'
    ).length;
  }, [logs]);

  const criticalLogs = useMemo(() => {
    return logs.filter((l) => l.severity === 'warning' || l.severity === 'danger').length;
  }, [logs]);

  // Handlers
  const handleRefresh = () => {
    setLogs(getAuditLogs());
    setNow(Date.now());
  };

  const handleClear = () => {
    clearAuditLogs();
    setLogs([]);
    setConfirmClearOpen(false);
  };

  const handleResetDefault = () => {
    const fresh = resetAuditLogsToDefault();
    setLogs(fresh);
    setConfirmClearOpen(false);
  };

  const handleExportCSV = () => {
    exportAuditLogsCSV(filteredLogs);
  };

  const getSeverityBadge = (sev: AuditSeverity) => {
    switch (sev) {
      case 'danger':
        return {
          bg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
          icon: ShieldAlert,
          dot: 'bg-rose-500',
          label: 'Kritis',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
          icon: AlertTriangle,
          dot: 'bg-amber-500',
          label: 'Perhatian',
        };
      case 'success':
        return {
          bg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          icon: ShieldCheck,
          dot: 'bg-emerald-500',
          label: 'Sukses',
        };
      default:
        return {
          bg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
          icon: Info,
          dot: 'bg-blue-500',
          label: 'Informasi',
        };
    }
  };

  const formatRelativeTime = (iso: string) => {
    try {
      const diffMs = Math.max(0, now - new Date(iso).getTime());
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);

      if (diffDay > 0) return `${diffDay} hari yang lalu`;
      if (diffHour > 0) return `${diffHour} jam yang lalu`;
      if (diffMin > 0) return `${diffMin} menit yang lalu`;
      return 'Baru saja';
    } catch {
      return 'Baru saja';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark
            ? 'bg-gradient-to-r from-[#121624] via-slate-900 to-[#121624] border-slate-800'
            : 'bg-gradient-to-r from-blue-50/60 via-white to-indigo-50/60 border-slate-200 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
              <ScrollText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] tracking-tight">
                  Pusat Log Aktivitas & Audit Trail
                </h2>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                  Live Security Trail
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                Arsip audit komprehensif pencatatan seluruh mutasi data akademik, autentikasi, transaksi finansial, penerbitan piagam, dan perubahan konfigurasi sistem Beekoding.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleRefresh}
              className={`p-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
              title="Segarkan Log"
            >
              <RotateCcw className="w-4 h-4 text-blue-500" />
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>Ekspor Audit CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setConfirmClearOpen(true)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                isDark
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                  : 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>Bersihkan / Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Catatan */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Catatan Log
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ScrollText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {totalLogs}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <Terminal className="w-3 h-3 text-blue-500" />
            <span>Maksimal 300 riwayat terbaru</span>
          </p>
        </div>

        {/* Metric 2: Hari Ini */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Aktivitas Hari Ini
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {todayLogs}
          </div>
          <p className="text-[11px] text-emerald-500 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Sistem berjalan normal</span>
          </p>
        </div>

        {/* Metric 3: Finansial & Honor */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Mutasi Kas & Honor
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {financialLogs}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Transaksi, invoice & payroll
          </p>
        </div>

        {/* Metric 4: Peringatan & Kritis */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Peringatan & Kritis
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-amber-600 dark:text-amber-400">
            {criticalLogs}
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
            Aksi berisiko / warning terdeteksi
          </p>
        </div>
      </div>

      {/* Filter & Toolbar */}
      <div
        className={`p-5 rounded-3xl border space-y-4 ${
          isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci aktivitas, pelaksana, modul, atau target objek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 self-end md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Linimasa</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Tabel Rapi</span>
            </button>
          </div>
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-200 dark:border-slate-800">
          {/* Module Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Modul Sistem
            </label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value as any)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Modul</option>
              <option value="auth">Autentikasi & Login</option>
              <option value="students">Data Siswa</option>
              <option value="inquiries">Konsultasi & Registrasi</option>
              <option value="events">Event & Trial Class</option>
              <option value="counseling">Konseling & Bimbingan</option>
              <option value="batches">Jadwal & Batch</option>
              <option value="attendance">Presensi Sesi</option>
              <option value="reports">Rapor Akademik</option>
              <option value="transactions">Transaksi & Biaya</option>
              <option value="vouchers">Kupon & Promo</option>
              <option value="payroll">Honor & Payroll</option>
              <option value="certificates">Piagam Sertifikat</option>
              <option value="showcase">Karya & Showcase</option>
              <option value="resources">Bahan Ajar & Modul</option>
              <option value="questions">Bank Soal Kuis</option>
              <option value="announcements">Pengumuman & Siaran</option>
              <option value="settings">Pengaturan Sistem</option>
            </select>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Tingkat Urgensi (Severity)
            </label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Tingkat Urgensi</option>
              <option value="info">Informasi (Info)</option>
              <option value="success">Berhasil (Success)</option>
              <option value="warning">Peringatan (Warning)</option>
              <option value="danger">Kritis (Danger)</option>
            </select>
          </div>

          {/* Action Type Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
              Tipe Tindakan (Action)
            </label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as any)}
              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Tindakan</option>
              <option value="login">Login / Autentikasi</option>
              <option value="create">Penambahan Data (Create)</option>
              <option value="update">Pembaruan (Update)</option>
              <option value="delete">Penghapusan (Delete)</option>
              <option value="approve">Persetujuan (Approve)</option>
              <option value="export">Ekspor Berkas (Export)</option>
              <option value="backup">Pencadangan (Backup)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Clear Logs */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-4 ${
              isDark ? 'bg-[#121624] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/15 text-rose-500 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base">Kelola Arsip Log Aktivitas</h4>
                <p className="text-xs text-slate-400">Pilih tindakan pembersihan yang diinginkan</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
              Anda dapat mengosongkan seluruh riwayat log aktivitas saat ini, atau menyetel ulang ke 16 catatan log operasional bawaan.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetDefault}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset ke 16 Catatan Bawaan</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Kosongkan Seluruh Riwayat Log</span>
              </button>

              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main List Rendering */}
      {filteredLogs.length === 0 ? (
        <div
          className={`p-12 rounded-3xl border text-center transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-4">
            <ScrollText className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Tidak Ada Log yang Cocok
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Tidak ditemukan rekaman aktivitas yang sesuai dengan kriteria filter atau pencarian Anda.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setModuleFilter('all');
              setSeverityFilter('all');
              setActionFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : viewMode === 'timeline' ? (
        /* ============================================================ */
        /* MODE 1: TIMELINE VIEW                                        */
        /* ============================================================ */
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredLogs.map((log) => {
            const sevBadge = getSeverityBadge(log.severity);
            const SeverityIcon = sevBadge.icon;

            return (
              <div key={log.id} className="relative group">
                {/* Timeline Dot Indicator */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full border-4 ${
                    isDark ? 'border-[#0b0f19] bg-slate-900' : 'border-[#fcfaf5] bg-white'
                  } flex items-center justify-center`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${sevBadge.dot}`} />
                </div>

                {/* Timeline Card */}
                <div
                  className={`p-5 sm:p-6 rounded-3xl border transition-all hover:shadow-md ${
                    isDark
                      ? 'bg-[#121624] border-slate-800 hover:border-blue-500/40'
                      : 'bg-white border-slate-200 hover:border-blue-400 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${sevBadge.bg}`}
                      >
                        <SeverityIcon className="w-3 h-3" />
                        <span>{sevBadge.label}</span>
                      </span>

                      <span className="text-[11px] font-black uppercase px-2.5 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                        {log.module}
                      </span>

                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {log.actionType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {formatRelativeTime(log.timestamp)}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(log.timestamp).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit',
                        })}{' '}
                        WIB
                      </span>
                    </div>
                  </div>

                  <div className="py-3.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {log.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {log.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <strong className="text-slate-700 dark:text-slate-200">{log.actorName}</strong>
                        <span>({log.actorRole})</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px] text-slate-500">
                        IP: {log.ipAddress}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedLog(log)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 transition-colors cursor-pointer self-end sm:self-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspeksi Detail</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ============================================================ */
        /* MODE 2: TABLE VIEW                                           */
        /* ============================================================ */
        <div
          className={`rounded-3xl border overflow-hidden ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b uppercase font-bold text-[10px] tracking-wider ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="py-3.5 px-4">Waktu</th>
                  <th className="py-3.5 px-4">Tingkat</th>
                  <th className="py-3.5 px-4">Modul</th>
                  <th className="py-3.5 px-4">Aksi</th>
                  <th className="py-3.5 px-4">Pelaksana</th>
                  <th className="py-3.5 px-4">Aktivitas & Keterangan</th>
                  <th className="py-3.5 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredLogs.map((log) => {
                  const sevBadge = getSeverityBadge(log.severity);
                  const SeverityIcon = sevBadge.icon;

                  return (
                    <tr
                      key={log.id}
                      className={`hover:bg-blue-500/5 transition-colors ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {new Date(log.timestamp).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {new Date(log.timestamp).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          WIB
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${sevBadge.bg}`}
                        >
                          <SeverityIcon className="w-3 h-3" />
                          <span>{sevBadge.label}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-bold uppercase px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {log.module}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="font-mono text-[11px] font-semibold uppercase">
                          {log.actionType}
                        </span>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {log.actorName}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {log.ipAddress.split(' ')[0]}
                        </div>
                      </td>

                      <td className="py-3 px-4 max-w-md">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {log.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-1 text-[11px]">
                          {log.description}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setSelectedLog(log)}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
                          title="Inspeksi Detail"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Detail Log */}
      <AdminAuditLogDetailModal
        isOpen={Boolean(selectedLog)}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
        isDark={isDark}
      />
    </div>
  );
};
