import type { NextConfig } from "next";

// Set when building for GitHub Pages, which serves this repo under a
// /<repo-name>/ subpath rather than the domain root.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/2026-quitcode-01-agentic-engineering-hw" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: { unoptimized: true },
};

export default nextConfig;
