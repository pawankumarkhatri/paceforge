/** Major road races in India — reference only; confirm dates on official sites each year. */

export type IndiaRaceDistanceId = "marathon" | "half" | "10k";

export type IndiaMarathonTag = "major" | "high-altitude" | "hilly" | "flat" | "coastal";

export interface IndiaMarathon {
  id: string;
  name: string;
  city: string;
  state: string;
  /** Typical month(s) on calendar */
  when: string;
  distances: IndiaRaceDistanceId[];
  tags: IndiaMarathonTag[];
  /** Course or planning tip for PaceForge users */
  tip: string;
  website?: string;
}

export const INDIA_MARATHONS: IndiaMarathon[] = [
  {
    id: "tmm",
    name: "Tata Mumbai Marathon",
    city: "Mumbai",
    state: "Maharashtra",
    when: "January",
    distances: ["marathon", "half", "10k"],
    tags: ["major", "flat", "coastal"],
    tip: "Hot, humid mornings — practice fueling and adjust pace for heat on Race day fueling tab.",
    website: "https://tatamumbaimarathon.procam.in/",
  },
  {
    id: "delhi-half",
    name: "Airtel Delhi Half Marathon",
    city: "New Delhi",
    state: "Delhi",
    when: "October–November",
    distances: ["half", "10k"],
    tags: ["major", "flat"],
    tip: "Fast, flat half — strong VDOT benchmark; use negative split on Race day splits.",
    website: "https://www.procam.in/airtel-delhi-half-marathon",
  },
  {
    id: "pune",
    name: "Pune International Marathon",
    city: "Pune",
    state: "Maharashtra",
    when: "December",
    distances: ["marathon", "half"],
    tags: ["flat"],
    tip: "Cooler winter start; good first full marathon for many runners.",
  },
  {
    id: "goa-river",
    name: "Goa River Marathon",
    city: "Goa",
    state: "Goa",
    when: "December",
    distances: ["marathon", "half"],
    tags: ["coastal", "flat"],
    tip: "Warm and humid — increase fluid targets in fueling plan vs cooler races.",
  },
  {
    id: "kochi",
    name: "Kochi Muziris Marathon",
    city: "Kochi",
    state: "Kerala",
    when: "February",
    distances: ["marathon", "half"],
    tags: ["coastal", "flat"],
    tip: "Coastal humidity; start conservatively first 10 km.",
  },
  {
    id: "hyderabad",
    name: "Hyderabad Marathon",
    city: "Hyderabad",
    state: "Telangana",
    when: "August–September",
    distances: ["marathon", "half", "10k"],
    tags: ["flat"],
    tip: "Monsoon season possible — check weather and plan fluid + electrolytes.",
  },
  {
    id: "ladakh",
    name: "Ladakh Marathon",
    city: "Leh",
    state: "Ladakh",
    when: "September",
    distances: ["marathon", "half"],
    tags: ["major", "high-altitude"],
    tip: "High altitude — arrive early to acclimatize; pace much slower than sea-level VDOT.",
  },
  {
    id: "spiti",
    name: "Spiti Valley Marathon",
    city: "Kaza",
    state: "Himachal Pradesh",
    when: "July",
    distances: ["marathon", "half"],
    tags: ["high-altitude", "hilly"],
    tip: "Extreme elevation — treat as effort-based, not time-based; hydrate constantly.",
  },
  {
    id: "satara-hill",
    name: "Satara Hill Marathon",
    city: "Satara",
    state: "Maharashtra",
    when: "September",
    distances: ["marathon", "half"],
    tags: ["hilly"],
    tip: "Use Hill-adjusted pacing profile on splits; expect slower km splits on climbs.",
  },
  {
    id: "rann",
    name: "Run The Rann",
    city: "Kutch",
    state: "Gujarat",
    when: "February",
    distances: ["marathon", "half"],
    tags: ["flat"],
    tip: "Open, flat desert course — sun exposure; plan fuel every 4–5 km.",
  },
  {
    id: "jaipur",
    name: "Jaipur Marathon",
    city: "Jaipur",
    state: "Rajasthan",
    when: "February",
    distances: ["marathon", "half", "10k"],
    tags: ["flat"],
    tip: "Dry heat by late morning — early start helps; bump Race day temp if warm.",
  },
  {
    id: "kolkata",
    name: "Kolkata Marathon",
    city: "Kolkata",
    state: "West Bengal",
    when: "December–January",
    distances: ["marathon", "half"],
    tags: ["flat"],
    tip: "Humid winter mornings; even pacing often works well.",
  },
  {
    id: "chennai",
    name: "Chennai Marathon",
    city: "Chennai",
    state: "Tamil Nadu",
    when: "January",
    distances: ["marathon", "half", "10k"],
    tags: ["coastal", "flat"],
    tip: "Coastal heat and humidity — practice heat fueling on long runs.",
  },
  {
    id: "bengaluru-10k",
    name: "TCS World 10K Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    when: "April–May",
    distances: ["10k"],
    tags: ["major", "flat"],
    tip: "Excellent 10K VDOT benchmark — use Training tab 10K paces after calculating VDOT.",
    website: "https://www.tcs10k.com/",
  },
  {
    id: "indore",
    name: "Indore Marathon",
    city: "Indore",
    state: "Madhya Pradesh",
    when: "February",
    distances: ["marathon", "half"],
    tags: ["flat"],
    tip: "Central India winter — moderate temps; standard marathon pacing applies.",
  },
];

export function primaryDistanceForRace(race: IndiaMarathon): IndiaRaceDistanceId {
  if (race.distances.includes("marathon")) return "marathon";
  if (race.distances.includes("half")) return "half";
  return "10k";
}

export function distanceLabel(id: IndiaRaceDistanceId): string {
  if (id === "marathon") return "Full marathon";
  if (id === "half") return "Half marathon";
  return "10K";
}
