"use client";

import Modal from "@/components/ui/Modal";
import { Button, Input, Textarea } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  rating: number;
  onRatingChange: (rating: number) => void;
  comment: string;
  onCommentChange: (comment: string) => void;
  submitting: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ReviewForm({
  isOpen,
  onClose,
  name,
  onNameChange,
  rating,
  onRatingChange,
  comment,
  onCommentChange,
  submitting,
  onSubmit,
}: ReviewFormProps) {
  const { t } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("write_review")}
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="review-name" className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {t("your_name")}
            </label>
            <Input
              id="review-name"
              value={name}
              autoComplete="name"
              onChange={(e) =>
                onNameChange(e.target.value)
              }
              className="mt-2"
              required
            />
          </div>
          <div>
            <span id="review-rating-label" className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {t("your_rating")}
            </span>
            <div className="mt-2 flex items-center gap-1" role="radiogroup" aria-labelledby="review-rating-label">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={star === rating}
                  aria-label={`Rate ${star} out of 5 stars`}
                  onClick={() =>
                    onRatingChange(star)
                  }
                  className="p-0.5 transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-black/[0.08] text-black/[0.08] dark:fill-white/[0.1] dark:text-white/[0.1]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="review-comment" className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
            {t("your_review")}
          </label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(e) =>
              onCommentChange(e.target.value)
            }
            className="mt-2 min-h-28"
            required
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
            className="rounded-lg font-semibold"
          >
            {t("submit_review")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
