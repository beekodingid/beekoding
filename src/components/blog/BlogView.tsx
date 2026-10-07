import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  BLOG_CATEGORIES,
  type BlogArticle,
} from '../../data/blogArticles';
import {
  getBlogArticles,
  fetchBlogArticlesFromCloud,
} from '../../services/blogStorage';
import { onStorageUpdate } from '../../services/adminStorage';
import { AdSenseSlot } from './AdSenseSlot';
import { MarkdownRenderer, slugifyHeading } from './MarkdownRenderer';
import { updateArticleSocialMeta, resetSocialMetaToDefault, getPublicBaseUrl } from '../../utils/socialMeta';
import { getArticleReadTime } from '../../utils/readTime';
import {
  ArrowLeft,
  Search,
  Clock,
  Calendar,
  Share2,
  Check,
  Tag,
  BookOpen,
  Sparkles,
  ArrowRight,
  Brain,
  Rocket,
  MessageCircle,
  Heart,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  Zap,
  Type,
  ArrowUp,
} from 'lucide-react';

interface BlogViewProps {
  initialSlug?: string;
  onBackToHome: () => void;
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenTrialEvents?: () => void;
}

interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  Semua: '📚',
  'Coding Anak': '💻',
  'Artificial Intelligence': '🤖',
  'Parenting Digital': '👨‍👩‍👧',
  'Game Dev': '🎮',
};

/**
 * Format tanggal dari 'YYYY-MM-DD' menjadi 'DD-MMM-YYYY' (contoh: 25-Jan-2026)
 */
export function formatBlogDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const year = parts[0];
    const monthNum = parseInt(parts[1], 10);
    const day = parts[2].padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    const monthName = monthNames[monthNum - 1] || parts[1];
    return `${day}-${monthName}-${year}`;
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    const monthName = monthNames[parsed.getMonth()];
    const year = parsed.getFullYear();
    return `${day}-${monthName}-${year}`;
  }

  return dateStr;
}

const LIKES_STORAGE_KEY = 'beekoding_blog_likes_count_v1';
const USER_LIKED_STORAGE_KEY = 'beekoding_user_liked_articles_v1';

function getStoredLikesMap(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LIKES_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading likes', e);
  }
  return {};
}

