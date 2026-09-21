import React, { useState, useMemo } from 'react';
import {
  Ticket,
  Search,
  Plus,
  Download,
  RotateCcw,
  Sparkles,
  Check,
  Copy,
  Calendar,
  Percent,
  DollarSign,
  Share2,
  Edit2,
  Trash2,
  Play,
  Pause,
  Calculator,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Tag,
} from 'lucide-react';
import {
  type PromoVoucher,
  type DiscountType,
  type VoucherStatus,
  getPromoVouchers,
  updatePromoVoucher,
  deletePromoVoucher,
  resetPromoVouchersToDefault,
  validateAndApplyVoucher,
  calculateVoucherStats,
  exportVouchersCSV,
} from '../../services/adminStorage';
import { AdminVoucherModal } from './AdminVoucherModal';

interface AdminVouchersProps {
  isDark?: boolean;
}

const STATUS_BADGES: Record<
  VoucherStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  active: {
    label: 'Aktif',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400 font-black',
    border: 'border-emerald-500/20',
  },
  paused: {
    label: 'Dijeda',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400 font-bold',
    border: 'border-amber-500/20',
  },
  expired: {
    label: 'Kedaluwarsa',
    bg: 'bg-slate-500/10',
    text: 'text-slate-500 font-semibold',
    border: 'border-slate-500/20',
  },
  depleted: {
    label: 'Habis Kuota',
    bg: 'bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400 font-bold',
    border: 'border-rose-500/20',
  },
};

