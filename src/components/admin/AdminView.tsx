import React, { useState, useEffect } from 'react';
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
import { AdminStudentsList } from './AdminStudentsList';
import { AdminQuestionBank } from './AdminQuestionBank';
import { AdminReportModal } from './AdminReportModal';
import { AdminInquiriesList } from './AdminInquiriesList';
import { AdminInquiryModal } from './AdminInquiryModal';
import { AdminSettings } from './AdminSettings';
import { AdminBatches } from './AdminBatches';
import { AdminWhatsAppTemplates } from './AdminWhatsAppTemplates';
import { AdminTransactions } from './AdminTransactions';
import { AdminCertificates } from './AdminCertificates';
import { AdminShowcase } from './AdminShowcase';
import { AdminCurriculum } from './AdminCurriculum';
import { AdminInstructors } from './AdminInstructors';
import { AdminAttendance } from './AdminAttendance';
import { AdminAcademicReports } from './AdminAcademicReports';
import { AdminVouchers } from './AdminVouchers';
import { AdminQuests } from './AdminQuests';
import { AdminAnnouncements } from './AdminAnnouncements';
import { AdminPayroll } from './AdminPayroll';
import { AdminResources } from './AdminResources';
import { AdminEvents } from './AdminEvents';
import { AdminCounseling } from './AdminCounseling';
import { AdminAuditLog } from './AdminAuditLog';
import { AdminQuizzes } from './AdminQuizzes';
import { AdminReferrals } from './AdminReferrals';
import { AdminUsers } from './AdminUsers';
import { AdminWhatsAppGateway } from './AdminWhatsAppGateway';

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

    // 5. Supabase Auth state change listener
    let authUnsub = () => {};
    const client = getSupabaseClient();
    if (client && isSupabaseConfigured()) {
      const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_OUT') {
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
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={onBackToHome}
      />
    );
  }

  const newSubmissionsCount = submissions.filter((s) => s.status === 'baru').length;
  const newInquiriesCount = inquiries.filter((i) => i.status === 'baru').length;

  return (
    <>
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
        </AdminLayout>
      </div>

      {/* Modal View Detail Laporan Siswa */}
      {selectedReport && (
        <AdminReportModal
          submission={selectedReport}
          isDark={isDark}
          onClose={handleCloseReport}
          onUpdate={handleReportUpdated}
        />
      )}

      {/* Modal View Detail Permohonan & Follow-Up Konsultasi/Pendaftaran */}
      {selectedInquiry && (
        <AdminInquiryModal
          inquiry={selectedInquiry}
          isDark={isDark}
          onClose={() => setSelectedInquiry(null)}
          onUpdate={handleInquiryUpdated}
        />
      )}
    </>
  );
};
