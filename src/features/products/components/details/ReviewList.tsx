"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ReviewItem } from "@/types/review";
import { Button, Rating } from "@/components/ui";

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
          <h2 className="text-2xl font-bold text-foreground mb-1.5 tracking-tight">
            {t("customer_reviews_title")}
          </h2>
          <p className="text-sm font-medium text-muted-foreground/60">
            {count.toLocaleString("bn-BD")}{" "}
            {t("customer_experience_shared_suffix")}
          </p>
        </div>

        <div className="flex items-center gap-6 bg-card p-5 rounded-xl border border-border shadow-xs">
          <div className="text-center">
            <p className="text-4xl font-bold text-foreground tracking-[-0.03em]">
              {avg.toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </p>
            <Rating
              value={avg}
              size="xs"
              className="mt-1"
            />
          </div>
          <div className="h-10 w-px bg-muted" />
          <Button
            variant="primary"
            size="md"
            onClick={onWriteReview}
            className="rounded-lg active:scale-[0.98]"
          >
            {t("write_review")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {items.map((review, idx) => (
          <motion.div
            key={`${review.name}-${idx}-${review.createdAt || ""}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: idx * 0.04,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="bg-card p-6 rounded-xl border border-border shadow-xs hover:shadow-sm transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {review.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {review.name}
                  </h4>
                  <p className="text-[10px] font-medium text-muted-foreground/50">
                    {new Date(
                      review.createdAt || Date.now()
                    ).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
              <Rating
                value={review.rating}
                size="xs"
              />
            </div>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
