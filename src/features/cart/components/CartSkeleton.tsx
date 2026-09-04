"use client";

import { motion } from "framer-motion";

export default function CartSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-xl animate-pulse" />
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
        </div>
        <div className="ml-[52px] h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      {/* Banner Skeleton */}
      <div className="h-14 bg-muted rounded-xl animate-pulse" />

      {/* Headers Skeleton */}
      <div className="hidden lg:grid grid-cols-12 gap-6 px-1">
        <div className="col-span-7 h-3 bg-muted rounded animate-pulse" />
        <div className="col-span-2 h-3 bg-muted rounded animate-pulse" />
        <div className="col-span-2 h-3 bg-muted rounded animate-pulse" />
        <div className="col-span-1 h-3 bg-muted rounded animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-3">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5"
            >
              <div className="flex gap-5">
                <div className="w-24 h-24 bg-muted rounded-xl animate-pulse" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-1/4 bg-muted rounded animate-pulse" />
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-28 bg-muted rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-5 space-y-5">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-3 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-2/3 bg-muted rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-full bg-muted rounded animate-pulse" />
            <div className="h-3 w-full bg-muted rounded animate-pulse" />
          </div>
          <div className="h-12 w-full bg-muted rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
