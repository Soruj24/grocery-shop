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
          <h2 className="text-3xl font-black text-foreground mb-2">
            {t("customer_reviews_title")}
          </h2>
          <p className="text-muted-foreground font-bold">
            {count.toLocaleString("bn-BD")}
            {t("customer_experience_shared_suffix")}
          </p>
        </div>

        <div className="flex items-center gap-6 bg-primary-subtle p-6 rounded-2xl border border-primary/20">
          <div className="text-center">
            <p className="text-4xl font-black text-primary">
              {avg.toLocaleString("bn-BD", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </p>
            <Rating value={avg} size="xs" className="mt-1" />
          </div>
          <div className="h-10 w-px bg-primary/20" />
          <Button
            variant="primary"
            size="md"
            onClick={onWriteReview}
            className="rounded-2xl active:scale-95"
          >
            {t("write_review")}
          </Button>
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
            className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center font-black text-muted-foreground">
                  {review.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="font-black text-foreground">
                    {review.name}
                  </h4>
                  <p className="text-xs font-bold text-muted-foreground">
                    {new Date(
                      review.createdAt || Date.now(),
                    ).toLocaleDateString("bn-BD")}
                  </p>
                </div>
              </div>
              <Rating value={review.rating} size="xs" />
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
