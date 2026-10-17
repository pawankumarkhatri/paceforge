import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold font-display tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-runner-green/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-runner-green text-white shadow-md shadow-[rgba(255,92,26,0.35)] hover:brightness-105 active:scale-[0.98]",
        secondary: "bg-surface text-foreground border border-border hover:bg-surface-elevated hover:border-runner-green/25",
        ghost: "text-muted hover:text-foreground hover:bg-black/[0.04]",
        cyan: "bg-surface text-electric-cyan border border-border hover:border-electric-cyan/40 font-sans font-semibold",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 rounded-lg px-3.5 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
