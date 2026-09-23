-- =============================================================================
-- BEEKODING EDUCATION PLATFORM - SEED DATA (DML)
-- Version: 2.0.0
-- Initial Realistic Seed Data for All 33 Entities
-- =============================================================================

-- 1. SYSTEM SETTINGS
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
    '{"theme":"dark","autoReminderEnabled":true,"antiSpamDelay":3,"dailyQuota":500}'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- 2. SYSTEM USERS (RBAC)
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
    'Founder & Lead Architect of Beekoding Learning Engine.',
    'active',
    '["dashboard","students","inquiries","events","counseling","batches","curriculum","resources","instructors","attendance","reports","transactions","vouchers","payroll","referrals","quests","certificates","showcase","templates","questions","announcements","audit","quizzes","users","gateway","settings"]',
    'scrypt_8932_bk_hash_secure',
    '2026-09-20 08:30:00'
),
(
    'usr-inst-01',
    'Kak Sarah Amalia, S.Kom',
    'sarah.amalia@beekoding.com',
    'instructor',
    'Senior Scratch & Game Development Mentor',
    '+62 812-4455-6677',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'Beekoding Academic Faculty',
    'Spesialis koding anak usia 7-12 tahun dengan metode visual story game.',
    'active',
    '["dashboard","batches","attendance","reports","curriculum","resources","quests","quizzes","showcase","certificates"]',
    'scrypt_8932_bk_hash_secure',
    '2026-09-19 14:15:00'
),
(
    'usr-couns-01',
    'Kak Citra Kirana, M.Psi',
    'citra.counseling@beekoding.com',
    'counselor',
    'Head of Student Counseling & Talent Assessment',
    '+62 813-9988-7766',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    'Beekoding Talent & Counseling Center',
    'Psikolog perkembangan anak dan penasihat minat bakat komputasional.',
    'active',
    '["dashboard","students","inquiries","counseling","events","reports","templates"]',
    'scrypt_8932_bk_hash_secure',
    '2026-09-18 10:00:00'
);

-- 3. INSTRUCTORS
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
    '["Scratch 3.0", "Game Logic", "Animation", "UI/UX for Kids"]',
    85000.00,
    3,
    140,
    4.95,
    'active',
    '2024-01-15'
),
(
    'inst-02',
    'Kak Rizky Pratama, S.T',
    'rizky.pratama@beekoding.com',
    '+62 812-9988-1122',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'Software Engineer & Mentor Fullstack Web Junior.',
    'Web Development (HTML, CSS, JS)',
    '["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Git"]',
    95000.00,
    2,
    110,
    4.90,
    'active',
    '2024-03-01'
),
(
    'inst-03',
    'Kak Nabila Zahra, M.Cs',
    'nabila.zahra@beekoding.com',
    '+62 813-7766-3344',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    'AI Researcher & Python Educator.',
    'Python AI & Algoritma Logika',
    '["Python", "Pygame", "Data Structures", "Machine Learning Basics"]',
    110000.00,
    2,
    95,
    4.92,
    'active',
    '2024-05-10'
);

