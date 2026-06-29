"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCountdown } from "@/features/home/hooks/useCountdown";
import FlashDealsHeader from "./FlashDealsHeader";
import CountdownTimer from "./CountdownTimer";
import FlashDealCard from "./FlashDealCard";

interface FlashDealsProps {
  products: Product[];
  data?: { endAt?: string };
}

export default function FlashDeals({ products, data }: FlashDealsProps) {
  const { t } = useLanguage();
  const timeLeft = useCountdown(data?.endAt);
  const flashProducts = products.slice(0, 4);

  return (
    <section className="relative py-12 lg:py-20 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          <FlashDealsHeader />
          <CountdownTimer timeLeft={timeLeft} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {flashProducts.map((product, idx) => (
            <FlashDealCard key={product._id} product={product} index={idx} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/products?sort=price_asc"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-black overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all hover:-translate-y-1">
            <span className="relative z-10">{t("see_all_deals")}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
