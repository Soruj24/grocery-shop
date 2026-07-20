"use client";

import { ChevronDown } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryTreeProps {
  categories: Category[];
  mainCategories: Category[];
  selectedCategory: string;
  parentCategory: Category | null | undefined;
  onSelect: (id: string) => void;
}

export default function CategoryTree({ categories, mainCategories, selectedCategory, parentCategory, onSelect }: CategoryTreeProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-2">
      <button onClick={() => onSelect("")}
        className={`w-full text-left px-5 py-3 rounded-2xl font-bold text-sm transition-all ${selectedCategory === "" ? "bg-primary text-white shadow-lg shadow-primary" : "text-muted-foreground hover:bg-primary-subtle"}`}>
        {t("all_categories")}
      </button>
      {mainCategories.map((cat) => (
        <div key={cat._id} className="space-y-1">
          <button onClick={() => onSelect(cat._id)}
            className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl font-bold text-sm transition-all ${selectedCategory === cat._id || parentCategory?._id === cat._id ? "bg-primary-subtle text-primary" : "text-muted-foreground hover:bg-primary-subtle"}`}>
            {cat.name}
            {(selectedCategory === cat._id || parentCategory?._id === cat._id) && <ChevronDown className="w-4 h-4 rotate-180" />}
          </button>
          {(selectedCategory === cat._id || parentCategory?._id === cat._id) && (
            <div className="ml-6 space-y-1 border-l-2 border-primary/30 pl-4 py-1">
              {categories.filter(sub => sub.parentId === cat._id).map(sub => (
                <button key={sub._id} onClick={() => onSelect(sub._id)}
                  className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === sub._id ? "text-primary bg-primary-subtle" : "text-muted-foreground"}`}>
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
