import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Loyiha ildizini aniq belgilaymiz — C:\Users\admin dagi adashgan
  // package-lock.json ni Next.js ildiz deb taxmin qilmasligi uchun.
  turbopack: {
    root: path.resolve(__dirname),
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules|\.next\/|\.tsbuildinfo$/,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
