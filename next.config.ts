import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;
if (!apiUrl) throw new Error("API_URL is not set");

const nextConfig: NextConfig = {
  images: {
    // ponytail: images are assumed to be served by the API host; add a separate pattern if they move to a CDN.
    remotePatterns: [new URL("/images/**", apiUrl)],
    // The mock server runs on localhost, which Next 16 refuses to optimise by default.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
