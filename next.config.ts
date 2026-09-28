import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // ✅ Explicitly allows Next.js to fetch and optimize images from this store API
      new URL('https://fakestoreapi.com/**'),
      new URL('https://cdn.dummyjson.com/**'),
    ],
  },
};

export default nextConfig;