-- 4. QUESTION BANK (8 PILAR ASESMEN BAKAT)
INSERT INTO question_bank (
    id, tier, category, section_number, question_number, prompt, visual_hint, options_json, is_active
) VALUES
(
    'q-jun-log-01',
    'junior',
    'logical',
    1,
    1,
    'Seekor lebah ingin sampai ke sarang madu. Ada labirin dengan jalan: Kiri ada jaring laba-laba, Lurus jalan buntu, Kanan ada bunga mawar harum yang aman. Jalur mana yang sebaiknya dipilih lebah?',
    '🐝 ➡️ 🌸',
    '[{"id":"A","text":"Belok Kiri ke arah laba-laba","score":0,"explanation":"Bahaya, lebah bisa terjebak di jaring."},{"id":"B","text":"Jalan Lurus ke jalan buntu","score":0,"explanation":"Jalan buntu tidak bisa dilewati."},{"id":"C","text":"Belok Kanan melewati bunga mawar","score":20,"explanation":"Benar! Jalur aman dan wangi membawa ke sarang."},{"id":"D","text":"Diam saja tidak bergerak","score":5,"explanation":"Aman namun tidak menyelesaikan misi."}]',
    TRUE
),
(
    'q-jun-pat-01',
    'junior',
    'pattern',
    1,
    2,
    'Perhatikan urutan blok warna berikut: [Merah] - [Kuning] - [Merah] - [Kuning] - [Merah] - [ ... ]. Warna blok selanjutnya apa?',
    '🔴 🟡 🔴 🟡 🔴 ❓',
    '[{"id":"A","text":"Kuning","score":20,"explanation":"Tepat sekali! Pola berulang secara berselang Merah-Kuning."},{"id":"B","text":"Merah","score":0,"explanation":"Kurang tepat, Merah baru saja muncul."},{"id":"C","text":"Biru","score":0,"explanation":"Biru tidak ada di dalam urutan pola."},{"id":"D","text":"Hijau","score":0,"explanation":"Hijau tidak ada di pola ini."}]',
    TRUE
),
(
    'q-mid-prob-01',
    'middle',
    'problem_solving',
    2,
    1,
    'Robot pembersih berhenti bekerja karena rodanya tersangkut tali layangan. Apa langkah perbaikan pertama yang paling logis dilakukan seorang programmer?',
    '🤖 ⚙️ 🧶',
    '[{"id":"A","text":"Matikan daya robot terlebih dahulu sebelum membersihkan roda","score":20,"explanation":"Sangat tepat! Keselamatan perangkat dan keamanan kelistrikan adalah prioritas utama."},{"id":"B","text":"Langsung menarik tali dengan keras saat robot menyala","score":0,"explanation":"Bisa merusak motor penggerak robot."},{"id":"C","text":"Menekan tombol percepatan maksimal","score":0,"explanation":"Roda bisa terbakar atau mesin macet parah."},{"id":"D","text":"Membongkar seluruh badan robot tanpa mematikan saklar","score":0,"explanation":"Langkah berbahaya dan tidak efisien."}]',
    TRUE
);

-- 5. STUDENTS SUBMISSIONS (DATA SISWA & ASESMEN)
INSERT INTO students_submissions (
    id, child_name, child_age, grade_level, parent_name, parent_phone, parent_email, tier, total_score, scores_json, top_strengths_json, growth_areas_json, recommended_program_name, recommended_program_level, recommended_program_desc, answers_json, status, notes
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
    'Sangat direkomendasikan membuat game platformer dan interaktif visual.',
    '{"q-jun-log-01":"C","q-jun-pat-01":"A"}',
    'terdaftar',
    'Siswa sangat antusias, sudah masuk Batch 4 Scratch Sabtu Pagi.'
),
(
    'sub-2026-002',
    'Aisyah Putri Rahmadani',
    11,
    'Kelas 6 SD',
    'Ayah Hendra Kurniawan',
    '+62 813-8899-0011',
    'hendra.kurniawan@gmail.com',
    'middle',
    92.00,
    '{"logical":94,"numerical":90,"spatial":95,"pattern":90,"creativity":96,"problem_solving":92,"language":88,"persistence":91}',
    '["creativity","spatial","logical"]',
    '["numerical"]',
    'Web Explorer & Interactive Designer',
    'middle',
    'Bakat visual dan estetika sangat menonjol. Sangat cocok membuat website portofolio animasi.',
    '{"q-mid-prob-01":"A"}',
    'terdaftar',
    'Sudah melunasi SPP Bulan Pertama, bergabung di Batch Explorer Web.'
),
(
    'sub-2026-003',
    'Rafa Pratama',
    8,
    'Kelas 3 SD',
    'Ibu Maya Melati',
    '+62 856-1122-3344',
    'maya.melati@yahoo.com',
    'junior',
    78.00,
    '{"logical":80,"numerical":75,"spatial":82,"pattern":85,"creativity":78,"problem_solving":74,"language":72,"persistence":78}',
    '["pattern","spatial"]',
    '["problem_solving","language"]',
    'Scratch Junior Starter Logic',
    'junior',
    'Memerlukan latihan logika bertahap dengan animasi gerak dan musik.',
    '{"q-jun-log-01":"C","q-jun-pat-01":"A"}',
    'dihubungi',
    'Dijadwalkan mengikuti sesi Trial Class hari Minggu besok.'
);

