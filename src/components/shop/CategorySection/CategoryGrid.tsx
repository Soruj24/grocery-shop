"use client";

import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types/category";
import { motion } from "framer-motion";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full -z-10 mix-blend-multiply dark:mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10 mix-blend-multiply dark:mix-blend-screen" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="h-full"
          >
            <CategoryCard cat={cat} index={index} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
