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

// Parse articles from blogArticles.ts
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

// 1. Ensure dist/blog directory exists
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

// 2. Prerender each article static directory and index.html
for (const article of articles) {
  const articleDir = path.join(blogDir, article.slug);
  if (!fs.existsSync(articleDir)) {
    fs.mkdirSync(articleDir, { recursive: true });
  }

  const title = `${article.title} | Blog Beekoding`;
  const desc = article.excerpt.replace(/"/g, '&quot;');
  const url = `https://beekoding.pages.dev/blog/${article.slug}`;
  const image = article.coverImage;

  let articleHtml = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<link[^>]*?rel="canonical"[^>]*?>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta[^>]*?name="description"[^>]*?>/s, `<meta name="description" content="${desc}" />`)
    .replace(/<meta[^>]*?property="og:title"[^>]*?>/s, `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta[^>]*?property="og:description"[^>]*?>/s, `<meta property="og:description" content="${desc}" />`)
    .replace(/<meta[^>]*?property="og:url"[^>]*?>/s, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta[^>]*?property="og:image"[^>]*?>/s, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta[^>]*?property="og:image:secure_url"[^>]*?>/s, `<meta property="og:image:secure_url" content="${image}" />`)
    .replace(/<meta[^>]*?property="og:type"[^>]*?>/s, '<meta property="og:type" content="article" />')
    .replace(/<link[^>]*?rel="image_src"[^>]*?>/s, `<link rel="image_src" href="${image}" />`)
    .replace(/<meta[^>]*?itemprop="image"[^>]*?>/s, `<meta itemprop="image" content="${image}" />`)
    .replace(/<meta[^>]*?name="twitter:card"[^>]*?>/s, '<meta name="twitter:card" content="summary_large_image" />')
    .replace(/<meta[^>]*?name="twitter:title"[^>]*?>/s, `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta[^>]*?name="twitter:description"[^>]*?>/s, `<meta name="twitter:description" content="${desc}" />`)
    .replace(/<meta[^>]*?name="twitter:image"[^>]*?>/s, `<meta name="twitter:image" content="${image}" />`)
    .replace(/<meta[^>]*?name="twitter:url"[^>]*?>/s, `<meta name="twitter:url" content="${url}" />`);

  fs.writeFileSync(path.join(articleDir, 'index.html'), articleHtml, 'utf-8');
}

console.log(`[prerender-blog] Successfully prerendered ${articles.length} blog articles with OpenGraph metadata!`);

// =========================================================================
// 3. AUTOMATIC SITEMAP.XML & RSS.XML GENERATOR
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
