import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { siteConfig } from '../data/content';
import { FAQ_CATEGORIES, FAQ_ITEMS, type FAQItem } from '../data/faqData';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const FAQ: React.FC = () => {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1'); // Default buka item pertama

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchQuery =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab Seputar Kursus</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Pertanyaan yang{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Sering Diajukan
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Temukan jawaban lengkap seputar metode pembelajaran, perangkat yang dibutuhkan,
            sertifikasi resmi, dan pendampingan mentor untuk buah hati Anda.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan (misal: perangkat, sertifikat, jadwal, trial)..."
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border text-sm transition-all outline-none ${
                isDark
                  ? 'bg-[#151928] border-slate-800 text-white placeholder-slate-500 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-sm'
              }`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {FAQ_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : isDark
                      ? 'bg-[#151928] text-slate-400 hover:text-white border border-slate-800'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div
              className={`p-8 rounded-2xl text-center border ${
                isDark ? 'bg-[#151928] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-semibold">Tidak menemukan pertanyaan yang cocok.</p>
              <p className="text-xs mt-1">Coba gunakan kata kunci lain atau hubungi kami langsung via WhatsApp.</p>
            </div>
          ) : (
            filteredItems.map((item: FAQItem) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? isDark
                        ? 'bg-[#151928] border-amber-500/40 shadow-lg shadow-black/40'
                        : 'bg-white border-amber-300 shadow-md shadow-amber-900/5'
                      : isDark
                      ? 'bg-[#121520]/80 border-slate-800/80 hover:border-slate-700'
                      : 'bg-white/80 border-slate-200/80 hover:border-amber-200 shadow-sm'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      {item.isPopular && (
                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-black uppercase">
                          <Sparkles className="w-3 h-3" />
                          Populer
                        </span>
                      )}
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isExpanded
                            ? 'text-amber-500'
                            : isDark
                            ? 'text-white'
                            : 'text-slate-900'
                        }`}
                      >
                        {item.question}
                      </span>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                        isExpanded
                          ? 'rotate-180 bg-amber-500 text-slate-950'
                          : isDark
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isExpanded && (
                    <div
                      className={`px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t transition-opacity animate-fadeIn ${
                        isDark
                          ? 'border-slate-800/60 text-slate-300'
                          : 'border-slate-100 text-slate-600'
                      }`}
                    >
                      <p className="pt-4">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Help Banner */}
        <div
          className={`mt-10 p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden transition-all ${
            isDark
              ? 'bg-gradient-to-br from-[#1c1b2f] to-[#121520] border-amber-500/25 shadow-xl'
              : 'bg-gradient-to-br from-amber-50/80 to-yellow-50/50 border-amber-200 shadow-xl'
          }`}
        >
          <h3
            className={`text-lg sm:text-xl font-black mb-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Masih Punya Pertanyaan Lain?
          </h3>
          <p
            className={`text-xs sm:text-sm max-w-xl mx-auto mb-5 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Tim konsultan pendidikan Beekoding siap berdiskusi mengenai minat, bakat teknologi anak,
            serta rekomendasi kelas terbaik sesuai kebutuhan Anda.
          </p>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat WhatsApp dengan Tim Beekoding</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
