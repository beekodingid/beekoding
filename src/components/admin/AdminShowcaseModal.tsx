import React from 'react';
import { type StudentProject } from '../../services/adminStorage';
import {
  ExternalLink,
  Star,
  Eye,
  Heart,
  X,
  Sparkles,
  Share2,
  Calendar,
  User,
  GraduationCap,
} from 'lucide-react';

interface AdminShowcaseModalProps {
  project: StudentProject;
  isDark: boolean;
  onClose: () => void;
  onToggleFeatured?: (id: string) => void;
}

export const AdminShowcaseModal: React.FC<AdminShowcaseModalProps> = ({
  project,
  isDark,
  onClose,
  onToggleFeatured,
}) => {
  const getPlatformBadge = () => {
    switch (project.platform) {
      case 'scratch':
        return {
          label: 'Scratch 3.0',
          bgColor: 'bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30',
          icon: '🐱',
        };
      case 'roblox':
        return {
          label: 'Roblox Studio (Lua)',
          bgColor: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30',
          icon: '🟥',
        };
      case 'python':
        return {
          label: 'Python 3',
          bgColor: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30',
          icon: '🐍',
        };
      case 'web':
        return {
          label: 'Modern Web (React)',
          bgColor: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
          icon: '🌐',
        };
      case 'ai':
        return {
          label: 'Artificial Intelligence',
          bgColor: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
          icon: '🤖',
        };
    }
  };

  const badge = getPlatformBadge();

  const handleShareWhatsApp = () => {
    const text = [
      `🚀 *KARYA KREATIF SISWA BEEKODING* 🐝`,
      `---------------------------------------`,
      `*Judul Proyek*: ${project.title}`,
      `*Karya Ananda*: ${project.studentName} (${project.studentAge} thn - ${project.gradeLevel})`,
      `*Platform*: ${badge.label}`,
      `*Program*: ${project.programType}`,
      ``,
      `*Deskripsi*:`,
      project.description,
      ``,
      project.demoUrl ? `🔗 *Coba Demo Live*: ${project.demoUrl}` : '',
      ``,
      `_Beekoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Header Modal */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{badge.icon}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Pratinjau Karya Siswa
                </h3>
                {project.isFeatured && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Unggulan Beranda</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">{project.programType}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleFeatured && (
              <button
                type="button"
                onClick={() => onToggleFeatured(project.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  project.isFeatured
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-500/20 hover:text-amber-500'
                }`}
                title="Tampilkan proyek ini di halaman depan website"
              >
                <Star className="w-3.5 h-3.5" />
                <span>{project.isFeatured ? 'Di Beranda' : 'Jadikan Unggulan'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
              title="Bagikan via WhatsApp"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-xs">
          {/* Project Visual Banner */}
          <div className="relative rounded-2xl bg-gradient-to-tr from-amber-500/20 via-orange-500/10 to-amber-400/20 p-8 border border-amber-500/30 flex flex-col items-center justify-center text-center overflow-hidden">
            <span className="text-6xl mb-3 drop-shadow-md select-none">
              {project.thumbnailEmojiOrUrl}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border mb-2 ${badge.bgColor}`}
            >
              {badge.label}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {project.title}
            </h2>

            {/* Live Demo Button */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Mainkan / Buka Demo Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Student Profile & Meta Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Kreator / Siswa:
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {project.studentName}
                  </h4>
                  <p className="text-slate-500 text-[11px]">
                    {project.studentAge} Tahun • {project.gradeLevel}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Statistik & Waktu:
              </span>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <strong>{project.likesCount}</strong> Suka
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-sky-500" />
                  <strong>{project.viewsCount}</strong> Dilihat
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                  <span>{project.completionDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Deskripsi Proyek:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/30 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {project.description}
            </p>
          </div>

          {/* Tags Chips */}
          {project.tags.length > 0 && (
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Konsep & Teknologi:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Instructor Evaluation Feedback */}
          {project.instructorFeedback && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-700 dark:text-slate-300">
              <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                Catatan Evaluasi Instruktur:
              </span>
              <p className="italic text-[11px] leading-relaxed">{project.instructorFeedback}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
