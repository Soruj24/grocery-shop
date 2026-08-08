"use client";

import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CategoryNotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-5 px-4">
      <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl flex items-center justify-center text-muted-foreground/30">
        <ShoppingBag className="w-7 h-7" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-xl font-bold text-foreground">
          {t("category_not_found")}
        </h2>
        <p className="text-sm font-medium text-muted-foreground/60">
          The category you're looking for doesn't
          exist or has been removed.
        </p>
      </div>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4" />{" "}
        {t("see_all_products")}
      </Link>
    </div>
  );
}
