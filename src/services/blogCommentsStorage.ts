import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';
import { emitStorageUpdate, enqueueMessage, getGatewayConfig } from './adminStorage';

export interface BlogComment {
  id: string;
  articleSlug: string;
  authorName: string;
  authorRole: string;
  authorEmail?: string;
  content: string;
  parentId?: string | null;
  isMentor: boolean;
  status: 'approved' | 'pending' | 'spam';
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

const BLOG_COMMENTS_STORAGE_KEY = 'beekoding_blog_comments_v1';

// Seed initial comments to make the discussion look lively and realistic
const SEED_COMMENTS: BlogComment[] = [
  {
    id: 'comm-scratch-1',
    articleSlug: 'panduan-scratch-coding-anak-usia-6-9-tahun',
    authorName: 'Bunda Rina S.',
    authorRole: 'Orang Tua Murid',
    content: 'Anak saya usia 7 tahun awalnya cepat bosan di depan laptop, tapi setelah mencoba contoh proyek maze di artikel ini dia malah antusias menyusun balok sendiri! Sangat membantu panduannya.',
    isMentor: false,
    status: 'approved',
    likesCount: 5,
    createdAt: '2026-03-23T08:30:00Z',
    updatedAt: '2026-03-23T08:30:00Z',
  },
  {
    id: 'comm-scratch-2',
    articleSlug: 'panduan-scratch-coding-anak-usia-6-9-tahun',
    parentId: 'comm-scratch-1',
    authorName: 'Kak Febri Hasan',
    authorRole: 'Mentor & Curriculum Lead Beekoding',
    content: 'Wah, senang sekali mendengarnya Bunda Rina! Di usia 7 tahun, yang terpenting adalah memupuk rasa "aku bisa bikin karya sendiri". Jika ananda ingin mencoba level tantangan berikutnya dengan timer atau skor game, jangan ragu ikut sesi Free Trial Class kami ya Bunda.',
    isMentor: true,
    status: 'approved',
    likesCount: 3,
    createdAt: '2026-03-23T09:15:00Z',
    updatedAt: '2026-03-23T09:15:00Z',
  },
  {
    id: 'comm-python-1',
    articleSlug: 'python-vs-scratch-kapan-anak-siap-koding-teks',
    authorName: 'Pak Hendra Pratama',
    authorRole: 'Wali Murid',
    content: 'Artikel yang sangat objektif. Tadinya saya mau langsung kursuskan anak saya Python di usia 8 tahun, untung baca artikel ini dulu jadi paham kalau fondasi visual block Scratch lebih tepat untuk usia dini.',
    isMentor: false,
    status: 'approved',
    likesCount: 4,
    createdAt: '2026-03-29T10:00:00Z',
    updatedAt: '2026-03-29T10:00:00Z',
  },
];

/**
 * Normalisasi data komentar dari Supabase atau storage lokal
 */
function normalizeComment(c: any): BlogComment {
  return {
    id: String(c.id || `comm-${Date.now()}`),
    articleSlug: String(c.articleSlug || c.article_slug || ''),
    authorName: String(c.authorName || c.author_name || 'Pembaca Anonim'),
    authorRole: String(c.authorRole || c.author_role || (c.is_mentor || c.isMentor ? 'Mentor Beekoding' : 'Orang Tua / Siswa')),
    authorEmail: c.authorEmail || c.author_email || '',
    content: String(c.content || ''),
    parentId: c.parentId || c.parent_id || null,
    isMentor: Boolean(c.isMentor || c.is_mentor),
    status: (c.status as any) || 'approved',
    likesCount: Number(c.likesCount || c.likes_count) || 0,
    createdAt: c.createdAt || c.created_at || new Date().toISOString(),
    updatedAt: c.updatedAt || c.updated_at || new Date().toISOString(),
  };
}

/**
 * Mengambil seluruh komentar dari local cache
 */
export function getAllComments(): BlogComment[] {
  if (typeof window === 'undefined') return SEED_COMMENTS;
  try {
    const raw = localStorage.getItem(BLOG_COMMENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeComment);
      }
    }
  } catch (err) {
    console.warn('Gagal membaca komentar dari localStorage:', err);
  }

  saveCommentsLocally(SEED_COMMENTS);
  return SEED_COMMENTS;
}

/**
 * Menyimpan seluruh komentar ke local cache
 */
export function saveCommentsLocally(comments: BlogComment[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(BLOG_COMMENTS_STORAGE_KEY, JSON.stringify(comments));
    emitStorageUpdate('blog');
  } catch (err) {
    console.error('Gagal menyimpan komentar ke localStorage:', err);
  }
}

/**
 * Mengambil komentar yang disetujui untuk artikel tertentu
 */
export function getCommentsForArticle(articleSlug: string): BlogComment[] {
  const all = getAllComments();
  return all.filter((c) => c.articleSlug === articleSlug && c.status === 'approved');
}

/**
 * Menambahkan komentar atau pertanyaan baru (Local + Supabase Sync)
 */
