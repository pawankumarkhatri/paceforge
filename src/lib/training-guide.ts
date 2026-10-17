import type { PacingProfile } from "./endurance";

export const PACE_TYPE_HELP: Record<string, string> = {
  easy: "Most of your weekly runs. You should be able to hold a conversation. Builds aerobic base without heavy fatigue.",
  race: "The pace you could hold for your goal race distance today. Use for race-specific segments and dress rehearsals.",
  threshold: "Comfortably hard — roughly hour-race effort. Improves lactate clearance; typical tempo runs.",
  interval: "Hard repeats with recovery jogs. Improves VO₂ max and running economy. Not every week.",
  rep: "Short, fast reps with full recovery. Neuromuscular speed; use sparingly in marathon blocks.",
};

export const PACING_PROFILE_HELP: Record<PacingProfile, string> = {
  even: "Same pace every kilometer. Simplest plan; works well on flat, cool courses.",
  negative2: "Second half ~2% faster than the first. Slight fade resistance without going out too hard.",
  negative3: "Classic negative split (~3%). Good default for half and marathon when you feel controlled early.",
  negative5: "Aggressive negative split. Only if you have strong late-race fitness and discipline.",
  elevation: "Slightly slower early splits to account for hills; evens out effort on rolling courses.",
};

export const TRAINING_DISTANCE_HELP: Record<string, string> = {
  "5k": "Short races need more speed work; long runs are shorter but still important.",
  "10k": "Balance of tempo, intervals, and a weekly long run at easy pace.",
  half: "Threshold and race-pace blocks matter; long runs approach race duration.",
  marathon: "Emphasize easy volume, marathon-pace segments, and fueling practice on long runs.",
};
