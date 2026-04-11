/** @type {import('next').NextConfig} */

// Deploying to https://solarmason.github.io/SEMS, so basePath must be /SEMS
// in production. Local dev (`npm run dev`) runs at / for convenience.
const basePath = process.env.NODE_ENV === "production" ? "/SEMS" : "";

const nextConfig = {
  // Static HTML export — produces pre-rendered .html for every route in /out.
  output: "export",
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath,
  images: {
    // Next/Image optimization requires a server; disable for static export.
    unoptimized: true,
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
