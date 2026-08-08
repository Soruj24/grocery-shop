"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { toast } from "react-hot-toast";

interface CrossSellItem {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
  unit?: string;
}

interface CrossSellProps {
  items?: CrossSellItem[];
}

const defaultItems: CrossSellItem[] = [
  {
    _id: "cs1",
    name: "Organic Honey",
    price: 450,
    discountPrice: 399,
    image: "https://picsum.photos/seed/honey/200/200",
  },
  {
    _id: "cs2",
    name: "Mixed Nuts",
    price: 350,
    discountPrice: 299,
    image: "https://picsum.photos/seed/nuts/200/200",
  },
  {
    _id: "cs3",
    name: "Green Tea",
    price: 250,
    discountPrice: 199,
    image: "https://picsum.photos/seed/greentea/200/200",
  },
  {
    _id: "cs4",
    name: "Olive Oil",
    price: 550,
    discountPrice: 499,
    image: "https://picsum.photos/seed/oliveoil/200/200",
  },
];

export default function CrossSell() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<
    Set<string>
  >(new Set());

  const handleAdd = (
    item: (typeof defaultItems)[0]
  ) => {
    addToCart(item, 1);
    setAddedIds(
      (prev) => new Set(prev).add(item._id)
    );
    toast.success(`${item.name} added to cart`);
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(item._id);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-lg font-bold text-foreground tracking-tight">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {defaultItems.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.04,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="bg-white dark:bg-[#09090b] rounded-xl border border-black/[0.04] dark:border-white/[0.04] p-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          >
            <div className="relative w-full aspect-square bg-black/[0.02] dark:bg-white/[0.02] rounded-lg overflow-hidden mb-2.5">
              <Image
                src={
                  item.image ||
                  getProductFallbackImage(
                    item.name
                  )
                }
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <h3 className="text-xs font-semibold text-foreground line-clamp-2 mb-1.5">
              {item.name}
            </h3>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-sm font-bold text-foreground">
                {t("currency_symbol")}
                {(
                  item.discountPrice || item.price
                ).toLocaleString("bn-BD")}
              </span>
              {item.discountPrice && (
                <span className="text-[9px] font-medium text-muted-foreground/40 line-through">
                  {t("currency_symbol")}
                  {item.price.toLocaleString(
                    "bn-BD"
                  )}
                </span>
              )}
            </div>
            <button
              onClick={() => handleAdd(item)}
              className="w-full flex items-center justify-center gap-1.5 bg-foreground text-background py-2 rounded-lg font-semibold text-[11px] transition-all active:scale-[0.98] hover:opacity-90"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
