import { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Programs } from './components/Programs';
import { ModularPrograms } from './components/ModularPrograms';
import { Audience } from './components/Audience';
import { WhyUs } from './components/WhyUs';
import { Founder } from './components/Founder';
import { Gallery } from './components/Gallery';
import { StudentShowcase } from './components/StudentShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TrialEventsSection } from './components/TrialEventsSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { type CodingEvent } from './services/adminStorage';

// Lazy-loaded heavy modules for maximum initial page load speed
const TalentAssessmentView = lazy(() =>
  import('./components/talent/TalentAssessmentView').then((m) => ({ default: m.TalentAssessmentView }))
);
const AdminView = lazy(() =>
  import('./components/admin/AdminView').then((m) => ({ default: m.AdminView }))
);
const StudentPortalView = lazy(() =>
  import('./components/portal/StudentPortalView').then((m) => ({ default: m.StudentPortalView }))
);
const BootcampModal = lazy(() =>
  import('./components/BootcampModal').then((m) => ({ default: m.BootcampModal }))
);
const TrialEventsModal = lazy(() =>
  import('./components/TrialEventsModal').then((m) => ({ default: m.TrialEventsModal }))
);

function AppLoadingFallback({ message = 'Memuat modul...' }: { message?: string }) {
  return (
    <div className="min-h-screen bg-[#0d0f15] text-slate-100 flex flex-col items-center justify-center p-6 select-none">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
        <span className="text-2xl animate-bounce">🐝</span>
      </div>
      <h3 className="text-lg font-bold text-amber-400 mb-1">Beekoding Academy</h3>
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
  const [selectedProgramForInquiry, setSelectedProgramForInquiry] = useState('Summer AI & Coding Bootcamp 2026');

  // Deteksi hash URL #talent, #admin, atau #portal untuk direct link
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      if (hash === '#admin') {
        setShowAdmin(true);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
      } else if (hash === '#talent') {
        setShowTalentAssessment(true);
        setShowAdmin(false);
        setShowStudentPortal(false);
      } else if (hash === '#portal') {
        setShowStudentPortal(true);
        setShowAdmin(false);
        setShowTalentAssessment(false);
      } else {
        setShowAdmin(false);
        setShowTalentAssessment(false);
        setShowStudentPortal(false);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const handleOpenBootcampModal = () => {
    setBootcampModalOpen(true);
  };

  const handleCloseBootcampModal = () => {
    setBootcampModalOpen(false);
  };

  const handleOpenTrialEvents = (event?: CodingEvent) => {
    setSelectedEventForModal(event || null);
    setTrialEventsModalOpen(true);
  };

  const handleCloseTrialEvents = () => {
    setTrialEventsModalOpen(false);
    setSelectedEventForModal(null);
  };

  const handleOpenTalentAssessment = () => {
    window.location.hash = '#talent';
    setShowTalentAssessment(true);
    setShowAdmin(false);
  };

  const handleCloseTalentAssessment = () => {
    setShowTalentAssessment(false);
    if (window.location.hash === '#talent') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setShowAdmin(true);
    setShowTalentAssessment(false);
    setShowStudentPortal(false);
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  const handleOpenStudentPortal = () => {
    window.location.hash = '#portal';
    setShowStudentPortal(true);
    setShowAdmin(false);
    setShowTalentAssessment(false);
  };

  const handleCloseStudentPortal = () => {
    setShowStudentPortal(false);
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

  // Jika Portal Administrator sedang aktif
  if (showAdmin) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Memuat Portal Administrasi Beekoding..." />}>
        <AdminView onBackToHome={handleCloseAdmin} />
      </Suspense>
    );
  }

  // Jika Talent Assessment sedang aktif, tampilkan Talent Assessment View
  if (showTalentAssessment) {
    return (
      <Suspense fallback={<AppLoadingFallback message="Menyiapkan Asesmen Minat & Bakat..." />}>
        <TalentAssessmentView onClose={handleCloseTalentAssessment} />
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
        <TrialEventsSection onOpenTrialEventsModal={handleOpenTrialEvents} />
        <Audience />
        <WhyUs />
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
        <Contact selectedProgram={selectedProgramForInquiry} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBootcampModal={handleOpenBootcampModal}
        onOpenTalentAssessment={handleOpenTalentAssessment}
        onOpenAdmin={handleOpenAdmin}
        onOpenStudentPortal={handleOpenStudentPortal}
      />

      {/* Floating WhatsApp chat widget */}
      <FloatingWhatsApp />

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
