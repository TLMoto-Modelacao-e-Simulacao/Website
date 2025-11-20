import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const normalizedBasePath = rawBasePath ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}` : '';
const normalizedAssetPrefix = normalizedBasePath ? `${normalizedBasePath}/` : undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  ...(normalizedBasePath ? { basePath: normalizedBasePath } : {}),
  ...(normalizedAssetPrefix ? { assetPrefix: normalizedAssetPrefix } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer(nextConfig);
