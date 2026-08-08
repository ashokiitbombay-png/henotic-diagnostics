/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 95],
    // Optimized breakpoints: mobile → tablet → desktop → retina
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
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
    optimizePackageImports: ['lucide-react', '@apollo/client', 'framer-motion'],
  },
  // Turbopack is the default bundler in Next.js 16+.
  // Empty config tells Next.js to use Turbopack defaults while keeping
  // the webpack config below for any webpack-specific builds.
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-sync-external-store)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/](lucide-react|@apollo\/client|graphql)[\\/]/,
              name: 'commons',
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/media-cdn/:path*',
        destination: 'https://storage.googleapis.com/wp-media-henoticbucket/:path*',
      },
      // Legacy backward compat: /sitemap-1.xml → /sitemap/0.xml (new dynamic route)
      {
        source: '/sitemap-:id(\\d+).xml',
        destination: '/sitemap/:id.xml',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net https://embed.tawk.to https://cdn.jsdelivr.net https://cdn.tailwindcss.com https://cdnjs.cloudflare.com https://apis.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: blob: https://storage.googleapis.com https://cms.henoticdiagnostics.com https://secure.gravatar.com https://www.facebook.com https://*.google.com https://*.gstatic.com https://*.googleapis.com; connect-src 'self' https://storage.googleapis.com https://cms.henoticdiagnostics.com https://api.razorpay.com https://*.sentry.io https://*.google-analytics.com https://*.clarity.ms https://www.googletagmanager.com; frame-src 'self' https://api.razorpay.com https://embed.tawk.to https://www.google.com https://maps.google.com https://*.google.com https://*.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self), usb=()' }
        ],
      },
      // Immutable cache for Next.js build artifacts
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache optimized images for 1 year
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache font files
      {
        source: '/(.*)\\.woff2',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;