/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Send www traffic to the apex host. The Vercel domain settings should
    // ALSO be set to redirect www.spyglassinsurance.com -> spyglassinsurance.com.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.spyglassinsurance.com" }],
        destination: "https://spyglassinsurance.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
