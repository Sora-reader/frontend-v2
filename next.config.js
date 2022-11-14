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
    domains: [
      'imgcover.manga-chan.me',
      'staticrm.rmr.rocks',
      ...[...Array(30)].map((_, i) => `h${i}.rmr.rocks`),
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
  module.exports = nextConfig;
}
