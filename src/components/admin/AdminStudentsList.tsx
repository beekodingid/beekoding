import React, { useState } from 'react';
import {
  type AssessmentSubmission,
  type FollowUpStatus,
  deleteSubmission,
  exportSubmissionsCSV,
  resetSubmissionsToDefault,
} from '../../services/adminStorage';
import { getTierLabel } from '../../data/talentQuestions';
import {
  Search,
  Download,
  Eye,
  Trash2,
  Phone,
  RotateCcw,
  User,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface AdminStudentsListProps {
  submissions: AssessmentSubmission[];
  isDark: boolean;
  onViewReport: (submission: AssessmentSubmission) => void;
  onRefreshData: () => void;
}

export const AdminStudentsList: React.FC<AdminStudentsListProps> = ({
  submissions,
  isDark,
  onViewReport,
  onRefreshData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'score-desc' | 'score-asc'>('date-desc');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Pagination State (10, 25, 50)
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    // Search match
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      sub.profile.childName.toLowerCase().includes(q) ||
      (sub.profile.parentName && sub.profile.parentName.toLowerCase().includes(q)) ||
      sub.profile.parentPhone.includes(q) ||
      (sub.profile.gradeLevel && sub.profile.gradeLevel.toLowerCase().includes(q));

    // Tier match
    const matchTier = selectedTier === 'all' || sub.profile.tier === selectedTier;

    // Status match
    const matchStatus = selectedStatus === 'all' || sub.status === selectedStatus;

    return matchSearch && matchTier && matchStatus;
  });

  // Sort Submissions
  const sortedSubmissions = [...filteredSubmissions].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'date-asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'score-desc') {
      return b.totalScore - a.totalScore;
    }
    if (sortBy === 'score-asc') {
      return a.totalScore - b.totalScore;
    }
    return 0;
  });

  // Kalkulasi Pagination (Pilihan 10, 25, 50)
  const totalItems = sortedSubmissions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedSubmissions = sortedSubmissions.slice(startIndex, endIndex);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleTierChange = (val: string) => {
    setSelectedTier(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: string) => {
    setSelectedStatus(val);
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
    deleteSubmission(id);
    setDeleteConfirmId(null);
    onRefreshData();
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset data siswa ke data simulasi bawaan (6 siswa)?')) {
      resetSubmissionsToDefault();
      onRefreshData();
    }
  };

  const getStatusBadge = (status: FollowUpStatus) => {
    switch (status) {
      case 'baru':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-500 border border-blue-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
      case 'terdaftar':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Terdaftar Bootcamp</span>
          </span>
        );
      case 'selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/15 text-slate-400 border border-slate-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>Selesai</span>
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
              Daftar Siswa Peserta Tes Bakat Anak
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/25">
              {submissions.length} Total Data
            </span>
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-1`}>
            Data masuk secara real-time setiap kali calon siswa menyelesaikan kuis diagnostik.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDemoData}
            className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
            title="Muat ulang contoh data siswa simulasi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={() => exportSubmissionsCSV(sortedSubmissions)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV ({sortedSubmissions.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Cari nama anak, orang tua, no WA, atau kelas..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white placeholder-slate-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Filter Jenjang / Tier */}
          <div className="lg:col-span-3">
            <select
              value={selectedTier}
              onChange={(e) => handleTierChange(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-white'
                  : 'bg-slate-50 border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Jenjang & Usia</option>
              <option value="junior">Junior (6 - 9 Thn • SD 1-3)</option>
              <option value="middle">Intermediate (10 - 12 Thn • SD 4-6)</option>
              <option value="teens">Teens (13 - 17 Thn • SMP/SMA)</option>
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
              <option value="terdaftar">Terdaftar Bootcamp</option>
              <option value="selesai">Selesai</option>
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
              <option value="score-desc">Skor Tertinggi</option>
              <option value="score-asc">Skor Terendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Students Table */}
      <div
        className={`rounded-2xl border overflow-hidden transition-all ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {sortedSubmissions.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm mb-1">Tidak ada data siswa yang cocok</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Coba ubah kata kunci pencarian atau setelan filter jenjang dan status di atas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-50/80 border-slate-200 text-slate-500'
                  }`}
                >
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Profil Siswa</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Usia & Jenjang</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Kontak Orang Tua</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Skor & Top Pilar</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Status Tindak Lanjut</th>
                  <th className="py-3.5 px-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {paginatedSubmissions.map((sub) => {
                  const rawPhone = sub.profile.parentPhone.replace(/[^0-9]/g, '');
                  const cleanPhone = rawPhone.startsWith('0') ? '62' + rawPhone.slice(1) : rawPhone;

                  return (
                    <tr
                      key={sub.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/30'
                      }`}
                    >
                      {/* Nama Siswa & Tanggal */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-sm text-amber-500 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{sub.profile.childName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{sub.completedAt}</span>
                        </div>
                      </td>

                      {/* Usia & Jenjang */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-xs flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          <span>{sub.profile.childAge} Tahun</span>
                          <span className="text-slate-400">•</span>
                          <span>{sub.profile.gradeLevel || '-'}</span>
                        </div>
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {getTierLabel(sub.profile.tier).split('(')[0]}
                        </span>
                      </td>

                      {/* Kontak Orang Tua */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-xs">{sub.profile.parentName || '-'}</div>
                        <a
                          href={`https://wa.me/${cleanPhone}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline mt-0.5"
                          title="Hubungi Orang Tua via WhatsApp"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{sub.profile.parentPhone}</span>
                        </a>
                      </td>

                      {/* Skor & Top Pilar */}
                      <td className="py-4 px-4">
                        <div className="flex items-baseline gap-1">
                          <span className="font-black text-base text-amber-500">{sub.totalScore}</span>
                          <span className="text-[10px] text-slate-400">/100</span>
                        </div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[140px] mt-0.5">
                          Top: {sub.topStrengths.slice(0, 2).join(', ')}
                        </div>
                      </td>

                      {/* Status Tindak Lanjut (Teks Statis / Read-only) */}
                      <td className="py-4 px-4">
                        {getStatusBadge(sub.status)}
                      </td>

                      {/* Aksi */}
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                        {/* Tombol View Detail Laporan */}
                        <button
                          type="button"
                          onClick={() => onViewReport(sub)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          title="Lihat Detail Laporan Hasil Tes Bakat Anak"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>

                        {/* Tombol Hapus */}
                        {deleteConfirmId === sub.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(sub.id)}
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
                            onClick={() => setDeleteConfirmId(sub.id)}
                            className={`p-1.5 rounded-xl transition-colors ${
                              isDark
                                ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                                : 'text-slate-400 hover:text-rose-600 hover:bg-slate-100'
                            }`}
                            title="Hapus Data Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

        {/* Table Footer with Pagination & Page Size Selector (10, 25, 50) */}
        <div
          className={`p-4 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
          }`}
        >
          {/* Left: Page Size Selector (10, 25, 50) */}
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-slate-400">Tampilkan:</span>
            <div
              className={`inline-flex rounded-xl border p-0.5 ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-300 shadow-sm'
              }`}
            >
              {[10, 25, 50].map((size) => {
                const isActive = pageSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handlePageSizeChange(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <span className="text-slate-400 hidden sm:inline">data per halaman</span>
          </div>

          {/* Center: Showing range info */}
          <div className="text-center font-medium">
            {totalItems > 0 ? (
              <span>
                Menampilkan <strong>{startIndex + 1} - {endIndex}</strong> dari{' '}
                <strong>{totalItems}</strong> siswa
                {totalItems !== submissions.length && (
                  <span className="text-slate-400"> (total {submissions.length})</span>
                )}
              </span>
            ) : (
              <span>0 data siswa</span>
            )}
          </div>

          {/* Right: Pagination Navigation Controls */}
          <div className="flex items-center gap-1.5">
            {/* First Page button */}
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage(1)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
              title="Halaman Pertama"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Prev Page button */}
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page number buttons */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (totalPages <= 7) return true;
                  return p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 1;
                })
                .map((pageNum, idx, arr) => {
                  const prevVal = arr[idx - 1];
                  const hasGap = prevVal && pageNum - prevVal > 1;
                  const isCurrent = pageNum === safeCurrentPage;

                  return (
                    <React.Fragment key={pageNum}>
                      {hasGap && <span className="px-1 text-slate-400">...</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`min-w-[30px] h-[30px] px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : isDark
                            ? 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
                        }`}
                      >
                        {pageNum}
                      </button>
                    </React.Fragment>
                  );
                })}
            </div>

            {/* Next Page button */}
            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
              title="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Last Page button */}
            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
              title="Halaman Terakhir"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
