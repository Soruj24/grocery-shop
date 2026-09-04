"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RatingsBreakdownProps {
  rating: number;
  reviews: number;
}

export default function RatingsBreakdown({
  rating,
  reviews,
}: RatingsBreakdownProps) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = Math.round(
      reviews *
        (star === 5
          ? 0.6
          : star === 4
          ? 0.25
          : star === 3
          ? 0.1
          : star === 2
          ? 0.03
          : 0.02)
    );
    return {
      star,
      count,
      percentage:
        reviews > 0 ? (count / reviews) * 100 : 0,
    };
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground">
        Ratings Breakdown
      </h3>
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-5xl font-bold text-foreground tracking-[-0.03em]">
            {rating.toFixed(1)}
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map(
              (_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-black/[0.08] text-black/[0.08] dark:fill-white/[0.1] dark:text-white/[0.1]"
                  }`}
                />
              )
            )}
          </div>
          <p className="text-xs font-medium text-muted-foreground/60 mt-1.5">
            {reviews} reviews
          </p>
        </div>
        <div className="flex-1 space-y-2">
          {breakdown.map((b) => (
            <div
              key={b.star}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-medium text-muted-foreground/60 w-8">
                {b.star} ★
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${b.percentage}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  className="h-full bg-warning rounded-full"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground/60 w-8 text-right">
                {b.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
