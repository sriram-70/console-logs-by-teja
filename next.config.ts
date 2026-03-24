import type { NextConfig } from "next";

const nextConfig: any = {
  images: {
    // Optimize for ultra-high resolution displays (8K)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 7680],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  // Enable tree shaking for smaller client bundles
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
