"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="w-full max-w-sm glass rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <Skeleton className="h-8 w-24 mx-auto" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>
        <Skeleton className="h-12 w-full !rounded-xl" />
        <Skeleton className="h-12 w-full !rounded-2xl" />
      </div>
    </div>
  );
}
