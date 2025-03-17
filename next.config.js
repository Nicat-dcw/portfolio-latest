/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      }
    ],
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin-app',
      },
      {
        source: '/admin/:path*',
        destination: '/admin-app/:path*',
      },
    ];
  },
}

module.exports = nextConfig 