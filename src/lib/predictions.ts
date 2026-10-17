/** Race distances for long-distance / marathon ecosystem (meters). */
export const LONG_DISTANCE_OPTIONS = [
  { id: "5k", label: "5K", meters: 5000 },
  { id: "10k", label: "10K", meters: 10000 },
  { id: "15k", label: "15K", meters: 15000 },
  { id: "10mi", label: "10 Mile", meters: 16093.4 },
  { id: "half", label: "Half Marathon", meters: 21097.5 },
  { id: "30k", label: "30K", meters: 30000 },
  { id: "marathon", label: "Marathon", meters: 42195 },
  { id: "50k", label: "50K Ultra", meters: 50000 },
] as const;

export type LongDistanceId = (typeof LONG_DISTANCE_OPTIONS)[number]["id"];

export function metersForId(id: string): number | null {
  return LONG_DISTANCE_OPTIONS.find((d) => d.id === id)?.meters ?? null;
}

/** Pete Riegel (1981): T2 = T1 × (D2/D1)^1.06 */
export function riegelPredict(timeSeconds: number, fromMeters: number, toMeters: number): number {
  if (timeSeconds <= 0 || fromMeters <= 0 || toMeters <= 0) return 0;
  return timeSeconds * Math.pow(toMeters / fromMeters, 1.06);
}

function cameronFactor(distanceMeters: number): number {
  return (
    13.49681 -
    0.000030363 * distanceMeters +
    835.7114 / Math.pow(distanceMeters, 0.7905)
  );
}

/** David F. Cameron model (Run-Down / WPI); best for 800m–marathon+. */
export function cameronPredict(timeSeconds: number, fromMeters: number, toMeters: number): number {
  if (timeSeconds <= 0 || fromMeters <= 0 || toMeters <= 0) return 0;
  const a = cameronFactor(fromMeters);
  const b = cameronFactor(toMeters);
  return (timeSeconds / fromMeters) * (a / b) * toMeters;
}

export function predictAllDistances(
  timeSeconds: number,
  fromMeters: number,
  method: "riegel" | "cameron",
): Record<string, number> {
  const fn = method === "riegel" ? riegelPredict : cameronPredict;
  const out: Record<string, number> = {};
  for (const d of LONG_DISTANCE_OPTIONS) {
    out[d.id] = fn(timeSeconds, fromMeters, d.meters);
  }
  return out;
}
