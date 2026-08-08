"use client";

import {
  ShoppingBag,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmptyCartState() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black/[0.02] dark:bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative space-y-8 text-center px-4">
        <div className="relative inline-block">
          <div className="bg-white dark:bg-[#09090b] p-12 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-foreground text-background p-4 rounded-lg rotate-12">
            <Plus className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {t("cart_empty_title")}
          </h2>
          <p className="text-muted-foreground/60 font-medium max-w-sm mx-auto">
            {t("cart_empty_desc")}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 rounded-lg font-semibold text-base hover:opacity-90 transition-all active:scale-[0.98] group"
        >
          {t("cart_start_shopping")}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
