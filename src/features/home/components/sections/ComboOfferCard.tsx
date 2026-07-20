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
      className="group relative bg-card rounded-2xl p-10 border border-border hover:border-info/30 transition-all duration-500 shadow-sm hover:shadow-lg overflow-hidden"
    >
      <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-info/5 blur-[80px] rounded-full group-hover:bg-info/10 transition-colors" />

      <div className="absolute top-10 right-10 bg-gradient-to-br from-info to-accent text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-sm z-10 uppercase tracking-widest">
        {combo.tag}
      </div>

      <div className="relative w-48 h-48 mx-auto mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-info/10 to-accent/10 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 transition-all duration-700" />
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
          <h3 className="text-3xl font-black text-foreground group-hover:text-info transition-colors">
            {combo.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {combo.items.map((item, i) => (
              <span
                key={i}
                className="text-[11px] font-black text-muted-foreground bg-muted px-4 py-2 rounded-xl border border-border group-hover:border-info/20 group-hover:bg-info-subtle transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-border">
          <div className="text-left">
            <div className="text-sm text-muted-foreground line-through font-bold mb-1">
              {t("currency_symbol")}
              {combo.oldPrice.toLocaleString("bn-BD")}
            </div>
            <div className="text-4xl font-black text-foreground flex items-center gap-1">
              <span className="text-lg">{t("currency_symbol")}</span>
              {combo.price.toLocaleString("bn-BD")}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-3 bg-foreground text-background hover:bg-info hover:text-info-foreground px-8 py-5 rounded-xl font-black transition-all duration-500 shadow-sm hover:shadow-lg active:scale-95 group/btn"
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
