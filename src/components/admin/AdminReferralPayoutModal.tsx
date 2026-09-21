import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle2,
  Building,
  Receipt,
  Sparkles,
} from 'lucide-react';
import {
  type ReferralRecord,
  type ReferralRewardType,
  getAmbassadors,
} from '../../services/adminStorage';

interface AdminReferralPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  referral: ReferralRecord | null;
  onConfirmPayout: (referralId: string, rewardType: ReferralRewardType, notes: string) => void;
  isDark: boolean;
}

export const AdminReferralPayoutModal: React.FC<AdminReferralPayoutModalProps> = ({
  isOpen,
  onClose,
  referral,
  onConfirmPayout,
  isDark,
}) => {
  const [rewardType, setRewardType] = useState<ReferralRewardType>('tuition_discount');
  const [notes, setNotes] = useState('');

  const ambassadors = getAmbassadors();
  const matchedAmb = ambassadors.find((a) => a.id === referral?.ambassadorId || a.referralCode === referral?.ambassadorCode);

  const [prevId, setPrevId] = useState<string | null>(null);

  if (referral && referral.id !== prevId) {
    setPrevId(referral.id);
    setRewardType(referral.rewardType || 'tuition_discount');
    setNotes(
      referral.notes ||
        (referral.rewardType === 'tuition_discount'
          ? 'Potongan langsung pada invoice SPP periode berikutnya.'
          : 'Transfer komisi referral via rekening terdaftar.')
    );
  }

  if (!isOpen || !referral) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmPayout(referral.id, rewardType, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl border transition-all my-8 ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Pencairan Reward Duta Belajar</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Persetujuan komisi atas referral murid yang telah resmi bergabung
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Ringkasan Referral */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">ID Referral:</span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{referral.id}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Nama Murid Baru:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{referral.referredStudentName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Program Koding:</span>
              <span className="font-medium text-amber-600 dark:text-amber-400">{referral.targetCourse}</span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-slate-200 dark:border-slate-700/60 pt-2">
              <span className="text-slate-500">Duta Pengajak:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{referral.ambassadorName}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Kode Referral:</span>
              <span className="px-2 py-0.5 rounded-md font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {referral.ambassadorCode}
              </span>
            </div>
          </div>

          {/* Reward Amount Highlight */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500 text-white">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Reward Rupiah</p>
                <p className="text-base font-extrabold">Rp {referral.rewardForAmbassadorRp.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500 text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Bonus Gamifikasi</p>
                <p className="text-base font-extrabold">+{referral.rewardBeeXp} Bee-XP</p>
              </div>
            </div>
          </div>

          {/* Metode Pencairan */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-300">
              Pilih Metode Penyaluran Reward
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  rewardType === 'tuition_discount'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Potongan SPP</span>
                  <input
                    type="radio"
                    name="rewardType"
                    checked={rewardType === 'tuition_discount'}
                    onChange={() => setRewardType('tuition_discount')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Dipotong langsung pada invoice iuran kursus bulan depan
                </span>
              </label>

              <label
                className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-all ${
                  rewardType === 'bank_transfer'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Transfer Bank</span>
                  <input
                    type="radio"
                    name="rewardType"
                    checked={rewardType === 'bank_transfer'}
                    onChange={() => setRewardType('bank_transfer')}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Ditransfer ke rekening bank pribadi / komite duta
                </span>
              </label>
            </div>
          </div>

          {/* Info Bank Duta jika Transfer */}
          {rewardType === 'bank_transfer' && (
            <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 dark:bg-blue-950/20 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-300 mb-1">
                <Building className="w-3.5 h-3.5" />
                <span>Rekening Tujuan Transfer</span>
              </div>
              {matchedAmb?.bankInfo?.accountNumber ? (
                <div className="space-y-1 text-slate-600 dark:text-slate-300">
                  <p>
                    <span className="text-slate-400">Bank:</span>{' '}
                    <span className="font-semibold">{matchedAmb.bankInfo.bankName}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">No. Rekening:</span>{' '}
                    <span className="font-mono font-bold">{matchedAmb.bankInfo.accountNumber}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Atas Nama:</span>{' '}
                    <span className="font-semibold">{matchedAmb.bankInfo.accountHolder}</span>
                  </p>
                </div>
              ) : (
                <p className="text-slate-500 italic text-[11px]">
                  Duta belum mendaftarkan nomor rekening bank di profilnya. Silakan konfirmasi via WhatsApp ke {matchedAmb?.phone || referral.ambassadorName}.
                </p>
              )}
            </div>
          )}

          {/* Catatan / Nomor Ref Transfer */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
              Catatan Pencairan / Bukti Transfer
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: No Ref Transfer TRF-BCA-981293 atau Diterapkan di invoice SPP Okt 2026"
              className={`w-full px-3 py-2 text-xs rounded-xl border transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-emerald-500'
                  : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-emerald-500'
              }`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Konfirmasi & Selesaikan Pencairan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
