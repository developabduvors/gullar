"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function FlowerDetailLoading() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-4 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton variant="rectangular" className="aspect-[4/5] w-full !rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-6 w-32 !rounded-full" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
