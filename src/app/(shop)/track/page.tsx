"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Package, ArrowRight, Truck } from "lucide-react";
import PageBackground from "@/components/ui/PageBackground";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";

export default function TrackOrderSearchPage() {
  const { t } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/orders/track/${orderId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col lg:flex-row">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative min-h-[600px] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image 
          src={getProductFallbackImage("track")} 
          alt="Track Order" 
          fill 
          className="object-cover"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-12">
          <div className="text-white space-y-6 max-w-lg relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-600/30 mb-6"
            >
              <Truck className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-black tracking-tight leading-tight"
            >
              {t('track_order_title_prefix')} <span className="text-green-500">{t('track_order_title_highlight')}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 font-medium leading-relaxed"
            >
              {t('track_order_subtitle')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Right Side - Search Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 relative bg-white dark:bg-[#0B1120]">
        <PageBackground />
        
        <div className="w-full max-w-md space-y-12 relative z-10">
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">
              Enter Order ID
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Track your delivery status in real-time
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative group">
            <div className="relative">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder={t('order_id_placeholder')}
                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-5 text-lg font-bold outline-none focus:border-green-500 transition-all shadow-sm group-hover:shadow-xl dark:text-white pl-14"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-green-600 text-white py-5 rounded-2xl font-black hover:bg-green-700 transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-green-600/20 active:scale-95"
            >
              {t('search_order')}
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="grid gap-6">
            {[
              { icon: Search, title: t('track_step_1_title'), desc: t('track_step_1_desc') },
              { icon: Truck, title: t('track_step_2_title'), desc: t('track_step_2_desc') },
              { icon: Package, title: t('track_step_3_title'), desc: t('track_step_3_desc') },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
              >
                <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-green-600 shadow-sm shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs font-medium text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
