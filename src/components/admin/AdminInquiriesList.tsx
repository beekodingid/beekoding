import React, { useState } from 'react';
import {
  type ConsultationInquiry,
  type InquiryStatus,
  deleteInquiry,
  exportInquiriesCSV,
  resetInquiriesToDefault,
} from '../../services/adminStorage';
import {
  Search,
  Download,
  Eye,
  Trash2,
  Phone,
  RotateCcw,
  User,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MessageSquare,
  ExternalLink,
  Tag,
  CheckCircle2,
  Clock,
  Mail,
} from 'lucide-react';

interface AdminInquiriesListProps {
  inquiries: ConsultationInquiry[];
  isDark: boolean;
  onViewInquiry: (inquiry: ConsultationInquiry) => void;
  onRefreshData: () => void;
}

export const AdminInquiriesList: React.FC<AdminInquiriesListProps> = ({
  inquiries,
  isDark,
  onViewInquiry,
  onRefreshData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name-asc'>('date-desc');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Pagination State (10, 25, 50)
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter Inquiries
  const filteredInquiries = inquiries.filter((item) => {
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.phone.includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.program.toLowerCase().includes(q) ||
      (item.message && item.message.toLowerCase().includes(q)) ||
      (item.adminNotes && item.adminNotes.toLowerCase().includes(q));

    // Type match
    const matchType = selectedType === 'all' || item.type === selectedType;

    // Status match
    const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;

    // Role match
    const matchRole = selectedRole === 'all' || item.role === selectedRole;

    return matchSearch && matchType && matchStatus && matchRole;
  });

  // Sort Inquiries
  const sortedInquiries = [...filteredInquiries].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    // We can also sort by ID or timestamp
    if (sortBy === 'date-asc') {
      return a.id.localeCompare(b.id);
    }
    // Default 'date-desc'
    return b.id.localeCompare(a.id);
  });

  // Pagination Calculation
  const totalItems = sortedInquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedInquiries = sortedInquiries.slice(startIndex, endIndex);

  // Metric counts
  const countBaru = inquiries.filter((i) => i.status === 'baru').length;
  const countJadwal = inquiries.filter((i) => i.status === 'jadwal_konsultasi').length;
  const countTerdaftar = inquiries.filter((i) => i.status === 'terdaftar').length;

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTypeChange = (val: string) => {
    setSelectedType(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: string) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  const handleRoleChange = (val: string) => {
    setSelectedRole(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val: any) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    deleteInquiry(id);
    setDeleteConfirmId(null);
    onRefreshData();
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset data formulir ke data simulasi bawaan (10 permohonan)?')) {
      resetInquiriesToDefault();
      onRefreshData();
    }
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'baru':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-500 border border-blue-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span>Baru Masuk</span>
          </span>
        );
      case 'dihubungi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Sudah Dihubungi</span>
          </span>
        );
      case 'jadwal_konsultasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-500 border border-purple-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span>Jadwal Konsultasi</span>
          </span>
        );
      case 'terdaftar':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Terdaftar</span>
          </span>
        );
      case 'batal':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Batal / Ditunda</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Export */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Data Konsultasi & Pendaftaran
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/25">
              {inquiries.length} Masuk
            </span>
          </div>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kelola formulir masuk calon siswa, orang tua, dan sekolah untuk ditindaklanjuti oleh tim konselor.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDemoData}
            className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
            title="Reset ke data simulasi permohonan bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            type="button"
            onClick={() => exportInquiriesCSV(inquiries)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Ekspor spreadsheet CSV seluruh permohonan"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV ({inquiries.length})</span>
          </button>
        </div>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Total Permohonan</span>
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white">
            {inquiries.length}
          </span>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Perlu Follow-Up</span>
            <Clock className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-blue-500">{countBaru}</span>
            <span className="text-[11px] text-slate-400">baru masuk</span>
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Jadwal Konsultasi</span>
            <Calendar className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-purple-500">{countJadwal}</span>
            <span className="text-[11px] text-slate-400">sesi</span>
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Terdaftar (Closing)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-500">{countTerdaftar}</span>
            <span className="text-[11px] text-slate-400">siswa</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari nama, email, no WA, program..."
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Filter Tipe */}
          <div className="lg:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Tipe</option>
              <option value="konsultasi">Permohonan Konsultasi</option>
              <option value="pendaftaran">Pendaftaran Program</option>
            </select>
          </div>

          {/* Filter Status */}
          <div className="lg:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Status</option>
              <option value="baru">Baru Masuk</option>
              <option value="dihubungi">Sudah Dihubungi</option>
              <option value="jadwal_konsultasi">Jadwal Konsultasi</option>
              <option value="terdaftar">Terdaftar (Closing)</option>
              <option value="batal">Batal / Ditunda</option>
            </select>
          </div>

          {/* Filter Role */}
          <div className="lg:col-span-2">
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Peran</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Siswa">Siswa</option>
              <option value="Kepala Sekolah">Kepala Sekolah</option>
              <option value="Guru">Guru</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Mitra Lainnya">Mitra Lainnya</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="date-desc">Terbaru Masuk</option>
              <option value="date-asc">Terlama</option>
              <option value="name-asc">Nama A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {sortedInquiries.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm mb-1">Tidak ada data permohonan yang cocok</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ubah kata kunci pencarian atau setelan filter tipe, status, dan peran di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b ${
                    isDark
                      ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                      : 'bg-slate-50/80 border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Pemohon</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Tipe & Tanggal</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Kontak (WA & Email)</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Program Pilihan</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Status Tindak Lanjut</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {paginatedInquiries.map((item) => {
                  const rawPhone = item.phone.replace(/[^0-9]/g, '');
                  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;
                  const waGreeting =
                    item.role === 'Orang Tua' ? `Bapak/Ibu ${item.name}` : item.name;
                  const waText = encodeURIComponent(
                    `Halo ${waGreeting} 👋, salam hangat dari Beekoding 🐝! Kami telah menerima ${
                      item.type === 'pendaftaran' ? 'pendaftaran' : 'permohonan konsultasi'
                    } Anda untuk program *${item.program}*. Apakah ada waktu luang hari ini untuk berdiskusi? Terima kasih! 🙏`
                  );
                  const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

                  return (
                    <tr
                      key={item.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/30'
                      }`}
                    >
                      {/* Pemohon & Peran */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-amber-500 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{item.name}</span>
                        </div>
                        <div className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {item.role}
                        </div>
                      </td>

                      {/* Tipe & Tanggal */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border mb-1 ${
                            item.type === 'pendaftaran'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {item.type === 'pendaftaran' ? 'Pendaftaran' : 'Konsultasi'}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{item.createdAt}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
                      </td>

                      {/* Kontak */}
                      <td className="py-4 px-4">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                          title="Kirim pesan WhatsApp"
                        >
                          <Phone className="w-3 h-3" />
                          <span className="font-mono">{item.phone}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[150px]">{item.email}</span>
                        </div>
                      </td>

                      {/* Program */}
                      <td className="py-4 px-4 max-w-[200px]">
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-start gap-1">
                          <Tag className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{item.program}</span>
                        </div>
                        {item.message && (
                          <p className="text-[10px] text-slate-400 italic line-clamp-1 mt-0.5">
                            "{item.message}"
                          </p>
                        )}
                      </td>

                      {/* Status Tindak Lanjut (Read-Only Badge) */}
                      <td className="py-4 px-4">
                        {getStatusBadge(item.status)}
                        {item.adminNotes && (
                          <span className="block text-[9.5px] text-slate-400 line-clamp-1 max-w-[140px] mt-1">
                            📝 {item.adminNotes}
                          </span>
                        )}
                      </td>

                      {/* Aksi */}
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                        {/* Tombol Follow-Up */}
                        <button
                          type="button"
                          onClick={() => onViewInquiry(item)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          title="Buka Detail & Tindak Lanjut Pemohon"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Follow-Up</span>
                        </button>

                        {/* Tombol Hapus */}
                        {deleteConfirmId === item.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-rose-600 text-white hover:bg-rose-500 cursor-pointer"
                            >
                              Hapus
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2 py-1 rounded-lg text-[10px] bg-slate-700 text-slate-200 hover:bg-slate-600 cursor-pointer"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(item.id)}
                            className={`p-1.5 rounded-xl transition-colors ${
                              isDark
                                ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                                : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                            }`}
                            title="Hapus Data Permohonan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {sortedInquiries.length > 0 && (
          <div
            className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            {/* Page Size Selector & Text */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span>Tampilkan:</span>
                <div className="inline-flex rounded-xl border border-slate-300 dark:border-slate-700 p-0.5 bg-white dark:bg-slate-800">
                  {[10, 25, 50].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handlePageSizeChange(size)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                        pageSize === size
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <span>
                Menampilkan <strong>{totalItems === 0 ? 0 : startIndex + 1}</strong> -{' '}
                <strong>{endIndex}</strong> dari <strong>{totalItems}</strong> permohonan
              </span>
            </div>

            {/* Navigation Page Numbers */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                title="Halaman Pertama"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safeCurrentPage === 1}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Number Buttons */}
              <div className="flex items-center gap-1 mx-1">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                  .filter((page) => {
                    if (totalPages <= 5) return true;
                    if (page === 1 || page === totalPages) return true;
                    return Math.abs(page - safeCurrentPage) <= 1;
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showEllipsis && (
                          <span className="px-1 text-slate-400 font-bold text-xs">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                            safeCurrentPage === page
                              ? 'bg-amber-500 text-slate-950 shadow-sm'
                              : 'border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-100 hover:border-amber-500/50'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                title="Halaman Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage(totalPages)}
                disabled={safeCurrentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-500/10 hover:text-amber-500 transition-colors"
                title="Halaman Terakhir"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
