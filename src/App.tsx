import { useState, useEffect } from 'react';
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
import { BootcampModal } from './components/BootcampModal';
import { TrialEventsModal } from './components/TrialEventsModal';
import { TrialEventsSection } from './components/TrialEventsSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TalentAssessmentView } from './components/talent/TalentAssessmentView';
import { AdminView } from './components/admin/AdminView';
import { StudentPortalView } from './components/portal/StudentPortalView';
import { type CodingEvent } from './services/adminStorage';

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
    return <AdminView onBackToHome={handleCloseAdmin} />;
  }

  // Jika Talent Assessment sedang aktif, tampilkan Talent Assessment View
  if (showTalentAssessment) {
    return <TalentAssessmentView onClose={handleCloseTalentAssessment} />;
  }

  // Jika Portal Siswa & Wali Murid sedang aktif
  if (showStudentPortal) {
    return <StudentPortalView onClose={handleCloseStudentPortal} />;
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
      <BootcampModal
        isOpen={bootcampModalOpen}
        onClose={handleCloseBootcampModal}
        onEnrollClick={handleEnrollFromModal}
      />

      {/* Free Trial Class & Coding Events Modal */}
      <TrialEventsModal
        isOpen={trialEventsModalOpen}
        onClose={handleCloseTrialEvents}
        initialSelectedEvent={selectedEventForModal}
      />
    </div>
  );
}

export default App;
