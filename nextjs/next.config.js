/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'stylesheets')],
  },
}

module.exports = nextConfig
