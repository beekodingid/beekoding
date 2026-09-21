import React from 'react';
import { flagshipPrograms, siteConfig } from '../data/content';
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
                            src="/bee-mascot.png"
                            alt="Mascot"
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

                          <button
                            onClick={onOpenBootcampModal}
                            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 transition-all duration-200"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Buka Silabus 24 Sesi</span>
                          </button>

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
                            href={siteConfig.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-500 hover:text-amber-600 font-bold transition-colors inline-block"
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
      </div>
    </section>
  );
};
