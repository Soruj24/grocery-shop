

import { Category } from "@/types/category";
import CategorySectionHeader from "@/features/categories/components/section/CategorySectionHeader";
import CategoryGrid from "@/features/categories/components/section/CategoryGrid";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 lg:py-24 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <CategorySectionHeader />
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
