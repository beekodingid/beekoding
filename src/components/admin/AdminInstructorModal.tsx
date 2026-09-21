import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Mail,
  Phone,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Award,
  Layers,
  GraduationCap,
} from 'lucide-react';
import type { InstructorRecord, InstructorRole } from '../../services/adminStorage';

interface AdminInstructorModalProps {
  instructor: InstructorRecord | null;
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

const ROLE_LABELS: Record<InstructorRole, { label: string; badgeClass: string }> = {
  lead_educator: {
    label: 'Lead Educator & Founder',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  },
  senior_mentor: {
    label: 'Senior Mentor',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
  },
  junior_mentor: {
    label: 'Junior Mentor',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  },
  curriculum_specialist: {
    label: 'Curriculum Specialist & Advisor',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
  },
};

export const AdminInstructorModal: React.FC<AdminInstructorModalProps> = ({
  instructor,
  isOpen,
  onClose,
  isDark = false,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !instructor) return null;

  const roleMeta = ROLE_LABELS[instructor.role] || {
    label: instructor.role,
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  const handleCopyProfile = () => {
    const text = [
      `*PROFIL MENTOR PENGAJAR BEEKODING*`,
      `Nama: ${instructor.name}`,
      `Jabatan: ${instructor.title}`,
      `Spesialisasi: ${instructor.specializations.join(', ')}`,
      `Rating Kepuasan: ${instructor.rating}.0 / 5.0 ⭐`,
      `Jam Mengajar: ${instructor.totalTeachingHours}+ Jam`,
      `Jenjang Mengajar: ${instructor.teachingTiers.map((t) => t.toUpperCase()).join(', ')}`,
      ``,
      `Tentang Mentor:`,
      `"${instructor.bio}"`,
      ``,
      `Kontak Resmi BeeKoding:`,
      `WhatsApp: https://wa.me/62${instructor.phone.replace(/\D/g, '').replace(/^0/, '')}`,
      `Email: ${instructor.email}`,
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWA = () => {
    const cleanPhone = instructor.phone.replace(/\D/g, '');
    const normalizedPhone = cleanPhone.startsWith('0')
      ? '62' + cleanPhone.substring(1)
      : cleanPhone.startsWith('62')
      ? cleanPhone
      : '62' + cleanPhone;

    const msg = `Halo ${instructor.name}! 👋\nKoordinasi dari tim operasional BeeKoding Academy terkait jadwal kelas mengajar.`;
    window.open(`https://wa.me/${normalizedPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const isImageAvatar =
    instructor.avatarUrlOrEmoji.startsWith('/') ||
    instructor.avatarUrlOrEmoji.startsWith('http') ||
    instructor.avatarUrlOrEmoji.startsWith('data:');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ${
          isDark ? 'bg-slate-900 border border-slate-700 text-slate-100' : 'bg-white border border-slate-200 text-slate-900'
        }`}
      >
        {/* Banner Header with Background Gradient */}
        <div className="relative bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 p-6 sm:p-8 text-slate-950">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Instructor Photo Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/90 border-2 border-white/60 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
              {isImageAvatar ? (
                <img
                  src={instructor.avatarUrlOrEmoji}
                  alt={instructor.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">{instructor.avatarUrlOrEmoji}</span>
              )}
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span
                  className={`px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border shadow-sm ${roleMeta.badgeClass}`}
                >
                  {roleMeta.label}
                </span>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                    instructor.status === 'active'
                      ? 'bg-emerald-500/20 text-emerald-950 border-emerald-600/40'
                      : instructor.status === 'on_leave'
                      ? 'bg-amber-500/20 text-amber-950 border-amber-600/40'
                      : 'bg-slate-500/20 text-slate-950 border-slate-600/40'
                  }`}
                >
                  {instructor.status === 'active'
                    ? '● Aktif Mengajar'
                    : instructor.status === 'on_leave'
                    ? '● Sedang Cuti'
                    : '● Nonaktif'}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] leading-tight">
                {instructor.name}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-slate-800 opacity-90">
                {instructor.title}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* 3 Metric Stat Highlights */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-1 text-amber-500 mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-black text-base">{instructor.rating}.0</span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Rating Siswa</p>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-1 text-blue-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-black text-base">{instructor.totalTeachingHours}j</span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Jam Mengajar</p>
            </div>

            <div
              className={`p-3 rounded-2xl border ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-center space-x-1 text-purple-500 mb-1">
                <Layers className="w-4 h-4" />
                <span className="font-black text-base">{instructor.assignedBatchesCount}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase">Batch Aktif</p>
            </div>
          </div>

          {/* Bio Section */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Biografi & Pendekatan Edukasi</span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {instructor.bio}
            </p>
          </div>

          {/* Specializations & Teaching Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Keahlian & Spesialisasi</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {instructor.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                <span>Jenjang Mengajar</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {instructor.teachingTiers.map((tier, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tier === 'junior'
                      ? 'Junior (6-9 thn)'
                      : tier === 'middle'
                      ? 'Middle (10-12 thn)'
                      : 'Teens (13-17 thn)'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div
            className={`p-4 rounded-2xl border space-y-2.5 text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp: {instructor.phone}</span>
              </div>
              <button
                onClick={handleOpenWA}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
              >
                <span>Chat WA</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Email Resmi: {instructor.email}</span>
              </div>
              <a
                href={`mailto:${instructor.email}`}
                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center space-x-1"
              >
                <span>Kirim Email</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={handleCopyProfile}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center space-x-1.5 transition-all ${
                copied
                  ? 'bg-emerald-500 text-white border-emerald-500'
                  : isDark
                  ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Profil Pengajar'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleOpenWA}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Hubungi via WhatsApp</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
