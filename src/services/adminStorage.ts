import {
  type AssessmentResult,
  type AgeTier,
  type TalentQuestion,
  QUESTION_BANK,
} from '../data/talentQuestions';
import {
  pushSubmissionToSupabase,
  pushInquiryToSupabase,
  pushBatchToSupabase,
  pushTransactionToSupabase,
  pushAttendanceToSupabase,
  pushSettingsToSupabase,
  deleteSubmissionFromSupabase,
  deleteInquiryFromSupabase,
  deleteBatchFromSupabase,
  deleteTransactionFromSupabase,
  deleteAttendanceFromSupabase,
} from './supabaseSync';

export type FollowUpStatus = 'baru' | 'dihubungi' | 'terdaftar' | 'selesai';

export type InquiryType = 'konsultasi' | 'pendaftaran';
export type InquiryStatus = 'baru' | 'dihubungi' | 'jadwal_konsultasi' | 'terdaftar' | 'batal';

export interface ConsultationInquiry {
  id: string;
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  role: string;
  program: string;
  message?: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AssessmentSubmission extends AssessmentResult {
  id: string;
  createdAt: string; // ISO string
  status: FollowUpStatus;
  notes?: string;
  answers?: Record<string, string>;
}

export interface AdminUser {
  email: string;
  name: string;
  role: string;
  phone?: string;
  avatar?: string;
  institution?: string;
  bio?: string;
  notificationsEnabled?: boolean;
  leadAlertsEnabled?: boolean;
  soundEnabled?: boolean;
  language?: 'id' | 'en';
  twoFactorEnabled?: boolean;
  lastLoginAt?: string;
}

export type AdminTab =
  | 'dashboard'
  | 'students'
  | 'inquiries'
  | 'events'
  | 'counseling'
  | 'batches'
  | 'curriculum'
  | 'resources'
  | 'instructors'
  | 'attendance'
  | 'reports'
  | 'transactions'
  | 'vouchers'
  | 'payroll'
  | 'referrals'
  | 'quests'
  | 'certificates'
  | 'showcase'
  | 'templates'
  | 'questions'
  | 'announcements'
  | 'audit'
  | 'quizzes'
  | 'users'
  | 'gateway'
  | 'settings';

export type UserRole = 'administrator' | 'instructor' | 'counselor' | 'academic_lead' | 'custom';

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  phone?: string;
  avatar?: string;
  institution?: string;
  bio?: string;
  status: 'active' | 'inactive';
  allowedTabs: AdminTab[];
  passwordHash: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export const ALL_ADMIN_TABS: AdminTab[] = [
  'dashboard',
  'students',
  'inquiries',
  'events',
  'counseling',
  'batches',
  'curriculum',
  'resources',
  'instructors',
  'attendance',
  'reports',
  'transactions',
  'vouchers',
  'payroll',
  'referrals',
  'quests',
  'quizzes',
  'certificates',
  'showcase',
  'templates',
  'announcements',
  'questions',
  'users',
  'gateway',
  'audit',
  'settings',
];

export const INSTRUCTOR_RECOMMENDED_TABS: AdminTab[] = [
  'dashboard',
  'students',
  'batches',
  'attendance',
  'reports',
  'curriculum',
  'resources',
  'quests',
  'quizzes',
  'certificates',
  'showcase',
  'questions',
  'counseling',
];

export const COUNSELOR_RECOMMENDED_TABS: AdminTab[] = [
  'dashboard',
  'students',
  'inquiries',
  'events',
  'counseling',
  'templates',
  'announcements',
  'reports',
  'certificates',
];

export type BatchStatus = 'upcoming' | 'ongoing' | 'completed' | 'full';
export type ClassFormat = 'online' | 'offline' | 'hybrid';

export interface EnrolledStudent {
  id: string;
  studentName: string;
  parentName?: string;
  parentPhone?: string;
  enrolledAt: string;
  source?: 'assessment' | 'inquiry' | 'manual';
}

export interface ClassBatch {
  id: string;
  name: string;
  programType: string;
  tier: 'junior' | 'middle' | 'teens' | 'all';
  format: ClassFormat;
  locationOrPlatform: string;
  meetUrl?: string;
  startDate: string;
  endDate: string;
  scheduleDays: string[];
  scheduleTime: string;
  totalSessions: number;
  maxCapacity: number;
  enrolledStudents: EnrolledStudent[];
  instructorName: string;
  price: number;
  status: BatchStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TemplateCategory =
  | 'assessment_followup'
  | 'trial_invite'
  | 'class_reminder'
  | 'payment_info'
  | 'consultation'
  | 'batch_announcement'
  | 'custom';

export interface WhatsAppTemplate {
  id: string;
  title: string;
  category: TemplateCategory;
  description: string;
  body: string;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus = 'paid' | 'pending' | 'partial' | 'cancelled';
export type PaymentMethod = 'bca' | 'mandiri' | 'qris' | 'cash';

export interface TransactionItem {
  name: string;
  description?: string;
  price: number;
  qty: number;
}

export interface TransactionRecord {
  id: string;
  invoiceNumber: string; // misal: INV/2026/06/001
  studentName: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  programName: string;
  batchId?: string;
  batchName?: string;
  items: TransactionItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  dueDate: string; // YYYY-MM-DD
  paidAt?: string; // ISO string
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  notes?: string;
  transferProofUrl?: string;
}

export type CertificateType = 'graduation' | 'achievement' | 'completion' | 'honor_roll';
export type CertificateHonors =
  | 'with_distinction'
  | 'excellence'
  | 'honor_roll'
  | 'merit'
  | 'standard';

export interface StudentCertificate {
  id: string;
  certificateNumber: string; // misal: BK-CERT/2026/06/001
  verificationCode: string; // misal: BK-VER-8912
  studentName: string;
  parentName?: string;
  parentPhone?: string;
  programName: string;
  batchName?: string;
  issueDate: string; // YYYY-MM-DD
  certificateType: CertificateType;
  honorsLevel: CertificateHonors;
  honorsTitle: string; // misal: "Dengan Pujian Istimewa (With Distinction)"
  instructorName: string;
  advisorName: string;
  description?: string;
  customNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectPlatform = 'scratch' | 'roblox' | 'python' | 'web' | 'ai';

export interface StudentProject {
  id: string;
  title: string;
  studentName: string;
  studentAge: number;
  gradeLevel: string; // misal: "Kelas 4 SD"
  platform: ProjectPlatform;
  programType: string;
  description: string;
  demoUrl?: string;
  thumbnailEmojiOrUrl: string;
  tags: string[];
  isFeatured: boolean;
  likesCount: number;
  viewsCount: number;
  completionDate: string;
  instructorFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParentTestimonial {
  id: string;
  parentName: string;
  childName: string;
  childAge: number;
  roleOrProfession: string;
  rating: number; // 1-5
  review: string;
  programTaken: string;
  avatarEmojiOrUrl?: string;
  isFeatured: boolean;
  createdAt: string;
}

export type CurriculumTier = 'junior' | 'middle' | 'teens';
export type SessionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface LessonSession {
  id: string;
  tier: CurriculumTier;
  sessionNumber: number; // 1 - 12
  title: string;
  durationMinutes: number;
  difficulty: SessionDifficulty;
  coreConcepts: string[];
  description: string;
  projectOutcome: string;
  slideUrl?: string;
  starterCodeUrl?: string;
  worksheetUrl?: string;
  homeworkTask?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type InstructorRole =
  | 'lead_educator'
  | 'senior_mentor'
  | 'junior_mentor'
  | 'curriculum_specialist';

export type InstructorStatus = 'active' | 'on_leave' | 'inactive';

export interface InstructorRecord {
  id: string;
  name: string;
  title: string;
  avatarUrlOrEmoji: string;
  email: string;
  phone: string;
  role: InstructorRole;
  specializations: string[];
  bio: string;
  teachingTiers: ('junior' | 'middle' | 'teens')[];
  rating: number; // 1.0 - 5.0
  totalTeachingHours: number;
  assignedBatchesCount: number;
  status: InstructorStatus;
  socialLinkedin?: string;
  socialGithub?: string;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export type AttendanceStatus = 'present' | 'absent' | 'excused' | 'late';

export interface StudentAttendanceItem {
  studentId: string;
  studentName: string;
  parentName?: string;
  parentPhone?: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface SessionAttendanceRecord {
  id: string;
  batchId: string;
  batchName: string;
  tier: 'junior' | 'middle' | 'teens';
  sessionNumber: number; // 1 - 12
  sessionTopic: string;
  date: string; // YYYY-MM-DD
  instructorName: string;
  students: StudentAttendanceItem[];
  classNotes?: string;
  homeworkAssigned?: string;
  createdAt: string;
  updatedAt: string;
}

export type ReportPeriod = 'mid_term' | 'final_term';
export type GradeLetter = 'A+' | 'A' | 'B+' | 'B' | 'C';

export interface AcademicCompetencyScores {
  computationalThinking: number; // 0 - 100
  creativityDesign: number;      // 0 - 100
  problemSolving: number;        // 0 - 100
  codeMastery: number;           // 0 - 100
  teamworkAttitude: number;      // 0 - 100
}

export interface StudentAcademicReport {
  id: string;
  studentId: string;
  studentName: string;
  parentName: string;
  parentPhone: string;
  batchId: string;
  batchName: string;
  tier: 'junior' | 'middle' | 'teens';
  reportPeriod: ReportPeriod;
  attendanceRate: number; // % Kehadiran
  scores: AcademicCompetencyScores;
  averageScore: number;
  gradeLetter: GradeLetter;
  predicateTitle: string;
  capstoneProjectTitle: string;
  capstoneProjectDesc: string;
  instructorNotes: string;
  nextStepRecommendation: string;
  instructorName: string;
  issueDate: string; // YYYY-MM-DD
  createdAt: string;
  updatedAt: string;
}

export type DiscountType = 'percentage' | 'fixed';
export type VoucherStatus = 'active' | 'expired' | 'depleted' | 'paused';

export interface PromoVoucher {
  id: string;
  code: string; // e.g. BEEKODINGAI
  title: string;
  discountType: DiscountType;
  discountValue: number; // 20 (%) or 200000 (Rp)
  maxDiscountAmount?: number;
  minTransactionAmount: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string; // YYYY-MM-DD
  validUntil: string; // YYYY-MM-DD
  applicableTiers: ('junior' | 'middle' | 'teens' | 'all')[];
  status: VoucherStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type QuestDifficulty = 'mudah' | 'sedang' | 'menantang';
export type QuestStatus = 'active' | 'completed' | 'draft' | 'archived';

export interface CodingQuest {
  id: string;
  title: string;
  tier: 'junior' | 'middle' | 'teens' | 'all';
  difficulty: QuestDifficulty;
  xpReward: number;
  badgeRewardId?: string;
  description: string;
  starterLink?: string;
  submissionFormat: 'link_scratch' | 'file_python' | 'link_github' | 'text';
  deadline: string;
  status: QuestStatus;
  completedCount: number;
  createdAt: string;
  updatedAt: string;
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type BadgeCategory = 'logic' | 'creativity' | 'persistence' | 'attendance' | 'capstone';

export interface AchievementBadge {
  id: string;
  title: string;
  iconEmoji: string;
  category: BadgeCategory;
  description: string;
  xpBonus: number;
  rarity: BadgeRarity;
  awardCount: number;
}

export interface StudentGamificationProfile {
  studentId: string;
  studentName: string;
  parentPhone: string;
  tier: 'junior' | 'middle' | 'teens';
  totalXp: number;
  level: number;
  levelTitle: string;
  earnedBadges: { badgeId: string; badgeTitle: string; earnedAt: string }[];
  completedQuestsCount: number;
  lastActiveDate: string;
}

export type AnnouncementCategory = 'academic' | 'holiday' | 'event' | 'urgent' | 'general';
export type AnnouncementAudience = 'all' | 'junior' | 'middle' | 'teens' | 'specific_batch';
export type AnnouncementStatus = 'published' | 'draft' | 'archived';
export type AnnouncementPriority = 'normal' | 'important' | 'urgent';

export interface ClassAnnouncement {
  id: string;
  title: string;
  category: AnnouncementCategory;
  audience: AnnouncementAudience;
  batchId?: string;
  batchName?: string;
  content: string;
  priority: AnnouncementPriority;
  pinned: boolean;
  authorName: string;
  publishedAt: string; // YYYY-MM-DD
  expiresAt?: string;  // YYYY-MM-DD
  attachmentUrl?: string;
  status: AnnouncementStatus;
  readCount: number;
  createdAt: string;
  updatedAt: string;
}

export type PayrollStatus = 'draft' | 'approved' | 'paid';
export type PayrollItemCategory =
  | 'teaching_honor'
  | 'performance_incentive'
  | 'attendance_bonus'
  | 'curriculum_allowance'
  | 'transport_allowance'
  | 'deduction'
  | 'other';

export interface PayrollItem {
  id: string;
  description: string;
  category: PayrollItemCategory;
  rate: number;
  qty: number;
  total: number; // positive for income, negative for deduction
}

export interface InstructorPayrollRecord {
  id: string;
  payrollNumber: string; // misal: BK-PAY/2026/06/001
  instructorId: string;
  instructorName: string;
  instructorRole: string;
  instructorPhone: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountHolder: string;
  period: string; // e.g. 'Juni 2026'
  paymentDate?: string; // YYYY-MM-DD
  teachingHours: number;
  hourlyRate: number;
  baseTeachingHonor: number;
  performanceIncentive: number;
  attendanceBonus: number;
  allowanceTotal: number;
  deductionsTotal: number;
  netTotalAmount: number;
  status: PayrollStatus;
  items: PayrollItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const STORAGE_KEYS = {
  SUBMISSIONS: 'beekoding_admin_submissions',
  QUESTIONS: 'beekoding_admin_questions',
  AUTH: 'beekoding_admin_auth',
  INQUIRIES: 'beekoding_admin_inquiries',
  PROFILE: 'beekoding_admin_profile',
  CREDENTIALS: 'beekoding_admin_credentials',
  BATCHES: 'beekoding_admin_batches',
  TEMPLATES: 'beekoding_admin_templates',
  TRANSACTIONS: 'beekoding_admin_transactions',
  CERTIFICATES: 'beekoding_admin_certificates',
  PROJECTS: 'beekoding_admin_projects',
  TESTIMONIALS: 'beekoding_admin_testimonials',
  CURRICULUM: 'beekoding_admin_curriculum',
  INSTRUCTORS: 'beekoding_admin_instructors',
  ATTENDANCE: 'beekoding_admin_attendance',
  REPORTS: 'beekoding_admin_academic_reports',
  VOUCHERS: 'beekoding_admin_vouchers',
  QUESTS: 'beekoding_admin_quests',
  BADGES: 'beekoding_admin_badges',
  GAMIFICATION: 'beekoding_admin_gamification',
  ANNOUNCEMENTS: 'beekoding_admin_announcements',
  PAYROLL: 'beekoding_admin_payroll',
  RESOURCES: 'beekoding_admin_learning_resources',
  EVENTS: 'beekoding_admin_events',
  COUNSELING: 'beekoding_admin_counseling',
  AUDIT_LOGS: 'beekoding_admin_audit_logs',
  QUIZZES: 'beekoding_admin_quizzes',
  QUIZ_ATTEMPTS: 'beekoding_student_quiz_attempts',
  AMBASSADORS: 'beekoding_admin_ambassadors',
  REFERRALS: 'beekoding_admin_referrals',
  SYSTEM_USERS: 'beekoding_admin_system_users',
  GATEWAY_CONFIG: 'beekoding_admin_whatsapp_gateway_config',
  GATEWAY_QUEUE: 'beekoding_admin_whatsapp_gateway_queue',
};

// ==========================================
// REAL-TIME STORAGE UPDATE EVENT BUS
// ==========================================

export type StorageUpdateType =
  | 'submissions'
  | 'inquiries'
  | 'batches'
  | 'transactions'
  | 'attendance'
  | 'system_users'
  | 'all';

export function emitStorageUpdate(type: StorageUpdateType = 'all'): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('beekoding_storage_updated', { detail: { type } }));
  }
}

export function onStorageUpdate(callback: (type: StorageUpdateType) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ type: StorageUpdateType }>;
    callback(custom.detail?.type || 'all');
  };
  window.addEventListener('beekoding_storage_updated', handler);
  return () => {
    window.removeEventListener('beekoding_storage_updated', handler);
  };
}


export type AuditModule =
  | 'auth'
  | 'students'
  | 'inquiries'
  | 'events'
  | 'counseling'
  | 'batches'
  | 'curriculum'
  | 'resources'
  | 'instructors'
  | 'attendance'
  | 'reports'
  | 'transactions'
  | 'vouchers'
  | 'payroll'
  | 'quests'
  | 'certificates'
  | 'showcase'
  | 'templates'
  | 'questions'
  | 'quizzes'
  | 'referrals'
  | 'announcements'
  | 'users'
  | 'gateway'
  | 'settings';

export type QuizTopic =
  | 'scratch_basics'
  | 'roblox_lua'
  | 'python_fundamentals'
  | 'computational_thinking'
  | 'web_development'
  | 'game_design';

export type QuizLevel = 'junior' | 'middle' | 'teens' | 'all';

export interface QuizQuestionItem {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctOptionIndex: number; // 0, 1, 2, 3
  explanation: string;
}

export interface QuizExam {
  id: string;
  title: string;
  description: string;
  tier: QuizLevel;
  topic: QuizTopic;
  sessionNumber: number; // e.g. 4, 8, 12
  durationMinutes: number; // e.g. 15
  passingScore: number; // e.g. 70 or 75
  xpReward: number; // e.g. 150
  questions: QuizQuestionItem[];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  tier: QuizLevel;
  studentName: string;
  studentPhone: string;
  score: number; // 0-100
  totalQuestions: number;
  correctAnswers: number;
  passed: boolean;
  xpEarned: number;
  completedAt: string; // ISO
  answers: Record<string, number>; // questionId -> selected option index
}

export type AmbassadorTier = 'bronze' | 'silver' | 'gold' | 'diamond';
export type AmbassadorRole = 'parent' | 'student' | 'school_partner' | 'alumni';
export type ReferralRewardType = 'tuition_discount' | 'bank_transfer' | 'bee_xp' | 'merchandise';
export type ReferralStatus = 'registered' | 'trial_attended' | 'enrolled' | 'reward_claimed' | 'cancelled';
export type PayoutStatus = 'pending' | 'approved' | 'paid' | 'rejected';

export interface AmbassadorProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: AmbassadorRole;
  referralCode: string;
  tier: AmbassadorTier;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarningsRp: number;
  totalBeeXp: number;
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ReferralRecord {
  id: string;
  ambassadorId: string;
  ambassadorName: string;
  ambassadorCode: string;
  referredStudentName: string;
  referredParentPhone: string;
  targetCourse: string;
  status: ReferralStatus;
  discountForFriendRp: number;
  rewardForAmbassadorRp: number;
  rewardBeeXp: number;
  rewardType: ReferralRewardType;
  payoutStatus: PayoutStatus;
  payoutDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type AuditActionType =
  | 'login'
  | 'logout'
  | 'create'
  | 'update'
  | 'delete'
  | 'export'
  | 'backup'
  | 'restore'
  | 'approve'
  | 'download';

export type AuditSeverity = 'info' | 'success' | 'warning' | 'danger';

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO 8601
  actorName: string; // e.g. "Febri Hasan"
  actorRole: string; // e.g. "Super Admin"
  module: AuditModule;
  actionType: AuditActionType;
  title: string;
  description: string;
  targetId?: string;
  targetName?: string;
  ipAddress: string;
  severity: AuditSeverity;
  metadata?: Record<string, any>;
}

export type CounselingTopic =
  | 'evaluasi_belajar'
  | 'kendala_fokus'
  | 'rekomendasi_kurikulum'
  | 'persiapan_lomba'
  | 'konsultasi_perangkat'
  | 'lainnya';

export type CounselingSessionType =
  | 'online_zoom'
  | 'online_gmeet'
  | 'offline_studio'
  | 'whatsapp_call';

export type CounselingStatus =
  | 'scheduled'
  | 'completed'
  | 'follow_up_needed'
  | 'cancelled';

export interface CounselingSession {
  id: string;
  sessionNumber: string; // misal: "CS-2026-001"
  studentName: string;
  studentPhone: string;
  parentName: string;
  parentPhone: string;
  counselorName: string;
  counselorTitle: string;
  tier: string; // misal: "Junior Explorer", "Middle Coder", "Teens Innovator"
  date: string; // YYYY-MM-DD
  time: string; // misal: "15:00 - 15:45 WIB"
  topic: CounselingTopic;
  sessionType: CounselingSessionType;
  meetingLink?: string;
  status: CounselingStatus;
  studentStrengths: string;
  challengesFaced: string;
  actionPlan: string;
  curriculumRecommendation: string;
  internalNotes?: string;
  parentFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

export type ResourceType =
  | 'worksheet'
  | 'slide'
  | 'cheatsheet'
  | 'starter_code'
  | 'guide'
  | 'video';

export type ResourceAccessTier = 'junior' | 'middle' | 'teens' | 'all';
export type ResourceFileFormat = 'pdf' | 'zip' | 'slides' | 'scratch' | 'github' | 'mp4';

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  tier: ResourceAccessTier;
  sessionNumber?: number; // 1 - 12, or undefined for general resource
  type: ResourceType;
  fileFormat: ResourceFileFormat;
  fileSize?: string; // misal: "2.4 MB"
  downloadUrl: string;
  previewUrl?: string;
  downloadsCount: number;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type CodingEventType = 'trial_class' | 'workshop' | 'webinar' | 'competition';
export type CodingEventTier = 'junior' | 'middle' | 'teens' | 'all';
export type CodingEventLocationType = 'online_zoom' | 'online_gmeet' | 'offline_studio';
export type CodingEventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type EventRegistrationStatus = 'registered' | 'confirmed' | 'attended' | 'cancelled';

export interface EventRegistrationItem {
  id: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  childName: string;
  childAge: number;
  status: EventRegistrationStatus;
  registeredAt: string;
  notes?: string;
}

export interface CodingEvent {
  id: string;
  title: string;
  slug: string;
  eventType: CodingEventType;
  tier: CodingEventTier;
  instructorName: string;
  instructorTitle: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  locationType: CodingEventLocationType;
  locationDetail: string; // misal: "Zoom Cloud Meeting #1" atau "Beekoding Tech Lab Bandung"
  meetingUrl?: string; // misal: "https://zoom.us/j/9812739123"
  capacity: number;
  price: number; // 0 = Free
  description: string;
  learningOutcomes: string[];
  posterUrlOrEmoji: string;
  status: CodingEventStatus;
  isFeatured: boolean;
  registrations: EventRegistrationItem[];
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 1. DATA SEEDING (SAMPLE DATA REALISTIS)
// ==========================================

const SAMPLE_SUBMISSIONS: AssessmentSubmission[] = [
  {
    id: 'sub-2026-001',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 menit lalu
    completedAt: '16 September 2026, 10:35 WIB',
    status: 'baru',
    notes: 'Tertarik kelas robotika akhir pekan. Mohon infokan jadwal kelas offline di Bandung.',
    profile: {
      childName: 'Kenzo Alvaro Pratama',
      childAge: 8,
      gradeLevel: 'Kelas 3 SD',
      parentName: 'Bambang Pratama',
      parentPhone: '081234567890',
      tier: 'junior',
    },
    scores: {
      logical: 85,
      numerical: 80,
      spatial: 95,
      pattern: 90,
      creativity: 85,
      problem_solving: 75,
      language: 80,
      persistence: 90,
    },
    totalScore: 85,
    topStrengths: ['spatial', 'pattern', 'creativity'],
    growthAreas: ['problem_solving', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding Little Explorer: Scratch Creative & Animation',
      description:
        'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
      whyFit:
        'Kekuatan imajinasi spasial dan kreativitas Kenzo sangat tinggi (95%), sangat cocok disalurkan melalui blok visual Scratch yang penuh ekspresi seni.',
    },
  },
  {
    id: 'sub-2026-002',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 jam lalu
    completedAt: '16 September 2026, 08:15 WIB',
    status: 'dihubungi',
    notes: 'Sudah dihubungi via WA, orang tua meminta rincian biaya program Python Coder.',
    profile: {
      childName: 'Alya Putri Zahra',
      childAge: 11,
      gradeLevel: 'Kelas 5 SD',
      parentName: 'Dewi Rahmawati',
      parentPhone: '081398765432',
      tier: 'middle',
    },
    scores: {
      logical: 95,
      numerical: 90,
      spatial: 70,
      pattern: 85,
      creativity: 75,
      problem_solving: 90,
      language: 85,
      persistence: 95,
    },
    totalScore: 86,
    topStrengths: ['logical', 'persistence', 'problem_solving'],
    growthAreas: ['spatial', 'creativity'],
    recommendedProgram: {
      title: 'Beekoding Python & Game Logic Academy',
      description:
        'Transisi dari visual block ke bahasa pemrograman populer dunia (Python) untuk membangun logika algoritma nyata dan mini game interaktif.',
      whyFit:
        'Skor penalaran logis (95%) dan ketekunan (95%) Alya berada di level istimewa, sangat siap untuk sintaks kode Python dan pemecahan masalah algoritma.',
    },
  },
  {
    id: 'sub-2026-003',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 jam lalu
    completedAt: '15 September 2026, 13:40 WIB',
    status: 'terdaftar',
    notes: 'Sudah mendaftar dan lunas Summer AI Bootcamp 2026 Batch 2.',
    profile: {
      childName: 'Muhammad Rizky Fadhilah',
      childAge: 15,
      gradeLevel: 'Kelas 10 SMA',
      parentName: 'Hendra Fadhilah',
      parentPhone: '081122334455',
      tier: 'teens',
    },
    scores: {
      logical: 90,
      numerical: 85,
      spatial: 80,
      pattern: 90,
      creativity: 85,
      problem_solving: 95,
      language: 90,
      persistence: 90,
    },
    totalScore: 88,
    topStrengths: ['problem_solving', 'logical', 'pattern'],
    growthAreas: ['spatial', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding AI & Full-Stack Software Engineering',
      description:
        'Kurikulum komprehensif mencakup fundamental Computer Science, rekayasa prompt AI, Machine Learning dasar, dan pengembangan aplikasi web modern.',
      whyFit:
        'Rizky memiliki skor pemecahan masalah 95% dan nalar logis 90%, kombinasi sempurna untuk kurikulum rekayasa perangkat lunak dan arsitektur AI.',
    },
  },
  {
    id: 'sub-2026-004',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 hari lalu
    completedAt: '14 September 2026, 20:10 WIB',
    status: 'baru',
    notes: 'Orang tua tertarik kurikulum AI untuk anak usia 12 tahun.',
    profile: {
      childName: 'Nadia Salsabila',
      childAge: 12,
      gradeLevel: 'Kelas 6 SD',
      parentName: 'dr. Sarah Wijaya',
      parentPhone: '081299887766',
      tier: 'middle',
    },
    scores: {
      logical: 75,
      numerical: 80,
      spatial: 85,
      pattern: 90,
      creativity: 95,
      problem_solving: 70,
      language: 85,
      persistence: 75,
    },
    totalScore: 82,
    topStrengths: ['creativity', 'pattern', 'spatial'],
    growthAreas: ['problem_solving', 'logical'],
    recommendedProgram: {
      title: 'Beekoding Web & Creative Tech Maker',
      description:
        'Membangun website interaktif, desain antarmuka modern, dan proyek teknologi kreatif yang dapat diakses online.',
      whyFit:
        'Kreativitas Nadia mencapai 95% dengan pola pikir spasial tajam, sangat ideal mengembangkan UI/UX interaktif dan proyek digital estetik.',
    },
  },
  {
    id: 'sub-2026-005',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 hari lalu
    completedAt: '14 September 2026, 11:20 WIB',
    status: 'selesai',
    notes: 'Konsultasi laporan bakat via Zoom telah selesai pada 15 Sept 2026. Menunggu jadwal semester baru.',
    profile: {
      childName: 'Arkan Danendra',
      childAge: 7,
      gradeLevel: 'Kelas 1 SD',
      parentName: 'Ferry Danendra',
      parentPhone: '085712345678',
      tier: 'junior',
    },
    scores: {
      logical: 70,
      numerical: 65,
      spatial: 80,
      pattern: 85,
      creativity: 80,
      problem_solving: 65,
      language: 75,
      persistence: 80,
    },
    totalScore: 75,
    topStrengths: ['pattern', 'spatial', 'creativity'],
    growthAreas: ['numerical', 'problem_solving'],
    recommendedProgram: {
      title: 'Beekoding Little Explorer: Scratch Creative & Animation',
      description:
        'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
      whyFit:
        'Arkan menunjukkan ketertarikan tinggi pada pengenalan pola dan gambar visual, tepat untuk belajar dasar logika lewat animasi cerita.',
    },
  },
  {
    id: 'sub-2026-006',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 hari lalu
    completedAt: '13 September 2026, 16:55 WIB',
    status: 'dihubungi',
    notes: 'Follow-up proposal kelas ekstrakurikuler sekolah.',
    profile: {
      childName: 'Chelsea Aurelia',
      childAge: 14,
      gradeLevel: 'Kelas 9 SMP',
      parentName: 'Ratna Aurelia',
      parentPhone: '087811223344',
      tier: 'teens',
    },
    scores: {
      logical: 85,
      numerical: 90,
      spatial: 85,
      pattern: 80,
      creativity: 90,
      problem_solving: 85,
      language: 95,
      persistence: 85,
    },
    totalScore: 87,
    topStrengths: ['language', 'creativity', 'numerical'],
    growthAreas: ['pattern', 'logical'],
    recommendedProgram: {
      title: 'Beekoding Teen Tech Innovator & Data Science',
      description:
        'Membekali remaja dengan kemampuan analisis data, otomasi kecerdasan buatan, dan pembuatan portofolio teknologi untuk persiapan kuliah dan kompetisi.',
      whyFit:
        'Chelsea memiliki kemampuan komunikasi dan bahasa yang sangat menonjol (95%) serta analitik numerik kuat, modal utama untuk data storytelling dan kecerdasan buatan.',
    },
  },
  {
    id: 'sub-2026-007',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    completedAt: '13 September 2026, 09:10 WIB',
    status: 'baru',
    notes: 'Ingin mencoba kelas trial coding game Scratch.',
    profile: {
      childName: 'Davin Arya Pramudya',
      childAge: 9,
      gradeLevel: 'Kelas 4 SD',
      parentName: 'Pramudya Wardhana',
      parentPhone: '081288991122',
      tier: 'junior',
    },
    scores: {
      logical: 80,
      numerical: 75,
      spatial: 90,
      pattern: 85,
      creativity: 90,
      problem_solving: 80,
      language: 70,
      persistence: 85,
    },
    totalScore: 81,
    topStrengths: ['spatial', 'creativity', 'pattern'],
    growthAreas: ['language', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding Little Explorer: Scratch Creative & Animation',
      description:
        'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
      whyFit:
        'Davin memiliki persepsi spasial 90% dan daya kreatif tinggi untuk merancang visual karakter dan petualangan game interaktif.',
    },
  },
  {
    id: 'sub-2026-008',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    completedAt: '12 September 2026, 14:25 WIB',
    status: 'terdaftar',
    notes: 'Sudah mendaftar kelas private online Python Intermediate.',
    profile: {
      childName: 'Kimberly Valerie Tan',
      childAge: 10,
      gradeLevel: 'Kelas 5 SD',
      parentName: 'Susanto Tan',
      parentPhone: '081900112233',
      tier: 'middle',
    },
    scores: {
      logical: 90,
      numerical: 95,
      spatial: 80,
      pattern: 90,
      creativity: 80,
      problem_solving: 85,
      language: 80,
      persistence: 90,
    },
    totalScore: 86,
    topStrengths: ['numerical', 'logical', 'pattern'],
    growthAreas: ['spatial', 'creativity'],
    recommendedProgram: {
      title: 'Beekoding Python & Game Logic Academy',
      description:
        'Transisi dari visual block ke bahasa pemrograman populer dunia (Python) untuk membangun logika algoritma nyata dan mini game interaktif.',
      whyFit:
        'Kecerdasan numerik Kimberly (95%) dan pola pikir deduktif logis menjadikannya sangat cepat memahami tipe data dan logika algoritma komputasi.',
    },
  },
  {
    id: 'sub-2026-009',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 110).toISOString(),
    completedAt: '11 September 2026, 19:45 WIB',
    status: 'dihubungi',
    notes: 'Konsultasi persiapan olimpiade informatika (OSN-K Informatika).',
    profile: {
      childName: 'Rayhan Aditya Putra',
      childAge: 16,
      gradeLevel: 'Kelas 11 SMA',
      parentName: 'Ir. Aditya Pratama',
      parentPhone: '082155667788',
      tier: 'teens',
    },
    scores: {
      logical: 95,
      numerical: 95,
      spatial: 85,
      pattern: 90,
      creativity: 80,
      problem_solving: 95,
      language: 85,
      persistence: 90,
    },
    totalScore: 89,
    topStrengths: ['logical', 'numerical', 'problem_solving'],
    growthAreas: ['creativity', 'spatial'],
    recommendedProgram: {
      title: 'Beekoding AI & Full-Stack Software Engineering',
      description:
        'Kurikulum komprehensif mencakup fundamental Computer Science, rekayasa prompt AI, Machine Learning dasar, dan pengembangan aplikasi web modern.',
      whyFit:
        'Kombinasi skor 95% pada logika, numerik, dan problem solving adalah profil ideal untuk algoritma kompetitif dan arsitektur software tingkat lanjut.',
    },
  },
  {
    id: 'sub-2026-010',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 125).toISOString(),
    completedAt: '11 September 2026, 11:30 WIB',
    status: 'baru',
    notes: 'Menanyakan ketersediaan kelas tatap muka hari Minggu.',
    profile: {
      childName: 'Shakila Az-Zahra',
      childAge: 8,
      gradeLevel: 'Kelas 2 SD',
      parentName: 'Nurul Hidayah',
      parentPhone: '085277889900',
      tier: 'junior',
    },
    scores: {
      logical: 75,
      numerical: 70,
      spatial: 85,
      pattern: 90,
      creativity: 95,
      problem_solving: 70,
      language: 80,
      persistence: 75,
    },
    totalScore: 79,
    topStrengths: ['creativity', 'pattern', 'spatial'],
    growthAreas: ['numerical', 'problem_solving'],
    recommendedProgram: {
      title: 'Beekoding Little Explorer: Scratch Creative & Animation',
      description:
        'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
      whyFit:
        'Kreativitas Shakila sangat menonjol (95%), cocok diarahkan ke storytelling digital dan animasi visual.',
    },
  },
  {
    id: 'sub-2026-011',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 140).toISOString(),
    completedAt: '10 September 2026, 15:10 WIB',
    status: 'selesai',
    notes: 'Selesai asesmen diagnostik, orang tua berencana mendaftar semester depan.',
    profile: {
      childName: 'Fathan Al-Ghifari',
      childAge: 12,
      gradeLevel: 'Kelas 6 SD',
      parentName: 'Agus Al-Ghifari',
      parentPhone: '081344556677',
      tier: 'middle',
    },
    scores: {
      logical: 85,
      numerical: 80,
      spatial: 75,
      pattern: 85,
      creativity: 80,
      problem_solving: 85,
      language: 80,
      persistence: 85,
    },
    totalScore: 82,
    topStrengths: ['logical', 'problem_solving', 'pattern'],
    growthAreas: ['spatial', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding Python & Game Logic Academy',
      description:
        'Transisi dari visual block ke bahasa pemrograman populer dunia (Python) untuk membangun logika algoritma nyata dan mini game interaktif.',
      whyFit:
        'Fathan memiliki keseimbangan nalar komputasional yang baik untuk memulai coding teks Python.',
    },
  },
  {
    id: 'sub-2026-012',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 160).toISOString(),
    completedAt: '09 September 2026, 17:00 WIB',
    status: 'terdaftar',
    notes: 'Terdaftar Web Development for Teens.',
    profile: {
      childName: 'Jessica Clarissa',
      childAge: 13,
      gradeLevel: 'Kelas 8 SMP',
      parentName: 'dr. Linda Wijaya',
      parentPhone: '087799001122',
      tier: 'teens',
    },
    scores: {
      logical: 80,
      numerical: 80,
      spatial: 90,
      pattern: 85,
      creativity: 95,
      problem_solving: 80,
      language: 90,
      persistence: 85,
    },
    totalScore: 86,
    topStrengths: ['creativity', 'spatial', 'language'],
    growthAreas: ['logical', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding Teen Tech Innovator & Data Science',
      description:
        'Membekali remaja dengan kemampuan analisis data, otomasi kecerdasan buatan, dan pembuatan portofolio teknologi untuk persiapan kuliah dan kompetisi.',
      whyFit:
        'Kemampuan visual spasial dan estetika kreativitas Jessica sangat tinggi (95%), sangat pas untuk proyek digital dan web application.',
    },
  },
  {
    id: 'sub-2026-013',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 175).toISOString(),
    completedAt: '08 September 2026, 10:20 WIB',
    status: 'dihubungi',
    notes: 'Minta jadwal trial class hari Sabtu.',
    profile: {
      childName: 'Jonathan Steven',
      childAge: 11,
      gradeLevel: 'Kelas 5 SD',
      parentName: 'Steven Kurniawan',
      parentPhone: '081233445566',
      tier: 'middle',
    },
    scores: {
      logical: 85,
      numerical: 85,
      spatial: 80,
      pattern: 80,
      creativity: 75,
      problem_solving: 85,
      language: 80,
      persistence: 90,
    },
    totalScore: 83,
    topStrengths: ['persistence', 'logical', 'problem_solving'],
    growthAreas: ['creativity', 'spatial'],
    recommendedProgram: {
      title: 'Beekoding Python & Game Logic Academy',
      description:
        'Transisi dari visual block ke bahasa pemrograman populer dunia (Python) untuk membangun logika algoritma nyata dan mini game interaktif.',
      whyFit:
        'Ketekunan Jonathan (90%) dan pemikiran sistematis sangat menonjol.',
    },
  },
  {
    id: 'sub-2026-014',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 190).toISOString(),
    completedAt: '07 September 2026, 13:15 WIB',
    status: 'baru',
    notes: 'Orang tua tertarik kurikulum dasar robotika.',
    profile: {
      childName: 'Kayla Aurelia Putri',
      childAge: 7,
      gradeLevel: 'Kelas 1 SD',
      parentName: 'Rina Marlina',
      parentPhone: '085811223344',
      tier: 'junior',
    },
    scores: {
      logical: 70,
      numerical: 70,
      spatial: 85,
      pattern: 85,
      creativity: 85,
      problem_solving: 70,
      language: 75,
      persistence: 80,
    },
    totalScore: 78,
    topStrengths: ['spatial', 'pattern', 'creativity'],
    growthAreas: ['logical', 'numerical'],
    recommendedProgram: {
      title: 'Beekoding Little Explorer: Scratch Creative & Animation',
      description:
        'Program pengantar pemrograman visual interaktif yang melatih imajinasi anak mengubah ide menjadi game dan animasi warna-warni.',
      whyFit:
        'Kayla sangat menyukai pola warna dan eksplorasi visual.',
    },
  },
];

// ==========================================
// 2. KELOLA DATA SUBMISI SISWA
// ==========================================

export function getSubmissions(): AssessmentSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    if (!raw) {
      // Seed default sample submissions
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SAMPLE_SUBMISSIONS));
      return SAMPLE_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length < 10) {
      const customItems = parsed.filter((p: AssessmentSubmission) => !p.id.startsWith('sub-2026-'));
      const combined = [...customItems, ...SAMPLE_SUBMISSIONS];
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(combined));
      return combined;
    }
    return Array.isArray(parsed) ? parsed : SAMPLE_SUBMISSIONS;
  } catch (err) {
    console.error('Error loading submissions:', err);
    return SAMPLE_SUBMISSIONS;
  }
}

export function getSubmissionById(id: string): AssessmentSubmission | null {
  const all = getSubmissions();
  return all.find((item) => item.id === id) || null;
}

export function saveSubmission(
  result: AssessmentResult,
  answers?: Record<string, string>
): AssessmentSubmission {
  const current = getSubmissions();
  const newSubmission: AssessmentSubmission = {
    ...result,
    id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
    status: 'baru',
    answers,
  };

  const updated = [newSubmission, ...current];
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(updated));
    pushSubmissionToSupabase(newSubmission).catch(() => {});
    emitStorageUpdate('submissions');
  } catch (err) {
    console.error('Failed to save submission to localStorage:', err);
  }

  return newSubmission;
}

export function saveSubmissions(submissions: AssessmentSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    emitStorageUpdate('submissions');
  } catch (err) {
    console.error('Failed to save submissions to localStorage:', err);
  }
}

export function updateSubmissionStatus(id: string, status: FollowUpStatus): boolean {
  const current = getSubmissions();
  const idx = current.findIndex((item) => item.id === id);
  if (idx === -1) return false;

  current[idx].status = status;
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(current));
    pushSubmissionToSupabase(current[idx]).catch(() => {});
    emitStorageUpdate('submissions');
    return true;
  } catch (err) {
    console.error('Failed to update status:', err);
    return false;
  }
}

export function updateSubmissionNotes(id: string, notes: string): boolean {
  const current = getSubmissions();
  const idx = current.findIndex((item) => item.id === id);
  if (idx === -1) return false;

  current[idx].notes = notes;
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(current));
    pushSubmissionToSupabase(current[idx]).catch(() => {});
    emitStorageUpdate('submissions');
    return true;
  } catch (err) {
    console.error('Failed to update notes:', err);
    return false;
  }
}

export function deleteSubmission(id: string): boolean {
  const current = getSubmissions();
  const filtered = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(filtered));
    deleteSubmissionFromSupabase(id).catch(() => {});
    emitStorageUpdate('submissions');
    return true;
  } catch (err) {
    console.error('Failed to delete submission:', err);
    return false;
  }
}

export function resetSubmissionsToDefault(): AssessmentSubmission[] {
  try {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(SAMPLE_SUBMISSIONS));
    return SAMPLE_SUBMISSIONS;
  } catch (err) {
    console.error('Failed to reset submissions:', err);
    return SAMPLE_SUBMISSIONS;
  }
}

export function exportSubmissionsCSV(submissions: AssessmentSubmission[]): void {
  const headers = [
    'ID',
    'Tanggal Tes',
    'Nama Anak',
    'Usia',
    'Jenjang/Kelas',
    'Kelompok Usia (Tier)',
    'Nama Orang Tua',
    'No. WhatsApp',
    'Skor Rata-Rata',
    'Status Follow-Up',
    'Rekomendasi Program',
    'Catatan Admin',
  ];

  const rows = submissions.map((s) => [
    s.id,
    `"${s.completedAt}"`,
    `"${s.profile.childName.replace(/"/g, '""')}"`,
    s.profile.childAge,
    `"${(s.profile.gradeLevel || '').replace(/"/g, '""')}"`,
    s.profile.tier,
    `"${(s.profile.parentName || '').replace(/"/g, '""')}"`,
    `"${s.profile.parentPhone}"`,
    s.totalScore,
    s.status,
    `"${(s.recommendedProgram.title || '').replace(/"/g, '""')}"`,
    `"${(s.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,\uFEFF' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `beekoding_data_siswa_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ==========================================
// 3. KELOLA BANK SOAL (CRUD)
// ==========================================

export function getAllQuestions(): Record<AgeTier, TalentQuestion[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(QUESTION_BANK));
      return QUESTION_BANK;
    }
    const parsed = JSON.parse(raw);
    return parsed.junior && parsed.middle && parsed.teens ? parsed : QUESTION_BANK;
  } catch (err) {
    console.error('Error loading question bank:', err);
    return QUESTION_BANK;
  }
}

export function getQuestionsByTier(tier: AgeTier): TalentQuestion[] {
  const all = getAllQuestions();
  return all[tier] || [];
}

export function saveQuestion(question: TalentQuestion): boolean {
  try {
    const all = getAllQuestions();
    const tierList = all[question.tier] || [];
    const existingIdx = tierList.findIndex((q) => q.id === question.id);

    if (existingIdx >= 0) {
      tierList[existingIdx] = question;
    } else {
      tierList.push(question);
    }

    all[question.tier] = tierList;
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
    return true;
  } catch (err) {
    console.error('Failed to save question:', err);
    return false;
  }
}

export function deleteQuestion(tier: AgeTier, questionId: string): boolean {
  try {
    const all = getAllQuestions();
    all[tier] = (all[tier] || []).filter((q) => q.id !== questionId);
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(all));
    return true;
  } catch (err) {
    console.error('Failed to delete question:', err);
    return false;
  }
}

export function resetQuestionsToDefault(): Record<AgeTier, TalentQuestion[]> {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(QUESTION_BANK));
    return QUESTION_BANK;
  } catch (err) {
    console.error('Failed to reset question bank:', err);
    return QUESTION_BANK;
  }
}

// ==========================================
// 4. DATA SEEDING & MANAJEMEN KONSULTASI & PENDAFTARAN
// ==========================================

const SAMPLE_INQUIRIES: ConsultationInquiry[] = [
  {
    id: 'REG-2026-001',
    type: 'pendaftaran',
    name: 'Ibu Ratna Sari',
    email: 'ratna.sari@gmail.com',
    phone: '081288991234',
    role: 'Orang Tua',
    program: 'Summer AI & Coding Bootcamp 2026',
    message:
      'Anak saya kelas 5 SD sangat gemar bermain Roblox dan Scratch. Apakah bisa ikut batch Juli 2026? Mohon rincian jadwal dan panduan biayanya.',
    status: 'baru',
    adminNotes: '',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'INQ-2026-002',
    type: 'konsultasi',
    name: 'Bpk. Hendra Wijaya',
    email: 'hendra.wijaya@outlook.com',
    phone: '081377889900',
    role: 'Orang Tua',
    program: 'Beekoding AI & Tech Academy',
    message:
      'Ingin tanya program reguler semester untuk anak SMP kelas 8. Apakah materinya sudah masuk ke Python dan implementasi AI?',
    status: 'dihubungi',
    adminNotes:
      'Sudah dihubungi via WA pada 16 Sep pukul 13.00. Orang tua meminta sesi konsultasi zoom dengan Lead Instructor hari Sabtu jam 10.00.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'INQ-2026-003',
    type: 'konsultasi',
    name: 'Ibu Nurul Hidayah, M.Pd',
    email: 'nurul.sdit@gmail.com',
    phone: '082155667788',
    role: 'Kepala Sekolah',
    program: 'Mobile Planetarium & Space Tech Drive',
    message:
      'Kami dari SDIT Al-Azhar ingin mengundang Beekoding untuk kegiatan Science & Tech Week bulan depan. Mohon kirimkan proposal roadshow dan spesifikasi dome.',
    status: 'jadwal_konsultasi',
    adminNotes:
      'Sudah dijadwalkan presentasi proposal kurikulum via Zoom pada Kamis, 18 September 2026 jam 14.00 bersama waka kurikulum.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'REG-2026-004',
    type: 'pendaftaran',
    name: 'Bpk. Agus Setiawan',
    email: 'agus.guru@sekolah.sch.id',
    phone: '085612345678',
    role: 'Guru',
    program: "Teachers' AI & Tech Training",
    message:
      'Tertarik pelatihan pemanfaatan generative AI dan tools edukatif untuk guru-guru IPA dan Matematika di SMP kami.',
    status: 'terdaftar',
    adminNotes:
      'Sekolah sepakat mengadakan workshop in-house untuk 25 guru pada 28 September 2026. Invoice DP dan MoU resmi sudah diterbitkan.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'REG-2026-005',
    type: 'pendaftaran',
    name: 'Amanda Clarissa',
    email: 'amanda.c@gmail.com',
    phone: '087811223344',
    role: 'Siswa',
    program: 'Summer AI & Coding Bootcamp 2026',
    message:
      'Saya siswi kelas 9 SMP, ingin belajar machine learning dan AI yang bisa bikin bot interaktif sendiri. Apakah untuk pemula boleh ikut?',
    status: 'baru',
    adminNotes: '',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'INQ-2026-006',
    type: 'konsultasi',
    name: 'Bpk. Dedi Suryadi',
    email: 'dedi.suryadi@yahoo.com',
    phone: '081900112233',
    role: 'Orang Tua',
    program: '21st Century Skills & Creative Lab',
    message:
      'Mau tanya apakah ada kelas untuk anak usia 7 tahun (kelas 1 SD)? Apakah sudah diajarkan logika berpikir atau masih pengenalan?',
    status: 'dihubungi',
    adminNotes:
      'Sudah dijelaskan modul Junior Little Explorer Scratch Jr via telepon. Orang tua berencana ikut sesi trial gratis hari Minggu.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'INQ-2026-007',
    type: 'konsultasi',
    name: 'Dr. Ir. Gunawan Wibowo',
    email: 'gunawan@techfoundation.org',
    phone: '081199887766',
    role: 'Mitra Lainnya',
    program: 'School Tech Transformation Partner',
    message:
      'Kami dari yayasan CSR ingin menjajaki kemitraan adopsi lab coding di 5 sekolah binaan di Jawa Barat. Mohon jadwal diskusi kemitraan.',
    status: 'jadwal_konsultasi',
    adminNotes:
      'Meeting offline di kantor Beekoding dijadwalkan Jumat 19 September jam 10.30 WIB dengan Direktur Akademik.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'REG-2026-008',
    type: 'pendaftaran',
    name: 'Kevin Sanjaya',
    email: 'kevin.sanjaya@student.ac.id',
    phone: '085299881122',
    role: 'Mahasiswa',
    program: 'Robotics & IoT Day',
    message:
      'Mendaftar workshop IoT akhir pekan untuk tugas akhir pengenalan sensor ESP32 dan dashboard cloud.',
    status: 'terdaftar',
    adminNotes:
      'Pembayaran pendaftaran lunas via transfer bank. Sudah dimasukkan ke grup WhatsApp peserta workshop batch 3.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'INQ-2026-009',
    type: 'konsultasi',
    name: 'Ibu Maya Anggraini',
    email: 'maya.anggraini@gmail.com',
    phone: '081344556677',
    role: 'Orang Tua',
    program: 'Virtual Reality (VR) 360° Studio',
    message:
      'Anak saya ingin belajar bikin game VR. Apakah harus punya headset Oculus sendiri di rumah?',
    status: 'batal',
    adminNotes:
      'Orang tua membatalkan karena lokasi rumah terlalu jauh dari sentra lab offline Beekoding dan belum memiliki perangkat VR mandiri.',
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'REG-2026-010',
    type: 'pendaftaran',
    name: 'Ibu Sri Wahyuni',
    email: 'sri.wahyuni@gmail.com',
    phone: '081233445566',
    role: 'Orang Tua',
    program: 'Summer AI & Coding Bootcamp 2026',
    message:
      'Mohon info diskon early bird pendaftaran Summer Bootcamp untuk 2 anak (kakak adik kelas 4 dan 6 SD).',
    status: 'baru',
    adminNotes: '',
    createdAt: '2026-03-01T10:00:00Z',
  },
];

export function getInquiries(): ConsultationInquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
      return SAMPLE_INQUIRIES;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse inquiries:', err);
    return SAMPLE_INQUIRIES;
  }
}

export function saveInquiry(
  data: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: InquiryStatus;
    type?: InquiryType;
  }
): ConsultationInquiry {
  try {
    const current = getInquiries();
    const now = new Date();

    const inquiryType =
      data.type ||
      (data.program.toLowerCase().includes('bootcamp') ? 'pendaftaran' : 'konsultasi');
    const prefix = inquiryType === 'pendaftaran' ? 'REG' : 'INQ';
    const newId = `${prefix}-2026-${String(current.length + 1).padStart(3, '0')}`;

    const newInquiry: ConsultationInquiry = {
      ...data,
      id: newId,
      type: inquiryType,
      status: data.status || 'baru',
      adminNotes: '',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const updated = [newInquiry, ...current];
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    pushInquiryToSupabase(newInquiry).catch(() => {});
    emitStorageUpdate('inquiries');
    return newInquiry;
  } catch (err) {
    console.error('Failed to save inquiry:', err);
    throw err;
  }
}

export function saveInquiries(inquiries: ConsultationInquiry[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    emitStorageUpdate('inquiries');
  } catch (err) {
    console.error('Failed to save inquiries to localStorage:', err);
  }
}

export function updateInquiryStatus(id: string, status: InquiryStatus): void {
  try {
    const current = getInquiries();
    let updatedItem: ConsultationInquiry | null = null;
    const updated = current.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, status, updatedAt: new Date().toISOString() };
        return updatedItem;
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    if (updatedItem) pushInquiryToSupabase(updatedItem).catch(() => {});
    emitStorageUpdate('inquiries');
  } catch (err) {
    console.error('Failed to update inquiry status:', err);
  }
}

export function updateInquiryNotes(id: string, notes: string): void {
  try {
    const current = getInquiries();
    let updatedItem: ConsultationInquiry | null = null;
    const updated = current.map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, adminNotes: notes, updatedAt: new Date().toISOString() };
        return updatedItem;
      }
      return item;
    });
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    if (updatedItem) pushInquiryToSupabase(updatedItem).catch(() => {});
    emitStorageUpdate('inquiries');
  } catch (err) {
    console.error('Failed to update inquiry notes:', err);
  }
}

export function updateInquiry(inquiry: ConsultationInquiry): void {
  try {
    const current = getInquiries();
    const updated = current.map((item) =>
      item.id === inquiry.id ? { ...inquiry, updatedAt: new Date().toISOString() } : item
    );
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    pushInquiryToSupabase(inquiry).catch(() => {});
    emitStorageUpdate('inquiries');
  } catch (err) {
    console.error('Failed to update inquiry:', err);
  }
}

export function deleteInquiry(id: string): void {
  try {
    const current = getInquiries();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
    deleteInquiryFromSupabase(id).catch(() => {});
    emitStorageUpdate('inquiries');
  } catch (err) {
    console.error('Failed to delete inquiry:', err);
  }
}

export function exportInquiriesCSV(inquiries: ConsultationInquiry[]): void {
  try {
    const headers = [
      'ID',
      'Tipe',
      'Tanggal Masuk',
      'Nama Pemohon',
      'Peran/Status',
      'WhatsApp',
      'Email',
      'Program Pilihan',
      'Pesan/Pertanyaan',
      'Status Follow-Up',
      'Catatan Internal Admin',
    ];

    const rows = inquiries.map((item) => [
      item.id,
      item.type === 'pendaftaran' ? 'Pendaftaran' : 'Konsultasi',
      `"${item.createdAt}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.role.replace(/"/g, '""')}"`,
      `'${item.phone}`,
      item.email,
      `"${item.program.replace(/"/g, '""')}"`,
      `"${(item.message || '-').replace(/"/g, '""')}"`,
      item.status,
      `"${(item.adminNotes || '-').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Data_Konsultasi_Pendaftaran_Beekoding_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error('Failed to export inquiries CSV:', err);
  }
}

export function resetInquiriesToDefault(): ConsultationInquiry[] {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(SAMPLE_INQUIRIES));
    return SAMPLE_INQUIRIES;
  } catch (err) {
    console.error('Failed to reset inquiries:', err);
    return SAMPLE_INQUIRIES;
  }
}

// ==========================================
// 5. AUTENTIKASI & AKUN ADMINISTRATOR
// ==========================================

const DEFAULT_ADMIN_EMAIL = '88ihsan@gmail.com';
const DEFAULT_ADMIN_PASSWORD = 'admin123';

export function getAdminCredentials(): { email: string; passwordHash: string; updatedAt?: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { email: DEFAULT_ADMIN_EMAIL, passwordHash: DEFAULT_ADMIN_PASSWORD };
}

export function updateAdminPassword(
  oldPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const creds = getAdminCredentials();
  if (oldPassword !== creds.passwordHash && oldPassword !== DEFAULT_ADMIN_PASSWORD) {
    return { success: false, error: 'Password saat ini yang Anda masukkan salah.' };
  }
  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: 'Password baru minimal harus 6 karakter.' };
  }
  try {
    const updated = {
      ...creds,
      passwordHash: newPassword,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(updated));
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui password di penyimpanan browser.' };
  }
}

export function isAdminAuthenticated(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return false;
    const auth = JSON.parse(raw);
    return auth?.isLoggedIn === true;
  } catch {
    return false;
  }
}

export const DEFAULT_SYSTEM_USERS: SystemUser[] = [
  {
    id: 'usr-admin-01',
    name: 'Febri Hasan',
    email: '88ihsan@gmail.com',
    role: 'administrator',
    roleTitle: 'Super Administrator & Academic Strategist',
    phone: '+62 853-1131-7127',
    avatar: '/febri-hasan.png',
    institution: 'Beekoding & Akar Inti Teknologi',
    bio: 'Pendidik & kurator asesmen bakat digital anak dengan pengalaman 12+ tahun dalam inovasi edutech.',
    status: 'active',
    allowedTabs: [...ALL_ADMIN_TABS],
    passwordHash: 'admin123',
    lastLoginAt: '2026-09-18T10:30:00Z',
    createdAt: '2026-01-01T08:00:00Z',
  },
  {
    id: 'usr-mentor-01',
    name: 'Sarah Melati, S.Kom.',
    email: 'mentor@beekoding.id',
    role: 'instructor',
    roleTitle: 'Senior Coding Mentor & Python Specialist',
    phone: '+62 812-8877-6655',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    institution: 'Beekoding Academy',
    bio: 'Mentor koding anak spesialis Scratch, Roblox Lua, dan Python Dasar dengan pendekatan gamifikasi interaktif.',
    status: 'active',
    allowedTabs: [...INSTRUCTOR_RECOMMENDED_TABS],
    passwordHash: 'mentor123',
    lastLoginAt: '2026-09-17T15:20:00Z',
    createdAt: '2026-02-15T09:00:00Z',
  },
  {
    id: 'usr-counselor-01',
    name: 'Budi Santoso, M.Pd.',
    email: 'konselor@beekoding.id',
    role: 'counselor',
    roleTitle: 'Academic Counselor & Student Advisor',
    phone: '+62 813-4455-6677',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    institution: 'Beekoding Counseling Hub',
    bio: 'Konselor pendidikan anak & pendamping bakat teknologi dengan fokus bimbingan 1-on-1 dan komunikasi wali murid.',
    status: 'active',
    allowedTabs: [...COUNSELOR_RECOMMENDED_TABS],
    passwordHash: 'konselor123',
    lastLoginAt: '2026-09-16T11:45:00Z',
    createdAt: '2026-03-01T10:00:00Z',
  },
];

export function getSystemUsers(): SystemUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SYSTEM_USERS);
    if (raw) {
      const parsed: SystemUser[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  try {
    localStorage.setItem(STORAGE_KEYS.SYSTEM_USERS, JSON.stringify(DEFAULT_SYSTEM_USERS));
  } catch {}
  return DEFAULT_SYSTEM_USERS;
}

export function saveSystemUsers(users: SystemUser[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SYSTEM_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save system users:', err);
  }
}

export function getCurrentSystemUser(): SystemUser {
  const users = getSystemUsers();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (raw) {
      const auth = JSON.parse(raw);
      if (auth?.userId) {
        const found = users.find((u) => u.id === auth.userId);
        if (found) return found;
      }
      if (auth?.email) {
        const found = users.find((u) => u.email.toLowerCase() === auth.email.toLowerCase());
        if (found) return found;
      }
    }
  } catch {}
  return users[0] || DEFAULT_SYSTEM_USERS[0];
}

export function switchActiveSystemUser(userId: string): { success: boolean; user?: SystemUser; error?: string } {
  const users = getSystemUsers();
  const target = users.find((u) => u.id === userId);
  if (!target) {
    return { success: false, error: 'Pengguna tidak ditemukan.' };
  }
  if (target.status !== 'active') {
    return { success: false, error: 'Pengguna sedang dalam status non-aktif.' };
  }

  try {
    localStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify({
        isLoggedIn: true,
        email: target.email,
        userId: target.id,
        role: target.role,
        loggedInAt: new Date().toISOString(),
      })
    );

    target.lastLoginAt = new Date().toISOString();
    saveSystemUsers(users);

    try {
      logAdminActivity({
        module: 'users',
        actionType: 'login',
        title: 'Beralih Akun / Simulasi Role Pengguna',
        description: `Beralih sesi aktif ke "${target.name}" (${target.roleTitle}).`,
        severity: 'info',
        metadata: { targetUserId: target.id, targetRole: target.role },
      });
    } catch {}

    return { success: true, user: target };
  } catch {
    return { success: false, error: 'Gagal beralih akun.' };
  }
}

export function getRoleDefaultTabs(role: UserRole | string): AdminTab[] {
  if (role === 'administrator') return [...ALL_ADMIN_TABS];
  if (role === 'instructor') return [...INSTRUCTOR_RECOMMENDED_TABS];
  if (role === 'counselor') return [...COUNSELOR_RECOMMENDED_TABS];
  return [...INSTRUCTOR_RECOMMENDED_TABS];
}

export function saveSystemUser(userData: Partial<SystemUser> & { name: string; email: string }): SystemUser {
  const users = getSystemUsers();
  const existingIndex = users.findIndex(
    (u) => u.id === userData.id || u.email.toLowerCase() === userData.email.toLowerCase()
  );

  let updatedUser: SystemUser;
  if (existingIndex >= 0) {
    updatedUser = {
      ...users[existingIndex],
      ...userData,
      updatedAt: new Date().toISOString(),
    };
    users[existingIndex] = updatedUser;

    try {
      logAdminActivity({
        module: 'users',
        actionType: 'update',
        title: 'Data Pengguna Diperbarui',
        description: `Akun "${updatedUser.name}" (${updatedUser.roleTitle}) berhasil diperbarui.`,
        severity: 'info',
        metadata: { userId: updatedUser.id, role: updatedUser.role },
      });
    } catch {}
  } else {
    const role = userData.role || 'instructor';
    updatedUser = {
      id: userData.id || `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: role,
      roleTitle:
        userData.roleTitle ||
        (role === 'administrator'
          ? 'Super Administrator'
          : role === 'instructor'
          ? 'Coding Instructor / Mentor'
          : 'Academic Counselor'),
      phone: userData.phone || '',
      avatar:
        userData.avatar ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      institution: userData.institution || 'Beekoding Academy',
      bio: userData.bio || '',
      status: userData.status || 'active',
      allowedTabs: userData.allowedTabs || getRoleDefaultTabs(role),
      passwordHash: userData.passwordHash || 'password123',
      createdAt: new Date().toISOString(),
      lastLoginAt: undefined,
    };
    users.push(updatedUser);

    try {
      logAdminActivity({
        module: 'users',
        actionType: 'create',
        title: 'Pengguna Baru Ditambahkan',
        description: `Akun baru "${updatedUser.name}" (${updatedUser.roleTitle}) berhasil dibuat.`,
        severity: 'info',
        metadata: { userId: updatedUser.id, role: updatedUser.role },
      });
    } catch {}
  }

  saveSystemUsers(users);
  return updatedUser;
}

export function deleteSystemUser(id: string): { success: boolean; error?: string } {
  const users = getSystemUsers();
  const userToDelete = users.find((u) => u.id === id);
  if (!userToDelete) {
    return { success: false, error: 'Pengguna tidak ditemukan.' };
  }
  if (userToDelete.role === 'administrator' && userToDelete.email === DEFAULT_ADMIN_EMAIL) {
    return {
      success: false,
      error: 'Akun Super Administrator utama tidak dapat dihapus demi keamanan sistem.',
    };
  }

  const filtered = users.filter((u) => u.id !== id);
  saveSystemUsers(filtered);

  try {
    logAdminActivity({
      module: 'users',
      actionType: 'delete',
      title: 'Pengguna Sistem Dihapus',
      description: `Akun pengguna "${userToDelete.name}" (${userToDelete.email}) berhasil dihapus.`,
      severity: 'warning',
      metadata: { deletedUserId: id },
    });
  } catch {}

  return { success: true };
}

export function isTabAllowedForCurrentUser(tab: AdminTab): boolean {
  const cur = getCurrentSystemUser();
  if (cur.role === 'administrator') return true;
  return cur.allowedTabs ? cur.allowedTabs.includes(tab) : true;
}

export function exportUsersCSV(): void {
  try {
    const users = getSystemUsers();
    const headers = [
      'ID Pengguna',
      'Nama Lengkap',
      'Email',
      'Peran (Role)',
      'Jabatan / Gelar',
      'No. WhatsApp',
      'Status',
      'Jumlah Menu Akses',
      'Login Terakhir',
      'Dibuat Pada',
    ];

    const rows = users.map((u) => [
      `"${u.id}"`,
      `"${u.name.replace(/"/g, '""')}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${(u.roleTitle || '').replace(/"/g, '""')}"`,
      `"${u.phone || ''}"`,
      `"${u.status === 'active' ? 'Aktif' : 'Non-Aktif'}"`,
      `"${u.allowedTabs.length}"`,
      `"${u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString('id-ID') : 'Belum pernah'}"`,
      `"${new Date(u.createdAt).toLocaleString('id-ID')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `daftar_pengguna_sistem_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export users CSV:', err);
  }
}

export function getAdminProfile(): AdminUser {
  try {
    const cur = getCurrentSystemUser();
    if (cur) {
      return {
        email: cur.email,
        name: cur.name,
        role: cur.roleTitle || cur.role,
        phone: cur.phone || '+62 853-1131-7127',
        avatar: cur.avatar || '/febri-hasan.png',
        institution: cur.institution || 'Beekoding Academy',
        bio: cur.bio || 'Pendidik & kurator asesmen bakat digital anak.',
        notificationsEnabled: true,
        leadAlertsEnabled: true,
        soundEnabled: true,
        language: 'id',
        twoFactorEnabled: false,
        lastLoginAt: cur.lastLoginAt || new Date().toISOString(),
      };
    }
  } catch {}
  const creds = getAdminCredentials();
  return {
    email: creds.email,
    name: 'Febri Hasan',
    role: 'Super Administrator & Academic Strategist',
    phone: '+62 853-1131-7127',
    avatar: '/febri-hasan.png',
    institution: 'Beekoding & Akar Inti Teknologi',
    bio: 'Pendidik & kurator asesmen bakat digital anak dengan pengalaman 12+ tahun dalam inovasi edutech.',
    notificationsEnabled: true,
    leadAlertsEnabled: true,
    soundEnabled: true,
    language: 'id',
    twoFactorEnabled: false,
    lastLoginAt: new Date().toISOString(),
  };
}

export function updateAdminProfile(updates: Partial<AdminUser>): AdminUser {
  const current = getAdminProfile();
  const updated: AdminUser = {
    ...current,
    ...updates,
  };
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    // Synchronize to current active system user
    const curUser = getCurrentSystemUser();
    saveSystemUser({
      ...curUser,
      name: updates.name || curUser.name,
      email: updates.email || curUser.email,
      phone: updates.phone || curUser.phone,
      avatar: updates.avatar || curUser.avatar,
      bio: updates.bio || curUser.bio,
      institution: updates.institution || curUser.institution,
    });
    pushSettingsToSupabase(updated).catch(() => {});
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
  return updated;
}

export function getAdminUser(): AdminUser | null {
  if (!isAdminAuthenticated()) return null;
  return getAdminProfile();
}

export function loginAdmin(
  email: string,
  password: string
): { success: boolean; error?: string; user?: SystemUser } {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { success: false, error: 'Silakan isi email dan password.' };
  }

  const users = getSystemUsers();
  const matchedUser = users.find(
    (u) =>
      u.email.toLowerCase() === trimmedEmail ||
      (trimmedEmail === 'admin' && u.email === DEFAULT_ADMIN_EMAIL) ||
      (trimmedEmail === 'mentor' && u.email === 'mentor@beekoding.id') ||
      (trimmedEmail === 'konselor' && u.email === 'konselor@beekoding.id')
  );

  const creds = getAdminCredentials();
  const isDefaultAdminMatch =
    (trimmedEmail === creds.email.toLowerCase() ||
      trimmedEmail === DEFAULT_ADMIN_EMAIL ||
      trimmedEmail === 'admin') &&
    (trimmedPassword === creds.passwordHash || trimmedPassword === DEFAULT_ADMIN_PASSWORD);

  if (matchedUser) {
    if (matchedUser.passwordHash !== trimmedPassword && !isDefaultAdminMatch) {
      return { success: false, error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.' };
    }
    if (matchedUser.status !== 'active') {
      return {
        success: false,
        error: 'Akun Anda sedang dinonaktifkan. Silakan hubungi Administrator.',
      };
    }

    localStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify({
        isLoggedIn: true,
        email: matchedUser.email,
        userId: matchedUser.id,
        role: matchedUser.role,
        loggedInAt: new Date().toISOString(),
      })
    );

    matchedUser.lastLoginAt = new Date().toISOString();
    saveSystemUsers(users);

    try {
      logAdminActivity({
        module: 'auth',
        actionType: 'login',
        title: 'Autentikasi Pengguna Berhasil',
        description: `Pengguna ${matchedUser.name} (${matchedUser.roleTitle}) berhasil masuk.`,
        severity: 'info',
        metadata: { email: matchedUser.email, role: matchedUser.role },
      });
    } catch {}

    return { success: true, user: matchedUser };
  }

  if (isDefaultAdminMatch) {
    const adminUser = users.find((u) => u.role === 'administrator') || DEFAULT_SYSTEM_USERS[0];
    localStorage.setItem(
      STORAGE_KEYS.AUTH,
      JSON.stringify({
        isLoggedIn: true,
        email: creds.email,
        userId: adminUser.id,
        role: 'administrator',
        loggedInAt: new Date().toISOString(),
      })
    );
    return { success: true, user: adminUser };
  }

  try {
    logAdminActivity({
      module: 'auth',
      actionType: 'login',
      title: 'Percobaan Login Gagal',
      description: `Percobaan masuk gagal menggunakan email "${trimmedEmail}".`,
      severity: 'warning',
      metadata: { attemptedEmail: trimmedEmail },
    });
  } catch {}

  return {
    success: false,
    error: 'Email atau kata sandi tidak cocok. Silakan periksa kembali akun Anda.',
  };
}

export function logoutAdmin(): void {
  try {
    const profile = getAdminProfile();
    try {
      logAdminActivity({
        module: 'auth',
        actionType: 'logout',
        title: 'Administrator Logout',
        description: `Admin ${profile.name || 'Febri Hasan'} keluar dari sesi dashboard.`,
        severity: 'info',
      });
    } catch {}
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  } catch (err) {
    console.error('Failed to logout:', err);
  }
}

// ==========================================
// 6. EKSPOR & BACKUP SISTEM DATABASE LENGKAP
// ==========================================

export function exportFullSystemBackupJSON(): void {
  try {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      profile: getAdminProfile(),
      submissions: getSubmissions(),
      inquiries: getInquiries(),
      questions: getAllQuestions(),
      batches: getBatches(),
      templates: getWhatsAppTemplates(),
      transactions: getTransactions(),
      certificates: getCertificates(),
      projects: getStudentProjects(),
      testimonials: getParentTestimonials(),
      curriculum: getCurriculumSessions(),
      instructors: getInstructors(),
      attendance: getAttendanceRecords(),
      reports: getAcademicReports(),
      vouchers: getPromoVouchers(),
      quests: getCodingQuests(),
      badges: getAchievementBadges(),
      gamification: getGamificationProfiles(),
      announcements: getClassAnnouncements(),
      payroll: getInstructorPayrolls(),
      resources: getLearningResources(),
      events: getCodingEvents(),
      counseling: getCounselingSessions(),
      auditLogs: getAuditLogs(),
      quizzes: getQuizExams(),
      quizAttempts: getQuizAttempts(),
      ambassadors: getAmbassadors(),
      referrals: getReferralRecords(),
      systemUsers: getSystemUsers(),
      gatewayConfig: getGatewayConfig(),
      gatewayQueue: getQueuedMessages(),
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('download', `beekoding_full_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    try {
      logAdminActivity({
        module: 'settings',
        actionType: 'backup',
        title: 'Pencadangan Sistem JSON Berhasil',
        description: `Berkas cadangan penuh sistem berhasil diunduh (beekoding_full_backup_${dateStr}.json).`,
        severity: 'warning',
      });
    } catch {}
  } catch (err) {
    console.error('Failed to export system backup:', err);
  }
}

// ==========================================
// 6B. GENERATOR & EKSPOR QUERY MIGRASI SQL LENGKAP
// ==========================================

function escapeSqlValue(val: unknown): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return isNaN(val) ? '0' : String(val);
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
  }
  return `'${String(val).replace(/'/g, "''").replace(/\\/g, '\\\\')}'`;
}

function buildSqlInsertStatements(tableName: string, columns: string[], rows: unknown[][]): string {
  if (!rows || rows.length === 0) return '';
  const lines: string[] = [];
  lines.push(`-- Data untuk tabel ${tableName} (${rows.length} baris)`);
  for (const row of rows) {
    const formatted = row.map(escapeSqlValue).join(', ');
    lines.push(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${formatted});`);
  }
  return lines.join('\n') + '\n\n';
}

export type SqlDialect = 'mysql' | 'postgresql';

export function generateFullSystemMigrationSQL(dialect: SqlDialect = 'postgresql'): string {
  const isPostgres = dialect === 'postgresql';
  const profile = getAdminProfile();
  const submissions = getSubmissions();
  const inquiries = getInquiries();
  const batches = getBatches();
  const templates = getWhatsAppTemplates();
  const transactions = getTransactions();
  const certificates = getCertificates();
  const projects = getStudentProjects();
  const testimonials = getParentTestimonials();
  const curriculum = getCurriculumSessions();
  const instructors = getInstructors();
  const attendance = getAttendanceRecords();
  const reports = getAcademicReports();
  const vouchers = getPromoVouchers();
  const quests = getCodingQuests();
  const badges = getAchievementBadges();
  const gamification = getGamificationProfiles();
  const announcements = getClassAnnouncements();
  const payroll = getInstructorPayrolls();
  const resources = getLearningResources();
  const events = getCodingEvents();
  const counseling = getCounselingSessions();
  const auditLogs = getAuditLogs();
  const quizzes = getQuizExams();
  const quizAttempts = getQuizAttempts();
  const ambassadors = getAmbassadors();
  const referrals = getReferralRecords();
  const systemUsers = getSystemUsers();
  const gatewayConfig = getGatewayConfig();
  const gatewayQueue = getQueuedMessages();
  const allQuestionsMap = getAllQuestions();

  const flatQuestions: TalentQuestion[] = [
    ...(allQuestionsMap.junior || []),
    ...(allQuestionsMap.middle || []),
    ...(allQuestionsMap.teens || []),
  ];

  let sql = `-- =============================================================================
-- BEEKODING DATABASE MIGRATION SCRIPT (LIVE EXPORT)
-- Exported At: ${new Date().toISOString()}
-- Database Engine: ${isPostgres ? 'PostgreSQL 12+ / Supabase / Neon / pgAdmin / DBeaver' : 'MySQL 8.0+ / MariaDB / phpMyAdmin'}
-- Total Entities: 33 Relational Tables + Views
-- =============================================================================

${isPostgres ? "SET session_replication_role = 'replica';" : 'SET FOREIGN_KEY_CHECKS = 0;'}

-- -----------------------------------------------------------------------------
-- PEMBERSIHAN TABEL LAMA JIKA ADA (DROP EXISTING TABLES)
-- -----------------------------------------------------------------------------
DROP VIEW IF EXISTS v_dashboard_kpis CASCADE;
DROP TABLE IF EXISTS whatsapp_queued_messages CASCADE;
DROP TABLE IF EXISTS whatsapp_gateway_config CASCADE;
DROP TABLE IF EXISTS class_announcements CASCADE;
DROP TABLE IF EXISTS whatsapp_templates CASCADE;
DROP TABLE IF EXISTS referral_records CASCADE;
DROP TABLE IF EXISTS referral_ambassadors CASCADE;
DROP TABLE IF EXISTS instructor_payrolls CASCADE;
DROP TABLE IF EXISTS promo_vouchers CASCADE;
DROP TABLE IF EXISTS financial_transactions CASCADE;
DROP TABLE IF EXISTS parent_testimonials CASCADE;
DROP TABLE IF EXISTS student_projects CASCADE;
DROP TABLE IF EXISTS student_certificates CASCADE;
DROP TABLE IF EXISTS student_gamification CASCADE;
DROP TABLE IF EXISTS achievement_badges CASCADE;
DROP TABLE IF EXISTS student_quiz_attempts CASCADE;
DROP TABLE IF EXISTS quiz_exams CASCADE;
DROP TABLE IF EXISTS quest_submissions CASCADE;
DROP TABLE IF EXISTS coding_quests CASCADE;
DROP TABLE IF EXISTS academic_reports CASCADE;
DROP TABLE IF EXISTS learning_resources CASCADE;
DROP TABLE IF EXISTS curriculum_modules CASCADE;
DROP TABLE IF EXISTS class_attendance CASCADE;
DROP TABLE IF EXISTS class_batches CASCADE;
DROP TABLE IF EXISTS instructors CASCADE;
DROP TABLE IF EXISTS counseling_sessions CASCADE;
DROP TABLE IF EXISTS coding_events CASCADE;
DROP TABLE IF EXISTS consultation_inquiries CASCADE;
DROP TABLE IF EXISTS students_submissions CASCADE;
DROP TABLE IF EXISTS question_bank CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS system_users CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;

-- -----------------------------------------------------------------------------
-- STRUKTUR TABEL BASIS DATA (DDL)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS system_settings (
    id VARCHAR(50) PRIMARY KEY,
    institution_name VARCHAR(150) NOT NULL DEFAULT 'Beekoding Academy',
    tagline VARCHAR(255) DEFAULT 'Coding for Kids & Teens',
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address TEXT,
    logo_url TEXT,
    website_url VARCHAR(255),
    currency VARCHAR(10) DEFAULT 'IDR',
    academic_year VARCHAR(20) DEFAULT '2026/2027',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    lead_alerts_enabled BOOLEAN DEFAULT TRUE,
    sound_enabled BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    system_config_json LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS system_users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'administrator',
    role_title VARCHAR(100) NOT NULL DEFAULT 'Administrator Sistem',
    phone VARCHAR(30),
    avatar TEXT,
    institution VARCHAR(150),
    bio TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    allowed_tabs_json LONGTEXT,
    password_hash VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    user_name VARCHAR(120),
    user_role VARCHAR(50),
    module VARCHAR(50) NOT NULL,
    action_type VARCHAR(30) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45) DEFAULT '127.0.0.1',
    severity VARCHAR(20) DEFAULT 'info',
    metadata_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS question_bank (
    id VARCHAR(50) PRIMARY KEY,
    tier VARCHAR(20) NOT NULL,
    category VARCHAR(50) NOT NULL,
    section_number INT NOT NULL DEFAULT 1,
    question_number INT NOT NULL DEFAULT 1,
    prompt TEXT NOT NULL,
    visual_hint VARCHAR(100),
    options_json LONGTEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students_submissions (
    id VARCHAR(50) PRIMARY KEY,
    child_name VARCHAR(120) NOT NULL,
    child_age INT NOT NULL,
    grade_level VARCHAR(50),
    parent_name VARCHAR(120) NOT NULL,
    parent_phone VARCHAR(30) NOT NULL,
    parent_email VARCHAR(100),
    tier VARCHAR(20) NOT NULL,
    total_score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    scores_json LONGTEXT NOT NULL,
    top_strengths_json LONGTEXT,
    growth_areas_json LONGTEXT,
    recommended_program_name VARCHAR(150),
    recommended_program_level VARCHAR(50),
    recommended_program_desc TEXT,
    answers_json LONGTEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'baru',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consultation_inquiries (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(30) NOT NULL DEFAULT 'konsultasi',
    name VARCHAR(120) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    role VARCHAR(50) DEFAULT 'Orang Tua',
    program VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'baru',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coding_events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'trial_class',
    age_group VARCHAR(50) NOT NULL,
    event_date DATE NOT NULL,
    event_time VARCHAR(50) NOT NULL,
    location_type VARCHAR(20) NOT NULL DEFAULT 'online',
    location_or_link TEXT,
    instructor_name VARCHAR(120),
    quota INT NOT NULL DEFAULT 20,
    registered_count INT NOT NULL DEFAULT 0,
    price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    is_free BOOLEAN DEFAULT TRUE,
    description TEXT,
    tags_json LONGTEXT,
    participants_json LONGTEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS counseling_sessions (
    id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(120) NOT NULL,
    parent_name VARCHAR(120) NOT NULL,
    parent_phone VARCHAR(30) NOT NULL,
    counselor_name VARCHAR(120) NOT NULL,
    session_date DATE NOT NULL,
    session_time VARCHAR(50) NOT NULL,
    duration_minutes INT DEFAULT 45,
    meeting_link TEXT,
    topic VARCHAR(150) NOT NULL,
    student_concern TEXT,
    action_plan TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS instructors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(30),
    avatar TEXT,
    bio TEXT,
    specialization VARCHAR(150) NOT NULL,
    skills_json LONGTEXT,
    hourly_rate DECIMAL(12,2) NOT NULL DEFAULT 75000.00,
    active_batches_count INT DEFAULT 0,
    total_teaching_hours INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.90,
    status VARCHAR(20) DEFAULT 'active',
    joined_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS class_batches (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    level VARCHAR(50) DEFAULT 'Junior Explorer',
    age_tier VARCHAR(30) DEFAULT 'junior',
    schedule_day VARCHAR(50) DEFAULT 'Sabtu, Minggu',
    schedule_time VARCHAR(50) DEFAULT '09:00 - 10:30 WIB',
    instructor_id VARCHAR(50),
    instructor_name VARCHAR(120) DEFAULT 'Kak Febri Hasan',
    quota INT NOT NULL DEFAULT 8,
    enrolled_count INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'ongoing',
    meet_url TEXT,
    session_dates_json LONGTEXT,
    enrolled_students_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS class_attendance (
    id VARCHAR(50) PRIMARY KEY,
    batch_id VARCHAR(50) NOT NULL,
    batch_name VARCHAR(150) NOT NULL,
    session_number INT NOT NULL DEFAULT 1,
    session_date DATE NOT NULL,
    instructor_id VARCHAR(50),
    instructor_name VARCHAR(120) NOT NULL,
    topic VARCHAR(200) NOT NULL,
    notes TEXT,
    students_attendance_json LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS curriculum_modules (
    id VARCHAR(50) PRIMARY KEY,
    level VARCHAR(50) NOT NULL,
    level_title VARCHAR(100) NOT NULL,
    target_age VARCHAR(50) NOT NULL,
    duration_info VARCHAR(100) DEFAULT '12 Sesi (3 Bulan)',
    description TEXT,
    prerequisites VARCHAR(255),
    competencies_json LONGTEXT,
    sessions_plan_json LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_resources (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    file_size VARCHAR(20),
    download_url TEXT NOT NULL,
    description TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    tags_json LONGTEXT,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS academic_reports (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    batch_id VARCHAR(50) NOT NULL,
    batch_name VARCHAR(150) NOT NULL,
    level VARCHAR(50) NOT NULL,
    instructor_name VARCHAR(120) NOT NULL,
    period VARCHAR(50) NOT NULL,
    attendance_rate INT NOT NULL DEFAULT 100,
    logic_score INT NOT NULL DEFAULT 85,
    creativity_score INT NOT NULL DEFAULT 88,
    problem_solving_score INT NOT NULL DEFAULT 84,
    presentation_score INT NOT NULL DEFAULT 90,
    overall_grade VARCHAR(5) NOT NULL DEFAULT 'A',
    teacher_notes TEXT,
    project_title VARCHAR(200),
    project_url TEXT,
    report_file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coding_quests (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    xp_reward INT NOT NULL DEFAULT 250,
    badge_reward VARCHAR(100),
    deadline DATE,
    description TEXT NOT NULL,
    requirements_json LONGTEXT,
    starter_code_url TEXT,
    submissions_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_exams (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    target_age VARCHAR(50),
    duration_minutes INT DEFAULT 20,
    passing_score INT DEFAULT 70,
    xp_reward INT DEFAULT 150,
    total_questions INT DEFAULT 5,
    questions_json LONGTEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_quiz_attempts (
    id VARCHAR(50) PRIMARY KEY,
    quiz_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50),
    student_name VARCHAR(120) NOT NULL,
    score INT NOT NULL DEFAULT 0,
    passed BOOLEAN NOT NULL DEFAULT TRUE,
    xp_earned INT DEFAULT 0,
    answers_json LONGTEXT,
    time_spent_seconds INT DEFAULT 0,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievement_badges (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    xp_value INT DEFAULT 100,
    category VARCHAR(50) DEFAULT 'general',
    criteria_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_gamification (
    student_id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(120) NOT NULL,
    total_xp INT NOT NULL DEFAULT 0,
    current_level INT NOT NULL DEFAULT 1,
    streak_days INT NOT NULL DEFAULT 0,
    quests_completed INT NOT NULL DEFAULT 0,
    badges_earned_json LONGTEXT,
    last_activity_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_certificates (
    id VARCHAR(50) PRIMARY KEY,
    certificate_number VARCHAR(100) NOT NULL UNIQUE,
    student_id VARCHAR(50),
    student_name VARCHAR(120) NOT NULL,
    course_name VARCHAR(150) NOT NULL,
    level VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    instructor_name VARCHAR(120) NOT NULL,
    verification_code VARCHAR(50) NOT NULL UNIQUE,
    qr_code_url TEXT,
    pdf_url TEXT,
    status VARCHAR(20) DEFAULT 'valid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS student_projects (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50),
    student_name VARCHAR(120) NOT NULL,
    age INT,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(50) NOT NULL,
    thumbnail_url TEXT,
    project_url TEXT NOT NULL,
    description TEXT,
    tags_json LONGTEXT,
    likes_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    parent_reviews_json LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS parent_testimonials (
    id VARCHAR(50) PRIMARY KEY,
    parent_name VARCHAR(120) NOT NULL,
    child_name VARCHAR(120) NOT NULL,
    role_or_city VARCHAR(100),
    avatar TEXT,
    content TEXT NOT NULL,
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS financial_transactions (
    id VARCHAR(50) PRIMARY KEY,
    invoice_number VARCHAR(100) NOT NULL UNIQUE,
    student_name VARCHAR(120) NOT NULL,
    parent_name VARCHAR(120) NOT NULL,
    parent_phone VARCHAR(30) NOT NULL,
    batch_name VARCHAR(150),
    program_name VARCHAR(150) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    discount_amount DECIMAL(12,2) DEFAULT 0.00,
    total_paid DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'Transfer Bank BCA',
    payment_status VARCHAR(30) NOT NULL DEFAULT 'unpaid',
    due_date DATE NOT NULL,
    paid_at TIMESTAMP NULL,
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promo_vouchers (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    discount_type VARCHAR(20) NOT NULL DEFAULT 'nominal',
    discount_value DECIMAL(12,2) NOT NULL,
    min_transaction DECIMAL(12,2) DEFAULT 0.00,
    max_discount DECIMAL(12,2),
    usage_limit INT DEFAULT 100,
    times_used INT DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS instructor_payrolls (
    id VARCHAR(50) PRIMARY KEY,
    slip_number VARCHAR(100) NOT NULL UNIQUE,
    instructor_id VARCHAR(50) NOT NULL,
    instructor_name VARCHAR(120) NOT NULL,
    period_month INT NOT NULL,
    period_year INT NOT NULL,
    total_sessions INT NOT NULL DEFAULT 0,
    total_hours DECIMAL(6,2) NOT NULL DEFAULT 0.00,
    rate_per_hour DECIMAL(12,2) NOT NULL,
    base_salary DECIMAL(12,2) NOT NULL,
    bonus DECIMAL(12,2) DEFAULT 0.00,
    deductions DECIMAL(12,2) DEFAULT 0.00,
    total_net_salary DECIMAL(12,2) NOT NULL,
    payment_status VARCHAR(30) DEFAULT 'pending',
    paid_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referral_ambassadors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    referral_code VARCHAR(50) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'Wali Murid',
    tier VARCHAR(20) DEFAULT 'bronze',
    total_referrals INT DEFAULT 0,
    successful_enrollments INT DEFAULT 0,
    pending_rewards DECIMAL(12,2) DEFAULT 0.00,
    paid_rewards DECIMAL(12,2) DEFAULT 0.00,
    bee_xp_earned INT DEFAULT 0,
    joined_date DATE,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS referral_records (
    id VARCHAR(50) PRIMARY KEY,
    ambassador_id VARCHAR(50) NOT NULL,
    ambassador_name VARCHAR(120) NOT NULL,
    referral_code VARCHAR(50) NOT NULL,
    referred_student_name VARCHAR(120) NOT NULL,
    referred_parent_name VARCHAR(120) NOT NULL,
    referred_phone VARCHAR(30) NOT NULL,
    target_program VARCHAR(150),
    status VARCHAR(30) DEFAULT 'registered',
    discount_applied DECIMAL(12,2) DEFAULT 150000.00,
    reward_amount DECIMAL(12,2) DEFAULT 150000.00,
    bee_xp_awarded INT DEFAULT 500,
    reward_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_templates (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    trigger_type VARCHAR(50),
    message_body TEXT NOT NULL,
    variables_json LONGTEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS class_announcements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    target_audience VARCHAR(50) NOT NULL,
    target_batch_id VARCHAR(50),
    content TEXT NOT NULL,
    channels_json LONGTEXT,
    send_status VARCHAR(20) DEFAULT 'draft',
    sent_at TIMESTAMP NULL,
    created_by VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_gateway_config (
    id VARCHAR(50) PRIMARY KEY,
    provider VARCHAR(50) NOT NULL DEFAULT 'sandbox_simulator',
    device_number VARCHAR(30) NOT NULL DEFAULT '+62 853-1131-7127',
    device_name VARCHAR(100) NOT NULL DEFAULT 'Beekoding Official Bot',
    api_key_or_token TEXT,
    webhook_url TEXT,
    anti_spam_delay_seconds INT DEFAULT 3,
    daily_quota INT DEFAULT 500,
    quota_used_today INT DEFAULT 0,
    is_connected BOOLEAN DEFAULT TRUE,
    is_automation_active BOOLEAN DEFAULT TRUE,
    active_triggers_json LONGTEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whatsapp_queued_messages (
    id VARCHAR(50) PRIMARY KEY,
    recipient_phone VARCHAR(30) NOT NULL,
    recipient_name VARCHAR(120) NOT NULL,
    recipient_role VARCHAR(30) DEFAULT 'parent',
    trigger_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending',
    retry_count INT DEFAULT 0,
    last_error TEXT,
    scheduled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    related_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- DATA AKTIF SISTEM SAAT INI (DML INSERTS)
-- -----------------------------------------------------------------------------
`;

  // System Settings
  sql += buildSqlInsertStatements('system_settings', [
    'id', 'institution_name', 'tagline', 'email', 'phone', 'address', 'logo_url', 'website_url', 'currency', 'notifications_enabled', 'lead_alerts_enabled', 'sound_enabled', 'two_factor_enabled', 'system_config_json'
  ], [[
    'setting-01',
    profile.institution || 'Beekoding Academy Indonesia',
    profile.bio || 'Platform Belajar Koding Berbasis Bakat Anak',
    profile.email || 'halo@beekoding.com',
    profile.phone || '+62 853-1131-7127',
    'Gedung Beekoding EduHub Lt. 3, Jakarta Selatan',
    profile.avatar || '/bee-mascot.png',
    'https://beekoding.com',
    'IDR',
    profile.notificationsEnabled ?? true,
    profile.leadAlertsEnabled ?? true,
    profile.soundEnabled ?? true,
    profile.twoFactorEnabled ?? false,
    { theme: 'dark', autoReminder: true }
  ]]);

  // System Users
  if (systemUsers.length > 0) {
    sql += buildSqlInsertStatements('system_users', [
      'id', 'name', 'email', 'role', 'role_title', 'phone', 'avatar', 'institution', 'bio', 'status', 'allowed_tabs_json', 'password_hash'
    ], systemUsers.map((u) => [
      u.id, u.name, u.email, u.role, u.roleTitle, u.phone || null, u.avatar || null, u.institution || null, u.bio || null, u.status, u.allowedTabs, u.passwordHash
    ]));
  }

  // Instructors
  if (instructors.length > 0) {
    sql += buildSqlInsertStatements('instructors', [
      'id', 'name', 'email', 'phone', 'avatar', 'bio', 'specialization', 'skills_json', 'hourly_rate', 'active_batches_count', 'total_teaching_hours', 'rating', 'status', 'joined_date'
    ], instructors.map((i: any) => [
      i.id, i.name, i.email, i.phone || null, i.avatar || i.photoUrl || null, i.bio || null, i.specialization || (Array.isArray(i.specializations) ? i.specializations.join(', ') : ''), i.skills || i.specializations || [], i.hourlyRate || i.baseHourlyRate || 0, i.activeBatchesCount || 0, i.totalTeachingHours || i.totalHoursTaught || 0, i.rating || 5.0, i.status || 'active', i.joinedDate || i.joinedAt || i.createdAt || null
    ]));
  }

  // Question Bank
  if (flatQuestions.length > 0) {
    sql += buildSqlInsertStatements('question_bank', [
      'id', 'tier', 'category', 'section_number', 'question_number', 'prompt', 'visual_hint', 'options_json', 'is_active'
    ], flatQuestions.map((q) => [
      q.id, q.tier, q.category, q.sectionNumber, q.questionNumber, q.prompt, q.visualHint || null, q.options, true
    ]));
  }

  // Submissions (Students)
  if (submissions.length > 0) {
    sql += buildSqlInsertStatements('students_submissions', [
      'id', 'child_name', 'child_age', 'grade_level', 'parent_name', 'parent_phone', 'parent_email', 'tier', 'total_score', 'scores_json', 'top_strengths_json', 'growth_areas_json', 'recommended_program_name', 'recommended_program_level', 'recommended_program_desc', 'answers_json', 'status', 'notes', 'created_at'
    ], submissions.map((s: any) => [
      s.id, s.profile.childName, s.profile.childAge, s.profile.gradeLevel || null, s.profile.parentName, s.profile.parentPhone, null, s.profile.tier, s.totalScore, s.scores, s.topStrengths, s.growthAreas, s.recommendedProgram?.name || s.recommendedProgram?.title || '', s.recommendedProgram?.level || '', s.recommendedProgram?.description || '', s.answers || null, s.status, s.notes || null, s.createdAt
    ]));
  }

  // Inquiries
  if (inquiries.length > 0) {
    sql += buildSqlInsertStatements('consultation_inquiries', [
      'id', 'type', 'name', 'email', 'phone', 'role', 'program', 'message', 'status', 'admin_notes', 'created_at'
    ], inquiries.map((iq) => [
      iq.id, iq.type, iq.name, iq.email, iq.phone, iq.role, iq.program, iq.message || null, iq.status, iq.adminNotes || null, iq.createdAt
    ]));
  }

  // Batches
  if (batches.length > 0) {
    sql += buildSqlInsertStatements('class_batches', [
      'id', 'name', 'level', 'age_tier', 'schedule_day', 'schedule_time', 'instructor_id', 'instructor_name', 'quota', 'enrolled_count', 'status', 'meet_url', 'session_dates_json', 'enrolled_students_json'
    ], batches.map((b: any) => [
      b.id,
      b.name,
      b.programType || b.level || 'Junior Explorer',
      b.tier || b.ageTier || 'junior',
      Array.isArray(b.scheduleDays) ? b.scheduleDays.join(', ') : (b.scheduleDay || 'Sabtu, Minggu'),
      b.scheduleTime || '09:00 - 10:30 WIB',
      b.instructorId || null,
      b.instructorName || 'Kak Febri Hasan',
      b.maxCapacity || b.quota || b.capacity || 8,
      b.enrolledCount || (Array.isArray(b.enrolledStudents) ? b.enrolledStudents.length : 0),
      b.status || 'upcoming',
      b.meetUrl || null,
      b.sessionDates || [],
      b.enrolledStudents || []
    ]));
  }

  // Transactions
  if (transactions.length > 0) {
    sql += buildSqlInsertStatements('financial_transactions', [
      'id', 'invoice_number', 'student_name', 'parent_name', 'parent_phone', 'batch_name', 'program_name', 'amount', 'discount_amount', 'total_paid', 'payment_method', 'payment_status', 'due_date', 'paid_at', 'receipt_url', 'notes', 'created_at'
    ], transactions.map((t: any) => [
      t.id, t.invoiceNumber, t.studentName, t.parentName, t.parentPhone, t.batchName || null, t.programName, t.totalAmount || t.amount || 0, t.discount || t.discountAmount || 0, t.paidAmount || t.totalPaid || 0, t.paymentMethod, t.status || t.paymentStatus || 'unpaid', t.dueDate, t.paidAt || null, t.receiptUrl || t.transferProofUrl || null, t.notes || null, t.createdAt
    ]));
  }

  // Events
  if (events.length > 0) {
    sql += buildSqlInsertStatements('coding_events', [
      'id', 'title', 'category', 'age_group', 'event_date', 'event_time', 'location_type', 'location_or_link', 'instructor_name', 'quota', 'registered_count', 'price', 'is_free', 'description', 'status'
    ], events.map((ev: any) => [
      ev.id,
      ev.title,
      ev.eventType || ev.category || ev.type || 'trial_class',
      ev.tier || ev.ageGroup || '7 - 12 Tahun',
      ev.date || ev.eventDate || '2026-06-01',
      ev.time || (ev.startTime ? `${ev.startTime} - ${ev.endTime || ''}` : '10:00 WIB'),
      ev.locationType || 'online',
      ev.locationOrLink || ev.meetingUrl || ev.locationDetail || null,
      ev.instructorName || null,
      ev.capacity || ev.quota || ev.maxParticipants || 20,
      ev.registeredCount || (Array.isArray(ev.registrations) ? ev.registrations.length : (Array.isArray(ev.participants) ? ev.participants.length : 0)),
      ev.price || 0,
      ev.isFree ?? (ev.price === 0),
      ev.description || null,
      ev.status || 'open'
    ]));
  }

  // Counseling Sessions
  if (counseling.length > 0) {
    sql += buildSqlInsertStatements('counseling_sessions', [
      'id', 'student_name', 'parent_name', 'parent_phone', 'counselor_name', 'session_date', 'session_time', 'duration_minutes', 'meeting_link', 'topic', 'student_concern', 'action_plan', 'status', 'notes'
    ], counseling.map((cs: any) => [
      cs.id,
      cs.studentName,
      cs.parentName,
      cs.parentPhone,
      cs.counselorName,
      cs.date || cs.sessionDate || '2026-03-01',
      cs.time || cs.sessionTime || '10:00 WIB',
      cs.durationMinutes || cs.duration || 45,
      cs.meetingLink || null,
      cs.topic || 'Evaluasi Belajar',
      cs.challengesFaced || cs.studentStrengths || cs.studentConcern || cs.summary || null,
      cs.actionPlan || cs.curriculumRecommendation || null,
      cs.status || 'scheduled',
      cs.internalNotes || cs.notes || cs.feedbackNotes || null
    ]));
  }

  // Attendance
  if (attendance.length > 0) {
    sql += buildSqlInsertStatements('class_attendance', [
      'id', 'batch_id', 'batch_name', 'session_number', 'session_date', 'instructor_id', 'instructor_name', 'topic', 'notes', 'students_attendance_json'
    ], attendance.map((at: any) => [
      at.id,
      at.batchId,
      at.batchName,
      at.sessionNumber || 1,
      at.date || at.sessionDate || '2026-03-01',
      at.instructorId || null,
      at.instructorName || 'Kak Febri Hasan',
      at.sessionTopic || at.topic || 'Sesi Koding',
      at.classNotes || at.notes || null,
      at.students || at.studentsAttendance || []
    ]));
  }

  // Curriculum Modules
  if (curriculum.length > 0) {
    sql += buildSqlInsertStatements('curriculum_modules', [
      'id', 'level', 'level_title', 'target_age', 'duration_info', 'description', 'prerequisites', 'competencies_json', 'sessions_plan_json'
    ], curriculum.map((cr: any) => [
      cr.id, cr.tier || cr.level || 'junior', cr.levelTitle || cr.title || 'Kurikulum Koding', cr.targetAge || '7-12 Tahun', cr.durationInfo || '12 Sesi', cr.description || null, cr.prerequisites || null, cr.competencies || [], cr.sessions || []
    ]));
  }

  // Learning Resources
  if (resources.length > 0) {
    sql += buildSqlInsertStatements('learning_resources', [
      'id', 'title', 'category', 'level', 'file_type', 'file_size', 'download_url', 'description', 'is_premium', 'tags_json', 'download_count'
    ], resources.map((lr: any) => [
      lr.id, lr.title, lr.category || 'worksheet', lr.tier || lr.level || 'junior', lr.fileType || lr.format || 'pdf', lr.fileSize || '1 MB', lr.downloadUrl || lr.url || '', lr.description || null, lr.isPremium ?? false, lr.tags || [], lr.downloadsCount || lr.downloadCount || 0
    ]));
  }

  // Academic Reports
  if (reports.length > 0) {
    sql += buildSqlInsertStatements('academic_reports', [
      'id', 'student_id', 'student_name', 'batch_id', 'batch_name', 'level', 'instructor_name', 'period', 'attendance_rate', 'logic_score', 'creativity_score', 'problem_solving_score', 'presentation_score', 'overall_grade', 'teacher_notes', 'project_title', 'project_url', 'report_file_url'
    ], reports.map((rp: any) => [
      rp.id, rp.studentId, rp.studentName, rp.batchId, rp.batchName, rp.tier || rp.level || 'junior', rp.instructorName, rp.period || rp.term || '2026', rp.attendanceRate || 100, rp.scores?.logical || rp.logicScore || 85, rp.scores?.creativity || rp.creativityScore || 85, rp.scores?.problemSolving || rp.problemSolvingScore || 85, rp.scores?.presentation || rp.presentationScore || 85, rp.finalGrade || rp.overallGrade || 'A', rp.teacherNotes || rp.notes || null, rp.projectTitle || null, rp.projectUrl || null, rp.reportFileUrl || null
    ]));
  }

  // Coding Quests
  if (quests.length > 0) {
    sql += buildSqlInsertStatements('coding_quests', [
      'id', 'title', 'category', 'level', 'xp_reward', 'badge_reward', 'deadline', 'description', 'requirements_json', 'starter_code_url', 'submissions_count', 'is_active'
    ], quests.map((qu: any) => [
      qu.id, qu.title, qu.tier || qu.category || 'logic', qu.tier || qu.level || 'junior', qu.xpReward || 250, qu.badgeRewardId || null, qu.deadline || null, qu.description || '', qu.requirements || [], qu.starterLink || null, qu.completedCount || qu.submissionsCount || 0, qu.status === 'active'
    ]));
  }

  // Achievement Badges
  if (badges.length > 0) {
    sql += buildSqlInsertStatements('achievement_badges', [
      'id', 'code', 'name', 'description', 'icon', 'xp_value', 'category', 'criteria_json'
    ], badges.map((bg: any) => [
      bg.id, bg.id, bg.title || bg.name, bg.description, bg.iconEmoji || bg.icon || '🏆', bg.xpBonus || bg.xpValue || 100, bg.category, bg.criteria || null
    ]));
  }

  // Gamification Profiles
  if (gamification.length > 0) {
    sql += buildSqlInsertStatements('student_gamification', [
      'student_id', 'student_name', 'total_xp', 'current_level', 'streak_days', 'quests_completed', 'badges_earned_json', 'last_activity_at'
    ], gamification.map((gm: any) => [
      gm.studentId, gm.studentName, gm.totalXp || 0, gm.level || gm.currentLevel || 1, gm.streakDays || 0, gm.completedQuestsCount || gm.questsCompleted || 0, gm.earnedBadges || gm.badgesEarned || [], gm.lastActiveDate || gm.lastActivityAt || null
    ]));
  }

  // Quizzes
  if (quizzes.length > 0) {
    sql += buildSqlInsertStatements('quiz_exams', [
      'id', 'title', 'category', 'level', 'target_age', 'duration_minutes', 'passing_score', 'xp_reward', 'total_questions', 'questions_json', 'is_active'
    ], quizzes.map((qz: any) => [
      qz.id, qz.title, qz.topic || 'logic', qz.tier || 'junior', qz.tier || 'junior', qz.durationMinutes || 15, qz.passingScore || 70, qz.xpReward || 150, qz.questions ? qz.questions.length : 5, qz.questions || [], qz.isActive ?? true
    ]));
  }

  // Quiz Attempts
  if (quizAttempts.length > 0) {
    sql += buildSqlInsertStatements('student_quiz_attempts', [
      'id', 'quiz_id', 'student_id', 'student_name', 'score', 'passed', 'xp_earned', 'answers_json', 'time_spent_seconds', 'completed_at'
    ], quizAttempts.map((qa: any) => [
      qa.id, qa.quizId, qa.studentName, qa.studentName, qa.score || 0, qa.passed ?? true, qa.xpEarned || 0, qa.answers || {}, 0, qa.completedAt || new Date().toISOString()
    ]));
  }

  // Certificates
  if (certificates.length > 0) {
    sql += buildSqlInsertStatements('student_certificates', [
      'id', 'certificate_number', 'student_id', 'student_name', 'course_name', 'level', 'issue_date', 'instructor_name', 'verification_code', 'qr_code_url', 'pdf_url', 'status'
    ], certificates.map((cf: any) => [
      cf.id, cf.certificateNumber, cf.studentName, cf.studentName, cf.programName, cf.honorsTitle || 'Kompeten', cf.issueDate, cf.instructorName, cf.verificationCode, null, null, 'valid'
    ]));
  }

  // Student Projects
  if (projects.length > 0) {
    sql += buildSqlInsertStatements('student_projects', [
      'id', 'student_id', 'student_name', 'age', 'title', 'category', 'level', 'thumbnail_url', 'project_url', 'description', 'tags_json', 'likes_count', 'is_featured'
    ], projects.map((pj: any) => [
      pj.id, pj.studentName, pj.studentName, pj.studentAge || null, pj.title, pj.platform || 'scratch', pj.programType || 'junior', pj.thumbnailEmojiOrUrl || null, pj.demoUrl || '', pj.description || '', pj.tags || [], pj.likesCount || 0, pj.isFeatured ?? false
    ]));
  }

  // Parent Testimonials
  if (testimonials.length > 0) {
    sql += buildSqlInsertStatements('parent_testimonials', [
      'id', 'parent_name', 'child_name', 'role_or_city', 'avatar', 'content', 'rating', 'is_featured'
    ], testimonials.map((tm: any) => [
      tm.id, tm.parentName, tm.childName, tm.roleOrProfession || null, tm.avatarEmojiOrUrl || null, tm.review || '', tm.rating || 5, tm.isFeatured ?? true
    ]));
  }

  // Vouchers
  if (vouchers.length > 0) {
    sql += buildSqlInsertStatements('promo_vouchers', [
      'id', 'code', 'title', 'discount_type', 'discount_value', 'min_transaction', 'max_discount', 'usage_limit', 'times_used', 'valid_from', 'valid_until', 'is_active'
    ], vouchers.map((vc: any) => [
      vc.id, vc.code, vc.title, vc.discountType, vc.discountValue, vc.minTransactionAmount || 0, vc.maxDiscountAmount || null, vc.usageLimit || 100, vc.usedCount || 0, vc.validFrom, vc.validUntil, vc.status === 'active'
    ]));
  }

  // Payroll
  if (payroll.length > 0) {
    sql += buildSqlInsertStatements('instructor_payrolls', [
      'id', 'slip_number', 'instructor_id', 'instructor_name', 'period_month', 'period_year', 'total_sessions', 'total_hours', 'rate_per_hour', 'base_salary', 'bonus', 'deductions', 'total_net_salary', 'payment_status', 'paid_at', 'notes'
    ], payroll.map((py: any) => [
      py.id, py.payrollNumber || py.id, py.instructorId, py.instructorName, 1, 2026, 0, py.teachingHours || 0, py.hourlyRate || 0, py.baseTeachingHonor || 0, py.performanceIncentive || 0, py.deductionsTotal || 0, py.netTotalAmount || 0, py.status || 'paid', py.paymentDate || null, py.notes || null
    ]));
  }

  // Ambassadors & Referrals
  if (ambassadors.length > 0) {
    sql += buildSqlInsertStatements('referral_ambassadors', [
      'id', 'name', 'phone', 'email', 'referral_code', 'role', 'tier', 'total_referrals', 'successful_enrollments', 'pending_rewards', 'paid_rewards', 'bee_xp_earned', 'joined_date', 'status'
    ], ambassadors.map((am: any) => [
      am.id, am.name, am.phone, am.email || null, am.referralCode, am.role, am.tier, am.totalReferrals || 0, am.successfulReferrals || 0, 0, am.totalEarningsRp || 0, am.totalBeeXp || 0, am.createdAt, am.isActive ? 'active' : 'inactive'
    ]));
  }

  if (referrals.length > 0) {
    sql += buildSqlInsertStatements('referral_records', [
      'id', 'ambassador_id', 'ambassador_name', 'referral_code', 'referred_student_name', 'referred_parent_name', 'referred_phone', 'target_program', 'status', 'discount_applied', 'reward_amount', 'bee_xp_awarded', 'reward_status'
    ], referrals.map((rf: any) => [
      rf.id, rf.ambassadorId, rf.ambassadorName, rf.ambassadorCode, rf.referredStudentName, rf.ambassadorName, rf.referredParentPhone, rf.targetCourse || null, rf.status, rf.discountForFriendRp || 150000, rf.rewardForAmbassadorRp || 150000, rf.rewardBeeXp || 500, rf.payoutStatus || 'pending'
    ]));
  }

  // WhatsApp Templates
  if (templates.length > 0) {
    sql += buildSqlInsertStatements('whatsapp_templates', [
      'id', 'title', 'category', 'trigger_type', 'message_body', 'variables_json', 'is_active'
    ], templates.map((wt: any) => [
      wt.id, wt.title, wt.category, null, wt.body, [], wt.isDefault ?? true
    ]));
  }

  // Announcements
  if (announcements.length > 0) {
    sql += buildSqlInsertStatements('class_announcements', [
      'id', 'title', 'target_audience', 'target_batch_id', 'content', 'channels_json', 'send_status', 'sent_at', 'created_by'
    ], announcements.map((an: any) => [
      an.id, an.title, an.audience, an.batchId || null, an.content, ['whatsapp'], an.status, an.publishedAt || null, an.authorName || null
    ]));
  }

  // Audit Logs
  if (auditLogs.length > 0) {
    sql += buildSqlInsertStatements('audit_logs', [
      'id', 'user_id', 'user_name', 'user_role', 'module', 'action_type', 'title', 'description', 'ip_address', 'severity', 'metadata_json', 'created_at'
    ], auditLogs.slice(0, 50).map((al: any) => [
      al.id, al.actorName, al.actorName, al.actorRole || null, al.module, al.actionType, al.title, al.description, al.ipAddress, al.severity, al.metadata || null, al.timestamp
    ]));
  }

  // WhatsApp Gateway Config & Queue
  sql += buildSqlInsertStatements('whatsapp_gateway_config', [
    'id', 'provider', 'device_number', 'device_name', 'api_key_or_token', 'anti_spam_delay_seconds', 'daily_quota', 'quota_used_today', 'is_connected', 'is_automation_active'
  ], [[
    'gw-cfg-01', gatewayConfig.provider, gatewayConfig.deviceNumber, gatewayConfig.deviceName, gatewayConfig.apiKeyOrToken || null, gatewayConfig.antiSpamDelaySeconds, gatewayConfig.dailyQuota, gatewayConfig.quotaUsedToday || 0, (gatewayConfig as any).status === 'connected', gatewayConfig.isAutomationActive
  ]]);

  if (gatewayQueue.length > 0) {
    sql += buildSqlInsertStatements('whatsapp_queued_messages', [
      'id', 'recipient_phone', 'recipient_name', 'recipient_role', 'trigger_type', 'content', 'status', 'retry_count', 'scheduled_at', 'sent_at', 'delivered_at', 'related_id', 'created_at'
    ], gatewayQueue.map((q: any) => [
      q.id, q.recipientPhone, q.recipientName, q.recipientRole, q.triggerType, q.content, q.status, q.retryCount, q.scheduledAt, q.sentAt || null, q.deliveredAt || null, null, q.createdAt
    ]));
  }

  // Analytical Views
  sql += `-- -----------------------------------------------------------------------------
-- ANALYTICAL VIEWS
-- -----------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_dashboard_kpis AS
SELECT
    (SELECT COUNT(*) FROM students_submissions) AS total_students_assessed,
    (SELECT COUNT(*) FROM students_submissions WHERE status = 'terdaftar') AS total_students_enrolled,
    (SELECT COUNT(*) FROM consultation_inquiries WHERE status = 'baru') AS pending_inquiries_count,
    (SELECT COUNT(*) FROM class_batches WHERE status = 'ongoing') AS active_batches_count,
    (SELECT COUNT(*) FROM instructors WHERE status = 'active') AS active_instructors_count,
    (SELECT COALESCE(SUM(total_paid), 0) FROM financial_transactions WHERE payment_status = 'paid') AS total_revenue_paid,
    (SELECT COALESCE(SUM(amount), 0) FROM financial_transactions WHERE payment_status = 'unpaid') AS total_unpaid_invoices,
    (SELECT COUNT(*) FROM whatsapp_queued_messages WHERE status = 'pending') AS pending_whatsapp_queue_count;

${isPostgres ? "SET session_replication_role = 'origin';" : 'SET FOREIGN_KEY_CHECKS = 1;'}
`;

  if (isPostgres) {
    sql = sql.replace(/LONGTEXT/g, 'TEXT');
    sql = sql.replace(/ ON UPDATE CURRENT_TIMESTAMP/g, '');
  }

  return sql;
}

export function exportFullSystemMigrationSQLFile(dialect: SqlDialect = 'postgresql'): void {
  try {
    const sqlContent = generateFullSystemMigrationSQL(dialect);
    const blob = new Blob([sqlContent], { type: 'text/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split('T')[0];
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `beekoding_${dialect}_migration_${dateStr}.sql`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);

    try {
      logAdminActivity({
        module: 'settings',
        actionType: 'export',
        title: 'Ekspor Berkas Migrasi SQL Penuh Berhasil',
        description: `Berkas skema dan dump SQL lengkap sistem berhasil diunduh (beekoding_full_migration_${dateStr}.sql).`,
        severity: 'info',
      });
    } catch {}
  } catch (err) {
    console.error('Failed to export system migration SQL:', err);
  }
}

export function resetEntireSystemToFactory(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CREDENTIALS);
    localStorage.removeItem(STORAGE_KEYS.BATCHES);
    localStorage.removeItem(STORAGE_KEYS.TEMPLATES);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(STORAGE_KEYS.CERTIFICATES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.CURRICULUM);
    localStorage.removeItem(STORAGE_KEYS.INSTRUCTORS);
    localStorage.removeItem(STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.VOUCHERS);
    localStorage.removeItem(STORAGE_KEYS.QUESTS);
    localStorage.removeItem(STORAGE_KEYS.BADGES);
    localStorage.removeItem(STORAGE_KEYS.GAMIFICATION);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.PAYROLL);
    localStorage.removeItem(STORAGE_KEYS.RESOURCES);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.COUNSELING);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.QUIZZES);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.AMBASSADORS);
    localStorage.removeItem(STORAGE_KEYS.REFERRALS);
    resetSubmissionsToDefault();
    resetQuestionsToDefault();
    resetInquiriesToDefault();
    resetBatchesToDefault();
    resetWhatsAppTemplatesToDefault();
    resetTransactionsToDefault();
    resetCertificatesToDefault();
    resetStudentProjectsToDefault();
    resetParentTestimonialsToDefault();
    resetCurriculumToDefault();
    resetInstructorsToDefault();
    resetAttendanceToDefault();
    resetAcademicReportsToDefault();
    resetPromoVouchersToDefault();
    resetCodingQuestsToDefault();
    resetAchievementBadgesToDefault();
    resetGamificationToDefault();
    resetClassAnnouncementsToDefault();
    resetInstructorPayrollsToDefault();
    resetLearningResourcesToDefault();
    resetEventsToDefault();
    resetCounselingToDefault();
    resetAuditLogsToDefault();
    resetQuizzesToDefault();
    resetAmbassadorsToDefault();
    resetReferralsToDefault();
  } catch (err) {
    console.error('Failed to factory reset:', err);
  }
}

// ==========================================
// 7. MANAJEMEN JADWAL & BATCH KELAS
// ==========================================

export const DEFAULT_BATCHES: ClassBatch[] = [
  {
    id: 'batch-2026-01',
    name: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    programType: 'Visual Scratch & AI Prompting',
    tier: 'junior',
    format: 'online',
    locationOrPlatform: 'Google Meet',
    meetUrl: 'https://meet.google.com/bee-koding-jun',
    startDate: '2026-06-06',
    endDate: '2026-06-28',
    scheduleDays: ['Sabtu', 'Minggu'],
    scheduleTime: '09:00 - 10:30 WIB',
    totalSessions: 8,
    maxCapacity: 8,
    enrolledStudents: [
      {
        id: 'stu-01',
        studentName: 'Kenzo Al-Fatih',
        parentName: 'Ibu Rahmawati',
        parentPhone: '+62 812-3456-7890',
        enrolledAt: '2026-05-15T09:00:00Z',
        source: 'assessment',
      },
      {
        id: 'stu-02',
        studentName: 'Alya Putri Kirana',
        parentName: 'Bapak Hendra',
        parentPhone: '+62 821-9876-5432',
        enrolledAt: '2026-05-16T14:30:00Z',
        source: 'inquiry',
      },
      {
        id: 'stu-03',
        studentName: 'M. Hafizh Pratama',
        parentName: 'Ibu Desi',
        parentPhone: '+62 856-4321-8765',
        enrolledAt: '2026-05-18T11:15:00Z',
        source: 'assessment',
      },
      {
        id: 'stu-04',
        studentName: 'Naura Salsabila',
        parentName: 'Bapak Budi Santoso',
        parentPhone: '+62 813-5555-1234',
        enrolledAt: '2026-05-20T16:00:00Z',
        source: 'assessment',
      },
      {
        id: 'stu-05',
        studentName: 'Rafa Daniswara',
        parentName: 'Ibu Lina Marlina',
        parentPhone: '+62 878-1122-3344',
        enrolledAt: '2026-05-22T10:20:00Z',
        source: 'manual',
      },
    ],
    instructorName: 'Kak Febri Hasan',
    price: 750000,
    status: 'upcoming',
    notes: 'Sesi perkenalan konsep computational thinking dengan blok visual Scratch dan prompt AI interaktif.',
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-22T10:20:00Z',
  },
  {
    id: 'batch-2026-02',
    name: 'Intermediate Coder: Python & Game Development (Batch 1)',
    programType: 'Python Basics & Pygame',
    tier: 'middle',
    format: 'hybrid',
    locationOrPlatform: 'Lab Beekoding & Zoom',
    meetUrl: 'https://meet.google.com/bee-py-middle',
    startDate: '2026-05-02',
    endDate: '2026-05-30',
    scheduleDays: ['Sabtu'],
    scheduleTime: '13:00 - 15:00 WIB',
    totalSessions: 8,
    maxCapacity: 8,
    enrolledStudents: [
      { id: 'stu-21', studentName: 'Fathan Al-Ghifari', parentName: 'Bapak Ilham', parentPhone: '+62 819-0011-2233', enrolledAt: '2026-04-20T08:00:00Z', source: 'assessment' },
      { id: 'stu-22', studentName: 'Zaskia Nur Azizah', parentName: 'Ibu Rina', parentPhone: '+62 812-7788-9900', enrolledAt: '2026-04-21T09:00:00Z', source: 'inquiry' },
      { id: 'stu-23', studentName: 'Bintang Ramadhan', parentName: 'Bapak Agung', parentPhone: '+62 857-4433-2211', enrolledAt: '2026-04-22T10:00:00Z', source: 'assessment' },
      { id: 'stu-24', studentName: 'Clarissa Aurelia', parentName: 'Ibu Fenny', parentPhone: '+62 811-2233-4455', enrolledAt: '2026-04-24T11:00:00Z', source: 'assessment' },
      { id: 'stu-25', studentName: 'Dimas Aditya', parentName: 'Bapak Bambang', parentPhone: '+62 813-8877-6655', enrolledAt: '2026-04-25T13:00:00Z', source: 'manual' },
      { id: 'stu-26', studentName: 'Felicia Anggraini', parentName: 'Ibu Maya', parentPhone: '+62 818-9988-7766', enrolledAt: '2026-04-26T14:00:00Z', source: 'inquiry' },
      { id: 'stu-27', studentName: 'Gibran Athariz', parentName: 'Bapak Farhan', parentPhone: '+62 852-1144-7788', enrolledAt: '2026-04-27T15:00:00Z', source: 'assessment' },
      { id: 'stu-28', studentName: 'Hanif Danendra', parentName: 'Ibu Dian', parentPhone: '+62 877-3322-1100', enrolledAt: '2026-04-28T16:00:00Z', source: 'assessment' },
    ],
    instructorName: 'Kak Febri Hasan',
    price: 950000,
    status: 'full',
    notes: 'Kelas intensif pembuatan game 2D arcade dan logika algoritma Python.',
    createdAt: '2026-04-10T09:00:00Z',
    updatedAt: '2026-04-28T16:00:00Z',
  },
  {
    id: 'batch-2026-03',
    name: 'Teens Innovator: Full-Stack Web & AI Agent (Batch 1)',
    programType: 'Web Development & AI Agent',
    tier: 'teens',
    format: 'online',
    locationOrPlatform: 'Google Meet',
    meetUrl: 'https://meet.google.com/bee-teens-web',
    startDate: '2026-06-16',
    endDate: '2026-07-09',
    scheduleDays: ['Selasa', 'Kamis'],
    scheduleTime: '16:00 - 17:30 WIB',
    totalSessions: 8,
    maxCapacity: 10,
    enrolledStudents: [
      { id: 'stu-31', studentName: 'Arkan Raihan', parentName: 'Bapak Danu', parentPhone: '+62 813-9090-8080', enrolledAt: '2026-05-18T10:00:00Z', source: 'inquiry' },
      { id: 'stu-32', studentName: 'Kezia Nathania', parentName: 'Ibu Veronica', parentPhone: '+62 812-4455-6677', enrolledAt: '2026-05-19T13:00:00Z', source: 'assessment' },
      { id: 'stu-33', studentName: 'Rayyan Maulana', parentName: 'Bapak Ahmad', parentPhone: '+62 856-1122-4433', enrolledAt: '2026-05-21T15:00:00Z', source: 'inquiry' },
    ],
    instructorName: 'Kak Febri Hasan',
    price: 1200000,
    status: 'upcoming',
    notes: 'Membangun portofolio website modern dan integrasi API AI (Gemini / Claude).',
    createdAt: '2026-05-10T10:00:00Z',
    updatedAt: '2026-05-21T15:00:00Z',
  },
  {
    id: 'batch-2026-04',
    name: 'Weekend Robotics & IoT Maker Playgroup (Percontohan)',
    programType: 'Micro:bit & Sensor IoT',
    tier: 'middle',
    format: 'offline',
    locationOrPlatform: 'Lab Robotika Beekoding',
    startDate: '2026-03-01',
    endDate: '2026-03-29',
    scheduleDays: ['Minggu'],
    scheduleTime: '10:00 - 12:00 WIB',
    totalSessions: 5,
    maxCapacity: 6,
    enrolledStudents: [
      { id: 'stu-41', studentName: 'Bumi Satria', parentName: 'Bapak Yudi', parentPhone: '+62 812-9900-1122', enrolledAt: '2026-02-20T10:00:00Z', source: 'manual' },
      { id: 'stu-42', studentName: 'Nadhira Kirana', parentName: 'Ibu Citra', parentPhone: '+62 813-7766-5544', enrolledAt: '2026-02-21T11:00:00Z', source: 'manual' },
      { id: 'stu-43', studentName: 'Taufiq Hidayatullah', parentName: 'Bapak Usman', parentPhone: '+62 857-1122-3344', enrolledAt: '2026-02-22T14:00:00Z', source: 'manual' },
    ],
    instructorName: 'Kak Febri Hasan',
    price: 850000,
    status: 'completed',
    notes: 'Batch offline perdana dengan kit Micro:bit dan sensor gerak/cahaya.',
    createdAt: '2026-02-15T08:00:00Z',
    updatedAt: '2026-03-29T13:00:00Z',
  },
];

export function getBatches(): ClassBatch[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BATCHES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(DEFAULT_BATCHES));
      return DEFAULT_BATCHES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_BATCHES;
  } catch (err) {
    console.error('Failed to load batches:', err);
    return DEFAULT_BATCHES;
  }
}

export function saveBatches(batches: ClassBatch[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
    emitStorageUpdate('batches');
  } catch (err) {
    console.error('Failed to save batches:', err);
  }
}

export function createBatch(
  data: Omit<ClassBatch, 'id' | 'createdAt' | 'updatedAt' | 'enrolledStudents'>
): ClassBatch {
  const batches = getBatches();
  const newId = `batch-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const newBatch: ClassBatch = {
    ...data,
    id: newId,
    enrolledStudents: [],
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newBatch, ...batches];
  saveBatches(updated);
  pushBatchToSupabase(newBatch).catch(() => {});
  emitStorageUpdate('batches');
  return newBatch;
}

export function updateBatch(id: string, updates: Partial<ClassBatch>): ClassBatch | null {
  const batches = getBatches();
  const index = batches.findIndex((b) => b.id === id);
  if (index === -1) return null;

  const current = batches[index];
  const updatedBatch: ClassBatch = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  // Auto-update status if capacity reached
  if (
    updatedBatch.status !== 'completed' &&
    updatedBatch.enrolledStudents.length >= updatedBatch.maxCapacity
  ) {
    updatedBatch.status = 'full';
  }

  batches[index] = updatedBatch;
  saveBatches(batches);
  pushBatchToSupabase(updatedBatch).catch(() => {});
  emitStorageUpdate('batches');
  return updatedBatch;
}

export function deleteBatch(id: string): boolean {
  const batches = getBatches();
  const filtered = batches.filter((b) => b.id !== id);
  if (filtered.length === batches.length) return false;
  saveBatches(filtered);
  deleteBatchFromSupabase(id).catch(() => {});
  emitStorageUpdate('batches');
  return true;
}

export function enrollStudentToBatch(
  batchId: string,
  student: {
    studentName: string;
    parentName?: string;
    parentPhone?: string;
    source?: 'assessment' | 'inquiry' | 'manual';
  }
): { success: boolean; error?: string; batch?: ClassBatch } {
  const batches = getBatches();
  const index = batches.findIndex((b) => b.id === batchId);
  if (index === -1) {
    return { success: false, error: 'Batch tidak ditemukan.' };
  }

  const batch = batches[index];
  if (batch.enrolledStudents.length >= batch.maxCapacity) {
    return { success: false, error: 'Kapasitas batch kelas ini sudah penuh.' };
  }

  const newStudentId = `stu-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
  const newStudent: EnrolledStudent = {
    id: newStudentId,
    studentName: student.studentName.trim(),
    parentName: student.parentName?.trim(),
    parentPhone: student.parentPhone?.trim(),
    enrolledAt: new Date().toISOString(),
    source: student.source || 'manual',
  };

  const updatedEnrolled = [...batch.enrolledStudents, newStudent];
  const newStatus: BatchStatus =
    updatedEnrolled.length >= batch.maxCapacity && batch.status !== 'completed'
      ? 'full'
      : batch.status;

  const updatedBatch: ClassBatch = {
    ...batch,
    enrolledStudents: updatedEnrolled,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  batches[index] = updatedBatch;
  saveBatches(batches);
  pushBatchToSupabase(updatedBatch).catch(() => {});
  emitStorageUpdate('batches');
  return { success: true, batch: updatedBatch };
}

export function removeStudentFromBatch(
  batchId: string,
  studentId: string
): { success: boolean; error?: string; batch?: ClassBatch } {
  const batches = getBatches();
  const index = batches.findIndex((b) => b.id === batchId);
  if (index === -1) {
    return { success: false, error: 'Batch tidak ditemukan.' };
  }

  const batch = batches[index];
  const filteredStudents = batch.enrolledStudents.filter((s) => s.id !== studentId);
  if (filteredStudents.length === batch.enrolledStudents.length) {
    return { success: false, error: 'Siswa tidak ditemukan dalam batch ini.' };
  }

  // If status was full, revert to upcoming or ongoing
  let newStatus = batch.status;
  if (batch.status === 'full') {
    newStatus = 'upcoming';
  }

  const updatedBatch: ClassBatch = {
    ...batch,
    enrolledStudents: filteredStudents,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };

  batches[index] = updatedBatch;
  saveBatches(batches);
  pushBatchToSupabase(updatedBatch).catch(() => {});
  emitStorageUpdate('batches');
  return { success: true, batch: updatedBatch };
}

export function resetBatchesToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(DEFAULT_BATCHES));
  } catch (err) {
    console.error('Failed to reset batches to default:', err);
  }
}

// ==========================================
// 8. MANAJEMEN TEMPLATE PESAN WHATSAPP & BROADCAST
// ==========================================

export const DEFAULT_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tpl-01',
    title: 'Follow-up Hasil Tes Bakat & Rekomendasi Modul',
    category: 'assessment_followup',
    description: 'Menyampaikan ucapan selamat atas hasil asesmen kognitif anak dan rekomendasi kelas yang cocok.',
    body: `Halo Ayah/Bunda {nama_ortu}! 🐝✨

Terima kasih telah mendampingi ananda *{nama_anak}* ({usia_anak} tahun) menyelesaikan *Diagnostic Test Bakat & Logika Digital Beekoding*.

Berdasarkan hasil tes, ananda meraih skor impresif *{skor_bakat}/100* dengan potensi kecerdasan paling menonjol pada pilar:
🌟 *{pilar_terkuat}*

Untuk mengoptimalkan bakat alaminya tersebut, tim kurikulum kami sangat merekomendasikan program:
📚 *{rekomendasi_modul}*

Apakah Ayah/Bunda berkenan berdiskusi singkat selama 10 menit via WhatsApp / panggilan telepon untuk membahas potensi ananda lebih lanjut?

Salam hangat,
*Kak Febri Hasan*
Founder & Lead Mentor Beekoding 🚀`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'tpl-02',
    title: 'Undangan Sesi Coba Gratis (Free Trial Class)',
    category: 'trial_invite',
    description: 'Mengundang calon murid mengikuti sesi uji coba kelas coding seru tanpa biaya.',
    body: `Halo Ayah/Bunda {nama_ortu}! 🐝🎉

Kabar gembira! Beekoding membuka sesi *FREE TRIAL CLASS Coding & AI Interaktif* khusus untuk ananda *{nama_anak}* ({usia_anak} tahun).

Di sesi 60 menit ini, ananda akan:
✨ Membuat game animasi pertamanya sendiri.
🤖 Berkenalan dengan asisten AI edukatif.
💡 Mengasah logika pemecahan masalah dengan visual Scratch.

📌 *Jadwal Trial:* {jadwal_kelas}
📍 *Format:* {format_kelas} ({link_meet})
🎟 *Biaya:* 100% GRATIS (Kuota terbatas 6 anak per sesi)

Boleh kami daftarkan ananda *{nama_anak}* untuk mengamankan 1 kursi di sesi ini, Ayah/Bunda? 😊💻`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'tpl-03',
    title: 'Pengingat Sesi Kelas H-1 & Link Meeting',
    category: 'class_reminder',
    description: 'Pengingat otomatis H-1 sebelum kelas dimulai beserta tautan Google Meet.',
    body: `*PENGINGAT KELAS BEEKODING BESOK!* ⏰🐝

Halo Ayah/Bunda {nama_ortu} dan ananda *{nama_anak}* yang hebat!

Mengingatkan kembali bahwa sesi kelas coding kita akan berlangsung besok:

📌 *Kelas:* {nama_batch}
📚 *Materi:* {rekomendasi_modul}
🗓 *Hari & Tanggal:* {jadwal_kelas}
⏰ *Jam:* {jam_kelas}
📍 *Tautan Online (Google Meet):* {link_meet}
👨‍🏫 *Instruktur:* {instruktur}

💡 *Persiapan Belajar:*
1. Gunakan Laptop/PC dengan browser Google Chrome terbaru.
2. Pastikan koneksi internet stabil dan headset/audio berfungsi baik.
3. Masuk ke ruang meeting 5–10 menit lebih awal.

Sampai jumpa di kelas besok! Mari berkarya bersama teknologi! 🚀✨`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'tpl-04',
    title: 'Instruksi Pembayaran & Konfirmasi Onboarding',
    category: 'payment_info',
    description: 'Rincian biaya kursus, nomor rekening resmi, dan langkah konfirmasi transfer.',
    body: `Halo Ayah/Bunda {nama_ortu}! 🐝💳

Terima kasih atas kepercayaannya mendaftarkan ananda *{nama_anak}* pada program:
📌 *{nama_batch}*

Berikut adalah rincian pembayaran biaya program:
💰 *Total Investasi:* {biaya}
🏦 *Rekening Resmi Beekoding:*
- Bank BCA: *123-456-7890* a.n. *Febri Hasan (Beekoding)*
- Bank Mandiri: *987-65-43210-1* a.n. *Beekoding Edukasi*
- Atau via QRIS resmi Beekoding

Setelah melakukan transfer, mohon kirimkan bukti pembayaran ke nomor ini ya Ayah/Bunda.

Kami akan langsung memproses pengiriman starter kit belajar, akun portal siswa, dan link kelas ananda. Terima kasih banyak! 🙏✨`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'tpl-05',
    title: 'Jadwal Konsultasi Kurikulum Privat dengan Founder',
    category: 'consultation',
    description: 'Konfirmasi jadwal sesi konsultasi kurikulum 1-on-1 dengan founder via video call / WA.',
    body: `Halo Ayah/Bunda {nama_ortu}! 🐝🤝

Kami telah menerima formulir permohonan konsultasi pendidikan ananda *{nama_anak}*.

Sesuai konfirmasi, sesi konsultasi kurikulum & minat bakat digital telah kami jadwalkan pada:
🗓 *Hari & Waktu:* {jadwal_kelas}
📍 *Media:* Google Meet / Video Call WA ({link_meet})
👨‍💻 *Bersama:* *Kak Febri Hasan* (Founder Beekoding)

Kami akan membahas roadmap belajar anak 6–12 bulan ke depan yang dipersonalisasi sesuai gaya belajar ananda.

Mohon konfirmasi jika jadwal di atas sudah sesuai ya, Ayah/Bunda. Terima kasih! 😊`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
  {
    id: 'tpl-06',
    title: 'Pengumuman Pembukaan Batch Baru (Early Bird)',
    category: 'batch_announcement',
    description: 'Broadcast pengumuman pembukaan batch kelas baru dengan promo potongan harga spesial.',
    body: `*PENDAFTARAN BATCH BARU BEEKODING RESMI DIBUKA!* 🚀🐝

Halo Ayah & Bunda pencinta inovasi!

Mempersiapkan anak menghadapi era kecerdasan buatan (AI) kini semakin seru dan menyenangkan. Beekoding resmi membuka pendaftaran:

📌 *{nama_batch}*
🎯 *Untuk Usia:* {usia_anak} Tahun
🗓 *Mulai Belajar:* {jadwal_kelas}
📍 *Format:* {format_kelas}
🎟 *Kuota Kelas:* Maksimal 8 Siswa per Rombel (Intensif & Interaktif)

🔥 *PROMO EARLY BIRD (Hemat Rp 150.000):*
Biaya khusus: *{biaya}* untuk 5 pendaftar tercepat minggu ini!

Amankan kursi ananda sekarang dengan membalas pesan ini:
👉 Ketik *"DAFTAR {nama_anak}"*

Mari bimbing ananda bukan sekadar menjadi konsumen gadget, melainkan pencipta teknologi masa depan! 💻✨`,
    isDefault: true,
    createdAt: '2026-05-01T08:00:00Z',
    updatedAt: '2026-05-01T08:00:00Z',
  },
];

export function getWhatsAppTemplates(): WhatsAppTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(DEFAULT_WHATSAPP_TEMPLATES));
      return DEFAULT_WHATSAPP_TEMPLATES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_WHATSAPP_TEMPLATES;
  } catch (err) {
    console.error('Failed to load templates:', err);
    return DEFAULT_WHATSAPP_TEMPLATES;
  }
}

export function saveWhatsAppTemplates(templates: WhatsAppTemplate[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
  } catch (err) {
    console.error('Failed to save templates:', err);
  }
}

export function createWhatsAppTemplate(
  data: Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'updatedAt'>
): WhatsAppTemplate {
  const templates = getWhatsAppTemplates();
  const newId = `tpl-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;
  const now = new Date().toISOString();

  const newTemplate: WhatsAppTemplate = {
    ...data,
    id: newId,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newTemplate, ...templates];
  saveWhatsAppTemplates(updated);
  return newTemplate;
}

export function updateWhatsAppTemplate(
  id: string,
  updates: Partial<WhatsAppTemplate>
): WhatsAppTemplate | null {
  const templates = getWhatsAppTemplates();
  const index = templates.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = templates[index];
  const updatedTemplate: WhatsAppTemplate = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  templates[index] = updatedTemplate;
  saveWhatsAppTemplates(templates);
  return updatedTemplate;
}

export function deleteWhatsAppTemplate(id: string): boolean {
  const templates = getWhatsAppTemplates();
  const filtered = templates.filter((t) => t.id !== id);
  if (filtered.length === templates.length) return false;
  saveWhatsAppTemplates(filtered);
  return true;
}

export function resetWhatsAppTemplatesToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(DEFAULT_WHATSAPP_TEMPLATES));
  } catch (err) {
    console.error('Failed to reset templates:', err);
  }
}

export function interpolateTemplate(
  body: string,
  variables: Record<string, string | number | undefined>
): string {
  let result = body;
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = new RegExp(`\\{${key}\\}`, 'g');
    result = result.replace(placeholder, value !== undefined && value !== null ? String(value) : '');
  }
  return result;
}

// ==========================================
// 9. MANAJEMEN TRANSAKSI & INVOICE PEMBAYARAN
// ==========================================

export const DEFAULT_TRANSACTIONS: TransactionRecord[] = [
  {
    id: 'tx-2026-001',
    invoiceNumber: 'INV/2026/06/001',
    studentName: 'Kenzo Alvaro Pratama',
    parentName: 'Bambang Pratama',
    parentPhone: '081234567890',
    parentEmail: 'bambang.pratama@gmail.com',
    programName: 'Junior Explorer: Visual Scratch & AI Logic',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    items: [
      {
        name: 'Bootcamp Junior Visual Scratch & AI Logic (8 Sesi)',
        description: 'Termasuk sertifikat, modul materi digital, & pendampingan instruktur',
        price: 1200000,
        qty: 1,
      },
    ],
    subtotal: 1200000,
    discount: 150000,
    discountCode: 'EARLYBIRD',
    totalAmount: 1050000,
    paidAmount: 1050000,
    remainingAmount: 0,
    paymentMethod: 'bca',
    status: 'paid',
    dueDate: '2026-06-03',
    paidAt: '2026-06-02T14:20:00.000Z',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-02T14:20:00.000Z',
    notes: 'Lunas via Transfer BCA. Konfirmasi bukti transfer valid.',
  },
  {
    id: 'tx-2026-002',
    invoiceNumber: 'INV/2026/06/002',
    studentName: 'Alya Zahra Kirana',
    parentName: 'Siti Nurhaliza',
    parentPhone: '081987654321',
    parentEmail: 'siti.nurhaliza@yahoo.com',
    programName: 'Middle Coder: Python & Game Dev Roblox',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder: Python Logic & Roblox Game (Batch 2)',
    items: [
      {
        name: 'Bootcamp Middle Python & Roblox Studio (10 Sesi)',
        description: 'Termasuk akses cloud code, modul project, & sertifikat',
        price: 1500000,
        qty: 1,
      },
    ],
    subtotal: 1500000,
    discount: 0,
    totalAmount: 1500000,
    paidAmount: 1500000,
    remainingAmount: 0,
    paymentMethod: 'mandiri',
    status: 'paid',
    dueDate: '2026-06-05',
    paidAt: '2026-06-04T10:15:00.000Z',
    createdAt: '2026-06-03T09:30:00.000Z',
    updatedAt: '2026-06-04T10:15:00.000Z',
    notes: 'Lunas via Transfer Mandiri Livin.',
  },
  {
    id: 'tx-2026-003',
    invoiceNumber: 'INV/2026/06/003',
    studentName: 'Rafi Danendra Putra',
    parentName: 'Hendra Gunawan',
    parentPhone: '082155554321',
    parentEmail: 'hendra.gunawan@techcorp.id',
    programName: 'Teens Innovator: Fullstack Web & App Developer',
    batchId: 'batch-2026-03',
    batchName: 'Teens Innovator: Web Development & Cloud App (Batch 1)',
    items: [
      {
        name: 'Bootcamp Teens Fullstack Web & Modern AI (12 Sesi)',
        description: 'Termasuk hosting web portofolio gratis 1 tahun & sertifikat kelulusan',
        price: 1850000,
        qty: 1,
      },
    ],
    subtotal: 1850000,
    discount: 200000,
    discountCode: 'BEASISWA-TOP',
    totalAmount: 1650000,
    paidAmount: 0,
    remainingAmount: 1650000,
    paymentMethod: 'bca',
    status: 'pending',
    dueDate: '2026-06-12',
    createdAt: '2026-06-10T11:00:00.000Z',
    updatedAt: '2026-06-10T11:00:00.000Z',
    notes: 'Menunggu transfer orang tua, invoice sudah dikirimkan via WA.',
  },
  {
    id: 'tx-2026-004',
    invoiceNumber: 'INV/2026/06/004',
    studentName: 'Nathania Putri Kusuma',
    parentName: 'Dewi Kusuma',
    parentPhone: '081377889900',
    parentEmail: 'dewi.kusuma@gmail.com',
    programName: 'Junior Explorer: Visual Scratch & AI Logic',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    items: [
      {
        name: 'Bootcamp Junior Visual Scratch & AI Logic (8 Sesi)',
        description: 'Termasuk sertifikat, modul materi digital, & pendampingan instruktur',
        price: 1200000,
        qty: 1,
      },
    ],
    subtotal: 1200000,
    discount: 100000,
    discountCode: 'SIBLING-PROMO',
    totalAmount: 1100000,
    paidAmount: 600000,
    remainingAmount: 500000,
    paymentMethod: 'qris',
    status: 'partial',
    dueDate: '2026-06-15',
    paidAt: '2026-06-05T16:00:00.000Z',
    createdAt: '2026-06-05T15:30:00.000Z',
    updatedAt: '2026-06-05T16:00:00.000Z',
    notes: 'Pembayaran DP 50% via QRIS. Pelunasan sisa Rp 500.000 dijadwalkan sebelum sesi ke-3.',
  },
  {
    id: 'tx-2026-005',
    invoiceNumber: 'INV/2026/06/005',
    studentName: 'Muhammad Fatih Rayyan',
    parentName: 'dr. Ridwan Rayyan',
    parentPhone: '085611223344',
    parentEmail: 'ridwan.rayyan@rs-sehat.co.id',
    programName: 'Middle Coder: Python & Game Dev Roblox',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder: Python Logic & Roblox Game (Batch 2)',
    items: [
      {
        name: 'Bootcamp Middle Python & Roblox Studio (10 Sesi)',
        description: 'Termasuk akses cloud code, modul project, & sertifikat',
        price: 1500000,
        qty: 1,
      },
    ],
    subtotal: 1500000,
    discount: 0,
    totalAmount: 1500000,
    paidAmount: 1500000,
    remainingAmount: 0,
    paymentMethod: 'bca',
    status: 'paid',
    dueDate: '2026-06-08',
    paidAt: '2026-06-07T09:45:00.000Z',
    createdAt: '2026-06-06T14:20:00.000Z',
    updatedAt: '2026-06-07T09:45:00.000Z',
    notes: 'Lunas via Transfer BCA. Sudah masuk grup WhatsApp batch.',
  },
  {
    id: 'tx-2026-006',
    invoiceNumber: 'INV/2026/06/006',
    studentName: 'Chantal Kirana Adisti',
    parentName: 'Maya Lestari',
    parentPhone: '087799887766',
    parentEmail: 'maya.lestari@gmail.com',
    programName: 'Junior Explorer: Visual Scratch & AI Logic',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    items: [
      {
        name: 'Bootcamp Junior Visual Scratch & AI Logic (8 Sesi)',
        description: 'Termasuk sertifikat & kit latihan',
        price: 1200000,
        qty: 1,
      },
    ],
    subtotal: 1200000,
    discount: 150000,
    discountCode: 'EARLYBIRD',
    totalAmount: 1050000,
    paidAmount: 0,
    remainingAmount: 1050000,
    paymentMethod: 'qris',
    status: 'pending',
    dueDate: '2026-06-18',
    createdAt: '2026-06-15T13:10:00.000Z',
    updatedAt: '2026-06-15T13:10:00.000Z',
    notes: 'Menunggu scan QRIS orang tua. Dikirimkan link tagihan.',
  },
  {
    id: 'tx-2026-007',
    invoiceNumber: 'INV/2026/06/007',
    studentName: 'Farrel Raditya',
    parentName: 'Budi Raditya',
    parentPhone: '081399001122',
    parentEmail: 'budi.raditya@gmail.com',
    programName: 'Teens Innovator: Fullstack Web & App Developer',
    batchId: 'batch-2026-03',
    batchName: 'Teens Innovator: Web Development & Cloud App (Batch 1)',
    items: [
      {
        name: 'Bootcamp Teens Fullstack Web & Modern AI (12 Sesi)',
        description: 'Termasuk hosting web portofolio gratis 1 tahun & sertifikat',
        price: 1850000,
        qty: 1,
      },
    ],
    subtotal: 1850000,
    discount: 0,
    totalAmount: 1850000,
    paidAmount: 1850000,
    remainingAmount: 0,
    paymentMethod: 'mandiri',
    status: 'paid',
    dueDate: '2026-06-14',
    paidAt: '2026-06-13T17:30:00.000Z',
    createdAt: '2026-06-12T10:00:00.000Z',
    updatedAt: '2026-06-13T17:30:00.000Z',
    notes: 'Lunas via Transfer Bank Mandiri.',
  },
];

export function getTransactions(): TransactionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(DEFAULT_TRANSACTIONS));
      return DEFAULT_TRANSACTIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_TRANSACTIONS;
  } catch (err) {
    console.error('Failed to get transactions:', err);
    return DEFAULT_TRANSACTIONS;
  }
}

export function saveTransactions(transactions: TransactionRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    emitStorageUpdate('transactions');
  } catch (err) {
    console.error('Failed to save transactions:', err);
  }
}

export function createTransaction(
  data: Omit<TransactionRecord, 'id' | 'createdAt' | 'updatedAt' | 'invoiceNumber'> & {
    customInvoiceNumber?: string;
  }
): TransactionRecord {
  const transactions = getTransactions();
  const nextIndex = transactions.length + 1;
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const seq = String(nextIndex).padStart(3, '0');
  const invoiceNumber = data.customInvoiceNumber || `INV/${year}/${month}/${seq}`;
  const now = new Date().toISOString();
  const newId = `tx-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

  const newTx: TransactionRecord = {
    ...data,
    id: newId,
    invoiceNumber,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newTx, ...transactions];
  saveTransactions(updated);
  pushTransactionToSupabase(newTx).catch(() => {});
  emitStorageUpdate('transactions');
  return newTx;
}

export function updateTransaction(
  id: string,
  updates: Partial<TransactionRecord>
): TransactionRecord | null {
  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = transactions[index];
  const updatedTx: TransactionRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  transactions[index] = updatedTx;
  saveTransactions(transactions);
  pushTransactionToSupabase(updatedTx).catch(() => {});
  emitStorageUpdate('transactions');
  return updatedTx;
}

export function deleteTransaction(id: string): boolean {
  const transactions = getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);
  if (filtered.length === transactions.length) return false;
  saveTransactions(filtered);
  deleteTransactionFromSupabase(id).catch(() => {});
  emitStorageUpdate('transactions');
  return true;
}

export function resetTransactionsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(DEFAULT_TRANSACTIONS));
  } catch (err) {
    console.error('Failed to reset transactions:', err);
  }
}

export function calculateFinancialStats(transactions: TransactionRecord[]) {
  const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.paidAmount || 0), 0);
  const pendingRevenue = transactions
    .filter((tx) => tx.status === 'pending' || tx.status === 'partial')
    .reduce((sum, tx) => sum + (tx.remainingAmount || 0), 0);
  const paidTransactions = transactions.filter((tx) => tx.status === 'paid');
  const pendingTransactions = transactions.filter((tx) => tx.status === 'pending');
  const partialTransactions = transactions.filter((tx) => tx.status === 'partial');
  const cancelledTransactions = transactions.filter((tx) => tx.status === 'cancelled');

  const avgValue =
    paidTransactions.length > 0
      ? Math.round(
          paidTransactions.reduce((sum, tx) => sum + tx.totalAmount, 0) / paidTransactions.length
        )
      : 0;

  return {
    totalRevenue,
    pendingRevenue,
    paidCount: paidTransactions.length,
    pendingCount: pendingTransactions.length,
    partialCount: partialTransactions.length,
    cancelledCount: cancelledTransactions.length,
    totalCount: transactions.length,
    avgValue,
  };
}

// ==========================================
// 10. GENERATOR SERTIFIKAT DIGITAL SISWA
// ==========================================

export const DEFAULT_CERTIFICATES: StudentCertificate[] = [
  {
    id: 'cert-2026-001',
    certificateNumber: 'BK-CERT/2026/06/001',
    verificationCode: 'BK-VER-8912',
    studentName: 'Kenzo Alvaro Pratama',
    parentName: 'Bambang Pratama',
    parentPhone: '081234567890',
    programName: 'Junior Explorer: Visual Scratch & AI Logic',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    issueDate: '2026-06-28',
    certificateType: 'graduation',
    honorsLevel: 'with_distinction',
    honorsTitle: 'Dengan Predikat Istimewa (With Distinction)',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Atas keberhasilan luar biasa menyelesaikan 8 sesi intensif kurikulum Visual Logic, Algoritma Pemrograman Blok Scratch, dan Eksplorasi Dasar Artificial Intelligence.',
    customNote: 'Menciptakan proyek game edukasi "Bee Math Adventure" dengan skor kreativitas 98/100.',
    createdAt: '2026-06-28T11:00:00.000Z',
    updatedAt: '2026-06-28T11:00:00.000Z',
  },
  {
    id: 'cert-2026-002',
    certificateNumber: 'BK-CERT/2026/06/002',
    verificationCode: 'BK-VER-4521',
    studentName: 'Alya Zahra Kirana',
    parentName: 'Siti Nurhaliza',
    parentPhone: '081987654321',
    programName: 'Middle Coder: Python & Game Dev Roblox',
    batchName: 'Middle Coder: Python Logic & Roblox Game (Batch 2)',
    issueDate: '2026-06-30',
    certificateType: 'graduation',
    honorsLevel: 'excellence',
    honorsTitle: 'Excellence in Computational Thinking',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Atas penguasaan sintaksis pemrograman Python dasar, logika struktur data (Array & Loop), serta perancangan lingkungan 3D interaktif pada platform Roblox Studio.',
    customNote: 'Lulus dengan predikat karya terbaik "Roblox Maze Escape Challenge".',
    createdAt: '2026-06-30T14:30:00.000Z',
    updatedAt: '2026-06-30T14:30:00.000Z',
  },
  {
    id: 'cert-2026-003',
    certificateNumber: 'BK-CERT/2026/06/003',
    verificationCode: 'BK-VER-7734',
    studentName: 'Rafi Danendra Putra',
    parentName: 'Hendra Gunawan',
    parentPhone: '082155554321',
    programName: 'Teens Innovator: Fullstack Web & App Developer',
    batchName: 'Teens Innovator: Web Development & Cloud App (Batch 1)',
    issueDate: '2026-07-05',
    certificateType: 'honor_roll',
    honorsLevel: 'honor_roll',
    honorsTitle: 'Dean’s Honor Roll of Innovation',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Atas dedikasi dan keunggulan teknik pembuatan aplikasi web modern menggunakan React, TypeScript, Tailwind CSS, serta integrasi API Cloud Database.',
    customNote: 'Proyek akhir "BeeCare Telemedicine Portal" berhasil di-deploy ke produksi publik.',
    createdAt: '2026-07-05T09:00:00.000Z',
    updatedAt: '2026-07-05T09:00:00.000Z',
  },
  {
    id: 'cert-2026-004',
    certificateNumber: 'BK-CERT/2026/06/004',
    verificationCode: 'BK-VER-9102',
    studentName: 'Nathania Putri Kusuma',
    parentName: 'Dewi Kusuma',
    parentPhone: '081377889900',
    programName: 'Junior Explorer: Visual Scratch & AI Logic',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    issueDate: '2026-06-28',
    certificateType: 'achievement',
    honorsLevel: 'merit',
    honorsTitle: 'Merit Award in Algorithmic Problem Solving',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Atas ketekunan dan keberhasilan memecahkan 30+ tantangan logika berurutan dan animasi interaktif pada kurikulum Junior Explorer.',
    customNote: 'Penyelesaian tugas mandiri tercepat dengan tingkat akurasi algoritma 95%.',
    createdAt: '2026-06-28T11:00:00.000Z',
    updatedAt: '2026-06-28T11:00:00.000Z',
  },
  {
    id: 'cert-2026-005',
    certificateNumber: 'BK-CERT/2026/06/005',
    verificationCode: 'BK-VER-3329',
    studentName: 'Muhammad Fatih Rayyan',
    parentName: 'dr. Ridwan Rayyan',
    parentPhone: '085611223344',
    programName: 'Middle Coder: Python & Game Dev Roblox',
    batchName: 'Middle Coder: Python Logic & Roblox Game (Batch 2)',
    issueDate: '2026-06-30',
    certificateType: 'graduation',
    honorsLevel: 'with_distinction',
    honorsTitle: 'Dengan Predikat Istimewa (With Distinction)',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Atas pencapaian nilai sempurna pada modul pemrograman Python & perancangan mekanik gameplay multipemain pada Roblox Studio.',
    customNote: 'Memimpin proyek kolaborasi kelompok dengan predikat kekompakan tim terbaik.',
    createdAt: '2026-06-30T14:30:00.000Z',
    updatedAt: '2026-06-30T14:30:00.000Z',
  },
  {
    id: 'cert-2026-006',
    certificateNumber: 'BK-CERT/2026/06/006',
    verificationCode: 'BK-VER-6481',
    studentName: 'Farrel Raditya',
    parentName: 'Budi Raditya',
    parentPhone: '081399001122',
    programName: 'Teens Innovator: Fullstack Web & App Developer',
    batchName: 'Teens Innovator: Web Development & Cloud App (Batch 1)',
    issueDate: '2026-07-05',
    certificateType: 'completion',
    honorsLevel: 'standard',
    honorsTitle: 'Sertifikat Kelulusan Resmi',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    advisorName: 'Dr. Ir. Hendra Wijaya',
    description:
      'Telah berhasil menyelesaikan seluruh rangkaian sesi belajar, praktikum coding intensif, dan uji kompetensi fullstack web development.',
    customNote: 'Portofolio web pribadi siap digunakan untuk pendaftaran beasiswa dan perguruan tinggi.',
    createdAt: '2026-07-05T09:00:00.000Z',
    updatedAt: '2026-07-05T09:00:00.000Z',
  },
];

export function getCertificates(): StudentCertificate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
      return DEFAULT_CERTIFICATES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_CERTIFICATES;
  } catch (err) {
    console.error('Failed to get certificates:', err);
    return DEFAULT_CERTIFICATES;
  }
}

export function saveCertificates(certificates: StudentCertificate[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  } catch (err) {
    console.error('Failed to save certificates:', err);
  }
}

export function createCertificate(
  data: Omit<
    StudentCertificate,
    'id' | 'createdAt' | 'updatedAt' | 'certificateNumber' | 'verificationCode'
  > & {
    customCertificateNumber?: string;
    customVerificationCode?: string;
  }
): StudentCertificate {
  const certificates = getCertificates();
  const nextIndex = certificates.length + 1;
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const seq = String(nextIndex).padStart(3, '0');
  const certificateNumber =
    data.customCertificateNumber || `BK-CERT/${year}/${month}/${seq}`;
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const verificationCode = data.customVerificationCode || `BK-VER-${randomCode}`;
  const now = new Date().toISOString();
  const newId = `cert-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

  const newCert: StudentCertificate = {
    ...data,
    id: newId,
    certificateNumber,
    verificationCode,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newCert, ...certificates];
  saveCertificates(updated);
  return newCert;
}

export function updateCertificate(
  id: string,
  updates: Partial<StudentCertificate>
): StudentCertificate | null {
  const certificates = getCertificates();
  const index = certificates.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const current = certificates[index];
  const updatedCert: StudentCertificate = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  certificates[index] = updatedCert;
  saveCertificates(certificates);
  return updatedCert;
}

export function deleteCertificate(id: string): boolean {
  const certificates = getCertificates();
  const filtered = certificates.filter((c) => c.id !== id);
  if (filtered.length === certificates.length) return false;
  saveCertificates(filtered);
  return true;
}

export function resetCertificatesToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(DEFAULT_CERTIFICATES));
  } catch (err) {
    console.error('Failed to reset certificates:', err);
  }
}

export function calculateCertificateStats(certificates: StudentCertificate[]) {
  const totalCount = certificates.length;
  const graduationCount = certificates.filter((c) => c.certificateType === 'graduation').length;
  const distinctionCount = certificates.filter(
    (c) => c.honorsLevel === 'with_distinction' || c.honorsLevel === 'excellence'
  ).length;
  const honorRollCount = certificates.filter((c) => c.certificateType === 'honor_roll').length;

  return {
    totalCount,
    graduationCount,
    distinctionCount,
    honorRollCount,
  };
}

// ==========================================
// 11. SHOWCASE KARYA SISWA & TESTIMONI ORANG TUA
// ==========================================

export const DEFAULT_PROJECTS: StudentProject[] = [
  {
    id: 'proj-2026-001',
    title: 'Bee Math Adventure Quest',
    studentName: 'Kenzo Alvaro Pratama',
    studentAge: 8,
    gradeLevel: 'Kelas 3 SD',
    platform: 'scratch',
    programType: 'Junior Explorer',
    description:
      'Game petualangan lebah mengumpulkan nektar dengan memecahkan teka-teki logika berhitung dan rintangan labirin bersyarat.',
    demoUrl: 'https://scratch.mit.edu/projects/example-bee-math',
    thumbnailEmojiOrUrl: '🐝',
    tags: ['Scratch 3.0', 'Game Logic', 'Math Puzzle', 'Conditional Loops'],
    isFeatured: true,
    likesCount: 142,
    viewsCount: 890,
    completionDate: '2026-06-25',
    instructorFeedback: 'Kombinasi algoritma gerak lebah dan deteksi tabrakan (collision) dibuat rapi tanpa bug. Nilai 98/100.',
    createdAt: '2026-06-25T10:00:00.000Z',
    updatedAt: '2026-06-25T10:00:00.000Z',
  },
  {
    id: 'proj-2026-002',
    title: 'Crystal Cave: Roblox Obby 3D',
    studentName: 'Alya Zahra Kirana',
    studentAge: 11,
    gradeLevel: 'Kelas 6 SD',
    platform: 'roblox',
    programType: 'Middle Coder',
    description:
      'Dunia rintangan 3D interaktif di Roblox Studio dengan platform bergerak dinamis, trap timer, dan sistem checkpoint otomatis.',
    demoUrl: 'https://www.roblox.com/games/example-crystal-cave',
    thumbnailEmojiOrUrl: '💎',
    tags: ['Roblox Studio', 'Lua Scripting', '3D Physics', 'Game Mechanics'],
    isFeatured: true,
    likesCount: 215,
    viewsCount: 1240,
    completionDate: '2026-06-28',
    instructorFeedback: 'Desain level sangat kreatif dan penataan script Lua untuk trap checkpoint bekerja sangat mulus.',
    createdAt: '2026-06-28T14:30:00.000Z',
    updatedAt: '2026-06-28T14:30:00.000Z',
  },
  {
    id: 'proj-2026-003',
    title: 'EcoTracker: Zero Waste App',
    studentName: 'Rafi Danendra Putra',
    studentAge: 15,
    gradeLevel: 'Kelas 1 SMA',
    platform: 'web',
    programType: 'Teens Innovator',
    description:
      'Aplikasi web responsif untuk mencatat jejak karbon harian keluarga dan edukasi daur ulang sampah berbasis AI Scanner simulasi.',
    demoUrl: 'https://ecotracker-demo.beekoding.id',
    thumbnailEmojiOrUrl: '🌱',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'API Integration', 'Fullstack'],
    isFeatured: true,
    likesCount: 310,
    viewsCount: 1890,
    completionDate: '2026-07-02',
    instructorFeedback: 'Kualitas kode sangat terstruktur menggunakan arsitektur komponen modern dan UI mobile-first.',
    createdAt: '2026-07-02T09:15:00.000Z',
    updatedAt: '2026-07-02T09:15:00.000Z',
  },
  {
    id: 'proj-2026-004',
    title: 'Space Invader Galaxy Battle',
    studentName: 'Nathania Putri Kusuma',
    studentAge: 9,
    gradeLevel: 'Kelas 4 SD',
    platform: 'scratch',
    programType: 'Junior Explorer',
    description:
      'Game arcade klasik bertema pertempuran luar angkasa dengan score counter, multiple lives, dan efek animasi ledakan laser.',
    demoUrl: 'https://scratch.mit.edu/projects/example-space-invader',
    thumbnailEmojiOrUrl: '🚀',
    tags: ['Scratch', 'Arcade Game', 'Variables', 'Broadcasting Events'],
    isFeatured: false,
    likesCount: 88,
    viewsCount: 520,
    completionDate: '2026-06-22',
    instructorFeedback: 'Penggunaan event broadcasting untuk peluru dan asteroid musuh berjalan sangat presisi.',
    createdAt: '2026-06-22T11:00:00.000Z',
    updatedAt: '2026-06-22T11:00:00.000Z',
  },
  {
    id: 'proj-2026-005',
    title: 'Smart Python AI Quiz Bot',
    studentName: 'Muhammad Fatih Rayyan',
    studentAge: 12,
    gradeLevel: 'Kelas 7 SMP',
    platform: 'python',
    programType: 'Middle Coder',
    description:
      'Program chatbot terminal cerdas berbasis Python yang mampu memberikan kuis adaptif dan menghitung skor analisis otomatis.',
    demoUrl: 'https://replit.com/@fatih/smart-quiz-bot',
    thumbnailEmojiOrUrl: '🤖',
    tags: ['Python 3', 'Data Structures', 'Dictionary & Lists', 'Algorithm'],
    isFeatured: true,
    likesCount: 175,
    viewsCount: 980,
    completionDate: '2026-06-29',
    instructorFeedback: 'Penguasaan manipulasi string dan modular function Python di atas rata-rata usia 12 tahun.',
    createdAt: '2026-06-29T15:00:00.000Z',
    updatedAt: '2026-06-29T15:00:00.000Z',
  },
  {
    id: 'proj-2026-006',
    title: 'Student Study Planner Dashboard',
    studentName: 'Farrel Raditya',
    studentAge: 16,
    gradeLevel: 'Kelas 2 SMA',
    platform: 'web',
    programType: 'Teens Innovator',
    description:
      'Dashboard manajemen jadwal belajar dan to-do list siswa dengan fitur penyimpanan data browser (LocalStorage) & drag-and-drop.',
    demoUrl: 'https://task-manager.beekoding.id',
    thumbnailEmojiOrUrl: '📅',
    tags: ['HTML5', 'CSS3', 'JavaScript ES6', 'LocalStorage CRUD'],
    isFeatured: false,
    likesCount: 95,
    viewsCount: 640,
    completionDate: '2026-07-04',
    instructorFeedback: 'Fitur penyimpanan lokal dan responsivitas layout tablet/desktop diimplementasikan dengan sangat rapi.',
    createdAt: '2026-07-04T13:40:00.000Z',
    updatedAt: '2026-07-04T13:40:00.000Z',
  },
];

export const DEFAULT_TESTIMONIALS: ParentTestimonial[] = [
  {
    id: 'testi-01',
    parentName: 'Bambang Pratama',
    childName: 'Kenzo Alvaro',
    childAge: 8,
    roleOrProfession: 'Orang Tua Murid (Wiraswasta, Bandung)',
    rating: 5,
    review:
      'Kenzo awalnya hanya suka bermain game di tablet, tapi setelah 2 bulan di Beekoding dia sekarang bisa bikin game Scratch sendiri dan bangga dipamerkan ke teman sekolahnya! Logika matematika di sekolah juga meningkat drastis.',
    programTaken: 'Junior Explorer: Visual Scratch & AI Logic',
    avatarEmojiOrUrl: '👨‍💼',
    isFeatured: true,
    createdAt: '2026-06-29T08:00:00.000Z',
  },
  {
    id: 'testi-02',
    parentName: 'Siti Nurhaliza',
    childName: 'Alya Zahra',
    childAge: 11,
    roleOrProfession: 'Ibu Rumah Tangga (Jakarta Selatan)',
    rating: 5,
    review:
      'Pendampingan mentornya sabar banget dan materi Roblox Studio-nya terstruktur. Alya belajar coding bahasa Lua sambil bersenang-senang membuat dunia game 3D. Sangat worth it untuk investasi masa depan ananda!',
    programTaken: 'Middle Coder: Python & Game Dev Roblox',
    avatarEmojiOrUrl: '👩‍🏫',
    isFeatured: true,
    createdAt: '2026-07-01T10:30:00.000Z',
  },
  {
    id: 'testi-03',
    parentName: 'Hendra Gunawan',
    childName: 'Rafi Danendra',
    childAge: 15,
    roleOrProfession: 'Tech Lead / Praktisi IT (Tangerang)',
    rating: 5,
    review:
      'Sebagai orang tua yang berlatar belakang teknologi, saya kagum dengan kurikulum Teens Innovator. Materinya kekinian (React, TypeScript, Cloud). Rafi sekarang punya portofolio web nyata yang bisa dilampirkan untuk apply beasiswa universitas.',
    programTaken: 'Teens Innovator: Fullstack Web & App Developer',
    avatarEmojiOrUrl: '👨‍💻',
    isFeatured: true,
    createdAt: '2026-07-06T11:20:00.000Z',
  },
  {
    id: 'testi-04',
    parentName: 'Dewi Kusuma',
    childName: 'Nathania Putri',
    childAge: 9,
    roleOrProfession: 'Pendidik & Orang Tua (Surabaya)',
    rating: 5,
    review:
      'Laporan rapor asesmen 8 pilar kognitifnya sangat ilmiah dan mendalam. Guru sekolah Nathania sampai memuji karena konsentrasi belajarnya naik signifikan sejak belajar algoritma sekuensial di Beekoding.',
    programTaken: 'Junior Explorer: Visual Scratch & AI Logic',
    avatarEmojiOrUrl: '👩‍⚕️',
    isFeatured: true,
    createdAt: '2026-06-26T14:00:00.000Z',
  },
  {
    id: 'testi-05',
    parentName: 'dr. Ridwan Rayyan',
    childName: 'Muhammad Fatih',
    childAge: 12,
    roleOrProfession: 'Dokter Spesialis Anak (Bandung)',
    rating: 5,
    review:
      'Sangat baik untuk melatih growth mindset anak. Ketika script coding-nya error, Fatih tidak mudah frustrasi melainkan tenang mencari solusinya (debugging). Karakter problem solving ini sangat berharga untuk kehidupan sehari-hari.',
    programTaken: 'Middle Coder: Python & Game Dev Roblox',
    avatarEmojiOrUrl: '👨‍⚕️',
    isFeatured: false,
    createdAt: '2026-07-02T16:45:00.000Z',
  },
];

// Functions for Projects
export function getStudentProjects(): StudentProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_PROJECTS;
  } catch (err) {
    console.error('Failed to get student projects:', err);
    return DEFAULT_PROJECTS;
  }
}

export function saveStudentProjects(projects: StudentProject[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error('Failed to save student projects:', err);
  }
}

export function createStudentProject(
  data: Omit<StudentProject, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'viewsCount'>
): StudentProject {
  const projects = getStudentProjects();
  const now = new Date().toISOString();
  const newId = `proj-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

  const newProject: StudentProject = {
    ...data,
    id: newId,
    likesCount: 0,
    viewsCount: 1,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newProject, ...projects];
  saveStudentProjects(updated);
  return newProject;
}

export function updateStudentProject(
  id: string,
  updates: Partial<StudentProject>
): StudentProject | null {
  const projects = getStudentProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = projects[index];
  const updatedProject: StudentProject = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  projects[index] = updatedProject;
  saveStudentProjects(projects);
  return updatedProject;
}

export function toggleProjectFeatured(id: string): boolean {
  const projects = getStudentProjects();
  const target = projects.find((p) => p.id === id);
  if (!target) return false;

  target.isFeatured = !target.isFeatured;
  target.updatedAt = new Date().toISOString();
  saveStudentProjects(projects);
  return target.isFeatured;
}

export function deleteStudentProject(id: string): boolean {
  const projects = getStudentProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveStudentProjects(filtered);
  return true;
}

export function resetStudentProjectsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
  } catch (err) {
    console.error('Failed to reset student projects:', err);
  }
}

// Functions for Testimonials
export function getParentTestimonials(): ParentTestimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_TESTIMONIALS;
  } catch (err) {
    console.error('Failed to get parent testimonials:', err);
    return DEFAULT_TESTIMONIALS;
  }
}

export function saveParentTestimonials(testimonials: ParentTestimonial[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  } catch (err) {
    console.error('Failed to save parent testimonials:', err);
  }
}

export function createParentTestimonial(
  data: Omit<ParentTestimonial, 'id' | 'createdAt'>
): ParentTestimonial {
  const testimonials = getParentTestimonials();
  const now = new Date().toISOString();
  const newId = `testi-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 5)}`;

  const newTestimonial: ParentTestimonial = {
    ...data,
    id: newId,
    createdAt: now,
  };

  const updated = [newTestimonial, ...testimonials];
  saveParentTestimonials(updated);
  return newTestimonial;
}

export function updateParentTestimonial(
  id: string,
  updates: Partial<ParentTestimonial>
): ParentTestimonial | null {
  const testimonials = getParentTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const current = testimonials[index];
  const updatedTestimonial: ParentTestimonial = {
    ...current,
    ...updates,
  };

  testimonials[index] = updatedTestimonial;
  saveParentTestimonials(testimonials);
  return updatedTestimonial;
}

export function toggleTestimonialFeatured(id: string): boolean {
  const testimonials = getParentTestimonials();
  const target = testimonials.find((t) => t.id === id);
  if (!target) return false;

  target.isFeatured = !target.isFeatured;
  saveParentTestimonials(testimonials);
  return target.isFeatured;
}

export function deleteParentTestimonial(id: string): boolean {
  const testimonials = getParentTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);
  if (filtered.length === testimonials.length) return false;
  saveParentTestimonials(filtered);
  return true;
}

export function resetParentTestimonialsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));
  } catch (err) {
    console.error('Failed to reset parent testimonials:', err);
  }
}

export function calculateShowcaseStats(
  projects: StudentProject[],
  testimonials: ParentTestimonial[]
) {
  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.isFeatured).length;
  const totalTestimonials = testimonials.length;
  const featuredTestimonials = testimonials.filter((t) => t.isFeatured).length;
  const avgRating =
    totalTestimonials > 0
      ? Number(
          (
            testimonials.reduce((sum, t) => sum + t.rating, 0) / totalTestimonials
          ).toFixed(1)
        )
      : 5.0;

  return {
    totalProjects,
    featuredProjects,
    totalTestimonials,
    featuredTestimonials,
    avgRating,
  };
}

// ==========================================
// 12. MANAJEMEN KURIKULUM & SILABUS SESI
// ==========================================

export const DEFAULT_CURRICULUM: LessonSession[] = [
  // --- JUNIOR EXPLORER (6-9 THN) ---
  {
    id: 'curr-jun-01',
    tier: 'junior',
    sessionNumber: 1,
    title: 'Algoritma Dasar & Kenalan dengan Scratch 3.0',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Algoritma', 'Sequencing', 'User Interface', 'Sprite & Backdrop'],
    description: 'Memahami apa itu komputer, instruksi sekuensial langkah-demi-langkah, dan navigasi antarmuka Scratch Studio.',
    projectOutcome: 'Animasi Sapaan Lebah Beekoding: Sprite lebah terbang menyapa nama anak.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-01',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-01',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-01.pdf',
    homeworkTask: 'Ganti kostum sprite dan buat lebah mengeluarkan suara dengung saat diklik.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-02',
    tier: 'junior',
    sessionNumber: 2,
    title: 'Animasi Gerak Sprite & Koordinat Kartesius X-Y',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Koordinat X & Y', 'Glide / Meluncur', 'Costume Switching', 'Orientasi Sudut'],
    description: 'Mempelajari cara sprite bergerak di layar 2D menggunakan nilai posisi X dan Y, serta animasi berjalan.',
    projectOutcome: 'Petualangan Lebah di Taman Bunga: Sprite meluncur dari bunga ke bunga secara dinamis.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-02',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-02',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-02.pdf',
    homeworkTask: 'Tambahkan 2 bunga baru dengan koordinat acak (Pick Random X: -200 to 200).',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-03',
    tier: 'junior',
    sessionNumber: 3,
    title: 'Event Handling & Kontrol Keyboard Interaktif',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Event Listeners', 'When Key Pressed', 'Smooth Movement', 'Edge Bouncing'],
    description: 'Menghubungkan tombol panah keyboard (Arrow Keys & WASD) untuk mengendalikan karakter secara halus.',
    projectOutcome: 'Mini Game Labirin Lebah: Memandu lebah mencari sarang tanpa menabrak dinding.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-03',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-03',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-03.pdf',
    homeworkTask: 'Buat dinding labirin berkedip atau berubah warna saat disentuh.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-04',
    tier: 'junior',
    sessionNumber: 4,
    title: 'Struktur Perulangan (Loops) & Ritme Musik',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Repeat N Times', 'Forever Loop', 'Sound Effects', 'Scratch Music Extension'],
    description: 'Memahami otomatisasi tugas dengan loop dan menambahkan instrumen musik serta efek suara.',
    projectOutcome: 'Dance Party Karakter: Tiga sprite menari sinkron dengan ketukan instrumen drum.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-04',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-04',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-04.pdf',
    homeworkTask: 'Buat lampu disko warna-warni yang berubah efek warna setiap 0.5 detik dalam loop selamanya.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-05',
    tier: 'junior',
    sessionNumber: 5,
    title: 'Kondisional Logika (If-Then) & Deteksi Tabrakan',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['If-Then Logic', 'Sensing Blocks', 'Color Detection', 'Boolean Conditions'],
    description: 'Memprogram keputusan komputer: apa yang terjadi jika sprite menyentuh warna tertentu atau sprite musuh.',
    projectOutcome: 'Game Tangkap Apel: Apel jatuh dari langit, mangkok bergerak menangkapnya.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-05',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-05',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-05.pdf',
    homeworkTask: 'Tambahkan buah busuk (apel hitam) yang mengurangi skor bila tersentuh mangkok.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-06',
    tier: 'junior',
    sessionNumber: 6,
    title: 'Variabel Dinamis, Sistem Skor & Countdown Timer',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Variables', 'Set & Change By', 'Countdown Timer', 'Game Over Logic'],
    description: 'Menyimpan nilai data game menggunakan variabel: poin terkumpul dan batas waktu permainan 30 detik.',
    projectOutcome: 'Papan Skor & Timer Balapan: Game pengumpul madu dengan batasan waktu dinamis.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-06',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-06',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-06.pdf',
    homeworkTask: 'Berikan bonus waktu +5 detik setiap kali pemain menangkap toples madu emas langka.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-07',
    tier: 'junior',
    sessionNumber: 7,
    title: 'Broadcast Messages & Multi-Scene Storytelling',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Broadcast Messages', 'When I Receive', 'Scene Transition', 'Komunikasi Antar Sprite'],
    description: 'Mengirim sinyal radio digital antar-sprite untuk mengatur pergantian babak cerita animasi dan dialog dua arah.',
    projectOutcome: 'Cerita Komik Interaktif Lebah Pahlawan Lingkungan (3 Babak Adegan).',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-07',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-07',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-07.pdf',
    homeworkTask: 'Tambahkan pilihan dialog interaktif: Apakah lebah belok ke hutan pinus atau gua batu?',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-08',
    tier: 'junior',
    sessionNumber: 8,
    title: 'Kloning Objek (Cloning): Hujan Meteor & Pasukan Musuh',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Create Clone of Myself', 'When I Start as Clone', 'Delete This Clone', 'Memory Management'],
    description: 'Menciptakan duplikasi objek secara tak terbatas tanpa membuat puluhan sprite secara manual di Scratch.',
    projectOutcome: 'Space Defender Junior: Menembak asteroid kloning yang meluncur turun dari angkasa.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-08',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-08',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-08.pdf',
    homeworkTask: 'Buat asteroid besar yang bila tertembak pecah menjadi 2 clone asteroid kecil.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-09',
    tier: 'junior',
    sessionNumber: 9,
    title: 'Desain Antarmuka Game: Tombol Start, Game Over & Win Screen',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['UI / UX Game', 'Button States', 'Game States (Menu, Play, Win, Lose)', 'Show/Hide'],
    description: 'Membangun arsitektur menu permainan profesional dengan tombol Mulai Main, Layar Menang, dan Coba Lagi.',
    projectOutcome: 'Sistem Menu Lengkap untuk Game Bee Math Adventure.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-09',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-09',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-09.pdf',
    homeworkTask: 'Tambahkan tombol Pengaturan Musik ON/OFF di menu utama.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-10',
    tier: 'junior',
    sessionNumber: 10,
    title: 'Mini Studio Project: Game Catch The Falling Honey',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Integrasi Sistem', 'Fisika Sederhana Gravity', 'Difficulty Scaling', 'High Score Saving'],
    description: 'Menggabungkan loop, kloning, variabel skor, waktu, dan layar akhir dalam satu game utuh yang adiktif.',
    projectOutcome: 'Game Lengkap Catch The Falling Honey siap dimainkan bersama teman.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-10',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-10',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-10.pdf',
    homeworkTask: 'Bikin level kecepatan tetesan madu bertambah cepat setiap 5 poin.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-11',
    tier: 'junior',
    sessionNumber: 11,
    title: 'Debugging Kode, Playtesting & Optimalisasi Animasi',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Code Debugging', 'Edge Cases', 'Peer Code Review', 'Game Feel / Polish'],
    description: 'Melatih pola pikir pemecahan masalah (debugging): mendeteksi bug tabrakan, glitch gerak, dan uji coba antar siswa.',
    projectOutcome: 'Dokumen Bug Report & Game Scratch versi stabil bebas glitch.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-11',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-11',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-11.pdf',
    homeworkTask: 'Minta orang tua bermain dan catat 2 masukan saran untuk menyempurnakan game.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-jun-12',
    tier: 'junior',
    sessionNumber: 12,
    title: 'Final Demo Day: Presentasi Proyek Karya Mandiri Siswa',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Public Speaking', 'Design Thinking', 'Project Presentation', 'Peer Feedback'],
    description: 'Siswa mempresentasikan game buatan sendiri di hadapan teman sekelas, instruktur, dan orang tua.',
    projectOutcome: 'Publish Proyek ke Scratch Online Community & Piagam Sertifikat Kelulusan Junior Explorer.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-junior-12',
    starterCodeUrl: 'https://scratch.mit.edu/projects/starter-junior-12',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-junior-12.pdf',
    homeworkTask: 'Tuliskan deskripsi petunjuk cara main (Instructions & Credits) pada halaman proyek Scratch.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },

  // --- MIDDLE CODER (10-12 THN) ---
  {
    id: 'curr-mid-01',
    tier: 'middle',
    sessionNumber: 1,
    title: 'Transisi ke Teks: Pemrograman Python & Algoritma Logika',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Text-based Coding', 'Print Statements', 'Comments', 'Syntax Errors'],
    description: 'Menjembatani transisi dari visual blocks ke bahasa pemrograman teks nyata Python 3.',
    projectOutcome: 'Program Terminal Kartu Identitas Coder & Greeting Bot Cerdas.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-01',
    starterCodeUrl: 'https://replit.com/@beekoding/python-intro-01',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-01.pdf',
    homeworkTask: 'Buat program sapaan ASCII art lebah menggunakan multi-line string print.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-02',
    tier: 'middle',
    sessionNumber: 2,
    title: 'Variabel, Tipe Data Primitif & Input Interaktif Python',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['String, Integer, Float, Boolean', 'Input Function', 'Type Casting (int/str)', 'Operasi Matematika'],
    description: 'Menerima input pengguna dari keyboard dan memproses kalkulasi nilai numerik serta string formatting.',
    projectOutcome: 'Kalkulator Biaya Jajan Cerdas & Generator Cerita Mad-Libs Otomatis.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-02',
    starterCodeUrl: 'https://replit.com/@beekoding/python-types-02',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-02.pdf',
    homeworkTask: 'Buat kalkulator konversi usia manusia ke usia kucing/anjing.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-03',
    tier: 'middle',
    sessionNumber: 3,
    title: 'Percabangan Logika (If-Elif-Else) & Game Tebak Angka',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['If-Elif-Else', 'Comparison Operators (==, !=, >, <)', 'Logical AND/OR', 'Modul Random'],
    description: 'Mengajarkan program mengambil keputusan logis berdasarkan kriteria ganda dan menghasilkan angka acak.',
    projectOutcome: 'Game Tebak Angka Rahasia 1-100 dengan Petunjuk "Terlalu Besar / Terlalu Kecil".',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-03',
    starterCodeUrl: 'https://replit.com/@beekoding/python-logic-03',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-03.pdf',
    homeworkTask: 'Tambahkan batasan 5 kali tebakan: jika habis tebakan maka Game Over.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-04',
    tier: 'middle',
    sessionNumber: 4,
    title: 'Perulangan While & For: Generator Pola Geometri & List',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['While Loops', 'For Loop in Range', 'Python Lists', 'List Indexing'],
    description: 'Memahami perulangan iteratif berbasis kondisi dan penyimpanan sekumpulan data di dalam list array Python.',
    projectOutcome: 'Program Inventory Game RPG: Menambah, menghapus, dan menampilkan item senjata pemain.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-04',
    starterCodeUrl: 'https://replit.com/@beekoding/python-loops-04',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-04.pdf',
    homeworkTask: 'Cetak pola segitiga bintang n-baris sesuai angka input pengguna.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-05',
    tier: 'middle',
    sessionNumber: 5,
    title: 'Pengenalan Roblox Studio: Ruang 3D Workspace, Parts & Anchor',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['3D Coordinate Space (X, Y, Z)', 'Roblox Studio UI', 'Parts, Materials & Colors', 'Anchored & CanCollide'],
    description: 'Memulai perancangan dunia virtual 3D di Roblox Studio: navigasi kamera, perakitan rintangan, dan hukum gravitasi part.',
    projectOutcome: 'Arena Rintangan 3D Dasar (Obby Base Island) dengan berbagai bentuk geometri.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-05',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-05',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-05.pdf',
    homeworkTask: 'Rancang 3 jenis rintangan lompat (jump blocks) dengan warna neon menyala.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-06',
    tier: 'middle',
    sessionNumber: 6,
    title: 'Dasar Scripting Lua di Roblox: Properties Manipulation',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Lua Scripting', 'Script.Parent', 'Properties Modification', 'Transparency & BrickColor'],
    description: 'Menulis skrip kode Lua pertama di dalam Part untuk mengubah transparansi, warna, dan posisi balok saat runtime.',
    projectOutcome: 'Platform Jembatan Gaib Berkedip (Disappearing Platforms) berbasis timer waktu.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-06',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-06',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-06.pdf',
    homeworkTask: 'Buat skrip platform berputar (rotator) menggunakan fungsi CFrame.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-07',
    tier: 'middle',
    sessionNumber: 7,
    title: 'Event Touched: Mekanisme Kill-Part, Trap & Checkpoint',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Touched Event', 'Humanoid Detection', 'TakeDamage / Health 0', 'SpawnPoints & Stages'],
    description: 'Mendeteksi sentuhan karakter pemain dengan balok lava rintangan serta sistem stage checkpoint keselamatan.',
    projectOutcome: 'Sistem Rintangan Lava Mematikan & 3 Pos Checkpoint Otomatis di Roblox.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-07',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-07',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-07.pdf',
    homeworkTask: 'Buat part trampolin (Super Bounce) yang melempar pemain ke udara saat diinjak.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-08',
    tier: 'middle',
    sessionNumber: 8,
    title: 'Leaderstats: Sistem Koin, Health & Skor Pemain di Roblox',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Game.Players.PlayerAdded', 'Folder Leaderstats', 'IntValue / NumberValue', 'Coin Pickup Script'],
    description: 'Membangun sistem ekonomi game di papan skor (Leaderboard) Roblox: mengumpulkan koin emas dan menyimpannya ke player data.',
    projectOutcome: 'Koin Emas Berputar di Udara yang menambah nilai Leaderstats +10 saat disentuh.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-08',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-08',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-08.pdf',
    homeworkTask: 'Buat koin langka warna ungu yang bernilai 50 poin dan mengeluarkan efek partikel bintang.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-09',
    tier: 'middle',
    sessionNumber: 9,
    title: 'Pembuatan ScreenGUI & Layar Shop Interaktif Menggunakan Tween',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['StarterGui', 'ScreenGui & Frame', 'TextButton & ImageLabel', 'TweenService Animations'],
    description: 'Merancang antarmuka UI layar pemain: toko item, tombol buka menu, dan animasi transisi halus dengan TweenService.',
    projectOutcome: 'Toko Speed Coil: Pemain dapat membeli item penambah kecepatan lari dengan 50 koin.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-09',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-09',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-09.pdf',
    homeworkTask: 'Tambahkan tombol tutup menu (X) dengan animasi mengecil halus saat diklik.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-10',
    tier: 'middle',
    sessionNumber: 10,
    title: 'Turtle Graphics Python: Visualisasi Matematika & Fractal Sederhana',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Turtle Library', 'Angles & Geometric Formulas', 'Recursive Patterns', 'Color Palettes'],
    description: 'Menerapkan logika perulangan dan fungsi matematika Python untuk melukis pola geometri mandala fraktal yang memukau.',
    projectOutcome: 'Program Generator Karya Seni Digital Geometri Fraktal Python.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-10',
    starterCodeUrl: 'https://replit.com/@beekoding/python-turtle-10',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-10.pdf',
    homeworkTask: 'Buat fungsi gambar bintang segi lima berulang yang membesar dari tengah.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-11',
    tier: 'middle',
    sessionNumber: 11,
    title: 'Level Design & Mechanics Polishing 3D Parkour Obby',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Game Atmosphere (Lighting, Skybox)', 'Sound Effects 3D', 'Level Progression', 'Balance Testing'],
    description: 'Memoles permainan 3D Roblox: mengatur pencahayaan senja dramatis, efek kabut, sound effect saat jatuh, dan uji kesulitan.',
    projectOutcome: 'Game Roblox 3D Obby 10 Tahap Lengkap dan Berimbang.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-11',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-11',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-11.pdf',
    homeworkTask: 'Tambahkan zona podium pemenang dengan kembang api partikel di akhir level 10.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-mid-12',
    tier: 'middle',
    sessionNumber: 12,
    title: 'Publishing Game ke Roblox Cloud & Playtest Bersama Batch',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Roblox Cloud Publishing', 'Multiplayer Testing', 'Thumbnail Design', 'Presentation Skills'],
    description: 'Mempublikasikan game ke server publik Roblox sehingga dapat dimainkan bersama teman sekelas dan orang tua di seluruh dunia.',
    projectOutcome: 'Game Live di Roblox Platform dengan tautan publik + Sertifikat Prestasi Middle Coder.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-middle-12',
    starterCodeUrl: 'https://roblox.com/games/starter-middle-12',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-middle-12.pdf',
    homeworkTask: 'Buat poster thumbnail menarik ukuran 1920x1080 untuk dipasang di etalase game Roblox.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },

  // --- TEENS INNOVATOR (13-17 THN) ---
  {
    id: 'curr-teen-01',
    tier: 'teens',
    sessionNumber: 1,
    title: 'Arsitektur Web Modern: Fondasi Internet & HTML5 Semantik',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['Client-Server Architecture', 'DNS & HTTP/HTTPS', 'Semantic HTML5', 'SEO & Accessibility Basics'],
    description: 'Memahami siklus request-response internet dan menyusun struktur konten web berstandar industri dengan HTML5 semantik.',
    projectOutcome: 'Halaman Portofolio Profil Pengembang Personal (Semantik & Bebas Error W3C).',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-01',
    starterCodeUrl: 'https://github.com/beekoding/teens-html5-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-01.pdf',
    homeworkTask: 'Tambahkan section daftar keahlian teknologi menggunakan semantic table dan progress element.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-02',
    tier: 'teens',
    sessionNumber: 2,
    title: 'Modern CSS Mastery: Layouting Flexbox, CSS Grid & Mobile-First',
    durationMinutes: 90,
    difficulty: 'beginner',
    coreConcepts: ['CSS Box Model', 'Flexbox Alignment', 'CSS Grid Multi-Column', 'Media Queries (Mobile Responsive)'],
    description: 'Menguasai teknik tata letak modern tanpa float: Flexbox untuk komponen satu dimensi dan CSS Grid untuk tata letak halaman.',
    projectOutcome: 'Landing Page Produk Startup Digital yang responsif sempurna di Smartphone, Tablet, dan Desktop.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-02',
    starterCodeUrl: 'https://github.com/beekoding/teens-css-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-02.pdf',
    homeworkTask: 'Buat efek kartu hover 3D tilt dengan CSS transform dan transition.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-03',
    tier: 'teens',
    sessionNumber: 3,
    title: 'Modern JavaScript: DOM Manipulation & Dynamic Interactivity',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['DOM API (querySelector, addEventListener)', 'Arrow Functions', 'ClassList Toggle', 'Form Input Handling'],
    description: 'Menjadikan halaman web dinamis: merespons klik, input teks, validasi formulir, dan memanipulasi elemen DOM secara instan.',
    projectOutcome: 'Aplikasi Interactive To-Do List & Task Priority Manager.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-03',
    starterCodeUrl: 'https://github.com/beekoding/teens-dom-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-03.pdf',
    homeworkTask: 'Tambahkan filter status tugas: "Semua", "Aktif", dan "Selesai".',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-04',
    tier: 'teens',
    sessionNumber: 4,
    title: 'Struktur Data JS: Array Methods & LocalStorage Persistence',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Array Map, Filter, Reduce', 'Object Destructuring', 'JSON Serialization', 'Window.localStorage'],
    description: 'Menyimpan data aplikasi langsung di browser pengguna tanpa database agar catatan tidak hilang saat halaman di-refresh.',
    projectOutcome: 'Aplikasi Catatan Keuangan Pribadi (Expense Tracker) dengan Penyimpanan Persisten.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-04',
    starterCodeUrl: 'https://github.com/beekoding/teens-storage-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-04.pdf',
    homeworkTask: 'Tambahkan fitur ekspor riwayat pengeluaran ke format teks CSV.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-05',
    tier: 'teens',
    sessionNumber: 5,
    title: 'Asynchronous JS: Promise, Async/Await & REST API Integration',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Event Loop & Non-Blocking', 'Fetch API', 'Async / Await', 'Handling Errors (Try-Catch)'],
    description: 'Mengambil data cuaca, berita, dan kurs mata uang secara langsung dari server cloud pihak ketiga via REST API publik.',
    projectOutcome: 'Live Weather Dashboard: Menampilkan ramalan cuaca kota di Indonesia secara real-time.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-05',
    starterCodeUrl: 'https://github.com/beekoding/teens-async-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-05.pdf',
    homeworkTask: 'Buat indikator skeleton loading saat data API sedang diunduh.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-06',
    tier: 'teens',
    sessionNumber: 6,
    title: 'Arsitektur React.js: JSX, Virtual DOM & Modular Components',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['SPA (Single Page Application)', 'JSX Syntax', 'Component Composition', 'Props Passing'],
    description: 'Beralih ke standar industri frontend dunia: memecah antarmuka web menjadi komponen modular yang dapat digunakan kembali.',
    projectOutcome: 'Katalog E-Commerce Toko Komputer dengan Komponen Produk Reusable.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-06',
    starterCodeUrl: 'https://github.com/beekoding/teens-react-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-06.pdf',
    homeworkTask: 'Buat komponen RatingStars dengan warna bintang emas dinamis dari props rating.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-07',
    tier: 'teens',
    sessionNumber: 7,
    title: 'State & Lifecycle: React Hooks (useState & useEffect)',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['useState Hook', 'State Re-rendering', 'useEffect Dependencies', 'Controlled Form Inputs'],
    description: 'Mengelola siklus hidup data dan re-render UI secara reaktif saat status aplikasi berubah.',
    projectOutcome: 'Aplikasi Interaktif Keranjang Belanja & Kalkulator Kupon Diskon Realtime.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-07',
    starterCodeUrl: 'https://github.com/beekoding/teens-hooks-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-07.pdf',
    homeworkTask: 'Sinkronisasikan isi keranjang belanja ke LocalStorage menggunakan useEffect.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-08',
    tier: 'teens',
    sessionNumber: 8,
    title: 'Rapid UI Development dengan Tailwind CSS & Lucide Icons',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Utility-First CSS', 'Tailwind Config & Palette', 'Dark Mode Implementation', 'Lucide Icon Library'],
    description: 'Membangun desain antarmuka modern setara aplikasi Silicon Valley dengan kelas utilitas Tailwind dan mode gelap.',
    projectOutcome: 'SaaS Landing Page Modern dengan Sakelar Mode Gelap / Terang.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-08',
    starterCodeUrl: 'https://github.com/beekoding/teens-tailwind-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-08.pdf',
    homeworkTask: 'Tambahkan efek glassmorphism (backdrop-blur) pada navigasi navbar.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-09',
    tier: 'teens',
    sessionNumber: 9,
    title: 'AI Engineering: Prompt Engineering, Tokenomics & LLM API',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Generative AI Architecture', 'System Prompts vs User Prompts', 'Temperature & Max Tokens', 'API Keys Security'],
    description: 'Memanfaatkan kekuatan Artificial Intelligence: merancang prompt sistem terarah dan menghubungkan aplikasi web ke API LLM.',
    projectOutcome: 'Widget Chatbot Asisten Tutor Belajar Cerdas Terintegrasi API AI.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-09',
    starterCodeUrl: 'https://github.com/beekoding/teens-ai-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-09.pdf',
    homeworkTask: 'Buat sistem prompt khusus agar AI berperan sebagai "Guru Bahasa Inggris Asik".',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-10',
    tier: 'teens',
    sessionNumber: 10,
    title: 'Capstone Project: AI-Powered Smart Study Flashcard Assistant',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Fullstack Frontend Integration', 'State Lifting', 'Flashcard Spaced Repetition', 'Data Visualization'],
    description: 'Mengintegrasikan seluruh keahlian HTML, Tailwind, React Hooks, dan AI API dalam satu aplikasi web utuh berdaya guna.',
    projectOutcome: 'Aplikasi Web Utuh: AI Flashcard Generator untuk Membantu Belajar Ujian Sekolah.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-10',
    starterCodeUrl: 'https://github.com/beekoding/teens-capstone-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-10.pdf',
    homeworkTask: 'Tambahkan fitur kuis tebak kartu dengan skor persentase keberhasilan.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-11',
    tier: 'teens',
    sessionNumber: 11,
    title: 'Git & GitHub: Version Control, Commit Workflow & Cloud Deploy',
    durationMinutes: 90,
    difficulty: 'intermediate',
    coreConcepts: ['Git Init, Add, Commit, Push', 'GitHub Repository', 'Branching & Pull Request', 'Vercel / Netlify Deployment'],
    description: 'Praktik kolaborasi pengembang profesional: merekam riwayat perubahan kode dengan Git dan meluncurkan web ke internet publik gratis.',
    projectOutcome: 'Aplikasi Web Capstone Aktif di Domain Kustom Publik (Vercel Live URL).',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-11',
    starterCodeUrl: 'https://github.com/beekoding/teens-deploy-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-11.pdf',
    homeworkTask: 'Tulis file README.md profesional dengan tangkapan layar dan petunjuk instalasi.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'curr-teen-12',
    tier: 'teens',
    sessionNumber: 12,
    title: 'Startup Tech Pitch: Presentasi Web App & Live Deploy Portofolio',
    durationMinutes: 90,
    difficulty: 'advanced',
    coreConcepts: ['Tech Demo Pitching', 'Problem-Solution Fit', 'Product Demonstration', 'Career Portfolio Building'],
    description: 'Siswa mempresentasikan produk digital buatannya di hadapan juri dan orang tua, siap dimasukkan ke CV portofolio global.',
    projectOutcome: 'Portofolio Publik Siap Beasiswa & Piagam Kelulusan Teens Innovator Beekoding.',
    slideUrl: 'https://slides.google.com/presentation/d/beekoding-teens-12',
    starterCodeUrl: 'https://github.com/beekoding/teens-pitch-starter',
    worksheetUrl: 'https://assets.beekoding.id/curriculum/worksheet-teens-12.pdf',
    homeworkTask: 'Hubungkan tautan portofolio ke akun LinkedIn atau profil media sosial siswa.',
    isActive: true,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
];

export function getCurriculumSessions(): LessonSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRICULUM);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CURRICULUM, JSON.stringify(DEFAULT_CURRICULUM));
      return DEFAULT_CURRICULUM;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CURRICULUM;
  } catch (err) {
    console.error('Failed to load curriculum sessions:', err);
    return DEFAULT_CURRICULUM;
  }
}

export function saveCurriculumSessions(sessions: LessonSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRICULUM, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save curriculum sessions:', err);
  }
}

export function createCurriculumSession(
  data: Omit<LessonSession, 'id' | 'createdAt' | 'updatedAt'>
): LessonSession {
  const sessions = getCurriculumSessions();
  const newSession: LessonSession = {
    ...data,
    id: `curr-${data.tier.substring(0, 3)}-${Date.now().toString().slice(-4)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  sessions.push(newSession);
  saveCurriculumSessions(sessions);
  return newSession;
}

export function updateCurriculumSession(
  id: string,
  updates: Partial<LessonSession>
): LessonSession | null {
  const sessions = getCurriculumSessions();
  const index = sessions.findIndex((s) => s.id === id);
  if (index === -1) return null;

  const current = sessions[index];
  const updatedSession: LessonSession = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  sessions[index] = updatedSession;
  saveCurriculumSessions(sessions);
  return updatedSession;
}

export function toggleSessionActive(id: string): boolean {
  const sessions = getCurriculumSessions();
  const target = sessions.find((s) => s.id === id);
  if (!target) return false;

  target.isActive = !target.isActive;
  target.updatedAt = new Date().toISOString();
  saveCurriculumSessions(sessions);
  return target.isActive;
}

export function deleteCurriculumSession(id: string): boolean {
  const sessions = getCurriculumSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  if (filtered.length === sessions.length) return false;
  saveCurriculumSessions(filtered);
  return true;
}

export function resetCurriculumToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRICULUM, JSON.stringify(DEFAULT_CURRICULUM));
  } catch (err) {
    console.error('Failed to reset curriculum to default:', err);
  }
}

export function calculateCurriculumStats(sessions: LessonSession[]) {
  const totalSessions = sessions.length;
  const activeSessions = sessions.filter((s) => s.isActive).length;
  const juniorCount = sessions.filter((s) => s.tier === 'junior').length;
  const middleCount = sessions.filter((s) => s.tier === 'middle').length;
  const teensCount = sessions.filter((s) => s.tier === 'teens').length;
  const totalSlideMaterials = sessions.filter((s) => Boolean(s.slideUrl)).length;
  const totalStarterCodes = sessions.filter((s) => Boolean(s.starterCodeUrl)).length;
  const totalWorksheets = sessions.filter((s) => Boolean(s.worksheetUrl)).length;

  return {
    totalSessions,
    activeSessions,
    juniorCount,
    middleCount,
    teensCount,
    totalSlideMaterials,
    totalStarterCodes,
    totalWorksheets,
  };
}

// ==========================================
// 13. DIREKTORI INSTRUKTUR & MENTOR PENGAJAR
// ==========================================

export const DEFAULT_INSTRUCTORS: InstructorRecord[] = [
  {
    id: 'inst-2026-001',
    name: 'Febri Hasan, S.Kom., M.T.',
    title: 'Founder & Chief Learning Officer',
    avatarUrlOrEmoji: '/febri-hasan.png',
    email: 'febri.hasan@beekoding.id',
    phone: '08122334455',
    role: 'lead_educator',
    specializations: ['Computational Thinking', 'Fullstack Web', 'AI Prompt Engineering', 'Curriculum Design'],
    bio: 'Praktisi edukasi teknologi dan pengembang sistem berpengalaman lebih dari 8 tahun. Berdedikasi mencetak generasi muda Indonesia yang cakap digital, kritis, kreatif, dan mandiri.',
    teachingTiers: ['junior', 'middle', 'teens'],
    rating: 5.0,
    totalTeachingHours: 580,
    assignedBatchesCount: 4,
    status: 'active',
    socialLinkedin: 'https://linkedin.com/in/febri-hasan',
    socialGithub: 'https://github.com/febrihasan',
    joinedAt: '2024-01-10',
    createdAt: '2024-01-10T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'inst-2026-002',
    name: 'Dr. Ir. Hendra Wijaya',
    title: 'Academic Advisor & CS Pedagogy Expert',
    avatarUrlOrEmoji: '👨‍🏫',
    email: 'hendra.wijaya@beekoding.id',
    phone: '081399887766',
    role: 'curriculum_specialist',
    specializations: ['Computer Science Pedagogy', 'AI Ethics', 'Algorithmic Problem Solving'],
    bio: 'Dosen senior dan konsultan kurikulum ilmu komputer K-12. Mengawasi keselarasan kurikulum Beekoding dengan standar CSTA internasional dan persiapan kompetisi beasiswa.',
    teachingTiers: ['middle', 'teens'],
    rating: 4.9,
    totalTeachingHours: 420,
    assignedBatchesCount: 2,
    status: 'active',
    socialLinkedin: 'https://linkedin.com/in/hendra-wijaya',
    joinedAt: '2024-03-15',
    createdAt: '2024-03-15T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'inst-2026-003',
    name: 'Sarah Amalia, S.T.',
    title: 'Senior Mentor - Creative Game Dev',
    avatarUrlOrEmoji: '👩‍💻',
    email: 'sarah.amalia@beekoding.id',
    phone: '081234567891',
    role: 'senior_mentor',
    specializations: ['Scratch 3.0', 'Game Design 2D', 'Early Childhood Logic', 'Sprite Animation'],
    bio: 'Spesialis pengajaran koding untuk anak usia dini (6–9 tahun). Menggunakan pendekatan gamifikasi ramah anak sehingga proses belajar algoritma terasa menyenangkan seperti bermain.',
    teachingTiers: ['junior'],
    rating: 4.9,
    totalTeachingHours: 360,
    assignedBatchesCount: 3,
    status: 'active',
    joinedAt: '2024-06-01',
    createdAt: '2024-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'inst-2026-004',
    name: 'Kevin Pratama, S.Kom.',
    title: 'Senior 3D Game Dev & Metaverse Mentor',
    avatarUrlOrEmoji: '🧑‍💻',
    email: 'kevin.pratama@beekoding.id',
    phone: '081298765432',
    role: 'senior_mentor',
    specializations: ['Roblox Studio', 'Lua Scripting', '3D Environment Design', 'Multiplayer Mechanics'],
    bio: 'Pengembang game Roblox bersertifikat dengan jutaan kunjungan place global. Berpengalaman membimbing siswa merancang mekanisme game 3D parkour dan sistem ekonomi koin.',
    teachingTiers: ['middle'],
    rating: 4.8,
    totalTeachingHours: 310,
    assignedBatchesCount: 2,
    status: 'active',
    socialGithub: 'https://github.com/kevinpratama',
    joinedAt: '2025-01-15',
    createdAt: '2025-01-15T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'inst-2026-005',
    name: 'Dian Sastro Wardoyo, B.Eng.',
    title: 'Python Logic & Data Science Mentor',
    avatarUrlOrEmoji: '👩‍🔬',
    email: 'dian.wardoyo@beekoding.id',
    phone: '081387654321',
    role: 'senior_mentor',
    specializations: ['Python 3', 'Turtle Graphics', 'Data Structures', 'Mathematical Logic'],
    bio: 'Lulusan Teknik Komputer dengan minat mendalam pada penguatan logika anak. Terbiasa memfasilitasi anak SMP memahami algoritma matematika, perulangan while/for, dan visualisasi fraktal.',
    teachingTiers: ['middle', 'teens'],
    rating: 4.9,
    totalTeachingHours: 275,
    assignedBatchesCount: 2,
    status: 'active',
    joinedAt: '2025-04-10',
    createdAt: '2025-04-10T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'inst-2026-006',
    name: 'Rian Hidayat, M.Cs.',
    title: 'Fullstack Web & Cloud Deploy Mentor',
    avatarUrlOrEmoji: '👨‍💼',
    email: 'rian.hidayat@beekoding.id',
    phone: '081211223344',
    role: 'senior_mentor',
    specializations: ['React.js', 'Tailwind CSS', 'TypeScript', 'Vercel Deployment', 'Git & GitHub'],
    bio: 'Software Engineer profesional dan mentor proyek remaja. Membantu siswa usia 13–17 tahun meluncurkan aplikasi web portofolio live di internet untuk beasiswa dan karier teknologi.',
    teachingTiers: ['teens'],
    rating: 5.0,
    totalTeachingHours: 340,
    assignedBatchesCount: 3,
    status: 'active',
    socialGithub: 'https://github.com/rianhidayat',
    joinedAt: '2024-09-01',
    createdAt: '2024-09-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
];

export function getInstructors(): InstructorRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INSTRUCTORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(DEFAULT_INSTRUCTORS));
      return DEFAULT_INSTRUCTORS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_INSTRUCTORS;
  } catch (err) {
    console.error('Failed to load instructors:', err);
    return DEFAULT_INSTRUCTORS;
  }
}

export function saveInstructors(instructors: InstructorRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(instructors));
  } catch (err) {
    console.error('Failed to save instructors:', err);
  }
}

export function createInstructor(
  data: Omit<InstructorRecord, 'id' | 'createdAt' | 'updatedAt'>
): InstructorRecord {
  const instructors = getInstructors();
  const newInstructor: InstructorRecord = {
    ...data,
    id: `inst-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  instructors.push(newInstructor);
  saveInstructors(instructors);
  return newInstructor;
}

export function updateInstructor(
  id: string,
  updates: Partial<InstructorRecord>
): InstructorRecord | null {
  const instructors = getInstructors();
  const index = instructors.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const current = instructors[index];
  const updatedInstructor: InstructorRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  instructors[index] = updatedInstructor;
  saveInstructors(instructors);
  return updatedInstructor;
}

export function toggleInstructorStatus(id: string): InstructorStatus {
  const instructors = getInstructors();
  const target = instructors.find((i) => i.id === id);
  if (!target) return 'inactive';

  const nextStatus: Record<InstructorStatus, InstructorStatus> = {
    active: 'on_leave',
    on_leave: 'inactive',
    inactive: 'active',
  };

  target.status = nextStatus[target.status];
  target.updatedAt = new Date().toISOString();
  saveInstructors(instructors);
  return target.status;
}

export function deleteInstructor(id: string): boolean {
  const instructors = getInstructors();
  const filtered = instructors.filter((i) => i.id !== id);
  if (filtered.length === instructors.length) return false;
  saveInstructors(filtered);
  return true;
}

export function resetInstructorsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.INSTRUCTORS, JSON.stringify(DEFAULT_INSTRUCTORS));
  } catch (err) {
    console.error('Failed to reset instructors to default:', err);
  }
}

export function calculateInstructorStats(instructors: InstructorRecord[]) {
  const totalInstructors = instructors.length;
  const activeInstructors = instructors.filter((i) => i.status === 'active').length;
  const onLeaveInstructors = instructors.filter((i) => i.status === 'on_leave').length;
  const totalTeachingHours = instructors.reduce((sum, i) => sum + i.totalTeachingHours, 0);
  const avgRating =
    totalInstructors > 0
      ? Number(
          (instructors.reduce((sum, i) => sum + i.rating, 0) / totalInstructors).toFixed(1)
        )
      : 5.0;

  return {
    totalInstructors,
    activeInstructors,
    onLeaveInstructors,
    totalTeachingHours,
    avgRating,
  };
}

// ==========================================
// 14. MANAJEMEN PRESENSI & ABSENSI KEHADIRAN SISWA
// ==========================================

export const DEFAULT_ATTENDANCE: SessionAttendanceRecord[] = [
  {
    id: 'att-2026-001',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer - Scratch Game Dev (Batch 04)',
    tier: 'junior',
    sessionNumber: 3,
    sessionTopic: 'Event Handling & Kontrol Keyboard Interaktif',
    date: '2026-06-20',
    instructorName: 'Sarah Amalia, S.T.',
    students: [
      {
        studentId: 'stud-001',
        studentName: 'Kenzo Alvaro Pratama',
        parentName: 'Bambang Pratama',
        parentPhone: '081234567890',
        status: 'present',
      },
      {
        studentId: 'stud-002',
        studentName: 'Aisyah Putri Rahmadani',
        parentName: 'Siti Rahmadani',
        parentPhone: '081298765432',
        status: 'present',
      },
      {
        studentId: 'stud-003',
        studentName: 'Bilal Al-Fatih',
        parentName: 'Ahmad Fauzi',
        parentPhone: '081311223344',
        status: 'present',
      },
      {
        studentId: 'stud-004',
        studentName: 'Clarissa Aurelia',
        parentName: 'Dewi Lestari',
        parentPhone: '081255667788',
        status: 'excused',
        notes: 'Sakit demam flu, sudah izin via WA orang tua. Minta rekaman sesi.',
      },
      {
        studentId: 'stud-005',
        studentName: 'Danish Rayhan',
        parentName: 'Hendra Rayhan',
        parentPhone: '081399001122',
        status: 'present',
      },
    ],
    classNotes: 'Semua siswa yang hadir berhasil menghubungkan tombol panah keyboard ke sprite lebah. Clarissa sakit dan tautan rekaman kelas sudah disiapkan.',
    homeworkAssigned: 'Buat dinding labirin berkedip saat disentuh sprite lebah.',
    createdAt: '2026-06-20T11:45:00.000Z',
    updatedAt: '2026-06-20T11:45:00.000Z',
  },
  {
    id: 'att-2026-002',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer - Scratch Game Dev (Batch 04)',
    tier: 'junior',
    sessionNumber: 4,
    sessionTopic: 'Struktur Perulangan (Loops) & Ritme Musik',
    date: '2026-06-27',
    instructorName: 'Sarah Amalia, S.T.',
    students: [
      {
        studentId: 'stud-001',
        studentName: 'Kenzo Alvaro Pratama',
        parentName: 'Bambang Pratama',
        parentPhone: '081234567890',
        status: 'present',
      },
      {
        studentId: 'stud-002',
        studentName: 'Aisyah Putri Rahmadani',
        parentName: 'Siti Rahmadani',
        parentPhone: '081298765432',
        status: 'present',
      },
      {
        studentId: 'stud-003',
        studentName: 'Bilal Al-Fatih',
        parentName: 'Ahmad Fauzi',
        parentPhone: '081311223344',
        status: 'late',
        notes: 'Terlambat 15 menit karena kendala jaringan WiFi rumah.',
      },
      {
        studentId: 'stud-004',
        studentName: 'Clarissa Aurelia',
        parentName: 'Dewi Lestari',
        parentPhone: '081255667788',
        status: 'present',
        notes: 'Sudah sembuh dan menyusul materi sesi 3 dengan lancar.',
      },
      {
        studentId: 'stud-005',
        studentName: 'Danish Rayhan',
        parentName: 'Hendra Rayhan',
        parentPhone: '081399001122',
        status: 'present',
      },
    ],
    classNotes: 'Seluruh 5 murid hadir. Eksplorasi ekstensi musik Scratch berjalan sangat seru, masing-masing membuat beat drum unik.',
    homeworkAssigned: 'Buat lampu disko warna-warni yang berubah efek warna setiap 0.5 detik dalam loop selamanya.',
    createdAt: '2026-06-27T11:45:00.000Z',
    updatedAt: '2026-06-27T11:45:00.000Z',
  },
  {
    id: 'att-2026-003',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder - Roblox 3D World & Lua (Batch 02)',
    tier: 'middle',
    sessionNumber: 5,
    sessionTopic: 'Pengenalan Roblox Studio: Ruang 3D Workspace, Parts & Anchor',
    date: '2026-06-21',
    instructorName: 'Kevin Pratama, S.Kom.',
    students: [
      {
        studentId: 'stud-006',
        studentName: 'Rafa Azka Putra',
        parentName: 'Budi Santoso',
        parentPhone: '081211112222',
        status: 'present',
      },
      {
        studentId: 'stud-007',
        studentName: 'Nadia Salsabila',
        parentName: 'Rina Marlina',
        parentPhone: '081322223333',
        status: 'present',
      },
      {
        studentId: 'stud-008',
        studentName: 'Fathan Mubarak',
        parentName: 'Agus Mubarak',
        parentPhone: '081233334444',
        status: 'present',
      },
      {
        studentId: 'stud-009',
        studentName: 'Gavin Arkan',
        parentName: 'Indra Arkan',
        parentPhone: '081344445555',
        status: 'present',
      },
    ],
    classNotes: 'Kehadiran 100%. Siswa berhasil memahami koordinat 3D (X, Y, Z) dan mengunci (anchor) balok neon agar tidak jatuh gravitasi.',
    homeworkAssigned: 'Rancang 3 rintangan lompat baru dengan warna neon menyala di pulau obby masing-masing.',
    createdAt: '2026-06-21T15:45:00.000Z',
    updatedAt: '2026-06-21T15:45:00.000Z',
  },
  {
    id: 'att-2026-004',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder - Roblox 3D World & Lua (Batch 02)',
    tier: 'middle',
    sessionNumber: 6,
    sessionTopic: 'Dasar Scripting Lua di Roblox: Properties Manipulation',
    date: '2026-06-28',
    instructorName: 'Kevin Pratama, S.Kom.',
    students: [
      {
        studentId: 'stud-006',
        studentName: 'Rafa Azka Putra',
        parentName: 'Budi Santoso',
        parentPhone: '081211112222',
        status: 'present',
      },
      {
        studentId: 'stud-007',
        studentName: 'Nadia Salsabila',
        parentName: 'Rina Marlina',
        parentPhone: '081322223333',
        status: 'excused',
        notes: 'Izin acara keluarga ke luar kota. Rekaman Google Meet dikirim ke WA orang tua.',
      },
      {
        studentId: 'stud-008',
        studentName: 'Fathan Mubarak',
        parentName: 'Agus Mubarak',
        parentPhone: '081233334444',
        status: 'present',
      },
      {
        studentId: 'stud-009',
        studentName: 'Gavin Arkan',
        parentName: 'Indra Arkan',
        parentPhone: '081344445555',
        status: 'present',
      },
    ],
    classNotes: 'Fathan dan Rafa berhasil membuat platform jembatan gaib berkedip menggunakan script Lua dan perulangan while.',
    homeworkAssigned: 'Buat platform berputar (rotator) menggunakan fungsi CFrame.',
    createdAt: '2026-06-28T15:45:00.000Z',
    updatedAt: '2026-06-28T15:45:00.000Z',
  },
  {
    id: 'att-2026-005',
    batchId: 'batch-2026-03',
    batchName: 'Teens Innovator - Fullstack Web & AI (Batch 01)',
    tier: 'teens',
    sessionNumber: 2,
    sessionTopic: 'Modern CSS Mastery: Layouting Flexbox, CSS Grid & Mobile-First',
    date: '2026-06-24',
    instructorName: 'Rian Hidayat, M.Cs.',
    students: [
      {
        studentId: 'stud-010',
        studentName: 'Devina Maharani',
        parentName: 'Wawan Gunawan',
        parentPhone: '081255556666',
        status: 'present',
      },
      {
        studentId: 'stud-011',
        studentName: 'Farhan Ramadhan',
        parentName: 'Taufik Hidayat',
        parentPhone: '081366667777',
        status: 'present',
      },
      {
        studentId: 'stud-012',
        studentName: 'Zahra Anindya',
        parentName: 'Maya Sartika',
        parentPhone: '081277778888',
        status: 'present',
      },
      {
        studentId: 'stud-013',
        studentName: 'Michael Tan',
        parentName: 'Tan Wijaya',
        parentPhone: '081388889999',
        status: 'present',
      },
      {
        studentId: 'stud-014',
        studentName: 'Aditya Pratama',
        parentName: 'Eko Pratama',
        parentPhone: '081299990000',
        status: 'present',
      },
      {
        studentId: 'stud-015',
        studentName: 'Nabila Syakieb',
        parentName: 'Syakieb Ali',
        parentPhone: '081300001111',
        status: 'late',
        notes: 'Terlambat 10 menit karena macet sepulang kegiatan sekolah.',
      },
    ],
    classNotes: 'Siswa sangat aktif saat latihan membuat grid katalog produk responsif. Devina dan Michael sudah menguasai CSS grid-template-columns.',
    homeworkAssigned: 'Tambahkan efek kartu hover 3D tilt dengan CSS transform dan transition.',
    createdAt: '2026-06-24T18:45:00.000Z',
    updatedAt: '2026-06-24T18:45:00.000Z',
  },
];

export function getAttendanceRecords(): SessionAttendanceRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
      return DEFAULT_ATTENDANCE;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ATTENDANCE;
  } catch (err) {
    console.error('Failed to load attendance records:', err);
    return DEFAULT_ATTENDANCE;
  }
}

export function saveAttendanceRecords(records: SessionAttendanceRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(records));
    emitStorageUpdate('attendance');
  } catch (err) {
    console.error('Failed to save attendance records:', err);
  }
}

export function createAttendanceRecord(
  data: Omit<SessionAttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>
): SessionAttendanceRecord {
  const records = getAttendanceRecords();
  const newRecord: SessionAttendanceRecord = {
    ...data,
    id: `att-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  records.unshift(newRecord);
  saveAttendanceRecords(records);
  pushAttendanceToSupabase(newRecord).catch(() => {});
  emitStorageUpdate('attendance');
  return newRecord;
}

export function updateAttendanceRecord(
  id: string,
  updates: Partial<SessionAttendanceRecord>
): SessionAttendanceRecord | null {
  const records = getAttendanceRecords();
  const index = records.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = records[index];
  const updatedRecord: SessionAttendanceRecord = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  records[index] = updatedRecord;
  saveAttendanceRecords(records);
  pushAttendanceToSupabase(updatedRecord).catch(() => {});
  emitStorageUpdate('attendance');
  return updatedRecord;
}

export function deleteAttendanceRecord(id: string): boolean {
  const records = getAttendanceRecords();
  const filtered = records.filter((r) => r.id !== id);
  if (filtered.length === records.length) return false;
  saveAttendanceRecords(filtered);
  deleteAttendanceFromSupabase(id).catch(() => {});
  emitStorageUpdate('attendance');
  return true;
}

export function resetAttendanceToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(DEFAULT_ATTENDANCE));
  } catch (err) {
    console.error('Failed to reset attendance to default:', err);
  }
}

export function calculateAttendanceStats(records: SessionAttendanceRecord[]) {
  const totalSessionsConducted = records.length;
  let totalStudentAttendances = 0;
  let totalPresentCount = 0;
  let totalExcusedCount = 0;
  let totalLateCount = 0;
  let totalAbsentCount = 0;

  records.forEach((rec) => {
    rec.students.forEach((s) => {
      totalStudentAttendances++;
      if (s.status === 'present') totalPresentCount++;
      else if (s.status === 'excused') totalExcusedCount++;
      else if (s.status === 'late') totalLateCount++;
      else if (s.status === 'absent') totalAbsentCount++;
    });
  });

  const overallAttendanceRate =
    totalStudentAttendances > 0
      ? Number(
          (
            ((totalPresentCount + totalLateCount) / totalStudentAttendances) *
            100
          ).toFixed(1)
        )
      : 100.0;

  return {
    totalSessionsConducted,
    totalStudentAttendances,
    totalPresentCount,
    totalExcusedCount,
    totalLateCount,
    totalAbsentCount,
    overallAttendanceRate,
  };
}

export function exportAttendanceCSV(records: SessionAttendanceRecord[]): void {
  try {
    const headers = [
      'ID Presensi',
      'Tanggal',
      'Nama Batch Kelas',
      'Jenjang',
      'Sesi Ke',
      'Topik Pembelajaran',
      'Instruktur',
      'Nama Siswa',
      'Nama Wali',
      'Kontak WA',
      'Status Kehadiran',
      'Catatan Siswa',
      'Catatan Instruktur Kelas',
      'Tugas Rumah (PR)',
    ];

    const rows: string[][] = [];

    records.forEach((rec) => {
      rec.students.forEach((st) => {
        rows.push([
          `"${rec.id}"`,
          `"${rec.date}"`,
          `"${rec.batchName.replace(/"/g, '""')}"`,
          `"${rec.tier.toUpperCase()}"`,
          `"Sesi ${rec.sessionNumber}"`,
          `"${rec.sessionTopic.replace(/"/g, '""')}"`,
          `"${rec.instructorName.replace(/"/g, '""')}"`,
          `"${st.studentName.replace(/"/g, '""')}"`,
          `"${(st.parentName || '-').replace(/"/g, '""')}"`,
          `"${st.parentPhone || '-'}"`,
          `"${st.status.toUpperCase()}"`,
          `"${(st.notes || '-').replace(/"/g, '""')}"`,
          `"${(rec.classNotes || '-').replace(/"/g, '""')}"`,
          `"${(rec.homeworkAssigned || '-').replace(/"/g, '""')}"`,
        ]);
      });
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_presensi_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export attendance CSV:', err);
  }
}

// ==========================================
// 15. MANAJEMEN RAPOR & EVALUASI AKADEMIK SISWA
// ==========================================

export function calculateGradeAndPredicate(scores: AcademicCompetencyScores): {
  averageScore: number;
  gradeLetter: GradeLetter;
  predicateTitle: string;
} {
  const avg = Number(
    (
      (scores.computationalThinking +
        scores.creativityDesign +
        scores.problemSolving +
        scores.codeMastery +
        scores.teamworkAttitude) /
      5
    ).toFixed(1)
  );

  let gradeLetter: GradeLetter = 'B';
  let predicateTitle = 'Berkembang Baik (Developing Skills)';

  if (avg >= 92) {
    gradeLetter = 'A+';
    predicateTitle = 'Dengan Pujian Istimewa (High Distinction)';
  } else if (avg >= 83) {
    gradeLetter = 'A';
    predicateTitle = 'Sangat Memuaskan (Proficient & Creative)';
  } else if (avg >= 75) {
    gradeLetter = 'B+';
    predicateTitle = 'Memuaskan (Good Progress)';
  } else if (avg >= 65) {
    gradeLetter = 'B';
    predicateTitle = 'Berkembang Baik (Developing Skills)';
  } else {
    gradeLetter = 'C';
    predicateTitle = 'Perlu Pendampingan Lanjutan (Needs Practice)';
  }

  return { averageScore: avg, gradeLetter, predicateTitle };
}

export const DEFAULT_ACADEMIC_REPORTS: StudentAcademicReport[] = [
  {
    id: 'rep-2026-001',
    studentId: 'stud-001',
    studentName: 'Kenzo Alvaro Pratama',
    parentName: 'Bambang Pratama',
    parentPhone: '081234567890',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer - Scratch Game Dev (Batch 04)',
    tier: 'junior',
    reportPeriod: 'final_term',
    attendanceRate: 100,
    scores: {
      computationalThinking: 95,
      creativityDesign: 98,
      problemSolving: 90,
      codeMastery: 92,
      teamworkAttitude: 95,
    },
    averageScore: 94.0,
    gradeLetter: 'A+',
    predicateTitle: 'Dengan Pujian Istimewa (High Distinction)',
    capstoneProjectTitle: 'Petualangan Lebah Penyelamat Hutan (Bee Adventure 2D)',
    capstoneProjectDesc:
      'Game arcade interaktif di Scratch dengan 3 tingkatan kesulitan, sistem skor apel emas, mekanik musuh laba-laba berbasis loop timer, dan musik latar 8-bit gubahan sendiri.',
    instructorNotes:
      'Kenzo menunjukkan bakat spasial dan imajinasi visual yang luar biasa! Kemampuannya memahami sekuens blok if-then-else serta broadcast message berjalan sangat mulus dan mampu membantu teman sekelas saat latihan.',
    nextStepRecommendation:
      'Disarankan melanjutkan ke jenjang Middle Coder (Roblox Studio 3D Lua Scripting & Pengantar Python) untuk transisi ke logika bahasa berbasis teks.',
    instructorName: 'Sarah Amalia, S.T.',
    issueDate: '2026-06-30',
    createdAt: '2026-06-30T10:00:00.000Z',
    updatedAt: '2026-06-30T10:00:00.000Z',
  },
  {
    id: 'rep-2026-002',
    studentId: 'stud-002',
    studentName: 'Aisyah Putri Rahmadani',
    parentName: 'Siti Rahmadani',
    parentPhone: '081298765432',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer - Scratch Game Dev (Batch 04)',
    tier: 'junior',
    reportPeriod: 'mid_term',
    attendanceRate: 100,
    scores: {
      computationalThinking: 86,
      creativityDesign: 94,
      problemSolving: 85,
      codeMastery: 87,
      teamworkAttitude: 88,
    },
    averageScore: 88.0,
    gradeLetter: 'A',
    predicateTitle: 'Sangat Memuaskan (Proficient & Creative)',
    capstoneProjectTitle: 'Taman Musik Interaktif & Hewan Bernyanyi',
    capstoneProjectDesc:
      'Aplikasi simulasi instrumen musik interaktif di mana tiap instrumen memainkan melodi piano dan perkusi ritmis sesuai blok Scratch Sound Extension.',
    instructorNotes:
      'Aisyah sangat teliti dalam merancang animasi dan estetika warna sprite. Sangat aktif merespons pertanyaan di Google Meet dan selalu tepat waktu mengumpulkan tugas mingguan.',
    nextStepRecommendation:
      'Pertahankan ketelitian ini pada sesi lanjutan Sesi 7-12 yang akan membahas mekanika game berbasis fisika pantul gravitasi sederhana.',
    instructorName: 'Sarah Amalia, S.T.',
    issueDate: '2026-06-25',
    createdAt: '2026-06-25T11:30:00.000Z',
    updatedAt: '2026-06-25T11:30:00.000Z',
  },
  {
    id: 'rep-2026-003',
    studentId: 'stud-006',
    studentName: 'Rafa Azka Putra',
    parentName: 'Budi Santoso',
    parentPhone: '081211112222',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder - Roblox Studio & Lua Logic (Batch 02)',
    tier: 'middle',
    reportPeriod: 'final_term',
    attendanceRate: 100,
    scores: {
      computationalThinking: 94,
      creativityDesign: 92,
      problemSolving: 95,
      codeMastery: 90,
      teamworkAttitude: 91,
    },
    averageScore: 92.4,
    gradeLetter: 'A+',
    predicateTitle: 'Dengan Pujian Istimewa (High Distinction)',
    capstoneProjectTitle: 'Escape The Lava Obby & Disappearing Bridge',
    capstoneProjectDesc:
      'Game rintangan 3D di Roblox Studio dengan rintangan platform gaib (transparency loop), timer countdown, leaderboard pemain, dan efek ledakan partikel saat terkena lahar.',
    instructorNotes:
      'Rafa berhasil memahami konsep variabel Lua, fungsi CFrame, dan event listener Touched dengan sangat cepat. Kemandirian dalam mencari solusi error (debugging script) patut diacungi jempol.',
    nextStepRecommendation:
      'Sangat direkomendasikan mengambil program Python Coder & Data AI Exploration untuk mengasah algoritma kompetisi tingkat nasional.',
    instructorName: 'Kevin Pratama, S.Kom.',
    issueDate: '2026-06-29',
    createdAt: '2026-06-29T14:15:00.000Z',
    updatedAt: '2026-06-29T14:15:00.000Z',
  },
  {
    id: 'rep-2026-004',
    studentId: 'stud-007',
    studentName: 'Nadia Salsabila',
    parentName: 'Rina Marlina',
    parentPhone: '081322223333',
    batchId: 'batch-2026-02',
    batchName: 'Middle Coder - Roblox Studio & Lua Logic (Batch 02)',
    tier: 'middle',
    reportPeriod: 'mid_term',
    attendanceRate: 83,
    scores: {
      computationalThinking: 78,
      creativityDesign: 85,
      problemSolving: 75,
      codeMastery: 77,
      teamworkAttitude: 80,
    },
    averageScore: 79.0,
    gradeLetter: 'B+',
    predicateTitle: 'Memuaskan (Good Progress)',
    capstoneProjectTitle: 'Speed Run Simulator 3D',
    capstoneProjectDesc:
      'Simulasi karakter yang kecepatannya bertambah setiap kali menyentuh part energi bintang di arena 3D Roblox.',
    instructorNotes:
      'Nadia memiliki imajinasi arsitektur dunia virtual yang kaya. Sempat tertinggal pada materi loop while karena izin keluarga, namun berhasil mengejar dengan mempelajari modul rekaman sesi.',
    nextStepRecommendation:
      'Fokus latihan sintaks if-then-end pada skrip Lua agar logika percabangan semakin mantap di paruh kedua sesi.',
    instructorName: 'Kevin Pratama, S.Kom.',
    issueDate: '2026-06-27',
    createdAt: '2026-06-27T16:00:00.000Z',
    updatedAt: '2026-06-27T16:00:00.000Z',
  },
  {
    id: 'rep-2026-005',
    studentId: 'stud-010',
    studentName: 'Devina Maharani',
    parentName: 'Wawan Gunawan',
    parentPhone: '081255556666',
    batchId: 'batch-2026-03',
    batchName: 'Teens Innovator - Fullstack Web & AI (Batch 01)',
    tier: 'teens',
    reportPeriod: 'final_term',
    attendanceRate: 100,
    scores: {
      computationalThinking: 96,
      creativityDesign: 95,
      problemSolving: 98,
      codeMastery: 94,
      teamworkAttitude: 93,
    },
    averageScore: 95.2,
    gradeLetter: 'A+',
    predicateTitle: 'Dengan Pujian Istimewa (High Distinction)',
    capstoneProjectTitle: 'EcoShop - Katalog Toko Ramah Lingkungan & Rekomendasi AI',
    capstoneProjectDesc:
      'Aplikasi web modern berbasis React dan Tailwind CSS dengan fitur pencarian produk instan, keranjang belanja dinamis, filter kategori, dan integrasi prompt rekomendasi cerdas.',
    instructorNotes:
      'Devina adalah salah satu siswa terbaik dengan pemahaman struktur komponen React dan CSS Grid yang matang. Kode bersih, terstruktur rapi, dan responsif di perangkat ponsel.',
    nextStepRecommendation:
      'Direkomendasikan melanjutkan ke program magang mini projek / persiapan portofolio portofolio beasiswa sains teknologi internasional.',
    instructorName: 'Rian Hidayat, M.Cs.',
    issueDate: '2026-06-28',
    createdAt: '2026-06-28T17:00:00.000Z',
    updatedAt: '2026-06-28T17:00:00.000Z',
  },
  {
    id: 'rep-2026-006',
    studentId: 'stud-011',
    studentName: 'Farhan Ramadhan',
    parentName: 'Taufik Hidayat',
    parentPhone: '081366667777',
    batchId: 'batch-2026-03',
    batchName: 'Teens Innovator - Fullstack Web & AI (Batch 01)',
    tier: 'teens',
    reportPeriod: 'final_term',
    attendanceRate: 100,
    scores: {
      computationalThinking: 88,
      creativityDesign: 85,
      problemSolving: 87,
      codeMastery: 88,
      teamworkAttitude: 86,
    },
    averageScore: 86.8,
    gradeLetter: 'A',
    predicateTitle: 'Sangat Memuaskan (Proficient & Creative)',
    capstoneProjectTitle: 'Kanban Task Manager dengan Mode Gelap',
    capstoneProjectDesc:
      'Web manajemen tugas kanban board dengan status todo, in progress, dan done yang tersimpan persisten di LocalStorage.',
    instructorNotes:
      'Farhan sangat tekun saat menghadapi error event listener. Paham alur state management dan berhasil mengimplementasikan mode gelap switch dengan Tailwind CSS.',
    nextStepRecommendation:
      'Perdalam pemahaman integrasi REST API backend Node.js dan Express untuk membangun fullstack web mandiri.',
    instructorName: 'Rian Hidayat, M.Cs.',
    issueDate: '2026-06-28',
    createdAt: '2026-06-28T17:30:00.000Z',
    updatedAt: '2026-06-28T17:30:00.000Z',
  },
];

export function getAcademicReports(): StudentAcademicReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEFAULT_ACADEMIC_REPORTS));
      return DEFAULT_ACADEMIC_REPORTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_ACADEMIC_REPORTS;
  } catch (err) {
    console.error('Failed to load academic reports:', err);
    return DEFAULT_ACADEMIC_REPORTS;
  }
}

export function saveAcademicReports(reports: StudentAcademicReport[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  } catch (err) {
    console.error('Failed to save academic reports:', err);
  }
}

export function createAcademicReport(
  data: Omit<StudentAcademicReport, 'id' | 'createdAt' | 'updatedAt'>
): StudentAcademicReport {
  const reports = getAcademicReports();
  const newReport: StudentAcademicReport = {
    ...data,
    id: `rep-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  reports.unshift(newReport);
  saveAcademicReports(reports);
  return newReport;
}

export function updateAcademicReport(
  id: string,
  updates: Partial<StudentAcademicReport>
): StudentAcademicReport | null {
  const reports = getAcademicReports();
  const index = reports.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = reports[index];
  const updatedReport: StudentAcademicReport = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  reports[index] = updatedReport;
  saveAcademicReports(reports);
  return updatedReport;
}

export function deleteAcademicReport(id: string): boolean {
  const reports = getAcademicReports();
  const filtered = reports.filter((r) => r.id !== id);
  if (filtered.length === reports.length) return false;
  saveAcademicReports(filtered);
  return true;
}

export function resetAcademicReportsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(DEFAULT_ACADEMIC_REPORTS));
  } catch (err) {
    console.error('Failed to reset academic reports to default:', err);
  }
}

export function calculateReportStats(reports: StudentAcademicReport[]) {
  const totalReports = reports.length;
  if (totalReports === 0) {
    return {
      totalReports: 0,
      averageScore: 0,
      highDistinctionCount: 0,
      averageAttendanceRate: 0,
    };
  }

  const sumScore = reports.reduce((acc, curr) => acc + curr.averageScore, 0);
  const averageScore = Number((sumScore / totalReports).toFixed(1));

  const highDistinctionCount = reports.filter(
    (r) => r.gradeLetter === 'A+' || r.gradeLetter === 'A'
  ).length;

  const sumAttendance = reports.reduce((acc, curr) => acc + curr.attendanceRate, 0);
  const averageAttendanceRate = Number((sumAttendance / totalReports).toFixed(1));

  return {
    totalReports,
    averageScore,
    highDistinctionCount,
    averageAttendanceRate,
  };
}

export function exportReportsCSV(reports: StudentAcademicReport[]): void {
  try {
    const headers = [
      'ID Rapor',
      'Tanggal Terbit',
      'Nama Siswa',
      'Nama Wali',
      'No WhatsApp',
      'Batch Kelas',
      'Jenjang',
      'Periode Rapor',
      'Tingkat Kehadiran (%)',
      'Computational Thinking',
      'Kreativitas & Desain',
      'Problem Solving',
      'Penguasaan Sintaks',
      'Kerja Sama & Sikap',
      'Rata-rata Skor',
      'Nilai Huruf',
      'Predikat Prestasi',
      'Judul Proyek Capstone',
      'Instruktur',
      'Catatan Evaluasi Instruktur',
      'Rekomendasi Level Lanjutan',
    ];

    const rows = reports.map((r) => [
      `"${r.id}"`,
      `"${r.issueDate}"`,
      `"${r.studentName.replace(/"/g, '""')}"`,
      `"${r.parentName.replace(/"/g, '""')}"`,
      `"${r.parentPhone}"`,
      `"${r.batchName.replace(/"/g, '""')}"`,
      `"${r.tier.toUpperCase()}"`,
      `"${r.reportPeriod === 'final_term' ? 'Akhir Sesi (Final)' : 'Tengah Sesi (Mid)'}"`,
      `"${r.attendanceRate}%"`,
      `"${r.scores.computationalThinking}"`,
      `"${r.scores.creativityDesign}"`,
      `"${r.scores.problemSolving}"`,
      `"${r.scores.codeMastery}"`,
      `"${r.scores.teamworkAttitude}"`,
      `"${r.averageScore}"`,
      `"${r.gradeLetter}"`,
      `"${r.predicateTitle.replace(/"/g, '""')}"`,
      `"${r.capstoneProjectTitle.replace(/"/g, '""')}"`,
      `"${r.instructorName.replace(/"/g, '""')}"`,
      `"${r.instructorNotes.replace(/"/g, '""')}"`,
      `"${r.nextStepRecommendation.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_rapor_akademik_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export reports CSV:', err);
  }
}

// ==========================================
// 16. MANAJEMEN KUPON PROMO, DISKON & BEASISWA
// ==========================================

export const DEFAULT_VOUCHERS: PromoVoucher[] = [
  {
    id: 'vch-2026-001',
    code: 'BEEKODINGAI',
    title: 'Spesial Peluncuran Program Teens Fullstack Web & AI',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscountAmount: 300000,
    minTransactionAmount: 500000,
    usageLimit: 50,
    usedCount: 18,
    validFrom: '2026-06-01',
    validUntil: '2026-09-30',
    applicableTiers: ['teens', 'all'],
    status: 'active',
    description:
      'Diskon 20% (maksimal potongan Rp 300.000) untuk pendaftaran kelas Teens Innovator (React, Tailwind & Prompt Engineering).',
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'vch-2026-002',
    code: 'EARLYBIRD2026',
    title: 'Diskon Pendaftaran Gelombang Awal (Early Bird)',
    discountType: 'fixed',
    discountValue: 200000,
    minTransactionAmount: 600000,
    usageLimit: 25,
    usedCount: 21,
    validFrom: '2026-06-01',
    validUntil: '2026-07-31',
    applicableTiers: ['junior', 'middle', 'teens', 'all'],
    status: 'active',
    description:
      'Potongan langsung Rp 200.000 untuk 25 pendaftar tercepat di batch liburan sekolah semua jenjang kelas.',
    createdAt: '2026-06-01T09:30:00.000Z',
    updatedAt: '2026-06-01T09:30:00.000Z',
  },
  {
    id: 'vch-2026-003',
    code: 'BEASISWA50',
    title: 'Program Beasiswa Bakat Coding Merdeka (50% Off)',
    discountType: 'percentage',
    discountValue: 50,
    maxDiscountAmount: 750000,
    minTransactionAmount: 500000,
    usageLimit: 15,
    usedCount: 9,
    validFrom: '2026-05-01',
    validUntil: '2026-12-31',
    applicableTiers: ['junior', 'middle', 'teens', 'all'],
    status: 'active',
    description:
      'Subsidi beasiswa 50% bagi siswa yang berhasil meraih skor asesmen diagnostik di atas 85 pada tes bakat logika.',
    createdAt: '2026-05-01T10:00:00.000Z',
    updatedAt: '2026-05-01T10:00:00.000Z',
  },
  {
    id: 'vch-2026-004',
    code: 'SAHABATLEBAH',
    title: 'Voucher Referral Rekomendasi Antar Wali Murid',
    discountType: 'fixed',
    discountValue: 150000,
    minTransactionAmount: 500000,
    usageLimit: 100,
    usedCount: 34,
    validFrom: '2026-01-01',
    validUntil: '2026-12-31',
    applicableTiers: ['junior', 'middle', 'teens', 'all'],
    status: 'active',
    description:
      'Potongan apresiasi Rp 150.000 untuk wali murid baru yang mendaftar melalui rekomendasi orang tua siswa aktif Beekoding.',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'vch-2026-005',
    code: 'HOLIDAYCAMP',
    title: 'Diskon Spesial Liburan: Scratch & Roblox Camp',
    discountType: 'percentage',
    discountValue: 15,
    maxDiscountAmount: 200000,
    minTransactionAmount: 450000,
    usageLimit: 40,
    usedCount: 14,
    validFrom: '2026-06-15',
    validUntil: '2026-07-31',
    applicableTiers: ['junior', 'middle'],
    status: 'active',
    description:
      'Diskon 15% untuk kelas intensif liburan sekolah pembuatan game 2D Scratch dan metaverse Roblox Studio.',
    createdAt: '2026-06-15T08:00:00.000Z',
    updatedAt: '2026-06-15T08:00:00.000Z',
  },
  {
    id: 'vch-2026-006',
    code: 'FLASHKODING',
    title: 'Flash Promo Akhir Pekan Ceria (Kuota Penuh)',
    discountType: 'fixed',
    discountValue: 300000,
    minTransactionAmount: 750000,
    usageLimit: 10,
    usedCount: 10,
    validFrom: '2026-05-01',
    validUntil: '2026-05-05',
    applicableTiers: ['all'],
    status: 'depleted',
    description:
      'Potongan kilat Rp 300.000 untuk pendaftaran kelas weekend offline perdana (kuota telah terpenuhi).',
    createdAt: '2026-05-01T08:00:00.000Z',
    updatedAt: '2026-05-05T23:59:59.000Z',
  },
];

export function getPromoVouchers(): PromoVoucher[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOUCHERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(DEFAULT_VOUCHERS));
      return DEFAULT_VOUCHERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_VOUCHERS;
  } catch (err) {
    console.error('Failed to load promo vouchers:', err);
    return DEFAULT_VOUCHERS;
  }
}

export function savePromoVouchers(vouchers: PromoVoucher[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));
  } catch (err) {
    console.error('Failed to save promo vouchers:', err);
  }
}

export function createPromoVoucher(
  data: Omit<PromoVoucher, 'id' | 'createdAt' | 'updatedAt' | 'usedCount'>
): PromoVoucher {
  const vouchers = getPromoVouchers();
  const newVoucher: PromoVoucher = {
    ...data,
    id: `vch-${Date.now().toString().slice(-6)}`,
    code: data.code.trim().toUpperCase().replace(/\s+/g, ''),
    usedCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  vouchers.unshift(newVoucher);
  savePromoVouchers(vouchers);
  return newVoucher;
}

export function updatePromoVoucher(
  id: string,
  updates: Partial<PromoVoucher>
): PromoVoucher | null {
  const vouchers = getPromoVouchers();
  const index = vouchers.findIndex((v) => v.id === id);
  if (index === -1) return null;

  const current = vouchers[index];
  const updatedVoucher: PromoVoucher = {
    ...current,
    ...updates,
    code: updates.code
      ? updates.code.trim().toUpperCase().replace(/\s+/g, '')
      : current.code,
    updatedAt: new Date().toISOString(),
  };

  vouchers[index] = updatedVoucher;
  savePromoVouchers(vouchers);
  return updatedVoucher;
}

export function deletePromoVoucher(id: string): boolean {
  const vouchers = getPromoVouchers();
  const filtered = vouchers.filter((v) => v.id !== id);
  if (filtered.length === vouchers.length) return false;
  savePromoVouchers(filtered);
  return true;
}

export function resetPromoVouchersToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(DEFAULT_VOUCHERS));
  } catch (err) {
    console.error('Failed to reset promo vouchers to default:', err);
  }
}

export function validateAndApplyVoucher(
  code: string,
  amount: number,
  tier?: string
): {
  isValid: boolean;
  discountAmount: number;
  finalAmount: number;
  message: string;
  voucher?: PromoVoucher;
} {
  const normalizedCode = code.trim().toUpperCase().replace(/\s+/g, '');
  if (!normalizedCode) {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: 'Silakan masukkan kode voucher.',
    };
  }

  const vouchers = getPromoVouchers();
  const voucher = vouchers.find((v) => v.code === normalizedCode);

  if (!voucher) {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Kode voucher "${code}" tidak ditemukan dalam sistem.`,
    };
  }

  if (voucher.status === 'paused') {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Voucher "${voucher.code}" saat ini sedang dijeda oleh administrator.`,
      voucher,
    };
  }

  const today = new Date().toISOString().split('T')[0];
  if (today < voucher.validFrom) {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Voucher baru dapat digunakan mulai tanggal ${voucher.validFrom}.`,
      voucher,
    };
  }

  if (today > voucher.validUntil || voucher.status === 'expired') {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Voucher "${voucher.code}" telah kedaluwarsa pada ${voucher.validUntil}.`,
      voucher,
    };
  }

  if (voucher.usedCount >= voucher.usageLimit || voucher.status === 'depleted') {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Kuota penggunaan voucher "${voucher.code}" telah habis (${voucher.usageLimit}/${voucher.usageLimit}).`,
      voucher,
    };
  }

  if (
    tier &&
    !voucher.applicableTiers.includes('all') &&
    !voucher.applicableTiers.includes(tier as any)
  ) {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Voucher "${voucher.code}" hanya berlaku untuk kelas jenjang ${voucher.applicableTiers
        .join(', ')
        .toUpperCase()}.`,
      voucher,
    };
  }

  if (amount < voucher.minTransactionAmount) {
    return {
      isValid: false,
      discountAmount: 0,
      finalAmount: amount,
      message: `Minimal nilai transaksi untuk voucher ini adalah Rp ${voucher.minTransactionAmount.toLocaleString(
        'id-ID'
      )}.`,
      voucher,
    };
  }

  // Calculate discount amount
  let discount = 0;
  if (voucher.discountType === 'percentage') {
    discount = Math.round((amount * voucher.discountValue) / 100);
    if (voucher.maxDiscountAmount && discount > voucher.maxDiscountAmount) {
      discount = voucher.maxDiscountAmount;
    }
  } else {
    discount = voucher.discountValue;
  }

  if (discount > amount) {
    discount = amount;
  }

  const finalAmount = amount - discount;

  return {
    isValid: true,
    discountAmount: discount,
    finalAmount,
    message: `Voucher "${voucher.code}" berhasil diterapkan! Anda hemat Rp ${discount.toLocaleString(
      'id-ID'
    )}.`,
    voucher,
  };
}

export function calculateVoucherStats(vouchers: PromoVoucher[]) {
  const totalVouchers = vouchers.length;
  const activeVouchers = vouchers.filter((v) => v.status === 'active').length;
  const totalRedemptions = vouchers.reduce((acc, curr) => acc + curr.usedCount, 0);

  // Estimasi total nilai diskon yang telah dinikmati siswa
  let estimatedTotalDiscountGiven = 0;
  vouchers.forEach((v) => {
    if (v.discountType === 'fixed') {
      estimatedTotalDiscountGiven += v.discountValue * v.usedCount;
    } else {
      // Perkiraan rata-rata diskon persentase berdasarkan min transaksi
      const approxDisc = v.maxDiscountAmount
        ? v.maxDiscountAmount
        : Math.round((v.minTransactionAmount * v.discountValue) / 100);
      estimatedTotalDiscountGiven += approxDisc * v.usedCount;
    }
  });

  return {
    totalVouchers,
    activeVouchers,
    totalRedemptions,
    estimatedTotalDiscountGiven,
  };
}

export function exportVouchersCSV(vouchers: PromoVoucher[]): void {
  try {
    const headers = [
      'ID Voucher',
      'Kode Kupon',
      'Judul Program Promo',
      'Tipe Diskon',
      'Nilai Diskon',
      'Maksimal Potongan (Rp)',
      'Minimal Transaksi (Rp)',
      'Kuota Maksimal',
      'Terpakai',
      'Sisa Kuota',
      'Berlaku Dari',
      'Berlaku Hingga',
      'Jenjang Berlaku',
      'Status',
      'Deskripsi',
    ];

    const rows = vouchers.map((v) => [
      `"${v.id}"`,
      `"${v.code}"`,
      `"${v.title.replace(/"/g, '""')}"`,
      `"${v.discountType === 'percentage' ? 'Persentase (%)' : 'Nominal Tetap (Rp)'}"`,
      `"${v.discountType === 'percentage' ? `${v.discountValue}%` : `Rp ${v.discountValue.toLocaleString('id-ID')}`}"`,
      `"${v.maxDiscountAmount ? `Rp ${v.maxDiscountAmount.toLocaleString('id-ID')}` : '-'}"`,
      `"Rp ${v.minTransactionAmount.toLocaleString('id-ID')}"`,
      `"${v.usageLimit}"`,
      `"${v.usedCount}"`,
      `"${Math.max(0, v.usageLimit - v.usedCount)}"`,
      `"${v.validFrom}"`,
      `"${v.validUntil}"`,
      `"${v.applicableTiers.join(', ').toUpperCase()}"`,
      `"${v.status.toUpperCase()}"`,
      `"${v.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_voucher_diskon_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export vouchers CSV:', err);
  }
}

// ==========================================
// 18. MANAJEMEN GAMIFIKASI, QUEST & LENCANA SISWA
// ==========================================

export function calculateLevelFromXp(xp: number): {
  level: number;
  levelTitle: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
} {
  if (xp >= 1000) {
    return {
      level: 5,
      levelTitle: 'Royal AI Pioneer 👑',
      currentLevelXp: xp,
      nextLevelXp: 1000,
      progressPercent: 100,
    };
  }
  if (xp >= 750) {
    return {
      level: 4,
      levelTitle: 'Master Architect 🏰',
      currentLevelXp: xp - 750,
      nextLevelXp: 250,
      progressPercent: Math.min(100, Math.round(((xp - 750) / 250) * 100)),
    };
  }
  if (xp >= 500) {
    return {
      level: 3,
      levelTitle: 'Scout Coder 🧭',
      currentLevelXp: xp - 500,
      nextLevelXp: 250,
      progressPercent: Math.min(100, Math.round(((xp - 500) / 250) * 100)),
    };
  }
  if (xp >= 250) {
    return {
      level: 2,
      levelTitle: 'Worker Bee 🐝',
      currentLevelXp: xp - 250,
      nextLevelXp: 250,
      progressPercent: Math.min(100, Math.round(((xp - 250) / 250) * 100)),
    };
  }
  return {
    level: 1,
    levelTitle: 'Baby Bee Explorer 🐣',
    currentLevelXp: xp,
    nextLevelXp: 250,
    progressPercent: Math.min(100, Math.round((xp / 250) * 100)),
  };
}

export const DEFAULT_BADGES: AchievementBadge[] = [
  {
    id: 'badge-bug-hunter',
    title: 'Bug Hunter',
    iconEmoji: '🐞',
    category: 'logic',
    description: 'Menemukan dan memperbaiki 5 kesalahan logika atau script error secara mandiri.',
    xpBonus: 150,
    rarity: 'rare',
    awardCount: 14,
  },
  {
    id: 'badge-loop-master',
    title: 'Loop Master',
    iconEmoji: '🔁',
    category: 'logic',
    description: 'Menguasai perulangan bersarang (nested loops) dan timer interval tanpa lag.',
    xpBonus: 120,
    rarity: 'rare',
    awardCount: 18,
  },
  {
    id: 'badge-pixel-artist',
    title: 'Pixel Artist',
    iconEmoji: '🎨',
    category: 'creativity',
    description: 'Merancang sprite animasi, backdrop custom, dan efek visual orisinal gubahan sendiri.',
    xpBonus: 100,
    rarity: 'common',
    awardCount: 12,
  },
  {
    id: 'badge-speed-coder',
    title: 'Speed Coder',
    iconEmoji: '⚡',
    category: 'persistence',
    description: 'Menuntaskan tantangan koding mingguan dalam kurun waktu 24 jam pertama.',
    xpBonus: 200,
    rarity: 'epic',
    awardCount: 8,
  },
  {
    id: 'badge-ai-explorer',
    title: 'AI Explorer',
    iconEmoji: '🤖',
    category: 'logic',
    description: 'Berhasil mengintegrasikan prompt AI, model token, dan API kecerdasan buatan.',
    xpBonus: 250,
    rarity: 'legendary',
    awardCount: 6,
  },
  {
    id: 'badge-perfect-attendance',
    title: 'Perfect Attendance',
    iconEmoji: '🌟',
    category: 'attendance',
    description: 'Hadir 100% tepat waktu pada seluruh sesi pertemuan kelas tanpa absen.',
    xpBonus: 150,
    rarity: 'epic',
    awardCount: 22,
  },
  {
    id: 'badge-capstone-champ',
    title: 'Capstone Champion',
    iconEmoji: '🏆',
    category: 'capstone',
    description: 'Meraih nilai evaluasi A+ (High Distinction) pada presentasi proyek akhir kelulusan.',
    xpBonus: 300,
    rarity: 'legendary',
    awardCount: 5,
  },
  {
    id: 'badge-teamwork-hero',
    title: 'Teamwork Hero',
    iconEmoji: '🤝',
    category: 'persistence',
    description: 'Aktif mendampingi dan berbagi tips pemecahan kode dengan rekan satu kelas.',
    xpBonus: 50,
    rarity: 'common',
    awardCount: 25,
  },
];

export const DEFAULT_QUESTS: CodingQuest[] = [
  {
    id: 'quest-2026-001',
    title: 'Labirin Lebah Pengumpul Madu 2D',
    tier: 'junior',
    difficulty: 'mudah',
    xpReward: 100,
    badgeRewardId: 'badge-loop-master',
    description:
      'Rancang game Scratch di mana lebah harus bergerak mengumpulkan 5 bunga nektar menggunakan blok keyboard arrow tanpa menabrak dinding rintangan labirin.',
    starterLink: 'https://scratch.mit.edu',
    submissionFormat: 'link_scratch',
    deadline: '2026-06-25',
    status: 'active',
    completedCount: 8,
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'quest-2026-002',
    title: 'Detektor Buah Busuk dengan Broadcast Message',
    tier: 'junior',
    difficulty: 'sedang',
    xpReward: 150,
    badgeRewardId: 'badge-bug-hunter',
    description:
      'Gunakan fitur Broadcast & Receive di Scratch untuk mendeteksi apel busuk yang jatuh dan kurangi skor pemain bila tersentuh keranjang.',
    starterLink: 'https://scratch.mit.edu',
    submissionFormat: 'link_scratch',
    deadline: '2026-06-28',
    status: 'active',
    completedCount: 5,
    createdAt: '2026-06-05T09:00:00.000Z',
    updatedAt: '2026-06-05T09:00:00.000Z',
  },
  {
    id: 'quest-2026-003',
    title: 'Mekanik Pintu Rahasia Roblox Lua Scripting',
    tier: 'middle',
    difficulty: 'sedang',
    xpReward: 180,
    badgeRewardId: 'badge-loop-master',
    description:
      'Tuliskan script Lua pada Roblox Studio yang memutar CFrame part pintu saat tombol rahasia disentuh avatar pemain dengan efek suara klik.',
    starterLink: 'https://roblox.com/create',
    submissionFormat: 'text',
    deadline: '2026-06-30',
    status: 'active',
    completedCount: 6,
    createdAt: '2026-06-08T10:00:00.000Z',
    updatedAt: '2026-06-08T10:00:00.000Z',
  },
  {
    id: 'quest-2026-004',
    title: 'Kalkulator Skor Pertandingan Python Logic',
    tier: 'middle',
    difficulty: 'menantang',
    xpReward: 220,
    badgeRewardId: 'badge-speed-coder',
    description:
      'Buat program CLI Python dengan struktur kontrol if-elif-else dan list comprehension untuk menghitung poin liga sepak bola dan mencetak juara grup.',
    starterLink: 'https://replit.com',
    submissionFormat: 'file_python',
    deadline: '2026-07-02',
    status: 'active',
    completedCount: 4,
    createdAt: '2026-06-10T11:00:00.000Z',
    updatedAt: '2026-06-10T11:00:00.000Z',
  },
  {
    id: 'quest-2026-005',
    title: 'Responsive Portfolio Card Tailwind & Grid',
    tier: 'teens',
    difficulty: 'sedang',
    xpReward: 200,
    badgeRewardId: 'badge-pixel-artist',
    description:
      'Bangun kartu showcase proyek portofolio yang responsif dengan efek glassmorphism, badge tech-stack, dan transition hover halus.',
    starterLink: 'https://github.com',
    submissionFormat: 'link_github',
    deadline: '2026-07-05',
    status: 'active',
    completedCount: 7,
    createdAt: '2026-06-12T13:00:00.000Z',
    updatedAt: '2026-06-12T13:00:00.000Z',
  },
  {
    id: 'quest-2026-006',
    title: 'Chatbot Asisten Belajar dengan AI Prompt API',
    tier: 'teens',
    difficulty: 'menantang',
    xpReward: 300,
    badgeRewardId: 'badge-ai-explorer',
    description:
      'Hubungkan frontend React ke endpoint LLM API untuk merancang asisten belajar koding yang mampu menjelaskan konsep rekursi dalam bahasa santai.',
    starterLink: 'https://github.com',
    submissionFormat: 'link_github',
    deadline: '2026-07-10',
    status: 'active',
    completedCount: 3,
    createdAt: '2026-06-15T15:00:00.000Z',
    updatedAt: '2026-06-15T15:00:00.000Z',
  },
];

export const DEFAULT_GAMIFICATION_PROFILES: StudentGamificationProfile[] = [
  {
    studentId: 'stud-001',
    studentName: 'Kenzo Alvaro Pratama',
    parentPhone: '081234567890',
    tier: 'junior',
    totalXp: 850,
    level: 4,
    levelTitle: 'Master Architect 🏰',
    earnedBadges: [
      { badgeId: 'badge-loop-master', badgeTitle: 'Loop Master', earnedAt: '2026-06-10' },
      { badgeId: 'badge-perfect-attendance', badgeTitle: 'Perfect Attendance', earnedAt: '2026-06-25' },
      { badgeId: 'badge-capstone-champ', badgeTitle: 'Capstone Champion', earnedAt: '2026-06-30' },
      { badgeId: 'badge-teamwork-hero', badgeTitle: 'Teamwork Hero', earnedAt: '2026-06-18' },
    ],
    completedQuestsCount: 5,
    lastActiveDate: '2026-06-30',
  },
  {
    studentId: 'stud-002',
    studentName: 'Alya Zahra Kirana',
    parentPhone: '081987654321',
    tier: 'middle',
    totalXp: 720,
    level: 3,
    levelTitle: 'Scout Coder 🧭',
    earnedBadges: [
      { badgeId: 'badge-bug-hunter', badgeTitle: 'Bug Hunter', earnedAt: '2026-06-12' },
      { badgeId: 'badge-loop-master', badgeTitle: 'Loop Master', earnedAt: '2026-06-20' },
      { badgeId: 'badge-perfect-attendance', badgeTitle: 'Perfect Attendance', earnedAt: '2026-06-28' },
    ],
    completedQuestsCount: 4,
    lastActiveDate: '2026-06-29',
  },
  {
    studentId: 'stud-003',
    studentName: 'Rafa Azka Putra',
    parentPhone: '081211112222',
    tier: 'middle',
    totalXp: 680,
    level: 3,
    levelTitle: 'Scout Coder 🧭',
    earnedBadges: [
      { badgeId: 'badge-loop-master', badgeTitle: 'Loop Master', earnedAt: '2026-06-14' },
      { badgeId: 'badge-speed-coder', badgeTitle: 'Speed Coder', earnedAt: '2026-06-22' },
      { badgeId: 'badge-capstone-champ', badgeTitle: 'Capstone Champion', earnedAt: '2026-06-29' },
    ],
    completedQuestsCount: 4,
    lastActiveDate: '2026-06-29',
  },
  {
    studentId: 'stud-004',
    studentName: 'Rafi Danendra Putra',
    parentPhone: '082155554321',
    tier: 'teens',
    totalXp: 950,
    level: 4,
    levelTitle: 'Master Architect 🏰',
    earnedBadges: [
      { badgeId: 'badge-bug-hunter', badgeTitle: 'Bug Hunter', earnedAt: '2026-06-10' },
      { badgeId: 'badge-pixel-artist', badgeTitle: 'Pixel Artist', earnedAt: '2026-06-18' },
      { badgeId: 'badge-speed-coder', badgeTitle: 'Speed Coder', earnedAt: '2026-06-24' },
      { badgeId: 'badge-ai-explorer', badgeTitle: 'AI Explorer', earnedAt: '2026-06-28' },
      { badgeId: 'badge-perfect-attendance', badgeTitle: 'Perfect Attendance', earnedAt: '2026-07-02' },
    ],
    completedQuestsCount: 6,
    lastActiveDate: '2026-07-02',
  },
  {
    studentId: 'stud-005',
    studentName: 'Nathania Putri Kusuma',
    parentPhone: '081377889900',
    tier: 'junior',
    totalXp: 420,
    level: 2,
    levelTitle: 'Worker Bee 🐝',
    earnedBadges: [
      { badgeId: 'badge-pixel-artist', badgeTitle: 'Pixel Artist', earnedAt: '2026-06-15' },
      { badgeId: 'badge-teamwork-hero', badgeTitle: 'Teamwork Hero', earnedAt: '2026-06-22' },
    ],
    completedQuestsCount: 2,
    lastActiveDate: '2026-06-25',
  },
  {
    studentId: 'stud-006',
    studentName: 'Farrel Raditya',
    parentPhone: '081399001122',
    tier: 'teens',
    totalXp: 610,
    level: 3,
    levelTitle: 'Scout Coder 🧭',
    earnedBadges: [
      { badgeId: 'badge-speed-coder', badgeTitle: 'Speed Coder', earnedAt: '2026-06-16' },
      { badgeId: 'badge-ai-explorer', badgeTitle: 'AI Explorer', earnedAt: '2026-06-26' },
      { badgeId: 'badge-teamwork-hero', badgeTitle: 'Teamwork Hero', earnedAt: '2026-07-01' },
    ],
    completedQuestsCount: 3,
    lastActiveDate: '2026-07-01',
  },
];

// 1. Quests CRUD
export function getCodingQuests(): CodingQuest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(DEFAULT_QUESTS));
      return DEFAULT_QUESTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_QUESTS;
  } catch (err) {
    console.error('Failed to get coding quests:', err);
    return DEFAULT_QUESTS;
  }
}

export function saveCodingQuests(quests: CodingQuest[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
  } catch (err) {
    console.error('Failed to save coding quests:', err);
  }
}

export function createCodingQuest(
  data: Omit<CodingQuest, 'id' | 'createdAt' | 'updatedAt' | 'completedCount'>
): CodingQuest {
  const quests = getCodingQuests();
  const nextNum = quests.length + 1;
  const newId = `quest-2026-${String(nextNum).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const newQuest: CodingQuest = {
    ...data,
    id: newId,
    completedCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newQuest, ...quests];
  saveCodingQuests(updated);
  return newQuest;
}

export function updateCodingQuest(
  id: string,
  updates: Partial<CodingQuest>
): CodingQuest | null {
  const quests = getCodingQuests();
  const index = quests.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const updatedQuest: CodingQuest = {
    ...quests[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  quests[index] = updatedQuest;
  saveCodingQuests(quests);
  return updatedQuest;
}

export function deleteCodingQuest(id: string): boolean {
  const quests = getCodingQuests();
  const filtered = quests.filter((q) => q.id !== id);
  if (filtered.length === quests.length) return false;
  saveCodingQuests(filtered);
  return true;
}

export function resetCodingQuestsToDefault(): void {
  saveCodingQuests(DEFAULT_QUESTS);
}

// 2. Badges CRUD
export function getAchievementBadges(): AchievementBadge[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BADGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(DEFAULT_BADGES));
      return DEFAULT_BADGES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_BADGES;
  } catch (err) {
    console.error('Failed to get badges:', err);
    return DEFAULT_BADGES;
  }
}

export function saveAchievementBadges(badges: AchievementBadge[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  } catch (err) {
    console.error('Failed to save badges:', err);
  }
}

export function resetAchievementBadgesToDefault(): void {
  saveAchievementBadges(DEFAULT_BADGES);
}

// 3. Gamification Profiles & Actions
export function getGamificationProfiles(): StudentGamificationProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.GAMIFICATION,
        JSON.stringify(DEFAULT_GAMIFICATION_PROFILES)
      );
      return DEFAULT_GAMIFICATION_PROFILES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_GAMIFICATION_PROFILES;
  } catch (err) {
    console.error('Failed to get gamification profiles:', err);
    return DEFAULT_GAMIFICATION_PROFILES;
  }
}

export function saveGamificationProfiles(profiles: StudentGamificationProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save gamification profiles:', err);
  }
}

export function resetGamificationToDefault(): void {
  saveGamificationProfiles(DEFAULT_GAMIFICATION_PROFILES);
}

export function awardBadgeToStudent(studentName: string, badgeId: string): boolean {
  const profiles = getGamificationProfiles();
  const badges = getAchievementBadges();
  const badge = badges.find((b) => b.id === badgeId);
  if (!badge) return false;

  const targetName = studentName.toLowerCase().trim();
  const profileIndex = profiles.findIndex(
    (p) => p.studentName.toLowerCase().trim() === targetName
  );

  const todayStr = new Date().toISOString().split('T')[0];

  if (profileIndex !== -1) {
    const prof = profiles[profileIndex];
    // Check if already has badge
    if (prof.earnedBadges.some((b) => b.badgeId === badgeId)) {
      return false; // already awarded
    }

    const newXp = prof.totalXp + badge.xpBonus;
    const lvlInfo = calculateLevelFromXp(newXp);

    prof.earnedBadges.push({
      badgeId: badge.id,
      badgeTitle: badge.title,
      earnedAt: todayStr,
    });
    prof.totalXp = newXp;
    prof.level = lvlInfo.level;
    prof.levelTitle = lvlInfo.levelTitle;
    prof.lastActiveDate = todayStr;

    profiles[profileIndex] = prof;
    saveGamificationProfiles(profiles);

    // Update awardCount on badge
    badge.awardCount += 1;
    saveAchievementBadges(badges);
    return true;
  } else {
    // Create new profile
    const lvlInfo = calculateLevelFromXp(badge.xpBonus);
    const newProf: StudentGamificationProfile = {
      studentId: `stud-${Date.now().toString(36)}`,
      studentName: studentName.trim(),
      parentPhone: '-',
      tier: 'junior',
      totalXp: badge.xpBonus,
      level: lvlInfo.level,
      levelTitle: lvlInfo.levelTitle,
      earnedBadges: [
        { badgeId: badge.id, badgeTitle: badge.title, earnedAt: todayStr },
      ],
      completedQuestsCount: 0,
      lastActiveDate: todayStr,
    };
    profiles.push(newProf);
    saveGamificationProfiles(profiles);

    badge.awardCount += 1;
    saveAchievementBadges(badges);
    return true;
  }
}

export function awardXpToStudent(studentName: string, xpAmount: number): boolean {
  const profiles = getGamificationProfiles();
  const targetName = studentName.toLowerCase().trim();
  const profileIndex = profiles.findIndex(
    (p) => p.studentName.toLowerCase().trim() === targetName
  );

  const todayStr = new Date().toISOString().split('T')[0];

  if (profileIndex !== -1) {
    const prof = profiles[profileIndex];
    const newXp = Math.max(0, prof.totalXp + xpAmount);
    const lvlInfo = calculateLevelFromXp(newXp);

    prof.totalXp = newXp;
    prof.level = lvlInfo.level;
    prof.levelTitle = lvlInfo.levelTitle;
    prof.lastActiveDate = todayStr;

    profiles[profileIndex] = prof;
    saveGamificationProfiles(profiles);
    return true;
  }
  return false;
}

export function exportQuestsCSV(quests: CodingQuest[]): void {
  try {
    const headers = [
      'ID Quest',
      'Judul Tantangan Koding',
      'Jenjang',
      'Tingkat Kesulitan',
      'Hadiah XP',
      'Hadiah Lencana',
      'Format Submission',
      'Batas Waktu',
      'Peserta Tuntas',
      'Status',
      'Deskripsi',
    ];

    const rows = quests.map((q) => [
      `"${q.id}"`,
      `"${q.title.replace(/"/g, '""')}"`,
      `"${q.tier.toUpperCase()}"`,
      `"${q.difficulty.toUpperCase()}"`,
      `"${q.xpReward} XP"`,
      `"${q.badgeRewardId || '-'}"`,
      `"${q.submissionFormat}"`,
      `"${q.deadline}"`,
      `"${q.completedCount}"`,
      `"${q.status.toUpperCase()}"`,
      `"${q.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_tantangan_koding_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export quests CSV:', err);
  }
}

// ==========================================
// 19. MANAJEMEN PENGUMUMAN KELAS & SIARAN WHATSAPP
// ==========================================

export const DEFAULT_ANNOUNCEMENTS: ClassAnnouncement[] = [
  {
    id: 'ann-2026-001',
    title: '📢 Libur Nasional Hari Raya & Penyesuaian Jadwal Sesi',
    category: 'holiday',
    audience: 'all',
    content:
      'Diberitahukan kepada seluruh wali murid dan siswa bahwa seluruh aktivitas sesi kelas daring maupun tatap muka ditiadakan pada hari Jumat - Minggu, 26-28 Juni 2026 dalam rangka Libur Nasional. Sesi pengganti akan dialihkan ke minggu berikutnya dengan jam belajar yang sama.',
    priority: 'urgent',
    pinned: true,
    authorName: 'Admin Akademik Beekoding',
    publishedAt: '2026-06-20',
    expiresAt: '2026-06-29',
    status: 'published',
    readCount: 68,
    createdAt: '2026-06-20T08:00:00.000Z',
    updatedAt: '2026-06-20T08:00:00.000Z',
  },
  {
    id: 'ann-2026-002',
    title: '🚀 Persiapan Presentasi Karya Capstone Project Batch 1',
    category: 'academic',
    audience: 'junior',
    batchId: 'batch-2026-01',
    batchName: 'Junior Explorer: Visual Scratch & AI Logic (Batch 1)',
    content:
      'Halo Ayah & Bunda! Pertemuan ke-12 adalah sesi Graduation & Demo Day! Harap mendampingi ananda untuk memastikan link proyek Scratch telah di-share ke publik dan mikrofon komputer berfungsi dengan baik.',
    priority: 'important',
    pinned: true,
    authorName: 'Kak Sarah Amalia, S.T.',
    publishedAt: '2026-06-22',
    expiresAt: '2026-07-05',
    status: 'published',
    readCount: 42,
    createdAt: '2026-06-22T10:30:00.000Z',
    updatedAt: '2026-06-22T10:30:00.000Z',
  },
  {
    id: 'ann-2026-003',
    title: '🤖 Pembaruan Modul: Integrasi Prompt Engineering & Vision AI',
    category: 'academic',
    audience: 'teens',
    content:
      'Kabar gembira untuk siswa jenjang Teens Innovator! Beekoding telah mengintegrasikan API model multimodal terbaru ke dalam workspace React latihan kita. Siswa dapat mulai membangun asisten koding interaktif berbasis vision.',
    priority: 'normal',
    pinned: false,
    authorName: 'Kak Febri Hasan, S.Kom., M.T.',
    publishedAt: '2026-06-24',
    status: 'published',
    readCount: 35,
    createdAt: '2026-06-24T14:00:00.000Z',
    updatedAt: '2026-06-24T14:00:00.000Z',
  },
  {
    id: 'ann-2026-004',
    title: '🏆 Kompetisi Koding Nasional Beekoding Hackathon 2026',
    category: 'event',
    audience: 'all',
    content:
      'Pendaftaran Beekoding National Kids Coding Championship resmi dibuka! Terdapat kategori Scratch Game, Roblox World Builder, dan Web App for SDGs. Seluruh peserta aktif Beekoding mendapatkan tiket pendaftaran gratis.',
    priority: 'important',
    pinned: false,
    authorName: 'Tim Manajemen Event Beekoding',
    publishedAt: '2026-06-25',
    expiresAt: '2026-08-15',
    status: 'published',
    readCount: 94,
    createdAt: '2026-06-25T09:15:00.000Z',
    updatedAt: '2026-06-25T09:15:00.000Z',
  },
  {
    id: 'ann-2026-005',
    title: '⚠️ Perawatan Server Lab Online pada Pukul 23:00 WIB',
    category: 'urgent',
    audience: 'all',
    content:
      'Akan dilakukan pemeliharaan server database cloud coding pada hari Rabu malam pukul 23:00 - 02:00 WIB. Selama proses ini, simulator live code mungkin mengalami penurunan responsivitas sesaat.',
    priority: 'urgent',
    pinned: false,
    authorName: 'Tim DevOps & Infrastruktur',
    publishedAt: '2026-06-26',
    expiresAt: '2026-06-27',
    status: 'published',
    readCount: 29,
    createdAt: '2026-06-26T16:00:00.000Z',
    updatedAt: '2026-06-26T16:00:00.000Z',
  },
  {
    id: 'ann-2026-006',
    title: '🌟 Tips Pendampingan Belajar Koding di Rumah untuk Orang Tua',
    category: 'general',
    audience: 'all',
    content:
      'Mendampingi anak belajar computational thinking tidak memerlukan latar belakang IT! Kuncinya adalah melatih logika deduktif, memberi ruang saat ananda menemukan bug, dan mengapresiasi proses eksplorasi solusinya.',
    priority: 'normal',
    pinned: false,
    authorName: 'Tim Konseling & Edukasi Beekoding',
    publishedAt: '2026-06-27',
    status: 'published',
    readCount: 51,
    createdAt: '2026-06-27T11:20:00.000Z',
    updatedAt: '2026-06-27T11:20:00.000Z',
  },
];

export function getClassAnnouncements(): ClassAnnouncement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
      return DEFAULT_ANNOUNCEMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ANNOUNCEMENTS;
  } catch (err) {
    console.error('Failed to get class announcements:', err);
    return DEFAULT_ANNOUNCEMENTS;
  }
}

export function saveClassAnnouncements(announcements: ClassAnnouncement[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  } catch (err) {
    console.error('Failed to save class announcements:', err);
  }
}

export function resetClassAnnouncementsToDefault(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
  } catch (err) {
    console.error('Failed to reset class announcements:', err);
  }
}

export function createClassAnnouncement(
  data: Omit<ClassAnnouncement, 'id' | 'createdAt' | 'updatedAt' | 'readCount'>
): ClassAnnouncement {
  const announcements = getClassAnnouncements();
  const newAnn: ClassAnnouncement = {
    ...data,
    id: `ann-${Date.now().toString(36)}`,
    readCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // If pinned, insert at beginning
  if (newAnn.pinned) {
    announcements.unshift(newAnn);
  } else {
    announcements.push(newAnn);
  }

  saveClassAnnouncements(announcements);
  return newAnn;
}

export function updateClassAnnouncement(
  id: string,
  data: Partial<ClassAnnouncement>
): ClassAnnouncement | null {
  const announcements = getClassAnnouncements();
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  const updated: ClassAnnouncement = {
    ...announcements[idx],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  announcements[idx] = updated;
  saveClassAnnouncements(announcements);
  return updated;
}

export function deleteClassAnnouncement(id: string): boolean {
  const announcements = getClassAnnouncements();
  const filtered = announcements.filter((a) => a.id !== id);
  if (filtered.length !== announcements.length) {
    saveClassAnnouncements(filtered);
    return true;
  }
  return false;
}

export function togglePinAnnouncement(id: string): boolean {
  const announcements = getClassAnnouncements();
  const idx = announcements.findIndex((a) => a.id === id);
  if (idx === -1) return false;

  announcements[idx].pinned = !announcements[idx].pinned;
  announcements[idx].updatedAt = new Date().toISOString();
  saveClassAnnouncements(announcements);
  return true;
}

export function exportAnnouncementsCSV(announcements: ClassAnnouncement[]): void {
  try {
    const headers = [
      'ID Pengumuman',
      'Judul Pengumuman',
      'Kategori',
      'Target Audiens',
      'Batch Spesifik',
      'Prioritas',
      'Disematkan (PIN)',
      'Penulis / Author',
      'Tanggal Terbit',
      'Tanggal Berakhir',
      'Status',
      'Dibaca (Kali)',
      'Isi Pengumuman',
    ];

    const rows = announcements.map((a) => [
      `"${a.id}"`,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.category.toUpperCase()}"`,
      `"${a.audience.toUpperCase()}"`,
      `"${a.batchName || '-'}"`,
      `"${a.priority.toUpperCase()}"`,
      `"${a.pinned ? 'YA' : 'TIDAK'}"`,
      `"${a.authorName}"`,
      `"${a.publishedAt}"`,
      `"${a.expiresAt || '-'}"`,
      `"${a.status.toUpperCase()}"`,
      `"${a.readCount}"`,
      `"${a.content.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_pengumuman_siaran_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export announcements CSV:', err);
  }
}

export function generateWhatsAppBroadcastMessage(announcement: ClassAnnouncement): string {
  const priorityBadge =
    announcement.priority === 'urgent'
      ? '🚨 *PENGUMUMAN PENTING & MENDESAK*'
      : announcement.priority === 'important'
      ? '📢 *PENGUMUMAN PENTING BEEKODING*'
      : 'ℹ️ *INFORMASI AKADEMIK BEEKODING*';

  const categoryLabel =
    announcement.category === 'holiday'
      ? '🏖️ Info Hari Libur & Kalender'
      : announcement.category === 'academic'
      ? '🎓 Akademik & Kurikulum'
      : announcement.category === 'event'
      ? '🏆 Event & Kejuaraan'
      : announcement.category === 'urgent'
      ? '⚠️ Peringatan Sistem/Jadwal'
      : '📌 Informasi Umum';

  const audienceLabel =
    announcement.audience === 'all'
      ? 'Seluruh Wali Murid & Siswa Beekoding'
      : announcement.audience === 'junior'
      ? 'Wali Murid & Siswa Jenjang Junior Explorer'
      : announcement.audience === 'middle'
      ? 'Wali Murid & Siswa Jenjang Middle Coder'
      : announcement.audience === 'teens'
      ? 'Wali Murid & Siswa Jenjang Teens Innovator'
      : `Kelas ${announcement.batchName || 'Khusus'}`;

  return `
${priorityBadge}
---------------------------------------------
*${announcement.title}*

📅 *Tanggal Terbit:* ${announcement.publishedAt}
🏷️ *Kategori:* ${categoryLabel}
🎯 *Sasaran:* ${audienceLabel}
✍️ *Oleh:* ${announcement.authorName}

*Isi Pengumuman:*
${announcement.content}

---------------------------------------------
📱 *Akses Portal Mandiri Siswa:*
Buka jadwal sesi, rapor, dan piagam anak di https://beekoding.id/#portal

_Salam hangat, Tim Akademik & Kesiswaan Beekoding Academy 🐝_
`.trim();
}

// ==========================================
// 20. SISTEM PENGGAJIAN & REKAP INSENTIF INSTRUKTUR
// ==========================================

export const DEFAULT_INSTRUCTOR_PAYROLLS: InstructorPayrollRecord[] = [
  {
    id: 'pay-2026-001',
    payrollNumber: 'BK-PAY/2026/06/001',
    instructorId: 'inst-2026-003',
    instructorName: 'Sarah Amalia, S.T.',
    instructorRole: 'Senior Mentor - Creative Game Dev',
    instructorPhone: '081234567891',
    bankName: 'BCA',
    bankAccountNumber: '8720-1928-33',
    bankAccountHolder: 'SARAH AMALIA',
    period: 'Juni 2026',
    paymentDate: '2026-06-30',
    teachingHours: 36,
    hourlyRate: 150000,
    baseTeachingHonor: 5400000,
    performanceIncentive: 500000, // Rating 4.9 (> 4.8 bonus)
    attendanceBonus: 300000, // Sesi 100% tepat waktu
    allowanceTotal: 250000, // Modul Scratch Junior update
    deductionsTotal: 0,
    netTotalAmount: 6450000,
    status: 'paid',
    notes: 'Honor mengajar 3 batch Junior Explorer bulan Juni 2026. Performa sangat memuaskan!',
    items: [
      {
        id: 'pi-1',
        description: 'Honor Sesi Mengajar Kelas Visual Scratch (36 Jam x Rp 150.000)',
        category: 'teaching_honor',
        rate: 150000,
        qty: 36,
        total: 5400000,
      },
      {
        id: 'pi-2',
        description: 'Insentif Rating Siswa & Kepuasan Orang Tua (4.9 / 5.0 Bintang Emas)',
        category: 'performance_incentive',
        rate: 500000,
        qty: 1,
        total: 500000,
      },
      {
        id: 'pi-3',
        description: 'Bonus Kehadiran Sesi Tepat Waktu & Rekap Presensi Lengkap',
        category: 'attendance_bonus',
        rate: 300000,
        qty: 1,
        total: 300000,
      },
      {
        id: 'pi-4',
        description: 'Tunjangan Penyusunan Modul Praktik Game Junior',
        category: 'curriculum_allowance',
        rate: 250000,
        qty: 1,
        total: 250000,
      },
    ],
    createdAt: '2026-06-28T10:00:00.000Z',
    updatedAt: '2026-06-30T14:30:00.000Z',
  },
  {
    id: 'pay-2026-002',
    payrollNumber: 'BK-PAY/2026/06/002',
    instructorId: 'inst-2026-004',
    instructorName: 'Kevin Pratama, S.Kom.',
    instructorRole: 'Senior 3D Game Dev & Metaverse Mentor',
    instructorPhone: '081298765432',
    bankName: 'Bank Mandiri',
    bankAccountNumber: '131-00-9876543-2',
    bankAccountHolder: 'KEVIN PRATAMA',
    period: 'Juni 2026',
    paymentDate: '2026-06-30',
    teachingHours: 28,
    hourlyRate: 150000,
    baseTeachingHonor: 4200000,
    performanceIncentive: 400000,
    attendanceBonus: 300000,
    allowanceTotal: 200000,
    deductionsTotal: 0,
    netTotalAmount: 5100000,
    status: 'paid',
    notes: 'Honor mengajar kelas Roblox Studio 3D Batch 2 & workshop demo day.',
    items: [
      {
        id: 'pi-5',
        description: 'Honor Sesi Mengajar Roblox Lua Scripting (28 Jam x Rp 150.000)',
        category: 'teaching_honor',
        rate: 150000,
        qty: 28,
        total: 4200000,
      },
      {
        id: 'pi-6',
        description: 'Insentif Prestasi Proyek Siswa Obby 3D',
        category: 'performance_incentive',
        rate: 400000,
        qty: 1,
        total: 400000,
      },
      {
        id: 'pi-7',
        description: 'Bonus Kehadiran & Ketepatan Waktu Evaluasi',
        category: 'attendance_bonus',
        rate: 300000,
        qty: 1,
        total: 300000,
      },
      {
        id: 'pi-8',
        description: 'Tunjangan Server Test Multiplayer Roblox Studio',
        category: 'curriculum_allowance',
        rate: 200000,
        qty: 1,
        total: 200000,
      },
    ],
    createdAt: '2026-06-28T11:00:00.000Z',
    updatedAt: '2026-06-30T15:00:00.000Z',
  },
  {
    id: 'pay-2026-003',
    payrollNumber: 'BK-PAY/2026/06/003',
    instructorId: 'inst-2026-006',
    instructorName: 'Rian Hidayat, M.Cs.',
    instructorRole: 'Fullstack Web & Cloud Deploy Mentor',
    instructorPhone: '081211223344',
    bankName: 'BCA',
    bankAccountNumber: '527-1829-012',
    bankAccountHolder: 'RIAN HIDAYAT',
    period: 'Juni 2026',
    paymentDate: '2026-06-30',
    teachingHours: 32,
    hourlyRate: 175000,
    baseTeachingHonor: 5600000,
    performanceIncentive: 600000, // Rating 5.0 sempurna
    attendanceBonus: 300000,
    allowanceTotal: 400000,
    deductionsTotal: 0,
    netTotalAmount: 6900000,
    status: 'paid',
    notes: 'Mentor kelas Teens Innovator Fullstack Web & Vercel deployment.',
    items: [
      {
        id: 'pi-9',
        description: 'Honor Sesi Mengajar Fullstack Web & AI Integration (32 Jam x Rp 175.000)',
        category: 'teaching_honor',
        rate: 175000,
        qty: 32,
        total: 5600000,
      },
      {
        id: 'pi-10',
        description: 'Insentif Prestasi Rating 5.0 Bintang Sempurna',
        category: 'performance_incentive',
        rate: 600000,
        qty: 1,
        total: 600000,
      },
      {
        id: 'pi-11',
        description: 'Bonus Kehadiran & Review Portofolio Siswa Tepat Waktu',
        category: 'attendance_bonus',
        rate: 300000,
        qty: 1,
        total: 300000,
      },
      {
        id: 'pi-12',
        description: 'Tunjangan Cloud Hosting & API Test Sandbox Token',
        category: 'curriculum_allowance',
        rate: 400000,
        qty: 1,
        total: 400000,
      },
    ],
    createdAt: '2026-06-28T12:00:00.000Z',
    updatedAt: '2026-06-30T15:30:00.000Z',
  },
  {
    id: 'pay-2026-004',
    payrollNumber: 'BK-PAY/2026/07/001',
    instructorId: 'inst-2026-005',
    instructorName: 'Dian Sastro Wardoyo, B.Eng.',
    instructorRole: 'Python Logic & Data Science Mentor',
    instructorPhone: '081387654321',
    bankName: 'Bank Mandiri',
    bankAccountNumber: '156-00-8812739-1',
    bankAccountHolder: 'DIAN SASTRO WARDOYO',
    period: 'Juli 2026',
    teachingHours: 24,
    hourlyRate: 150000,
    baseTeachingHonor: 3600000,
    performanceIncentive: 450000,
    attendanceBonus: 250000,
    allowanceTotal: 150000,
    deductionsTotal: 0,
    netTotalAmount: 4450000,
    status: 'approved',
    notes: 'Telah disetujui Finance Director, menunggu jadwal transfer batch awal bulan.',
    items: [
      {
        id: 'pi-13',
        description: 'Honor Sesi Mengajar Logika Matematika & Turtle Python (24 Jam x Rp 150.000)',
        category: 'teaching_honor',
        rate: 150000,
        qty: 24,
        total: 3600000,
      },
      {
        id: 'pi-14',
        description: 'Insentif Evaluasi Rapor Siswa Unggul',
        category: 'performance_incentive',
        rate: 450000,
        qty: 1,
        total: 450000,
      },
      {
        id: 'pi-15',
        description: 'Bonus Kehadiran Disiplin',
        category: 'attendance_bonus',
        rate: 250000,
        qty: 1,
        total: 250000,
      },
      {
        id: 'pi-16',
        description: 'Tunjangan Internet Kelas Online Stabil',
        category: 'transport_allowance',
        rate: 150000,
        qty: 1,
        total: 150000,
      },
    ],
    createdAt: '2026-07-01T09:00:00.000Z',
    updatedAt: '2026-07-02T10:00:00.000Z',
  },
  {
    id: 'pay-2026-005',
    payrollNumber: 'BK-PAY/2026/07/002',
    instructorId: 'inst-2026-001',
    instructorName: 'Febri Hasan, S.Kom., M.T.',
    instructorRole: 'Founder & Chief Learning Officer',
    instructorPhone: '08122334455',
    bankName: 'BCA',
    bankAccountNumber: '018-3829-102',
    bankAccountHolder: 'FEBRI HASAN',
    period: 'Juli 2026',
    teachingHours: 20,
    hourlyRate: 200000,
    baseTeachingHonor: 4000000,
    performanceIncentive: 750000,
    attendanceBonus: 300000,
    allowanceTotal: 500000,
    deductionsTotal: 0,
    netTotalAmount: 5550000,
    status: 'draft',
    notes: 'Draf honor mengajar sesi advanced AI & bimbingan kurikulum semester baru.',
    items: [
      {
        id: 'pi-17',
        description: 'Honor Sesi Mengajar Masterclass AI & Problem Solving (20 Jam x Rp 200.000)',
        category: 'teaching_honor',
        rate: 200000,
        qty: 20,
        total: 4000000,
      },
      {
        id: 'pi-18',
        description: 'Insentif Penyusunan Soal Uji Kompetensi Bakat 8 Pilar',
        category: 'performance_incentive',
        rate: 750000,
        qty: 1,
        total: 750000,
      },
      {
        id: 'pi-19',
        description: 'Bonus Kehadiran Penuh',
        category: 'attendance_bonus',
        rate: 300000,
        qty: 1,
        total: 300000,
      },
      {
        id: 'pi-20',
        description: 'Tunjangan Penelitian & Pengembangan Kurikulum Coding 2026',
        category: 'curriculum_allowance',
        rate: 500000,
        qty: 1,
        total: 500000,
      },
    ],
    createdAt: '2026-07-02T11:00:00.000Z',
    updatedAt: '2026-07-02T11:00:00.000Z',
  },
];

export function getInstructorPayrolls(): InstructorPayrollRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PAYROLL);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.PAYROLL,
        JSON.stringify(DEFAULT_INSTRUCTOR_PAYROLLS)
      );
      return DEFAULT_INSTRUCTOR_PAYROLLS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : DEFAULT_INSTRUCTOR_PAYROLLS;
  } catch (err) {
    console.error('Failed to get instructor payrolls:', err);
    return DEFAULT_INSTRUCTOR_PAYROLLS;
  }
}

export function saveInstructorPayrolls(payrolls: InstructorPayrollRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PAYROLL, JSON.stringify(payrolls));
  } catch (err) {
    console.error('Failed to save instructor payrolls:', err);
  }
}

export function resetInstructorPayrollsToDefault(): void {
  saveInstructorPayrolls(DEFAULT_INSTRUCTOR_PAYROLLS);
}

export function createInstructorPayroll(
  data: Omit<InstructorPayrollRecord, 'id' | 'payrollNumber' | 'createdAt' | 'updatedAt'>
): InstructorPayrollRecord {
  const payrolls = getInstructorPayrolls();
  const yearStr = new Date().getFullYear();
  const monthStr = String(new Date().getMonth() + 1).padStart(2, '0');
  const seqNum = String(payrolls.length + 1).padStart(3, '0');
  const payrollNumber = `BK-PAY/${yearStr}/${monthStr}/${seqNum}`;

  const newPayroll: InstructorPayrollRecord = {
    ...data,
    id: `pay-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`,
    payrollNumber,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  payrolls.unshift(newPayroll);
  saveInstructorPayrolls(payrolls);
  return newPayroll;
}

export function updateInstructorPayroll(
  id: string,
  updates: Partial<InstructorPayrollRecord>
): InstructorPayrollRecord | null {
  const payrolls = getInstructorPayrolls();
  const idx = payrolls.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const updated: InstructorPayrollRecord = {
    ...payrolls[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  payrolls[idx] = updated;
  saveInstructorPayrolls(payrolls);
  return updated;
}

export function deleteInstructorPayroll(id: string): boolean {
  const payrolls = getInstructorPayrolls();
  const filtered = payrolls.filter((p) => p.id !== id);
  if (filtered.length !== payrolls.length) {
    saveInstructorPayrolls(filtered);
    return true;
  }
  return false;
}

export function updatePayrollStatus(
  id: string,
  newStatus: PayrollStatus,
  paymentDate?: string
): boolean {
  const payrolls = getInstructorPayrolls();
  const idx = payrolls.findIndex((p) => p.id === id);
  if (idx === -1) return false;

  payrolls[idx].status = newStatus;
  if (newStatus === 'paid' && !payrolls[idx].paymentDate) {
    payrolls[idx].paymentDate = paymentDate || new Date().toISOString().split('T')[0];
  }
  payrolls[idx].updatedAt = new Date().toISOString();
  saveInstructorPayrolls(payrolls);
  return true;
}

export function exportPayrollCSV(payrolls: InstructorPayrollRecord[]): void {
  try {
    const headers = [
      'No. Slip Payroll',
      'Nama Instruktur',
      'Peran Instruktur',
      'Kontak WA',
      'Bank Penerima',
      'No. Rekening',
      'Pemilik Rekening',
      'Periode',
      'Tanggal Bayar',
      'Jam Mengajar',
      'Tarif Per Jam (Rp)',
      'Honor Pokok (Rp)',
      'Insentif Performa (Rp)',
      'Bonus Kehadiran (Rp)',
      'Total Tunjangan (Rp)',
      'Total Potongan (Rp)',
      'Total Diterima Bersih (Rp)',
      'Status Pembayaran',
      'Catatan',
    ];

    const rows = payrolls.map((p) => [
      `"${p.payrollNumber}"`,
      `"${p.instructorName.replace(/"/g, '""')}"`,
      `"${p.instructorRole}"`,
      `"${p.instructorPhone}"`,
      `"${p.bankName}"`,
      `"${p.bankAccountNumber}"`,
      `"${p.bankAccountHolder}"`,
      `"${p.period}"`,
      `"${p.paymentDate || '-'}"`,
      `"${p.teachingHours}"`,
      `"${p.hourlyRate}"`,
      `"${p.baseTeachingHonor}"`,
      `"${p.performanceIncentive}"`,
      `"${p.attendanceBonus}"`,
      `"${p.allowanceTotal}"`,
      `"${p.deductionsTotal}"`,
      `"${p.netTotalAmount}"`,
      `"${p.status.toUpperCase()}"`,
      `"${(p.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_payroll_instruktur_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export payroll CSV:', err);
  }
}

export function generatePayrollWhatsAppSlip(payroll: InstructorPayrollRecord): string {
  const formatRupiah = (val: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  const statusEmoji =
    payroll.status === 'paid' ? '✅ *LUNAS (TERTRANSFER)*' : '⏳ *DALAM PROSES / DRAFT*';

  return `
🐝 *SLIP GAJI & HONORARIUM MENGAJAR BEEKODING ACADEMY*
---------------------------------------------
No. Slip: *${payroll.payrollNumber}*
Periode: *${payroll.period}*
Status: ${statusEmoji}

👤 *Penerima:* ${payroll.instructorName}
💼 *Peran:* ${payroll.instructorRole}
🏦 *Rekening Tujuan:* ${payroll.bankName} - ${payroll.bankAccountNumber} (a.n. ${payroll.bankAccountHolder})
${payroll.paymentDate ? `📅 *Tanggal Transfer:* ${payroll.paymentDate}` : ''}

---------------------------------------------
*RINCIAN PENDAPATAN:*
• Jam Mengajar: *${payroll.teachingHours} Jam* (@ ${formatRupiah(payroll.hourlyRate)})
• Honor Pokok Sesi: *${formatRupiah(payroll.baseTeachingHonor)}*
• Insentif Performa & Rating: *${formatRupiah(payroll.performanceIncentive)}*
• Bonus Kehadiran & Ketepatan: *${formatRupiah(payroll.attendanceBonus)}*
• Tunjangan Tambahan: *${formatRupiah(payroll.allowanceTotal)}*
${payroll.deductionsTotal > 0 ? `• Potongan: -*${formatRupiah(payroll.deductionsTotal)}*` : ''}

💰 *TOTAL DITERIMA BERSIH (TAKE HOME PAY):*
👉 *${formatRupiah(payroll.netTotalAmount)}*
---------------------------------------------
${payroll.notes ? `📝 *Catatan Finance:* ${payroll.notes}\n` : ''}
Terima kasih atas dedikasi luar biasa dalam membimbing generasi muda Indonesia mencintai dunia koding dan AI! 🚀

_Finance & Academic Operations Beekoding Academy_
`.trim();
}

// ==========================================
// 21. PUSAT UNDUHAN BAHAN AJAR & LEMBAR KERJA SISWA
// ==========================================

export const DEFAULT_LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-2026-001',
    title: 'Lembar Aktivitas Koding: Petualangan Logika Algoritma Scratch 3.0',
    description:
      'Panduan cetak berwarna aktivitas unplugged dan puzzle blok koding Scratch untuk melatih alur sekuensial dan perulangan loop bagi pemula.',
    tier: 'junior',
    sessionNumber: 1,
    type: 'worksheet',
    fileFormat: 'pdf',
    fileSize: '3.8 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/worksheet-scratch-01.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-scratch-01.pdf',
    downloadsCount: 142,
    isFeatured: true,
    tags: ['Scratch 3.0', 'Unplugged', 'Junior Explorer', 'Algorithm Basics'],
    createdAt: '2026-06-01T08:00:00.000Z',
    updatedAt: '2026-06-01T08:00:00.000Z',
  },
  {
    id: 'res-2026-002',
    title: 'Starter Pack Proyek Scratch: Bee Garden Catch Game Asset Kit',
    description:
      'Paket berkas sprite animasi lebah, bunga nektar, sound effect 8-bit ceria, dan background taman siap pakai untuk proyek game interaktif.',
    tier: 'junior',
    sessionNumber: 3,
    type: 'starter_code',
    fileFormat: 'scratch',
    fileSize: '5.2 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/starter-bee-garden.sb3',
    downloadsCount: 198,
    isFeatured: true,
    tags: ['Sprite Assets', 'Scratch Project', 'Game Sounds', 'Animation'],
    createdAt: '2026-06-05T09:00:00.000Z',
    updatedAt: '2026-06-05T09:00:00.000Z',
  },
  {
    id: 'res-2026-003',
    title: 'Cheatsheet Pintar: Panduan Cepat Blok Scratch 3.0 & Warna Kategori',
    description:
      'Lembar sontekan ringkas 1 lembar A4 berisi fungsi blok Motion, Looks, Sound, Events, Control, Sensing, Operators, dan Variables.',
    tier: 'junior',
    type: 'cheatsheet',
    fileFormat: 'pdf',
    fileSize: '1.5 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/cheatsheet-scratch-a4.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-cheatsheet-scratch.pdf',
    downloadsCount: 310,
    isFeatured: false,
    tags: ['Cheatsheet', 'Scratch Blocks', 'Quick Guide', 'A4 Printable'],
    createdAt: '2026-06-08T10:00:00.000Z',
    updatedAt: '2026-06-08T10:00:00.000Z',
  },
  {
    id: 'res-2026-004',
    title: 'Panduan Praktik: Merancang 3D Parkour Obby di Roblox Studio',
    description:
      'Buku petunjuk step-by-step mengatur workspace, part anchorage, kill brick menggunakan script Lua touched event, dan sistem checkpoint.',
    tier: 'middle',
    sessionNumber: 4,
    type: 'guide',
    fileFormat: 'pdf',
    fileSize: '7.4 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/guide-roblox-obby-3d.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-roblox-guide.pdf',
    downloadsCount: 225,
    isFeatured: true,
    tags: ['Roblox Studio', 'Lua Scripting', 'Game Mechanics', '3D Obby'],
    createdAt: '2026-06-10T11:00:00.000Z',
    updatedAt: '2026-06-10T11:00:00.000Z',
  },
  {
    id: 'res-2026-005',
    title: 'Roblox Lua Scripting Starter Template: Coin Collector & Leaderstats',
    description:
      'Skrip dasar modular untuk sistem koin otomatis, papan leaderboard server, efek partikel perayaan saat koin diambil, dan data store dasar.',
    tier: 'middle',
    sessionNumber: 7,
    type: 'starter_code',
    fileFormat: 'zip',
    fileSize: '2.1 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/roblox-lua-coin-leaderstats.zip',
    downloadsCount: 184,
    isFeatured: false,
    tags: ['Lua Code', 'Roblox Template', 'Leaderstats', 'Economy'],
    createdAt: '2026-06-12T13:00:00.000Z',
    updatedAt: '2026-06-12T13:00:00.000Z',
  },
  {
    id: 'res-2026-006',
    title: 'Cheatsheet Sintaks Python 3: Dari Variabel Hingga Modul Turtle',
    description:
      'Rangkuman praktis struktur sintaks Python: tipe data, manipulasi string, if-elif-else, loop while/for, list dictionary, dan perintah Turtle.',
    tier: 'middle',
    type: 'cheatsheet',
    fileFormat: 'pdf',
    fileSize: '1.9 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/cheatsheet-python3-syntax.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-python-cheatsheet.pdf',
    downloadsCount: 412,
    isFeatured: true,
    tags: ['Python 3', 'Turtle Graphics', 'Syntax Reference', 'A4 CheatSheet'],
    createdAt: '2026-06-15T14:00:00.000Z',
    updatedAt: '2026-06-15T14:00:00.000Z',
  },
  {
    id: 'res-2026-007',
    title: 'Slide Presentasi Modul 09: Arsitektur Modern Web & Semantik HTML5',
    description:
      'Bahan tayang presentasi interaktif format Google Slides/PDF untuk mempelajari siklus HTTP, SEO ramah mesin pencari, dan aksesibilitas web.',
    tier: 'teens',
    sessionNumber: 1,
    type: 'slide',
    fileFormat: 'slides',
    fileSize: '6.5 MB',
    downloadUrl: 'https://slides.google.com/presentation/d/beekoding-teens-01',
    previewUrl: 'https://assets.beekoding.id/resources/preview-slides-teens01.pdf',
    downloadsCount: 156,
    isFeatured: false,
    tags: ['Slides', 'HTML5 Semantics', 'Web Architecture', 'Teens Innovator'],
    createdAt: '2026-06-18T15:00:00.000Z',
    updatedAt: '2026-06-18T15:00:00.000Z',
  },
  {
    id: 'res-2026-008',
    title: 'Boilerplate Repo: React 19 + Tailwind CSS + Gemini AI API Starter Kit',
    description:
      'Starter kit repositori GitHub siap clone: sudah terpasang Vite, Tailwind CSS v4, Lucide Icons, Dark Mode Switcher, dan wrapper client Gemini AI.',
    tier: 'teens',
    sessionNumber: 9,
    type: 'starter_code',
    fileFormat: 'github',
    fileSize: '4.8 MB',
    downloadUrl: 'https://github.com/beekoding/react-tailwind-gemini-starter',
    previewUrl: 'https://github.com/beekoding/react-tailwind-gemini-starter',
    downloadsCount: 388,
    isFeatured: true,
    tags: ['React', 'TypeScript', 'Tailwind', 'Gemini AI', 'GitHub Repo'],
    createdAt: '2026-06-20T16:00:00.000Z',
    updatedAt: '2026-06-20T16:00:00.000Z',
  },
  {
    id: 'res-2026-009',
    title: 'Panduan Deploy Portofolio: Menghubungkan Domain Kustom & Vercel CI/CD',
    description:
      'Tutorial lengkap konfigurasi DNS domain kustom, pengaturan branch production GitHub, auto-deploy Vercel, dan sertifikat HTTPS SSL gratis.',
    tier: 'teens',
    sessionNumber: 11,
    type: 'guide',
    fileFormat: 'pdf',
    fileSize: '4.1 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/guide-vercel-cloud-deploy.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-vercel-guide.pdf',
    downloadsCount: 195,
    isFeatured: false,
    tags: ['Vercel', 'CI/CD', 'Custom Domain', 'Portfolio Live'],
    createdAt: '2026-06-22T10:00:00.000Z',
    updatedAt: '2026-06-22T10:00:00.000Z',
  },
  {
    id: 'res-2026-010',
    title: 'Lembar Kerja Mandiri: Uji Ketangkasan Computational Thinking 8 Pilar',
    description:
      'Latihan teka-teki logika komputasional untuk mengasah abstraksi, dekomposisi masalah, pengenalan pola, dan evaluasi algoritma di rumah.',
    tier: 'all',
    type: 'worksheet',
    fileFormat: 'pdf',
    fileSize: '3.2 MB',
    downloadUrl: 'https://assets.beekoding.id/resources/worksheet-computational-thinking.pdf',
    previewUrl: 'https://assets.beekoding.id/resources/preview-ct-worksheet.pdf',
    downloadsCount: 520,
    isFeatured: true,
    tags: ['Computational Thinking', 'Logic Puzzle', 'Universal', 'Self Study'],
    createdAt: '2026-06-25T11:00:00.000Z',
    updatedAt: '2026-06-25T11:00:00.000Z',
  },
];

export function getLearningResources(): LearningResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.RESOURCES,
        JSON.stringify(DEFAULT_LEARNING_RESOURCES)
      );
      return DEFAULT_LEARNING_RESOURCES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0
      ? parsed
      : DEFAULT_LEARNING_RESOURCES;
  } catch (err) {
    console.error('Failed to get learning resources:', err);
    return DEFAULT_LEARNING_RESOURCES;
  }
}

export function saveLearningResources(resources: LearningResource[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  } catch (err) {
    console.error('Failed to save learning resources:', err);
  }
}

export function resetLearningResourcesToDefault(): void {
  saveLearningResources(DEFAULT_LEARNING_RESOURCES);
}

export function createLearningResource(
  data: Omit<LearningResource, 'id' | 'downloadsCount' | 'createdAt' | 'updatedAt'>
): LearningResource {
  const resources = getLearningResources();
  const newResource: LearningResource = {
    ...data,
    id: `res-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`,
    downloadsCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  resources.unshift(newResource);
  saveLearningResources(resources);
  return newResource;
}

export function updateLearningResource(
  id: string,
  updates: Partial<LearningResource>
): LearningResource | null {
  const resources = getLearningResources();
  const idx = resources.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  const updated: LearningResource = {
    ...resources[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  resources[idx] = updated;
  saveLearningResources(resources);
  return updated;
}

export function deleteLearningResource(id: string): boolean {
  const resources = getLearningResources();
  const filtered = resources.filter((r) => r.id !== id);
  if (filtered.length !== resources.length) {
    saveLearningResources(filtered);
    return true;
  }
  return false;
}

export function incrementResourceDownloadCount(id: string): number {
  const resources = getLearningResources();
  const idx = resources.findIndex((r) => r.id === id);
  if (idx === -1) return 0;

  resources[idx].downloadsCount += 1;
  resources[idx].updatedAt = new Date().toISOString();
  saveLearningResources(resources);
  return resources[idx].downloadsCount;
}

export function exportResourcesCSV(resources: LearningResource[]): void {
  try {
    const headers = [
      'ID Materi',
      'Judul Bahan Ajar',
      'Jenjang Sasaran',
      'Nomor Sesi',
      'Tipe Materi',
      'Format Berkas',
      'Ukuran Berkas',
      'Total Unduhan',
      'Unggulan (Featured)',
      'Tautan Unduh',
      'Tags',
      'Deskripsi',
    ];

    const rows = resources.map((r) => [
      `"${r.id}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      `"${r.tier.toUpperCase()}"`,
      `"${r.sessionNumber ? `Sesi ${r.sessionNumber}` : 'Umum'}"`,
      `"${r.type.toUpperCase()}"`,
      `"${r.fileFormat.toUpperCase()}"`,
      `"${r.fileSize || '-'}"`,
      `"${r.downloadsCount}"`,
      `"${r.isFeatured ? 'YA' : 'TIDAK'}"`,
      `"${r.downloadUrl}"`,
      `"${r.tags.join(', ')}"`,
      `"${r.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_bahan_ajar_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export resources CSV:', err);
  }
}

// ==========================================
// 22. SISTEM MANAJEMEN WORKSHOP, WEBINAR & TRIAL CLASS
// ==========================================

export const DEFAULT_CODING_EVENTS: CodingEvent[] = [
  {
    id: 'evt-2026-001',
    title: 'Free Trial Class: Petualangan Koding Pertama Bikin Game Tangkap Lebah',
    slug: 'free-trial-scratch-game-lebah',
    eventType: 'trial_class',
    tier: 'junior',
    instructorName: 'Sarah Amalia, S.T.',
    instructorTitle: 'Lead Educator - Junior Explorer',
    date: '2026-07-04',
    startTime: '10:00',
    endTime: '11:15',
    locationType: 'online_zoom',
    locationDetail: 'Zoom Cloud Meeting Room #1',
    meetingUrl: 'https://zoom.us/j/9812739123',
    capacity: 12,
    price: 0,
    description:
      'Sesi interaktif gratis 75 menit khusus anak usia 6-10 tahun. Anak akan dipandu langsung membuat game animasi lebah menangkap bunga madu menggunakan blok visual Scratch 3.0 tanpa perlu mengetik kode rumit.',
    learningOutcomes: [
      'Memahami konsep algoritma dan urutan logika (sequence)',
      'Membuat sprite lebah bergerak interaktif dengan tombol keyboard',
      'Menambahkan efek suara dan score counter otomatis',
      'Mendapatkan e-Certificate of Participation resmi',
    ],
    posterUrlOrEmoji: '🐝',
    status: 'upcoming',
    isFeatured: true,
    registrations: [
      {
        id: 'reg-evt-001',
        parentName: 'Bambang Pratama',
        parentPhone: '081234567890',
        parentEmail: 'bambang.pratama@gmail.com',
        childName: 'Kenzo Alvaro',
        childAge: 8,
        status: 'confirmed',
        registeredAt: '2026-06-25T08:30:00.000Z',
        notes: 'Sudah menginstall Google Chrome di laptop.',
      },
      {
        id: 'reg-evt-002',
        parentName: 'Siti Rahmadani',
        parentPhone: '081298765432',
        parentEmail: 'siti.rahmadani@yahoo.com',
        childName: 'Aisyah Putri',
        childAge: 7,
        status: 'registered',
        registeredAt: '2026-06-26T09:15:00.000Z',
      },
      {
        id: 'reg-evt-003',
        parentName: 'Dewi Lestari',
        parentPhone: '081255667788',
        childName: 'Clarissa Aurelia',
        childAge: 9,
        status: 'confirmed',
        registeredAt: '2026-06-27T10:00:00.000Z',
      },
    ],
    createdAt: '2026-06-20T08:00:00.000Z',
    updatedAt: '2026-06-20T08:00:00.000Z',
  },
  {
    id: 'evt-2026-002',
    title: 'Weekend Workshop: Roblox Obby Masterclass & 3D World Scripting',
    slug: 'workshop-roblox-3d-obby',
    eventType: 'workshop',
    tier: 'middle',
    instructorName: 'Kevin Pratama, S.Kom.',
    instructorTitle: 'Senior Mentor - Game Architecture',
    date: '2026-07-05',
    startTime: '13:30',
    endTime: '15:30',
    locationType: 'online_zoom',
    locationDetail: 'Zoom Cloud Meeting Room #2',
    meetingUrl: 'https://zoom.us/j/9812739456',
    capacity: 15,
    price: 0,
    description:
      'Workshop intensif 2 jam untuk anak usia 10-14 tahun. Mempelajari rahasia merancang game parkour 3D populer di Roblox Studio dan memprogram rintangan mematikan menggunakan skrip Lua modern.',
    learningOutcomes: [
      'Navigasi ruang 3D, manipulasi koordinat part dan lighting',
      'Scripting trap pembunuh otomatis (kill brick) dengan Lua Events',
      'Merancang sistem checkpoint bertingkat dan tombol koin',
      'Menerbitkan game ke platform publik Roblox untuk dimainkan bersama teman',
    ],
    posterUrlOrEmoji: '🎮',
    status: 'upcoming',
    isFeatured: true,
    registrations: [
      {
        id: 'reg-evt-004',
        parentName: 'Budi Santoso',
        parentPhone: '081211112222',
        parentEmail: 'budi.santoso@gmail.com',
        childName: 'Rafa Azka Putra',
        childAge: 11,
        status: 'confirmed',
        registeredAt: '2026-06-26T14:20:00.000Z',
      },
      {
        id: 'reg-evt-005',
        parentName: 'Rina Marlina',
        parentPhone: '081322223333',
        childName: 'Nadia Salsabila',
        childAge: 12,
        status: 'registered',
        registeredAt: '2026-06-27T11:05:00.000Z',
      },
    ],
    createdAt: '2026-06-21T09:00:00.000Z',
    updatedAt: '2026-06-21T09:00:00.000Z',
  },
  {
    id: 'evt-2026-003',
    title: 'Webinar Edukasi Digital: Mempersiapkan Remaja Sukses di Era AI & Robotika',
    slug: 'webinar-remaja-sukses-era-ai',
    eventType: 'webinar',
    tier: 'teens',
    instructorName: 'Febri Hasan',
    instructorTitle: 'Founder Beekoding & EdTech Strategist',
    date: '2026-07-11',
    startTime: '19:00',
    endTime: '20:30',
    locationType: 'online_zoom',
    locationDetail: 'Beekoding Main Stage Webinar Live',
    meetingUrl: 'https://zoom.us/j/9812739789',
    capacity: 100,
    price: 0,
    description:
      'Webinar interaktif untuk orang tua dan siswa usia 13-18 tahun. Membahas tren kecerdasan buatan masa kini, pentingnya portofolio coding di usia sekolah, dan tips membangun aplikasi web berbasis LLM API.',
    learningOutcomes: [
      'Peta jalan karir teknologi global & skill yang relevan tahun 2026-2030',
      'Cara mendampingi anak bijak menggunakan Generative AI (bukan sekadar copy-paste)',
      'Studi kasus karya siswa Beekoding yang berhasil tembus kompetisi nasional',
      'Sesi Q&A privat langsung dengan tim kurikulum',
    ],
    posterUrlOrEmoji: '🤖',
    status: 'upcoming',
    isFeatured: true,
    registrations: [
      {
        id: 'reg-evt-006',
        parentName: 'Hendrawan Putra',
        parentPhone: '082155554321',
        parentEmail: 'hendrawan@corp.id',
        childName: 'Rafi Danendra',
        childAge: 15,
        status: 'confirmed',
        registeredAt: '2026-06-28T16:00:00.000Z',
      },
      {
        id: 'reg-evt-007',
        parentName: 'Agus Subekti',
        parentPhone: '081399001122',
        childName: 'Farrel Raditya',
        childAge: 16,
        status: 'confirmed',
        registeredAt: '2026-06-28T17:30:00.000Z',
      },
    ],
    createdAt: '2026-06-22T10:00:00.000Z',
    updatedAt: '2026-06-22T10:00:00.000Z',
  },
  {
    id: 'evt-2026-004',
    title: 'Beekoding Mini Game Jam: Kompetisi Koding Akhir Pekan Bertema Lingkungan',
    slug: 'game-jam-koding-lingkungan-2026',
    eventType: 'competition',
    tier: 'all',
    instructorName: 'Tim Akademik Beekoding',
    instructorTitle: 'Juri & Kurator Proyek',
    date: '2026-07-18',
    startTime: '09:00',
    endTime: '16:00',
    locationType: 'online_zoom',
    locationDetail: 'Discord & Zoom Live Hackathon',
    meetingUrl: 'https://zoom.us/j/9812739999',
    capacity: 50,
    price: 0,
    description:
      'Kompetisi koding seru 1 hari untuk seluruh siswa SD-SMA. Buat game bertema Save Our Planet menggunakan Scratch, Roblox, atau Web Game. Pemenang mendapatkan beasiswa belajar Beekoding 1 semester penuh!',
    learningOutcomes: [
      'Mengembangkan kreativitas dan kecepatan problem solving mandiri',
      'Mempresentasikan ide game di hadapan dewan juri dan sesama peserta',
      'Mendapatkan medali digital & trofi eksklusif pemenang',
      'Hadiah total jutaan rupiah dan voucher beasiswa',
    ],
    posterUrlOrEmoji: '🏆',
    status: 'upcoming',
    isFeatured: false,
    registrations: [],
    createdAt: '2026-06-24T11:00:00.000Z',
    updatedAt: '2026-06-24T11:00:00.000Z',
  },
];

export function getCodingEvents(): CodingEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_CODING_EVENTS));
      return DEFAULT_CODING_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CODING_EVENTS;
  } catch (err) {
    console.error('Failed to get coding events:', err);
    return DEFAULT_CODING_EVENTS;
  }
}

export function saveCodingEvents(events: CodingEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  } catch (err) {
    console.error('Failed to save coding events:', err);
  }
}

export function resetEventsToDefault(): CodingEvent[] {
  try {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_CODING_EVENTS));
    return DEFAULT_CODING_EVENTS;
  } catch (err) {
    console.error('Failed to reset coding events:', err);
    return DEFAULT_CODING_EVENTS;
  }
}

export function createCodingEvent(
  data: Omit<CodingEvent, 'id' | 'registrations' | 'createdAt' | 'updatedAt'>
): CodingEvent {
  const events = getCodingEvents();
  const newId = `evt-2026-${String(events.length + 1).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const newEvent: CodingEvent = {
    ...data,
    id: newId,
    registrations: [],
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newEvent, ...events];
  saveCodingEvents(updated);
  return newEvent;
}

export function updateCodingEvent(
  id: string,
  updates: Partial<Omit<CodingEvent, 'id' | 'createdAt'>>
): CodingEvent | null {
  const events = getCodingEvents();
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  const updated: CodingEvent = {
    ...events[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  events[idx] = updated;
  saveCodingEvents(events);
  return updated;
}

export function deleteCodingEvent(id: string): boolean {
  const events = getCodingEvents();
  const filtered = events.filter((e) => e.id !== id);
  if (filtered.length !== events.length) {
    saveCodingEvents(filtered);
    return true;
  }
  return false;
}

export function registerForEvent(
  eventId: string,
  registrationData: Omit<EventRegistrationItem, 'id' | 'status' | 'registeredAt'>
): { success: boolean; registration?: EventRegistrationItem; error?: string } {
  const events = getCodingEvents();
  const idx = events.findIndex((e) => e.id === eventId);
  if (idx === -1) {
    return { success: false, error: 'Event tidak ditemukan.' };
  }

  const event = events[idx];
  if (event.registrations.length >= event.capacity) {
    return { success: false, error: 'Mohon maaf, kuota peserta untuk sesi ini sudah penuh.' };
  }

  // Check duplicate phone for same event
  const normPhone = registrationData.parentPhone.replace(/\D/g, '');
  const existing = event.registrations.find(
    (r) => r.parentPhone.replace(/\D/g, '') === normPhone && r.status !== 'cancelled'
  );
  if (existing) {
    return { success: false, error: 'Nomor WhatsApp ini sudah terdaftar pada sesi ini.' };
  }

  const newRegId = `reg-${event.id}-${String(event.registrations.length + 1).padStart(3, '0')}`;
  const newReg: EventRegistrationItem = {
    ...registrationData,
    id: newRegId,
    status: 'registered',
    registeredAt: new Date().toISOString(),
  };

  event.registrations.push(newReg);
  event.updatedAt = new Date().toISOString();
  events[idx] = event;
  saveCodingEvents(events);

  // Sync automatically with inquiries for admissions team
  try {
    const eventTypeLabel =
      event.eventType === 'trial_class'
        ? 'Free Trial Class'
        : event.eventType === 'workshop'
        ? 'Workshop'
        : event.eventType === 'webinar'
        ? 'Webinar'
        : 'Game Jam';

    saveInquiry({
      name: registrationData.parentName,
      email:
        registrationData.parentEmail ||
        `${registrationData.parentPhone.replace(/\D/g, '')}@parent.beekoding.id`,
      phone: registrationData.parentPhone,
      role: 'Orang Tua',
      program: `[${eventTypeLabel}] ${event.title}`,
      message: `Pendaftaran sesi untuk Ananda ${registrationData.childName} (${registrationData.childAge} thn). Tanggal: ${event.date} jam ${event.startTime} WIB (${event.locationDetail}). ${
        registrationData.notes ? `Catatan: ${registrationData.notes}` : ''
      }`,
      status: 'baru',
      type: 'pendaftaran',
    });
  } catch (err) {
    console.warn('Failed to sync event registration to inquiries:', err);
  }

  return { success: true, registration: newReg };
}

export function updateEventRegistrationStatus(
  eventId: string,
  registrationId: string,
  status: EventRegistrationStatus
): boolean {
  const events = getCodingEvents();
  const eventIdx = events.findIndex((e) => e.id === eventId);
  if (eventIdx === -1) return false;

  const event = events[eventIdx];
  const regIdx = event.registrations.findIndex((r) => r.id === registrationId);
  if (regIdx === -1) return false;

  event.registrations[regIdx].status = status;
  event.updatedAt = new Date().toISOString();
  events[eventIdx] = event;
  saveCodingEvents(events);
  return true;
}

export function deleteEventRegistration(eventId: string, registrationId: string): boolean {
  const events = getCodingEvents();
  const eventIdx = events.findIndex((e) => e.id === eventId);
  if (eventIdx === -1) return false;

  const event = events[eventIdx];
  const filtered = event.registrations.filter((r) => r.id !== registrationId);
  if (filtered.length !== event.registrations.length) {
    event.registrations = filtered;
    event.updatedAt = new Date().toISOString();
    events[eventIdx] = event;
    saveCodingEvents(events);
    return true;
  }
  return false;
}

export function generateEventWhatsAppReminder(
  event: CodingEvent,
  registration: EventRegistrationItem
): string {
  const dateFormatted = new Date(event.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const eventTypeBadge =
    event.eventType === 'trial_class'
      ? '🎯 *FREE TRIAL CLASS CODING & AI*'
      : event.eventType === 'workshop'
      ? '🛠️ *WEEKEND CODING WORKSHOP*'
      : event.eventType === 'webinar'
      ? '💡 *WEBINAR EDUKASI DIGITAL*'
      : '🏆 *BEEKODING HACKATHON / GAME JAM*';

  return `
${eventTypeBadge}
*BEEKODING ACADEMY* 🐝✨
---------------------------------------------
Halo Ayah/Bunda *${registration.parentName}*! 👋

Mengingatkan jadwal sesi interaktif untuk ananda hebat *${registration.childName}* (${registration.childAge} tahun):

📌 *Agenda:* ${event.title}
🗓️ *Hari & Tanggal:* ${dateFormatted}
⏰ *Waktu:* ${event.startTime} - ${event.endTime} WIB
📍 *Media:* ${event.locationDetail}
${event.meetingUrl ? `🔗 *Link Pertemuan:* ${event.meetingUrl}` : ''}
👨‍🏫 *Mentor Pendamping:* ${event.instructorName} (${event.instructorTitle})

💡 *Hal yang Perlu Disiapkan di Rumah:*
1. Menggunakan Laptop/Komputer (Windows/Mac) dengan browser Google Chrome terbaru.
2. Koneksi internet stabil serta headset/speaker yang terdengar jelas.
3. Masuk ke ruang meeting 5–10 menit sebelum kelas dimulai untuk absensi.

Jika berhalangan hadir atau ada pertanyaan seputar instalasi, mohon balas pesan ini ya Ayah/Bunda.

Sampai jumpa di kelas! Mari ciptakan karya digital pertama ananda bersama Beekoding! 🚀

_Salam hangat, Tim Admissions Beekoding Academy_
`.trim();
}

export function exportEventParticipantsCSV(event: CodingEvent): void {
  try {
    const headers = [
      'ID Pendaftar',
      'Nama Orang Tua / Wali',
      'WhatsApp Wali',
      'Email Wali',
      'Nama Anak',
      'Usia Anak',
      'Status Kehadiran',
      'Waktu Daftar',
      'Catatan Khusus',
    ];

    const rows = event.registrations.map((r) => [
      `"${r.id}"`,
      `"${r.parentName.replace(/"/g, '""')}"`,
      `"'${r.parentPhone}"`,
      `"${r.parentEmail || '-'}"`,
      `"${r.childName.replace(/"/g, '""')}"`,
      `"${r.childAge} Tahun"`,
      `"${r.status.toUpperCase()}"`,
      `"${r.registeredAt}"`,
      `"${(r.notes || '-').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `peserta_${event.slug}_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export event participants CSV:', err);
  }
}

// ==========================================
// 24. SISTEM KONSELING & BIMBINGAN BELAJAR PRIVAT
// ==========================================

export const DEFAULT_COUNSELING_SESSIONS: CounselingSession[] = [
  {
    id: 'cs-2026-001',
    sessionNumber: 'CS-2026-001',
    studentName: 'Kenzo Alvaro Pratama',
    studentPhone: '081234567890',
    parentName: 'Bambang Pratama',
    parentPhone: '081234567890',
    counselorName: 'Sarah Amalia, S.T.',
    counselorTitle: 'Senior Mentor - Creative Game Dev',
    tier: 'Junior Explorer',
    date: '2026-09-20',
    time: '15:30 - 16:15 WIB',
    topic: 'kendala_fokus',
    sessionType: 'online_zoom',
    meetingLink: 'https://zoom.us/j/9128374650',
    status: 'scheduled',
    studentStrengths:
      'Daya imajinasi spasial dan visual animasi Scratch sangat menonjol. Cepat memahami logika koordinat X-Y dan rancangan gerak karakter.',
    challengesFaced:
      'Mudah lelah dan terdistraksi jika mengetik atau menyusun blok lebih dari 20 menit terus-menerus tanpa jeda mini-kuis.',
    actionPlan:
      'Menerapkan metode Pomodoro Edukatif (20 menit merancang koding + 5 menit evaluasi mini-game logika). Orang tua mendampingi di 10 menit awal sesi.',
    curriculumRecommendation:
      'Fokus menuntaskan Proyek Animasi Labirin Scratch, tunda dulu transisi ke sintaks berbasis teks Python.',
    internalNotes:
      'Wali sangat kooperatif, meminta update mingguan perkembangan fokus anak via WhatsApp.',
    parentFeedback:
      'Berharap Kenzo bisa lebih disiplin membagi waktu antara bermain game dan merancang game sendiri.',
    createdAt: '2026-09-17T09:00:00.000Z',
    updatedAt: '2026-09-17T09:00:00.000Z',
  },
  {
    id: 'cs-2026-002',
    sessionNumber: 'CS-2026-002',
    studentName: 'Alya Putri Zahra',
    studentPhone: '081398765432',
    parentName: 'Dewi Rahmawati',
    parentPhone: '081398765432',
    counselorName: 'Kevin Pratama, S.Kom.',
    counselorTitle: 'Senior 3D Game Dev & Metaverse Mentor',
    tier: 'Middle Coder',
    date: '2026-09-17',
    time: '16:00 - 16:45 WIB',
    topic: 'evaluasi_belajar',
    sessionType: 'online_gmeet',
    meetingLink: 'https://meet.google.com/bkk-cs-alya',
    status: 'completed',
    studentStrengths:
      'Pemahaman konsep variabel, conditional if-then-else, dan manipulasi objek 3D di Roblox Studio sangat terstruktur dan rapi.',
    challengesFaced:
      'Sering ragu saat melakukan debugging mandiri ketika skrip Lua menampilkan error di console output.',
    actionPlan:
      'Diberikan checklist tahapan debugging 3-langkah (cek nama part, cek tanda kutip variabel, cek penutup end).',
    curriculumRecommendation:
      'Siap direkomendasikan masuk Roblox Obby Masterclass Lanjutan & Sistem Leaderboard Koin.',
    internalNotes:
      'Siswa memiliki potensi tinggi untuk Game Jam tingkat nasional kategori SMP.',
    parentFeedback:
      'Alya sekarang lebih tenang dan tidak gampang putus asa saat menghadapi bug di kodenya. Penjelasan mentor sangat jelas!',
    createdAt: '2026-09-15T10:00:00.000Z',
    updatedAt: '2026-09-17T17:00:00.000Z',
  },
  {
    id: 'cs-2026-003',
    sessionNumber: 'CS-2026-003',
    studentName: 'Muhammad Rizky Fadhilah',
    studentPhone: '085712345678',
    parentName: 'Hendra Fadhilah',
    parentPhone: '085712345678',
    counselorName: 'Febri Hasan, S.Kom., M.T.',
    counselorTitle: 'Founder & Chief Learning Officer',
    tier: 'Teens Innovator',
    date: '2026-09-15',
    time: '19:30 - 20:30 WIB',
    topic: 'persiapan_lomba',
    sessionType: 'online_zoom',
    meetingLink: 'https://zoom.us/j/9876543210',
    status: 'completed',
    studentStrengths:
      'Logika problem-solving, abstraksi matematika, dan pemahaman arsitektur React & Next.js di atas rata-rata usia SMA.',
    challengesFaced:
      'Perlu penguatan efisiensi algoritma (analisis kompleksitas waktu Big-O) untuk persiapan kompetisi OSN-K Informatika.',
    actionPlan:
      'Diberikan kurasi 10 latihan soal olimpiade algoritma per dua pekan dan akses konsultasi repo GitHub privat bersama Mas Febri.',
    curriculumRecommendation:
      'Kurikulum Lanjutan: Algoritma Pencarian Tingkat Lanjut, Graph Traversal & Dynamic Programming.',
    internalNotes:
      'Kandidat beasiswa Beekoding Elite Hacker 2026.',
    parentFeedback:
      'Sangat bersyukur dapat bimbingan langsung dari Pak Febri. Rizky makin mantap memilih jurusan Ilmu Komputer.',
    createdAt: '2026-09-14T08:00:00.000Z',
    updatedAt: '2026-09-15T21:00:00.000Z',
  },
  {
    id: 'cs-2026-004',
    sessionNumber: 'CS-2026-004',
    studentName: 'Shakila Az-Zahra',
    studentPhone: '085277889900',
    parentName: 'Nurul Hidayah',
    parentPhone: '085277889900',
    counselorName: 'Sarah Amalia, S.T.',
    counselorTitle: 'Senior Mentor - Creative Game Dev',
    tier: 'Junior Explorer',
    date: '2026-09-22',
    time: '14:00 - 14:45 WIB',
    topic: 'rekomendasi_kurikulum',
    sessionType: 'online_zoom',
    meetingLink: 'https://zoom.us/j/9345671234',
    status: 'scheduled',
    studentStrengths:
      'Sangat kreatif dalam eksplorasi audio, pemilihan warna sprite, dan visual storytelling cerita kartun interaktif.',
    challengesFaced:
      'Ragu-ragu saat mencoba mengombinasikan blok sensor sentuh (sensing blocks) dengan logika pergerakan.',
    actionPlan:
      'Gunakan kartu visual fisik untuk melatih konsep sensor sentuh sebelum diaplikasikan ke editor Scratch.',
    curriculumRecommendation:
      'Lanjutkan ke Modul Scratch 3.0 Sesi 4: Interaktivitas Sensor & Sound FX.',
    internalNotes:
      'Ibu ingin Shakila memperkuat logika komputasi sejak usia dini tanpa tekanan akademis berlebih.',
    createdAt: '2026-09-18T06:00:00.000Z',
    updatedAt: '2026-09-18T06:00:00.000Z',
  },
  {
    id: 'cs-2026-005',
    sessionNumber: 'CS-2026-005',
    studentName: 'Kimberly Valerie Tan',
    studentPhone: '081900112233',
    parentName: 'Susanto Tan',
    parentPhone: '081900112233',
    counselorName: 'Dian Sastro Wardoyo, B.Eng.',
    counselorTitle: 'Python Logic & Data Science Mentor',
    tier: 'Middle Coder',
    date: '2026-09-12',
    time: '17:00 - 17:30 WIB',
    topic: 'konsultasi_perangkat',
    sessionType: 'whatsapp_call',
    status: 'follow_up_needed',
    studentStrengths:
      'Kemampuan numerik 95% istimewa, sangat cepat memahami pola deret aritmatika dan matriks data.',
    challengesFaced:
      'Laptop lawas mengalami kendala RAM saat menjalankan instalasi lokal Anaconda Python.',
    actionPlan:
      'Migrasikan environment praktikum Kimberly ke Google Colab berbasis cloud sehingga coding lancar via web browser tanpa membebani laptop.',
    curriculumRecommendation:
      'Python Junior Data Science & Visualisasi Pola Geometri.',
    internalNotes:
      'Jadwalkan panggilan video tindak lanjut pada 25 September untuk memastikan Google Colab berjalan mulus.',
    parentFeedback:
      'Solusi cloud dari mentor sangat membantu, tidak perlu buru-buru membeli laptop baru.',
    createdAt: '2026-09-11T11:00:00.000Z',
    updatedAt: '2026-09-12T18:00:00.000Z',
  },
];

export function getCounselingSessions(): CounselingSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COUNSELING);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COUNSELING, JSON.stringify(DEFAULT_COUNSELING_SESSIONS));
      return DEFAULT_COUNSELING_SESSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_COUNSELING_SESSIONS;
  } catch (err) {
    console.error('Failed to load counseling sessions:', err);
    return DEFAULT_COUNSELING_SESSIONS;
  }
}

export function saveCounselingSessions(sessions: CounselingSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNSELING, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save counseling sessions:', err);
  }
}

export function resetCounselingToDefault(): CounselingSession[] {
  try {
    localStorage.setItem(STORAGE_KEYS.COUNSELING, JSON.stringify(DEFAULT_COUNSELING_SESSIONS));
    return DEFAULT_COUNSELING_SESSIONS;
  } catch (err) {
    console.error('Failed to reset counseling sessions to default:', err);
    return DEFAULT_COUNSELING_SESSIONS;
  }
}

export function createCounselingSession(
  data: Omit<CounselingSession, 'id' | 'sessionNumber' | 'createdAt' | 'updatedAt'>
): CounselingSession {
  const sessions = getCounselingSessions();
  const nextNum = sessions.length + 1;
  const newSession: CounselingSession = {
    ...data,
    id: `cs-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    sessionNumber: `CS-2026-${String(nextNum).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [newSession, ...sessions];
  saveCounselingSessions(updated);
  return newSession;
}

export function updateCounselingSession(
  id: string,
  updates: Partial<Omit<CounselingSession, 'id' | 'createdAt'>>
): CounselingSession | null {
  const sessions = getCounselingSessions();
  const idx = sessions.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  const current = sessions[idx];
  const updated: CounselingSession = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  sessions[idx] = updated;
  saveCounselingSessions(sessions);
  return updated;
}

export function deleteCounselingSession(id: string): boolean {
  const sessions = getCounselingSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  if (filtered.length === sessions.length) return false;
  saveCounselingSessions(filtered);
  return true;
}

export function generateCounselingWhatsAppReminder(session: CounselingSession): string {
  const dateFormatted = new Date(session.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const topicLabel =
    session.topic === 'evaluasi_belajar'
      ? 'Evaluasi Kemajuan & Minat Koding'
      : session.topic === 'kendala_fokus'
      ? 'Konseling Manajemen Fokus & Screen Time'
      : session.topic === 'rekomendasi_kurikulum'
      ? 'Rekomendasi Roadmap Kurikulum Lanjutan'
      : session.topic === 'persiapan_lomba'
      ? 'Bimbingan Kompetisi & Portofolio Karya'
      : session.topic === 'konsultasi_perangkat'
      ? 'Konsultasi Perangkat & Environment Lab'
      : 'Bimbingan Konsultasi Khusus';

  const mediaLabel =
    session.sessionType === 'online_zoom'
      ? 'Zoom Cloud Meeting'
      : session.sessionType === 'online_gmeet'
      ? 'Google Meet'
      : session.sessionType === 'offline_studio'
      ? 'Studio Offline Beekoding'
      : 'WhatsApp Call';

  return `
Halo Bapak/Ibu *${session.parentName}*, salam hangat dari Beekoding Academy! 🐝✨

Mengingatkan kembali jadwal sesi *Konseling & Bimbingan Belajar Privat (1-on-1)* untuk ananda *${session.studentName}*:

📋 *Nomor Sesi:* ${session.sessionNumber}
🎯 *Topik Bimbingan:* ${topicLabel}
🗓️ *Hari & Tanggal:* ${dateFormatted}
⏰ *Waktu:* ${session.time}
👨‍🏫 *Konselor / Mentor:* ${session.counselorName} (${session.counselorTitle})
📍 *Media:* ${mediaLabel}
${session.meetingLink ? `🔗 *Link Ruang Virtual:* ${session.meetingLink}` : ''}

💡 *Agenda Konsultasi:*
- Meninjau perkembangan rasa percaya diri & logika ananda.
- Mendiskusikan tantangan belajar & strategi pendampingan di rumah.
- Merumuskan rekomendasi kurikulum personal terbaik untuk masa depan ananda.

Mohon konfirmasi kesiapan Ayah/Bunda ya. Jika ada penyesuaian jam, silakan balas pesan ini. Terima kasih banyak! 🚀

_Salam hangat, Tim Bimbingan Akademik Beekoding_
`.trim();
}

export function exportCounselingCSV(sessions: CounselingSession[]): void {
  try {
    const headers = [
      'No Sesi',
      'Nama Siswa',
      'Jenjang',
      'Nama Wali',
      'WhatsApp Wali',
      'Konselor',
      'Tanggal',
      'Waktu',
      'Topik',
      'Media',
      'Status',
      'Kelebihan / Minat Anak',
      'Tantangan Dihadapi',
      'Rencana Aksi Orang Tua & Mentor',
      'Rekomendasi Kurikulum',
      'Catatan Internal',
    ];

    const rows = sessions.map((s) => [
      `"${s.sessionNumber}"`,
      `"${s.studentName.replace(/"/g, '""')}"`,
      `"${s.tier}"`,
      `"${s.parentName.replace(/"/g, '""')}"`,
      `"'${s.parentPhone}"`,
      `"${s.counselorName.replace(/"/g, '""')}"`,
      `"${s.date}"`,
      `"${s.time}"`,
      `"${s.topic}"`,
      `"${s.sessionType}"`,
      `"${s.status.toUpperCase()}"`,
      `"${s.studentStrengths.replace(/"/g, '""')}"`,
      `"${s.challengesFaced.replace(/"/g, '""')}"`,
      `"${s.actionPlan.replace(/"/g, '""')}"`,
      `"${s.curriculumRecommendation.replace(/"/g, '""')}"`,
      `"${(s.internalNotes || '-').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_konseling_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export counseling CSV:', err);
  }
}

// ==========================================
// 25. PUSAT LOG AKTIVITAS, AUDIT TRAIL & KEAMANAN SISTEM
// ==========================================

export const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-2026-001',
    timestamp: '2026-09-18T07:15:30.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'auth',
    actionType: 'login',
    title: 'Autentikasi Administrator Berhasil',
    description: 'Admin Febri Hasan berhasil masuk ke Dashboard Kontrol Utama Beekoding.',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'info',
    metadata: { browser: 'Chrome 128 / Windows', loginMethod: 'Direct Portal Form' },
  },
  {
    id: 'log-2026-002',
    timestamp: '2026-09-18T06:45:12.000Z',
    actorName: 'Sarah Amalia, S.T.',
    actorRole: 'Senior Mentor - Game Dev',
    module: 'counseling',
    actionType: 'create',
    title: 'Penjadwalan Sesi Bimbingan Privat Baru',
    description: 'Sesi konseling 1-on-1 (CS-2026-001) dibuat untuk ananda Kenzo Alvaro Pratama terkait topik kendala fokus dan screen time.',
    targetId: 'cs-2026-001',
    targetName: 'Kenzo Alvaro Pratama',
    ipAddress: '114.124.78.112 (Tangerang, ID)',
    severity: 'success',
    metadata: { topic: 'kendala_fokus', format: 'online_zoom', sessionTime: '15:30 - 16:15 WIB' },
  },
  {
    id: 'log-2026-003',
    timestamp: '2026-09-18T05:30:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'certificates',
    actionType: 'approve',
    title: 'Penerbitan Piagam Sertifikat Kelulusan Resmi',
    description: 'Piagam kelulusan BK-CERT/2026/06/002 resmi diterbitkan dengan predikat Dengan Pujian Istimewa (With Distinction) untuk Alya Putri Zahra.',
    targetId: 'BK-CERT/2026/06/002',
    targetName: 'Alya Putri Zahra',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'success',
    metadata: { program: 'Middle Coder Roblox 3D', verificationCode: 'BK-VER-8912' },
  },
  {
    id: 'log-2026-004',
    timestamp: '2026-09-18T04:20:45.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'payroll',
    actionType: 'approve',
    title: 'Persetujuan & Pencairan Honor Instruktur',
    description: 'Approval pencairan slip gaji & honor instruktur Sarah Amalia (BK-PAY/2026/06/001) periode Juni 2026 sebesar Rp 3.850.000.',
    targetId: 'BK-PAY/2026/06/001',
    targetName: 'Sarah Amalia, S.T.',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'warning',
    metadata: { totalAmount: 3850000, bankAccount: 'BCA •••• 8812' },
  },
  {
    id: 'log-2026-005',
    timestamp: '2026-09-17T16:10:20.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'vouchers',
    actionType: 'create',
    title: 'Pembuatan Kupon Promo Baru Diskon 20%',
    description: 'Kode voucher promo BEEKODINGAI diterbitkan untuk seluruh jenjang program dengan potongan diskon 20% kuota 50 penukaran.',
    targetId: 'vch-01',
    targetName: 'BEEKODINGAI',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'success',
    metadata: { discountType: 'percentage', discountValue: 20, maxLimit: 50 },
  },
  {
    id: 'log-2026-006',
    timestamp: '2026-09-17T14:45:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'events',
    actionType: 'export',
    title: 'Ekspor Data Peserta Workshop Trial Class CSV',
    description: 'Mengunduh rekapitulasi data 15 calon peserta Free Trial Class Scratch Game Lebah ke format berkas CSV.',
    targetId: 'evt-2026-001',
    targetName: 'Free Trial Scratch Game Lebah',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'info',
    metadata: { totalExported: 15, filename: 'peserta_free-trial-scratch-game-lebah.csv' },
  },
  {
    id: 'log-2026-007',
    timestamp: '2026-09-17T11:22:15.000Z',
    actorName: 'System Bot / Inquiries Hook',
    actorRole: 'Automated System',
    module: 'inquiries',
    actionType: 'create',
    title: 'Lead Pendaftaran Baru dari Portal Publik',
    description: 'Formulir konsultasi baru masuk dari Ibu Rahmawati (+62 812-3456-7890) untuk program Junior Explorer Visual Scratch.',
    targetId: 'INQ-2026-001',
    targetName: 'Ibu Rahmawati',
    ipAddress: '36.84.192.55 (Surabaya, ID)',
    severity: 'info',
    metadata: { source: 'Landing Page Modal', status: 'baru' },
  },
  {
    id: 'log-2026-008',
    timestamp: '2026-09-17T09:15:00.000Z',
    actorName: 'Kevin Pratama, S.Kom.',
    actorRole: 'Senior 3D Game Dev Mentor',
    module: 'attendance',
    actionType: 'update',
    title: 'Pengisian Presensi Kelas Batch 01 Sesi 4',
    description: 'Mencatat presensi 8 siswa hadir 100% pada sesi materi conditional statement dan pembuatan rintangan objek 3D.',
    targetId: 'batch-2026-01',
    targetName: 'Batch 01 Junior Scratch',
    ipAddress: '114.124.90.15 (Bandung, ID)',
    severity: 'info',
    metadata: { presentCount: 8, absentCount: 0, attendanceRate: 100 },
  },
  {
    id: 'log-2026-009',
    timestamp: '2026-09-16T18:00:30.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'settings',
    actionType: 'backup',
    title: 'Pencadangan Penuh Database Sistem JSON',
    description: 'Mengunduh seluruh arsip data sistem (24 modul komprehensif) ke berkas beekoding_full_backup_2026-09-16.json.',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'warning',
    metadata: { format: 'JSON Encoded', totalModules: 24 },
  },
  {
    id: 'log-2026-010',
    timestamp: '2026-09-16T15:20:10.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'announcements',
    actionType: 'create',
    title: 'Siaran Pengumuman Libur Hari Raya & Workshop',
    description: 'Mempublikasikan pengumuman kategori libur nasional dan broadcast jadwal sesi pengganti ke seluruh wali murid.',
    targetId: 'ann-2026-001',
    targetName: 'Jadwal Libur & Sesi Pengganti',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'info',
    metadata: { audience: 'all', priority: 'important' },
  },
  {
    id: 'log-2026-011',
    timestamp: '2026-09-16T10:45:00.000Z',
    actorName: 'Nadia Salsabila, S.Pd.',
    actorRole: 'Curriculum Specialist',
    module: 'resources',
    actionType: 'create',
    title: 'Unggah Bahan Ajar & Lembar Kerja Modul 3',
    description: 'Menambahkan berkas digital Cheatsheet Sintaks Python Dasar & Turtle Geometri (PDF 4.2 MB) untuk jenjang Middle Coder.',
    targetId: 'res-2026-003',
    targetName: 'Cheatsheet Python Dasar & Turtle',
    ipAddress: '180.252.20.104 (Jakarta, ID)',
    severity: 'success',
    metadata: { format: 'PDF', tier: 'middle', fileSize: '4.2 MB' },
  },
  {
    id: 'log-2026-012',
    timestamp: '2026-09-15T19:30:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'transactions',
    actionType: 'create',
    title: 'Penerbitan Invoice Pembayaran Bootcamp',
    description: 'Invoice resmi INV/2026/06/001 diterbitkan untuk ananda Kenzo Alvaro Pratama dengan nominal pelunasan Rp 1.050.000 (Lunas).',
    targetId: 'tx-2026-001',
    targetName: 'INV/2026/06/001',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'success',
    metadata: { totalAmount: 1050000, status: 'paid', paymentMethod: 'BCA Virtual Account' },
  },
  {
    id: 'log-2026-013',
    timestamp: '2026-09-15T14:10:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'questions',
    actionType: 'update',
    title: 'Pembaruan Soal Kuis Pilar Computational Thinking',
    description: 'Memperbarui narasi soal Q-CT-014 dan opsi jawaban jenjang Junior Explorer agar lebih mudah dipahami anak usia 8 tahun.',
    targetId: 'Q-CT-014',
    targetName: 'Soal Pengenalan Algoritma Labirin',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'warning',
    metadata: { category: 'computational_thinking', tier: 'junior' },
  },
  {
    id: 'log-2026-014',
    timestamp: '2026-09-15T08:00:00.000Z',
    actorName: 'Security Monitor',
    actorRole: 'System Guard',
    module: 'auth',
    actionType: 'login',
    title: 'Percobaan Login Gagal Terdeteksi',
    description: 'Terdeteksi 1 kali kesalahan pengetikan kata sandi untuk akun admin@beekoding.id dari IP yang tidak biasa.',
    ipAddress: '103.111.42.18 (Medan, ID)',
    severity: 'danger',
    metadata: { attemptedEmail: 'admin@beekoding.id', userAgent: 'Mozilla/5.0 Unknown OS' },
  },
  {
    id: 'log-2026-015',
    timestamp: '2026-09-14T16:20:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'showcase',
    actionType: 'approve',
    title: 'Kurasi Karya Siswa ke Beranda Publik',
    description: 'Menyetujui proyek Scratch Labirin Antariksa karya Kenzo Alvaro Pratama untuk ditampilkan sebagai Unggulan (Featured) di website.',
    targetId: 'prj-2026-001',
    targetName: 'Scratch Labirin Antariksa',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'success',
    metadata: { platform: 'scratch', isFeatured: true },
  },
  {
    id: 'log-2026-016',
    timestamp: '2026-09-14T09:00:00.000Z',
    actorName: 'Febri Hasan',
    actorRole: 'Super Admin',
    module: 'reports',
    actionType: 'create',
    title: 'Penerbitan Rapor Belajar Evaluasi Tengah Semester',
    description: 'Rapor kompetensi tengah semester terbit untuk Alya Putri Zahra dengan rata-rata nilai kognitif 92.5 (A+ Sangat Memuaskan).',
    targetId: 'rep-2026-001',
    targetName: 'Alya Putri Zahra',
    ipAddress: '180.252.14.88 (Jakarta, ID)',
    severity: 'success',
    metadata: { gradeLetter: 'A+', avgScore: 92.5, period: 'mid_term' },
  },
];

export function getAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(DEFAULT_AUDIT_LOGS));
      return DEFAULT_AUDIT_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AUDIT_LOGS;
  } catch (err) {
    console.error('Failed to load audit logs:', err);
    return DEFAULT_AUDIT_LOGS;
  }
}

export function saveAuditLogs(logs: AuditLogEntry[]): void {
  try {
    const trimmed = logs.slice(0, 300);
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(trimmed));
  } catch (err) {
    console.error('Failed to save audit logs:', err);
  }
}

export function logAdminActivity(
  entry: Omit<AuditLogEntry, 'id' | 'timestamp' | 'actorName' | 'actorRole' | 'ipAddress'> & {
    actorName?: string;
    actorRole?: string;
    ipAddress?: string;
    timestamp?: string;
  }
): AuditLogEntry {
  const currentLogs = getAuditLogs();
  const profile = getAdminProfile();
  const now = new Date().toISOString();
  const newId = `log-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

  const newLog: AuditLogEntry = {
    id: newId,
    timestamp: entry.timestamp || now,
    actorName: entry.actorName || profile.name || 'Febri Hasan',
    actorRole: entry.actorRole || profile.role || 'Super Admin',
    ipAddress: entry.ipAddress || '180.252.14.88 (Local Session)',
    module: entry.module,
    actionType: entry.actionType,
    title: entry.title,
    description: entry.description,
    targetId: entry.targetId,
    targetName: entry.targetName,
    severity: entry.severity,
    metadata: entry.metadata,
  };

  const updated = [newLog, ...currentLogs];
  saveAuditLogs(updated);
  return newLog;
}

export function clearAuditLogs(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify([]));
  } catch (err) {
    console.error('Failed to clear audit logs:', err);
  }
}

export function resetAuditLogsToDefault(): AuditLogEntry[] {
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(DEFAULT_AUDIT_LOGS));
    return DEFAULT_AUDIT_LOGS;
  } catch (err) {
    console.error('Failed to reset audit logs:', err);
    return DEFAULT_AUDIT_LOGS;
  }
}

export function exportAuditLogsCSV(logs: AuditLogEntry[]): void {
  try {
    const headers = [
      'ID Log',
      'Waktu (UTC)',
      'Waktu Lokal Indonesia',
      'Pelaksana (Actor)',
      'Peran (Role)',
      'Modul Sistem',
      'Tipe Aksi',
      'Tingkat Urgensi',
      'Judul Aktivitas',
      'Deskripsi Rinci',
      'Target ID',
      'Target Objek',
      'Alamat IP / Lokasi',
    ];

    const rows = logs.map((l) => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${new Date(l.timestamp).toLocaleString('id-ID')}"`,
      `"${l.actorName.replace(/"/g, '""')}"`,
      `"${l.actorRole.replace(/"/g, '""')}"`,
      `"${l.module.toUpperCase()}"`,
      `"${l.actionType.toUpperCase()}"`,
      `"${l.severity.toUpperCase()}"`,
      `"${l.title.replace(/"/g, '""')}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${(l.targetId || '-').replace(/"/g, '""')}"`,
      `"${(l.targetName || '-').replace(/"/g, '""')}"`,
      `"${l.ipAddress.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `audit_trail_log_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export audit log CSV:', err);
  }
}

// ==========================================
// 26. MANAJEMEN KUIS & EVALUASI MANDIRI SISWA
// ==========================================

export const DEFAULT_QUIZZES: QuizExam[] = [
  {
    id: 'quiz-2026-001',
    title: 'Logika Animasi & Event Interaktif Scratch 3.0',
    description:
      'Evaluasi pemahaman konsep event listener, looping (forever & repeat), sistem koordinat kartesius X-Y, dan percabangan if-then pada blok Scratch.',
    tier: 'junior',
    topic: 'scratch_basics',
    sessionNumber: 4,
    durationMinutes: 15,
    passingScore: 70,
    xpReward: 150,
    isActive: true,
    createdAt: '2026-06-15T09:00:00.000Z',
    questions: [
      {
        id: 'q-sc-1',
        question: 'Blok kategori apakah yang paling tepat digunakan untuk memulai animasi saat bendera hijau diklik?',
        options: [
          'Events (Kejadian) - "when green flag clicked"',
          'Control (Kontrol) - "wait 1 seconds"',
          'Motion (Gerakan) - "move 10 steps"',
          'Looks (Tampilan) - "say Hello!"',
        ],
        correctOptionIndex: 0,
        explanation: 'Blok "when green flag clicked" berada di kategori Events dan berfungsi sebagai pemicu (trigger) utama program Scratch dimulai.',
      },
      {
        id: 'q-sc-2',
        question: 'Jika kamu ingin karakter (Sprite) terus bergerak maju tanpa pernah berhenti selama permainan berlangsung, blok apa yang harus digunakan?',
        options: [
          'repeat (10)',
          'forever (selamanya)',
          'if <touching mouse-pointer?> then',
          'wait until <key space pressed?>',
        ],
        correctOptionIndex: 1,
        explanation: 'Blok loop "forever" akan menjalankan instruksi di dalamnya secara berulang-ulang terus menerus tanpa batas waktu.',
      },
      {
        id: 'q-sc-3',
        question: 'Pada sistem koordinat layar panggung Scratch, apa yang terjadi jika nilai X diubah menjadi positif (+100)?',
        options: [
          'Sprite akan bergerak ke arah kiri layar',
          'Sprite akan bergerak ke arah kanan layar',
          'Sprite akan meloncat ke atas layar',
          'Sprite akan tenggelam ke bawah layar',
        ],
        correctOptionIndex: 1,
        explanation: 'Sumbu X merepresentasikan posisi horizontal: nilai positif bergerak ke arah kanan, sedangkan nilai negatif ke arah kiri.',
      },
      {
        id: 'q-sc-4',
        question: 'Manakah kondisi berikut yang benar untuk mendeteksi apakah Sprite menyentuh apel merah atau rintangan?',
        options: [
          'Blok Sensing - <touching color [merah]?>',
          'Blok Sound - <play sound until done>',
          'Blok Operators - (pick random 1 to 10)',
          'Blok Variables - [change my variable by 1]',
        ],
        correctOptionIndex: 0,
        explanation: 'Kategori Sensing memuat sensor deteksi tabrakan seperti touching color untuk mendeteksi rintangan atau item yang harus dikoleksi.',
      },
      {
        id: 'q-sc-5',
        question: 'Fitur apakah di Scratch yang memungkinkan Sprite mengirimkan pesan rahasia ke Sprite lain untuk memicu aksi bersamaan?',
        options: [
          'Broadcast message & When I receive message',
          'Create clone of myself',
          'Set size to 100%',
          'Switch backdrop to next',
        ],
        correctOptionIndex: 0,
        explanation: 'Sistem Broadcast Message memungkinkan komunikasi antarsprite atau antara sprite dengan panggung pementasan.',
      },
    ],
  },
  {
    id: 'quiz-2026-002',
    title: 'Scripting Lua & Manipulasi Objek 3D Roblox Studio',
    description:
      'Uji logika pemrograman skrip Lua di lingkungan Roblox Studio: properti part, Vector3 position, event listener Touched, fungsi kustom, dan debouncing logic.',
    tier: 'middle',
    topic: 'roblox_lua',
    sessionNumber: 6,
    durationMinutes: 15,
    passingScore: 75,
    xpReward: 200,
    isActive: true,
    createdAt: '2026-06-18T10:30:00.000Z',
    questions: [
      {
        id: 'q-rb-1',
        question: 'Bagaimana cara mereferensikan Part 3D tempat script diletakkan di dalam Explorer Roblox Studio?',
        options: [
          'script.Parent',
          'game.Workspace.CurrentPart',
          'this.Object',
          'local self = part.Root',
        ],
        correctOptionIndex: 0,
        explanation: 'Properti "script.Parent" digunakan untuk mengakses objek part induk tempat script Lua tersebut disematkan.',
      },
      {
        id: 'q-rb-2',
        question: 'Tipe data apakah yang digunakan untuk menentukan posisi spasial objek 3D (X, Y, Z) pada Roblox?',
        options: [
          'Color3.fromRGB()',
          'Vector3.new(x, y, z)',
          'CFrame.angles()',
          'UDim2.new()',
        ],
        correctOptionIndex: 1,
        explanation: 'Vector3.new(x, y, z) digunakan untuk menentukan koordinat tiga dimensi posisi dan ukuran part di dunia Roblox.',
      },
      {
        id: 'q-rb-3',
        question: 'Event apakah yang dipicu ketika karakter pemain menginjak atau menabrak sebuah part jebakan?',
        options: [
          'part.Touched:Connect(function)',
          'part.ClickDetector.MouseClick',
          'player.CharacterAdded',
          'workspace.ItemSpawned',
        ],
        correctOptionIndex: 0,
        explanation: 'Event .Touched aktif secara otomatis saat ada objek physics atau bagian tubuh karakter lain yang menyentuh part tersebut.',
      },
      {
        id: 'q-rb-4',
        question: 'Bagaimana cara mengurangi nyawa (health) karakter avatar pemain menjadi nol seketika saat menyentuh lava?',
        options: [
          'humanoid.Health = 0',
          'character:Destroy()',
          'humanoid.WalkSpeed = -10',
          'game.Players:Kick()',
        ],
        correctOptionIndex: 0,
        explanation: 'Objek Humanoid mengelola status fisik karakter termasuk properti Health (0-100) dan WalkSpeed.',
      },
      {
        id: 'q-rb-5',
        question: 'Mengapa teknik "Debounce" (variabel boolean seperti isTouched) sangat penting diterapkan pada event Touched di Roblox?',
        options: [
          'Untuk mempercepat kecepatan jalan pemain',
          'Untuk mencegah event terpanggil puluhan kali per detik saat part tersentuh berulang',
          'Agar warna part bisa berubah kelap-kelip',
          'Supaya game bisa berjalan tanpa koneksi internet',
        ],
        correctOptionIndex: 1,
        explanation: 'Debouncing adalah pola kontrol waktu yang mencegah fungsi callback terpanggil berkali-kali secara simultan akibat tabrakan fisika 3D.',
      },
    ],
  },
  {
    id: 'quiz-2026-003',
    title: 'Dasar Algoritma, Tipe Data & Percabangan Python',
    description:
      'Evaluasi pemahaman sintaksis bahasa pemrograman Python: variabel, tipe data primitif (int, float, str, bool), f-string formatting, percabangan if-elif-else, dan manipulasi List.',
    tier: 'teens',
    topic: 'python_fundamentals',
    sessionNumber: 6,
    durationMinutes: 20,
    passingScore: 75,
    xpReward: 250,
    isActive: true,
    createdAt: '2026-06-20T14:00:00.000Z',
    questions: [
      {
        id: 'q-py-1',
        question: 'Apakah output dari kode Python berikut: print(type("2026")) ?',
        options: [
          '<class "int">',
          '<class "str">',
          '<class "float">',
          '<class "number">',
        ],
        correctOptionIndex: 1,
        explanation: 'Teks di dalam tanda petik ganda atau tunggal adalah string (tipe data teks <class "str">).',
      },
      {
        id: 'q-py-2',
        question: 'Manakah operator logika di Python yang bernilai True jika SALAH SATU dari kedua kondisi terpenuhi?',
        options: [
          'and',
          'or',
          'not',
          'in',
        ],
        correctOptionIndex: 1,
        explanation: 'Operator "or" menghasilkan True jika salah satu atau kedua operand bernilai True.',
      },
      {
        id: 'q-py-3',
        question: 'Bagaimana cara menambahkan elemen baru ke urutan paling belakang dari sebuah list Python bernama "languages"?',
        options: [
          'languages.append("Python")',
          'languages.push("Python")',
          'languages.add("Python")',
          'languages.insertLast("Python")',
        ],
        correctOptionIndex: 0,
        explanation: 'Metode .append() di Python digunakan untuk menyisipkan satu elemen baru di akhir struktur data List.',
      },
      {
        id: 'q-py-4',
        question: 'Jika x = 15, apa hasil dari blok percabangan:\nif x > 20: print("A")\nelif x > 10: print("B")\nelse: print("C")',
        options: [
          'A',
          'B',
          'C',
          'Tidak ada output',
        ],
        correctOptionIndex: 1,
        explanation: 'Kondisi pertama x > 20 salah (False), tetapi kondisi kedua x > 10 benar (True), sehingga mencetak "B".',
      },
      {
        id: 'q-py-5',
        question: 'Sintaks manakah yang merupakan cara f-string modern paling efisien untuk mencetak nama dan skor di Python 3.8+?',
        options: [
          'print(f"Siswa: {nama}, Skor: {skor}")',
          'print("Siswa: %s, Skor: %d" % (nama, skor))',
          'print("Siswa: " + str(nama) + ", Skor: " + str(skor))',
          'print.format("Siswa: {}, Skor: {}", nama, skor)',
        ],
        correctOptionIndex: 0,
        explanation: 'Formatted string literals (f-strings) dengan prefix "f" dan kurung kurawal adalah cara standar, bersih, dan tercepat di Python modern.',
      },
    ],
  },
  {
    id: 'quiz-2026-004',
    title: 'Tantangan Berpikir Komputasional & Dekomposisi Pola',
    description:
      'Uji ketajaman 4 pilar Computational Thinking (Decomposition, Pattern Recognition, Abstraction, and Algorithm Design) untuk pemecahan masalah algoritmis.',
    tier: 'all',
    topic: 'computational_thinking',
    sessionNumber: 2,
    durationMinutes: 15,
    passingScore: 70,
    xpReward: 180,
    isActive: true,
    createdAt: '2026-06-22T11:00:00.000Z',
    questions: [
      {
        id: 'q-ct-1',
        question: 'Ketika kamu memecah game besar menjadi bagian-bagian kecil (seperti: sistem skor, kontrol karakter, dan rintangan), pilar apa yang sedang kamu terapkan?',
        options: [
          'Dekomposisi (Decomposition)',
          'Pengenalan Pola (Pattern Recognition)',
          'Abstraksi (Abstraction)',
          'Debugging',
        ],
        correctOptionIndex: 0,
        explanation: 'Dekomposisi adalah teknik memecah masalah besar atau sistem kompleks menjadi komponen-komponen yang lebih kecil dan mudah dikelola.',
      },
      {
        id: 'q-ct-2',
        question: 'Menghiraukan detail warna baju pejalan kaki dan hanya fokus pada kecepatan serta arah jalan saat membuat simulasi lampu lalu lintas adalah contoh dari?',
        options: [
          'Abstraksi (Abstraction)',
          'Dekomposisi (Decomposition)',
          'Perulangan (Looping)',
          'Algoritma Sekuensial',
        ],
        correctOptionIndex: 0,
        explanation: 'Abstraksi adalah proses menyaring dan mengabaikan informasi yang tidak relevan agar fokus pada informasi penting yang dibutuhkan.',
      },
      {
        id: 'q-ct-3',
        question: 'Melihat bahwa setiap kali skor kelipatan 100 musuh bertambah cepat 10% merupakan penerapan pilar computational thinking apa?',
        options: [
          'Pengenalan Pola (Pattern Recognition)',
          'Binary Search',
          'Variable Declaration',
          'Penataan Sintaksis',
        ],
        correctOptionIndex: 0,
        explanation: 'Pengenalan Pola membantu kita menemukan keteraturan, tren, atau kesamaan sifat pada sekumpulan data atau kejadian.',
      },
      {
        id: 'q-ct-4',
        question: 'Manakah urutan algoritma membuat teh manis yang benar secara sekuensial (langkah demi langkah)?',
        options: [
          '1. Masukkan teh & gula -> 2. Tuang air panas -> 3. Aduk rata -> 4. Siap disajikan',
          '1. Aduk rata -> 2. Masukkan air panas -> 3. Masukkan teh -> 4. Sajikan',
          '1. Tuang air panas -> 2. Siap disajikan -> 3. Masukkan gula -> 4. Aduk',
          '1. Minum teh -> 2. Tuang air -> 3. Beli cangkir -> 4. Masukkan gula',
        ],
        correctOptionIndex: 0,
        explanation: 'Algoritma harus disusun secara logis, berurutan (sekuensial), dan terstruktur agar mencapai hasil akhir yang diinginkan.',
      },
      {
        id: 'q-ct-5',
        question: 'Jika sebuah rute labirin memiliki petunjuk: [Maju 2 langkah -> Belok Kanan -> Maju 1 langkah -> Ulangi 3 kali], berapa total langkah maju yang ditempuh robot?',
        options: [
          '9 langkah',
          '6 langkah',
          '3 langkah',
          '12 langkah',
        ],
        correctOptionIndex: 0,
        explanation: 'Setiap iterasi robot maju (2 + 1) = 3 langkah. Diulang 3 kali, sehingga (3 langkah x 3 ulangan) = 9 langkah maju.',
      },
    ],
  },
];

export const DEFAULT_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'att-2026-001',
    quizId: 'quiz-2026-001',
    quizTitle: 'Logika Animasi & Event Interaktif Scratch 3.0',
    tier: 'junior',
    studentName: 'Kenzo Alvaro Pratama',
    studentPhone: '081234567890',
    score: 100,
    totalQuestions: 5,
    correctAnswers: 5,
    passed: true,
    xpEarned: 150,
    completedAt: '2026-06-25T10:15:00.000Z',
    answers: { 'q-sc-1': 0, 'q-sc-2': 1, 'q-sc-3': 1, 'q-sc-4': 0, 'q-sc-5': 0 },
  },
  {
    id: 'att-2026-002',
    quizId: 'quiz-2026-001',
    quizTitle: 'Logika Animasi & Event Interaktif Scratch 3.0',
    tier: 'junior',
    studentName: 'Aisyah Putri Rahmadani',
    studentPhone: '081298765432',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    passed: true,
    xpEarned: 150,
    completedAt: '2026-06-26T14:20:00.000Z',
    answers: { 'q-sc-1': 0, 'q-sc-2': 1, 'q-sc-3': 0, 'q-sc-4': 0, 'q-sc-5': 0 },
  },
  {
    id: 'att-2026-003',
    quizId: 'quiz-2026-002',
    quizTitle: 'Scripting Lua & Manipulasi Objek 3D Roblox Studio',
    tier: 'middle',
    studentName: 'Alya Zahra Kirana',
    studentPhone: '081987654321',
    score: 100,
    totalQuestions: 5,
    correctAnswers: 5,
    passed: true,
    xpEarned: 200,
    completedAt: '2026-06-27T16:00:00.000Z',
    answers: { 'q-rb-1': 0, 'q-rb-2': 1, 'q-rb-3': 0, 'q-rb-4': 0, 'q-rb-5': 1 },
  },
  {
    id: 'att-2026-004',
    quizId: 'quiz-2026-002',
    quizTitle: 'Scripting Lua & Manipulasi Objek 3D Roblox Studio',
    tier: 'middle',
    studentName: 'Rafa Azka Putra',
    studentPhone: '081211112222',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    passed: true,
    xpEarned: 200,
    completedAt: '2026-06-28T11:45:00.000Z',
    answers: { 'q-rb-1': 0, 'q-rb-2': 1, 'q-rb-3': 0, 'q-rb-4': 1, 'q-rb-5': 1 },
  },
  {
    id: 'att-2026-005',
    quizId: 'quiz-2026-003',
    quizTitle: 'Dasar Algoritma, Tipe Data & Percabangan Python',
    tier: 'teens',
    studentName: 'Rafi Danendra Putra',
    studentPhone: '082155554321',
    score: 100,
    totalQuestions: 5,
    correctAnswers: 5,
    passed: true,
    xpEarned: 250,
    completedAt: '2026-06-28T19:30:00.000Z',
    answers: { 'q-py-1': 1, 'q-py-2': 1, 'q-py-3': 0, 'q-py-4': 1, 'q-py-5': 0 },
  },
  {
    id: 'att-2026-006',
    quizId: 'quiz-2026-003',
    quizTitle: 'Dasar Algoritma, Tipe Data & Percabangan Python',
    tier: 'teens',
    studentName: 'Muhammad Rizky Ramadhan',
    studentPhone: '081233445566',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    passed: true,
    xpEarned: 250,
    completedAt: '2026-06-29T10:00:00.000Z',
    answers: { 'q-py-1': 1, 'q-py-2': 1, 'q-py-3': 0, 'q-py-4': 0, 'q-py-5': 0 },
  },
  {
    id: 'att-2026-007',
    quizId: 'quiz-2026-004',
    quizTitle: 'Tantangan Berpikir Komputasional & Dekomposisi Pola',
    tier: 'all',
    studentName: 'Nathania Putri Kusuma',
    studentPhone: '081377889900',
    score: 80,
    totalQuestions: 5,
    correctAnswers: 4,
    passed: true,
    xpEarned: 180,
    completedAt: '2026-06-30T13:10:00.000Z',
    answers: { 'q-ct-1': 0, 'q-ct-2': 0, 'q-ct-3': 0, 'q-ct-4': 0, 'q-ct-5': 1 },
  },
  {
    id: 'att-2026-008',
    quizId: 'quiz-2026-004',
    quizTitle: 'Tantangan Berpikir Komputasional & Dekomposisi Pola',
    tier: 'all',
    studentName: 'Kimberly Valerie Tan',
    studentPhone: '081288990011',
    score: 100,
    totalQuestions: 5,
    correctAnswers: 5,
    passed: true,
    xpEarned: 180,
    completedAt: '2026-07-01T09:25:00.000Z',
    answers: { 'q-ct-1': 0, 'q-ct-2': 0, 'q-ct-3': 0, 'q-ct-4': 0, 'q-ct-5': 0 },
  },
];

// Helper Functions Kuis & Ujian
export function getQuizExams(): QuizExam[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZZES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(DEFAULT_QUIZZES));
      return DEFAULT_QUIZZES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_QUIZZES;
  } catch (err) {
    console.error('Failed to get quiz exams:', err);
    return DEFAULT_QUIZZES;
  }
}

export function saveQuizExams(quizzes: QuizExam[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  } catch (err) {
    console.error('Failed to save quiz exams:', err);
  }
}

export function createQuizExam(data: Omit<QuizExam, 'id' | 'createdAt'>): QuizExam {
  const quizzes = getQuizExams();
  const nextNum = quizzes.length + 1;
  const newId = `quiz-2026-${String(nextNum).padStart(3, '0')}`;
  const now = new Date().toISOString();

  const newQuiz: QuizExam = {
    ...data,
    id: newId,
    createdAt: now,
  };

  const updated = [newQuiz, ...quizzes];
  saveQuizExams(updated);

  try {
    logAdminActivity({
      module: 'quizzes',
      actionType: 'create',
      title: 'Paket Kuis Baru Dibuat',
      description: `Kuis "${newQuiz.title}" jenjang ${newQuiz.tier.toUpperCase()} (${newQuiz.questions.length} butir soal) berhasil dipublikasikan.`,
      targetId: newQuiz.id,
      targetName: newQuiz.title,
      severity: 'info',
    });
  } catch {}

  return newQuiz;
}

export function updateQuizExam(id: string, updates: Partial<QuizExam>): QuizExam | null {
  const quizzes = getQuizExams();
  const index = quizzes.findIndex((q) => q.id === id);
  if (index === -1) return null;

  const existing = quizzes[index];
  const updatedQuiz: QuizExam = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  quizzes[index] = updatedQuiz;
  saveQuizExams(quizzes);

  try {
    logAdminActivity({
      module: 'quizzes',
      actionType: 'update',
      title: 'Paket Kuis Diperbarui',
      description: `Konfigurasi kuis "${updatedQuiz.title}" berhasil diubah.`,
      targetId: updatedQuiz.id,
      targetName: updatedQuiz.title,
      severity: 'info',
    });
  } catch {}

  return updatedQuiz;
}

export function deleteQuizExam(id: string): boolean {
  const quizzes = getQuizExams();
  const target = quizzes.find((q) => q.id === id);
  const filtered = quizzes.filter((q) => q.id !== id);
  if (filtered.length === quizzes.length) return false;

  saveQuizExams(filtered);

  try {
    logAdminActivity({
      module: 'quizzes',
      actionType: 'delete',
      title: 'Paket Kuis Dihapus',
      description: `Paket kuis "${target?.title || id}" telah dihapus dari sistem.`,
      targetId: id,
      targetName: target?.title,
      severity: 'warning',
    });
  } catch {}

  return true;
}

export function resetQuizzesToDefault(): { quizzes: QuizExam[]; attempts: QuizAttempt[] } {
  saveQuizExams(DEFAULT_QUIZZES);
  saveQuizAttempts(DEFAULT_QUIZ_ATTEMPTS);
  return { quizzes: DEFAULT_QUIZZES, attempts: DEFAULT_QUIZ_ATTEMPTS };
}

export function getQuizAttempts(): QuizAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(DEFAULT_QUIZ_ATTEMPTS));
      return DEFAULT_QUIZ_ATTEMPTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_QUIZ_ATTEMPTS;
  } catch (err) {
    console.error('Failed to get quiz attempts:', err);
    return DEFAULT_QUIZ_ATTEMPTS;
  }
}

export function saveQuizAttempts(attempts: QuizAttempt[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
  } catch (err) {
    console.error('Failed to save quiz attempts:', err);
  }
}

export function awardQuizXpToStudent(
  studentPhone: string,
  _studentName: string,
  xpEarned: number
): void {
  try {
    const profiles = getGamificationProfiles();
    const cleanPhone = studentPhone.replace(/\D/g, '');
    const idx = profiles.findIndex((p) => p.parentPhone.replace(/\D/g, '') === cleanPhone);
    if (idx !== -1) {
      const p = profiles[idx];
      const newXp = p.totalXp + xpEarned;
      const lvl = calculateLevelFromXp(newXp);
      profiles[idx] = {
        ...p,
        totalXp: newXp,
        level: lvl.level,
        levelTitle: lvl.levelTitle,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      saveGamificationProfiles(profiles);
    }
  } catch (err) {
    console.error('Failed to award quiz XP:', err);
  }
}

export function submitQuizAttempt(
  quizId: string,
  studentName: string,
  studentPhone: string,
  answers: Record<string, number>
): { attempt: QuizAttempt; passed: boolean; score: number; xpEarned: number } {
  const quizzes = getQuizExams();
  const quiz = quizzes.find((q) => q.id === quizId);
  const totalQuestions = quiz ? quiz.questions.length : Object.keys(answers).length;

  let correctCount = 0;
  if (quiz) {
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });
  }

  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passingScore = quiz ? quiz.passingScore : 70;
  const passed = score >= passingScore;
  const xpEarned = passed ? (quiz ? quiz.xpReward : 150) : 25; // consolation XP

  const attempts = getQuizAttempts();
  const nextNum = attempts.length + 1;
  const newAttempt: QuizAttempt = {
    id: `att-2026-${String(nextNum).padStart(3, '0')}`,
    quizId,
    quizTitle: quiz ? quiz.title : 'Kuis Evaluasi Koding',
    tier: quiz ? quiz.tier : 'junior',
    studentName: studentName.trim(),
    studentPhone: studentPhone.trim(),
    score,
    totalQuestions,
    correctAnswers: correctCount,
    passed,
    xpEarned,
    completedAt: new Date().toISOString(),
    answers,
  };

  const updatedAttempts = [newAttempt, ...attempts];
  saveQuizAttempts(updatedAttempts);

  // Otomatis tambahkan XP ke profil gamifikasi
  awardQuizXpToStudent(studentPhone, studentName, xpEarned);

  // Rekam Audit Trail
  try {
    logAdminActivity({
      module: 'quizzes',
      actionType: 'create',
      title: `Pengerjaan Kuis Siswa: ${studentName}`,
      description: `Siswa ${studentName} menuntaskan "${newAttempt.quizTitle}" dengan skor ${score} (${passed ? 'Lulus' : 'Belum Lulus'}). Reward: +${xpEarned} XP.`,
      targetId: newAttempt.id,
      targetName: studentName,
      severity: passed ? 'success' : 'info',
    });
  } catch {}

  return {
    attempt: newAttempt,
    passed,
    score,
    xpEarned,
  };
}

export function exportQuizAttemptsCSV(customAttempts?: QuizAttempt[]): void {
  try {
    const list = customAttempts || getQuizAttempts();
    const headers = [
      'ID Percobaan',
      'Waktu Selesai (ISO)',
      'Waktu Lokal',
      'Nama Siswa',
      'No. WhatsApp',
      'Jenjang',
      'ID Kuis',
      'Judul Kuis',
      'Skor Akhir',
      'Status Kelulusan',
      'Jawaban Benar',
      'Total Soal',
      'Bee-XP Diraih',
    ];

    const rows = list.map((a) => [
      `"${a.id}"`,
      `"${a.completedAt}"`,
      `"${new Date(a.completedAt).toLocaleString('id-ID')}"`,
      `"${a.studentName.replace(/"/g, '""')}"`,
      `"${a.studentPhone.replace(/"/g, '""')}"`,
      `"${a.tier.toUpperCase()}"`,
      `"${a.quizId}"`,
      `"${a.quizTitle.replace(/"/g, '""')}"`,
      `"${a.score}"`,
      `"${a.passed ? 'LULUS' : 'BELUM LULUS'}"`,
      `"${a.correctAnswers}"`,
      `"${a.totalQuestions}"`,
      `"${a.xpEarned} XP"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_nilai_kuis_evaluasi_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export quiz attempts CSV:', err);
  }
}

// ==========================================
// 27. PROGRAM REFERRAL, DUTA BELAJAR & AFILIASI
// ==========================================

export const DEFAULT_AMBASSADORS: AmbassadorProfile[] = [
  {
    id: 'amb-001',
    name: 'Bambang Pratama (Wali Kenzo Alvaro)',
    phone: '081234567890',
    email: 'bambang.pratama@gmail.com',
    role: 'parent',
    referralCode: 'KENZO-BEE',
    tier: 'gold',
    totalReferrals: 4,
    successfulReferrals: 3,
    totalEarningsRp: 450000,
    totalBeeXp: 1500,
    bankInfo: {
      bankName: 'BCA',
      accountNumber: '8920192831',
      accountHolder: 'Bambang Pratama',
    },
    isActive: true,
    createdAt: '2026-08-10T09:00:00.000Z',
  },
  {
    id: 'amb-002',
    name: 'Dewi Rahmawati (Wali Alya Putri)',
    phone: '081398765432',
    email: 'dewi.rahmawati@gmail.com',
    role: 'parent',
    referralCode: 'ALYA-CODE',
    tier: 'silver',
    totalReferrals: 3,
    successfulReferrals: 2,
    totalEarningsRp: 300000,
    totalBeeXp: 1000,
    bankInfo: {
      bankName: 'Bank Mandiri',
      accountNumber: '137001928301',
      accountHolder: 'Dewi Rahmawati',
    },
    isActive: true,
    createdAt: '2026-08-15T14:30:00.000Z',
  },
  {
    id: 'amb-003',
    name: 'Hendra Ramadhan (Wali M. Rizky)',
    phone: '081211223344',
    email: 'hendra.ramadhan@yahoo.com',
    role: 'parent',
    referralCode: 'RIZKY-DEV',
    tier: 'bronze',
    totalReferrals: 2,
    successfulReferrals: 1,
    totalEarningsRp: 150000,
    totalBeeXp: 500,
    bankInfo: {
      bankName: 'BNI',
      accountNumber: '0293819203',
      accountHolder: 'Hendra Ramadhan',
    },
    isActive: true,
    createdAt: '2026-08-20T11:00:00.000Z',
  },
  {
    id: 'amb-004',
    name: 'Shakila Az-Zahra & Wali Murid',
    phone: '085712345678',
    email: 'irfan.hakim@gmail.com',
    role: 'student',
    referralCode: 'SHAKILA-ROBOT',
    tier: 'silver',
    totalReferrals: 3,
    successfulReferrals: 2,
    totalEarningsRp: 300000,
    totalBeeXp: 1000,
    bankInfo: {
      bankName: 'BRI',
      accountNumber: '002910293819',
      accountHolder: 'Irfan Hakim',
    },
    isActive: true,
    createdAt: '2026-08-25T16:00:00.000Z',
  },
  {
    id: 'amb-005',
    name: 'Komite Orang Tua SD Al-Azhar BSD',
    phone: '08119876543',
    email: 'komite.alazharbsd@gmail.com',
    role: 'school_partner',
    referralCode: 'ALAZHAR-BSD',
    tier: 'diamond',
    totalReferrals: 12,
    successfulReferrals: 9,
    totalEarningsRp: 1350000,
    totalBeeXp: 4500,
    bankInfo: {
      bankName: 'BSI (Bank Syariah Indonesia)',
      accountNumber: '7129381920',
      accountHolder: 'Yayasan Syiar Bangsa BSD',
    },
    isActive: true,
    createdAt: '2026-08-01T08:00:00.000Z',
  },
  {
    id: 'amb-006',
    name: 'Edward Tan (Wali Kimberly Valerie)',
    phone: '081809876543',
    email: 'edward.tan@gmail.com',
    role: 'parent',
    referralCode: 'KIMBERLY-KIDS',
    tier: 'bronze',
    totalReferrals: 1,
    successfulReferrals: 1,
    totalEarningsRp: 150000,
    totalBeeXp: 500,
    bankInfo: {
      bankName: 'BCA',
      accountNumber: '5270192831',
      accountHolder: 'Edward Tan',
    },
    isActive: true,
    createdAt: '2026-09-02T10:15:00.000Z',
  },
];

export const DEFAULT_REFERRALS: ReferralRecord[] = [
  {
    id: 'ref-001',
    ambassadorId: 'amb-001',
    ambassadorName: 'Bambang Pratama (Wali Kenzo Alvaro)',
    ambassadorCode: 'KENZO-BEE',
    referredStudentName: 'Fathir Ar-Rasyid',
    referredParentPhone: '081299887766',
    targetCourse: 'Scratch Creative & Animation',
    status: 'reward_claimed',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'paid',
    payoutDate: '2026-09-10T11:20:00.000Z',
    notes: 'Potongan otomatis diterapkan pada tagihan SPP Kenzo bulan September.',
    createdAt: '2026-08-15T10:00:00.000Z',
  },
  {
    id: 'ref-002',
    ambassadorId: 'amb-001',
    ambassadorName: 'Bambang Pratama (Wali Kenzo Alvaro)',
    ambassadorCode: 'KENZO-BEE',
    referredStudentName: 'Rayyan Maulana',
    referredParentPhone: '081388776655',
    targetCourse: 'Roblox Studio & Lua 3D',
    status: 'enrolled',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'approved',
    notes: 'Sudah melunasi batch Oktober. Diskon SPP disetujui untuk tagihan mendatang.',
    createdAt: '2026-08-28T14:15:00.000Z',
  },
  {
    id: 'ref-003',
    ambassadorId: 'amb-001',
    ambassadorName: 'Bambang Pratama (Wali Kenzo Alvaro)',
    ambassadorCode: 'KENZO-BEE',
    referredStudentName: 'Kayla Safira',
    referredParentPhone: '081577665544',
    targetCourse: 'Visual Scratch & AI Prompting',
    status: 'trial_attended',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'pending',
    notes: 'Hadir trial class BSD Studio. Tertarik mendaftar batch berikutnya.',
    createdAt: '2026-09-05T09:40:00.000Z',
  },
  {
    id: 'ref-004',
    ambassadorId: 'amb-002',
    ambassadorName: 'Dewi Rahmawati (Wali Alya Putri)',
    ambassadorCode: 'ALYA-CODE',
    referredStudentName: 'Nabila Azzahra',
    referredParentPhone: '081277889900',
    targetCourse: 'Python & Game Logic Academy',
    status: 'reward_claimed',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'bank_transfer',
    payoutStatus: 'paid',
    payoutDate: '2026-09-12T15:30:00.000Z',
    notes: 'Transfer Mandiri komisi referral sukses ke rekening Bu Dewi Rahmawati.',
    createdAt: '2026-08-22T13:20:00.000Z',
  },
  {
    id: 'ref-005',
    ambassadorId: 'amb-002',
    ambassadorName: 'Dewi Rahmawati (Wali Alya Putri)',
    ambassadorCode: 'ALYA-CODE',
    referredStudentName: 'Aditya Pratama',
    referredParentPhone: '081366778899',
    targetCourse: 'Roblox Studio & Lua 3D',
    status: 'enrolled',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'approved',
    notes: 'Lunas pendaftaran Batch 3. Diskon SPP siap diproses.',
    createdAt: '2026-09-01T11:10:00.000Z',
  },
  {
    id: 'ref-006',
    ambassadorId: 'amb-002',
    ambassadorName: 'Dewi Rahmawati (Wali Alya Putri)',
    ambassadorCode: 'ALYA-CODE',
    referredStudentName: 'Daffa Athalla',
    referredParentPhone: '081755667788',
    targetCourse: 'Python & Data Science',
    status: 'registered',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'pending',
    notes: 'Baru mengisi form konsultasi pendaftaran via kode ALYA-CODE.',
    createdAt: '2026-09-14T08:50:00.000Z',
  },
  {
    id: 'ref-007',
    ambassadorId: 'amb-003',
    ambassadorName: 'Hendra Ramadhan (Wali M. Rizky)',
    ambassadorCode: 'RIZKY-DEV',
    referredStudentName: 'Bagas Wicaksono',
    referredParentPhone: '081244556677',
    targetCourse: 'Python Advanced & AI Robotics',
    status: 'reward_claimed',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'bank_transfer',
    payoutStatus: 'paid',
    payoutDate: '2026-09-05T16:00:00.000Z',
    notes: 'Transfer BNI ref: TRF-BNI-98129 senilai Rp 150.000.',
    createdAt: '2026-08-25T10:05:00.000Z',
  },
  {
    id: 'ref-008',
    ambassadorId: 'amb-004',
    ambassadorName: 'Shakila Az-Zahra & Wali Murid',
    ambassadorCode: 'SHAKILA-ROBOT',
    referredStudentName: 'Zaskia Aurelia',
    referredParentPhone: '085811223344',
    targetCourse: 'Scratch Creative & Animation',
    status: 'enrolled',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'approved',
    notes: 'Teman sekelas SD Shakila di BSD. Bergabung di kelas Scratch.',
    createdAt: '2026-09-03T15:25:00.000Z',
  },
  {
    id: 'ref-009',
    ambassadorId: 'amb-005',
    ambassadorName: 'Komite Orang Tua SD Al-Azhar BSD',
    ambassadorCode: 'ALAZHAR-BSD',
    referredStudentName: 'Muhammad Danish',
    referredParentPhone: '081122334455',
    targetCourse: 'Roblox Lua & Computational Thinking',
    status: 'reward_claimed',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'bank_transfer',
    payoutStatus: 'paid',
    payoutDate: '2026-09-14T14:10:00.000Z',
    notes: 'Program kemitraan ekstrakurikuler sekolah.',
    createdAt: '2026-09-08T09:15:00.000Z',
  },
  {
    id: 'ref-010',
    ambassadorId: 'amb-006',
    ambassadorName: 'Edward Tan (Wali Kimberly Valerie)',
    ambassadorCode: 'KIMBERLY-KIDS',
    referredStudentName: 'Clarissa Olivia',
    referredParentPhone: '081822334455',
    targetCourse: 'Web Development & UI UX Kids',
    status: 'enrolled',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'approved',
    notes: 'Diskon SPP Kimberly bulan depan siap diklaim.',
    createdAt: '2026-09-11T13:40:00.000Z',
  },
];

// Ambassador Functions
export function getAmbassadors(): AmbassadorProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AMBASSADORS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AMBASSADORS, JSON.stringify(DEFAULT_AMBASSADORS));
      return DEFAULT_AMBASSADORS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to get ambassadors:', err);
    return DEFAULT_AMBASSADORS;
  }
}

export function saveAmbassadors(ambassadors: AmbassadorProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.AMBASSADORS, JSON.stringify(ambassadors));
  } catch (err) {
    console.error('Failed to save ambassadors:', err);
  }
}

export function createAmbassador(
  data: Omit<
    AmbassadorProfile,
    'id' | 'createdAt' | 'updatedAt' | 'totalReferrals' | 'successfulReferrals' | 'totalEarningsRp' | 'totalBeeXp'
  >
): AmbassadorProfile {
  const ambassadors = getAmbassadors();
  const newAmb: AmbassadorProfile = {
    ...data,
    id: `amb-${Date.now().toString(36)}`,
    referralCode: data.referralCode.trim().toUpperCase(),
    totalReferrals: 0,
    successfulReferrals: 0,
    totalEarningsRp: 0,
    totalBeeXp: 0,
    createdAt: new Date().toISOString(),
  };

  ambassadors.unshift(newAmb);
  saveAmbassadors(ambassadors);

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'create',
      title: `Duta Belajar Baru: ${newAmb.name}`,
      description: `Menambahkan profil duta ${newAmb.name} dengan kode referral ${newAmb.referralCode} (${newAmb.tier.toUpperCase()}).`,
      targetId: newAmb.id,
      targetName: newAmb.name,
      severity: 'info',
    });
  } catch {}

  return newAmb;
}

export function updateAmbassador(id: string, patch: Partial<AmbassadorProfile>): AmbassadorProfile | null {
  const ambassadors = getAmbassadors();
  const idx = ambassadors.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  const updated: AmbassadorProfile = {
    ...ambassadors[idx],
    ...patch,
    referralCode: patch.referralCode ? patch.referralCode.trim().toUpperCase() : ambassadors[idx].referralCode,
    updatedAt: new Date().toISOString(),
  };

  ambassadors[idx] = updated;
  saveAmbassadors(ambassadors);

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'update',
      title: `Perbarui Duta Belajar: ${updated.name}`,
      description: `Memperbarui data profil atau tier duta ${updated.name} (${updated.referralCode}).`,
      targetId: updated.id,
      targetName: updated.name,
      severity: 'info',
    });
  } catch {}

  return updated;
}

export function deleteAmbassador(id: string): boolean {
  const ambassadors = getAmbassadors();
  const target = ambassadors.find((a) => a.id === id);
  if (!target) return false;

  const filtered = ambassadors.filter((a) => a.id !== id);
  saveAmbassadors(filtered);

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'delete',
      title: `Hapus Duta Belajar: ${target.name}`,
      description: `Menghapus duta belajar ${target.name} (Kode: ${target.referralCode}).`,
      targetId: target.id,
      targetName: target.name,
      severity: 'warning',
    });
  } catch {}

  return true;
}

export function resetAmbassadorsToDefault(): void {
  localStorage.setItem(STORAGE_KEYS.AMBASSADORS, JSON.stringify(DEFAULT_AMBASSADORS));
}

// Referral Records Functions
export function getReferralRecords(): ReferralRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFERRALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(DEFAULT_REFERRALS));
      return DEFAULT_REFERRALS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to get referral records:', err);
    return DEFAULT_REFERRALS;
  }
}

export function saveReferralRecords(records: ReferralRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(records));
  } catch (err) {
    console.error('Failed to save referral records:', err);
  }
}

export function createReferralRecord(data: {
  ambassadorCode: string;
  referredStudentName: string;
  referredParentPhone: string;
  targetCourse: string;
  notes?: string;
}): ReferralRecord {
  const ambassadors = getAmbassadors();
  const normalizedCode = data.ambassadorCode.trim().toUpperCase();
  const matchedAmb = ambassadors.find((a) => a.referralCode.toUpperCase() === normalizedCode);

  const newRecord: ReferralRecord = {
    id: `ref-${Date.now().toString(36)}`,
    ambassadorId: matchedAmb?.id || 'unknown',
    ambassadorName: matchedAmb?.name || `Duta (${normalizedCode})`,
    ambassadorCode: normalizedCode,
    referredStudentName: data.referredStudentName.trim(),
    referredParentPhone: data.referredParentPhone.trim(),
    targetCourse: data.targetCourse || 'Visual Scratch & AI Prompting',
    status: 'registered',
    discountForFriendRp: 150000,
    rewardForAmbassadorRp: 150000,
    rewardBeeXp: 500,
    rewardType: 'tuition_discount',
    payoutStatus: 'pending',
    notes: data.notes,
    createdAt: new Date().toISOString(),
  };

  const referrals = getReferralRecords();
  referrals.unshift(newRecord);
  saveReferralRecords(referrals);

  // Update stats on ambassador
  if (matchedAmb) {
    updateAmbassador(matchedAmb.id, {
      totalReferrals: matchedAmb.totalReferrals + 1,
    });
  }

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'create',
      title: `Referral Baru: ${newRecord.referredStudentName}`,
      description: `Murid baru ${newRecord.referredStudentName} mendaftar menggunakan kode referral ${newRecord.ambassadorCode}.`,
      targetId: newRecord.id,
      targetName: newRecord.referredStudentName,
      severity: 'info',
    });
  } catch {}

  return newRecord;
}

export function updateReferralStatus(id: string, status: ReferralStatus, notes?: string): ReferralRecord | null {
  const referrals = getReferralRecords();
  const idx = referrals.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  const current = referrals[idx];
  const prevStatus = current.status;

  const updated: ReferralRecord = {
    ...current,
    status,
    notes: notes !== undefined ? notes : current.notes,
    payoutStatus: status === 'enrolled' && current.payoutStatus === 'pending' ? 'approved' : current.payoutStatus,
    updatedAt: new Date().toISOString(),
  };

  referrals[idx] = updated;
  saveReferralRecords(referrals);

  // If status changed to enrolled or reward_claimed, update ambassador stats
  if ((status === 'enrolled' || status === 'reward_claimed') && prevStatus !== 'enrolled' && prevStatus !== 'reward_claimed') {
    const ambassadors = getAmbassadors();
    const amb = ambassadors.find((a) => a.id === updated.ambassadorId || a.referralCode === updated.ambassadorCode);
    if (amb) {
      updateAmbassador(amb.id, {
        successfulReferrals: amb.successfulReferrals + 1,
        totalEarningsRp: amb.totalEarningsRp + updated.rewardForAmbassadorRp,
        totalBeeXp: amb.totalBeeXp + updated.rewardBeeXp,
      });
    }
  }

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'status_change' as any,
      title: `Status Referral Berubah: ${updated.referredStudentName}`,
      description: `Status referral ${updated.referredStudentName} (Kode: ${updated.ambassadorCode}) diubah menjadi ${status}.`,
      targetId: updated.id,
      targetName: updated.referredStudentName,
      severity: status === 'enrolled' ? 'success' : 'info',
    });
  } catch {}

  return updated;
}

export function approveReferralPayout(
  id: string,
  rewardType: ReferralRewardType,
  payoutNotes?: string
): ReferralRecord | null {
  const referrals = getReferralRecords();
  const idx = referrals.findIndex((r) => r.id === id);
  if (idx === -1) return null;

  const current = referrals[idx];
  const updated: ReferralRecord = {
    ...current,
    status: 'reward_claimed',
    payoutStatus: 'paid',
    rewardType,
    payoutDate: new Date().toISOString(),
    notes: payoutNotes || current.notes || 'Reward referral berhasil dicairkan.',
    updatedAt: new Date().toISOString(),
  };

  referrals[idx] = updated;
  saveReferralRecords(referrals);

  try {
    logAdminActivity({
      module: 'referrals',
      actionType: 'approve',
      title: `Pencairan Reward Referral: ${updated.ambassadorName}`,
      description: `Pencairan reward Rp ${updated.rewardForAmbassadorRp.toLocaleString('id-ID')} via ${rewardType === 'tuition_discount' ? 'Potongan SPP' : 'Transfer Bank'} untuk referral ${updated.referredStudentName}.`,
      targetId: updated.id,
      targetName: updated.ambassadorName,
      severity: 'success',
    });
  } catch {}

  return updated;
}

export function resetReferralsToDefault(): void {
  localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(DEFAULT_REFERRALS));
}

export function generateAmbassadorWhatsAppInvite(ambassador: AmbassadorProfile, portalUrl?: string): string {
  const appUrl = portalUrl || window.location.origin;
  const message = `Halo Ayah/Bunda! 🐝✨

Yuk ajak ananda belajar koding, logika game, dan AI seru bersama Beekoding Academy!

Gunakan kode referral eksklusif ini saat mendaftar:
👉 *${ambassador.referralCode}*

Keuntungan untuk Anda:
🎁 *Diskon langsung Rp 150.000* untuk pendaftaran kelas koding anak.
✨ Akses sesi Trial Class gratis & rapor tes bakat koding.

Kunjungi portal pendaftaran:
${appUrl}

Mari persiapkan masa depan teknologi ananda sejak dini bersama Beekoding! 🚀`;

  return encodeURIComponent(message);
}

export function exportReferralsCSV(customReferrals?: ReferralRecord[]): void {
  try {
    const list = customReferrals || getReferralRecords();
    const headers = [
      'ID Referral',
      'Tanggal Dibuat',
      'Nama Duta',
      'Kode Referral',
      'Nama Siswa Diajak',
      'No. HP Wali Diajak',
      'Program Diminati',
      'Status Alur',
      'Diskon Murid (Rp)',
      'Reward Duta (Rp)',
      'Bee-XP',
      'Metode Reward',
      'Status Pencairan',
      'Tanggal Pencairan',
      'Catatan',
    ];

    const rows = list.map((r) => [
      `"${r.id}"`,
      `"${new Date(r.createdAt).toLocaleString('id-ID')}"`,
      `"${r.ambassadorName.replace(/"/g, '""')}"`,
      `"${r.ambassadorCode}"`,
      `"${r.referredStudentName.replace(/"/g, '""')}"`,
      `"${r.referredParentPhone.replace(/"/g, '""')}"`,
      `"${r.targetCourse.replace(/"/g, '""')}"`,
      `"${r.status}"`,
      `"${r.discountForFriendRp}"`,
      `"${r.rewardForAmbassadorRp}"`,
      `"${r.rewardBeeXp}"`,
      `"${r.rewardType}"`,
      `"${r.payoutStatus}"`,
      `"${r.payoutDate ? new Date(r.payoutDate).toLocaleString('id-ID') : '-'}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `rekap_referral_duta_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export referrals CSV:', err);
  }
}

export function exportAmbassadorsCSV(customAmbassadors?: AmbassadorProfile[]): void {
  try {
    const list = customAmbassadors || getAmbassadors();
    const headers = [
      'ID Duta',
      'Nama Duta',
      'No. WhatsApp',
      'Email',
      'Peran',
      'Kode Referral',
      'Tier Duta',
      'Total Referral',
      'Referral Sukses',
      'Total Reward Rp',
      'Total Bee-XP',
      'Bank',
      'No. Rekening',
      'Nama Pemilik Rekening',
      'Status Aktif',
      'Tanggal Bergabung',
    ];

    const rows = list.map((a) => [
      `"${a.id}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.phone.replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${a.role}"`,
      `"${a.referralCode}"`,
      `"${a.tier.toUpperCase()}"`,
      `"${a.totalReferrals}"`,
      `"${a.successfulReferrals}"`,
      `"${a.totalEarningsRp}"`,
      `"${a.totalBeeXp}"`,
      `"${(a.bankInfo?.bankName || '-').replace(/"/g, '""')}"`,
      `"${(a.bankInfo?.accountNumber || '-').replace(/"/g, '""')}"`,
      `"${(a.bankInfo?.accountHolder || '-').replace(/"/g, '""')}"`,
      `"${a.isActive ? 'Aktif' : 'Non-Aktif'}"`,
      `"${new Date(a.createdAt).toLocaleString('id-ID')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `daftar_duta_belajar_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export ambassadors CSV:', err);
  }
}

// ==========================================
// 31. WHATSAPP GATEWAY & AUTOMATED DISPATCHER ENGINE
// ==========================================

export type GatewayStatus = 'connected' | 'disconnected' | 'qr_ready' | 'simulated';
export type GatewayProvider =
  | 'sandbox_simulator'
  | 'meta_cloud_api'
  | 'fonnte'
  | 'wablas'
  | 'custom_webhook';

export type DispatchTriggerType =
  | 'class_reminder_h1'
  | 'attendance_summary'
  | 'report_card_published'
  | 'payment_invoice'
  | 'payment_success'
  | 'counseling_reminder'
  | 'trial_class_invitation'
  | 'quiz_announcement'
  | 'custom_broadcast';

export type DispatchMessageStatus = 'pending' | 'processing' | 'delivered' | 'read' | 'failed';

export interface WhatsAppGatewayConfig {
  provider: GatewayProvider;
  status: GatewayStatus;
  deviceNumber: string;
  deviceName: string;
  apiKeyOrToken: string;
  webhookUrl?: string;
  antiSpamDelaySeconds: number;
  dailyQuota: number;
  quotaUsedToday: number;
  isAutomationActive: boolean;
  autoTriggers: Record<DispatchTriggerType, boolean>;
  updatedAt?: string;
}

export interface QueuedWhatsAppMessage {
  id: string;
  recipientPhone: string;
  recipientName: string;
  recipientRole: 'parent' | 'student' | 'instructor' | 'ambassador';
  triggerType: DispatchTriggerType;
  content: string;
  status: DispatchMessageStatus;
  retryCount: number;
  errorMessage?: string;
  scheduledAt: string;
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  createdAt: string;
}

export const DEFAULT_GATEWAY_CONFIG: WhatsAppGatewayConfig = {
  provider: 'sandbox_simulator',
  status: 'connected',
  deviceNumber: '+62 853-1131-7127',
  deviceName: 'Beekoding Official Education Hotline & Auto-Bot',
  apiKeyOrToken: 'bk_sandbox_token_live_2026',
  webhookUrl: 'https://api.beekoding.id/v1/webhooks/whatsapp',
  antiSpamDelaySeconds: 3,
  dailyQuota: 1500,
  quotaUsedToday: 42,
  isAutomationActive: true,
  autoTriggers: {
    class_reminder_h1: true,
    attendance_summary: true,
    report_card_published: true,
    payment_invoice: true,
    payment_success: true,
    counseling_reminder: true,
    trial_class_invitation: false,
    quiz_announcement: false,
    custom_broadcast: false,
  },
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_GATEWAY_QUEUE: QueuedWhatsAppMessage[] = [
  {
    id: 'msg-2026-001',
    recipientPhone: '+62 812-3456-7890',
    recipientName: 'Bunda Sarah (Wali Kenzo)',
    recipientRole: 'parent',
    triggerType: 'class_reminder_h1',
    content: `Halo Bunda Sarah! 🐝 Mengingatkan besok Sabtu pukul 09.00 WIB ananda *Kenzo Alvaro* memiliki sesi koding "Scratch Game Maker (Pertemuan 4)".\n\n📌 Link Kelas: https://meet.google.com/bk-junior-kenzo\n👨‍🏫 Mentor: Kak Sarah Amalia\n\nSampai jumpa di ruang kelas digital Beekoding! 🚀`,
    status: 'delivered',
    retryCount: 0,
    scheduledAt: '2026-09-18T08:00:00Z',
    sentAt: '2026-09-18T08:00:03Z',
    deliveredAt: '2026-09-18T08:00:05Z',
    readAt: '2026-09-18T08:02:15Z',
    createdAt: '2026-09-18T07:55:00Z',
  },
  {
    id: 'msg-2026-002',
    recipientPhone: '+62 813-9876-5432',
    recipientName: 'Ayah Hendra (Wali Alya)',
    recipientRole: 'parent',
    triggerType: 'attendance_summary',
    content: `Halo Ayah Hendra! 🌟 Hari ini *Alya Putri* telah selesai mengikuti sesi "Roblox Lua Scripting (Pertemuan 6)".\n\n✅ Kehadiran: Hadir Tepat Waktu\n🎯 Materi: Loop & Conditional Logic 3D Obby\n⭐ Catatan Mentor: "Alya sangat antusias dan berhasil memecahkan bug script koin tanpa bantuan!"\n\nTerima kasih telah mempercayakan pendidikan koding ananda di Beekoding! 🐝`,
    status: 'read',
    retryCount: 0,
    scheduledAt: '2026-09-17T16:00:00Z',
    sentAt: '2026-09-17T16:00:04Z',
    deliveredAt: '2026-09-17T16:00:06Z',
    readAt: '2026-09-17T16:05:22Z',
    createdAt: '2026-09-17T15:58:00Z',
  },
  {
    id: 'msg-2026-003',
    recipientPhone: '+62 857-1122-3344',
    recipientName: 'Bunda Rini (Wali Rizky)',
    recipientRole: 'parent',
    triggerType: 'report_card_published',
    content: `Kabar gembira Bunda Rini! 🎉 Rapor Belajar Semesteran untuk ananda *Muhammad Rizky Ramadhan* di kelas "Python Data & Logic Innovator" telah resmi terbit!\n\n🏆 Predikat: Sangat Memuaskan (Nilai Rata-rata 95)\n📄 Unduh Rapor PDF: https://portal.beekoding.id/reports/rep-2026-003\n\nSelamat atas pencapaian gemilang ananda! 🐝✨`,
    status: 'read',
    retryCount: 0,
    scheduledAt: '2026-09-16T14:30:00Z',
    sentAt: '2026-09-16T14:30:04Z',
    deliveredAt: '2026-09-16T14:30:06Z',
    readAt: '2026-09-16T14:40:10Z',
    createdAt: '2026-09-16T14:28:00Z',
  },
  {
    id: 'msg-2026-004',
    recipientPhone: '+62 819-5566-7788',
    recipientName: 'Ayah Denny (Wali Shakila)',
    recipientRole: 'parent',
    triggerType: 'payment_invoice',
    content: `Halo Ayah Denny! 🐝 Mengingatkan bahwa invoice SPP Program Koding "Junior Explorer Batch 5" ananda *Shakila Az-Zahra* akan jatuh tempo pada 20 September 2026.\n\n💰 Total Tagihan: Rp 450.000\n🏦 Pembayaran via Virtual Account BCA / QRIS\n📄 Rincian Tagihan: https://portal.beekoding.id/invoices/inv-2026-004\n\nMohon konfirmasi jika pembayaran telah dilakukan. Terima kasih! 🙏`,
    status: 'delivered',
    retryCount: 0,
    scheduledAt: '2026-09-18T09:15:00Z',
    sentAt: '2026-09-18T09:15:04Z',
    deliveredAt: '2026-09-18T09:15:07Z',
    createdAt: '2026-09-18T09:10:00Z',
  },
  {
    id: 'msg-2026-005',
    recipientPhone: '+62 821-4433-2211',
    recipientName: 'Bunda Valerie (Wali Kimberly)',
    recipientRole: 'parent',
    triggerType: 'payment_success',
    content: `Pembayaran Berhasil! 🧾 Terima kasih Bunda Valerie. Pembayaran SPP koding ananda *Kimberly Valerie Tan* sebesar Rp 450.000 telah kami verifikasi lunas.\n\nNomor Kuitansi: #KWT-BK-2026-089\nStatus Siswa: Aktif (Sesi Berlanjut)\n\nTerima kasih telah bersama Beekoding! 🚀`,
    status: 'delivered',
    retryCount: 0,
    scheduledAt: '2026-09-17T11:20:00Z',
    sentAt: '2026-09-17T11:20:03Z',
    deliveredAt: '2026-09-17T11:20:06Z',
    readAt: '2026-09-17T11:25:00Z',
    createdAt: '2026-09-17T11:18:00Z',
  },
  {
    id: 'msg-2026-006',
    recipientPhone: '+62 812-7788-9900',
    recipientName: 'Bunda Sarah (Wali Kenzo)',
    recipientRole: 'parent',
    triggerType: 'counseling_reminder',
    content: `Halo Bunda Sarah! 🤝 Mengingatkan jadwal sesi Bimbingan & Konseling Belajar Privat 1-on-1 ananda *Kenzo Alvaro* besok Minggu pukul 10.00 WIB.\n\n🎯 Topik: Strategi Fokus Belajar & Pengaturan Screen Time\n👨‍🏫 Konselor: Kak Febri Hasan, M.Kom.\n🔗 Link Zoom: https://zoom.us/j/beekoding-counseling\n\nSampai bertemu di sesi bimbingan besok! 🐝`,
    status: 'pending',
    retryCount: 0,
    scheduledAt: '2026-09-18T16:00:00Z',
    createdAt: '2026-09-18T12:00:00Z',
  },
  {
    id: 'msg-2026-007',
    recipientPhone: '+62 813-1144-7788',
    recipientName: 'Ayah Teguh (Wali Dimas)',
    recipientRole: 'parent',
    triggerType: 'class_reminder_h1',
    content: `Halo Ayah Teguh! 🐝 Pengingat sesi kelas koding besok Minggu pukul 13.00 WIB ananda *Dimas Pratama* di "Roblox Obby Builder Batch 2".\n\n📌 Link GMeet: https://meet.google.com/bk-roblox-dimas\n👨‍🏫 Mentor: Kak Kevin Pratama\n\nSiapkan laptop dan akun Roblox ananda ya Ayah/Bunda! 🎮`,
    status: 'pending',
    retryCount: 0,
    scheduledAt: '2026-09-18T16:30:00Z',
    createdAt: '2026-09-18T13:00:00Z',
  },
  {
    id: 'msg-2026-008',
    recipientPhone: '+62 852-9988-1122',
    recipientName: 'Bunda Maya (Wali Farhan)',
    recipientRole: 'parent',
    triggerType: 'class_reminder_h1',
    content: `Halo Bunda Maya! 🐝 Pengingat sesi kelas koding "Scratch Animation" ananda *Farhan* besok pagi pukul 09.30 WIB.\n\n📌 Link Kelas: https://meet.google.com/bk-scratch-farhan`,
    status: 'failed',
    retryCount: 2,
    errorMessage: 'Nomor tujuan sementara tidak aktif / di luar jangkauan jaringan provider.',
    scheduledAt: '2026-09-18T07:00:00Z',
    sentAt: '2026-09-18T07:00:05Z',
    createdAt: '2026-09-18T06:50:00Z',
  },
];

export function getGatewayConfig(): WhatsAppGatewayConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GATEWAY_CONFIG);
    if (raw) return JSON.parse(raw);
  } catch {}
  try {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_CONFIG, JSON.stringify(DEFAULT_GATEWAY_CONFIG));
  } catch {}
  return DEFAULT_GATEWAY_CONFIG;
}

export function saveGatewayConfig(updates: Partial<WhatsAppGatewayConfig>): WhatsAppGatewayConfig {
  const current = getGatewayConfig();
  const updated: WhatsAppGatewayConfig = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_CONFIG, JSON.stringify(updated));
    try {
      logAdminActivity({
        module: 'gateway',
        actionType: 'update',
        title: 'Konfigurasi WhatsApp Gateway Diperbarui',
        description: `Pengaturan gateway (${updated.deviceName} - ${updated.provider}) berhasil disimpan.`,
        severity: 'info',
        metadata: { provider: updated.provider, status: updated.status },
      });
    } catch {}
  } catch (err) {
    console.error('Failed to save gateway config:', err);
  }
  return updated;
}

export function updateGatewayTriggerStatus(
  trigger: DispatchTriggerType,
  enabled: boolean
): WhatsAppGatewayConfig {
  const current = getGatewayConfig();
  const updated: WhatsAppGatewayConfig = {
    ...current,
    autoTriggers: {
      ...current.autoTriggers,
      [trigger]: enabled,
    },
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_CONFIG, JSON.stringify(updated));
  } catch {}
  return updated;
}

export function getQueuedMessages(): QueuedWhatsAppMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GATEWAY_QUEUE);
    if (raw) {
      const parsed: QueuedWhatsAppMessage[] = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  try {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_QUEUE, JSON.stringify(DEFAULT_GATEWAY_QUEUE));
  } catch {}
  return DEFAULT_GATEWAY_QUEUE;
}

export function saveQueuedMessages(messages: QueuedWhatsAppMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GATEWAY_QUEUE, JSON.stringify(messages));
  } catch (err) {
    console.error('Failed to save queued messages:', err);
  }
}

export function enqueueMessage(
  data: Omit<QueuedWhatsAppMessage, 'id' | 'createdAt' | 'retryCount' | 'status'> & {
    status?: DispatchMessageStatus;
  }
): QueuedWhatsAppMessage {
  const queue = getQueuedMessages();
  const newMessage: QueuedWhatsAppMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    recipientPhone: data.recipientPhone,
    recipientName: data.recipientName,
    recipientRole: data.recipientRole || 'parent',
    triggerType: data.triggerType,
    content: data.content,
    status: data.status || 'pending',
    retryCount: 0,
    scheduledAt: data.scheduledAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  queue.unshift(newMessage);
  saveQueuedMessages(queue);
  return newMessage;
}

export function retryMessage(id: string): boolean {
  const queue = getQueuedMessages();
  const index = queue.findIndex((m) => m.id === id);
  if (index === -1) return false;

  queue[index].status = 'pending';
  queue[index].errorMessage = undefined;
  queue[index].scheduledAt = new Date().toISOString();
  queue[index].retryCount = (queue[index].retryCount || 0) + 1;
  saveQueuedMessages(queue);
  return true;
}

export function deleteQueuedMessage(id: string): boolean {
  const queue = getQueuedMessages();
  const filtered = queue.filter((m) => m.id !== id);
  if (filtered.length === queue.length) return false;
  saveQueuedMessages(filtered);
  return true;
}

export function clearQueue(statusFilter?: DispatchMessageStatus): void {
  if (!statusFilter) {
    saveQueuedMessages([]);
  } else {
    const queue = getQueuedMessages();
    const filtered = queue.filter((m) => m.status !== statusFilter);
    saveQueuedMessages(filtered);
  }
}

export function generateAutomatedBatchReminders(): {
  count: number;
  messages: QueuedWhatsAppMessage[];
} {
  const batches = getBatches();
  const queue = getQueuedMessages();
  const newMessages: QueuedWhatsAppMessage[] = [];

  batches.forEach((b) => {
    if (b.status === 'ongoing' || b.status === 'upcoming') {
      b.enrolledStudents.forEach((st) => {
        const phone = st.parentPhone || '+62 812-3456-7890';
        const alreadyQueued = queue.some(
          (q) =>
            q.recipientPhone === phone &&
            q.triggerType === 'class_reminder_h1' &&
            q.content.includes(b.name) &&
            q.status === 'pending'
        );

        if (!alreadyQueued) {
          const content = `Halo ${st.parentName || 'Ayah/Bunda'}! 🐝 Mengingatkan jadwal kelas koding besok untuk ananda *${st.studentName}* pada batch "${b.name}".\n\n⏰ Jam: ${b.scheduleTime}\n📌 Link Kelas: ${b.meetUrl || 'https://meet.google.com/bk-class-online'}\n👨‍🏫 Mentor: ${b.instructorName}\n\nSampai jumpa di kelas koding Beekoding! 🚀`;

          const msg: QueuedWhatsAppMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            recipientPhone: phone,
            recipientName: `${st.parentName || 'Wali'} (${st.studentName})`,
            recipientRole: 'parent',
            triggerType: 'class_reminder_h1',
            content,
            status: 'pending',
            retryCount: 0,
            scheduledAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };

          newMessages.push(msg);
          queue.unshift(msg);
        }
      });
    }
  });

  if (newMessages.length > 0) {
    saveQueuedMessages(queue);
    try {
      logAdminActivity({
        module: 'gateway',
        actionType: 'create',
        title: 'Penjadwalan Otomatis Pengingat Kelas H-1',
        description: `Berhasil menjadwalkan ${newMessages.length} pesan pengingat kelas ke antrean WhatsApp.`,
        severity: 'info',
        metadata: { scheduledCount: newMessages.length },
      });
    } catch {}
  }

  return { count: newMessages.length, messages: newMessages };
}

export function processSingleQueuedMessage(id: string): {
  success: boolean;
  message?: QueuedWhatsAppMessage;
  error?: string;
} {
  const queue = getQueuedMessages();
  const index = queue.findIndex((m) => m.id === id);
  if (index === -1) return { success: false, error: 'Pesan tidak ditemukan' };

  const target = queue[index];
  const config = getGatewayConfig();

  // Simulate dispatch
  target.sentAt = new Date().toISOString();
  target.deliveredAt = new Date(Date.now() + 2000).toISOString();
  target.status = 'delivered';

  config.quotaUsedToday = (config.quotaUsedToday || 0) + 1;
  saveGatewayConfig(config);

  queue[index] = target;
  saveQueuedMessages(queue);

  return { success: true, message: target };
}

export function processAllPendingQueue(): {
  processedCount: number;
  successCount: number;
  failedCount: number;
} {
  const queue = getQueuedMessages();
  let processedCount = 0;
  let successCount = 0;
  let failedCount = 0;
  const config = getGatewayConfig();

  queue.forEach((msg) => {
    if (msg.status === 'pending') {
      processedCount++;
      msg.sentAt = new Date().toISOString();
      msg.deliveredAt = new Date(Date.now() + 2500).toISOString();
      msg.status = 'delivered';
      successCount++;
    }
  });

  if (processedCount > 0) {
    config.quotaUsedToday = (config.quotaUsedToday || 0) + processedCount;
    saveGatewayConfig(config);
    saveQueuedMessages(queue);

    try {
      logAdminActivity({
        module: 'gateway',
        actionType: 'update',
        title: 'Mesin Antrean WhatsApp Diproses',
        description: `Berhasil mengeksekusi ${processedCount} pesan antrean keluar via WhatsApp Gateway (${config.provider}).`,
        severity: 'info',
        metadata: { processedCount, successCount, failedCount },
      });
    } catch {}
  }

  return { processedCount, successCount, failedCount };
}

export function exportGatewayLogsCSV(): void {
  try {
    const queue = getQueuedMessages();
    const headers = [
      'ID Pesan',
      'No. WhatsApp',
      'Nama Penerima',
      'Peran',
      'Tipe Pemicu (Trigger)',
      'Status Pengiriman',
      'Isi Pesan',
      'Jadwal Kirim',
      'Waktu Terkirim',
      'Waktu Diterima',
      'Percobaan Ulang',
      'Catatan Kesalahan',
    ];

    const rows = queue.map((m) => [
      `"${m.id}"`,
      `"${m.recipientPhone}"`,
      `"${m.recipientName.replace(/"/g, '""')}"`,
      `"${m.recipientRole}"`,
      `"${m.triggerType}"`,
      `"${m.status}"`,
      `"${m.content.replace(/\n/g, ' ').replace(/"/g, '""')}"`,
      `"${new Date(m.scheduledAt).toLocaleString('id-ID')}"`,
      `"${m.sentAt ? new Date(m.sentAt).toLocaleString('id-ID') : '-'}"`,
      `"${m.deliveredAt ? new Date(m.deliveredAt).toLocaleString('id-ID') : '-'}"`,
      `"${m.retryCount}"`,
      `"${(m.errorMessage || '-').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `log_whatsapp_gateway_beekoding_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Failed to export gateway logs CSV:', err);
  }
}



