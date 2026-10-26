interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

interface ArticleRow {
  slug: string;
  title: string;
  excerpt?: string;
  cover_image?: string;
  published_at?: string;
  updated_at?: string;
}

function escapeXml(unsafe: unknown): string {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const supabaseUrl = context.env.VITE_SUPABASE_URL || 'https://nmsfffkwpikiokycfdml.supabase.co';
  const supabaseKey = context.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tc2ZmZmt3cGlraW9reWNmZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTcxMjEsImV4cCI6MjEwNTUzMzEyMX0.WU5hZIdTj0wAzp6zQ_voqAgizgqXCIVgGVHu56MtMUg';

  try {
    // Ambil seluruh artikel yang berstatus published dari Supabase secara live
    const queryUrl = `${supabaseUrl}/rest/v1/blog_articles?select=slug,title,excerpt,cover_image,published_at,updated_at&status=eq.published&order=published_at.desc`;
    const resp = await fetch(queryUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
      },
      cf: {
        cacheTtl: 300, // Cache di Cloudflare Edge selama 5 menit
        cacheEverything: true,
      },
    });

    if (!resp.ok) {
      // Jika Supabase gagal, fallback ke static sitemap.xml hasil build
      return context.next();
    }

    const liveArticles: ArticleRow[] = await resp.json();
    if (!Array.isArray(liveArticles) || liveArticles.length === 0) {
      return context.next();
    }

    const originUrl = new URL(context.request.url);
    const domain = originUrl.origin.includes('localhost') ? 'https://beekoding.my.id' : originUrl.origin;
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Homepage -->
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Beekoding - Coding and AI Learning for Future-Ready Minds</image:title>
      <image:caption>Platform edukasi Koding dan Artificial Intelligence interaktif untuk anak dan remaja.</image:caption>
    </image:image>
    <image:image>
      <image:loc>${domain}/bee-mascot.webp</image:loc>
      <image:title>Beekoding Mascot</image:title>
    </image:image>
  </url>

  <!-- Blog Index -->
  <url>
    <loc>${domain}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Programmatic Pricing: Biaya Kursus Resmi -->
  <url>
    <loc>${domain}/biaya-kursus</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

  <!-- Lead Magnet: Printable Logic Worksheets PDF Gratis -->
  <url>
    <loc>${domain}/worksheet-gratis</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Programmatic SEO Landing: Kursus Coding Anak SD -->
  <url>
    <loc>${domain}/kursus-coding-anak-sd</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

  <!-- Programmatic SEO Landing: Kursus Python & AI Remaja SMP-SMA -->
  <url>
    <loc>${domain}/kursus-python-remaja-smp-sma</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
  </url>

  <!-- Programmatic Local SEO: Kota-Kota Indonesia -->
  <url>
    <loc>${domain}/kursus-coding-anak-jakarta</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-surabaya</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-bandung</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-tangerang</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-bekasi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-medan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-semarang</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-yogyakarta</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${domain}/kursus-coding-anak-bali</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Kamus & Glosarium Koding Anak -->
  <url>
    <loc>${domain}/glosarium</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Lead Magnet: Kuis Minat & Bakat Coding Anak -->
  <url>
    <loc>${domain}/cek-minat-anak</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Legal: Kebijakan Privasi (Google AdSense & COPPA Compliance) -->
  <url>
    <loc>${domain}/kebijakan-privasi</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Legal: Syarat & Ketentuan Layanan (Terms of Service) -->
  <url>
    <loc>${domain}/syarat-ketentuan</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Legal: Penafian Resmi (Disclaimer) -->
  <url>
    <loc>${domain}/penafian</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;

    for (const art of liveArticles) {
      if (!art.slug) continue;
      const lastmod = (art.published_at || art.updated_at || today).split('T')[0];
      const coverImage = art.cover_image || `${domain}/og-image.jpg`;
      const coverLoc = coverImage.startsWith('http')
        ? coverImage
        : `${domain}${coverImage.startsWith('/') ? '' : '/'}${coverImage}`;

      xml += `
  <url>
    <loc>${domain}/blog/${art.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(coverLoc)}</image:loc>
      <image:title>${escapeXml(art.title)}</image:title>
      <image:caption>${escapeXml(art.excerpt || art.title)}</image:caption>
    </image:image>
  </url>`;
    }

    xml += `\n</urlset>\n`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
        'X-Sitemap-Source': 'Cloudflare-Edge-Live-Supabase',
      },
    });
  } catch (err) {
    // Fallback otomatis ke static dist/sitemap.xml
    return context.next();
  }
};
