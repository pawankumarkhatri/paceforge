import type { Metadata } from "next";
import { RunnerJourney } from "@/components/journey/runner-journey";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { seo } from "@/lib/seo-metadata";

export const metadata: Metadata = seo.home;

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <RunnerJourney />
    </>
  );
}
