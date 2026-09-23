import React, { useState } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Star,
  Clock,
  Edit,
  Trash2,
  CheckCircle2,
  RotateCcw,
  LayoutGrid,
  List,
  X,
} from 'lucide-react';
import {
  type InstructorRecord,
  type InstructorRole,
  type InstructorStatus,
  getInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  toggleInstructorStatus,
  resetInstructorsToDefault,
  calculateInstructorStats,
} from '../../services/adminStorage';
import { AdminInstructorModal } from './AdminInstructorModal';

interface AdminInstructorsProps {
  isDark?: boolean;
}

const ROLE_OPTIONS: { value: InstructorRole; label: string }[] = [
  { value: 'lead_educator', label: 'Lead Educator & Founder' },
  { value: 'senior_mentor', label: 'Senior Mentor' },
  { value: 'junior_mentor', label: 'Junior Mentor' },
  { value: 'curriculum_specialist', label: 'Curriculum Specialist' },
];

export const AdminInstructors: React.FC<AdminInstructorsProps> = ({ isDark = false }) => {
  const [instructors, setInstructors] = useState<InstructorRecord[]>(() => getInstructors());
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specFilter, setSpecFilter] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Modal State
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorRecord | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<InstructorRecord | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formAvatar, setFormAvatar] = useState('👨‍💻');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<InstructorRole>('senior_mentor');
  const [formSpecializations, setFormSpecializations] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formJunior, setFormJunior] = useState(true);
  const [formMiddle, setFormMiddle] = useState(false);
  const [formTeens, setFormTeens] = useState(false);
  const [formRating, setFormRating] = useState<number>(5.0);
  const [formHours, setFormHours] = useState<number>(100);
  const [formBatchesCount, setFormBatchesCount] = useState<number>(1);
  const [formStatus, setFormStatus] = useState<InstructorStatus>('active');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const loadData = () => {
    setInstructors(getInstructors());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const stats = calculateInstructorStats(instructors);

  // Filter Logic
  const filteredInstructors = instructors.filter((inst) => {
    const matchSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchStatus = statusFilter === 'all' || inst.status === statusFilter;

    const matchSpec =
      specFilter === 'all' ||
      inst.specializations.some((s) => s.toLowerCase().includes(specFilter.toLowerCase()));

    const matchTier =
      tierFilter === 'all' ||
      inst.teachingTiers.includes(tierFilter as 'junior' | 'middle' | 'teens');

    return matchSearch && matchStatus && matchSpec && matchTier;
  });

  const handleOpenAdd = () => {
    setEditingInstructor(null);
    setFormName('');
    setFormTitle('Senior Mentor Coding & AI');
    setFormAvatar('👨‍💻');
    setFormEmail('');
    setFormPhone('0812');
    setFormRole('senior_mentor');
    setFormSpecializations('Scratch 3.0, Computational Thinking');
    setFormBio('');
    setFormJunior(true);
    setFormMiddle(false);
    setFormTeens(false);
    setFormRating(5.0);
    setFormHours(50);
    setFormBatchesCount(1);
    setFormStatus('active');
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (inst: InstructorRecord) => {
    setEditingInstructor(inst);
    setFormName(inst.name);
    setFormTitle(inst.title);
    setFormAvatar(inst.avatarUrlOrEmoji);
    setFormEmail(inst.email);
    setFormPhone(inst.phone);
    setFormRole(inst.role);
    setFormSpecializations(inst.specializations.join(', '));
    setFormBio(inst.bio);
    setFormJunior(inst.teachingTiers.includes('junior'));
    setFormMiddle(inst.teachingTiers.includes('middle'));
    setFormTeens(inst.teachingTiers.includes('teens'));
    setFormRating(inst.rating);
    setFormHours(inst.totalTeachingHours);
    setFormBatchesCount(inst.assignedBatchesCount);
    setFormStatus(inst.status);
    setIsFormModalOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) {
      alert('Nama dan Email instruktur wajib diisi!');
      return;
    }

    const tiers: ('junior' | 'middle' | 'teens')[] = [];
    if (formJunior) tiers.push('junior');
    if (formMiddle) tiers.push('middle');
    if (formTeens) tiers.push('teens');

    if (tiers.length === 0) {
      alert('Pilih setidaknya satu jenjang mengajar (Junior, Middle, atau Teens)!');
      return;
    }

    const specsArray = formSpecializations
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (editingInstructor) {
      updateInstructor(editingInstructor.id, {
        name: formName.trim(),
        title: formTitle.trim(),
        avatarUrlOrEmoji: formAvatar.trim() || '👨‍💻',
        email: formEmail.trim(),
        phone: formPhone.trim(),
        role: formRole,
        specializations: specsArray.length > 0 ? specsArray : ['Logika Coding'],
        bio: formBio.trim() || 'Mentor berdedikasi tinggi di Beekoding Academy.',
        teachingTiers: tiers,
        rating: Number(formRating),
        totalTeachingHours: Number(formHours),
        assignedBatchesCount: Number(formBatchesCount),
        status: formStatus,
      });
      showToast('Profil instruktur berhasil diperbarui!');
    } else {
      createInstructor({
        name: formName.trim(),
        title: formTitle.trim(),
        avatarUrlOrEmoji: formAvatar.trim() || '👨‍💻',
        email: formEmail.trim(),
        phone: formPhone.trim(),
        role: formRole,
        specializations: specsArray.length > 0 ? specsArray : ['Logika Coding'],
        bio: formBio.trim() || 'Mentor berdedikasi tinggi di Beekoding Academy.',
        teachingTiers: tiers,
        rating: Number(formRating),
        totalTeachingHours: Number(formHours),
        assignedBatchesCount: Number(formBatchesCount),
        status: formStatus,
        joinedAt: new Date().toISOString().split('T')[0],
      });
      showToast('Instruktur baru berhasil ditambahkan!');
    }

    setIsFormModalOpen(false);
    loadData();
  };

  const handleToggleStatus = (id: string) => {
    toggleInstructorStatus(id);
    loadData();
    showToast('Status mengajar instruktur berhasil diubah.');
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Hapus data instruktur "${name}" dari direktori?`)) {
      deleteInstructor(id);
      loadData();
      showToast('Data instruktur telah dihapus.');
    }
  };

  const handleResetToDefault = () => {
    if (
      confirm('Kembalikan seluruh direktori tim pengajar ke kondisi awal bawaan Beekoding?')
    ) {
      resetInstructorsToDefault();
      loadData();
      showToast('Direktori instruktur berhasil direset ke standar.');
    }
  };

  const handleViewDetail = (inst: InstructorRecord) => {
    setSelectedInstructor(inst);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl bg-emerald-600 text-white text-sm font-semibold shadow-xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <span>Direktori Instruktur & Mentor Pengajar</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Kelola profil tim pendidik, keahlian kurikulum, jam terbang mengajar, dan evaluasi kepuasan murid.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center space-x-2 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Instruktur Baru</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
            }`}
            title="Reset ke Daftar Instruktur Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Metrics Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Pengajar Terdaftar
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalInstructors}
            </span>
            <span className="text-xs text-slate-400">Instruktur</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            {stats.activeInstructors} aktif membina kelas
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Instruktur Aktif Mengajar
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.activeInstructors}
            </span>
            <span className="text-xs text-slate-400">Orang</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">
            Kesiapan operasional 100%
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Jam Terbang Mengajar
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.totalTeachingHours}+
            </span>
            <span className="text-xs text-slate-400">Jam Kelas</span>
          </div>
          <div className="mt-1 text-[11px] text-blue-600 dark:text-blue-400">
            Pengalaman membina siswa
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Rata-Rata Rating Mengajar
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="w-4 h-4 fill-current" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-black text-amber-500">{stats.avgRating}</span>
            <span className="text-xs text-slate-400">/ 5.0 ⭐</span>
          </div>
          <div className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">
            Berdasarkan survei kepuasan wali
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters & View Mode Switcher */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama instruktur, keahlian, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif Mengajar</option>
            <option value="on_leave">Sedang Cuti</option>
            <option value="inactive">Nonaktif</option>
          </select>

          {/* Specialization Filter */}
          <select
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Keahlian</option>
            <option value="Scratch">Scratch 3.0</option>
            <option value="Roblox">Roblox Studio Lua</option>
            <option value="Python">Python 3</option>
            <option value="Web">Modern Web / React</option>
            <option value="AI">AI & Prompt</option>
          </select>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className={`px-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior (6-9 thn)</option>
            <option value="middle">Middle (10-12 thn)</option>
            <option value="teens">Teens (13-17 thn)</option>
          </select>

          {/* View Mode Switcher */}
          <div
            className={`p-1 rounded-xl border flex items-center ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Tampilan Kartu (Grid)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title="Tampilan Tabel (Table)"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* VIEW MODE 1: GRID CARDS                                  */}
      {/* ======================================================== */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((inst) => {
            const isImage =
              inst.avatarUrlOrEmoji.startsWith('/') ||
              inst.avatarUrlOrEmoji.startsWith('http') ||
              inst.avatarUrlOrEmoji.startsWith('data:');

            return (
              <div
                key={inst.id}
                className={`rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between group ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700 hover:border-amber-400/50'
                    : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                }`}
              >
                <div>
                  {/* Top Row: Avatar, Role Badge & Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-300/40 overflow-hidden flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform">
                      {isImage ? (
                        <img
                          src={inst.avatarUrlOrEmoji}
                          alt={inst.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{inst.avatarUrlOrEmoji}</span>
                      )}
                    </div>

                    <div className="text-right space-y-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                          inst.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                            : inst.status === 'on_leave'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                            : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                        }`}
                      >
                        {inst.status === 'active'
                          ? '● Aktif'
                          : inst.status === 'on_leave'
                          ? '● Cuti'
                          : '● Nonaktif'}
                      </span>

                      <div className="flex items-center justify-end space-x-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{inst.rating}.0</span>
                      </div>
                    </div>
                  </div>

                  {/* Name & Academic Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-1">
                    {inst.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                    {inst.title}
                  </p>

                  {/* Teaching Tiers */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {inst.teachingTiers.map((tier, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        {tier}
                      </span>
                    ))}
                  </div>

                  {/* Specialization Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {inst.specializations.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Stats & Action Buttons */}
                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs ${
                    isDark ? 'border-slate-700/80' : 'border-slate-100'
                  }`}
                >
                  <div className="text-[11px] text-slate-400 space-x-2">
                    <span>{inst.totalTeachingHours}j mengajar</span>
                    <span>•</span>
                    <span>{inst.assignedBatchesCount} batch</span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleViewDetail(inst)}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                    >
                      Profil
                    </button>

                    <button
                      onClick={() => handleOpenEdit(inst)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                      title="Edit Data Instruktur"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDelete(inst.id, inst.name)}
                      className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="Hapus Instruktur"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ======================================================== */
        /* VIEW MODE 2: TABLE VIEW                                  */
        /* ======================================================== */
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3 px-4">Instruktur</th>
                  <th className="py-3 px-4">Jenjang Mengajar</th>
                  <th className="py-3 px-4">Spesialisasi</th>
                  <th className="py-3 px-4">Jam Terbang</th>
                  <th className="py-3 px-4">Rating Siswa</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInstructors.map((inst) => {
                  const isImage =
                    inst.avatarUrlOrEmoji.startsWith('/') ||
                    inst.avatarUrlOrEmoji.startsWith('http') ||
                    inst.avatarUrlOrEmoji.startsWith('data:');

                  return (
                    <tr
                      key={inst.id}
                      className={`hover:bg-amber-500/5 transition-colors ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-300/40 overflow-hidden flex items-center justify-center text-lg shrink-0">
                            {isImage ? (
                              <img
                                src={inst.avatarUrlOrEmoji}
                                alt={inst.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span>{inst.avatarUrlOrEmoji}</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-900 dark:text-white">
                              {inst.name}
                            </div>
                            <div className="text-[11px] text-slate-400">{inst.title}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {inst.teachingTiers.map((tier, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {inst.specializations.slice(0, 2).map((s, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                            >
                              {s}
                            </span>
                          ))}
                          {inst.specializations.length > 2 && (
                            <span className="text-[10px] text-slate-400">
                              +{inst.specializations.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-semibold">
                        {inst.totalTeachingHours} Jam ({inst.assignedBatchesCount} batch)
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{inst.rating}.0</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStatus(inst.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                            inst.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                              : inst.status === 'on_leave'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                              : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                          }`}
                          title="Klik untuk mengubah status aktif/cuti"
                        >
                          {inst.status === 'active'
                            ? 'Aktif'
                            : inst.status === 'on_leave'
                            ? 'Cuti'
                            : 'Nonaktif'}
                        </button>
                      </td>

                      <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                        <button
                          onClick={() => handleViewDetail(inst)}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                        >
                          Detail
                        </button>
                        <button
                          onClick={() => handleOpenEdit(inst)}
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(inst.id, inst.name)}
                          className="p-1 rounded-lg text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Detail Profile Modal */}
      <AdminInstructorModal
        instructor={selectedInstructor}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isDark={isDark}
      />

      {/* Form Tambah / Edit Instruktur Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${
              isDark ? 'bg-slate-900 border border-slate-700 text-slate-100' : 'bg-white border border-slate-200 text-slate-900'
            }`}
          >
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-50/70 border-amber-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-base">
                  {editingInstructor ? 'Edit Data Instruktur' : 'Tambah Instruktur Baru'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Nama Lengkap & Gelar *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sarah Amalia, S.T."
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Avatar / Emoji / URL Foto
                  </label>
                  <input
                    type="text"
                    placeholder="👨‍🏫 atau /febri-hasan.png"
                    value={formAvatar}
                    onChange={(e) => setFormAvatar(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Jabatan / Gelar Akademik
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Senior Mentor - Game Dev"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Peran Penugasan
                  </label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as InstructorRole)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Email Resmi *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nama@beekoding.id"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="08123456789"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Keahlian & Spesialisasi (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="Scratch 3.0, Roblox Lua, Python, React, AI"
                  value={formSpecializations}
                  onChange={(e) => setFormSpecializations(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Jenjang Kelas yang Diampu
                </label>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="inline-flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formJunior}
                      onChange={(e) => setFormJunior(e.target.checked)}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Junior Explorer (6–9 thn)</span>
                  </label>

                  <label className="inline-flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formMiddle}
                      onChange={(e) => setFormMiddle(e.target.checked)}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Middle Coder (10–12 thn)</span>
                  </label>

                  <label className="inline-flex items-center space-x-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formTeens}
                      onChange={(e) => setFormTeens(e.target.checked)}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Teens Innovator (13–17 thn)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Biografi Singkat & Filosofi Mengajar
                </label>
                <textarea
                  rows={2}
                  placeholder="Latar belakang edukasi dan dedikasi mengajar siswa..."
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Rating Kepuasan (1-5)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Total Jam Mengajar
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formHours}
                    onChange={(e) => setFormHours(Number(e.target.value))}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Status Mengajar
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as InstructorStatus)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  >
                    <option value="active">Aktif Mengajar</option>
                    <option value="on_leave">Sedang Cuti</option>
                    <option value="inactive">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-all"
                >
                  {editingInstructor ? 'Simpan Perubahan' : 'Tambah Instruktur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
