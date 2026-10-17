"use client";

import { useMemo, useRef, useState } from "react";
import { buildSplitMatrix, RACE_DISTANCES, type PacingProfile } from "@/lib/endurance";
import { parseTimeToSeconds, formatSeconds } from "@/lib/time";
import { exportElementAsPdf, exportElementAsPng } from "@/lib/export";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TimeDurationInput } from "@/components/ui/time-duration-input";
import { RUNNER_HERO_MAIN_SRC } from "@/lib/site-assets";

export function PaceBand() {
  const [raceId, setRaceId] = useState("marathon");
  const [goalTime, setGoalTime] = useState("3:30:00");
  const bandRef = useRef<HTMLDivElement>(null);
  const lockScreenRef = useRef<HTMLDivElement>(null);

  const raceLabel = RACE_DISTANCES.find((r) => r.id === raceId)?.label ?? "Race";
  const distanceKm = RACE_DISTANCES.find((r) => r.id === raceId)?.km ?? 42.195;
  const goalSec = parseTimeToSeconds(goalTime);
  const profile: PacingProfile = "even";

  const goalDisplay =
    goalSec != null ? formatSeconds(goalSec, goalSec >= 3600) : goalTime;

  const checkpoints = useMemo(() => {
    if (!goalSec) return [];
    const every = distanceKm > 30 ? 5 : 2;
    const rows = buildSplitMatrix(distanceKm, goalSec, profile, every);
    return rows.map((r) => ({
      km: r.distanceKm,
      elapsed: formatSeconds(r.elapsedSeconds, r.elapsedSeconds >= 3600),
      pace: formatSeconds(r.pacePerKm),
    }));
  }, [distanceKm, goalSec]);

  async function saveLockScreenImage() {
    if (!lockScreenRef.current) return;
    await exportElementAsPng(
      lockScreenRef.current,
      `paceforge-lockscreen-${raceId}.png`,
      "#0c1018",
    );
  }

  async function savePrintPdf() {
    if (!bandRef.current) return;
    await exportElementAsPdf(bandRef.current, `paceforge-pace-band-${raceId}.pdf`, "portrait");
  }

  const canExport = checkpoints.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wrist pace band</CardTitle>
        <CardDescription>
          Preview checkpoints, then save a lock-screen wallpaper or download a PDF wrist strip.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-border bg-surface-elevated px-4 py-3 text-center">
          <p className="text-xs text-muted">Selected race</p>
          <p className="text-lg font-medium mt-0.5">{raceLabel}</p>
          <p className="text-xs text-muted mt-3">Target finish</p>
          <p className="text-2xl font-mono font-semibold tabular-nums text-runner-green mt-0.5">
            {goalDisplay}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Race</Label>
            <select
              className="select-field"
              value={raceId}
              onChange={(e) => setRaceId(e.target.value)}
            >
              {RACE_DISTANCES.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
          <TimeDurationInput label="Goal time" value={goalTime} onChange={setGoalTime} />
        </div>

        {canExport ? (
          <>
            <div className="overflow-x-auto rounded-lg border border-runner-green/20 bg-white p-2">
              <div
                ref={bandRef}
                className="min-w-[280px] max-w-md mx-auto bg-white text-slate-900 p-3 text-[10px] font-mono leading-tight"
              >
                <p className="text-center font-bold text-sm mb-2 border-b border-slate-300 pb-1">
                  PACEFORGE · {distanceKm}km · {goalDisplay}
                </p>
                <div className="grid grid-cols-3 gap-x-2 gap-y-1">
                  {checkpoints.map((c) => (
                    <div key={c.km} className="flex justify-between border-b border-dotted border-slate-200">
                      <span>{c.km}k</span>
                      <span className="font-semibold">{c.elapsed}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-center text-[8px] text-slate-500">Cut along edge · wrap on wrist</p>
              </div>
            </div>

            {/* Phone lock-screen layout (captured for PNG export) */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden>
              <div
                ref={lockScreenRef}
                className="relative w-[390px] min-h-[844px] overflow-hidden bg-[#0c1018] text-[#f1f5f9] font-mono"
              >
                <div className="relative h-44 w-full">
                  <img
                    src={RUNNER_HERO_MAIN_SRC}
                    alt=""
                    width={390}
                    height={176}
                    className="h-full w-full object-cover object-center"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c1018]" />
                </div>
                <div className="px-8 pt-6 pb-10">
                  <p className="text-center text-[#fc4c02] text-sm font-sans font-semibold tracking-wide mb-2">
                    PACEFORGE
                  </p>
                  <p className="text-center text-lg font-sans font-medium text-[#f1f5f9] mb-1">{raceLabel}</p>
                  <p className="text-center text-3xl font-bold text-[#fc4c02] mb-6 stat-value">{goalDisplay}</p>
                  <p className="text-center text-xs text-[#8b9cb3] font-sans mb-4">Checkpoint elapsed times</p>
                  <div className="space-y-2 text-sm">
                    {checkpoints.map((c) => (
                      <div
                        key={c.km}
                        className="flex justify-between border-b border-[rgba(255,255,255,0.1)] py-1.5"
                      >
                        <span className="text-[#8b9cb3]">{c.km} km</span>
                        <span className="font-semibold text-[#f1f5f9]">{c.elapsed}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Button type="button" disabled={!canExport} onClick={() => saveLockScreenImage()}>
                Save lock-screen image
              </Button>
              <Button type="button" variant="secondary" disabled={!canExport} onClick={() => savePrintPdf()}>
                Download PDF to print
              </Button>
            </div>
            <p className="text-xs text-muted">
              Lock screen: open the PNG in your gallery and set as wallpaper (dark background with runner art).
              Print: open the PDF and print from your device.
            </p>
          </>
        ) : (
          <p className="text-sm text-muted text-center py-6">Enter a valid goal time to see checkpoints.</p>
        )}
      </CardContent>
    </Card>
  );
}
