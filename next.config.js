/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
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
      // Legacy backward compat: /sitemap-1.xml → /sitemap/0.xml
      {
        source: '/sitemap-:id(\\d+).xml',
        destination: '/sitemap/:id.xml',
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
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://embed.tawk.to https://cdn.jsdelivr.net https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://apis.google.com https://www.gstatic.com https://www.clarity.ms https://scripts.clarity.ms https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://cdn.henoticdiagnostics.com https://storage.googleapis.com https://cms.henoticdiagnostics.com https://secure.gravatar.com https://www.facebook.com https://*.google.com https://*.gstatic.com https://*.googleapis.com https://*.google-analytics.com https://*.clarity.ms; connect-src 'self' https://cdn.henoticdiagnostics.com https://storage.googleapis.com https://cms.henoticdiagnostics.com https://api.razorpay.com https://*.google-analytics.com https://*.clarity.ms https://www.clarity.ms https://scripts.clarity.ms https://www.googletagmanager.com https://*.facebook.com https://connect.facebook.net wss://*.tawk.to https://*.tawk.to; frame-src 'self' https://api.razorpay.com https://embed.tawk.to https://www.google.com https://maps.google.com https://*.google.com https://*.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self), usb=()' }
        ],
      },
    ];

    if (isProd) {
      staticHeaders.push(
        {
          source: '/_next/static/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
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
