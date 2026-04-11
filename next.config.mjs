/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — produces pre-rendered .html for every route in /out.
  // Deploy the contents of /out to any static host (GitHub Pages, S3, Netlify, etc.)
  output: "export",
  reactStrictMode: true,
  images: {
    // Next/Image optimization requires a server; disable for static export.
    unoptimized: true,
  },
  // Emit /about.html, /products/avans-rac.html, etc. instead of folder/index.html.
  // Comment this out if you'd rather have trailing-slash routing.
  trailingSlash: false,
};

export default nextConfig;
