import React from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, Globe, ArrowUp, Shield, GraduationCap } from 'lucide-react';

interface FooterProps {
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenAdmin?: () => void;
  onOpenStudentPortal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenAdmin,
  onOpenStudentPortal,
}) => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`border-t pt-16 pb-12 transition-colors duration-300 ${
        isDark
          ? 'bg-[#07090f] text-slate-400 border-amber-500/20'
          : 'bg-[#ede7da] text-slate-700 border-amber-300/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
            isDark ? 'border-slate-800' : 'border-amber-300/60'
          }`}
        >
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px] shadow-lg shadow-amber-500/20">
                <div
                  className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#10141e]' : 'bg-white'
                  }`}
                >
                  <img
                    src="/favicon.png"
                    alt="Beekoding Mascot"
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </div>
              <span
                className={`text-2xl font-black tracking-tight font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                bee<span className="text-amber-500">koding</span>
              </span>
            </a>

            <p
              className={`text-sm leading-relaxed max-w-sm ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Sarang Edukasi Coding & AI Generasi Baru. Membimbing anak-anak menjadi kreator teknologi
              yang percaya diri, logis, kreatif, dan siap menyongsong masa depan cerah.
            </p>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <a
                  href={`https://${siteConfig.domain}`}
                  className="hover:text-amber-600 font-semibold transition-colors"
                >
                  {siteConfig.domain}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-amber-600 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="hover:text-amber-600 transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black font-['Space_Grotesk'] uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}
            >
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenTalentAssessment}
                  className={`flex items-center gap-1.5 font-bold transition-colors ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <span>🎯 Tes Bakat Anak (Gratis)</span>
                </button>
              </li>
              <li>
                <a
                  href="#home"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Tentang Beekoding
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Program Unggulan
                </a>
              </li>
              <li>
                <a
                  href="#modules"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Modul Workshop
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Jadwal Trial Class & Event
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Kelebihan Kami
                </a>
              </li>
              <li>
                <a
                  href="#showcase"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Karya Siswa & Testimoni
                </a>
              </li>
              <li>
                <a
                  href="#founder"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Visi Pendiri
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Galeri Kegiatan & Nilai
                </a>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black font-['Space_Grotesk'] uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}
            >
              Program Pilihan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenBootcampModal}
                  className={`text-left flex items-center gap-1.5 transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Summer Bootcamp 2026
                </button>
              </li>
              <li>
                <a
                  href="#programs"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Beekoding AI & Tech Academy
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Mobile Planetarium 360°
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  21st Century Skills Lab
                </a>
              </li>
              <li>
                <a
                  href="#modules"
                  className={`transition-colors ${
                    isDark ? 'hover:text-amber-300' : 'hover:text-amber-600'
                  }`}
                >
                  Pelatihan Guru Era AI
                </a>
              </li>
            </ul>
          </div>

          {/* Pedagogy & Accreditations */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-black font-['Space_Grotesk'] uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-800'
              }`}
            >
              Komitmen Belajar
            </h4>
            <p
              className={`text-xs leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Mengutamakan pembelajaran yang ramah anak, terstruktur, berbasis proyek aplikatif, serta bimbingan intensif kelas kecil.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className={`inline-block px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                    : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50 shadow-sm'
                }`}
              >
                Undang Beekoding ke Sekolah
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'text-slate-500' : 'text-slate-600'
          }`}
        >
          <div>
            © 2026 Beekoding. Seluruh Hak Cipta Dilindungi. Coding & AI for Future-Ready Minds.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenStudentPortal || (() => (window.location.hash = '#portal'))}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-sky-400' : 'text-slate-600 hover:text-sky-600'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
              <span>Portal Siswa</span>
            </button>

            <button
              type="button"
              onClick={onOpenAdmin || (() => (window.location.hash = '#admin'))}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-amber-500" />
              <span>Portal Admin</span>
            </button>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
