import { formatSeconds } from "./time";

export const TRACK_DISTANCES = [
  { id: "60", label: "60m", meters: 60 },
  { id: "100", label: "100m", meters: 100 },
  { id: "200", label: "200m", meters: 200 },
  { id: "400", label: "400m", meters: 400 },
  { id: "800", label: "800m", meters: 800 },
  { id: "1500", label: "1500m", meters: 1500 },
  { id: "mile", label: "1 Mile", meters: 1609.344 },
  { id: "3k", label: "3K", meters: 3000 },
] as const;

export type TrackDistanceId = (typeof TRACK_DISTANCES)[number]["id"];

export interface VelocityResult {
  metersPerSecond: number;
  kmPerHour: number;
  mph: number;
  split100m: string;
  split200m: string;
  split400m: string;
}

export function computeVelocity(totalSeconds: number, distanceMeters: number): VelocityResult {
  const mps = distanceMeters / totalSeconds;
  const kmh = mps * 3.6;
  const mph = mps * 2.23694;
  return {
    metersPerSecond: mps,
    kmPerHour: kmh,
    mph,
    split100m: formatSeconds(100 / mps),
    split200m: formatSeconds(200 / mps),
    split400m: formatSeconds(400 / mps),
  };
}

export interface IntervalSegment {
  id: string;
  label: string;
  distanceMeters: number;
  reps: number;
  targetPacePerKmSeconds: number;
  recoverySeconds: number;
}

export interface IntervalWorkout {
  name: string;
  segments: IntervalSegment[];
}

export function segmentWorkTimeSeconds(seg: IntervalSegment): number {
  const pacePerM = seg.targetPacePerKmSeconds / 1000;
  return seg.reps * seg.distanceMeters * pacePerM;
}

export function segmentRecoverySeconds(seg: IntervalSegment): number {
  return seg.reps * seg.recoverySeconds;
}

export function workoutTotalSeconds(workout: IntervalWorkout): number {
  return workout.segments.reduce(
    (acc, s) => acc + segmentWorkTimeSeconds(s) + segmentRecoverySeconds(s),
    0,
  );
}

export const INTERVAL_PRESETS: IntervalWorkout[] = [
  {
    name: "Yasso 800s",
    segments: [
      {
        id: "1",
        label: "800m @ goal marathon pace (min/mile as mm:ss)",
        distanceMeters: 800,
        reps: 6,
        targetPacePerKmSeconds: 240,
        recoverySeconds: 120,
      },
    ],
  },
  {
    name: "400m Repeats",
    segments: [
      {
        id: "1",
        label: "400m",
        distanceMeters: 400,
        reps: 8,
        targetPacePerKmSeconds: 210,
        recoverySeconds: 90,
      },
    ],
  },
  {
    name: "Fartlek Pyramid",
    segments: [
      { id: "1", label: "1 min hard", distanceMeters: 300, reps: 1, targetPacePerKmSeconds: 200, recoverySeconds: 60 },
      { id: "2", label: "2 min hard", distanceMeters: 600, reps: 1, targetPacePerKmSeconds: 205, recoverySeconds: 90 },
      { id: "3", label: "3 min hard", distanceMeters: 900, reps: 1, targetPacePerKmSeconds: 210, recoverySeconds: 120 },
      { id: "4", label: "2 min hard", distanceMeters: 600, reps: 1, targetPacePerKmSeconds: 205, recoverySeconds: 90 },
      { id: "5", label: "1 min hard", distanceMeters: 300, reps: 1, targetPacePerKmSeconds: 200, recoverySeconds: 60 },
    ],
  },
];
