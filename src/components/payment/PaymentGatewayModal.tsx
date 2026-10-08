import React, { useState, useEffect, useTransition } from 'react';
import {
  type PaymentChannel,
  type PaymentSession,
  createPaymentSession,
  settlePaymentSuccess,
  getPaymentGatewayConfig,
} from '../../services/paymentGateway';
import { type TransactionRecord } from '../../services/adminStorage';
import { QRCodeView } from '../common/QRCodeView';
import { ConfettiCelebration } from '../talent/ConfettiCelebration';
import {
  ShieldCheck,
  X,
  QrCode,
  Copy,
  Check,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface PaymentGatewayModalProps {
  transaction: TransactionRecord;
  isDark: boolean;
  onClose: () => void;
  onPaymentSuccess?: (transaction: TransactionRecord) => void;
  initialChannel?: PaymentChannel;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  transaction,
  isDark,
  onClose,
  onPaymentSuccess,
  initialChannel = 'qris',
}) => {
  const [, startTransition] = useTransition();
  const config = getPaymentGatewayConfig();

  const [selectedChannel, setSelectedChannel] = useState<PaymentChannel>(initialChannel);
  const [session, setSession] = useState<PaymentSession>(() =>
    createPaymentSession(transaction, initialChannel)
  );

  const [copiedVa, setCopiedVa] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<number>(0);
  const [isSettled, setIsSettled] = useState(false);
  const [isProcessingSettlement, setIsProcessingSettlement] = useState(false);

  // Countdown timer 15 menit
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format countdown mm:ss
  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSelectChannel = (channel: PaymentChannel) => {
    setSelectedChannel(channel);
    startTransition(() => {
      const newSession = createPaymentSession(transaction, channel);
      setSession(newSession);
      setActiveAccordion(0);
    });
  };

  const handleCopyVa = () => {
    if (session.vaNumber) {
      navigator.clipboard.writeText(session.vaNumber);
      setCopiedVa(true);
      setTimeout(() => setCopiedVa(false), 2000);
    }
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(session.amount));
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  // Simulasi Pelunasan Sukses
  const handleSimulateSettlement = () => {
    setIsProcessingSettlement(true);
    setTimeout(() => {
      const result = settlePaymentSuccess(session.sessionId);
      setIsProcessingSettlement(false);
      if (result.success && result.transaction) {
        setIsSettled(true);
        if (onPaymentSuccess) {
          onPaymentSuccess(result.transaction);
        }
      }
    }, 800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Payment Gateway Checkout"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {isSettled && <ConfettiCelebration />}

      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden relative my-auto transition-all duration-300 ${
          isDark
            ? 'bg-[#0f1322] border-amber-500/30 text-white shadow-black/80'
            : 'bg-[#fffefc] border-amber-300/80 text-slate-900 shadow-amber-950/20'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between gap-3 ${
            isDark
              ? 'bg-[#151a2d] border-slate-800'
              : 'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100/60 border-amber-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px] shadow-md shadow-amber-500/30 flex-shrink-0">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden ${
                  isDark ? 'bg-[#0f1322]' : 'bg-white'
                }`}
              >
                <img src="/icon-192.png" alt="Beekoding" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-black tracking-tight font-['Space_Grotesk']">
                  Beekoding <span className="text-amber-500">Pay Gateway</span>
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  SSL 256-Bit
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Pintu Pembayaran Resmi Kursus Koding & AI Anak
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-900 hover:bg-amber-100'
            }`}
            aria-label="Tutup popup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Jika Pembayaran Berhasil (Success State) */}
        {isSettled ? (
          <div className="p-6 sm:p-8 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center mb-4 ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-12 h-12 animate-bounce" />
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-block mb-2">
              Pembayaran Berhasil Terverifikasi Real-Time
            </span>

            <h3 className="text-xl sm:text-2xl font-black mb-1">
              Alhamdulillah, Transaksi Lunas! 🐝🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Sistem telah memperbarui status invoice <strong>{transaction.invoiceNumber}</strong>{' '}
              secara instan. Kwitansi resmi telah diterbitkan.
            </p>

            {/* Rincian Berhasil */}
            <div
              className={`max-w-md mx-auto p-4 rounded-2xl border text-left text-xs space-y-2 mb-6 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between">
                <span className="text-slate-500">Nomor Invoice:</span>
                <span className="font-mono font-bold">{transaction.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Siswa:</span>
                <span className="font-bold">{transaction.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode Pembayaran:</span>
                <span className="font-bold text-amber-500">{session.channelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nominal Lunas:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">
                  {formatRupiah(session.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Ref ID Gateway:</span>
                <span className="font-mono text-[10px] text-slate-400">{session.sessionId}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/30 cursor-pointer transition-all"
              >
                Selesai & Buka Kwitansi Resmi
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Tagihan Summary Bar */}
            <div
              className={`px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-amber-50/40 border-amber-200/60'
              }`}
            >
              <div>
                <div className="text-[11px] text-slate-500">Total Pembayaran:</div>
                <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-amber-500">
                  {formatRupiah(session.amount)}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[11px] text-slate-500 flex items-center justify-end gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  Sisa Waktu Bayar:
                </div>
                <div className="text-sm sm:text-base font-black font-mono text-red-500">
                  {formatTimer(secondsRemaining)}
                </div>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 max-h-[72vh] overflow-y-auto">
              {/* Kolom Kiri: Pilih Metode (Channel Selector) */}
              <div className="md:col-span-5 space-y-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                  Pilih Saluran Bayar
                </span>

                {/* QRIS */}
                <button
                  type="button"
                  onClick={() => handleSelectChannel('qris')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedChannel === 'qris'
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/15'
                      : isDark
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">QRIS (Semua E-Wallet)</div>
                    <div className="text-[10px] text-slate-500 truncate">
                      GoPay, OVO, Dana, Shopee, BCA
                    </div>
                  </div>
                </button>

                {/* BCA Virtual Account */}
                <button
                  type="button"
                  onClick={() => handleSelectChannel('bca_va')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedChannel === 'bca_va'
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/15'
                      : isDark
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0 font-black text-xs">
                    BCA
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">BCA Virtual Account</div>
                    <div className="text-[10px] text-slate-500 truncate">Verifikasi Otomatis</div>
                  </div>
                </button>

                {/* Mandiri Virtual Account */}
                <button
                  type="button"
                  onClick={() => handleSelectChannel('mandiri_va')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedChannel === 'mandiri_va'
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/15'
                      : isDark
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center flex-shrink-0 font-black text-xs">
                    MDR
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Mandiri Virtual Account</div>
                    <div className="text-[10px] text-slate-500 truncate">Livin by Mandiri</div>
                  </div>
                </button>

                {/* BRI Virtual Account */}
                <button
                  type="button"
                  onClick={() => handleSelectChannel('bri_va')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedChannel === 'bri_va'
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/15'
                      : isDark
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-500 flex items-center justify-center flex-shrink-0 font-black text-xs">
                    BRI
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">BRI Virtual Account (BRIVA)</div>
                    <div className="text-[10px] text-slate-500 truncate">BRImo & ATM BRI</div>
                  </div>
                </button>

                {/* BNI Virtual Account */}
                <button
                  type="button"
                  onClick={() => handleSelectChannel('bni_va')}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    selectedChannel === 'bni_va'
                      ? 'border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/15'
                      : isDark
                      ? 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0 font-black text-xs">
                    BNI
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">BNI Virtual Account</div>
                    <div className="text-[10px] text-slate-500 truncate">BNI Mobile Banking</div>
                  </div>
                </button>
              </div>

              {/* Kolom Kanan: Tampilan Instruksi & Detail Pembayaran */}
              <div className="md:col-span-7 space-y-4">
                {/* Mode QRIS Display */}
                {selectedChannel === 'qris' && (
                  <div
                    className={`p-5 rounded-2xl border text-center ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                        QRIS Nasional Dinamis
                      </span>
                    </div>

                    {/* QR Code Container */}
                    <div className="p-3 bg-white rounded-2xl inline-block shadow-lg border border-slate-200 mb-3">
                      <QRCodeView
                        value={
                          session.qrisPayload ||
                          `https://beekoding.id/pay/${session.sessionId}`
                        }
                        size={180}
                        alt="QRIS Beekoding"
                      />
                    </div>

                    <p className="text-xs font-bold mb-1">
                      Pindai QRIS Menggunakan Aplikasi Apa Saja
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                      Mendukung BCA Mobile, Livin, BRImo, BNI, GoPay, OVO, Dana, ShopeePay, dan
                      LinkAja.
                    </p>
                  </div>
                )}

                {/* Mode Virtual Account Display */}
                {selectedChannel.endsWith('_va') && (
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Nomor Virtual Account {session.channelName.replace(' Virtual Account', '')}
                      </span>
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-base sm:text-lg font-mono font-black tracking-wider text-amber-600 dark:text-amber-400">
                          {session.vaNumber}
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyVa}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedVa ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedVa ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>

                    {session.billCode && (
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Kode Perusahaan (Biller Code)
                        </span>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono font-bold text-xs">
                          {session.billCode} (Sarang Edukasi Digital / Beekoding)
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Nominal Pas
                      </span>
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        <span className="text-sm font-bold">{formatRupiah(session.amount)}</span>
                        <button
                          type="button"
                          onClick={handleCopyAmount}
                          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedAmount ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedAmount ? 'Tersalin' : 'Salin Angka'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Petunjuk Pembayaran Accordion */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                    Panduan Pembayaran
                  </span>
                  {session.instructions.map((inst, idx) => (
                    <div
                      key={inst.title}
                      className={`rounded-xl border overflow-hidden transition-all ${
                        isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                        className="w-full p-3 text-left font-bold text-xs flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <span>{inst.title}</span>
                        {activeAccordion === idx ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {activeAccordion === idx && (
                        <div
                          className={`px-3.5 pb-3.5 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t ${
                            isDark ? 'border-slate-800' : 'border-slate-100'
                          }`}
                        >
                          <ol className="list-decimal pl-4 space-y-1.5 leading-relaxed text-[11px]">
                            {inst.steps.map((st, sIdx) => (
                              <li key={sIdx}>{st}</li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Status Indicator Bar */}
                <div
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    <strong>Pengecekan Real-time:</strong> Setelah pembayaran selesai di aplikasi
                    Anda, sistem ini akan langsung berubah menjadi lunas secara otomatis tanpa perlu
                    unggah bukti transfer.
                  </span>
                </div>

                {/* Sandbox / Testing Simulator Button */}
                {config.autoSettlementDemo && (
                  <div
                    className={`p-3 rounded-2xl border text-center ${
                      isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-100 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Mode Demo / Uji Coba Sandbox Aktif
                    </div>
                    <button
                      type="button"
                      disabled={isProcessingSettlement}
                      onClick={handleSimulateSettlement}
                      className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-md shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessingSettlement ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                          <span>Memverifikasi Mutasi Bank...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>⚡ Simulasikan Pembayaran Berhasil (Tes Real-Time)</span>
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-slate-400 mt-1">
                      Klik tombol ini untuk meniru respon sukses dari Bank/Midtrans tanpa memotong
                      saldo nyata.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
