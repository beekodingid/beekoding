import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { hashPasswordSha256 } from './supabaseAuth';
import {
  getAdminProfile,
  getSubmissions,
  getInquiries,
  getBatches,
  getWhatsAppTemplates,
  getTransactions,
  getCertificates,
  getStudentProjects,
  getParentTestimonials,
  getCurriculumSessions,
  getInstructors,
  getAttendanceRecords,
  getAcademicReports,
  getPromoVouchers,
  getCodingQuests,
  getAchievementBadges,
  getGamificationProfiles,
  getClassAnnouncements,
  getInstructorPayrolls,
  getLearningResources,
  getCodingEvents,
  getCounselingSessions,
  getAuditLogs,
  getQuizExams,
  getQuizAttempts,
  getAmbassadors,
  getReferralRecords,
  getSystemUsers,
  getGatewayConfig,
  getQueuedMessages,
  getAllQuestions,
  saveSubmissions,
  saveInquiries,
  saveBatches,
  saveTransactions,
  saveAttendanceRecords,
  emitStorageUpdate,
  type AssessmentSubmission,
  type ConsultationInquiry,
  type InquiryStatus,
  type ClassBatch,
  type TransactionRecord,
  type CodingEvent,
  type SessionAttendanceRecord,
  type StudentAcademicReport,
  type SystemUser,
  type AdminUser,
  type ClassAnnouncement,
  type AuditLogEntry,
  type WhatsAppGatewayConfig,
  type QueuedWhatsAppMessage,
} from './adminStorage';

export interface SyncResult {
  success: boolean;
  message: string;
  totalSynced: number;
  tablesSucceeded: string[];
  tablesFailed: { table: string; error: string }[];
  durationMs: number;
}

export interface PullResult {
  success: boolean;
  message: string;
  totalPulled: number;
  tablesPulled: string[];
  errors: string[];
}

/**
 * Konversi tanggal fleksibel (ISO, string Indonesia, dsb) ke ISO 8601 Timestamp yang valid untuk PostgreSQL TIMESTAMP.
 */
export function toIsoTimestamp(val: any): string {
  if (!val) return new Date().toISOString();
  if (typeof val === 'string') {
    const trimmed = val.trim();
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }

    // Format Indonesia: "21 September 2026, 11:20 WIB" atau "21 September 2026"
    const indoMonths: Record<string, number> = {
      januari: 0, februari: 1, maret: 2, april: 3, mei: 4, juni: 5,
      juli: 6, agustus: 7, september: 8, oktober: 9, november: 10, desember: 11
    };
    const cleanStr = trimmed.toLowerCase().replace(/wib|wita|wit/g, '').trim();
    const match = cleanStr.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})(?:,\s*(\d{1,2})[.:](\d{1,2}))?/);
    if (match) {
      const day = parseInt(match[1], 10);
      const monthName = match[2];
      const year = parseInt(match[3], 10);
      const hour = match[4] ? parseInt(match[4], 10) : 0;
      const min = match[5] ? parseInt(match[5], 10) : 0;
      if (indoMonths[monthName] !== undefined) {
        return new Date(Date.UTC(year, indoMonths[monthName], day, hour, min)).toISOString();
      }
    }
  }
  return new Date().toISOString();
}

/**
 * Konversi nilai tanggal ke format YYYY-MM-DD standar untuk kolom PostgreSQL DATE.
 */
export function toIsoDate(val: any): string {
  if (!val) return new Date().toISOString().split('T')[0];
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val.trim())) {
    return val.trim();
  }
  return toIsoTimestamp(val).split('T')[0];
}

/**
 * Sinkronkan SELURUH data lokal (localStorage) ke Cloud Supabase PostgreSQL.
 * Menggunakan UPSERT berbasis Primary Key (id) sehingga aman dijalankan berulang kali.
 */
