import type { NextConfig } from "next";

const isStaticExport = process.env.BUILD_STATIC === "1";

const nextConfig: NextConfig = {
  // Hostinger shared hosting serves static files only (no Node.js runtime).
  // Run `BUILD_STATIC=1 npm run build:static` to emit plain HTML/CSS/JS into ./out
  // for upload via FileZilla. Omit BUILD_STATIC for normal/Vercel builds.
  ...(isStaticExport ? { output: "export" } : {}),
  images: { unoptimized: true },
};

export default nextConfig;
