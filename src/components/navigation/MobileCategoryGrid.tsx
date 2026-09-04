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
  "fruits",
  "vegetables",
  "fish",
  "meat",
  "dairy",
  "frozen",
  "bakery",
  "beauty",
  "baby-care",
  "cleaning",
];

const fallbackCategoryKeys = [
  "cat_fruits",
  "cat_vegetables",
  "cat_fish",
  "cat_meat",
  "cat_dairy",
  "cat_frozen",
  "cat_bakery",
  "cat_beauty",
  "cat_baby_care",
  "cat_cleaning",
];

export default function MobileCategoryGrid({
  onClose,
  categories,
}: MobileCategoryGridProps) {
  const { t } = useLanguage();

  const displayCategories =
    categories.length > 0
      ? categories
      : fallbackCategoryIds.map((id, i) => ({
          _id: id,
          name: t(
            fallbackCategoryKeys[
              i
            ] as keyof typeof t
          ),
        }));

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
        {t("top_categories")}
      </p>
      <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5">
        {displayCategories
          .slice(0, 10)
          .map((cat: Category, idx: number) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2 + idx * 0.03,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <Link
                href={`/products?category=${cat._id}`}
                onClick={onClose}
                className="flex flex-col items-center gap-2.5 p-3.5 rounded-xl bg-muted border border-border hover:border-border-strong transition-all duration-200 group relative overflow-hidden"
                aria-label={cat.name}
              >
                <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <div className="relative w-7 h-7">
                    <Image
                      src={
                        cat.image ||
                        getCategoryFallbackImage(
                          cat.name
                        )
                      }
                      alt={cat.name}
                      fill
                      sizes="28px"
                      className="object-contain"
                    />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200 line-clamp-1 relative z-10">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
