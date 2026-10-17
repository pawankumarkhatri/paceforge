"use client";

import { useMemo, useState } from "react";
import { VDOT_DISTANCE_OPTIONS, predictRaceTimes, vdotFromBenchmark } from "@/lib/vdot";
import { formatSeconds, parseTimeToSeconds } from "@/lib/time";
import { Card, CardContent } from "@/components/ui/card";
import { PastRaceBenchmark } from "@/components/ui/past-race-benchmark";
import { GuideNote } from "@/components/ui/guide-note";
import { VDOT_BENCHMARK_OPTIONS } from "@/lib/race-time-presets";

export function VdotHero() {
  const [distanceId, setDistanceId] = useState("half");
  const [timeInput, setTimeInput] = useState("1:45:00");

  const vdot = useMemo(() => {
    const sec = parseTimeToSeconds(timeInput);
    if (!sec) return null;
    return vdotFromBenchmark(distanceId, sec);
  }, [distanceId, timeInput]);

  const predictions = useMemo(() => {
    if (vdot == null) return null;
    return predictRaceTimes(vdot);
  }, [vdot]);

  return (
    <section id="vdot" className="scroll-mt-24 space-y-6">
      <Card>
        <CardContent className="pt-5 space-y-4">
          <p className="text-sm text-muted leading-relaxed">
            Choose the race you ran most recently. Accurate times from the last 1–3 months work best; tune-ups and
            all-out efforts are ideal.
          </p>
          <PastRaceBenchmark
            distanceId={distanceId}
            onDistanceChange={setDistanceId}
            timeValue={timeInput}
            onTimeChange={setTimeInput}
            distanceOptions={VDOT_BENCHMARK_OPTIONS.map((d) => ({ id: d.id, label: d.label }))}
            distanceLabel="Distance"
            timeLabel="Your finish time"
          />
        </CardContent>
      </Card>

      {vdot != null && predictions && (
        <>
          <GuideNote title="Your VDOT score">
            Higher VDOT means stronger aerobic fitness. The number is not a race prediction by itself — it powers the
            equivalent times below and training paces elsewhere in the app.
          </GuideNote>
          <div className="text-center py-4">
            <p className="text-sm text-muted mb-1">VDOT</p>
            <p className="text-6xl font-bold stat-value text-runner-green tracking-tight">{vdot}</p>
          </div>
        </>
      )}

      {predictions && (
        <>
          <p className="text-sm text-muted px-1">
            Equivalent times — if you raced each distance today at the same relative effort:
          </p>
          <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
            {VDOT_DISTANCE_OPTIONS.map((d) => (
              <li key={d.id} className="flex items-center justify-between px-4 py-3.5">
                <span className="text-muted">{d.label}</span>
                <span className="font-mono text-sm font-medium">
                  {formatSeconds(predictions[d.id], predictions[d.id] >= 3600)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default VdotHero;
