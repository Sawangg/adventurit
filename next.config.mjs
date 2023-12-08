import withBundleAnalyzer from "@next/bundle-analyzer";
import { env } from "./src/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: env.BUNDLE_ANALYZE,
});

export default bundleAnalyzerConfig(nextConfig);
