"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "inline-flex h-11 w-full max-w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-elevated p-1 text-muted border border-border [-webkit-overflow-scrolling:touch]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex min-h-[2.75rem] min-w-[4.5rem] flex-1 shrink-0 items-center justify-center whitespace-nowrap rounded-md px-2.5 py-2 text-xs font-semibold transition-all touch-manipulation sm:px-3 sm:text-sm data-[state=active]:bg-surface data-[state=active]:text-runner-green data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("mt-5 focus-visible:outline-none", className)} {...props} />;
}
