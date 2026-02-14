import Link from "next/link";
import { ListFilter, ChevronRight } from "lucide-react";
import { Category as ICategory } from "@/types/category";

interface CategorySidebarProps {
  allCategories: ICategory[];
  currentId: string;
}

export default function CategorySidebar({ allCategories, currentId }: CategorySidebarProps) {
  return (
    <aside className="lg:w-1/4 space-y-10">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none sticky top-24">
        <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-8 flex items-center">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mr-3">
            <ListFilter className="w-5 h-5 text-green-600 dark:text-green-500" />
          </div>
          ক্যাটাগরি
        </h3>
        
        <div className="space-y-3">
          {allCategories
            .filter((c: ICategory) => !c.parentId)
            .map((cat: ICategory) => {
              const isActive = cat._id.toString() === currentId || 
                             allCategories.find((c: ICategory) => c._id.toString() === currentId)?.parentId?.toString() === cat._id.toString();
              
              return (
                <div key={cat._id} className="space-y-2">
                  <Link
                    href={`/category/${cat._id}`}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all font-black text-sm group ${
                      isActive
                        ? "bg-green-600 text-white shadow-xl shadow-green-600/20"
                        : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white animate-pulse" : "bg-green-500/30 group-hover:bg-green-500"}`} />
                      <span>{cat.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90" : "group-hover:translate-x-1"}`} />
                  </Link>

                  {isActive && (
                    <div className="ml-6 pl-4 border-l-2 border-green-100 dark:border-green-900/30 space-y-1">
                      {allCategories
                        .filter((sub: ICategory) => sub.parentId && sub.parentId.toString() === cat._id.toString())
                        .map((sub: ICategory) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub._id}`}
                            className={`block p-3 text-xs font-bold transition-all rounded-xl ${
                              sub._id.toString() === currentId
                                ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 shadow-sm"
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
