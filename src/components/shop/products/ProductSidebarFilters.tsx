import { Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import PriceFilter from "@/components/PriceFilter";

interface Category {
  _id: string;
  name: string;
  parentId?: string;
}

interface ProductSidebarFiltersProps {
  categories: Category[];
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  mainCategories: Category[];
  parentCategory: Category | null;
}

export default function ProductSidebarFilters({
  categories,
  categoryId,
  minPrice,
  maxPrice,
  mainCategories,
  parentCategory,
}: ProductSidebarFiltersProps) {
  return (
    <aside className="hidden lg:block w-1/4 space-y-8">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
        <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
          ফিল্টার করুন
        </h3>

        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              ক্যাটাগরি
            </h4>
            <div className="space-y-2">
              <Link
                href="/products"
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  !categoryId
                    ? "bg-green-600 text-white shadow-lg shadow-green-900/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/10"
                }`}
              >
                <span>সব প্রোডাক্ট</span>
                {!categoryId && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </Link>

              {mainCategories.map((cat: Category) => (
                <div key={cat._id} className="space-y-1">
                  <Link
                    href={`/products?category=${cat._id}`}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      categoryId === cat._id || parentCategory?._id === cat._id
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/10"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {(categoryId === cat._id || parentCategory?._id === cat._id) && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          categoryId === cat._id || parentCategory?._id === cat._id
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Subcategories */}
                  {(categoryId === cat._id || parentCategory?._id === cat._id) && (
                    <div className="ml-4 pl-4 border-l-2 border-green-100 dark:border-green-900/20 space-y-1 py-1">
                      {categories
                        .filter((sub: Category) => sub.parentId === cat._id)
                        .map((sub: Category) => (
                          <Link
                            key={sub._id}
                            href={`/products?category=${sub._id}`}
                            className={`block w-full px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              categoryId === sub._id
                                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10"
                                : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              মূল্য পরিসীমা
            </h4>
            <PriceFilter initialMin={parseInt(minPrice)} initialMax={parseInt(maxPrice)} />
          </div>

          {/* Reset Button */}
          {(categoryId || minPrice !== "0" || maxPrice !== "10000") && (
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="w-4 h-4" />
              সব ফিল্টার মুছুন
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
