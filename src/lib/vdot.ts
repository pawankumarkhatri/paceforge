/**
 * Jack Daniels VDOT-style race predictor (client-side approximation).
 * Based on oxygen cost of running velocity and fractional utilization vs duration.
 */

const DISTANCES_M: Record<string, number> = {
  "1500": 1500,
  "3k": 3000,
  "5k": 5000,
  "10k": 10000,
  half: 21097.5,
  marathon: 42195,
};

export const VDOT_DISTANCE_OPTIONS = [
  { id: "1500", label: "1500m" },
  { id: "3k", label: "3K" },
  { id: "5k", label: "5K" },
  { id: "10k", label: "10K" },
  { id: "half", label: "Half Marathon" },
  { id: "marathon", label: "Marathon" },
] as const;

function percentVo2Max(durationMinutes: number): number {
  const t = Math.max(1, durationMinutes);
  return 0.8 + 0.1894393 * Math.exp(-0.012778 * t) + 0.2989558 * Math.exp(-0.1932605 * t);
}

function vo2FromVelocityMPerMin(vMmin: number): number {
  return -4.6 + 0.182258 * vMmin + 0.000104 * vMmin * vMmin;
}

function velocityFromVo2(vo2: number): number {
  const a = 0.000104;
  const b = 0.182258;
  const c = -4.6 - vo2;
  const disc = b * b - 4 * a * c;
  if (disc < 0) return 0;
  return (-b + Math.sqrt(disc)) / (2 * a);
}

export function computeVdot(distanceMeters: number, timeSeconds: number): number {
  const vMmin = (distanceMeters / timeSeconds) * 60;
  const vo2 = vo2FromVelocityMPerMin(vMmin);
  const pct = percentVo2Max(timeSeconds / 60);
  return vo2 / pct;
}

function predictTimeSeconds(vdot: number, distanceMeters: number): number {
  let lo = 60;
  let hi = distanceMeters < 10000 ? 3600 * 2 : 3600 * 8;
  for (let i = 0; i < 48; i++) {
    const mid = (lo + hi) / 2;
    const v = computeVdot(distanceMeters, mid);
    if (v > vdot) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function predictRaceTimes(vdot: number): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [key, meters] of Object.entries(DISTANCES_M)) {
    out[key] = predictTimeSeconds(vdot, meters);
  }
  return out;
}

export function vdotFromBenchmark(distanceId: string, timeSeconds: number): number | null {
  const m = DISTANCES_M[distanceId];
  if (!m || timeSeconds <= 0) return null;
  return Math.round(computeVdot(m, timeSeconds) * 10) / 10;
}
