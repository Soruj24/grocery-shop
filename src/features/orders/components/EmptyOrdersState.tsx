"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmptyOrdersState() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-5 px-4">
      <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl flex items-center justify-center text-muted-foreground/30">
        <Package className="w-7 h-7" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-foreground">
          {t("no_orders_found")}
        </h2>
        <p className="text-sm font-medium text-muted-foreground/60 max-w-sm">
          {t("no_orders_desc")}
        </p>
      </div>
      <Link
        href="/products"
        className="bg-foreground text-background px-8 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
      >
        {t("shop_now_btn")}
      </Link>
    </div>
  );
}
