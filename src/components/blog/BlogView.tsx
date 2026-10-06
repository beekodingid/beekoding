import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  blogArticles,
  BLOG_CATEGORIES,
  type BlogArticle,
} from '../../data/blogArticles';
import { AdSenseSlot } from './AdSenseSlot';
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
} from 'lucide-react';

interface BlogViewProps {
  initialSlug?: string;
  onBackToHome: () => void;
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenTrialEvents?: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  initialSlug,
  onBackToHome,
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync state if hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#blog/')) {
        const slug = hash.replace('#blog/', '');
        setSelectedSlug(slug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#blog') {
        setSelectedSlug(null);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchCategory =
        selectedCategory === 'Semua' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active article
  const currentArticle = useMemo(() => {
    if (!selectedSlug) return null;
    return blogArticles.find((a) => a.slug === selectedSlug) || null;
  }, [selectedSlug]);

  const handleSelectArticle = (slug: string) => {
    setSelectedSlug(slug);
    window.location.hash = `#blog/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedSlug(null);
    window.location.hash = '#blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleShareWhatsApp = (article: BlogArticle) => {
    const text = `Baca artikel menarik dari Beekoding: *${article.title}*\n${window.location.origin}/#blog/${article.slug}`;
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
                <span className="text-lg font-black tracking-tight font-['Space_Grotesk']">
                  Bee<span className="text-amber-500">koding</span>
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-amber-500 -mt-1">
                  Edukasi & Riset
                </span>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <Tag className="w-3 h-3" />
                <span>{currentArticle.category}</span>
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

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    {currentArticle.publishedAt}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    {currentArticle.readTimeMinutes} menit baca
                  </span>
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
            <AdSenseSlot slotId="3829104820" format="horizontal" label="Rekomendasi Mitra Edukasi" />

            {/* Article Body Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed space-y-6 text-base sm:text-lg">
              {currentArticle.content.split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                if (trimmed.startsWith('## ')) {
                  return (
                    <h2
                      key={idx}
                      className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white pt-6 border-t border-amber-500/10"
                    >
                      {trimmed.replace('## ', '')}
                    </h2>
                  );
                }

                if (trimmed.startsWith('### ')) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl sm:text-2xl font-bold font-['Space_Grotesk'] text-amber-600 dark:text-amber-400 pt-3"
                    >
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }

                if (trimmed.startsWith('> ')) {
                  return (
                    <blockquote
                      key={idx}
                      className="p-5 rounded-2xl bg-amber-500/10 border-l-4 border-amber-500 text-sm sm:text-base italic text-slate-700 dark:text-slate-300"
                    >
                      {trimmed.replace('> ', '')}
                    </blockquote>
                  );
                }

                if (trimmed.startsWith('```')) {
                  const code = trimmed.replace(/```[a-z]*\n?/g, '').trim();
                  return (
                    <pre
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm overflow-x-auto border border-amber-500/30"
                    >
                      <code>{code}</code>
                    </pre>
                  );
                }

                return (
                  <p key={idx} className="leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Bottom In-Article AdSense Banner */}
            <AdSenseSlot slotId="8492019384" format="auto" label="Sponsor / Google AdSense" />

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

            {/* Social Share Bar */}
            <div className="pt-6 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-amber-500" />
                <span>Bagikan artikel ini ke orang tua lainnya:</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(currentArticle)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Tersalin!</span>
                    </>
                  ) : (
                    <>
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
                {blogArticles
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

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {BLOG_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-sm'
                          : isDark
                          ? 'bg-[#161a27] text-slate-300 border border-slate-800 hover:border-amber-500/40'
                          : 'bg-white text-slate-700 border border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Top In-Feed AdSense Placement */}
            <div className="max-w-4xl mx-auto">
              <AdSenseSlot slotId="1029384756" format="horizontal" label="Iklan Sponsor Edukasi" />
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                {filteredArticles.map((article) => (
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
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-amber-500" />
                            {article.publishedAt}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            {article.readTimeMinutes} mnt
                          </span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 transition-colors">
                          {article.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>
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
              <AdSenseSlot slotId="9584736201" format="auto" label="Sponsor Pilihan" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
