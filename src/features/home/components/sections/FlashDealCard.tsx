"use client";

import { motion } from "framer-motion";
import { Zap, Star, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface FlashDealCardProps {
  product: Product;
  index: number;
}

export default function FlashDealCard({ product, index }: FlashDealCardProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }}
      className="group relative bg-card rounded-2xl p-4 hover:p-0 transition-all duration-500 border border-border hover:border-warning/30 overflow-hidden shadow-sm hover:shadow-lg">
      <div className="relative aspect-[4/5] rounded-xl group-hover:rounded-none overflow-hidden bg-muted transition-all duration-500">
        <Image src={product.image || getProductFallbackImage(product.name)} alt={product.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-danger text-danger-foreground text-xs font-black px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            <Zap size={12} className="fill-current" /> <span>-25% OFF</span>
          </div>
        </div>
        <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
          <button onClick={() => { addToCart(product, 1); toast.success(`${product.name} ${t("add_to_cart_success")}`); }}
            className="w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center shadow-lg hover:bg-warning hover:text-warning-foreground transition-colors">
            <ShoppingBag size={18} />
          </button>
          <Link href={`/products/${product._id}`}
            className="w-10 h-10 rounded-full bg-card text-foreground flex items-center justify-center shadow-lg hover:bg-foreground hover:text-background transition-colors">
            <ArrowRight size={18} />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white bg-gradient-to-t from-black/90 to-transparent">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-warning">
              <span>In Stock</span> <span>12 Left</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="w-[60%] h-full bg-gradient-to-r from-warning to-danger rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </div>
        <div className="pt-4 px-2 group-hover:hidden">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-tight">{product.name}</h3>
            <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold">4.9</span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                {product.unit === "kg" ? t("unit_kg") : product.unit === "g" ? t("unit_g") : product.unit}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-foreground">{t("currency_symbol")}{product.price.toLocaleString("bn-BD")}</span>
                <span className="text-sm text-muted-foreground line-through font-bold">{t("currency_symbol")}{Math.round(product.price * 1.25).toLocaleString("bn-BD")}</span>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
}
