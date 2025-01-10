/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  productionBrowserSourceMaps: false, // Disable source maps in production
  trailingSlash: true,

};

module.exports = nextConfig;