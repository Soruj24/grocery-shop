"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface CategoryCardProps {
  cat: Category;
  index: number;
}

export default function CategoryCard({ cat, index }: CategoryCardProps) {
  const { t, language } = useLanguage();

  // Get localized name
  const getName = (obj: Category) =>
    language === "en" ? obj.nameEn || obj.name : obj.name;

  return (
    <div
      className={`group h-full bg-white dark:bg-[#0B1120] backdrop-blur-xl rounded-[32px] border border-gray-100 dark:border-gray-800 p-8 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-500 relative flex flex-col overflow-hidden ${
        index % 2 === 1 ? "lg:mt-12" : ""
      }`}
    >
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] -z-10 transition-all duration-700 group-hover:bg-green-500/10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] -z-10 transition-all duration-700 group-hover:bg-blue-500/10" />

      {/* Header: Image & Count */}
      <div className="flex items-start justify-between mb-8">
        <div className="w-24 h-24 relative rounded-[28px] overflow-hidden bg-gray-50 dark:bg-gray-800/50 p-2 group-hover:scale-105 transition-transform duration-500 ring-1 ring-gray-100 dark:ring-gray-700">
          <Image
            src={cat.image || getCategoryFallbackImage(cat.nameEn || cat.name)}
            alt={getName(cat)}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            className="object-cover rounded-[20px]"
          />
        </div>

        <span className="bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 text-xs font-bold px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          {(cat.subCategories?.length || 0).toLocaleString(
            language === "bn" ? "bn-BD" : "en-US",
          )}{" "}
          {t("items")}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative z-10">
        <Link
          href={`/category/${cat._id}`}
          className="block group-hover:translate-x-2 transition-transform duration-300"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {getName(cat)}
          </h2>
          <div className="h-1.5 w-12 bg-gradient-to-r from-green-500 to-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 mb-6 translate-y-2 group-hover:translate-y-0" />
        </Link>

        {/* Subcategories (Pills) */}
        <div className="mt-auto flex flex-wrap gap-2.5">
          {cat.subCategories?.slice(0, 3).map((sub: Category) => (
            <Link
              key={sub._id}
              href={`/category/${sub._id}`}
              className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
            >
              {getName(sub)}
            </Link>
          ))}
          {(cat.subCategories?.length || 0) > 3 && (
            <span className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700">
              +
              {(cat.subCategories!.length - 3).toLocaleString(
                language === "bn" ? "bn-BD" : "en-US",
              )}
            </span>
          )}
        </div>
      </div>

      {/* Hover Action Icon */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
        <div className="bg-green-600 text-white p-3 rounded-full shadow-lg shadow-green-600/30 hover:bg-green-500 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
