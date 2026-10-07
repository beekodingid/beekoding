import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  getBlogArticles,
  saveBlogArticle,
  deleteBlogArticle,
  resetBlogArticlesToDefault,
  fetchBlogArticlesFromCloud,
  pushBlogArticleToSupabase,
  type BlogArticle,
} from '../../services/blogStorage';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import { onStorageUpdate } from '../../services/adminStorage';
import { readFileAsDataUrl, uploadToSupabaseStorage } from '../../services/supabaseStorage';
import { BLOG_CATEGORIES } from '../../data/blogArticles';
import { MarkdownRenderer } from '../blog/MarkdownRenderer';
import { formatBlogDate } from '../blog/BlogView';
import { calculateReadTime, countWords, formatReadTime } from '../../utils/readTime';
import {
  BookOpen,
  Plus,
  Search,
  Edit3,
  Trash2,
  Cloud,
  RefreshCw,
  Database,
  Check,
  Copy,
  Upload,
  Eye,
  X,
  Sparkles,
  Code,
  List,
  ListOrdered,
  Quote,
  Bold,
  Italic,
  Link2,
  Minus,
  Share2,
  Clock,
  Zap,
  Globe,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  CornerDownRight,
  ShieldCheck,
  Heart,
  Send,
  MessageCircle,
} from 'lucide-react';
import {
  getAllComments,
  updateCommentStatus,
  deleteComment,
  addComment as addBlogComment,
  generateWhatsAppCommentForwardUrl,
  type BlogComment,
} from '../../services/blogCommentsStorage';

interface AdminBlogProps {
  isDark?: boolean;
  onOpenArticleInWeb?: (slug: string) => void;
}

