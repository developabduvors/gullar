"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "glass-gold" | "glass-dark" | "cream" | "bordered";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const variants = {
  default: "bg-card border border-border",
  glass: "glass",
  "glass-gold": "glass-gold",
  "glass-dark": "glass-dark",
  cream: "bg-cream/30 border border-cream/50",
  bordered: "border-2 border-gold/20 bg-transparent",
};

const paddings = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300 ease-out",
          variants[variant],
          paddings[padding],
          hover &&
            "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer hover:border-gold/30",
          "animate-scale-in",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

/* ── Card sub-components ── */
export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between pt-4 border-t border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
