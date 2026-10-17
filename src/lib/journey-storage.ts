import { predictRaceTimes } from "./vdot";
import { formatSeconds } from "./time";

export interface JourneyState {
  distanceId: string;
  timeValue: string;
  vdot: number | null;
  step: number;
}

/** In-memory only — cleared on full page refresh. */
let memoryJourney: JourneyState | null = null;

const LEGACY_KEY = "paceforge_journey";

if (typeof window !== "undefined") {
  sessionStorage.removeItem(LEGACY_KEY);
}

export function loadJourney(): JourneyState | null {
  return memoryJourney;
}

export function saveJourney(state: JourneyState) {
  memoryJourney = state;
}

export function clearJourney() {
  memoryJourney = null;
}

/** Predicted finish time for a distance from guided-flow VDOT, if available. */
export function journeyPredictedTime(distanceId: string): string | null {
  const j = loadJourney();
  if (j?.vdot == null) return null;
  const sec = predictRaceTimes(j.vdot)[distanceId];
  if (sec == null) return null;
  return formatSeconds(sec, sec >= 3600);
}

/** Marathon goal time from guided flow VDOT, if available. */
export function journeyMarathonTime(): string | null {
  return journeyPredictedTime("marathon");
}
