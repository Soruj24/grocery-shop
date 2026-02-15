import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category._id}`}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-all border border-transparent hover:border-green-500/20"
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-gray-700 flex-shrink-0 border border-gray-100 dark:border-gray-600">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-green-600">
              <LayoutGrid className="w-8 h-8" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
            {category.name}
          </h3>
          <p className="text-[10px] text-gray-500 font-medium">
            {category.subCategories?.length || 0}টি আইটেম
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </motion.div>
    </Link>
  );
}
