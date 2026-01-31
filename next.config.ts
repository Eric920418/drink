import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-6928b05557e74f1da5d882d19c63577f.r2.dev',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
