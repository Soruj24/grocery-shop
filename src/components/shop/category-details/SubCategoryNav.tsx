"use client";

import Link from "next/link";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";

interface SubCategoryNavProps {
  subCategories: ICategory[];
  currentId: string;
}

export default function SubCategoryNav({ subCategories, currentId }: SubCategoryNavProps) {
  const { t } = useLanguage();
  if (subCategories.length === 0) return null;

  return (
    <section className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl p-3 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24 z-10 overflow-hidden">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-1">
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mr-2 shrink-0 px-2">
          {t('sub_category_label')}
        </span>
        {subCategories.map((sub: ICategory) => (
          <Link
            key={sub._id}
            href={`/category/${sub._id}`}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border ${
              sub._id.toString() === currentId
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-lg shadow-gray-900/20"
                : "bg-transparent text-gray-500 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