export const AdminVouchers: React.FC<AdminVouchersProps> = ({ isDark = false }) => {
  const [vouchers, setVouchers] = useState<PromoVoucher[]>(() => getPromoVouchers());

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<VoucherStatus | 'all'>('all');
  const [discountTypeFilter, setDiscountTypeFilter] = useState<DiscountType | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingVoucher, setEditingVoucher] = useState<PromoVoucher | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Quick Voucher Tester State
  const [testCode, setTestCode] = useState<string>('BEEKODINGAI');
  const [testAmount, setTestAmount] = useState<number>(850000);
  const [testTier, setTestTier] = useState<string>('all');
  const [testResult, setTestResult] = useState<{
    isValid: boolean;
    discountAmount: number;
    finalAmount: number;
    message: string;
  } | null>(null);

  const reloadData = () => {
    setVouchers(getPromoVouchers());
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleToggleStatus = (v: PromoVoucher) => {
    const newStatus: VoucherStatus = v.status === 'active' ? 'paused' : 'active';
    updatePromoVoucher(v.id, { status: newStatus });
    reloadData();
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Hapus voucher promo "${code}"? Tindakan ini tidak dapat dibatalkan.`)) {
      deletePromoVoucher(id);
      reloadData();
    }
  };

  const handleResetDefault = () => {
    if (
      window.confirm(
        'Kembalikan basis data voucher ke konfigurasi standar pabrik? Seluruh kupon kustom akan direset.'
      )
    ) {
      resetPromoVouchersToDefault();
      reloadData();
    }
  };

  // Run tester
  const handleRunTester = () => {
    const res = validateAndApplyVoucher(testCode, testAmount, testTier);
    setTestResult(res);
  };

  // 1-Click WhatsApp Broadcast Generator
  const handleShareWABroadcast = (v: PromoVoucher) => {
    const discountText =
      v.discountType === 'percentage'
        ? `${v.discountValue}%${v.maxDiscountAmount ? ` (Maksimal s/d Rp ${v.maxDiscountAmount.toLocaleString('id-ID')})` : ''}`
        : `Rp ${v.discountValue.toLocaleString('id-ID')}`;

    const lines = [
      `🎉 *KUPON PROMO SPESIAL BEEKODING ACADEMY* 🐝✨`,
      `---------------------------------------`,
      `*${v.title}*`,
      ``,
      `Kembangkan bakat logika, kreativitas, dan teknologi ananda bersama akademi coding & AI nomor satu untuk anak! Dapatkan penawaran istimewa dengan kode voucher resmi:`,
      ``,
      `🎟️ Kode Voucher: *${v.code}*`,
      `💰 Potongan: *${discountText}*`,
      `📌 Minimal Transaksi: Rp ${v.minTransactionAmount.toLocaleString('id-ID')}`,
      `⏳ Kuota Terbatas: Sisa ${Math.max(0, v.usageLimit - v.usedCount)} dari ${v.usageLimit} kuota`,
      `📅 Berlaku s/d: ${v.validUntil}`,
      ``,
      `"${v.description}"`,
      ``,
      `🚀 *Klaim Voucher & Pendaftaran*:`,
      `WhatsApp: https://wa.me/6285311317127?text=${encodeURIComponent(`Halo Admin BeeKoding! Saya ingin mendaftar kelas dengan kode voucher *${v.code}*.`)}`,
      `Website Resmi: https://beekoding.id`,
      ``,
      `_BeeKoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    ].join('\n');

    window.open(`https://wa.me/?text=${encodeURIComponent(lines)}`, '_blank');
  };

  // Filtered Vouchers
  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      if (statusFilter !== 'all' && v.status !== statusFilter) return false;
      if (discountTypeFilter !== 'all' && v.discountType !== discountTypeFilter) return false;
      if (
        tierFilter !== 'all' &&
        !v.applicableTiers.includes('all') &&
        !v.applicableTiers.includes(tierFilter as any)
      ) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCode = v.code.toLowerCase().includes(q);
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchDesc = v.description.toLowerCase().includes(q);

        if (!matchCode && !matchTitle && !matchDesc) return false;
      }

      return true;
    });
  }, [vouchers, statusFilter, discountTypeFilter, tierFilter, searchQuery]);

  // Analytics Stats
  const stats = useMemo(() => calculateVoucherStats(vouchers), [vouchers]);

  // Top Performing Voucher
  const topVoucher = useMemo(() => {
    if (vouchers.length === 0) return null;
    return [...vouchers].sort((a, b) => b.usedCount - a.usedCount)[0];
  }, [vouchers]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
            <Ticket className="w-4 h-4" />
            <span>Pemasaran & Manajemen Kupon Promosi</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
            Kupon Diskon, Promo & Beasiswa
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Kelola kode voucher persentase & nominal tetap, batas kuota pemakaian, masa berlaku,
            generator broadcast WhatsApp 1-klik, dan simulator penguji diskon transaksi.
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
            onClick={() => exportVouchersCSV(filteredVouchers)}
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
              setEditingVoucher(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Voucher Baru</span>
          </button>
        </div>
      </div>

      {/* 2. Top Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Vouchers */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Voucher Aktif</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-500">{stats.activeVouchers}</span>
            <span className="text-xs text-slate-400 font-semibold">/ {stats.totalVouchers} Kupon</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Siap diklaim untuk pendaftaran kelas</p>
        </div>

        {/* Card 2: Total Redemptions */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Siswa Memanfaatkan Promo</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-amber-500">{stats.totalRedemptions}</span>
            <span className="text-xs text-slate-400 font-semibold">Klaim Sukses</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Akumulasi seluruh pemakaian kupon</p>
        </div>

        {/* Card 3: Estimated Total Discounts Given */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Total Nilai Diskon Tersalurkan</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-blue-400">
              Rp {(stats.estimatedTotalDiscountGiven / 1000000).toFixed(1)} Jt
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Rp {stats.estimatedTotalDiscountGiven.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Card 4: Top Performing Coupon */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400">Kupon Paling Populer</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-mono font-black text-purple-400">
              {topVoucher ? topVoucher.code : '-'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {topVoucher ? `${topVoucher.usedCount} kali digunakan (${topVoucher.title})` : 'Belum ada data'}
          </p>
        </div>
      </div>

      {/* 3. Quick Voucher Tester & Simulator */}
      <div
        className={`p-5 rounded-3xl border ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-amber-50/50 border-amber-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>Simulator & Penguji Validitas Kupon Cepat</span>
          </div>
          <span className="text-[10px] text-slate-400">Uji coba simulasi sebelum broadcast</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-4 space-y-1">
            <label className="text-xs font-bold text-slate-400">Kode Kupon</label>
            <input
              type="text"
              value={testCode}
              onChange={(e) => setTestCode(e.target.value.toUpperCase().replace(/\s+/g, ''))}
              placeholder="CTH: BEEKODINGAI"
              className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-black border uppercase focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-amber-400'
                  : 'bg-white border-slate-300 text-amber-700'
              }`}
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-slate-400">Nominal Transaksi (Rp)</label>
            <input
              type="number"
              step="50000"
              value={testAmount}
              onChange={(e) => setTestAmount(Number(e.target.value))}
              className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-slate-400">Jenjang Program</label>
            <select
              value={testTier}
              onChange={(e) => setTestTier(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            >
              <option value="all">Semua Jenjang</option>
              <option value="junior">Junior (Scratch)</option>
              <option value="middle">Middle (Roblox/Python)</option>
              <option value="teens">Teens (Web & AI)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleRunTester}
              className="w-full py-2 px-3 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-amber-500/20"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Tes Kupon</span>
            </button>
          </div>
        </div>

        {/* Result alert */}
        {testResult && (
          <div
            className={`mt-3 p-3 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-in fade-in duration-200 ${
              testResult.isValid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
            }`}
          >
            <div className="flex items-center gap-2 font-medium">
              {testResult.isValid ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              )}
              <span>{testResult.message}</span>
            </div>

            {testResult.isValid && (
              <div className="flex items-center gap-3 font-bold text-xs shrink-0 self-end sm:self-auto">
                <span>
                  Diskon: <strong className="text-amber-500">Rp {testResult.discountAmount.toLocaleString('id-ID')}</strong>
                </span>
                <span>•</span>
                <span>
                  Bayar: <strong className="text-emerald-500">Rp {testResult.finalAmount.toLocaleString('id-ID')}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Filter Bar */}
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
            placeholder="Cari kode kupon, judul program promo, atau deskripsi..."
            className={`w-full pl-9 pr-3.5 py-2 rounded-xl text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-800 placeholder:text-slate-400'
            }`}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VoucherStatus | 'all')}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="paused">Dijeda</option>
            <option value="depleted">Habis Kuota</option>
            <option value="expired">Kedaluwarsa</option>
          </select>

          {/* Tipe Diskon */}
          <select
            value={discountTypeFilter}
            onChange={(e) => setDiscountTypeFilter(e.target.value as DiscountType | 'all')}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Tipe Diskon</option>
            <option value="percentage">Persentase (%)</option>
            <option value="fixed">Nominal Tetap (Rp)</option>
          </select>

          {/* Jenjang */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <option value="all">Semua Jenjang</option>
            <option value="junior">Junior (Scratch)</option>
            <option value="middle">Middle (Roblox/Python)</option>
            <option value="teens">Teens (Web & AI)</option>
          </select>
        </div>
      </div>

      {/* 5. Golden Ticket Cards Grid */}
      {filteredVouchers.length === 0 ? (
        <div
          className={`p-12 text-center rounded-3xl border ${
            isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="font-extrabold text-base mb-1">Tidak ada kupon yang sesuai</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            Coba sesuaikan kata kunci pencarian atau klik tombol &quot;Tambah Voucher Baru&quot; untuk
            membuat kode promosi baru.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
              setDiscountTypeFilter('all');
              setTierFilter('all');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVouchers.map((v) => {
            const statusStyle = STATUS_BADGES[v.status] || STATUS_BADGES.active;
            const remainingQuota = Math.max(0, v.usageLimit - v.usedCount);
            const usagePercent = Math.min(100, Math.round((v.usedCount / v.usageLimit) * 100));

            return (
              <div
                key={v.id}
                className={`rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Top Ticket Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {/* Discount Value Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm shadow-amber-500/20 flex items-center gap-1">
                        {v.discountType === 'percentage' ? (
                          <>
                            <Percent className="w-3.5 h-3.5" />
                            <span>DISKON {v.discountValue}%</span>
                          </>
                        ) : (
                          <>
                            <DollarSign className="w-3.5 h-3.5" />
                            <span>POTONGAN Rp {v.discountValue.toLocaleString('id-ID')}</span>
                          </>
                        )}
                      </span>

                      {/* Status */}
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[10px] border uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                      >
                        {statusStyle.label}
                      </span>
                    </div>

                    {/* Applicable tiers */}
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {v.applicableTiers.includes('all')
                        ? 'Semua Jenjang'
                        : v.applicableTiers.join(', ')}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-black tracking-tight text-slate-100 dark:text-slate-100 mt-1">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {v.description}
                  </p>
                </div>

                {/* Ticket Cut Separator Dashed */}
                <div className="relative flex items-center justify-between my-1">
                  <div className="w-4 h-6 rounded-r-full bg-[#fbf9f3] dark:bg-[#0d0f15] border-r border-t border-b border-slate-200 dark:border-slate-800 -ml-1" />
                  <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-800 mx-2" />
                  <div className="w-4 h-6 rounded-l-full bg-[#fbf9f3] dark:bg-[#0d0f15] border-l border-t border-b border-slate-200 dark:border-slate-800 -mr-1" />
                </div>

                {/* Ticket Details & Code Box */}
                <div className="p-5 pt-2 space-y-3">
                  {/* Coupon Code Strip */}
                  <div
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDark ? 'bg-slate-800/50 border-slate-700/60' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Kode Kupon Promo
                      </span>
                      <span className="font-mono font-black text-lg tracking-wider text-amber-500">
                        {v.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(v.code)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        copiedCode === v.code
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : isDark
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-sm'
                      }`}
                    >
                      {copiedCode === v.code ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copiedCode === v.code ? 'Tersalin!' : 'Salin Kode'}</span>
                    </button>
                  </div>

                  {/* Quota Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>
                        Kuota: <strong>{v.usedCount}</strong> dari {v.usageLimit} terpakai ({usagePercent}%)
                      </span>
                      <span className="font-bold text-amber-500">Sisa {remainingQuota} Kuota</span>
                    </div>
                    <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          usagePercent >= 90
                            ? 'bg-rose-500'
                            : usagePercent >= 70
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Terms / Validity */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>Berlaku s/d {v.validUntil}</span>
                    </div>
                    <span>Min. Rp {v.minTransactionAmount.toLocaleString('id-ID')}</span>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    {/* Share WA Broadcast */}
                    <button
                      type="button"
                      onClick={() => handleShareWABroadcast(v)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Broadcast WA</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {/* Toggle Pause / Resume */}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(v)}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                          v.status === 'active'
                            ? 'text-amber-500 hover:bg-amber-500/10 border-slate-700'
                            : 'text-emerald-500 hover:bg-emerald-500/10 border-slate-700'
                        }`}
                        title={v.status === 'active' ? 'Jeda Kupon' : 'Aktifkan Kupon'}
                      >
                        {v.status === 'active' ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setEditingVoucher(v);
                          setIsModalOpen(true);
                        }}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                            : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
                        }`}
                        title="Edit Voucher"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(v.id, v.code)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Hapus Voucher"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Input & Edit Voucher */}
      {isModalOpen && (
        <AdminVoucherModal
          key={editingVoucher ? editingVoucher.id : 'new-voucher'}
          voucher={editingVoucher}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingVoucher(null);
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
