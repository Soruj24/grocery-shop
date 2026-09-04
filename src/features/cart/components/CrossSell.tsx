"use client";

import {
  Sparkles,
  ArrowRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/utils/swal";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import Link from "next/link";

async function fetchProducts() {
  const res = await fetch("/api/products/list?limit=6&sort=newest");
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.products || [];
}

export default function CrossSell() {
  const { t } = useLanguage();
  const { addToCart, cart } = useCart();

  const { data: products } = useQuery({
    queryKey: ["cross-sell-products"],
    queryFn: fetchProducts,
  });

  const recommendations =
    products?.filter(
      (p: any) =>
        p.stock > 0 &&
        !cart.some((c: any) => c._id === p._id)
    ) || [];

  if (recommendations.length === 0) return null;

  const handleQuickAdd = (product: any) => {
    try {
      addToCart(product, 1);
      toast.success(
        `${product.name} - ${t("added_to_cart")}`
      );
    } catch {
      toast.error(t("failed_to_add_to_cart"));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-xs"
    >
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-muted-foreground/60" />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              {t("you_may_also_like")}
            </h3>
          </div>
          <Link
            href="/products"
            className="text-[10px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors flex items-center gap-1"
          >
            {t("see_all")}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {recommendations.slice(0, 6).map((product: any) => (
            <motion.div
              key={product._id}
              whileHover={{ y: -2 }}
              className="group relative bg-subtle rounded-xl border border-border overflow-hidden hover:shadow-sm transition-all duration-300"
            >
              <div className="relative aspect-square bg-muted">
                <Image
                  src={
                    product.images?.[0] ||
                    product.image ||
                    getProductFallbackImage(product.name)
                  }
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleQuickAdd(product)}
                  className="absolute bottom-2 right-2 w-7 h-7 bg-foreground text-background rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 space-y-1">
                <h4 className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">
                  {product.name}
                </h4>
                <p className="text-xs font-bold text-foreground">
                  {t("currency_symbol")}
                  {(product.discountPrice || product.price).toLocaleString("bn-BD")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
