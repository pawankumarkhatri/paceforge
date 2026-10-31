"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  INDIA_MARATHONS,
  distanceLabel,
  primaryDistanceForRace,
  type IndiaRaceDistanceId,
  type IndiaMarathon,
} from "@/lib/india-marathons";
import { raceDayPlanHref } from "@/lib/race-day-tabs";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Filter = "all" | IndiaRaceDistanceId;

const TAG_LABEL: Record<string, { en: string; hi: string }> = {
  major: { en: "Major", hi: "प्रमुख" },
  "high-altitude": { en: "High altitude", hi: "ऊँचाई" },
  hilly: { en: "Hilly", hi: "पहाड़ी" },
  flat: { en: "Flat", hi: "समतल" },
  coastal: { en: "Coastal", hi: "तटीय" },
};

export function IndiaMarathonsGuide() {
  const { locale, messages } = useI18n();
  const m = messages.raceDayPage;
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    if (filter === "all") return INDIA_MARATHONS;
    return INDIA_MARATHONS.filter((r) => r.distances.includes(filter));
  }, [filter]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.indiaTitle}</CardTitle>
        <CardDescription>{m.indiaDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["all", m.indiaFilterAll],
              ["marathon", m.indiaFilterMarathon],
              ["half", m.indiaFilterHalf],
              ["10k", m.indiaFilter10k],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold font-display border touch-manipulation min-h-9",
                filter === id
                  ? "border-runner-green/40 bg-accent-muted text-runner-green"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {list.map((race) => (
            <RaceCard
              key={race.id}
              race={race}
              locale={locale}
              planLabel={m.indiaPlanCta}
              officialSiteLabel={m.indiaOfficialSite}
            />
          ))}
        </ul>

        <p className="text-xs text-muted leading-relaxed border-t border-border pt-4">{m.indiaDisclaimer}</p>
      </CardContent>
    </Card>
  );
}

function RaceCard({
  race,
  locale,
  planLabel,
  officialSiteLabel,
}: {
  race: IndiaMarathon;
  locale: "en" | "hi";
  planLabel: string;
  officialSiteLabel: string;
}) {
  const primary = primaryDistanceForRace(race);

  return (
    <li className="rounded-xl border border-border bg-surface p-4 space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display font-bold text-foreground">{race.name}</h3>
          <p className="text-sm text-muted">
            {race.city}, {race.state} · {whenLabel(locale, race.when)}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {race.distances.map((d) => (
            <Badge key={d} className="text-[10px] bg-surface border border-border text-foreground">
              {distanceLabel(d)}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {race.tags.map((tag) => (
          <span key={tag} className="text-[10px] uppercase tracking-wide text-runner-green font-bold">
            {TAG_LABEL[tag]?.[locale] ?? tag}
          </span>
        ))}
      </div>
      <p className="text-sm text-muted leading-relaxed">{race.tip}</p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          href={raceDayPlanHref(primary)}
          className="text-sm font-semibold text-runner-green hover:underline"
        >
          {planLabel}
        </Link>
        {race.website && (
          <a
            href={race.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-muted hover:text-foreground"
          >
            {officialSiteLabel}
          </a>
        )}
      </div>
    </li>
  );
}

function whenLabel(locale: "en" | "hi", when: string) {
  if (locale === "hi") return `${when} (सामान्य)`;
  return when;
}
