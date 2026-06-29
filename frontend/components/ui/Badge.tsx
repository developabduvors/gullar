"use client";

import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-foreground/5 text-foreground/70 border border-foreground/10",
  gold: "bg-gold/15 text-gold border border-gold/25",
  cream: "bg-cream/20 text-cream border border-cream/20",
  success: "bg-green/10 text-green border border-green/20",
  error: "bg-rose/10 text-rose border border-rose/20",
  new: "bg-gradient-to-r from-gold/20 to-gold/10 text-gold border border-gold/30",
  sale: "bg-rose/15 text-rose-dark border border-rose/25",
};

const badgeSizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof badgeVariants;
  size?: keyof typeof badgeSizes;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium tracking-wide",
        badgeVariants[variant],
        badgeSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
