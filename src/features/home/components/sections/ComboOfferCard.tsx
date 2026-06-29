"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ComboOffer } from "@/constants/combo-offers-data";

interface ComboOfferCardProps {
  combo: ComboOffer;
  index: number;
}

export default function ComboOfferCard({ combo, index }: ComboOfferCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = () => {
    addToCart({
      _id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
    });
    toast.success(`${combo.name} ${t("add_to_cart_success")}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative bg-white dark:bg-[#0F172A] rounded-[48px] p-10 border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(59,130,246,0.15)] overflow-hidden"
    >
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />

      <div className="absolute top-10 right-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/30 z-10 uppercase tracking-widest">
        {combo.tag}
      </div>

      <div className="relative w-48 h-48 mx-auto mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 transition-all duration-700" />
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          sizes="192px"
          className="object-contain transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700"
        />
      </div>

      <div className="space-y-8 text-center relative z-10">
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
            {combo.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {combo.items.map((item, i) => (
              <span
                key={i}
                className="text-[11px] font-black text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/10 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-white/5">
          <div className="text-left">
            <div className="text-sm text-gray-400 line-through font-bold mb-1">
              {t("currency_symbol")}
              {combo.oldPrice.toLocaleString("bn-BD")}
            </div>
            <div className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-1">
              <span className="text-lg">{t("currency_symbol")}</span>
              {combo.price.toLocaleString("bn-BD")}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-8 py-5 rounded-[24px] font-black transition-all duration-500 shadow-xl hover:shadow-blue-500/30 active:scale-95 group/btn"
          >
            <ShoppingBag
              size={22}
              className="group-hover/btn:scale-110 transition-transform"
            />
            {t("add_to_cart")}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
