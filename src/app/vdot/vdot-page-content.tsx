"use client";

import { VdotHero } from "@/components/endurance/vdot-predictor";
import { NextStepLinks } from "@/components/layout/next-step-links";
import { PageHeader } from "@/components/layout/page-header";
import { SeoFaq } from "@/components/seo/seo-faq";
import { VdotSeoIntro } from "@/components/seo/seo-intro";
import { GuideNote } from "@/components/ui/guide-note";
import { useI18n } from "@/lib/i18n/context";

export function VdotPageContent() {
  const { messages } = useI18n();

  return (
    <>
      <PageHeader
        path="/vdot"
        title={messages.vdotPage.title}
        description={messages.vdotPage.description}
      />
      <VdotSeoIntro />
      <GuideNote className="mb-6" title={messages.vdotPage.guideTitle}>
        {messages.vdotPage.guide}
      </GuideNote>
      <VdotHero />
      <NextStepLinks currentPath="/vdot" />
      <SeoFaq section="vdot" />
    </>
  );
}
