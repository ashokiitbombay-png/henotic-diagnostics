import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/reports/'],
      },
      // Explicitly allow AI crawlers for AEO/GEO/LLMO compliance
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'PerplexityBot', 'CCBot', 'Applebot-Extended', 'anthropic-ai', 'Bytespider', 'cohere-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.henoticdiagnostics.com/sitemap.xml',
    host: 'https://www.henoticdiagnostics.com',
  };
}