"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RUNNER_ROUTES } from "@/lib/site-routes";
import { useI18n } from "@/lib/i18n/context";

export function SiteMapLinks() {
  const { messages } = useI18n();
  const links = RUNNER_ROUTES.filter((r) => r.href !== "/");

  const labelFor = (href: string, fallback: string) => {
    if (href === "/vdot") return messages.nav.vdot;
    if (href === "/training") return messages.nav.training;
    if (href === "/race-day") return messages.nav.raceDay;
    return fallback;
  };

  return (
    <section className="space-y-3" aria-labelledby="explore-title">
      <h2 id="explore-title" className="text-sm font-medium text-muted px-1">{messages.common.explore}</h2>
      <ul className="rounded-2xl border border-border bg-surface overflow-hidden divide-y divide-border">
        {links.map((route) => {
          const Icon = route.icon;
          return (
            <li key={route.href}>
              <Link
                href={route.href}
                className="flex items-center gap-4 px-4 py-4 min-h-[3.5rem] hover:bg-black/[0.02] transition-colors touch-manipulation"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-runner-green">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-medium text-foreground">{labelFor(route.href, route.label)}</span>
                  <span className="block text-sm text-muted truncate">{route.path}</span>
                </span>
                <ChevronRight className="h-5 w-5 text-muted shrink-0" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
