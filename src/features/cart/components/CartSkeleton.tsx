"use client";

import { Skeleton } from "@/components/ui";

export default function CartSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 space-y-8 md:space-y-12">
      <div className="space-y-3">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-6 w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-6">
                <Skeleton className="w-28 h-28 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-5 w-24" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-32 rounded-full" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-xl border border-border space-y-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
