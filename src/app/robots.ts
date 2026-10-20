import type { MetadataRoute } from "next";

const SITEMAP_BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.paceforge.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/organizer",
    },
    sitemap: `${SITEMAP_BASE}/sitemap.xml`,
  };
}
