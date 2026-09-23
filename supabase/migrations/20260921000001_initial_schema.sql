-- =============================================================================
-- BEEKODING EDUCATION PLATFORM - POSTGRESQL & SUPABASE SCHEMA (DDL)
-- Dialect: Native PostgreSQL 12+, 13+, 14+, 15+, 16+ / Supabase / Neon
-- Version: 2.0.0 (Comprehensive 33 Entities + Analytical Views)
-- Compatible with: MySQL 8.0+, MariaDB 10.5+, PostgreSQL 14+, Supabase, SQLite
-- =============================================================================

-- Pastikan database tersedia
-- CREATE DATABASE IF NOT EXISTS beekoding_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE beekoding_db;

-- =============================================================================
-- 1. PENGATURAN SISTEM & AUTENTIKASI (SYSTEM & AUTH)
-- =============================================================================

-- Tabel Profil Lembaga & Pengaturan Global
CREATE TABLE IF NOT EXISTS system_settings (
    id VARCHAR(50) PRIMARY KEY,
    institution_name VARCHAR(150) NOT NULL DEFAULT 'BeeKoding Academy',
    tagline VARCHAR(255) DEFAULT 'Coding for Kids & Teens: Belajar Koding Berbasis Bakat',
    email VARCHAR(100) NOT NULL DEFAULT 'halo@beekoding.com',
    phone VARCHAR(30) NOT NULL DEFAULT '+62 853-1131-7127',
    address TEXT,
    logo_url TEXT,
    website_url VARCHAR(255) DEFAULT 'https://beekoding.com',
    currency VARCHAR(10) DEFAULT 'IDR',
    academic_year VARCHAR(20) DEFAULT '2026/2027',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    lead_alerts_enabled BOOLEAN DEFAULT TRUE,
    sound_enabled BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    system_config_json TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Pengguna Sistem & Hak Akses (RBAC: Administrator, Instruktur, Konselor, Lead)
CREATE TABLE IF NOT EXISTS system_users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'administrator', -- administrator, instructor, counselor, academic_lead, custom
    role_title VARCHAR(100) NOT NULL DEFAULT 'Administrator Sistem',
    phone VARCHAR(30),
    avatar TEXT,
    institution VARCHAR(150) DEFAULT 'BeeKoding Tech Academy',
    bio TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active', -- active, inactive
    allowed_tabs_json TEXT, -- Array ID tab menu yang diizinkan untuk diakses
    password_hash VARCHAR(255) NOT NULL,
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Log Jejak Audit Keamanan (Security Audit Trail)
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50),
    user_name VARCHAR(120),
    user_role VARCHAR(50),
    module VARCHAR(50) NOT NULL, -- auth, students, inquiries, events, counseling, batches, curriculum, dll.
    action_type VARCHAR(30) NOT NULL, -- login, logout, create, update, delete, export, backup, restore, approve, download
    title VARCHAR(200) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45) DEFAULT '127.0.0.1',
    severity VARCHAR(20) DEFAULT 'info', -- info, success, warning, danger
    metadata_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 2. PENERIMAAN SISWA & ASESMEN BAKAT (STUDENTS & INQUIRIES)
-- =============================================================================

