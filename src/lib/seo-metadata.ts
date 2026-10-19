import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-url";

function canonicalPath(path: string): string {
  const base = siteUrl();
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

function pageSeo({ title, description, path, keywords }: PageSeoInput): Metadata {
  const url = canonicalPath(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "PaceForge",
      locale: "en_IN",
      alternateLocale: ["hi_IN"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const seo = {
  home: pageSeo({
    title: "Free VDOT & Marathon Training Plan",
    description:
      "Turn your last race into a VDOT score, training paces, and race-day splits. Guided 4-step flow in English and Hindi. Works on mobile—add to home screen.",
    path: "/",
    keywords: [
      "VDOT calculator",
      "marathon training plan",
      "running pace calculator",
      "race split calculator",
      "PaceForge",
    ],
  }),
  vdot: pageSeo({
    title: "VDOT Calculator — Race Fitness Score",
    description:
      "Calculate VDOT from a recent 5K, 10K, half marathon, or marathon time. See equivalent finish times at every distance and jump to training paces or race-day tools.",
    path: "/vdot",
    keywords: ["VDOT calculator", "Jack Daniels VDOT", "equivalent race times", "running fitness score"],
  }),
  training: pageSeo({
    title: "Training Paces & Heart-Rate Zones",
    description:
      "Goal-race training paces, Karvonen heart-rate zones, and sample workouts for 5K through marathon. Built for runners using VDOT or your own target time.",
    path: "/training",
    keywords: ["training pace calculator", "marathon pace chart", "Karvonen zones", "running workouts"],
  }),
  raceDay: pageSeo({
    title: "Race Day — Splits, Pace Band & Fueling",
    description:
      "Build kilometer splits from goal time, download a lock-screen pace band or PDF wrist strip, and plan carbs, fluid, and gel timing before the start line.",
    path: "/race-day",
    keywords: ["marathon pace band", "race split calculator", "marathon fueling plan", "negative split"],
  }),
};
