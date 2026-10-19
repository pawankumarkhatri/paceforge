import type { Metadata } from "next";
import { seo } from "@/lib/seo-metadata";
import { TrainingPageContent } from "./training-page-content";

export const metadata: Metadata = seo.training;

export default function TrainingPage() {
  return <TrainingPageContent />;
}
