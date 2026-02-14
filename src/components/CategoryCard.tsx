import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Limited sub-categories for display
  const displaySubCategories = category.subCategories?.slice(0, 4) || [];
  const remainingCount =
    (category.subCategories?.length || 0) - displaySubCategories.length;

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative h-full"
    >
      {/* Decorative background glow on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#00D26A]/20 to-emerald-500/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative flex flex-col bg-white dark:bg-[#0F172A] rounded-[32px] border border-gray-100 dark:border-white/5 p-6 h-full transition-all duration-500 hover:border-[#00D26A]/30 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-green-500/10">
        {/* Category Image & Action */}
        <div className="flex justify-between items-start mb-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-[#00D26A]/10 rounded-3xl blur-md group-hover:blur-lg transition-all" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-[#1E293B] flex items-center justify-center">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <LayoutGrid className="w-10 h-10 text-gray-200 dark:text-white/10" />
              )}
            </div>
          </div>

          <Link
            href={`/category/${category._id}`}
            className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white/40 hover:bg-[#00D26A] hover:text-black hover:border-transparent transition-all duration-300"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Info Section */}
        <div className="mb-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-[#00D26A] transition-colors line-clamp-1 mb-1">
            {category.name}
          </h3>
          <p className="text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-wider">
            {category.subCategories?.length || 0}টি আইটেম
          </p>
        </div>

        {/* Sub-categories - Quick Links */}
        <div className="grid grid-cols-2 gap-2 mb-8 flex-1">
          {displaySubCategories.map((sub: Category, idx: number) => (
            <Link
              key={sub._id || idx}
              href={`/category/${sub._id}`}
              className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-[11px] font-bold text-gray-500 dark:text-white/50 hover:bg-[#00D26A]/10 hover:text-[#00D26A] hover:border-[#00D26A]/20 transition-all text-center truncate"
            >
              {sub.name}
            </Link>
          ))}
          {remainingCount > 0 && (
            <div className="px-3 py-2 rounded-xl bg-gray-50/50 dark:bg-white/[0.02] border border-dashed border-gray-200 dark:border-white/10 text-[11px] font-bold text-gray-400 dark:text-white/30 text-center">
              +{remainingCount} আরো
            </div>
          )}
        </div>

        {/* View All Button */}
        <Link
          href={`/category/${category._id}`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gray-900 dark:bg-white/5 border border-transparent dark:border-white/10 text-sm font-black text-white dark:text-white hover:bg-[#00D26A] hover:text-black dark:hover:bg-white dark:hover:text-black transition-all group/btn shadow-lg dark:shadow-none"
        >
          সবগুলো দেখুন
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
