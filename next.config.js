var withSentryConfig = require('@sentry/nextjs').withSentryConfig;
/** @type {import("next").NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  // TODO: remove when ready
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: '*.rmr.rocks',
      },
      {
        hostname: 'imgcover.manga-chan.me',
      },
    ],
  },
};

if (process.env.ANALYZE === 'true') {
  const bundleAnalyzerConfig = {
    enabled: true,
  };
  const withBundleAnalyzer = require('@next/bundle-analyzer')(bundleAnalyzerConfig);
  module.exports = withBundleAnalyzer(nextConfig);
} else {
  const { withSentryConfig } = require('@sentry/nextjs');
  module.exports.sentry = {
    hideSourceMaps: true,
  };

  module.exports = withSentryConfig(nextConfig, { silent: true });
}
