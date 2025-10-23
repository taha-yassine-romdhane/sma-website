import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['via.placeholder.com'],
  },
};

export default nextConfig;
