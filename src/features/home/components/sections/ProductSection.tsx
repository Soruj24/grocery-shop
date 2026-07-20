import Pagination from "@/components/ui/Pagination";
import { Product } from "@/types/product";
import ProductSectionHeader from "@/features/products/components/section/ProductSectionHeader";
import ProductGrid from "@/features/products/components/section/ProductGrid";

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
    <section
      id="products"
      className="py-12 lg:py-16 px-4 bg-card rounded-2xl shadow-sm border border-border scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        <ProductSectionHeader />
        <ProductGrid products={products} />

        <div className="mt-16 flex justify-center">
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
