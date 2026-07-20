"use client";

import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerEmptyProps {
  onClose: () => void;
}

export default function CartDrawerEmpty({ onClose }: CartDrawerEmptyProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center text-muted-foreground">
        <ShoppingBag size={48} />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-black text-foreground">
          {t("cart_empty_title")}
        </h3>
        <p className="text-muted-foreground font-medium">{t("cart_empty_desc")}</p>
      </div>
      <button
        onClick={onClose}
        className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-black shadow-primary active:scale-95 transition-all"
      >
        {t("cart_start_shopping")}
      </button>
    </div>
  );
}
