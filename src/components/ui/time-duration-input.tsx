"use client";

import {
  formatHmsParts,
  formatSeconds,
  hmsToSeconds,
  parseTimeToSeconds,
  secondsToHms,
} from "@/lib/time";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface TimeDurationInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  /** Label above the large time display (e.g. “Finish time” for past races, “Target time” for goals). */
  summaryLabel?: string;
  hintText?: string;
  showHours?: boolean;
  maxHours?: number;
  className?: string;
  id?: string;
}

function rangeInclusive(max: number) {
  return Array.from({ length: max + 1 }, (_, i) => i);
}

function UnitDropdown({
  unitId,
  shortLabel,
  value,
  max,
  onChange,
}: {
  unitId?: string;
  shortLabel: "Hr" | "Min" | "Sec";
  value: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <Label htmlFor={unitId} className="text-center text-xs font-medium text-muted">
        {shortLabel}
      </Label>
      <select
        id={unitId}
        className="select-field font-mono text-center tabular-nums"
        aria-label={shortLabel}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {rangeInclusive(max).map((n) => (
          <option key={n} value={n}>
            {n.toString().padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Separate dropdown boxes for Hr · Min · Sec. */
export function TimeDurationInput({
  value,
  onChange,
  label,
  summaryLabel = "Target time",
  hintText = "Adjust Hr · Min · Sec below",
  showHours = true,
  maxHours = 23,
  className,
  id,
}: TimeDurationInputProps) {
  const sec = parseTimeToSeconds(value);
  const totalSec = sec ?? 0;
  const parts = showHours
    ? secondsToHms(totalSec)
    : {
        h: 0,
        m: Math.floor(totalSec / 60),
        s: totalSec % 60,
      };

  function emit(hVal: number, mVal: number, sVal: number) {
    const total = hmsToSeconds(hVal, mVal, sVal);
    if (total == null) return;
    onChange(formatHmsParts(hVal, mVal, sVal, showHours || hVal > 0));
  }

  const withHours = showHours || parts.h > 0;
  const targetDisplay =
    sec != null ? formatSeconds(sec, withHours) : "—";

  return (
    <div className={cn("space-y-3", className)}>
      {label && <Label>{label}</Label>}

      <div
        className="rounded-xl border border-runner-green/25 bg-gradient-to-br from-accent-muted to-surface px-4 py-3 text-center"
        aria-live="polite"
      >
        <p className="micro-label">{summaryLabel}</p>
        <p className="text-3xl font-display font-extrabold stat-value text-runner-green mt-1">
          {targetDisplay}
        </p>
        <p className="text-xs text-muted mt-1">{hintText}</p>
      </div>

      <div
        className="rounded-xl border border-border bg-surface-elevated p-3"
        role="group"
        aria-label={label ? `${label} — hours minutes seconds` : "Hours minutes seconds"}
      >
        <div className="flex items-end gap-1 sm:gap-2">
          {showHours && (
            <>
              <UnitDropdown
                unitId={id ? `${id}-hr` : undefined}
                shortLabel="Hr"
                value={parts.h}
                max={maxHours}
                onChange={(hi) => emit(hi, parts.m, parts.s)}
              />
              <span className="pb-3 text-lg font-semibold text-muted" aria-hidden>:</span>
            </>
          )}
          <UnitDropdown
            unitId={id ? `${id}-min` : undefined}
            shortLabel="Min"
            value={parts.m}
            max={59}
            onChange={(mi) => emit(parts.h, mi, parts.s)}
          />
          <span className="pb-3 text-lg font-semibold text-muted" aria-hidden>:</span>
          <UnitDropdown
            unitId={id ? `${id}-sec` : undefined}
            shortLabel="Sec"
            value={parts.s}
            max={59}
            onChange={(si) => emit(parts.h, parts.m, si)}
          />
        </div>
      </div>
    </div>
  );
}
