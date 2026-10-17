export const en = {
  lang: { en: "English", hi: "हिन्दी" },
  nav: {
    runners: "Runners",
    home: "Home",
    start: "Start",
    vdot: "VDOT",
    training: "Training",
    raceDay: "Race day",
    shortStart: "Start",
    shortVdot: "VDOT",
    shortTrain: "Train",
    shortRace: "Race",
    mainAria: "Main navigation",
  },
  hero: {
    brand: "PaceForge",
    tagline:
      "The legs do the work; the numbers show what that work is worth—pace, prediction, proof.",
    track: "Track",
    train: "Train",
    race: "Race",
    imageAlt: "Runners at an early morning race start",
    sidebarAlt: "Runners on a park path at golden hour",
  },
  common: {
    distance: "Distance",
    finishTime: "Finish time",
    backStep1: "Back to step 1",
    startOver: "Start over",
    explore: "Explore",
  },
  journey: {
    title: "Let's build your plan",
    intro:
      "PaceForge turns a recent race into training paces and race-day tools. Follow the four steps below — refresh the page anytime to start over.",
    step1Title: "Step 1 — Your last race",
    step1Sub: "Tell us what you have already run.",
    step1GuideTitle: "What to enter",
    step1Guide:
      "Pick the distance and finish time of a recent race or hard time trial (within the last few months). A reliable result here makes every prediction and training pace more useful. Use the Hr · Min · Sec dropdowns for your exact time.",
    invalidTime: "Enter a valid finish time.",
    calcVdot: "Calculate VDOT",
    vdotFootnote:
      "VDOT is a fitness score (Jack Daniels method). We use it to estimate times at other distances and set training speeds.",
    step2Title: "Step 2 — Your VDOT & equivalent times",
    step2Sub: "Based on {distance} in {time}.",
    step2GuideTitle: "How to read this",
    step2Guide:
      "Your VDOT summarizes current aerobic fitness. The list below shows fair equivalent finish times at standard distances if you raced them today at the same effort level — not goals, but benchmarks. Compare them to your targets on the next steps.",
    yourVdot: "Your VDOT",
    nextTraining: "Next — Training paces",
    needStep1: "Enter a valid race time in step 1.",
    step3Title: "Step 3 — Training paces",
    step3Sub: "VDOT {vdot} — how fast to run each workout type.",
    step3GuideTitle: "Choose your focus distance",
    step3Guide:
      "Tap 5K, 10K, Half, or Marathon to see paces for that goal. Paces are derived from your predicted time at that distance. Most easy runs should feel relaxed; harder types are listed with short explanations below each pace.",
    openTraining: "Open full training tools",
    trainingTabHint: "Training tab adds heart-rate zones and sample workouts for the same distances.",
    nextRaceDay: "Next — Race day",
    step4Title: "Step 4 — Race day",
    step4Sub: "Plan pacing, splits, and fueling before you toe the line.",
    step4GuideTitle: "What you will find on Race day",
    step4Splits: "Splits — kilometer plan from goal time and pacing strategy.",
    step4Band: "Pace band — lock-screen image or printable wrist strip.",
    step4Fuel: "Fueling — carbs, fluid, and gel timing from weight and weather.",
    marathonRef: "VDOT-based marathon equivalent (reference goal)",
    marathonRefHint: "You can enter any goal time on the Race day page — this is a starting suggestion.",
    openRaceDay: "Open race day tools",
    steps: {
      pastRace: "Past race",
      vdot: "VDOT",
      training: "Training",
      raceDay: "Race day",
    },
    progressAria: "Progress",
    trainingHelp5k: "Short races need more speed work; long runs are shorter but still important.",
    trainingHelp10k: "Balance of tempo, intervals, and a weekly long run at easy pace.",
    trainingHelpHalf: "Threshold and race-pace blocks matter; long runs approach race duration.",
    trainingHelpMarathon: "Emphasize easy volume, marathon-pace segments, and fueling practice on long runs.",
  },
  vdotPage: {
    title: "VDOT calculator",
    description:
      "Estimate your fitness (VDOT) from one race result, then see equivalent times at every standard distance. Use those times to set goals on Training and Race day.",
    guideTitle: "Quick guide",
    guide:
      "1. Enter a recent race distance and time. 2. Read your VDOT score and the equivalent-time table. 3. Jump to Training for workout paces or Race day for splits and fueling. Times are estimates — adjust for course, weather, and how you feel.",
  },
  trainingPage: {
    title: "Training",
    description:
      "Turn your goal race time into daily paces, heart-rate zones, and example sessions. Complete Start on the home page first for auto-filled times from your VDOT.",
    howTitle: "How to use this page",
    how:
      "Work through the tabs in order if you are new: Paces tells you how fast to run each workout type; Heart rate helps on hills or when pace varies; Workouts gives simple session templates tied to your goal distance.",
    tabPaces: "Paces",
    tabHr: "Heart rate",
    tabWorkouts: "Workouts",
    pacesGuideTitle: "Paces tab",
    pacesGuide:
      "Select your goal race (5K–marathon) and realistic finish time. Each row is a training intensity — easy runs should feel comfortable; harder rows are for specific days only.",
    hrGuideTitle: "Heart rate tab",
    hrGuide:
      "Karvonen zones use your age and resting heart rate to set effort ranges. Wear a chest strap or watch for best accuracy; use zones on easy and long runs when pace alone is misleading.",
    workoutsGuideTitle: "Workouts tab",
    workoutsGuide:
      "Pick a distance to see example sessions (intervals, tempo, long run). Adjust volume to your week; these are templates, not a full plan.",
  },
  raceDayPage: {
    title: "Race day",
    description:
      "Plan how you will run the course: kilometer splits, an on-screen pace band, and fueling so nothing is left to guesswork on the start line.",
    pickTitle: "Pick a tool",
    pick:
      "Splits — build a pacing strategy and per-km cheat sheet. Pace band — save a lock-screen image or print a wrist strip. Fueling — estimate carbs, fluid, and when to take gels. Use goal times from VDOT or your own target.",
    tabSplits: "Splits",
    tabBand: "Pace band",
    tabFuel: "Fueling",
    splitsGuideTitle: "Splits tab",
    splitsGuide:
      "Set race distance, goal finish time, and how you want to distribute effort (even vs negative split). The table shows each km with elapsed time and pace for your race plan.",
    bandGuideTitle: "Pace band tab",
    bandGuide: "Pick race and goal time, then save a lock-screen image or download the PDF wrist band.",
    fuelGuideTitle: "Fueling tab",
    fuelGuide:
      "Enter weight, expected duration, and weather. You will get hourly carb targets and reminders for gels and drinks — practice this on long runs before race day.",
  },
} as const;

type DeepString<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: DeepString<T[K]> }
    : never;

export type Messages = DeepString<typeof en>;
