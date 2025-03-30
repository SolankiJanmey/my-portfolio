import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
};

export default nextConfig;
