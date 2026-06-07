/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Enables gzip/brotli compression for faster text/code loading
  poweredByHeader: false, // Security & slight speed boost
  reactStrictMode: true,
  compiler: {
    // Strips console.logs in production to reduce JavaScript bundle size
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ['image/avif', 'image/webp'], // Forces next-gen image formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 31536000, // Caches images for 1 year in browser
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ],
      },
      {
        // Cache static assets aggressively for PageSpeed
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      }
    ];
  },
};

export default nextConfig;