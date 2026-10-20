import type { Metadata } from "next";
import { RunnerJourney } from "@/components/journey/runner-journey";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { SeoFaq } from "@/components/seo/seo-faq";
import { seoFaqCopy } from "@/lib/seo-faq";
import { seo } from "@/lib/seo-metadata";

export const metadata: Metadata = seo.home;

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <FaqJsonLd items={seoFaqCopy.en.home} />
      <RunnerJourney />
      <SeoFaq section="home" />
    </>
  );
}
