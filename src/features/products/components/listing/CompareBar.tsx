"use client";

import Link from "next/link";
import Image from "next/image";
import { X, GitCompareArrows } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompare } from "./CompareContext";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Button } from "@/components/ui";

export default function CompareBar() {
  const { t } = useLanguage();
  const { items, removeCompare, clearCompare, count } = useCompare();

  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[150] px-4 pb-4">
      <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-3xl border border-border bg-card/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
        <div className="hidden items-center gap-2 pl-2 text-sm font-black text-foreground sm:flex">
          <GitCompareArrows className="h-5 w-5 text-primary" />
          {t("compare_bar_title")}
        </div>
        <div className="flex flex-1 items-center gap-2 overflow-x-auto ds-custom-scrollbar">
          {items.map((p) => (
            <div
              key={p._id}
              className="flex shrink-0 items-center gap-2 rounded-2xl border border-border bg-muted py-1.5 pl-1.5 pr-2"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-card">
                <Image
                  src={p.image || getProductFallbackImage(p.name)}
                  alt={p.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <span className="max-w-[120px] truncate text-xs font-bold text-foreground">
                {p.name}
              </span>
              <button
                onClick={() => removeCompare(p._id)}
                className="text-muted-foreground transition-colors hover:text-danger"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={clearCompare}
            className="hidden text-xs font-bold text-muted-foreground transition-colors hover:text-danger sm:block"
          >
            {t("clear_all")}
          </button>
          <Link href="/compare">
            <Button variant="primary" size="md" rightIcon={<GitCompareArrows className="h-4 w-4" />}>
              {t("compare_now")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
