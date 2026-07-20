"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function EidSpecialDeals() {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const deals = [
    {
      id: "65cd123456789012345678a1",
      name: t('eid_semai'),
      price: 120,
      oldPrice: 150,
      img: getProductFallbackImage("noodle"),
      stock: 100,
    },
    {
      id: "65cd123456789012345678a2",
      name: t('eid_rice'),
      price: 580,
      oldPrice: 650,
      img: getProductFallbackImage("rice"),
      stock: 50,
    },
    {
      id: "65cd123456789012345678a3",
      name: t('eid_milk'),
      price: 850,
      oldPrice: 920,
      img: getProductFallbackImage("milk"),
      stock: 30,
    },
    {
      id: "65cd123456789012345678a4",
      name: t('eid_spices'),
      price: 450,
      oldPrice: 500,
      img: getProductFallbackImage("spice"),
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
    <section className="py-8">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-danger font-black uppercase tracking-[0.2em] text-xs">
              <Sparkles className="w-4 h-4" />
              {t('eid_badge')}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground">
              {t('eid_title')} <br />
              <span className="text-danger">{t('eid_subtitle')}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-muted p-4 rounded-3xl border border-border">
            <div className="p-3 bg-danger text-danger-foreground rounded-2xl shadow-sm">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-black text-muted-foreground uppercase">
                {t('eid_promo_label')}
              </p>
              <p className="text-xl font-black text-danger">EID2024</p>
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
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-danger/30 transition-all shadow-sm"
            >
              <div className="aspect-square bg-muted rounded-xl flex items-center justify-center mb-6 overflow-hidden relative">
                <Image
                  src={deal.img}
                  alt={deal.name}
                  fill
                  sizes="200px"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-black text-lg text-foreground line-clamp-1">
                  {deal.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-danger">
                    {t('currency_symbol')}{deal.price.toLocaleString('bn-BD')}
                  </span>
                  <span className="text-sm text-muted-foreground line-through font-bold">
                    {t('currency_symbol')}{deal.oldPrice.toLocaleString('bn-BD')}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(deal)}
                  className="w-full bg-foreground text-background py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-danger hover:text-danger-foreground transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t('eid_add_to_bag')}
                </button>
              </div>

              {/* Tag */}
              <div className="absolute top-4 right-4 bg-danger text-danger-foreground text-[10px] font-black px-3 py-1.5 rounded-full">
                {t('eid_tag')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
