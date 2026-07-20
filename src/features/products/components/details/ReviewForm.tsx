"use client";

import Modal from "@/components/ui/Modal";
import { Button, Input, Textarea } from "@/components/ui";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <Modal isOpen={isOpen} onClose={onClose} title={t("write_review")}>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black text-muted-foreground">
              {t("your_name")}
            </label>
            <Input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-2 font-bold"
              required
            />
          </div>
          <div>
            <label className="text-xs font-black text-muted-foreground">
              {t("your_rating")}
            </label>
            <select
              value={rating}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onRatingChange(parseInt(e.target.value))}
              className="mt-2 w-full px-4 py-3 bg-card border border-input rounded-md text-sm font-bold text-foreground focus:border-primary focus:shadow-focus outline-none transition-all"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r.toLocaleString("bn-BD")}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-black text-muted-foreground">
            {t("your_review")}
          </label>
          <Textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="mt-2 font-bold min-h-28"
            required
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={submitting}
            className="rounded-2xl font-black"
          >
            {t("submit_review")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
