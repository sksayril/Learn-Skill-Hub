const path = require("path");

const assetsDir = path.join(__dirname, "..", "..", "attached_assets");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizePackageImports: ["@radix-ui"],
  },
  turbopack: {
    resolveAlias: {
      "@assets": assetsDir,
    },
  },
  webpack: (config) => {
    config.resolve.alias["@assets"] = assetsDir;
    return config;
  },
};

module.exports = nextConfig;
