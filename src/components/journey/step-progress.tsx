"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

const STEP_KEYS = ["steps.pastRace", "steps.vdot", "steps.training", "steps.raceDay"] as const;

export function StepProgress({ current }: { current: number }) {
  const { t } = useI18n();

  return (
    <ol
      className="flex items-start justify-between gap-0.5 sm:gap-1 mb-8 sm:mb-10 overflow-x-auto pb-1 -mx-1 px-1"
      aria-label={t("journey", "progressAria")}
    >
      {STEP_KEYS.map((key, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        const label = t("journey", key);
        return (
          <li key={key} className="flex flex-1 flex-col items-center gap-1.5 min-w-[3.25rem] max-w-[5.5rem]">
            <span
              className={cn(
                "flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full text-xs font-bold shrink-0 stat-value",
                done && "bg-runner-green text-white",
                active && "bg-surface text-foreground ring-2 ring-runner-green shadow-sm",
                !done && !active && "bg-surface border border-border text-muted",
              )}
            >
              {done ? "✓" : step}
            </span>
            <span
              className={cn(
                "text-center w-full text-[9px] sm:text-[10px] leading-tight font-display font-bold uppercase tracking-wide text-muted",
                active && "!text-foreground",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
