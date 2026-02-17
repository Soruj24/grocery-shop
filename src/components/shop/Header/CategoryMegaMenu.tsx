"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface CategoryMegaMenuProps {
  categories: ICategory[];
  onClose: () => void;
}

export default function CategoryMegaMenu({
  categories,
  onClose,
}: CategoryMegaMenuProps) {
  const { t, language } = useLanguage();

  // Static categories as requested by user if not provided via props
  const staticCategories: ICategory[] = [
    {
      _id: "fruits",
      name: t('cat_fruits'),
      nameEn: t('cat_fruits_desc'),
      subCategories: [],
    },
    {
      _id: "vegetables",
      name: t('cat_vegetables'),
      nameEn: t('cat_vegetables_desc'),
      subCategories: [],
    },
    {
      _id: "fish",
      name: t('cat_fish'),
      nameEn: t('cat_fish_desc'),
      subCategories: [],
    },
    { 
      _id: "meat", 
      name: t('cat_meat'), 
      nameEn: t('cat_meat_desc'), 
      subCategories: [] 
    },
    { 
      _id: "dairy", 
      name: t('cat_dairy'), 
      nameEn: t('cat_dairy_desc'), 
      subCategories: [] 
    },
    {
      _id: "frozen",
      name: t('cat_frozen'),
      nameEn: t('cat_frozen_desc'),
      subCategories: [],
    },
    {
      _id: "bakery",
      name: t('cat_bakery'),
      nameEn: t('cat_bakery_desc'),
      subCategories: [],
    },
    {
      _id: "beauty",
      name: t('cat_beauty'),
      nameEn: t('cat_beauty_desc'),
      subCategories: [],
    },
    {
      _id: "baby-care",
      name: t('cat_baby_care'),
      nameEn: t('cat_baby_care_desc'),
      subCategories: [],
    },
    {
      _id: "cleaning",
      name: t('cat_cleaning'),
      nameEn: t('cat_cleaning_desc'),
      subCategories: [],
    },
  ];

  const displayCategories =
    categories.length > 0 ? categories : staticCategories;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-0 left-0 w-[1100px] bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-black/90 border border-gray-100 dark:border-white/5 rounded-b-[40px] rounded-tr-[40px] p-12 z-50 grid grid-cols-4 gap-x-8 gap-y-12 max-h-[85vh] overflow-y-auto custom-scrollbar"
    >
      {displayCategories.map((cat: ICategory, idx: number) => (
        <motion.div
          key={cat._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="space-y-6 group/main"
        >
          <NextLink
            href={`/products?category=${cat._id}`}
            onClick={onClose}
            className="flex items-center gap-5 group/item"
          >
            <div className="relative flex-shrink-0">
              <div className="w-[72px] h-[72px] rounded-[24px] overflow-hidden bg-white dark:bg-white/5 shadow-xl border border-gray-100 dark:border-white/10 group-hover/item:border-green-500/50 transition-all duration-500">
                <Image
                  src={cat.image || getCategoryFallbackImage(cat.nameEn || cat.name)}
                  alt={language === 'en' ? (cat.nameEn || cat.name) : cat.name}
                  width={72}
                  height={72}
                  sizes="72px"
                  className="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-black text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors leading-tight">
                {language === 'en' ? (cat.nameEn || cat.name) : cat.name}
              </span>
              <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {t('collection')}
              </span>
            </div>
          </NextLink>

          {/* Sub Categories List */}
          {cat.subCategories && cat.subCategories.length > 0 && (
            <div className="flex flex-col space-y-2.5 pl-1">
              {cat.subCategories.slice(0, 6).map((sub: ICategory) => (
                <NextLink
                  key={sub._id}
                  href={`/products?category=${sub._id}`}
                  onClick={onClose}
                  className="group/sub flex items-center gap-3 text-[14px] font-bold text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                >
                  <ChevronRight
                    size={14}
                    className="text-gray-300 dark:text-gray-700 group-hover/sub:text-green-500 group-hover/sub:translate-x-1 transition-all"
                  />
                  <span className="flex-1 leading-snug">
                    {language === 'en' ? (sub.nameEn || sub.name) : sub.name}
                  </span>
                </NextLink>
              ))}

              <NextLink
                href={`/products?category=${cat._id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest pt-4 hover:gap-3 transition-all"
              >
                {t('see_all')}
                <ArrowRight size={14} />
              </NextLink>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
