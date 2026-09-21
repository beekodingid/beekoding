import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  galleryItems,
  galleryCategories,
  galleryImpactHighlights,
  type GalleryItem,
} from '../data/galleryData';
import {
  Sparkles,
  Play,
  Image as ImageIcon,
  Video as VideoIcon,
  MapPin,
  Calendar,
  Award,
  CheckCircle2,
  X,
  Quote,
  ArrowRight,
  Maximize2,
  ExternalLink,
} from 'lucide-react';

export const Gallery: React.FC = () => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section
      id="gallery"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090b10] border-amber-500/20' : 'bg-[#fbf9f3] border-amber-300/60'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
              isDark
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Dokumentasi & Bukti Kegiatan</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Momen & Nilai Nyata{' '}
            <span className="text-gradient-honey">Kegiatan Beekoding</span>
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Setiap jepretan foto dan tayangan video merekam antusiasme, ketekunan, serta kebanggaan anak-anak saat berhasil menciptakan karya digital pertama mereka.
          </p>
        </div>

        {/* 4 Pillars of Tangible Value (Impact Highlights) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {galleryImpactHighlights.map((stat, idx) => (
            <div
              key={idx}
              className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                isDark
                  ? 'bg-[#111420]/90 border-amber-500/25 hover:border-amber-400/50'
                  : 'bg-white border-amber-200/90 hover:border-amber-400 shadow-md shadow-amber-900/5'
              }`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full pointer-events-none" />
              <span
                className={`text-3xl sm:text-4xl font-black font-['Space_Grotesk'] block mb-1 ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`}
              >
                {stat.value}
              </span>
              <h4
                className={`text-sm sm:text-base font-bold font-['Space_Grotesk'] mb-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {stat.label}
              </h4>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-[1.03]'
                    : isDark
                    ? 'bg-[#151926] text-slate-300 hover:text-white hover:bg-[#1e2436] border border-slate-800'
                    : 'bg-white text-slate-700 hover:text-slate-950 hover:bg-amber-50 border border-amber-200 shadow-xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col ${
                isDark
                  ? 'bg-[#111420]/85 border-amber-500/20 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10'
                  : 'bg-white border-amber-200/90 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-900/10'
              }`}
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Media Type Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-white border border-white/20">
                    {item.type === 'video' ? (
                      <>
                        <VideoIcon className="w-3.5 h-3.5 text-red-400" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Foto</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Duration / Metric Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold backdrop-blur-md bg-amber-500/90 text-slate-950 shadow-md">
                    {item.duration || item.metricBadge}
                  </span>
                </div>

                {/* Play Button Overlay for Videos */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Expand hover hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-xs flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs mb-2.5 text-amber-600 dark:text-amber-400 font-semibold">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold font-['Space_Grotesk'] mb-2 leading-snug group-hover:text-amber-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.caption}
                  </p>
                </div>

                {/* Pedagogical Value / Learning Impact Pill */}
                <div
                  className={`pt-3 border-t text-[11px] font-semibold flex items-center gap-2 ${
                    isDark
                      ? 'border-slate-800 text-amber-300/90'
                      : 'border-amber-100 text-amber-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{item.learningImpact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust Callout */}
        <div
          className={`mt-16 p-8 rounded-3xl border relative overflow-hidden transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-amber-500/15 via-[#131722] to-[#131722] border-amber-500/30'
              : 'bg-gradient-to-r from-amber-100/80 via-white to-amber-50/50 border-amber-300 shadow-xl shadow-amber-900/5'
          }`}
        >
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Award className="w-4 h-4" />
                <span>Nilai Edukatif Terbukti & Terpantau</span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Ingin Mengadakan Workshop Serupa di Sekolah atau Komunitas Anda?
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                Beekoding siap membawa peralatan lengkap, kurikulum adaptif, mobile planetarium, hingga mentor profesional langsung ke lokasi Anda.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center">
              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl font-bold text-center text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
              >
                <span>Undang Beekoding ke Sekolah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/6285311317127?text=Halo%20Beekoding%2C%20saya%20tertarik%20melihat%20dokumentasi%20kegiatan%20dan%20ingin%20tanya%20jadwal%20workshop."
                target="_blank"
                rel="noopener noreferrer"
                className={`px-6 py-3 rounded-xl font-bold text-center text-xs transition-colors flex items-center justify-center gap-2 border ${
                  isDark
                    ? 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10'
                    : 'border-amber-300 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <span>Tanya Jadwal via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Video Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl transition-all ${
              isDark ? 'bg-[#0f121d] border-amber-500/30' : 'bg-white border-amber-300'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Media Display */}
            {selectedItem.type === 'video' ? (
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={`${selectedItem.videoUrl}?autoplay=1`}
                  title={selectedItem.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative max-h-[60vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedItem.thumbnailUrl}
                  alt={selectedItem.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
            )}

            {/* Modal Content Info */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {selectedItem.metricBadge}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedItem.location} ({selectedItem.date})
                </span>
              </div>

              <div>
                <h3
                  className={`text-xl sm:text-2xl font-black font-['Space_Grotesk'] mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {selectedItem.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {selectedItem.caption}
                </p>
              </div>

              {/* Pedagogical Outcome */}
              <div
                className={`p-3.5 rounded-xl text-xs font-medium border flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-[#151926] border-amber-500/30 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Dampak Pembelajaran:</strong>
                  <span>{selectedItem.learningImpact}</span>
                </div>
              </div>

              {/* Student Quote if available */}
              {selectedItem.studentQuote && (
                <div
                  className={`p-4 rounded-xl border relative ${
                    isDark
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-100'
                      : 'bg-amber-50/70 border-amber-300/80 text-amber-950'
                  }`}
                >
                  <Quote className="w-6 h-6 text-amber-500/30 absolute top-3 right-3" />
                  <p className="text-xs sm:text-sm italic mb-2">
                    "{selectedItem.studentQuote.text}"
                  </p>
                  <span className="text-[11px] font-bold block text-amber-600 dark:text-amber-400">
                    — {selectedItem.studentQuote.name} ({selectedItem.studentQuote.grade})
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
