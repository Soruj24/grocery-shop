"use client";

import Pagination from "@/components/Pagination";
import { Product } from "@/types/product";
import ProductSectionHeader from "./ProductSection/ProductSectionHeader";
import ProductGrid from "./ProductSection/ProductGrid";

interface ProductSectionProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function ProductSection({
  products,
  totalPages,
  currentPage,
  totalCount,
}: ProductSectionProps) {
  return (
    <section id="products" className="relative py-20">
      <ProductSectionHeader />
      
      <ProductGrid products={products} />

      <div className="mt-24 flex justify-center">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100 dark:border-gray-800">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/"
            totalCount={totalCount}
            itemsPerPage={12}
          />
        </div>
      </div>
    </section>
  );
}
