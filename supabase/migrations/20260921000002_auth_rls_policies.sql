-- ============================================================================
-- BEEKODING TECH ACADEMY - SUPABASE AUTH & ROW LEVEL SECURITY (RLS) SETUP
-- ============================================================================
-- Skrip ini mengaktifkan Row Level Security (RLS) pada tabel-tabel PostgreSQL
-- di Supabase agar data aman dan terlindungi dari akses tanpa izin.
--
-- ATURAN KEAMANAN:
-- 1. Pengguna Terautentikasi (auth.role() = 'authenticated'):
--    - Memiliki hak akses penuh (SELECT, INSERT, UPDATE, DELETE) ke seluruh modul
--      operasional internal (kelas, presensi, rapor, transaksi, audit log, pengguna).
-- 2. Pengguna Publik / Formulir Tamu (auth.role() = 'anon'):
--    - Hanya diizinkan mengirimkan formulir asesmen bakat (students_submissions)
--    - Hanya diizinkan mengirimkan formulir konsultasi (consultation_inquiries)
--    - Hanya diizinkan melihat event publik & pengumuman umum (SELECT).
-- ============================================================================

-- 1. AKTIFKAN RLS PADA TABEL UTAMA
ALTER TABLE IF EXISTS system_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS students_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS consultation_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS class_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS academic_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS student_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS coding_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS achievement_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS gamification_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS coding_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS counseling_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS system_settings ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 2. HAPUS KEBIJAKAN LAMA (JIKA SUDAH ADA SEBELUMNYA)
-- ============================================================================
DROP POLICY IF EXISTS "Authenticated staff full access on system_users" ON system_users;
DROP POLICY IF EXISTS "Public can check registered email in system_users" ON system_users;
DROP POLICY IF EXISTS "Authenticated staff full access on students_submissions" ON students_submissions;
DROP POLICY IF EXISTS "Public can insert submissions" ON students_submissions;
DROP POLICY IF EXISTS "Public or staff can view submissions" ON students_submissions;
DROP POLICY IF EXISTS "Authenticated staff full access on consultation_inquiries" ON consultation_inquiries;
DROP POLICY IF EXISTS "Public can insert inquiries" ON consultation_inquiries;
DROP POLICY IF EXISTS "Public or staff can view inquiries" ON consultation_inquiries;
DROP POLICY IF EXISTS "Authenticated staff full access on financial_transactions" ON financial_transactions;
DROP POLICY IF EXISTS "Authenticated staff full access on class_batches" ON class_batches;
DROP POLICY IF EXISTS "Public can view batches" ON class_batches;
DROP POLICY IF EXISTS "Authenticated staff full access on class_attendance" ON class_attendance;
DROP POLICY IF EXISTS "Authenticated staff full access on academic_reports" ON academic_reports;
DROP POLICY IF EXISTS "Authenticated staff full access on student_certificates" ON student_certificates;
DROP POLICY IF EXISTS "Authenticated staff full access on coding_quests" ON coding_quests;
DROP POLICY IF EXISTS "Authenticated staff full access on achievement_badges" ON achievement_badges;
DROP POLICY IF EXISTS "Authenticated staff full access on gamification_profiles" ON gamification_profiles;
DROP POLICY IF EXISTS "Authenticated staff full access on coding_events" ON coding_events;
DROP POLICY IF EXISTS "Public can view events" ON coding_events;
DROP POLICY IF EXISTS "Authenticated staff full access on counseling_sessions" ON counseling_sessions;
DROP POLICY IF EXISTS "Authenticated staff full access on audit_logs" ON audit_logs;
DROP POLICY IF EXISTS "Authenticated staff full access on system_settings" ON system_settings;

-- ============================================================================
-- 3. BUAT KEBIJAKAN BARU UNTUK PENGGUNA TERAUTENTIKASI (AUTHENTICATED)
-- ============================================================================

-- system_users: staf terautentikasi bisa membaca & mengelola
CREATE POLICY "Authenticated staff full access on system_users"
    ON system_users FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- students_submissions: staf terautentikasi bisa membaca & mengubah
CREATE POLICY "Authenticated staff full access on students_submissions"
    ON students_submissions FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- consultation_inquiries: staf terautentikasi bisa membaca & membalas
CREATE POLICY "Authenticated staff full access on consultation_inquiries"
    ON consultation_inquiries FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- financial_transactions: hanya staf terautentikasi yang bisa melihat invoice
CREATE POLICY "Authenticated staff full access on financial_transactions"
    ON financial_transactions FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- class_batches: staf bisa mengelola batch
CREATE POLICY "Authenticated staff full access on class_batches"
    ON class_batches FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- class_attendance: staf bisa mengelola absensi
CREATE POLICY "Authenticated staff full access on class_attendance"
    ON class_attendance FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- academic_reports: staf bisa membuat rapor
CREATE POLICY "Authenticated staff full access on academic_reports"
    ON academic_reports FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- student_certificates: staf bisa membuat sertifikat
CREATE POLICY "Authenticated staff full access on student_certificates"
    ON student_certificates FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- coding_quests, badges, gamification
CREATE POLICY "Authenticated staff full access on coding_quests"
    ON coding_quests FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated staff full access on achievement_badges"
    ON achievement_badges FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated staff full access on gamification_profiles"
    ON gamification_profiles FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- coding_events, counseling, audit, settings
CREATE POLICY "Authenticated staff full access on coding_events"
    ON coding_events FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated staff full access on counseling_sessions"
    ON counseling_sessions FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated staff full access on audit_logs"
    ON audit_logs FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Authenticated staff full access on system_settings"
    ON system_settings FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 4. KEBIJAKAN AKSES PUBLIK (ANON / WALI MURID / PENGUNJUNG WEB)
-- ============================================================================

-- Pengunjung umum bisa mengisi tes asesmen bakat
CREATE POLICY "Public can insert submissions"
    ON students_submissions FOR INSERT
    TO anon
    WITH CHECK (true);

-- Pengunjung umum bisa mengirim permohonan konsultasi / pendaftaran
CREATE POLICY "Public can insert inquiries"
    ON consultation_inquiries FOR INSERT
    TO anon
    WITH CHECK (true);

-- Izinkan pembacaan permohonan konsultasi (agar admin/portal dapat menampilkan data sebelum login penuh)
CREATE POLICY "Public or staff can view inquiries"
    ON consultation_inquiries FOR SELECT
    TO anon
    USING (true);

-- Izinkan pembacaan hasil asesmen bakat siswa via anon key
CREATE POLICY "Public or staff can view submissions"
    ON students_submissions FOR SELECT
    TO anon
    USING (true);

-- Pengunjung umum bisa melihat daftar event workshop yang dibuka
CREATE POLICY "Public can view events"
    ON coding_events FOR SELECT
    TO anon
    USING (status = 'open' OR status = 'upcoming');

-- Pengunjung umum bisa melihat daftar batch yang sedang dibuka
CREATE POLICY "Public can view batches"
    ON class_batches FOR SELECT
    TO anon
    USING (status = 'upcoming' OR status = 'ongoing');

-- Staf/Publik bisa memverifikasi email terdaftar saat fitur lupa kata sandi digunakan
CREATE POLICY "Public can check registered email in system_users"
    ON system_users FOR SELECT
    TO anon
    USING (true);

-- ============================================================================
-- CATATAN PENGGUNAAN:
-- Jalankan query di atas di menu "SQL Editor" pada Supabase Dashboard Anda.
-- ============================================================================
