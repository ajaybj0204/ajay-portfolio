import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site to ./out,
 * which Netlify serves directly (no server, no functions, free tier friendly).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true }, // images in /public are already compressed WebP
  poweredByHeader: false,
};

export default nextConfig;
