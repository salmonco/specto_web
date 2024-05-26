/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://13.210.239.98:8080/:path*`,
        // destination: `http://localhost:8080/:path*`,
      },
    ];
  },
};

export default nextConfig;
