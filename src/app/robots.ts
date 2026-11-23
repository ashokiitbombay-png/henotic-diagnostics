import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/reports', '/reports/', '/admin', '/admin/', '/seo-image-optimizer', '/seo-image-optimizer/'],
      },
      // Block known aggressive training scrapers that consume massive crawl budget without sending search traffic
      {
        userAgent: ['Bytespider', 'CCBot'],
        disallow: ['/'],
      },
      // Allowed AI search & conversational engine crawlers
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
          'Applebot-Extended',
          'anthropic-ai',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/api/', '/reports', '/reports/', '/admin', '/admin/', '/seo-image-optimizer', '/seo-image-optimizer/'],
      },
    ],
    sitemap: 'https://www.henoticdiagnostics.com/sitemap.xml',
    host: 'https://www.henoticdiagnostics.com',
  };
}
