import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  isAdminAuthenticated,
  getSubmissions,
  getInquiries,
  onStorageUpdate,
  type AssessmentSubmission,
  type ConsultationInquiry,
} from '../../services/adminStorage';
import {
  hydratePriorityModulesFromCloud,
  initPriorityRealtimeSync,
} from '../../services/supabaseSync';
import { isSupabaseConfigured, getSupabaseClient } from '../../services/supabaseClient';
import { checkSupabaseSession, logoutWithSupabase } from '../../services/supabaseAuth';
import { AdminLogin } from './AdminLogin';
import { AdminLayout, type AdminTab } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { SetNewPasswordModal } from './SetNewPasswordModal';

// Lazy-loaded Admin tab modules to drastically reduce initial bundle size
const AdminStudentsList = lazy(() => import('./AdminStudentsList').then((m) => ({ default: m.AdminStudentsList })));
const AdminQuestionBank = lazy(() => import('./AdminQuestionBank').then((m) => ({ default: m.AdminQuestionBank })));
const AdminReportModal = lazy(() => import('./AdminReportModal').then((m) => ({ default: m.AdminReportModal })));
const AdminInquiriesList = lazy(() => import('./AdminInquiriesList').then((m) => ({ default: m.AdminInquiriesList })));
const AdminInquiryModal = lazy(() => import('./AdminInquiryModal').then((m) => ({ default: m.AdminInquiryModal })));
const AdminSettings = lazy(() => import('./AdminSettings').then((m) => ({ default: m.AdminSettings })));
const AdminBatches = lazy(() => import('./AdminBatches').then((m) => ({ default: m.AdminBatches })));
const AdminWhatsAppTemplates = lazy(() => import('./AdminWhatsAppTemplates').then((m) => ({ default: m.AdminWhatsAppTemplates })));
const AdminTransactions = lazy(() => import('./AdminTransactions').then((m) => ({ default: m.AdminTransactions })));
const AdminCertificates = lazy(() => import('./AdminCertificates').then((m) => ({ default: m.AdminCertificates })));
const AdminShowcase = lazy(() => import('./AdminShowcase').then((m) => ({ default: m.AdminShowcase })));
const AdminCurriculum = lazy(() => import('./AdminCurriculum').then((m) => ({ default: m.AdminCurriculum })));
const AdminInstructors = lazy(() => import('./AdminInstructors').then((m) => ({ default: m.AdminInstructors })));
const AdminAttendance = lazy(() => import('./AdminAttendance').then((m) => ({ default: m.AdminAttendance })));
const AdminAcademicReports = lazy(() => import('./AdminAcademicReports').then((m) => ({ default: m.AdminAcademicReports })));
const AdminVouchers = lazy(() => import('./AdminVouchers').then((m) => ({ default: m.AdminVouchers })));
const AdminQuests = lazy(() => import('./AdminQuests').then((m) => ({ default: m.AdminQuests })));
const AdminAnnouncements = lazy(() => import('./AdminAnnouncements').then((m) => ({ default: m.AdminAnnouncements })));
const AdminPayroll = lazy(() => import('./AdminPayroll').then((m) => ({ default: m.AdminPayroll })));
const AdminResources = lazy(() => import('./AdminResources').then((m) => ({ default: m.AdminResources })));
const AdminEvents = lazy(() => import('./AdminEvents').then((m) => ({ default: m.AdminEvents })));
const AdminCounseling = lazy(() => import('./AdminCounseling').then((m) => ({ default: m.AdminCounseling })));
const AdminAuditLog = lazy(() => import('./AdminAuditLog').then((m) => ({ default: m.AdminAuditLog })));
const AdminQuizzes = lazy(() => import('./AdminQuizzes').then((m) => ({ default: m.AdminQuizzes })));
const AdminReferrals = lazy(() => import('./AdminReferrals').then((m) => ({ default: m.AdminReferrals })));
const AdminUsers = lazy(() => import('./AdminUsers').then((m) => ({ default: m.AdminUsers })));
const AdminWhatsAppGateway = lazy(() => import('./AdminWhatsAppGateway').then((m) => ({ default: m.AdminWhatsAppGateway })));
const AdminBlog = lazy(() => import('./AdminBlog').then((m) => ({ default: m.AdminBlog })));

function AdminTabFallback() {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-3 border-amber-500/20 border-t-amber-500 animate-spin" />
      </div>
      <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Memuat modul administrasi...</p>
    </div>
  );
}


