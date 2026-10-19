import type { Metadata } from "next";
import { seo } from "@/lib/seo-metadata";
import { VdotPageContent } from "./vdot-page-content";

export const metadata: Metadata = seo.vdot;

export default function VdotPage() {
  return <VdotPageContent />;
}
