/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dl.airtable.com",
      "v5.airtableusercontent.com",
      // "airtableusercontent.com",
    ], // https://v5.airtableusercontent.com/v1/
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "airtableusercontent.com",
    //   },
    // ],
  },
};

module.exports = nextConfig;
