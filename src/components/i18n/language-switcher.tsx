"use client";

import { cn } from "@/lib/utils";
import { useI18n, type Locale } from "@/lib/i18n/context";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, messages } = useI18n();

  function select(next: Locale) {
    setLocale(next);
  }

  return (
    <div
      className={cn(
        "inline-flex rounded-xl border border-border bg-surface p-0.5 text-xs font-bold font-display shadow-sm",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["en", "hi"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => select(code)}
          className={cn(
            "min-h-[2.25rem] min-w-[2.75rem] rounded-[0.65rem] px-2.5 transition-colors touch-manipulation",
            locale === code
              ? "bg-accent-muted text-runner-green"
              : "text-muted hover:text-foreground",
          )}
          aria-pressed={locale === code}
        >
          {messages.lang[code]}
        </button>
      ))}
    </div>
  );
}
