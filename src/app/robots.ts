import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/reports', '/reports/'],
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
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'PerplexityBot',
          'Applebot-Extended',
          'anthropic-ai',
          'cohere-ai',
        ],
        allow: '/',
        disallow: ['/api/', '/reports', '/reports/'],
      },
    ],
    sitemap: 'https://www.henoticdiagnostics.com/sitemap.xml',
    host: 'https://www.henoticdiagnostics.com',
  };
}
