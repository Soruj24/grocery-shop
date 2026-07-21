"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { Rating } from "@/components/ui";

interface RatingsBreakdownProps {
  rating: number;
  reviews: number;
}

export default function RatingsBreakdown({ rating, reviews }: RatingsBreakdownProps) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = Math.round(reviews * (star === 5 ? 0.6 : star === 4 ? 0.25 : star === 3 ? 0.1 : star === 2 ? 0.03 : 0.02));
    return { star, count, percentage: reviews > 0 ? (count / reviews) * 100 : 0 };
  });

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-foreground">Ratings Breakdown</h3>
      <div className="flex items-center gap-8">
        <div className="text-center">
          <p className="text-5xl font-black text-foreground">{rating.toFixed(1)}</p>
          <Rating value={rating} size="sm" className="mt-2" />
          <p className="text-xs font-bold text-muted-foreground mt-1">{reviews} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-8">{b.star} ★</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${b.percentage}%` }}
                  className="h-full bg-warning rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-muted-foreground w-8 text-right">{b.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
