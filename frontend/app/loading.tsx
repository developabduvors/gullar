"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar skeleton */}
      <div className="h-16 bg-dark border-b border-white/5 flex items-center px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-32 !rounded-lg" />
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" className="h-8 w-8" />
          <Skeleton variant="circular" className="h-8 w-8" />
          <Skeleton className="h-8 w-20 !rounded-full" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="flex-1 bg-dark p-8 lg:p-16">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-6 w-48 !rounded-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-12 w-40 !rounded-full" />
            <Skeleton className="h-12 w-40 !rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
