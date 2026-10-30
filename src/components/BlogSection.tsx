import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { getBlogArticles, type BlogArticle } from '../services/blogStorage';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Sparkles,
  Rocket,
  Flame,
} from 'lucide-react';

interface BlogSectionProps {
  onOpenBlog: (slug?: string) => void;
  onOpenTrialEvents?: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Coding Anak': {
    bg: 'bg-amber-500/15',
    text: 'text-amber-500',
    border: 'border-amber-500/30',
  },
  'Artificial Intelligence': {
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
  },
  'Parenting Digital': {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-500',
    border: 'border-emerald-500/30',
  },
  'Game Dev': {
    bg: 'bg-sky-500/15',
    text: 'text-sky-400',
    border: 'border-sky-500/30',
  },
};

function formatPreviewDate(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('-');
  if (parts.length === 3 && parts[0].length === 4) {
    const year = parts[0];
    const monthNum = parseInt(parts[1], 10);
    const day = parts[2].padStart(2, '0');
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    const monthName = monthNames[monthNum - 1] || parts[1];
    return `${day} ${monthName} ${year}`;
  }
  return dateStr;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onOpenBlog,
  onOpenTrialEvents,
}) => {
  const { isDark } = useTheme();
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const all = getBlogArticles();
    setArticles(all);
  }, []);

  // Ambil 3 artikel terpopuler & paling strategis untuk orang tua
  const featuredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    // Prioritaskan artikel kunci (Biaya, AI Dasar, Parenting Digital)
    const prioritySlugs = [
      'biaya-kursus-coding-anak-2026-panduan-lengkap',
      '5-alasan-anak-belajar-coding-ai-sejak-dini',
      'tips-digital-parenting-ubah-konsumen-jadi-kreator',
    ];

    const selected: BlogArticle[] = [];
    for (const slug of prioritySlugs) {
      const found = articles.find((a) => a.slug === slug);
      if (found) selected.push(found);
    }

    // Jika belum cukup 3, tambahkan artikel lain dari daftar
    for (const a of articles) {
      if (selected.length >= 3) break;
      if (!selected.some((s) => s.slug === a.slug)) {
        selected.push(a);
      }
    }

    return selected.slice(0, 3);
  }, [articles]);

  if (featuredArticles.length === 0) {
    return null;
  }

  return (
    <section
      id="blog"
      className={`py-20 sm:py-24 relative overflow-hidden transition-colors duration-300 border-t ${
        isDark
          ? 'bg-[#0d101a] border-amber-500/20 text-slate-100'
          : 'bg-[#fffdfa] border-amber-200/80 text-slate-800'
      }`}
    >
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-amber-100/80 border-amber-300 text-amber-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>Wawasan &amp; Panduan Edukasi</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Artikel &amp; Panduan Koding{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Masa Depan Anak
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Pelajari strategi membimbing anak di era kecerdasan buatan (AI), panduan koding Scratch hingga Python, dan tips digital parenting dari para mentor Beekoding.
          </p>
        </div>

        {/* 3 Featured Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {featuredArticles.map((article, index) => {
            const catColor = CATEGORY_COLORS[article.category] || {
              bg: 'bg-amber-500/15',
              text: 'text-amber-500',
              border: 'border-amber-500/30',
            };

            return (
              <article
                key={article.slug}
                onClick={() => onOpenBlog(article.slug)}
                className={`group rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 hover:shadow-xl ${
                  isDark
                    ? 'bg-[#141824] border-slate-800 hover:border-amber-500/50 hover:shadow-amber-500/5'
                    : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-md shadow-amber-900/5 hover:shadow-amber-500/10'
                }`}
              >
                <div>
                  {/* Thumbnail Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={250}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-md border ${catColor.bg} ${catColor.text} ${catColor.border} bg-opacity-90`}
                      >
                        {article.category}
                      </span>
                      {index === 0 && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3" />
                          <span>Populer</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {formatPreviewDate(article.publishedAt)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {article.readTimeMinutes} mnt baca
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg sm:text-xl font-black font-['Space_Grotesk'] leading-snug line-clamp-2 transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-amber-400'
                          : 'text-slate-900 group-hover:text-amber-600'
                      }`}
                    >
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      className={`text-xs sm:text-sm line-clamp-3 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-amber-500/15 flex items-center justify-between">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-amber-400"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[130px]">
                      {article.author.name}
                    </span>
                  </div>

                  {/* Read More Link */}
                  <span className="inline-flex items-center gap-1 text-xs font-black text-amber-500 group-hover:text-amber-400 transition-colors">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Section Bottom Banner & CTAs */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-6 transition-all ${
            isDark
              ? 'bg-gradient-to-r from-[#141824] via-[#10141f] to-[#141824] border-amber-500/30 shadow-xl shadow-black/20'
              : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-300 shadow-md'
          }`}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4
                className={`text-base sm:text-lg font-black font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Ingin Menjelajahi Lebih Banyak Wawasan &amp; Tips Edukasi?
              </h4>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Tersedia 19+ artikel mendalam seputar Scratch, Python, Roblox, Artificial Intelligence, dan parenting era digital.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onOpenBlog()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Jelajahi Seluruh Artikel Blog</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenTrialEvents && (
              <button
                type="button"
                onClick={onOpenTrialEvents}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    : 'bg-white hover:bg-amber-50 text-slate-700 border-amber-200 shadow-xs'
                }`}
              >
                <Rocket className="w-4 h-4 text-amber-500" />
                <span>Klaim Free Trial</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
