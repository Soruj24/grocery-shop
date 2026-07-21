"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui";

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
  { _id: "cs1", name: "Organic Honey", price: 450, discountPrice: 399, image: "https://picsum.photos/seed/honey/200/200" },
  { _id: "cs2", name: "Mixed Nuts", price: 350, discountPrice: 299, image: "https://picsum.photos/seed/nuts/200/200" },
  { _id: "cs3", name: "Green Tea", price: 250, discountPrice: 199, image: "https://picsum.photos/seed/greentea/200/200" },
  { _id: "cs4", name: "Olive Oil", price: 550, discountPrice: 499, image: "https://picsum.photos/seed/oliveoil/200/200" },
];

export default function CrossSell() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const handleAdd = (item: (typeof defaultItems)[0]) => {
    addToCart(item, 1);
    setAddedIds((prev) => new Set(prev).add(item._id));
    toast.success(`${item.name} added to cart`);
    setTimeout(() => setAddedIds((prev) => { const next = new Set(prev); next.delete(item._id); return next; }), 2000);
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-foreground">You Might Also Like</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {defaultItems.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="group bg-card rounded-xl border border-border p-4 hover:shadow-lg hover:border-primary/30 transition-all"
          >
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden mb-3">
              <Image
                src={item.image || getProductFallbackImage(item.name)}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-sm font-black text-foreground line-clamp-2 mb-2">{item.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-black text-primary">
                {t('currency_symbol')}{(item.discountPrice || item.price).toLocaleString('bn-BD')}
              </span>
              {item.discountPrice && (
                <span className="text-xs font-bold text-muted-foreground line-through">
                  {t('currency_symbol')}{item.price.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
            <button
              onClick={() => handleAdd(item)}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground py-3 rounded-xl font-black text-xs transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
