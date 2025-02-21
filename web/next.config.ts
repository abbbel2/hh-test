import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/systems/menus',
        statusCode: 301
      }
    ]
  }
};

export default nextConfig;
