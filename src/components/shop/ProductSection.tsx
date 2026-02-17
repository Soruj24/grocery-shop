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
    <section id="products" className="py-8 px-4 bg-white dark:bg-gray-900 rounded-[32px]">
      <div className="max-w-7xl mx-auto">
        <ProductSectionHeader />
        <ProductGrid products={products} />

        <div className="mt-12 flex justify-center">
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