-- 6. CONSULTATION INQUIRIES (PROSPEK LEADS)
INSERT INTO consultation_inquiries (
    id, type, name, email, phone, role, program, message, status, admin_notes
) VALUES
(
    'inq-01',
    'konsultasi',
    'Bunda Dian Novita',
    'dian.novita@gmail.com',
    '+62 811-2233-4455',
    'Orang Tua',
    'Scratch Game Maker (Usia 7-9)',
    'Anak saya suka main game Roblox dan ingin belajar cara bikinnya dari nol. Apakah ada kelas coba gratis dulu?',
    'jadwal_konsultasi',
    'Dijadwalkan temu Zoom konseling minat bakat Sabtu Pkl 11.00 WIB.'
),
(
    'inq-02',
    'pendaftaran',
    'Ayah Budi Prasetyo',
    'budi.prasetyo@office.co.id',
    '+62 815-7788-9900',
    'Orang Tua',
    'Python AI & Game Creator (Usia 12-16)',
    'Mau langsung daftarkan anak saya kelas Python batch bulan depan.',
    'terdaftar',
    'Invoice SPP pendaftaran telah terkirim via WhatsApp.'
);

-- 7. CLASS BATCHES
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
    '["2026-03-07","2026-03-14","2026-03-21","2026-03-28","2026-04-04","2026-04-11","2026-04-18","2026-04-25","2026-05-02","2026-05-09","2026-05-16","2026-05-23"]',
    '[{"id":"st-01","studentName":"Kenzo Alvaro","parentName":"Bunda Sarah Wijaya","parentPhone":"+62 812-3456-7890","enrolledAt":"2026-02-28"}]'
),
(
    'batch-2026-02',
    'Junior Web Developer Batch 2',
    'middle',
    '10 - 12 Tahun',
    'Minggu',
    '13:30 - 15:00 WIB',
    'inst-02',
    'Kak Rizky Pratama, S.T',
    8,
    5,
    'ongoing',
    'https://meet.google.com/bk-web-aisyah',
    '["2026-03-08","2026-03-15","2026-03-22","2026-03-29","2026-04-05","2026-04-12","2026-04-19","2026-04-26","2026-05-03","2026-05-10","2026-05-17","2026-05-24"]',
    '[{"id":"st-02","studentName":"Aisyah Putri Rahmadani","parentName":"Ayah Hendra Kurniawan","parentPhone":"+62 813-8899-0011","enrolledAt":"2026-03-01"}]'
);

-- 8. CLASS ATTENDANCE
INSERT INTO class_attendance (
    id, batch_id, batch_name, session_number, session_date, instructor_id, instructor_name, topic, notes, students_attendance_json
) VALUES
(
    'att-01',
    'batch-2026-01',
    'Scratch Game Maker Batch 4',
    1,
    '2026-03-07',
    'inst-01',
    'Kak Sarah Amalia, S.Kom',
    'Pengenalan Sprite Lebah, Koordinat X-Y, dan Event Bergerak',
    'Seluruh siswa hadir tepat waktu. Ananda Kenzo berhasil menggerakkan lebah dengan tombol panah.',
    '[{"studentId":"st-01","studentName":"Kenzo Alvaro","status":"hadir","note":"Aktif dan cepat paham koordinat."}]'
);

-- 9. CURRICULUM MODULES (12 SESI)
INSERT INTO curriculum_modules (
    id, level, level_title, target_age, duration_info, description, prerequisites, competencies_json, sessions_plan_json
) VALUES
(
    'curr-jun-01',
    'junior',
    'Junior Scratch Game Creator',
    '7 - 9 Tahun',
    '12 Sesi (3 Bulan)',
    'Kurikulum koding visual anak untuk membangun pola pikir logika, algoritma, animasi karakter, dan game interaktif 2D.',
    'Bisa membaca dasar & mengoperasikan mouse/keyboard laptop.',
    '["Logika Koordinat X & Y", "Struktur Loop Berulang", "Kondisi Percabangan If-Else", "Variabel Skor & Nyawa", "Broadcast Messaging"]',
    '[{"sessionNumber":1,"title":"Misi Lebah Pertama","topic":"Interface & Motion","objectives":"Mengenal Sprite dan menggerakkan lebah","tools":"Scratch 3.0","assignment":"Animasi lebah terbang mengejar madu"},{"sessionNumber":2,"title":"Tangkap Madu Emas","topic":"Condition If-Then & Sensing","objectives":"Mendeteksi tabrakan sprite dan suara koin","tools":"Scratch 3.0","assignment":"Game tangkap madu 30 detik"}]'
);

