import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  GLOSSARY_TERMS,
  GLOSSARY_CATEGORIES,
  type GlossaryTerm,
} from '../../data/glossaryData';
import { getWhatsAppInquiryUrl } from '../../data/content';
import {
  Search,
  BookOpen,
  ArrowLeft,
  Share2,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Lightbulb,
  Brain,
  Calendar,
} from 'lucide-react';

interface GlossaryViewProps {
  onBackToHome: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenTrialEvents?: () => void;
  initialSlug?: string;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({
  onBackToHome,
  onOpenTalentAssessment,
  onOpenTrialEvents,
  initialSlug,
}) => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSlug, setExpandedSlug] = useState<string | null>(initialSlug || null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  useEffect(() => {
    // Prefetch TalentAssessmentView chunk during idle time
    const prefetchTimer = setTimeout(() => {
      import('../talent/TalentAssessmentView').catch(() => {});
    }, 1200);
    return () => clearTimeout(prefetchTimer);
  }, []);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchCat =
        selectedCategory === 'Semua' || item.category === selectedCategory;
      if (!matchCat) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(q) ||
        (item.englishTerm && item.englishTerm.toLowerCase().includes(q)) ||
        item.shortDefinition.toLowerCase().includes(q) ||
        item.kidsAnalogy.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Handle WhatsApp Share for single term
  const handleShareTerm = (term: GlossaryTerm) => {
    const text = `📖 *Kamus Koding Anak Beekoding*\n\n*${term.term} (${term.englishTerm || ''})*\n💡 *Analogi:* ${term.kidsAnalogy}\n\n📌 *Definisi:* ${term.shortDefinition}\n\nPelajari koding & AI seru untuk anak di: https://beekoding.pages.dev/glosarium`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyTermLink = (slug: string) => {
    const url = `${window.location.origin}/glosarium#${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  };

  const handleWhatsAppConsultation = (termName?: string) => {
    const message = termName
      ? `Halo mentor Beekoding, saya sedang membaca kamus koding tentang "${termName}". Mau tanya kelas belajar coding untuk anak saya ya.`
      : 'Halo mentor Beekoding, saya ingin konsultasi mengenai kelas coding & AI untuk anak pemula. Mohon info kelas trial gratisnya ya.';
    const url = getWhatsAppInquiryUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0b0e14] text-slate-100' : 'bg-[#fbf9f3] text-slate-900'
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. TOP HEADER NAVIGATION                                                 */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
          isDark
            ? 'bg-[#0b0e14]/90 border-amber-500/20 shadow-md shadow-black/40'
            : 'bg-[#fffdf8]/95 border-amber-300/60 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToHome}
              className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold border ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50'
                  : 'bg-white border-amber-200 text-slate-700 hover:text-slate-900 hover:border-amber-400'
              }`}
              title="Kembali ke Beranda Beekoding"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  onBackToHome();
                }}
                className="flex items-center gap-2"
              >
                <span className="text-lg font-black font-['Space_Grotesk'] tracking-tight">
                  Bee<span className="text-amber-500">koding</span>
                </span>
              </a>
              <span className="text-slate-400 text-xs hidden md:inline">/</span>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Glosarium Koding & AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleWhatsAppConsultation()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Konsultasi WA</span>
              <span className="sm:hidden">WA</span>
            </button>
            {onOpenTalentAssessment && (
              <button
                type="button"
                onClick={onOpenTalentAssessment}
                onMouseEnter={() => import('../talent/TalentAssessmentView')}
                onTouchStart={() => import('../talent/TalentAssessmentView')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-110 text-slate-950 shadow-md transition-all cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Tes Bakat</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SEARCH BANNER                                                     */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden border-b border-amber-500/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Kamus Pintar Coding & Artificial Intelligence untuk Pemula</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight leading-tight mb-4">
            Kamus Istilah Koding & AI{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400">
              Ramah Anak & Pemula
            </span>
          </h1>

          <p
            className={`text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Memahami istilah teknologi tidak harus rumit! Di sini semua istilah dijelaskan dengan{' '}
            <strong className="text-amber-500">analogi seru dunia nyata</strong> yang mudah dipahami buah hati dan orang tua.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah: Algoritma, Loop, Variabel, Machine Learning, Prompt..."
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border text-sm sm:text-base outline-none transition-all shadow-md ${
                isDark
                  ? 'bg-[#151926] border-slate-700 text-white placeholder-slate-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20'
                  : 'bg-white border-amber-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-amber-900/5'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:opacity-80"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {GLOSSARY_CATEGORIES.map((cat) => {
              const count =
                cat === 'Semua'
                  ? GLOSSARY_TERMS.length
                  : GLOSSARY_TERMS.filter((t) => t.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-extrabold scale-105'
                      : isDark
                      ? 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                      : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-slate-950/20 text-slate-950'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GLOSSARY CARDS GRID                                                    */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg sm:text-2xl font-black font-['Space_Grotesk'] tracking-tight">
              Menampilkan {filteredTerms.length} Istilah Edukatif
            </h2>
            <span className="text-xs text-slate-400 font-semibold">
              Kamus Terbuka Beekoding
            </span>
          </div>

          {filteredTerms.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-amber-500/30">
              <span className="text-4xl mb-3 inline-block">🔍</span>
              <h3 className="text-lg font-bold mb-2">Istilah Tidak Ditemukan</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                Tidak ada istilah yang cocok dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain atau jelajahi kategori di atas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                }}
                className="px-5 py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Tampilkan Semua Istilah
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTerms.map((item) => {
                const isExpanded = expandedSlug === item.slug;
                const isCopied = copiedSlug === item.slug;
                return (
                  <article
                    id={item.slug}
                    key={item.slug}
                    className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-200 ${
                      isDark
                        ? 'bg-[#121622] border-slate-800 hover:border-amber-500/40 shadow-lg'
                        : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl select-none">{item.icon}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleCopyTermLink(item.slug)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
                            title="Salin tautan istilah ini"
                          >
                            <span>{isCopied ? 'Tersalin!' : '🔗'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleShareTerm(item)}
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                            title="Bagikan ke WhatsApp"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Term Title */}
                      <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] tracking-tight mb-1">
                        {item.term}
                      </h3>
                      {item.englishTerm && (
                        <p className="text-xs text-slate-400 font-semibold mb-3">
                          Bahasa Inggris: <span className="italic">{item.englishTerm}</span>
                        </p>
                      )}

                      {/* Kid-Friendly Analogy Box */}
                      <div
                        className={`p-4 rounded-2xl mb-4 border transition-colors ${
                          isDark
                            ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
                            : 'bg-amber-50 border-amber-200 text-amber-950'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Analogi Seru Dunia Nyata:</span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {item.kidsAnalogy}
                        </p>
                      </div>

                      {/* Short Definition */}
                      <p
                        className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        {item.shortDefinition}
                      </p>

                      {/* Expanded Section: Detailed Explanation & Example */}
                      {isExpanded && (
                        <div className="pt-4 border-t border-slate-700/30 dark:border-slate-800 space-y-4 mb-4 animate-in fade-in duration-200">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              📖 Penjelasan Lebih Mendalam:
                            </span>
                            <p
                              className={`text-xs sm:text-sm leading-relaxed ${
                                isDark ? 'text-slate-300' : 'text-slate-700'
                              }`}
                            >
                              {item.detailedExplanation}
                            </p>
                          </div>

                          <div
                            className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                              isDark
                                ? 'bg-slate-900 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className="font-bold text-emerald-500 block mb-1">
                              ✨ Contoh Nyata di Koding / Game:
                            </span>
                            <p className="font-mono text-xs">{item.example}</p>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-3 border-t border-slate-700/20 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setExpandedSlug(isExpanded ? null : item.slug)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 cursor-pointer"
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : 'Lihat Contoh & Detail'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppConsultation(item.term)}
                        className="text-[11px] font-bold text-slate-400 hover:text-emerald-500 transition-colors"
                      >
                        Praktikkan di Kelas WA →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION CTA FOR PARENTS & STUDENTS                              */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-3xl mb-2 inline-block">🚀</span>
          <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] tracking-tight mb-4">
            Ingin Anak Langsung Praktik Membuat Game & AI?
          </h2>
          <p className="text-sm sm:text-base font-semibold max-w-2xl mx-auto mb-8 opacity-90">
            Teori saja tidak cukup! Bersama mentor sabar Beekoding, anak belajar konsep di atas secara langsung dengan menciptakan game dan proyek teknologi nyata.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                if (onOpenTrialEvents) {
                  onOpenTrialEvents();
                } else {
                  handleWhatsAppConsultation();
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm sm:text-base font-black bg-slate-950 text-amber-400 hover:bg-slate-900 shadow-xl transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Daftar Free Trial Class</span>
            </button>

            <button
              type="button"
              onClick={() => handleWhatsAppConsultation()}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Tanya Jadwal via WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 border-t border-slate-700/20">
        <p>© 2026 Beekoding. Glosarium & Kamus Edukasi Coding Anak Indonesia.</p>
      </footer>
    </div>
  );
};
