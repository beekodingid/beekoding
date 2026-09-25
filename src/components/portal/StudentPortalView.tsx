import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  GraduationCap,
  Search,
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  Receipt,
  Rocket,
  ExternalLink,
  Share2,
  Printer,
  Copy,
  Check,
  Sparkles,
  User,
  Phone,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Ticket,
  Video,
  Send,
  Flame,
  Trophy,
  Megaphone,
  Pin,
  FolderDown,
  Download,
  CalendarCheck,
  Clock,
  ArrowRight,
  HeartHandshake,
  MapPin,
  AlertCircle,
  X,
  HelpCircle,
  Gift,
  Users,
  RefreshCw,
} from 'lucide-react';
import {
  getSubmissions,
  getBatches,
  getAttendanceRecords,
  getAcademicReports,
  getCertificates,
  getTransactions,
  getStudentProjects,
  getPromoVouchers,
  getCodingQuests,
  getGamificationProfiles,
  getAchievementBadges,
  calculateLevelFromXp,
  getClassAnnouncements,
  getLearningResources,
  incrementResourceDownloadCount,
  getCodingEvents,
  registerForEvent,
  getCounselingSessions,
  createCounselingSession,
  getQuizExams,
  getQuizAttempts,
  submitQuizAttempt,
  getAmbassadors,
  getReferralRecords,
  createReferralRecord,
  onStorageUpdate,
  type ClassBatch,
  type SessionAttendanceRecord,
  type StudentGamificationProfile,
  type LearningResource,
  type CodingEvent,
  type CounselingSession,
  type CounselingTopic,
  type CounselingSessionType,
  type CounselingStatus,
  type QuizExam,
  type QuizAttempt,
  type AmbassadorProfile,
  type ReferralRecord,
  type StudentCertificate,
  type StudentAcademicReport,
  type TransactionRecord,
} from '../../services/adminStorage';
import { AdminCertificateModal } from '../admin/AdminCertificateModal';
import { AdminPrintableReportModal } from '../admin/AdminPrintableReportModal';
import { AdminInvoiceModal } from '../admin/AdminInvoiceModal';

interface StudentPortalViewProps {
  onClose?: () => void;
}

/*
// Profil rekomendasi demo untuk pengujian 1-klik
const _DEMO_STUDENTS = [
  {
    name: 'Kenzo Alvaro Pratama',
    phone: '081234567890',
    tier: 'Junior Explorer (Scratch)',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
  },
  {
    name: 'Alya Zahra Kirana',
    phone: '081987654321',
    tier: 'Middle Coder (Roblox)',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
  },
  {
    name: 'Rafi Danendra Putra',
    phone: '082155554321',
    tier: 'Teens Innovator (Web & AI)',
    badgeColor: 'bg-sky-500/10 text-sky-500 border-sky-500/30',
  },
  {
    name: 'Nathania Putri Kusuma',
    phone: '081377889900',
    tier: 'Junior Explorer (Scratch)',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
  },
];
*/

type PortalTab =
  | 'overview'
  | 'announcements'
  | 'quizzes'
  | 'referrals'
  | 'resources'
  | 'quests'
  | 'attendance'
  | 'report'
  | 'certificate'
  | 'projects'
  | 'billing'
  | 'events'
  | 'counseling';

