/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.NODE_ENV === 'development'
    ? {
        cacheMaxMemorySize: 0,
        // logging: {
        //   fetches: { fullUrl: true },
        // },
      }
    : {}),
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
