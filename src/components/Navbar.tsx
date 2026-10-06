import React, { useState, useEffect, startTransition } from 'react';
import { siteConfig } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, Phone, ArrowRight, Sparkles, Brain, GraduationCap, Calendar, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenBootcampModal: () => void;
  onOpenTalentAssessment?: () => void;
  onOpenStudentPortal?: () => void;
  onOpenTrialEvents?: () => void;
  onOpenBlog?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBootcampModal,
  onOpenTalentAssessment,
  onOpenStudentPortal,
  onOpenTrialEvents,
  onOpenBlog,
}) => {
  const { isDark } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('beekoding_announcement_closed') !== 'true';
  });
  const [activeLink, setActiveLink] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return window.location.hash;
    }
    return '#home';
  });

  const handleDismissAnnouncement = () => {
    setShowAnnouncement(false);
    sessionStorage.setItem('beekoding_announcement_closed', 'true');
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveLink(window.location.hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    let ticking = false;

    const sectionIds = [
      'home',
      'about',
      'programs',
      'events',
      'why-us',
      'showcase',
      'founder',
      'gallery',
      'faq',
      'contact',
    ];

    const updateScrollSpy = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 30);

      // 1. Jika masih di bagian paling atas layar -> aktifkan #home
      if (scrollY < 100) {
        setActiveLink('#home');
        ticking = false;
        return;
      }

      // 2. Jika sudah mendekati bagian paling bawah halaman -> aktifkan #contact
      const isNearBottom =
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80;
      if (isNearBottom) {
        setActiveLink('#contact');
        ticking = false;
        return;
      }

      // 3. Deteksi section yang sedang melintasi garis pandang viewport (160px di bawah navbar)
      const viewportTriggerLine = 160;
      let matchedSection = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= viewportTriggerLine && rect.bottom > viewportTriggerLine) {
            matchedSection = `#${id}`;
            break;
          }
        }
      }

      if (matchedSection) {
        setActiveLink(matchedSection);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollSpy);
        ticking = true;
      }
    };

    // Panggil sekali saat pertama kali dimuat
    updateScrollSpy();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nav links lengkap 10 menu (dipertahankan penuh sesuai permintaan)
  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Program', href: '#programs' },
    { name: 'Workshop', href: '#events' },
    { name: 'Keunggulan', href: '#why-us' },
    { name: 'Karya Siswa', href: '#showcase' },
    { name: 'Visi', href: '#founder' },
    { name: 'Kegiatan', href: '#gallery' },
    { name: 'Blog', href: '#blog' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#0d0f15]/95 backdrop-blur-xl border-b border-amber-500/20 shadow-lg shadow-black/30'
            : 'bg-[#fffdf8]/95 backdrop-blur-xl border-b border-amber-300/60 shadow-md shadow-amber-900/5'
          : showAnnouncement
          ? isDark
            ? 'bg-[#0d0f15]/90 backdrop-blur-md border-b border-amber-500/10'
            : 'bg-[#fffdf8]/90 backdrop-blur-md border-b border-amber-300/40'
          : 'bg-transparent'
      }`}
    >
      {/* Top Urgency & Announcement Banner */}
      {showAnnouncement && (
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-3 py-1.5 text-xs font-bold transition-all relative z-10 shadow-sm border-b border-amber-500/30">
          <div className="w-full max-w-[1880px] px-3 sm:px-6 lg:px-8 xl:px-10 mx-auto flex items-center justify-between gap-2">
            <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black uppercase tracking-wider flex-shrink-0 animate-pulse">
                🔥 Batch Baru Dibuka
              </span>
              <span className="truncate text-slate-950">
                <span className="hidden md:inline">Slot Belajar Kelas Coding & AI Terdekat Dibuka — </span>
                Klaim Free Trial Class & Voucher Spesial!
              </span>
              <button
                type="button"
                onClick={() => {
                  if (onOpenTrialEvents) {
                    onOpenTrialEvents();
                  } else {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1 underline font-black text-slate-950 hover:text-amber-900 transition-colors flex-shrink-0 ml-1 cursor-pointer"
              >
                <span>Klaim Slot Sekarang</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleDismissAnnouncement}
              className="p-1 rounded-full text-slate-900 hover:text-black hover:bg-black/10 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Tutup pengumuman"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      <div
        className={`w-full max-w-[1880px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3 xl:gap-5 transition-all duration-300 ${
          isScrolled ? 'py-2.5' : 'py-3 sm:py-3.5'
        }`}
      >
        {/* Left Side: Brand Logo with Bee Mascot */}
        <div className="flex items-center flex-shrink-0">
          <a
            href="#home"
            onClick={() => setActiveLink('#home')}
            className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-[2px] shadow-md shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-shadow">
                <div
                  className={`w-full h-full rounded-[14px] flex items-center justify-center overflow-hidden transition-colors ${
                    isDark ? 'bg-[#121520]' : 'bg-white'
                  }`}
                >
                  <img
                    src="/beekoding-logo.png"
                    alt="Beekoding"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              {/* Sparkle badge */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            </div>

            <div>
              <span
                className={`text-lg sm:text-xl font-black tracking-tight flex items-center font-['Space_Grotesk'] ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Bee<span className="text-amber-500">koding</span>
              </span>
              <span
                className={`hidden 2xl:block text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold -mt-0.5 ${
                  isDark ? 'text-amber-300/80' : 'text-amber-700'
                }`}
              >
                Next-Gen Coding & AI Learning for Kids
              </span>
            </div>
          </a>
        </div>

        {/* Center: Centered Desktop Navigation with all 10 Menu Links */}
        <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-1 xl:px-2">
          <nav
            aria-label="Navigasi Utama"
            className={`flex items-center gap-0.5 xl:gap-1 px-2.5 xl:px-3 py-1.5 rounded-full backdrop-blur-md shadow-inner transition-colors ${
              isDark
                ? 'bg-[#161924]/85 border border-amber-500/20'
                : 'bg-white/85 border border-amber-300/60 shadow-amber-500/5'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === '#blog' && onOpenBlog) {
                      e.preventDefault();
                      onOpenBlog();
                    } else {
                      setActiveLink(link.href);
                    }
                  }}
                  className={`whitespace-nowrap px-1.5 xl:px-2 2xl:px-2.5 py-1 text-[11px] xl:text-xs 2xl:text-[13px] rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold shadow-sm shadow-amber-500/30'
                      : isDark
                      ? 'text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 font-medium'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-100/60 font-medium'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Header Actions: Buttons + Theme Switch */}
        <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 flex-shrink-0">
          {/* Tombol Portal Siswa & Wali Murid */}
          <button
            type="button"
            onClick={() => {
              if (onOpenStudentPortal) onOpenStudentPortal();
              else window.location.hash = '#portal';
            }}
            className={`whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer ${
              isDark
                ? 'bg-sky-500/15 text-sky-300 border border-sky-500/40 hover:bg-sky-500/25 hover:border-sky-400'
                : 'bg-sky-50 text-sky-900 border border-sky-300 hover:bg-sky-100'
            }`}
            title="Portal Siswa & Wali Murid"
          >
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xl:inline">Portal Siswa</span>
            <span className="xl:hidden">Portal</span>
          </button>

          {/* Tombol Tes Bakat Anak (Gratis) */}
          <button
            type="button"
            onClick={onOpenTalentAssessment}
            className={`whitespace-nowrap inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-sm cursor-pointer ${
              isDark
                ? 'bg-purple-500/15 text-purple-300 border border-purple-500/40 hover:bg-purple-500/25 hover:border-purple-400'
                : 'bg-purple-50 text-purple-900 border border-purple-300 hover:bg-purple-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span className="hidden xl:inline">Tes Bakat Anak</span>
            <span className="xl:hidden">Bakat</span>
            <span className="text-[9px] uppercase font-black px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950">
              Free
            </span>
          </button>

          {/* Tombol Daftar */}
          <a
            href="#contact"
            onClick={() => setActiveLink('#contact')}
            className="whitespace-nowrap inline-flex items-center gap-1 px-3 xl:px-4 py-1.5 rounded-full text-xs xl:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Daftar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Light / Dark Mode Switch di Ujung Kanan */}
          <ThemeToggle />
        </div>

        {/* Mobile: Toggle + Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => {
              startTransition(() => {
                setMobileMenuOpen((prev) => !prev);
              });
            }}
            className={`p-2.5 rounded-xl transition-colors ${
              isDark
                ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/80'
                : 'text-slate-700 hover:text-amber-600 hover:bg-amber-100'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Medium tablet menu button */}
        <button
          onClick={() => {
            startTransition(() => {
              setMobileMenuOpen((prev) => !prev);
            });
          }}
          className={`hidden sm:flex lg:hidden p-2.5 rounded-xl transition-colors ${
            isDark
              ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/80'
              : 'text-slate-700 hover:text-amber-600 hover:bg-amber-100'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-b backdrop-blur-2xl px-6 py-6 transition-all ${
            isDark
              ? 'bg-[#121520]/98 border-amber-500/30 text-white'
              : 'bg-[#fffdf8]/98 border-amber-300/80 text-slate-900 shadow-xl'
          }`}
        >
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === '#blog' && onOpenBlog) {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      onOpenBlog();
                    } else {
                      setActiveLink(link.href);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`text-sm sm:text-base font-medium py-2.5 px-3.5 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20'
                      : isDark
                      ? 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/60'
                      : 'text-slate-700 hover:text-amber-600 hover:bg-amber-100/60'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-slate-950" />
                  )}
                </a>
              );
            })}
            <div className="pt-4 flex flex-col gap-3">
              {/* Blog & Artikel Edukasi */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenBlog) onOpenBlog();
                  else window.location.hash = '#blog';
                }}
                className={`w-full text-center py-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-amber-50 text-amber-900 border-amber-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Blog & Panduan Edukasi</span>
              </button>

              {/* Tes Bakat Anak */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTalentAssessment) onOpenTalentAssessment();
                }}
                className={`w-full text-center py-3 rounded-xl border text-sm font-extrabold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-purple-100 text-purple-900 border-purple-300'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Tes Bakat Digital Anak (Gratis)</span>
              </button>

              {/* Portal Siswa & Wali Murid */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenStudentPortal) onOpenStudentPortal();
                  else window.location.hash = '#portal';
                }}
                className={`w-full text-center py-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                    : 'bg-sky-100 text-sky-900 border-sky-300'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-sky-500" />
                <span>Portal Siswa & Wali Murid</span>
              </button>

              {/* Free Trial Class & Workshop */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenTrialEvents) onOpenTrialEvents();
                }}
                className={`w-full text-center py-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>Jadwal Free Trial Class & Workshop</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBootcampModal();
                }}
                className={`w-full text-center py-3 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Summer AI & Coding Bootcamp 2026</span>
              </button>
              <a
                href="#contact"
                onClick={() => {
                  setActiveLink('#contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20"
              >
                Daftar & Konsultasi Kelas
              </a>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center justify-center gap-2 text-xs text-slate-400 py-1"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
