import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  // For newer Next.js versions it may be:
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;