-- 10. LEARNING RESOURCES
INSERT INTO learning_resources (
    id, title, category, level, file_type, file_size, download_url, description, is_premium, tags_json, download_count
) VALUES
(
    'res-01',
    'Cheatsheet & Lembar Kerja Koordinat Scratch Lebah (PDF)',
    'worksheet',
    'junior',
    'pdf',
    '2.4 MB',
    'https://assets.beekoding.com/resources/cheatsheet-scratch-junior-v2.pdf',
    'Panduan bergambar warna-warni peta sumbu X dan Y ramah anak SD.',
    FALSE,
    '["Scratch", "Koordinat", "Cheatsheet"]',
    184
),
(
    'res-02',
    'Starter Code: Template Game Flappy Bee (SB3)',
    'starter_code',
    'junior',
    'sb3',
    '4.8 MB',
    'https://assets.beekoding.com/resources/starter-flappy-bee.sb3',
    'Proyek awal Scratch dengan aset suara, sprite lebah, dan pipa rintangan.',
    FALSE,
    '["Flappy Bird", "Scratch 3.0", "Starter Code"]',
    215
);

-- 11. ACADEMIC REPORTS (RAPOR SISWA)
INSERT INTO academic_reports (
    id, student_id, student_name, batch_id, batch_name, level, instructor_name, period, attendance_rate, logic_score, creativity_score, problem_solving_score, presentation_score, overall_grade, teacher_notes, project_title, project_url, report_file_url
) VALUES
(
    'rep-2026-01',
    'st-01',
    'Kenzo Alvaro',
    'batch-2026-01',
    'Scratch Game Maker Batch 4',
    'junior',
    'Kak Sarah Amalia, S.Kom',
    'Maret 2026',
    100,
    95,
    92,
    90,
    94,
    'A+',
    'Ananda Kenzo menunjukkan pemahaman logika yang sangat matang. Mampu membuat sistem gravitasi dan high-score mandiri.',
    'Petualangan Lebah Madu Super',
    'https://scratch.mit.edu/projects/sample-kenzo-bee',
    'https://assets.beekoding.com/reports/rapor-kenzo-maret-2026.pdf'
);

-- 12. CODING QUESTS & GAMIFICATION
INSERT INTO coding_quests (
    id, title, category, level, xp_reward, badge_reward, deadline, description, requirements_json, starter_code_url, submissions_count, is_active
) VALUES
(
    'qst-01',
    'Tantangan Labirin Lebah Ajaib',
    'logic',
    'junior',
    250,
    'Master of Maze',
    '2026-03-31',
    'Buat karakter lebah dapat keluar dari labirin 3 tingkat tanpa menyentuh dinding beracun!',
    '["Memiliki 3 level kesulitan", "Menggunakan variabel skor", "Ada suara efek menang dan kalah"]',
    'https://scratch.mit.edu/projects/maze-starter',
    14,
    TRUE
);

INSERT INTO achievement_badges (
    id, code, name, description, icon, xp_value, category, criteria_json
) VALUES
(
    'bdg-01',
    'FIRST_CODE',
    'Prajurit Koding Perdana',
    'Menyelesaikan baris kode pertama di Beekoding.',
    '🌱',
    100,
    'milestone',
    '{"action":"complete_session_1"}'
),
(
    'bdg-02',
    'BUG_HUNTER',
    'Pembasmi Kutu Digital',
    'Berhasil memperbaiki 5 bug logika secara mandiri.',
    '🐞',
    200,
    'skill',
    '{"action":"fix_5_errors"}'
),
(
    'bdg-03',
    'GAME_CREATOR_GOLD',
    'Arsitek Game Emas',
    'Menerbitkan game orisinal yang dimainkan lebih dari 10 teman.',
    '👑',
    500,
    'achievement',
    '{"action":"publish_featured_project"}'
);

