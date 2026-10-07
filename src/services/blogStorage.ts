import { blogArticles as defaultSeedArticles, type BlogArticle, type BlogAuthor } from '../data/blogArticles';
import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { emitStorageUpdate } from './adminStorage';
import { calculateReadTime } from '../utils/readTime';

export type { BlogArticle, BlogAuthor };

const BLOG_ARTICLES_STORAGE_KEY = 'beekoding_blog_articles_v1';

/**
 * Normalisasi objek artikel agar memiliki ID unik dan format terstandarisasi
 */
function normalizeArticle(article: Partial<BlogArticle>, index: number = 0): BlogArticle {
  const slug = (article.slug || `artikel-${Date.now()}-${index}`)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    id: article.id || `blog-${slug}`,
    slug,
    title: article.title || 'Judul Artikel',
    excerpt: article.excerpt || '',
    category: (article.category as any) || 'Coding Anak',
    coverImage:
      article.coverImage ||
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    publishedAt: article.publishedAt || new Date().toISOString().split('T')[0],
    readTimeMinutes: article.content ? calculateReadTime(article.content) : (Number(article.readTimeMinutes) || 1),
    author: {
      name: article.author?.name || 'Tim Akademik Beekoding',
      role: article.author?.role || 'Curriculum & Pedagogy Lead',
      avatar: article.author?.avatar || '/bee-mascot.png',
    },
    tags: (() => {
      if (Array.isArray(article.tags)) {
        const cleaned = article.tags.map((t) => String(t).trim()).filter(Boolean);
        if (cleaned.length > 0) return cleaned;
      }
      return [article.category || 'Coding Anak', 'Edukasi'];
    })(),
    content: article.content || '',
    status: article.status || 'published',
    viewsCount: Number(article.viewsCount) || 0,
    createdAt: article.createdAt || new Date().toISOString(),
    updatedAt: article.updatedAt || new Date().toISOString(),
  };
}

/**
 * Mengambil seluruh artikel blog dari LocalStorage dengan fallback ke seed data awal
 */
export function getBlogArticles(): BlogArticle[] {
  if (typeof window === 'undefined') {
    return defaultSeedArticles.map((a, i) => normalizeArticle(a, i));
  }

  try {
    const raw = localStorage.getItem(BLOG_ARTICLES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingSlugs = new Set(parsed.map((a: any) => a.slug));
        const newSeeds = defaultSeedArticles.filter((s) => !existingSlugs.has(s.slug));
        if (newSeeds.length > 0) {
          const combined = [...parsed, ...newSeeds].map((a, i) => normalizeArticle(a, i));
          saveBlogArticlesLocally(combined);
          return combined;
        }
        return parsed.map((a, i) => normalizeArticle(a, i));
      }
    }
  } catch (err) {
    console.warn('Gagal membaca artikel blog dari localStorage:', err);
  }

  // Jika belum ada di localStorage, inisialisasi dengan seed articles
  const initial = defaultSeedArticles.map((a, i) => normalizeArticle(a, i));
  saveBlogArticlesLocally(initial);
  return initial;
}

/**
 * Menyimpan array artikel ke LocalStorage internal
 */
export function saveBlogArticlesLocally(articles: BlogArticle[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BLOG_ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    emitStorageUpdate('blog');
  } catch (err) {
    console.error('Gagal menyimpan artikel blog ke localStorage:', err);
  }
}

/**
 * Mengambil satu artikel berdasarkan slug
 */
export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  const articles = getBlogArticles();
  return articles.find((a) => a.slug === slug);
}

/**
 * Menyimpan atau memperbarui artikel (Local + Cloud Supabase)
 */
export async function saveBlogArticle(articleData: Partial<BlogArticle>): Promise<BlogArticle> {
  const articles = getBlogArticles();
  const normalized = normalizeArticle(articleData);
  normalized.updatedAt = new Date().toISOString();

  const existingIndex = articles.findIndex(
    (a) => a.slug === normalized.slug || (normalized.id && a.id === normalized.id)
  );

  let updatedList: BlogArticle[];
  if (existingIndex >= 0) {
    updatedList = [...articles];
    updatedList[existingIndex] = {
      ...updatedList[existingIndex],
      ...normalized,
    };
  } else {
    updatedList = [normalized, ...articles];
  }

  saveBlogArticlesLocally(updatedList);

  // Jika Supabase terkonfigurasi, sinkronkan ke cloud di latar belakang
  if (isSupabaseConfigured()) {
    pushBlogArticleToSupabase(normalized).catch((err) => {
      console.warn('Gagal sync artikel ke Supabase:', err);
    });
  }

  return normalized;
}

