import React, { useRef } from 'react';
import {
  type TransactionRecord,
} from '../../services/adminStorage';
import { printIsolatedElement } from '../../services/printUtils';
import {
  Printer,
  Share2,
  Copy,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';

interface AdminInvoiceModalProps {
  transaction: TransactionRecord;
  isDark: boolean;
  onClose: () => void;
  onStatusChange?: (id: string, newStatus: TransactionRecord['status']) => void;
}

export const AdminInvoiceModal: React.FC<AdminInvoiceModalProps> = ({
  transaction,
  isDark,
  onClose,
  onStatusChange,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDateIndo = (isoDate: string) => {
    try {
      const d = new Date(isoDate);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return isoDate;
    }
  };

  const handlePrint = () => {
    printIsolatedElement(printRef.current, {
      orientation: 'portrait',
      title: `Kwitansi-${transaction.invoiceNumber}`,
    });
  };

  const generateWhatsAppMessage = () => {
    const lines = [
      `*INVOICE & KWITANSI PEMBAYARAN BEEKODING* 🐝`,
      `---------------------------------------`,
      `*No. Invoice*: ${transaction.invoiceNumber}`,
      `*Status*: ${transaction.status === 'paid' ? '✅ LUNAS' : transaction.status === 'partial' ? '⚠️ DP / SEBAGIAN' : '⏳ MENUNGGU PEMBAYARAN'}`,
      `*Tanggal*: ${formatDateIndo(transaction.createdAt)}`,
      ``,
      `*Nama Siswa*: ${transaction.studentName}`,
      `*Nama Wali*: ${transaction.parentName}`,
      `*Program*: ${transaction.programName}`,
      transaction.batchName ? `*Batch*: ${transaction.batchName}` : '',
      ``,
      `*RINCIAN BIAYA:*`,
      ...transaction.items.map(
        (it) => `• ${it.name} (${it.qty}x) : ${formatRupiah(it.price * it.qty)}`
      ),
      transaction.discount > 0
        ? `• Potongan Diskon (${transaction.discountCode || 'Promo'}): -${formatRupiah(transaction.discount)}`
        : '',
      `---------------------------------------`,
      `*TOTAL TAGIHAN*: *${formatRupiah(transaction.totalAmount)}*`,
      `*TELAH DIBAYAR*: *${formatRupiah(transaction.paidAmount)}*`,
      transaction.remainingAmount > 0
        ? `*SISA TAGIHAN*: *${formatRupiah(transaction.remainingAmount)}*`
        : '',
      ``,
      `*METODE PEMBAYARAN:*`,
      `Transfer Bank ${transaction.paymentMethod.toUpperCase()}`,
      `• *BCA*: 772-019-8821 a/n Beekoding Edukasi Nusantara`,
      `• *Mandiri*: 132-00-1928374-1 a/n Beekoding Edukasi Nusantara`,
      ``,
      `Terima kasih telah mempercayakan pendidikan logika & teknologi ananda bersama Beekoding! 🚀`,
      `_Beekoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    ];
    return lines.filter(Boolean).join('\n');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const cleanPhone = transaction.parentPhone.replace(/\D/g, '');
    let target = cleanPhone;
    if (target.startsWith('0')) {
      target = '62' + target.substring(1);
    }
    const text = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${target}?text=${text}`, '_blank');
  };

  const getStatusBadge = () => {
    switch (transaction.status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>LUNAS</span>
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>DP / CICILAN</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>MENUNGGU PEMBAYARAN</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>DIBATALKAN</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      {/* Container Dialog */}
      <div
        className={`relative w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-auto print:border-none print:shadow-none print:max-w-none print:rounded-none ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Header Modal - Hidden on Print */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b print:hidden ${
            isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              🐝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Invoice & Kwitansi Resmi
                </h3>
                {getStatusBadge()}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {transaction.invoiceNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kirim WA</span>
            </button>
            <button
              type="button"
              onClick={handleCopyText}
              className="p-2 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
              title="Salin Rincian Teks"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar Cepat: Ubah Status (Hidden on Print) */}
        {onStatusChange && (
          <div
            className={`px-6 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs print:hidden ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-amber-500/5 border-amber-500/10'
            }`}
          >
            <span className="text-slate-500 dark:text-slate-400">
              Ubah Status Pembayaran Langsung:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onStatusChange(transaction.id, 'paid')}
                disabled={transaction.status === 'paid'}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  transaction.status === 'paid'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-500'
                }`}
              >
                Set Lunas
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(transaction.id, 'pending')}
                disabled={transaction.status === 'pending'}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  transaction.status === 'pending'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500/20 hover:text-amber-500'
                }`}
              >
                Menunggu
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(transaction.id, 'partial')}
                disabled={transaction.status === 'partial'}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  transaction.status === 'partial'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-500/20 hover:text-sky-500'
                }`}
              >
                DP / Sebagian
              </button>
            </div>
          </div>
        )}

        {/* Invoice Printable Area */}
        <div
          ref={printRef}
          className="p-6 sm:p-10 bg-white text-slate-900 font-sans relative overflow-hidden"
        >
          {/* Watermark Status LUNAS */}
          {transaction.status === 'paid' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.07] rotate-[-25deg]">
              <span className="text-8xl sm:text-9xl font-black tracking-widest text-emerald-600 uppercase border-8 border-emerald-600 rounded-3xl p-6">
                LUNAS
              </span>
            </div>
          )}

          {/* Header Lembaga & No Invoice */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b-2 border-slate-200 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center text-3xl shadow-sm text-slate-950">
                🐝
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900">
                  Bee<span className="text-amber-500">Koding</span>
                </h1>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Next Gen Coding & AI Academy
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  PT Beekoding Edukasi Nusantara • www.beekoding.id
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-700 uppercase tracking-wider mb-1">
                Faktur Pembayaran Resmi
              </span>
              <div className="text-lg font-black text-slate-900 font-mono">
                {transaction.invoiceNumber}
              </div>
              <p className="text-xs text-slate-500">
                Terbit: <span className="font-semibold text-slate-700">{formatDateIndo(transaction.createdAt)}</span>
              </p>
              {transaction.dueDate && (
                <p className="text-xs text-slate-500">
                  Jatuh Tempo:{' '}
                  <span className="font-semibold text-slate-700">
                    {formatDateIndo(transaction.dueDate)}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Informasi Ditagihkan Kepada (Billed To) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Ditagihkan Kepada:
              </span>
              <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                {transaction.studentName}
              </h4>
              <p className="text-slate-600 font-medium">
                Wali Murid:{' '}
                <span className="font-semibold text-slate-900">{transaction.parentName}</span>
              </p>
              <p className="text-slate-600">WhatsApp: {transaction.parentPhone}</p>
              {transaction.parentEmail && (
                <p className="text-slate-600">Email: {transaction.parentEmail}</p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Program & Sesi Belajar:
              </span>
              <h4 className="text-sm font-bold text-amber-600 mb-0.5">
                {transaction.programName}
              </h4>
              {transaction.batchName && (
                <p className="text-slate-600 font-medium">
                  Batch:{' '}
                  <span className="font-semibold text-slate-800">{transaction.batchName}</span>
                </p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[11px] font-semibold">
                  Metode: Bank {transaction.paymentMethod.toUpperCase()}
                </span>
                {transaction.status === 'paid' && transaction.paidAt && (
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Lunas pd {formatDateIndo(transaction.paidAt)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabel Rincian Biaya */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Deskripsi Item / Layanan</th>
                  <th className="py-3 px-3 text-center">Qty</th>
                  <th className="py-3 px-4 text-right">Harga Satuan</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transaction.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      {item.description && (
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center font-medium text-slate-700">
                      {item.qty}x
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-slate-700">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {formatRupiah(item.price * item.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Rekap Total & Kalkulasi */}
            <div className="bg-slate-50 p-4 border-t border-slate-200">
              <div className="w-full sm:w-80 ml-auto space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-medium text-slate-900">
                    {formatRupiah(transaction.subtotal)}
                  </span>
                </div>

                {transaction.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>
                      Diskon ({transaction.discountCode || 'Voucher Potongan'}):
                    </span>
                    <span className="font-semibold">
                      -{formatRupiah(transaction.discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-300">
                  <span>Total Tagihan:</span>
                  <span className="text-amber-600">{formatRupiah(transaction.totalAmount)}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-700 pt-1">
                  <span>Telah Dibayar:</span>
                  <span className="font-bold text-emerald-600">
                    {formatRupiah(transaction.paidAmount)}
                  </span>
                </div>

                {transaction.remainingAmount > 0 ? (
                  <div className="flex justify-between text-xs font-bold text-rose-600 pt-1 border-t border-dashed border-slate-300">
                    <span>Sisa Tagihan Belum Lunas:</span>
                    <span>{formatRupiah(transaction.remainingAmount)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-xs font-bold text-emerald-700 pt-1 border-t border-dashed border-slate-300">
                    <span>Sisa Tagihan:</span>
                    <span>Rp 0 (LUNAS PENUH)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Catatan Transfer & Tanda Tangan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200 text-xs">
            {/* Instruksi Pembayaran */}
            <div>
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-500" />
                Rekening Resmi Beekoding
              </span>
              <div className="space-y-2 text-[11px] text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
                <div>
                  <span className="font-bold text-slate-900 block">Bank Central Asia (BCA)</span>
                  <span className="font-mono text-slate-800 font-bold">772-019-8821</span>
                  <span className="block text-slate-500">a/n PT Beekoding Edukasi Nusantara</span>
                </div>
                <div className="pt-1 border-t border-amber-200/40">
                  <span className="font-bold text-slate-900 block">Bank Mandiri</span>
                  <span className="font-mono text-slate-800 font-bold">132-00-1928374-1</span>
                  <span className="block text-slate-500">a/n PT Beekoding Edukasi Nusantara</span>
                </div>
              </div>
              {transaction.notes && (
                <p className="mt-2 text-[11px] text-slate-500 italic">
                  *Catatan: {transaction.notes}
                </p>
              )}
            </div>

            {/* Tanda Tangan & Stempel Resmi */}
            <div className="flex flex-col items-center sm:items-end justify-end text-center sm:text-right">
              <span className="text-[11px] text-slate-500 mb-1">
                Bandung, {formatDateIndo(transaction.createdAt)}
              </span>
              <p className="text-xs font-bold text-slate-900">
                PT Beekoding Edukasi Nusantara
              </p>

              {/* Stempel & Signature Visual */}
              <div className="relative my-2 w-36 h-20 flex items-center justify-center">
                {/* Stempel Lingkaran */}
                <div className="absolute inset-0 m-auto w-18 h-18 rounded-full border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center text-amber-600 rotate-[-12deg] bg-amber-50/40">
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    BEEKODING
                  </span>
                  <span className="text-base leading-none">🐝</span>
                  <span className="text-[7px] font-bold">OFFICIAL</span>
                </div>

                {/* Tanda Tangan Digital */}
                <div className="relative font-serif italic text-base font-bold text-slate-800 tracking-wide select-none rotate-[-4deg]">
                  Febri Hasan
                </div>
              </div>

              <div className="border-t border-slate-300 pt-1 w-44 text-center sm:text-right">
                <span className="font-bold text-xs text-slate-900 block">Febri Hasan</span>
                <span className="text-[10px] text-slate-500 block">Founder & Lead Educator</span>
              </div>
            </div>
          </div>

          {/* Bukti Transfer Pembayaran Terlampir */}
          {transaction.transferProofUrl && (
            <div className="mt-6 p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 print:border-slate-300 print:bg-transparent">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  Lampiran Bukti Transfer / Resi
                </span>
                <a
                  href={transaction.transferProofUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-amber-600 hover:underline inline-flex items-center gap-1 font-semibold print:hidden"
                >
                  <ExternalLink className="w-3 h-3" />
                  Buka Gambar Asli
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-200 bg-white flex-shrink-0 flex items-center justify-center shadow-sm">
                  <img
                    src={transaction.transferProofUrl}
                    alt="Bukti Transfer"
                    className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => window.open(transaction.transferProofUrl, '_blank')}
                  />
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-medium text-slate-900">
                    File bukti pembayaran resmi telah terlampir pada faktur ini.
                  </p>
                  <p className="text-[11px] text-slate-500 print:hidden">
                    Klik gambar atau tautan di atas untuk melihat bukti transfer dalam resolusi penuh.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Dokumen */}
          <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
            Faktur ini dihasilkan secara digital oleh Sistem Manajemen Administrasi Beekoding dan
            berlaku sebagai bukti transaksi pembayaran sah.
          </div>
        </div>

        {/* Copy Notification Toast */}
        {copied && (
          <div className="absolute bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs shadow-lg flex items-center gap-2 border border-slate-700 animate-bounce print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Rincian faktur disalin ke clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};
