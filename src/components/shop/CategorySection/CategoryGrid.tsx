import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types/category";
import { motion } from "framer-motion";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="relative">
      {/* Optional: Background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00D26A]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CategoryCard category={cat} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
