import Link from "next/link";
import { LayoutGrid, ChevronDown } from "lucide-react";
import CategoryMegaMenu from "./CategoryMegaMenu";

interface DesktopNavProps {
  categories: any[];
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: (open: boolean) => void;
}

export default function DesktopNav({
  categories,
  isCategoryMenuOpen,
  setIsCategoryMenuOpen,
}: DesktopNavProps) {
  return (
    <div className="hidden lg:block border-t border-gray-50 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-8">
        {/* Mega Menu Toggle */}
        <div className="relative group">
          <Link
            href="/categories"
            onMouseEnter={() => setIsCategoryMenuOpen(true)}
            className="flex items-center gap-2 py-3 px-4 bg-green-600 text-white font-black text-sm rounded-t-xl"
          >
            <LayoutGrid className="w-4 h-4" />
            সব ক্যাটাগরি
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isCategoryMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Link>

          {/* Category Dropdown/Mega Menu */}
          {isCategoryMenuOpen && (
            <CategoryMegaMenu
              categories={categories}
              onClose={() => setIsCategoryMenuOpen(false)}
            />
          )}
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          <Link
            href="/categories"
            className="px-4 py-3 text-sm font-black text-green-700 dark:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all whitespace-nowrap flex items-center gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            সব ক্যাটাগরি
          </Link>
          {categories.slice(0, 5).map((cat: any) => (
            <Link
              key={cat._id}
              href={`/category/${cat._id}`}
              className="px-4 py-3 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all whitespace-nowrap"
            >
              {cat.name.split(" ")[0]}
            </Link>
          ))}
          <Link
            href="/products"
            className="px-4 py-3 text-sm font-black text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all whitespace-nowrap"
          >
            সব অফার
          </Link>
        </nav>
      </div>
    </div>
  );
}