export async function syncAllLocalDataToSupabase(): Promise<SyncResult> {
  const startTime = Date.now();
  const client = getSupabaseClient();

  if (!client || !isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Kredensial Supabase belum terkonfigurasi.',
      totalSynced: 0,
      tablesSucceeded: [],
      tablesFailed: [{ table: 'auth', error: 'Kredensial tidak valid' }],
      durationMs: 0,
    };
  }

  const tablesSucceeded: string[] = [];
  const tablesFailed: { table: string; error: string }[] = [];
  let totalSynced = 0;

  async function syncTable(tableName: string, rows: any[]): Promise<void> {
    if (!rows || rows.length === 0) return;
    try {
      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const { error } = await client!.from(tableName).upsert(chunk, { onConflict: 'id' });
        if (error) {
          throw error;
        }
      }
      tablesSucceeded.push(tableName);
      totalSynced += rows.length;
    } catch (err: any) {
      console.error(`Gagal sinkronisasi tabel ${tableName}:`, err);
      tablesFailed.push({ table: tableName, error: err?.message || 'Error tidak diketahui' });
    }
  }

  try {
    // 1. system_settings
    const profile = getAdminProfile();
    const settingsRows = [{
      id: 'setting-01',
      institution_name: profile.institution || 'Beekoding Academy Indonesia',
      tagline: profile.bio || 'Platform Belajar Koding Berbasis Bakat Anak',
      email: profile.email || 'halo@beekoding.com',
      phone: profile.phone || '+62 853-1131-7127',
      address: 'Gedung Beekoding EduHub Lt. 3, Jakarta Selatan',
      logo_url: profile.avatar || '/bee-mascot.png',
      website_url: 'https://beekoding.com',
      currency: 'IDR',
      notifications_enabled: profile.notificationsEnabled ?? true,
      lead_alerts_enabled: profile.leadAlertsEnabled ?? true,
      sound_enabled: profile.soundEnabled ?? true,
      two_factor_enabled: profile.twoFactorEnabled ?? false,
      system_config_json: JSON.stringify({ theme: 'dark', autoReminder: true }),
    }];
    await syncTable('system_settings', settingsRows);

    // 2. system_users
    const users = getSystemUsers();
    const userRows = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      role_title: u.roleTitle,
      phone: u.phone || null,
      avatar: u.avatar || null,
      institution: u.institution || null,
      bio: u.bio || null,
      status: u.status,
      allowed_tabs_json: JSON.stringify(u.allowedTabs),
      password_hash: u.passwordHash,
    }));
    await syncTable('system_users', userRows);

    // 3. instructors
    const instructors = getInstructors();
    const instructorRows = instructors.map((i: any) => ({
      id: i.id,
      name: i.name,
      email: i.email,
      phone: i.phone || null,
      avatar: i.avatar || i.photoUrl || null,
      bio: i.bio || null,
      specialization: i.specialization || (Array.isArray(i.specializations) ? i.specializations.join(', ') : ''),
      skills_json: JSON.stringify(i.skills || i.specializations || []),
      hourly_rate: i.hourlyRate || i.baseHourlyRate || 0,
      active_batches_count: i.activeBatchesCount || 0,
      total_teaching_hours: i.totalTeachingHours || i.totalHoursTaught || 0,
      rating: i.rating || 5.0,
      status: i.status || 'active',
      joined_date: i.joinedDate || i.joinedAt || i.createdAt ? toIsoDate(i.joinedDate || i.joinedAt || i.createdAt) : null,
    }));
    await syncTable('instructors', instructorRows);

    // 4. question_bank
    const allQuestionsMap = getAllQuestions();
    const flatQuestions = [
      ...(allQuestionsMap.junior || []),
      ...(allQuestionsMap.middle || []),
      ...(allQuestionsMap.teens || []),
    ];
    const questionRows = flatQuestions.map((q) => ({
      id: q.id,
      tier: q.tier,
      category: q.category,
      section_number: q.sectionNumber,
      question_number: q.questionNumber,
      prompt: q.prompt,
      visual_hint: q.visualHint || null,
      options_json: JSON.stringify(q.options),
      is_active: true,
    }));
    await syncTable('question_bank', questionRows);

    // 5. students_submissions
    const submissions = getSubmissions();
    const submissionRows = submissions.map((s: any) => ({
      id: s.id,
      child_name: s.profile?.childName || 'Siswa',
      child_age: s.profile?.childAge || 7,
      grade_level: s.profile?.gradeLevel || null,
      parent_name: s.profile?.parentName || 'Orang Tua',
      parent_phone: s.profile?.parentPhone || '',
      parent_email: null,
      tier: s.profile?.tier || 'junior',
      total_score: s.totalScore || 0,
      scores_json: JSON.stringify(s.scores || {}),
      top_strengths_json: JSON.stringify(s.topStrengths || []),
      growth_areas_json: JSON.stringify(s.growthAreas || []),
      recommended_program_name: s.recommendedProgram?.title || '',
      recommended_program_level: '',
      recommended_program_desc: s.recommendedProgram?.description || '',
      answers_json: s.answers ? JSON.stringify(s.answers) : null,
      status: s.status || 'baru',
      notes: s.notes || null,
      created_at: s.createdAt || new Date().toISOString(),
    }));
    await syncTable('students_submissions', submissionRows);

    // 6. consultation_inquiries
    const inquiries = getInquiries();
    const inquiryRows = inquiries.map((iq) => ({
      id: iq.id,
      type: iq.type || 'konsultasi',
      name: iq.name || 'Wali Murid',
      email: iq.email || 'wali@gmail.com',
      phone: iq.phone || '-',
      role: iq.role || 'Orang Tua',
      program: iq.program || 'Program Koding',
      message: iq.message || null,
      status: iq.status || 'baru',
      admin_notes: iq.adminNotes || null,
      created_at: toIsoTimestamp(iq.createdAt),
    }));
    await syncTable('consultation_inquiries', inquiryRows);

    // 7. class_batches
    const batches = getBatches();
    const validBatchIds = new Set(batches.map((b: any) => b.id));
    const defaultBatchId = batches[0]?.id || 'batch-2026-01';

    function normalizeBatchId(rawBatchId: string | undefined | null): string {
      if (!rawBatchId) return defaultBatchId;
      if (validBatchIds.has(rawBatchId)) return rawBatchId;
      // Menangani variasi digit: batch-2026-001 -> batch-2026-01, batch-2026-1 -> batch-2026-01
      const normalized = rawBatchId.replace(/^(batch-\d{4}-)0*(\d+)$/, (_match, prefix, numStr) => {
        return `${prefix}${numStr.padStart(2, '0')}`;
      });
      if (validBatchIds.has(normalized)) return normalized;
      return defaultBatchId;
    }

    const batchRows = batches.map((b: any) => ({
      id: b.id,
      name: b.name,
      level: b.programType || 'Junior Explorer',
      age_tier: b.tier || 'junior',
      schedule_day: Array.isArray(b.scheduleDays) ? b.scheduleDays.join(', ') : 'Sabtu, Minggu',
      schedule_time: b.scheduleTime || '09:00 - 10:30 WIB',
      instructor_id: null,
      instructor_name: b.instructorName || 'Kak Febri Hasan',
      quota: b.maxCapacity || 8,
      enrolled_count: Array.isArray(b.enrolledStudents) ? b.enrolledStudents.length : 0,
      status: b.status || 'upcoming',
      meet_url: b.meetUrl || null,
      session_dates_json: JSON.stringify([]),
      enrolled_students_json: JSON.stringify(b.enrolledStudents || []),
    }));
    await syncTable('class_batches', batchRows);

    // 8. financial_transactions
    const transactions = getTransactions();
    const txRows = transactions.map((t: any) => ({
      id: t.id,
      invoice_number: t.invoiceNumber || t.id,
      student_name: t.studentName,
      parent_name: t.parentName,
      parent_phone: t.parentPhone,
      batch_name: t.batchName || null,
      program_name: t.programName,
      amount: t.totalAmount || 0,
      discount_amount: t.discount || 0,
      total_paid: t.paidAmount || 0,
      payment_method: t.paymentMethod || 'Transfer Bank BCA',
      payment_status: t.status || 'unpaid',
      due_date: toIsoDate(t.dueDate),
      paid_at: t.paidAt ? toIsoTimestamp(t.paidAt) : null,
      receipt_url: t.transferProofUrl || null,
      notes: t.notes || null,
      created_at: toIsoTimestamp(t.createdAt),
    }));
    await syncTable('financial_transactions', txRows);

    // 9. coding_events
    const events = getCodingEvents();
    const eventRows = events.map((ev: any) => ({
      id: ev.id,
      title: ev.title,
      category: ev.eventType || 'trial_class',
      age_group: ev.tier || '7 - 12 Tahun',
      event_date: toIsoDate(ev.date),
      event_time: `${ev.startTime || '10:00'} - ${ev.endTime || '11:30 WIB'}`,
      location_type: ev.locationType || 'online',
      location_or_link: ev.meetingUrl || ev.locationDetail || null,
      instructor_name: ev.instructorName || null,
      quota: ev.capacity || 20,
      registered_count: Array.isArray(ev.registrations) ? ev.registrations.length : 0,
      price: ev.price || 0,
      is_free: ev.price === 0,
      description: ev.description || null,
      status: ev.status || 'open',
    }));
    await syncTable('coding_events', eventRows);

    // 10. counseling_sessions
    const counseling = getCounselingSessions();
    const counselingRows = counseling.map((cs: any) => ({
      id: cs.id,
      student_name: cs.studentName,
      parent_name: cs.parentName,
      parent_phone: cs.parentPhone,
      counselor_name: cs.counselorName,
      session_date: toIsoDate(cs.date || cs.sessionDate),
      session_time: cs.time || cs.sessionTime || '10:00 WIB',
      duration_minutes: cs.durationMinutes || cs.duration || 45,
      meeting_link: cs.meetingLink || null,
      topic: cs.topic || 'Evaluasi Belajar',
      student_concern: cs.challengesFaced || cs.studentStrengths || cs.studentConcern || cs.summary || null,
      action_plan: cs.actionPlan || cs.curriculumRecommendation || null,
      status: cs.status || 'scheduled',
      notes: cs.internalNotes || cs.notes || cs.feedbackNotes || null,
    }));
    await syncTable('counseling_sessions', counselingRows);

    // 11. class_attendance
    const attendance = getAttendanceRecords();
    const attendanceRows = attendance.map((at: any) => ({
      id: at.id,
      batch_id: normalizeBatchId(at.batchId),
      batch_name: at.batchName || 'Kelas Koding',
      session_number: at.sessionNumber || 1,
      session_date: toIsoDate(at.date),
      instructor_id: null,
      instructor_name: at.instructorName || 'Kak Febri Hasan',
      topic: at.sessionTopic || 'Sesi Koding',
      notes: at.classNotes || null,
      students_attendance_json: JSON.stringify(at.students || []),
    }));
    await syncTable('class_attendance', attendanceRows);

    // 12. curriculum_modules
    const curriculum = getCurriculumSessions();
    const curriculumRows = curriculum.map((cr: any) => ({
      id: cr.id,
      level: cr.tier || cr.level || 'junior',
      level_title: cr.levelTitle || cr.title || 'Kurikulum Koding',
      target_age: cr.targetAge || '7-12 Tahun',
      duration_info: cr.durationInfo || '12 Sesi',
      description: cr.description || null,
      prerequisites: cr.prerequisites || null,
      competencies_json: JSON.stringify(cr.competencies || []),
      sessions_plan_json: JSON.stringify(cr.sessions || []),
    }));
    await syncTable('curriculum_modules', curriculumRows);

    // 13. learning_resources
    const resources = getLearningResources();
    const resourceRows = resources.map((lr: any) => ({
      id: lr.id,
      title: lr.title,
      category: lr.category || 'worksheet',
      level: lr.tier || lr.level || 'junior',
      file_type: lr.fileType || lr.format || 'pdf',
      file_size: lr.fileSize || '1 MB',
      download_url: lr.downloadUrl || lr.url || '',
      description: lr.description || null,
      is_premium: lr.isPremium ?? false,
      tags_json: JSON.stringify(lr.tags || []),
      download_count: lr.downloadsCount || lr.downloadCount || 0,
    }));
    await syncTable('learning_resources', resourceRows);

    // 14. academic_reports
    const reports = getAcademicReports();
    const reportRows = reports.map((rp: any) => {
      const scores = typeof rp.scores === 'string' ? JSON.parse(rp.scores) : (rp.scores || {});
      return {
        id: String(rp.id || 'rep-2026-01'),
        student_id: String(rp.studentId || 'stud-001'),
        student_name: String(rp.studentName || 'Siswa'),
        batch_id: normalizeBatchId(rp.batchId),
        batch_name: String(rp.batchName || 'Kelas Koding'),
        level: String(rp.tier || 'junior'),
        instructor_name: String(rp.instructorName || 'Kak Febri Hasan'),
        period: String(rp.reportPeriod || rp.period || '2026'),
        attendance_rate: Math.round(Number(rp.attendanceRate) || 100),
        logic_score: Math.round(Number(scores.computationalThinking) || 85),
        creativity_score: Math.round(Number(scores.creativityDesign) || 85),
        problem_solving_score: Math.round(Number(scores.problemSolving) || 85),
        presentation_score: Math.round(Number(scores.teamworkAttitude) || 85),
        overall_grade: String(rp.gradeLetter || 'A').slice(0, 5),
        teacher_notes: rp.instructorNotes || rp.teacherNotes || null,
        project_title: rp.capstoneProjectTitle || rp.projectTitle || null,
        project_url: null,
        report_file_url: null,
        created_at: toIsoTimestamp(rp.createdAt),
      };
    });
    await syncTable('academic_reports', reportRows);

    // 15. coding_quests
    const quests = getCodingQuests();
    const questRows = quests.map((qu: any) => ({
      id: qu.id,
      title: qu.title,
      category: qu.tier || qu.category || 'logic',
      level: qu.tier || qu.level || 'junior',
      xp_reward: qu.xpReward || 250,
      badge_reward: qu.badgeRewardId || null,
      deadline: qu.deadline || null,
      description: qu.description || '',
      requirements_json: JSON.stringify(qu.requirements || []),
      starter_code_url: qu.starterLink || null,
      submissions_count: qu.completedCount || qu.submissionsCount || 0,
      is_active: qu.status === 'active',
    }));
    await syncTable('coding_quests', questRows);

    // 16. achievement_badges
    const badges = getAchievementBadges();
    const badgeRows = badges.map((bg: any) => ({
      id: bg.id,
      code: bg.id,
      name: bg.title || bg.name,
      description: bg.description,
      icon: bg.iconEmoji || bg.icon || '🏆',
      xp_value: bg.xpBonus || bg.xpValue || 100,
      category: bg.category,
      criteria_json: JSON.stringify(bg.criteria || null),
    }));
    await syncTable('achievement_badges', badgeRows);

    // 17. student_gamification
    const gamification = getGamificationProfiles();
    const gamificationRows = gamification.map((gm: any) => ({
      student_id: gm.studentId,
      student_name: gm.studentName,
      total_xp: gm.totalXp || 0,
      current_level: gm.level || gm.currentLevel || 1,
      streak_days: gm.streakDays || 0,
      quests_completed: gm.completedQuestsCount || gm.questsCompleted || 0,
      badges_earned_json: JSON.stringify(gm.earnedBadges || gm.badgesEarned || []),
      last_activity_at: gm.lastActiveDate || gm.lastActivityAt ? toIsoTimestamp(gm.lastActiveDate || gm.lastActivityAt) : null,
    }));
    if (gamificationRows.length > 0) {
      try {
        const { error } = await client.from('student_gamification').upsert(gamificationRows, { onConflict: 'student_id' });
        if (error) throw error;
        tablesSucceeded.push('student_gamification');
        totalSynced += gamificationRows.length;
      } catch (err: any) {
        tablesFailed.push({ table: 'student_gamification', error: err?.message || 'Error' });
      }
    }

    // 18. quiz_exams
    const quizzes = getQuizExams();
    const validQuizIds = new Set(quizzes.map((q) => q.id));
    const defaultQuizId = quizzes[0]?.id || 'quiz-2026-001';
    const quizRows = quizzes.map((qz: any) => ({
      id: qz.id,
      title: qz.title,
      category: qz.topic || 'logic',
      level: qz.tier || 'junior',
      target_age: qz.tier || 'junior',
      duration_minutes: qz.durationMinutes || 15,
      passing_score: qz.passingScore || 70,
      xp_reward: qz.xpReward || 150,
      total_questions: qz.questions ? qz.questions.length : 5,
      questions_json: JSON.stringify(qz.questions || []),
      is_active: qz.isActive ?? true,
    }));
    await syncTable('quiz_exams', quizRows);

    // 19. student_quiz_attempts
    const quizAttempts = getQuizAttempts();
    const attemptRows = quizAttempts.map((qa: any) => ({
      id: qa.id,
      quiz_id: validQuizIds.has(qa.quizId) ? qa.quizId : defaultQuizId,
      student_id: qa.studentName,
      student_name: qa.studentName,
      score: qa.score || 0,
      passed: qa.passed ?? true,
      xp_earned: qa.xpEarned || 0,
      answers_json: JSON.stringify(qa.answers || {}),
      time_spent_seconds: 0,
      completed_at: toIsoTimestamp(qa.completedAt),
    }));
    await syncTable('student_quiz_attempts', attemptRows);

    // 20. student_certificates
    const certificates = getCertificates();
    const certRows = certificates.map((cf: any) => ({
      id: cf.id,
      certificate_number: cf.certificateNumber,
      student_id: cf.studentName,
      student_name: cf.studentName,
      course_name: cf.programName,
      level: cf.honorsTitle || 'Kompeten',
      issue_date: toIsoDate(cf.issueDate),
      instructor_name: cf.instructorName,
      verification_code: cf.verificationCode,
      qr_code_url: null,
      pdf_url: null,
      status: 'valid',
    }));
    await syncTable('student_certificates', certRows);

    // 21. student_projects
    const projects = getStudentProjects();
    const projectRows = projects.map((pj: any) => ({
      id: pj.id,
      student_id: pj.studentName,
      student_name: pj.studentName,
      age: pj.studentAge || null,
      title: pj.title,
      category: pj.platform || 'scratch',
      level: pj.programType || 'junior',
      thumbnail_url: pj.thumbnailEmojiOrUrl || null,
      project_url: pj.demoUrl || '',
      description: pj.description || '',
      tags_json: JSON.stringify(pj.tags || []),
      likes_count: pj.likesCount || 0,
      is_featured: pj.isFeatured ?? false,
    }));
    await syncTable('student_projects', projectRows);

    // 22. parent_testimonials
    const testimonials = getParentTestimonials();
    const testimonialRows = testimonials.map((tm: any) => ({
      id: tm.id,
      parent_name: tm.parentName,
      child_name: tm.childName,
      role_or_city: tm.roleOrProfession || null,
      avatar: tm.avatarEmojiOrUrl || null,
      content: tm.review || '',
      rating: tm.rating || 5,
      is_featured: tm.isFeatured ?? true,
    }));
    await syncTable('parent_testimonials', testimonialRows);

    // 23. promo_vouchers
    const vouchers = getPromoVouchers();
    const voucherRows = vouchers.map((vc: any) => ({
      id: vc.id,
      code: vc.code,
      title: vc.title,
      discount_type: vc.discountType,
      discount_value: vc.discountValue,
      min_transaction: vc.minTransactionAmount || 0,
      max_discount: vc.maxDiscountAmount || null,
      usage_limit: vc.usageLimit || 100,
      times_used: vc.usedCount || 0,
      valid_from: toIsoDate(vc.validFrom),
      valid_until: toIsoDate(vc.validUntil),
      is_active: vc.status === 'active',
    }));
    await syncTable('promo_vouchers', voucherRows);

    // 24. instructor_payrolls
    const validInstructorIds = new Set(instructors.map((i: any) => i.id));
    const defaultInstructorId = instructors[0]?.id || 'inst-2026-001';
    const payroll = getInstructorPayrolls();
    const payrollRows = payroll.map((py: any) => ({
      id: py.id,
      slip_number: py.payrollNumber || py.id,
      instructor_id: validInstructorIds.has(py.instructorId) ? py.instructorId : defaultInstructorId,
      instructor_name: py.instructorName,
      period_month: 1,
      period_year: 2026,
      total_sessions: 0,
      total_hours: py.teachingHours || 0,
      rate_per_hour: py.hourlyRate || 0,
      base_salary: py.baseTeachingHonor || 0,
      bonus: py.performanceIncentive || 0,
      deductions: py.deductionsTotal || 0,
      total_net_salary: py.netTotalAmount || 0,
      payment_status: py.status || 'paid',
      paid_at: py.paymentDate ? toIsoTimestamp(py.paymentDate) : null,
      notes: py.notes || null,
    }));
    await syncTable('instructor_payrolls', payrollRows);

    // 25. referral_ambassadors
    const ambassadors = getAmbassadors();
    const validAmbassadorIds = new Set(ambassadors.map((a: any) => a.id));
    const defaultAmbassadorId = ambassadors[0]?.id || 'amb-001';
    const ambassadorRows = ambassadors.map((am: any) => ({
      id: am.id,
      name: am.name,
      phone: am.phone,
      email: am.email || null,
      referral_code: am.referralCode,
      role: am.role,
      tier: am.tier,
      total_referrals: am.totalReferrals || 0,
      successful_enrollments: am.successfulReferrals || 0,
      pending_rewards: 0,
      paid_rewards: am.totalEarningsRp || 0,
      bee_xp_earned: am.totalBeeXp || 0,
      joined_date: am.createdAt ? toIsoDate(am.createdAt) : null,
      status: am.isActive ? 'active' : 'inactive',
    }));
    await syncTable('referral_ambassadors', ambassadorRows);

    // 26. referral_records
    const referrals = getReferralRecords();
    const referralRows = referrals.map((rf: any) => ({
      id: rf.id,
      ambassador_id: validAmbassadorIds.has(rf.ambassadorId) ? rf.ambassadorId : defaultAmbassadorId,
      ambassador_name: rf.ambassadorName,
      referral_code: rf.ambassadorCode,
      referred_student_name: rf.referredStudentName,
      referred_parent_name: rf.ambassadorName,
      referred_phone: rf.referredParentPhone,
      target_program: rf.targetCourse || null,
      status: rf.status,
      discount_applied: rf.discountForFriendRp || 150000,
      reward_amount: rf.rewardForAmbassadorRp || 150000,
      bee_xp_awarded: rf.rewardBeeXp || 500,
      reward_status: rf.payoutStatus || 'pending',
    }));
    await syncTable('referral_records', referralRows);

    // 27. whatsapp_templates
    const templates = getWhatsAppTemplates();
    const templateRows = templates.map((wt: any) => ({
      id: wt.id,
      title: wt.title,
      category: wt.category,
      trigger_type: null,
      message_body: wt.body,
      variables_json: JSON.stringify([]),
      is_active: wt.isDefault ?? true,
    }));
    await syncTable('whatsapp_templates', templateRows);

    // 28. class_announcements
    const announcements = getClassAnnouncements();
    const announcementRows = announcements.map((an: any) => ({
      id: an.id,
      title: an.title,
      target_audience: an.audience,
      target_batch_id: an.batchId || null,
      content: an.content,
      channels_json: JSON.stringify(['whatsapp']),
      send_status: an.status,
      sent_at: an.publishedAt ? toIsoTimestamp(an.publishedAt) : null,
      created_by: an.authorName || null,
    }));
    await syncTable('class_announcements', announcementRows);

    // 29. audit_logs
    const auditLogs = getAuditLogs();
    const auditRows = auditLogs.slice(0, 100).map((al: any) => ({
      id: al.id,
      user_id: al.actorName,
      user_name: al.actorName,
      user_role: al.actorRole || null,
      module: al.module,
      action_type: al.actionType,
      title: al.title,
      description: al.description,
      ip_address: al.ipAddress,
      severity: al.severity,
      metadata_json: al.metadata ? JSON.stringify(al.metadata) : null,
      created_at: toIsoTimestamp(al.timestamp),
    }));
    await syncTable('audit_logs', auditRows);

    // 30. whatsapp_gateway_config
    const gatewayConfig = getGatewayConfig();
    const gwRows = [{
      id: 'gw-cfg-01',
      provider: gatewayConfig.provider,
      device_number: gatewayConfig.deviceNumber,
      device_name: gatewayConfig.deviceName,
      api_key_or_token: gatewayConfig.apiKeyOrToken || null,
      anti_spam_delay_seconds: gatewayConfig.antiSpamDelaySeconds,
      daily_quota: gatewayConfig.dailyQuota,
      quota_used_today: gatewayConfig.quotaUsedToday || 0,
      is_connected: (gatewayConfig as any).status === 'connected',
      is_automation_active: gatewayConfig.isAutomationActive,
    }];
    await syncTable('whatsapp_gateway_config', gwRows);

    // 31. whatsapp_queued_messages
    const gatewayQueue = getQueuedMessages();
    const queueRows = gatewayQueue.map((q: any) => ({
      id: q.id,
      recipient_phone: q.recipientPhone,
      recipient_name: q.recipientName,
      recipient_role: q.recipientRole,
      trigger_type: q.triggerType,
      content: q.content,
      status: q.status,
      retry_count: q.retryCount,
      scheduled_at: toIsoTimestamp(q.scheduledAt),
      sent_at: q.sentAt ? toIsoTimestamp(q.sentAt) : null,
      delivered_at: q.deliveredAt ? toIsoTimestamp(q.deliveredAt) : null,
      related_id: null,
      created_at: toIsoTimestamp(q.createdAt),
    }));
    await syncTable('whatsapp_queued_messages', queueRows);

  } catch (globalErr: any) {
    console.error('Error saat eksekusi sinkronisasi:', globalErr);
  }

  const durationMs = Date.now() - startTime;
  const isOverallSuccess = tablesFailed.length === 0 && tablesSucceeded.length > 0;

  return {
    success: isOverallSuccess,
    message: isOverallSuccess
      ? `Berhasil menyinkronkan ${totalSynced} rekaman dari ${tablesSucceeded.length} tabel ke Supabase dalam ${durationMs}ms!`
      : `Sinkronisasi selesai dengan peringatan: ${tablesSucceeded.length} tabel sukses, ${tablesFailed.length} gagal.`,
    totalSynced,
    tablesSucceeded,
    tablesFailed,
    durationMs,
  };
}

