"use client";

import { Category } from "@/types/category";
import CategorySectionHeader from "./CategorySection/CategorySectionHeader";
import CategoryGrid from "./CategorySection/CategoryGrid";

interface CategorySectionProps {
  categories: Category[];
}

export default function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <CategorySectionHeader />
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
