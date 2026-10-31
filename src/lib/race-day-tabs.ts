export const RACE_DAY_TABS = ["splits", "band", "fuel", "india"] as const;

export type RaceDayTab = (typeof RACE_DAY_TABS)[number];

export function parseRaceDayTab(value: string | null | undefined): RaceDayTab {
  if (value && (RACE_DAY_TABS as readonly string[]).includes(value)) {
    return value as RaceDayTab;
  }
  return "splits";
}

export function raceDayPlanHref(distance: "marathon" | "half" | "10k"): string {
  if (distance === "10k") return "/vdot";
  return `/race-day?tab=splits&race=${distance}`;
}
