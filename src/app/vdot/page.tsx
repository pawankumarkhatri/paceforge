import type { Metadata } from "next";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { seoFaqCopy } from "@/lib/seo-faq";
import { seo } from "@/lib/seo-metadata";
import { VdotPageContent } from "./vdot-page-content";

export const metadata: Metadata = seo.vdot;

export default function VdotPage() {
  return (
    <>
      <FaqJsonLd items={seoFaqCopy.en.vdot} />
      <VdotPageContent />
    </>
  );
}