-- Master Bank Soal Asesmen Bakat (8 Pilar Kecerdasan Koding)
CREATE TABLE IF NOT EXISTS question_bank (
    id VARCHAR(50) PRIMARY KEY,
    tier VARCHAR(20) NOT NULL, -- junior (7-9), middle (10-12), teens (13-17)
    category VARCHAR(50) NOT NULL, -- logical, numerical, spatial, pattern, creativity, problem_solving, language, persistence
    section_number INT NOT NULL DEFAULT 1,
    question_number INT NOT NULL DEFAULT 1,
    prompt TEXT NOT NULL,
    visual_hint VARCHAR(100),
    options_json TEXT NOT NULL, -- Array 4 pilihan jawaban [{id, text, score, explanation}]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Data Pendaftaran & Submisi Hasil Asesmen Bakat Siswa
CREATE TABLE IF NOT EXISTS students_submissions (
    id VARCHAR(50) PRIMARY KEY,
    child_name VARCHAR(120) NOT NULL,
    child_age INT NOT NULL,
    grade_level VARCHAR(50),
    parent_name VARCHAR(120) NOT NULL,
    parent_phone VARCHAR(30) NOT NULL,
    parent_email VARCHAR(100),
    tier VARCHAR(20) NOT NULL, -- junior, middle, teens
    total_score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    scores_json TEXT NOT NULL, -- {logical, numerical, spatial, pattern, creativity, problem_solving, language, persistence}
    top_strengths_json TEXT,
    growth_areas_json TEXT,
    recommended_program_name VARCHAR(150),
    recommended_program_level VARCHAR(50),
    recommended_program_desc TEXT,
    answers_json TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'baru', -- baru, dihubungi, terdaftar, selesai
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Formulir Prospek Leads Konsultasi & Registrasi
CREATE TABLE IF NOT EXISTS consultation_inquiries (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(30) NOT NULL DEFAULT 'konsultasi', -- konsultasi, pendaftaran
    name VARCHAR(120) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    role VARCHAR(50) DEFAULT 'Orang Tua',
    program VARCHAR(100) NOT NULL,
    message TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'baru', -- baru, dihubungi, jadwal_konsultasi, terdaftar, batal
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Event & Trial Class Koding
CREATE TABLE IF NOT EXISTS coding_events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'trial_class', -- trial_class, workshop, webinar, competition
    age_group VARCHAR(50) NOT NULL DEFAULT '7 - 12 Tahun',
    event_date DATE NOT NULL,
    event_time VARCHAR(50) NOT NULL,
    location_type VARCHAR(20) NOT NULL DEFAULT 'online', -- online, offline
    location_or_link TEXT,
    instructor_name VARCHAR(120),
    quota INT NOT NULL DEFAULT 20,
    registered_count INT NOT NULL DEFAULT 0,
    price DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    is_free BOOLEAN DEFAULT TRUE,
    description TEXT,
    tags_json TEXT,
    participants_json TEXT, -- Array data pendaftar event [{name, phone, email, registeredAt, status}]
    status VARCHAR(20) NOT NULL DEFAULT 'open', -- open, closed, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Konseling & Sesi Bimbingan 1-on-1 (Orang Tua & Siswa)
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
    status VARCHAR(30) NOT NULL DEFAULT 'scheduled', -- scheduled, completed, rescheduled, cancelled
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 3. AKADEMIK, KELAS & PENGAJARAN (ACADEMIC & TEACHING)
-- =============================================================================

-- Master Tim Instruktur Pengajar
CREATE TABLE IF NOT EXISTS instructors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(30),
    avatar TEXT,
    bio TEXT,
    specialization VARCHAR(150) NOT NULL, -- Scratch, Web Development, Python AI, Roblox
    skills_json TEXT, -- Array keahlian ['Scratch', 'Python', 'Game Dev']
    hourly_rate DECIMAL(12,2) NOT NULL DEFAULT 75000.00,
    active_batches_count INT DEFAULT 0,
    total_teaching_hours INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 4.90,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, on_leave
    joined_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Master Jadwal & Batch Kelas Koding
CREATE TABLE IF NOT EXISTS class_batches (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    level VARCHAR(50) DEFAULT 'Junior Explorer', -- junior, middle, teens, advanced
    age_tier VARCHAR(30) DEFAULT 'junior',
    schedule_day VARCHAR(50) DEFAULT 'Sabtu, Minggu', -- Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu
    schedule_time VARCHAR(50) DEFAULT '09:00 - 10:30 WIB', -- 09:00 - 10:30 WIB
    instructor_id VARCHAR(50),
    instructor_name VARCHAR(120) DEFAULT 'Kak Febri Hasan',
    quota INT NOT NULL DEFAULT 8,
    enrolled_count INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'ongoing', -- upcoming, ongoing, completed, full
    meet_url TEXT,
    session_dates_json TEXT, -- Array tanggal pelaksanaan 12 sesi
    enrolled_students_json TEXT, -- Array siswa terdaftar [{id, studentName, parentName, parentPhone, enrolledAt}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_batch_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

-- Presensi & Log Absensi Kelas Siswa
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
    students_attendance_json TEXT NOT NULL, -- [{studentId, studentName, status: 'hadir'|'izin'|'sakit'|'alpa', note}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attendance_batch FOREIGN KEY (batch_id) REFERENCES class_batches(id) ON DELETE CASCADE
);

-- Master Silabus Kurikulum (12 Sesi Per Jenjang)
CREATE TABLE IF NOT EXISTS curriculum_modules (
    id VARCHAR(50) PRIMARY KEY,
    level VARCHAR(50) NOT NULL, -- junior, middle, teens
    level_title VARCHAR(100) NOT NULL,
    target_age VARCHAR(50) NOT NULL,
    duration_info VARCHAR(100) DEFAULT '12 Sesi (3 Bulan)',
    description TEXT,
    prerequisites VARCHAR(255),
    competencies_json TEXT,
    sessions_plan_json TEXT NOT NULL, -- Array 12 sesi detail [{sessionNumber, title, topic, objectives, tools, assignment}]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modul Bahan Ajar, Slide & Starter Code Siswa
CREATE TABLE IF NOT EXISTS learning_resources (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- worksheet, starter_code, slides, guide, solution
    level VARCHAR(50) NOT NULL, -- junior, middle, teens, all
    file_type VARCHAR(20) NOT NULL, -- pdf, zip, sb3, py, html
    file_size VARCHAR(20),
    download_url TEXT NOT NULL,
    description TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    tags_json TEXT,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rapor Belajar Siswa (Academic Competency Report)
CREATE TABLE IF NOT EXISTS academic_reports (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    batch_id VARCHAR(50) NOT NULL,
    batch_name VARCHAR(150) NOT NULL,
    level VARCHAR(50) NOT NULL,
    instructor_name VARCHAR(120) NOT NULL,
    period VARCHAR(50) NOT NULL, -- misal: 'Maret 2026'
    attendance_rate INT NOT NULL DEFAULT 100,
    logic_score INT NOT NULL DEFAULT 85,
    creativity_score INT NOT NULL DEFAULT 88,
    problem_solving_score INT NOT NULL DEFAULT 84,
    presentation_score INT NOT NULL DEFAULT 90,
    overall_grade VARCHAR(5) NOT NULL DEFAULT 'A', -- A+, A, B+, B, C
    teacher_notes TEXT,
    project_title VARCHAR(200),
    project_url TEXT,
    report_file_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_report_batch FOREIGN KEY (batch_id) REFERENCES class_batches(id) ON DELETE CASCADE
);

-- =============================================================================
-- 4. GAMIFIKASI, TANTANGAN & PRESTASI (GAMIFICATION & ACHIEVEMENTS)
-- =============================================================================

-- Master Tantangan Koding Mingguan (Quests)
CREATE TABLE IF NOT EXISTS coding_quests (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- logic, game, animation, algorithm, web
    level VARCHAR(50) NOT NULL, -- junior, middle, teens
    xp_reward INT NOT NULL DEFAULT 250,
    badge_reward VARCHAR(100),
    deadline DATE,
    description TEXT NOT NULL,
    requirements_json TEXT, -- Array kriteria tugas
    starter_code_url TEXT,
    submissions_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submisi Tugas Tantangan / Quest Siswa
CREATE TABLE IF NOT EXISTS quest_submissions (
    id VARCHAR(50) PRIMARY KEY,
    quest_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    project_url TEXT NOT NULL,
    notes TEXT,
    xp_awarded INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    mentor_feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quest_sub_quest FOREIGN KEY (quest_id) REFERENCES coding_quests(id) ON DELETE CASCADE
);

-- Master Kuis & Evaluasi Belajar Berkala
CREATE TABLE IF NOT EXISTS quiz_exams (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- scratch, html_css, python, logic
    level VARCHAR(50) NOT NULL,
    target_age VARCHAR(50),
    duration_minutes INT DEFAULT 20,
    passing_score INT DEFAULT 70,
    xp_reward INT DEFAULT 150,
    total_questions INT DEFAULT 5,
    questions_json TEXT NOT NULL, -- Array soal kuis pilihan ganda
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Riwayat Pengerjaan Kuis Siswa
CREATE TABLE IF NOT EXISTS student_quiz_attempts (
    id VARCHAR(50) PRIMARY KEY,
    quiz_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    score INT NOT NULL,
    passed BOOLEAN NOT NULL,
    xp_earned INT DEFAULT 0,
    answers_json TEXT,
    time_spent_seconds INT,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES quiz_exams(id) ON DELETE CASCADE
);

-- Master Lencana Penghargaan Siswa (Achievement Badges)
CREATE TABLE IF NOT EXISTS achievement_badges (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    xp_value INT DEFAULT 100,
    category VARCHAR(50) DEFAULT 'general',
    criteria_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profil Gamifikasi Siswa (Bee-XP, Level, Streak)
CREATE TABLE IF NOT EXISTS student_gamification (
    student_id VARCHAR(50) PRIMARY KEY,
    student_name VARCHAR(120) NOT NULL,
    total_xp INT NOT NULL DEFAULT 0,
    current_level INT NOT NULL DEFAULT 1,
    streak_days INT NOT NULL DEFAULT 0,
    quests_completed INT NOT NULL DEFAULT 0,
    badges_earned_json TEXT, -- Array badge ID yang diperoleh
    last_activity_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Piagam Sertifikat Kelulusan Siswa
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
    status VARCHAR(20) DEFAULT 'valid', -- valid, revoked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Galeri Karya & Portofolio Siswa (Showcase)
CREATE TABLE IF NOT EXISTS student_projects (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50),
    student_name VARCHAR(120) NOT NULL,
    age INT,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL, -- game, website, animation, app
    level VARCHAR(50) NOT NULL,
    thumbnail_url TEXT,
    project_url TEXT NOT NULL,
    description TEXT,
    tags_json TEXT,
    likes_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    parent_reviews_json TEXT, -- Array ulasan orang tua
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimoni Resmi Orang Tua / Wali Murid
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

-- =============================================================================
-- 5. KEUANGAN, VOUCHER, PAYROLL & REFERRAL (FINANCE & REVENUE)
-- =============================================================================

-- Tabel Transaksi & Tagihan SPP Siswa (Invoices)
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
    payment_method VARCHAR(50) DEFAULT 'Transfer Bank BCA', -- Transfer Bank, QRIS, Virtual Account, Kartu
    payment_status VARCHAR(30) NOT NULL DEFAULT 'unpaid', -- paid, unpaid, pending, overdue, cancelled
    due_date DATE NOT NULL,
    paid_at TIMESTAMP NULL,
    receipt_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kupon Diskon & Voucher Promo Belajar
CREATE TABLE IF NOT EXISTS promo_vouchers (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    discount_type VARCHAR(20) NOT NULL DEFAULT 'nominal', -- nominal (Rp), percentage (%)
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

-- Slip Penggajian Honor Mengajar Instruktur (Payroll)
CREATE TABLE IF NOT EXISTS instructor_payrolls (
    id VARCHAR(50) PRIMARY KEY,
    slip_number VARCHAR(100) NOT NULL UNIQUE,
    instructor_id VARCHAR(50) NOT NULL,
    instructor_name VARCHAR(120) NOT NULL,
    period_month INT NOT NULL, -- 1 - 12
    period_year INT NOT NULL, -- misal: 2026
    total_sessions INT NOT NULL DEFAULT 0,
    total_hours DECIMAL(6,2) NOT NULL DEFAULT 0.00,
    rate_per_hour DECIMAL(12,2) NOT NULL,
    base_salary DECIMAL(12,2) NOT NULL,
    bonus DECIMAL(12,2) DEFAULT 0.00,
    deductions DECIMAL(12,2) DEFAULT 0.00,
    total_net_salary DECIMAL(12,2) NOT NULL,
    payment_status VARCHAR(30) DEFAULT 'pending', -- paid, pending, processing
    paid_at TIMESTAMP NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payroll_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
);

-- Master Duta Belajar & Mitra Referral (Ambassadors)
CREATE TABLE IF NOT EXISTS referral_ambassadors (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    referral_code VARCHAR(50) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'Wali Murid', -- Wali Murid, Siswa Berprestasi, Mitra Edukasi
    tier VARCHAR(20) DEFAULT 'bronze', -- bronze, silver, gold, diamond
    total_referrals INT DEFAULT 0,
    successful_enrollments INT DEFAULT 0,
    pending_rewards DECIMAL(12,2) DEFAULT 0.00,
    paid_rewards DECIMAL(12,2) DEFAULT 0.00,
    bee_xp_earned INT DEFAULT 0,
    joined_date DATE,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Riwayat Siswa yang Masuk Menggunakan Referral (Referral Records)
CREATE TABLE IF NOT EXISTS referral_records (
    id VARCHAR(50) PRIMARY KEY,
    ambassador_id VARCHAR(50) NOT NULL,
    ambassador_name VARCHAR(120) NOT NULL,
    referral_code VARCHAR(50) NOT NULL,
    referred_student_name VARCHAR(120) NOT NULL,
    referred_parent_name VARCHAR(120) NOT NULL,
    referred_phone VARCHAR(30) NOT NULL,
    target_program VARCHAR(150),
    status VARCHAR(30) DEFAULT 'registered', -- registered, trial_attended, enrolled, reward_disbursed
    discount_applied DECIMAL(12,2) DEFAULT 150000.00,
    reward_amount DECIMAL(12,2) DEFAULT 150000.00,
    bee_xp_awarded INT DEFAULT 500,
    reward_status VARCHAR(20) DEFAULT 'pending', -- pending, paid
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_ref_ambassador FOREIGN KEY (ambassador_id) REFERENCES referral_ambassadors(id) ON DELETE CASCADE
);

-- =============================================================================
-- 6. PENGUMUMAN & WHATSAPP GATEWAY (COMMUNICATION & GATEWAY)
-- =============================================================================

-- Master Template Pesan WhatsApp
CREATE TABLE IF NOT EXISTS whatsapp_templates (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- reminder, invoice, follow_up, attendance, report, event
    trigger_type VARCHAR(50),
    message_body TEXT NOT NULL,
    variables_json TEXT, -- Array variabel dinamis ['{nama_siswa}', '{jam_kelas}']
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pengumuman & Siaran Massal (Announcements)
CREATE TABLE IF NOT EXISTS class_announcements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    target_audience VARCHAR(50) NOT NULL, -- all, all_students, all_parents, all_instructors, specific_batch
    target_batch_id VARCHAR(50),
    content TEXT NOT NULL,
    channels_json TEXT, -- ['whatsapp', 'portal', 'email']
    send_status VARCHAR(20) DEFAULT 'draft', -- draft, sending, sent, failed
    sent_at TIMESTAMP NULL,
    created_by VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Konfigurasi Perangkat WhatsApp Gateway
CREATE TABLE IF NOT EXISTS whatsapp_gateway_config (
    id VARCHAR(50) PRIMARY KEY,
    provider VARCHAR(50) NOT NULL DEFAULT 'sandbox_simulator', -- sandbox_simulator, meta_cloud_api, fonnte, wablas, custom_webhook
    device_number VARCHAR(30) NOT NULL DEFAULT '+62 853-1131-7127',
    device_name VARCHAR(100) NOT NULL DEFAULT 'BeeKoding Official Bot',
    api_key_or_token TEXT,
    webhook_url TEXT,
    anti_spam_delay_seconds INT DEFAULT 3,
    daily_quota INT DEFAULT 500,
    quota_used_today INT DEFAULT 0,
    is_connected BOOLEAN DEFAULT TRUE,
    is_automation_active BOOLEAN DEFAULT TRUE,
    active_triggers_json TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Antrean & Log Pengiriman Pesan WhatsApp Keluar (Outbox Queue)
CREATE TABLE IF NOT EXISTS whatsapp_queued_messages (
    id VARCHAR(50) PRIMARY KEY,
    recipient_phone VARCHAR(30) NOT NULL,
    recipient_name VARCHAR(120) NOT NULL,
    recipient_role VARCHAR(30) DEFAULT 'parent', -- parent, student, instructor, admin
    trigger_type VARCHAR(50) NOT NULL, -- class_reminder_h1, attendance_recap, report_card_ready, tuition_invoice, payment_receipt, counseling_reminder, trial_class_invitation, certificate_issued
    content TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- pending, queued, sent, delivered, read, failed
    retry_count INT DEFAULT 0,
    last_error TEXT,
    scheduled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sent_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    related_id VARCHAR(50), -- batch_id, invoice_id, report_id, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 7. DATABASE ANALYTICAL VIEWS (UNTUK DASHBOARD & AGREGASI KINERJA)
-- =============================================================================

-- View Ringkasan Metrik Dashboard Utama
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

-- View Performa Siswa & Kehadiran Kelas
CREATE OR REPLACE VIEW v_student_academic_overview AS
SELECT 
    r.student_id,
    r.student_name,
    r.batch_id,
    r.batch_name,
    r.level,
    r.overall_grade,
    r.attendance_rate,
    r.logic_score,
    r.creativity_score,
    r.problem_solving_score,
    r.presentation_score,
    g.total_xp,
    g.current_level AS gamification_level,
    g.streak_days
FROM academic_reports r
LEFT JOIN student_gamification g ON r.student_id = g.student_id;

-- View Kinerja & Total Jam Instruktur Mengajar
CREATE OR REPLACE VIEW v_instructor_performance AS
SELECT 
    i.id AS instructor_id,
    i.name AS instructor_name,
    i.specialization,
    i.rating,
    COUNT(DISTINCT b.id) AS total_assigned_batches,
    COALESCE(SUM(p.total_sessions), 0) AS total_sessions_billed,
    COALESCE(SUM(p.total_net_salary), 0) AS total_honor_paid
FROM instructors i
LEFT JOIN class_batches b ON i.id = b.instructor_id
LEFT JOIN instructor_payrolls p ON i.id = p.instructor_id AND p.payment_status = 'paid'
GROUP BY i.id, i.name, i.specialization, i.rating;

-- View Peringkat Duta Belajar & Konversi Referral
CREATE OR REPLACE VIEW v_referral_leaderboard AS
SELECT 
    a.id,
    a.name,
    a.referral_code,
    a.tier,
    a.total_referrals,
    a.successful_enrollments,
    CASE 
        WHEN a.total_referrals > 0 
        THEN ROUND((a.successful_enrollments * 100.0 / a.total_referrals), 1)
        ELSE 0.0 
    END AS conversion_rate_pct,
    a.paid_rewards,
    a.bee_xp_earned
FROM referral_ambassadors a
ORDER BY a.successful_enrollments DESC, a.total_referrals DESC;
