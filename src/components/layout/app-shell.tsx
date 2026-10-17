"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/lib/site-routes";
import { RunnerHeroBanner } from "@/components/layout/runner-hero-banner";
import { RUNNER_HERO_SIDEBAR_SRC } from "@/lib/site-assets";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useI18n } from "@/lib/i18n/context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { messages } = useI18n();
  const showRunnerHero = !pathname.startsWith("/organizer");
  const navItems = MAIN_NAV.filter((r) => r.href !== "/");

  function navText(href: string, kind: "full" | "short") {
    const m = messages.nav;
    if (href === "/") return kind === "full" ? m.home : m.shortStart;
    if (href === "/vdot") return kind === "full" ? m.vdot : m.shortVdot;
    if (href === "/training") return kind === "full" ? m.training : m.shortTrain;
    if (href === "/race-day") return kind === "full" ? m.raceDay : m.shortRace;
    return href;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row bg-background">
      <aside className="hidden md:flex md:w-60 md:flex-col md:border-r md:border-border md:bg-surface md:px-4 md:py-8">
        <Link href="/" className="mb-5 px-2">
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            Pace<span className="text-gradient-accent">Forge</span>
          </span>
        </Link>
        <div className="mb-6 overflow-hidden rounded-xl border border-border shadow-sm">
          <img
            src={RUNNER_HERO_SIDEBAR_SRC}
            alt={messages.hero.sidebarAlt}
            className="h-24 w-full object-cover object-center"
          />
        </div>
        <nav className="flex flex-col gap-1">
          <p className="micro-label px-3 mb-1">{messages.nav.runners}</p>
          <NavLink href="/" active={pathname === "/"} label={messages.nav.home} />
          {navItems.map(({ href }) => (
            <NavLink
              key={href}
              href={href}
              active={pathname.startsWith(href)}
              label={navText(href, "full")}
            />
          ))}
        </nav>
        <div className="mt-auto pt-6">
          <LanguageSwitcher className="w-full justify-center" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] md:pb-0">
        <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-md md:hidden pt-[env(safe-area-inset-top,0px)]">
          <div className="flex items-center justify-between gap-2 px-4 py-3">
            <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-foreground min-w-0 truncate">
              Pace<span className="text-gradient-accent">Forge</span>
            </Link>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-5 sm:py-6 md:px-8 md:py-8 min-w-0">
          {showRunnerHero && <RunnerHeroBanner />}
          {children}
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/95 backdrop-blur-xl md:hidden safe-bottom shadow-[0_-4px_24px_rgba(26,31,46,0.08)] pb-[env(safe-area-inset-bottom,0px)]"
        aria-label={messages.nav.mainAria}
      >
        <div className="mx-auto flex max-w-md justify-around px-0.5 py-1.5">
          {MAIN_NAV.map(({ href, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 min-w-[3.5rem] min-h-[3rem] justify-center transition-colors touch-manipulation",
                  active ? "text-runner-green" : "text-muted",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 1.75} />
                <span className="text-[10px] font-bold font-display leading-tight text-center max-w-[4.25rem] truncate">
                  {navText(href, "short")}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors border-l-[3px] font-display touch-manipulation",
        active
          ? "border-l-runner-green bg-accent-muted text-foreground"
          : "border-l-transparent text-muted hover:text-foreground hover:bg-black/[0.03]",
      )}
    >
      {label}
    </Link>
  );
}
