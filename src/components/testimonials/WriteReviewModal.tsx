import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { createParentTestimonial, type ParentTestimonial } from '../../services/adminStorage';
import { getSupabaseClient } from '../../services/supabaseClient';
import {
  Star,
  X,
  CheckCircle2,
  Sparkles,
  Send,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newReview: ParentTestimonial) => void;
  defaultProgram?: string;
}

const PROGRAM_OPTIONS = [
  'Junior Explorer: Visual Scratch 3.0 (Usia 6-10 Thn)',
  'Middle Coder: Python & Game Dev Roblox (Usia 11-14 Thn)',
  'Teens Innovator: Fullstack Web & AI App (Usia 15-18 Thn)',
  'Summer AI & Coding Bootcamp 2026',
  'Kelas Privat 1-on-1 Personalized Mentor',
  'Free Trial Class & Asesmen Bakat Logika',
];

const AVATAR_OPTIONS = [
  { emoji: '👩‍💼', label: 'Bunda Profesional' },
  { emoji: '👨‍💼', label: 'Ayah Profesional' },
  { emoji: '👩‍🏫', label: 'Bunda Pendidik' },
  { emoji: '👨‍💻', label: 'Ayah Praktisi IT' },
  { emoji: '👩‍⚕️', label: 'Bunda Medis' },
  { emoji: '👨‍⚕️', label: 'Ayah Medis' },
  { emoji: '🏡', label: 'Ibu Rumah Tangga' },
  { emoji: '🌟', label: 'Bintang' },
  { emoji: '🐝', label: 'Lebah Beekoding' },
  { emoji: '🚀', label: 'Roket Kreator' },
];

