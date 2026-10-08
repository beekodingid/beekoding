import React, { useState } from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { Mail, Phone, Globe, ArrowUp, Shield, GraduationCap, BookOpen, Smartphone } from 'lucide-react';
import { LegalModal, type LegalTabType } from './common/LegalModal';

interface FooterProps {
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenAdmin?: () => void;
  onOpenStudentPortal?: () => void;
  onOpenBlog?: () => void;
  onOpenAgeLanding?: (tier: 'sd' | 'teens') => void;
  onOpenGlossary?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenAdmin,
  onOpenStudentPortal,
  onOpenBlog,
  onOpenAgeLanding,
  onOpenGlossary,
}) => {
  const { isDark } = useTheme();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTabType>('privacy');

  const handleOpenLegal = (tab: LegalTabType) => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

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
                    src="/beekoding-logo.png"
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
                Bee<span className="text-amber-500">koding</span>
              </span>
            </a>
            <span
                className={`block text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold -mt-0.5 ${
                  isDark ? 'text-amber-300/80' : 'text-amber-700'
                }`}
              >
                Next-Gen Coding & AI Learning for Kids
              </span>
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
                <button
                  type="button"
                  onClick={onOpenBlog || (() => (window.location.hash = '#blog'))}
                  className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <span>📰 Blog & Artikel Edukasi</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGlossary || (() => (window.location.hash = '#glosarium'))}
                  className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <span>📖 Kamus & Glosarium Koding</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('beekoding:open-pwa-install'))}
                  className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                  <span>📲 Pasang Aplikasi Beekoding (PWA)</span>
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
                <a
                  href="/kursus-coding-anak-sd"
                  onClick={(e) => {
                    if (onOpenAgeLanding) {
                      e.preventDefault();
                      onOpenAgeLanding('sd');
                    }
                  }}
                  className={`text-left flex items-center gap-1.5 font-bold transition-colors ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Coding Anak SD (Usia 6–10 Thn)
                </a>
              </li>
              <li>
                <a
                  href="/kursus-python-remaja-smp-sma"
                  onClick={(e) => {
                    if (onOpenAgeLanding) {
                      e.preventDefault();
                      onOpenAgeLanding('teens');
                    }
                  }}
                  className={`text-left flex items-center gap-1.5 font-bold transition-colors ${
                    isDark ? 'text-amber-400 hover:text-amber-300' : 'text-amber-700 hover:text-amber-900'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Python & AI Remaja SMP-SMA
                </a>
              </li>
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
              <li className="pt-1.5 border-t border-amber-300/30 dark:border-slate-800">
                <a
                  href="/curriculum/silabus-summer-bootcamp-2026.pdf"
                  download="Silabus-Summer-Bootcamp-Beekoding-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold flex items-center gap-1.5 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <span>📄 Unduh Silabus PDF</span>
                </a>
              </li>
              <li>
                <a
                  href="/curriculum/kurikulum-lengkap-beekoding-2026.pdf"
                  download="Grand-Prospectus-Kurikulum-Beekoding-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold flex items-center gap-1.5 text-amber-500 hover:text-amber-400 transition-colors"
                >
                  <span>📚 Grand Prospectus PDF</span>
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
          className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${
            isDark ? 'text-slate-500' : 'text-slate-600'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© 2026 Beekoding. Seluruh Hak Cipta Dilindungi.</span>
            <div className="flex items-center gap-3 text-[11px]">
              <button
                type="button"
                onClick={() => handleOpenLegal('privacy')}
                className="hover:text-amber-500 transition-colors underline cursor-pointer"
              >
                Kebijakan Privasi
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleOpenLegal('terms')}
                className="hover:text-amber-500 transition-colors underline cursor-pointer"
              >
                Syarat Layanan
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleOpenLegal('disclaimer')}
                className="hover:text-amber-500 transition-colors underline cursor-pointer"
              >
                Penafian
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={onOpenBlog || (() => (window.location.hash = '#blog'))}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Blog Edukasi</span>
            </button>

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
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('beekoding:open-pwa-install'))}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-500" />
              <span>Pasang Aplikasi</span>
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

        {/* Legal Policies Modal (AdSense & Compliance) */}
        <LegalModal
          isOpen={legalModalOpen}
          onClose={() => setLegalModalOpen(false)}
          initialTab={legalTab}
        />
      </div>
    </footer>
  );
};
