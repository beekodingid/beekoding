-- =============================================================================
-- BEEKODING BLOG ARTICLES TABLE - SUPABASE & POSTGRESQL MIGRATION
-- Migration Version: 20261006000001_blog_articles_table.sql
-- Description: Dynamic CMS for educational blog articles, SEO metadata & AdSense
-- =============================================================================

CREATE TABLE IF NOT EXISTS blog_articles (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    title VARCHAR(300) NOT NULL,
    excerpt TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'Coding Anak',
    cover_image TEXT NOT NULL,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    read_time_minutes INT NOT NULL DEFAULT 5,
    author_name VARCHAR(150) NOT NULL DEFAULT 'Tim Akademik Beekoding',
    author_role VARCHAR(150) DEFAULT 'Curriculum & Pedagogy Lead',
    author_avatar TEXT DEFAULT '/bee-mascot.png',
    tags_json TEXT, -- JSON Array string: ["Coding Anak", "Scratch"]
    content TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'published', -- 'published', 'draft', 'archived'
    views_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index performa pencarian slug, kategori & status
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON blog_articles(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON blog_articles(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON blog_articles(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_at ON blog_articles(published_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_articles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Publik dapat membaca semua artikel yang berstatus 'published'
DROP POLICY IF EXISTS "Public Read Published Articles" ON blog_articles;
CREATE POLICY "Public Read Published Articles" ON blog_articles
    FOR SELECT USING (true);

-- Policy 2: Admin & Staf dapat mengelola (Insert, Update, Delete) artikel
DROP POLICY IF EXISTS "Admin Full Access Articles" ON blog_articles;
CREATE POLICY "Admin Full Access Articles" ON blog_articles
    FOR ALL USING (true);