interface AdminViewProps {
  onBackToHome: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onBackToHome }) => {
  const { isDark } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [profileKey, setProfileKey] = useState(0);
  const [submissions, setSubmissions] = useState<AssessmentSubmission[]>(() => getSubmissions());
  const [inquiries, setInquiries] = useState<ConsultationInquiry[]>(() => getInquiries());
  const [selectedReport, setSelectedReport] = useState<AssessmentSubmission | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationInquiry | null>(null);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  const refreshSubmissions = () => {
    const list = getSubmissions();
    setSubmissions(list);
  };

  const refreshInquiries = () => {
    const list = getInquiries();
    setInquiries(list);
  };

  useEffect(() => {
    // 1. Initial check & restore active Supabase Auth session
    checkSupabaseSession().then((user) => {
      if (user) {
        setIsAuthenticated(true);
      }
    });

    // 2. Initial background hydration from Supabase Cloud
    if (isSupabaseConfigured()) {
      hydratePriorityModulesFromCloud().then(({ success }) => {
        if (success) {
          refreshSubmissions();
          refreshInquiries();
        }
      });
    }

    // 3. Storage update event listener
    const unsubStorage = onStorageUpdate((type) => {
      if (type === 'submissions' || type === 'all') {
        refreshSubmissions();
      }
      if (type === 'inquiries' || type === 'all') {
        refreshInquiries();
      }
    });

    // 4. Supabase Realtime postgres changes channel
    const unsubRealtime = initPriorityRealtimeSync(() => {
      refreshSubmissions();
      refreshInquiries();
    });

    // 5. Cek apakah ada parameter recovery di URL
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    if (hash.includes('type=recovery') || search.includes('type=recovery')) {
      setShowNewPasswordModal(true);
    }

    // 6. Supabase Auth state change listener
    let authUnsub = () => {};
    const client = getSupabaseClient();
    if (client && isSupabaseConfigured()) {
      const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setShowNewPasswordModal(true);
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
        } else if (event === 'SIGNED_IN') {
          setIsAuthenticated(true);
          refreshSubmissions();
          refreshInquiries();
        }
      });
      authUnsub = () => subscription.unsubscribe();
    }

    return () => {
      unsubStorage();
      unsubRealtime();
      authUnsub();
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    refreshSubmissions();
    refreshInquiries();
  };

  const handleLogout = async () => {
    await logoutWithSupabase();
    setIsAuthenticated(false);
  };

  const handleViewReport = (sub: AssessmentSubmission) => {
    setSelectedReport(sub);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  const handleReportUpdated = (updated: AssessmentSubmission) => {
    setSelectedReport(updated);
    refreshSubmissions();
  };

  const handleInquiryUpdated = (updated: ConsultationInquiry) => {
    setSelectedInquiry(updated);
    refreshInquiries();
  };

  // If not logged in, render Admin Login screen
  if (!isAuthenticated) {
    return (
      <>
        <SetNewPasswordModal
          isOpen={showNewPasswordModal}
          onClose={() => setShowNewPasswordModal(false)}
          onSuccess={() => {
            setShowNewPasswordModal(false);
            handleLoginSuccess();
          }}
        />
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={onBackToHome}
        />
      </>
    );
  }

  const newSubmissionsCount = submissions.filter((s) => s.status === 'baru').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'baru').length;

  return (
    <>
      <SetNewPasswordModal
        isOpen={showNewPasswordModal}
        onClose={() => setShowNewPasswordModal(false)}
        onSuccess={() => {
          setShowNewPasswordModal(false);
          refreshSubmissions();
          refreshInquiries();
        }}
      />
      <div className="print:hidden">
        <AdminLayout
          key={profileKey}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
          newCount={newSubmissionsCount}
          newInquiriesCount={newInquiriesCount}
        >
          <Suspense fallback={<AdminTabFallback />}>
            {currentTab === 'dashboard' && (
            <AdminDashboard
              submissions={submissions}
              isDark={isDark}
              onViewReport={handleViewReport}
              onNavigateToStudents={() => setCurrentTab('students')}
              onNavigateToInquiries={() => setCurrentTab('inquiries')}
              onNavigateToEvents={() => setCurrentTab('events')}
              onNavigateToCounseling={() => setCurrentTab('counseling')}
              onNavigateToBatches={() => setCurrentTab('batches')}
              onNavigateToCurriculum={() => setCurrentTab('curriculum')}
              onNavigateToResources={() => setCurrentTab('resources')}
              onNavigateToInstructors={() => setCurrentTab('instructors')}
              onNavigateToAttendance={() => setCurrentTab('attendance')}
              onNavigateToReports={() => setCurrentTab('reports')}
              onNavigateToTransactions={() => setCurrentTab('transactions')}
              onNavigateToVouchers={() => setCurrentTab('vouchers')}
              onNavigateToPayroll={() => setCurrentTab('payroll')}
              onNavigateToQuests={() => setCurrentTab('quests')}
              onNavigateToCertificates={() => setCurrentTab('certificates')}
              onNavigateToShowcase={() => setCurrentTab('showcase')}
              onNavigateToTemplates={() => setCurrentTab('templates')}
              onNavigateToAnnouncements={() => setCurrentTab('announcements')}
              onNavigateToAudit={() => setCurrentTab('audit')}
              onNavigateToQuizzes={() => setCurrentTab('quizzes')}
              onNavigateToReferrals={() => setCurrentTab('referrals')}
              onNavigateToQuestions={() => setCurrentTab('questions')}
              inquiriesCount={inquiries.length}
              newInquiriesCount={newInquiriesCount}
            />
          )}

          {currentTab === 'students' && (
            <AdminStudentsList
              submissions={submissions}
              isDark={isDark}
              onViewReport={handleViewReport}
              onRefreshData={refreshSubmissions}
            />
          )}

          {currentTab === 'inquiries' && (
            <AdminInquiriesList
              inquiries={inquiries}
              isDark={isDark}
              onViewInquiry={(inq) => setSelectedInquiry(inq)}
              onRefreshData={refreshInquiries}
            />
          )}

          {currentTab === 'events' && (
            <AdminEvents isDark={isDark} />
          )}

          {currentTab === 'counseling' && (
            <AdminCounseling isDark={isDark} />
          )}

          {currentTab === 'batches' && (
            <AdminBatches isDark={isDark} />
          )}

          {currentTab === 'curriculum' && (
            <AdminCurriculum isDark={isDark} />
          )}

          {currentTab === 'resources' && (
            <AdminResources isDark={isDark} />
          )}

          {currentTab === 'instructors' && (
            <AdminInstructors isDark={isDark} />
          )}

          {currentTab === 'attendance' && (
            <AdminAttendance isDark={isDark} />
          )}

          {currentTab === 'reports' && (
            <AdminAcademicReports isDark={isDark} />
          )}

          {currentTab === 'transactions' && (
            <AdminTransactions isDark={isDark} />
          )}

          {currentTab === 'vouchers' && (
            <AdminVouchers isDark={isDark} />
          )}

          {currentTab === 'payroll' && (
            <AdminPayroll isDark={isDark} />
          )}

          {currentTab === 'quests' && (
            <AdminQuests isDark={isDark} />
          )}

          {currentTab === 'certificates' && (
            <AdminCertificates isDark={isDark} />
          )}

          {currentTab === 'showcase' && (
            <AdminShowcase isDark={isDark} />
          )}

          {currentTab === 'templates' && (
            <AdminWhatsAppTemplates isDark={isDark} />
          )}

          {currentTab === 'announcements' && (
            <AdminAnnouncements isDark={isDark} />
          )}

          {currentTab === 'gateway' && (
            <AdminWhatsAppGateway isDark={isDark} />
          )}

          {currentTab === 'questions' && (
            <AdminQuestionBank isDark={isDark} />
          )}

          {currentTab === 'audit' && (
            <AdminAuditLog isDark={isDark} />
          )}

          {currentTab === 'quizzes' && (
            <AdminQuizzes isDark={isDark} />
          )}

          {currentTab === 'referrals' && (
            <AdminReferrals isDark={isDark} />
          )}

          {currentTab === 'users' && (
            <AdminUsers
              isDark={isDark}
              onRoleSwitched={() => setProfileKey((k) => k + 1)}
            />
          )}

          {currentTab === 'blog' && (
            <AdminBlog
              isDark={isDark}
              onOpenArticleInWeb={(slug) => {
                window.location.hash = `#blog/${slug}`;
              }}
            />
          )}

          {currentTab === 'settings' && (
            <AdminSettings
              isDark={isDark}
              onProfileUpdated={() => setProfileKey((k) => k + 1)}
              onRefreshAllData={() => {
                refreshSubmissions();
                refreshInquiries();
              }}
            />
          )}
          </Suspense>
        </AdminLayout>
      </div>

      {/* Modal View Detail Laporan Siswa */}
      {selectedReport && (
        <Suspense fallback={null}>
          <AdminReportModal
            submission={selectedReport}
            isDark={isDark}
            onClose={handleCloseReport}
            onUpdate={handleReportUpdated}
          />
        </Suspense>
      )}

      {/* Modal View Detail Permohonan & Follow-Up Konsultasi/Pendaftaran */}
      {selectedInquiry && (
        <Suspense fallback={null}>
          <AdminInquiryModal
            inquiry={selectedInquiry}
            isDark={isDark}
            onClose={() => setSelectedInquiry(null)}
            onUpdate={handleInquiryUpdated}
          />
        </Suspense>
      )}
    </>
  );
};