export const AdminBlog: React.FC<AdminBlogProps> = ({ isDark: propIsDark, onOpenArticleInWeb }) => {
  const { isDark: themeIsDark } = useTheme();
  const isDark = propIsDark ?? themeIsDark;
  const [articles, setArticles] = useState<BlogArticle[]>(() => getBlogArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<BlogArticle | null>(null);
  const [sqlModalOpen, setSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formCategory, setFormCategory] = useState<'Coding Anak' | 'Artificial Intelligence' | 'Parenting Digital' | 'Game Dev'>('Coding Anak');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('Tim Akademik Beekoding');
  const [formAuthorRole, setFormAuthorRole] = useState('Curriculum & Pedagogy Lead');
  const [formAuthorAvatar, setFormAuthorAvatar] = useState('/bee-mascot.png');
  const [formTagsString, setFormTagsString] = useState('Coding Anak, Logika');
  const [formStatus, setFormStatus] = useState<'published' | 'draft'>('published');
  const [editorTab, setEditorTab] = useState<'write' | 'preview' | 'social'>('write');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Kalkulasi otomatis jumlah kata dan durasi baca (WPM)
  const autoWordCount = useMemo(() => countWords(formContent), [formContent]);
  const autoReadTime = useMemo(() => calculateReadTime(formContent), [formContent]);

  // Sub-tab: 'articles' or 'comments'
  const [mainTab, setMainTab] = useState<'articles' | 'comments'>('articles');
  const [commentsList, setCommentsList] = useState<BlogComment[]>(() => getAllComments());
  const [commentSearch, setCommentSearch] = useState('');
  const [commentStatusFilter, setCommentStatusFilter] = useState<'all' | 'approved' | 'pending' | 'spam'>('all');
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyMentorName, setReplyMentorName] = useState('Kak Febri Hasan (Mentor)');

  // Sync listener
  useEffect(() => {
    const unsub = onStorageUpdate((type) => {
      if (type === 'blog' || type === 'all') {
        setArticles(getBlogArticles());
        setCommentsList(getAllComments());
      }
    });
    return unsub;
  }, []);

  const refreshList = () => {
    setArticles(getBlogArticles());
    setCommentsList(getAllComments());
  };

  const handleApproveComment = (id: string) => {
    updateCommentStatus(id, 'approved');
    setCommentsList(getAllComments());
  };

  const handleSpamComment = (id: string) => {
    updateCommentStatus(id, 'spam');
    setCommentsList(getAllComments());
  };

  const handleDeleteComment = (id: string) => {
    if (!window.confirm('Hapus komentar ini secara permanen?')) return;
    deleteComment(id);
    setCommentsList(getAllComments());
  };

  const handleSendMentorReply = async (comment: BlogComment) => {
    if (!replyText.trim()) return;
    await addBlogComment({
      articleSlug: comment.articleSlug,
      authorName: replyMentorName.trim(),
      authorRole: 'Mentor & Curriculum Lead Beekoding',
      content: replyText.trim(),
      parentId: comment.id,
      isMentor: true,
    });
    setReplyText('');
    setReplyingCommentId(null);
    setCommentsList(getAllComments());
  };

  // Filtered list
  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCat = categoryFilter === 'Semua' || art.category === categoryFilter;
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && art.status !== 'draft') ||
        (statusFilter === 'draft' && art.status === 'draft');
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.slug.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.tags?.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchStatus && matchSearch;
    });
  }, [articles, categoryFilter, statusFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.status !== 'draft').length;
    const draft = total - published;
    const categoriesCount = new Set(articles.map((a) => a.category)).size;
    return { total, published, draft, categoriesCount };
  }, [articles]);

  const filteredComments = useMemo(() => {
    return commentsList.filter((c) => {
      const matchStatus =
        commentStatusFilter === 'all' ? true : c.status === commentStatusFilter;
      const q = commentSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.authorName.toLowerCase().includes(q) ||
        c.content.toLowerCase().includes(q) ||
        c.articleSlug.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [commentsList, commentStatusFilter, commentSearch]);

  const commentStats = useMemo(() => {
    const total = commentsList.length;
    const approved = commentsList.filter((c) => c.status === 'approved').length;
    const pending = commentsList.filter((c) => c.status === 'pending').length;
    const mentors = commentsList.filter((c) => c.isMentor).length;
    return { total, approved, pending, mentors };
  }, [commentsList]);

  const handleOpenNewModal = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormCategory('Coding Anak');
    setFormCoverImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80');
    setFormContent(`## Pendahuluan\n\nTulis isi artikel edukasi di sini...\n\n### Sub-topik Utama\n\nPenjelasan detail dan contoh praktis.`);
    setFormAuthorName('Tim Akademik Beekoding');
    setFormAuthorRole('Curriculum & Pedagogy Lead');
    setFormAuthorAvatar('/bee-mascot.png');
    setFormTagsString('Coding Anak, Pemula, Logika');
    setFormStatus('published');
    setEditorTab('write');
    setModalOpen(true);
  };

  const handleOpenEditModal = (article: BlogArticle) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormSlug(article.slug);
    setFormExcerpt(article.excerpt);
    setFormCategory(article.category);
    setFormCoverImage(article.coverImage);
    setFormContent(article.content);
    setFormAuthorName(article.author.name);
    setFormAuthorRole(article.author.role);
    setFormAuthorAvatar(article.author.avatar);
    setFormTagsString(article.tags?.join(', ') || '');
    setFormStatus(article.status === 'draft' ? 'draft' : 'published');
    setEditorTab('write');
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingArticle) {
      // Auto-generate slug
      const slugCandidate = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setFormSlug(slugCandidate);
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      if (isSupabaseConfigured()) {
        const res = await uploadToSupabaseStorage('showcase', file, 'blog-covers');
        if (res.success && res.url) {
          setFormCoverImage(res.url);
          setIsUploadingImage(false);
          return;
        }
      }
      const dataUrl = await readFileAsDataUrl(file);
      setFormCoverImage(dataUrl);
    } catch (err) {
      console.warn('Gagal upload gambar cover:', err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert('Judul artikel wajib diisi!');
      return;
    }
    if (!formSlug.trim()) {
      alert('Slug URL artikel wajib diisi!');
      return;
    }

    const tagsArray = formTagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<BlogArticle> = {
      id: editingArticle?.id || `blog-${formSlug}`,
      slug: formSlug.trim().toLowerCase(),
      title: formTitle.trim(),
      excerpt: formExcerpt.trim(),
      category: formCategory,
      coverImage: formCoverImage.trim(),
      content: formContent.trim(),
      author: {
        name: formAuthorName.trim() || 'Tim Akademik Beekoding',
        role: formAuthorRole.trim() || 'Curriculum & Pedagogy Lead',
        avatar: formAuthorAvatar.trim() || '/bee-mascot.png',
      },
      tags: tagsArray.length > 0 ? tagsArray : ['Edukasi'],
      readTimeMinutes: autoReadTime,
      status: formStatus,
      publishedAt: editingArticle?.publishedAt || new Date().toISOString().split('T')[0],
    };

    await saveBlogArticle(payload);
    refreshList();
    setModalOpen(false);
  };

  const handleDelete = async (article: BlogArticle) => {
    const ok = window.confirm(`Apakah Anda yakin ingin menghapus artikel: "${article.title}"?`);
    if (!ok) return;

    await deleteBlogArticle(article.slug);
    refreshList();
  };

  const handleResetDefaults = () => {
    const ok = window.confirm(
      'Apakah Anda yakin ingin mengembalikan seluruh artikel ke data bawaan awal (6 artikel panduan)? Artikel kustom akan terhapus.'
    );
    if (!ok) return;

    resetBlogArticlesToDefault();
    refreshList();
  };

  const handleSyncCloud = async () => {
    if (!isSupabaseConfigured()) {
      alert('Koneksi Supabase belum terkonfigurasi di Pengaturan sistem!');
      return;
    }

    setIsSyncing(true);
    setSyncStatusMsg('Menyinkronkan artikel dengan Supabase Cloud...');
    try {
      // 1. Push local articles to Supabase
      const currentList = getBlogArticles();
      for (const art of currentList) {
        await pushBlogArticleToSupabase(art);
      }

      // 2. Fetch latest from Supabase
      const cloudArticles = await fetchBlogArticlesFromCloud();
      if (cloudArticles) {
        setArticles(cloudArticles);
      } else {
        refreshList();
      }

      setSyncStatusMsg('Sinkronisasi artikel dengan Cloud Supabase berhasil!');
      setTimeout(() => setSyncStatusMsg(''), 4000);
    } catch (err: any) {
      setSyncStatusMsg(`Gagal sinkronisasi: ${err?.message || 'Error koneksi'}`);
      setTimeout(() => setSyncStatusMsg(''), 5000);
    } finally {
      setIsSyncing(false);
    }
  };

  // SQL Script
  const sqlDdl = `-- =============================================================================
-- BEEKODING BLOG ARTICLES TABLE - SUPABASE & POSTGRESQL MIGRATION
-- Jalankan skrip ini di Supabase SQL Editor untuk membuat tabel blog
-- =============================================================================

CREATE TABLE IF NOT EXISTS blog_articles (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'Coding Anak',
    cover_image TEXT NOT NULL,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time_minutes INT NOT NULL DEFAULT 5,
    author_name VARCHAR(150) NOT NULL DEFAULT 'Tim Akademik Beekoding',
    author_role VARCHAR(150) DEFAULT 'Curriculum & Pedagogy Lead',
    author_avatar TEXT DEFAULT '/bee-mascot.png',
    tags_json TEXT, -- JSON Array string: ["Coding Anak", "Scratch"]
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'published', -- 'published', 'draft', 'archived'
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);

ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Published Articles" ON blog_articles;
CREATE POLICY "Public Read Published Articles" ON blog_articles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Full Access Articles" ON blog_articles;
CREATE POLICY "Admin Full Access Articles" ON blog_articles
    FOR ALL USING (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlDdl);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const insertMarkdown = (prefix: string, suffix: string = '', defaultPlaceholder: string = 'teks') => {
    const textarea = document.getElementById('blog-content-input') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? 0;
    const current = textarea.value;
    const selected = current.substring(start, end);

    // Jika blok elemen (seperti heading, kutipan, list) dan tidak berada di awal baris, tambahkan baris baru
    let realPrefix = prefix;
    const isBlockPrefix =
      prefix.startsWith('#') ||
      prefix.startsWith('> ') ||
      prefix.startsWith('- ') ||
      prefix.startsWith('1. ') ||
      prefix.startsWith('```');

    if (isBlockPrefix && start > 0 && current[start - 1] !== '\n') {
      realPrefix = '\n' + prefix;
    }

    const contentToInsert = selected || defaultPlaceholder;
    const replacement = `${realPrefix}${contentToInsert}${suffix}`;
    const nextVal = current.substring(0, start) + replacement + current.substring(end);
    setFormContent(nextVal);

    // Kembalikan fokus dan highlight konten yang baru diapit/disisipkan
    setTimeout(() => {
      textarea.focus();
      const newStart = start + realPrefix.length;
      const newEnd = newStart + contentToInsert.length;
      textarea.setSelectionRange(newStart, newEnd);
    }, 15);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Content Management System (CMS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            Manajemen Blog & Artikel Edukasi
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Publikasikan artikel SEO, panduan coding ramah anak, dan optimalkan monetisasi Google AdSense.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleOpenNewModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Artikel Baru</span>
          </button>

          <button
            type="button"
            onClick={handleSyncCloud}
            disabled={isSyncing}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-500/50'
                : 'bg-white text-slate-700 border-amber-200 hover:border-amber-400'
            }`}
            title="Sinkronkan seluruh artikel ke Cloud Supabase PostgreSQL"
          >
            <Cloud className={`w-3.5 h-3.5 text-sky-500 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Supabase'}</span>
          </button>

          <button
            type="button"
            onClick={() => setSqlModalOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25'
                : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
            }`}
            title="Lihat skrip SQL DDL untuk tabel blog_articles di Supabase"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span>Skrip SQL</span>
          </button>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isDark
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Lihat sitemap.xml otomatis (Live real-time via Cloudflare Edge & Supabase)"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>Sitemap Otomatis</span>
          </a>

          <button
            type="button"
            onClick={handleResetDefaults}
            className={`p-2.5 rounded-xl border text-xs text-slate-400 hover:text-amber-500 transition-colors cursor-pointer ${
              isDark ? 'border-slate-800 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-100'
            }`}
            title="Reset ke artikel bawaan sistem"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {syncStatusMsg && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-500 flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* Tab Switcher: Kelola Artikel vs Moderasi Komentar */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setMainTab('articles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            mainTab === 'articles'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kelola Artikel</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              mainTab === 'articles' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-500/20 text-slate-400'
            }`}
          >
            {articles.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMainTab('comments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
            mainTab === 'comments'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Moderasi Komentar & Tanya Jawab</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              mainTab === 'comments' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-500/20 text-slate-400'
            }`}
          >
            {commentsList.length}
          </span>
          {commentStats.pending > 0 && (
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          )}
        </button>
      </div>

      {mainTab === 'articles' ? (
        <>
          {/* Metric Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          className={`p-4 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Artikel</div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
            {stats.total}
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tayang (Published)</div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-500 mt-1">
            {stats.published}
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Draf (Draft)</div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-500 mt-1">
            {stats.draft}
          </div>
        </div>

        <div
          className={`p-4 rounded-2xl border transition-colors ${
            isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
          }`}
        >
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Kategori Aktif</div>
          <div className="text-2xl font-black font-['Space_Grotesk'] text-sky-500 mt-1">
            {stats.categoriesCount}
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div
        className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
        }`}
      >
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, slug, kata kunci..."
            className={`w-full pl-10 pr-3 py-2 rounded-xl text-xs border outline-none ${
              isDark
                ? 'bg-slate-900/80 border-slate-700 text-white focus:border-amber-400'
                : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500'
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs border outline-none font-medium ${
              isDark
                ? 'bg-slate-900/80 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Kategori: {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className={`px-3 py-2 rounded-xl text-xs border outline-none font-medium ${
              isDark
                ? 'bg-slate-900/80 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <option value="all">Status: Semua</option>
            <option value="published">Status: Published</option>
            <option value="draft">Status: Draft</option>
          </select>
        </div>
      </div>

      {/* Articles Table & Cards */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-[#121622] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
        }`}
      >
        {filteredArticles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b font-bold uppercase tracking-wider text-[11px] ${
                    isDark
                      ? 'bg-slate-900/70 border-slate-800 text-slate-400'
                      : 'bg-amber-50/60 border-amber-200 text-slate-600'
                  }`}
                >
                  <th className="py-3 px-4">Artikel</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Penulis</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/10 dark:divide-slate-800">
                {filteredArticles.map((art) => (
                  <tr
                    key={art.slug}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/40' : 'hover:bg-amber-50/40'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 max-w-md">
                        <img
                          src={art.coverImage}
                          alt={art.title}
                          className="w-14 h-10 rounded-lg object-cover border border-amber-400/40 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-white truncate">
                            {art.title}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono truncate">
                            #{art.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          {art.category}
                        </span>
                        {art.tags && art.tags.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 max-w-[200px]">
                            {art.tags.slice(0, 3).map((t, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.2 rounded text-[9px] font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                              >
                                #{t}
                              </span>
                            ))}
                            {art.tags.length > 3 && (
                              <span className="text-[9px] text-slate-400 font-medium">+{art.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <img
                          src={art.author?.avatar || '/bee-mascot.png'}
                          alt={art.author?.name}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-medium text-slate-700 dark:text-slate-300">
                          {art.author?.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                      <div>{formatBlogDate(art.publishedAt)}</div>
                      <div className="text-[10px] text-amber-500/90 font-medium">
                        {formatReadTime(art.readTimeMinutes || calculateReadTime(art.content || ''))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          art.status === 'draft'
                            ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                            : 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${art.status === 'draft' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span>{art.status === 'draft' ? 'Draf' : 'Tayang'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            if (onOpenArticleInWeb) onOpenArticleInWeb(art.slug);
                            else window.open(`/#blog/${art.slug}`, '_blank');
                          }}
                          className="p-1.5 rounded-lg border border-transparent hover:border-amber-400 text-slate-500 hover:text-amber-500 transition-colors"
                          title="Lihat Pratinjau di Blog Web"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(art)}
                          className="p-1.5 rounded-lg border border-transparent hover:border-sky-400 text-slate-500 hover:text-sky-400 transition-colors"
                          title="Edit Artikel"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(art)}
                          className="p-1.5 rounded-lg border border-transparent hover:border-rose-400 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Tidak ada artikel yang cocok dengan pencarian Anda.
            </p>
            <button
              type="button"
              onClick={handleOpenNewModal}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950"
            >
              Tulis Artikel Pertama
            </button>
          </div>
        )}
      </div>
        </>
      ) : (
        /* =========================================================================
           TAB 2: MODERASI KOMENTAR & TANYA JAWAB
           ========================================================================= */
        <div className="space-y-6">
          {/* Comment Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div
              className={`p-4 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Komentar</div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
                {commentStats.total}
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Komentar Disetujui</div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-emerald-500 mt-1">
                {commentStats.approved}
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Menunggu Moderasi</div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-amber-500 mt-1">
                {commentStats.pending}
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-colors ${
                isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
              }`}
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Balasan Mentor</div>
              <div className="text-2xl font-black font-['Space_Grotesk'] text-sky-500 mt-1">
                {commentStats.mentors}
              </div>
            </div>
          </div>

          {/* Comment Search & Filters Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 ${
              isDark ? 'bg-[#131722] border-slate-800' : 'bg-white border-amber-200/80 shadow-xs'
            }`}
          >
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={commentSearch}
                onChange={(e) => setCommentSearch(e.target.value)}
                placeholder="Cari nama, isi komentar, atau slug..."
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border outline-none transition-colors ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-200 focus:border-amber-500'
                    : 'bg-amber-50/40 border-amber-200 text-slate-800 focus:border-amber-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              {(
                [
                  { id: 'all', label: 'Semua' },
                  { id: 'approved', label: 'Disetujui' },
                  { id: 'pending', label: 'Menunggu' },
                  { id: 'spam', label: 'Spam' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCommentStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    commentStatusFilter === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : isDark
                      ? 'bg-slate-900 text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.length > 0 ? (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isDark
                      ? comment.isMentor
                        ? 'bg-amber-500/5 border-amber-500/30'
                        : 'bg-[#131722] border-slate-800'
                      : comment.isMentor
                      ? 'bg-amber-50/50 border-amber-300 shadow-xs'
                      : 'bg-white border-amber-200/80 shadow-xs'
                  }`}
                >
                  {/* Comment Top Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          comment.isMentor
                            ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {comment.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {comment.authorName}
                          </span>
                          {comment.isMentor && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wide">
                              <ShieldCheck className="w-3 h-3" />
                              Mentor Beekoding
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>{comment.authorRole}</span>
                          <span>•</span>
                          <span>
                            {new Date(comment.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Status Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          comment.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : comment.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        }`}
                      >
                        {comment.status === 'approved'
                          ? 'Disetujui'
                          : comment.status === 'pending'
                          ? 'Menunggu'
                          : 'Spam'}
                      </span>

                      {/* Article link */}
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenArticleInWeb) {
                            onOpenArticleInWeb(comment.articleSlug);
                          } else {
                            window.open(`/blog/${comment.articleSlug}`, '_blank');
                          }
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold border transition-colors cursor-pointer ${
                          isDark
                            ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-amber-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-amber-600'
                        }`}
                        title="Lihat artikel blog tempat komentar ini diposting"
                      >
                        <Eye className="w-3 h-3" />
                        <span className="max-w-[140px] truncate">/{comment.articleSlug}</span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Body */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed mb-4">
                    {comment.content}
                  </p>

                  {/* Bottom Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1 font-semibold text-rose-500">
                        <Heart className="w-3.5 h-3.5 fill-rose-500" />
                        {comment.likesCount} suka
                      </span>
                      {comment.parentId && (
                        <span className="flex items-center gap-1 text-[11px] bg-slate-500/10 px-2 py-0.5 rounded-md">
                          <CornerDownRight className="w-3 h-3" />
                          Membalas #{comment.parentId.slice(0, 8)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {comment.status !== 'approved' && (
                        <button
                          type="button"
                          onClick={() => handleApproveComment(comment.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Setujui</span>
                        </button>
                      )}

                      {comment.status !== 'spam' && (
                        <button
                          type="button"
                          onClick={() => handleSpamComment(comment.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-400 hover:bg-amber-500/25 transition-colors cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Tandai Spam</span>
                        </button>
                      )}

                      <a
                        href={generateWhatsAppCommentForwardUrl(comment)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer"
                        title="Buka atau teruskan pertanyaan ini ke WhatsApp Hotline Beekoding"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WA Mentor</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteComment(comment.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setReplyingCommentId(replyingCommentId === comment.id ? null : comment.id)
                        }
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          replyingCommentId === comment.id
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                        }`}
                      >
                        <CornerDownRight className="w-3.5 h-3.5" />
                        <span>{replyingCommentId === comment.id ? 'Tutup Balas' : 'Balas Resmi'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Inline Mentor Reply Form */}
                  {replyingCommentId === comment.id && (
                    <div className="mt-4 pt-4 border-t border-amber-500/30 bg-amber-500/5 p-4 rounded-xl space-y-3 animate-fadeIn">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Kirim Jawaban Resmi sebagai Mentor Beekoding</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 block mb-1">
                            Nama Mentor Penjawab:
                          </label>
                          <input
                            type="text"
                            value={replyMentorName}
                            onChange={(e) => setReplyMentorName(e.target.value)}
                            className={`w-full px-3 py-1.5 rounded-lg text-xs border outline-none ${
                              isDark
                                ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                                : 'bg-white border-amber-200 text-slate-900 focus:border-amber-500'
                            }`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">
                          Isi Balasan Edukatif:
                        </label>
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Tulis panduan atau solusi untuk pertanyaan ${comment.authorName}...`}
                          className={`w-full p-3 rounded-lg text-xs border outline-none resize-none ${
                            isDark
                              ? 'bg-slate-900 border-slate-800 text-white focus:border-amber-500'
                              : 'bg-white border-amber-200 text-slate-900 focus:border-amber-500'
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyingCommentId(null);
                            setReplyText('');
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendMentorReply(comment)}
                          disabled={!replyText.trim()}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-black bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors disabled:opacity-50 cursor-pointer shadow-md shadow-amber-500/20"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publikasikan Jawaban Mentor</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-16 text-center space-y-3 bg-white dark:bg-[#131722] rounded-2xl border border-slate-200 dark:border-slate-800">
                <MessageSquare className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {commentSearch
                    ? 'Tidak ada komentar yang cocok dengan pencarian Anda.'
                    : 'Belum ada komentar atau pertanyaan dari pembaca blog.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL FORM TULIS / EDIT ARTIKEL
         ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div
            className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${
              isDark ? 'bg-[#111520] border-amber-500/30' : 'bg-white border-amber-300'
            }`}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                    {editingArticle ? 'Edit Artikel Edukasi' : 'Tulis Artikel Edukasi Baru'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Format penulisan mendukung Markdown (Heading, Kode, List, Gambar)
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveForm} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {/* Judul & Slug */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Judul Artikel <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Contoh: 5 Alasan Anak Perlu Belajar Coding Sejak Dini"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none font-semibold ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white focus:border-amber-400'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Slug URL (SEO Friendly) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="5-alasan-anak-belajar-coding"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none font-mono ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-amber-300 focus:border-amber-400'
                        : 'bg-white border-slate-300 text-amber-700 focus:border-amber-500'
                    }`}
                  />
                </div>
              </div>

              {/* Kategori, Status & Waktu Baca */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="Coding Anak">Coding Anak</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Parenting Digital">Parenting Digital</option>
                    <option value="Game Dev">Game Dev</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-none font-semibold ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="published">Tayang (Published)</option>
                    <option value="draft">Draf (Draft / Belum Tayang)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Estimasi Baca</span>
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Otomatis (WPM)</span>
                    </span>
                  </div>
                  <div
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border flex items-center justify-between font-semibold select-none ${
                      isDark ? 'bg-slate-900/80 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                    }`}
                    title="Dihitung otomatis berdasarkan jumlah kata dalam isi konten (kecepatan baca rata-rata 180 kata/menit)"
                  >
                    <span className="flex items-center gap-1.5 font-bold text-amber-500">
                      <Zap className="w-3.5 h-3.5" />
                      ~{autoReadTime} Menit Baca
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {autoWordCount.toLocaleString('id-ID')} kata
                    </span>
                  </div>
                </div>
              </div>

              {/* Ringkasan / Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ringkasan / Excerpt Singkat (Ditampilkan pada Kartu Artikel & Meta Description)
                </label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat pengantar artikel..."
                  className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                  }`}
                />
              </div>

              {/* Cover Image URL & File Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Foto Sampul (Cover Image)</label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={formCoverImage}
                    onChange={(e) => setFormCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... atau /bee-mascot.webp"
                    className={`flex-1 w-full px-3.5 py-2.5 rounded-xl text-xs border outline-none font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  <label className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border border-amber-400 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 transition-colors cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploadingImage ? 'Mengunggah...' : 'Unggah Foto'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                      disabled={isUploadingImage}
                    />
                  </label>
                </div>
                {formCoverImage && (
                  <div className="w-32 h-20 rounded-lg overflow-hidden border border-amber-500/30 mt-2">
                    <img src={formCoverImage} alt="Preview Cover" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Author & Tags */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nama Penulis</label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Jabatan Penulis</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Tags / Topik (Pisahkan koma)</label>
                  <input
                    type="text"
                    value={formTagsString}
                    onChange={(e) => setFormTagsString(e.target.value)}
                    placeholder="Contoh: Coding Anak, Scratch, AI"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs border outline-none ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  {formTagsString && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {formTagsString.split(',').map((t, idx) => {
                        const clean = t.trim();
                        if (!clean) return null;
                        return (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-500 border border-amber-500/30"
                          >
                            #{clean}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Editor Konten Markdown with Toolbar & Preview Tab */}
              <div className="space-y-2 pt-2 border-t border-amber-500/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Isi Konten Artikel (Markdown Format)
                  </label>
                  <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-800/40 border border-slate-700 text-xs">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-3 py-1 rounded-md font-bold transition-colors ${
                        editorTab === 'write' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Editor Tulis
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-3 py-1 rounded-md font-bold transition-colors ${
                        editorTab === 'preview' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pratinjau Live
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('social')}
                      className={`px-3 py-1 rounded-md font-bold transition-colors flex items-center gap-1.5 ${
                        editorTab === 'social' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Share2 className="w-3 h-3" />
                      <span>Medsos & SEO</span>
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <div className="space-y-2">
                    {/* Markdown Quick Toolbar */}
                    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs shadow-inner">
                      {/* H1 Heading */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('# ', '', 'Judul Utama')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-400 font-black transition-colors"
                        title="Judul Utama (H1) - # teks"
                      >
                        # H1
                      </button>

                      {/* H2 Heading */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('## ', '', 'Sub-Judul H2')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-bold transition-colors"
                        title="Sub-Judul (H2) - ## teks"
                      >
                        ## H2
                      </button>

                      {/* H3 Heading */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('### ', '', 'Bagian H3')}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold transition-colors"
                        title="Bagian (H3) - ### teks"
                      >
                        ### H3
                      </button>

                      <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />

                      {/* Bold */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('**', '**', 'teks tebal')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-black transition-colors flex items-center justify-center"
                        title="Tebal (Bold) - **teks**"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>

                      {/* Italic */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('*', '*', 'teks miring')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 italic transition-colors flex items-center justify-center"
                        title="Miring (Italic) - *teks*"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>

                      {/* Quote */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('> ', '', 'Kutipan penting...')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors flex items-center justify-center"
                        title="Kutipan (Blockquote) - > teks"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />

                      {/* Code Block */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('```\n', '\n```', '// Kode program di sini')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 transition-colors flex items-center justify-center"
                        title="Blok Kode - ```kode```"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>

                      {/* Inline Code */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('`', '`', 'kode')}
                        className="px-1.5 py-1 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 font-mono text-[10px] font-bold transition-colors"
                        title="Kode Segaris - `kode`"
                      >
                        `code`
                      </button>

                      {/* Unordered List */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('- ', '', 'Poin daftar')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors flex items-center justify-center"
                        title="Daftar Poin Bullet - - item"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>

                      {/* Ordered List */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('1. ', '', 'Langkah pertama')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors flex items-center justify-center"
                        title="Daftar Nomor - 1. item"
                      >
                        <ListOrdered className="w-3.5 h-3.5" />
                      </button>

                      <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />

                      {/* Link */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('[', '](https://)', 'Teks tautan')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors flex items-center justify-center"
                        title="Tautan Link - [teks](url)"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Divider */}
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => insertMarkdown('\n---\n', '', '')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 transition-colors flex items-center justify-center"
                        title="Garis Pembatas Horizontal - ---"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      id="blog-content-input"
                      required
                      rows={12}
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      className={`w-full p-4 rounded-2xl text-xs sm:text-sm font-mono border outline-none leading-relaxed transition-colors ${
                        isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
                      }`}
                      placeholder="Ketik konten artikel di sini menggunakan Markdown (# untuk H1, ## untuk H2, **teks** untuk bold, dll)..."
                    />

                    {/* Live Word Count & Reading Time Status Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-slate-800/40 border border-slate-700/60 text-[11px] text-slate-400">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                          <span>{autoWordCount.toLocaleString('id-ID')} kata</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~{autoReadTime} menit baca</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-400">
                          {formContent.length.toLocaleString('id-ID')} karakter
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Kalkulasi otomatis (@ 180 WPM)
                      </span>
                    </div>
                  </div>
                ) : editorTab === 'preview' ? (
                  /* Live Preview */
                  <div className="p-4 sm:p-6 rounded-2xl border border-amber-500/20 bg-slate-950/40 max-h-[380px] overflow-y-auto">
                    {formContent.trim() ? (
                      <MarkdownRenderer content={formContent} isDark={isDark} />
                    ) : (
                      <p className="text-xs text-slate-500 italic">Belum ada konten artikel untuk dipratinjau.</p>
                    )}
                  </div>
                ) : (
                  /* Social & SEO Preview */
                  <div className="space-y-6 p-4 sm:p-6 rounded-2xl border border-sky-500/30 bg-slate-950/50 max-h-[420px] overflow-y-auto">
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <div>
                        <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                          Pratinjau Tampilan Berbagi Media Sosial (OpenGraph) & Google SERP
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Berikut tampilan tautan artikel Anda ketika dibagikan di WhatsApp, Facebook, LinkedIn, dan hasil pencarian Google.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                        SEO Ready
                      </span>
                    </div>

                    {/* 1. WhatsApp / Facebook OpenGraph Card Preview */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <span>📱 Pratinjau Tampilan Link di WhatsApp & Facebook</span>
                      </span>

                      <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-slate-700 bg-[#1e2433] shadow-xl text-left">
                        {/* Cover Preview */}
                        <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                          {formCoverImage ? (
                            <img
                              src={formCoverImage}
                              alt="Cover Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs italic">
                              Gambar cover belum diisi
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-amber-300 backdrop-blur-xs">
                            beekoding.id
                          </div>
                        </div>

                        {/* Text Metadata */}
                        <div className="p-3.5 space-y-1 bg-[#1a1f2c]">
                          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                            BEEKODING.ID
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                            {formTitle || 'Judul Artikel Edukasi'}
                          </div>
                          <div className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {formExcerpt || 'Ringkasan singkat artikel yang menjelaskan manfaat dan isi tulisan...'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Google Search Result Snippet Preview */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                        <span>🔍 Pratinjau Tampilan di Hasil Pencarian Google</span>
                      </span>

                      <div className="p-4 rounded-xl border border-slate-800 bg-[#121622] space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <div className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-black text-slate-950">
                            B
                          </div>
                          <span className="truncate">https://beekoding.id &rsaquo; blog &rsaquo; {formSlug || 'slug-artikel'}</span>
                        </div>
                        <h5 className="text-sm sm:text-base font-semibold text-sky-400 hover:underline cursor-pointer line-clamp-1">
                          {formTitle || 'Judul Artikel Edukasi'} | Blog Beekoding
                        </h5>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          <span className="text-slate-400 font-medium">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} — </span>
                          {formExcerpt || 'Ringkasan artikel edukasi seputar coding anak, kecerdasan buatan, dan tips digital parenting...'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-amber-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md transition-all font-['Space_Grotesk']"
                >
                  {editingArticle ? 'Perbarui Artikel' : 'Publikasikan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODAL SKRIP SQL SUPABASE
         ========================================================================= */}
      {sqlModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
              isDark ? 'bg-[#111520] border-amber-500/30' : 'bg-white border-amber-300'
            }`}
          >
            <div className="p-4 sm:p-5 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Skrip SQL Migrasi Tabel `blog_articles` Supabase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSqlModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Salin skrip SQL di bawah ini, lalu buka <strong>Supabase Dashboard ➔ SQL Editor</strong> pada proyek Anda, paste kode ini, lalu klik <strong>Run</strong> untuk membuat tabel database artikel.
              </p>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-950 text-amber-300 font-mono text-[11px] overflow-x-auto max-h-[300px] border border-amber-500/30">
                  <code>{sqlDdl}</code>
                </pre>
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copiedSql ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-950" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin SQL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setSqlModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
