import { LONG_DISTANCE_OPTIONS } from "./predictions";
import { VDOT_DISTANCE_OPTIONS } from "./vdot";

export const CUSTOM_RACE_TIME = "__custom__";

export type PresetDistanceId = string;

/** Common finish times per distance (display label + h:mm:ss or m:ss value). */
export const RACE_FINISH_PRESETS: Record<string, { label: string; value: string }[]> = {
  "5k": [
    { label: "18:00 — sub-20 pace", value: "18:00" },
    { label: "20:00", value: "20:00" },
    { label: "22:00", value: "22:00" },
    { label: "25:00", value: "25:00" },
    { label: "28:00", value: "28:00" },
    { label: "30:00", value: "30:00" },
  ],
  "10k": [
    { label: "38:00", value: "38:00" },
    { label: "42:00", value: "42:00" },
    { label: "45:00", value: "45:00" },
    { label: "50:00", value: "50:00" },
    { label: "55:00", value: "55:00" },
    { label: "60:00", value: "60:00" },
  ],
  "15k": [
    { label: "1:00:00", value: "1:00:00" },
    { label: "1:05:00", value: "1:05:00" },
    { label: "1:10:00", value: "1:10:00" },
    { label: "1:15:00", value: "1:15:00" },
  ],
  half: [
    { label: "1:25:00", value: "1:25:00" },
    { label: "1:30:00", value: "1:30:00" },
    { label: "1:35:00", value: "1:35:00" },
    { label: "1:40:00", value: "1:40:00" },
    { label: "1:45:00", value: "1:45:00" },
    { label: "1:50:00", value: "1:50:00" },
    { label: "2:00:00", value: "2:00:00" },
    { label: "2:10:00", value: "2:10:00" },
  ],
  marathon: [
    { label: "2:45:00", value: "2:45:00" },
    { label: "3:00:00", value: "3:00:00" },
    { label: "3:15:00", value: "3:15:00" },
    { label: "3:30:00", value: "3:30:00" },
    { label: "3:45:00", value: "3:45:00" },
    { label: "4:00:00", value: "4:00:00" },
    { label: "4:15:00", value: "4:15:00" },
    { label: "4:30:00", value: "4:30:00" },
    { label: "5:00:00", value: "5:00:00" },
  ],
  "30k": [
    { label: "2:00:00", value: "2:00:00" },
    { label: "2:15:00", value: "2:15:00" },
    { label: "2:30:00", value: "2:30:00" },
  ],
  "50k": [
    { label: "4:00:00", value: "4:00:00" },
    { label: "4:30:00", value: "4:30:00" },
    { label: "5:00:00", value: "5:00:00" },
    { label: "5:30:00", value: "5:30:00" },
  ],
  "1500": [
    { label: "4:30", value: "4:30" },
    { label: "5:00", value: "5:00" },
    { label: "5:30", value: "5:30" },
  ],
  "3k": [
    { label: "10:00", value: "10:00" },
    { label: "11:00", value: "11:00" },
    { label: "12:00", value: "12:00" },
    { label: "13:00", value: "13:00" },
  ],
};

export function presetsForDistance(distanceId: string) {
  return RACE_FINISH_PRESETS[distanceId] ?? RACE_FINISH_PRESETS["10k"];
}

export function defaultPresetTime(distanceId: string): string {
  const list = presetsForDistance(distanceId);
  const mid = list[Math.floor(list.length / 2)];
  return mid?.value ?? "45:00";
}

export function isPresetTime(distanceId: string, timeValue: string): boolean {
  return presetsForDistance(distanceId).some((p) => p.value === timeValue);
}

export const PREDICTOR_DISTANCE_OPTIONS = LONG_DISTANCE_OPTIONS.filter((d) =>
  ["5k", "10k", "half", "marathon"].includes(d.id),
);

export const VDOT_BENCHMARK_OPTIONS = VDOT_DISTANCE_OPTIONS;
