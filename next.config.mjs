/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://13.210.239.98:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
