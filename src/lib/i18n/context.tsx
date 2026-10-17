"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Messages } from "./messages/en";
import { hi } from "./messages/hi";

export type Locale = "en" | "hi";

const STORAGE_KEY = "paceforge_locale";

const catalogs: Record<Locale, Messages> = { en, hi };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: keyof Messages, key: string, vars?: Record<string, string | number>) => string;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getNested(section: Messages[keyof Messages], key: string): string {
  const parts = key.split(".");
  let cur: unknown = section;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return key;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : key;
}

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    vars[name] != null ? String(vars[name]) : `{${name}}`,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "hi") setLocaleState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = locale === "hi" ? "hi" : "en";
    document.documentElement.classList.toggle("locale-hi", locale === "hi");
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, ready]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const messages = catalogs[locale];

  const t = useCallback(
    (section: keyof Messages, key: string, vars?: Record<string, string | number>) => {
      const block = catalogs[locale][section];
      return interpolate(getNested(block, key), vars);
    },
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t, messages }), [locale, setLocale, t, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LocaleProvider");
  return ctx;
}
