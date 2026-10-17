import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GuideNote({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-runner-green/25 bg-gradient-to-br from-accent-muted to-surface px-4 py-3.5 text-sm leading-relaxed text-foreground",
        className,
      )}
    >
      {title && <p className="font-display font-bold text-foreground mb-1.5">{title}</p>}
      <div className="text-muted font-medium [&_strong]:text-foreground">{children}</div>
    </div>
  );
}
