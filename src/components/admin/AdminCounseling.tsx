import React, { useState, useMemo } from 'react';
import {
  getCounselingSessions,
  createCounselingSession,
  updateCounselingSession,
  deleteCounselingSession,
  resetCounselingToDefault,
  generateCounselingWhatsAppReminder,
  exportCounselingCSV,
  type CounselingSession,
  type CounselingTopic,
  type CounselingStatus,
} from '../../services/adminStorage';
import { AdminCounselingModal } from './AdminCounselingModal';
import { AdminCounselingNoteModal } from './AdminCounselingNoteModal';
import {
  HeartHandshake,
  Plus,
  Search,
  Calendar,
  Clock,
  User,
  Edit2,
  Trash2,
  Printer,
  Send,
  RotateCcw,
  LayoutGrid,
  List,
  Download,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AdminCounselingProps {
  isDark: boolean;
}

export const AdminCounseling: React.FC<AdminCounselingProps> = ({ isDark }) => {
  const [sessions, setSessions] = useState<CounselingSession[]>(() => getCounselingSessions());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CounselingStatus>('all');
  const [topicFilter, setTopicFilter] = useState<'all' | CounselingTopic>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<CounselingSession | null>(null);
  const [selectedNoteSession, setSelectedNoteSession] = useState<CounselingSession | null>(null);

  const refreshData = () => {
    setSessions(getCounselingSessions());
  };

  // Filtered Sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.studentName.toLowerCase().includes(q) ||
        s.parentName.toLowerCase().includes(q) ||
        s.counselorName.toLowerCase().includes(q) ||
        s.sessionNumber.toLowerCase().includes(q) ||
        s.studentStrengths.toLowerCase().includes(q) ||
        s.actionPlan.toLowerCase().includes(q);

      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchTopic = topicFilter === 'all' || s.topic === topicFilter;
      const matchTier = tierFilter === 'all' || s.tier.toLowerCase().includes(tierFilter.toLowerCase());

      return matchSearch && matchStatus && matchTopic && matchTier;
    });
  }, [sessions, searchQuery, statusFilter, topicFilter, tierFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = sessions.length;
    const scheduled = sessions.filter((s) => s.status === 'scheduled').length;
    const completed = sessions.filter((s) => s.status === 'completed').length;
    const followUp = sessions.filter((s) => s.status === 'follow_up_needed').length;

    return { total, scheduled, completed, followUp };
  }, [sessions]);

  const handleSaveSession = (
    data: Omit<CounselingSession, 'id' | 'sessionNumber' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingSession) {
      updateCounselingSession(editingSession.id, data);
    } else {
      createCounselingSession(data);
    }
    refreshData();
  };

  const handleDeleteSession = (id: string, name: string) => {
    if (window.confirm(`Hapus sesi konseling untuk ananda "${name}"?`)) {
      deleteCounselingSession(id);
      refreshData();
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset data sesi konseling ke daftar jadwal bawaan?')) {
      resetCounselingToDefault();
      refreshData();
    }
  };

  const handleSendReminderWA = (session: CounselingSession) => {
    const text = generateCounselingWhatsAppReminder(session);
    const cleanPhone = session.parentPhone.replace(/\D/g, '');
    const intlPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-[#161a29] via-[#121624] to-[#161a29] border-amber-500/20 shadow-xl'
            : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-200 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>1-on-1 Academic Counseling & Parent Coaching Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
            Konseling & Bimbingan Belajar Privat
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Fasilitas bimbingan personal 1-on-1 antara Tim Akademik Beekoding dengan siswa dan orang tua.
            Catat hasil observasi karakter anak (fokus, screen-time, bakat), rancang action plan, dan cetak lembar resmi A4.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => {
              setEditingSession(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Jadwalkan Konseling</span>
          </button>

          <button
            type="button"
            onClick={() => exportCounselingCSV(filteredSessions)}
            className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
            title="Ekspor Rekap CSV"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
            title="Reset ke Jadwal Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sesi Bimbingan</span>
            <HeartHandshake className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {metrics.total}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Seluruh riwayat & agenda</p>
        </div>

        {/* Card 2 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Terjadwal (Mendatang)</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-blue-500">
            {metrics.scheduled}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Siap dikirimkan link Zoom</p>
        </div>

        {/* Card 3 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Selesai & Ada Rekap</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-500">
            {metrics.completed}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Lembar observasi siap cetak</p>
        </div>

        {/* Card 4 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Perlu Follow-Up</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-500">
            {metrics.followUp}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Tindak lanjut perangkat / jadwal</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {/* Search Box */}
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Cari siswa, wali, konselor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus:border-amber-500'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | CounselingStatus)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="scheduled">Terjadwal (Mendatang)</option>
            <option value="completed">Selesai</option>
            <option value="follow_up_needed">Perlu Follow-Up</option>
            <option value="cancelled">Dibatalkan</option>
          </select>

          {/* Topik Filter */}
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value as 'all' | CounselingTopic)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Topik Bimbingan</option>
            <option value="evaluasi_belajar">Evaluasi Kemajuan Belajar</option>
            <option value="kendala_fokus">Kendala Fokus & Screen-Time</option>
            <option value="rekomendasi_kurikulum">Rekomendasi Kurikulum</option>
            <option value="persiapan_lomba">Bimbingan Lomba / Portofolio</option>
            <option value="konsultasi_perangkat">Konsultasi Device / Lab</option>
            <option value="lainnya">Lainnya</option>
          </select>

          {/* Jenjang Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior Explorer</option>
            <option value="middle">Middle Coder</option>
            <option value="teens">Teens Innovator</option>
          </select>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Mode Kartu Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-xs'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            title="Mode Tabel Ringkas"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Mode View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSessions.length === 0 ? (
            <div
              className={`col-span-full text-center py-16 px-4 rounded-3xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <HeartHandshake className="w-12 h-12 mx-auto text-slate-500 opacity-40 mb-3" />
              <h4 className="text-base font-bold mb-1 text-slate-800 dark:text-slate-200">
                Tidak ada sesi konseling yang cocok
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Coba sesuaikan filter atau jadwalkan sesi baru dengan tombol di atas.
              </p>
            </div>
          ) : (
            filteredSessions.map((session) => {
              const statusBadge =
                session.status === 'scheduled'
                  ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                  : session.status === 'completed'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : session.status === 'follow_up_needed'
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';

              const statusText =
                session.status === 'scheduled'
                  ? 'Terjadwal'
                  : session.status === 'completed'
                  ? 'Selesai'
                  : session.status === 'follow_up_needed'
                  ? 'Perlu Follow-Up'
                  : 'Dibatalkan';

              const topicBadge =
                session.topic === 'evaluasi_belajar'
                  ? 'Evaluasi Kemajuan'
                  : session.topic === 'kendala_fokus'
                  ? 'Fokus & Screen-Time'
                  : session.topic === 'rekomendasi_kurikulum'
                  ? 'Roadmap Kurikulum'
                  : session.topic === 'persiapan_lomba'
                  ? 'Persiapan Lomba'
                  : session.topic === 'konsultasi_perangkat'
                  ? 'Perangkat & Lab'
                  : 'Lainnya';

              return (
                <div
                  key={session.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:border-amber-500/40 group ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90'
                      : 'bg-white border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header: Reg No & Status */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        {session.sessionNumber}
                      </span>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${statusBadge}`}>
                        {statusText}
                      </span>
                    </div>

                    {/* Student & Parent Info */}
                    <div>
                      <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                        {session.studentName}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>Wali: {session.parentName}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-300 dark:text-slate-300">{session.tier}</span>
                      </p>
                    </div>

                    {/* Topic Badge */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        🎯 {topicBadge}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {session.sessionType === 'online_zoom'
                          ? 'Zoom'
                          : session.sessionType === 'online_gmeet'
                          ? 'GMeet'
                          : session.sessionType === 'offline_studio'
                          ? 'Studio'
                          : 'WA Call'}
                      </span>
                    </div>

                    {/* Date, Time & Counselor Box */}
                    <div
                      className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                        isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>
                          {new Date(session.date).toLocaleDateString('id-ID', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>{session.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <User className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span className="truncate">Konselor: {session.counselorName}</span>
                      </div>
                    </div>

                    {/* Observation Snippet */}
                    {session.studentStrengths && (
                      <div className="text-xs space-y-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block">
                          Kelebihan / Observasi:
                        </span>
                        <p className="text-slate-300 dark:text-slate-300 line-clamp-2 italic">
                          "{session.studentStrengths}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions Row */}
                  <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedNoteSession(session)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-500 border border-amber-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Lihat & Cetak Lembar A4"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Lembar A4</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendReminderWA(session)}
                        className="p-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500 border border-emerald-500/30 transition-colors cursor-pointer"
                        title="Kirim Pengingat WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSession(session);
                          setIsModalOpen(true);
                        }}
                        className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                            : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        title="Ubah Sesi"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteSession(session.id, session.studentName)}
                        className="p-2 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Hapus Sesi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Table Mode View */}
      {viewMode === 'table' && (
        <div
          className={`rounded-3xl border overflow-hidden ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="py-3.5 px-4">No Sesi</th>
                  <th className="py-3.5 px-4">Siswa & Wali</th>
                  <th className="py-3.5 px-4">Jenjang</th>
                  <th className="py-3.5 px-4">Jadwal & Waktu</th>
                  <th className="py-3.5 px-4">Topik Bimbingan</th>
                  <th className="py-3.5 px-4">Konselor</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSessions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      Tidak ada data sesi konseling.
                    </td>
                  </tr>
                ) : (
                  filteredSessions.map((session) => (
                    <tr
                      key={session.id}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-500">
                        {session.sessionNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {session.studentName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {session.parentName} ({session.parentPhone})
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold">{session.tier}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {new Date(session.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[11px] text-slate-400">{session.time}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                          {session.topic.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">{session.counselorName}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            session.status === 'scheduled'
                              ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                              : session.status === 'completed'
                              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                              : session.status === 'follow_up_needed'
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                              : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {session.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedNoteSession(session)}
                            className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition-colors"
                            title="Lembar A4"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReminderWA(session)}
                            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors"
                            title="Kirim WA"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSession(session);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                            title="Edit Sesi"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSession(session.id, session.studentName)}
                            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Hapus Sesi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form Tambah/Ubah Sesi */}
      {isModalOpen && (
        <AdminCounselingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveSession}
          initialData={editingSession}
          isDark={isDark}
        />
      )}

      {/* Modal Lembar Catatan A4 Siap Cetak */}
      {selectedNoteSession && (
        <AdminCounselingNoteModal
          isOpen={Boolean(selectedNoteSession)}
          onClose={() => setSelectedNoteSession(null)}
          session={selectedNoteSession}
          isDark={isDark}
        />
      )}
    </div>
  );
};
