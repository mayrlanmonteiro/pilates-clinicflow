import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pilates-clinicflow",
  assetPrefix: "/pilates-clinicflow",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