INSERT INTO student_gamification (
    student_id, student_name, total_xp, current_level, streak_days, quests_completed, badges_earned_json, last_activity_at
) VALUES
(
    'st-01',
    'Kenzo Alvaro',
    1450,
    4,
    12,
    5,
    '["FIRST_CODE","BUG_HUNTER","GAME_CREATOR_GOLD"]',
    '2026-03-20 16:45:00'
),
(
    'st-02',
    'Aisyah Putri Rahmadani',
    1820,
    5,
    18,
    6,
    '["FIRST_CODE","BUG_HUNTER"]',
    '2026-03-19 19:20:00'
);

-- 13. QUIZZES
INSERT INTO quiz_exams (
    id, title, category, level, target_age, duration_minutes, passing_score, xp_reward, total_questions, questions_json, is_active
) VALUES
(
    'quiz-01',
    'Ujian Logika Dasar & Loop Scratch',
    'scratch',
    'junior',
    '7 - 9 Tahun',
    15,
    75,
    150,
    3,
    '[{"id":"q1","prompt":"Blok apa yang digunakan untuk mengulang perintah terus menerus tanpa henti?","options":[{"id":"A","text":"Repeat 10"},{"id":"B","text":"Forever (Selamanya)","isCorrect":true},{"id":"C","text":"If-Then"}]}]',
    TRUE
);

-- 14. CERTIFICATES
INSERT INTO student_certificates (
    id, certificate_number, student_id, student_name, course_name, level, issue_date, instructor_name, verification_code, qr_code_url, pdf_url, status
) VALUES
(
    'cert-2026-01',
    'BK-CERT/2026/III/0091',
    'st-01',
    'Kenzo Alvaro',
    'Junior Game Creator (Scratch 3.0)',
    'junior',
    '2026-03-15',
    'Kak Sarah Amalia, S.Kom',
    'BK-KNZ-9882-VERIFIED',
    'https://api.qrserver.com/v1/create-qr-code/?data=BK-KNZ-9882-VERIFIED',
    'https://assets.beekoding.com/certs/sertifikat-kenzo-scratch.pdf',
    'valid'
);

-- 15. STUDENT PROJECTS (SHOWCASE)
INSERT INTO student_projects (
    id, student_id, student_name, age, title, category, level, thumbnail_url, project_url, description, tags_json, likes_count, is_featured, parent_reviews_json
) VALUES
(
    'prj-01',
    'st-01',
    'Kenzo Alvaro',
    9,
    'Super Bee Honey Run 3D',
    'game',
    'junior',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    'https://scratch.mit.edu/projects/sample-super-bee',
    'Game petualangan lebah mencari madu emas sambil menghindari rintangan laba-laba raksasa dengan skor animasi.',
    '["Scratch", "Action Game", "Logic 2D"]',
    42,
    TRUE,
    '[{"parentName":"Bunda Sarah","content":"Bangga sekali melihat Kenzo bisa bikin game sendiri yang seru dimainkan sekeluarga!","rating":5}]'
);

-- 16. TESTIMONIALS
INSERT INTO parent_testimonials (
    id, parent_name, child_name, role_or_city, avatar, content, rating, is_featured
) VALUES
(
    'tst-01',
    'Bunda Sarah Wijaya',
    'Kenzo (9 Tahun)',
    'Wali Murid - Jakarta Selatan',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    'Beekoding benar-benar mengubah waktu layar gadget Kenzo dari yang tadinya hanya konsumtif main game, sekarang jadi produktif dan bangga menciptakan game kodingan sendiri!',
    5,
    TRUE
);

