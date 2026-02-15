"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/components/LanguageContext";

export default function EidSpecialDeals() {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const deals = [
    {
      id: "65cd123456789012345678a1",
      name: t('eid_semai'),
      price: 120,
      oldPrice: 150,
      img: "🍜",
      stock: 100,
    },
    {
      id: "65cd123456789012345678a2",
      name: t('eid_rice'),
      price: 580,
      oldPrice: 650,
      img: "🍚",
      stock: 50,
    },
    {
      id: "65cd123456789012345678a3",
      name: t('eid_milk'),
      price: 850,
      oldPrice: 920,
      img: "🥛",
      stock: 30,
    },
    {
      id: "65cd123456789012345678a4",
      name: t('eid_spices'),
      price: 450,
      oldPrice: 500,
      img: "🌶️",
      stock: 20,
    },
  ];

  const handleAddToCart = (deal: (typeof deals)[0]) => {
    addToCart({
      _id: deal.id,
      name: deal.name,
      price: deal.price,
      image: "",
    });
    toast.success(`${deal.name} ${t('add_to_cart_success')}`);
  };

  return (
    <section className="py-16">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-rose-500 font-black uppercase tracking-[0.2em] text-xs">
              <Sparkles className="w-4 h-4" />
              {t('eid_badge')}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white">
              {t('eid_title')} <br />
              <span className="text-rose-500">{t('eid_subtitle')}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-4 rounded-3xl border border-gray-200 dark:border-white/10">
            <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg shadow-rose-500/20">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-gray-500 uppercase">
                {t('eid_promo_label')}
              </p>
              <p className="text-xl font-black text-rose-500">EID2024</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {deals.map((deal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-white/5 rounded-[40px] p-6 border border-gray-100 dark:border-white/5 hover:border-rose-500/30 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none"
            >
              <div className="aspect-square bg-gray-50 dark:bg-black/20 rounded-[32px] flex items-center justify-center text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                {deal.img}
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-lg text-gray-800 dark:text-white line-clamp-1">
                  {deal.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-rose-500">
                    {t('currency_symbol')}{deal.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-bold">
                    {t('currency_symbol')}{deal.oldPrice}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(deal)}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t('eid_add_to_bag')}
                </button>
              </div>

              {/* Tag */}
              <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full">
                {t('eid_tag')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
