"use client";

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SplitMatrix } from "@/components/endurance/split-matrix";
import { PaceBand } from "@/components/endurance/pace-band";
import { FuelingCalculator } from "@/components/endurance/fueling-calculator";
import { NextStepLinks } from "@/components/layout/next-step-links";
import { PageHeader } from "@/components/layout/page-header";
import { GuideNote } from "@/components/ui/guide-note";
import { useI18n } from "@/lib/i18n/context";

export function RaceDayPageContent() {
  const { messages } = useI18n();
  const p = messages.raceDayPage;

  return (
    <>
      <PageHeader path="/race-day" title={p.title} description={p.description} />
      <GuideNote title={p.pickTitle} className="mb-6">
        {p.pick}{" "}
        <Link href="/vdot" className="text-runner-green hover:underline">VDOT</Link>
      </GuideNote>
      <Tabs defaultValue="splits">
        <TabsList>
          <TabsTrigger value="splits">{p.tabSplits}</TabsTrigger>
          <TabsTrigger value="band">{p.tabBand}</TabsTrigger>
          <TabsTrigger value="fuel">{p.tabFuel}</TabsTrigger>
        </TabsList>
        <TabsContent value="splits">
          <GuideNote className="mt-4 mb-2" title={p.splitsGuideTitle}>{p.splitsGuide}</GuideNote>
          <SplitMatrix />
        </TabsContent>
        <TabsContent value="band">
          <GuideNote className="mt-4 mb-2" title={p.bandGuideTitle}>{p.bandGuide}</GuideNote>
          <PaceBand />
        </TabsContent>
        <TabsContent value="fuel">
          <GuideNote className="mt-4 mb-2" title={p.fuelGuideTitle}>{p.fuelGuide}</GuideNote>
          <FuelingCalculator />
        </TabsContent>
      </Tabs>
      <NextStepLinks currentPath="/race-day" />
    </>
  );
}
