"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "card";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
}: SkeletonProps) {
  const baseClasses = "animate-shimmer rounded-lg bg-gray-700/30";

  const variantClasses = {
    text: "h-4 w-full rounded",
    circular: "rounded-full aspect-square",
    rectangular: "rounded-xl",
    card: "h-64 w-full rounded-2xl",
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function FlowerCardSkeleton() {
  return (
    <div className="rounded-[28px] overflow-hidden bg-[#1B1717] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <Skeleton variant="rectangular" className="aspect-[3/4] w-full !rounded-none !bg-[#2A2522]" />
      <div className="p-5 pt-4 space-y-3">
        <Skeleton className="h-5 w-2/3 !bg-white/5" />
        <Skeleton className="h-6 w-1/3 !bg-white/5" />
      </div>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="rectangular" className="h-12 w-12 !rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
