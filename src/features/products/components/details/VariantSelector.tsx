"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ProductVariant } from "@/types/product";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariants: Record<string, string>;
  onSelect: (name: string, option: string) => void;
}

export default function VariantSelector({ variants, selectedVariants, onSelect }: VariantSelectorProps) {
  const { t } = useLanguage();

  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-4">
      {variants.map((variant) => {
        return (
          <div key={variant.name}>
            <label className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 block">
              {variant.name}: <span className="text-foreground">{selectedVariants[variant.name] || t('select')}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => {
                const isSelected = selectedVariants[variant.name] === option.label;
                return (
                  <button
                    key={option.label}
                    onClick={() => onSelect(variant.name, option.label)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                        : 'border-border bg-card text-foreground hover:border-primary/50'
                    } ${option.stock === 0 ? 'opacity-40 cursor-not-allowed line-through' : ''}`}
                    disabled={option.stock === 0}
                  >
                    {option.label}
                    {option.price && option.price > 0 && (
                      <span className="ml-1 text-xs opacity-80">(+{option.price})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
