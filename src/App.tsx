import { useState, useEffect, lazy, Suspense, startTransition } from 'react';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { ModularPrograms } from './components/ModularPrograms';
import { Audience } from './components/Audience';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';
import { type CodingEvent } from './services/adminStorage';

// Lazy-loaded heavy and below-the-fold modules for maximum initial page load speed & responsiveness
const TrialEventsSection = lazy(() =>
  import('./components/TrialEventsSection').then((m) => ({ default: m.TrialEventsSection }))
);
const StudentShowcase = lazy(() =>
  import('./components/StudentShowcase').then((m) => ({ default: m.StudentShowcase }))
);
const Founder = lazy(() =>
  import('./components/Founder').then((m) => ({ default: m.Founder }))
);
const CourseFinder = lazy(() =>
  import('./components/CourseFinder').then((m) => ({ default: m.CourseFinder }))
);
const Gallery = lazy(() =>
  import('./components/Gallery').then((m) => ({ default: m.Gallery }))
);
const FAQ = lazy(() =>
  import('./components/FAQ').then((m) => ({ default: m.FAQ }))
);
const Contact = lazy(() =>
  import('./components/Contact').then((m) => ({ default: m.Contact }))
);
const TalentAssessmentView = lazy(() =>
  import('./components/talent/TalentAssessmentView').then((m) => ({ default: m.TalentAssessmentView }))
);
const AdminView = lazy(() =>
  import('./components/admin/AdminView').then((m) => ({ default: m.AdminView }))
);
const StudentPortalView = lazy(() =>
  import('./components/portal/StudentPortalView').then((m) => ({ default: m.StudentPortalView }))
);
const BlogView = lazy(() =>
  import('./components/blog/BlogView').then((m) => ({ default: m.BlogView }))
);
const BootcampModal = lazy(() =>
  import('./components/BootcampModal').then((m) => ({ default: m.BootcampModal }))
);
const TrialEventsModal = lazy(() =>
  import('./components/TrialEventsModal').then((m) => ({ default: m.TrialEventsModal }))
);
const AgeTierLandingPage = lazy(() =>
  import('./components/landing/AgeTierLandingPage').then((m) => ({ default: m.AgeTierLandingPage }))
);
const GlossaryView = lazy(() =>
  import('./components/glossary/GlossaryView').then((m) => ({ default: m.GlossaryView }))
);

function AppLoadingFallback({ message = 'Memuat modul...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-[#0d0f15] text-slate-100 flex flex-col items-center justify-center p-6 select-none">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
        <span className="text-2xl"><img src="/bee-mascot.webp" alt="Mascot" width={60} height={60} decoding="sync" className="w-15 h-15 object-contain" /></span>
      </div>
      <span
                className={`text-2xl font-black tracking-tight font-['Space_Grotesk']`}
              >
                Bee<span className="text-amber-500">koding</span>
              </span>
      <p className="text-xs text-slate-400 font-medium">{message}</p>
    </div>
  );
}

