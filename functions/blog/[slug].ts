import { blogArticles } from '../../src/data/blogArticles';

interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

interface ArticleData {
  title: string;
  excerpt: string;
  coverImage: string;
}

export const onRequestGet = async (context: {
  request: Request;
  params: { slug: string };
  env: Env;
}): Promise<Response> => {
  const { request, params, env } = context;
  const slug = params.slug;

  let articleData: ArticleData | null = null;

  // 1. Temukan artikel dari data statis lokal terlebih dahulu
  const staticArticle = blogArticles.find((a) => a.slug === slug);
  if (staticArticle) {
    articleData = {
      title: staticArticle.title,
      excerpt: staticArticle.excerpt,
      coverImage: staticArticle.coverImage,
    };
  } else {
    // 2. Jika tidak ditemukan di file statis, ambil secara live dari Supabase REST API
    try {
      const supabaseUrl =
        env.VITE_SUPABASE_URL || 'https://nmsfffkwpikiokycfdml.supabase.co';
      const supabaseKey =
        env.VITE_SUPABASE_ANON_KEY ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tc2ZmZmt3cGlraW9reWNmZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTcxMjEsImV4cCI6MjEwNTUzMzEyMX0.WU5hZIdTj0wAzp6zQ_voqAgizgqXCIVgGVHu56MtMUg';

      const queryUrl = `${supabaseUrl}/rest/v1/blog_articles?slug=eq.${encodeURIComponent(
        slug
      )}&select=title,excerpt,cover_image&limit=1`;

      const sbRes = await fetch(queryUrl, {
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

      if (sbRes.ok) {
        const rows: any[] = await sbRes.json();
        if (Array.isArray(rows) && rows.length > 0) {
          const row = rows[0];
          articleData = {
            title: row.title || 'Artikel Edukasi Beekoding',
            excerpt: row.excerpt || row.title || '',
            coverImage:
              row.cover_image ||
              'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
          };
        }
      }
    } catch {
      // Abaikan error jaringan Supabase, akan fallback ke SPA shell
    }
  }

  // Jika tetap tidak ditemukan di statis maupun database, serahkan ke SPA router normal
  if (!articleData) {
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return fetch(request);
  }

  // Ambil respons index.html dasar dari asset
  const baseRes = env.ASSETS
    ? await env.ASSETS.fetch(new URL('/', request.url))
    : await fetch(new URL('/', request.url));

  const url = new URL(request.url);
  const pageTitle = `${articleData.title} | Blog Beekoding`;
  const pageUrl = `${url.origin}/blog/${slug}`;
  let coverUrl = articleData.coverImage;

  // Pastikan URL gambar adalah absolute URL
  if (coverUrl.startsWith('/')) {
    coverUrl = `${url.origin}${coverUrl}`;
  } else if (!coverUrl.startsWith('http')) {
    coverUrl = `${url.origin}/${coverUrl}`;
  }

  // Deteksi MIME type gambar untuk tag OpenGraph
  let imageType = 'image/jpeg';
  if (coverUrl.toLowerCase().includes('.png')) {
    imageType = 'image/png';
  } else if (coverUrl.toLowerCase().includes('.webp')) {
    imageType = 'image/webp';
  }

  const desc = articleData.excerpt;

  if (typeof HTMLRewriter === 'undefined') {
    return baseRes;
  }

  return new HTMLRewriter()
    .on('title', {
      element(e) {
        e.setInnerContent(pageTitle);
      },
    })
    .on('link[rel="canonical"]', {
      element(e) {
        e.setAttribute('href', pageUrl);
      },
    })
    .on('meta[name="description"]', {
      element(e) {
        e.setAttribute('content', desc);
      },
    })
    .on('meta[property="og:title"]', {
      element(e) {
        e.setAttribute('content', pageTitle);
      },
    })
    .on('meta[property="og:description"]', {
      element(e) {
        e.setAttribute('content', desc);
      },
    })
    .on('meta[property="og:image"]', {
      element(e) {
        e.setAttribute('content', coverUrl);
      },
    })
    .on('meta[property="og:image:secure_url"]', {
      element(e) {
        e.setAttribute('content', coverUrl);
      },
    })
    .on('meta[property="og:image:type"]', {
      element(e) {
        e.setAttribute('content', imageType);
      },
    })
    .on('meta[property="og:image:alt"]', {
      element(e) {
        e.setAttribute('content', articleData.title);
      },
    })
    .on('meta[property="og:url"]', {
      element(e) {
        e.setAttribute('content', pageUrl);
      },
    })
    .on('meta[property="og:type"]', {
      element(e) {
        e.setAttribute('content', 'article');
      },
    })
    .on('meta[name="twitter:card"]', {
      element(e) {
        e.setAttribute('content', 'summary_large_image');
      },
    })
    .on('meta[name="twitter:title"]', {
      element(e) {
        e.setAttribute('content', pageTitle);
      },
    })
    .on('meta[name="twitter:description"]', {
      element(e) {
        e.setAttribute('content', desc);
      },
    })
    .on('meta[name="twitter:image"]', {
      element(e) {
        e.setAttribute('content', coverUrl);
      },
    })
    .on('meta[name="twitter:url"]', {
      element(e) {
        e.setAttribute('content', pageUrl);
      },
    })
    .on('link[rel="image_src"]', {
      element(e) {
        e.setAttribute('href', coverUrl);
      },
    })
    .on('meta[itemprop="image"]', {
      element(e) {
        e.setAttribute('content', coverUrl);
      },
    })
    .transform(baseRes);
};
