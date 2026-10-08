import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const indexPath = path.join(distDir, 'index.html');
const blogArticlesPath = path.join(rootDir, 'src', 'data', 'blogArticles.ts');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://nmsfffkwpikiokycfdml.supabase.co';
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tc2ZmZmt3cGlraW9reWNmZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5NTcxMjEsImV4cCI6MjEwNTUzMzEyMX0.WU5hZIdTj0wAzp6zQ_voqAgizgqXCIVgGVHu56MtMUg';

if (!fs.existsSync(indexPath)) {
  console.error('[prerender-blog] Error: dist/index.html not found! Run vite build first.');
  process.exit(1);
}

if (!fs.existsSync(blogArticlesPath)) {
  console.error('[prerender-blog] Error: src/data/blogArticles.ts not found!');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexPath, 'utf-8');
const tsContent = fs.readFileSync(blogArticlesPath, 'utf-8');

async function main() {
  // 1. Parse articles from static file blogArticles.ts
  const articles = [];
  const blocks = tsContent.split(/\{\s*slug:\s*'/);
  for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const slug = b.match(/^([^']+)'/)?.[1];
    const title = b.match(/title:\s*'([^']+)'/)?.[1];
    const excerpt = b.match(/excerpt:\s*'([^']+)'/)?.[1];
    const coverImage = b.match(/coverImage:\s*'([^']+)'/)?.[1];
    const publishedAt = b.match(/publishedAt:\s*'([^']+)'/)?.[1] || new Date().toISOString().split('T')[0];
    const category = b.match(/category:\s*'([^']+)'/)?.[1] || 'Coding Anak';

    if (slug && title && coverImage) {
      articles.push({
        slug,
        title,
        excerpt: excerpt || '',
        coverImage,
        publishedAt,
        category,
      });
    }
  }

  // 2. Fetch published articles from Supabase REST API (for newly created articles)
  try {
    const sbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_articles?select=slug,title,excerpt,cover_image,published_at,category&status=eq.published`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Accept: 'application/json',
        },
      }
    );

    if (sbRes.ok) {
      const sbData = await sbRes.json();
      if (Array.isArray(sbData)) {
        const existingSlugs = new Set(articles.map((a) => a.slug));
        for (const item of sbData) {
          if (!item.slug) continue;
          if (!existingSlugs.has(item.slug)) {
            articles.push({
              slug: item.slug,
              title: item.title,
              excerpt: item.excerpt || item.title || '',
              coverImage:
                item.cover_image ||
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
              publishedAt: item.published_at ? item.published_at.split('T')[0] : new Date().toISOString().split('T')[0],
              category: item.category || 'Coding Anak',
            });
            existingSlugs.add(item.slug);
          } else {
            // Update cover image if Supabase has a newer version
            const found = articles.find((a) => a.slug === item.slug);
            if (found && item.cover_image) {
              found.coverImage = item.cover_image;
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('[prerender-blog] Notice: Unable to connect to Supabase at build time, using static data.');
  }

  // 3. Ensure dist/blog directory exists
  const blogDir = path.join(distDir, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Generate dist/blog/index.html (list view)
  const blogListHtml = baseHtml
    .replace(/<title>.*?<\/title>/, '<title>Blog Edukasi Coding & AI Anak | Beekoding</title>')
    .replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="Blog Edukasi Coding & AI Anak | Beekoding"')
    .replace(/<meta name="twitter:title" content="[^"]*"/, '<meta name="twitter:title" content="Blog Edukasi Coding & AI Anak | Beekoding"')
    .replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="https://beekoding.pages.dev/blog"')
    .replace(/<meta name="twitter:url" content="[^"]*"/, '<meta name="twitter:url" content="https://beekoding.pages.dev/blog"');
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogListHtml, 'utf-8');

  // =========================================================================
  // 3b. PRERENDER PROGRAMMATIC SEO LANDING PAGES PER JENJANG USIA
  // =========================================================================
  const seoLandingPages = [
    {
      slug: 'kursus-coding-anak-sd',
      title: 'Kursus Coding Anak SD (Usia 6-10 Thn) | Belajar Scratch & AI Seru Beekoding',
      description: 'Les coding anak SD terbaik di Indonesia. Metode belajar visual Scratch 3.0, game dev interaktif, & logika AI ramah anak bersama mentor sabar. Coba Free Trial Class sekarang!',
      keywords: 'kursus coding anak sd, les coding anak sd, belajar scratch anak pemula, kursus logika anak 6 7 8 9 10 tahun, les koding terdekat, biaya les coding anak sd',
      url: 'https://beekoding.pages.dev/kursus-coding-anak-sd',
      courseName: 'Kursus Coding Anak SD (Usia 6-10 Thn) - Scratch & AI Logic Beekoding',
      courseDesc: 'Program belajar coding visual Scratch 3.0, animasi cerita, dan logika game interaktif untuk anak SD usia 6-10 tahun.',
    },
    {
      slug: 'kursus-python-remaja-smp-sma',
      title: 'Kursus Python & AI Remaja SMP-SMA (Usia 11-17 Thn) | Portofolio & Olimpiade Beekoding',
      description: 'Kursus coding Python, AI Machine Learning, Roblox Lua & Web Dev untuk remaja SMP & SMA. Bangun portofolio nyata, persiapan olimpiade informatika (OSN), & beasiswa!',
      keywords: 'kursus python remaja, les coding smp sma, belajar ai untuk anak remaja, kursus roblox lua, les programming anak smp, persiapan olimpiade informatika, kurikulum python pemula',
      url: 'https://beekoding.pages.dev/kursus-python-remaja-smp-sma',
      courseName: 'Kursus Python & AI Remaja SMP-SMA (Usia 11-17 Thn) - Beekoding',
      courseDesc: 'Kursus coding Python profesional, game 3D Roblox Studio, Artificial Intelligence, dan web fullstack untuk remaja SMP & SMA.',
    },
  ];

  for (const landing of seoLandingPages) {
    const landingDir = path.join(distDir, landing.slug);
    if (!fs.existsSync(landingDir)) {
      fs.mkdirSync(landingDir, { recursive: true });
    }

    const courseJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: landing.courseName,
      description: landing.courseDesc,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Beekoding',
        url: 'https://beekoding.id',
        sameAs: 'https://beekoding.id',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '384',
        reviewCount: '384',
      },
    });

    const breadcrumbJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: 'https://beekoding.pages.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: landing.title,
          item: landing.url,
        },
      ],
    });

    const landingSchemasTag = `\n    <!-- Programmatic SEO Landing Structured Data -->\n    <script type="application/ld+json">\n    ${courseJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${breadcrumbJsonLd}\n    </script>\n  </head>`;

    let landingHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${landing.title}</title>`)
      .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${landing.url}" />`)
      .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${landing.description}" />`)
      .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${landing.keywords}" />`)
      .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${landing.title}" />`)
      .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${landing.description}" />`)
      .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${landing.url}" />`)
      .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${landing.title}" />`)
      .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${landing.description}" />`)
      .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${landing.url}" />`)
      .replace('</head>', landingSchemasTag);

    fs.writeFileSync(path.join(landingDir, 'index.html'), landingHtml, 'utf-8');
    fs.writeFileSync(path.join(distDir, `${landing.slug}.html`), landingHtml, 'utf-8');
  }

  console.log(`[prerender-blog] Successfully prerendered ${seoLandingPages.length} Programmatic SEO landing pages!`);

  // =========================================================================
  // 3c. PRERENDER GLOSARIUM / KAMUS KODING & AI
  // =========================================================================
  const glossaryDir = path.join(distDir, 'glosarium');
  if (!fs.existsSync(glossaryDir)) {
    fs.mkdirSync(glossaryDir, { recursive: true });
  }

  const glossaryTitle = 'Kamus Istilah Koding & AI untuk Anak & Pemula | Glosarium Beekoding';
  const glossaryDesc = 'Kamus istilah coding & AI ramah anak terlengkap di Indonesia. Pahami apa itu algoritma, loop, variabel, machine learning, dan prompt engineering dengan analogi seru dunia nyata.';
  const glossaryKeywords = 'kamus koding anak, glosarium coding, apa itu algoritma, apa itu loop koding, apa itu machine learning, kamus istilah ai, coding untuk pemula indonesia';
  const glossaryUrl = 'https://beekoding.pages.dev/glosarium';

  const glossaryDefinedTermSetJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Kamus Istilah Koding & AI Anak Beekoding',
    description: glossaryDesc,
    url: glossaryUrl,
    hasDefinedTerm: [
      {
        '@type': 'DefinedTerm',
        name: 'Algoritma',
        description: 'Urutan instruksi langkah demi langkah yang teratur dan logis untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Loop (Perulangan)',
        description: 'Perintah dalam koding untuk mengulang suatu tindakan berkali-kali secara otomatis tanpa perlu menulis ulang kodenya.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Variabel',
        description: 'Kotak penyimpanan khusus di dalam memori komputer yang diberi nama untuk menyimpan dan mengubah suatu nilai atau data.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Debugging',
        description: 'Proses menyelidiki, menemukan, dan memperbaiki kesalahan (bug) pada baris kode program agar aplikasi berjalan normal kembali.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Machine Learning',
        description: 'Cabang dari AI di mana komputer belajar sendiri mengenali pola dari ribuan contoh data tanpa perlu diprogram manual.',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Prompt Engineering',
        description: 'Keterampilan menyusun kalimat instruksi (prompt) yang jelas dan terstruktur agar AI menghasilkan jawaban yang paling tepat.',
      },
    ],
  });

  const glossaryBreadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://beekoding.pages.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kamus Istilah Koding & AI',
        item: glossaryUrl,
      },
    ],
  });

  const glossarySchemasTag = `\n    <!-- Glosarium Structured Data for Google Featured Snippets -->\n    <script type="application/ld+json">\n    ${glossaryDefinedTermSetJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${glossaryBreadcrumbJsonLd}\n    </script>\n  </head>`;

  let glossaryHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${glossaryTitle}</title>`)
    .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${glossaryUrl}" />`)
    .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${glossaryDesc}" />`)
    .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${glossaryKeywords}" />`)
    .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${glossaryTitle}" />`)
    .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${glossaryDesc}" />`)
    .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${glossaryUrl}" />`)
    .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${glossaryTitle}" />`)
    .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${glossaryDesc}" />`)
    .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${glossaryUrl}" />`)
    .replace('</head>', glossarySchemasTag);

  fs.writeFileSync(path.join(glossaryDir, 'index.html'), glossaryHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'glosarium.html'), glossaryHtml, 'utf-8');
  console.log(`[prerender-blog] Successfully prerendered Glosarium SEO page!`);

  // =========================================================================
  // 3d. PRERENDER LEAD MAGNET: KUIS MINAT KODING ANAK (VIRAL WHATSAPP)
  // =========================================================================
  const quizDir = path.join(distDir, 'cek-minat-anak');
  if (!fs.existsSync(quizDir)) {
    fs.mkdirSync(quizDir, { recursive: true });
  }

  const quizAltDir = path.join(distDir, 'kuis-minat');
  if (!fs.existsSync(quizAltDir)) {
    fs.mkdirSync(quizAltDir, { recursive: true });
  }

  const quizTitle = 'Kuis Minat & Bakat Coding Anak (1 Menit) | Temukan Potensi Digital Buah Hati';
  const quizDesc = 'Apakah anak Anda tipe The Game Creator, Logic Sleuth, Web Designer, atau AI Builder? Ikuti kuis 1 menit gratis untuk mengetahui gaya belajar dan rekomendasi kurikulum koding terbaik ananda.';
  const quizKeywords = 'kuis minat coding anak, tes bakat logika anak, tes potensi koding, arketipe digital anak, belajar coding anak pemula, kursus scratch beekoding, kursus python remaja';
  const quizUrl = 'https://beekoding.pages.dev/cek-minat-anak';

  const quizJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Kuis Minat & Bakat Coding Anak (1 Menit) - Beekoding',
    description: quizDesc,
    educationalLevel: 'Beginner / Kids & Teens',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Beekoding',
      url: 'https://beekoding.id',
    },
    about: {
      '@type': 'Thing',
      name: 'Kecerdasan Digital & Pemrograman Anak',
    },
  });

  const quizBreadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: 'https://beekoding.pages.dev',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kuis Minat Koding Anak',
        item: quizUrl,
      },
    ],
  });

  const quizSchemasTag = `\n    <!-- Quiz Structured Data for Social & Search Snippets -->\n    <script type="application/ld+json">\n    ${quizJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${quizBreadcrumbJsonLd}\n    </script>\n  </head>`;

  let quizHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${quizTitle}</title>`)
    .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${quizUrl}" />`)
    .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${quizDesc}" />`)
    .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${quizKeywords}" />`)
    .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${quizTitle}" />`)
    .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${quizDesc}" />`)
    .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${quizUrl}" />`)
    .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${quizTitle}" />`)
    .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${quizDesc}" />`)
    .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${quizUrl}" />`)
    .replace('</head>', quizSchemasTag);

  fs.writeFileSync(path.join(quizDir, 'index.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(quizAltDir, 'index.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'cek-minat-anak.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'kuis-minat.html'), quizHtml, 'utf-8');
  console.log(`[prerender-blog] Successfully prerendered Lead Magnet Quiz SEO page!`);

  // 4. Prerender each article static directory and index.html
  for (const article of articles) {
    const articleDir = path.join(blogDir, article.slug);
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

    const title = `${article.title} | Blog Beekoding`;
    const desc = article.excerpt.replace(/"/g, '&quot;');
    const url = `https://beekoding.pages.dev/blog/${article.slug}`;
    let image = article.coverImage;
    if (image.startsWith('/')) {
      image = `https://beekoding.pages.dev${image}`;
    }

    let imageType = 'image/jpeg';
    if (image.toLowerCase().includes('.png')) {
      imageType = 'image/png';
    } else if (image.toLowerCase().includes('.webp')) {
      imageType = 'image/webp';
    }

    let articleHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${url}" />`)
      .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${desc}" />`)
      .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`)
      .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${url}" />`)
      .replace(/<meta[^>]*?property="og:image"[^>]*?>/s, `<meta property="og:image" content="${image}" />`)
      .replace(/<meta[^>]*?property="og:image:secure_url"[^>]*?>/s, `<meta property="og:image:secure_url" content="${image}" />`)
      .replace(/<meta[^>]*?property="og:image:type"[^>]*?>/s, `<meta property="og:image:type" content="${imageType}" />`)
      .replace(/<meta[^>]*?property="og:image:alt"[^>]*?>/s, `<meta property="og:image:alt" content="${title.replace(/"/g, '&quot;')}" />`)
      .replace(/<meta[^>]*?property="og:type"[^>]*?>/s, '<meta property="og:type" content="article" />')
      .replace(/<link[^>]*?rel="image_src"[^>]*?>/s, `<link rel="image_src" href="${image}" />`)
      .replace(/<meta[^>]*?itemprop="image"[^>]*?>/s, `<meta itemprop="image" content="${image}" />`)
      .replace(/<meta[^>]*?name="twitter:card"[^>]*?>/s, '<meta name="twitter:card" content="summary_large_image" />')
      .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`)
      .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${desc}" />`)
      .replace(/<meta[^>]*?name="twitter:image"[^>]*?>/s, `<meta name="twitter:image" content="${image}" />`)
      .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${url}" />`);

    const articleJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      image: [image],
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      inLanguage: 'id-ID',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      author: {
        '@type': 'Person',
        name: 'Mentor Beekoding',
      },
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Beekoding',
        url: 'https://beekoding.id',
        logo: {
          '@type': 'ImageObject',
          url: 'https://beekoding.pages.dev/og-image.jpg',
        },
      },
      articleSection: article.category,
    });

    const breadcrumbJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: 'https://beekoding.pages.dev',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog Edukasi',
          item: 'https://beekoding.pages.dev/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: url,
        },
      ],
    });

    const schemasTag = `\n    <!-- Article & Breadcrumb Structured Data for Google Rich Results -->\n    <script type="application/ld+json">\n    ${articleJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${breadcrumbJsonLd}\n    </script>\n  </head>`;

    articleHtml = articleHtml.replace('</head>', schemasTag);

    // Write both dist/blog/:slug/index.html and dist/blog/:slug.html for Cloudflare Pages Clean URLs
    fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml, 'utf-8');
    fs.writeFileSync(path.join(blogDir, `${article.slug}.html`), articleHtml, 'utf-8');
  }

  console.log(`[prerender-blog] Successfully prerendered ${articles.length} blog articles with accurate OpenGraph metadata!`);

  // =========================================================================
  // 5. AUTOMATIC SITEMAP.XML & RSS.XML GENERATOR
  // =========================================================================

  function escapeXml(unsafe) {
    return String(unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function generateSitemapXml(articlesList) {
    const today = new Date().toISOString().split('T')[0];
    const domain = 'https://beekoding.pages.dev';

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

  <!-- Programmatic SEO Landing: Kursus Coding Anak SD (Usia 6-10 Thn) -->
  <url>
    <loc>${domain}/kursus-coding-anak-sd</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Kursus Coding Anak SD (Usia 6-10 Thn) Beekoding</image:title>
      <image:caption>Belajar Scratch 3.0, game visual, dan logika komputasi seru untuk anak SD.</image:caption>
    </image:image>
  </url>

  <!-- Programmatic SEO Landing: Kursus Python & AI Remaja SMP-SMA (Usia 11-17 Thn) -->
  <url>
    <loc>${domain}/kursus-python-remaja-smp-sma</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Kursus Python &amp; AI Remaja SMP-SMA (Usia 11-17 Thn) Beekoding</image:title>
      <image:caption>Belajar Python, Roblox Lua, AI Machine Learning, dan portofolio teknologi remaja.</image:caption>
    </image:image>
  <!-- Programmatic SEO: Kamus & Glosarium Koding Anak -->
  <url>
    <loc>${domain}/glosarium</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Kamus Istilah Koding &amp; AI Anak Beekoding</image:title>
      <image:caption>Kamus istilah coding dan artificial intelligence ramah anak terlengkap di Indonesia.</image:caption>
    </image:image>
  </url>
  <!-- Lead Magnet: Kuis Minat & Bakat Coding Anak -->
  <url>
    <loc>${domain}/cek-minat-anak</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Kuis Minat &amp; Bakat Coding Anak (1 Menit) Beekoding</image:title>
      <image:caption>Temukan potensi digital buah hati: The Game Creator, Logic Sleuth, Web Designer, atau AI Builder.</image:caption>
    </image:image>
  </url>
`;

    for (const article of articlesList) {
      const lastmod = article.publishedAt || today;
      const coverLoc = article.coverImage.startsWith('http')
        ? article.coverImage
        : `${domain}${article.coverImage.startsWith('/') ? '' : '/'}${article.coverImage}`;

      xml += `
  <url>
    <loc>${domain}/blog/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${escapeXml(coverLoc)}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
      <image:caption>${escapeXml(article.excerpt || article.title)}</image:caption>
    </image:image>
  </url>`;
    }

    xml += `\n</urlset>\n`;
    return xml;
  }

  function generateRssXml(articlesList) {
    const nowRfc822 = new Date().toUTCString();
    const domain = 'https://beekoding.pages.dev';

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

    for (const article of articlesList) {
      const pubDate = new Date(article.publishedAt || Date.now()).toUTCString();
      rss += `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${domain}/blog/${article.slug}</link>
      <guid>${domain}/blog/${article.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.excerpt || '')}</description>
      <category>${escapeXml(article.category || 'Coding Anak')}</category>
    </item>`;
    }

    rss += `
  </channel>
</rss>\n`;
    return rss;
  }

  const sitemapContent = generateSitemapXml(articles);
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent, 'utf-8');
  console.log(`[prerender-blog] Successfully auto-generated sitemap.xml with ${articles.length} articles!`);

  const rssContent = generateRssXml(articles);
  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssContent, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'rss.xml'), rssContent, 'utf-8');
  console.log(`[prerender-blog] Successfully auto-generated rss.xml RSS 2.0 Feed!`);
}

main().catch((err) => {
  console.error('[prerender-blog] Unexpected error:', err);
  process.exit(1);
});
