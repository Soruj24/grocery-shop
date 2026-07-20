"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TranslationKey } from "@/constants/translations";

interface DailyDealsProductDisplayProps {
  image: string;
  productName: string;
  price: string;
  originalPrice: string;
  discount: string;
  t: (key: TranslationKey) => string;
}

export default function DailyDealsProductDisplay({ image, productName, price, originalPrice, discount, t }: DailyDealsProductDisplayProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 5 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, type: "spring" }} className="relative w-full max-w-md aspect-square">
      <div className="relative z-10 w-full h-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-[40px] w-full h-full border border-white/20 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
            <div className="w-64 h-64 bg-white/20 rounded-full blur-3xl absolute animate-pulse" />
            <div className="relative w-56 h-56 transform hover:scale-110 transition-transform duration-700">
              <Image src={image} alt={productName} fill sizes="(max-width: 768px) 192px, 224px" className="object-contain drop-shadow-2xl" />
            </div>
            <div className="text-center relative z-10">
              <h3 className="text-2xl font-black mb-2 text-shadow-sm">{productName}</h3>
              <div className="inline-flex items-baseline gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="text-yellow-300 font-black text-2xl">{price}</span>
                <span className="text-white/60 line-through text-sm font-bold">{originalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 bg-warning text-warning-foreground w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg z-20 border-4 border-white/20 backdrop-blur-sm">
        <span className="text-[10px] font-black uppercase tracking-wider">{t("daily_deals_max")}</span>
        <span className="text-3xl font-black leading-none my-1">{discount}</span>
        <span className="text-[10px] font-black uppercase tracking-wider">{t("daily_deals_off")}</span>
      </motion.div>
    </motion.div>
  );
}