/**
 * Menghapus artikel berdasarkan slug (Local + Cloud Supabase)
 */
export async function deleteBlogArticle(slug: string): Promise<boolean> {
  const articles = getBlogArticles();
  const target = articles.find((a) => a.slug === slug);
  if (!target) return false;

  const filtered = articles.filter((a) => a.slug !== slug);
  saveBlogArticlesLocally(filtered);

  if (isSupabaseConfigured()) {
    deleteBlogArticleFromSupabase(target.id || slug).catch((err) => {
      console.warn('Gagal menghapus artikel dari Supabase:', err);
    });
  }

  return true;
}

/**
 * Mengembalikan artikel ke data awal bawaan
 */
export function resetBlogArticlesToDefault(): BlogArticle[] {
  const initial = defaultSeedArticles.map((a, i) => normalizeArticle(a, i));
  saveBlogArticlesLocally(initial);
  return initial;
}

/**
 * Mengunggah/Upsert 1 artikel ke tabel Supabase `blog_articles`
 */
export async function pushBlogArticleToSupabase(article: BlogArticle): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;

  const payload = {
    id: article.id || `blog-${article.slug}`,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    cover_image: article.coverImage,
    published_at: article.publishedAt,
    read_time_minutes: article.readTimeMinutes,
    author_name: article.author.name,
    author_role: article.author.role,
    author_avatar: article.author.avatar,
    tags_json: JSON.stringify(article.tags || []),
    content: article.content,
    status: article.status || 'published',
    views_count: article.viewsCount || 0,
    updated_at: new Date().toISOString(),
  };

  const { error } = await client.from('blog_articles').upsert(payload, { onConflict: 'slug' });
  if (error) {
    console.error('Supabase blog_articles upsert error:', error.message);
    throw error;
  }
}

/**
 * Menghapus artikel dari tabel Supabase `blog_articles`
 */
export async function deleteBlogArticleFromSupabase(idOrSlug: string): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;

  const { error } = await client
    .from('blog_articles')
    .delete()
    .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`);

  if (error) {
    console.error('Supabase blog_articles delete error:', error.message);
    throw error;
  }
}

/**
 * Menarik (Pull) seluruh artikel dari Cloud Supabase ke LocalStorage
 */
export async function fetchBlogArticlesFromCloud(): Promise<BlogArticle[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;

  try {
    const { data, error } = await client
      .from('blog_articles')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch blog_articles error:', error.message);
      return null;
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const parsedArticles: BlogArticle[] = data.map((row: any, idx: number) => {
        let tags: string[] = [];
        try {
          const rawTags = row.tags_json ?? row.tags;
          if (rawTags) {
            if (Array.isArray(rawTags)) {
              tags = rawTags.map((t) => String(t).trim()).filter(Boolean);
            } else if (typeof rawTags === 'string') {
              const trimmed = rawTags.trim();
              if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
                const parsedJson = JSON.parse(trimmed);
                if (Array.isArray(parsedJson)) {
                  tags = parsedJson.map((t) => String(t).trim()).filter(Boolean);
                }
              } else {
                tags = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
              }
            }
          }
        } catch {
          tags = [];
        }

        if (tags.length === 0) {
          tags = [row.category || 'Coding Anak', 'Edukasi'];
        }

        return normalizeArticle({
          id: row.id,
          slug: row.slug,
          title: row.title,
          excerpt: row.excerpt,
          category: row.category,
          coverImage: row.cover_image,
          publishedAt: row.published_at,
          readTimeMinutes: row.read_time_minutes,
          author: {
            name: row.author_name || 'Tim Akademik Beekoding',
            role: row.author_role || 'Curriculum & Pedagogy Lead',
            avatar: row.author_avatar || '/bee-mascot.png',
          },
          tags,
          content: row.content,
          status: row.status,
          viewsCount: row.views_count,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }, idx);
      });

      saveBlogArticlesLocally(parsedArticles);
      return parsedArticles;
    }
  } catch (err) {
    console.error('Exception fetching blog articles from Supabase:', err);
  }

  return null;
}