export async function addComment(data: {
  articleSlug: string;
  authorName: string;
  content: string;
  authorEmail?: string;
  authorRole?: string;
  parentId?: string | null;
  isMentor?: boolean;
}): Promise<BlogComment> {
  const current = getAllComments();
  const id = `comm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const now = new Date().toISOString();

  const newComment: BlogComment = {
    id,
    articleSlug: data.articleSlug,
    authorName: data.authorName.trim(),
    authorRole: data.authorRole || (data.isMentor ? 'Mentor Beekoding' : 'Orang Tua / Pembaca'),
    authorEmail: data.authorEmail?.trim() || '',
    content: data.content.trim(),
    parentId: data.parentId || null,
    isMentor: Boolean(data.isMentor),
    status: 'approved', // Langsung tampil approved untuk pengalaman responsif
    likesCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  const updated = [newComment, ...current];
  saveCommentsLocally(updated);

  // Sync ke Supabase di background
  if (isSupabaseConfigured()) {
    pushCommentToSupabase(newComment).catch((err) => {
      console.warn('Gagal sync komentar ke Supabase:', err);
    });
  }

  // Trigger otomatis alert ke antrean WhatsApp Gateway Beekoding
  if (!data.isMentor) {
    try {
      const config = getGatewayConfig();
      if (config.isAutomationActive && config.autoTriggers?.blog_comment_alert !== false) {
        const mentorHotline = config.deviceNumber || '+62 818-1890-1737';
        const cleanPhone = mentorHotline.replace(/[^\d+]/g, '');
        const previewText =
          data.content.trim().length > 180
            ? `${data.content.trim().substring(0, 180)}...`
            : data.content.trim();

        enqueueMessage({
          recipientPhone: cleanPhone,
          recipientName: 'Tim Mentor & Hotline Beekoding',
          recipientRole: 'instructor',
          triggerType: 'blog_comment_alert',
          scheduledAt: new Date().toISOString(),
          content: `🐝 *[PERTANYAAN BLOG BARU]*\n\nHalo Mentor Beekoding! Ada pertanyaan baru di artikel blog edukasi:\n\n👤 *Penanya:* ${data.authorName.trim()} (${newComment.authorRole})\n📖 *Artikel:* /blog/${data.articleSlug}\n💬 *Pertanyaan:* "${previewText}"\n\n👉 *Moderasi & Balas di Admin Blog:* https://beekoding.id/#admin`,
        });
      }
    } catch (err) {
      console.debug('Gagal enqueue WhatsApp comment alert:', err);
    }
  }

  return newComment;
}

/**
 * Buat link cepat untuk meneruskan pertanyaan blog langsung ke WhatsApp Hotline Beekoding
 */
export function generateWhatsAppCommentForwardUrl(comment: {
  authorName: string;
  articleSlug: string;
  content: string;
  authorEmail?: string;
}): string {
  const hotline = '6281818901737';
  const text = `Halo Mentor Beekoding! 🐝\n\nSaya ingin menanyakan seputar artikel blog:\n*https://beekoding.id/blog/${comment.articleSlug}*\n\n*Nama:* ${comment.authorName}\n*Pertanyaan:* "${comment.content}"\n\nMohon panduannya ya Kak! Terima kasih.`;
  return `https://wa.me/${hotline}?text=${encodeURIComponent(text)}`;
}

/**
 * Menyukai komentar (upvote like)
 */
export function toggleCommentLike(commentId: string): number {
  const current = getAllComments();
  const target = current.find((c) => c.id === commentId);
  if (!target) return 0;

  target.likesCount = (target.likesCount || 0) + 1;
  saveCommentsLocally([...current]);

  if (isSupabaseConfigured()) {
    const client = getSupabaseClient();
    if (client) {
      client
        .from('blog_comments')
        .update({ likes_count: target.likesCount, updated_at: new Date().toISOString() })
        .eq('id', commentId)
        .then();
    }
  }

  return target.likesCount;
}

/**
 * Memperbarui status moderasi komentar (Admin)
 */
export function updateCommentStatus(commentId: string, status: 'approved' | 'pending' | 'spam'): void {
  const current = getAllComments();
  const updated = current.map((c) => (c.id === commentId ? { ...c, status, updatedAt: new Date().toISOString() } : c));
  saveCommentsLocally(updated);

  if (isSupabaseConfigured()) {
    const client = getSupabaseClient();
    if (client) {
      client
        .from('blog_comments')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', commentId)
        .then();
    }
  }
}

/**
 * Menghapus komentar (Admin)
 */
export function deleteComment(commentId: string): void {
  const current = getAllComments();
  const updated = current.filter((c) => c.id !== commentId && c.parentId !== commentId);
  saveCommentsLocally(updated);

  if (isSupabaseConfigured()) {
    const client = getSupabaseClient();
    if (client) {
      client.from('blog_comments').delete().eq('id', commentId).then();
    }
  }
}

/**
 * Kirim/Upsert komentar ke Supabase
 */
export async function pushCommentToSupabase(comment: BlogComment): Promise<void> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return;

  const payload = {
    id: comment.id,
    article_slug: comment.articleSlug,
    author_name: comment.authorName,
    author_role: comment.authorRole,
    author_email: comment.authorEmail || null,
    content: comment.content,
    parent_id: comment.parentId || null,
    is_mentor: comment.isMentor,
    status: comment.status,
    likes_count: comment.likesCount,
    created_at: comment.createdAt,
    updated_at: comment.updatedAt,
  };

  const { error } = await client.from('blog_comments').upsert(payload, { onConflict: 'id' });
  if (error) {
    console.error('Supabase blog_comments upsert error:', error.message);
    throw error;
  }
}

/**
 * Ambil komentar live dari Cloud Supabase
 */
export async function fetchCommentsFromCloud(): Promise<BlogComment[] | null> {
  const client = getSupabaseClient();
  if (!client || !isSupabaseConfigured()) return null;

  try {
    const { data, error } = await client
      .from('blog_comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Gagal fetch komentar dari Supabase:', error.message);
      return null;
    }

    if (data && Array.isArray(data) && data.length > 0) {
      const normalized = data.map(normalizeComment);
      saveCommentsLocally(normalized);
      return normalized;
    }
    return null;
  } catch (err) {
    console.warn('Network error saat fetch komentar:', err);
    return null;
  }
}
