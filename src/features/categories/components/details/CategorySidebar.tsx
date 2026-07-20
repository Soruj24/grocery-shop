"use client";

import Link from "next/link";
import { ListFilter, ChevronRight } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategorySidebarProps {
  allCategories: ICategory[];
  currentId: string;
}

export default function CategorySidebar({ allCategories, currentId }: CategorySidebarProps) {
  const { t } = useLanguage();
  return (
    <aside className="lg:w-1/4 space-y-8">
      <div className="bg-card backdrop-blur-xl p-6 rounded-2xl border border-border shadow-xl sticky top-24">
        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-8 h-8 bg-primary-subtle rounded-xl flex items-center justify-center">
            <ListFilter className="w-4 h-4 text-primary" />
          </div>
          {t('categories')}
        </h3>
        
        <div className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          {allCategories
            .filter((c: ICategory) => !c.parentId)
            .map((cat: ICategory) => {
              const isActive = cat._id.toString() === currentId || 
                             allCategories.find((c: ICategory) => c._id.toString() === currentId)?.parentId?.toString() === cat._id.toString();
              
              return (
                <div key={cat._id} className="space-y-1">
                  <Link
                    href={`/category/${cat._id}`}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-sm group ${
                      isActive
                        ? "bg-primary-subtle text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-border-strong group-hover:bg-primary"}`} />
                      <span>{cat.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </Link>

                  {isActive && (
                    <div className="ml-5 pl-4 border-l border-primary/30 space-y-0.5 py-1">
                      {allCategories
                        .filter((sub: ICategory) => sub.parentId && sub.parentId.toString() === cat._id.toString())
                        .map((sub: ICategory) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub._id}`}
                            className={`block px-3 py-2 text-xs font-medium transition-all rounded-lg ${
                              sub._id.toString() === currentId
                                ? "text-primary bg-primary-subtle"
                                : "text-muted-foreground hover:text-primary hover:bg-muted"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </aside>
  );
}
