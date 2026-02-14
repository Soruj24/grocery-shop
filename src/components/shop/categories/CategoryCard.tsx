import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import Image from "next/image";

interface CategoryCardProps {
  cat: ICategory;
  index: number;
}

export default function CategoryCard({ cat, index }: CategoryCardProps) {
  return (
    <div
      className={`group bg-white dark:bg-gray-900 rounded-[50px] border border-gray-100 dark:border-gray-800 p-10 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-700 relative flex flex-col h-full ${
        index % 3 === 1 ? "lg:translate-y-12" : ""
      }`}
    >
      {/* Category Image & Action */}
      <div className="relative mb-10">
        <div className="w-32 h-32 rounded-[40px] overflow-hidden ring-8 ring-gray-50 dark:ring-gray-800 group-hover:ring-green-100 dark:group-hover:ring-green-900/30 transition-all duration-700 shadow-xl">
          <Image
            src={cat.image || `https://picsum.photos/seed/${cat._id}/400/400`}
            alt={cat.name}
            className="w-full h-full object-cover transform group-hover:scale-125 transition-transform duration-1000"
          />
        </div>
        <Link
          href={`/category/${cat._id}`}
          className="absolute top-0 right-0 bg-green-600 text-white p-5 rounded-[30px] shadow-xl shadow-green-600/30 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500"
        >
          <ArrowRight className="w-6 h-6" />
        </Link>
      </div>

      {/* Category Info */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-3xl font-black text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors mb-2">
            {cat.name}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 font-bold text-sm">
            {cat.subCategories?.length || 0}টি সাব-ক্যাটাগরি
          </p>
        </div>

        {/* Subcategories Bento Style */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {cat.subCategories?.slice(0, 5).map((sub: ICategory) => (
              <Link
                key={sub._id}
                href={`/category/${sub._id}`}
                className="px-4 py-2.5 rounded-2xl text-sm font-black bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-green-600 hover:text-white transition-all border border-transparent hover:shadow-lg hover:shadow-green-600/20"
              >
                {sub.name}
              </Link>
            ))}
            {cat.subCategories?.length && cat.subCategories.length > 5 && (
              <Link
                href={`/category/${cat._id}`}
                className="px-4 py-2.5 rounded-2xl text-sm font-black bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-500 hover:bg-green-600 hover:text-white transition-all"
              >
                +{cat.subCategories.length - 5} আরো
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-10 pt-8 border-t border-gray-50 dark:border-gray-800">
        <Link
          href={`/category/${cat._id}`}
          className="flex items-center justify-between group/btn"
        >
          <span className="text-lg font-black text-gray-800 dark:text-gray-100 group-hover/btn:text-green-600 dark:group-hover/btn:text-green-400 transition-colors">
            সব পণ্য দেখুন
          </span>
          <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover/btn:bg-green-600 group-hover/btn:text-white transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
