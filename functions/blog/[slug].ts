import { blogArticles } from '../../src/data/blogArticles';

interface Env {
  ASSETS?: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export const onRequestGet = async (context: {
  request: Request;
  params: { slug: string };
  env: Env;
}): Promise<Response> => {
  const { request, params, env } = context;
  const slug = params.slug;

  // Temukan artikel berdasarkan slug
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) {
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }
    return fetch(request);
  }

  // Ambil respons index.html dasar dari asset
  const baseRes = env.ASSETS
    ? await env.ASSETS.fetch(new URL('/', request.url))
    : await fetch(new URL('/', request.url));

  const pageTitle = `${article.title} | Blog Beekoding`;
  const url = new URL(request.url);
  const pageUrl = `${url.origin}/blog/${article.slug}`;
  const coverUrl = article.coverImage;
  const desc = article.excerpt;

  if (typeof HTMLRewriter === 'undefined') {
    return baseRes;
  }

  return new HTMLRewriter()
    .on('title', {
      element(e) {
        e.setInnerContent(pageTitle);
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
