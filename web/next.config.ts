import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/systems/menus',
        statusCode: 200
      }
    ]
  }
};

export default nextConfig;
