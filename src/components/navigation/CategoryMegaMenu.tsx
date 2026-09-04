"use client";

import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";

interface CategoryMegaMenuProps {
  categories: ICategory[];
  onClose: () => void;
}

export default function CategoryMegaMenu({
  categories,
  onClose,
}: CategoryMegaMenuProps) {
  const { t } = useLanguage();

  const staticCategories: ICategory[] = [
    { _id: "fruits", name: t("cat_fruits"), subCategories: [] },
    { _id: "vegetables", name: t("cat_vegetables"), subCategories: [] },
    { _id: "fish", name: t("cat_fish"), subCategories: [] },
    { _id: "meat", name: t("cat_meat"), subCategories: [] },
    { _id: "dairy", name: t("cat_dairy"), subCategories: [] },
    { _id: "frozen", name: t("cat_frozen"), subCategories: [] },
    { _id: "bakery", name: t("cat_bakery"), subCategories: [] },
    { _id: "beauty", name: t("cat_beauty"), subCategories: [] },
    { _id: "baby-care", name: t("cat_baby_care"), subCategories: [] },
    { _id: "cleaning", name: t("cat_cleaning"), subCategories: [] },
  ];

  const displayCategories =
    categories.length > 0
      ? categories
      : staticCategories;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-0 left-0 w-[min(1100px,calc(100vw-3rem))] bg-card backdrop-blur-xl shadow-2xl border border-border rounded-2xl p-6 lg:p-10 z-50 grid grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-8 lg:gap-y-10 max-h-[85vh] overflow-y-auto custom-scrollbar"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/[0.03] blur-[80px] rounded-full pointer-events-none" />

      {displayCategories.map(
        (cat: ICategory, idx: number) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: idx * 0.04,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="space-y-5 group/main relative z-10"
          >
            <NextLink
              href={`/products?category=${cat._id}`}
              onClick={onClose}
              className="flex items-center gap-4 group/item"
            >
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shadow-sm border border-border group-hover/item:border-primary/[0.2] transition-all duration-500 relative">
                  <Image
                    src={
                      cat.image ||
                      getCategoryFallbackImage(
                        cat.name
                      )
                    }
                    alt={cat.name}
                    width={64}
                    height={64}
                    sizes="64px"
                    className="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-bold text-foreground group-hover/item:text-primary transition-colors duration-300 leading-tight">
                  {cat.name}
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider group-hover/item:text-primary/60 transition-colors duration-300">
                  {t("collection")}
                </span>
              </div>
            </NextLink>

            {cat.subCategories &&
              cat.subCategories.length > 0 && (
                <div className="flex flex-col space-y-1 pl-1">
                  {cat.subCategories
                    .slice(0, 6)
                    .map((sub: ICategory) => (
                      <NextLink
                        key={sub._id}
                        href={`/products?category=${sub._id}`}
                        onClick={onClose}
                        className="group/sub flex items-center gap-2.5 text-[13px] font-medium text-muted-foreground hover:text-foreground transition-all duration-200 pl-2 border-l-2 border-transparent hover:border-foreground/20"
                      >
                        <span className="w-1 h-1 rounded-full bg-foreground/15 group-hover/sub:bg-foreground transition-colors duration-200" />
                        <span className="flex-1 leading-snug group-hover/sub:translate-x-0.5 transition-transform duration-200">
                          {sub.name}
                        </span>
                      </NextLink>
                    ))}

                  <NextLink
                    href={`/products?category=${cat._id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 text-[11px] font-bold text-foreground uppercase tracking-widest pt-3 hover:gap-2.5 transition-all duration-300 pl-2"
                  >
                    {t("see_all")}
                    <ArrowRight size={12} />
                  </NextLink>
                </div>
              )}
          </motion.div>
        )
      )}
    </div>
  );
}
