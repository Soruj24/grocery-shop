"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, X, Star } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, Checkbox, Badge, Button } from "@/components/ui";

interface FilterSidebarProps {
  categories: Category[];
  mainCategories: Category[];
  selectedCategory: string;
  brands: string[];
  selectedBrands: string[];
  minPrice: string;
  maxPrice: string;
  rating: string;
  inStock: boolean;
  discount: boolean;
  onChange: (patch: {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    rating?: string;
    inStock?: boolean;
    discount?: boolean;
  }) => void;
  onBrandChange: (next: string[]) => void;
  onClear: () => void;
}

const PRICE_MAX = 10000;
const PRICE_STEP = 100;

export default function FilterSidebar({
  categories,
  mainCategories,
  selectedCategory,
  brands,
  selectedBrands,
  minPrice,
  maxPrice,
  rating,
  inStock,
  discount,
  onChange,
  onBrandChange,
  onClear,
}: FilterSidebarProps) {
  const { t } = useLanguage();
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  // Dual range slider
  const minVal = Math.min(Number(localMin) || 0, Number(localMax) || PRICE_MAX);
  const maxVal = Math.max(Number(localMin) || 0, Number(localMax) || PRICE_MAX);

  const commitPrice = (nextMin: string, nextMax: string) => {
    onChange({
      minPrice: nextMin !== "0" ? nextMin : undefined,
      maxPrice: nextMax !== String(PRICE_MAX) ? nextMax : undefined,
    });
  };

  const ratingOptions = [
    { value: "4", label: "4+" },
    { value: "3", label: "3+" },
    { value: "2", label: "2+" },
    { value: "1", label: "1+" },
  ];

  const categoryAccordion = (
    <div className="space-y-1">
      <button
        onClick={() => onChange({ category: "" })}
        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-all ${
          !selectedCategory
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-primary-subtle"
        }`}
      >
        <span>{t("all_products")}</span>
      </button>
      {mainCategories.map((cat) => {
        const isSel = selectedCategory === cat._id;
        const subs = categories.filter((s) => s.parentId === cat._id);
        return (
          <div key={cat._id}>
            <button
              onClick={() => onChange({ category: cat._id })}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-bold transition-all ${
                isSel
                  ? "bg-primary-subtle text-primary"
                  : "text-muted-foreground hover:bg-primary-subtle"
              }`}
            >
              <span>{cat.name}</span>
            </button>
            {isSel && subs.length > 0 && (
              <div className="ml-3 space-y-1 border-l-2 border-primary/30 py-1 pl-3">
                {subs.map((sub) => (
                  <button
                    key={sub._id}
                    onClick={() => onChange({ category: sub._id })}
                    className={`block w-full rounded-lg px-3 py-1.5 text-left text-xs font-bold transition-all ${
                      selectedCategory === sub._id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-black text-foreground">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          {t("filter")}
        </h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs font-bold text-danger transition-colors hover:text-rose-600"
        >
          <X className="h-3.5 w-3.5" />
          {t("clear_all_filters")}
        </button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["cat", "price", "rating", "avail", "disc", "brand"]}
        items={[
          {
            value: "cat",
            title: t("categories"),
            content: categoryAccordion,
          },
          {
            value: "price",
            title: t("price_range"),
            content: (
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between text-sm font-bold text-foreground">
                  <span>
                    {t("currency_symbol")} {minVal.toLocaleString("bn-BD")}
                  </span>
                  <span>
                    {t("currency_symbol")} {maxVal.toLocaleString("bn-BD")}
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-muted">
                  <div
                    className="absolute h-full rounded-full bg-primary"
                    style={{
                      left: `${(minVal / PRICE_MAX) * 100}%`,
                      right: `${100 - (maxVal / PRICE_MAX) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={minVal}
                    onChange={(e) => {
                      const v = Math.min(Number(e.target.value), maxVal);
                      setLocalMin(String(v));
                      commitPrice(String(v), localMax);
                    }}
                    className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent accent-primary"
                  />
                  <input
                    type="range"
                    min={0}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={maxVal}
                    onChange={(e) => {
                      const v = Math.max(Number(e.target.value), minVal);
                      setLocalMax(String(v));
                      commitPrice(localMin, String(v));
                    }}
                    className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent accent-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={localMin}
                    onChange={(e) => setLocalMin(e.target.value)}
                    onBlur={() => commitPrice(localMin, localMax)}
                    className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold outline-none focus:border-primary"
                  />
                  <input
                    type="number"
                    value={localMax}
                    onChange={(e) => setLocalMax(e.target.value)}
                    onBlur={() => commitPrice(localMin, localMax)}
                    className="rounded-xl border border-border bg-card px-3 py-2 text-sm font-bold outline-none focus:border-primary"
                  />
                </div>
              </div>
            ),
          },
          {
            value: "rating",
            title: t("filter_rating"),
            content: (
              <div className="space-y-2 pt-1">
                {ratingOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted"
                  >
                    <Checkbox
                      checked={rating === opt.value}
                      onChange={() =>
                        onChange({ rating: rating === opt.value ? undefined : opt.value })
                      }
                    />
                    <span className="flex items-center gap-1 text-sm font-bold text-foreground">
                      {opt.label}
                      <span className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Number(opt.value)
                                ? "fill-warning text-warning"
                                : "text-border-strong"
                            }`}
                          />
                        ))}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            ),
          },
          {
            value: "avail",
            title: t("availability"),
            content: (
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted">
                <Checkbox
                  checked={inStock}
                  onChange={() => onChange({ inStock: !inStock })}
                />
                <span className="text-sm font-bold text-foreground">
                  {t("only_in_stock")}
                </span>
              </label>
            ),
          },
          {
            value: "disc",
            title: t("filter_discount"),
            content: (
              <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted">
                <Checkbox
                  checked={discount}
                  onChange={() => onChange({ discount: !discount })}
                />
                <span className="text-sm font-bold text-foreground">
                  {t("only_discount")}
                </span>
              </label>
            ),
          },
          ...(brands.length > 0
            ? [
                {
                  value: "brand",
                  title: t("brand"),
                  content: (
                    <div className="max-h-56 space-y-1 overflow-y-auto pt-1 ds-custom-scrollbar">
                      {brands.map((b) => {
                        const checked = selectedBrands.includes(b);
                        return (
                          <label
                            key={b}
                            className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-muted"
                          >
                            <Checkbox
                              checked={checked}
                              onChange={() =>
                                onBrandChange(
                                  checked
                                    ? selectedBrands.filter((x) => x !== b)
                                    : [...selectedBrands, b],
                                )
                              }
                            />
                            <span className="text-sm font-bold text-foreground">
                              {b}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ),
                },
              ]
            : []),
        ]}
      />
    </div>
  );
}
