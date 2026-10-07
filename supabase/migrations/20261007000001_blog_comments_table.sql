-- =============================================================================
-- BEEKODING BLOG COMMENTS TABLE - SUPABASE & POSTGRESQL MIGRATION
-- Migration Version: 20261007000001_blog_comments_table.sql
-- Description: Interactive Q&A and comments for blog readers with mentor responses
-- =============================================================================

CREATE TABLE IF NOT EXISTS blog_comments (
    id VARCHAR(100) PRIMARY KEY,
    article_slug VARCHAR(200) NOT NULL,
    author_name VARCHAR(150) NOT NULL,
    author_role VARCHAR(100) DEFAULT 'Pembaca / Orang Tua',
    author_email VARCHAR(200),
    content TEXT NOT NULL,
    parent_id VARCHAR(100),
    is_mentor BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'approved', -- 'approved', 'pending', 'spam'
    likes_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_comments_article_slug ON blog_comments(article_slug);
CREATE INDEX IF NOT EXISTS idx_blog_comments_parent_id ON blog_comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_blog_comments_status ON blog_comments(status);
CREATE INDEX IF NOT EXISTS idx_blog_comments_created_at ON blog_comments(created_at DESC);

ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Approved Comments" ON blog_comments;
CREATE POLICY "Public Read Approved Comments" ON blog_comments
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Insert Comments" ON blog_comments;
CREATE POLICY "Public Insert Comments" ON blog_comments
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Access Comments" ON blog_comments;
CREATE POLICY "Admin Full Access Comments" ON blog_comments
    FOR ALL USING (true);
