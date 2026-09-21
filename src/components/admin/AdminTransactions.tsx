import React, { useState, useMemo } from 'react';
import {
  type TransactionRecord,
  type PaymentStatus,
  type PaymentMethod,
  type TransactionItem,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  resetTransactionsToDefault,
  calculateFinancialStats,
  getSubmissions,
  getInquiries,
  getBatches,
  validateAndApplyVoucher,
  getPromoVouchers,
} from '../../services/adminStorage';
import { AdminInvoiceModal } from './AdminInvoiceModal';
import {
  Receipt,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Printer,
  Edit2,
  Trash2,
  RotateCcw,
  Sparkles,
  Download,
  Share2,
  Check,
  Copy,
  X,
  CreditCard,
  Building2,
  QrCode,
  DollarSign,
  Ticket,
} from 'lucide-react';

interface AdminTransactionsProps {
  isDark: boolean;
}

export const AdminTransactions: React.FC<AdminTransactionsProps> = ({ isDark }) => {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => getTransactions());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [methodFilter, setMethodFilter] = useState<PaymentMethod | 'all'>('all');

  // Modal State
  const [selectedInvoice, setSelectedInvoice] = useState<TransactionRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionRecord | null>(null);
  const [copiedInvoice, setCopiedInvoice] = useState<string | null>(null);

  // Alert State
  const [alertInfo, setAlertInfo] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'info' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Form State untuk Transaksi Baru / Edit
  const [formStudentName, setFormStudentName] = useState('');
  const [formParentName, setFormParentName] = useState('');
  const [formParentPhone, setFormParentPhone] = useState('');
  const [formParentEmail, setFormParentEmail] = useState('');
  const [formProgramName, setFormProgramName] = useState('Junior Explorer: Visual Scratch & AI Logic');
  const [formBatchId, setFormBatchId] = useState('');
  const [formBatchName, setFormBatchName] = useState('');
  const [formItems, setFormItems] = useState<TransactionItem[]>([
    {
      name: 'Bootcamp Kids Coding (8 Sesi)',
      description: 'Termasuk sertifikat dan modul belajar digital',
      price: 1200000,
      qty: 1,
    },
  ]);
  const [formDiscount, setFormDiscount] = useState<number>(0);
  const [formDiscountCode, setFormDiscountCode] = useState('');
  const [formPaidAmount, setFormPaidAmount] = useState<number>(1200000);
  const [formPaymentMethod, setFormPaymentMethod] = useState<PaymentMethod>('bca');
  const [formStatus, setFormStatus] = useState<PaymentStatus>('paid');
  const [formDueDate, setFormDueDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [formNotes, setFormNotes] = useState('');

  // Quick Pick Lists
  const submissions = useMemo(() => getSubmissions(), []);
  const inquiries = useMemo(() => getInquiries(), []);
  const batches = useMemo(() => getBatches(), []);
  const vouchersList = useMemo(() => getPromoVouchers(), []);

  // Hitung Statistik Keuangan
  const stats = useMemo(() => calculateFinancialStats(transactions), [transactions]);

  // Format Mata Uang Rupiah
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filter Transaksi
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchMethod = methodFilter === 'all' || tx.paymentMethod === methodFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tx.invoiceNumber.toLowerCase().includes(q) ||
        tx.studentName.toLowerCase().includes(q) ||
        tx.parentName.toLowerCase().includes(q) ||
        tx.parentPhone.includes(q) ||
        tx.programName.toLowerCase().includes(q) ||
        (tx.batchName && tx.batchName.toLowerCase().includes(q));

      return matchStatus && matchMethod && matchSearch;
    });
  }, [transactions, statusFilter, methodFilter, searchQuery]);

  // Hitung Subtotal & Total pada Form
  const formSubtotal = useMemo(() => {
    return formItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [formItems]);

  const formTotalAmount = useMemo(() => {
    return Math.max(0, formSubtotal - (formDiscount || 0));
  }, [formSubtotal, formDiscount]);

  const formRemainingAmount = useMemo(() => {
    return Math.max(0, formTotalAmount - (formPaidAmount || 0));
  }, [formTotalAmount, formPaidAmount]);

  // Handler Terapkan Kupon Promo
  const handleApplyVoucherCode = (codeToApply?: string) => {
    const code = (codeToApply || formDiscountCode).trim().toUpperCase();
    if (!code) {
      showAlert('error', 'Silakan ketik atau pilih kode kupon promo.');
      return;
    }
    const res = validateAndApplyVoucher(code, formSubtotal);
    if (res.isValid) {
      setFormDiscount(res.discountAmount);
      setFormDiscountCode(code);
      // Update paid amount automatically
      const newTotal = Math.max(0, formSubtotal - res.discountAmount);
      setFormPaidAmount(newTotal);
      showAlert(
        'success',
        `Kupon ${code} berhasil diterapkan! Hemat ${formatRupiah(res.discountAmount)}.`
      );
    } else {
      showAlert('error', res.message);
    }
  };

  // Handler Buka Modal Buat Transaksi Baru
  const handleOpenCreateModal = () => {
    setEditingTransaction(null);
    setFormStudentName('');
    setFormParentName('');
    setFormParentPhone('');
    setFormParentEmail('');
    setFormProgramName('Junior Explorer: Visual Scratch & AI Logic');
    setFormBatchId(batches[0]?.id || '');
    setFormBatchName(batches[0]?.name || '');
    setFormItems([
      {
        name: 'Bootcamp Junior Visual Scratch & AI Logic (8 Sesi)',
        description: 'Termasuk sertifikat dan modul materi digital',
        price: 1200000,
        qty: 1,
      },
    ]);
    setFormDiscount(0);
    setFormDiscountCode('');
    setFormPaidAmount(1200000);
    setFormPaymentMethod('bca');
    setFormStatus('paid');
    const d = new Date();
    d.setDate(d.getDate() + 7);
    setFormDueDate(d.toISOString().split('T')[0]);
    setFormNotes('');
    setIsCreateModalOpen(true);
  };

  // Handler Edit Transaksi
  const handleOpenEditModal = (tx: TransactionRecord) => {
    setEditingTransaction(tx);
    setFormStudentName(tx.studentName);
    setFormParentName(tx.parentName);
    setFormParentPhone(tx.parentPhone);
    setFormParentEmail(tx.parentEmail || '');
    setFormProgramName(tx.programName);
    setFormBatchId(tx.batchId || '');
    setFormBatchName(tx.batchName || '');
    setFormItems(
      tx.items.length > 0
        ? tx.items
        : [
            {
              name: tx.programName,
              price: tx.totalAmount,
              qty: 1,
            },
          ]
    );
    setFormDiscount(tx.discount || 0);
    setFormDiscountCode(tx.discountCode || '');
    setFormPaidAmount(tx.paidAmount || 0);
    setFormPaymentMethod(tx.paymentMethod);
    setFormStatus(tx.status);
    setFormDueDate(tx.dueDate || '');
    setFormNotes(tx.notes || '');
    setIsCreateModalOpen(true);
  };

  // Handler Simpan Transaksi (Create / Update)
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStudentName.trim() || !formParentName.trim() || !formParentPhone.trim()) {
      showAlert('error', 'Nama siswa, nama wali murid, dan nomor WhatsApp wajib diisi.');
      return;
    }

    if (editingTransaction) {
      const updated = updateTransaction(editingTransaction.id, {
        studentName: formStudentName.trim(),
        parentName: formParentName.trim(),
        parentPhone: formParentPhone.trim(),
        parentEmail: formParentEmail.trim() || undefined,
        programName: formProgramName.trim(),
        batchId: formBatchId || undefined,
        batchName: formBatchName || undefined,
        items: formItems,
        subtotal: formSubtotal,
        discount: formDiscount,
        discountCode: formDiscountCode.trim() || undefined,
        totalAmount: formTotalAmount,
        paidAmount: formPaidAmount,
        remainingAmount: formRemainingAmount,
        paymentMethod: formPaymentMethod,
        status: formStatus,
        dueDate: formDueDate,
        paidAt:
          formStatus === 'paid' && !editingTransaction.paidAt
            ? new Date().toISOString()
            : editingTransaction.paidAt,
        notes: formNotes.trim() || undefined,
      });

      if (updated) {
        setTransactions(getTransactions());
        showAlert('success', `Transaksi ${updated.invoiceNumber} berhasil diperbarui.`);
        setIsCreateModalOpen(false);
      }
    } else {
      const newTx = createTransaction({
        studentName: formStudentName.trim(),
        parentName: formParentName.trim(),
        parentPhone: formParentPhone.trim(),
        parentEmail: formParentEmail.trim() || undefined,
        programName: formProgramName.trim(),
        batchId: formBatchId || undefined,
        batchName: formBatchName || undefined,
        items: formItems,
        subtotal: formSubtotal,
        discount: formDiscount,
        discountCode: formDiscountCode.trim() || undefined,
        totalAmount: formTotalAmount,
        paidAmount: formPaidAmount,
        remainingAmount: formRemainingAmount,
        paymentMethod: formPaymentMethod,
        status: formStatus,
        dueDate: formDueDate,
        paidAt: formStatus === 'paid' ? new Date().toISOString() : undefined,
        notes: formNotes.trim() || undefined,
      });

      setTransactions(getTransactions());
      showAlert('success', `Invoice & transaksi baru ${newTx.invoiceNumber} berhasil dicatat.`);
      setIsCreateModalOpen(false);
    }
  };

  // Ubah Status Cepat
  const handleQuickStatusChange = (id: string, newStatus: PaymentStatus) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    let updates: Partial<TransactionRecord> = { status: newStatus };
    if (newStatus === 'paid') {
      updates.paidAmount = tx.totalAmount;
      updates.remainingAmount = 0;
      updates.paidAt = new Date().toISOString();
    } else if (newStatus === 'pending') {
      updates.paidAmount = 0;
      updates.remainingAmount = tx.totalAmount;
      updates.paidAt = undefined;
    }

    const updated = updateTransaction(id, updates);
    if (updated) {
      setTransactions(getTransactions());
      if (selectedInvoice && selectedInvoice.id === id) {
        setSelectedInvoice(updated);
      }
      showAlert('success', `Status invoice ${updated.invoiceNumber} diubah menjadi ${newStatus.toUpperCase()}.`);
    }
  };

  // Hapus Transaksi
  const handleDeleteTransaction = (tx: TransactionRecord) => {
    if (confirm(`Apakah Anda yakin ingin menghapus transaksi invoice ${tx.invoiceNumber} (${tx.studentName})?`)) {
      deleteTransaction(tx.id);
      setTransactions(getTransactions());
      showAlert('info', `Transaksi ${tx.invoiceNumber} telah dihapus.`);
    }
  };

  // Reset ke Default
  const handleResetToDefault = () => {
    if (confirm('Pulihkan seluruh data transaksi ke sampel default pabrik?')) {
      resetTransactionsToDefault();
      setTransactions(getTransactions());
      showAlert('success', 'Data transaksi berhasil direset ke standar awal.');
    }
  };

  // Copy No. Invoice
  const handleCopyInvoice = (invNum: string) => {
    navigator.clipboard.writeText(invNum);
    setCopiedInvoice(invNum);
    setTimeout(() => setCopiedInvoice(null), 2000);
  };

  // Export CSV Transaksi
  const handleExportCSV = () => {
    const headers = [
      'No. Invoice',
      'Tanggal',
      'Nama Siswa',
      'Nama Wali',
      'No. WhatsApp',
      'Program',
      'Batch',
      'Total Tagihan (IDR)',
      'Telah Dibayar (IDR)',
      'Sisa Tagihan (IDR)',
      'Metode Pembayaran',
      'Status',
      'Jatuh Tempo',
    ];

    const rows = transactions.map((t) => [
      t.invoiceNumber,
      t.createdAt.split('T')[0],
      `"${t.studentName}"`,
      `"${t.parentName}"`,
      `'${t.parentPhone}`,
      `"${t.programName}"`,
      `"${t.batchName || '-'}"`,
      t.totalAmount,
      t.paidAmount,
      t.remainingAmount,
      t.paymentMethod.toUpperCase(),
      t.status.toUpperCase(),
      t.dueDate || '-',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `beekoding_transaksi_keuangan_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Pick Cepat Siswa dari Asesmen
  const handlePickStudentFromSub = (subId: string) => {
    const s = submissions.find((item) => item.id === subId);
    if (!s) return;
    setFormStudentName(s.profile.childName);
    setFormParentName(s.profile.parentName || '');
    setFormParentPhone(s.profile.parentPhone || '');
    if (s.recommendedProgram?.title) {
      setFormProgramName(s.recommendedProgram.title);
    }
    showAlert('info', `Data ananda ${s.profile.childName} dimuat ke formulir pembayaran.`);
  };

  // Pick Cepat Siswa dari Inquiries
  const handlePickStudentFromInquiry = (inqId: string) => {
    const i = inquiries.find((item) => item.id === inqId);
    if (!i) return;
    setFormStudentName(i.name);
    setFormParentName(i.name);
    setFormParentPhone(i.phone);
    setFormParentEmail(i.email || '');
    if (i.program) {
      setFormProgramName(i.program);
    }
    showAlert('info', `Data calon murid ${i.name} dimuat ke formulir pembayaran.`);
  };

  // Quick Action Kirim Invoice via WhatsApp
  const handleSendWhatsAppDirect = (tx: TransactionRecord) => {
    const cleanPhone = tx.parentPhone.replace(/\D/g, '');
    let target = cleanPhone;
    if (target.startsWith('0')) {
      target = '62' + target.substring(1);
    }
    const message = [
      `Halo Kak *${tx.parentName}*, salam hangat dari BeeKoding! 🐝`,
      ``,
      `Berikut adalah rincian faktur pendaftaran ananda *${tx.studentName}*:`,
      `• *No. Invoice*: ${tx.invoiceNumber}`,
      `• *Program*: ${tx.programName}`,
      `• *Status*: ${tx.status === 'paid' ? '✅ LUNAS' : '⏳ MENUNGGU PEMBAYARAN'}`,
      `• *Total Tagihan*: *${formatRupiah(tx.totalAmount)}*`,
      tx.remainingAmount > 0 ? `• *Sisa Tagihan*: *${formatRupiah(tx.remainingAmount)}*` : '',
      ``,
      `Rekening Resmi BeeKoding:`,
      `• BCA: *772-019-8821* a/n PT BeeKoding Edukasi Nusantara`,
      `• Mandiri: *132-00-1928374-1* a/n PT BeeKoding Edukasi Nusantara`,
      ``,
      `Mohon kirimkan bukti transfer ke nomor WhatsApp ini bila telah melakukan pembayaran. Terima kasih! 🙏`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${target}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert Notifikasi */}
      {alertInfo && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold transition-all shadow-md ${
            alertInfo.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : alertInfo.type === 'error'
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400'
              : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span>{alertInfo.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlertInfo(null)}
            className="p-1 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Halaman & Aksi Utama */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
            <Receipt className="w-6 h-6 text-amber-500" />
            <span>Transaksi, Invoice & Kwitansi Pembayaran</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pencatatan arus kas pendaftaran bootcamp, kwitansi resmi, dan invoice siap cetak.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer"
            title="Reset ke Sampel Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Catat Pembayaran Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Keuangan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Omset Lunas */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Omset Lunas
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {formatRupiah(stats.totalRevenue)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>{stats.paidCount} transaksi lunas diterima</span>
          </p>
        </div>

        {/* Tagihan Menunggu Pembayaran */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tagihan Tertunda / Piutang
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
            {formatRupiah(stats.pendingRevenue)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {stats.pendingCount} menunggu + {stats.partialCount} cicilan
          </p>
        </div>

        {/* Rata-Rata Nilai Transaksi */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rata-Rata Biaya Kelas
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-sky-600 dark:text-sky-400 tracking-tight">
            {formatRupiah(stats.avgValue)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dari seluruh invoice yang lunas
          </p>
        </div>

        {/* Total Keseluruhan Invoice */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Faktur / Invoice
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
            {stats.totalCount} Faktur
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {stats.cancelledCount > 0 ? `${stats.cancelledCount} dibatalkan` : 'Arsip tercatat rapi'}
          </p>
        </div>
      </div>

      {/* Filter & Bar Pencarian */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nomor invoice, nama siswa, wali murid, atau batch..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills Status */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {(
            [
              { id: 'all', label: 'Semua' },
              { id: 'paid', label: 'Lunas' },
              { id: 'pending', label: 'Menunggu' },
              { id: 'partial', label: 'DP/Cicilan' },
              { id: 'cancelled', label: 'Batal' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatusFilter(item.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === item.id
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Filter Metode Bayar */}
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value as PaymentMethod | 'all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <option value="all">Semua Metode</option>
          <option value="bca">Transfer BCA</option>
          <option value="mandiri">Transfer Mandiri</option>
          <option value="qris">QRIS</option>
          <option value="cash">Tunai / Cash</option>
        </select>
      </div>

      {/* Tabel Data Transaksi */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b font-bold ${
                  isDark
                    ? 'border-slate-800 bg-slate-950/40 text-slate-400'
                    : 'border-slate-100 bg-slate-50 text-slate-600'
                }`}
              >
                <th className="py-3.5 px-4">No. Invoice & Tanggal</th>
                <th className="py-3.5 px-4">Siswa & Wali Murid</th>
                <th className="py-3.5 px-4">Program / Batch</th>
                <th className="py-3.5 px-4 text-right">Tagihan & Bayar</th>
                <th className="py-3.5 px-3 text-center">Metode</th>
                <th className="py-3.5 px-3 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40 text-amber-500" />
                    <p className="font-semibold text-sm">Tidak ada transaksi yang cocok</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Coba ubah kata kunci pencarian atau reset filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* No Invoice & Tanggal */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {tx.invoiceNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyInvoice(tx.invoiceNumber)}
                          className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                          title="Salin No. Invoice"
                        >
                          {copiedInvoice === tx.invoiceNumber ? (
                            <Check className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* Siswa & Wali */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {tx.studentName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>Wali: {tx.parentName}</span>
                        <span>•</span>
                        <span className="font-mono">{tx.parentPhone}</span>
                      </div>
                    </td>

                    {/* Program / Batch */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                        {tx.programName}
                      </div>
                      {tx.batchName && (
                        <span className="inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
                          {tx.batchName}
                        </span>
                      )}
                    </td>

                    {/* Tagihan & Bayar */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {formatRupiah(tx.totalAmount)}
                      </div>
                      {tx.status === 'paid' ? (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                          Lunas {formatRupiah(tx.paidAmount)}
                        </span>
                      ) : tx.status === 'partial' ? (
                        <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold block mt-0.5">
                          Sisa: {formatRupiah(tx.remainingAmount)}
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                          Belum Bayar
                        </span>
                      )}
                    </td>

                    {/* Metode */}
                    <td className="py-3.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {tx.paymentMethod === 'qris' ? (
                          <QrCode className="w-3 h-3 text-amber-500" />
                        ) : tx.paymentMethod === 'cash' ? (
                          <DollarSign className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Building2 className="w-3 h-3 text-sky-500" />
                        )}
                        <span>{tx.paymentMethod}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3 text-center">
                      {tx.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>LUNAS</span>
                        </span>
                      ) : tx.status === 'partial' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                          <Clock className="w-3 h-3" />
                          <span>DP / CICIL</span>
                        </span>
                      ) : tx.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          <Clock className="w-3 h-3" />
                          <span>MENUNGGU</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                          <AlertCircle className="w-3 h-3" />
                          <span>BATAL</span>
                        </span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {/* Buka Faktur Modal */}
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(tx)}
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all inline-flex items-center gap-1 cursor-pointer"
                        title="Buka / Cetak Kwitansi Resmi"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Faktur</span>
                      </button>

                      {/* Kirim WA */}
                      <button
                        type="button"
                        onClick={() => handleSendWhatsAppDirect(tx)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                        title="Kirim Ringkasan Tagihan via WhatsApp"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(tx)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Edit Data Transaksi"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Hapus */}
                      <button
                        type="button"
                        onClick={() => handleDeleteTransaction(tx)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View & Print Invoice / Kwitansi Resmi */}
      {selectedInvoice && (
        <AdminInvoiceModal
          transaction={selectedInvoice}
          isDark={isDark}
          onClose={() => setSelectedInvoice(null)}
          onStatusChange={handleQuickStatusChange}
        />
      )}

      {/* Modal Form Tambah / Edit Transaksi */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingTransaction ? 'Perbarui Data Transaksi' : 'Catat Pembayaran Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingTransaction
                      ? `Invoice: ${editingTransaction.invoiceNumber}`
                      : 'Terbitkan kwitansi resmi pendaftaran murid'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Pick Bar (Hanya saat buat baru) */}
            {!editingTransaction && (
              <div
                className={`p-4 border-b text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-amber-500/5 border-amber-500/10'
                }`}
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilih Cepat Data Siswa (Otomatis Isi):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {submissions.slice(0, 4).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handlePickStudentFromSub(s.id)}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors font-medium cursor-pointer"
                    >
                      {s.profile.childName} (Asesmen)
                    </button>
                  ))}
                  {inquiries.slice(0, 3).map((inq) => (
                    <button
                      key={inq.id}
                      type="button"
                      onClick={() => handlePickStudentFromInquiry(inq.id)}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-colors font-medium cursor-pointer"
                    >
                      {inq.name} (Konsultasi)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSaveTransaction} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Data Murid & Wali */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Siswa / Anak *
                  </label>
                  <input
                    type="text"
                    required
                    value={formStudentName}
                    onChange={(e) => setFormStudentName(e.target.value)}
                    placeholder="Contoh: Kenzo Al-Fatih"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={formParentName}
                    onChange={(e) => setFormParentName(e.target.value)}
                    placeholder="Contoh: Bambang Pratama"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Kontak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nomor WhatsApp Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={formParentPhone}
                    onChange={(e) => setFormParentPhone(e.target.value)}
                    placeholder="081234567890"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Wali (Opsional)
                  </label>
                  <input
                    type="email"
                    value={formParentEmail}
                    onChange={(e) => setFormParentEmail(e.target.value)}
                    placeholder="wali@gmail.com"
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Program & Batch Kelas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Program Belajar *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProgramName}
                    onChange={(e) => setFormProgramName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Batch Kelas (Opsional)
                  </label>
                  <select
                    value={formBatchId}
                    onChange={(e) => {
                      const bId = e.target.value;
                      setFormBatchId(bId);
                      const found = batches.find((b) => b.id === bId);
                      setFormBatchName(found ? found.name : '');
                    }}
                    className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="">-- Tanpa Batch / Belum Ditentukan --</option>
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Item Transaksi & Biaya */}
              <div className="border-t pt-3 border-slate-200 dark:border-slate-800">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Item Layanan / Modul *
                </label>
                {formItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-2 mb-2 items-center">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const next = [...formItems];
                        next[idx].name = e.target.value;
                        setFormItems(next);
                      }}
                      placeholder="Nama Sesi / Paket"
                      className={`col-span-6 px-3 py-2 rounded-xl border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                    <input
                      type="number"
                      min={0}
                      value={item.price}
                      onChange={(e) => {
                        const next = [...formItems];
                        next[idx].price = Number(e.target.value) || 0;
                        setFormItems(next);
                      }}
                      placeholder="Harga"
                      className={`col-span-4 px-3 py-2 rounded-xl border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                      }`}
                    />
                    <div className="col-span-2 text-right">
                      <span className="font-bold">{formatRupiah(item.price * item.qty)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Diskon & Pembayaran */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Potongan Diskon (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formDiscount}
                    onChange={(e) => setFormDiscount(Number(e.target.value) || 0)}
                    className={`w-full px-3 py-1.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-600 dark:text-slate-400">
                      Kode Promo / Voucher
                    </label>
                    {vouchersList.filter((v) => v.status === 'active').length > 0 && (
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            handleApplyVoucherCode(e.target.value);
                          }
                        }}
                        defaultValue=""
                        className="text-[10px] text-amber-600 dark:text-amber-400 bg-transparent border-none outline-none cursor-pointer font-bold"
                      >
                        <option value="" disabled>
                          Pilih Kupon...
                        </option>
                        {vouchersList
                          .filter((v) => v.status === 'active')
                          .map((v) => (
                            <option
                              key={v.id}
                              value={v.code}
                              className="text-slate-800 dark:text-slate-200"
                            >
                              {v.code} (
                              {v.discountType === 'percentage'
                                ? `${v.discountValue}%`
                                : formatRupiah(v.discountValue)}
                              )
                            </option>
                          ))}
                      </select>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <div className="relative flex-1">
                      <Ticket className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
                      <input
                        type="text"
                        value={formDiscountCode}
                        onChange={(e) => setFormDiscountCode(e.target.value.toUpperCase())}
                        placeholder="Contoh: BEEKODINGAI"
                        className={`w-full pl-8 pr-2 py-1.5 rounded-xl border text-xs uppercase font-mono font-bold ${
                          isDark
                            ? 'bg-slate-800 border-slate-700 text-white'
                            : 'bg-white border-slate-300'
                        }`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyVoucherCode()}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex-shrink-0 cursor-pointer"
                      title="Validasi & Terapkan Diskon Kupon"
                    >
                      Terapkan
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Nominal Dibayar (Rp)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formPaidAmount}
                    onChange={(e) => setFormPaidAmount(Number(e.target.value) || 0)}
                    className={`w-full px-3 py-1.5 rounded-xl border font-bold text-emerald-600 ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Rekap Kalkulasi */}
              <div className="flex justify-between items-center px-2 py-1 text-slate-600 dark:text-slate-400">
                <span>
                  Total Tagihan: <strong className="text-slate-900 dark:text-white">{formatRupiah(formTotalAmount)}</strong>
                </span>
                <span>
                  Sisa Tagihan:{' '}
                  <strong className={formRemainingAmount > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                    {formatRupiah(formRemainingAmount)}
                  </strong>
                </span>
              </div>

              {/* Metode & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Metode Pembayaran
                  </label>
                  <select
                    value={formPaymentMethod}
                    onChange={(e) => setFormPaymentMethod(e.target.value as PaymentMethod)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="bca">Transfer BCA</option>
                    <option value="mandiri">Transfer Mandiri</option>
                    <option value="qris">QRIS</option>
                    <option value="cash">Tunai / Cash</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Status Pembayaran
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as PaymentStatus)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="paid">✅ Lunas</option>
                    <option value="pending">⏳ Menunggu Pembayaran</option>
                    <option value="partial">⚠️ DP / Cicilan</option>
                    <option value="cancelled">❌ Dibatalkan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Jatuh Tempo
                  </label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              {/* Catatan Admin */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Misal: Bukti transfer terlampir via WA"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer"
                >
                  {editingTransaction ? 'Simpan Perubahan' : 'Terbitkan Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
