import type { Metadata } from "next";
import { RaceDayPageContent } from "@/app/race-day/race-day-page-content";
import { seo } from "@/lib/seo-metadata";

export const metadata: Metadata = seo.raceDay;

export default function RaceDayPage() {
  return <RaceDayPageContent />;
}
