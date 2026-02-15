"use client";

import { Category } from "@/types/category";
import CategorySectionHeader from "./CategorySection/CategorySectionHeader";
import CategoryGrid from "./CategorySection/CategoryGrid";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 rounded-[32px] my-8">
      <div className="max-w-7xl mx-auto">
        <CategorySectionHeader />
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
