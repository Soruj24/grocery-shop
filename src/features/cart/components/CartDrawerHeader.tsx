"use client";

import { X, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export default function CartDrawerHeader({
  itemCount,
  onClose,
}: CartDrawerHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="p-8 border-b border-border flex items-center justify-between bg-card">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-primary">
          <ShoppingBag size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground">
            {t("your_bag")}
          </h2>
          <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
            {itemCount.toLocaleString("bn-BD")}
            {t("items_suffix")}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-all"
      >
        <X size={24} />
      </button>
    </div>
  );
}
