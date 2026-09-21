import React, { useState } from 'react';
import {
  X,
  Check,
  Tag,
  Calendar,
  AlertCircle,
  Percent,
  DollarSign,
  Ticket,
  Sparkles,
} from 'lucide-react';
import {
  type PromoVoucher,
  type DiscountType,
  type VoucherStatus,
  createPromoVoucher,
  updatePromoVoucher,
} from '../../services/adminStorage';

interface AdminVoucherModalProps {
  voucher: PromoVoucher | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (savedVoucher: PromoVoucher) => void;
  isDark?: boolean;
}

const TIER_OPTIONS: { id: 'junior' | 'middle' | 'teens' | 'all'; label: string }[] = [
  { id: 'all', label: 'Semua Jenjang' },
  { id: 'junior', label: 'Junior (Scratch)' },
  { id: 'middle', label: 'Middle (Roblox & Python)' },
  { id: 'teens', label: 'Teens (Web & AI)' },
];

export const AdminVoucherModal: React.FC<AdminVoucherModalProps> = ({
  voucher,
  isOpen,
  onClose,
  onSaved,
  isDark = false,
}) => {
  // Direct state initialization
  const [code, setCode] = useState<string>(() => (voucher ? voucher.code : ''));
  const [title, setTitle] = useState<string>(() => (voucher ? voucher.title : ''));
  const [discountType, setDiscountType] = useState<DiscountType>(
    () => (voucher ? voucher.discountType : 'percentage')
  );
  const [discountValue, setDiscountValue] = useState<number>(
    () => (voucher ? voucher.discountValue : 20)
  );
  const [maxDiscountAmount, setMaxDiscountAmount] = useState<number | undefined>(
    () => (voucher ? voucher.maxDiscountAmount : 300000)
  );
  const [minTransactionAmount, setMinTransactionAmount] = useState<number>(
    () => (voucher ? voucher.minTransactionAmount : 500000)
  );
  const [usageLimit, setUsageLimit] = useState<number>(
    () => (voucher ? voucher.usageLimit : 50)
  );
  const [validFrom, setValidFrom] = useState<string>(() => {
    if (voucher) return voucher.validFrom;
    return new Date().toISOString().split('T')[0];
  });
  const [validUntil, setValidUntil] = useState<string>(() => {
    if (voucher) return voucher.validUntil;
    const future = new Date();
    future.setDate(future.getDate() + 30);
    return future.toISOString().split('T')[0];
  });
  const [applicableTiers, setApplicableTiers] = useState<
    ('junior' | 'middle' | 'teens' | 'all')[]
  >(() => (voucher ? voucher.applicableTiers : ['all']));
  const [status, setStatus] = useState<VoucherStatus>(() =>
    voucher ? voucher.status : 'active'
  );
  const [description, setDescription] = useState<string>(
    () => (voucher ? voucher.description : '')
  );
  const [formError, setFormError] = useState<string>('');

  if (!isOpen) return null;

  // Handle tier toggle
  const handleTierToggle = (tierId: 'junior' | 'middle' | 'teens' | 'all') => {
    if (tierId === 'all') {
      setApplicableTiers(['all']);
      return;
    }

    setApplicableTiers((prev) => {
      const withoutAll = prev.filter((t) => t !== 'all');
      if (withoutAll.includes(tierId)) {
        const next = withoutAll.filter((t) => t !== tierId);
        return next.length === 0 ? ['all'] : next;
      } else {
        return [...withoutAll, tierId];
      }
    });
  };

  // Handle Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '');

    if (!cleanCode) {
      setFormError('Kode voucher wajib diisi.');
      return;
    }
    if (!title.trim()) {
      setFormError('Nama program promosi / voucher wajib diisi.');
      return;
    }
    if (discountValue <= 0) {
      setFormError('Besaran diskon harus lebih besar dari 0.');
      return;
    }
    if (discountType === 'percentage' && discountValue > 100) {
      setFormError('Diskon persentase tidak boleh lebih dari 100%.');
      return;
    }
    if (usageLimit <= 0) {
      setFormError('Kuota penggunaan minimal 1.');
      return;
    }
    if (validUntil < validFrom) {
      setFormError('Tanggal akhir berlaku tidak boleh lebih awal dari tanggal mulai.');
      return;
    }

    try {
      const payload = {
        code: cleanCode,
        title: title.trim(),
        discountType,
        discountValue,
        maxDiscountAmount: discountType === 'percentage' ? maxDiscountAmount : undefined,
        minTransactionAmount,
        usageLimit,
        validFrom,
        validUntil,
        applicableTiers,
        status,
        description: description.trim(),
      };

      let saved: PromoVoucher | null = null;
      if (voucher) {
        saved = updatePromoVoucher(voucher.id, payload);
      } else {
        saved = createPromoVoucher(payload);
      }

      if (saved) {
        onSaved(saved);
        onClose();
      } else {
        setFormError('Gagal menyimpan voucher. Silakan periksa kembali formulir.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Terjadi kesalahan saat menyimpan data voucher.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 ${
          isDark ? 'bg-[#12151d] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 border-b flex items-center justify-between shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50/70'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">
                {voucher ? 'Edit Kupon Promo' : 'Buat Voucher Promo Baru'}
              </h2>
              <p className="text-xs text-slate-400">
                Atur skema diskon, kuota maksimal, masa berlaku & program kelas yang berlaku
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Kode & Judul */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Kode Kupon */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Kode Voucher *</label>
              <div className="relative">
                <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                  placeholder="CTH: BEEKODINGAI"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-sm font-mono font-black tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-amber-400 placeholder:text-slate-600'
                      : 'bg-white border-slate-300 text-amber-700 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Judul Promo */}
            <div className="md:col-span-7 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Nama Kampanye Promo *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Diskon Peluncuran Kelas AI Teens"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder:text-slate-600'
                    : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Section 2: Tipe Diskon & Besaran */}
          <div
            className={`p-4 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Sparkles className="w-4 h-4" />
              <span>Skema Potongan Harga & Nilai Diskon</span>
            </div>

            {/* Tipe Diskon Radio / Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDiscountType('percentage')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  discountType === 'percentage'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm shadow-amber-500/20'
                    : isDark
                    ? 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <Percent className="w-4 h-4" />
                <span>Persentase (%)</span>
              </button>

              <button
                type="button"
                onClick={() => setDiscountType('fixed')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  discountType === 'fixed'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm shadow-amber-500/20'
                    : isDark
                    ? 'bg-slate-800/60 text-slate-300 border-slate-700 hover:bg-slate-800'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Nominal Tetap (Rp)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Besaran Diskon */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">
                  {discountType === 'percentage' ? 'Besaran Diskon (%) *' : 'Nominal Potongan (Rp) *'}
                </label>
                <input
                  type="number"
                  min="1"
                  max={discountType === 'percentage' ? 100 : undefined}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm font-black focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-amber-400'
                      : 'bg-white border-slate-300 text-amber-700'
                  }`}
                />
              </div>

              {/* Maksimal Diskon (hanya jika persentase) */}
              {discountType === 'percentage' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">
                    Batas Maksimal Potongan (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={maxDiscountAmount || ''}
                    onChange={(e) =>
                      setMaxDiscountAmount(e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Kosongkan jika tanpa batas"
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Minimal Nilai Transaksi (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={minTransactionAmount}
                    onChange={(e) => setMinTransactionAmount(Number(e.target.value))}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              )}

              {/* Minimal Transaksi jika persentase */}
              {discountType === 'percentage' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400">Minimal Nilai Transaksi (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    step="50000"
                    value={minTransactionAmount}
                    onChange={(e) => setMinTransactionAmount(Number(e.target.value))}
                    className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-100'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              )}

              {/* Kuota Penggunaan */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400">Kuota Pemakaian Maksimal *</label>
                <input
                  type="number"
                  min="1"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Masa Berlaku & Jenjang */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Mulai Berlaku (Valid From) *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Berlaku Hingga (Valid Until) *</label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-100'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Jenjang Kelas yang Berhak */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400">Jenjang Program yang Berhak</label>
            <div className="flex flex-wrap gap-2">
              {TIER_OPTIONS.map((opt) => {
                const isSelected = applicableTiers.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleTierToggle(opt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                        : isDark
                        ? 'bg-slate-800/40 text-slate-400 border-slate-700 hover:bg-slate-800'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status & Deskripsi */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Status Voucher</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as VoucherStatus)}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100'
                    : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="active">Aktif (Siap Digunakan)</option>
                <option value="paused">Dijeda (Nonaktif Sementara)</option>
                <option value="expired">Kedaluwarsa</option>
                <option value="depleted">Habis Kuota</option>
              </select>
            </div>

            <div className="md:col-span-8 space-y-1.5">
              <label className="text-xs font-bold text-slate-400">Deskripsi & Catatan Promo</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Penjelasan ringkas syarat & ketentuan voucher..."
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-600'
                    : 'bg-white border-slate-300 text-slate-800 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div
          className={`px-6 py-4 border-t flex items-center justify-between gap-3 shrink-0 ${
            isDark ? 'border-slate-800 bg-[#161a24]' : 'border-slate-100 bg-slate-50/80'
          }`}
        >
          <div className="text-xs text-slate-400">
            Kode: <span className="font-mono font-bold text-amber-500">{code || '-'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                  : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
              }`}
            >
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{voucher ? 'Simpan Perubahan' : 'Terbitkan Voucher'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
