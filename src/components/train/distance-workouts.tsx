"use client";

import { useMemo, useState } from "react";
import { parseTimeToSeconds } from "@/lib/time";
import { Label } from "@/components/ui/label";
import {
  formatTrainingPaces,
  TRAINING_DISTANCE_OPTIONS,
  type TrainingDistanceId,
} from "@/lib/training-paces";
import { TRAINING_DISTANCE_HELP } from "@/lib/training-guide";
import { defaultPresetTime } from "@/lib/race-time-presets";
import { journeyPredictedTime } from "@/lib/journey-storage";
import { TimeDurationInput } from "@/components/ui/time-duration-input";

const WORKOUTS: Record<
  TrainingDistanceId,
  { name: string; detail: string; when: string }[]
> = {
  "5k": [
    {
      name: "Intervals",
      detail: "6 × 800 m @ interval pace, 2 min jog",
      when: "Once per week in a speed phase; full warm-up and cool-down.",
    },
    {
      name: "Tempo",
      detail: "15–20 min steady at threshold pace",
      when: "Mid-week; should feel hard but controlled — not all-out.",
    },
    {
      name: "Long run",
      detail: "45–60 min easy — last 10 min steady",
      when: "Weekly aerobic base; keep most of it truly easy.",
    },
  ],
  "10k": [
    {
      name: "Intervals",
      detail: "5 × 1 km @ interval pace, 2 min jog",
      when: "Builds VO₂; space hard days with easy days.",
    },
    {
      name: "Tempo",
      detail: "20–25 min at threshold pace",
      when: "Cornerstone workout for 10K race readiness.",
    },
    {
      name: "Long run",
      detail: "70–90 min easy — last 15 min moderate",
      when: "Longest run of the week; practice fueling if over 75 min.",
    },
  ],
  half: [
    {
      name: "Race pace",
      detail: "2 × 15 min @ half race pace, 4 min jog",
      when: "Teaches pacing; run on roads similar to your race.",
    },
    {
      name: "Tempo",
      detail: "25–35 min at threshold pace",
      when: "Sustained effort; split into 2 blocks if needed early in the block.",
    },
    {
      name: "Long run",
      detail: "Easy — last 20 min at half race pace",
      when: "Peak long runs approach 18–22 km for many half plans.",
    },
  ],
  marathon: [
    {
      name: "Marathon pace",
      detail: "2 × 20 min @ MP, 5 min jog",
      when: "Key dress rehearsal; practice gels and fluids at MP.",
    },
    {
      name: "Tempo",
      detail: "20–30 min steady at threshold pace",
      when: "Supports lactate threshold between long runs.",
    },
    {
      name: "Long run",
      detail: "Easy pace — last 15 min at marathon pace",
      when: "Gradually extend distance; never jump weekly volume more than ~10%.",
    },
  ],
};

function initialWorkoutState(): { distanceId: TrainingDistanceId; goal: string } {
  const distanceId: TrainingDistanceId = "marathon";
  if (typeof window === "undefined") {
    return { distanceId, goal: defaultPresetTime(distanceId) };
  }
  return {
    distanceId,
    goal: journeyPredictedTime(distanceId) ?? defaultPresetTime(distanceId),
  };
}

export function DistanceWorkouts() {
  const [{ distanceId, goal }, setTraining] = useState(initialWorkoutState);
  const [idx, setIdx] = useState(0);

  function onDistanceChange(id: TrainingDistanceId) {
    setTraining({
      distanceId: id,
      goal: journeyPredictedTime(id) ?? defaultPresetTime(id),
    });
    setIdx(0);
  }

  const goalSec = parseTimeToSeconds(goal);
  const racePaceSec = useMemo(() => {
    if (!goalSec) return null;
    const rows = formatTrainingPaces(goalSec, distanceId);
    return rows.find((r) => r.key === "race");
  }, [goalSec, distanceId]);

  const presets = WORKOUTS[distanceId];
  const preset = presets[idx] ?? presets[0];

  const distanceLabel =
    TRAINING_DISTANCE_OPTIONS.find((d) => d.id === distanceId)?.label ?? "Race";

  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-2">
        <Label>Goal distance</Label>
        <select
          className="select-field"
          value={distanceId}
          onChange={(e) => onDistanceChange(e.target.value as TrainingDistanceId)}
        >
          {TRAINING_DISTANCE_OPTIONS.map((d) => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
        <p className="text-xs text-muted leading-relaxed">{TRAINING_DISTANCE_HELP[distanceId]}</p>
      </div>
      <TimeDurationInput
        label={`Goal ${distanceLabel} time`}
        value={goal}
        onChange={(next) => setTraining((t) => ({ ...t, goal: next }))}
      />
      <div className="space-y-2">
        <Label className="text-muted font-normal">Session type</Label>
        <div className="flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setIdx(i)}
              className={
                i === idx
                  ? "rounded-full bg-accent-muted text-runner-green px-4 py-2 text-sm font-semibold"
                  : "rounded-full border border-border px-4 py-2 text-sm text-muted"
              }
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-surface px-4 py-4 text-sm space-y-2">
        <p className="font-medium">{preset.name}</p>
        <p className="text-muted">{preset.detail}</p>
        <p className="text-xs text-muted leading-relaxed">{preset.when}</p>
        {racePaceSec && (
          <p className="font-mono text-runner-green pt-1">
            ~{racePaceSec.pacePerKm}/km race pace reference
          </p>
        )}
      </div>
    </div>
  );
}