/**
 * Tarik data terbaru dari Cloud Supabase ke browser (localStorage).
 */
export async function pullAllDataFromSupabase(): Promise<PullResult> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Kredensial Supabase belum terkonfigurasi.',
      totalPulled: 0,
      tablesPulled: [],
      errors: ['Kredensial tidak valid'],
    };
  }

  let totalPulled = 0;
  const tablesPulled: string[] = [];
  const errors: string[] = [];

  try {
    // 1. Tarik Submissions
    const { data: subData, error: subError } = await client.from('students_submissions').select('*');
    if (!subError && subData && subData.length > 0) {
      const localSubs: AssessmentSubmission[] = subData.map((row: any) => ({
        id: row.id,
        completedAt: row.created_at || new Date().toISOString(),
        profile: {
          childName: row.child_name,
          childAge: row.child_age,
          gradeLevel: row.grade_level || '',
          parentName: row.parent_name,
          parentPhone: row.parent_phone,
          tier: row.tier,
        },
        totalScore: row.total_score,
        scores: row.scores_json ? (typeof row.scores_json === 'string' ? JSON.parse(row.scores_json) : row.scores_json) : {},
        topStrengths: row.top_strengths_json ? (typeof row.top_strengths_json === 'string' ? JSON.parse(row.top_strengths_json) : row.top_strengths_json) : [],
        growthAreas: row.growth_areas_json ? (typeof row.growth_areas_json === 'string' ? JSON.parse(row.growth_areas_json) : row.growth_areas_json) : [],
        recommendedProgram: {
          title: row.recommended_program_name || 'Beekoding Foundation',
          description: row.recommended_program_desc || 'Program belajar koding terpersonalisasi.',
          whyFit: 'Kurikulum disesuaikan dengan dominasi profil bakat.',
        },
        answers: row.answers_json ? (typeof row.answers_json === 'string' ? JSON.parse(row.answers_json) : row.answers_json) : undefined,
        status: row.status,
        notes: row.notes || undefined,
        createdAt: row.created_at,
      }));
      saveSubmissions(localSubs);
      totalPulled += localSubs.length;
      tablesPulled.push('students_submissions');
    } else if (subError) {
      errors.push(`students_submissions: ${subError.message}`);
    }

    // 2. Tarik Inquiries
    const { data: inqData, error: inqError } = await client.from('consultation_inquiries').select('*');
    if (!inqError && inqData && inqData.length > 0) {
      const localInqs: ConsultationInquiry[] = inqData.map((row: any, idx: number) => ({
        id: String(row.id || `inq-${Date.now()}-${idx}`),
        type: (row.type === 'pendaftaran' || row.type === 'konsultasi') ? row.type : 'konsultasi',
        name: String(row.name || 'Pemohon Tanpa Nama'),
        email: String(row.email || '-'),
        phone: String(row.phone || '-'),
        role: String(row.role || 'Orang Tua'),
        program: String(row.program || 'Program Koding'),
        message: row.message ? String(row.message) : undefined,
        status: (['baru', 'dihubungi', 'jadwal_konsultasi', 'terdaftar', 'batal'].includes(row.status) ? row.status : 'baru') as InquiryStatus,
        adminNotes: row.admin_notes ? String(row.admin_notes) : (row.adminNotes ? String(row.adminNotes) : undefined),
        createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      }));
      saveInquiries(localInqs);
      totalPulled += localInqs.length;
      tablesPulled.push('consultation_inquiries');
    } else if (inqError) {
      errors.push(`consultation_inquiries: ${inqError.message}`);
    }

    // 3. Tarik Batches
    const { data: bData, error: bError } = await client.from('class_batches').select('*');
    if (!bError && bData && bData.length > 0) {
      const localBatches: ClassBatch[] = bData.map((row: any) => ({
        id: row.id,
        name: row.name,
        programType: row.level || 'Junior Explorer',
        tier: row.age_tier || 'junior',
        format: 'online',
        locationOrPlatform: 'Google Meet',
        meetUrl: row.meet_url || undefined,
        startDate: '2026-06-01',
        endDate: '2026-08-01',
        scheduleDays: row.schedule_day ? row.schedule_day.split(', ') : ['Sabtu', 'Minggu'],
        scheduleTime: row.schedule_time || '09:00 - 10:30 WIB',
        totalSessions: 12,
        maxCapacity: row.quota || 8,
        enrolledStudents: row.enrolled_students_json ? (typeof row.enrolled_students_json === 'string' ? JSON.parse(row.enrolled_students_json) : row.enrolled_students_json) : [],
        instructorName: row.instructor_name || 'Kak Febri Hasan',
        price: 1500000,
        status: row.status || 'upcoming',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      saveBatches(localBatches);
      totalPulled += localBatches.length;
      tablesPulled.push('class_batches');
    } else if (bError) {
      errors.push(`class_batches: ${bError.message}`);
    }

    // 4. Tarik Transactions
    const { data: txData, error: txError } = await client.from('financial_transactions').select('*');
    if (!txError && txData && txData.length > 0) {
      const localTxs: TransactionRecord[] = txData.map((row: any) => {
        const amount = Number(row.amount || 0);
        const discount = Number(row.discount_amount || 0);
        const totalPaid = Number(row.total_paid || 0);
        return {
          id: row.id,
          invoiceNumber: row.invoice_number || row.id,
          studentName: row.student_name,
          parentName: row.parent_name,
          parentPhone: row.parent_phone,
          batchName: row.batch_name || undefined,
          programName: row.program_name,
          items: [{ name: row.program_name, price: amount, qty: 1 }],
          subtotal: amount,
          discount: discount,
          totalAmount: amount - discount,
          paidAmount: totalPaid,
          remainingAmount: Math.max(0, amount - discount - totalPaid),
          paymentMethod: (row.payment_method as any) || 'bca',
          status: (row.payment_status as any) || 'paid',
          dueDate: row.due_date || new Date().toISOString().split('T')[0],
          paidAt: row.paid_at || undefined,
          transferProofUrl: row.receipt_url || undefined,
          notes: row.notes || undefined,
          createdAt: row.created_at || new Date().toISOString(),
          updatedAt: row.created_at || new Date().toISOString(),
        };
      });
      saveTransactions(localTxs);
      totalPulled += localTxs.length;
      tablesPulled.push('financial_transactions');
    } else if (txError) {
      errors.push(`financial_transactions: ${txError.message}`);
    }

    // 5. Tarik Attendance
    const { data: attData, error: attError } = await client.from('class_attendance').select('*');
    if (!attError && attData && attData.length > 0) {
      const localAtts: SessionAttendanceRecord[] = attData.map((row: any) => ({
        id: row.id,
        batchId: row.batch_id,
        batchName: row.batch_name || '',
        tier: 'junior',
        sessionNumber: row.session_number || 1,
        sessionTopic: row.topic || '',
        date: row.session_date || new Date().toISOString().split('T')[0],
        instructorName: row.instructor_name || '',
        students: row.students_attendance_json ? (typeof row.students_attendance_json === 'string' ? JSON.parse(row.students_attendance_json) : row.students_attendance_json) : [],
        classNotes: row.notes || undefined,
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.created_at || new Date().toISOString(),
      }));
      saveAttendanceRecords(localAtts);
      totalPulled += localAtts.length;
      tablesPulled.push('class_attendance');
    } else if (attError) {
      errors.push(`class_attendance: ${attError.message}`);
    }

  } catch (err: any) {
    errors.push(err?.message || 'Gagal menarik data');
  }

  return {
    success: errors.length === 0,
    message: errors.length === 0
      ? `Berhasil menarik ${totalPulled} data dari Supabase!`
      : `Tarik data selesai dengan kendala pada: ${errors.join(', ')}`,
    totalPulled,
    tablesPulled,
    errors,
  };
}

// ============================================================================
// PRIORITY MODULES DIRECT CLOUD HYDRATION & REALTIME (OPSI 1)
// ============================================================================

export async function fetchSubmissionsFromCloud(): Promise<AssessmentSubmission[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;
  try {
    let result = await client.from('students_submissions').select('*').order('created_at', { ascending: false });
    if (result.error) {
      console.warn('fetchSubmissionsFromCloud with order failed, trying plain select:', result.error);
      result = await client.from('students_submissions').select('*');
    }
    const { data, error } = result;
    if (error || !data) {
      console.warn('fetchSubmissionsFromCloud error:', error);
      return null;
    }
    const mapped: AssessmentSubmission[] = data.map((row: any, idx: number) => ({
      id: String(row.id || `sub-${Date.now()}-${idx}`),
      completedAt: row.created_at || row.completedAt || new Date().toISOString(),
      profile: {
        childName: String(row.child_name || 'Siswa Beekoding'),
        childAge: Number(row.child_age) || 8,
        gradeLevel: String(row.grade_level || 'SD'),
        parentName: String(row.parent_name || 'Orang Tua'),
        parentPhone: String(row.parent_phone || '-'),
        tier: (['junior', 'middle', 'senior'].includes(row.tier) ? row.tier : 'junior') as any,
      },
      totalScore: Number(row.total_score) || 0,
      scores: row.scores_json ? (typeof row.scores_json === 'string' ? JSON.parse(row.scores_json) : row.scores_json) : {},
      topStrengths: row.top_strengths_json ? (typeof row.top_strengths_json === 'string' ? JSON.parse(row.top_strengths_json) : row.top_strengths_json) : [],
      growthAreas: row.growth_areas_json ? (typeof row.growth_areas_json === 'string' ? JSON.parse(row.growth_areas_json) : row.growth_areas_json) : [],
      recommendedProgram: {
        title: String(row.recommended_program_name || 'Beekoding Foundation'),
        description: String(row.recommended_program_desc || 'Program belajar koding terpersonalisasi.'),
        whyFit: 'Kurikulum disesuaikan dengan dominasi profil bakat anak.',
      },
      answers: row.answers_json ? (typeof row.answers_json === 'string' ? JSON.parse(row.answers_json) : row.answers_json) : undefined,
      status: (['baru', 'dihubungi', 'terdaftar', 'selesai'].includes(row.status) ? row.status : 'baru') as any,
      notes: row.notes || undefined,
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
    }));

    if (mapped.length > 0) {
      saveSubmissions(mapped);
      emitStorageUpdate('submissions');
    }
    return mapped;
  } catch (err) {
    console.warn('fetchSubmissionsFromCloud exception:', err);
    return null;
  }
}

export async function fetchInquiriesFromCloud(): Promise<ConsultationInquiry[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;
  try {
    let result = await client.from('consultation_inquiries').select('*').order('created_at', { ascending: false });
    if (result.error) {
      console.warn('fetchInquiriesFromCloud with order failed, falling back to unordered select:', result.error);
      result = await client.from('consultation_inquiries').select('*');
    }
    const { data, error } = result;
    if (error || !data) {
      console.warn('fetchInquiriesFromCloud error:', error);
      return null;
    }
    const mapped: ConsultationInquiry[] = data.map((row: any, idx: number) => ({
      id: String(row.id || `inq-${Date.now()}-${idx}`),
      type: (row.type === 'pendaftaran' || row.type === 'konsultasi') ? row.type : 'konsultasi',
      name: String(row.name || 'Pemohon Tanpa Nama'),
      email: String(row.email || '-'),
      phone: String(row.phone || '-'),
      role: String(row.role || 'Orang Tua'),
      program: String(row.program || 'Program Koding'),
      message: row.message ? String(row.message) : undefined,
      status: (['baru', 'dihubungi', 'jadwal_konsultasi', 'terdaftar', 'batal'].includes(row.status) ? row.status : 'baru') as InquiryStatus,
      adminNotes: row.admin_notes ? String(row.admin_notes) : (row.adminNotes ? String(row.adminNotes) : undefined),
      createdAt: row.created_at || row.createdAt || new Date().toISOString(),
      updatedAt: row.updated_at || row.updatedAt || new Date().toISOString(),
    }));

    // Jangan timpa data lokal jika Supabase mengembalikan array kosong akibat RLS
    if (mapped.length > 0) {
      saveInquiries(mapped);
      emitStorageUpdate('inquiries');
    }
    return mapped;
  } catch (err) {
    console.warn('fetchInquiriesFromCloud exception:', err);
    return null;
  }
}

export async function fetchBatchesFromCloud(): Promise<ClassBatch[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;
  try {
    const { data, error } = await client.from('class_batches').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      console.warn('fetchBatchesFromCloud error:', error);
      return null;
    }
    const mapped: ClassBatch[] = data.map((row: any) => ({
      id: row.id,
      name: row.name,
      programType: row.level || 'Junior Explorer',
      tier: row.age_tier || 'junior',
      format: 'online',
      locationOrPlatform: 'Google Meet',
      meetUrl: row.meet_url || undefined,
      startDate: '2026-06-01',
      endDate: '2026-08-01',
      scheduleDays: row.schedule_day ? row.schedule_day.split(', ') : ['Sabtu', 'Minggu'],
      scheduleTime: row.schedule_time || '09:00 - 10:30 WIB',
      totalSessions: 12,
      maxCapacity: row.quota || 8,
      enrolledStudents: row.enrolled_students_json ? (typeof row.enrolled_students_json === 'string' ? JSON.parse(row.enrolled_students_json) : row.enrolled_students_json) : [],
      instructorName: row.instructor_name || 'Kak Febri Hasan',
      price: 1500000,
      status: row.status || 'upcoming',
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.created_at || new Date().toISOString(),
    }));
    saveBatches(mapped);
    emitStorageUpdate('batches');
    return mapped;
  } catch (err) {
    console.warn('fetchBatchesFromCloud exception:', err);
    return null;
  }
}

export async function fetchTransactionsFromCloud(): Promise<TransactionRecord[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;
  try {
    const { data, error } = await client.from('financial_transactions').select('*').order('created_at', { ascending: false });
    if (error || !data) {
      console.warn('fetchTransactionsFromCloud error:', error);
      return null;
    }
    const mapped: TransactionRecord[] = data.map((row: any) => {
      const amount = Number(row.amount || 0);
      const discount = Number(row.discount_amount || 0);
      const totalPaid = Number(row.total_paid || 0);
      return {
        id: row.id,
        invoiceNumber: row.invoice_number || row.id,
        studentName: row.student_name,
        parentName: row.parent_name,
        parentPhone: row.parent_phone,
        batchName: row.batch_name || undefined,
        programName: row.program_name,
        items: [{ name: row.program_name, price: amount, qty: 1 }],
        subtotal: amount,
        discount: discount,
        totalAmount: amount - discount,
        paidAmount: totalPaid,
        remainingAmount: Math.max(0, amount - discount - totalPaid),
        paymentMethod: (row.payment_method as any) || 'bca',
        status: (row.payment_status as any) || 'paid',
        dueDate: row.due_date || new Date().toISOString().split('T')[0],
        paidAt: row.paid_at || undefined,
        transferProofUrl: row.receipt_url || undefined,
        notes: row.notes || undefined,
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.created_at || new Date().toISOString(),
      };
    });
    saveTransactions(mapped);
    emitStorageUpdate('transactions');
    return mapped;
  } catch (err) {
    console.warn('fetchTransactionsFromCloud exception:', err);
    return null;
  }
}

export async function fetchAttendanceFromCloud(): Promise<SessionAttendanceRecord[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;
  try {
    const { data, error } = await client.from('class_attendance').select('*').order('session_date', { ascending: false });
    if (error || !data) {
      console.warn('fetchAttendanceFromCloud error:', error);
      return null;
    }
    const mapped: SessionAttendanceRecord[] = data.map((row: any) => ({
      id: row.id,
      batchId: row.batch_id,
      batchName: row.batch_name || '',
      tier: 'junior',
      sessionNumber: row.session_number || 1,
      sessionTopic: row.topic || '',
      date: row.session_date || new Date().toISOString().split('T')[0],
      instructorName: row.instructor_name || '',
      students: row.students_attendance_json ? (typeof row.students_attendance_json === 'string' ? JSON.parse(row.students_attendance_json) : row.students_attendance_json) : [],
      classNotes: row.notes || undefined,
      createdAt: row.created_at || new Date().toISOString(),
      updatedAt: row.created_at || new Date().toISOString(),
    }));
    saveAttendanceRecords(mapped);
    emitStorageUpdate('attendance');
    return mapped;
  } catch (err) {
    console.warn('fetchAttendanceFromCloud exception:', err);
    return null;
  }
}

export async function hydratePriorityModulesFromCloud(): Promise<{ success: boolean; tables: string[] }> {
  if (!isSupabaseConfigured()) return { success: false, tables: [] };
  const [subs, inqs, batches, txs, att] = await Promise.allSettled([
    fetchSubmissionsFromCloud(),
    fetchInquiriesFromCloud(),
    fetchBatchesFromCloud(),
    fetchTransactionsFromCloud(),
    fetchAttendanceFromCloud(),
  ]);
  const tables: string[] = [];
  if (subs.status === 'fulfilled' && subs.value) tables.push('students_submissions');
  if (inqs.status === 'fulfilled' && inqs.value) tables.push('consultation_inquiries');
  if (batches.status === 'fulfilled' && batches.value) tables.push('class_batches');
  if (txs.status === 'fulfilled' && txs.value) tables.push('financial_transactions');
  if (att.status === 'fulfilled' && att.value) tables.push('class_attendance');
  return { success: tables.length > 0, tables };
}

export function initPriorityRealtimeSync(onUpdate?: (table: string) => void): () => void {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) {
    return () => {};
  }

  const channel = client
    .channel('priority_modules_realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'students_submissions' }, async () => {
      await fetchSubmissionsFromCloud();
      onUpdate?.('students_submissions');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_inquiries' }, async () => {
      await fetchInquiriesFromCloud();
      onUpdate?.('consultation_inquiries');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'class_batches' }, async () => {
      await fetchBatchesFromCloud();
      onUpdate?.('class_batches');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'financial_transactions' }, async () => {
      await fetchTransactionsFromCloud();
      onUpdate?.('financial_transactions');
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'class_attendance' }, async () => {
      await fetchAttendanceFromCloud();
      onUpdate?.('class_attendance');
    })
    .subscribe();

  return () => {
    client.removeChannel(channel);
  };
}

