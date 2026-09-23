import React, { useState, useMemo } from 'react';
import {
  type StudentProject,
  type ParentTestimonial,
  type ProjectPlatform,
  getStudentProjects,
  createStudentProject,
  updateStudentProject,
  deleteStudentProject,
  toggleProjectFeatured,
  resetStudentProjectsToDefault,
  getParentTestimonials,
  createParentTestimonial,
  updateParentTestimonial,
  deleteParentTestimonial,
  toggleTestimonialFeatured,
  resetParentTestimonialsToDefault,
  calculateShowcaseStats,
  getBatches,
  getSubmissions,
  getInquiries,
} from '../../services/adminStorage';
import { AdminShowcaseModal } from './AdminShowcaseModal';
import {
  Rocket,
  Plus,
  Search,
  Star,
  Sparkles,
  Edit2,
  Trash2,
  RotateCcw,
  ExternalLink,
  MessageSquareQuote,
  Eye,
  Heart,
  X,
} from 'lucide-react';

interface AdminShowcaseProps {
  isDark: boolean;
}

export const AdminShowcase: React.FC<AdminShowcaseProps> = ({ isDark }) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'testimonials'>('projects');
  const [projects, setProjects] = useState<StudentProject[]>(() => getStudentProjects());
  const [testimonials, setTestimonials] = useState<ParentTestimonial[]>(() =>
    getParentTestimonials()
  );

  // Filter Projects
  const [projectSearch, setProjectSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState<ProjectPlatform | 'all'>('all');
  const [featuredOnlyProjects, setFeaturedOnlyProjects] = useState(false);

  // Filter Testimonials
  const [testiSearch, setTestiSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [featuredOnlyTesti, setFeaturedOnlyTesti] = useState(false);

  // Modal State
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<StudentProject | null>(null);

  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
  const [editingTesti, setEditingTesti] = useState<ParentTestimonial | null>(null);

  // Alert State
  const [alertInfo, setAlertInfo] = useState<{
    type: 'success' | 'info' | 'error';
    message: string;
  } | null>(null);

  const showAlert = (type: 'success' | 'info' | 'error', message: string) => {
    setAlertInfo({ type, message });
    setTimeout(() => setAlertInfo(null), 3500);
  };

  // Form State Proyek
  const [formProjTitle, setFormProjTitle] = useState('');
  const [formProjStudentName, setFormProjStudentName] = useState('');
  const [formProjStudentAge, setFormProjStudentAge] = useState(9);
  const [formProjGradeLevel, setFormProjGradeLevel] = useState('Kelas 4 SD');
  const [formProjPlatform, setFormProjPlatform] = useState<ProjectPlatform>('scratch');
  const [formProjProgramType, setFormProjProgramType] = useState('Junior Explorer');
  const [formProjDescription, setFormProjDescription] = useState('');
  const [formProjDemoUrl, setFormProjDemoUrl] = useState('');
  const [formProjThumbnail, setFormProjThumbnail] = useState('🐝');
  const [formProjTags, setFormProjTags] = useState('Game Logic, Scratch');
  const [formProjIsFeatured, setFormProjIsFeatured] = useState(true);
  const [formProjFeedback, setFormProjFeedback] = useState('');

  // Form State Testimoni
  const [formTestiParentName, setFormTestiParentName] = useState('');
  const [formTestiChildName, setFormTestiChildName] = useState('');
  const [formTestiChildAge, setFormTestiChildAge] = useState(8);
  const [formTestiRole, setFormTestiRole] = useState('Orang Tua Murid (Bandung)');
  const [formTestiRating, setFormTestiRating] = useState(5);
  const [formTestiReview, setFormTestiReview] = useState('');
  const [formTestiProgram, setFormTestiProgram] = useState(
    'Junior Explorer: Visual Scratch & AI Logic'
  );
  const [formTestiAvatar, setFormTestiAvatar] = useState('👩‍💼');
  const [formTestiIsFeatured, setFormTestiIsFeatured] = useState(true);

  // Data sumber quick pick
  const batches = useMemo(() => getBatches(), []);
  const submissions = useMemo(() => getSubmissions(), []);
  const inquiries = useMemo(() => getInquiries(), []);

  // Metrik Statistik
  const stats = useMemo(() => calculateShowcaseStats(projects, testimonials), [
    projects,
    testimonials,
  ]);

  // Filter Proyek
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchPlatform = platformFilter === 'all' || p.platform === platformFilter;
      const matchFeatured = !featuredOnlyProjects || p.isFeatured;
      const q = projectSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.studentName.toLowerCase().includes(q) ||
        p.programType.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchPlatform && matchFeatured && matchSearch;
    });
  }, [projects, platformFilter, featuredOnlyProjects, projectSearch]);

  // Filter Testimoni
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchRating = ratingFilter === 'all' || t.rating === ratingFilter;
      const matchFeatured = !featuredOnlyTesti || t.isFeatured;
      const q = testiSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        t.parentName.toLowerCase().includes(q) ||
        t.childName.toLowerCase().includes(q) ||
        t.review.toLowerCase().includes(q) ||
        t.programTaken.toLowerCase().includes(q);

      return matchRating && matchFeatured && matchSearch;
    });
  }, [testimonials, ratingFilter, featuredOnlyTesti, testiSearch]);

  // Handler Buka Modal Buat Proyek
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setFormProjTitle('');
    setFormProjStudentName('');
    setFormProjStudentAge(9);
    setFormProjGradeLevel('Kelas 4 SD');
    setFormProjPlatform('scratch');
    setFormProjProgramType('Junior Explorer');
    setFormProjDescription('');
    setFormProjDemoUrl('');
    setFormProjThumbnail('🐝');
    setFormProjTags('Game Logic, Scratch');
    setFormProjIsFeatured(true);
    setFormProjFeedback('');
    setIsProjectModalOpen(true);
  };

  // Handler Buka Modal Edit Proyek
  const handleOpenEditProject = (p: StudentProject) => {
    setEditingProject(p);
    setFormProjTitle(p.title);
    setFormProjStudentName(p.studentName);
    setFormProjStudentAge(p.studentAge);
    setFormProjGradeLevel(p.gradeLevel);
    setFormProjPlatform(p.platform);
    setFormProjProgramType(p.programType);
    setFormProjDescription(p.description);
    setFormProjDemoUrl(p.demoUrl || '');
    setFormProjThumbnail(p.thumbnailEmojiOrUrl);
    setFormProjTags(p.tags.join(', '));
    setFormProjIsFeatured(p.isFeatured);
    setFormProjFeedback(p.instructorFeedback || '');
    setIsProjectModalOpen(true);
  };

  // Handler Simpan Proyek
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProjTitle.trim() || !formProjStudentName.trim()) {
      showAlert('error', 'Judul proyek dan nama siswa wajib diisi.');
      return;
    }

    const tagsArray = formProjTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingProject) {
      const updated = updateStudentProject(editingProject.id, {
        title: formProjTitle.trim(),
        studentName: formProjStudentName.trim(),
        studentAge: Number(formProjStudentAge) || 9,
        gradeLevel: formProjGradeLevel.trim(),
        platform: formProjPlatform,
        programType: formProjProgramType.trim(),
        description: formProjDescription.trim(),
        demoUrl: formProjDemoUrl.trim() || undefined,
        thumbnailEmojiOrUrl: formProjThumbnail.trim() || '🚀',
        tags: tagsArray,
        isFeatured: formProjIsFeatured,
        instructorFeedback: formProjFeedback.trim() || undefined,
      });

      if (updated) {
        setProjects(getStudentProjects());
        showAlert('success', `Karya proyek "${updated.title}" berhasil diperbarui.`);
        setIsProjectModalOpen(false);
      }
    } else {
      const newProj = createStudentProject({
        title: formProjTitle.trim(),
        studentName: formProjStudentName.trim(),
        studentAge: Number(formProjStudentAge) || 9,
        gradeLevel: formProjGradeLevel.trim(),
        platform: formProjPlatform,
        programType: formProjProgramType.trim(),
        description: formProjDescription.trim(),
        demoUrl: formProjDemoUrl.trim() || undefined,
        thumbnailEmojiOrUrl: formProjThumbnail.trim() || '🚀',
        tags: tagsArray,
        isFeatured: formProjIsFeatured,
        completionDate: new Date().toISOString().split('T')[0],
        instructorFeedback: formProjFeedback.trim() || undefined,
      });

      setProjects(getStudentProjects());
      showAlert(
        'success',
        `Karya proyek "${newProj.title}" buatan ananda ${newProj.studentName} berhasil ditambahkan.`
      );
      setIsProjectModalOpen(false);
    }
  };

  // Toggle Featured Proyek
  const handleToggleFeaturedProj = (id: string) => {
    const isFeat = toggleProjectFeatured(id);
    setProjects(getStudentProjects());
    showAlert(
      'info',
      isFeat
        ? 'Proyek kini ditampilkan sebagai Unggulan di Beranda Website.'
        : 'Proyek dinonaktifkan dari Beranda Website.'
    );
  };

  // Hapus Proyek
  const handleDeleteProj = (p: StudentProject) => {
    if (confirm(`Hapus karya proyek "${p.title}" buatan ${p.studentName}?`)) {
      deleteStudentProject(p.id);
      setProjects(getStudentProjects());
      showAlert('info', `Karya "${p.title}" telah dihapus.`);
    }
  };

  // Reset Proyek
  const handleResetProjects = () => {
    if (confirm('Pulihkan data karya proyek ke sampel bawaan pabrik?')) {
      resetStudentProjectsToDefault();
      setProjects(getStudentProjects());
      showAlert('success', 'Karya proyek berhasil direset ke standar pabrik.');
    }
  };

  // Handler Buka Modal Buat Testimoni
  const handleOpenCreateTesti = () => {
    setEditingTesti(null);
    setFormTestiParentName('');
    setFormTestiChildName('');
    setFormTestiChildAge(8);
    setFormTestiRole('Orang Tua Murid (Bandung)');
    setFormTestiRating(5);
    setFormTestiReview('');
    setFormTestiProgram('Junior Explorer: Visual Scratch & AI Logic');
    setFormTestiAvatar('👩‍💼');
    setFormTestiIsFeatured(true);
    setIsTestiModalOpen(true);
  };

  // Handler Buka Modal Edit Testimoni
  const handleOpenEditTesti = (t: ParentTestimonial) => {
    setEditingTesti(t);
    setFormTestiParentName(t.parentName);
    setFormTestiChildName(t.childName);
    setFormTestiChildAge(t.childAge);
    setFormTestiRole(t.roleOrProfession);
    setFormTestiRating(t.rating);
    setFormTestiReview(t.review);
    setFormTestiProgram(t.programTaken);
    setFormTestiAvatar(t.avatarEmojiOrUrl || '👩‍💼');
    setFormTestiIsFeatured(t.isFeatured);
    setIsTestiModalOpen(true);
  };

  // Handler Simpan Testimoni
  const handleSaveTesti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTestiParentName.trim() || !formTestiReview.trim()) {
      showAlert('error', 'Nama orang tua dan ulasan testimoni wajib diisi.');
      return;
    }

    if (editingTesti) {
      const updated = updateParentTestimonial(editingTesti.id, {
        parentName: formTestiParentName.trim(),
        childName: formTestiChildName.trim(),
        childAge: Number(formTestiChildAge) || 8,
        roleOrProfession: formTestiRole.trim(),
        rating: formTestiRating,
        review: formTestiReview.trim(),
        programTaken: formTestiProgram.trim(),
        avatarEmojiOrUrl: formTestiAvatar.trim() || '👩‍💼',
        isFeatured: formTestiIsFeatured,
      });

      if (updated) {
        setTestimonials(getParentTestimonials());
        showAlert('success', `Ulasan dari ${updated.parentName} berhasil diperbarui.`);
        setIsTestiModalOpen(false);
      }
    } else {
      const newTesti = createParentTestimonial({
        parentName: formTestiParentName.trim(),
        childName: formTestiChildName.trim(),
        childAge: Number(formTestiChildAge) || 8,
        roleOrProfession: formTestiRole.trim(),
        rating: formTestiRating,
        review: formTestiReview.trim(),
        programTaken: formTestiProgram.trim(),
        avatarEmojiOrUrl: formTestiAvatar.trim() || '👩‍💼',
        isFeatured: formTestiIsFeatured,
      });

      setTestimonials(getParentTestimonials());
      showAlert('success', `Testimoni baru dari ${newTesti.parentName} berhasil dicatat.`);
      setIsTestiModalOpen(false);
    }
  };

  // Toggle Featured Testimoni
  const handleToggleFeaturedTesti = (id: string) => {
    const isFeat = toggleTestimonialFeatured(id);
    setTestimonials(getParentTestimonials());
    showAlert(
      'info',
      isFeat
        ? 'Ulasan kini ditampilkan di Beranda Website.'
        : 'Ulasan dinonaktifkan dari Beranda Website.'
    );
  };

  // Hapus Testimoni
  const handleDeleteTesti = (t: ParentTestimonial) => {
    if (confirm(`Hapus testimoni dari ${t.parentName}?`)) {
      deleteParentTestimonial(t.id);
      setTestimonials(getParentTestimonials());
      showAlert('info', `Testimoni dari ${t.parentName} telah dihapus.`);
    }
  };

  // Reset Testimoni
  const handleResetTestimonials = () => {
    if (confirm('Pulihkan data testimoni ke sampel bawaan pabrik?')) {
      resetParentTestimonialsToDefault();
      setTestimonials(getParentTestimonials());
      showAlert('success', 'Data testimoni berhasil direset ke standar pabrik.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {alertInfo && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold transition-all shadow-md ${
            alertInfo.type === 'success'
              ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : alertInfo.type === 'error'
              ? 'bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400'
              : 'bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 flex-shrink-0" />
            <span>{alertInfo.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlertInfo(null)}
            className="p-1 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Halaman & Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
            <Rocket className="w-6 h-6 text-amber-500" />
            <span>Showcase Karya Siswa & Testimoni</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Pameran proyek inovasi buatan murid dan kurasi ulasan kepuasan wali murid.
          </p>
        </div>

        {/* Sub-Tab Switcher Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-slate-800 self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveSubTab('projects')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'projects'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Rocket className="w-4 h-4" />
            <span>Karya Proyek Siswa ({projects.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('testimonials')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'testimonials'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Testimoni Orang Tua ({testimonials.length})</span>
          </button>
        </div>
      </div>

      {/* 4 Kartu Metrik Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Karya Siswa
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Rocket className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
            {stats.totalProjects} Proyek
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scratch, Roblox, Python & Web
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Unggulan di Beranda
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {stats.featuredProjects} Ditampilkan
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Muncul di showcase landing page
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Rata-Rata Rating
            </span>
            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center font-bold">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-yellow-600 dark:text-yellow-400 tracking-tight flex items-center gap-1.5">
            <span>{stats.avgRating}</span>
            <span className="text-sm font-normal text-slate-400">/ 5.0 ⭐</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dari {stats.totalTestimonials} ulasan wali murid
          </p>
        </div>

        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ulasan di Beranda
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
            {stats.featuredTestimonials} Terpilih
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Testimoni aktif di website
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: KARYA & PROYEK SISWA                               */}
      {/* ========================================================= */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          {/* Action Bar & Filter Proyek */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                placeholder="Cari judul proyek, nama siswa, atau tag teknologi..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {projectSearch && (
                <button
                  type="button"
                  onClick={() => setProjectSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Platform */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
              {(
                [
                  { id: 'all', label: 'Semua Platform' },
                  { id: 'scratch', label: '🐱 Scratch' },
                  { id: 'roblox', label: '🟥 Roblox' },
                  { id: 'python', label: '🐍 Python' },
                  { id: 'web', label: '🌐 Web' },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPlatformFilter(item.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                    platformFilter === item.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : isDark
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setFeaturedOnlyProjects(!featuredOnlyProjects)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  featuredOnlyProjects
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Star className="w-3 h-3" />
                <span>Unggulan Saja</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetProjects}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
                title="Reset Sampel Proyek"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenCreateProject}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Karya</span>
              </button>
            </div>
          </div>

          {/* Grid Proyek Siswa */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400">
                <Rocket className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
                <p className="font-semibold text-sm">Tidak ada proyek yang sesuai filter</p>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah kata kunci atau pilih Semua Platform.
                </p>
              </div>
            ) : (
              filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  className={`rounded-2xl border p-5 transition-all flex flex-col justify-between group ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                      : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Row: Platform & Featured Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {proj.platform.toUpperCase()}
                      </span>

                      {/* Featured Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeaturedProj(proj.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          proj.isFeatured
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                        }`}
                        title="Klik untuk ubah status tampil di Beranda"
                      >
                        <Star
                          className={`w-3 h-3 ${proj.isFeatured ? 'fill-amber-500 text-amber-500' : ''}`}
                        />
                        <span>{proj.isFeatured ? 'Di Beranda' : 'Arsip'}</span>
                      </button>
                    </div>

                    {/* Thumbnail & Title */}
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-2xl flex-shrink-0 select-none">
                        {proj.thumbnailEmojiOrUrl}
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Oleh: <strong className="text-slate-800 dark:text-slate-200">{proj.studentName}</strong> ({proj.studentAge} thn)
                        </p>
                      </div>
                    </div>

                    {/* Description snippet */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 my-2.5 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {proj.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats bar */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-rose-500" />
                          <span>{proj.likesCount}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-sky-500" />
                          <span>{proj.viewsCount}</span>
                        </span>
                      </div>
                      <span>{proj.completionDate}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60 mt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="flex-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail & Ulasan</span>
                    </button>

                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 transition-colors cursor-pointer"
                        title="Buka Demo Live"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => handleOpenEditProject(proj)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Karya"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteProj(proj)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Karya"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: TESTIMONI & REVIEW ORANG TUA                       */}
      {/* ========================================================= */}
      {activeSubTab === 'testimonials' && (
        <div className="space-y-6">
          {/* Action Bar & Filter Testimoni */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={testiSearch}
                onChange={(e) => setTestiSearch(e.target.value)}
                placeholder="Cari nama orang tua, anak, atau isi ulasan..."
                className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
              {testiSearch && (
                <button
                  type="button"
                  onClick={() => setTestiSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filter Rating & Featured */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
              <select
                value={ratingFilter}
                onChange={(e) =>
                  setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className={`px-3 py-1.5 rounded-xl font-semibold border focus:outline-none ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <option value="all">Semua Bintang</option>
                <option value="5">⭐⭐⭐⭐⭐ (5 Bintang)</option>
                <option value="4">⭐⭐⭐⭐ (4 Bintang)</option>
              </select>

              <button
                type="button"
                onClick={() => setFeaturedOnlyTesti(!featuredOnlyTesti)}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                  featuredOnlyTesti
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <Star className="w-3 h-3" />
                <span>Di Beranda Saja</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetTestimonials}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
                title="Reset Sampel Testimoni"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenCreateTesti}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Catat Testimoni</span>
              </button>
            </div>
          </div>

          {/* Grid Testimoni */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTestimonials.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-400">
                <MessageSquareQuote className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
                <p className="font-semibold text-sm">Tidak ada testimoni yang sesuai filter</p>
                <p className="text-xs text-slate-500 mt-1">
                  Coba ubah kata kunci atau reset filter rating.
                </p>
              </div>
            ) : (
              filteredTestimonials.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-5 transition-all flex flex-col justify-between group ${
                    isDark
                      ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                      : 'bg-white border-slate-200 hover:border-amber-400 shadow-sm'
                  }`}
                >
                  <div>
                    {/* Top Row: Stars & Featured Toggle */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {/* Star Rating Display */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Featured Toggle */}
                      <button
                        type="button"
                        onClick={() => handleToggleFeaturedTesti(t.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          t.isFeatured
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
                        }`}
                        title="Klik untuk tampilkan di halaman depan website"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{t.isFeatured ? 'Di Beranda' : 'Draft'}</span>
                      </button>
                    </div>

                    {/* Review Quote */}
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      "{t.review}"
                    </p>

                    {/* Program Label */}
                    <span className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 mb-3">
                      {t.programTaken}
                    </span>

                    {/* Parent Details */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center text-xl flex-shrink-0 select-none">
                        {t.avatarEmojiOrUrl || '👨‍💼'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                          {t.parentName}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {t.roleOrProfession}
                        </p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                          Orang tua dari: <strong>{t.childName}</strong> ({t.childAge} thn)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center justify-end gap-1.5 border-t border-slate-100 dark:border-slate-800/60 mt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenEditTesti(t)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Testimoni"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteTesti(t)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Testimoni"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal Detail & Pratinjau Proyek */}
      {selectedProject && (
        <AdminShowcaseModal
          project={selectedProject}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
          onToggleFeatured={handleToggleFeaturedProj}
        />
      )}

      {/* Modal Form Tambah / Edit Proyek */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingProject ? 'Edit Karya Siswa' : 'Tambah Karya Siswa Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Kurasi karya game, animasi, atau website untuk portofolio akademi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Pick Siswa */}
            {!editingProject && (
              <div
                className={`p-4 border-b text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-amber-500/5 border-amber-500/10'
                }`}
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilih Siswa dari Peserta Terdaftar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {batches.flatMap((b) =>
                    b.enrolledStudents.slice(0, 3).map((stu) => (
                      <button
                        key={`${b.id}-${stu.id}`}
                        type="button"
                        onClick={() => {
                          setFormProjStudentName(stu.studentName);
                          if (b.tier === 'junior') {
                            setFormProjPlatform('scratch');
                            setFormProjProgramType('Junior Explorer');
                          } else if (b.tier === 'middle') {
                            setFormProjPlatform('roblox');
                            setFormProjProgramType('Middle Coder');
                          } else {
                            setFormProjPlatform('web');
                            setFormProjProgramType('Teens Innovator');
                          }
                          showAlert('info', `Data ${stu.studentName} dimuat ke form.`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors font-medium cursor-pointer"
                      >
                        {stu.studentName}
                      </button>
                    ))
                  )}
                  {submissions.slice(0, 3).map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setFormProjStudentName(sub.profile.childName);
                        setFormProjStudentAge(sub.profile.childAge);
                        setFormProjGradeLevel(sub.profile.gradeLevel);
                        showAlert('info', `Data ${sub.profile.childName} dimuat ke form.`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-colors font-medium cursor-pointer"
                    >
                      {sub.profile.childName} (Tes Bakat)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Proyek */}
            <form onSubmit={handleSaveProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Judul Karya Proyek *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProjTitle}
                    onChange={(e) => setFormProjTitle(e.target.value)}
                    placeholder="Contoh: Bee Math Adventure Quest"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ikon / Emoji Proyek
                  </label>
                  <input
                    type="text"
                    value={formProjThumbnail}
                    onChange={(e) => setFormProjThumbnail(e.target.value)}
                    placeholder="🐝 atau URL gambar"
                    className={`w-full px-3 py-2 rounded-xl border text-center text-base ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Siswa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formProjStudentName}
                    onChange={(e) => setFormProjStudentName(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Usia (Tahun)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={18}
                    value={formProjStudentAge}
                    onChange={(e) => setFormProjStudentAge(Number(e.target.value) || 9)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jenjang / Kelas
                  </label>
                  <input
                    type="text"
                    value={formProjGradeLevel}
                    onChange={(e) => setFormProjGradeLevel(e.target.value)}
                    placeholder="Kelas 4 SD"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Platform Teknologi
                  </label>
                  <select
                    value={formProjPlatform}
                    onChange={(e) => setFormProjPlatform(e.target.value as ProjectPlatform)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="scratch">🐱 Scratch 3.0</option>
                    <option value="roblox">🟥 Roblox Studio (Lua)</option>
                    <option value="python">🐍 Python 3</option>
                    <option value="web">🌐 Modern Web (HTML/React)</option>
                    <option value="ai">🤖 Artificial Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Program Akademi
                  </label>
                  <input
                    type="text"
                    value={formProjProgramType}
                    onChange={(e) => setFormProjProgramType(e.target.value)}
                    placeholder="Junior Explorer"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tautan Demo Live (Scratch URL / Roblox Link / Web Link)
                </label>
                <input
                  type="url"
                  value={formProjDemoUrl}
                  onChange={(e) => setFormProjDemoUrl(e.target.value)}
                  placeholder="https://scratch.mit.edu/projects/..."
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Deskripsi Karya Proyek *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formProjDescription}
                  onChange={(e) => setFormProjDescription(e.target.value)}
                  placeholder="Ceritakan tentang cara kerja game/proyek ini..."
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tag Konsep & Teknologi (Pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={formProjTags}
                  onChange={(e) => setFormProjTags(e.target.value)}
                  placeholder="Game Logic, Loop, Variable, Physics"
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Catatan Evaluasi / Apresiasi Instruktur
                </label>
                <textarea
                  rows={2}
                  value={formProjFeedback}
                  onChange={(e) => setFormProjFeedback(e.target.value)}
                  placeholder="Ulasan instruktur tentang kelebihan kode ananda..."
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="projIsFeatured"
                  checked={formProjIsFeatured}
                  onChange={(e) => setFormProjIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                />
                <label
                  htmlFor="projIsFeatured"
                  className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Tampilkan sebagai Proyek Unggulan di Beranda Website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer"
                >
                  {editingProject ? 'Simpan Perubahan' : 'Terbitkan Karya'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Tambah / Edit Testimoni */}
      {isTestiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div
            className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {editingTesti ? 'Edit Testimoni' : 'Catat Testimoni Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">Ulasan kepuasan wali murid Beekoding</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTestiModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Pick Wali Murid */}
            {!editingTesti && (
              <div
                className={`p-4 border-b text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-amber-500/5 border-amber-500/10'
                }`}
              >
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Pilih Cepat dari Data Wali Murid:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {submissions.slice(0, 4).map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => {
                        setFormTestiParentName(sub.profile.parentName || 'Wali Murid');
                        setFormTestiChildName(sub.profile.childName);
                        setFormTestiChildAge(sub.profile.childAge);
                        if (sub.recommendedProgram?.title) {
                          setFormTestiProgram(sub.recommendedProgram.title);
                        }
                        showAlert('info', `Data ${sub.profile.parentName} dimuat ke form.`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-slate-950 transition-colors font-medium cursor-pointer"
                    >
                      {sub.profile.parentName || sub.profile.childName}
                    </button>
                  ))}
                  {inquiries.slice(0, 2).map((inq) => (
                    <button
                      key={inq.id}
                      type="button"
                      onClick={() => {
                        setFormTestiParentName(inq.name);
                        setFormTestiChildName(inq.name);
                        showAlert('info', `Data ${inq.name} dimuat ke form.`);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300 hover:bg-sky-500 hover:text-white transition-colors font-medium cursor-pointer"
                    >
                      {inq.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Form Testimoni */}
            <form onSubmit={handleSaveTesti} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Orang Tua / Wali *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTestiParentName}
                    onChange={(e) => setFormTestiParentName(e.target.value)}
                    placeholder="Bambang Pratama"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Profesi / Lokasi Wali
                  </label>
                  <input
                    type="text"
                    value={formTestiRole}
                    onChange={(e) => setFormTestiRole(e.target.value)}
                    placeholder="Wiraswasta, Bandung"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nama Anak
                  </label>
                  <input
                    type="text"
                    value={formTestiChildName}
                    onChange={(e) => setFormTestiChildName(e.target.value)}
                    placeholder="Kenzo Alvaro"
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Usia Anak (Tahun)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={18}
                    value={formTestiChildAge}
                    onChange={(e) => setFormTestiChildAge(Number(e.target.value) || 8)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Program yang Diikuti
                  </label>
                  <input
                    type="text"
                    value={formTestiProgram}
                    onChange={(e) => setFormTestiProgram(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rating Kepuasan (Bintang)
                  </label>
                  <select
                    value={formTestiRating}
                    onChange={(e) => setFormTestiRating(Number(e.target.value) || 5)}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang - Sangat Puas)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang - Puas)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang - Cukup)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Isi Ulasan Testimoni *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formTestiReview}
                  onChange={(e) => setFormTestiReview(e.target.value)}
                  placeholder="Ceritakan pengalaman belajar ananda dan perkembangan logikanya..."
                  className={`w-full px-3 py-2 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="testiIsFeatured"
                  checked={formTestiIsFeatured}
                  onChange={(e) => setFormTestiIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                />
                <label
                  htmlFor="testiIsFeatured"
                  className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Tampilkan Testimoni Ini di Halaman Beranda Website
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsTestiModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm cursor-pointer"
                >
                  {editingTesti ? 'Simpan Perubahan' : 'Catat Testimoni'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
