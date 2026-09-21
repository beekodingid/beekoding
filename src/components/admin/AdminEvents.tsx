import React, { useState, useMemo } from 'react';
import {
  getCodingEvents,
  createCodingEvent,
  updateCodingEvent,
  deleteCodingEvent,
  resetEventsToDefault,
  type CodingEvent,
  type CodingEventType,
  type CodingEventTier,
  type CodingEventStatus,
} from '../../services/adminStorage';
import { AdminEventModal } from './AdminEventModal';
import { AdminEventParticipantsModal } from './AdminEventParticipantsModal';
import {
  Calendar,
  Plus,
  Search,
  Users,
  Clock,
  Video,
  Edit2,
  Trash2,
  RotateCcw,
  LayoutGrid,
  List,
  Flame,
  Ticket,
} from 'lucide-react';

interface AdminEventsProps {
  isDark: boolean;
}

export const AdminEvents: React.FC<AdminEventsProps> = ({ isDark }) => {
  const [events, setEvents] = useState<CodingEvent[]>(() => getCodingEvents());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | CodingEventType>('all');
  const [tierFilter, setTierFilter] = useState<'all' | CodingEventTier>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | CodingEventStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal States
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CodingEvent | null>(null);
  const [selectedEventForParticipants, setSelectedEventForParticipants] = useState<CodingEvent | null>(null);

  const refreshData = () => {
    const fresh = getCodingEvents();
    setEvents(fresh);
    if (selectedEventForParticipants) {
      const updatedSelected = fresh.find((e) => e.id === selectedEventForParticipants.id) || null;
      setSelectedEventForParticipants(updatedSelected);
    }
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.instructorName.toLowerCase().includes(q) ||
        evt.description.toLowerCase().includes(q) ||
        evt.locationDetail.toLowerCase().includes(q);

      const matchType = typeFilter === 'all' || evt.eventType === typeFilter;
      const matchTier = tierFilter === 'all' || evt.tier === tierFilter;
      const matchStatus = statusFilter === 'all' || evt.status === statusFilter;

      return matchSearch && matchType && matchTier && matchStatus;
    });
  }, [events, searchQuery, typeFilter, tierFilter, statusFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const totalEvents = events.length;
    const totalParticipants = events.reduce((acc, curr) => acc + curr.registrations.length, 0);
    const activeTrialCount = events.filter(
      (e) => e.eventType === 'trial_class' && e.status === 'upcoming'
    ).length;

    const totalCapacity = events.reduce((acc, curr) => acc + curr.capacity, 0);
    const avgOccupancy =
      totalCapacity > 0 ? Math.round((totalParticipants / totalCapacity) * 100) : 0;

    return {
      totalEvents,
      totalParticipants,
      activeTrialCount,
      avgOccupancy,
    };
  }, [events]);

  const handleSaveEvent = (
    data: Omit<CodingEvent, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingEvent) {
      updateCodingEvent(editingEvent.id, data);
    } else {
      createCodingEvent(data);
    }
    refreshData();
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (window.confirm(`Hapus agenda acara "${title}"? Seluruh data pendaftar juga akan terhapus.`)) {
      deleteCodingEvent(id);
      refreshData();
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset seluruh agenda acara ke daftar jadwal bawaan pabrik?')) {
      resetEventsToDefault();
      refreshData();
    }
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
            <Calendar className="w-3.5 h-3.5" />
            <span>Coding Events, Workshops & Trial Classes Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
            Event, Workshop & Trial Class Siswa
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kelola sesi uji coba koding gratis (*Free Trial Class*), workshop akhir pekan (*Roblox & Scratch*),
            webinar edukasi teknologi, dan kompetisi koding anak. Pantau kuota kursi dan kirim link Zoom via WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => {
              setEditingEvent(null);
              setIsEventModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Agenda Event</span>
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
            <span className="text-xs font-bold uppercase tracking-wider">Total Agenda Acara</span>
            <Calendar className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            {metrics.totalEvents}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Jadwal aktif & terselenggara</p>
        </div>

        {/* Card 2 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Peserta Daftar</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-500">
            {metrics.totalParticipants}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Calon murid & wali murid</p>
        </div>

        {/* Card 3 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Free Trial Aktif</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-500">
            {metrics.activeTrialCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sesi uji coba buka pendaftaran</p>
        </div>

        {/* Card 4 */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Keterisian Kuota</span>
            <Ticket className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-purple-500">
            {metrics.avgOccupancy}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Rata-rata kursi terisi</p>
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
              placeholder="Cari judul, mentor, ruang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-200 focus:border-amber-500'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
              }`}
            />
          </div>

          {/* Tipe Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | CodingEventType)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Tipe Event</option>
            <option value="trial_class">🎯 Free Trial Class</option>
            <option value="workshop">🛠️ Workshop</option>
            <option value="webinar">💡 Webinar</option>
            <option value="competition">🏆 Lomba / Game Jam</option>
          </select>

          {/* Jenjang Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as 'all' | CodingEventTier)}
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

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | CodingEventStatus)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border focus:outline-none cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="upcoming">Upcoming (Buka)</option>
            <option value="ongoing">Sedang Berlangsung</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Batal</option>
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
            title="Tampilan Grid"
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
            title="Tampilan Tabel"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Mode View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvents.length === 0 ? (
            <div
              className={`col-span-full text-center py-16 px-4 rounded-3xl border ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Calendar className="w-12 h-12 mx-auto text-slate-500 opacity-40 mb-3" />
              <h4 className="text-base font-bold mb-1 text-slate-800 dark:text-slate-200">
                Tidak ada agenda acara yang cocok
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Coba sesuaikan filter atau tambahkan agenda event baru melalui tombol di atas.
              </p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const regCount = evt.registrations.length;
              const fillPct = Math.min(Math.round((regCount / evt.capacity) * 100), 100);

              const typeBadge =
                evt.eventType === 'trial_class'
                  ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                  : evt.eventType === 'workshop'
                  ? 'bg-purple-500/15 text-purple-500 border-purple-500/30'
                  : evt.eventType === 'webinar'
                  ? 'bg-blue-500/15 text-blue-500 border-blue-500/30'
                  : 'bg-rose-500/15 text-rose-500 border-rose-500/30';

              const statusBadge =
                evt.status === 'upcoming'
                  ? 'bg-emerald-500/15 text-emerald-500'
                  : evt.status === 'ongoing'
                  ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                  : evt.status === 'completed'
                  ? 'bg-slate-500/20 text-slate-400'
                  : 'bg-rose-500/15 text-rose-400';

              return (
                <div
                  key={evt.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between transition-all hover:border-amber-500/40 group ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90'
                      : 'bg-white border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${typeBadge}`}
                        >
                          {evt.eventType === 'trial_class'
                            ? 'Free Trial Class'
                            : evt.eventType === 'workshop'
                            ? 'Workshop'
                            : evt.eventType === 'webinar'
                            ? 'Webinar'
                            : 'Game Jam'}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-slate-400">
                          {evt.tier.toUpperCase()}
                        </span>
                      </div>

                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${statusBadge}`}>
                        {evt.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Title and Emoji */}
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-2xl flex items-center justify-center border border-amber-500/30 shrink-0">
                        {evt.posterUrlOrEmoji || '🐝'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                          {evt.title}
                        </h4>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                          <span>{evt.instructorName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Schedule & Location */}
                    <div
                      className={`p-3 rounded-2xl border text-xs space-y-1.5 ${
                        isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-slate-300 dark:text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-semibold">
                          {new Date(evt.date).toLocaleDateString('id-ID', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>
                          {evt.startTime} - {evt.endTime} WIB
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <Video className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{evt.locationDetail}</span>
                      </div>
                    </div>

                    {/* Quota Progress */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-400 font-medium">Pendaftar Terverifikasi:</span>
                        <span className="font-bold font-mono text-slate-900 dark:text-white">
                          {regCount} / {evt.capacity} Kursi ({fillPct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            fillPct >= 100
                              ? 'bg-rose-500'
                              : fillPct >= 75
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedEventForParticipants(evt)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer shadow-xs"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Peserta ({regCount})</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(evt);
                          setIsEventModalOpen(true);
                        }}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                          isDark
                            ? 'border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                        title="Ubah Agenda Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(evt.id, evt.title)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Hapus Event"
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
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b border-slate-200 dark:border-slate-800 font-bold uppercase tracking-wider text-[11px] ${
                    isDark ? 'bg-slate-900/80 text-slate-400' : 'bg-slate-100/80 text-slate-600'
                  }`}
                >
                  <th className="p-4">Agenda & Tipe</th>
                  <th className="p-4">Jenjang</th>
                  <th className="p-4">Waktu & Tanggal</th>
                  <th className="p-4">Instruktur</th>
                  <th className="p-4">Kuota Kursi</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredEvents.map((evt) => {
                  const regCount = evt.registrations.length;
                  return (
                    <tr
                      key={evt.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/40'
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl shrink-0">{evt.posterUrlOrEmoji || '🐝'}</span>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">
                              {evt.title}
                            </div>
                            <div className="text-[11px] text-slate-400 uppercase font-semibold mt-0.5">
                              {evt.eventType.replace('_', ' ')}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {evt.tier}
                        </span>
                      </td>

                      <td className="p-4 text-slate-600 dark:text-slate-300">
                        <div className="font-semibold">{evt.date}</div>
                        <div className="text-[11px] text-slate-400">
                          {evt.startTime} - {evt.endTime} WIB
                        </div>
                      </td>

                      <td className="p-4 font-medium">{evt.instructorName}</td>

                      <td className="p-4">
                        <span className="font-bold text-amber-500 font-mono">
                          {regCount} / {evt.capacity}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            evt.status === 'upcoming'
                              ? 'bg-emerald-500/15 text-emerald-500'
                              : 'bg-slate-500/20 text-slate-400'
                          }`}
                        >
                          {evt.status}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedEventForParticipants(evt)}
                            className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
                          >
                            Peserta ({regCount})
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingEvent(evt);
                              setIsEventModalOpen(true);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(evt.id, evt.title)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create/Edit Event */}
      <AdminEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        initialData={editingEvent}
        isDark={isDark}
      />

      {/* Modal: Manage Participants */}
      {selectedEventForParticipants && (
        <AdminEventParticipantsModal
          isOpen={Boolean(selectedEventForParticipants)}
          onClose={() => setSelectedEventForParticipants(null)}
          event={selectedEventForParticipants}
          onRefreshData={refreshData}
          isDark={isDark}
        />
      )}
    </div>
  );
};