// ============================================================================
// REAL-TIME ASYNCHRONOUS PUSH HELPERS (DUAL-WRITE & OFFLINE-SAFE)
// ============================================================================

export async function pushSubmissionToSupabase(s: AssessmentSubmission): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('students_submissions').upsert({
      id: s.id,
      child_name: s.profile?.childName || 'Siswa',
      child_age: s.profile?.childAge || 7,
      grade_level: s.profile?.gradeLevel || null,
      parent_name: s.profile?.parentName || 'Orang Tua',
      parent_phone: s.profile?.parentPhone || '',
      parent_email: null,
      tier: s.profile?.tier || 'junior',
      total_score: s.totalScore || 0,
      scores_json: JSON.stringify(s.scores || {}),
      top_strengths_json: JSON.stringify(s.topStrengths || []),
      growth_areas_json: JSON.stringify(s.growthAreas || []),
      recommended_program_name: s.recommendedProgram?.title || '',
      recommended_program_level: '',
      recommended_program_desc: s.recommendedProgram?.description || '',
      answers_json: s.answers ? JSON.stringify(s.answers) : null,
      status: s.status || 'baru',
      notes: s.notes || null,
      created_at: s.createdAt || new Date().toISOString(),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushSubmissionToSupabase failed', err);
  }
}

