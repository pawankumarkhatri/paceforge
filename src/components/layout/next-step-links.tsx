import Link from "next/link";
import { RUNNER_ROUTES } from "@/lib/site-routes";

const exclude = new Set(["/", "/vdot"]);

export function NextStepLinks({ currentPath }: { currentPath: string }) {
  const links = RUNNER_ROUTES.filter((r) => !exclude.has(r.href) && r.href !== currentPath);
  if (links.length === 0) return null;

  return (
    <nav className="pt-6 border-t border-border" aria-label="More tools">
      <p className="text-sm text-muted mb-3">More tools</p>
      <div className="flex flex-wrap gap-2">
        {links.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground hover:border-runner-green/30 transition-colors"
          >
            {r.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
