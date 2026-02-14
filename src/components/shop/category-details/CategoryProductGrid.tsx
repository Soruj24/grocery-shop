"use client";

import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { LayoutGrid, ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";

interface CategoryProductGridProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export default function CategoryProductGrid({
  products,
  totalPages,
  currentPage,
}: CategoryProductGridProps) {
  const params = useParams();
  const id = params.id as string;

  return (
    <main className="lg:w-3/4 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white dark:bg-gray-900 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest opacity-60">
              ফলাফল
            </p>
            <p className="text-lg font-black text-gray-800 dark:text-gray-100">
              {products.length} টি প্রোডাক্ট
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            সর্টিং:
          </span>
          <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-3 text-sm font-black text-gray-700 dark:text-gray-300 focus:ring-4 focus:ring-green-500/10 cursor-pointer transition-all">
            <option>লেটেস্ট</option>
            <option>দাম (কম থেকে বেশি)</option>
            <option>দাম (বেশি থেকে কম)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-[50px] p-20 text-center border-2 border-dashed border-gray-100 dark:border-gray-800">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-[32px] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2">
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-gray-400 dark:text-gray-500 font-bold max-w-xs mx-auto">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই। অন্য কোনো ক্যাটাগরি ট্রাই করুন।
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-10 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/category/${id}`}
            totalCount={products.length} // Note: This might need to be totalCount from parent
            itemsPerPage={12}
          />
        </div>
      )}
    </main>
  );
}
