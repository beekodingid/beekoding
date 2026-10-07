interface Env {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

interface ArticleRow {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  published_at?: string;
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
    const queryUrl = `${supabaseUrl}/rest/v1/blog_articles?select=slug,title,excerpt,category,published_at&status=eq.published&order=published_at.desc`;
    const resp = await fetch(queryUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
      },
      cf: {
        cacheTtl: 300,
        cacheEverything: true,
      },
    });

    if (!resp.ok) {
      return context.next();
    }

    const liveArticles: ArticleRow[] = await resp.json();
    if (!Array.isArray(liveArticles) || liveArticles.length === 0) {
      return context.next();
    }

    const domain = 'https://beekoding.pages.dev';
    const nowRfc822 = new Date().toUTCString();

    let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Beekoding Blog Edukasi Coding &amp; AI</title>
    <link>${domain}/blog</link>
    <description>Panduan dan wawasan koding anak, Artificial Intelligence, dan parenting digital masa depan.</description>
    <language>id-ID</language>
    <lastBuildDate>${nowRfc822}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml"/>
`;

    for (const art of liveArticles) {
      if (!art.slug) continue;
      const pubDate = new Date(art.published_at || Date.now()).toUTCString();
      rss += `
    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${domain}/blog/${art.slug}</link>
      <guid>${domain}/blog/${art.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(art.excerpt || '')}</description>
      <category>${escapeXml(art.category || 'Coding Anak')}</category>
    </item>`;
    }

    rss += `
  </channel>
</rss>\n`;

    return new Response(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
        'X-RSS-Source': 'Cloudflare-Edge-Live-Supabase',
      },
    });
  } catch (err) {
    return context.next();
  }
};
