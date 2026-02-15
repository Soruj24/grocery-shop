"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, ArrowRight, Truck } from "lucide-react";
import PageBackground from "@/components/ui/PageBackground";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function TrackOrderSearchPage() {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      // If it's a full ID or short ID, we redirect to the tracking page
      // In a real app, you might want to validate or search first
      router.push(`/orders/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 relative overflow-hidden min-h-[70vh]">
      <PageBackground />
      
      <div className="relative z-10 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-green-600 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-green-600/20 mb-8"
        >
          <Truck className="w-12 h-12 text-white" />
        </motion.div>
<div className="space-y-4">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            {t('track_order_title_prefix')} <span className="text-green-600">{t('track_order_title_highlight')}</span>
          </h1>
          <p className="text-xl text-gray-500 font-bold max-w-xl mx-auto">
            {t('track_order_subtitle')}
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-md mx-auto relative group">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder={t('order_id_placeholder')}
            className="w-full bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-[24px] px-8 py-6 text-lg font-bold outline-none focus:border-green-500 transition-all shadow-xl group-hover:shadow-2xl dark:text-white"
          />
          <button
            type="submit"
            className="absolute right-3 top-3 bottom-3 bg-green-600 text-white px-8 rounded-2xl font-black hover:bg-green-700 transition-all flex items-center gap-2 group/btn"
          >
            {t('search_order')}
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-12 grid md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: t('track_step_1_title'), desc: t('track_step_1_desc') },
            { icon: Truck, title: t('track_step_2_title'), desc: t('track_step_2_desc') },
            { icon: Package, title: t('track_step_3_title'), desc: t('track_step_3_desc') },
          ].map((item, idx) => (
            <div key={idx} className="space-y-3">
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-green-600">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-black text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-sm font-bold text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
