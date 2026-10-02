import React from 'react';
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
} from 'lucide-react';

interface ProgramsProps {
  onOpenBootcampModal: () => void;
  onSelectProgramForInquiry: (programTitle: string) => void;
}

export const Programs: React.FC<ProgramsProps> = ({
  onOpenBootcampModal,
  onSelectProgramForInquiry,
}) => {
  const { isDark } = useTheme();

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
          <div className="text-center max-w-3xl mx-auto mb-12">
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
              Apakah 12 sesi cukup? 12 sesi adalah <strong>1 Modul Tingkat (Level 1)</strong> untuk fondasi awal.
              Orang tua dapat memilih paket semester (24 sesi), tahunan (48 sesi), atau jalur komprehensif 2 tahun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Paket 1: 12 Sesi */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#121622]/90 border-slate-800 hover:border-amber-400/40'
                  : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  Level 1 Foundation
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <h4 className={`text-2xl font-black font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    12 Sesi
                  </h4>
                  <span className="text-xs text-amber-500 font-bold">~3 Bulan</span>
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Membangun fondasi logika berpikir & verifikasi minat awal buah hati terhadap dunia teknologi.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      1 Mini Game / Web Profile mandiri
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      E-Sertifikat Kelulusan Level 1
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Laporan Evaluasi Logika Kognitif
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <a
                  href="#contact"
                  onClick={() => onSelectProgramForInquiry('Paket Starter 3 Bulan (12 Sesi - Foundation)')}
                  className={`w-full py-2.5 rounded-xl text-center text-xs font-bold block transition-all ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Pilih Paket 12 Sesi
                </a>
              </div>
            </div>

            {/* Paket 2: 24 Sesi */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#121622]/90 border-slate-800 hover:border-amber-400/40'
                  : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400">
                  1 Semester (Core Mastery)
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <h4 className={`text-2xl font-black font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    24 Sesi
                  </h4>
                  <span className="text-xs text-amber-500 font-bold">~6 Bulan</span>
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Memperdalam logika terapan. Anak sudah mampu menganalisis bug dan membuat algoritma secara mandiri.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      3 Proyek Aplikasi / Game Interaktif
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Sertifikat Kompetensi Semester Resmi
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Diskon Lanjutan & Bebas Biaya Registrasi
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <a
                  href="#contact"
                  onClick={() => onSelectProgramForInquiry('Paket 1 Semester (24 Sesi - Core Mastery)')}
                  className={`w-full py-2.5 rounded-xl text-center text-xs font-bold block transition-all ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Pilih Paket 24 Sesi
                </a>
              </div>
            </div>

            {/* Paket 3: 48 Sesi (Paling Populer) */}
            <div
              className={`p-6 rounded-3xl border-2 flex flex-col justify-between transition-all relative shadow-xl ${
                isDark
                  ? 'bg-gradient-to-b from-[#1a2032] to-[#121622] border-amber-400/60 shadow-amber-500/10'
                  : 'bg-gradient-to-b from-white to-amber-50/50 border-amber-400 shadow-amber-900/10'
              }`}
            >
              <div className="absolute -top-3.5 right-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 text-[10px] font-black uppercase shadow">
                <Star className="w-3 h-3 fill-current" />
                <span>Rekomendasi Terbaik</span>
              </div>

              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                  Annual Academic Track
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <h4 className={`text-2xl font-black font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    48 Sesi
                  </h4>
                  <span className="text-xs text-amber-500 font-bold">1 Tahun Penuh</span>
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Perjalanan koding tahunan komprehensif. Menguasai 4 level modul, siap kompetisi nasional & olimpiade.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                      6+ Portofolio Proyek Terpublikasi
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                      Bimbingan Lomba / Hackathon Anak
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                      Gratis Welcome Kit & Kaos Resmi Beekoding
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <a
                  href="#contact"
                  onClick={() => onSelectProgramForInquiry('Paket 1 Tahun (48 Sesi - Annual Track)')}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-black block bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-110 transition-all"
                >
                  Pilih Paket 1 Tahun (48 Sesi)
                </a>
              </div>
            </div>

            {/* Paket 4: 96 Sesi (2 Tahun) */}
            <div
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-[#121622]/90 border-slate-800 hover:border-amber-400/40'
                  : 'bg-white border-slate-200 hover:border-amber-400 shadow-md'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-400">
                  Career & College Pathway
                </span>
                <div className="mt-3 flex items-baseline gap-2">
                  <h4 className={`text-2xl font-black font-['Space_Grotesk'] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    96 Sesi
                  </h4>
                  <span className="text-xs text-amber-500 font-bold">2 Tahun</span>
                </div>
                <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Spesialisasi penuh dari pemula hingga mahir (Python, AI & Fullstack). Bekal beasiswa & portofolio kampus.
                </p>

                <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Portofolio GitHub & Domain Pribadi Live
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Surat Rekomendasi Akademik Instruktur
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      Mentoring Inkubasi Ide & Startup Remaja
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <a
                  href="#contact"
                  onClick={() => onSelectProgramForInquiry('Paket 2 Tahun (96 Sesi - Career Pathway)')}
                  className={`w-full py-2.5 rounded-xl text-center text-xs font-bold block transition-all ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Pilih Jalur 2 Tahun
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
