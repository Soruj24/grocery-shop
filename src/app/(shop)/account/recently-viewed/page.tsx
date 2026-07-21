"use client";

import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Trash2, ShoppingBag } from "lucide-react";

export default function RecentlyViewedPage() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recently Viewed</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{recentlyViewed.length} items</p>
        </div>
        {recentlyViewed.length > 0 && (
          <button onClick={clearRecentlyViewed} className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors">
            <Trash2 className="h-3.5 w-3.5" /> Clear All
          </button>
        )}
      </div>

      {recentlyViewed.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Clock className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No recently viewed items</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">Products you view will appear here</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {recentlyViewed.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/products/${item._id}`} className="block rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-all">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                  {item.images?.[0] ? (
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <ShoppingBag className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">৳{item.price?.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
