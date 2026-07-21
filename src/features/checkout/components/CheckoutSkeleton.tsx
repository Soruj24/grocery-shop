"use client";

import { motion } from "framer-motion";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-16 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="h-20 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
            <div className="space-y-3">
              <div className="h-6 w-40 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-48 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-32 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
