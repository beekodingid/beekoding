import React, { useState, useMemo } from 'react';
import {
  getInstructorPayrolls,
  createInstructorPayroll,
  updateInstructorPayroll,
  deleteInstructorPayroll,
  updatePayrollStatus,
  exportPayrollCSV,
  resetInstructorPayrollsToDefault,
  type InstructorPayrollRecord,
  type PayrollStatus,
} from '../../services/adminStorage';
import { AdminPayrollModal } from './AdminPayrollModal';
import { AdminPayrollSlipModal } from './AdminPayrollSlipModal';
import {
  Wallet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Download,
  Building2,
  Coins,
  RotateCcw,
  Eye,
} from 'lucide-react';

interface AdminPayrollProps {
  isDark: boolean;
}

export const AdminPayroll: React.FC<AdminPayrollProps> = ({ isDark }) => {
  const [payrolls, setPayrolls] = useState<InstructorPayrollRecord[]>(() =>
    getInstructorPayrolls()
  );

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PayrollStatus>('all');
  const [periodFilter, setPeriodFilter] = useState<string>('all');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPayroll, setEditingPayroll] = useState<InstructorPayrollRecord | null>(null);
  const [selectedSlip, setSelectedSlip] = useState<InstructorPayrollRecord | null>(null);

  const refreshData = () => {
    setPayrolls(getInstructorPayrolls());
  };

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  // Unique periods
  const periods = useMemo(() => {
    const set = new Set(payrolls.map((p) => p.period));
    return Array.from(set);
  }, [payrolls]);

  // Filter logic
  const filteredPayrolls = useMemo(() => {
    return payrolls.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.payrollNumber.toLowerCase().includes(q) ||
        p.instructorName.toLowerCase().includes(q) ||
        p.bankName.toLowerCase().includes(q) ||
        p.bankAccountNumber.includes(q);

      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchPeriod = periodFilter === 'all' || p.period === periodFilter;

      return matchSearch && matchStatus && matchPeriod;
    });
  }, [payrolls, searchQuery, statusFilter, periodFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const totalPaid = payrolls
      .filter((p) => p.status === 'paid')
      .reduce((acc, curr) => acc + curr.netTotalAmount, 0);

    const pendingAmount = payrolls
      .filter((p) => p.status !== 'paid')
      .reduce((acc, curr) => acc + curr.netTotalAmount, 0);

    const totalHours = payrolls.reduce((acc, curr) => acc + curr.teachingHours, 0);

    const avgHourlyRate =
      totalHours > 0
        ? Math.round(
            payrolls.reduce((acc, curr) => acc + curr.hourlyRate * curr.teachingHours, 0) /
              totalHours
          )
        : 150000;

    return {
      totalPaid,
      pendingAmount,
      totalHours,
      avgHourlyRate,
    };
  }, [payrolls]);

  // Actions
  const handleSaveForm = (
    data: Omit<InstructorPayrollRecord, 'id' | 'payrollNumber' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingPayroll) {
      updateInstructorPayroll(editingPayroll.id, data);
    } else {
      createInstructorPayroll(data);
    }
    refreshData();
    setIsFormOpen(false);
    setEditingPayroll(null);
  };

  const handleDelete = (id: string, number: string) => {
    if (window.confirm(`Yakin ingin menghapus data slip payroll ${number}?`)) {
      deleteInstructorPayroll(id);
      refreshData();
    }
  };

  const handleToggleStatus = (p: InstructorPayrollRecord) => {
    const nextStatus: PayrollStatus =
      p.status === 'draft' ? 'approved' : p.status === 'approved' ? 'paid' : 'draft';
    updatePayrollStatus(p.id, nextStatus);
    refreshData();
  };

  const handleResetToDefault = () => {
    if (
      window.confirm(
        'Reset semua data penggajian kembali ke dataset contoh awal pabrik (Juni & Juli 2026)?'
      )
    ) {
      resetInstructorPayrollsToDefault();
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
            <Coins className="w-3.5 h-3.5" />
            <span>Instructor Payroll & Teaching Hours Calculation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight">
            Sistem Penggajian & Insentif Instruktur
          </h2>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Rekap jam terbang mengajar tim mentor, hitung insentif performa rating bintang, cetak
            slip gaji A4 resmi, dan kirim slip transfer honorarium via WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            type="button"
            onClick={() => {
              setEditingPayroll(null);
              setIsFormOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Slip Payroll</span>
          </button>

          <button
            type="button"
            onClick={() => exportPayrollCSV(filteredPayrolls)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
                : 'bg-white border-slate-300 text-slate-500 hover:bg-slate-100'
            }`}
            title="Reset Contoh Bawaan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Mascot watermark */}
        <img
          src="/bee-mascot.png"
          alt="Bee Mascot"
          className="absolute -right-6 -bottom-10 w-44 h-44 opacity-10 pointer-events-none"
        />
      </div>

      {/* 4 Cards Metrik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metrik 1: Total Honor Lunas */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Honor Lunas Ditransfer
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
            {formatRupiah(metrics.totalPaid)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {payrolls.filter((p) => p.status === 'paid').length} slip honor telah disalurkan
          </p>
        </div>

        {/* Metrik 2: Tagihan Menunggu */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pending / Siap Transfer
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-amber-600 dark:text-amber-400">
            {formatRupiah(metrics.pendingAmount)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {payrolls.filter((p) => p.status !== 'paid').length} slip status draf & approved
          </p>
        </div>

        {/* Metrik 3: Total Jam Terbang */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Jam Mengajar
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-blue-600 dark:text-blue-400">
            {metrics.totalHours} Jam
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Terakumulasi dari seluruh batch aktif
          </p>
        </div>

        {/* Metrik 4: Tarif Rata-Rata */}
        <div
          className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rata-Rata Tarif / Jam
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
            {formatRupiah(metrics.avgHourlyRate)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Standar honor mentor Beekoding</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        className={`p-4 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari slip, nama instruktur, atau bank..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-2xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden transition-all ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="draft">DRAFT</option>
            <option value="approved">APPROVED</option>
            <option value="paid">PAID (Lunas)</option>
          </select>

          {/* Period Filter */}
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
            }`}
          >
            <option value="all">Semua Periode</option>
            {periods.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabel Data Payroll */}
      <div
        className={`rounded-3xl border overflow-hidden transition-colors ${
          isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className={`border-b font-bold ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}
              >
                <th className="py-3.5 px-4">No. Slip & Periode</th>
                <th className="py-3.5 px-4">Instruktur / Mentor</th>
                <th className="py-3.5 px-4">Rekening Tujuan</th>
                <th className="py-3.5 px-4 text-center">Jam Mengajar</th>
                <th className="py-3.5 px-4 text-right">Take Home Pay</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredPayrolls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Wallet className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    <p className="font-bold">Tidak ada data slip payroll yang sesuai.</p>
                  </td>
                </tr>
              ) : (
                filteredPayrolls.map((p) => (
                  <tr
                    key={p.id}
                    className={`hover:bg-amber-500/5 transition-colors ${
                      p.status === 'paid' ? '' : 'bg-amber-500/2'
                    }`}
                  >
                    {/* No. Slip */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">
                        {p.payrollNumber}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{p.period}</span>
                    </td>

                    {/* Instruktur */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">{p.instructorName}</div>
                      <span className="text-[11px] text-slate-400">{p.instructorRole}</span>
                    </td>

                    {/* Rekening */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900 dark:text-white flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-amber-500" />
                        <span>{p.bankName} - {p.bankAccountNumber}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase">a.n. {p.bankAccountHolder}</span>
                    </td>

                    {/* Jam Mengajar */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                        {p.teachingHours} Jam
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        @ Rp {p.hourlyRate.toLocaleString('id-ID')}
                      </div>
                    </td>

                    {/* Net Total Amount */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="font-black font-mono text-sm text-emerald-600 dark:text-emerald-400">
                        {formatRupiah(p.netTotalAmount)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Pokok: {formatRupiah(p.baseTeachingHonor)}
                      </div>
                    </td>

                    {/* Status Badge with quick click */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p)}
                        className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                          p.status === 'paid'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : p.status === 'approved'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                        title="Klik untuk ubah status: DRAFT -> APPROVED -> PAID"
                      >
                        {p.status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedSlip(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors cursor-pointer"
                        title="Lihat Slip Cetak A4 & Salin WA"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingPayroll(p);
                          setIsFormOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-colors cursor-pointer"
                        title="Edit Data Slip"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.payrollNumber)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Hapus Slip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <AdminPayrollModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingPayroll(null);
          }}
          onSave={handleSaveForm}
          payroll={editingPayroll}
          isDark={isDark}
        />
      )}

      {/* Modal Slip Print & WA Generator */}
      {selectedSlip && (
        <AdminPayrollSlipModal
          isOpen={Boolean(selectedSlip)}
          onClose={() => setSelectedSlip(null)}
          payroll={selectedSlip}
          isDark={isDark}
        />
      )}
    </div>
  );
};