export const StudentPortalView: React.FC<StudentPortalViewProps> = ({ onClose: _onClose }) => {
  const { isDark } = useTheme();

  // Search State
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState<PortalTab>('overview');
  const [selectedStudentPhone, setSelectedStudentPhone] = useState<string | null>(null);
  const [selectedStudentName, setSelectedStudentName] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [resourcesList, setResourcesList] = useState<LearningResource[]>(() => getLearningResources());
  const [resourceFilterType, setResourceFilterType] = useState<string>('all');
  const [resourceSearch, setResourceSearch] = useState<string>('');
  const [eventsList, setEventsList] = useState<CodingEvent[]>(() => getCodingEvents());
  const [eventBookingMsg, setEventBookingMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Counseling State
  const [counselingList, setCounselingList] = useState<CounselingSession[]>(() => getCounselingSessions());
  const [showCounselingModal, setShowCounselingModal] = useState(false);
  const [counselingTopic, setCounselingTopic] = useState<CounselingTopic>('kendala_fokus');
  const [counselingType, setCounselingType] = useState<CounselingSessionType>('online_gmeet');
  const [counselingDate, setCounselingDate] = useState('');
  const [counselingTime, setCounselingTime] = useState('15:30 - 16:15 WIB');
  const [counselingNotes, setCounselingNotes] = useState('');
  const [counselingMsg, setCounselingMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Quizzes State
  const [quizzesList] = useState<QuizExam[]>(() => getQuizExams());
  const [quizAttemptsList, setQuizAttemptsList] = useState<QuizAttempt[]>(() => getQuizAttempts());
  const [activeQuizForExam, setActiveQuizForExam] = useState<QuizExam | null>(null);
  const [activeExamQuestionIdx, setActiveExamQuestionIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examTimeRemaining, setExamTimeRemaining] = useState(0);
  const [examResult, setExamResult] = useState<{
    attempt: QuizAttempt;
    passed: boolean;
    score: number;
    xpEarned: number;
  } | null>(null);

  // Referrals State
  const [referralsList, setReferralsList] = useState<ReferralRecord[]>(() => getReferralRecords());
  const [ambassadorsList, setAmbassadorsList] = useState<AmbassadorProfile[]>(() => getAmbassadors());
  const [copiedReferralCode, setCopiedReferralCode] = useState(false);
  const [referralFriendName, setReferralFriendName] = useState('');
  const [referralFriendPhone, setReferralFriendPhone] = useState('');
  const [referralFriendCourse, setReferralFriendCourse] = useState('Visual Scratch & AI Prompting');
  const [referralFriendNotes, setReferralFriendNotes] = useState('');
  const [referralSubmitMsg, setReferralSubmitMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Printable & Preview Modals State
  const [selectedCertificateForModal, setSelectedCertificateForModal] = useState<StudentCertificate | null>(null);
  const [selectedReportForModal, setSelectedReportForModal] = useState<StudentAcademicReport | null>(null);
  const [selectedTransactionForModal, setSelectedTransactionForModal] = useState<TransactionRecord | null>(null);

  // Load all data from storage with reactive states
  const [submissions, setSubmissions] = useState(() => getSubmissions());
  const [batches, setBatches] = useState<ClassBatch[]>(() => getBatches());
  const [attendanceRecords, setAttendanceRecords] = useState<SessionAttendanceRecord[]>(() => getAttendanceRecords());
  const [reports, setReports] = useState<StudentAcademicReport[]>(() => getAcademicReports());
  const [certificates, setCertificates] = useState<StudentCertificate[]>(() => getCertificates());
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [projects, setProjects] = useState(() => getStudentProjects());
  const [vouchers, setVouchers] = useState(() => getPromoVouchers());
  const [quests, setQuests] = useState(() => getCodingQuests());
  const [badgesCatalog, setBadgesCatalog] = useState(() => getAchievementBadges());
  const [gamificationProfiles, setGamificationProfiles] = useState(() => getGamificationProfiles());
  const [announcements, setAnnouncements] = useState(() => getClassAnnouncements());
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Subscribe to storage update events across all modules
  useEffect(() => {
    return onStorageUpdate((type) => {
      if (type === 'submissions' || type === 'all') setSubmissions(getSubmissions());
      if (type === 'batches' || type === 'all') setBatches(getBatches());
      if (type === 'attendance' || type === 'all') setAttendanceRecords(getAttendanceRecords());
      if (type === 'reports' || type === 'all') setReports(getAcademicReports());
      if (type === 'certificates' || type === 'all') setCertificates(getCertificates());
      if (type === 'transactions' || type === 'all') setTransactions(getTransactions());
      if (type === 'all') {
        setProjects(getStudentProjects());
        setVouchers(getPromoVouchers());
        setQuests(getCodingQuests());
        setBadgesCatalog(getAchievementBadges());
        setGamificationProfiles(getGamificationProfiles());
        setAnnouncements(getClassAnnouncements());
      }
    });
  }, []);

  // Background Cloud Sync on Mount
  const handleManualSync = useCallback(async () => {
    try {
      setIsCloudSyncing(true);
      const { pullAllDataFromSupabase } = await import('../../services/supabaseSync');
      await pullAllDataFromSupabase();
      setSubmissions(getSubmissions());
      setBatches(getBatches());
      setAttendanceRecords(getAttendanceRecords());
      setReports(getAcademicReports());
      setCertificates(getCertificates());
      setTransactions(getTransactions());
      setProjects(getStudentProjects());
      setVouchers(getPromoVouchers());
      setQuests(getCodingQuests());
      setBadgesCatalog(getAchievementBadges());
      setGamificationProfiles(getGamificationProfiles());
      setAnnouncements(getClassAnnouncements());
      setLastSyncTime(new Date());
    } catch (err) {
      console.warn('Student portal cloud sync notice:', err);
    } finally {
      setIsCloudSyncing(false);
    }
  }, []);

  useEffect(() => {
    handleManualSync();
  }, [handleManualSync]);

  // URL Parameters Auto-detection (?cert=..., ?phone=..., ?report=..., ?student=..., ?tab=...)
  useEffect(() => {
    const parseUrlParams = () => {
      if (typeof window === 'undefined') return;

      const fullUrl = window.location.href;
      let certParam: string | null = null;
      let phoneParam: string | null = null;
      let reportParam: string | null = null;
      let studentParam: string | null = null;
      let tabParam: PortalTab | null = null;

      try {
        const urlObj = new URL(fullUrl);
        certParam = urlObj.searchParams.get('cert');
        phoneParam = urlObj.searchParams.get('phone');
        reportParam = urlObj.searchParams.get('report');
        studentParam = urlObj.searchParams.get('student');
        tabParam = urlObj.searchParams.get('tab') as PortalTab | null;
      } catch {
        // Fallback for older browsers
      }

      // Check query in hash (e.g. #portal?cert=BK-CERT/2026/06/001)
      if (window.location.hash.includes('?')) {
        const hashQuery = window.location.hash.split('?')[1];
        const hashParams = new URLSearchParams(hashQuery);
        if (!certParam) certParam = hashParams.get('cert');
        if (!phoneParam) phoneParam = hashParams.get('phone');
        if (!reportParam) reportParam = hashParams.get('report');
        if (!studentParam) studentParam = hashParams.get('student');
        if (!tabParam) tabParam = hashParams.get('tab') as PortalTab | null;
      }

      if (certParam) {
        setSearchInput(certParam);
        const cert = certificates.find(
          (c) =>
            c.certificateNumber.toLowerCase() === certParam!.toLowerCase() ||
            c.verificationCode.toLowerCase() === certParam!.toLowerCase() ||
            c.id.toLowerCase() === certParam!.toLowerCase()
        );
        if (cert) {
          setSelectedStudentName(cert.studentName);
          if (cert.parentPhone) setSelectedStudentPhone(cert.parentPhone);
        } else {
          setSelectedStudentName(certParam);
        }
        setActiveTab('certificate');
      } else if (reportParam) {
        setSearchInput(reportParam);
        const rep = reports.find((r) => r.id.toLowerCase() === reportParam!.toLowerCase());
        if (rep) {
          setSelectedStudentName(rep.studentName);
          if (rep.parentPhone) setSelectedStudentPhone(rep.parentPhone);
        } else {
          setSelectedStudentName(reportParam);
        }
        setActiveTab('report');
      } else if (phoneParam) {
        setSearchInput(phoneParam);
        setSelectedStudentPhone(phoneParam);
        setSelectedStudentName(null);
        if (tabParam) setActiveTab(tabParam);
      } else if (studentParam) {
        setSearchInput(studentParam);
        setSelectedStudentName(studentParam);
        setSelectedStudentPhone(null);
        if (tabParam) setActiveTab(tabParam);
      }
    };

    parseUrlParams();
    window.addEventListener('hashchange', parseUrlParams);
    return () => window.removeEventListener('hashchange', parseUrlParams);
  }, [certificates, reports]);

  // Format Helper
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Find Student Aggregated Data
  const studentData = useMemo(() => {
    if (!selectedStudentPhone && !selectedStudentName) return null;

    const normPhone = (selectedStudentPhone || '').replace(/\D/g, '');
    const normName = (selectedStudentName || '').toLowerCase().trim();

    // 1. Check Submissions
    const subMatch = submissions.find((s) => {
      const p = (s.profile?.parentPhone || '').replace(/\D/g, '');
      const n = (s.profile?.childName || '').toLowerCase().trim();
      return (normPhone && p.includes(normPhone)) || (normName && n.includes(normName));
    });

    // 2. Check Reports
    const repMatch = reports.filter((r) => {
      const p = (r.parentPhone || '').replace(/\D/g, '');
      const n = (r.studentName || '').toLowerCase().trim();
      const id = (r.id || '').toLowerCase().trim();
      return (
        (normPhone && p.includes(normPhone)) ||
        (normName && (n.includes(normName) || id.includes(normName)))
      );
    });

    // 3. Check Certificates
    const certMatch = certificates.filter((c) => {
      const p = (c.parentPhone || '').replace(/\D/g, '');
      const n = (c.studentName || '').toLowerCase().trim();
      const num = (c.certificateNumber || '').toLowerCase().trim();
      const code = (c.verificationCode || '').toLowerCase().trim();
      const id = (c.id || '').toLowerCase().trim();
      return (
        (normPhone && p.includes(normPhone)) ||
        (normName && (n.includes(normName) || num.includes(normName) || code.includes(normName) || id.includes(normName)))
      );
    });

    // 4. Check Transactions
    const txMatch = transactions.filter((t) => {
      const p = (t.parentPhone || '').replace(/\D/g, '');
      const n = (t.studentName || '').toLowerCase().trim();
      return (normPhone && p.includes(normPhone)) || (normName && n.includes(normName));
    });

    // 5. Check Projects
    const projMatch = projects.filter((p) => {
      const n = (p.studentName || '').toLowerCase().trim();
      return normName && n.includes(normName);
    });

    // Determine canonical student name, parent name, phone
    const studentName =
      subMatch?.profile?.childName ||
      repMatch[0]?.studentName ||
      certMatch[0]?.studentName ||
      txMatch[0]?.studentName ||
      selectedStudentName ||
      'Siswa Beekoding';

    const parentName =
      subMatch?.profile?.parentName ||
      repMatch[0]?.parentName ||
      certMatch[0]?.parentName ||
      txMatch[0]?.parentName ||
      'Wali Murid';

    const parentPhone =
      subMatch?.profile?.parentPhone ||
      repMatch[0]?.parentPhone ||
      certMatch[0]?.parentPhone ||
      txMatch[0]?.parentPhone ||
      selectedStudentPhone ||
      '-';

    // 6. Check Batches Enrolled
    const enrolledBatches: ClassBatch[] = batches.filter((b) => {
      return (
        b.enrolledStudents.some((st) => {
          const stName = (st.studentName || '').toLowerCase().trim();
          const stPhone = (st.parentPhone || '').replace(/\D/g, '');
          return (normName && stName.includes(normName)) || (normPhone && stPhone.includes(normPhone));
        }) ||
        txMatch.some((t) => t.batchId === b.id || t.batchName?.includes(b.name)) ||
        repMatch.some((r) => r.batchId === b.id || r.batchName?.includes(b.name))
      );
    });

    // 7. Check Attendance
    const matchedAttendance: {
      session: SessionAttendanceRecord;
      status: 'present' | 'absent' | 'excused' | 'late';
      notes?: string;
    }[] = [];

    attendanceRecords.forEach((rec) => {
      const foundInRec = rec.students.find((st) => {
        const stName = (st.studentName || '').toLowerCase().trim();
        const stPhone = (st.parentPhone || '').replace(/\D/g, '');
        return (
          stName.includes(studentName.toLowerCase().trim()) ||
          (normPhone && stPhone.includes(normPhone))
        );
      });

      if (foundInRec) {
        matchedAttendance.push({
          session: rec,
          status: foundInRec.status,
          notes: foundInRec.notes,
        });
      }
    });

    // Attendance stats
    const totalSessions = matchedAttendance.length;
    const presentCount = matchedAttendance.filter((a) => a.status === 'present').length;
    const attendancePercentage =
      totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 100;

    // 8. Gamification Profile (XP, Level, Badges)
    const gamificationProfile: StudentGamificationProfile | undefined = gamificationProfiles.find((g) => {
      const gName = (g.studentName || '').toLowerCase().trim();
      const gPhone = (g.parentPhone || '').replace(/\D/g, '');
      return (normName && gName.includes(normName)) || (normPhone && gPhone.includes(normPhone));
    });

    const currentXp = gamificationProfile?.totalXp ?? 450;
    const levelInfo = calculateLevelFromXp(currentXp);
    const earnedBadgeIds = gamificationProfile?.earnedBadges?.map((b) => b.badgeId) || [
      'badge-loop-master',
      'badge-speed-coder',
      'badge-perfect-attendance',
    ];
    const unlockedBadges = badgesCatalog.filter((b) => earnedBadgeIds.includes(b.id));

    // 9. Events & Workshops
    const matchedEvents: { event: CodingEvent; registration: any }[] = [];
    eventsList.forEach((evt) => {
      const reg = evt.registrations.find((r) => {
        const rName = (r.childName || '').toLowerCase().trim();
        const rPhone = (r.parentPhone || '').replace(/\D/g, '');
        return (normName && rName.includes(normName)) || (normPhone && rPhone.includes(normPhone));
      });
      if (reg) {
        matchedEvents.push({ event: evt, registration: reg });
      }
    });

    const studentTier = (subMatch?.profile?.tier || enrolledBatches[0]?.tier || 'junior').toLowerCase();
    const availableEvents = eventsList.filter((evt) => {
      const isRegistered = matchedEvents.some((m) => m.event.id === evt.id);
      const isUpcoming = evt.status === 'upcoming';
      const isTierMatch = evt.tier === 'all' || evt.tier === studentTier || studentTier === 'all';
      return !isRegistered && isUpcoming && isTierMatch;
    });

    // 10. Private Counseling Sessions
    const matchedCounseling = counselingList.filter((c) => {
      const p = (c.parentPhone || '').replace(/\D/g, '');
      const n = (c.studentName || '').toLowerCase().trim();
      return (normPhone && p.includes(normPhone)) || (normName && n.includes(normName));
    });

    return {
      studentName,
      parentName,
      parentPhone,
      subMatch,
      reports: repMatch,
      certificates: certMatch,
      transactions: txMatch,
      projects: projMatch,
      batches: enrolledBatches,
      attendance: matchedAttendance,
      attendancePercentage,
      totalSessions,
      presentCount,
      gamificationProfile,
      currentXp,
      levelInfo,
      unlockedBadges,
      matchedEvents,
      availableEvents,
      counselingSessions: matchedCounseling,
    };
  }, [
    selectedStudentPhone,
    selectedStudentName,
    submissions,
    batches,
    attendanceRecords,
    reports,
    certificates,
    transactions,
    projects,
    gamificationProfiles,
    badgesCatalog,
    eventsList,
    counselingList,
  ]);

  // Announcements filtering for the active student
  const relevantAnnouncements = useMemo(() => {
    if (!studentData) return [];
    const studentBatch = studentData.batches[0];
    const studentTier = (studentData.subMatch?.profile?.tier || studentBatch?.tier || 'junior').toLowerCase();
    const studentBatchId = studentBatch?.id;

    return announcements.filter((a) => {
      if (a.status !== 'published') return false;
      if (a.audience === 'all') return true;
      if (a.audience === 'junior' && studentTier.includes('junior')) return true;
      if (a.audience === 'middle' && studentTier.includes('middle')) return true;
      if (a.audience === 'teens' && studentTier.includes('teen')) return true;
      if (a.audience === 'specific_batch') {
        if (!a.batchId || (studentBatchId && a.batchId === studentBatchId)) return true;
      }
      return false;
    }).sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, [studentData, announcements]);

  const pinnedAlert = useMemo(() => {
    return relevantAnnouncements.find((a) => a.pinned) || relevantAnnouncements[0] || null;
  }, [relevantAnnouncements]);

  // Resources filtering for active student
  const relevantResources = useMemo(() => {
    if (!studentData) return [];
    const studentBatch = studentData.batches[0];
    const studentTier = (studentData.subMatch?.profile?.tier || studentBatch?.tier || 'junior').toLowerCase();

    return resourcesList.filter((r) => {
      const matchTier =
        r.tier === 'all' ||
        (r.tier === 'junior' && studentTier.includes('junior')) ||
        (r.tier === 'middle' && studentTier.includes('middle')) ||
        (r.tier === 'teens' && studentTier.includes('teen'));

      const matchType = resourceFilterType === 'all' || r.type === resourceFilterType;

      const q = resourceSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));

      return matchTier && matchType && matchSearch;
    }).sort((a, b) => (a.sessionNumber || 99) - (b.sessionNumber || 99));
  }, [studentData, resourcesList, resourceFilterType, resourceSearch]);

  const handleDownloadResource = (resource: LearningResource) => {
    incrementResourceDownloadCount(resource.id);
    setResourcesList(getLearningResources());
    window.open(resource.downloadUrl, '_blank');
  };

  const handleQuickRegisterEvent = (evt: CodingEvent) => {
    if (!studentData) return;
    const result = registerForEvent(evt.id, {
      parentName: studentData.parentName || 'Wali Murid',
      parentPhone: studentData.parentPhone || selectedStudentPhone || '',
      childName: studentData.studentName,
      childAge: studentData.subMatch?.profile?.childAge || 9,
      notes: 'Pendaftaran mandiri 1-klik via Portal Siswa',
    });

    if (result.success) {
      setEventsList(getCodingEvents());
      setEventBookingMsg({
        text: `Selamat! Ananda ${studentData.studentName} berhasil terdaftar pada agenda "${evt.title}". Link Zoom & jadwal resmi telah dikonfirmasi.`,
        type: 'success',
      });
      setTimeout(() => setEventBookingMsg(null), 6000);
    } else {
      setEventBookingMsg({
        text: result.error || 'Pendaftaran gagal.',
        type: 'error',
      });
      setTimeout(() => setEventBookingMsg(null), 4000);
    }
  };

  const TOPIC_LABELS: Record<CounselingTopic, string> = {
    evaluasi_belajar: 'Evaluasi Kemajuan & Minat Belajar',
    kendala_fokus: 'Manajemen Fokus & Screen Time',
    rekomendasi_kurikulum: 'Roadmap Kurikulum & Pilihan Bahasa',
    persiapan_lomba: 'Persiapan Kompetisi & Portofolio Karya',
    konsultasi_perangkat: 'Konsultasi Perangkat & Environment Lab',
    lainnya: 'Konsultasi Umum Perkembangan Anak',
  };

  const STATUS_BADGES: Record<CounselingStatus, { label: string; color: string }> = {
    scheduled: { label: 'Terjadwal', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' },
    completed: { label: 'Selesai Dilaksanakan', color: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    follow_up_needed: { label: 'Perlu Tindak Lanjut', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' },
    cancelled: { label: 'Dibatalkan', color: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' },
  };

  const handleRequestCounseling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentData) return;
    if (!counselingDate) {
      setCounselingMsg({ text: 'Mohon tentukan tanggal konsultasi yang diinginkan.', type: 'error' });
      return;
    }

    try {
      createCounselingSession({
        studentName: studentData.studentName,
        studentPhone: studentData.parentPhone || '081234567890',
        parentName: studentData.parentName,
        parentPhone: studentData.parentPhone,
        counselorName: 'Sarah Amalia, S.T.',
        counselorTitle: 'Senior Mentor - Creative Game Dev',
        tier: studentData.batches[0]?.tier ? `Jenjang ${studentData.batches[0].tier.toUpperCase()}` : 'Junior Explorer',
        date: counselingDate,
        time: counselingTime,
        topic: counselingTopic,
        sessionType: counselingType,
        status: 'scheduled',
        meetingLink:
          counselingType === 'online_zoom'
            ? 'https://zoom.us/j/9128374650'
            : counselingType === 'online_gmeet'
            ? 'https://meet.google.com/bkk-cs-vip'
            : undefined,
        studentStrengths: 'Siswa aktif, cepat beradaptasi dengan materi baru dan memiliki rasa ingin tahu yang tinggi.',
        challengesFaced: counselingNotes || 'Permohonan bimbingan privat dari wali murid via Portal Siswa.',
        actionPlan: 'Mentor mendiskusikan kurikulum yang sesuai dan strategi belajar teratur di rumah bersama orang tua.',
        curriculumRecommendation: 'Melanjutkan materi ke jenjang berikutnya sesuai minat logika dan kreativitas anak.',
        internalNotes: 'Daftar mandiri via Portal Siswa.',
        parentFeedback: counselingNotes || undefined,
      });

      setCounselingList(getCounselingSessions());
      setShowCounselingModal(false);
      setCounselingNotes('');
      setCounselingDate('');
      setCounselingMsg({
        text: 'Permohonan bimbingan privat berhasil diajukan! Tim akademik Beekoding akan mengonfirmasi via WhatsApp.',
        type: 'success',
      });
      setTimeout(() => setCounselingMsg(null), 6000);
    } catch {
      setCounselingMsg({ text: 'Terjadi kendala saat memproses permohonan.', type: 'error' });
    }
  };

  // Quizzes filtering for active student
  const relevantQuizzes = useMemo(() => {
    if (!studentData) return [];
    const studentBatch = studentData.batches[0];
    const studentTier = (studentData.subMatch?.profile?.tier || studentBatch?.tier || 'junior').toLowerCase();

    return quizzesList.filter((q) => {
      if (!q.isActive) return false;
      if (q.tier === 'all') return true;
      if (q.tier === 'junior' && studentTier.includes('junior')) return true;
      if (q.tier === 'middle' && studentTier.includes('middle')) return true;
      if (q.tier === 'teens' && studentTier.includes('teen')) return true;
      return true;
    });
  }, [studentData, quizzesList]);

  const studentQuizAttempts = useMemo(() => {
    if (!studentData) return [];
    const phone = (studentData.parentPhone || selectedStudentPhone || '').replace(/\D/g, '');
    return quizAttemptsList.filter((a) => {
      const aPhone = a.studentPhone.replace(/\D/g, '');
      return (
        (phone && aPhone === phone) ||
        a.studentName.toLowerCase() === studentData.studentName.toLowerCase()
      );
    });
  }, [studentData, selectedStudentPhone, quizAttemptsList]);

  // Quiz Runner Handlers
  const handleStartQuiz = (quiz: QuizExam) => {
    setActiveQuizForExam(quiz);
    setActiveExamQuestionIdx(0);
    setExamAnswers({});
    setExamTimeRemaining(quiz.durationMinutes * 60);
    setExamResult(null);
  };

  const handleSelectExamAnswer = (qId: string, optIdx: number) => {
    setExamAnswers((prev) => ({
      ...prev,
      [qId]: optIdx,
    }));
  };

  const handleSubmitQuiz = useCallback(() => {
    if (!activeQuizForExam || !studentData) return;
    const res = submitQuizAttempt(
      activeQuizForExam.id,
      studentData.studentName,
      studentData.parentPhone || selectedStudentPhone || '081234567890',
      examAnswers
    );
    setQuizAttemptsList(getQuizAttempts());
    setExamResult(res);
  }, [activeQuizForExam, studentData, selectedStudentPhone, examAnswers]);

  // Ref to access latest handleSubmitQuiz in interval without resetting timer
  const submitQuizRef = useRef(handleSubmitQuiz);
  useEffect(() => {
    submitQuizRef.current = handleSubmitQuiz;
  }, [handleSubmitQuiz]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!activeQuizForExam || examResult) return;
    const timer = setInterval(() => {
      setExamTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            submitQuizRef.current();
          }, 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeQuizForExam, examResult]);

  const formatTimerDisplay = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Active Student's Ambassador Profile & Referral Code
  const studentAmbassador = useMemo(() => {
    if (!studentData) return null;
    const phone = (studentData.parentPhone || selectedStudentPhone || '').replace(/\D/g, '');
    const normName = studentData.studentName.toLowerCase().trim();

    return (
      ambassadorsList.find((a) => {
        const aPhone = a.phone.replace(/\D/g, '');
        return (phone && aPhone === phone) || a.name.toLowerCase().includes(normName);
      }) || null
    );
  }, [studentData, selectedStudentPhone, ambassadorsList]);

  const studentReferralCode = useMemo(() => {
    if (studentAmbassador) return studentAmbassador.referralCode;
    if (!studentData) return 'BEE-2026';
    const firstName = studentData.studentName.trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase();
    return `${firstName || 'BEE'}-BEE`;
  }, [studentAmbassador, studentData]);

  const studentReferralRecords = useMemo(() => {
    const code = studentReferralCode.toUpperCase();
    return referralsList.filter(
      (r) => r.ambassadorCode.toUpperCase() === code || (studentAmbassador && r.ambassadorId === studentAmbassador.id)
    );
  }, [referralsList, studentReferralCode, studentAmbassador]);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(studentReferralCode);
    setCopiedReferralCode(true);
    setTimeout(() => setCopiedReferralCode(false), 2500);
  };

  const handleShareStudentReferralWhatsApp = () => {
    const studentName = studentData?.studentName || 'kami';
    const msg = `Halo Ayah/Bunda! 🐝✨

Yuk ajak ananda belajar koding seru bareng ${studentName} di Beekoding Academy!

Gunakan kode referral eksklusif ini:
👉 *${studentReferralCode}*

Keuntungan untuk Anda:
🎁 *Diskon langsung Rp 150.000* untuk pendaftaran kelas koding.
✨ Akses sesi Trial Class gratis & tes bakat koding anak.

Kunjungi portal pendaftaran:
${window.location.origin}

Ayo bergabung dan ciptakan karya game & AI bareng! 🚀`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleDirectReferralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralFriendName.trim() || !referralFriendPhone.trim()) {
      setReferralSubmitMsg({ text: 'Mohon isi nama dan nomor WhatsApp teman.', type: 'error' });
      return;
    }
    try {
      createReferralRecord({
        ambassadorCode: studentReferralCode,
        referredStudentName: referralFriendName.trim(),
        referredParentPhone: referralFriendPhone.trim(),
        targetCourse: referralFriendCourse,
        notes: referralFriendNotes.trim() || 'Rekomendasi mandiri via Portal Siswa.',
      });
      setReferralsList(getReferralRecords());
      setAmbassadorsList(getAmbassadors());
      setReferralFriendName('');
      setReferralFriendPhone('');
      setReferralFriendNotes('');
      setReferralSubmitMsg({
        text: 'Teman berhasil direkomendasikan! Tim Beekoding akan mengonfirmasi via WhatsApp.',
        type: 'success',
      });
      setTimeout(() => setReferralSubmitMsg(null), 6000);
    } catch {
      setReferralSubmitMsg({ text: 'Terjadi kendala saat mendaftarkan rekomendasi.', type: 'error' });
    }
  };

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (!query) return;

    // 1. Direct Certificate Match by Number or Verification Code
    const certFound = certificates.find(
      (c) =>
        c.certificateNumber.toLowerCase() === query.toLowerCase() ||
        c.verificationCode.toLowerCase() === query.toLowerCase() ||
        c.id.toLowerCase() === query.toLowerCase()
    );
    if (certFound) {
      setSelectedStudentName(certFound.studentName);
      if (certFound.parentPhone) setSelectedStudentPhone(certFound.parentPhone);
      setActiveTab('certificate');
      return;
    }

    // 2. Direct Academic Report Match by ID
    const repFound = reports.find(
      (r) => r.id.toLowerCase() === query.toLowerCase()
    );
    if (repFound) {
      setSelectedStudentName(repFound.studentName);
      if (repFound.parentPhone) setSelectedStudentPhone(repFound.parentPhone);
      setActiveTab('report');
      return;
    }

    // 3. Digits -> phone
    const isDigits = /^[0-9+ ]+$/.test(query);
    if (isDigits) {
      setSelectedStudentPhone(query);
      setSelectedStudentName(null);
    } else {
      setSelectedStudentName(query);
      setSelectedStudentPhone(null);
    }
  };

  /*
  const _handleSelectDemoStudent = (demo: (typeof _DEMO_STUDENTS)[0]) => {
    setSearchInput(demo.name);
    setSelectedStudentName(demo.name);
    setSelectedStudentPhone(demo.phone);
  };
  */

  const handleResetSearch = () => {
    setSelectedStudentPhone(null);
    setSelectedStudentName(null);
    setSearchInput('');
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#fcfaf5] text-slate-800'
      }`}
    >
      {/* Top Navigation Bar */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
          isDark
            ? 'bg-[#111624]/90 border-amber-500/20 shadow-md shadow-black/20'
            : 'bg-white/90 border-amber-300/60 shadow-sm shadow-amber-900/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {/* <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100'
              }`}
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Ke Beranda</span>
            </button> */}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 p-[1.5px]">
                <div
                  className={`w-full h-full rounded-[10px] flex items-center justify-center overflow-hidden ${
                    isDark ? 'bg-[#121622]' : 'bg-white'
                  }`}
                >
                  <img
                    src="/favicon.png"
                    alt="Beekoding"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base font-['Space_Grotesk'] tracking-tight block leading-none">
                  Portal Siswa & Wali
                </span>
                <span className="text-[10px] text-amber-500 font-semibold tracking-wider uppercase">
                  Beekoding Academic Hub
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleManualSync}
              disabled={isCloudSyncing}
              title={
                isCloudSyncing
                  ? 'Menyinkronkan data Cloud...'
                  : lastSyncTime
                  ? `Sinkronisasi terakhir: ${lastSyncTime.toLocaleTimeString('id-ID')}`
                  : 'Sinkronkan data terbaru dari Cloud'
              }
              className={`p-2 rounded-xl border transition-colors flex items-center justify-center cursor-pointer text-xs ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-300 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin text-amber-500' : ''}`} />
            </button>
            {studentData && (
              <button
                type="button"
                onClick={handleResetSearch}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer font-medium ${
                  isDark
                    ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Keluar
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ========================================== */}
        {/* STEP 1: SEARCH / LOGIN FORM (If no student selected) */}
        {/* ========================================== */}
        {!studentData ? (
          <div className="max-w-3xl mx-auto py-6 sm:py-12 space-y-8">
            {/* Header Hero Banner */}
            <div className="text-center space-y-3">
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
                  isDark
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                    : 'bg-amber-100/80 border border-amber-300 text-amber-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Layanan Mandiri Orang Tua & Murid Beekoding</span>
              </div>
              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-black font-['Space_Grotesk'] tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Pantau Perkembangan <br className="hidden sm:inline" />
                <span className="text-gradient-honey">Belajar Coding & AI Anak</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Cek jadwal kelas, presensi kehadiran tiap sesi, laporan rapor berkala, sertifikat kelulusan, dan unduh kwitansi resmi tanpa perlu kata sandi rumit.
              </p>
            </div>

            {/* Search Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
                isDark
                  ? 'bg-[#121624]/90 border-amber-500/25 shadow-black/40'
                  : 'bg-white border-amber-300/70 shadow-amber-900/5'
              }`}
            >
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                    Cari Siswa, No. WhatsApp, atau No. Sertifikat / Kode Verifikasi
                  </label>
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Contoh: 081234567890, Kenzo Alvaro, atau BK-CERT/..."
                      className={`w-full pl-12 pr-28 py-3.5 rounded-2xl text-sm sm:text-base font-medium border outline-none transition-all ${
                        isDark
                          ? 'bg-slate-900/90 border-slate-700 text-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!searchInput.trim()}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                        searchInput.trim()
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/25'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Buka Portal
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Data terenkripsi dan diverifikasi sesuai nomor kontak pendaftaran awal.</span>
                  </p>
                </div>
              </form>

              {/* Quick Demo Selector Chips */}
              {/* <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Coba Akses Cepat Akun Demo (1-Klik):
                  </span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full font-bold">
                    Demo Mode
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_STUDENTS.map((demo) => (
                    <button
                      key={demo.name}
                      type="button"
                      onClick={() => handleSelectDemoStudent(demo)}
                      className={`p-3 rounded-2xl border text-left transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-between gap-3 ${
                        isDark
                          ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/50 hover:bg-slate-800/80'
                          : 'bg-amber-50/50 border-amber-200/80 hover:border-amber-400 hover:bg-white shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm">
                          {demo.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {demo.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {demo.tier}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div> */}
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                <h4 className="text-xs font-bold">Presensi Transparan</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Rekap kehadiran per pertemuan dan materi yang dipelajari.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <FileText className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <h4 className="text-xs font-bold">Rapor Kemajuan Digital</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Evaluasi 5 pilar kompetensi koding format A4 siap cetak.
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <Award className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                <h4 className="text-xs font-bold">Piagam Sertifikat Resmi</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Dilengkapi QR code verifikasi keaslian terdaftar di sistem.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================== */
          /* STEP 2: ACTIVE STUDENT DASHBOARD           */
          /* ========================================== */
          <div className="space-y-6">
            {/* Student Profile Hero Card */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${
                isDark
                  ? 'bg-gradient-to-br from-[#141a29] via-[#101422] to-[#141a29] border-amber-500/30'
                  : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-300 shadow-amber-900/10'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="flex items-start sm:items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 p-0.5 shadow-lg shadow-amber-500/30 flex-shrink-0">
                    <div
                      className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-2xl sm:text-3xl ${
                        isDark ? 'bg-slate-900 text-amber-400' : 'bg-white text-amber-600'
                      }`}
                    >
                      {studentData.studentName.charAt(0)}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2
                        className={`text-xl sm:text-2xl lg:text-3xl font-black font-['Space_Grotesk'] tracking-tight ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {studentData.studentName}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {studentData.batches[0]?.tier
                          ? `Jenjang ${studentData.batches[0].tier.toUpperCase()}`
                          : 'Siswa Aktif'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        Wali: <strong>{studentData.parentName}</strong>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        WA: <strong>{studentData.parentPhone}</strong>
                      </span>
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Batch:{' '}
                      <strong className="text-amber-600 dark:text-amber-400">
                        {studentData.batches[0]?.name || 'Junior Explorer - Scratch Game Dev (Batch 04)'}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Quick Join Meeting / Ruang Belajar Button */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={
                      studentData.batches[0]?.meetUrl ||
                      'https://meet.google.com/bkk-camp-2026'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all"
                  >
                    <Video className="w-4 h-4 text-slate-950" />
                    <span>Masuk Ruang Kelas (GMeet)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://wa.me/6281234567890?text=Halo%20Admin%20Beekoding,%20saya%20wali%20murid%20ingin%20berkonsultasi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-colors ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Send className="w-4 h-4 text-emerald-500" />
                    <span>Hubungi CS</span>
                  </a>
                </div>
              </div>

              {/* Decorative Bee Mascot in Hero */}
              <img
                src="/bee-mascot.png"
                alt="Bee Mascot"
                className="absolute right-4 -bottom-6 w-32 h-32 opacity-10 pointer-events-none"
              />
            </div>

            {/* 4 Stat Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Stat 1: Presensi */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Kehadiran
                  </span>
                  <Calendar className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                  {studentData.attendancePercentage}%
                </div>
                <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">
                  {studentData.presentCount} Sesi Hadir
                </p>
              </div>

              {/* Stat 2: Rapor Terakhir */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Predikat Rapor
                  </span>
                  <FileText className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
                  {studentData.reports[0]?.gradeLetter || 'A+'}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  Skor: {studentData.reports[0]?.averageScore || '94.0'} / 100
                </p>
              </div>

              {/* Stat 3: Sertifikat */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Sertifikat
                  </span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-amber-600 dark:text-amber-400">
                  {studentData.certificates.length || 1} Piagam
                </div>
                <p className="text-[11px] text-emerald-500 font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Terverifikasi QR
                </p>
              </div>

              {/* Stat 4: Pembayaran */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isDark
                    ? 'bg-slate-900/70 border-slate-800'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Status Biaya
                  </span>
                  <Receipt className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
                  {studentData.transactions[0]?.status === 'paid' ? 'LUNAS' : 'SELESAI'}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Kwitansi Terbit
                </p>
              </div>
            </div>

            {/* Urgent Pinned Announcement Banner (if any) */}
            {pinnedAlert && (
              <div
                onClick={() => setActiveTab('announcements')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  pinnedAlert.priority === 'urgent'
                    ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/60 text-red-700 dark:text-red-300'
                    : pinnedAlert.priority === 'important'
                    ? 'bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60 text-amber-800 dark:text-amber-200'
                    : isDark
                    ? 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 text-slate-200'
                    : 'bg-amber-50/80 border-amber-200 hover:border-amber-400 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      pinnedAlert.priority === 'urgent'
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-amber-500 text-slate-950'
                    }`}
                  >
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
                        {pinnedAlert.category.toUpperCase()}
                      </span>
                      {pinnedAlert.pinned && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                          <Pin className="w-3 h-3 fill-amber-500" /> Disematkan
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {new Date(pinnedAlert.publishedAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold truncate mt-0.5">
                      {pinnedAlert.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>Lihat Pengumuman</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Sub Tabs Navigation */}
            <div
              className={`flex items-center gap-1 p-1.5 rounded-2xl border overflow-x-auto scrollbar-none transition-colors ${
                isDark
                  ? 'bg-[#121624] border-slate-800'
                  : 'bg-white border-amber-200/80 shadow-xs'
              }`}
            >
              {[
                { id: 'overview' as PortalTab, label: 'Ringkasan', icon: Sparkles },
                {
                  id: 'announcements' as PortalTab,
                  label: 'Pengumuman',
                  icon: Megaphone,
                  badge: relevantAnnouncements.length > 0 ? String(relevantAnnouncements.length) : undefined,
                },
                {
                  id: 'quizzes' as PortalTab,
                  label: 'Kuis & Ujian',
                  icon: HelpCircle,
                  badge: relevantQuizzes.length > 0 ? String(relevantQuizzes.length) : undefined,
                },
                {
                  id: 'referrals' as PortalTab,
                  label: 'Ajak Teman & Duta',
                  icon: Share2,
                  badge: studentReferralRecords.length > 0 ? `${studentReferralRecords.length} Teman` : 'Hadiah',
                },
                {
                  id: 'resources' as PortalTab,
                  label: 'Bahan Ajar & Modul',
                  icon: FolderDown,
                  badge: relevantResources.length > 0 ? String(relevantResources.length) : undefined,
                },
                { id: 'quests' as PortalTab, label: 'Misi & Prestasi', icon: Flame },
                { id: 'attendance' as PortalTab, label: 'Presensi Sesi', icon: Calendar },
                { id: 'report' as PortalTab, label: 'Rapor Belajar', icon: FileText },
                { id: 'certificate' as PortalTab, label: 'Piagam Sertifikat', icon: Award },
                { id: 'projects' as PortalTab, label: 'Karya Siswa', icon: Rocket },
                { id: 'billing' as PortalTab, label: 'Kwitansi & Biaya', icon: Receipt },
                {
                  id: 'events' as PortalTab,
                  label: 'Event & Workshop',
                  icon: CalendarCheck,
                  badge: studentData.matchedEvents.length > 0 ? String(studentData.matchedEvents.length) : undefined,
                },
                {
                  id: 'counseling' as PortalTab,
                  label: 'Bimbingan & Konseling',
                  icon: HeartHandshake,
                  badge: studentData.counselingSessions.length > 0 ? String(studentData.counselingSessions.length) : undefined,
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-sm'
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                          isActive
                            ? 'bg-slate-950 text-amber-400'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ========================================== */}
            {/* TAB CONTENT: 1. OVERVIEW                   */}
            {/* ========================================== */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Class Status & Capstone Highlight */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Kelas Aktif & Jadwal */}
                  <div
                    className={`p-6 rounded-3xl border ${
                      isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        <span>Kelas yang Sedang Berjalan</span>
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                        Sesi Aktif
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div
                        className={`p-4 rounded-2xl border ${
                          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-200/60'
                        }`}
                      >
                        <div className="font-bold text-base text-slate-900 dark:text-white">
                          {studentData.batches[0]?.name ||
                            'Junior Explorer - Scratch Game Dev (Batch 04)'}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Program Pembelajaran Coding Hands-on 12 Sesi dengan Bimbingan Mentor Intensif
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                          <div>
                            <span className="text-slate-500 block">Jadwal Sesi:</span>
                            <span className="font-bold">Setiap Sabtu & Minggu</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Waktu Belajar:</span>
                            <span className="font-bold">09:00 - 10:30 WIB</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Mentor Pengajar:</span>
                            <span className="font-bold text-amber-600 dark:text-amber-400">
                              {studentData.reports[0]?.instructorName || 'Sarah Amalia, S.T.'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sorotan Capstone Proyek Siswa */}
                  <div
                    className={`p-6 rounded-3xl border ${
                      isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base flex items-center gap-2">
                        <Rocket className="w-5 h-5 text-amber-500" />
                        <span>Karya Proyek Unggulan (Capstone Project)</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab('projects')}
                        className="text-xs text-amber-500 hover:underline font-bold flex items-center gap-1"
                      >
                        <span>Semua Proyek</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div
                      className={`p-5 rounded-2xl border ${
                        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-purple-50/40 border-purple-200/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300">
                            Proyek Akhir Kelulusan
                          </span>
                          <h4 className="font-bold text-base sm:text-lg mt-2 text-slate-900 dark:text-white">
                            {studentData.reports[0]?.capstoneProjectTitle ||
                              'Petualangan Lebah Penyelamat Hutan (Bee Adventure 2D)'}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {studentData.reports[0]?.capstoneProjectDesc ||
                              'Game arcade interaktif di Scratch dengan 3 tingkatan kesulitan, sistem skor apel emas, mekanik musuh laba-laba berbasis loop timer, dan musik latar 8-bit gubahan sendiri.'}
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                          <Rocket className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-purple-200/40 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs text-slate-500">Platform: Scratch 3.0 / Web</span>
                        <a
                          href="https://scratch.mit.edu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                        >
                          <span>Buka Karya</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Col: Kupon Promo Spesial & Bantuan Hotline */}
                <div className="space-y-6">
                  {/* Voucher Khusus Alumni / Lanjut Kelas */}
                  <div
                    className={`p-6 rounded-3xl border ${
                      isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Ticket className="w-5 h-5 text-amber-500" />
                      <h3 className="font-bold text-sm">Voucher Diskon Siswa</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Bagikan kupon ini ke teman sekolah atau gunakan untuk pendaftaran jenjang lanjutan.
                    </p>

                    {vouchers.slice(0, 2).map((v) => (
                      <div
                        key={v.id}
                        className={`p-3.5 rounded-2xl border mb-3 transition-colors ${
                          isDark
                            ? 'bg-slate-900 border-amber-500/20'
                            : 'bg-amber-50/70 border-amber-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                            {v.code}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(v.code, v.code)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                            title="Salin Kode"
                          >
                            {copiedText === v.code ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="text-xs font-bold mt-1 text-slate-900 dark:text-white">
                          {v.discountType === 'percentage'
                            ? `Diskon ${v.discountValue}%`
                            : `Potongan ${formatRupiah(v.discountValue)}`}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {v.title}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bantuan Layanan Wali Murid */}
                  <div
                    className={`p-6 rounded-3xl border ${
                      isDark
                        ? 'bg-gradient-to-br from-slate-900 to-[#121624] border-slate-800'
                        : 'bg-gradient-to-br from-amber-50/60 to-white border-amber-200'
                    }`}
                  >
                    <h3 className="font-bold text-sm mb-1">Ada Pertanyaan?</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Tim Academic Advisor Beekoding siap mendampingi perjalanan belajar ananda.
                    </p>
                    <a
                      href="https://wa.me/6281234567890?text=Halo%20Beekoding,%20saya%20wali%20murid%20ingin%20berkonsultasi%20jadwal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp Hotline</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 2. PAPAN PENGUMUMAN           */}
            {/* ========================================== */}
            {activeTab === 'announcements' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk'] flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-amber-500" />
                      <span>Papan Pengumuman & Info Terkini</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Informasi akademik, jadwal libur, tantangan coding, dan pengumuman resmi Beekoding.
                    </p>
                  </div>
                  <div className="text-xs text-slate-400">
                    Menampilkan <strong>{relevantAnnouncements.length}</strong> pengumuman
                  </div>
                </div>

                {relevantAnnouncements.length === 0 ? (
                  <div
                    className={`p-12 text-center rounded-3xl border ${
                      isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <Megaphone className="w-12 h-12 mx-auto mb-3 text-slate-400 opacity-40" />
                    <h4 className="font-bold text-base">Belum Ada Pengumuman Baru</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Semua agenda kelas berjalan lancar sesuai jadwal. Cek kembali nanti untuk info teranyar.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relevantAnnouncements.map((ann) => (
                      <div
                        key={ann.id}
                        className={`p-6 rounded-3xl border transition-all relative flex flex-col justify-between ${
                          ann.pinned
                            ? isDark
                              ? 'bg-gradient-to-br from-amber-500/10 via-slate-900 to-[#121624] border-amber-500/40 shadow-lg shadow-amber-500/5'
                              : 'bg-gradient-to-br from-amber-50/90 via-white to-amber-50/40 border-amber-300 shadow-sm'
                            : isDark
                            ? 'bg-[#121624] border-slate-800'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div>
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  ann.priority === 'urgent'
                                    ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                                    : ann.priority === 'important'
                                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                }`}
                              >
                                {ann.category}
                              </span>

                              {ann.audience !== 'all' && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                  {ann.audience === 'junior'
                                    ? 'Khusus Junior'
                                    : ann.audience === 'middle'
                                    ? 'Khusus Middle'
                                    : ann.audience === 'teens'
                                    ? 'Khusus Teens'
                                    : 'Kelas Tertentu'}
                                </span>
                              )}
                            </div>

                            {ann.pinned && (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-500 shrink-0">
                                <Pin className="w-3.5 h-3.5 fill-amber-500" />
                                <span>Disematkan</span>
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="font-black text-base text-slate-900 dark:text-white leading-snug mb-2">
                            {ann.title}
                          </h4>

                          {/* Content */}
                          <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed mb-4">
                            {ann.content}
                          </p>
                        </div>

                        {/* Footer Info */}
                        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <span>
                            Diumumkan oleh <strong>{ann.authorName}</strong>
                          </span>
                          <span>
                            {new Date(ann.publishedAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: BAHAN AJAR & LEMBAR KERJA     */}
            {/* ========================================== */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                    isDark
                      ? 'bg-gradient-to-br from-[#141a29] via-[#101422] to-[#141a29] border-amber-500/30 shadow-xl'
                      : 'bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border-amber-300 shadow-amber-900/10'
                  }`}
                >
                  <div className="space-y-2 max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 text-xs font-bold uppercase tracking-wider">
                      <FolderDown className="w-3.5 h-3.5" />
                      <span>Student Resource Center</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] tracking-tight text-slate-900 dark:text-white">
                      Bahan Ajar & Lembar Kerja Siswa
                    </h2>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      Koleksi lembar aktivitas mingguan, slide kurikulum, starter code latihan, dan cheatsheet ringkasan sintaks pemrograman khusus jenjang ananda.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 relative z-10">
                    <div
                      className={`p-4 rounded-2xl border text-center ${
                        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-200 shadow-xs'
                      }`}
                    >
                      <div className="text-xl font-black font-['Space_Grotesk'] text-amber-500">
                        {relevantResources.length}
                      </div>
                      <div className="text-[11px] font-bold text-slate-400">Modul Tersedia</div>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Category Pills */}
                  <div
                    className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    {[
                      { id: 'all', label: 'Semua Format' },
                      { id: 'worksheet', label: 'Lembar Kerja' },
                      { id: 'starter_code', label: 'Starter Code' },
                      { id: 'slide', label: 'Slide Materi' },
                      { id: 'cheatsheet', label: 'Cheatsheet' },
                      { id: 'guide', label: 'Panduan' },
                      { id: 'video', label: 'Video Tutorial' },
                    ].map((f) => {
                      const isSelected = resourceFilterType === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setResourceFilterType(f.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 shadow-xs'
                              : isDark
                              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-amber-50'
                          }`}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Search Bar */}
                  <div className="relative min-w-[200px] sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari materi / modul..."
                      value={resourceSearch}
                      onChange={(e) => setResourceSearch(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition-all ${
                        isDark
                          ? 'bg-slate-900/80 border-slate-800 text-slate-200 focus:border-amber-500'
                          : 'bg-white border-slate-200 text-slate-900 focus:border-amber-500 shadow-xs'
                      }`}
                    />
                  </div>
                </div>

                {/* Resource Cards Grid */}
                {relevantResources.length === 0 ? (
                  <div
                    className={`text-center py-16 px-4 rounded-3xl border ${
                      isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <FolderDown className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-40" />
                    <h4 className="text-base font-bold mb-1 text-slate-800 dark:text-slate-200">
                      Tidak ada bahan ajar yang cocok
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Coba ganti filter kategori atau kata kunci pencarian modul.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relevantResources.map((res) => {
                      const typeLabel =
                        res.type === 'worksheet'
                          ? 'Lembar Kerja'
                          : res.type === 'slide'
                          ? 'Slide Presentasi'
                          : res.type === 'starter_code'
                          ? 'Starter Code'
                          : res.type === 'cheatsheet'
                          ? 'Cheatsheet'
                          : res.type === 'video'
                          ? 'Video Tutorial'
                          : 'Panduan Praktik';

                      const typeColor =
                        res.type === 'worksheet'
                          ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          : res.type === 'slide'
                          ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                          : res.type === 'starter_code'
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          : res.type === 'cheatsheet'
                          ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                          : res.type === 'video'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : 'bg-pink-500/10 text-pink-500 border-pink-500/20';

                      return (
                        <div
                          key={res.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:border-amber-500/40 group ${
                            isDark
                              ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90'
                              : 'bg-white border-slate-200/90 hover:shadow-md'
                          }`}
                        >
                          <div>
                            {/* Top Badges */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                                  {res.sessionNumber ? `Sesi ${res.sessionNumber}` : 'Umum'}
                                </span>
                                <span
                                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${typeColor}`}
                                >
                                  {typeLabel}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {res.fileFormat}
                              </span>
                            </div>

                            {/* Title & Description */}
                            <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors line-clamp-2">
                              {res.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                              {res.description}
                            </p>

                            {/* Tags */}
                            {res.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {res.tags.slice(0, 3).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Footer and Download Action */}
                          <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                            <div className="text-[11px] text-slate-400">
                              {res.fileSize && <span>{res.fileSize} • </span>}
                              <span>{res.downloadsCount}x diunduh</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleDownloadResource(res)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 3. QUESTS & ACHIEVEMENTS       */}
            {/* ========================================== */}
            {activeTab === 'quests' && (
              <div className="space-y-6">
                {/* Level Card Hero Banner */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
                    isDark
                      ? 'bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-slate-900 border-amber-500/30'
                      : 'bg-gradient-to-br from-amber-100/70 via-white to-amber-50 border-amber-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center text-4xl">
                        {studentData.levelInfo.level === 5
                          ? '👑'
                          : studentData.levelInfo.level === 4
                          ? '🏰'
                          : studentData.levelInfo.level === 3
                          ? '🧭'
                          : studentData.levelInfo.level === 2
                          ? '🐝'
                          : '🐣'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-slate-950">
                            LEVEL {studentData.levelInfo.level}
                          </span>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            Bee-Coder
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white mt-1">
                          {studentData.levelInfo.levelTitle}
                        </h2>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          Total Perolehan XP: <strong className="text-amber-600 dark:text-amber-400">{studentData.currentXp} Bee-XP</strong> • Koleksi Lencana: <strong className="text-purple-600 dark:text-purple-400">{studentData.unlockedBadges.length} Badge</strong>
                        </p>
                      </div>
                    </div>

                    {/* Progress to Next Level */}
                    <div className="w-full md:w-72 bg-white/70 dark:bg-slate-900/80 backdrop-blur-xs p-4 rounded-2xl border border-amber-300/60 dark:border-amber-500/30">
                      <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                        <span className="text-slate-600 dark:text-slate-300">
                          {studentData.levelInfo.level >= 5 ? 'Status Peringkat' : `Target Level ${studentData.levelInfo.level + 1}`}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400">
                          {studentData.levelInfo.level >= 5
                            ? 'Level Maksimal 👑'
                            : `${studentData.levelInfo.currentLevelXp} / ${studentData.levelInfo.nextLevelXp} XP`}
                        </span>
                      </div>
                      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-slate-700">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full transition-all duration-500"
                          style={{ width: `${studentData.levelInfo.progressPercent}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-right">
                        {studentData.levelInfo.level >= 5
                          ? 'Gelar Royal AI Pioneer tertinggi diraih!'
                          : `Perlu ${Math.max(0, studentData.levelInfo.nextLevelXp - studentData.levelInfo.currentLevelXp)} XP lagi untuk naik level`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 1: Lencana Prestasi (Badges Gallery) */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border ${
                    isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <span>Koleksi Lencana Kehormatan (*Achievement Badges*)</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Lencana penghargaan resmi yang berhasil diraih dari mentor pengajar Beekoding.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                      {studentData.unlockedBadges.length} Terbuka
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {studentData.unlockedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-4 rounded-2xl border text-center transition-all hover:scale-[1.02] ${
                          badge.rarity === 'legendary'
                            ? 'bg-gradient-to-br from-amber-500/15 via-yellow-500/5 to-slate-900/50 border-amber-500/40 shadow-sm shadow-amber-500/10'
                            : badge.rarity === 'epic'
                            ? 'bg-purple-500/10 border-purple-500/30'
                            : badge.rarity === 'rare'
                            ? 'bg-sky-500/10 border-sky-500/30'
                            : isDark
                            ? 'bg-slate-900/60 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="text-4xl mb-2 filter drop-shadow-sm">{badge.iconEmoji}</div>
                        <div className="font-black text-sm text-slate-900 dark:text-white line-clamp-1">
                          {badge.title}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                          {badge.description}
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                          <span
                            className={`uppercase px-2 py-0.5 rounded-full ${
                              badge.rarity === 'legendary'
                                ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                : badge.rarity === 'epic'
                                ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {badge.rarity}
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 font-mono">
                            +{badge.xpBonus} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 2: Misi Koding Mingguan (Weekly Quests) */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border ${
                    isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-500" />
                        <span>Misi Koding Mingguan (*Weekly Quests*)</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Tantangan coding interaktif seru untuk melatih logika, menambah Bee-XP, dan mengklaim lencana.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      {quests.filter((q) => q.status === 'active').length} Tantangan Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quests
                      .filter((q) => q.status === 'active')
                      .map((quest) => (
                        <div
                          key={quest.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:border-amber-400/60 ${
                            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                {quest.tier === 'all'
                                  ? 'Semua Jenjang'
                                  : quest.tier === 'junior'
                                  ? 'Junior Explorer'
                                  : quest.tier === 'middle'
                                  ? 'Middle Coder'
                                  : 'Teens Innovator'}
                              </span>
                              <span className="text-xs font-black text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5" /> +{quest.xpReward} XP
                              </span>
                            </div>

                            <h4 className="font-bold text-base text-slate-900 dark:text-white mb-1.5">
                              {quest.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                              {quest.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                              Batas: <strong>{quest.deadline}</strong>
                            </span>
                            {quest.starterLink ? (
                              <a
                                href={quest.starterLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
                              >
                                <span>Mulai Misi</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-slate-400 text-xs italic">Kumpul di Kelas</span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 3. ATTENDANCE                 */}
            {/* ========================================== */}
            {activeTab === 'attendance' && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span>Catatan Presensi & Kehadiran Sesi</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Riwayat kehadiran ananda pada setiap pertemuan kelas coding.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Rasio Kehadiran</div>
                      <div className="font-black text-xl text-emerald-500">
                        {studentData.attendancePercentage}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline Sesi */}
                <div className="mt-6 space-y-4">
                  {studentData.attendance.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                      <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
                      <p className="text-sm font-semibold">Belum ada catatan presensi sesi kelas</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Presensi akan otomatis tercatat setelah mentor mengisi absensi pertemuan.
                      </p>
                    </div>
                  ) : (
                    studentData.attendance.map((att, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDark
                            ? 'bg-slate-900/60 border-slate-800'
                            : 'bg-slate-50/80 border-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-black text-sm flex-shrink-0">
                            S{att.session.sessionNumber}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-slate-900 dark:text-white">
                                {att.session.sessionTopic}
                              </span>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                  att.status === 'present'
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : att.status === 'late'
                                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                    : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                                }`}
                              >
                                {att.status === 'present'
                                  ? 'Hadir'
                                  : att.status === 'late'
                                  ? 'Terlambat'
                                  : 'Izin / Sakit'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Tanggal: {att.session.date} • Instruktur: {att.session.instructorName}
                            </p>
                            {att.notes && (
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 italic">
                                "{att.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        {att.session.homeworkAssigned && (
                          <div className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-xl border border-amber-500/20 self-start sm:self-auto">
                            Tugas: {att.session.homeworkAssigned}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 3. REPORT CARD                */}
            {/* ========================================== */}
            {activeTab === 'report' && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {studentData.reports.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-30 text-purple-500" />
                    <p className="text-sm font-semibold">Lembar Rapor Belajar Belum Diterbitkan</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Rapor diterbitkan oleh tim instruktur pada evaluasi tengah sesi atau akhir kursus.
                    </p>
                  </div>
                ) : (
                  studentData.reports.map((rep) => (
                    <div key={rep.id} className="space-y-6">
                      {/* Report Header Card */}
                      <div
                        className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          isDark
                            ? 'bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border-purple-500/30'
                            : 'bg-gradient-to-r from-purple-50 via-white to-amber-50 border-purple-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300">
                              {rep.reportPeriod === 'final_term' ? 'Rapor Akhir Kelulusan' : 'Rapor Tengah Sesi'}
                            </span>
                            <span className="text-xs text-slate-500">
                              Diterbitkan: {rep.issueDate}
                            </span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] mt-1 text-slate-900 dark:text-white">
                            {rep.predicateTitle}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                            Evaluator: <strong>{rep.instructorName}</strong> • Batch: {rep.batchName}
                          </p>
                        </div>

                        <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                          <div className="text-xs text-slate-500">Nilai Rata-rata</div>
                          <div className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-purple-600 dark:text-purple-400">
                            {rep.gradeLetter}{' '}
                            <span className="text-sm font-normal text-slate-400">
                              ({rep.averageScore})
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedReportForModal(rep)}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-colors cursor-pointer shadow-sm shadow-purple-600/20"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Lihat & Cetak Rapor A4</span>
                          </button>
                        </div>
                      </div>

                      {/* 5 Kompetensi Coding */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                          Penilaian 5 Aspek Kompetensi Koding Terstandar:
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            {
                              label: 'Logika Algoritma & Computational Thinking',
                              val: rep.scores.computationalThinking,
                              desc: 'Memecahkan sekuens masalah dan perulangan loop.',
                            },
                            {
                              label: 'Kreativitas & Desain Proyek Visual',
                              val: rep.scores.creativityDesign,
                              desc: 'Inovasi visual sprite, estetika warna, dan audio.',
                            },
                            {
                              label: 'Kemandirian Debugging & Problem Solving',
                              val: rep.scores.problemSolving,
                              desc: 'Menemukan dan memperbaiki bug secara mandiri.',
                            },
                            {
                              label: 'Penguasaan Sintaks & Manipulasi Tools',
                              val: rep.scores.codeMastery,
                              desc: 'Keahlian mengolah blok kode dan fungsi logic.',
                            },
                            {
                              label: 'Sikap Belajar & Kolaborasi Tim',
                              val: rep.scores.teamworkAttitude,
                              desc: 'Keaktifan, antusiasme, dan kesantunan di kelas.',
                            },
                          ].map((c, i) => (
                            <div
                              key={i}
                              className={`p-4 rounded-2xl border ${
                                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-xs text-slate-900 dark:text-white">
                                  {c.label}
                                </span>
                                <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">
                                  {c.val} / 100
                                </span>
                              </div>
                              {/* Progress bar */}
                              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mb-1.5">
                                <div
                                  className="h-full bg-gradient-to-r from-amber-400 to-purple-500 rounded-full"
                                  style={{ width: `${c.val}%` }}
                                />
                              </div>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Catatan Kualitatif Mentor */}
                      <div
                        className={`p-5 rounded-2xl border ${
                          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-amber-50/60 border-amber-200'
                        }`}
                      >
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                          Catatan Evaluasi Instruktur Pengajar:
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                          "{rep.instructorNotes}"
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            Rekomendasi Langkah Lanjutan:
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            {rep.nextStepRecommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 4. CERTIFICATES               */}
            {/* ========================================== */}
            {activeTab === 'certificate' && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                {studentData.certificates.length === 0 ? (
                  <div className="py-12 text-center text-slate-400">
                    <Award className="w-10 h-10 mx-auto mb-2 opacity-30 text-amber-500" />
                    <p className="text-sm font-semibold">Belum Ada Piagam Sertifikat yang Diterbitkan</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Piagam sertifikat kelulusan resmi diterbitkan setelah ananda menuntaskan seluruh sesi kelas.
                    </p>
                  </div>
                ) : (
                  studentData.certificates.map((cert) => (
                    <div key={cert.id} className="space-y-6">
                      {/* Gold Certificate Preview Box */}
                      <div
                        className={`p-8 sm:p-12 rounded-3xl border-4 relative overflow-hidden transition-all text-center ${
                          isDark
                            ? 'bg-gradient-to-b from-[#181d2f] via-[#101422] to-[#181d2f] border-amber-500/50 shadow-2xl shadow-amber-500/10'
                            : 'bg-gradient-to-b from-amber-50/90 via-white to-amber-50/90 border-amber-400 shadow-xl shadow-amber-900/10'
                        }`}
                      >
                        {/* Certificate Header */}
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>BEEKODING CODING & AI ACADEMY</span>
                          </div>
                          <h2
                            className={`text-2xl sm:text-4xl font-black font-['Space_Grotesk'] tracking-wider uppercase ${
                              isDark ? 'text-amber-400' : 'text-amber-800'
                            }`}
                          >
                            PIAGAM PENGHARGAAN KELULUSAN
                          </h2>
                          <p className="text-xs font-mono text-slate-500">
                            Nomor Sertifikat: {cert.certificateNumber} • Verifikasi: {cert.verificationCode}
                          </p>
                        </div>

                        {/* Recipient */}
                        <div className="my-8 py-6 border-y border-amber-500/20 space-y-2">
                          <p className="text-xs text-slate-500 uppercase tracking-widest">
                            Diberikan Kepada Siswa Berbakat:
                          </p>
                          <h3 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white tracking-tight">
                            {cert.studentName}
                          </h3>
                          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                            {cert.honorsTitle || 'Dengan Predikat Sangat Memuaskan (With Distinction)'}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                          {cert.description ||
                            'Telah berhasil menyelesaikan seluruh materi pembelajaran coding, proyek aplikasi mandiri, dan uji kompetensi pemrograman pada kurikulum resmi Beekoding.'}
                        </p>

                        {/* Signatures */}
                        <div className="grid grid-cols-2 gap-6 mt-10 pt-6 border-t border-amber-500/20 text-xs">
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {cert.instructorName || 'Febri Hasan, S.Kom., M.T.'}
                            </div>
                            <span className="text-slate-500 text-[11px]">
                              Lead Assessment & Mentor
                            </span>
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {cert.advisorName || 'Dr. Ir. Hendra Wijaya'}
                            </div>
                            <span className="text-slate-500 text-[11px]">Academic Advisor</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">
                              Sertifikat Resmi & Sah Terdaftar
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Kode Verifikasi Sistem: {cert.verificationCode}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(
                                `https://beekoding.id/#portal?cert=${cert.certificateNumber}`,
                                'Link Sertifikat'
                              )
                            }
                            className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isDark
                                ? 'border-slate-700 hover:bg-slate-800'
                                : 'border-slate-300 hover:bg-slate-100'
                            }`}
                          >
                            {copiedText === 'Link Sertifikat' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                            <span>Bagikan Link</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedCertificateForModal(cert)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/20 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Lihat & Cetak Piagam PDF</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 5. STUDENT PROJECTS           */}
            {/* ========================================== */}
            {activeTab === 'projects' && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-amber-500" />
                    <span>Portofolio & Capstone Project Siswa</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Koleksi game, animasi, dan aplikasi web yang dirancang dan dikembangkan sendiri oleh ananda.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default or real project showcase */}
                  <div
                    className={`p-5 rounded-3xl border transition-all ${
                      isDark
                        ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                        : 'bg-amber-50/30 border-amber-200 hover:border-amber-400 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        Scratch Game Dev
                      </span>
                      <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terkurasi Publik
                      </span>
                    </div>

                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                      {studentData.reports[0]?.capstoneProjectTitle ||
                        'Petualangan Lebah Penyelamat Hutan (Bee Adventure 2D)'}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {studentData.reports[0]?.capstoneProjectDesc ||
                        'Game arcade interaktif di Scratch dengan 3 tingkatan kesulitan, sistem skor apel emas, mekanik musuh laba-laba berbasis loop timer, dan musik latar 8-bit gubahan sendiri.'}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Platform: Scratch 3.0</span>
                      <a
                        href="https://scratch.mit.edu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                      >
                        <span>Mainkan Game</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 6. BILLING & INVOICE          */}
            {/* ========================================== */}
            {activeTab === 'billing' && (
              <div
                className={`p-6 sm:p-8 rounded-3xl border ${
                  isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-emerald-500" />
                    <span>Riwayat Kwitansi & Pembayaran Biaya</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Bukti transaksi pendaftaran kursus resmi Beekoding Academy.
                  </p>
                </div>

                <div className="space-y-4">
                  {studentData.transactions.length === 0 ? (
                    <div className="p-6 rounded-2xl border border-dashed text-center text-slate-400">
                      <Receipt className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-500" />
                      <p className="text-sm font-semibold">Kwitansi Tersimpan: INV/2026/06/001</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Status: Lunas • Nominal: Rp 1.050.000 via Transfer BCA
                      </p>
                    </div>
                  ) : (
                    studentData.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className={`p-6 rounded-3xl border transition-all ${
                          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                                {tx.invoiceNumber}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                  tx.status === 'paid'
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {tx.status === 'paid' ? 'Lunas' : 'DP Sebagian'}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500 mt-0.5 block">
                              Program: {tx.programName}
                            </span>
                          </div>

                          <div className="text-right">
                            <div className="text-xs text-slate-500">Total Dibayar</div>
                            <div className="text-xl sm:text-2xl font-black font-['Space_Grotesk'] text-emerald-600 dark:text-emerald-400">
                              {formatRupiah(tx.paidAmount || tx.totalAmount)}
                            </div>
                          </div>
                        </div>

                        {/* Rincian Item */}
                        <div className="py-4 space-y-2 text-xs">
                          {tx.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="text-slate-600 dark:text-slate-300">
                                {item.name} (x{item.qty})
                              </span>
                              <span className="font-bold">{formatRupiah(item.price * item.qty)}</span>
                            </div>
                          ))}
                          {tx.discount > 0 && (
                            <div className="flex justify-between items-center text-amber-600 dark:text-amber-400">
                              <span>Potongan Diskon Kupon ({tx.discountCode || 'PROMO'})</span>
                              <span className="font-bold">-{formatRupiah(tx.discount)}</span>
                            </div>
                          )}
                        </div>

                        {/* Footer info */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <span className="text-slate-500">
                            Metode: <strong>{tx.paymentMethod.toUpperCase()}</strong> • Tanggal:{' '}
                            {new Date(tx.createdAt).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>

                          <button
                            type="button"
                            onClick={() => setSelectedTransactionForModal(tx)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-slate-500" />
                            <span>Lihat & Cetak Kwitansi</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            {/* ========================================== */}
            {/* TAB CONTENT: 10. EVENTS & WORKSHOPS        */}
            {/* ========================================== */}
            {activeTab === 'events' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Alert Toast if any */}
                {eventBookingMsg && (
                  <div
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-fadeIn ${
                      eventBookingMsg.type === 'success'
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                        : 'bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span>{eventBookingMsg.text}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEventBookingMsg(null)}
                      className="text-xs font-bold px-2 py-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                )}

                {/* Sub-Section 1: Registered Sessions */}
                <div
                  className={`p-6 rounded-3xl border ${
                    isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <h3 className="font-bold text-base flex items-center gap-2">
                        <CalendarCheck className="w-5 h-5 text-amber-500" />
                        <span>Sesi Workshop & Trial yang Diikuti</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Daftar agenda yang telah didaftarkan untuk ananda {studentData.studentName}.
                      </p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full font-bold bg-amber-500/10 text-amber-500 border border-amber-500/30 self-start sm:self-auto">
                      {studentData.matchedEvents.length} Sesi Terdaftar
                    </span>
                  </div>

                  {studentData.matchedEvents.length === 0 ? (
                    <div className="text-center py-10 px-4 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800">
                      <Calendar className="w-10 h-10 mx-auto text-slate-400 opacity-40 mb-2" />
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                        Belum ada sesi workshop atau trial class yang didaftarkan.
                      </p>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        Pilih agenda yang tersedia di bawah untuk mendaftarkan ananda dalam 1-klik!
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {studentData.matchedEvents.map(({ event, registration }) => (
                        <div
                          key={event.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all ${
                            isDark
                              ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40'
                              : 'bg-slate-50 border-amber-200/80 hover:border-amber-400'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                  event.eventType === 'trial_class'
                                    ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                    : event.eventType === 'workshop'
                                    ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                                    : 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                }`}
                              >
                                {event.eventType === 'trial_class'
                                  ? 'Free Trial Class'
                                  : event.eventType === 'workshop'
                                  ? 'Workshop'
                                  : 'Webinar'}
                              </span>

                              <span
                                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                                  registration.status === 'confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                                    : registration.status === 'attended'
                                    ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                }`}
                              >
                                {registration.status === 'confirmed'
                                  ? 'Dikonfirmasi'
                                  : registration.status === 'attended'
                                  ? 'Sudah Hadir'
                                  : 'Terdaftar'}
                              </span>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-2xl flex items-center justify-center shrink-0">
                                {event.posterUrlOrEmoji || '🐝'}
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                                  {event.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  Mentor: {event.instructorName}
                                </p>
                              </div>
                            </div>

                            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300 pt-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                <span>
                                  {new Date(event.date).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                <span>{event.startTime} - {event.endTime} WIB</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Video className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{event.locationDetail}</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 flex items-center gap-2">
                            <a
                              href={event.meetingUrl || 'https://zoom.us'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 flex items-center justify-center gap-1.5 shadow-sm transition-all"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Masuk Link Zoom</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href={`https://wa.me/6285311317127?text=Halo%20Admin%20Beekoding,%20saya%20wali%20dari%20${encodeURIComponent(
                                studentData.studentName
                              )}%20ingin%20konfirmasi%20sesi%20${encodeURIComponent(event.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Tanya CS via WhatsApp"
                            >
                              <Send className="w-3.5 h-3.5 text-emerald-500" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sub-Section 2: Explore Available Sessions for This Tier */}
                <div
                  className={`p-6 rounded-3xl border ${
                    isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>Jelajahi Workshop & Webinar Terbuka</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Sesi interaktif yang cocok untuk jenjang usia ananda. Daftar instan dalam 1-klik!
                    </p>
                  </div>

                  {studentData.availableEvents.length === 0 ? (
                    <div className="text-center py-10 px-4 border border-dashed rounded-2xl border-slate-300 dark:border-slate-800">
                      <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 opacity-60 mb-2" />
                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
                        Luar biasa! Ananda telah terdaftar di seluruh agenda yang tersedia.
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Tim Beekoding akan mengumumkan jadwal workshop sesi baru segera.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {studentData.availableEvents.map((evt) => {
                        const seatsLeft = Math.max(0, evt.capacity - evt.registrations.length);
                        return (
                          <div
                            key={evt.id}
                            className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:border-amber-400 ${
                              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between gap-2">
                                <span
                                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                    evt.eventType === 'trial_class'
                                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                                      : 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                                  }`}
                                >
                                  {evt.eventType === 'trial_class' ? 'Free Trial' : 'Workshop'}
                                </span>
                                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  Sisa {seatsLeft} Kursi
                                </span>
                              </div>

                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-xl flex items-center justify-center shrink-0">
                                  {evt.posterUrlOrEmoji || '🐝'}
                                </div>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                                  {evt.title}
                                </h4>
                              </div>

                              <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                  <span>
                                    {new Date(evt.date).toLocaleDateString('id-ID', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                    , {evt.startTime} WIB
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Video className="w-3.5 h-3.5 text-emerald-500" />
                                  <span className="truncate">{evt.locationDetail}</span>
                                </div>
                              </div>

                              {evt.learningOutcomes && evt.learningOutcomes[0] && (
                                <p className="text-[11px] text-slate-400 line-clamp-2 italic pt-1">
                                  "{evt.learningOutcomes[0]}"
                                </p>
                              )}
                            </div>

                            <div className="pt-4">
                              <button
                                type="button"
                                onClick={() => handleQuickRegisterEvent(evt)}
                                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                              >
                                <span>Daftar 1-Klik untuk {studentData.studentName.split(' ')[0]}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 11. COUNSELING & COACHING HUB */}
            {/* ========================================== */}
            {activeTab === 'counseling' && (
              <div className="space-y-6">
                {/* Header Card */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-[#121624] via-slate-900 to-[#121624] border-emerald-500/20'
                      : 'bg-gradient-to-r from-emerald-50/70 via-white to-amber-50/70 border-emerald-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 shrink-0">
                        <HeartHandshake className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                            Bimbingan & Konseling Belajar Privat
                          </h3>
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            1-on-1 VIP Session
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                          Layanan konsultasi belajar privat 1-on-1 bersama Head Coach Beekoding. Dapatkan analisis gaya belajar, pemetaan minat digital, dan panduan aksi mendampingi ananda di rumah.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowCounselingModal(true)}
                      className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <HeartHandshake className="w-4 h-4" />
                      <span>Ajukan Sesi Konsultasi Baru</span>
                    </button>
                  </div>

                  {counselingMsg && (
                    <div
                      className={`mt-4 p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
                        counselingMsg.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                      }`}
                    >
                      {counselingMsg.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                      <span>{counselingMsg.text}</span>
                    </div>
                  )}
                </div>

                {/* Sesi List */}
                <div className="space-y-4">
                  {studentData.counselingSessions.length === 0 ? (
                    <div
                      className={`p-10 rounded-3xl border text-center transition-all ${
                        isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                        <HeartHandshake className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        Belum Ada Riwayat Sesi Konsultasi
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                        Ayah/Bunda dapat mengajukan sesi konsultasi belajar privat 1-on-1 secara gratis jika anak mengalami kendala fokus, ingin mendiskusikan kurikulum lanjutan, atau persiapan lomba koding.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowCounselingModal(true)}
                        className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all cursor-pointer"
                      >
                        <HeartHandshake className="w-4 h-4" />
                        <span>Jadwalkan Konsultasi Perdana</span>
                      </button>
                    </div>
                  ) : (
                    studentData.counselingSessions.map((session) => {
                      const topicLabel = TOPIC_LABELS[session.topic] || session.topic;
                      const statusInfo = STATUS_BADGES[session.status] || {
                        label: session.status,
                        color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
                      };

                      return (
                        <div
                          key={session.id}
                          className={`p-6 rounded-3xl border transition-all ${
                            isDark ? 'bg-[#121624] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          {/* Card Top Row */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.color}`}
                                >
                                  {statusInfo.label}
                                </span>
                                <span
                                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                    session.sessionType === 'online_zoom' || session.sessionType === 'online_gmeet'
                                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                      : session.sessionType === 'offline_studio'
                                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                  }`}
                                >
                                  {session.sessionType === 'online_zoom'
                                    ? 'Online (Zoom)'
                                    : session.sessionType === 'online_gmeet'
                                    ? 'Online (GMeet)'
                                    : session.sessionType === 'offline_studio'
                                    ? 'Offline Studio'
                                    : 'WhatsApp Call'}
                                </span>
                              </div>
                              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                                {topicLabel}
                              </h4>
                            </div>

                            <div className="text-left sm:text-right">
                              <div className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 sm:justify-end">
                                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                                <span>
                                  {new Date(session.date).toLocaleDateString('id-ID', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 sm:justify-end mt-0.5">
                                <Clock className="w-3.5 h-3.5 text-blue-500" />
                                <span>{session.time}</span>
                              </div>
                            </div>
                          </div>

                          {/* Counselor & Location Details */}
                          <div className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                                {session.counselorName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs text-slate-400">Konselor / Mentor Pendamping:</p>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">
                                  {session.counselorName}
                                </p>
                                <p className="text-[11px] text-amber-600 dark:text-amber-400">
                                  {session.counselorTitle}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5">
                              {(session.sessionType === 'online_zoom' || session.sessionType === 'online_gmeet') && session.meetingLink && (
                                <a
                                  href={session.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 shadow-sm transition-all"
                                >
                                  <Video className="w-4 h-4" />
                                  <span>{session.sessionType === 'online_zoom' ? 'Masuk Zoom Meeting' : 'Masuk Google Meet'}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                              <a
                                href={`https://wa.me/6285311317127?text=Halo%20Tim%20Beekoding,%20saya%20wali%20dari%20${encodeURIComponent(
                                  studentData.studentName
                                )}%20ingin%20konfirmasi%20sesi%20konseling%20${encodeURIComponent(topicLabel)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                              >
                                <Send className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Konfirmasi WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          {/* Observation & Action Plan Section */}
                          <div
                            className={`mt-3 p-5 rounded-2xl border space-y-4 ${
                              isDark
                                ? 'bg-slate-900/70 border-slate-800/80'
                                : 'bg-emerald-50/40 border-emerald-200/80'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-emerald-500" />
                                Lembar Observasi & Evaluasi Bimbingan
                              </span>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold uppercase">
                                {session.status === 'completed' ? 'Terverifikasi Selesai' : 'Catatan Konselor'}
                              </span>
                            </div>

                            {/* Strengths & Challenges */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300 mb-1 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  Kekuatan & Minat Menonjol:
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {session.studentStrengths}
                                </p>
                              </div>

                              <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                                <p className="font-bold text-amber-700 dark:text-amber-300 mb-1 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                  Tantangan & Area Perbaikan:
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                  {session.challengesFaced}
                                </p>
                              </div>
                            </div>

                            {/* Home Action Plan */}
                            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-extrabold uppercase text-amber-800 dark:text-amber-200 flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                  Rencana Aksi Orang Tua & Mentor (Action Plan):
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                {session.actionPlan}
                              </p>
                            </div>

                            {/* Curriculum Recommendation */}
                            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-extrabold uppercase text-blue-800 dark:text-blue-200 flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                                  Rekomendasi Kurikulum Lanjutan:
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                                {session.curriculumRecommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Modal Form Ajukan Sesi Konseling Privat */}
                {showCounselingModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div
                      className={`relative w-full max-w-xl rounded-3xl border shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${
                        isDark ? 'bg-[#121624] border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                            <HeartHandshake className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-base sm:text-lg">
                              Ajukan Sesi Konseling Privat
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Untuk ananda: <strong className="text-amber-500">{studentData.studentName}</strong>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowCounselingModal(false)}
                          className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleRequestCounseling} className="space-y-4 pt-4">
                        {/* Topic Selection */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                            Topik Utama Konsultasi
                          </label>
                          <select
                            value={counselingTopic}
                            onChange={(e) => setCounselingTopic(e.target.value as CounselingTopic)}
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          >
                            <option value="kendala_fokus">Manajemen Fokus & Screen Time Anak</option>
                            <option value="evaluasi_belajar">Evaluasi Kemajuan & Minat Belajar</option>
                            <option value="rekomendasi_kurikulum">Roadmap Kurikulum & Pilihan Bahasa Koding</option>
                            <option value="persiapan_lomba">Persiapan Kompetisi & Portofolio Karya</option>
                            <option value="konsultasi_perangkat">Konsultasi Perangkat & Environment Lab</option>
                            <option value="lainnya">Konsultasi Umum Perkembangan Anak</option>
                          </select>
                        </div>

                        {/* Mode Sesi */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                            Format Pertemuan
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <button
                              type="button"
                              onClick={() => setCounselingType('online_gmeet')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                                counselingType === 'online_gmeet'
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                  : isDark
                                  ? 'border-slate-800 bg-slate-900/60 text-slate-400'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                              }`}
                            >
                              <Video className="w-4 h-4" />
                              <span>GMeet</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCounselingType('online_zoom')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                                counselingType === 'online_zoom'
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                  : isDark
                                  ? 'border-slate-800 bg-slate-900/60 text-slate-400'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                              }`}
                            >
                              <Video className="w-4 h-4" />
                              <span>Zoom</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCounselingType('offline_studio')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                                counselingType === 'offline_studio'
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                  : isDark
                                  ? 'border-slate-800 bg-slate-900/60 text-slate-400'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                              }`}
                            >
                              <MapPin className="w-4 h-4" />
                              <span>Studio BSD</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setCounselingType('whatsapp_call')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                                counselingType === 'whatsapp_call'
                                  ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                  : isDark
                                  ? 'border-slate-800 bg-slate-900/60 text-slate-400'
                                  : 'border-slate-200 bg-slate-50 text-slate-600'
                              }`}
                            >
                              <Phone className="w-4 h-4" />
                              <span>WA Call</span>
                            </button>
                          </div>
                        </div>

                        {/* Tanggal & Waktu Preferensi */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                              Tanggal Preferensi
                            </label>
                            <input
                              type="date"
                              required
                              value={counselingDate}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={(e) => setCounselingDate(e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                              Waktu Sesi
                            </label>
                            <select
                              value={counselingTime}
                              onChange={(e) => setCounselingTime(e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                              }`}
                            >
                              <option value="15:30 - 16:15 WIB">15:30 - 16:15 WIB (Sore)</option>
                              <option value="16:00 - 16:45 WIB">16:00 - 16:45 WIB (Sore)</option>
                              <option value="16:30 - 17:15 WIB">16:30 - 17:15 WIB (Sore)</option>
                              <option value="17:00 - 17:45 WIB">17:00 - 17:45 WIB (Sore)</option>
                              <option value="19:30 - 20:15 WIB">19:30 - 20:15 WIB (Malam)</option>
                            </select>
                          </div>
                        </div>

                        {/* Catatan Orang Tua */}
                        <div>
                          <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                            Catatan / Keluhan / Hal yang Ingin Didiskusikan
                          </label>
                          <textarea
                            rows={3}
                            value={counselingNotes}
                            onChange={(e) => setCounselingNotes(e.target.value)}
                            placeholder="Contoh: Ananda sering merasa bosan jika materi terlalu mudah, mohon rekomendasi proyek game yang lebih menantang..."
                            className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                          />
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                          <p className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            Durasi konsultasi 45 menit privat bebas biaya
                          </p>
                          <p>Jadwal resmi dan link ruang temu akan dikirimkan otomatis ke WhatsApp Ayah/Bunda.</p>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-3">
                          <button
                            type="button"
                            onClick={() => setShowCounselingModal(false)}
                            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors cursor-pointer"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 cursor-pointer transition-all"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Permohonan Konsultasi</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* TAB CONTENT: 12. KUIS & UJIAN EVALUASI     */}
            {/* ========================================== */}
            {activeTab === 'quizzes' && (
              <div className="space-y-6">
                {/* Hero Banner */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/5 border-amber-500/20'
                      : 'bg-gradient-to-r from-amber-50 via-white to-orange-50 border-amber-200'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg sm:text-xl font-['Space_Grotesk'] text-slate-900 dark:text-white">
                            Arena Kuis & Ujian Evaluasi Mandiri
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            {relevantQuizzes.length} Paket Ujian
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                          Uji pemahaman materi Scratch, Roblox Lua, Python, dan Berpikir Komputasional secara mandiri. Dapatkan skor instan, pembahasan soal, dan raih Bee-XP untuk naik level!
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Reward hingga 250 XP / Kuis</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Quizzes Grid */}
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>Daftar Kuis yang Tersedia untuk Ananda</span>
                  </h4>

                  {relevantQuizzes.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl border border-slate-800 text-slate-400">
                      <p>Belum ada paket kuis yang tersedia saat ini.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {relevantQuizzes.map((quiz) => {
                        const attemptsForQuiz = studentQuizAttempts.filter((a) => a.quizId === quiz.id);
                        const bestAttempt =
                          attemptsForQuiz.length > 0
                            ? attemptsForQuiz.reduce(
                                (max, curr) => (curr.score > max.score ? curr : max),
                                attemptsForQuiz[0]
                              )
                            : null;
                        const hasPassed = bestAttempt && bestAttempt.passed;

                        return (
                          <div
                            key={quiz.id}
                            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                              isDark
                                ? 'bg-[#121624] border-slate-800 hover:border-amber-500/40'
                                : 'bg-white border-amber-100 hover:border-amber-300 shadow-sm'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                  Jenjang {quiz.tier.toUpperCase()} &bull; Sesi #{quiz.sessionNumber}
                                </span>
                                {bestAttempt ? (
                                  hasPassed ? (
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>Lulus ({bestAttempt.score})</span>
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30">
                                      Skor: {bestAttempt.score} (Coba Lagi)
                                    </span>
                                  )
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-500/10 text-slate-400">
                                    Belum Dikerjakan
                                  </span>
                                )}
                              </div>

                              <h5 className="font-bold text-base text-slate-900 dark:text-white font-['Space_Grotesk'] leading-snug">
                                {quiz.title}
                              </h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                                {quiz.description}
                              </p>

                              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-blue-500" />
                                  <span>{quiz.durationMinutes} Menit</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Pass: {quiz.passingScore}+</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                  <span>+{quiz.xpReward} XP</span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-5 pt-3 border-t border-slate-800/40 flex items-center justify-between gap-3">
                              <span className="text-xs text-slate-400 font-medium">
                                {quiz.questions.length} Butir Soal
                              </span>
                              <button
                                type="button"
                                onClick={() => handleStartQuiz(quiz)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                  hasPassed
                                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm'
                                }`}
                              >
                                <span>{hasPassed ? 'Kerjakan Ulang' : bestAttempt ? 'Coba Lagi' : 'Mulai Kuis'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Student's History of Attempts */}
                {studentQuizAttempts.length > 0 && (
                  <div className="space-y-3 pt-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span>Riwayat Pengerjaan & Perolehan Nilai Ananda</span>
                    </h4>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead
                          className={`uppercase font-bold tracking-wider ${
                            isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <tr>
                            <th className="py-3 px-4">Paket Kuis</th>
                            <th className="py-3 px-4">Waktu Selesai</th>
                            <th className="py-3 px-4 text-center">Skor</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Reward Bee-XP</th>
                          </tr>
                        </thead>
                        <tbody
                          className={`divide-y ${
                            isDark ? 'divide-slate-800/60 bg-[#121624]' : 'divide-slate-200 bg-white'
                          }`}
                        >
                          {studentQuizAttempts.map((attempt) => (
                            <tr key={attempt.id} className="hover:bg-slate-800/20 transition-colors">
                              <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                                {attempt.quizTitle}
                              </td>
                              <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                                {new Date(attempt.completedAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })} WIB
                              </td>
                              <td className="py-3 px-4 text-center font-black text-sm">
                                <span className={attempt.passed ? 'text-emerald-500' : 'text-rose-500'}>
                                  {attempt.score}
                                </span>
                                <span className="text-[10px] text-slate-400 font-normal"> / 100</span>
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                {attempt.passed ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Lulus</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30">
                                    <span>Coba Lagi</span>
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap font-bold text-amber-500">
                                +{attempt.xpEarned} XP
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================== */}
            {/* 14. TAB: AJAK TEMAN & DUTA BELAJAR (REFERRALS) */}
            {/* ========================================== */}
            {activeTab === 'referrals' && (
              <div className="space-y-6">
                {/* Hero Referral Banner */}
                <div
                  className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-amber-500/10 via-slate-900 to-orange-500/10 border-amber-500/20'
                      : 'bg-gradient-to-r from-amber-50 via-white to-orange-50 border-amber-200 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Program Duta Belajar Bee-Ambassador</span>
                      </div>
                      <h3 className="font-black text-2xl sm:text-3xl font-['Space_Grotesk'] text-slate-900 dark:text-white">
                        Ajak Teman Koding Bareng, Raih Hadiah Ganda!
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Bagikan kode referral eksklusif ananda kepada sahabat, teman sekelas, atau kerabat. Teman yang diajak mendapat diskon pendaftaran Rp 150.000, dan ananda otomatis meraih potongan SPP Rp 150.000 plus bonus 500 Bee-XP!
                      </p>
                    </div>

                    {/* Stylized Referral Code Box */}
                    <div
                      className={`p-5 rounded-2xl border shadow-lg flex flex-col items-center justify-center text-center shrink-0 w-full lg:w-72 ${
                        isDark ? 'bg-slate-800/90 border-amber-500/30' : 'bg-white border-amber-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                        Kode Referral Unik Ananda
                      </span>
                      <div className="font-mono font-black text-2xl tracking-widest text-amber-500 py-1">
                        {studentReferralCode}
                      </div>

                      <div className="grid grid-cols-2 gap-2 w-full mt-3">
                        <button
                          type="button"
                          onClick={handleCopyReferralCode}
                          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            copiedReferralCode
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border border-amber-500/30'
                          }`}
                        >
                          {copiedReferralCode ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Kode</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleShareStudentReferralWhatsApp}
                          className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Undang WA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Two-Way Benefit Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Benefit Teman */}
                  <div
                    className={`p-5 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-500">
                        <Gift className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          Keuntungan Untuk Teman Kamu
                        </h4>
                        <p className="text-[11px] text-slate-400">Hadiah pendaftaran perdana</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Diskon langsung Rp 150.000</strong> saat mendaftar kelas koding reguler.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Akses <strong>Free Trial Class</strong> & tes pemetaan bakat koding anak gratis.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Starter kit koding & konsultasi kurikulum 1-on-1 bersama tim akademik.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Benefit Siswa */}
                  <div
                    className={`p-5 rounded-2xl border transition-all ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                          Keuntungan Untuk Ananda
                        </h4>
                        <p className="text-[11px] text-slate-400">Apresiasi Duta Belajar Beekoding</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><strong>Potongan SPP Rp 150.000</strong> pada tagihan bulan berikutnya per teman.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>Bonus <strong>+500 Bee-XP</strong> untuk menaikkan level dan lencana gamifikasi ananda.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>Pilihan transfer rekening komisi tunai untuk mitra duta dan perwakilan kelas.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Ambassador Tier Status */}
                <div
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Status Tingkat Duta Belajar
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <h4 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 capitalize">
                          Tier {studentAmbassador?.tier || 'Bronze'} Ambassador
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          {studentReferralRecords.length} Teman Terdaftar
                        </span>
                      </div>
                    </div>

                    <div className="text-right sm:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Reward Diperoleh</span>
                      <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        Rp {(studentAmbassador?.totalEarningsRp || studentReferralRecords.filter((r) => r.status === 'enrolled' || r.status === 'reward_claimed').length * 150000).toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar Tier */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Bronze (1-2)</span>
                      <span>Silver (3-5)</span>
                      <span>Gold (6-10)</span>
                      <span>Diamond (11+)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(15, (studentReferralRecords.length / 10) * 100))}%`,
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 text-right mt-1">
                      {studentReferralRecords.length >= 10
                        ? 'Luar biasa! Ananda telah mencapai level Duta Tertinggi (Gold/Diamond).'
                        : `Ajak ${Math.max(1, 3 - studentReferralRecords.length)} teman lagi untuk mencapai Tier Silver!`}
                    </p>
                  </div>
                </div>

                {/* Riwayat Teman yang Diajak */}
                <div
                  className={`rounded-2xl border overflow-hidden ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        Daftar Teman yang Menggunakan Kodemu
                      </h4>
                      <p className="text-xs text-slate-400">
                        Pantau status pendaftaran dan jadwal pencairan potongan SPP
                      </p>
                    </div>
                    <span className="text-xs font-bold text-amber-500">
                      {studentReferralRecords.length} Sahabat
                    </span>
                  </div>

                  {studentReferralRecords.length === 0 ? (
                    <div className="p-8 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                        <Share2 className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Belum ada teman yang mendaftar dengan kodemu. Bagikan kodemu ke grup WhatsApp kelas atau teman bermainmu sekarang!
                      </p>
                      <button
                        type="button"
                        onClick={handleShareStudentReferralWhatsApp}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Bagikan ke Teman Sekarang</span>
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-400 font-semibold">
                            <th className="py-3 px-4">Nama Teman</th>
                            <th className="py-3 px-4">Program Diminati</th>
                            <th className="py-3 px-4">Tanggal Daftar</th>
                            <th className="py-3 px-4">Status Alur</th>
                            <th className="py-3 px-4 text-right">Reward Ananda</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {studentReferralRecords.map((ref) => (
                            <tr key={ref.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                              <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                                {ref.referredStudentName}
                              </td>
                              <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                                {ref.targetCourse}
                              </td>
                              <td className="py-3.5 px-4 text-slate-400">
                                {new Date(ref.createdAt).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </td>
                              <td className="py-3.5 px-4">
                                {ref.status === 'reward_claimed' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                    Potongan SPP Cair
                                  </span>
                                ) : ref.status === 'enrolled' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
                                    Resmi Bergabung
                                  </span>
                                ) : ref.status === 'trial_attended' ? (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                                    Hadir Trial Class
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                                    Baru Terdaftar
                                  </span>
                                )}
                              </td>
                              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                                  Rp {ref.rewardForAmbassadorRp.toLocaleString('id-ID')}
                                </span>
                                <div className="text-[10px] text-amber-500 font-bold">
                                  +{ref.rewardBeeXp} Bee-XP
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Form Rekomendasi Mandiri Orang Tua */}
                <div
                  className={`p-6 rounded-2xl border transition-all ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        Rekomendasikan Teman Secara Langsung
                      </h4>
                      <p className="text-xs text-slate-400">
                        Masukkan kontak wali murid teman anak Anda, tim akademik kami akan mengirimkan undangan kelas coba gratis
                      </p>
                    </div>
                  </div>

                  {referralSubmitMsg && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-semibold mb-4 border ${
                        referralSubmitMsg.type === 'success'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {referralSubmitMsg.text}
                    </div>
                  )}

                  <form onSubmit={handleDirectReferralSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Nama Anak Sahabat / Kerabat <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={referralFriendName}
                          onChange={(e) => setReferralFriendName(e.target.value)}
                          placeholder="Contoh: Rayyan Maulana"
                          className={`w-full px-3 py-2 text-xs rounded-xl border transition-colors ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                              : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Nomor WhatsApp Orang Tua Sahabat <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={referralFriendPhone}
                          onChange={(e) => setReferralFriendPhone(e.target.value)}
                          placeholder="081388776655"
                          className={`w-full px-3 py-2 text-xs rounded-xl border transition-colors ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                              : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Program Koding yang Diminati
                        </label>
                        <select
                          value={referralFriendCourse}
                          onChange={(e) => setReferralFriendCourse(e.target.value)}
                          className={`w-full px-3 py-2 text-xs rounded-xl border transition-colors ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-white focus:border-amber-500'
                              : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500'
                          }`}
                        >
                          <option value="Visual Scratch & AI Prompting">Visual Scratch & AI Prompting (6-9 Thn)</option>
                          <option value="Roblox Studio & Scripting Lua">Roblox Studio & Lua Scripting (9-12 Thn)</option>
                          <option value="Python & Game Logic Academy">Python & Game Logic (11-14 Thn)</option>
                          <option value="Python Advanced & AI Robotics">Python Advanced & AI Robotics (13-17 Thn)</option>
                          <option value="Web Development & UI UX Kids">Web Development & UI UX (10-15 Thn)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                          Catatan / Rekomendasi (Opsional)
                        </label>
                        <input
                          type="text"
                          value={referralFriendNotes}
                          onChange={(e) => setReferralFriendNotes(e.target.value)}
                          placeholder="Teman sekelas di SD, ingin coba trial Sabtu"
                          className={`w-full px-3 py-2 text-xs rounded-xl border transition-colors ${
                            isDark
                              ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                              : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-amber-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Kirim Rekomendasi Teman</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* MODAL: INTERACTIVE QUIZ RUNNER (FULL SCREEN) */}
        {/* ========================================== */}
        {activeQuizForExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div
              className={`w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors ${
                isDark ? 'bg-[#111420] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              {/* Quiz Header */}
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  isDark ? 'border-slate-800 bg-[#161a2b]' : 'border-slate-100 bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                    Jenjang {activeQuizForExam.tier.toUpperCase()} &bull; Ujian Evaluasi
                  </span>
                  <h3 className="font-bold text-base sm:text-lg font-['Space_Grotesk'] leading-tight">
                    {activeQuizForExam.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {!examResult && (
                    <div
                      className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-black flex items-center gap-1.5 ${
                        examTimeRemaining < 120
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-500 animate-pulse'
                          : examTimeRemaining < 300
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-500'
                          : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-500'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimerDisplay(examTimeRemaining)}</span>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (!examResult && Object.keys(examAnswers).length > 0) {
                        if (window.confirm('Yakin ingin keluar dari kuis? Jawaban belum disimpan.')) {
                          setActiveQuizForExam(null);
                        }
                      } else {
                        setActiveQuizForExam(null);
                      }
                    }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar (during exam) */}
              {!examResult && (
                <div className="w-full bg-slate-800/40 h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{
                      width: `${
                        ((activeExamQuestionIdx + 1) / activeQuizForExam.questions.length) * 100
                      }%`,
                    }}
                  />
                </div>
              )}

              {/* Body: Exam in progress vs Exam Result */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {!examResult ? (
                  // QUESTION VIEW
                  <div className="space-y-6">
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-xl bg-amber-500/10 text-amber-500 font-bold text-xs">
                        Soal #{activeExamQuestionIdx + 1} dari {activeQuizForExam.questions.length}
                      </span>
                      <span className="text-xs text-slate-400">
                        Passing grade: {activeQuizForExam.passingScore}+
                      </span>
                    </div>

                    {/* Question Text */}
                    <div className="text-base sm:text-lg font-bold font-['Space_Grotesk'] leading-relaxed">
                      {activeQuizForExam.questions[activeExamQuestionIdx]?.question}
                    </div>

                    {/* Options List */}
                    <div className="space-y-3 pt-2">
                      {activeQuizForExam.questions[activeExamQuestionIdx]?.options.map((opt, optIdx) => {
                        const currentQId = activeQuizForExam.questions[activeExamQuestionIdx].id;
                        const isSelected = examAnswers[currentQId] === optIdx;
                        const letter = String.fromCharCode(65 + optIdx);

                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectExamAnswer(currentQId, optIdx)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500/50'
                                : isDark
                                ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                                : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-xl text-xs font-black flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'bg-amber-500 text-slate-950'
                                  : isDark
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {letter}
                            </span>
                            <span className="text-sm font-medium flex-1">{opt}</span>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-500'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  // EXAM RESULT & EXPLANATION REVIEW
                  <div className="space-y-6 animate-fade-in">
                    {/* Celebration Card */}
                    <div
                      className={`p-6 rounded-3xl border text-center space-y-3 ${
                        examResult.passed
                          ? 'bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border-emerald-500/40 text-emerald-400'
                          : 'bg-gradient-to-b from-amber-500/20 to-amber-500/5 border-amber-500/40 text-amber-400'
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center font-bold ${
                          examResult.passed ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        {examResult.passed ? <Trophy className="w-8 h-8" /> : <Award className="w-8 h-8" />}
                      </div>

                      <h4 className="text-2xl font-black font-['Space_Grotesk'] text-slate-900 dark:text-white">
                        {examResult.passed ? 'Selamat! Kamu Lulus Kuis 🎉' : 'Bagus! Terus Semangat Berlatih 💪'}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                        {examResult.passed
                          ? 'Pemahaman logikamu sudah sangat solid! Skor kamu memenuhi passing grade kuis ini.'
                          : 'Belum mencapai batas passing grade, tetapi kamu mendapatkan Bee-XP atas usaha belajarmu hari ini.'}
                      </p>

                      <div className="flex items-center justify-center gap-4 pt-2">
                        <div
                          className={`px-4 py-2 rounded-2xl border ${
                            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">
                            Skor Akhir
                          </span>
                          <span className="text-2xl font-black text-amber-500 font-['Space_Grotesk']">
                            {examResult.score} <span className="text-xs font-normal text-slate-400">/ 100</span>
                          </span>
                        </div>

                        <div
                          className={`px-4 py-2 rounded-2xl border ${
                            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                        >
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">
                            Reward Bee-XP
                          </span>
                          <span className="text-2xl font-black text-purple-500 font-['Space_Grotesk'] flex items-center gap-1">
                            <Sparkles className="w-5 h-5 text-amber-500" />
                            +{examResult.xpEarned} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Educational Review / Explanations */}
                    <div className="space-y-4">
                      <h5 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>Pembahasan Soal & Kunci Jawaban Edukatif</span>
                      </h5>

                      <div className="space-y-3">
                        {activeQuizForExam.questions.map((q, idx) => {
                          const userAnsIdx = examAnswers[q.id];
                          const isCorrect = userAnsIdx === q.correctOptionIndex;

                          return (
                            <div
                              key={q.id}
                              className={`p-4 rounded-2xl border text-xs space-y-2 ${
                                isCorrect
                                  ? isDark
                                    ? 'bg-emerald-500/5 border-emerald-500/30'
                                    : 'bg-emerald-50/70 border-emerald-200'
                                  : isDark
                                  ? 'bg-rose-500/5 border-rose-500/30'
                                  : 'bg-rose-50/70 border-rose-200'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">
                                  #{idx + 1}. {q.question}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full font-bold text-[10px] shrink-0 ${
                                    isCorrect
                                      ? 'bg-emerald-500/15 text-emerald-500'
                                      : 'bg-rose-500/15 text-rose-500'
                                  }`}
                                >
                                  {isCorrect ? 'Benar' : 'Salah'}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                                <div className="text-slate-500">
                                  Jawaban Kamu:{' '}
                                  <span
                                    className={`font-semibold ${
                                      isCorrect ? 'text-emerald-500' : 'text-rose-500'
                                    }`}
                                  >
                                    {userAnsIdx !== undefined
                                      ? `${String.fromCharCode(65 + userAnsIdx)}. ${
                                          q.options[userAnsIdx]
                                        }`
                                      : 'Tidak dijawab'}
                                  </span>
                                </div>
                                <div className="text-slate-500">
                                  Kunci Benar:{' '}
                                  <span className="font-bold text-emerald-500">
                                    {String.fromCharCode(65 + q.correctOptionIndex)}. {q.options[q.correctOptionIndex]}
                                  </span>
                                </div>
                              </div>

                              {q.explanation && (
                                <p className="text-[11px] text-slate-400 bg-black/10 dark:bg-white/5 p-2 rounded-xl italic mt-1">
                                  💡 {q.explanation}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quiz Footer Navigation */}
              <div
                className={`px-6 py-4 border-t flex items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800 bg-[#161a2b]' : 'border-slate-100 bg-slate-50'
                }`}
              >
                {!examResult ? (
                  <>
                    <button
                      type="button"
                      disabled={activeExamQuestionIdx === 0}
                      onClick={() => setActiveExamQuestionIdx((prev) => Math.max(0, prev - 1))}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        activeExamQuestionIdx === 0
                          ? 'opacity-40 cursor-not-allowed border-slate-700'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Sebelumnya
                    </button>

                    <div className="flex items-center gap-2">
                      {activeExamQuestionIdx < activeQuizForExam.questions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveExamQuestionIdx((prev) =>
                              Math.min(activeQuizForExam.questions.length - 1, prev + 1)
                            )
                          }
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
                        >
                          <span>Selanjutnya</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmitQuiz}
                          className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Kirim & Selesaikan Kuis</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleStartQuiz(activeQuizForExam)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Coba Ulang Kuis Ini
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveQuizForExam(null)}
                      className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm cursor-pointer"
                    >
                      Tutup & Kembali ke Portal
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL: OFFICIAL CERTIFICATE STUDIO / PRINT */}
        {selectedCertificateForModal && (
          <AdminCertificateModal
            certificate={selectedCertificateForModal}
            isDark={isDark}
            onClose={() => setSelectedCertificateForModal(null)}
          />
        )}

        {/* MODAL: OFFICIAL ACADEMIC REPORT SHEET / PRINT */}
        {selectedReportForModal && (
          <AdminPrintableReportModal
            report={selectedReportForModal}
            isOpen={!!selectedReportForModal}
            isDark={isDark}
            onClose={() => setSelectedReportForModal(null)}
          />
        )}

        {/* MODAL: OFFICIAL INVOICE & RECEIPT / PRINT */}
        {selectedTransactionForModal && (
          <AdminInvoiceModal
            transaction={selectedTransactionForModal}
            isDark={isDark}
            onClose={() => setSelectedTransactionForModal(null)}
          />
        )}
      </main>
    </div>
  );
};
