/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in production
  trailingSlash: false, // Adjust if needed
  distDir: '.next', // Use default unless explicitly required
  // Uncomment if using export mode:
  // output: 'export'
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
