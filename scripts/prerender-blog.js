import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
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
  if (slug && title && coverImage) {
    articles.push({ slug, title, excerpt: excerpt || '', coverImage });
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