export async function pushInquiryToSupabase(iq: ConsultationInquiry): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('consultation_inquiries').upsert({
      id: iq.id,
      type: iq.type,
      name: iq.name,
      email: iq.email,
      phone: iq.phone,
      role: iq.role,
      program: iq.program,
      message: iq.message || null,
      status: iq.status,
      admin_notes: iq.adminNotes || null,
      created_at: toIsoTimestamp(iq.createdAt),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushInquiryToSupabase failed', err);
  }
}

export async function pushBatchToSupabase(b: ClassBatch): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('class_batches').upsert({
      id: b.id,
      name: b.name,
      level: b.programType,
      age_tier: b.tier,
      schedule_day: b.scheduleDays.join(', '),
      schedule_time: b.scheduleTime,
      instructor_id: null,
      instructor_name: b.instructorName,
      quota: b.maxCapacity,
      enrolled_count: b.enrolledStudents.length,
      status: b.status,
      meet_url: b.meetUrl || null,
      session_dates_json: JSON.stringify([]),
      enrolled_students_json: JSON.stringify(b.enrolledStudents),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushBatchToSupabase failed', err);
  }
}

export async function pushTransactionToSupabase(t: TransactionRecord): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('financial_transactions').upsert({
      id: t.id,
      invoice_number: t.invoiceNumber || t.id,
      student_name: t.studentName,
      parent_name: t.parentName,
      parent_phone: t.parentPhone,
      batch_name: t.batchName || null,
      program_name: t.programName,
      amount: t.totalAmount,
      discount_amount: t.discount,
      total_paid: t.paidAmount,
      payment_method: t.paymentMethod,
      payment_status: t.status,
      due_date: toIsoDate(t.dueDate),
      paid_at: t.paidAt ? toIsoTimestamp(t.paidAt) : null,
      receipt_url: t.transferProofUrl || null,
      notes: t.notes || null,
      created_at: toIsoTimestamp(t.createdAt),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushTransactionToSupabase failed', err);
  }
}

