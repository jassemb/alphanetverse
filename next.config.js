/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false, // Disable source maps in production
  trailingSlash: false, // Adjust if needed
  distDir: '.next', // Use default unless explicitly required
  // Uncomment if using export mode:
  // output: 'export'
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com','51.77.230.180'],
  },
};

module.exports = nextConfig;
