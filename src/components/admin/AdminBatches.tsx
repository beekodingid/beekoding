import React, { useState } from 'react';
import {
  type ClassBatch,
  type BatchStatus,
  type ClassFormat,
  getBatches,
  createBatch,
  updateBatch,
  deleteBatch,
  enrollStudentToBatch,
  removeStudentFromBatch,
  resetBatchesToDefault,
  getSubmissions,
  getInquiries,
} from '../../services/adminStorage';
import {
  CalendarDays,
  Plus,
  Search,
  Users,
  Video,
  MapPin,
  Clock,
  Calendar,
  Copy,
  Check,
  Edit2,
  Trash2,
  ExternalLink,
  Sparkles,
  Phone,
  UserPlus,
  RotateCcw,
  X,
  Laptop,
} from 'lucide-react';

interface AdminBatchesProps {
  isDark: boolean;
}

const ALL_DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const AdminBatches: React.FC<AdminBatchesProps> = ({ isDark }) => {
  const [batches, setBatches] = useState<ClassBatch[]>(() => getBatches());

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [formatFilter, setFormatFilter] = useState<string>('all');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<ClassBatch | null>(null);
  const [selectedBatchForStudents, setSelectedBatchForStudents] = useState<ClassBatch | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formProgram, setFormProgram] = useState('Visual Scratch & AI Prompting');
  const [formTier, setFormTier] = useState<'junior' | 'middle' | 'teens' | 'all'>('junior');
  const [formFormat, setFormFormat] = useState<ClassFormat>('online');
  const [formLocation, setFormLocation] = useState('Google Meet');
  const [formMeetUrl, setFormMeetUrl] = useState('https://meet.google.com/bee-koding');
  const [formStartDate, setFormStartDate] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [formDays, setFormDays] = useState<string[]>(['Sabtu', 'Minggu']);
  const [formTime, setFormTime] = useState('09:00 - 10:30 WIB');
  const [formTotalSessions, setFormTotalSessions] = useState(8);
  const [formMaxCapacity, setFormMaxCapacity] = useState(8);
  const [formInstructor, setFormInstructor] = useState('Kak Febri Hasan');
  const [formPrice, setFormPrice] = useState(750000);
  const [formStatus, setFormStatus] = useState<BatchStatus>('upcoming');
  const [formNotes, setFormNotes] = useState('');

  // Enroll Student Form State inside Student Modal
  const [enrollStudentName, setEnrollStudentName] = useState('');
  const [enrollParentName, setEnrollParentName] = useState('');
  const [enrollParentPhone, setEnrollParentPhone] = useState('');
  const [copiedBatchId, setCopiedBatchId] = useState<string | null>(null);
  const [actionAlert, setActionAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const refreshBatches = () => {
    const list = getBatches();
    setBatches(list);
    if (selectedBatchForStudents) {
      const refreshed = list.find((b) => b.id === selectedBatchForStudents.id) || null;
      setSelectedBatchForStudents(refreshed);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setActionAlert({ type, message });
    setTimeout(() => setActionAlert(null), 3500);
  };

  // Open Form Modal (Create or Edit)
  const handleOpenCreateModal = () => {
    setEditingBatch(null);
    setFormName('');
    setFormProgram('Visual Scratch & AI Prompting');
    setFormTier('junior');
    setFormFormat('online');
    setFormLocation('Google Meet');
    setFormMeetUrl('https://meet.google.com/bee-koding');
    const today = new Date().toISOString().split('T')[0];
    setFormStartDate(today);
    setFormEndDate('');
    setFormDays(['Sabtu', 'Minggu']);
    setFormTime('09:00 - 10:30 WIB');
    setFormTotalSessions(8);
    setFormMaxCapacity(8);
    setFormInstructor('Kak Febri Hasan');
    setFormPrice(750000);
    setFormStatus('upcoming');
    setFormNotes('');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (batch: ClassBatch) => {
    setEditingBatch(batch);
    setFormName(batch.name);
    setFormProgram(batch.programType);
    setFormTier(batch.tier);
    setFormFormat(batch.format);
    setFormLocation(batch.locationOrPlatform);
    setFormMeetUrl(batch.meetUrl || '');
    setFormStartDate(batch.startDate);
    setFormEndDate(batch.endDate);
    setFormDays(batch.scheduleDays);
    setFormTime(batch.scheduleTime);
    setFormTotalSessions(batch.totalSessions);
    setFormMaxCapacity(batch.maxCapacity);
    setFormInstructor(batch.instructorName);
    setFormPrice(batch.price);
    setFormStatus(batch.status);
    setFormNotes(batch.notes || '');
    setIsFormModalOpen(true);
  };

  // Save Batch Form (Create or Update)
  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      showAlert('error', 'Nama batch wajib diisi.');
      return;
    }

    if (editingBatch) {
      updateBatch(editingBatch.id, {
        name: formName.trim(),
        programType: formProgram.trim(),
        tier: formTier,
        format: formFormat,
        locationOrPlatform: formLocation.trim(),
        meetUrl: formMeetUrl.trim() || undefined,
        startDate: formStartDate,
        endDate: formEndDate,
        scheduleDays: formDays,
        scheduleTime: formTime.trim(),
        totalSessions: Number(formTotalSessions),
        maxCapacity: Number(formMaxCapacity),
        instructorName: formInstructor.trim(),
        price: Number(formPrice),
        status: formStatus,
        notes: formNotes.trim() || undefined,
      });
      showAlert('success', `Batch "${formName}" berhasil diperbarui.`);
    } else {
      createBatch({
        name: formName.trim(),
        programType: formProgram.trim(),
        tier: formTier,
        format: formFormat,
        locationOrPlatform: formLocation.trim(),
        meetUrl: formMeetUrl.trim() || undefined,
        startDate: formStartDate,
        endDate: formEndDate,
        scheduleDays: formDays,
        scheduleTime: formTime.trim(),
        totalSessions: Number(formTotalSessions),
        maxCapacity: Number(formMaxCapacity),
        instructorName: formInstructor.trim(),
        price: Number(formPrice),
        status: formStatus,
        notes: formNotes.trim() || undefined,
      });
      showAlert('success', `Batch "${formName}" berhasil dibuat.`);
    }

    setIsFormModalOpen(false);
    refreshBatches();
  };

  const handleDeleteBatch = (batch: ClassBatch) => {
    if (window.confirm(`Yakin ingin menghapus batch "${batch.name}"? Data siswa di batch ini akan terhapus.`)) {
      deleteBatch(batch.id);
      showAlert('success', `Batch "${batch.name}" berhasil dihapus.`);
      refreshBatches();
    }
  };

  const handleToggleDay = (day: string) => {
    if (formDays.includes(day)) {
      if (formDays.length > 1) {
        setFormDays(formDays.filter((d) => d !== day));
      }
    } else {
      setFormDays([...formDays, day]);
    }
  };

  // Student Enrollment Actions
  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatchForStudents) return;
    if (!enrollStudentName.trim()) {
      showAlert('error', 'Nama siswa wajib diisi.');
      return;
    }

    const res = enrollStudentToBatch(selectedBatchForStudents.id, {
      studentName: enrollStudentName,
      parentName: enrollParentName,
      parentPhone: enrollParentPhone,
      source: 'manual',
    });

    if (res.success && res.batch) {
      showAlert('success', `${enrollStudentName} berhasil didaftarkan ke batch.`);
      setEnrollStudentName('');
      setEnrollParentName('');
      setEnrollParentPhone('');
      refreshBatches();
    } else {
      showAlert('error', res.error || 'Gagal mendaftarkan siswa.');
    }
  };

  const handleRemoveStudent = (batchId: string, studentId: string, studentName: string) => {
    if (window.confirm(`Keluarkan ${studentName} dari batch ini?`)) {
      const res = removeStudentFromBatch(batchId, studentId);
      if (res.success) {
        showAlert('success', `${studentName} berhasil dikeluarkan dari batch.`);
        refreshBatches();
      } else {
        showAlert('error', res.error || 'Gagal mengeluarkan siswa.');
      }
    }
  };

  // Quick Pick from Submissions or Inquiries
  const handleQuickPickStudent = (name: string, pName: string, pPhone: string) => {
    setEnrollStudentName(name);
    setEnrollParentName(pName);
    setEnrollParentPhone(pPhone);
  };

  // Copy WhatsApp Broadcast Message Template
  const handleCopyWhatsAppSchedule = (batch: ClassBatch) => {
    const meetInfo = batch.meetUrl ? `\n🔗 Link Online Kelas: ${batch.meetUrl}` : '';
    const text = `*PENGUMUMAN JADWAL KELAS BEEKODING* 🐝✨

Halo Ayah & Bunda hebat! Berikut adalah rincian jadwal kelas belajar coding anak:

📌 *Program:* ${batch.name}
📚 *Modul:* ${batch.programType}
🗓 *Jadwal:* ${batch.scheduleDays.join(', ')}
⏰ *Waktu:* ${batch.scheduleTime}
📍 *Format:* ${batch.format.toUpperCase()} (${batch.locationOrPlatform})${meetInfo}
👨‍🏫 *Instruktur:* ${batch.instructorName}
🎯 *Total Sesi:* ${batch.totalSessions} Pertemuan

Mohon ananda dapat bersiap 10 menit sebelum sesi dimulai dengan laptop/perangkat yang terhubung internet.

Jika ada pertanyaan seputar persiapan, silakan hubungi kami. Mari bersama mencetak kreator teknologi masa depan! 🚀💻`;

    navigator.clipboard.writeText(text);
    setCopiedBatchId(batch.id);
    showAlert('success', `Teks jadwal untuk WhatsApp "${batch.name}" disalin ke clipboard!`);
    setTimeout(() => setCopiedBatchId(null), 3000);
  };

  // Filter Logic
  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.programType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.scheduleDays.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || batch.status === statusFilter;
    const matchesTier = tierFilter === 'all' || batch.tier === tierFilter;
    const matchesFormat = formatFilter === 'all' || batch.format === formatFilter;

    return matchesSearch && matchesStatus && matchesTier && matchesFormat;
  });

  // Calculate Summary Statistics
  const totalBatches = batches.length;
  const ongoingCount = batches.filter((b) => b.status === 'ongoing').length;
  const upcomingCount = batches.filter((b) => b.status === 'upcoming').length;
  const totalEnrolledStudents = batches.reduce((acc, b) => acc + b.enrolledStudents.length, 0);

  // Submissions & Inquiries for quick pick dropdown
  const recentSubmissions = getSubmissions().slice(0, 15);
  const recentInquiries = getInquiries().slice(0, 15);

  const getStatusBadge = (status: BatchStatus) => {
    switch (status) {
      case 'upcoming':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
            Buka Pendaftaran
          </span>
        );
      case 'ongoing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/15 text-amber-500 border border-amber-500/30 animate-pulse">
            Sedang Berjalan
          </span>
        );
      case 'full':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/15 text-rose-500 border border-rose-500/30">
            Kuota Penuh
          </span>
        );
      case 'completed':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-500/15 text-slate-400 border border-slate-500/30">
            Selesai
          </span>
        );
    }
  };

  const getFormatBadge = (format: ClassFormat) => {
    switch (format) {
      case 'online':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
            <Video className="w-3 h-3" />
            <span>Online</span>
          </span>
        );
      case 'offline':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
            <MapPin className="w-3 h-3" />
            <span>Offline Lab</span>
          </span>
        );
      case 'hybrid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            <Laptop className="w-3 h-3" />
            <span>Hybrid</span>
          </span>
        );
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'junior':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase">
            Junior (6-9 thn)
          </span>
        );
      case 'middle':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
            Middle (10-12 thn)
          </span>
        );
      case 'teens':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
            Teens (13-17 thn)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20 uppercase">
            Semua Jenjang
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Alert Banner */}
      {actionAlert && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg animate-fadeIn ${
            actionAlert.type === 'success'
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
          }`}
        >
          <span>{actionAlert.message}</span>
          <button
            type="button"
            onClick={() => setActionAlert(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-[#131622] to-slate-900 border-slate-800'
            : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-200/80 shadow-sm'
        }`}
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Class Schedule & Enrollment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Jadwal & Batch Kelas Bootcamp
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kelola jadwal kelas kursus, kuota rombongan belajar, tautan kelas online (Google
            Meet/Zoom), penempatan siswa, serta generator pesan pengumuman jadwal ke orang tua.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset data batch kelas ke data percontohan default?')) {
                resetBatchesToDefault();
                refreshBatches();
                showAlert('success', 'Batch kelas telah di-reset ke data bawaan.');
              }
            }}
            className={`p-3 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
            title="Reset Contoh Batch"
          >
            <RotateCcw className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Batch Baru</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Batch</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <CalendarDays className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">{totalBatches}</div>
          <div className="text-[11px] text-slate-400 mt-1">Seluruh batch terdaftar</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Sedang Berjalan</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-500">{ongoingCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Kelas aktif minggu ini</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Buka Pendaftaran</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-500">{upcomingCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Siap menerima murid baru</div>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Siswa Aktif di Kelas</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-500">{totalEnrolledStudents}</div>
          <div className="text-[11px] text-slate-400 mt-1">Total murid di semua batch</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center gap-3 justify-between ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama batch, materi modul, hari belajar, atau instruktur..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="upcoming">Buka Pendaftaran</option>
            <option value="ongoing">Sedang Berjalan</option>
            <option value="full">Kuota Penuh</option>
            <option value="completed">Selesai</option>
          </select>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior (6-9 Thn)</option>
            <option value="middle">Middle (10-12 Thn)</option>
            <option value="teens">Teens (13-17 Thn)</option>
          </select>

          {/* Format Filter */}
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-slate-50 border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Format</option>
            <option value="online">Online (Meet/Zoom)</option>
            <option value="offline">Offline (Lab)</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Batches Grid */}
      {filteredBatches.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <CalendarDays className="w-12 h-12 text-amber-500/50 mx-auto mb-3" />
          <h3 className="text-base font-bold mb-1">Tidak ada batch yang sesuai</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Coba sesuaikan kata kunci pencarian atau ubah filter status/jenjang di atas.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setTierFilter('all');
              setFormatFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
          >
            Bersihkan Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredBatches.map((batch) => {
            const enrolledCount = batch.enrolledStudents.length;
            const percentage = Math.round((enrolledCount / batch.maxCapacity) * 100);
            const isFull = enrolledCount >= batch.maxCapacity;

            return (
              <div
                key={batch.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group hover:shadow-lg ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/40'
                    : 'bg-white border-slate-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getStatusBadge(batch.status)}
                      {getFormatBadge(batch.format)}
                      {getTierBadge(batch.tier)}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(batch)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
                        title="Edit Batch"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBatch(batch)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                        title="Hapus Batch"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Program */}
                  <h3 className="text-base sm:text-lg font-black tracking-tight mb-1 group-hover:text-amber-500 transition-colors">
                    {batch.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-400 mb-4">
                    Materi: <span className="text-slate-200 dark:text-slate-300">{batch.programType}</span>
                  </div>

                  {/* Schedule Details Grid */}
                  <div
                    className={`p-3.5 rounded-2xl border space-y-2 mb-4 text-xs ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="font-bold text-slate-200 dark:text-slate-300">
                          {batch.scheduleDays.join(', ')}
                        </span>
                      </div>
                      <span className="font-extrabold text-amber-500">{batch.scheduleTime}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>
                          {batch.startDate} s/d {batch.endDate || 'Selesai'}
                        </span>
                      </div>
                      <span className="font-bold">{batch.totalSessions} Sesi Pertemuan</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 text-[11px] pt-1 border-t border-slate-700/40 dark:border-slate-800">
                      <div className="flex items-center gap-1.5 text-slate-400 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{batch.locationOrPlatform}</span>
                      </div>
                      <div className="font-semibold text-slate-300 shrink-0">
                        Instruktur: <span className="font-bold text-amber-400">{batch.instructorName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Kapasitas Kuota:</span>
                        <span className={isFull ? 'text-rose-500' : 'text-amber-500'}>
                          {enrolledCount} / {batch.maxCapacity} Siswa
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-extrabold ${
                          isFull ? 'text-rose-500' : 'text-slate-400'
                        }`}
                      >
                        {percentage}% {isFull ? '(PENUH)' : 'Terisi'}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isFull
                            ? 'bg-rose-500'
                            : percentage >= 75
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Enrolled Students Quick Preview */}
                  {enrolledCount > 0 ? (
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {batch.enrolledStudents.slice(0, 4).map((st) => (
                          <div
                            key={st.id}
                            className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 border-2 border-slate-900 flex items-center justify-center font-bold text-[10px]"
                            title={`${st.studentName} (${st.parentName || 'Orang Tua'})`}
                          >
                            {st.studentName.charAt(0)}
                          </div>
                        ))}
                        {enrolledCount > 4 && (
                          <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 border-2 border-slate-900 flex items-center justify-center font-bold text-[9px]">
                            +{enrolledCount - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-[11px] font-medium">
                        {batch.enrolledStudents.map((s) => s.studentName.split(' ')[0]).slice(0, 2).join(', ')}
                        {enrolledCount > 2 ? `, dkk` : ''}
                      </span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-400 italic mb-4">
                      Belum ada siswa terdaftar pada batch ini.
                    </div>
                  )}
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center">
                    Rp {batch.price.toLocaleString('id-ID')}
                    <span className="text-[10px] text-slate-400 font-normal ml-1">/anak</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Direct Meeting Link Button (If Online/Hybrid) */}
                    {batch.meetUrl && (
                      <a
                        href={batch.meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 transition-all text-xs font-bold flex items-center gap-1.5"
                        title="Buka Link Google Meet / Zoom"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Meet</span>
                      </a>
                    )}

                    {/* Copy WhatsApp Broadcast Button */}
                    <button
                      type="button"
                      onClick={() => handleCopyWhatsAppSchedule(batch)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        copiedBatchId === batch.id
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                      title="Salin Pesan Jadwal untuk WhatsApp"
                    >
                      {copiedBatchId === batch.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span className="hidden sm:inline">Salin WA</span>
                        </>
                      )}
                    </button>

                    {/* Manage Students Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedBatchForStudents(batch)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-500 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Siswa ({enrolledCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: FORM TAMBAH / EDIT BATCH                         */}
      {/* ========================================================= */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="sticky top-0 z-10 p-5 border-b backdrop-blur-md flex items-center justify-between bg-inherit border-inherit">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-sm">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">
                    {editingBatch ? 'Edit Jadwal & Informasi Batch' : 'Buat Batch Kelas Baru'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Konfigurasikan kuota murid, jadwal sesi, platform belajar, dan instruktur.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFormModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="p-6 space-y-4 text-xs sm:text-sm">
              {/* Nama Batch */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Nama Batch Kelas
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Summer AI & Coding Bootcamp: Junior Scratch (Batch 1)"
                  required
                  className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/30 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Grid 2 Kolom: Program & Jenjang */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Materi / Program Studi
                  </label>
                  <select
                    value={formProgram}
                    onChange={(e) => setFormProgram(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  >
                    <option value="Visual Scratch & AI Prompting">Visual Scratch & AI Prompting</option>
                    <option value="Python Basics & Pygame">Python Basics & Pygame</option>
                    <option value="Full-Stack Web & AI Agent">Full-Stack Web & AI Agent</option>
                    <option value="Micro:bit & Sensor IoT">Micro:bit & Sensor IoT</option>
                    <option value="Algoritma & Logika Berpikir">Algoritma & Logika Berpikir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Jenjang Usia
                  </label>
                  <select
                    value={formTier}
                    onChange={(e) => setFormTier(e.target.value as any)}
                    className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  >
                    <option value="junior">Junior Explorer (6-9 Tahun)</option>
                    <option value="middle">Intermediate Coder (10-12 Tahun)</option>
                    <option value="teens">Teens Innovator (13-17 Tahun)</option>
                    <option value="all">Semua Jenjang</option>
                  </select>
                </div>
              </div>

              {/* Grid 2 Kolom: Format & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Format Pembelajaran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['online', 'offline', 'hybrid'] as ClassFormat[]).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => {
                          setFormFormat(fmt);
                          if (fmt === 'online') setFormLocation('Google Meet');
                          if (fmt === 'offline') setFormLocation('Lab Robotika Beekoding');
                          if (fmt === 'hybrid') setFormLocation('Lab & Google Meet');
                        }}
                        className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all uppercase text-center ${
                          formFormat === fmt
                            ? 'border-amber-500 bg-amber-500/15 text-amber-500 ring-1 ring-amber-500/30'
                            : isDark
                            ? 'border-slate-800 bg-slate-800/40 text-slate-400'
                            : 'border-slate-200 bg-slate-100 text-slate-600'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Platform / Lokasi Kelas
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Google Meet / Zoom / Lab Beekoding"
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Tautan Meeting Online */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Tautan Kelas Online (Google Meet / Zoom Link)
                </label>
                <input
                  type="url"
                  value={formMeetUrl}
                  onChange={(e) => setFormMeetUrl(e.target.value)}
                  placeholder="https://meet.google.com/xyz-abcd-efg"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Hari & Waktu Belajar */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Hari Belajar (Pilih satu atau lebih)
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {ALL_DAYS.map((day) => {
                    const isSelected = formDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleToggleDay(day)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 border-amber-500 font-black'
                            : isDark
                            ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Jam Pelaksanaan
                    </label>
                    <input
                      type="text"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      placeholder="09:00 - 10:30 WIB"
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Instruktur Pengajar
                    </label>
                    <input
                      type="text"
                      value={formInstructor}
                      onChange={(e) => setFormInstructor(e.target.value)}
                      placeholder="Kak Febri Hasan"
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                        isDark
                          ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Grid 4 Kolom: Tanggal, Sesi, Kuota, Biaya */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Total Sesi
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formTotalSessions}
                    onChange={(e) => setFormTotalSessions(Number(e.target.value))}
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Maks Kuota
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formMaxCapacity}
                    onChange={(e) => setFormMaxCapacity(Number(e.target.value))}
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Biaya (Rp)
                  </label>
                  <input
                    type="number"
                    step="10000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-colors ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Status Batch */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Status Batch
                </label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as BatchStatus)}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="upcoming">Buka Pendaftaran (Upcoming)</option>
                  <option value="ongoing">Sedang Berjalan (Ongoing)</option>
                  <option value="full">Kuota Penuh (Full)</option>
                  <option value="completed">Selesai (Completed)</option>
                </select>
              </div>

              {/* Catatan / Deskripsi Tambahan */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Catatan Tambahan / Sasaran Proyek
                </label>
                <textarea
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={2}
                  placeholder="Catatan internal pengajar atau pesan khusus untuk orang tua..."
                  className={`w-full px-4 py-2 rounded-xl border text-xs font-medium transition-colors ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {editingBatch ? 'Simpan Perubahan' : 'Buat Batch Kelas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: KELOLA SISWA TERDAFTAR DI BATCH                  */}
      {/* ========================================================= */}
      {selectedBatchForStudents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="sticky top-0 z-10 p-5 border-b backdrop-blur-md flex items-center justify-between bg-inherit border-inherit">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    Manajemen Siswa
                  </span>
                  <span className="text-xs text-slate-400">
                    {selectedBatchForStudents.enrolledStudents.length} / {selectedBatchForStudents.maxCapacity} Kursi Terisi
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {selectedBatchForStudents.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedBatchForStudents(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Form Tambah Siswa */}
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5 mb-3">
                  <UserPlus className="w-4 h-4" />
                  <span>Daftarkan Siswa ke Batch Ini</span>
                </h4>

                {/* Quick Pick from recent submissions or inquiries */}
                {(recentSubmissions.length > 0 || recentInquiries.length > 0) && (
                  <div className="mb-4">
                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5">
                      Pilih Cepat dari Data Asesmen & Konsultasi Masuk:
                    </label>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 rounded-xl border border-dashed border-slate-700/60 dark:border-slate-800">
                      {recentSubmissions.slice(0, 8).map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() =>
                            handleQuickPickStudent(
                              sub.profile.childName,
                              sub.profile.parentName || '',
                              sub.profile.parentPhone
                            )
                          }
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 transition-colors border border-amber-500/20"
                        >
                          + {sub.profile.childName} ({sub.profile.childAge} thn)
                        </button>
                      ))}

                      {recentInquiries.slice(0, 5).map((inq) => (
                        <button
                          key={inq.id}
                          type="button"
                          onClick={() =>
                            handleQuickPickStudent(inq.name, inq.name, inq.phone)
                          }
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-400 transition-colors border border-blue-500/20"
                        >
                          + {inq.name} (Lead WA)
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={handleEnrollStudent} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <input
                      type="text"
                      value={enrollStudentName}
                      onChange={(e) => setEnrollStudentName(e.target.value)}
                      placeholder="Nama Siswa *"
                      required
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={enrollParentName}
                      onChange={(e) => setEnrollParentName(e.target.value)}
                      placeholder="Nama Orang Tua"
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={enrollParentPhone}
                      onChange={(e) => setEnrollParentPhone(e.target.value)}
                      placeholder="No. WA Ortu (+62)"
                      className={`w-full px-3 py-2 rounded-xl border text-xs font-medium ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={selectedBatchForStudents.enrolledStudents.length >= selectedBatchForStudents.maxCapacity}
                      className="w-full py-2 px-4 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      + Tambah Murid
                    </button>
                  </div>
                </form>
              </div>

              {/* Tabel Daftar Siswa Terdaftar */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Siswa yang Telah Terdaftar ({selectedBatchForStudents.enrolledStudents.length})
                </h4>

                {selectedBatchForStudents.enrolledStudents.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-400 border border-dashed rounded-2xl border-slate-800">
                    Belum ada siswa yang dimasukkan ke dalam batch ini. Gunakan formulir di atas untuk mendaftarkan siswa.
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-2xl border border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead
                        className={`border-b ${
                          isDark ? 'bg-slate-800/60 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        <tr>
                          <th className="py-2.5 px-4 font-bold uppercase tracking-wider">No</th>
                          <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Nama Siswa</th>
                          <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Orang Tua / Kontak</th>
                          <th className="py-2.5 px-4 font-bold uppercase tracking-wider">Tgl Masuk</th>
                          <th className="py-2.5 px-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {selectedBatchForStudents.enrolledStudents.map((st, index) => {
                          const rawPhone = (st.parentPhone || '').replace(/[^0-9]/g, '');
                          const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;

                          return (
                            <tr
                              key={st.id}
                              className={`transition-colors ${
                                isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'
                              }`}
                            >
                              <td className="py-3 px-4 text-slate-400 font-bold">{index + 1}</td>
                              <td className="py-3 px-4 font-bold text-amber-400">{st.studentName}</td>
                              <td className="py-3 px-4">
                                <div className="font-medium">{st.parentName || '-'}</div>
                                {cleanPhone ? (
                                  <a
                                    href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                      `Halo ${st.parentName || 'Ayah/Bunda'}, mengenai jadwal kelas Beekoding ananda ${st.studentName}...`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                                  >
                                    <Phone className="w-3 h-3" />
                                    <span>{st.parentPhone}</span>
                                  </a>
                                ) : (
                                  <span className="text-[11px] text-slate-500">Tidak ada no. telp</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-slate-400 text-[11px]">
                                {new Date(st.enrolledAt).toLocaleDateString('id-ID')}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveStudent(selectedBatchForStudents.id, st.id, st.studentName)
                                  }
                                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                                  title="Keluarkan dari Batch"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Sapaan Massal WhatsApp */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopyWhatsAppSchedule(selectedBatchForStudents)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-2 cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Salin Pesan Pengingat Jadwal Kelas (WA)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBatchForStudents(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
