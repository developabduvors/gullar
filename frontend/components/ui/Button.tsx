"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Luxury Boutique Button Variants ── */

const variants = {
  primary:
    "bg-gold text-dark font-medium hover:bg-gold/90",
  outline:
    "bg-transparent border border-yellow-600/30 text-gold font-medium hover:bg-yellow-600/10",
  ghost:
    "bg-transparent text-foreground/70 font-medium hover:bg-foreground/5",
  glass:
    "glass-gold text-gold font-medium border border-gold/20 hover:bg-yellow-600/10",
  cream:
    "bg-cream text-dark font-medium hover:bg-cream-light",
};

const sizes = {
  xs: "px-6 py-3 text-[10px] rounded-sm",
  sm: "px-7 py-3.5 text-xs rounded-sm",
  md: "px-8 py-4 text-sm rounded-sm",
  lg: "px-10 py-5 text-base rounded-sm",
  xl: "px-12 py-6 text-lg rounded-sm",
};

const loadingVariants = {
  primary: "border-gold-dark border-t-gold-light",
  outline: "border-gold/30 border-t-gold",
  ghost: "border-foreground/20 border-t-foreground",
  glass: "border-gold/30 border-t-gold",
  cream: "border-dark/20 border-t-dark",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium text-center",
          "uppercase tracking-[0.2em]",
          "transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-1",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
          "cursor-pointer select-none",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span
            className={cn(
              "inline-block h-4 w-4 rounded-full border-2 animate-spin",
              loadingVariants[variant]
            )}
          />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children && <span className={cn(isLoading && "opacity-0 absolute")}>{children}</span>}
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
