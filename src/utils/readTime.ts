/**
 * Utility untuk menghitung jumlah kata dan estimasi waktu membaca (WPM)
 * Standar kecepatan membaca online & edukasi: 180 - 200 WPM (kata per menit)
 */

export const DEFAULT_WPM = 180;

/**
 * Menghitung jumlah kata bersih dari teks Markdown / Plaintext
 */
export function countWords(content: string): number {
  if (!content || typeof content !== 'string') return 0;

  // 1. Bersihkan blok kode (```...```) dan inline code (`...`)
  let clean = content.replace(/```[\s\S]*?```/g, ' ');
  clean = clean.replace(/`[^`]*?`/g, ' ');

  // 2. Bersihkan gambar (![alt](url)) dan link ([text](url)) - tetap pertahankan teks deskripsinya
  clean = clean.replace(/!\[.*?\]\(.*?\)/g, ' ');
  clean = clean.replace(/\[(.*?)\]\(.*?\)/g, '$1');

  // 3. Bersihkan tag HTML
  clean = clean.replace(/<[^>]*>/g, ' ');

  // 4. Bersihkan karakter format markdown
  clean = clean.replace(/[#*_>~+=|\\-]/g, ' ');

  // 5. Ekstrak kata-kata alfanumerik (mendukung huruf Unicode/Latin dan angka)
  const matches = clean.match(/[\p{L}\p{N}]+/gu);
  return matches ? matches.length : 0;
}

/**
 * Menghitung estimasi waktu membaca artikel dalam menit berdasarkan WPM.
 * Minimal 1 menit jika artikel memiliki kata.
 */
export function calculateReadTime(content: string, wpm: number = DEFAULT_WPM): number {
  const words = countWords(content);
  if (words === 0) return 1;
  const minutes = Math.ceil(words / wpm);
  return Math.max(1, minutes);
}

/**
 * Format string waktu baca (contoh: "4 menit baca")
 */
export function formatReadTime(minutes: number): string {
  const safeMinutes = Math.max(1, Math.round(minutes) || 1);
  return `${safeMinutes} menit baca`;
}

/**
 * Mengambil waktu baca artikel secara aman (mengutamakan kalkulasi konten Markdown jika ada)
 */
export function getArticleReadTime(article: { content?: string; readTimeMinutes?: number } | null | undefined): number {
  if (!article) return 1;
  return article.content ? calculateReadTime(article.content) : (article.readTimeMinutes || 1);
}

