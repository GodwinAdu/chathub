import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      // Wildcard path matching
      {
        source: "/",
        destination: "/chat/new",
      },
    ];
  },
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/api/anthropic/:path*",
  //         destination: "https://api.anthropic.com/v1/messages",
  //         // Proxy to Backend
  //       },
  //     ];
  //   },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
