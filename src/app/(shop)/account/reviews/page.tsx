"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";

const mockReviews = [
  { id: "1", product: "Fresh Organic Mango", rating: 5, comment: "Excellent quality! Very fresh and sweet.", date: "2026-07-15", helpful: 12 },
  { id: "2", product: "Premium Basmati Rice 5kg", rating: 4, comment: "Good quality rice. Cooks well.", date: "2026-07-10", helpful: 8 },
  { id: "3", product: "Fresh Dairy Milk 1L", rating: 5, comment: "Always fresh and delivered on time.", date: "2026-07-05", helpful: 5 },
];

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"} written
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Star className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No reviews yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Share your thoughts on products you&apos;ve purchased</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.product}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-700"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-500 transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({review.helpful})
                </button>
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-emerald-500 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" /> Reply
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