export async function pushEventToSupabase(ev: CodingEvent): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('coding_events').upsert({
      id: ev.id,
      title: ev.title,
      category: ev.eventType,
      age_group: ev.tier,
      event_date: toIsoDate(ev.date),
      event_time: `${ev.startTime} - ${ev.endTime}`,
      location_type: ev.locationType,
      location_or_link: ev.meetingUrl || ev.locationDetail || null,
      instructor_name: ev.instructorName,
      quota: ev.capacity,
      registered_count: ev.registrations ? ev.registrations.length : 0,
      price: ev.price,
      is_free: ev.price === 0,
      description: ev.description || null,
      status: ev.status,
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushEventToSupabase failed', err);
  }
}

export async function pushUserToSupabase(u: SystemUser): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    let secureHash = u.passwordHash;
    if (secureHash && secureHash.length !== 64) {
      secureHash = await hashPasswordSha256(secureHash);
    }
    await client.from('system_users').upsert({
      id: u.id,
      name: u.name,
      email: u.email.toLowerCase(),
      role: u.role,
      role_title: u.roleTitle,
      phone: u.phone || null,
      avatar: u.avatar || null,
      institution: u.institution || null,
      bio: u.bio || null,
      status: u.status,
      allowed_tabs_json: JSON.stringify(u.allowedTabs),
      password_hash: secureHash,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });
  } catch (err) {
    console.warn('Silent fallback: pushUserToSupabase failed', err);
  }
}

