/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
