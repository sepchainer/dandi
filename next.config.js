/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Suppress the punycode warning
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch/ },
      { message: /Critical dependency: the request of a dependency is an expression/ },
    ];
    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig; 