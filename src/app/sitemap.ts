import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const paths = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/vdot", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/training", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/race-day", changeFrequency: "monthly" as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();
  return paths.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
