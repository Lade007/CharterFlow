/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@charterflow/ui', '@charterflow/shared'],
  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },
  // Suppress console warnings about browser extensions in development
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: 'all',
      };
    }
    return config;
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig
