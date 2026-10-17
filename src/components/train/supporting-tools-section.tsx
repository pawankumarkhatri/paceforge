"use client";

import { SupportingPredictors } from "@/components/train/supporting-predictors";
import { KarvonenZones } from "@/components/train/karvonen-zones";
import { TrainingPaces } from "@/components/train/training-paces";
import { DistanceWorkouts } from "@/components/train/distance-workouts";

export function SupportingToolsSection() {
  return (
    <section className="space-y-6" aria-labelledby="supporting-tools-heading">
      <h2 id="supporting-tools-heading" className="sr-only">Training tool modules</h2>
      <SupportingPredictors />
      <div className="grid gap-6 lg:grid-cols-2">
        <KarvonenZones />
        <TrainingPaces />
      </div>
      <DistanceWorkouts />
    </section>
  );
}
