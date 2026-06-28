"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import type { ReviewItem } from "@/types/review";

interface ReviewListProps {
  items: ReviewItem[];
  avg: number;
  count: number;
  onWriteReview: () => void;
}

export default function ReviewList({
  items,
  avg,
  count,
  onWriteReview,
}: ReviewListProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            {t("customer_reviews_title")}
          </h2>
          <p className="text-gray-500 font-bold">
            {count.toLocaleString("bn-BD")}
            {t("customer_experience_shared_suffix")}
          </p>
        </div>

        <div className="flex items-center gap-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-[32px] border border-green-100 dark:border-green-800">
          <div className="text-center">
            <p className="text-4xl font-black text-green-600 dark:text-green-500">
              {avg.toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </p>
            <div className="flex items-center gap-0.5 text-amber-500 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.round(avg) ? "fill-current" : ""}`}
                />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-green-200 dark:bg-green-800" />
          <button
            onClick={onWriteReview}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all active:scale-95"
          >
            {t("write_review")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {items.map((review, idx) => (
          <motion.div
            key={`${review.name}-${idx}-${review.createdAt || ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-900/50 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-gray-400">
                  {review.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="font-black text-gray-800 dark:text-white">
                    {review.name}
                  </h4>
                  <p className="text-xs font-bold text-gray-400">
                    {new Date(
                      review.createdAt || Date.now(),
                    ).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-200 dark:text-gray-700"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
