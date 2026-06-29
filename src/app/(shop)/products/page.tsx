import ProductFilters from "@/features/products/components/filters/ProductFilters";
import EmptyProductState from "@/features/products/components/EmptyProductState";
import ProductSidebarFilters from "@/features/products/components/ProductSidebarFilters";
import ProductGridContent from "@/features/products/components/ProductGridContent";
import ProductStatusBar from "@/features/products/components/ProductStatusBar";
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
  const { products, categories, totalPages, currentPage, totalCount } =
    await getProducts(resolvedSearchParams);
  const search =
    typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : "";
  const categoryId =
    typeof resolvedSearchParams.category === "string"
      ? resolvedSearchParams.category
      : "";
  const minPrice =
    typeof resolvedSearchParams.minPrice === "string"
      ? resolvedSearchParams.minPrice
      : "0";
  const maxPrice =
    typeof resolvedSearchParams.maxPrice === "string"
      ? resolvedSearchParams.maxPrice
      : "10000";

  const mainCategories = (categories as unknown as ICategory[]).filter(
    (cat) => !cat.parentId,
  );
  const selectedCategory = (categories as unknown as ICategory[]).find(
    (cat) => cat._id.toString() === categoryId,
  );
  const subCategories = categoryId
    ? (categories as unknown as ICategory[]).filter(
        (cat) => cat.parentId?.toString() === categoryId,
      )
    : [];
  const parentCategory = selectedCategory?.parentId
    ? (categories as unknown as ICategory[]).find(
        (cat) => cat._id.toString() === selectedCategory.parentId?.toString(),
      )
    : null;
  const displaySubCategories = parentCategory
    ? (categories as unknown as ICategory[]).filter(
        (cat) => cat.parentId?.toString() === parentCategory._id.toString(),
      )
    : subCategories;

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-10">
      <div className="space-y-4">
        <ProductFilters categories={categories} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProductSidebarFilters
          categories={categories}
          categoryId={categoryId}
          minPrice={minPrice}
          maxPrice={maxPrice}
          mainCategories={mainCategories}
          parentCategory={parentCategory}
        />

        <main className="lg:w-3/4 space-y-8">
          <ProductStatusBar totalCount={totalCount} search={search} />

          {products.length === 0 ? (
            <EmptyProductState />
          ) : (
            <ProductGridContent
              products={products}
              totalPages={totalPages}
              currentPage={currentPage}
              totalCount={totalCount}
            />
          )}
        </main>
      </div>
    </div>
  );
}
