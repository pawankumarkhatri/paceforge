import type { LucideIcon } from "lucide-react";
import { Activity, Dumbbell, Flag, Home, Shield } from "lucide-react";

export type SiteRoute = {
  href: string;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
  /** Shown on home site map — path badge */
  path: string;
  audience: "runner" | "director";
};

export const RUNNER_ROUTES: SiteRoute[] = [
  {
    path: "/",
    href: "/",
    label: "Start",
    short: "Start",
    description: "Guided flow: past race → VDOT → training → race day.",
    icon: Home,
    audience: "runner",
  },
  {
    path: "/vdot",
    href: "/vdot",
    label: "VDOT",
    short: "VDOT",
    description: "Past race → fitness score → predicted times (hero feature).",
    icon: Activity,
    audience: "runner",
  },
  {
    path: "/training",
    href: "/training",
    label: "Training",
    short: "Train",
    description: "Heart-rate zones, training paces, workouts, Riegel & Cameron.",
    icon: Dumbbell,
    audience: "runner",
  },
  {
    path: "/race-day",
    href: "/race-day",
    label: "Race Day",
    short: "Race",
    description: "Split matrix, pace band for lock screen or print, fueling plan.",
    icon: Flag,
    audience: "runner",
  },
];

export const DIRECTOR_ROUTE: SiteRoute = {
  path: "/organizer",
  href: "/organizer",
  label: "Race organiser",
  short: "Organiser",
  description: "Aid stations, start waves, and finisher certificates.",
  icon: Shield,
  audience: "director",
};

/** @deprecated Use DIRECTOR_ROUTE */
export const DIRECTOR_APP_ROUTE = {
  href: DIRECTOR_ROUTE.href,
  label: "Director console",
  path: DIRECTOR_ROUTE.path,
};

/** Bottom / sidebar nav (runners only) */
export const MAIN_NAV = RUNNER_ROUTES;
