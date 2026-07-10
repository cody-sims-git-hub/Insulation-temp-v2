/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export (SSG) — emits plain HTML/JS/CSS to out/ for Hostinger
  // static hosting via the SDP deploy flow (no runtime Node server).
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
