import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const blogArticlesPath = path.join(rootDir, 'src', 'data', 'blogArticles.ts');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://nmsfffkwpikiokycfdml.supabase.co';
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tc2ZmZmt3cGlraW9reWNmZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTcxMjEsImV4cCI6MjEwNTUzMzEyMX0.WU5hZIdTj0wAzp6zQ_voqAgizgqXCIVgGVHu56MtMUg';

// Dynamic import or parsing of blogArticles.ts
const tsContent = fs.readFileSync(blogArticlesPath, 'utf-8');

// Parse articles
const articles = [];
const blocks = tsContent.split(/\{\s*slug:\s*'/);

for (let i = 1; i < blocks.length; i++) {
  const b = blocks[i];
  const slug = b.match(/^([^']+)'/)?.[1];
  const title = b.match(/title:\s*'([^']+)'/)?.[1];
  const excerpt = b.match(/excerpt:\s*'([^']+)'/)?.[1];
  const category = b.match(/category:\s*'([^']+)'/)?.[1] || 'Coding Anak';
  const coverImage = b.match(/coverImage:\s*'([^']+)'/)?.[1];
  const publishedAt = b.match(/publishedAt:\s*'([^']+)'/)?.[1] || new Date().toISOString().split('T')[0];
  const readTimeMinutes = parseInt(b.match(/readTimeMinutes:\s*(\d+)/)?.[1] || '5', 10);
  const authorName = b.match(/name:\s*'([^']+)'/)?.[1] || 'Tim Akademik Beekoding';
  const authorRole = b.match(/role:\s*'([^']+)'/)?.[1] || 'Curriculum & Pedagogy Lead';
  const authorAvatar = b.match(/avatar:\s*'([^']+)'/)?.[1] || '/bee-mascot.png';

  const tagsMatch = b.match(/tags:\s*\[([^\]]+)\]/);
  let tags = ['Coding Anak'];
  if (tagsMatch) {
    tags = tagsMatch[1]
      .split(',')
      .map((t) => t.replace(/['"\s]/g, '').trim())
      .filter(Boolean);
  }

  const contentMatch = b.match(/content:\s*`([\s\S]*?)`\s*,\s*}/);
  const content = contentMatch ? contentMatch[1].trim() : '';

  if (slug && title) {
    articles.push({
      id: `blog-${slug}`,
      slug,
      title,
      excerpt: excerpt || '',
      category,
      cover_image: coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      published_at: publishedAt,
      read_time_minutes: readTimeMinutes,
      author_name: authorName,
      author_role: authorRole,
      author_avatar: authorAvatar,
      tags_json: JSON.stringify(tags),
      content,
      status: 'published',
      views_count: 120 + Math.floor(Math.random() * 80),
      updated_at: new Date().toISOString(),
    });
  }
}

console.log(`Parsed ${articles.length} articles from src/data/blogArticles.ts.`);

async function syncToSupabase() {
  for (const art of articles) {
    console.log(`Syncing "${art.slug}" to Supabase...`);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_articles`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(art),
    });

    if (res.ok) {
      console.log(`  -> OK [${res.status}]: ${art.slug}`);
    } else {
      const errText = await res.text();
      console.warn(`  -> FAILED [${res.status}]: ${errText}`);
    }
  }
  console.log('All articles sync completed!');
}

syncToSupabase().catch(console.error);
