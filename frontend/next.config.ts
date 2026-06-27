import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Loyiha ildizini aniq belgilaymiz — C:\Users\admin dagi adashgan
  // package-lock.json ni Next.js ildiz deb taxmin qilmasligi uchun.
  turbopack: {
    root: path.resolve(__dirname),
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
