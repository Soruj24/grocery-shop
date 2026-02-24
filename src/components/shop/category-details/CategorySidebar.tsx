"use client";

import Link from "next/link";
import { ListFilter, ChevronRight } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";

interface CategorySidebarProps {
  allCategories: ICategory[];
  currentId: string;
}

export default function CategorySidebar({ allCategories, currentId }: CategorySidebarProps) {
  const { t } = useLanguage();
  return (
    <aside className="lg:w-1/4 space-y-8">
      <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none sticky top-24">
        <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
            <ListFilter className="w-4 h-4 text-green-600 dark:text-green-500" />
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
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-300 group-hover:bg-green-400"}`} />
                      <span>{cat.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </Link>

                  {isActive && (
                    <div className="ml-5 pl-4 border-l border-green-200 dark:border-green-900/30 space-y-0.5 py-1">
                      {allCategories
                        .filter((sub: ICategory) => sub.parentId && sub.parentId.toString() === cat._id.toString())
                        .map((sub: ICategory) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub._id}`}
                            className={`block px-3 py-2 text-xs font-medium transition-all rounded-lg ${
                              sub._id.toString() === currentId
                                ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30"
                                : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-800"
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
