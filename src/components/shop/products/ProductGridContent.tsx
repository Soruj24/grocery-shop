import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

interface ProductGridContentProps {
  products: any[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function ProductGridContent({
  products,
  totalPages,
  currentPage,
  totalCount,
}: ProductGridContentProps) {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath="/products"
        totalCount={totalCount}
        itemsPerPage={12}
      />
    </div>
  );
}
