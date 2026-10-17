"use client";

import { useMemo, useState } from "react";
import { buildKarvonenZones, estimateMaxHr } from "@/lib/karvonen";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function KarvonenZones() {
  const [age, setAge] = useState("35");
  const [restHr, setRestHr] = useState("55");

  const maxHr = useMemo(() => {
    const a = Number(age);
    if (!a) return 0;
    return estimateMaxHr(a);
  }, [age]);

  const rest = Number(restHr) || 0;
  const zones = useMemo(() => {
    if (maxHr <= rest) return [];
    return buildKarvonenZones(maxHr, rest);
  }, [maxHr, rest]);

  return (
    <div className="space-y-5 pt-2">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Age</Label>
          <p className="text-xs text-muted">Used to estimate max HR (220 − age) if you do not know yours.</p>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Resting HR</Label>
          <p className="text-xs text-muted">Measure first thing in the morning, seated, for several days.</p>
          <Input type="number" value={restHr} onChange={(e) => setRestHr(e.target.value)} />
        </div>
      </div>
      <p className="text-sm text-muted">
        Estimated max HR: <span className="font-mono text-foreground">{maxHr}</span> bpm — replace with lab or field-test
        max if you have one.
      </p>
      <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
        {zones.map((z) => (
          <li key={z.key} className="px-4 py-3.5 text-sm space-y-1">
            <div className="flex justify-between gap-3">
              <span className="text-muted">{z.name}</span>
              <span className="font-mono shrink-0">{z.hrMin}–{z.hrMax} bpm</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">{z.purpose}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
