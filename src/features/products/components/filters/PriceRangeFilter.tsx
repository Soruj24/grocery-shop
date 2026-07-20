"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface PriceRangeFilterProps {
  minPrice: string;
  maxPrice: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
}

export default function PriceRangeFilter({ minPrice, maxPrice, onMinChange, onMaxChange }: PriceRangeFilterProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">{t("price_range")}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase ml-1">{t("min_price")}</label>
          <input type="number" value={minPrice} onChange={(e) => onMinChange(e.target.value)}
            className="w-full px-4 py-3 bg-muted border-none rounded-2xl text-sm font-black text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase ml-1">{t("max_price")}</label>
          <input type="number" value={maxPrice} onChange={(e) => onMaxChange(e.target.value)}
            className="w-full px-4 py-3 bg-muted border-none rounded-2xl text-sm font-black text-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>
    </div>
  );
}
