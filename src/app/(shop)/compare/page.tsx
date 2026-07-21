"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, X, ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useCart } from "@/contexts/CartContext";
import { Button, Rating } from "@/components/ui";
import { getProductFallbackImage } from "@/constants/fallback-images";

const STORAGE_KEY = "emran_compare";

export default function ComparePage() {
  const { t } = useLanguage();
  const { currencySymbol } = useSettings();
  const { addToCart } = useCart();
  const router = useRouter();
  const [items, setItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  const remove = (id: string) => {
    const next = items.filter((p) => p._id !== id);
    setItems(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const clearAll = () => {
    setItems([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  if (loaded && items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-h3 font-extrabold">{t("compare")}</h1>
        <p className="mt-3 text-muted-foreground">{t("no_products_found")}</p>
        <Button className="mt-6" onClick={() => router.push("/products")}>
          {t("see_all_products")}
        </Button>
      </div>
    );
  }

  const priceCell = (p: Product) => {
    const final = p.discountPrice ?? p.price;
    return (
      <span className="font-bold text-foreground">
        {p.discountPrice ? (
          <span className="flex flex-col">
            <span className="text-primary">
              {currencySymbol}
              {final.toLocaleString("bn-BD")}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {currencySymbol}
              {p.price.toLocaleString("bn-BD")}
            </span>
          </span>
        ) : (
          <span>
            {currencySymbol}
            {p.price.toLocaleString("bn-BD")}
          </span>
        )}
      </span>
    );
  };

  const rows: { label: string; render: (p: Product) => React.ReactNode }[] = [
    {
      label: t("current_price"),
      render: priceCell,
    },
    {
      label: t("rating"),
      render: (p) => (
        <Rating value={p.rating ?? 0} size="sm" showValue count={p.reviews ?? 0} />
      ),
    },
    {
      label: t("availability"),
      render: (p) =>
        (p.stock ?? 0) > 0 ? (
          <span className="inline-flex items-center gap-1 text-success">
            <Check className="h-4 w-4" /> {t("in_stock")}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-danger">
            <X className="h-4 w-4" /> {t("out_of_stock_label")}
          </span>
        ),
    },
    {
      label: t("default_unit"),
      render: (p) => <span className="text-muted-foreground">{p.unit ?? "-"}</span>,
    },
    {
      label: t("shop_category"),
      render: (p) => (
        <span className="text-muted-foreground">{p.category?.name ?? "-"}</span>
      ),
    },
    {
      label: t("description"),
      render: (p) => (
        <span className="text-sm text-muted-foreground line-clamp-3">
          {p.description ?? "-"}
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t("back")}
          </Link>
          <h1 className="mt-2 text-h2 font-extrabold tracking-tight">{t("compare")}</h1>
        </div>
        {items.length > 0 && (
          <Button variant="outline" onClick={clearAll}>
            {t("clear_all")}
          </Button>
        )}
      </div>

      <div className="overflow-x-auto ds-custom-scrollbar">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-40 border-b border-border p-4 text-left text-sm font-semibold text-muted-foreground">
                {t("nav_products")}
              </th>
              {items.map((p) => (
                <th key={p._id} className="border-b border-border p-4 align-top">
                  <div className="relative mx-auto w-32">
                    <button
                      onClick={() => remove(p._id)}
                      aria-label={t("compare_remove")}
                      className="absolute -right-2 -top-2 rounded-full bg-muted p-1.5 text-muted-foreground hover:bg-danger hover:text-white transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <div className="aspect-square overflow-hidden rounded-xl border border-border bg-card">
                      <img
                        src={p.image || getProductFallbackImage(p.name)}
                        alt={p.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm font-semibold">{p.name}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="border-b border-border p-4 text-sm font-semibold text-muted-foreground">
                  {row.label}
                </td>
                {items.map((p) => (
                  <td key={p._id} className="border-b border-border p-4 text-sm">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {items.map((p) => (
                <td key={p._id} className="p-4">
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={(p.stock ?? 0) <= 0}
                    onClick={() => addToCart(p, 1)}
                  >
                    <ShoppingCart className="h-4 w-4" /> {t("add_to_cart")}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