const RATING_DESCRIPTIONS: Record<number, { text: string; color: string }> = {
  5: { text: 'Luar Biasa & Sangat Direkomendasikan! ⭐⭐⭐⭐⭐', color: 'text-amber-500 font-extrabold' },
  4: { text: 'Sangat Puas, Materi Terstruktur & Bermanfaat ⭐⭐⭐⭐', color: 'text-amber-600 dark:text-amber-400 font-bold' },
  3: { text: 'Cukup Baik & Pembelajaran Menyenangkan ⭐⭐⭐', color: 'text-yellow-600 font-semibold' },
  2: { text: 'Perlu Sedikit Peningkatan ⭐⭐', color: 'text-slate-500' },
  1: { text: 'Kurang Sesuai Ekspektasi ⭐', color: 'text-rose-500' },
};

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultProgram,
}) => {
  const { isDark } = useTheme();

  // Form State
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState<number>(9);
  const [roleOrProfession, setRoleOrProfession] = useState('');
  const [programTaken, setProgramTaken] = useState(defaultProgram || PROGRAM_OPTIONS[0]);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('👩‍💼');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentDisplayRating = hoverRating !== null ? hoverRating : rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validasi input
    if (!parentName.trim()) {
      setErrorMessage('Mohon cantumkan nama Ayah/Bunda.');
      return;
    }
    if (!childName.trim()) {
      setErrorMessage('Mohon cantumkan nama ananda/putra/putri.');
      return;
    }
    if (!review.trim() || review.trim().length < 20) {
      setErrorMessage('Mohon tuliskan ulasan minimal 20 karakter agar bermanfaat bagi orang tua lainnya.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Simpan ke local/admin storage agar seketika tampil di website
      const created = createParentTestimonial({
        parentName: parentName.trim(),
        childName: childName.trim(),
        childAge: Number(childAge) || 8,
        roleOrProfession: roleOrProfession.trim() || 'Wali Murid Beekoding',
        programTaken: programTaken,
        rating: rating,
        review: review.trim(),
        avatarEmojiOrUrl: avatarEmoji,
        isFeatured: true,
      });

      // 2. Jika Supabase aktif, kirim salinan ke database di latar belakang
      try {
        const client = getSupabaseClient();
        if (client) {
          await client.from('parent_testimonials').insert([
            {
              id: created.id,
              parent_name: created.parentName,
              child_name: created.childName,
              role_or_city: created.roleOrProfession,
              avatar: created.avatarEmojiOrUrl,
              content: created.review,
              rating: created.rating,
              is_featured: true,
            },
          ]);
        }
      } catch (err) {
        // Fallback gracefully jika offline/koneksi lambat
        console.warn('Supabase async review sync:', err);
      }

      // 3. Trigger storage event agar tab atau komponen lain re-render
      window.dispatchEvent(new Event('storage'));

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess(created);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi kendala saat mengirim ulasan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setParentName('');
    setChildName('');
    setChildAge(9);
    setRoleOrProfession('');
    setReview('');
    setRating(5);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div
        className={`relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border transition-all duration-300 ${
          isDark
            ? 'bg-[#10141f] border-amber-500/30 text-slate-100'
            : 'bg-white border-amber-300 text-slate-900'
        }`}
      >
        {/* Header Modal */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950">
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-950 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider bg-black/15 text-slate-950 px-3 py-1 rounded-full w-fit mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Proof & Komunitas Orang Tua</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] leading-tight">
            Bagikan Pengalaman Belajar Buah Hati
          </h3>
          <p className="text-xs sm:text-sm font-semibold opacity-90 mt-1.5 leading-relaxed">
            Ulasan Ayah & Bunda sangat berharga untuk membantu orang tua lainnya di Indonesia menemukan pendidikan digital terbaik.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[78vh] overflow-y-auto space-y-6">
          {isSubmitted ? (
            /* Success State */
            <div className="text-center py-8 px-4 space-y-5 animate-in fade-in duration-300">
              <div className="w-18 h-18 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-black font-['Space_Grotesk']">
                  Terima Kasih, Bunda / Ayah {parentName}!
                </h4>
                <p className={`text-sm mt-2 max-w-md mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ulasan dan rating bintang <span className="font-bold text-amber-500">({rating} ⭐)</span> untuk ananda{' '}
                  <span className="font-bold">{childName}</span> telah berhasil dipublikasikan dan langsung tampil di halaman testimoni Beekoding.
                </p>
              </div>

              {/* Review Mini Preview Card */}
              <div
                className={`p-4 rounded-2xl border text-left text-xs max-w-md mx-auto ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-amber-50/60 border-amber-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-amber-500">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Terverifikasi
                  </span>
                </div>
                <p className="italic text-slate-700 dark:text-slate-200 mb-2 font-medium">"{review}"</p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {avatarEmoji} {parentName} • Orang tua {childName} ({childAge} thn)
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition-all cursor-pointer"
              >
                Kembali ke Halaman Utama
              </button>
            </div>
          ) : (
            /* Form Input */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-500 text-xs font-semibold">
                  ⚠️ {errorMessage}
                </div>
              )}

              {/* 1. Interactive Star Rating Selector */}
              <div className="space-y-2 text-center p-4 rounded-2xl border bg-amber-500/5 border-amber-500/20">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Beri Rating Kepuasan (1 - 5 Bintang)
                </label>

                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= currentDisplayRating;
                    return (
                      <button
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 text-amber-500 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                        aria-label={`Beri ${starValue} bintang`}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            isFilled ? 'fill-amber-400 text-amber-500 drop-shadow-sm' : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className={`text-xs ${RATING_DESCRIPTIONS[currentDisplayRating]?.color}`}>
                  {RATING_DESCRIPTIONS[currentDisplayRating]?.text}
                </p>
              </div>

              {/* 2. Parent Name & Child Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Nama Ayah / Bunda *
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="Contoh: Bunda Ratna / Ayah Bambang"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Profesi / Domisili
                  </label>
                  <input
                    type="text"
                    value={roleOrProfession}
                    onChange={(e) => setRoleOrProfession(e.target.value)}
                    placeholder="Contoh: Ibu Rumah Tangga (Jakarta Selatan)"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Nama Putra / Putri *
                  </label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="Contoh: Kenzo Alvaro"
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                    Usia Anak (Thn)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={18}
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value) || 8)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* 3. Program Taken */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                  Program / Kursus yang Diikuti
                </label>
                <select
                  value={programTaken}
                  onChange={(e) => setProgramTaken(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-all cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                  }`}
                >
                  {PROGRAM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Avatar Emoji Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-slate-400">
                  Pilih Avatar / Ikon Profil
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_OPTIONS.map((item) => (
                    <button
                      type="button"
                      key={item.emoji}
                      onClick={() => setAvatarEmoji(item.emoji)}
                      title={item.label}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all cursor-pointer border ${
                        avatarEmoji === item.emoji
                          ? 'bg-amber-400/20 border-amber-500 scale-110 shadow-sm'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-100 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Review Text */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Ceritakan Pengalaman Belajar & Perkembangan Anak *
                  </label>
                  <span className={`text-[11px] ${review.length < 20 ? 'text-amber-500' : 'text-slate-400'}`}>
                    {review.length}/600 karakter (min. 20)
                  </span>
                </div>
                <textarea
                  required
                  rows={4}
                  maxLength={600}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Ceritakan bagaimana minat, logika koding, atau rasa percaya diri buah hati bertumbuh selama belajar di Beekoding..."
                  className={`w-full p-4 rounded-2xl text-xs sm:text-sm border transition-all resize-none ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500'
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Privacy Notice */}
              <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-500/5 p-3 rounded-xl">
                <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Ulasan akan langsung dipublikasikan dengan badge terverifikasi. Kami menjamin kerahasiaan nomor WhatsApp & data pribadi keluarga Anda.
                </span>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                    isDark ? 'border-slate-800 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ulasan & Rating'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
