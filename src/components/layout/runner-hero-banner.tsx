"use client";

import Image from "next/image";
import { RUNNER_HERO_MAIN_SRC } from "@/lib/site-assets";
import { useI18n } from "@/lib/i18n/context";

export function RunnerHeroBanner() {
  const { messages } = useI18n();

  return (
    <div className="-mx-4 sm:-mx-0 mb-6 sm:mb-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-md">
      <Image
        src={RUNNER_HERO_MAIN_SRC}
        alt={messages.hero.imageAlt}
        width={1200}
        height={500}
        className="h-32 w-full object-cover object-center sm:h-40 md:h-44"
        priority
        sizes="(max-width: 768px) 100vw, 672px"
      />
      <div className="border-t border-border bg-surface-elevated px-4 py-3.5 sm:px-5 sm:py-4">
        <p className="micro-label text-runner-green">{messages.hero.brand}</p>
        <p className="mt-2 font-display text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
          {messages.hero.tagline}
        </p>
        <p className="mt-2 text-sm font-semibold text-muted font-display">
          {messages.hero.track} <span className="text-border">·</span> {messages.hero.train}{" "}
          <span className="text-border">·</span>{" "}
          <span className="text-runner-green">{messages.hero.race}</span>
        </p>
      </div>
    </div>
  );
}
