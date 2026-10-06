/**
 * Social Meta Tags & Schema.org Structured Data Utility
 * Mengatur OpenGraph, Twitter Card, dan JSON-LD secara dinamis untuk SEO & Social Sharing
 */

import type { BlogArticle } from '../data/blogArticles';

const DEFAULT_META = {
  title: 'Beekoding | Coding & AI Learning for Future-Ready Minds',
  description:
    'Beekoding membekali anak-anak dan generasi muda dengan skill Coding, Artificial Intelligence, dan 21st-century skills seru dan aplikatif.',
  image: 'https://beekoding.id/og-image.jpg',
  url: 'https://beekoding.id/',
  type: 'website',
};

function ensureAbsoluteUrl(url: string): string {
  if (!url) return DEFAULT_META.image;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://beekoding.id';
    return `${origin}${url}`;
  }
  return url;
}

function setOrUpdateMeta(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function removeMeta(attributeName: 'name' | 'property', attributeValue: string) {
  if (typeof document === 'undefined') return;
  const element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
}

const JSON_LD_SCRIPT_ID = 'beekoding-article-jsonld';

function injectArticleJsonLd(article: BlogArticle) {
  if (typeof document === 'undefined') return;

  let scriptEl = document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = JSON_LD_SCRIPT_ID;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://beekoding.id';
  const articleUrl = `${origin}/#blog/${article.slug}`;

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: [ensureAbsoluteUrl(article.coverImage)],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Beekoding',
      url: origin,
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/bee-mascot.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category,
    keywords: (article.tags || []).join(', '),
  };

  scriptEl.textContent = JSON.stringify(jsonLdData);
}

function removeArticleJsonLd() {
  if (typeof document === 'undefined') return;
  const scriptEl = document.getElementById(JSON_LD_SCRIPT_ID);
  if (scriptEl && scriptEl.parentNode) {
    scriptEl.parentNode.removeChild(scriptEl);
  }
}

/**
 * Memperbarui OpenGraph, Twitter Card, dan Page Title saat membaca artikel tertentu
 */
export function updateArticleSocialMeta(article: BlogArticle) {
  if (typeof document === 'undefined') return;

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://beekoding.id';
  const articleUrl = `${origin}/#blog/${article.slug}`;
  const coverUrl = ensureAbsoluteUrl(article.coverImage);

  // 1. Browser Tab Title
  document.title = `${article.title} | Blog Beekoding`;

  // 2. Standard Meta
  setOrUpdateMeta('name', 'description', article.excerpt);
  if (article.tags && article.tags.length > 0) {
    setOrUpdateMeta('name', 'keywords', article.tags.join(', ') + ', Beekoding, Coding Anak, Edukasi AI');
  }

  // 3. Open Graph (WhatsApp, Facebook, LinkedIn)
  setOrUpdateMeta('property', 'og:type', 'article');
  setOrUpdateMeta('property', 'og:title', article.title);
  setOrUpdateMeta('property', 'og:description', article.excerpt);
  setOrUpdateMeta('property', 'og:image', coverUrl);
  setOrUpdateMeta('property', 'og:image:secure_url', coverUrl);
  setOrUpdateMeta('property', 'og:url', articleUrl);
  setOrUpdateMeta('property', 'og:site_name', 'Beekoding');
  setOrUpdateMeta('property', 'og:locale', 'id_ID');

  // Article Specific Open Graph
  setOrUpdateMeta('property', 'article:published_time', article.publishedAt);
  setOrUpdateMeta('property', 'article:author', article.author.name);
  setOrUpdateMeta('property', 'article:section', article.category);

  // 4. Twitter / X Card
  setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
  setOrUpdateMeta('name', 'twitter:title', article.title);
  setOrUpdateMeta('name', 'twitter:description', article.excerpt);
  setOrUpdateMeta('name', 'twitter:image', coverUrl);
  setOrUpdateMeta('name', 'twitter:url', articleUrl);

  // 5. Schema.org JSON-LD for Google Rich Snippets
  injectArticleJsonLd(article);
}

/**
 * Mengembalikan meta tag ke halaman default website
 */
export function resetSocialMetaToDefault() {
  if (typeof document === 'undefined') return;

  document.title = DEFAULT_META.title;
  setOrUpdateMeta('name', 'description', DEFAULT_META.description);
  setOrUpdateMeta('property', 'og:type', 'website');
  setOrUpdateMeta('property', 'og:title', DEFAULT_META.title);
  setOrUpdateMeta('property', 'og:description', DEFAULT_META.description);
  setOrUpdateMeta('property', 'og:image', DEFAULT_META.image);
  setOrUpdateMeta('property', 'og:url', DEFAULT_META.url);

  setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
  setOrUpdateMeta('name', 'twitter:title', DEFAULT_META.title);
  setOrUpdateMeta('name', 'twitter:description', DEFAULT_META.description);
  setOrUpdateMeta('name', 'twitter:image', DEFAULT_META.image);

  // Hapus tag khusus artikel
  removeMeta('property', 'article:published_time');
  removeMeta('property', 'article:author');
  removeMeta('property', 'article:section');

  removeArticleJsonLd();
}
