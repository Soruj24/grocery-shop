"use client";

import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDailyDeals, DailyDealsBannerData } from "@/features/home/hooks/useDailyDeals";
import DailyDealsTimer from "./DailyDealsTimer";
import DailyDealsProductDisplay from "./DailyDealsProductDisplay";

interface Props { data?: DailyDealsBannerData; }

export default function DailyDealsBanner({ data }: Props) {
  const { t, timeLeft, content } = useDailyDeals(data);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-rose-600 rounded-[32px] p-8 md:p-12 text-white shadow-2xl shadow-orange-900/20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse" />
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-8 max-w-xl text-center md:text-left">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
            <Timer className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">{content.badge}</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              {content.title}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-sm">{content.subtitle}</span>
            </h2>
            <p className="text-white/90 text-lg font-medium max-w-md leading-relaxed">{content.desc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <DailyDealsTimer timeLeft={timeLeft} t={t} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link href="/products"
              className="group bg-white text-orange-600 px-8 py-4 rounded-full font-black text-lg inline-flex items-center gap-3 hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-xl hover:shadow-yellow-400/30 active:scale-95 transform hover:-translate-y-1">
              {t("daily_deals_view_offers")}<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        <DailyDealsProductDisplay image={content.image} productName={content.productName} price={content.price}
          originalPrice={content.originalPrice} discount={content.discount} t={t} />
      </div>
    </motion.div>
  );
}
