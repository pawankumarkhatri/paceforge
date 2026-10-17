import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    { source: "/sprint", destination: "/training", permanent: true },
    { source: "/endurance", destination: "/race-day", permanent: true },
    { source: "/train", destination: "/vdot", permanent: true },
    { source: "/director/login", destination: "/organizer", permanent: false },
    { source: "/organizer/access", destination: "/organizer", permanent: false },
    { source: "/vault", destination: "/race-day", permanent: false },
  ],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
