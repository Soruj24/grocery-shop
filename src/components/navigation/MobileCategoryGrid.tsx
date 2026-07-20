"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";

interface MobileCategoryGridProps {
  onClose: () => void;
  categories: Category[];
}

const fallbackCategoryIds = [
  "fruits", "vegetables", "fish", "meat", "dairy",
  "frozen", "bakery", "beauty", "baby-care", "cleaning",
];

const fallbackCategoryKeys = [
  "cat_fruits", "cat_vegetables", "cat_fish", "cat_meat", "cat_dairy",
  "cat_frozen", "cat_bakery", "cat_beauty", "cat_baby_care", "cat_cleaning",
];

export default function MobileCategoryGrid({ onClose, categories }: MobileCategoryGridProps) {
  const { t } = useLanguage();

  const displayCategories = categories.length > 0
    ? categories
    : fallbackCategoryIds.map((id, i) => ({ _id: id, name: t(fallbackCategoryKeys[i] as keyof typeof t) }));

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t("top_categories")}</p>
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-3">
        {displayCategories.slice(0, 10).map((cat: Category, idx: number) => (
          <motion.div key={cat._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.03 }}>
            <Link
              href={`/products?category=${cat._id}`}
              onClick={onClose}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-muted border border-border hover:border-primary/30 transition-all group hover:shadow-lg hover:shadow-primary relative overflow-hidden"
              aria-label={cat.name}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform relative z-10">
                <div className="relative w-8 h-8">
                  <Image src={cat.image || getCategoryFallbackImage(cat.name)} alt={cat.name} fill sizes="32px" className="object-contain" />
                </div>
              </div>
              <span className="text-[11px] font-black text-foreground group-hover:text-primary transition-colors line-clamp-1 relative z-10">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
