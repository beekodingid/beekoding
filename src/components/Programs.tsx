import React, { useState } from 'react';
import { flagshipPrograms, getWhatsAppInquiryUrl } from '../data/content';


import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  GraduationCap,
  Star,
  FileText,
  Download,
  Layers,
  MessageCircle,
} from 'lucide-react';

const STAGES_PATHWAY_DATA = {
  junior: {
    id: 'junior' as const,
    name: 'Tahap 1: Junior Explorer',
    ageRange: 'Usia 6–9 Tahun (TK B & SD Kelas 1–3)',
    icon: '🐱',
    tagline: 'Scratch 3.0, Animasi Visual, Logika Blok, Game Labirin & AI Speech',
    pdfUrl: '/curriculum/panduan-instruktur-junior-explorer.pdf',
    pdfName: 'Panduan-Instruktur-Junior-Explorer-Sesi-01-96.pdf',
    tracks: [
      {
        sessions: 12,
        period: '~3 Bulan',
        badge: 'Level 1 Foundation',
        levelRange: 'Sesi 01 – 12',
        tag: 'Starter Minat',
        description: 'Membangun fondasi logika komputasional & verifikasi minat awal buah hati terhadap dunia coding.',
        focus: 'Scratch 3.0, Motion, Events, Loops & Text-to-Speech AI',
        deliverables: [
          '1 Game Arcade Bee Honey Harvest mandiri',
          'Animasi cerita interaktif bersuara dengan AI',
          'E-Sertifikat Kelulusan Level 1 & Evaluasi Logika',
        ],
        inquiryTitle: 'Tahap 1: Junior Explorer (Usia 6-9 Thn) - Paket Starter 12 Sesi',
      },
      {
        sessions: 24,
        period: '~6 Bulan',
        badge: 'Level 1–2 Mastery',
        levelRange: 'Sesi 01 – 24 (1 Semester)',
        tag: 'Semester Track',
        description: 'Memperdalam logika percabangan, interaksi sensor kamera webcam & pembuatan game fisika 2D mandiri.',
        focus: 'Video Sensing Webcam, Broadcast System & Game Fisika',
        deliverables: [
          '3 Game Interaktif Utuh buatan sendiri',
          'Game kontrol sensor gerakan tangan via webcam',
          'Sertifikat Kompetensi Semester & Bebas Biaya Registrasi',
        ],
        inquiryTitle: 'Tahap 1: Junior Explorer (Usia 6-9 Thn) - Paket 1 Semester 24 Sesi',
      },
      {
        sessions: 48,
        period: '1 Tahun Penuh',
        badge: 'Level 1–4 Annual Track',
        levelRange: 'Sesi 01 – 48 (Tahun ke-1)',
        tag: 'Paling Diminati',
        isPopular: true,
        description: 'Kurikulum tahunan komprehensif. Menguasai game arcade tingkat lanjut, matematika visual & robotika simulasi.',
        focus: 'Game Arcade Multi-Level, Pen Extension & Robotika Scratch',
        deliverables: [
          '6+ Portofolio Game Siap Dipublikasikan',
          'Bimbingan Lomba & Olimpiade Coding Anak',
          'Gratis Welcome Kit & Kaos Resmi Beekoding',
        ],
        inquiryTitle: 'Tahap 1: Junior Explorer (Usia 6-9 Thn) - Paket 1 Tahun (48 Sesi)',
      },
      {
        sessions: 96,
        period: '2 Tahun Penuh',
        badge: 'Level 1–8 Full Pathway',
        levelRange: 'Sesi 01 – 96 (Pathway Lengkap)',
        tag: 'Pathway Lengkap',
        description: 'Jalur tuntas 2 tahun: dari balok Scratch hingga transisi lancar ke teks Python Kids dan AI mandiri.',
        focus: 'Transisi Python Kids, AI Logic, Portofolio Web & Wisuda',
        deliverables: [
          'Portofolio Digital Lengkap Siap Dipamerkan',
          'Transisi Mulus Menuju Intermediate Coder',
          'Wisuda Akbar 2 Tahun & Trophy Prestasi',
        ],
        inquiryTitle: 'Tahap 1: Junior Explorer (Usia 6-9 Thn) - Paket 2 Tahun (96 Sesi)',
      },
    ],
  },
  intermediate: {
    id: 'intermediate' as const,
    name: 'Tahap 2: Intermediate Coder',
    ageRange: 'Usia 10–12 Tahun (SD Kelas 4–6 / SMP Kelas 7)',
    icon: '🐍',
    tagline: 'App Inventor Mobile APK, Roblox Studio Lua 3D & Python Logic',
    pdfUrl: '/curriculum/panduan-instruktur-intermediate-coder.pdf',
    pdfName: 'Panduan-Instruktur-Intermediate-Coder-Sesi-01-96.pdf',
    tracks: [
      {
        sessions: 12,
        period: '~3 Bulan',
        badge: 'Level 1 Mobile Dev',
        levelRange: 'Sesi 01 – 12',
        tag: 'Starter Mobile',
        description: 'Membangun aplikasi ponsel Android nyata, sensor getar accelerometer & kompilasi file APK langsung.',
        focus: 'MIT App Inventor, Sensor Accelerometer & Build APK',
        deliverables: [
          'Aplikasi Soundboard & Dadu Goyang Fisik',
          'Aplikasi terinstall di smartphone Android sendiri',
          'E-Sertifikat Kelulusan Level 1 Mobile Creator',
        ],
        inquiryTitle: 'Tahap 2: Intermediate Coder (Usia 10-12 Thn) - Paket Starter 12 Sesi',
      },
      {
        sessions: 24,
        period: '~6 Bulan',
        badge: 'Level 1–2 Mastery',
        levelRange: 'Sesi 01 – 24 (1 Semester)',
        tag: 'Semester Track',
        description: 'Pembuatan game 3D multiplayer di Roblox Studio menggunakan kode skrip bahasa Lua nyata.',
        focus: 'Roblox Studio 3D, Pemrograman Skrip Lua & Obby Parkour',
        deliverables: [
          'Game 3D Obby Parkour Multiplayer Roblox',
          'Sistem Koin & Leaderstats Pemain Aktif',
          'Sertifikat Kompetensi Pemrograman Semester',
        ],
        inquiryTitle: 'Tahap 2: Intermediate Coder (Usia 10-12 Thn) - Paket 1 Semester 24 Sesi',
      },
      {
        sessions: 48,
        period: '1 Tahun Penuh',
        badge: 'Level 1–4 Annual Track',
        levelRange: 'Sesi 01 – 48 (Tahun ke-1)',
        tag: 'Paling Diminati',
        isPopular: true,
        description: 'Transisi mantap ke coding teks murni Python dan pembuatan game arcade 2D mandiri dengan Pygame.',
        focus: 'Python Data Logic, Fungsi, Algoritma OOP & Pygame Arcade',
        deliverables: [
          'Game Space Shooter Pygame Berpapan Skor',
          'Portofolio Proyek Python Mandiri',
          'Gratis Welcome Kit & Bimbingan Kompetisi Siswa',
        ],
        inquiryTitle: 'Tahap 2: Intermediate Coder (Usia 10-12 Thn) - Paket 1 Tahun (48 Sesi)',
      },
      {
        sessions: 96,
        period: '2 Tahun Penuh',
        badge: 'Level 1–8 Full Pathway',
        levelRange: 'Sesi 01 – 96 (Pathway Lengkap)',
        tag: 'Pathway Lengkap',
        description: 'Spesialisasi penuh 2 tahun mencakup Web Development, Cloud Database Firebase & AI Vision.',
        focus: 'Fullstack Web Dasar, Cloud Database, Computer Vision & Grand Demo Day',
        deliverables: [
          'Web App Pribadi Terpublikasi di Internet',
          'Surat Rekomendasi Instruktur untuk Portofolio Siswa',
          'Wisuda Akbar 2 Tahun & Trophy Master Intermediate',
        ],
        inquiryTitle: 'Tahap 2: Intermediate Coder (Usia 10-12 Thn) - Paket 2 Tahun (96 Sesi)',
      },
    ],
  },
  teens: {
    id: 'teens' as const,
    name: 'Tahap 3: Teens Innovator',
    ageRange: 'Usia 13–17 Tahun (SMP & SMA / SMK)',
    icon: '⚡',
    tagline: 'Python Pro, Modern Fullstack Web, Applied AI & Tech Entrepreneurship',
    pdfUrl: '/curriculum/panduan-instruktur-teens-innovator.pdf',
    pdfName: 'Panduan-Instruktur-Teens-Innovator-Sesi-01-96.pdf',
    tracks: [
      {
        sessions: 12,
        period: '~3 Bulan',
        badge: 'Level 1 Python Pro',
        levelRange: 'Sesi 01 – 12',
        tag: 'Fondasi Teks',
        description: 'Penguasaan dasar Python profesional, algoritma struktur data terapan, dan otomasi CLI.',
        focus: 'Python Data Structure, File I/O, OOP Class & CLI Automation',
        deliverables: [
          'Sistem Otomasi CLI & Manajemen Data File',
          'Portofolio Logika Algoritma Berstandar Industri',
          'E-Sertifikat Kelulusan Level 1 Python Developer',
        ],
        inquiryTitle: 'Tahap 3: Teens Innovator (Usia 13-17 Thn) - Paket Starter 12 Sesi',
      },
      {
        sessions: 24,
        period: '~6 Bulan',
        badge: 'Level 1–2 Mastery',
        levelRange: 'Sesi 01 – 24 (1 Semester)',
        tag: 'Semester Track',
        description: 'Membangun antarmuka web modern dengan HTML5, Tailwind CSS, JavaScript & integrasi REST API.',
        focus: 'Modern Web Engineering, UI/UX Responsive, REST API & Git',
        deliverables: [
          'Website Interaktif Terhubung API Data Publik',
          'Repositori Proyek GitHub Aktif',
          'Sertifikat Kompetensi Semester Standar Industri',
        ],
        inquiryTitle: 'Tahap 3: Teens Innovator (Usia 13-17 Thn) - Paket 1 Semester 24 Sesi',
      },
      {
        sessions: 48,
        period: '1 Tahun Penuh',
        badge: 'Level 1–4 Annual Track',
        levelRange: 'Sesi 01 – 48 (Tahun ke-1)',
        tag: 'Paling Diminati',
        isPopular: true,
        description: 'Kecerdasan Buatan Terapan, Machine Learning, Prompt Engineering & Computer Vision OpenCV.',
        focus: 'Applied AI, Machine Learning Scikit-Learn, OpenCV & Chatbot Model',
        deliverables: [
          'Model Bot AI Cerdas Mandiri & Deteksi Visual',
          'Portofolio Proyek Machine Learning Teruji',
          'Gratis Welcome Kit & Mentoring Hackathon Remaja',
        ],
        inquiryTitle: 'Tahap 3: Teens Innovator (Usia 13-17 Thn) - Paket 1 Tahun (48 Sesi)',
      },
      {
        sessions: 96,
        period: '2 Tahun Penuh',
        badge: 'Level 1–8 Full Pathway',
        levelRange: 'Sesi 01 – 96 (Pathway Lengkap)',
        tag: 'Pathway Lengkap',
        description: 'Inkubasi produk teknologi utuh: Fullstack SaaS, Live Multi-Cloud Deploy, Pitch Deck & Beasiswa Kuliah.',
        focus: 'Fullstack SaaS, Cloud Deployment CI/CD, Pitch Deck Silicon Valley & Grand Demo Day',
        deliverables: [
          'Produk Web Live dengan Domain & CI/CD Produksi',
          'Portofolio Beasiswa Kuliah & Profil GitHub Unggulan',
          'Wisuda Akbar 2 Tahun & Surat Rekomendasi Industri',
        ],
        inquiryTitle: 'Tahap 3: Teens Innovator (Usia 13-17 Thn) - Paket 2 Tahun (96 Sesi)',
      },
    ],
  },
};

