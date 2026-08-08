"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductVariant } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariants: Record<string, string>;
  onSelect: (name: string, option: string) => void;
}

export default function VariantSelector({
  variants,
  selectedVariants,
  onSelect,
}: VariantSelectorProps) {
  const { t } = useLanguage();

  if (!variants || variants.length === 0)
    return null;

  return (
    <div className="space-y-5">
      {variants.map((variant) => (
        <div key={variant.name}>
          <label className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-2.5 block">
            {variant.name}:{" "}
            <span className="text-foreground font-semibold">
              {selectedVariants[variant.name] ||
                t("select")}
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected =
                selectedVariants[variant.name] ===
                option.label;
              return (
                <button
                  key={option.label}
                  onClick={() =>
                    onSelect(
                      variant.name,
                      option.label
                    )
                  }
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    isSelected
                      ? "border-foreground bg-foreground text-background shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                      : "border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#09090b] text-foreground hover:border-black/[0.15] dark:hover:border-white/[0.15]"
                  } ${
                    option.stock === 0
                      ? "opacity-30 cursor-not-allowed line-through"
                      : ""
                  }`}
                  disabled={option.stock === 0}
                >
                  {option.label}
                  {option.price &&
                    option.price > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        (+{option.price})
                      </span>
                    )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
