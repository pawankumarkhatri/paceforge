export type RaceCategory = "10k" | "half" | "full";
export type HeatLevel = "mild" | "warm" | "hot";

export interface AidStationPlan {
  stations: {
    km: number;
    waterLiters: number;
    electrolytePacks: number;
    bananas: number;
    dates: number;
    spongeBins: number;
    volunteers: number;
  }[];
  totalWaterLiters: number;
  totalVolunteers: number;
  sweeperCutoffs: { km: number; cutoffHours: number }[];
}

const COURSE_KM: Record<RaceCategory, number> = {
  "10k": 10,
  half: 21.097,
  full: 42.195,
};

const STATION_SPACING: Record<RaceCategory, number> = {
  "10k": 2.5,
  half: 3,
  full: 3,
};

export function planAidStations(
  runners: number,
  category: RaceCategory,
  heat: HeatLevel,
): AidStationPlan {
  const courseKm = COURSE_KM[category];
  const spacing = STATION_SPACING[category];
  const heatMult = heat === "hot" ? 1.35 : heat === "warm" ? 1.15 : 1;
  const consumptionMl = (heat === "hot" ? 400 : heat === "warm" ? 300 : 250) * heatMult;

  const kms: number[] = [];
  for (let km = spacing; km < courseKm; km += spacing) {
    kms.push(Math.round(km * 10) / 10);
  }
  if (kms[kms.length - 1] !== courseKm) kms.push(courseKm);

  const stations = kms.map((km, i) => {
    const share = i === 0 || i === kms.length - 1 ? 1.2 : 1;
    const waterLiters = Math.ceil((runners * consumptionMl * share) / 1000);
    return {
      km,
      waterLiters,
      electrolytePacks: Math.ceil(runners * 0.15 * share),
      bananas: Math.ceil(runners * 0.08 * share),
      dates: Math.ceil(runners * 0.05 * share),
      spongeBins: heat === "mild" ? 0 : Math.ceil(runners / 200),
      volunteers: Math.max(4, Math.ceil(runners / 150) + 2),
    };
  });

  const totalWaterLiters = stations.reduce((a, s) => a + s.waterLiters, 0);
  const totalVolunteers = stations.reduce((a, s) => a + s.volunteers, 0);

  const paceHoursPerKm = category === "10k" ? 0.1 : category === "half" ? 0.12 : 0.14;
  const buffer = 1.5;
  const sweeperCutoffs = kms.map((km) => ({
    km,
    cutoffHours: Math.round((km * paceHoursPerKm * buffer + 0.5) * 10) / 10,
  }));

  return { stations, totalWaterLiters, totalVolunteers, sweeperCutoffs };
}

export interface FinisherRow {
  name: string;
  bibNumber: string;
  category: string;
  finishTime: string;
  rank: string;
}

export function parseFinisherCsv(text: string): FinisherRow[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const cols = lines[0].split(",").map((c) => c.trim().toLowerCase());
  const idx = {
    name: cols.findIndex((c) => c.includes("name")),
    bib: cols.findIndex((c) => c.includes("bib")),
    category: cols.findIndex((c) => c.includes("category") || c.includes("cat")),
    time: cols.findIndex((c) => c.includes("finish") || c.includes("time")),
    rank: cols.findIndex((c) => c.includes("rank")),
  };
  if (idx.name < 0) return [];

  return lines.slice(1).map((line) => {
    const parts = line.split(",").map((p) => p.trim());
    return {
      name: parts[idx.name] ?? "",
      bibNumber: idx.bib >= 0 ? parts[idx.bib] ?? "" : "",
      category: idx.category >= 0 ? parts[idx.category] ?? "" : "",
      finishTime: idx.time >= 0 ? parts[idx.time] ?? "" : "",
      rank: idx.rank >= 0 ? parts[idx.rank] ?? "" : "",
    };
  }).filter((r) => r.name);
}
