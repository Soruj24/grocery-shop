"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/providers/LanguageContext";
import type { ReviewItem } from "@/types/review";

export function useProductReviews(productId: string) {
  const { t } = useLanguage();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [avg, setAvg] = useState(0);
  const [count, setCount] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/products/${productId}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setAvg(data.rating || 0);
        setCount(data.count || 0);
      }
    };
    load();
  }, [productId]);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });
      if (res.ok) {
        const data = await res.json();
        setItems((prev) =>
          [
            { name, rating, comment, createdAt: new Date().toISOString() },
            ...prev,
          ].slice(0, 100),
        );
        setAvg(data.rating || avg);
        setCount(data.count || count + 1);
        closeForm();
        setName("");
        setRating(5);
        setComment("");
        toast.success(t("review_submitted_success"));
      } else {
        toast.error(t("review_submit_error"));
      }
    } catch {
      toast.error(t("review_submit_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return {
    items,
    avg,
    count,
    isFormOpen,
    name,
    setName,
    rating,
    setRating,
    comment,
    setComment,
    submitting,
    openForm,
    closeForm,
    submitReview,
  };
}
