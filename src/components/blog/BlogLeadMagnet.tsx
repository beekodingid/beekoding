import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { saveInquiry } from '../../services/adminStorage';
import {
  Sparkles,
  Gift,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';

interface BlogLeadMagnetProps {
  articleTitle?: string;
  articleCategory?: string;
  onOpenTrialEvents?: () => void;
}

const AGE_TIERS = [
  { id: 'junior', label: 'Usia 6 - 9 Tahun (Visual Scratch & Logika Dasar)' },
  { id: 'middle', label: 'Usia 10 - 13 Tahun (Game Dev & Dasar Python)' },
  { id: 'teens', label: 'Usia 14 - 17 Tahun (Full-Stack Web & Artificial Intelligence)' },
];

export const BlogLeadMagnet: React.FC<BlogLeadMagnetProps> = ({
  articleTitle = 'Panduan Edukasi Beekoding',
  articleCategory = 'Coding Anak',
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();

  const [parentName, setParentName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedTier, setSelectedTier] = useState(AGE_TIERS[0].label);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = parentName.trim();
    let cleanPhone = whatsapp.trim().replace(/[^0-9+]/g, '');

    if (!cleanName) {
      setErrorMessage('Mohon isi nama Ayah / Bunda');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 9) {
      setErrorMessage('Mohon isi nomor WhatsApp aktif yang valid');
      return;
    }

    // Normalisasi awalan nomor WhatsApp Indonesia
    if (cleanPhone.startsWith('08')) {
      cleanPhone = '+62' + cleanPhone.slice(1);
    } else if (cleanPhone.startsWith('8')) {
      cleanPhone = '+62' + cleanPhone;
    } else if (!cleanPhone.startsWith('+')) {
      cleanPhone = '+' + cleanPhone;
    }

    setIsSubmitting(true);

    try {
      // Simpan lead prospek langsung ke database inquiry admin & Supabase
      saveInquiry({
        name: cleanName,
        email: `${cleanPhone.replace(/[^0-9]/g, '')}@lead.beekoding.id`,
        phone: cleanPhone,
        role: 'Orang Tua (Lead Magnet Blog)',
        program: `Lead Blog: ${articleCategory}`,
        message: `Minat Kelas: ${selectedTier}. Sumber artikel: "${articleTitle}".`,
        type: 'konsultasi',
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error saving blog lead:', err);
      setErrorMessage('Terjadi kendala saat menyimpan data. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDirectWhatsApp = () => {
    const message = `Halo Mentor Beekoding! Saya *${parentName}*. Saya baru saja membaca artikel "${articleTitle}" di Blog Beekoding dan ingin berkonsultasi mengenai kelas koding untuk ananda (*${selectedTier}*), serta mengklaim Voucher Belajar & Roadmap Belajarnya. Terima kasih!`;
    const targetUrl = `https://wa.me/6281818901737?text=${encodeURIComponent(message)}`;
    window.open(targetUrl, '_blank');
  };

  return (
    <section
      aria-label="Klaim Panduan & Voucher Belajar Beekoding"
      className={`my-10 p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 relative overflow-hidden ${
        isDark
          ? 'bg-gradient-to-br from-[#141926] via-[#10131d] to-[#161a29] border-amber-500/40 shadow-xl shadow-amber-500/5'
          : 'bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-white border-amber-300/90 shadow-lg shadow-amber-950/5'
      }`}
    >
      {/* Ambient Honey Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-sky-400/10 rounded-full blur-2xl pointer-events-none" />

      {isSubmitted ? (
        <div className="relative z-10 text-center py-6 sm:py-8 space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>

          <div className="space-y-1.5 max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Terima Kasih, Ayah / Bunda {parentName}! 🎉
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Nomor WhatsApp Anda (<strong>{whatsapp}</strong>) telah terdaftar di sistem admissions Beekoding. Tim konselor kami akan segera mengirimkan <strong>Roadmap Belajar Coding 2026</strong> dan kode voucher belajar khusus untuk putra-putri Anda.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleOpenDirectWhatsApp}
              className="px-6 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Buka WhatsApp Sekarang & Konsultasi Langsung</span>
            </button>

            {onOpenTrialEvents && (
              <button
                type="button"
                onClick={onOpenTrialEvents}
                className="px-5 py-3 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-amber-300 dark:border-slate-700 hover:border-amber-500 transition-colors cursor-pointer"
              >
                Lihat Jadwal Free Trial Class
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hook & Benefits */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400">
              <Gift className="w-3.5 h-3.5" />
              <span>Gratis & Eksklusif Pembaca Blog</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white leading-tight">
              Ingin Ananda Belajar Coding & AI Terarah Sejak Dini?
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Dapatkan <strong>Panduan Kurikulum & Roadmap Coding Anak 2026</strong> langsung ke WhatsApp Anda, plus <strong>Voucher Uji Coba Belajar Eksklusif</strong> senilai Rp 150.000 untuk kelas bersama mentor ramah anak.
            </p>

            {/* Checklist Value Points */}
            <div className="grid sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Roadmap Belajar Sesuai Usia</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Rekomendasi Software & Game Edukatif</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Konsultasi Diagnostik Minat Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Kelas Praktik Interaktif Live Mentor</span>
              </div>
            </div>
          </div>

          {/* Right Column: Fast Lead Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3.5 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-700/80 shadow-inner'
                  : 'bg-white border-amber-200/90 shadow-md'
              }`}
            >
              <div className="flex items-center justify-between pb-1 border-b border-amber-500/10">
                <span className="text-xs font-black font-['Space_Grotesk'] text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Klaim Panduan & Voucher Belajar</span>
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                  100% Gratis
                </span>
              </div>

              {errorMessage && (
                <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Form Input: Nama Orang Tua */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Nama Ayah / Bunda
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Contoh: Bunda Rina"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                    isDark
                      ? 'bg-slate-800/90 border-slate-700 text-white focus:border-amber-400'
                      : 'bg-slate-50 border-amber-200 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Form Input: Nomor WhatsApp */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 0812-3456-7890"
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none transition-all ${
                    isDark
                      ? 'bg-slate-800/90 border-slate-700 text-white focus:border-amber-400'
                      : 'bg-slate-50 border-amber-200 text-slate-900 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Form Select: Tingkatan Usia Anak */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  Jenjang Usia Ananda
                </label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/90 border-slate-700 text-white focus:border-amber-400'
                      : 'bg-slate-50 border-amber-200 text-slate-900 focus:border-amber-500'
                  }`}
                >
                  {AGE_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.label}>
                      {tier.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Mengirim Permohonan...</span>
                ) : (
                  <>
                    <span>Kirim Panduan via WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Privacy Reassurance */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] text-slate-500 dark:text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Privasi terjamin 100%. Bebas spam promosi.</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
