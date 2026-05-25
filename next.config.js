/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Giữ lại dòng này để không bị tính phí tối ưu ảnh trên Vercel
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

module.exports = nextConfig;