-- 17. FINANCIAL TRANSACTIONS (INVOICES & SPP)
INSERT INTO financial_transactions (
    id, invoice_number, student_name, parent_name, parent_phone, batch_name, program_name, amount, discount_amount, total_paid, payment_method, payment_status, due_date, paid_at, receipt_url, notes
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
    'https://assets.beekoding.com/receipts/kwitansi-inv-0301.pdf',
    'Lunas dengan potongan promo kode BEEKODING150.'
),
(
    'tx-2026-002',
    'INV-BK-2026-0302',
    'Aisyah Putri Rahmadani',
    'Ayah Hendra Kurniawan',
    '+62 813-8899-0011',
    'Junior Web Developer Batch 2',
    'Paket Kursus Reguler Middle Web (12 Sesi)',
    950000.00,
    0.00,
    950000.00,
    'QRIS ShopeePay/GoPay',
    'paid',
    '2026-03-08',
    '2026-03-06 09:30:00',
    'https://assets.beekoding.com/receipts/kwitansi-inv-0302.pdf',
    'Lunas terverifikasi otomatis via QRIS.'
);

-- 18. PROMO VOUCHERS
INSERT INTO promo_vouchers (
    id, code, title, discount_type, discount_value, min_transaction, max_discount, usage_limit, times_used, valid_from, valid_until, is_active
) VALUES
(
    'vch-01',
    'BEEKODING150',
    'Diskon Pendaftaran Spesial Murid Baru',
    'nominal',
    150000.00,
    500000.00,
    150000.00,
    100,
    24,
    '2026-01-01',
    '2026-12-31',
    TRUE
),
(
    'vch-02',
    'BEEJUARA20',
    'Potongan 20% Paket Koding Tingkat Lanjut',
    'percentage',
    20.00,
    700000.00,
    200000.00,
    50,
    9,
    '2026-03-01',
    '2026-06-30',
    TRUE
);

-- 19. INSTRUCTOR PAYROLL
INSERT INTO instructor_payrolls (
    id, slip_number, instructor_id, instructor_name, period_month, period_year, total_sessions, total_hours, rate_per_hour, base_salary, bonus, deductions, total_net_salary, payment_status, paid_at, notes
) VALUES
(
    'pay-2026-02-01',
    'SLIP-BK-2026-02-001',
    'inst-01',
    'Kak Sarah Amalia, S.Kom',
    2,
    2026,
    16,
    24.00,
    85000.00,
    2040000.00,
    250000.00,
    0.00,
    2290000.00,
    'paid',
    '2026-03-01 10:00:00',
    'Honor mengajar Februari 2026 + Bonus kepuasan rating wali murid bintang 5.'
);

-- 20. REFERRAL & DUTA BELAJAR
INSERT INTO referral_ambassadors (
    id, name, phone, email, referral_code, role, tier, total_referrals, successful_enrollments, pending_rewards, paid_rewards, bee_xp_earned, joined_date, status
) VALUES
(
    'amb-01',
    'Bunda Sarah Wijaya',
    '+62 812-3456-7890',
    'sarah.wijaya@gmail.com',
    'KENZO-BEE',
    'Wali Murid',
    'gold',
    6,
    4,
    150000.00,
    450000.00,
    2000,
    '2026-01-20',
    'active'
);

INSERT INTO referral_records (
    id, ambassador_id, ambassador_name, referral_code, referred_student_name, referred_parent_name, referred_phone, target_program, status, discount_applied, reward_amount, bee_xp_awarded, reward_status
) VALUES
(
    'ref-01',
    'amb-01',
    'Bunda Sarah Wijaya',
    'KENZO-BEE',
    'Aisyah Putri Rahmadani',
    'Ayah Hendra Kurniawan',
    '+62 813-8899-0011',
    'Web Development Middle',
    'enrolled',
    150000.00,
    150000.00,
    500,
    'paid'
);