function getStoredUserLikedSet(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(USER_LIKED_STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch (e) {
    console.error('Error loading user likes', e);
  }
  return new Set();
}

export const BlogView: React.FC<BlogViewProps> = ({
  initialSlug,
  onBackToHome,
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<BlogArticle[]>(() => getBlogArticles());
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedLink, setCopiedLink] = useState(false);

  // Phase 1: Reading Experience states
  const [readingProgress, setReadingProgress] = useState(0);
  const [fontSizeStep, setFontSizeStep] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isTocOpen, setIsTocOpen] = useState(true);

  // Phase 3: Floating Action Bar state
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Phase 2: Interactivity & Discovery states
  const [quickSort, setQuickSort] = useState<'all' | 'latest' | 'quick'>('all');
  const [likesMap, setLikesMap] = useState<Record<string, number>>(getStoredLikesMap);
  const [userLikedSet, setUserLikedSet] = useState<Set<string>>(getStoredUserLikedSet);

  // Sync articles dynamically on storage events & background cloud fetch
  useEffect(() => {
    // 1. Fetch latest from Supabase if connected
    fetchBlogArticlesFromCloud().then((cloudArticles) => {
      if (cloudArticles && cloudArticles.length > 0) {
        setArticles(cloudArticles);
      }
    });

    // 2. Listen to local/tab storage changes
    const unsubscribe = onStorageUpdate((type) => {
      if (type === 'blog' || type === 'all') {
        setArticles(getBlogArticles());
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync selected slug if parent passes a new initialSlug
  useEffect(() => {
    if (initialSlug !== undefined) {
      setSelectedSlug(initialSlug || null);
    }
  }, [initialSlug]);

  // Sync state if hash or history changes
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash || '';
      const pathname = window.location.pathname || '';
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.replace('/blog/', '').replace(/\/$/, '').trim();
        if (slug) {
          setSelectedSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '').replace(/\/$/, '').trim();
        if (slug) {
          setSelectedSlug(slug);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      } else if (hash === '#blog' || pathname === '/blog' || pathname === '/blog/') {
        setSelectedSlug(null);
      }
    };
    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = articles.filter((article) => {
      const matchCategory =
        selectedCategory === 'Semua' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));

      const matchQuick = quickSort === 'quick' ? getArticleReadTime(article) <= 5 : true;

      return matchCategory && matchSearch && matchQuick;
    });

    if (quickSort === 'latest') {
      result = [...result].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return result;
  }, [articles, selectedCategory, searchQuery, quickSort]);

  // Active article
  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return articles.find((a) => a.slug === selectedSlug) || null;
  }, [articles, selectedSlug]);

  // Reading progress and floating action bar scroll listener
  useEffect(() => {
    if (!currentArticle) {
      setReadingProgress(0);
      setShowFloatingBar(false);
      return;
    }

    const handleScroll = () => {
      setShowFloatingBar(window.scrollY > 350);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentArticle]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Table of Contents generator from article content
  const tocItems = useMemo<TocItem[]>(() => {
    if (!currentArticle?.content) return [];
    const lines = currentArticle.content.split('\n');
    const items: TocItem[] = [];

    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)$/);
      if (h2Match) {
        const cleanTitle = h2Match[1].replace(/[*_`]/g, '').trim();
        items.push({ id: slugifyHeading(cleanTitle), title: cleanTitle, level: 2 });
        continue;
      }
      const h3Match = line.match(/^###\s+(.+)$/);
      if (h3Match) {
        const cleanTitle = h3Match[1].replace(/[*_`]/g, '').trim();
        items.push({ id: slugifyHeading(cleanTitle), title: cleanTitle, level: 3 });
      }
    }
    return items;
  }, [currentArticle]);

  // Get like count with stable initial fallback
  const getArticleLikes = (article: BlogArticle): number => {
    if (likesMap[article.slug] !== undefined) {
      return likesMap[article.slug];
    }
    // Seed count based on readTime and title length to look natural
    const seed = 18 + (article.title.length % 15) + article.readTimeMinutes * 3;
    return seed;
  };

  const handleToggleLike = (slug: string) => {
    const isLiked = userLikedSet.has(slug);
    const nextLiked = new Set(userLikedSet);
    const currentCount = likesMap[slug] ?? getArticleLikes(articles.find((a) => a.slug === slug) || ({} as BlogArticle));
    const nextCount = isLiked ? Math.max(0, currentCount - 1) : currentCount + 1;

    if (isLiked) {
      nextLiked.delete(slug);
    } else {
      nextLiked.add(slug);
    }

    const nextMap = { ...likesMap, [slug]: nextCount };
    setUserLikedSet(nextLiked);
    setLikesMap(nextMap);

    try {
      localStorage.setItem(USER_LIKED_STORAGE_KEY, JSON.stringify(Array.from(nextLiked)));
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(nextMap));
    } catch (e) {
      console.error('Error saving like to storage', e);
    }
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Dynamically update Social Meta Tags (OpenGraph, Twitter Card, JSON-LD schema)
  useEffect(() => {
    if (currentArticle) {
      updateArticleSocialMeta(currentArticle);
    } else {
      resetSocialMetaToDefault();
    }

    return () => {
      resetSocialMetaToDefault();
    };
  }, [currentArticle]);

  const handleSelectArticle = (slug: string) => {
    setSelectedSlug(slug);
    window.history.pushState(null, '', `/blog/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    window.history.pushState(null, '', '/blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = getPublicBaseUrl();
      const urlToCopy = currentArticle
        ? `${baseUrl}/blog/${currentArticle.slug}`
        : `${baseUrl}/blog`;
      navigator.clipboard.writeText(urlToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = (article: BlogArticle) => {
    const baseUrl = getPublicBaseUrl();
    const articleUrl = `${baseUrl}/blog/${article.slug}`;
    const text = `*${article.title}*\n\n${article.excerpt}\n\n👉 Baca selengkapnya di Blog Edukasi Beekoding:\n${articleUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0b0d13] text-slate-100' : 'bg-[#faf8f2] text-slate-800'
      }`}
    >
      {/* Blog Top Header */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
          isDark
            ? 'bg-[#0d0f17]/90 border-amber-500/20 shadow-md shadow-black/20'
            : 'bg-[#fffdf9]/95 border-amber-300/60 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                  : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-700'
              }`}
              title="Kembali ke Beranda Beekoding"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <a
              href="#blog"
              onClick={(e) => {
                e.preventDefault();
                handleBackToList();
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1.5px] shadow-sm">
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#10141e]' : 'bg-white'
                  }`}
                >
                  <img
                    src="/beekoding-logo.png"
                    alt="Beekoding Logo"
                    className="w-7 h-7 object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-lg sm:text-xl font-black tracking-tight flex items-center font-['Space_Grotesk'] ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Bee<span className="text-amber-500">koding</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                    Blog
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Reading View Controls: Font Size & Progress */}
            {currentArticle && (
              <div className="flex items-center gap-2">
                <div
                  className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-amber-500/5 border-amber-200'
                  }`}
                  title="Sesuaikan ukuran huruf teks"
                >
                  <Type className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
                  <button
                    type="button"
                    onClick={() => setFontSizeStep('normal')}
                    className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                      fontSizeStep === 'normal'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                    title="Font Normal"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeStep('large')}
                    className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                      fontSizeStep === 'large'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                    title="Font Lebih Besar"
                  >
                    A+
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSizeStep('xlarge')}
                    className={`px-1.5 py-0.5 rounded text-xs transition-all cursor-pointer ${
                      fontSizeStep === 'xlarge'
                        ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                    title="Font Ekstra Besar (Ramah Mata)"
                  >
                    A++
                  </button>
                </div>

                <span
                  className="hidden md:inline-flex text-[11px] font-bold text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25"
                  title="Progres Membaca"
                >
                  {Math.round(readingProgress)}% terbaca
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={onOpenTalentAssessment}
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                isDark
                  ? 'bg-purple-500/15 border-purple-500/30 text-purple-300 hover:bg-purple-500/25'
                  : 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span>Tes Bakat Anak</span>
            </button>

            <button
              type="button"
              onClick={onOpenTrialEvents}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-sm transition-all cursor-pointer"
            >
              <Rocket className="w-3.5 h-3.5 text-slate-950" />
              <span>Free Trial Class</span>
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Phase 1: Sticky Reading Progress Bar */}
        {currentArticle && (
          <div className="w-full h-1 bg-amber-500/15 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 transition-all duration-150 ease-out shadow-sm shadow-amber-400"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentArticle ? (
          /* =========================================================================
             ARTICLE DETAIL VIEW
             ========================================================================= */
          <article className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:text-amber-500 transition-colors cursor-pointer"
              >
                Beranda
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={handleBackToList}
                className="hover:text-amber-500 transition-colors cursor-pointer"
              >
                Blog Edukasi
              </button>
              <span>/</span>
              <span className="text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-none font-medium">
                {currentArticle.title}
              </span>
            </nav>

            {/* Article Header */}
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{currentArticle.category}</span>
                </span>
                {currentArticle.tags && currentArticle.tags.length > 0 && currentArticle.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300/80 dark:border-slate-700 transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] font-['Space_Grotesk'] text-slate-900 dark:text-white">
                {currentArticle.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {currentArticle.excerpt}
              </p>

              {/* Author & Meta Bar */}
              <div className="pt-4 border-t border-b border-amber-500/20 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={currentArticle.author.avatar}
                    alt={currentArticle.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {currentArticle.author.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {currentArticle.author.role}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {formatBlogDate(currentArticle.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {getArticleReadTime(currentArticle)} menit baca
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleLike(currentArticle.slug)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold border transition-all cursor-pointer ${
                      userLikedSet.has(currentArticle.slug)
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 shadow-xs'
                        : 'bg-amber-500/10 border-amber-500/25 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                    }`}
                    title="Klik untuk menyukai / menyatakan artikel ini bermanfaat"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        userLikedSet.has(currentArticle.slug)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-rose-500'
                      }`}
                    />
                    <span>{getArticleLikes(currentArticle)} Bermanfaat</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-amber-500/20 shadow-xl">
              <img
                src={currentArticle.coverImage}
                alt={currentArticle.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Top In-Article AdSense Banner (Compliant & Fixed Min-Height) */}
            <AdSenseSlot slotId="5878990472" format="horizontal" label="Rekomendasi Mitra Edukasi" />

            {/* Phase 1: Interactive Table of Contents (Daftar Isi Otomatis) */}
            {tocItems.length > 1 && (
              <div
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isDark
                    ? 'bg-[#121622]/90 border-amber-500/25 shadow-md shadow-black/20'
                    : 'bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-white border-amber-200/90 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="w-full px-5 py-3.5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-amber-500/5 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-500">
                      <ListOrdered className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                        Daftar Isi Artikel
                      </span>
                      <span className="ml-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        ({tocItems.length} poin penting)
                      </span>
                    </div>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1 text-xs font-semibold">
                    <span>{isTocOpen ? 'Tutup' : 'Buka'}</span>
                    {isTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isTocOpen && (
                  <div className="px-5 pb-4 pt-1 border-t border-amber-500/15">
                    <nav className="space-y-1.5 text-xs sm:text-sm">
                      {tocItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => scrollToHeading(item.id)}
                          className={`w-full text-left py-1 px-2 rounded-lg transition-colors flex items-start gap-2 group cursor-pointer ${
                            item.level === 3
                              ? 'pl-6 text-slate-600 dark:text-slate-400'
                              : 'font-bold text-slate-800 dark:text-slate-200'
                          } hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400`}
                        >
                          <span className="text-amber-500 text-xs mt-0.5 font-mono">
                            {item.level === 2 ? '•' : '–'}
                          </span>
                          <span className="group-hover:translate-x-0.5 transition-transform line-clamp-1">
                            {item.title}
                          </span>
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </div>
            )}

            {/* Article Body Content with Dynamic Font Size */}
            <div
              className={`max-w-none transition-all duration-200 ${
                fontSizeStep === 'normal'
                  ? 'text-base sm:text-lg leading-relaxed'
                  : fontSizeStep === 'large'
                  ? 'text-lg sm:text-xl leading-relaxed'
                  : 'text-xl sm:text-2xl leading-loose'
              }`}
            >
              <MarkdownRenderer content={currentArticle.content} isDark={isDark} />
            </div>

            {/* Tag Pills Footer */}
            {currentArticle.tags && currentArticle.tags.length > 0 && (
              <div className="pt-6 pb-2 flex flex-wrap items-center gap-2 border-t border-amber-500/15">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mr-1">
                  <Tag className="w-3.5 h-3.5 text-amber-500" />
                  <span>Topik Artikel:</span>
                </span>
                {currentArticle.tags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      handleBackToList();
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-600 dark:text-amber-300 border border-amber-500/25 transition-all cursor-pointer shadow-xs"
                    title={`Cari artikel bertopik #${tag}`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom In-Article AdSense Banner */}
            <AdSenseSlot slotId="5878990472" format="auto" label="Sponsor / Google AdSense" />

            {/* Interactive Call to Action Card: Free Trial Class */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-sky-500/15 border-2 border-amber-400/60 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Kelas Praktik Coding & AI Bersama Mentor Beekoding</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-950 dark:text-white">
                Ingin Anak Anda Langsung Praktik Membuat Game & AI Sendiri?
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
                Daftarkan putra-putri Anda dalam sesi <strong>Free Trial Class Beekoding</strong>. Didampingi langsung oleh mentor ramah anak, rasio kelas kecil (maksimal 4 siswa), dan sertifikat uji coba gratis!
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onOpenTrialEvents}
                  className="px-6 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/30 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Klaim Slot Free Trial Class</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenBootcampModal}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-amber-300 dark:border-slate-700 hover:border-amber-500 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Kurikulum Bootcamp 2026</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenTalentAssessment}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-amber-300 dark:border-slate-700 hover:border-amber-500 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>Tes Bakat Digital (Gratis)</span>
                </button>
              </div>
            </div>

            {/* Social Share Bar + Phase 2 Like Reactions */}
            <div className="pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleLike(currentArticle.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                    userLikedSet.has(currentArticle.slug)
                      ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/25 scale-105'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      userLikedSet.has(currentArticle.slug)
                        ? 'fill-white text-white'
                        : 'fill-rose-500 text-rose-500'
                    }`}
                  />
                  <span>
                    {userLikedSet.has(currentArticle.slug) ? 'Anda Menyukai Artikel Ini' : 'Artikel ini Bermanfaat'} (
                    {getArticleLikes(currentArticle)})
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(currentArticle)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-amber-500" />
                      <span>Salin Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Related Articles */}
            <section className="pt-12 border-t border-amber-500/20 space-y-6">
              <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Artikel Edukasi Terkait
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {articles
                  .filter((a) => a.slug !== currentArticle.slug)
                  .slice(0, 2)
                  .map((article) => (
                    <div
                      key={article.slug}
                      onClick={() => handleSelectArticle(article.slug)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 ${
                        isDark
                          ? 'bg-[#141824] border-slate-800 hover:border-amber-500/50'
                          : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-sm'
                      }`}
                    >
                      <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-500">
                        {article.category}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mt-1 group-hover:text-amber-500 transition-colors">
                        {article.title}
                      </h4>
                    </div>
                  ))}
              </div>
            </section>
          </article>
        ) : (
          /* =========================================================================
             BLOG LIST VIEW (INDEX OF ARTICLES)
             ========================================================================= */
          <div className="space-y-10">
            {/* Blog Hero Header Banner */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pusat Wawasan Coding, AI & Parenting Digital</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-['Space_Grotesk'] text-slate-900 dark:text-white">
                Artikel & Panduan Edukasi{' '}
                <span className="text-gradient-honey">Beekoding</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Pelajari strategi terbaik membimbing anak menghadapi revolusi Artificial Intelligence, panduan Scratch hingga Python, dan tips parenting digital abad ke-21.
              </p>
            </div>

            {/* Search and Category Filters */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari topik artikel (contoh: Scratch, Python, AI, screen time)..."
                  className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm border outline-none transition-all ${
                    isDark
                      ? 'bg-[#151926] border-slate-700/80 text-white placeholder-slate-500 focus:border-amber-400'
                      : 'bg-white border-amber-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 shadow-xs'
                  }`}
                />
              </div>

              {/* Category Pills with Visual Emojis */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {BLOG_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const emoji = CATEGORY_EMOJIS[cat] || '💡';
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                          : isDark
                          ? 'bg-[#161a27] text-slate-300 border border-slate-800 hover:border-amber-500/40'
                          : 'bg-white text-slate-700 border border-amber-200 hover:border-amber-400 shadow-2xs'
                      }`}
                    >
                      <span className="text-sm">{emoji}</span>
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>

              {/* Phase 2: Quick Sort / Filter Tab Switcher */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-semibold hidden sm:inline mr-1">Urutkan:</span>
                <button
                  type="button"
                  onClick={() => setQuickSort('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    quickSort === 'all'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  Semua Topik
                </button>
                <button
                  type="button"
                  onClick={() => setQuickSort('latest')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickSort === 'latest'
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Terbaru</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuickSort('quick')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    quickSort === 'quick'
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cepat Baca (≤ 5 mnt)</span>
                </button>
              </div>
            </div>

            {/* Top In-Feed AdSense Placement */}
            <div className="max-w-4xl mx-auto">
              <AdSenseSlot slotId="5878990472" format="horizontal" label="Iklan Sponsor Edukasi" />
            </div>

            {/* Articles List Content Area */}
            {filteredArticles.length > 0 ? (
              <div className="space-y-12">
                {/* Phase 2: Hero Spotlight Featured Article (Shown when viewing Semua with no active search/sort) */}
                {!searchQuery.trim() && selectedCategory === 'Semua' && quickSort === 'all' && (
                  (() => {
                    const hero = filteredArticles[0];
                    return (
                      <article
                        onClick={() => handleSelectArticle(hero.slug)}
                        className={`rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl ${
                          isDark
                            ? 'bg-gradient-to-br from-[#131725] to-[#0e111a] border-amber-500/30 hover:border-amber-400/60 shadow-lg shadow-black/40'
                            : 'bg-gradient-to-br from-amber-500/5 via-yellow-500/5 to-white border-amber-300/80 hover:border-amber-400 shadow-xl shadow-amber-900/5'
                        }`}
                      >
                        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 p-6 sm:p-8">
                          {/* Image Column */}
                          <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-amber-500/20">
                            <img
                              src={hero.coverImage}
                              alt={hero.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              loading="eager"
                            />
                            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider backdrop-blur-md bg-amber-500 text-slate-950 shadow-md flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Artikel Pilihan Mentor</span>
                              </span>
                              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md bg-slate-950/80 text-amber-300 border border-amber-500/30">
                                {hero.category}
                              </span>
                            </div>
                          </div>

                          {/* Content Column */}
                          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                  {formatBlogDate(hero.publishedAt)}
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                                  {getArticleReadTime(hero)} menit baca
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-rose-500 font-semibold">
                                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                                  {getArticleLikes(hero)} suka
                                </span>
                              </div>

                              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white leading-tight group-hover:text-amber-500 transition-colors">
                                {hero.title}
                              </h2>

                              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                                {hero.excerpt}
                              </p>

                              {hero.tags && hero.tags.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  {hero.tags.slice(0, 4).map((tag, tIdx) => (
                                    <span
                                      key={tIdx}
                                      className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="pt-4 border-t border-amber-500/15 flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <img
                                  src={hero.author.avatar}
                                  alt={hero.author.name}
                                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-400"
                                />
                                <div>
                                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                                    {hero.author.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                    {hero.author.role}
                                  </div>
                                </div>
                              </div>

                              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 group-hover:brightness-110 shadow-sm transition-all">
                                <span>Baca Panduan</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })()
                )}

                {/* Grid Header Label when Hero is shown */}
                {!searchQuery.trim() && selectedCategory === 'Semua' && quickSort === 'all' && filteredArticles.length > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                    <h3 className="text-lg sm:text-xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      <span>Artikel & Panduan Edukasi Lainnya</span>
                    </h3>
                    <span className="text-xs font-bold text-slate-400">
                      {filteredArticles.length - 1} artikel tersedia
                    </span>
                  </div>
                )}

                {/* Standard 3-Column Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                  {(!searchQuery.trim() && selectedCategory === 'Semua' && quickSort === 'all'
                    ? filteredArticles.slice(1)
                    : filteredArticles
                  ).map((article) => (
                    <article
                      key={article.slug}
                      onClick={() => handleSelectArticle(article.slug)}
                      className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1.5 ${
                        isDark
                          ? 'bg-[#121622] border-slate-800 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5'
                          : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-md shadow-amber-900/5'
                      }`}
                    >
                      {/* Thumbnail Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-slate-950/80 text-amber-300 border border-amber-500/30">
                          {article.category}
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-500" />
                              {formatBlogDate(article.publishedAt)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-500" />
                              {getArticleReadTime(article)} mnt
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-rose-500 font-medium">
                              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                              {getArticleLikes(article)}
                            </span>
                          </div>

                          <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors">
                            {article.title}
                          </h2>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                          </p>

                          {/* Article Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {article.tags.slice(0, 3).map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {article.tags.length > 3 && (
                                <span className="text-[10px] text-slate-400 font-medium">
                                  +{article.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Footer: Author & Read Arrow */}
                        <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={article.author.avatar}
                              alt={article.author.name}
                              className="w-7 h-7 rounded-full object-cover border border-amber-400"
                            />
                            <span className="text-xs font-semibold truncate text-slate-700 dark:text-slate-300">
                              {article.author.name}
                            </span>
                          </div>

                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 group-hover:translate-x-1 transition-transform">
                            <span>Baca</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-3">
                <p className="text-base font-bold text-slate-500 dark:text-slate-400">
                  Tidak ditemukan artikel untuk kata kunci "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Semua');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950"
                >
                  Reset Filter
                </button>
              </div>
            )}

            {/* Bottom In-Feed AdSense Placement */}
            <div className="max-w-4xl mx-auto pt-6">
              <AdSenseSlot slotId="5878990472" format="auto" label="Sponsor Pilihan" />
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
         PHASE 3: FLOATING ACTION BAR (SCROLL TO TOP & QUICK SHARE)
         Appears automatically when reader scrolls down through the article
         ========================================================================= */}
      {currentArticle && (
        <aside
          aria-label="Aksi Cepat Artikel"
          className={`fixed bottom-6 right-4 sm:right-6 z-40 transition-all duration-300 ${
            showFloatingBar
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div
            className={`p-1.5 sm:p-2 rounded-2xl sm:rounded-full flex flex-col items-center gap-2 backdrop-blur-xl border shadow-2xl transition-all ${
              isDark
                ? 'bg-[#121622]/90 border-amber-500/30 shadow-black/70'
                : 'bg-white/95 border-amber-200/90 shadow-amber-950/15'
            }`}
          >
            {/* Quick Like Reaction Button */}
            <button
              type="button"
              onClick={() => handleToggleLike(currentArticle.slug)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group ${
                userLikedSet.has(currentArticle.slug)
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-rose-500 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:text-rose-500 hover:bg-rose-50'
              }`}
              title={userLikedSet.has(currentArticle.slug) ? 'Batalkan suka' : 'Artikel ini Bermanfaat / Suka'}
            >
              <Heart
                className={`w-4 h-4 ${
                  userLikedSet.has(currentArticle.slug) ? 'fill-white text-white' : ''
                }`}
              />
              <span className="sr-only">Suka Artikel</span>
              <span className="hidden sm:group-hover:block absolute right-12 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg whitespace-nowrap">
                {userLikedSet.has(currentArticle.slug) ? 'Disukai' : 'Bermanfaat'} ({getArticleLikes(currentArticle)})
              </span>
            </button>

            {/* Quick WhatsApp Share Button */}
            <button
              type="button"
              onClick={() => handleShareWhatsApp(currentArticle)}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-all shadow-md shadow-emerald-500/25 cursor-pointer relative group"
              title="Bagikan via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="sr-only">WhatsApp</span>
              <span className="hidden sm:group-hover:block absolute right-12 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg whitespace-nowrap">
                Bagikan ke WhatsApp
              </span>
            </button>

            {/* Quick Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer relative group ${
                copiedLink
                  ? 'bg-emerald-500 text-white'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:text-amber-600 hover:bg-amber-50'
              }`}
              title="Salin Link Artikel"
            >
              {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4" />}
              <span className="sr-only">Salin Link</span>
              <span className="hidden sm:group-hover:block absolute right-12 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg whitespace-nowrap">
                {copiedLink ? 'Tersalin!' : 'Salin Link'}
              </span>
            </button>

            <div className="w-6 h-[1px] bg-slate-300 dark:bg-slate-700 my-0.5" />

            {/* Scroll to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 flex items-center justify-center transition-all shadow-md shadow-amber-500/30 cursor-pointer relative group"
              title="Kembali ke Bagian Atas"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              <span className="sr-only">Scroll ke Atas</span>
              <span className="hidden sm:group-hover:block absolute right-12 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-lg whitespace-nowrap">
                Kembali ke Atas ⬆️
              </span>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};
