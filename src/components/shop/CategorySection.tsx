"use client";

import { Category } from "@/types/category";
import CategorySectionHeader from "./CategorySection/CategorySectionHeader";
import CategoryGrid from "./CategorySection/CategoryGrid";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="relative py-24 bg-[#0B1120] rounded-[60px] px-6 md:px-16 overflow-hidden border border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D26A]/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -ml-64 -mb-64" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <CategorySectionHeader />
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
