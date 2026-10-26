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
const subpageBaseHtml = baseHtml.replace(/<!-- HOMEPAGE_SCHEMAS_START -->[\s\S]*?<!-- HOMEPAGE_SCHEMAS_END -->\s*/g, '');
const tsContent = fs.readFileSync(blogArticlesPath, 'utf-8');

function replaceNoscript(html, innerSemanticHtml) {
  return html.replace(
    /<noscript>[\s\S]*?<\/noscript>/,
    `<noscript>\n      <!--email_off-->\n      <main style="max-width:960px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.7;">\n${innerSemanticHtml}\n      </main>\n      <!--/email_off-->\n    </noscript>`
  );
}

function markdownToSimpleHtml(md) {
  if (!md) return '';
  return md
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed === '---') return '';
      if (trimmed.startsWith('### ')) {
        return `<h3 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin-top:20px;">${trimmed.slice(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h3>`;
      }
      if (trimmed.startsWith('## ')) {
        return `<h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin-top:28px;">${trimmed.slice(3).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</h2>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        return `<p style="margin:6px 0 6px 16px;">&bull; ${trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
      }
      return `<p style="margin:12px 0;">${trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}</p>`;
    })
    .filter(Boolean)
    .join('\n        ');
}

async function main() {
  // 1. Parse articles from static file blogArticles.ts
  const articles = [];
  const blocks = tsContent.split(/\{\s*slug:\s*['"]/);
  for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const slug = b.match(/^([^'"]+)['"]/)?.[1];
    const title = b.match(/title:\s*['"]([^'"]+)['"]/)?.[1];
    const excerpt = b.match(/excerpt:\s*['"]([^'"]+)['"]/)?.[1];
    const coverImage = b.match(/coverImage:\s*['"]([^'"]+)['"]/)?.[1];
    const publishedAt = b.match(/publishedAt:\s*['"]([^'"]+)['"]/)?.[1] || new Date().toISOString().split('T')[0];
    const category = b.match(/category:\s*['"]([^'"]+)['"]/)?.[1] || 'Coding Anak';
    const rawContent = b.match(/content:\s*`([\s\S]*?)`\s*,?\s*\}/)?.[1] || '';

    if (slug && title && coverImage) {
      articles.push({
        slug,
        title,
        excerpt: excerpt || '',
        coverImage,
        publishedAt,
        category,
        content: rawContent,
      });
    }
  }

  // 2. Fetch published articles from Supabase REST API (for newly created articles)
  try {
    const sbRes = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_articles?select=slug,title,excerpt,cover_image,published_at,category,content&status=eq.published`,
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
              content: item.content || '',
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

  // Generate dist/blog/index.html and dist/blog.html (list view)
  const blogDesc = 'Kumpulan artikel edukasi Coding Anak, Artificial Intelligence, Scratch, Roblox Studio, Python, dan tips Parenting Digital terbaru dari tim akademik Beekoding.';
  const blogListSemanticHtml = `
        <header style="margin-bottom:32px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.2rem;font-weight:900;color:#0f172a;margin-bottom:10px;">Blog Edukasi Coding &amp; AI Anak — Beekoding</h1>
          <p style="font-size:1.05rem;color:#475569;">${blogDesc}</p>
        </header>
        <section>
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;margin-bottom:16px;">Daftar Artikel Terbaru (${articles.length} Artikel)</h2>
          <ul style="padding-left:20px;line-height:1.8;">
            ${articles.map((a) => `<li style="margin-bottom:14px;"><a href="https://beekoding.my.id/blog/${a.slug}" style="font-weight:800;color:#d97706;font-size:1.05rem;">${a.title}</a><br/><span style="color:#475569;font-size:0.92rem;">${a.excerpt}</span></li>`).join('\n            ')}
          </ul>
        </section>`;

  const blogListHtml = replaceNoscript(
    subpageBaseHtml
      .replace(/<title>.*?<\/title>/, '<title>Blog Edukasi Coding & AI Anak | Beekoding</title>')
      .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, '<link rel="canonical" href="https://beekoding.my.id/blog" />')
      .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${blogDesc}" />`)
      .replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="Blog Edukasi Coding & AI Anak | Beekoding"')
      .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${blogDesc}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*"/, '<meta name="twitter:title" content="Blog Edukasi Coding & AI Anak | Beekoding"')
      .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${blogDesc}" />`)
      .replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="https://beekoding.my.id/blog"')
      .replace(/<meta name="twitter:url" content="[^"]*"/, '<meta name="twitter:url" content="https://beekoding.my.id/blog"'),
    blogListSemanticHtml
  );
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogListHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'blog.html'), blogListHtml, 'utf-8');

  // =========================================================================
  // 3b. PRERENDER PROGRAMMATIC SEO LANDING PAGES PER JENJANG USIA
  // =========================================================================
  const seoLandingPages = [
    {
      slug: 'kursus-coding-anak-sd',
      title: 'Kursus Coding Anak SD (Usia 6-10 Thn) | Belajar Scratch & AI Seru Beekoding',
      description: 'Les coding anak SD terbaik di Indonesia. Metode belajar visual Scratch 3.0, game dev interaktif, & logika AI ramah anak bersama mentor sabar. Coba Free Trial Class sekarang!',
      keywords: 'kursus coding anak sd, les coding anak sd, belajar scratch anak pemula, kursus logika anak 6 7 8 9 10 tahun, les koding terdekat, biaya les coding anak sd',
      url: 'https://beekoding.my.id/kursus-coding-anak-sd',
      courseName: 'Kursus Coding Anak SD (Usia 6-10 Thn) - Scratch & AI Logic Beekoding',
      courseDesc: 'Program belajar coding visual Scratch 3.0, animasi cerita, dan logika game interaktif untuk anak SD usia 6-10 tahun.',
    },
    {
      slug: 'kursus-python-remaja-smp-sma',
      title: 'Kursus Python & AI Remaja SMP-SMA (Usia 11-17 Thn) | Portofolio & Olimpiade Beekoding',
      description: 'Kursus coding Python, AI Machine Learning, Roblox Lua & Web Dev untuk remaja SMP & SMA. Bangun portofolio nyata, persiapan olimpiade informatika (OSN), & beasiswa!',
      keywords: 'kursus python remaja, les coding smp sma, belajar ai untuk anak remaja, kursus roblox lua, les programming anak smp, persiapan olimpiade informatika, kurikulum python pemula',
      url: 'https://beekoding.my.id/kursus-python-remaja-smp-sma',
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
        url: 'https://beekoding.my.id',
        sameAs: 'https://beekoding.my.id',
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
          item: 'https://beekoding.my.id',
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

    const landingSemanticHtml = `
        <header style="margin-bottom:28px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.1rem;font-weight:900;color:#0f172a;margin-bottom:10px;">${landing.title}</h1>
          <p style="font-size:1.05rem;color:#475569;">${landing.description}</p>
        </header>
        <section style="margin-bottom:28px;">
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;">Kurikulum &amp; Keunggulan Program (${landing.courseName})</h2>
          <p>${landing.courseDesc}</p>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>Metode Project-Based Learning:</strong> Anak membuat karya game, animasi, dan proyek kecerdasan buatan nyata di setiap sesi.</li>
            <li><strong>Kelas Kecil Interaktif:</strong> Rasio maksimal 1 mentor mendampingi 4 murid via Google Meet atau Privat 1-on-1.</li>
            <li><strong>Biaya Kursus Transparan:</strong> Mulai Rp 350.000/bulan tanpa biaya pendaftaran dan tanpa uang gedung.</li>
            <li><strong>Sertifikat Digital Resmi Ber-QR Code:</strong> Portofolio digital terverifikasi untuk setiap kelulusan tahapan.</li>
          </ul>
          <p style="margin-top:20px;"><a href="https://beekoding.my.id/biaya-kursus" style="color:#d97706;font-weight:bold;">Lihat Rincian Biaya Kursus Lengkap &rarr;</a></p>
        </section>`;

    let landingHtml = replaceNoscript(
      subpageBaseHtml
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
        .replace('</head>', landingSchemasTag),
      landingSemanticHtml
    );

    fs.writeFileSync(path.join(landingDir, 'index.html'), landingHtml, 'utf-8');
    fs.writeFileSync(path.join(distDir, `${landing.slug}.html`), landingHtml, 'utf-8');
  }

  console.log(`[prerender-blog] Successfully prerendered ${seoLandingPages.length} Programmatic SEO landing pages!`);

  // =========================================================================
  // 3b-2. PRERENDER PROGRAMMATIC LOCAL SEO LANDING PAGES (KOTA-KOTA INDONESIA)
  // =========================================================================
  const citiesDataPath = path.join(rootDir, 'src', 'data', 'citiesData.ts');
  const localCityPages = [];
  if (fs.existsSync(citiesDataPath)) {
    const citiesContent = fs.readFileSync(citiesDataPath, 'utf-8');
    const cityBlocks = citiesContent.split(/\{\s*slug:\s*'/);

    for (let i = 1; i < cityBlocks.length; i++) {
      const cb = cityBlocks[i];
      const slug = cb.match(/^([^']+)'/)?.[1];
      const cityName = cb.match(/cityName:\s*'([^']+)'/)?.[1];
      const province = cb.match(/province:\s*'([^']+)'/)?.[1];
      const metaTitle = cb.match(/metaTitle:\s*'([^']+)'/)?.[1];
      const metaDescription = cb.match(/metaDescription:\s*'([^']+)'/)?.[1];
      const metaKeywords = cb.match(/metaKeywords:\s*'([^']+)'/)?.[1];

      if (slug && cityName && metaTitle && metaDescription) {
        localCityPages.push({
          slug,
          cityName,
          province: province || 'Indonesia',
          title: metaTitle,
          description: metaDescription,
          keywords: metaKeywords || `kursus coding anak ${cityName.toLowerCase()}`,
          url: `https://beekoding.my.id/${slug}`,
          courseName: `Kursus Coding Anak Kota ${cityName} - Beekoding`,
        });
      }
    }

    for (const cityPage of localCityPages) {
      const cityDir = path.join(distDir, cityPage.slug);
      if (!fs.existsSync(cityDir)) {
        fs.mkdirSync(cityDir, { recursive: true });
      }

      const cityCourseJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: cityPage.courseName,
        description: cityPage.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'Beekoding',
          url: 'https://beekoding.my.id',
          sameAs: 'https://beekoding.my.id',
        },
        hasCourseInstance: [
          {
            '@type': 'CourseInstance',
            courseMode: 'Online',
            location: {
              '@type': 'Place',
              name: `Kota ${cityPage.cityName}, ${cityPage.province}`,
            },
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          worstRating: '1',
          ratingCount: '384',
          reviewCount: '384',
        },
      });

      const cityBreadcrumbJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: 'https://beekoding.my.id',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: `Kursus Coding Anak ${cityPage.cityName}`,
            item: cityPage.url,
          },
        ],
      });

      const citySchemasTag = `\n    <!-- Programmatic Local SEO Structured Data for ${cityPage.cityName} -->\n    <script type="application/ld+json">\n    ${cityCourseJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${cityBreadcrumbJsonLd}\n    </script>\n  </head>`;

      const citySemanticHtml = `
        <header style="margin-bottom:28px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.1rem;font-weight:900;color:#0f172a;margin-bottom:10px;">${cityPage.title}</h1>
          <p style="font-size:1.05rem;color:#475569;">${cityPage.description}</p>
        </header>
        <section style="margin-bottom:28px;">
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;">Program Kursus Coding &amp; AI Terbaik untuk Anak di ${cityPage.cityName} (${cityPage.province})</h2>
          <p>Beekoding melayani siswa SD, SMP, dan SMA di seluruh wilayah <strong>${cityPage.cityName}</strong> melalui kelas Live Interactive Online (rasio maksimal 4 murid per kelas) maupun kelas Privat 1-on-1.</p>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>Junior Explorer (Usia 6–10 Tahun):</strong> Scratch 3.0, Logika Komputasi Visual &amp; Game 2D — Mulai Rp 350.000/bulan.</li>
            <li><strong>Intermediate Coder (Usia 10–12 Tahun):</strong> App Inventor &amp; Roblox Studio 3D (Bahasa Lua) — Mulai Rp 383.000/bulan.</li>
            <li><strong>Teens Innovator (Usia 13–17 Tahun):</strong> Python Pro, Data Science, Web Development &amp; Artificial Intelligence — Mulai Rp 400.000/bulan.</li>
          </ul>
          <p style="margin-top:20px;"><a href="https://beekoding.my.id/biaya-kursus" style="color:#d97706;font-weight:bold;">Cek Rincian Biaya Kursus &amp; Daftar Free Trial Class di ${cityPage.cityName} &rarr;</a></p>
        </section>`;

      let cityHtml = replaceNoscript(
        subpageBaseHtml
          .replace(/<title>.*?<\/title>/, `<title>${cityPage.title}</title>`)
          .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${cityPage.url}" />`)
          .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${cityPage.description}" />`)
          .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${cityPage.keywords}" />`)
          .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${cityPage.title}" />`)
          .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${cityPage.description}" />`)
          .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${cityPage.url}" />`)
          .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${cityPage.title}" />`)
          .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${cityPage.description}" />`)
          .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${cityPage.url}" />`)
          .replace('</head>', citySchemasTag),
        citySemanticHtml
      );

      fs.writeFileSync(path.join(cityDir, 'index.html'), cityHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, `${cityPage.slug}.html`), cityHtml, 'utf-8');
    }

    console.log(`[prerender-blog] Successfully prerendered ${localCityPages.length} Programmatic Local SEO city landing pages!`);
  }

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
  const glossaryUrl = 'https://beekoding.my.id/glosarium';

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
        item: 'https://beekoding.my.id',
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

  const glossarySemanticHtml = `
        <header style="margin-bottom:28px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.1rem;font-weight:900;color:#0f172a;margin-bottom:10px;">${glossaryTitle}</h1>
          <p style="font-size:1.05rem;color:#475569;">${glossaryDesc}</p>
        </header>
        <section>
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;">Daftar Istilah Populer Koding &amp; AI untuk Anak</h2>
          <dl style="line-height:1.8;">
            <dt style="font-weight:800;color:#0f172a;margin-top:12px;">1. Algoritma (Algorithm)</dt>
            <dd style="margin-left:16px;color:#475569;">Urutan instruksi langkah demi langkah yang teratur dan logis untuk menyelesaikan suatu masalah atau mencapai tujuan tertentu.</dd>
            <dt style="font-weight:800;color:#0f172a;margin-top:12px;">2. Loop (Perulangan)</dt>
            <dd style="margin-left:16px;color:#475569;">Perintah dalam koding untuk mengulang suatu tindakan berkali-kali secara otomatis tanpa perlu menulis ulang kodenya.</dd>
            <dt style="font-weight:800;color:#0f172a;margin-top:12px;">3. Variabel (Variable)</dt>
            <dd style="margin-left:16px;color:#475569;">Kotak penyimpanan khusus di dalam memori komputer yang diberi nama untuk menyimpan dan mengubah suatu nilai seperti skor game atau nyawa karakter.</dd>
            <dt style="font-weight:800;color:#0f172a;margin-top:12px;">4. Debugging</dt>
            <dd style="margin-left:16px;color:#475569;">Proses menyelidiki, menemukan, dan memperbaiki kesalahan (bug) pada baris kode program agar aplikasi berjalan normal kembali.</dd>
            <dt style="font-weight:800;color:#0f172a;margin-top:12px;">5. Machine Learning &amp; Prompt Engineering</dt>
            <dd style="margin-left:16px;color:#475569;">Cabang dari Artificial Intelligence di mana komputer belajar mengenali pola dari contoh data, serta keterampilan menyusun instruksi yang jelas bagi AI.</dd>
          </dl>
        </section>`;

  let glossaryHtml = replaceNoscript(
    subpageBaseHtml
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
      .replace('</head>', glossarySchemasTag),
    glossarySemanticHtml
  );

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
  const quizUrl = 'https://beekoding.my.id/cek-minat-anak';

  const quizJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'Kuis Minat & Bakat Coding Anak (1 Menit) - Beekoding',
    description: quizDesc,
    educationalLevel: 'Beginner / Kids & Teens',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Beekoding',
      url: 'https://beekoding.my.id',
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
        item: 'https://beekoding.my.id',
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

  const quizSemanticHtml = `
        <header style="margin-bottom:28px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.1rem;font-weight:900;color:#0f172a;margin-bottom:10px;">${quizTitle}</h1>
          <p style="font-size:1.05rem;color:#475569;">${quizDesc}</p>
        </header>
        <section>
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;">4 Arketipe Bakat Digital Anak di Beekoding</h2>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>The Game Creator:</strong> Suka bercerita, menggambar karakter, dan merancang dunia permainan interaktif di Scratch &amp; Roblox Studio.</li>
            <li><strong>The Logic Sleuth:</strong> Gemar memecahkan teka-teki strategi, pola matematika, dan algoritma pemrograman Python.</li>
            <li><strong>The Web &amp; App Designer:</strong> Kreatif secara visual dan senang membuat aplikasi atau situs web yang bisa digunakan banyak orang.</li>
            <li><strong>The AI Innovator:</strong> Penasaran dengan cara kerja robot, asisten pintar, dan eksperimen Machine Learning masa depan.</li>
          </ul>
        </section>`;

  let quizHtml = replaceNoscript(
    subpageBaseHtml
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
      .replace('</head>', quizSchemasTag),
    quizSemanticHtml
  );

  fs.writeFileSync(path.join(quizDir, 'index.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(quizAltDir, 'index.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'cek-minat-anak.html'), quizHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'kuis-minat.html'), quizHtml, 'utf-8');
  console.log(`[prerender-blog] Successfully prerendered Lead Magnet Quiz SEO page!`);

  // =========================================================================
  // 3d-2. PRERENDER LEAD MAGNET: PRINTABLE LOGIC WORKSHEETS (/worksheet-gratis)
  // =========================================================================
  const wsDir = path.join(distDir, 'worksheet-gratis');
  fs.mkdirSync(wsDir, { recursive: true });
  const wsUrl = 'https://beekoding.my.id/worksheet-gratis';
  const wsTitle = 'Download Worksheet Logika Coding & Maze Anak SD Gratis (PDF) | Beekoding';
  const wsDesc =
    'Unduh 6 Lembar Kerja (Printable Logic Worksheets) PDF A4 gratis untuk anak usia 5–13 tahun: Labirin Algoritma Beeby, Detektif Pola, Misi Debugging, Mewarnai Pixel Art, Sandi Biner AI, & Kanvas Perancang Game.';
  const wsKeywords =
    'worksheet coding anak sd gratis pdf, lembar kerja logika anak tk sd, maze coding anak printable, mewarnai coding anak, unplugged coding worksheet indonesia';

  const wsSemanticHtml = `
        <header style="margin-bottom:28px;">
          <a href="/" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2.1rem;font-weight:900;color:#0f172a;margin-bottom:10px;">${wsTitle}</h1>
          <p style="font-size:1.05rem;color:#475569;">${wsDesc}</p>
        </header>
        <section>
          <h2 style="font-size:1.5rem;font-weight:800;color:#0f172a;">Daftar 6 Paket Lembar Kerja Logika &amp; Koding Cetak A4 (Unplugged Coding)</h2>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>Lembar Kerja #1 — Labirin Algoritma Beeby (Usia 5–8 Tahun):</strong> Menyusun blok panah arah untuk membantu lebah Beeby menuju Sarang Madu Emas.</li>
            <li><strong>Lembar Kerja #2 — Detektif Pola &amp; Dekomposisi Roket (Usia 6–9 Tahun):</strong> Melengkapi deret pola kode dan memecah bangun datar penyusun roket.</li>
            <li><strong>Lembar Kerja #3 — Misi Debugging: Cari &amp; Perbaiki Bug! (Usia 7–10 Tahun):</strong> Menemukan langkah instruksi robot yang salah dan memperbaikinya.</li>
            <li><strong>Lembar Kerja #4 — Mewarnai Maskot Beeby &amp; Pixel Art (Usia 5–9 Tahun):</strong> Mewarnai grid piksel 9x9 berdasarkan logika IF-THEN dan menghias maskot Beeby.</li>
            <li><strong>Lembar Kerja #5 — Sandi Rahasia Biner &amp; Pohon Keputusan AI (Usia 8–12 Tahun):</strong> Menerjemahkan kode biner 5-bit dan membaca alur klasifikasi AI.</li>
            <li><strong>Lembar Kerja #6 — Blueprint Perancang Game Pertamaku (Usia 7–13 Tahun):</strong> Merancang karakter Hero, rintangan, dan aturan skor variabel game Scratch/Roblox.</li>
          </ul>
        </section>`;

  const wsHtml = replaceNoscript(
    subpageBaseHtml
      .replace(/<title>.*?<\/title>/, `<title>${wsTitle}</title>`)
      .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${wsUrl}" />`)
      .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${wsDesc}" />`)
      .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${wsKeywords}" />`)
      .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${wsTitle}" />`)
      .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${wsDesc}" />`)
      .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${wsUrl}" />`)
      .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${wsTitle}" />`)
      .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${wsDesc}" />`)
      .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${wsUrl}" />`),
    wsSemanticHtml
  );

  fs.writeFileSync(path.join(wsDir, 'index.html'), wsHtml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'worksheet-gratis.html'), wsHtml, 'utf-8');
  console.log(`[prerender-blog] Successfully prerendered Printable Logic Worksheets SEO page!`);

  // =========================================================================
  // 3e. PRERENDER LEGAL & PRIVACY POLICY PAGES (GOOGLE ADSENSE & COMPLIANCE)
  // =========================================================================
  const legalPages = [
    {
      slug: 'biaya-kursus',
      aliases: ['biaya', 'biaya-les-coding', 'pricing'],
      title: 'Rincian Biaya Kursus Coding Anak 2026 Resmi & Transparan | Beekoding',
      description: 'Daftar resmi rincian biaya kursus coding anak SD, SMP & SMA di Beekoding tahun 2026. Kelas reguler online mulai Rp 350.000/bulan (rasio max 4 anak), privat intensif Rp 150.000/sesi, & Free Trial Class 100% gratis.',
      keywords: 'biaya kursus coding anak, harga les coding anak sd, biaya belajar coding anak 2026, tarif kursus coding beekoding, les coding murah berkualitas, biaya kelas privat coding',
      bodyHtml: `
        <header style="max-width:850px;margin:40px auto;padding:0 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.7;">
          <a href="/" style="display:inline-block;margin-bottom:20px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <div style="display:inline-block;padding:4px 12px;background:#fef3c7;color:#d97706;font-size:11px;font-weight:800;border-radius:999px;text-transform:uppercase;margin-bottom:12px;">Transparansi Biaya Resmi 2026</div>
          <h1 style="font-size:2.2rem;font-weight:900;color:#0f172a;margin-bottom:8px;line-height:1.2;">Rincian Biaya Kursus Coding &amp; AI Beekoding (Tahun 2026)</h1>
          <p style="color:#64748b;font-size:0.95rem;">Pembaruan Terakhir: 22 Oktober 2026 | Berlaku Nasional untuk Seluruh Indonesia</p>
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;"/>

          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:16px;padding:20px;margin:24px 0;">
            <h3 style="margin-top:0;font-size:1.1rem;color:#92400e;font-weight:800;">Komitmen Transparansi Total Beekoding</h3>
            <p style="margin-bottom:0;color:#78350f;font-size:0.95rem;">
              Beekoding mempublikasikan rincian biaya kursus secara terbuka dan jujur. <strong>Tidak ada biaya pendaftaran tersembunyi, tidak ada uang gedung tahunan, dan seluruh sertifikat digital resmi ber-QR Code sudah termasuk gratis.</strong>
            </p>
          </div>

          <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin-top:32px;">1. Pilihan Format Kelas &amp; Estimasi Biaya</h2>

          <div style="overflow-x:auto;margin:20px 0;">
            <table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.95rem;">
              <thead>
                <tr style="background:#f1f5f9;border-bottom:2px solid #cbd5e1;">
                  <th style="padding:12px 16px;font-weight:800;">Program &amp; Format</th>
                  <th style="padding:12px 16px;font-weight:800;">Rasio Kelas</th>
                  <th style="padding:12px 16px;font-weight:800;">Biaya per Bulan</th>
                  <th style="padding:12px 16px;font-weight:800;">Paket Pilihan</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid #e2e8f0;background:#ffffff;">
                  <td style="padding:14px 16px;"><strong>Free Trial &amp; Diagnostic</strong><br/><span style="color:#64748b;font-size:0.85rem;">Simulasi belajar &amp; tes minat</span></td>
                  <td style="padding:14px 16px;">1-on-1 atau 1:2</td>
                  <td style="padding:14px 16px;color:#059669;font-weight:800;">Rp 0 (Gratis)</td>
                  <td style="padding:14px 16px;">1 Sesi 45–60 Menit</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;background:#fffdf7;">
                  <td style="padding:14px 16px;"><strong>Junior Explorer (SD Usia 6-10 Thn)</strong><br/><span style="color:#64748b;font-size:0.85rem;">Scratch 3.0, Logic, Animasi</span></td>
                  <td style="padding:14px 16px;">Maksimal 1 : 4 Murid</td>
                  <td style="padding:14px 16px;color:#d97706;font-weight:800;">Mulai Rp 350.000 / bln</td>
                  <td style="padding:14px 16px;">12 Sesi: Rp 1.050.000<br/>24 Sesi: Rp 1.950.000<br/>48 Sesi: Rp 3.600.000</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;background:#ffffff;">
                  <td style="padding:14px 16px;"><strong>Intermediate Coder (Usia 10-12 Thn)</strong><br/><span style="color:#64748b;font-size:0.85rem;">App Inventor, Roblox Lua 3D</span></td>
                  <td style="padding:14px 16px;">Maksimal 1 : 4 Murid</td>
                  <td style="padding:14px 16px;color:#d97706;font-weight:800;">Mulai Rp 383.000 / bln</td>
                  <td style="padding:14px 16px;">12 Sesi: Rp 1.150.000<br/>24 Sesi: Rp 2.100.000<br/>48 Sesi: Rp 3.900.000</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;background:#fffdf7;">
                  <td style="padding:14px 16px;"><strong>Teens Innovator (Usia 13-17 Thn)</strong><br/><span style="color:#64748b;font-size:0.85rem;">Python Pro, Web Dev, Applied AI</span></td>
                  <td style="padding:14px 16px;">Maksimal 1 : 4 Murid</td>
                  <td style="padding:14px 16px;color:#d97706;font-weight:800;">Mulai Rp 400.000 / bln</td>
                  <td style="padding:14px 16px;">12 Sesi: Rp 1.200.000<br/>24 Sesi: Rp 2.250.000<br/>48 Sesi: Rp 4.200.000</td>
                </tr>
                <tr style="border-bottom:1px solid #e2e8f0;background:#ffffff;">
                  <td style="padding:14px 16px;"><strong>Kelas Privat Intensif (1-on-1)</strong><br/><span style="color:#64748b;font-size:0.85rem;">Jadwal fleksibel &amp; kurikulum custom</span></td>
                  <td style="padding:14px 16px;">1 Mentor : 1 Murid</td>
                  <td style="padding:14px 16px;color:#7c3aed;font-weight:800;">Mulai Rp 150.000 / sesi</td>
                  <td style="padding:14px 16px;">Paket 8, 12, atau 24 Sesi Privat</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin-top:32px;">2. Fasilitas yang Sudah Termasuk</h2>
          <ul style="padding-left:20px;line-height:1.8;">
            <li><strong>Pertemuan Live Interaktif:</strong> Durasi 75–90 menit via Google Meet dengan bimbingan personal mentor sabar.</li>
            <li><strong>Bebas Biaya Pendaftaran:</strong> Tanpa uang registrasi ulang dan tanpa uang gedung.</li>
            <li><strong>Sertifikat Digital Ber-QR Code:</strong> Setiap menyelesaikan modul, siswa mendapatkan sertifikat resmi yang bisa diverifikasi di Portal Siswa.</li>
            <li><strong>Akses Portal Siswa 24/7:</strong> Riwayat materi mingguan, presensi, rapor evaluasi kompetensi, dan galeri karya.</li>
            <li><strong>Fasilitas Make-Up Class:</strong> Jadwal pengganti gratis jika anak berhalangan hadir karena sakit atau ujian sekolah.</li>
            <li><strong>Diskon Saudara (Sibling Discount):</strong> Potongan 10% untuk pendaftaran anak kedua (kakak/adik).</li>
          </ul>

          <h2 style="font-size:1.4rem;font-weight:800;color:#0f172a;margin-top:32px;">3. Cara Mendaftar Free Trial Class</h2>
          <p>Orang tua dapat mencoba sesi uji coba 100% gratis sebelum memutuskan berlangganan:</p>
          <div style="margin:24px 0;text-align:center;">
            <a href="https://wa.me/6281818901737?text=Halo%20Beekoding%2C%20saya%20ingin%20mendaftar%20Free%20Trial%20Class%20Coding%20untuk%20anak%20saya." target="_blank" style="display:inline-block;padding:14px 28px;background:linear-gradient(to right, #f59e0b, #d97706);color:#0f172a;font-weight:900;border-radius:12px;text-decoration:none;font-size:1rem;box-shadow:0 4px 14px rgba(217,119,6,0.3);">
              Klaim Free Trial Class (WhatsApp) &rarr;
            </a>
          </div>
        </header>
      `,
    },

    {
      slug: 'kebijakan-privasi',
      aliases: ['privacy-policy', 'privacy'],
      title: 'Kebijakan Privasi (Privacy Policy) & AdSense Cookie | Beekoding',
      description: 'Kebijakan Privasi resmi Beekoding: Keterbukaan pengelolaan data, privasi anak (COPPA & UU PDP No. 27/2022), penggunaan cookie pihak ketiga & Google AdSense DART cookie.',
      keywords: 'kebijakan privasi beekoding, privacy policy, google adsense cookie, perlindungan data anak, uupdp no 27 2022, coppa indonesia, opt-out adsense',
      bodyHtml: `
        <header style="max-width:800px;margin:40px auto;padding:0 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.7;">
          <a href="/" style="display:inline-block;margin-bottom:20px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin-bottom:8px;">Kebijakan Privasi (Privacy Policy) Beekoding</h1>
          <p style="color:#64748b;font-size:0.9rem;">Pembaruan Terakhir: 20 Oktober 2026 | Berlaku Efektif untuk Pengguna Situs &amp; Siswa Beekoding</p>
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;"/>
          
          <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin:24px 0;">
            <h2 style="font-size:1.1rem;font-weight:700;color:#92400e;margin:0 0 8px 0;">Pemberitahuan Khusus Google AdSense &amp; Cookie Pihak Ketiga</h2>
            <p style="font-size:0.95rem;color:#78350f;margin:0 0 10px 0;">Situs web Beekoding (<a href="https://beekoding.my.id" style="color:#b45309;font-weight:bold;">https://beekoding.my.id</a>) menggunakan Google AdSense untuk menayangkan iklan yang relevan dan edukatif.</p>
            <ul style="font-size:0.9rem;color:#78350f;margin:0;padding-left:20px;">
              <li>Vendor pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke situs web kami atau situs web lain.</li>
              <li>Penggunaan cookie periklanan (termasuk Cookie DoubleClick / DART) memungkinkan Google dan mitranya menayangkan iklan kepada pengguna kami berdasarkan kunjungan mereka ke situs kami dan/atau situs lain di Internet.</li>
              <li>Pengguna dapat memilih untuk menonaktifkan iklan hasil personalisasi dengan mengunjungi <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style="color:#b45309;text-decoration:underline;font-weight:bold;">Setelan Iklan Google (Google Ads Settings)</a>.</li>
              <li>Atau, Anda dapat menyisih dari penggunaan cookie vendor pihak ketiga untuk iklan berbasis minat dengan mengunjungi <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" style="color:#b45309;text-decoration:underline;font-weight:bold;">AboutAds.info</a>.</li>
            </ul>
          </div>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">1. Komitmen Perlindungan Privasi Anak (COPPA &amp; UU PDP No. 27 Tahun 2022)</h2>
          <p>Sebagai lembaga pendidikan coding dan teknologi untuk anak-anak, Beekoding berkomitmen teguh melindungi privasi anak di bawah usia 18 tahun. Kami mematuhi Undang-Undang Perlindungan Data Pribadi (UU PDP No. 27 Tahun 2022) Republik Indonesia dan Children's Online Privacy Protection Act (COPPA). Pendaftaran kelas untuk anak wajib didampingi dan disetujui secara eksplisit oleh orang tua atau wali murid yang sah.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">2. Informasi yang Kami Kumpulkan</h2>
          <p>Informasi yang kami kumpulkan meliputi:</p>
          <ul style="padding-left:20px;">
            <li><strong>Data Kontak Wali:</strong> Nama orang tua/wali, nomor WhatsApp aktif, alamat email, dan kota domisili untuk keperluan jadwal dan laporan belajar anak.</li>
            <li><strong>Data Siswa:</strong> Nama panggilan anak, jenjang kelas/usia, dan portofolio tugas koding yang dibuat selama pembelajaran.</li>
            <li><strong>Data Log Otomatis:</strong> Alamat Protokol Internet (IP), jenis peramban (browser), Internet Service Provider (ISP), stempel tanggal/waktu, dan halaman perujuk/keluar.</li>
          </ul>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">3. Berkas Verifikasi Transparansi Iklan (Authorized Digital Sellers / ads.txt)</h2>
          <p>Beekoding menyediakan berkas <code>ads.txt</code> resmi yang dapat diakses publik pada lokasi <code>https://beekoding.my.id/ads.txt</code> sesuai standar IAB Tech Lab untuk menjamin penayangan iklan yang sah dari penayang terverifikasi Google AdSense (Publisher ID: <code>pub-6361492236129824</code>).</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">4. Hak Pemilik Data Pribadi</h2>
          <p>Setiap orang tua atau siswa memiliki hak untuk meminta salinan data pribadi yang kami simpan, memperbarui data yang tidak akurat, atau meminta penghapusan riwayat data pendaftaran kapan saja melalui kontak resmi kami.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">5. Kontak Resmi Privasi &amp; Perlindungan Data</h2>
          <p>Jika ada pertanyaan atau permintaan terkait Kebijakan Privasi ini, silakan hubungi tim kami:</p>
          <ul style="padding-left:20px;">
            <li><strong>Email Resmi:</strong> <!--email_off-->halo@beekoding.id<!--/email_off--></li>
            <li><strong>WhatsApp Hotline:</strong> <a href="https://wa.me/6281818901737" style="color:#d97706;">+62 818-1890-1737</a></li>
            <li><strong>Situs Web:</strong> <a href="https://beekoding.my.id" style="color:#d97706;">https://beekoding.my.id</a></li>
          </ul>
        </header>
      `,
    },
    {
      slug: 'syarat-ketentuan',
      aliases: ['terms-of-service', 'terms'],
      title: 'Syarat & Ketentuan Layanan (Terms of Service) | Beekoding',
      description: 'Syarat dan ketentuan resmi penggunaan layanan edukasi coding dan kecerdasan buatan (AI) Beekoding. Ketentuan pendaftaran, hak kekayaan intelektual, dan batasan tanggung jawab.',
      keywords: 'syarat dan ketentuan beekoding, terms of service, ketentuan kursus coding anak, lisensi karya siswa',
      bodyHtml: `
        <header style="max-width:800px;margin:40px auto;padding:0 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.7;">
          <a href="/" style="display:inline-block;margin-bottom:20px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin-bottom:8px;">Syarat &amp; Ketentuan Layanan (Terms of Service)</h1>
          <p style="color:#64748b;font-size:0.9rem;">Pembaruan Terakhir: 20 Oktober 2026 | Berlaku untuk Seluruh Program Belajar Beekoding</p>
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;"/>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">1. Penerimaan Ketentuan</h2>
          <p>Dengan mengakses situs web Beekoding atau mendaftar pada salah satu program pelatihan, kursus, maupun workshop kami, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh isi Syarat &amp; Ketentuan ini.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">2. Program Pelatihan &amp; Kelas</h2>
          <p>Beekoding menyelenggarakan kelas pembelajaran coding, logika komputasi, robotik, dan Artificial Intelligence untuk anak (SD) hingga remaja (SMP-SMA) baik secara tatap muka maupun daring interaktif dalam kelompok kecil.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">3. Hak Kekayaan Intelektual</h2>
          <p>Seluruh materi kurikulum, modul ajar, lembar kerja siswa, maskot karakter Beeby, dan materi grafis adalah milik Beekoding. Proyek game, aplikasi, dan kode program yang diciptakan siswa selama masa belajar sepenuhnya menjadi hak cipta milik siswa yang bersangkutan.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">4. Pembayaran &amp; Kebijakan Pembatalan</h2>
          <p>Biaya pendaftaran program wajib diselesaikan sebelum jadwal kelas perdana dimulai. Jadwal pengganti (make-up class) dapat diajukan dengan pemberitahuan minimal 24 jam sebelum kelas berlangsung.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">5. Kontak Layanan Bantuan</h2>
          <p>Untuk pertanyaan seputar syarat layanan, hubungi <!--email_off-->halo@beekoding.id<!--/email_off--> atau WhatsApp resmi di <a href="https://wa.me/6281818901737" style="color:#d97706;">+62 818-1890-1737</a>.</p>
        </header>
      `,
    },
    {
      slug: 'penafian',
      aliases: ['disclaimer'],
      title: 'Penafian Resmi (Disclaimer) | Beekoding',
      description: 'Penafian resmi Beekoding terkait konten materi edukasi, hasil capaian belajar siswa, tautan eksternal, dan penayangan iklan pihak ketiga Google AdSense.',
      keywords: 'disclaimer beekoding, penafian resmi, iklan pihak ketiga, hasil belajar koding',
      bodyHtml: `
        <header style="max-width:800px;margin:40px auto;padding:0 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.7;">
          <a href="/" style="display:inline-block;margin-bottom:20px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Beranda Beekoding</a>
          <h1 style="font-size:2rem;font-weight:800;color:#0f172a;margin-bottom:8px;">Penafian Resmi (Disclaimer)</h1>
          <p style="color:#64748b;font-size:0.9rem;">Pembaruan Terakhir: 20 Oktober 2026 | Beekoding</p>
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;"/>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">1. Materi Edukasi &amp; Hasil Pembelajaran</h2>
          <p>Seluruh materi di situs ini disediakan untuk tujuan pendidikan umum. Kecepatan perkembangan setiap anak dapat bervariasi sesuai ketekunan, minat personal, dan konsistensi berlatih.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">2. Iklan Pihak Ketiga (Google AdSense)</h2>
          <p>Situs ini dapat menampilkan iklan yang dikelola oleh Google AdSense dan jaringan periklanan pihak ketiga. Penayangan iklan ini tidak serta merta mencerminkan dukungan langsung atau rekomendasi resmi Beekoding atas produk/layanan yang diiklankan oleh pihak ketiga tersebut.</p>

          <h2 style="font-size:1.3rem;font-weight:700;color:#0f172a;margin-top:28px;">3. Tautan Luar (External Links)</h2>
          <p>Situs kami mungkin memuat tautan ke situs luar seperti Scratch MIT, Python.org, atau Google. Kami tidak bertanggung jawab atas kebijakan privasi atau konten situs eksternal tersebut.</p>
        </header>
      `,
    },
  ];

  for (const page of legalPages) {
    const pageDir = path.join(distDir, page.slug);
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    const pageUrl = `https://beekoding.my.id/${page.slug}`;
    const pageJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: pageUrl,
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Beekoding',
        url: 'https://beekoding.my.id',
        logo: {
          '@type': 'ImageObject',
          url: 'https://beekoding.my.id/icon-512.png',
        },
      },
    });

    const pageBreadcrumbJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: 'https://beekoding.my.id',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: page.title.split('|')[0].trim(),
          item: pageUrl,
        },
      ],
    });

    const pageSchemasTag = `\n    <!-- Legal WebPage Structured Data -->\n    <script type="application/ld+json">\n    ${pageJsonLd}\n    </script>\n    <script type="application/ld+json">\n    ${pageBreadcrumbJsonLd}\n    </script>\n  </head>`;

    let renderedHtml = replaceNoscript(
      subpageBaseHtml
        .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
        .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${pageUrl}" />`)
        .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${page.description}" />`)
        .replace(/<meta[^>]*?name="keywords"[^>]*?>/s, `<meta name="keywords" content="${page.keywords}" />`)
        .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${page.title}" />`)
        .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${page.description}" />`)
        .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${pageUrl}" />`)
        .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${page.title}" />`)
        .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${page.description}" />`)
        .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${pageUrl}" />`)
        .replace('</head>', pageSchemasTag),
      page.bodyHtml
    );

    fs.writeFileSync(path.join(pageDir, 'index.html'), renderedHtml, 'utf-8');
    fs.writeFileSync(path.join(distDir, `${page.slug}.html`), renderedHtml, 'utf-8');

    for (const alias of page.aliases) {
      const aliasDir = path.join(distDir, alias);
      if (!fs.existsSync(aliasDir)) {
        fs.mkdirSync(aliasDir, { recursive: true });
      }
      fs.writeFileSync(path.join(aliasDir, 'index.html'), renderedHtml, 'utf-8');
      fs.writeFileSync(path.join(distDir, `${alias}.html`), renderedHtml, 'utf-8');
    }
  }

  console.log(`[prerender-blog] Successfully prerendered ${legalPages.length} Legal & Policy pages for Google AdSense compliance!`);

  // 4. Prerender each article static directory and index.html
  for (const article of articles) {
    const articleDir = path.join(blogDir, article.slug);
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

    const title = `${article.title} | Blog Beekoding`;
    const desc = article.excerpt.replace(/"/g, '&quot;');
    const url = `https://beekoding.my.id/blog/${article.slug}`;
    let image = article.coverImage;
    if (image.startsWith('/')) {
      image = `https://beekoding.my.id${image}`;
    }

    let imageType = 'image/jpeg';
    if (image.toLowerCase().includes('.png')) {
      imageType = 'image/png';
    } else if (image.toLowerCase().includes('.webp')) {
      imageType = 'image/webp';
    }

    let articleHtml = subpageBaseHtml
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
        url: 'https://beekoding.my.id',
        logo: {
          '@type': 'ImageObject',
          url: 'https://beekoding.my.id/icon-512.png',
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
          item: 'https://beekoding.my.id',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog Edukasi',
          item: 'https://beekoding.my.id/blog',
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

    const articleSemanticHtml = `
        <article>
          <a href="https://beekoding.my.id/blog" style="display:inline-block;margin-bottom:16px;color:#d97706;font-weight:bold;text-decoration:none;">&larr; Kembali ke Daftar Artikel Blog Beekoding</a>
          <div style="font-size:0.85rem;color:#64748b;margin-bottom:8px;">Kategori: <strong>${article.category}</strong> | Diterbitkan: ${article.publishedAt}</div>
          <h1 style="font-size:2rem;font-weight:900;color:#0f172a;margin-bottom:12px;">${article.title}</h1>
          <p style="font-size:1.05rem;color:#475569;font-weight:500;margin-bottom:24px;">${article.excerpt}</p>
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;"/>
          <div>
            ${markdownToSimpleHtml(article.content)}
          </div>
        </article>`;

    articleHtml = replaceNoscript(articleHtml.replace('</head>', schemasTag), articleSemanticHtml);

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

  function generateSitemapXml(articlesList, cityPagesList = []) {
    const today = new Date().toISOString().split('T')[0];
    const domain = 'https://beekoding.my.id';

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
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Rincian Biaya Kursus Coding Anak 2026 Beekoding</image:title>
      <image:caption>Transparansi biaya les coding anak mulai Rp 350.000/bulan dan Free Trial Class gratis.</image:caption>
    </image:image>
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
  </url>
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
  <!-- Lead Magnet: Printable Logic Worksheets PDF Gratis -->
  <url>
    <loc>${domain}/worksheet-gratis</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Download Worksheet Logika Coding &amp; Maze Anak SD Gratis (PDF) Beekoding</image:title>
      <image:caption>6 lembar kerja cetak A4 latihan logika koding, labirin Beeby, dan mewarnai piksel untuk anak usia 5-13 tahun.</image:caption>
    </image:image>
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

    for (const city of cityPagesList) {
      xml += `
  <!-- Programmatic Local SEO: Kursus Coding Anak ${escapeXml(city.cityName)} -->
  <url>
    <loc>${domain}/${city.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${domain}/og-image.jpg</image:loc>
      <image:title>Kursus Coding Anak Kota ${escapeXml(city.cityName)} - Beekoding</image:title>
      <image:caption>${escapeXml(city.description)}</image:caption>
    </image:image>
  </url>`;
    }

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
    const domain = 'https://beekoding.my.id';

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

  const sitemapContent = generateSitemapXml(articles, localCityPages);
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
