const blogRedirects = require('./src/config/blog-redirects.json');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Disables per-process in-memory ISR cache so PM2 cluster workers share consistent disk ISR entries after /api/revalidate webhooks
  cacheMaxMemorySize: 0,
  outputFileTracingIncludes: {
    '/*': ['./src/lib/wordpress/failsafe-cache.json'],
  },
  trailingSlash: false,
  // Disable streaming metadata for all requests so crawlers & Nginx micro-cache receive blocking <head> metadata cleanly.
  htmlLimitedBots: /.*/,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    unoptimized: true, // Prevents CPU/RAM spikes on the GCP VM during 500k Googlebot crawls
    minimumCacheTTL: 2678400, // 31 days persistent edge cache for optimized images
    formats: ['image/webp'],
    qualities: [75],
    // Optimized responsive device and icon breakpoints
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [32, 64, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.henoticdiagnostics.com',
        port: '',
        pathname: '/**',
      },
      // Keep GCS listed temporarily during transition
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/wp-media-henoticbucket/**',
      },
      {
        protocol: 'https',
        hostname: 'cms.henoticdiagnostics.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
    optimizePackageImports: ['lucide-react', '@apollo/client'],
  },
  turbopack: {},
  async redirects() {
    const NON_AMBULANCE_SERVICE = ':service((?!.*ambulance)[^/]+)';

    // 1. Inpatient hospital surgical procedures: L2 & L3 redirect in 1 hop directly to main L1 guide
    const surgicalRedirects = ['angioplasty', 'tavr', 'cardiac-catheterization'].map((slug) => ({
      source: `/services/${slug}/:path+`,
      destination: `/services/${slug}`,
      statusCode: 301,
    }));

    // Synonym + pure typo service rewrites
    const serviceRewrites = [
      ['ecg-test', 'ecg'],
      ['electrocardiogram', 'ecg'],
      ['2d-echo-test', '2d-echo'],
      ['echo-test', '2d-echo'],
      ['echocardiography', '2d-echo'],
      ['fetal-echo', 'fetal-echocardiography'],
      ['whole-body-pet-scan', 'whole-body-pet-ct'],
      ['pet-scan', 'pet-ct'],
      ['nippt', 'nipt-test'],
      ['nip-t-test', 'nipt-test'],
      ['npt-test-pregnancy', 'nipt-test'],
    ];

    // Legacy region & location rewrites (specific sub-paths must precede bare region rule)
    const regionLocationRewrites = [
      ['mumbai-suburban/mumbra', 'thane/mumbra'],
      ['mumbai-suburban/diva', 'thane/diva'],
      ['mumbai-suburban/shahapur', 'thane/shahapur'],
      ['mumbai-suburban/wada', 'thane/wada'],
      ['mumbai-suburban/mira-bhayandar', 'thane/mira-road'],
      ['western-suburbs/mira-bhayandar', 'thane/mira-road'],
      ['mumbai-suburban/bhiwandi-town', 'thane/bhiwandi'],
      ['mumbai-suburban/thane-city', 'thane/thane-west'],
      ['mumbai-suburban/navi-mumbai-east', 'navi-mumbai/vashi'],
      ['mumbai-suburban', 'thane'],
      ['raigad/old-panvel', 'navi-mumbai/old-panvel'],
      ['raigad/khandeshwar', 'navi-mumbai/khandeshwar'],
      ['raigad/karanjade', 'navi-mumbai/karanjade'],
    ];

    // 2. Combined service + region/location rewrites -> 1-hop 301 directly to canonical L2/L3
    const combinedRedirects = [];
    for (const [oldSvc, newSvc] of serviceRewrites) {
      for (const [oldRL, newRL] of regionLocationRewrites) {
        combinedRedirects.push({
          source: `/services/${oldSvc}/${oldRL}`,
          destination: `/services/${newSvc}/${newRL}`,
          statusCode: 301,
        });
      }
    }

    // 3. Single-axis region/location consolidation (skipping retired ambulance routes -> 410 Gone)
    const regionLocationRedirects = regionLocationRewrites.map(([oldRL, newRL]) => ({
      source: `/services/${NON_AMBULANCE_SERVICE}/${oldRL}`,
      destination: '/services/:service/' + newRL,
      statusCode: 301,
    }));

    // 4. Single-axis synonym & NIPT typo service redirects -> 1-hop 301
    const singleServiceRedirects = serviceRewrites.map(([oldSvc, newSvc]) => ({
      source: `/services/${oldSvc}/:path*`,
      destination: `/services/${newSvc}/:path*`,
      statusCode: 301,
    }));

    // 5. Duplicate WordPress /blog/* -> canonical /services/* 301 redirects
    const blogToServiceRedirects = Object.entries(blogRedirects).map(([slug, destination]) => ({
      source: `/blog/${slug}`,
      destination,
      statusCode: 301,
    }));

    // 6. Legal page consolidation -> 1-hop 301
    const legalRedirects = [
      { source: '/refund-returns', destination: '/refund-policy', statusCode: 301 },
      { source: '/return-policy', destination: '/refund-policy', statusCode: 301 },
      { source: '/disclaimers', destination: '/medical-disclaimer', statusCode: 301 },
    ];

    return [
      ...surgicalRedirects,
      ...combinedRedirects,
      ...regionLocationRedirects,
      ...singleServiceRedirects,
      ...blogToServiceRedirects,
      ...legalRedirects,
    ];
  },
  async rewrites() {
    return [
      {
        source: '/booking-system',
        destination: '/booking-system/index.html',
      },
      {
        source: '/booking-system/',
        destination: '/booking-system/index.html',
      },
      {
        source: '/seo-image-optimizer',
        destination: '/seo-image-optimizer/index.html',
      },
      {
        source: '/seo-image-optimizer/',
        destination: '/seo-image-optimizer/index.html',
      },
    ];
  },
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';
    const staticHeaders = [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://embed.tawk.to https://cdn.jsdelivr.net https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://apis.google.com https://www.gstatic.com https://www.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://cdn.henoticdiagnostics.com https://storage.googleapis.com https://cms.henoticdiagnostics.com https://secure.gravatar.com https://www.facebook.com https://*.google.com https://*.gstatic.com https://*.googleapis.com https://*.google-analytics.com https://*.clarity.ms; connect-src 'self' https://cdn.henoticdiagnostics.com https://storage.googleapis.com https://cms.henoticdiagnostics.com https://api.razorpay.com https://*.google-analytics.com https://*.clarity.ms https://www.clarity.ms https://scripts.clarity.ms https://www.googletagmanager.com https://*.facebook.com https://connect.facebook.net wss://*.tawk.to https://*.tawk.to; frame-src 'self' https://api.razorpay.com https://embed.tawk.to https://www.google.com https://maps.google.com https://*.google.com https://*.gstatic.com https://storage.googleapis.com https://cdn.henoticdiagnostics.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self), usb=()' }
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/booking-system/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
        ],
      },
      {
        source: '/seo-image-optimizer/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/sitemaps/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];

    if (isProd) {
      staticHeaders.push(
        {
          source: '/(.*)\\.woff2',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        }
      );
    }

    return staticHeaders;
  },
};

module.exports = nextConfig;