interface ProgramsProps {
  onOpenBootcampModal: () => void;
  onSelectProgramForInquiry: (programTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({
  onOpenBootcampModal,
  onSelectProgramForInquiry,
}) => {
  const { isDark } = useTheme();
  const [selectedStage, setSelectedStage] = useState<'junior' | 'intermediate' | 'teens'>('junior');

  return (
    <section
      id="programs"
      className={`py-24 relative overflow-hidden border-t transition-colors duration-300 ${
        isDark ? 'bg-[#090b10] border-amber-500/20' : 'bg-[#fbf9f3] border-amber-300/60'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${
              isDark
                ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                : 'bg-amber-100 border border-amber-300 text-amber-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Program Unggulan Beekoding</span>
          </div>
          <h2
            className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 font-['Space_Grotesk'] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Jalur Belajar Terbaik untuk{' '}
            <span className="text-gradient-honey">Kreator Masa Depan</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed font-light ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            Kurikulum praktis dan interaktif yang membekali anak dengan keahlian logika pemrograman,
            pengembangan aplikasi, dan Artificial Intelligence terkini.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="space-y-12">
          {flagshipPrograms.map((prog) => {
            const isBootcamp = prog.id === 'bootcamp';

            return (
              <div
                key={prog.id}
                className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-300 ${
                  prog.isPopular
                    ? isDark
                      ? 'bg-gradient-to-b from-[#181d2a] to-[#121520] border-2 border-amber-400/50 shadow-2xl shadow-amber-500/15'
                      : 'bg-white border-2 border-amber-400 shadow-xl shadow-amber-900/10'
                    : isDark
                    ? 'bg-[#121622]/80 border border-amber-500/20 hover:border-amber-400/40'
                    : 'bg-white/90 border border-amber-200 hover:border-amber-400 shadow-md shadow-amber-900/5'
                }`}
              >
                {/* Popular Badge with Bee Icon */}
                {prog.isPopular && (
                  <div className="absolute -top-4 right-6 sm:right-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Pilihan Terfavorit Siswa 2026</span>
                    <span>🐝</span>
                  </div>
                )}

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Left Column: Info & Details */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-4xl sm:text-5xl font-black font-['Space_Grotesk'] select-none ${
                          isDark ? 'text-amber-500/40' : 'text-amber-500/30'
                        }`}
                      >
                        {prog.badge}
                      </span>
                      <div>
                        <h3
                          className={`text-2xl sm:text-3xl font-bold font-['Space_Grotesk'] ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {prog.title}
                        </h3>
                        <p
                          className={`text-sm font-semibold mt-1 ${
                            isDark ? 'text-amber-400' : 'text-amber-700'
                          }`}
                        >
                          {prog.tagline}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-base leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {prog.description}
                    </p>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          isDark
                            ? 'bg-[#1a1f30] text-amber-300 border-amber-500/20'
                            : 'bg-amber-50 text-amber-900 border-amber-300'
                        }`}
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                        {prog.target}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          isDark
                            ? 'bg-[#1a1f30] text-slate-300 border-slate-700/80'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        {prog.duration}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                          isDark
                            ? 'bg-[#1a1f30] text-amber-400 border-amber-500/30'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        {prog.batchSize}
                      </span>
                    </div>

                    {/* Checklist */}
                    <div className="grid sm:grid-cols-2 gap-3 pt-3">
                      {prog.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span
                            className={`text-xs sm:text-sm font-medium ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Enrollment Card */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div
                      className={`p-6 sm:p-8 rounded-2xl border text-center space-y-4 shadow-inner relative overflow-hidden transition-colors ${
                        isDark
                          ? 'bg-[#0f121a] border-amber-500/30'
                          : 'bg-[#fcfaf4] border-amber-200 shadow-sm'
                      }`}
                    >
                      {isBootcamp && (
                        <div
                          className={`flex items-center justify-center gap-2 text-xs font-bold mb-1 ${
                            isDark ? 'text-amber-400' : 'text-amber-800'
                          }`}
                        >
                          <img
                            src="/bee-mascot.webp"
                            alt="Mascot"
                            width={28}
                            height={28}
                            loading="lazy"
                            decoding="async"
                            className="w-7 h-7 object-contain"
                          />
                          <span>Sarang Belajar Intensif 25 Hari</span>
                        </div>
                      )}

                      <div
                        className={`text-xs uppercase tracking-wider font-semibold ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        Pendaftaran & Kuota Kelas
                      </div>

                      {isBootcamp ? (
                        <div className="space-y-3">
                          <div
                            className={`p-3.5 rounded-xl border text-xs text-left ${
                              isDark
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                                : 'bg-amber-100/60 border-amber-300 text-amber-900'
                            }`}
                          >
                            <strong
                              className={`block mb-1 ${
                                isDark ? 'text-amber-300' : 'text-amber-950'
                              }`}
                            >
                              Kuota Maksimal: 25 Siswa per Kelas
                            </strong>
                            Untuk memastikan setiap anak mendapat perhatian penuh dari mentor dan berhasil menyelesaikan proyek AI mandiri.
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={onOpenBootcampModal}
                              className="inline-flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 hover:brightness-110 transition-all duration-200"
                            >
                              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>Lihat Silabus</span>
                            </button>

                            <a
                              href="/curriculum/silabus-summer-bootcamp-2026.pdf"
                              download="Silabus-Summer-Bootcamp-Beekoding-2026.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl font-bold text-xs border transition-all ${
                                isDark
                                  ? 'bg-[#1b2234] hover:bg-amber-500/15 text-amber-300 border-amber-500/30'
                                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                              }`}
                              title="Unduh silabus resmi PDF"
                            >
                              <Download className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              <span>Unduh PDF</span>
                            </a>
                          </div>

                          <a
                            href="#contact"
                            onClick={() => onSelectProgramForInquiry(prog.title)}
                            className={`w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm border transition-colors ${
                              isDark
                                ? 'bg-[#1c2234] hover:bg-[#252c42] text-white border-slate-700'
                                : 'bg-white hover:bg-amber-50 text-slate-900 border-amber-300'
                            }`}
                          >
                            <span>Amankan Kursi Batch 2026</span>
                            <ArrowRight className="w-4 h-4 text-amber-500" />
                          </a>

                          <a
                            href={getWhatsAppInquiryUrl('Summer AI & Coding Bootcamp 2026')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors inline-block pt-1"
                          >
                            Tanya kuota batch via WhatsApp →
                          </a>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p
                            className={`text-xs ${
                              isDark ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            Tersedia untuk pendaftaran individu berkala, kelas privat, maupun implementasi resmi di sekolah.
                          </p>

                          <a
                            href="#contact"
                            onClick={() => onSelectProgramForInquiry(prog.title)}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all duration-200"
                          >
                            <span>{prog.cta}</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>

                          <a
                            href={getWhatsAppInquiryUrl(prog.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-500 hover:text-amber-400 font-bold transition-colors inline-block"
                          >
                            Tanya jadwal via WhatsApp →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Tier Pathway Options Section (12, 24, 48 Sesi / 1-2 Tahun) */}
        <div className="mt-20 pt-16 border-t border-amber-500/20">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 ${
                isDark
                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                  : 'bg-amber-100 border border-amber-300 text-amber-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Multi-Tier Learning Pathway</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight font-['Space_Grotesk'] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Pilihan Skema Durasi Belajar &{' '}
              <span className="text-gradient-honey">Jenjang Berkelanjutan</span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Apakah 12 sesi cukup? 12 sesi adalah <strong>Level 1 Foundation (Fondasi Awal)</strong>.
              Orang tua dapat memilih paket semester (24 sesi), tahunan (48 sesi), atau jalur 2 tahun (96 sesi) sesuai target perkembangan buah hati.
            </p>
          </div>

          {/* Interactive Stage Selector (Junior, Intermediate, Teens) */}
          <div
            className={`p-1.5 rounded-2xl border max-w-3xl mx-auto flex flex-col sm:flex-row gap-1.5 mb-8 shadow-sm ${
              isDark ? 'bg-[#121622] border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {(['junior', 'intermediate', 'teens'] as const).map((stageKey) => {
              const stage = STAGES_PATHWAY_DATA[stageKey];
              const isSelected = selectedStage === stageKey;
              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stageKey)}
                  className={`flex-1 py-3 px-4 rounded-xl text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-[1.01]'
                      : isDark
                      ? 'text-slate-300 hover:bg-slate-800/70 font-semibold'
                      : 'text-slate-700 hover:bg-white font-semibold'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-lg">{stage.icon}</span>
                    <div>
                      <div className="text-xs font-bold leading-tight">{stage.name}</div>
                      <div
                        className={`text-[10px] ${
                          isSelected ? 'text-slate-900 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {stage.ageRange.split('(')[0]}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-slate-950 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Stage Info Header & Official PDF Download */}
          {(() => {
            const currentStage = STAGES_PATHWAY_DATA[selectedStage];
            return (
              <>
                <div
                  className={`p-4 sm:p-5 rounded-2xl border max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isDark
                      ? 'bg-[#151928]/80 border-amber-500/20'
                      : 'bg-white border-amber-200 shadow-sm'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{currentStage.icon}</span>
                      <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {currentStage.name} ({currentStage.ageRange})
                      </h3>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {currentStage.tagline}
                    </p>
                  </div>

                  <a
                    href={currentStage.pdfUrl}
                    download={currentStage.pdfName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 transition-all shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Silabus Lengkap (PDF 96 Sesi)</span>
                  </a>
                </div>

                {/* 4 Cards based on selected stage */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentStage.tracks.map((track) => (
                    <div
                      key={track.sessions}
                      className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative ${
                        track.isPopular
                          ? isDark
                            ? 'bg-gradient-to-b from-[#1a2032] to-[#121622] border-2 border-amber-400/60 shadow-xl shadow-amber-500/10'
                            : 'bg-gradient-to-b from-white to-amber-50/50 border-2 border-amber-400 shadow-xl shadow-amber-900/10'
                          : isDark
                          ? 'bg-[#121622]/90 border-slate-800 hover:border-amber-400/40'
                          : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
                      }`}
                    >
                      {track.isPopular && (
                        <div className="absolute -top-3.5 right-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black uppercase shadow">
                          <Star className="w-3 h-3 fill-current" />
                          <span>Paling Direkomendasikan</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              track.isPopular
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {track.badge}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            {track.levelRange}
                          </span>
                        </div>

                        <div className="mt-2 flex items-baseline gap-2">
                          <h4
                            className={`text-2xl font-black font-['Space_Grotesk'] ${
                              isDark ? 'text-white' : 'text-slate-900'
                            }`}
                          >
                            {track.sessions} Sesi
                          </h4>
                          <span className="text-xs text-amber-500 font-bold">{track.period}</span>
                        </div>

                        <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {track.description}
                        </p>

                        <div className="mt-3 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] font-semibold text-amber-400">
                          <span className="text-amber-500 block text-[10px] uppercase font-bold">Fokus Materi:</span>
                          {track.focus}
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs">
                          {track.deliverables.map((del, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                {del}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-2">
                        <a
                          href="#contact"
                          onClick={() => onSelectProgramForInquiry(track.inquiryTitle)}
                          className={`w-full py-2.5 rounded-xl text-center text-xs font-black block transition-all ${
                            track.isPopular
                              ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110'
                              : isDark
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                          }`}
                        >
                          Pilih Paket {track.sessions} Sesi
                        </a>

                        <a
                          href={getWhatsAppInquiryUrl(
                            track.inquiryTitle,
                            `Saya tertarik konsultasi paket ${track.sessions} Sesi (${track.period}) untuk jenjang ${currentStage.name}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center text-[11px] text-amber-500 hover:text-amber-400 font-bold flex items-center justify-center gap-1.5 pt-1"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Tanya via WhatsApp →</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
