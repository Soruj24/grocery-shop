"use client";

import Link from "next/image";
import NextLink from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CategoryMegaMenuProps {
  categories: any[];
  onClose: () => void;
}

export default function CategoryMegaMenu({ categories, onClose }: CategoryMegaMenuProps) {
  // Static categories as requested by user if not provided via props
  const staticCategories = [
    { _id: 'fruits', name: 'Fruits', nameEn: 'Fresh Fruits', subCategories: [] },
    { _id: 'vegetables', name: 'Vegetables', nameEn: 'Organic Veggies', subCategories: [] },
    { _id: 'fish', name: 'Fish', nameEn: 'Fresh Water Fish', subCategories: [] },
    { _id: 'meat', name: 'Meat', nameEn: 'Halal Meat', subCategories: [] },
    { _id: 'dairy', name: 'Dairy', nameEn: 'Milk & Eggs', subCategories: [] },
    { _id: 'frozen', name: 'Frozen', nameEn: 'Frozen Foods', subCategories: [] },
    { _id: 'bakery', name: 'Bakery', nameEn: 'Bread & Cakes', subCategories: [] },
    { _id: 'beauty', name: 'Beauty', nameEn: 'Personal Care', subCategories: [] },
    { _id: 'baby-care', name: 'Baby Care', nameEn: 'Baby Products', subCategories: [] },
    { _id: 'cleaning', name: 'Cleaning', nameEn: 'Home Cleaning', subCategories: [] },
  ];

  const displayCategories = categories.length > 0 ? categories : staticCategories;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-0 left-0 w-[1100px] bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-black/90 border border-gray-100 dark:border-white/5 rounded-b-[40px] rounded-tr-[40px] p-12 z-50 grid grid-cols-4 gap-x-8 gap-y-12 max-h-[85vh] overflow-y-auto custom-scrollbar"
    >
      {displayCategories.map((cat: any, idx: number) => (
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
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={72}
                    height={72}
                    className="w-full h-full object-cover transform group-hover/item:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-600 dark:text-green-500 font-black bg-green-50 dark:bg-green-900/20 text-2xl">
                    {cat.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-black text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors leading-tight">
                {cat.name}
              </span>
              <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {cat.nameEn || "Collection"}
              </span>
            </div>
          </NextLink>

          {/* Sub Categories List */}
          {cat.subCategories && cat.subCategories.length > 0 && (
            <div className="flex flex-col space-y-2.5 pl-1">
              {cat.subCategories.slice(0, 6).map((sub: any) => (
                <NextLink
                  key={sub._id}
                  href={`/products?category=${sub._id}`}
                  onClick={onClose}
                  className="group/sub flex items-center gap-3 text-[14px] font-bold text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                >
                  <ChevronRight size={14} className="text-gray-300 dark:text-gray-700 group-hover/sub:text-green-500 group-hover/sub:translate-x-1 transition-all" />
                  <span className="flex-1 leading-snug">
                    {sub.name}
                  </span>
                </NextLink>
              ))}

              <NextLink
                href={`/products?category=${cat._id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest pt-4 hover:gap-3 transition-all"
              >
                সবগুলো দেখুন
                <ArrowRight size={14} />
              </NextLink>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
