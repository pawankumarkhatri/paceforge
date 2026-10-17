"use client";

import { useMemo, useState } from "react";
import { parseTimeToSeconds } from "@/lib/time";
import {
  formatTrainingPaces,
  TRAINING_DISTANCE_OPTIONS,
  type TrainingDistanceId,
} from "@/lib/training-paces";
import { TRAINING_DISTANCE_HELP } from "@/lib/training-guide";
import { journeyPredictedTime } from "@/lib/journey-storage";
import { defaultPresetTime } from "@/lib/race-time-presets";
import { TimeDurationInput } from "@/components/ui/time-duration-input";
import { Label } from "@/components/ui/label";

function initialTrainingState(): { distanceId: TrainingDistanceId; goal: string } {
  const distanceId: TrainingDistanceId = "marathon";
  if (typeof window === "undefined") {
    return { distanceId, goal: defaultPresetTime(distanceId) };
  }
  const j = journeyPredictedTime(distanceId);
  return { distanceId, goal: j ?? defaultPresetTime(distanceId) };
}

export function TrainingPaces() {
  const [{ distanceId, goal }, setTraining] = useState(initialTrainingState);

  function onDistanceChange(id: TrainingDistanceId) {
    const fromJourney = journeyPredictedTime(id);
    setTraining({
      distanceId: id,
      goal: fromJourney ?? defaultPresetTime(id),
    });
  }

  const goalSec = parseTimeToSeconds(goal);
  const paces = useMemo(
    () => (goalSec ? formatTrainingPaces(goalSec, distanceId) : []),
    [goalSec, distanceId],
  );

  const distanceLabel =
    TRAINING_DISTANCE_OPTIONS.find((d) => d.id === distanceId)?.label ?? "Race";

  return (
    <div className="space-y-5 pt-2">
      <div className="space-y-2">
        <Label>Goal distance</Label>
        <p className="text-xs text-muted">Which race are you training for?</p>
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
      <p className="text-xs text-muted">
        Enter the time you are aiming for on race day, or keep the VDOT suggestion from Start if you completed the guide.
      </p>
      {paces.length > 0 && (
        <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
          {paces.map((p) => (
            <li key={p.key} className="px-4 py-3.5 text-sm space-y-1">
              <div className="flex justify-between gap-3">
                <span className="text-muted">{p.label}</span>
                <span className="font-mono font-medium shrink-0">{p.pacePerKm}/km</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">{p.help}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
