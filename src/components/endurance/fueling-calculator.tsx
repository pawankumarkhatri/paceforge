"use client";

import { useMemo, useState } from "react";
import { buildFuelingPlan, FUEL_TYPES, type FuelTypeId } from "@/lib/fueling";
import { parseTimeToSeconds } from "@/lib/time";
import { RACE_DISTANCES } from "@/lib/endurance";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimeDurationInput } from "@/components/ui/time-duration-input";
import { cn } from "@/lib/utils";

export function FuelingCalculator() {
  const [weight, setWeight] = useState("70");
  const [raceId, setRaceId] = useState("marathon");
  const [goalTime, setGoalTime] = useState("3:45:00");
  const [tempC, setTempC] = useState("18");
  const [humidity, setHumidity] = useState("55");
  const [fuelTypeId, setFuelTypeId] = useState<FuelTypeId>("energy_gel");

  const distanceKm = RACE_DISTANCES.find((r) => r.id === raceId)?.km ?? 42.195;
  const goalSec = parseTimeToSeconds(goalTime);
  const selectedFuel = FUEL_TYPES.find((f) => f.id === fuelTypeId) ?? FUEL_TYPES[0];

  const plan = useMemo(() => {
    const w = Number(weight);
    if (!goalSec || !w) return null;
    return buildFuelingPlan({
      bodyWeightKg: w,
      raceDurationHours: goalSec / 3600,
      distanceKm,
      tempC: Number(tempC) || 15,
      humidityPercent: Number(humidity) || 50,
      fuelTypeId,
    });
  }, [weight, goalSec, distanceKm, tempC, humidity, fuelTypeId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fueling & Hydration</CardTitle>
        <CardDescription>
          Pick your race fuel, then get carb targets, fluid loss, and km-by-km reminders.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          <Label>Fuel type</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {FUEL_TYPES.map((fuel) => {
              const active = fuel.id === fuelTypeId;
              return (
                <button
                  key={fuel.id}
                  type="button"
                  onClick={() => setFuelTypeId(fuel.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition-colors touch-manipulation min-h-[3.25rem]",
                    active
                      ? "border-runner-green/40 bg-accent-muted"
                      : "border-border bg-surface hover:border-runner-green/25",
                  )}
                >
                  <span className="block font-display text-sm font-bold text-foreground">{fuel.label}</span>
                  <span className="block text-xs text-muted mt-0.5">
                    ~{fuel.carbsPerServingG}g carbs · {fuel.servingDescription}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted leading-relaxed">{selectedFuel.hydrationNote}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>Body weight (kg)</Label>
            <Input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Race</Label>
            <select
              className="flex h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm touch-manipulation"
              value={raceId}
              onChange={(e) => setRaceId(e.target.value)}
            >
              {RACE_DISTANCES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
          <TimeDurationInput label="Target time" value={goalTime} onChange={setGoalTime} />
          <div className="space-y-2">
            <Label>Temp (°C)</Label>
            <Input value={tempC} onChange={(e) => setTempC(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Humidity (%)</Label>
            <Input value={humidity} onChange={(e) => setHumidity(e.target.value)} />
          </div>
        </div>

        {plan && (
          <div className="space-y-4 border-t border-border pt-4">
            <p className="text-sm font-semibold text-foreground">
              Plan: <span className="text-runner-green">{plan.fuelType.label}</span>
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Carbs / hour" value={`${plan.carbsPerHourG} g`} />
              <Stat label="Servings / hour" value={`~${plan.servingsPerHour}`} />
              <Stat label="Fluid loss / hr" value={`${plan.fluidLossMlPerHour} ml`} />
              <Stat label="Total fluid (est.)" value={`${plan.totalFluidLossMl} ml`} />
            </div>
            <p className="text-sm text-muted">
              {plan.fuelType.shortLabel} about every{" "}
              <strong className="text-foreground">{plan.fuelIntervalKm} km</strong> (~
              {plan.fuelIntervalMin} min) · ~{plan.carbsPerServingG}g carbs per serving
            </p>
            <ul className="space-y-2 text-sm">
              {plan.hydrationMarkers.map((m) => (
                <li key={`${m.km}-${m.elapsedMin}`} className="flex flex-col gap-1 rounded-lg border border-border px-3 py-2.5 sm:flex-row sm:gap-3">
                  <span className="flex shrink-0 gap-3 font-mono text-runner-green sm:w-36">
                    <span>{m.km} km</span>
                    <span className="text-muted w-12">{m.elapsedMin}&apos;</span>
                  </span>
                  <span className="text-foreground leading-relaxed">{m.action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-[10px] uppercase text-muted">{label}</p>
      <p className="text-lg font-semibold text-electric-cyan">{value}</p>
    </div>
  );
}
