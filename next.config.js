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
  async redirects() {
    return [
      // 1. Region consolidation: mumbai-suburban duplicate locations -> canonical regions
      {
        source: '/services/:service/mumbai-suburban/mumbra',
        destination: '/services/:service/thane/mumbra',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/diva',
        destination: '/services/:service/thane/diva',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/shahapur',
        destination: '/services/:service/thane/shahapur',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/wada',
        destination: '/services/:service/thane/wada',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/mira-bhayandar',
        destination: '/services/:service/western-suburbs/mira-bhayandar',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/bhiwandi-town',
        destination: '/services/:service/thane/bhiwandi',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/thane-city',
        destination: '/services/:service/thane/thane-west',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban/navi-mumbai-east',
        destination: '/services/:service/navi-mumbai/vashi',
        permanent: true,
      },
      {
        source: '/services/:service/mumbai-suburban',
        destination: '/services/:service/thane',
        permanent: true,
      },
      // 2. Region consolidation: raigad duplicates -> navi-mumbai canonicals
      {
        source: '/services/:service/raigad/old-panvel',
        destination: '/services/:service/navi-mumbai/old-panvel',
        permanent: true,
      },
      {
        source: '/services/:service/raigad/khandeshwar',
        destination: '/services/:service/navi-mumbai/khandeshwar',
        permanent: true,
      },
      {
        source: '/services/:service/raigad/karanjade',
        destination: '/services/:service/navi-mumbai/karanjade',
        permanent: true,
      },
      // 3. Synonym service slug consolidation -> canonical primary test
      {
        source: '/services/ecg-test/:path*',
        destination: '/services/ecg/:path*',
        permanent: true,
      },
      {
        source: '/services/electrocardiogram/:path*',
        destination: '/services/ecg/:path*',
        permanent: true,
      },
      {
        source: '/services/2d-echo-test/:path*',
        destination: '/services/2d-echo/:path*',
        permanent: true,
      },
      {
        source: '/services/echo-test/:path*',
        destination: '/services/2d-echo/:path*',
        permanent: true,
      },
      {
        source: '/services/echocardiography/:path*',
        destination: '/services/2d-echo/:path*',
        permanent: true,
      },
      {
        source: '/services/fetal-echo/:path*',
        destination: '/services/fetal-echocardiography/:path*',
        permanent: true,
      },
      {
        source: '/services/whole-body-pet-scan/:path*',
        destination: '/services/whole-body-pet-ct/:path*',
        permanent: true,
      },
      {
        source: '/services/pet-scan/:path*',
        destination: '/services/pet-ct/:path*',
        permanent: true,
      },
      // 4. Inpatient hospital surgical procedures: redirect micro-locations to main service guide
      {
        source: '/services/angioplasty/:region/:location',
        destination: '/services/angioplasty',
        permanent: true,
      },
      {
        source: '/services/tavr/:region/:location',
        destination: '/services/tavr',
        permanent: true,
      },
      {
        source: '/services/cardiac-catheterization/:region/:location',
        destination: '/services/cardiac-catheterization',
        permanent: true,
      },
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
