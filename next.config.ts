import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prisma needs to be treated as an external package in v16/Turbopack
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
