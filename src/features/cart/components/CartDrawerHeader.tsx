"use client";

import {
  X,
  ShoppingBag,
} from "lucide-react";
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
    <div className="p-5 border-b border-border flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-foreground text-background rounded-lg flex items-center justify-center">
          <ShoppingBag size={16} />
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground">
            {t("your_bag")}
          </h2>
          <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-wider">
            {itemCount.toLocaleString("bn-BD")}{" "}
            {t("items_suffix")}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground/50 hover:text-foreground hover:bg-muted transition-all"
      >
        <X size={16} />
      </button>
    </div>
  );
}
