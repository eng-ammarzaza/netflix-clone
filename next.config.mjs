/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["images.unsplash.com", "i.ytimg.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