export async function pushSettingsToSupabase(p: AdminUser): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('system_settings').upsert({
      id: 'setting-01',
      institution_name: p.institution || 'Beekoding Academy Indonesia',
      tagline: p.bio || 'Platform Belajar Koding Berbasis Bakat Anak',
      email: p.email || 'halo@beekoding.com',
      phone: p.phone || '+62 853-1131-7127',
      address: 'Gedung Beekoding EduHub Lt. 3, Jakarta Selatan',
      logo_url: p.avatar || '/bee-mascot.png',
      website_url: 'https://beekoding.com',
      currency: 'IDR',
      notifications_enabled: p.notificationsEnabled ?? true,
      lead_alerts_enabled: p.leadAlertsEnabled ?? true,
      sound_enabled: p.soundEnabled ?? true,
      two_factor_enabled: p.twoFactorEnabled ?? false,
      system_config_json: JSON.stringify({ theme: 'dark', autoReminder: true }),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushSettingsToSupabase failed', err);
  }
}

export async function pushAttendanceToSupabase(at: SessionAttendanceRecord): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    const rawBatchId = at.batchId || 'batch-2026-01';
    const normalizedBatchId = rawBatchId.replace(/^(batch-\d{4}-)0+(\d{2})$/, '$1$2');
    await client.from('class_attendance').upsert({
      id: at.id,
      batch_id: normalizedBatchId,
      batch_name: at.batchName,
      session_number: at.sessionNumber,
      session_date: toIsoDate(at.date),
      instructor_id: null,
      instructor_name: at.instructorName,
      topic: at.sessionTopic,
      notes: at.classNotes || null,
      students_attendance_json: JSON.stringify(at.students),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushAttendanceToSupabase failed', err);
  }
}

