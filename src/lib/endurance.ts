import { formatPacePerKm, formatPacePerMile, formatSeconds, kmToMile, mileToKm } from "./time";

export const RACE_DISTANCES = [
  { id: "5k", label: "5K", km: 5 },
  { id: "10k", label: "10K", km: 10 },
  { id: "half", label: "Half Marathon", km: 21.097 },
  { id: "marathon", label: "Marathon", km: 42.195 },
] as const;

export type PacingProfile = "even" | "negative2" | "negative3" | "negative5" | "elevation";

export interface SplitRow {
  index: number;
  distanceKm: number;
  distanceMile: number;
  splitSeconds: number;
  elapsedSeconds: number;
  pacePerKm: number;
  pacePerMile: number;
}

function profileMultiplier(progress: number, profile: PacingProfile): number {
  const p = Math.min(1, Math.max(0, progress));
  switch (profile) {
    case "even":
      return 1;
    case "negative2":
      return 1.01 - 0.02 * p;
    case "negative3":
      return 1.015 - 0.03 * p;
    case "negative5":
      return 1.025 - 0.05 * p;
    case "elevation":
      return 1.02 - 0.04 * p + 0.02 * Math.sin(p * Math.PI);
    default:
      return 1;
  }
}

/** Build per-km splits for a target finish time and pacing profile */
export function buildSplitMatrix(
  totalDistanceKm: number,
  goalSeconds: number,
  profile: PacingProfile,
  splitUnitKm = 1,
): SplitRow[] {
  const rows: SplitRow[] = [];
  const fullSplits = Math.floor(totalDistanceKm / splitUnitKm);
  const remainder = totalDistanceKm - fullSplits * splitUnitKm;

  let elapsed = 0;
  const basePace = goalSeconds / totalDistanceKm;

  for (let i = 1; i <= fullSplits; i++) {
    const progress = i / totalDistanceKm;
    const prevProgress = (i - 1) / totalDistanceKm;
    const mid = (progress + prevProgress) / 2;
    const pace = basePace * profileMultiplier(mid, profile);
    const splitSec = pace * splitUnitKm;
    elapsed += splitSec;
    rows.push({
      index: i,
      distanceKm: i * splitUnitKm,
      distanceMile: kmToMile(i * splitUnitKm),
      splitSeconds: splitSec,
      elapsedSeconds: elapsed,
      pacePerKm: pace,
      pacePerMile: pace * (1.609344 / 1),
    });
  }

  if (remainder > 0.001) {
    const progress = totalDistanceKm / totalDistanceKm;
    const prevProgress = (totalDistanceKm - remainder) / totalDistanceKm;
    const mid = (progress + prevProgress) / 2;
    const pace = basePace * profileMultiplier(mid, profile);
    const splitSec = pace * remainder;
    elapsed += splitSec;
    rows.push({
      index: rows.length + 1,
      distanceKm: totalDistanceKm,
      distanceMile: kmToMile(totalDistanceKm),
      splitSeconds: splitSec,
      elapsedSeconds: elapsed,
      pacePerKm: pace,
      pacePerMile: pace * 1.609344,
    });
  }

  return rows;
}

export function splitMatrixToDisplay(rows: SplitRow[]) {
  return rows.map((r) => ({
    ...r,
    split: formatSeconds(r.splitSeconds),
    elapsed: formatSeconds(r.elapsedSeconds, r.elapsedSeconds >= 3600),
    paceKm: formatPacePerKm(r.pacePerKm),
    paceMile: formatPacePerMile(r.pacePerMile),
    distKm: r.distanceKm.toFixed(r.distanceKm % 1 === 0 ? 0 : 3),
    distMi: r.distanceMile.toFixed(2),
  }));
}

export function customDistanceKm(input: string): number | null {
  const n = Number(input);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export { mileToKm, kmToMile };
