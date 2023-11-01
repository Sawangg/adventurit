import withBundleAnalyzer from "@next/bundle-analyzer";
import { env } from "./src/env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    dangerouslyAllowSVG: env.NODE_ENV !== "production" ? true : false,
    contentDispositionType: env.NODE_ENV !== "production" ? "attachment" : undefined,
  },
};

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default bundleAnalyzerConfig(nextConfig);
