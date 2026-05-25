import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',           // Bắt buộc để deploy static lên GitHub Pages
  trailingSlash: true,        // Khuyến nghị cho static export

  images: {
    unoptimized: true,        // Bắt buộc khi export static
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
    qualities: [75, 90],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;