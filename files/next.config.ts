import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // allow api.anthropic.com for AI Summary feature
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
