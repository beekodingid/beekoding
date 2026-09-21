import React, { useState } from 'react';
import {
  X,
  Share2,
  Sparkles,
  User,
  Phone,
  Mail,
  Award,
  CreditCard,
  Building,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import {
  type AmbassadorProfile,
  type AmbassadorTier,
  type AmbassadorRole,
  createAmbassador,
  updateAmbassador,
} from '../../services/adminStorage';

interface AdminAmbassadorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (amb: AmbassadorProfile) => void;
  editingAmbassador: AmbassadorProfile | null;
  isDark: boolean;
}

export const AdminAmbassadorModal: React.FC<AdminAmbassadorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingAmbassador,
  isDark,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AmbassadorRole>('parent');
  const [referralCode, setReferralCode] = useState('');
  const [tier, setTier] = useState<AmbassadorTier>('bronze');
  const [bankName, setBankName] = useState('BCA');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [prevAmbId, setPrevAmbId] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(false);

  if (isOpen !== prevIsOpen || (editingAmbassador ? editingAmbassador.id !== prevAmbId : prevAmbId !== null)) {
    setPrevIsOpen(isOpen);
    setPrevAmbId(editingAmbassador ? editingAmbassador.id : null);
    if (editingAmbassador) {
      setName(editingAmbassador.name);
      setPhone(editingAmbassador.phone);
      setEmail(editingAmbassador.email || '');
      setRole(editingAmbassador.role);
      setReferralCode(editingAmbassador.referralCode);
      setTier(editingAmbassador.tier);
      setBankName(editingAmbassador.bankInfo?.bankName || 'BCA');
      setAccountNumber(editingAmbassador.bankInfo?.accountNumber || '');
      setAccountHolder(editingAmbassador.bankInfo?.accountHolder || '');
      setIsActive(editingAmbassador.isActive);
    } else {
      setName('');
      setPhone('');
      setEmail('');
      setRole('parent');
      setReferralCode('');
      setTier('bronze');
      setBankName('BCA');
      setAccountNumber('');
      setAccountHolder('');
      setIsActive(true);
    }
    setErrorMsg('');
  }

  if (!isOpen) return null;

  const generateSmartCode = () => {
    const base = name
      ? name.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase()
      : 'BEE';
    const num = Math.floor(100 + Math.random() * 900);
    setReferralCode(`${base || 'BEE'}-${num}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Mohon isi nama lengkap duta belajar.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Mohon isi nomor WhatsApp duta belajar.');
      return;
    }
    if (!referralCode.trim()) {
      setErrorMsg('Mohon tentukan kode referral unik.');
      return;
    }

    const bankInfo = accountNumber.trim()
      ? {
          bankName,
          accountNumber: accountNumber.trim(),
          accountHolder: accountHolder.trim() || name.trim(),
        }
      : undefined;

    if (editingAmbassador) {
      const updated = updateAmbassador(editingAmbassador.id, {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        role,
        referralCode: referralCode.trim().toUpperCase(),
        tier,
        bankInfo,
        isActive,
      });
      if (updated) {
        onSave(updated);
        onClose();
      }
    } else {
      const created = createAmbassador({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        role,
        referralCode: referralCode.trim().toUpperCase(),
        tier,
        bankInfo,
        isActive,
      });
      onSave(created);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border transition-all my-8 ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {editingAmbassador ? 'Sunting Data Duta Belajar' : 'Tambah Duta Belajar / Mitra Baru'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Kelola profil referral, kode unik, tingkatan komisi, dan rekening reward
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 text-sm rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nama */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                Nama Lengkap / Komite <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Bambang Pratama (Wali Kenzo)"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Nomor WA */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                Nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                Email (Opsional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="orangtua@email.com"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            {/* Peran Duta */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                Peran Duta
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as AmbassadorRole)}
                className={`w-full px-3 py-2 text-sm rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                }`}
              >
                <option value="parent">Wali Murid Aktif</option>
                <option value="student">Siswa Mandiri</option>
                <option value="school_partner">Mitra Sekolah / Komite</option>
                <option value="alumni">Alumni / Komunitas</option>
              </select>
            </div>
          </div>

          {/* Kode Referral & Tier */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Kode Referral Unik <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={generateSmartCode}
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Buat Acak
                </button>
              </div>
              <div className="relative">
                <Sparkles className="absolute left-3 top-3 w-4 h-4 text-amber-500" />
                <input
                  type="text"
                  required
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="MISAL: KENZO-BEE"
                  className={`w-full pl-9 pr-3 py-2 text-sm font-mono font-bold tracking-wider rounded-xl border transition-colors uppercase ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-amber-400 placeholder-slate-500 focus:border-amber-500'
                      : 'bg-amber-50/50 border-amber-300 text-amber-700 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-600 dark:text-slate-300">
                Tingkat / Tier Duta
              </label>
              <div className="relative">
                <Award className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as AmbassadorTier)}
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                      : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                  }`}
                >
                  <option value="bronze">Bronze (1-2 Teman)</option>
                  <option value="silver">Silver (3-5 Teman)</option>
                  <option value="gold">Gold (6-10 Teman)</option>
                  <option value="diamond">Diamond (11+ Teman / Mitra)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rekening Bank (Opsional untuk Transfer) */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Informasi Rekening Bank Pencairan (Opsional)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Nama Bank
                </label>
                <div className="relative">
                  <Building className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="BCA / Mandiri / BSI"
                    className={`w-full pl-8 pr-2 py-1.5 text-xs rounded-lg border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Nomor Rekening
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="8920192831"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-slate-500 mb-1">
                  Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder="a.n Bambang Pratama"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Status Keaktifan */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
            <div>
              <p className="text-xs font-semibold">Status Keaktifan Kode Referral</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Jika dinonaktifkan, pendaftar tidak dapat memakai kode ini untuk mendapatkan diskon
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
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
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              {editingAmbassador ? 'Simpan Perubahan' : 'Daftarkan Duta Belajar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
