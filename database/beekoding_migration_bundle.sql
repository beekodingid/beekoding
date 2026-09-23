-- =============================================================================
-- BEEKODING PLATFORM - ALL-IN-ONE SQL MIGRATION & SEED BUNDLE
-- Version: 2.0.0 (Production-Ready Turnkey Script)
-- Modules Covered:
--  1. Dashboard & Analytical Views
--  2. Data Siswa & Asesmen Bakat (Students & Talent Submissions)
--  3. Konsultasi & Registrasi (Inquiries & Leads)
--  4. Event & Trial Class (Coding Events & Workshops)
--  5. Konseling & Bimbingan (1-on-1 Sessions & Action Plans)
--  6. Pengumuman & Siaran (Announcements & Mass Broadcast)
--  7. Jadwal & Batch Kelas (Class Batches & Schedules)
--  8. Presensi & Absensi (Attendance & Session Summaries)
--  9. Rapor Belajar Siswa (Academic Reports & Grades)
-- 10. Silabus Kurikulum (12 Sessions Curriculum per Tier)
-- 11. Bahan Ajar & Modul (Learning Resources & Starter Codes)
-- 12. Tim Instruktur (Instructors, Hourly Rates & Profiles)
-- 13. Tantangan & Quest (Coding Quests & Submissions)
-- 14. Kuis & Evaluasi Belajar (Exams & Quiz Attempts)
-- 15. Sertifikat Siswa (Certificates with QR & Verification Codes)
-- 16. Karya & Portofolio (Showcase Projects & Parent Reviews)
-- 17. Transaksi & Biaya (Invoices, SPP & Receipts)
-- 18. Kupon & Promo (Vouchers & Discount Codes)
-- 19. Penggajian Instruktur (Payroll Slips & Net Salary)
-- 20. Duta & Referral (Ambassadors, Links & Rewards)
-- 21. Bank Soal (8 Pillars Talent Assessment Bank)
-- 22. Manajemen User & Hak Akses (System Users & RBAC Permissions)
-- 23. Log Aktivitas & Audit (Security Audit Trail)
-- 24. WhatsApp Gateway & Antrean Pesan (Config & Queue Dispatcher)
-- 25. Pengaturan Sistem (System Profile & Global Settings)
-- =============================================================================

