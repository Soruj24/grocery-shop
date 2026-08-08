"use client";

import { motion } from "framer-motion";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-14 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse"
            />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                  }}
                  className="h-18 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse"
                />
              ))}
            </div>
            <div className="space-y-2.5">
              <div className="h-5 w-40 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
              <div className="h-10 w-full rounded-lg bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-48 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
            <div className="h-32 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
