"use client";

import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function CustomerReviews() {
  const { t, language } = useLanguage();

  const reviews = [
    {
      id: 1,
      user: t('review_1_user'),
      rating: 5,
      date: t('review_1_date'),
      comment: t('review_1_comment'),
      likes: 12,
    },
    {
      id: 2,
      user: t('review_2_user'),
      rating: 4,
      date: t('review_2_date'),
      comment: t('review_2_comment'),
      likes: 8,
    },
    {
      id: 3,
      user: t('review_3_user'),
      rating: 5,
      date: t('review_3_date'),
      comment: t('review_3_comment'),
      likes: 24,
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">{t('customer_reviews_title')}</h2>
          <p className="text-gray-500 font-bold">120{t('customer_experience_shared_suffix')}</p>
        </div>
        
        <div className="flex items-center gap-6 bg-green-50 dark:bg-green-900/20 p-6 rounded-[32px] border border-green-100 dark:border-green-800">
          <div className="text-center">
            <p className="text-4xl font-black text-green-600 dark:text-green-500">{t('rating_avg')}</p>
            <div className="flex items-center gap-0.5 text-amber-500 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
          </div>
          <div className="h-10 w-px bg-green-200 dark:bg-green-800" />
          <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all active:scale-95">
            {t('write_review')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-gray-900/50 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center font-black text-gray-400">
                  {review.user[0]}
                </div>
                <div>
                  <h4 className="font-black text-gray-800 dark:text-white">{review.user}</h4>
                  <p className="text-xs font-bold text-gray-400">{review.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200 dark:text-gray-700'}`} />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6">
              {review.comment}
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-gray-50 dark:border-gray-800">
              <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-green-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>{t('helpful')} ({review.likes})</span>
              </button>
              <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-blue-500 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>{t('reply')}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
