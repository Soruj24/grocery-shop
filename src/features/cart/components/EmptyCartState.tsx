"use client";

import { ShoppingBag, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmptyCartState() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative space-y-8 text-center px-4">
        <div className="relative inline-block">
          <div className="bg-card p-12 rounded-2xl shadow-2xl border border-border animate-bounce-slow">
            <ShoppingBag className="w-20 h-20 text-muted-foreground" />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-5 rounded-lg shadow-primary rotate-12">
            <Plus className="w-8 h-8" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl font-black text-foreground tracking-tight">
            {t('cart_empty_title')}
          </h2>
          <p className="text-muted-foreground font-bold max-w-sm mx-auto text-lg">
            {t('cart_empty_desc')}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-4 bg-foreground text-background px-12 py-6 rounded-xl font-black text-xl hover:shadow-2xl hover:shadow-primary transition-all active:scale-95 group"
        >
          {t('cart_start_shopping')}
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