export async function pushReportToSupabase(rp: StudentAcademicReport): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    const rawBatchId = rp.batchId || 'batch-2026-01';
    const normalizedBatchId = rawBatchId.replace(/^(batch-\d{4}-)0*(\d+)$/, (_match, prefix, numStr) => `${prefix}${numStr.padStart(2, '0')}`);
    const scores = typeof rp.scores === 'string' ? JSON.parse(rp.scores) : (rp.scores || {});
    await client.from('academic_reports').upsert({
      id: String(rp.id),
      student_id: String(rp.studentId || 'stud-001'),
      student_name: String(rp.studentName || 'Siswa'),
      batch_id: normalizedBatchId,
      batch_name: String(rp.batchName || 'Kelas Koding'),
      level: String(rp.tier || 'junior'),
      instructor_name: String(rp.instructorName || 'Kak Febri Hasan'),
      period: String(rp.reportPeriod || '2026'),
      attendance_rate: Math.round(Number(rp.attendanceRate) || 100),
      logic_score: Math.round(Number(scores.computationalThinking) || 85),
      creativity_score: Math.round(Number(scores.creativityDesign) || 85),
      problem_solving_score: Math.round(Number(scores.problemSolving) || 85),
      presentation_score: Math.round(Number(scores.teamworkAttitude) || 85),
      overall_grade: String(rp.gradeLetter || 'A').slice(0, 5),
      teacher_notes: rp.instructorNotes || null,
      project_title: rp.capstoneProjectTitle || null,
      project_url: null,
      report_file_url: null,
      created_at: toIsoTimestamp(rp.createdAt),
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushReportToSupabase failed', err);
  }
}

export async function pushAnnouncementToSupabase(an: ClassAnnouncement): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('class_announcements').upsert({
      id: an.id,
      title: an.title,
      target_audience: an.audience,
      target_batch_id: an.batchId || null,
      content: an.content,
      channels_json: JSON.stringify(['whatsapp']),
      send_status: an.status,
      sent_at: an.publishedAt || null,
      created_by: an.authorName || null,
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushAnnouncementToSupabase failed', err);
  }
}

export async function pushAuditLogToSupabase(al: AuditLogEntry): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('audit_logs').upsert({
      id: al.id,
      user_id: al.actorName,
      user_name: al.actorName,
      user_role: al.actorRole || null,
      module: al.module,
      action_type: al.actionType,
      title: al.title,
      description: al.description,
      ip_address: al.ipAddress,
      severity: al.severity,
      metadata_json: al.metadata ? JSON.stringify(al.metadata) : null,
      created_at: al.timestamp,
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushAuditLogToSupabase failed', err);
  }
}

export async function pushGatewayConfigToSupabase(cfg: WhatsAppGatewayConfig): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('whatsapp_gateway_config').upsert({
      id: 'gw-cfg-01',
      provider: cfg.provider,
      device_number: cfg.deviceNumber,
      device_name: cfg.deviceName,
      api_key_or_token: cfg.apiKeyOrToken || null,
      anti_spam_delay_seconds: cfg.antiSpamDelaySeconds,
      daily_quota: cfg.dailyQuota,
      quota_used_today: cfg.quotaUsedToday || 0,
      is_connected: (cfg as any).status === 'connected',
      is_automation_active: cfg.isAutomationActive,
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushGatewayConfigToSupabase failed', err);
  }
}

export async function pushQueuedMessageToSupabase(q: QueuedWhatsAppMessage): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('whatsapp_queued_messages').upsert({
      id: q.id,
      recipient_phone: q.recipientPhone,
      recipient_name: q.recipientName,
      recipient_role: q.recipientRole,
      trigger_type: q.triggerType,
      content: q.content,
      status: q.status,
      retry_count: q.retryCount,
      scheduled_at: q.scheduledAt,
      sent_at: q.sentAt || null,
      delivered_at: q.deliveredAt || null,
      related_id: null,
      created_at: q.createdAt,
    }, { onConflict: 'id' });
  } catch (err) {
    console.warn('Silent fallback: pushQueuedMessageToSupabase failed', err);
  }
}

// ============================================================================
// PRIORITY MODULES CLOUD DELETE HELPERS
// ============================================================================

export async function deleteSubmissionFromSupabase(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('students_submissions').delete().eq('id', id);
  } catch (err) {
    console.warn('Silent fallback: deleteSubmissionFromSupabase failed', err);
  }
}

export async function deleteInquiryFromSupabase(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('consultation_inquiries').delete().eq('id', id);
  } catch (err) {
    console.warn('Silent fallback: deleteInquiryFromSupabase failed', err);
  }
}

export async function deleteBatchFromSupabase(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('class_batches').delete().eq('id', id);
  } catch (err) {
    console.warn('Silent fallback: deleteBatchFromSupabase failed', err);
  }
}

export async function deleteTransactionFromSupabase(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('financial_transactions').delete().eq('id', id);
  } catch (err) {
    console.warn('Silent fallback: deleteTransactionFromSupabase failed', err);
  }
}

export async function deleteAttendanceFromSupabase(id: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;
  try {
    await client.from('class_attendance').delete().eq('id', id);
  } catch (err) {
    console.warn('Silent fallback: deleteAttendanceFromSupabase failed', err);
  }
}

