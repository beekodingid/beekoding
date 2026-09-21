import React, { useState } from 'react';
import {
  type InstructorPayrollRecord,
  type PayrollStatus,
  type PayrollItemCategory,
  type PayrollItem,
  getInstructors,
} from '../../services/adminStorage';
import { X, Wallet, Plus, Trash2, AlertCircle, Building2 } from 'lucide-react';

interface AdminPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    data: Omit<InstructorPayrollRecord, 'id' | 'payrollNumber' | 'createdAt' | 'updatedAt'>
  ) => void;
  payroll?: InstructorPayrollRecord | null;
  isDark: boolean;
}

export const AdminPayrollModal: React.FC<AdminPayrollModalProps> = ({
  isOpen,
  onClose,
  onSave,
  payroll,
  isDark,
}) => {
  const instructors = getInstructors();

  // Form states
  const [instructorId, setInstructorId] = useState(payroll?.instructorId || instructors[0]?.id || '');
  const [period, setPeriod] = useState(payroll?.period || 'Juli 2026');
  const [status, setStatus] = useState<PayrollStatus>(payroll?.status || 'draft');
  const [paymentDate, setPaymentDate] = useState(payroll?.paymentDate || '');
  const [bankName, setBankName] = useState(payroll?.bankName || 'BCA');
  const [bankAccountNumber, setBankAccountNumber] = useState(payroll?.bankAccountNumber || '');
  const [bankAccountHolder, setBankAccountHolder] = useState(payroll?.bankAccountHolder || '');
  const [teachingHours, setTeachingHours] = useState<number>(payroll?.teachingHours ?? 24);
  const [hourlyRate, setHourlyRate] = useState<number>(payroll?.hourlyRate ?? 150000);
  const [performanceIncentive, setPerformanceIncentive] = useState<number>(
    payroll?.performanceIncentive ?? 400000
  );
  const [attendanceBonus, setAttendanceBonus] = useState<number>(payroll?.attendanceBonus ?? 300000);
  const [notes, setNotes] = useState(payroll?.notes || '');

  // Additional custom items
  const [customItems, setCustomItems] = useState<PayrollItem[]>(
    payroll?.items?.filter(
      (it) =>
        it.category === 'curriculum_allowance' ||
        it.category === 'transport_allowance' ||
        it.category === 'deduction' ||
        it.category === 'other'
    ) || []
  );

  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PayrollItemCategory>('curriculum_allowance');
  const [newItemRate, setNewItemRate] = useState<number>(200000);
  const [newItemQty, setNewItemQty] = useState<number>(1);
  const [formError, setFormError] = useState<string | null>(null);

  // When instructor changes, auto-fill default values
  const handleInstructorChange = (instId: string) => {
    setInstructorId(instId);
    const selected = instructors.find((i) => i.id === instId);
    if (selected) {
      setBankAccountHolder(selected.name.toUpperCase());
      if (selected.role === 'lead_educator') {
        setHourlyRate(200000);
        setBankName('BCA');
      } else {
        setHourlyRate(150000);
        setBankName('Bank Mandiri');
      }
    }
  };

  const handleAddCustomItem = () => {
    if (!newItemDesc.trim()) {
      setFormError('Keterangan komponen tunjangan/potongan tidak boleh kosong.');
      return;
    }
    const total = newItemCategory === 'deduction' ? -Math.abs(newItemRate * newItemQty) : Math.abs(newItemRate * newItemQty);
    const item: PayrollItem = {
      id: `item-${Date.now().toString(36)}`,
      description: newItemDesc.trim(),
      category: newItemCategory,
      rate: newItemRate,
      qty: newItemQty,
      total,
    };
    setCustomItems([...customItems, item]);
    setNewItemDesc('');
    setNewItemRate(100000);
    setNewItemQty(1);
    setFormError(null);
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter((it) => it.id !== id));
  };

  // Calculations
  const baseTeachingHonor = teachingHours * hourlyRate;
  const allowanceTotal = customItems
    .filter((it) => it.category !== 'deduction')
    .reduce((acc, curr) => acc + curr.total, 0);
  const deductionsTotal = Math.abs(
    customItems
      .filter((it) => it.category === 'deduction')
      .reduce((acc, curr) => acc + curr.total, 0)
  );
  const netTotalAmount =
    baseTeachingHonor + performanceIncentive + attendanceBonus + allowanceTotal - deductionsTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedInst = instructors.find((i) => i.id === instructorId);
    if (!selectedInst) {
      setFormError('Pilih instruktur penerima honor.');
      return;
    }
    if (!bankAccountNumber.trim()) {
      setFormError('Nomor rekening bank tujuan wajib diisi.');
      return;
    }
    if (!bankAccountHolder.trim()) {
      setFormError('Nama pemilik rekening bank wajib diisi.');
      return;
    }

    // Assemble full items
    const allItems: PayrollItem[] = [
      {
        id: 'item-base',
        description: `Honor Sesi Mengajar (${teachingHours} Jam x Rp ${hourlyRate.toLocaleString('id-ID')})`,
        category: 'teaching_honor',
        rate: hourlyRate,
        qty: teachingHours,
        total: baseTeachingHonor,
      },
      ...(performanceIncentive > 0
        ? [
            {
              id: 'item-perf',
              description: `Insentif Performa & Rating Evaluasi Murid`,
              category: 'performance_incentive' as PayrollItemCategory,
              rate: performanceIncentive,
              qty: 1,
              total: performanceIncentive,
            },
          ]
        : []),
      ...(attendanceBonus > 0
        ? [
            {
              id: 'item-att',
              description: `Bonus Kehadiran Sesi Disiplin & Rekap Lengkap`,
              category: 'attendance_bonus' as PayrollItemCategory,
              rate: attendanceBonus,
              qty: 1,
              total: attendanceBonus,
            },
          ]
        : []),
      ...customItems,
    ];

    onSave({
      instructorId: selectedInst.id,
      instructorName: selectedInst.name,
      instructorRole: selectedInst.title || selectedInst.role,
      instructorPhone: selectedInst.phone,
      bankName,
      bankAccountNumber: bankAccountNumber.trim(),
      bankAccountHolder: bankAccountHolder.trim().toUpperCase(),
      period: period.trim(),
      paymentDate: status === 'paid' ? paymentDate || new Date().toISOString().split('T')[0] : paymentDate,
      teachingHours,
      hourlyRate,
      baseTeachingHonor,
      performanceIncentive,
      attendanceBonus,
      allowanceTotal,
      deductionsTotal,
      netTotalAmount,
      status,
      items: allItems,
      notes: notes.trim(),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors ${
          isDark ? 'bg-[#121624] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/70 border-amber-200/60'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {payroll ? 'Edit Slip Payroll Instruktur' : 'Buat Slip Payroll Instruktur Baru'}
              </h3>
              <p className="text-xs text-slate-400">
                Hitung jam mengajar, insentif kelas, dan cetak slip honorarium resmi
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {formError && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Instruktur & Periode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Pilih Instruktur Penerima *
              </label>
              <div className="relative">
                <select
                  value={instructorId}
                  onChange={(e) => handleInstructorChange(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden transition-all ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                  }`}
                  required
                >
                  {instructors.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.title})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Periode Bulan *
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Contoh: Juli 2026"
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>
          </div>

          {/* Section 2: Rekening Bank */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Data Rekening Pembayaran</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Bank Tujuan</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                  }`}
                >
                  <option value="BCA">BCA (Bank Central Asia)</option>
                  <option value="Bank Mandiri">Bank Mandiri</option>
                  <option value="BNI">BNI (Bank Negara Indonesia)</option>
                  <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                  <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                  <option value="CIMB Niaga">CIMB Niaga</option>
                  <option value="Bank Jago">Bank Jago</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Nomor Rekening</label>
                <input
                  type="text"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  placeholder="Contoh: 123-456-7890"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Nama Pemilik Rekening</label>
                <input
                  type="text"
                  value={bankAccountHolder}
                  onChange={(e) => setBankAccountHolder(e.target.value)}
                  placeholder="Sesuai buku tabungan"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden uppercase ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Jam Mengajar & Tarif */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Jam Mengajar (Sesi)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={teachingHours}
                onChange={(e) => setTeachingHours(Number(e.target.value) || 0)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Tarif Per Jam (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="5000"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value) || 0)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Insentif Performa (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={performanceIncentive}
                onChange={(e) => setPerformanceIncentive(Number(e.target.value) || 0)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Bonus Kehadiran (Rp)
              </label>
              <input
                type="number"
                min="0"
                step="50000"
                value={attendanceBonus}
                onChange={(e) => setAttendanceBonus(Number(e.target.value) || 0)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Section 4: Komponen Tunjangan / Potongan Tambahan */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Tunjangan & Potongan Tambahan
            </label>

            {customItems.length > 0 && (
              <div className="space-y-2">
                {customItems.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                      item.category === 'deduction'
                        ? 'bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400'
                        : isDark
                        ? 'bg-slate-900/60 border-slate-800 text-slate-200'
                        : 'bg-amber-50/50 border-amber-200/60 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{item.description}</div>
                      <div className="text-[10px] text-slate-400 uppercase">
                        {item.category === 'deduction' ? 'Potongan' : 'Tunjangan'} • {item.qty}x @ Rp{' '}
                        {item.rate.toLocaleString('id-ID')}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold font-mono">
                        {item.category === 'deduction' ? '-' : '+'}Rp{' '}
                        {Math.abs(item.total).toLocaleString('id-ID')}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomItem(item.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input Row for New Item */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pt-1">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  placeholder="Keterangan (misal: Tunjangan Modul Baru)"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
              <div className="sm:col-span-3">
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as PayrollItemCategory)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                >
                  <option value="curriculum_allowance">Tunjangan Modul</option>
                  <option value="transport_allowance">Tunjangan Kuota / Internet</option>
                  <option value="deduction">Potongan (Keterlambatan/Kas)</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <input
                  type="number"
                  min="0"
                  step="25000"
                  placeholder="Nominal Rp"
                  value={newItemRate}
                  onChange={(e) => setNewItemRate(Number(e.target.value) || 0)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                  }`}
                />
              </div>
              <div className="sm:col-span-1">
                <button
                  type="button"
                  onClick={handleAddCustomItem}
                  className="w-full h-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                  title="Tambah Komponen"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Section 5: Status & Tanggal Bayar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Status Slip Payroll *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PayrollStatus)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="draft">DRAFT (Dalam Peninjauan)</option>
                <option value="approved">APPROVED (Disetujui Siap Transfer)</option>
                <option value="paid">PAID (Lunas Ditransfer)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
                Tanggal Pembayaran / Transfer
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-2xl border text-xs font-medium focus:ring-2 focus:ring-amber-500 outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Section 6: Catatan Tambahan */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-500">
              Catatan / Pesan Pengantar untuk Instruktur
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Honor mengajar 3 batch kelas online dan insentif tugas akhir..."
              className={`w-full px-4 py-2.5 rounded-2xl border text-xs focus:ring-2 focus:ring-amber-500 outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          {/* Section 7: Live Total Summary Card */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark
                ? 'bg-gradient-to-br from-[#161d31] to-[#121624] border-amber-500/30'
                : 'bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-amber-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                  Total Diterima Bersih (Take Home Pay)
                </span>
                <div className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-amber-600 dark:text-amber-400">
                  Rp {netTotalAmount.toLocaleString('id-ID')}
                </div>
              </div>

              <div className="text-right text-xs space-y-0.5 text-slate-500 dark:text-slate-400">
                <div>Pokok Mengajar: Rp {baseTeachingHonor.toLocaleString('id-ID')}</div>
                <div>
                  Bonus & Insentif: +Rp {(performanceIncentive + attendanceBonus + allowanceTotal).toLocaleString('id-ID')}
                </div>
                {deductionsTotal > 0 && (
                  <div className="text-red-500">Potongan: -Rp {deductionsTotal.toLocaleString('id-ID')}</div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              {payroll ? 'Simpan Perubahan Slip' : 'Terbitkan Slip Payroll'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
