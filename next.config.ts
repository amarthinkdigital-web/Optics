import type { NextConfig } from "next";

const nextConfig: any = {
  allowedDevOrigins: ["192.168.1.15", "localhost"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    qualities: [75, 100],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
