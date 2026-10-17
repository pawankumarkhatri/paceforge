import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  path,
}: {
  title: string;
  description?: ReactNode;
  path?: string;
}) {
  return (
    <header className="mb-8 space-y-2.5">
      {path && <p className="micro-label text-runner-green">{path}</p>}
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      {description && (
        <div className="text-[1.05rem] text-muted max-w-xl leading-relaxed font-medium">
          {description}
        </div>
      )}
    </header>
  );
}
