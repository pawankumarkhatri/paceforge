import { metersForId } from "./predictions";
import { PACE_TYPE_HELP } from "./training-guide";
import { formatSeconds } from "./time";

export const TRAINING_DISTANCE_OPTIONS = [
  { id: "5k", label: "5K" },
  { id: "10k", label: "10K" },
  { id: "half", label: "Half Marathon" },
  { id: "marathon", label: "Marathon" },
] as const;

export type TrainingDistanceId = (typeof TRAINING_DISTANCE_OPTIONS)[number]["id"];

function racePaceLabel(distanceId: string): string {
  if (distanceId === "marathon") return "Marathon pace";
  const match = TRAINING_DISTANCE_OPTIONS.find((d) => d.id === distanceId);
  return match ? `${match.label} race pace` : "Race pace";
}

/** Daniels-style paces from goal finish time at a given race distance. */
export function raceTrainingPaceTypes(distanceId: string) {
  const raceLabel = racePaceLabel(distanceId);
  return {
    easy: { factor: 1.2, label: "Easy / long run", help: PACE_TYPE_HELP.easy },
    race: { factor: 1.0, label: raceLabel, help: PACE_TYPE_HELP.race },
    threshold: { factor: 0.92, label: "Threshold (tempo)", help: PACE_TYPE_HELP.threshold },
    interval: { factor: 0.88, label: "VO₂ / interval", help: PACE_TYPE_HELP.interval },
    rep: { factor: 0.85, label: "Repetition", help: PACE_TYPE_HELP.rep },
  } as const;
}

export function formatTrainingPaces(goalRaceSeconds: number, distanceId: string) {
  const meters = metersForId(distanceId);
  if (!meters || goalRaceSeconds <= 0) return [];
  const distanceKm = meters / 1000;
  const base = goalRaceSeconds / distanceKm;
  const paces = raceTrainingPaceTypes(distanceId);
  return Object.entries(paces).map(([key, meta]) => ({
    key,
    label: meta.label,
    help: meta.help,
    pacePerKm: formatSeconds(base * meta.factor),
    pacePerMile: formatSeconds(base * meta.factor * 1.609344),
  }));
}
