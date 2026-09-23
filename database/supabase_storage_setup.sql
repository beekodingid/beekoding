-- ============================================================================
-- BEEKODING TECH ACADEMY - SUPABASE STORAGE BUCKETS SETUP
-- ============================================================================
-- Skrip ini membuat Storage Buckets publik dan mengatur kebijakan akses
-- untuk berkas bukti transfer, foto profil/avatar, dokumen rapor, dan karya koding.
--
-- CARA MENJALANKAN:
-- Salin dan jalankan seluruh isi skrip ini di menu "SQL Editor" pada Supabase Dashboard.
-- ============================================================================

-- 1. BUAT BUCKET PENYIMPANAN JIKA BELUM ADA
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('receipts', 'receipts', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'application/pdf']),
    ('avatars', 'avatars', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
    ('documents', 'documents', true, 15728640, ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp']),
    ('showcase', 'showcase', true, 10485760, ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ============================================================================
-- 2. HAPUS KEBIJAKAN STORAGE LAMA JIKA SUDAH ADA
-- ============================================================================
DROP POLICY IF EXISTS "Public can view receipts" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload receipts" ON storage.objects;
DROP POLICY IF EXISTS "Public can view avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public can view documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Public can view showcase" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload showcase" ON storage.objects;

-- ============================================================================
-- 3. KEBIJAKAN AKSES PUBLIK (SELECT) UNTUK BUCKET
-- ============================================================================
CREATE POLICY "Public can view receipts"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'receipts');

CREATE POLICY "Public can view avatars"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'avatars');

CREATE POLICY "Public can view documents"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'documents');

CREATE POLICY "Public can view showcase"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'showcase');

-- ============================================================================
-- 4. KEBIJAKAN AKSES UNGGAH (INSERT) UNTUK BUCKET
-- ============================================================================
CREATE POLICY "Anyone can upload receipts"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'receipts');

CREATE POLICY "Anyone can upload avatars"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload documents"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Anyone can upload showcase"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'showcase');

-- ============================================================================
-- SELESAI: 4 Bucket penyimpanan siap digunakan oleh aplikasi Beekoding!
-- ============================================================================
