"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";

const mockReviews = [
  {
    id: "1",
    product: "Fresh Organic Mango",
    rating: 5,
    comment: "Excellent quality! Very fresh and sweet.",
    date: "2026-07-15",
    helpful: 12,
  },
  {
    id: "2",
    product: "Premium Basmati Rice 5kg",
    rating: 4,
    comment: "Good quality rice. Cooks well.",
    date: "2026-07-10",
    helpful: 8,
  },
  {
    id: "3",
    product: "Fresh Dairy Milk 1L",
    rating: 5,
    comment: "Always fresh and delivered on time.",
    date: "2026-07-05",
    helpful: 5,
  },
];

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Reviews
        </h1>
        <p className="text-sm text-muted-foreground/50 mt-1">
          {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"}{" "}
          written
        </p>
      </motion.div>

      {reviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs"
        >
          <Star className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
          <p className="text-sm font-semibold text-foreground">
            No reviews yet
          </p>
          <p className="text-[11px] text-muted-foreground/50 mt-1">
            Share your thoughts on products you&apos;ve
            purchased
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="rounded-2xl border border-border bg-card p-5 shadow-xs hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {review.product}
                  </p>
                  <div className="flex items-center gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s <= review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground/40">
                  {new Date(
                    review.date
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="text-sm text-muted-foreground/60">
                {review.comment}
              </p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
                <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 hover:text-foreground transition-colors">
                  <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({
                    review.helpful
                  })
                </button>
                <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 hover:text-foreground transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />{" "}
                  Reply
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
