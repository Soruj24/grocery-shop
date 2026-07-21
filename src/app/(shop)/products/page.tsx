import ProductListing from "@/features/products/components/listing/ProductListing";
import { getProducts } from "@/services/products-data";
import type { ProductsSearchParams } from "@/types/products-page";
import { Category as ICategory } from "@/types/category";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductsSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const { products, categories, brands, totalPages, totalCount } =
    await getProducts(resolvedSearchParams);

  const mainCategories = (categories as unknown as ICategory[]).filter(
    (cat) => !cat.parentId,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 pb-28 pt-6">
      <ProductListing
        initialProducts={products}
        categories={categories}
        brands={brands}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </div>
  );
}
