"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/layout/page-header";
import { GuideNote } from "@/components/ui/guide-note";
import { TrainingPaces } from "@/components/train/training-paces";
import { KarvonenZones } from "@/components/train/karvonen-zones";
import { DistanceWorkouts } from "@/components/train/distance-workouts";
import { useI18n } from "@/lib/i18n/context";

export function TrainingPageContent() {
  const { messages } = useI18n();
  const p = messages.trainingPage;

  return (
    <>
      <PageHeader path="/training" title={p.title} description={p.description} />
      <GuideNote title={p.howTitle} className="mb-6">{p.how}</GuideNote>
      <Tabs defaultValue="paces">
        <TabsList>
          <TabsTrigger value="paces">{p.tabPaces}</TabsTrigger>
          <TabsTrigger value="hr">{p.tabHr}</TabsTrigger>
          <TabsTrigger value="workouts">{p.tabWorkouts}</TabsTrigger>
        </TabsList>
        <TabsContent value="paces">
          <GuideNote className="mt-4 mb-2" title={p.pacesGuideTitle}>{p.pacesGuide}</GuideNote>
          <TrainingPaces />
        </TabsContent>
        <TabsContent value="hr">
          <GuideNote className="mt-4 mb-2" title={p.hrGuideTitle}>{p.hrGuide}</GuideNote>
          <KarvonenZones />
        </TabsContent>
        <TabsContent value="workouts">
          <GuideNote className="mt-4 mb-2" title={p.workoutsGuideTitle}>{p.workoutsGuide}</GuideNote>
          <DistanceWorkouts />
        </TabsContent>
      </Tabs>
    </>
  );
}
