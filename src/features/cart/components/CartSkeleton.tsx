"use client";

import { Skeleton } from "@/components/ui";

export default function CartSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 space-y-8 md:space-y-12">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        <div className="lg:col-span-2 space-y-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#09090b] p-5 rounded-xl border border-black/[0.04] dark:border-white/[0.04]"
            >
              <div className="flex items-center gap-5">
                <Skeleton className="w-20 h-20 rounded-lg" />
                <div className="flex-1 space-y-2.5">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-24" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-28 rounded-lg" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#09090b] p-6 rounded-xl border border-black/[0.04] dark:border-white/[0.04] space-y-5">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
