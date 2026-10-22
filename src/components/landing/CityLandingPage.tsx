import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { type CityLandingData, CITIES_DATA } from '../../data/citiesData';
import { getWhatsAppInquiryUrl } from '../../data/content';
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  Star,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';

interface CityLandingPageProps {
  cityData: CityLandingData;
  onBackToHome: () => void;
  onSelectCity?: (citySlug: string) => void;
  onOpenTrialEvents?: () => void;
  onOpenTalentAssessment?: () => void;
}

export const CityLandingPage: React.FC<CityLandingPageProps> = ({
  cityData,
  onBackToHome,
  onSelectCity,
  onOpenTrialEvents,
  onOpenTalentAssessment,
}) => {
  const { isDark } = useTheme();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const defaultWaMsg = `Halo Tim Beekoding, saya orang tua di ${cityData.cityName} dan tertarik mendaftarkan anak saya untuk Free Trial Class Coding. Mohon info jadwal dan persyaratannya.`;
  const trialWaUrl = getWhatsAppInquiryUrl(defaultWaMsg);

  const faqs = [
    {
      q: `Bagaimana sistem belajar kursus coding Beekoding untuk siswa di ${cityData.cityName}?`,
      a: `Seluruh kelas diselenggarakan secara Live Interactive melalui Google Meet bersama mentor berpengalaman. Rasio kelas sangat kecil (maksimal 4 siswa per sesi) atau opsi privat 1-on-1, sehingga layar anak dipantau dan dibimbing langsung saat praktik membuat proyek game atau program.`,
    },
    {
      q: `Apakah anak di ${cityData.cityName} harus memiliki dasar koding atau laptop khusus?`,
      a: `Sama sekali tidak perlu pengalaman koding sebelumnya! Kami membimbing dari tingkat nol (Zero to Hero). Untuk perangkat, cukup laptop atau PC rumah standar dengan peramban Google Chrome dan koneksi internet stabil (minimal 10 Mbps).`,
    },
    {
      q: `Apakah ada sesi uji coba gratis (Free Trial Class) sebelum mendaftar?`,
      a: `Ya, tentu ada! Kami menyediakan sesi 100% Free Trial Class & Diagnostic Test bakat digital bagi orang tua di ${cityData.cityName} agar buah hati dapat merasakan langsung serunya belajar bersama mentor kami sebelum memutuskan berlangganan.`,
    },
    {
      q: `Berapa biaya kursus coding Beekoding untuk wilayah ${cityData.cityName}?`,
      a: `Biaya program reguler kami sangat transparan dan terjangkau, mulai dari Rp 350.000 per bulan untuk kelas kelompok kecil (maksimal 4 anak), tanpa biaya pendaftaran tersembunyi. Tersedia juga paket berjenjang dan opsi privat intensif.`,
    },
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#fbf9f3] text-slate-800'}`}>
      {/* Header Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <MapPin className="w-3.5 h-3.5" />
              <span>{cityData.cityName}</span>
            </span>
            <button
              onClick={() => {
                if (onOpenTrialEvents) {
                  onOpenTrialEvents();
                } else {
                  window.open(trialWaUrl, '_blank');
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Free Trial Class</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-4 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KURSUS CODING ANAK KOTA {cityData.cityName.toUpperCase()}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-['Space_Grotesk'] leading-tight mb-5">
            {cityData.heroHeadline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {cityData.heroSubtitle}
          </p>

          {/* Local Commute Highlight Box */}
          <div
            className={`max-w-2xl mx-auto p-4 rounded-2xl border mb-8 flex items-start gap-3 text-left ${
              isDark ? 'bg-slate-900/80 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
            }`}
          >
            <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shrink-0 font-bold text-lg">🚗❌</div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">
                Bebas Macet di Jalanan {cityData.cityName}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {cityData.localCommuteBenefit}
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (onOpenTrialEvents) {
                  onOpenTrialEvents();
                } else {
                  window.open(trialWaUrl, '_blank');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Daftar Free Trial Class ({cityData.cityName})</span>
            </button>

            {onOpenTalentAssessment && (
              <button
                onClick={onOpenTalentAssessment}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm border transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Cek Minat Anak (1 Menit)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Coverage Areas Section */}
      <section className={`py-10 px-4 border-y ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>Area Jangkauan Siswa di {cityData.cityName} &amp; Sekitarnya</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Siswa Beekoding tersebar di berbagai wilayah kecamatan dan perumahan di {cityData.cityName}:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {cityData.popularAreas.map((area, i) => (
              <span
                key={i}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                }`}
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Pillars of Learning */}
      <section className="py-14 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
            Mengapa Keluarga di {cityData.cityName} Memilih Beekoding?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Metode pedagogi modern yang memadukan kehangatan mentor personal dengan kurikulum teknologi standar MIT &amp; Stanford.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">Rasio Kelas 1:4</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Maksimal 4 anak per kelas. Setiap anak mendapat perhatian penuh tanpa ada yang tertinggal saat coding.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">Jadwal Fleksibel</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Pilihan jadwal sore hari atau akhir pekan yang pas dengan jam sekolah anak di {cityData.cityName}.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">Sertifikat QR Code</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Setiap kelulusan modul dilengkapi sertifikat digital resmi yang dapat diverifikasi publik di Portal Siswa.
            </p>
          </div>

          <div
            className={`p-5 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">Garansi Amanah</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Kepatuhan UU Perlindungan Data Pribadi (UU PDP) menjamin privasi dan keamanan digital anak terjaga 100%.
            </p>
          </div>
        </div>
      </section>

      {/* Program Levels */}
      <section className={`py-14 px-4 ${isDark ? 'bg-slate-900/40' : 'bg-amber-50/40'}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
              Jenjang Kurikulum Pilihan untuk Anak di {cityData.cityName}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Dari pemula usia 6 tahun hingga persiapan kompetisi olimpiade usia 17 tahun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Level 1: Scratch */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Usia 6–10 Tahun (SD)
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
                  Scratch 3.0 &amp; Logic Game
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Visual block coding tanpa mengetik teks rumit. Anak menyusun blok warna-warni layaknya Lego untuk menciptakan game 2D dan animasi cerita seru.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Konsep Perulangan (Loops) &amp; Logika Percabangan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Pembuatan Game Labirin &amp; Arcade Klasik</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Hasil: 4–6 Game Buatan Anak Sendiri</span>
                  </li>
                </ul>
              </div>
              <a
                href={trialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl text-center text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 transition-colors"
              >
                Coba Kelas Scratch Gratis &rarr;
              </a>
            </div>

            {/* Level 2: Roblox */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between relative ${
                isDark ? 'bg-slate-900 border-amber-500/50' : 'bg-white border-amber-300 shadow-lg'
              }`}
            >
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                Paling Favorit
              </div>
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Usia 9–14 Tahun (SD-SMP)
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
                  Roblox Studio &amp; Lua Script
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Mengubah hobi bermain Roblox menjadi keahlian membuat game 3D. Anak belajar arsitektur dunia virtual dan dasar scripting bahasa Lua.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Navigasi Koordinat Ruang 3D (X, Y, Z)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Mekanika Obby (Obstacle Course) &amp; Leaderboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Hasil: Game Roblox 3D yang Bisa Dimainkan Teman</span>
                  </li>
                </ul>
              </div>
              <a
                href={trialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl text-center text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 transition-colors"
              >
                Coba Kelas Roblox Gratis &rarr;
              </a>
            </div>

            {/* Level 3: Python & AI */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Usia 11–17 Tahun (SMP-SMA)
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-3 mb-2">
                  Python Programming &amp; AI
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  Bahasa resmi industri kecerdasan buatan. Belajar sintaksis teks nyata, algoritma pemecahan masalah, game 2D Pygame, dan persiapan olimpiade.
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Struktur Data Python (List, Dict, Functions)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Game 2D Pygame &amp; Machine Learning Dasar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Hasil: Portofolio GitHub untuk Jalur Prestasi / Beasiswa</span>
                  </li>
                </ul>
              </div>
              <a
                href={trialWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl text-center text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-500 transition-colors"
              >
                Coba Kelas Python Gratis &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Testimonial */}
      <section className="py-14 px-4 max-w-3xl mx-auto text-center">
        <div
          className={`p-8 rounded-3xl border relative ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          <div className="flex justify-center gap-1 mb-4 text-amber-400">
            {[...Array(cityData.testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>

          <blockquote className="text-base sm:text-lg text-slate-700 dark:text-slate-200 italic mb-6 leading-relaxed">
            &ldquo;{cityData.testimonial.quote}&rdquo;
          </blockquote>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {cityData.testimonial.parentName}
            </h4>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
              📍 Domisili: {cityData.testimonial.area}
            </p>
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className={`py-14 px-4 ${isDark ? 'bg-slate-900/30' : 'bg-slate-100/60'}`}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
              FAQ Seputar Les Coding di {cityData.cityName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Jawaban cepat untuk pertanyaan yang sering diajukan orang tua.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-amber-500 font-bold text-lg">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Link Other Cities */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Tersedia Juga Kursus Coding Anak di Kota Lainnya:
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Jaringan bimbingan coding online interaktif Beekoding menjangkau kota-kota utama di Indonesia:
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CITIES_DATA.map((c) => {
            const isCurrent = c.slug === cityData.slug;
            return (
              <button
                key={c.slug}
                onClick={() => {
                  if (onSelectCity) {
                    onSelectCity(c.slug);
                  } else {
                    window.location.href = `/${c.slug}`;
                  }
                }}
                disabled={isCurrent}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500 shadow'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                }`}
              >
                📍 Kursus Coding {c.cityName}
              </button>
            );
          })}
        </div>

        {/* Helpful High-Intent Guide Links for Parents */}
        <div className="mt-10 p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 text-center">
          <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan Membaca untuk Orang Tua Cerdas</span>
          </h4>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="/blog/biaya-kursus-coding-anak-2026-panduan-lengkap"
              className="text-amber-600 dark:text-amber-400 underline hover:brightness-125 font-semibold"
            >
              Berapa Biaya Kursus Coding Anak 2026?
            </a>
            <span className="text-slate-400">&bull;</span>
            <a
              href="/blog/kursus-coding-online-vs-offline-anak"
              className="text-amber-600 dark:text-amber-400 underline hover:brightness-125 font-semibold"
            >
              Kursus Online vs Offline: Mana Lebih Efektif?
            </a>
            <span className="text-slate-400">&bull;</span>
            <a
              href="/blog/panduan-usia-belajar-coding-anak-scratch-roblox-python"
              className="text-amber-600 dark:text-amber-400 underline hover:brightness-125 font-semibold"
            >
              Panduan Usia Belajar Scratch, Roblox &amp; Python
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] mb-3">
            Siap Mengasah Potensi Digital Buah Hati di {cityData.cityName}?
          </h2>
          <p className="text-sm font-medium text-slate-900/90 mb-6">
            Daftarkan ananda dalam sesi Free Trial Class 45 menit. Bebas biaya dan konsultasikan langsung bakat digital ananda bersama Lead Mentor kami.
          </p>
          <a
            href={trialWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-amber-500 bg-slate-950 hover:bg-slate-900 shadow-xl transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-amber-400" />
            <span>Klaim Free Trial Class Sekarang</span>
          </a>
        </div>
      </section>
    </div>
  );
};