-- 21. WHATSAPP TEMPLATES & ANNOUNCEMENTS
INSERT INTO whatsapp_templates (
    id, title, category, trigger_type, message_body, variables_json, is_active
) VALUES
(
    'tpl-01',
    'Pengingat Sesi Kelas Koding (H-1)',
    'reminder',
    'class_reminder_h1',
    'Halo {nama_wali}! 🐝 Mengingatkan sesi koding besok untuk ananda *{nama_siswa}* pada batch "{nama_batch}".\n\n⏰ Jam: {jam_kelas}\n📌 Link Kelas: {link_meet}\n👨‍🏫 Mentor: {nama_mentor}\n\nSampai jumpa di kelas koding Beekoding! 🚀✨',
    '["{nama_wali}","{nama_siswa}","{nama_batch}","{jam_kelas}","{link_meet}","{nama_mentor}"]',
    TRUE
),
(
    'tpl-02',
    'Notifikasi Tagihan SPP Bulanan',
    'invoice',
    'tuition_invoice',
    'Halo Ayah/Bunda {nama_wali}! 🐝 Invoice tagihan SPP koding ananda *{nama_siswa}* sebesar *Rp {nominal}* untuk periode {periode} telah terbit. Jatuh tempo: {jatuh_tempo}. Pembayaran dapat ditransfer ke BCA 1234567890 a.n Beekoding Edu. Terima kasih! 🙏',
    '["{nama_wali}","{nama_siswa}","{nominal}","{periode}","{jatuh_tempo}"]',
    TRUE
);

INSERT INTO class_announcements (
    id, title, target_audience, content, channels_json, send_status, sent_at, created_by
) VALUES
(
    'anc-01',
    'Libur Nasional Idul Fitri 2026 & Jadwal Kelas Pengganti',
    'all',
    'Diberitahukan kepada seluruh siswa dan wali murid bahwa sesi kelas koding pada tanggal libur nasional akan digantikan sesuai kesepakatan mentor grup.',
    '["whatsapp","portal"]',
    'sent',
    '2026-03-10 10:00:00',
    'Febri Hasan'
);

-- 22. WHATSAPP GATEWAY CONFIG & OUTBOX QUEUE
INSERT INTO whatsapp_gateway_config (
    id, provider, device_number, device_name, api_key_or_token, webhook_url, anti_spam_delay_seconds, daily_quota, quota_used_today, is_connected, is_automation_active, active_triggers_json
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
    TRUE,
    '["class_reminder_h1","attendance_recap","report_card_ready","tuition_invoice","payment_receipt","counseling_reminder","trial_class_invitation","certificate_issued"]'
) ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

INSERT INTO whatsapp_queued_messages (
    id, recipient_phone, recipient_name, recipient_role, trigger_type, content, status, retry_count, scheduled_at, sent_at, delivered_at, related_id
) VALUES
(
    'msg-seed-01',
    '+62 812-3456-7890',
    'Bunda Sarah (Wali Kenzo)',
    'parent',
    'class_reminder_h1',
    'Halo Bunda Sarah! 🐝 Mengingatkan sesi koding besok untuk ananda *Kenzo Alvaro* pada kelas "Scratch Game Maker Batch 4".\n\n⏰ Waktu: Sabtu, 09.00 - 10.30 WIB\n📌 Link Kelas: https://meet.google.com/bk-junior-kenzo\n👨‍🏫 Mentor: Kak Sarah Amalia\n\nMohon pastikan laptop & koneksi internet ananda telah siap. Sampai jumpa di kelas koding Beekoding! 🚀✨',
    'delivered',
    0,
    '2026-03-06 17:00:00',
    '2026-03-06 17:00:02',
    '2026-03-06 17:00:05',
    'batch-2026-01'
);

-- 23. AUDIT LOGS (SECURITY TRAIL)
INSERT INTO audit_logs (
    id, user_id, user_name, user_role, module, action_type, title, description, ip_address, severity, metadata_json
) VALUES
(
    'aud-01',
    'usr-admin-01',
    'Febri Hasan',
    'administrator',
    'auth',
    'login',
    'Autentikasi Administrator Berhasil',
    'Sesi administrator dimulai melalui browser utama.',
    '127.0.0.1',
    'info',
    '{"browser":"Chrome","platform":"Windows"}'
),
(
    'aud-02',
    'usr-admin-01',
    'Febri Hasan',
    'administrator',
    'gateway',
    'update',
    'Konfigurasi WhatsApp Gateway Diperbarui',
    'Mengaktifkan mesin otomasi dispatcher pengingat kelas H-1.',
    '127.0.0.1',
    'success',
    '{"provider":"sandbox_simulator","dailyQuota":500}'
);
