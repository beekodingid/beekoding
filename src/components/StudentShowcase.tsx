import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  type StudentProject,
  type ParentTestimonial,
  type ProjectPlatform,
  getStudentProjects,
  getParentTestimonials,
} from '../services/adminStorage';
import {
  Rocket,
  Star,
  ExternalLink,
  Heart,
  Eye,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle,
  Play,
  X,
  User,
  ArrowRight,
} from 'lucide-react';

interface StudentShowcaseProps {
  onOpenTalentAssessment?: () => void;
  onOpenConsultation?: () => void;
}

const PLATFORM_META: Record<
  ProjectPlatform,
  { label: string; badgeClass: string; icon: string }
> = {
  scratch: {
    label: 'Scratch 3.0',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    icon: '🐱',
  },
  roblox: {
    label: 'Roblox Studio Lua',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    icon: '🧱',
  },
  python: {
    label: 'Python 3',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    icon: '🐍',
  },
  web: {
    label: 'Modern Web / React',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    icon: '⚡',
  },
  ai: {
    label: 'AI & Prompt Engineering',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    icon: '🤖',
  },
};

export const StudentShowcase: React.FC<StudentShowcaseProps> = ({
  onOpenTalentAssessment,
  onOpenConsultation,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials'>('projects');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);

  // Dynamic state loaded from localStorage / adminStorage
  const [allProjects, setAllProjects] = useState<StudentProject[]>(() => getStudentProjects());
  const [allTestimonials, setAllTestimonials] = useState<ParentTestimonial[]>(() =>
    getParentTestimonials()
  );

  const loadData = () => {
    setAllProjects(getStudentProjects());
    setAllTestimonials(getParentTestimonials());
  };

  useEffect(() => {
    // Sync when storage changes (e.g. admin toggles featured in another tab)
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === 'beekoding_admin_projects' ||
        e.key === 'beekoding_admin_testimonials' ||
        !e.key
      ) {
        loadData();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Filter projects: featured only on public website (or all if none featured)
  const featuredProjects = allProjects.filter((p) => p.isFeatured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects;

  const filteredProjects =
    selectedPlatform === 'all'
      ? displayProjects
      : displayProjects.filter((p) => p.platform === selectedPlatform);

  // Filter testimonials: featured only
  const featuredTestimonials = allTestimonials.filter((t) => t.isFeatured);
  const displayTestimonials =
    featuredTestimonials.length > 0 ? featuredTestimonials : allTestimonials;

  // Average Rating
  const avgRating =
    displayTestimonials.length > 0
      ? (
          displayTestimonials.reduce((acc, curr) => acc + curr.rating, 0) /
          displayTestimonials.length
        ).toFixed(1)
      : '5.0';

  return (
    <section
      id="showcase"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#0b0e14] border-amber-500/20' : 'bg-[#fffdfa] border-amber-300/60'
      }`}
    >
      {/* Glow decorative gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-sm ${
              isDark
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Portofolio & Bukti Nyata Belajar</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Karya Siswa & Cerita{' '}
            <span className="text-gradient-honey">Bangga Orang Tua</span>
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Bukan sekadar teori hafalan kode. Di Beekoding, anak-anak merancang game interaktif,
            dunia 3D, dan aplikasi web bertenaga AI ciptaan mereka sendiri sejak hari pertama.
          </p>
        </div>

        {/* Tab Selector: Proyek Siswa vs Testimoni Orang Tua */}
        <div className="flex justify-center mb-10">
          <div
            className={`inline-flex p-1.5 rounded-2xl border shadow-inner ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100/90 border-slate-200'
            }`}
          >
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                activeTab === 'projects'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Rocket className="w-4 h-4" />
              <span>Karya Proyek Siswa</span>
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                  activeTab === 'projects'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {displayProjects.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center space-x-2 ${
                activeTab === 'testimonials'
                  ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Testimoni Orang Tua ({avgRating} ⭐)</span>
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                  activeTab === 'testimonials'
                    ? 'bg-slate-950/20 text-slate-950'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {displayTestimonials.length}
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: KARYA PROYEK SISWA                                */}
        {/* ======================================================== */}
        {activeTab === 'projects' && (
          <div>
            {/* Platform Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedPlatform === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm'
                    : isDark
                    ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Semua Platform ({displayProjects.length})
              </button>

              {(Object.keys(PLATFORM_META) as ProjectPlatform[]).map((platform) => {
                const count = displayProjects.filter((p) => p.platform === platform).length;
                if (count === 0) return null;
                const meta = PLATFORM_META[platform];
                return (
                  <button
                    key={platform}
                    onClick={() => setSelectedPlatform(platform)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                      selectedPlatform === platform
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                        : isDark
                        ? 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const meta = PLATFORM_META[project.platform] || PLATFORM_META.scratch;
                return (
                  <div
                    key={project.id}
                    className={`group rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                      isDark
                        ? 'bg-[#111420]/90 border-amber-500/20 hover:border-amber-400/60 hover:shadow-xl hover:shadow-amber-500/5'
                        : 'bg-white border-amber-200/80 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-900/5'
                    }`}
                  >
                    <div>
                      {/* Top Row: Thumbnail emoji & Platform Badge */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-300/40 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                          {project.thumbnailEmojiOrUrl}
                        </div>

                        <span
                          className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center space-x-1 ${meta.badgeClass}`}
                        >
                          <span>{meta.icon}</span>
                          <span>{meta.label}</span>
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3
                        className={`text-lg font-bold font-['Space_Grotesk'] mb-2 group-hover:text-amber-500 transition-colors line-clamp-1 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Creator Info */}
                      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {project.studentName}
                        </span>
                        <span>•</span>
                        <span>Usia {project.studentAge} thn</span>
                        <span>•</span>
                        <span className="text-[11px]">{project.gradeLevel}</span>
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {project.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div
                      className={`pt-3 border-t flex items-center justify-between text-xs ${
                        isDark ? 'border-slate-800' : 'border-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3 text-slate-400 text-[11px]">
                        <span className="flex items-center space-x-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                          <span>{project.likesCount}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span>{project.viewsCount}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                        >
                          Detail
                        </button>

                        {project.demoUrl ? (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center space-x-1 shadow-sm transition-all font-['Space_Grotesk']"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Demo</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white flex items-center space-x-1 transition-colors"
                          >
                            <span>Lihat</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: TESTIMONI & REVIEW WALI MURID                     */}
        {/* ======================================================== */}
        {activeTab === 'testimonials' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${
                    isDark
                      ? 'bg-[#111420]/90 border-amber-500/20 hover:border-amber-400/50'
                      : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-md shadow-amber-900/5'
                  }`}
                >
                  <div>
                    {/* Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                          {testimonial.rating}.0
                        </span>
                      </div>
                      <Quote className="w-6 h-6 text-amber-500/30" />
                    </div>

                    {/* Review Text */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 italic ${
                        isDark ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      "{testimonial.review}"
                    </p>
                  </div>

                  {/* Parent Profile Box */}
                  <div
                    className={`pt-4 border-t flex items-center space-x-3.5 ${
                      isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-lg font-bold text-slate-950 shrink-0 shadow-sm">
                      {testimonial.avatarEmojiOrUrl || '👩‍💼'}
                    </div>

                    <div className="space-y-0.5 overflow-hidden">
                      <div className="flex items-center space-x-1.5">
                        <h4
                          className={`font-bold text-xs sm:text-sm truncate ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {testimonial.parentName}
                        </h4>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {testimonial.roleOrProfession}
                      </p>
                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">
                        Orang tua dari {testimonial.childName} ({testimonial.childAge} thn) •{' '}
                        {testimonial.programTaken}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div
          className={`mt-16 p-8 sm:p-10 rounded-3xl border text-center relative overflow-hidden ${
            isDark
              ? 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#111420] border-amber-500/30'
              : 'bg-gradient-to-br from-amber-50 via-white to-amber-100/50 border-amber-300'
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mulai Perjalanan Kreator Digital Anak Anda</span>
            </div>

            <h3
              className={`text-2xl sm:text-3xl font-black font-['Space_Grotesk'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Ingin Anak Anda Mampu Membuat Game & Aplikasi Seperti Ini?
            </h3>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              Cari tahu kecerdasan digital & minat logika buah hati Anda dalam 10 menit melalui tes asesmen bakat 8 pilar kami, 100% gratis dengan laporan rapor radar interaktif.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {onOpenTalentAssessment && (
                <button
                  type="button"
                  onClick={onOpenTalentAssessment}
                  className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center space-x-2 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all font-['Space_Grotesk'] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Coba Tes Bakat Anak (Gratis)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {onOpenConsultation ? (
                <button
                  type="button"
                  onClick={onOpenConsultation}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Konsultasi Pilihan Modul
                </button>
              ) : (
                <a
                  href="#contact"
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-colors ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                      : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Konsultasi Pilihan Modul
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detail Project Preview Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ${
              isDark
                ? 'bg-slate-900 border border-slate-700 text-slate-100'
                : 'bg-white border border-slate-200 text-slate-900'
            }`}
          >
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-6 text-slate-950 relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-white/40 flex items-center justify-center text-3xl shadow-sm">
                  {selectedProject.thumbnailEmojiOrUrl}
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/20 text-slate-950">
                    {PLATFORM_META[selectedProject.platform]?.label || selectedProject.platform}
                  </span>
                  <h3 className="text-xl font-black font-['Space_Grotesk'] leading-snug">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-900 mt-2">
                <span>Dibuat oleh {selectedProject.studentName}</span>
                <span>•</span>
                <span>Usia {selectedProject.studentAge} thn</span>
                <span>•</span>
                <span>{selectedProject.gradeLevel}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Deskripsi Karya Proyek
                </h4>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Konsep Algoritma & Fitur Logika
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Instructor Feedback Note */}
              {selectedProject.instructorFeedback && (
                <div
                  className={`p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700 text-slate-200'
                      : 'bg-amber-50/50 border-amber-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Catatan Apresiasi Instruktur Beekoding:</span>
                  </div>
                  <p className="text-xs italic leading-relaxed text-slate-600 dark:text-slate-300">
                    "{selectedProject.instructorFeedback}"
                  </p>
                </div>
              )}

              {/* Stats & Completion Date */}
              <div
                className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span className="font-bold">{selectedProject.likesCount} Likes</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Eye className="w-4 h-4" />
                    <span className="font-bold">{selectedProject.viewsCount} Views</span>
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Selesai: {selectedProject.completionDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Tutup
                </button>

                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center space-x-2 shadow-md transition-all font-['Space_Grotesk']"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Buka & Mainkan Demo Proyek</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
