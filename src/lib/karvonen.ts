export type HrZoneKey = "z1" | "z2" | "z3" | "z4" | "z5";

export interface HrZone {
  key: HrZoneKey;
  name: string;
  intensityMin: number;
  intensityMax: number;
  hrMin: number;
  hrMax: number;
  purpose: string;
}

const ZONE_META: { key: HrZoneKey; name: string; min: number; max: number; purpose: string }[] = [
  { key: "z1", name: "Recovery", min: 0.5, max: 0.6, purpose: "Easy recovery, blood flow" },
  { key: "z2", name: "Aerobic base", min: 0.6, max: 0.7, purpose: "Long runs, fat oxidation" },
  { key: "z3", name: "Tempo", min: 0.7, max: 0.8, purpose: "Marathon-pace efforts, steady state" },
  { key: "z4", name: "Threshold", min: 0.8, max: 0.9, purpose: "LT intervals, half-marathon pace" },
  { key: "z5", name: "VO₂ max", min: 0.9, max: 1.0, purpose: "Short reps, 5K–10K speed" },
];

/** Karvonen: THR = (HRmax − HRrest) × intensity% + HRrest */
export function karvonenHeartRate(
  maxHr: number,
  restHr: number,
  intensityFraction: number,
): number {
  const reserve = maxHr - restHr;
  return Math.round(restHr + reserve * intensityFraction);
}

export function buildKarvonenZones(maxHr: number, restHr: number): HrZone[] {
  const reserve = maxHr - restHr;
  if (reserve <= 0) return [];
  return ZONE_META.map((z) => ({
    key: z.key,
    name: z.name,
    intensityMin: z.min,
    intensityMax: z.max,
    hrMin: karvonenHeartRate(maxHr, restHr, z.min),
    hrMax: karvonenHeartRate(maxHr, restHr, z.max),
    purpose: z.purpose,
  }));
}

/** Age-based max HR estimate (220 − age) when lab test unavailable */
export function estimateMaxHr(age: number): number {
  return Math.max(120, Math.round(220 - age));
}
