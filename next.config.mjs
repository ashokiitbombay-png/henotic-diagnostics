/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Force browsers to constantly check for new images and pages
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;