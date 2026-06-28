"use client";

import Modal from "@/components/ui/Modal";
import { useLanguage } from "@/components/LanguageContext";

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
            <label className="text-xs font-black text-gray-500 dark:text-gray-400">
              {t("your_name")}
            </label>
            <input
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold"
              required
            />
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 dark:text-gray-400">
              {t("your_rating")}
            </label>
            <select
              value={rating}
              onChange={(e) => onRatingChange(parseInt(e.target.value))}
              className="w-full mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold"
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
          <label className="text-xs font-black text-gray-500 dark:text-gray-400">
            {t("your_review")}
          </label>
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold min-h-28"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-black disabled:opacity-50"
          >
            {t("submit_review")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
