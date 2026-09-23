import React from 'react';
import { type InstructorPayrollRecord, generatePayrollWhatsAppSlip } from '../../services/adminStorage';
import { X, Printer, Send, Building2, Copy, Check } from 'lucide-react';

interface AdminPayrollSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
  payroll: InstructorPayrollRecord | null;
  isDark: boolean;
}

export const AdminPayrollSlipModal: React.FC<AdminPayrollSlipModalProps> = ({
  isOpen,
  onClose,
  payroll,
  isDark,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !payroll) return null;

  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  const cleanPhone = (payroll.instructorPhone || '').replace(/\D/g, '');
  const waMessage = generatePayrollWhatsAppSlip(payroll);
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`;

  const handleCopySlip = () => {
    navigator.clipboard.writeText(waMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div
        className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden my-8 transition-colors print:border-none print:shadow-none print:my-0 print:rounded-none ${
          isDark ? 'bg-[#121624] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Modal Top Actions (Hidden on Print) */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between print:hidden ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/70 border-amber-200/60'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
              Preview Slip Gaji Resmi A4
            </span>
            <span
              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                payroll.status === 'paid'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                  : payroll.status === 'approved'
                  ? 'bg-blue-500/10 text-blue-500 border border-blue-500/30'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
              }`}
            >
              {payroll.status.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySlip}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Pesan'}</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim WA</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Slip A4</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Slip Content */}
        <div className="p-8 sm:p-10 space-y-8 bg-white text-slate-900 font-sans print:p-0">
          {/* Header Kop Surat */}
          <div className="flex items-start justify-between border-b-2 border-amber-400 pb-6">
            <div className="flex items-center gap-4">
              <img
                src="/bee-mascot.png"
                alt="Beekoding"
                className="w-14 h-14 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 tracking-tight flex items-center gap-2">
                  <span>BEEKODING ACADEMY</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold">
                    OFFICIAL
                  </span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  PT Beekoding Edukasi Nusantara • Learning Innovation Hub
                </p>
                <p className="text-[11px] text-slate-400">
                  Jl. Telekomunikasi No. 01, Terusan Buahbatu, Bandung • finance@beekoding.id
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block">
                SLIP HONORARIUM MENGAJAR
              </span>
              <span className="text-lg font-black font-mono text-slate-900">
                {payroll.payrollNumber}
              </span>
              <div className="text-xs text-slate-500 mt-0.5">Periode: <strong>{payroll.period}</strong></div>
            </div>
          </div>

          {/* Info Penerima & Rekening */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Identitas Instruktur / Pendidik
              </span>
              <div className="text-sm font-black text-slate-900">{payroll.instructorName}</div>
              <div className="text-slate-600 font-medium">{payroll.instructorRole}</div>
              <div className="text-slate-500">Kontak WA: {payroll.instructorPhone}</div>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Rekening Pembayaran Tujuan
              </span>
              <div className="text-sm font-black text-slate-900 flex items-center justify-end gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{payroll.bankName} - {payroll.bankAccountNumber}</span>
              </div>
              <div className="text-slate-600 font-medium uppercase">a.n. {payroll.bankAccountHolder}</div>
              <div className="text-slate-500">
                Status: <strong className="uppercase text-emerald-600">{payroll.status}</strong>
                {payroll.paymentDate && ` • Tgl: ${payroll.paymentDate}`}
              </div>
            </div>
          </div>

          {/* Tabel Rincian Honor */}
          <div className="overflow-hidden border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                  <th className="py-3 px-4">Komponen Pendapatan & Keterangan</th>
                  <th className="py-3 px-4 text-center">Volume / Jam</th>
                  <th className="py-3 px-4 text-right">Tarif Satuan</th>
                  <th className="py-3 px-4 text-right">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {payroll.items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.description}</div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        {item.category === 'teaching_honor'
                          ? 'Honor Sesi Mengajar'
                          : item.category === 'performance_incentive'
                          ? 'Insentif Performa & Rating'
                          : item.category === 'attendance_bonus'
                          ? 'Bonus Kehadiran Disiplin'
                          : item.category === 'deduction'
                          ? 'Potongan'
                          : 'Tunjangan Operasional'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 font-medium">
                      {item.qty} {item.category === 'teaching_honor' ? 'Jam' : 'x'}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 font-mono">
                      {formatRupiah(item.rate)}
                    </td>
                    <td
                      className={`py-3 px-4 text-right font-black font-mono ${
                        item.total < 0 ? 'text-red-600' : 'text-slate-900'
                      }`}
                    >
                      {item.total < 0 ? `-${formatRupiah(Math.abs(item.total))}` : formatRupiah(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rangkuman Total Pembayaran */}
          <div className="flex items-start justify-between gap-6 pt-2">
            <div className="w-1/2 text-xs space-y-1 text-slate-500">
              <div className="font-bold text-slate-700">Catatan Pembayaran:</div>
              <p className="text-[11px] leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                {payroll.notes ||
                  'Slip honorarium resmi ini diterbitkan secara otomatis oleh sistem Beekoding Academy. Dana telah ditransfer ke rekening instruktur yang tertera.'}
              </p>
            </div>

            <div className="w-1/2 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Honor Pokok Mengajar:</span>
                <span className="font-mono font-bold">{formatRupiah(payroll.baseTeachingHonor)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Insentif & Bonus Kehadiran:</span>
                <span className="font-mono font-bold text-emerald-600">
                  +{formatRupiah(payroll.performanceIncentive + payroll.attendanceBonus + payroll.allowanceTotal)}
                </span>
              </div>
              {payroll.deductionsTotal > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>Total Potongan:</span>
                  <span className="font-mono font-bold">-{formatRupiah(payroll.deductionsTotal)}</span>
                </div>
              )}
              <div className="pt-2 border-t-2 border-slate-300 flex justify-between items-center text-sm">
                <span className="font-black text-slate-900 uppercase">Diterima Bersih:</span>
                <span className="text-xl font-black font-mono text-amber-600">
                  {formatRupiah(payroll.netTotalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Stempel & Tanda Tangan Resmi */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-12">
              <span className="text-slate-500 block">Diterima oleh Instruktur:</span>
              <div>
                <div className="font-bold text-slate-900 uppercase">{payroll.instructorName}</div>
                <div className="text-[11px] text-slate-400">Mentor Pengajar Beekoding</div>
              </div>
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <span className="text-slate-500 block">Disahkan oleh Finance & Academic Operations:</span>
              <div className="relative py-2">
                {/* Cap Stempel Lunas / Beekoding */}
                <div className="px-4 py-1 rounded-lg border-2 border-emerald-500 text-emerald-600 font-black text-xs uppercase tracking-widest rotate-[-6deg] opacity-80 inline-block">
                  BEEKODING • VERIFIED
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900">Febri Hasan, S.Kom., M.T.</div>
                <div className="text-[11px] text-slate-400">Chief Learning Officer & Assessment Lead</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
