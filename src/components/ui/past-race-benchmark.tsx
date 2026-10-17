"use client";

import { Label } from "@/components/ui/label";
import { TimeDurationInput } from "@/components/ui/time-duration-input";
import { defaultPresetTime } from "@/lib/race-time-presets";

export interface DistanceOption {
  id: string;
  label: string;
}

export interface PastRaceBenchmarkProps {
  distanceId: string;
  onDistanceChange: (id: string) => void;
  timeValue: string;
  onTimeChange: (time: string) => void;
  distanceOptions: DistanceOption[];
  distanceLabel?: string;
  timeLabel?: string;
}

export function PastRaceBenchmark({
  distanceId,
  onDistanceChange,
  timeValue,
  onTimeChange,
  distanceOptions,
  distanceLabel = "Distance",
  timeLabel = "Finish time",
}: PastRaceBenchmarkProps) {
  function handleDistanceSelect(id: string) {
    onDistanceChange(id);
    onTimeChange(defaultPresetTime(id));
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>{distanceLabel}</Label>
        <select
          className="select-field"
          value={distanceId}
          onChange={(e) => handleDistanceSelect(e.target.value)}
        >
          {distanceOptions.map((d) => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>
      <TimeDurationInput
        key={distanceId}
        summaryLabel={timeLabel}
        hintText="Enter the time from your past race result"
        value={timeValue}
        onChange={onTimeChange}
      />
    </div>
  );
}