export function App() {
  const { isDark } = useTheme();
  const [bootcampModalOpen, setBootcampModalOpen] = useState(false);
  const [trialEventsModalOpen, setTrialEventsModalOpen] = useState(false);
  const [selectedEventForModal, setSelectedEventForModal] = useState<CodingEvent | null>(null);
  const [showTalentAssessment, setShowTalentAssessment] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showStudentPortal, setShowStudentPortal] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [blogSlug, setBlogSlug] = useState<string | undefined>(undefined);
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossarySlug, setGlossarySlug] = useState<string | undefined>(undefined);
  const [ageLandingTier, setAgeLandingTier] = useState<'sd' | 'teens' | null>(null);
  const [selectedProgramForInquiry, setSelectedProgramForInquiry] = useState('Summer AI & Coding Bootcamp 2026');

  // Deteksi URL (clean path /kursus-*, /glosarium, /blog, /admin, /portal, /talent maupun hash #...)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash || '';
      const pathname = window.location.pathname || '';
      const search = window.location.search || '';

      // 1. Prioritaskan route hash spesifik (#talent, #admin, #portal) agar instan aktif dari halaman mana pun
      if (hash === '#talent' || pathname === '/talent') {
        setShowTalentAssessment(true);
        setShowAdmin(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
      } else if (
        hash.startsWith('#admin') ||
        pathname.startsWith('/admin') ||
        hash.includes('type=recovery') ||
        search.includes('type=recovery')
      ) {
        setShowAdmin(true);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
      } else if (
        hash.startsWith('#portal') ||
        pathname.startsWith('/portal') ||
        search.includes('cert=') ||
        search.includes('report=')
      ) {
        setShowStudentPortal(true);
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowBlog(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
      } else if (hash === '#review' || hash === '#showcase' || hash === '#testimoni') {
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
      } else if (
        hash.startsWith('#kursus-coding-anak-sd') ||
        pathname.startsWith('/kursus-coding-anak-sd')
      ) {
        setAgeLandingTier('sd');
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
      } else if (
        hash.startsWith('#kursus-python-remaja-smp-sma') ||
        pathname.startsWith('/kursus-python-remaja-smp-sma')
      ) {
        setAgeLandingTier('teens');
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
      } else if (
        hash.startsWith('#glosarium') ||
        pathname.startsWith('/glosarium')
      ) {
        setShowGlossary(true);
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setAgeLandingTier(null);
        let slug = '';
        if (hash.startsWith('#glosarium/')) {
          slug = hash.replace('#glosarium/', '').trim();
        } else if (pathname.startsWith('/glosarium/')) {
          slug = pathname.replace('/glosarium/', '').trim();
        }
        setGlossarySlug(slug || undefined);
      } else if (hash.startsWith('#blog') || pathname.startsWith('/blog')) {
        setShowBlog(true);
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
        let slug = '';
        if (hash.startsWith('#blog/')) {
          slug = hash.replace('#blog/', '').trim();
        } else if (pathname.startsWith('/blog/')) {
          slug = pathname.replace('/blog/', '').trim();
        }
        setBlogSlug(slug ? slug : undefined);
      } else {
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
        setShowBlog(false);
        setShowGlossary(false);
        setAgeLandingTier(null);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('popstate', handleHashCheck);
    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('popstate', handleHashCheck);
    };
  }, []);

  const handleOpenBootcampModal = () => {
    startTransition(() => {
      setBootcampModalOpen(true);
    });
  };

  const handleCloseBootcampModal = () => {
    startTransition(() => {
      setBootcampModalOpen(false);
    });
  };

  const handleOpenTrialEvents = (event?: CodingEvent) => {
    startTransition(() => {
      setSelectedEventForModal(event || null);
      setTrialEventsModalOpen(true);
    });
  };

  const handleCloseTrialEvents = () => {
    startTransition(() => {
      setTrialEventsModalOpen(false);
      setSelectedEventForModal(null);
    });
  };

  const handleOpenTalentAssessment = () => {
    window.location.hash = '#talent';
    startTransition(() => {
      setShowTalentAssessment(true);
      setShowAdmin(false);
      setAgeLandingTier(null);
      setShowBlog(false);
      setShowGlossary(false);
      setShowStudentPortal(false);
    });
  };

  const handleCloseTalentAssessment = () => {
    startTransition(() => {
      setShowTalentAssessment(false);
      const pathname = window.location.pathname || '';
      if (pathname.startsWith('/kursus-coding-anak-sd')) {
        setAgeLandingTier('sd');
      } else if (pathname.startsWith('/kursus-python-remaja-smp-sma')) {
        setAgeLandingTier('teens');
      } else if (pathname.startsWith('/glosarium')) {
        setShowGlossary(true);
      } else if (pathname.startsWith('/blog')) {
        setShowBlog(true);
      }
    });
    if (window.location.hash === '#talent') {
      window.history.pushState(null, '', window.location.pathname || '/');
    }
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    startTransition(() => {
      setShowAdmin(true);
      setShowTalentAssessment(false);
      setShowStudentPortal(false);
    });
  };

  const handleCloseAdmin = () => {
    startTransition(() => {
      setShowAdmin(false);
    });
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenStudentPortal = () => {
    window.location.hash = '#portal';
    startTransition(() => {
      setShowStudentPortal(true);
      setShowAdmin(false);
      setShowTalentAssessment(false);
    });
  };

  const handleCloseStudentPortal = () => {
    startTransition(() => {
      setShowStudentPortal(false);
    });
    if (window.location.hash === '#portal') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleSelectProgramForInquiry = (programTitle: string) => {
    setSelectedProgramForInquiry(programTitle);
  };

  const handleEnrollFromModal = () => {
    setSelectedProgramForInquiry('Summer AI & Coding Bootcamp 2026');
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBlog = (slug?: string) => {
    const targetUrl = slug ? `/blog/${slug}` : '/blog';
    window.history.pushState(null, '', targetUrl);
    startTransition(() => {
      setShowBlog(true);
      setBlogSlug(slug);
      setShowAdmin(false);
      setShowTalentAssessment(false);
      setShowStudentPortal(false);
    });
  };

  const handleCloseBlog = () => {
    startTransition(() => {
      setShowBlog(false);
      setBlogSlug(undefined);
    });
    if (window.location.hash.startsWith('#blog') || window.location.pathname.startsWith('/blog')) {
      window.history.pushState(null, '', '/');
    }
  };

  const handleOpenAgeLanding = (tier: 'sd' | 'teens') => {
    const slug = tier === 'sd' ? 'kursus-coding-anak-sd' : 'kursus-python-remaja-smp-sma';
    window.history.pushState(null, '', `/${slug}`);
    startTransition(() => {
      setAgeLandingTier(tier);
      setShowBlog(false);
      setShowAdmin(false);
      setShowTalentAssessment(false);
      setShowStudentPortal(false);
    });
  };

  const handleCloseAgeLanding = () => {
    startTransition(() => {
      setAgeLandingTier(null);
    });
    if (
      window.location.hash.includes('kursus-') ||
      window.location.pathname.includes('kursus-')
    ) {
      window.history.pushState(null, '', '/');
    }
  };

  const handleOpenGlossary = (slug?: string) => {
    const targetUrl = slug ? `/glosarium/${slug}` : '/glosarium';
    window.history.pushState(null, '', targetUrl);
    startTransition(() => {
      setShowGlossary(true);
      setGlossarySlug(slug);
      setShowBlog(false);
      setShowAdmin(false);
      setShowTalentAssessment(false);
      setShowStudentPortal(false);
      setAgeLandingTier(null);
    });
  };

  const handleCloseGlossary = () => {
    startTransition(() => {
      setShowGlossary(false);
      setGlossarySlug(undefined);
    });
    if (
      window.location.hash.startsWith('#glosarium') ||
      window.location.pathname.startsWith('/glosarium')
    ) {
      window.history.pushState(null, '', '/');
    }
  };

  // 1. Jika Talent Assessment sedang aktif, utamakan langsung tampil
  if (showTalentAssessment) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Menyiapkan Asesmen Minat & Bakat..." />}>
        <TalentAssessmentView onClose={handleCloseTalentAssessment} />
      </Suspense>
    );
  }

  // Jika Glosarium / Kamus Koding sedang aktif
  if (showGlossary) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Membuka Kamus & Glosarium Koding Anak..." />}>
        <GlossaryView
          initialSlug={glossarySlug}
          onBackToHome={handleCloseGlossary}
          onOpenTalentAssessment={handleOpenTalentAssessment}
          onOpenTrialEvents={handleOpenTrialEvents}
        />
      </Suspense>
    );
  }

  // Jika Landing Page Khusus Jenjang Usia sedang aktif
  if (ageLandingTier) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Menyiapkan Kurikulum & Program Belajar..." />}>
        <AgeTierLandingPage
          tier={ageLandingTier}
          onBackToHome={handleCloseAgeLanding}
          onOpenTalentAssessment={handleOpenTalentAssessment}
          onOpenTrialEvents={handleOpenTrialEvents}
          onOpenBootcampModal={handleOpenBootcampModal}
        />
      </Suspense>
    );
  }

  // Jika Blog Edukasi sedang aktif
  if (showBlog) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Membuka Artikel & Blog Edukasi Beekoding..." />}>
        <BlogView
          initialSlug={blogSlug}
          onBackToHome={handleCloseBlog}
          onOpenBootcampModal={handleOpenBootcampModal}
          onOpenTalentAssessment={handleOpenTalentAssessment}
          onOpenTrialEvents={handleOpenTrialEvents}
        />
      </Suspense>
    );
  }

  // Jika Portal Administrator sedang aktif
  if (showAdmin) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Memuat Portal Administrasi Beekoding..." />}>
        <AdminView onBackToHome={handleCloseAdmin} />
      </Suspense>
    );
  }

  // Jika Portal Siswa & Wali Murid sedang aktif
  if (showStudentPortal) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Membuka Portal Siswa & Wali Murid..." />}>
        <StudentPortalView onClose={handleCloseStudentPortal} />
      </Suspense>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-amber-500 selection:text-slate-950 ${
        isDark ? 'bg-[#0d0f15] text-slate-100' : 'bg-[#fbf9f3] text-slate-800'
      }`}
    >
      {/* Top Navigation with Theme Toggle Switch */}
      <Navbar
        onOpenBootcampModal={handleOpenBootcampModal}
        onOpenTalentAssessment={handleOpenTalentAssessment}
        onOpenStudentPortal={handleOpenStudentPortal}
        onOpenTrialEvents={handleOpenTrialEvents}
        onOpenBlog={handleOpenBlog}
        onOpenGlossary={handleOpenGlossary}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenBootcampModal={handleOpenBootcampModal}
          onOpenTalentAssessment={handleOpenTalentAssessment}
          onOpenTrialEvents={handleOpenTrialEvents}
        />
        <About />
        <Programs
          onOpenBootcampModal={handleOpenBootcampModal}
          onSelectProgramForInquiry={handleSelectProgramForInquiry}
        />
        <ModularPrograms onSelectProgramForInquiry={handleSelectProgramForInquiry} />
        <Suspense fallback={null}>
          <TrialEventsSection onOpenTrialEventsModal={handleOpenTrialEvents} />
        </Suspense>
        <Suspense fallback={null}>
          <CourseFinder
            onOpenTalentAssessment={handleOpenTalentAssessment}
            onOpenTrialEventsModal={handleOpenTrialEvents}
          />
        </Suspense>
        <Audience />
        <WhyUs />
        <Suspense fallback={null}>
          <StudentShowcase
            onOpenTalentAssessment={handleOpenTalentAssessment}
            onOpenConsultation={() => {
              const contactElement = document.getElementById('contact');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
          <Founder />
          <Gallery />
          <FAQ />
          <Contact selectedProgram={selectedProgramForInquiry} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onOpenBootcampModal={handleOpenBootcampModal}
        onOpenTalentAssessment={handleOpenTalentAssessment}
        onOpenAdmin={handleOpenAdmin}
        onOpenStudentPortal={handleOpenStudentPortal}
        onOpenBlog={handleOpenBlog}
        onOpenAgeLanding={handleOpenAgeLanding}
        onOpenGlossary={handleOpenGlossary}
      />

      {/* Floating WhatsApp chat widget */}
      <FloatingWhatsApp />

      {/* PWA Add to Home Screen Prompt */}
      <PWAInstallPrompt />

      {/* Summer AI & Coding Bootcamp 2026 Curriculum Modal */}
      {bootcampModalOpen && (
        <Suspense fallback={null}>
          <BootcampModal
            isOpen={bootcampModalOpen}
            onClose={handleCloseBootcampModal}
            onEnrollClick={handleEnrollFromModal}
          />
        </Suspense>
      )}

      {/* Free Trial Class & Coding Events Modal */}
      {trialEventsModalOpen && (
        <Suspense fallback={null}>
          <TrialEventsModal
            isOpen={trialEventsModalOpen}
            onClose={handleCloseTrialEvents}
            initialSelectedEvent={selectedEventForModal}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
