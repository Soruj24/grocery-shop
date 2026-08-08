"use client";

import { motion } from "framer-motion";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        {/* Header Skeleton */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
          <div className="space-y-2">
            <div className="h-7 w-40 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
            <div className="h-3 w-28 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
          </div>
        </div>

        {/* Stepper Skeleton */}
        <div className="mb-8 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-5">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center flex-1 last:flex-initial">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="hidden sm:block space-y-1.5">
                    <div className="h-3 w-16 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                    <div className="h-2 w-12 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  </div>
                </div>
                {i < 4 && (
                  <div className="mx-3 h-0.5 flex-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="h-4 w-24 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
                <div className="space-y-3">
                  <div className="h-11 w-full rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="h-11 w-full rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="h-20 w-full rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-5 space-y-4">
              <div className="h-4 w-28 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-3/4 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                      <div className="h-2 w-1/4 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/[0.04] dark:border-white/[0.04] pt-4 space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="h-3 w-12 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="h-3 w-12 rounded bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
              </div>
              <div className="h-12 w-full rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
