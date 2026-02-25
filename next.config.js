/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export when using Lean Validation Backend (API routes require a server).
  // Set ENABLE_LEAN_BACKEND=true and deploy to Vercel for waitlist/investors/ROI APIs.
  output: process.env.ENABLE_LEAN_BACKEND === 'true' ? undefined : 'export',
  // Vercel expects .next when using server/API routes. Use dist only for production static export.
  distDir:
    process.env.NODE_ENV === 'production' && process.env.ENABLE_LEAN_BACKEND !== 'true'
      ? 'dist'
      : '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

module.exports = nextConfig;
