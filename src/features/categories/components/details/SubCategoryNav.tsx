"use client";

import Link from "next/link";
import {
  Category as ICategory,
} from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubCategoryNavProps {
  subCategories: ICategory[];
  currentId: string;
}

export default function SubCategoryNav({
  subCategories,
  currentId,
}: SubCategoryNavProps) {
  const { t } = useLanguage();
  if (subCategories.length === 0) return null;

  return (
    <section className="overflow-hidden">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
        <span className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mr-1 shrink-0">
          {t("sub_category_label")}
        </span>
        {subCategories.map((sub: ICategory) => (
          <Link
            key={sub._id}
            href={`/category/${sub._id}`}
            className={`px-4 py-2 rounded-lg font-medium text-xs transition-all whitespace-nowrap border ${
              sub._id.toString() === currentId
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground/60 border-black/[0.06] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-foreground"
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
