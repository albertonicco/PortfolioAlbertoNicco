/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-7c5076f197174b8bb4de783798a7953f.r2.dev",
      },
    ],
  },
};

export default nextConfig;
