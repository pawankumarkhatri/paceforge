"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PastRaceBenchmark } from "@/components/ui/past-race-benchmark";
import { GuideNote } from "@/components/ui/guide-note";
import { VDOT_BENCHMARK_OPTIONS } from "@/lib/race-time-presets";
import { parseTimeToSeconds, formatSeconds } from "@/lib/time";
import { predictRaceTimes, vdotFromBenchmark, VDOT_DISTANCE_OPTIONS } from "@/lib/vdot";
import {
  formatTrainingPaces,
  TRAINING_DISTANCE_OPTIONS,
  type TrainingDistanceId,
} from "@/lib/training-paces";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StepProgress } from "@/components/journey/step-progress";
import { clearJourney, saveJourney } from "@/lib/journey-storage";
import { useI18n } from "@/lib/i18n/context";

const TRAINING_HELP_KEY: Record<TrainingDistanceId, string> = {
  "5k": "trainingHelp5k",
  "10k": "trainingHelp10k",
  half: "trainingHelpHalf",
  marathon: "trainingHelpMarathon",
};

export function RunnerJourney() {
  const { t, messages } = useI18n();
  const [step, setStep] = useState(1);
  const [distanceId, setDistanceId] = useState("half");
  const [timeValue, setTimeValue] = useState("1:45:00");
  const [paceDistanceId, setPaceDistanceId] = useState<TrainingDistanceId>("marathon");

  useEffect(() => {
    if (step !== 3) return;
    if (TRAINING_DISTANCE_OPTIONS.some((d) => d.id === distanceId)) {
      setPaceDistanceId(distanceId as TrainingDistanceId);
    }
  }, [step, distanceId]);

  const timeSec = parseTimeToSeconds(timeValue);
  const vdot = useMemo(() => {
    if (!timeSec) return null;
    return vdotFromBenchmark(distanceId, timeSec);
  }, [distanceId, timeSec]);

  const predictions = useMemo(() => {
    if (vdot == null) return null;
    return predictRaceTimes(vdot);
  }, [vdot]);

  const trainingPaces = useMemo(() => {
    if (!predictions) return [];
    const sec = predictions[paceDistanceId];
    if (!sec) return [];
    return formatTrainingPaces(sec, paceDistanceId);
  }, [predictions, paceDistanceId]);

  function persist(nextStep: number) {
    const score = timeSec != null ? vdotFromBenchmark(distanceId, timeSec) : null;
    saveJourney({ step: nextStep, distanceId, timeValue, vdot: score });
    setStep(nextStep);
  }

  function onCalculate() {
    if (!timeSec || vdot == null) return;
    persist(2);
  }

  function restart() {
    clearJourney();
    setStep(1);
    setDistanceId("half");
    setTimeValue("1:45:00");
    setPaceDistanceId("marathon");
  }

  const distanceLabel =
    VDOT_BENCHMARK_OPTIONS.find((d) => d.id === distanceId)?.label ?? "Race";

  return (
    <div className="min-w-0">
      <div className="mb-6 sm:mb-8">
        <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
          {messages.journey.title}
        </h1>
        <p className="text-muted mt-2 max-w-xl leading-relaxed font-medium text-[0.95rem] sm:text-base">
          {messages.journey.intro}
        </p>
      </div>

      <StepProgress current={step} />

      {step === 1 && (
        <section className="space-y-5 sm:space-y-6">
          <div>
            <h2 className="font-display text-lg font-bold sm:text-xl">{messages.journey.step1Title}</h2>
            <p className="text-sm text-muted mt-1">{messages.journey.step1Sub}</p>
          </div>
          <GuideNote title={messages.journey.step1GuideTitle}>{messages.journey.step1Guide}</GuideNote>
          <Card>
            <CardContent className="pt-5">
              <PastRaceBenchmark
                distanceId={distanceId}
                onDistanceChange={setDistanceId}
                timeValue={timeValue}
                onTimeChange={setTimeValue}
                distanceOptions={VDOT_BENCHMARK_OPTIONS.map((d) => ({ id: d.id, label: d.label }))}
                distanceLabel={messages.common.distance}
                timeLabel={messages.common.finishTime}
              />
            </CardContent>
          </Card>
          {!timeSec && timeValue.trim() && (
            <p className="text-sm text-amber-600">{messages.journey.invalidTime}</p>
          )}
          <Button className="w-full min-h-12" size="lg" disabled={!timeSec || vdot == null} onClick={onCalculate}>
            {messages.journey.calcVdot}
          </Button>
          <p className="text-xs text-muted text-center leading-relaxed">{messages.journey.vdotFootnote}</p>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-5 sm:space-y-6">
          {vdot != null && predictions ? (
            <>
              <div>
                <h2 className="font-display text-lg font-bold sm:text-xl">{messages.journey.step2Title}</h2>
                <p className="text-sm text-muted mt-1">
                  {t("journey", "step2Sub", { distance: distanceLabel, time: timeValue })}
                </p>
              </div>
              <GuideNote title={messages.journey.step2GuideTitle}>{messages.journey.step2Guide}</GuideNote>
              <div className="text-center py-4">
                <p className="text-sm text-muted">{messages.journey.yourVdot}</p>
                <p className="text-5xl sm:text-6xl font-bold stat-value text-runner-green">{vdot}</p>
              </div>
              <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
                {VDOT_DISTANCE_OPTIONS.map((d) => (
                  <li key={d.id} className="flex justify-between gap-3 px-4 py-3.5 text-sm">
                    <span className="text-muted">{d.label}</span>
                    <span className="font-mono font-medium shrink-0">
                      {formatSeconds(predictions[d.id], predictions[d.id] >= 3600)}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="w-full min-h-12" size="lg" onClick={() => persist(3)}>
                {messages.journey.nextTraining}
              </Button>
            </>
          ) : (
            <p className="text-sm text-muted">{messages.journey.needStep1}</p>
          )}
          <Button variant="ghost" className="w-full min-h-11" onClick={() => setStep(1)}>
            {messages.common.backStep1}
          </Button>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-5 sm:space-y-6">
          {vdot != null ? (
            <>
              <div>
                <h2 className="font-display text-lg font-bold sm:text-xl">{messages.journey.step3Title}</h2>
                <p className="text-sm text-muted mt-1">
                  {t("journey", "step3Sub", { vdot })}
                </p>
              </div>
              <GuideNote title={messages.journey.step3GuideTitle}>{messages.journey.step3Guide}</GuideNote>
              <p className="text-sm text-muted leading-relaxed">
                {t("journey", TRAINING_HELP_KEY[paceDistanceId])}
              </p>
              <div className="flex flex-wrap gap-2">
                {TRAINING_DISTANCE_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setPaceDistanceId(d.id)}
                    className={
                      paceDistanceId === d.id
                        ? "rounded-full bg-accent-muted text-runner-green px-4 py-2.5 text-sm font-semibold min-h-11 touch-manipulation"
                        : "rounded-full border border-border px-4 py-2.5 text-sm text-muted min-h-11 touch-manipulation"
                    }
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {trainingPaces.length > 0 && (
                <ul className="rounded-2xl border border-border bg-surface divide-y divide-border">
                  {trainingPaces.map((p) => (
                    <li key={p.key} className="px-4 py-3.5 text-sm space-y-1">
                      <div className="flex justify-between gap-3">
                        <span className="text-muted">{p.label}</span>
                        <span className="font-mono shrink-0">{p.pacePerKm}/km</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{p.help}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild className="w-full min-h-12" size="lg" variant="secondary">
                <Link href="/training">{messages.journey.openTraining}</Link>
              </Button>
              <p className="text-xs text-muted text-center leading-relaxed">{messages.journey.trainingTabHint}</p>
              <Button className="w-full min-h-12" size="lg" onClick={() => persist(4)}>
                {messages.journey.nextRaceDay}
              </Button>
            </>
          ) : (
            <Button className="w-full min-h-11" onClick={() => setStep(1)}>{messages.common.backStep1}</Button>
          )}
        </section>
      )}

      {step === 4 && (
        <section className="space-y-5 sm:space-y-6">
          <div>
            <h2 className="font-display text-lg font-bold sm:text-xl">{messages.journey.step4Title}</h2>
            <p className="text-sm text-muted mt-1">{messages.journey.step4Sub}</p>
          </div>
          <GuideNote title={messages.journey.step4GuideTitle}>
            <ul className="list-disc pl-4 space-y-1.5 mt-1 text-sm leading-relaxed">
              <li>{messages.journey.step4Splits}</li>
              <li>{messages.journey.step4Band}</li>
              <li>{messages.journey.step4Fuel}</li>
            </ul>
          </GuideNote>
          {predictions && (
            <Card>
              <CardContent className="pt-5 text-sm space-y-1">
                <p className="text-muted">{messages.journey.marathonRef}</p>
                <p className="text-2xl font-semibold font-mono text-runner-green">
                  {formatSeconds(predictions.marathon, true)}
                </p>
                <p className="text-xs text-muted pt-1 leading-relaxed">{messages.journey.marathonRefHint}</p>
              </CardContent>
            </Card>
          )}
          <Button asChild className="w-full min-h-12" size="lg">
            <Link href="/race-day">{messages.journey.openRaceDay}</Link>
          </Button>
          <Button variant="ghost" className="w-full min-h-11" onClick={restart}>
            {messages.common.startOver}
          </Button>
        </section>
      )}
    </div>
  );
}
