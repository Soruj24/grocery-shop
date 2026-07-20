"use client";

import Link from "next/link";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface SubCategoryNavProps {
  subCategories: ICategory[];
  currentId: string;
}

export default function SubCategoryNav({ subCategories, currentId }: SubCategoryNavProps) {
  const { t } = useLanguage();
  if (subCategories.length === 0) return null;

  return (
    <section className="bg-card backdrop-blur-xl p-3 rounded-2xl border border-border shadow-sm sticky top-24 z-10 overflow-hidden">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-1">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mr-2 shrink-0 px-2">
          {t('sub_category_label')}
        </span>
        {subCategories.map((sub: ICategory) => (
          <Link
            key={sub._id}
            href={`/category/${sub._id}`}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border ${
              sub._id.toString() === currentId
                ? "bg-foreground text-background border-foreground shadow-lg"
                : "bg-transparent text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
