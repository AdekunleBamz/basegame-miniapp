/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint during production builds on Vercel to avoid CI-only lint config issues
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    // Alias react-native async-storage to a small browser shim so server/browser builds
    // do not try to install React Native packages (which cause peer dependency conflicts).
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': require('path').resolve(__dirname, 'src/shims/asyncStorage.js'),
    }
    return config;
  },
  images: {
    domains: ['basescan.org'],
  },
}

module.exports = nextConfig
