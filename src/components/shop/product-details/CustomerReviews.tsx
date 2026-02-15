"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import Modal from "@/components/ui/Modal";

interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

export default function CustomerReviews({ productId }: { productId: string }) {
  const { t } = useLanguage();
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [avg, setAvg] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [open, setOpen] = useState(false);
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

  const onSubmit = async (e: React.FormEvent) => {
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
        setItems((prev) => [{ name, rating, comment, createdAt: new Date().toISOString() }, ...prev]);
        setAvg(data.rating || avg);
        setCount(data.count || count + 1);
        setOpen(false);
        setName("");
        setRating(5);
        setComment("");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">{t('customer_reviews_title')}</h2>
          <p className="text-gray-500 font-bold">{count}{t('customer_experience_shared_suffix')}</p>
        </div>
        
        <div className="flex items-center gap-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-[32px] border border-green-100 dark:border-green-800">
          <div className="text-center">
            <p className="text-4xl font-black text-green-600 dark:text-green-500">{avg.toFixed(1)}</p>
            <div className="flex items-center gap-0.5 text-amber-500 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.round(avg) ? "fill-current" : ""}`} />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-green-200 dark:bg-green-800" />
          <button
            onClick={() => setOpen(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all active:scale-95"
          >
            {t('write_review')}
          </button>
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
            className="bg-white dark:bg-gray-900/50 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-gray-400">
                  {review.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="font-black text-gray-800 dark:text-white">{review.name}</h4>
                  <p className="text-xs font-bold text-gray-400">
                    {new Date(review.createdAt || Date.now()).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200 dark:text-gray-700'}`} />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title={t('write_review')}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black text-gray-500 dark:text-gray-400">{t('your_name')}</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold"
                required
              />
            </div>
            <div>
              <label className="text-xs font-black text-gray-500 dark:text-gray-400">{t('your_rating')}</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full mt-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-sm font-bold"
              >
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-500 dark:text-gray-400">{t('your_review')}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
              {t('submit_review')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