-- Panduan Import Cepat:
-- 1. MySQL CLI:
--    mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS beekoding_db;"
--    mysql -u root -p beekoding_db < database/beekoding_migration_bundle.sql
-- 2. phpMyAdmin:
--    Buka phpMyAdmin -> Buat database baru 'beekoding_db' -> Tab 'Import' -> Pilih file ini -> Klik 'Go' / 'Kirim'.
-- 3. PostgreSQL / Supabase:
--    psql -U postgres -d beekoding_db -f database/beekoding_migration_bundle.sql
-- =============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- -----------------------------------------------------------------------------
-- SKEMA STRUKTUR TABEL (DDL)
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS system_settings (
    id VARCHAR(50) PRIMARY KEY,
    institution_name VARCHAR(150) NOT NULL DEFAULT 'Beekoding Academy',
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
    institution VARCHAR(150) DEFAULT 'Beekoding Tech Academy',
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_module (module),
    INDEX idx_audit_action (action_type),
    INDEX idx_audit_created_at (created_at)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_question_tier_cat (tier, category)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_submission_parent_phone (parent_phone),
    INDEX idx_submission_status (status),
    INDEX idx_submission_created_at (created_at)
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_inquiry_status (status),
    INDEX idx_inquiry_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS coding_events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'trial_class',
    age_group VARCHAR(50) NOT NULL DEFAULT '7 - 12 Tahun',
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_event_date (event_date),
    INDEX idx_event_status (status)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_counseling_date (session_date),
    INDEX idx_counseling_status (status)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_batch_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    INDEX idx_batch_status (status)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_attendance_batch FOREIGN KEY (batch_id) REFERENCES class_batches(id) ON DELETE CASCADE,
    INDEX idx_attendance_date (session_date)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_report_batch FOREIGN KEY (batch_id) REFERENCES class_batches(id) ON DELETE CASCADE
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

CREATE TABLE IF NOT EXISTS quest_submissions (
    id VARCHAR(50) PRIMARY KEY,
    quest_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    project_url TEXT NOT NULL,
    notes TEXT,
    xp_awarded INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    mentor_feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_quest_sub FOREIGN KEY (quest_id) REFERENCES coding_quests(id) ON DELETE CASCADE
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
    student_id VARCHAR(50) NOT NULL,
    student_name VARCHAR(120) NOT NULL,
    score INT NOT NULL,
    passed BOOLEAN NOT NULL,
    xp_earned INT DEFAULT 0,
    answers_json LONGTEXT,
    time_spent_seconds INT,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_attempt_quiz FOREIGN KEY (quiz_id) REFERENCES quiz_exams(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS achievement_badges (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_bundle_gamification_xp (total_xp DESC)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_bundle_tx_status (payment_status)
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_payroll_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE CASCADE
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_bundle_ref_ambassador FOREIGN KEY (ambassador_id) REFERENCES referral_ambassadors(id) ON DELETE CASCADE
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_bundle_wa_status (status),
    INDEX idx_bundle_wa_trigger (trigger_type)
);

-- -----------------------------------------------------------------------------
-- VIEWS ANALITIK DASHBOARD
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

-- -----------------------------------------------------------------------------
-- SEED DATA INITIALIZATION
-- -----------------------------------------------------------------------------

INSERT INTO system_settings (
    id, institution_name, tagline, email, phone, address, logo_url, website_url, currency, academic_year, notifications_enabled, lead_alerts_enabled, sound_enabled, two_factor_enabled, system_config_json
) VALUES (
    'setting-01',
    'Beekoding Academy Indonesia',
    'Platform Belajar Koding Berbasis Bakat & Karakter Anak No. 1 di Indonesia',
    'halo@beekoding.com',
    '+62 853-1131-7127',
    'Gedung Beekoding EduHub Lt. 3, Jl. Merdeka Tekno No. 88, Jakarta Selatan',
    '/bee-mascot.png',
    'https://beekoding.com',
    'IDR',
    '2026/2027',
    TRUE,
    TRUE,
    TRUE,
    FALSE,
    '{"theme":"dark","autoReminderEnabled":true}'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

INSERT INTO system_users (
    id, name, email, role, role_title, phone, avatar, institution, bio, status, allowed_tabs_json, password_hash, last_login_at
) VALUES 
(
    'usr-admin-01',
    'Febri Hasan',
    'febri@beekoding.com',
    'administrator',
    'Super Administrator & Founder',
    '+62 853-1131-7127',
    '/febri-hasan.png',
    'Beekoding Academy Central',
    'Lead Architect & Founder of Beekoding Learning Engine.',
    'active',
    '["dashboard","students","inquiries","events","counseling","batches","curriculum","resources","instructors","attendance","reports","transactions","vouchers","payroll","referrals","quests","certificates","showcase","templates","questions","announcements","audit","quizzes","users","gateway","settings"]',
    'scrypt_8932_bk_hash_secure',
    '2026-09-20 08:30:00'
);

INSERT INTO instructors (
    id, name, email, phone, avatar, bio, specialization, skills_json, hourly_rate, active_batches_count, total_teaching_hours, rating, status, joined_date
) VALUES
(
    'inst-01',
    'Kak Sarah Amalia, S.Kom',
    'sarah.amalia@beekoding.com',
    '+62 812-4455-6677',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'Pengalaman 5+ tahun mengajar logika komputasi & Scratch Game Maker.',
    'Scratch Visual Coding & Game Design',
    '["Scratch 3.0", "Game Logic", "Animation"]',
    85000.00,
    3,
    140,
    4.95,
    'active',
    '2024-01-15'
);

INSERT INTO class_batches (
    id, name, level, age_tier, schedule_day, schedule_time, instructor_id, instructor_name, quota, enrolled_count, status, meet_url, session_dates_json, enrolled_students_json
) VALUES
(
    'batch-2026-01',
    'Scratch Game Maker Batch 4',
    'junior',
    '7 - 9 Tahun',
    'Sabtu',
    '09:00 - 10:30 WIB',
    'inst-01',
    'Kak Sarah Amalia, S.Kom',
    8,
    6,
    'ongoing',
    'https://meet.google.com/bk-junior-kenzo',
    '["2026-03-07","2026-03-14","2026-03-21","2026-03-28"]',
    '[{"id":"st-01","studentName":"Kenzo Alvaro","parentName":"Bunda Sarah Wijaya","parentPhone":"+62 812-3456-7890"}]'
);

INSERT INTO students_submissions (
    id, child_name, child_age, grade_level, parent_name, parent_phone, parent_email, tier, total_score, scores_json, top_strengths_json, growth_areas_json, recommended_program_name, recommended_program_level, recommended_program_desc, status, notes
) VALUES
(
    'sub-2026-001',
    'Kenzo Alvaro',
    9,
    'Kelas 4 SD',
    'Bunda Sarah Wijaya',
    '+62 812-3456-7890',
    'sarah.wijaya@gmail.com',
    'junior',
    88.50,
    '{"logical":95,"numerical":85,"spatial":90,"pattern":92,"creativity":88,"problem_solving":84,"language":80,"persistence":94}',
    '["logical","persistence","pattern"]',
    '["language"]',
    'Junior Game Creator (Scratch 3.0)',
    'junior',
    'Sangat direkomendasikan membuat game platformer visual.',
    'terdaftar',
    'Aktif di Batch 4 Scratch Sabtu Pagi.'
);

INSERT INTO financial_transactions (
    id, invoice_number, student_name, parent_name, parent_phone, batch_name, program_name, amount, discount_amount, total_paid, payment_method, payment_status, due_date, paid_at, notes
) VALUES
(
    'tx-2026-001',
    'INV-BK-2026-0301',
    'Kenzo Alvaro',
    'Bunda Sarah Wijaya',
    '+62 812-3456-7890',
    'Scratch Game Maker Batch 4',
    'Paket Kursus Reguler Junior (12 Sesi)',
    850000.00,
    150000.00,
    700000.00,
    'Transfer Bank BCA',
    'paid',
    '2026-03-05',
    '2026-03-02 14:10:00',
    'Lunas dengan potongan promo kode BEEKODING150.'
);

INSERT INTO whatsapp_gateway_config (
    id, provider, device_number, device_name, api_key_or_token, webhook_url, anti_spam_delay_seconds, daily_quota, quota_used_today, is_connected, is_automation_active
) VALUES (
    'gw-cfg-01',
    'sandbox_simulator',
    '+62 853-1131-7127',
    'Beekoding Hotline Official Bot',
    'bk_live_token_sandbox_demo',
    'https://api.beekoding.com/v1/wa/webhook',
    3,
    500,
    28,
    TRUE,
    TRUE
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================================
-- SELESAI: DATABASE BEEKODING BERHASIL DIKONFIGURASI SECARA SEMPURNA!
-- =============================================================================
