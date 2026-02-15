import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import mongoose from "mongoose";
import ProductFilters from "@/components/ProductFilters";
import EmptyProductState from "@/components/shop/products/EmptyProductState";
import ProductSidebarFilters from "@/components/shop/products/ProductSidebarFilters";
import ProductGridContent from "@/components/shop/products/ProductGridContent";
import ProductStatusBar from "@/components/shop/products/ProductStatusBar";
import { Category as ICategory } from "@/types/category";

export const dynamic = "force-dynamic";

async function getProducts(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  await dbConnect();
  const search = typeof searchParams.q === "string" ? searchParams.q : "";
  const categoryId =
    typeof searchParams.category === "string" ? searchParams.category : "";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const minPrice =
    typeof searchParams.minPrice === "string"
      ? parseInt(searchParams.minPrice)
      : 0;
  const maxPrice =
    typeof searchParams.maxPrice === "string"
      ? parseInt(searchParams.maxPrice)
      : 10000;
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const query: Record<string, unknown> = {
    isActive: true,
    price: { $gte: minPrice, $lte: maxPrice },
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const categories = await Category.find({ isActive: true }).lean();

  let actualCategoryId = categoryId;
  if (categoryId && categoryId !== "all") {
    const foundCategory = (categories as ICategory[]).find(
      (c: ICategory) =>
        c._id.toString() === categoryId ||
        c.name.toLowerCase() === categoryId.toLowerCase(),
    );
    if (foundCategory) {
      actualCategoryId = foundCategory._id.toString();
    }
  }

  if (
    actualCategoryId &&
    actualCategoryId !== "all" &&
    mongoose.Types.ObjectId.isValid(actualCategoryId)
  ) {
    const subCategoryIds = (categories as ICategory[])
      .filter(
        (c: ICategory) =>
          c.parentId && c.parentId.toString() === actualCategoryId,
      )
      .map((c: ICategory) => c._id);

    query.category = { $in: [actualCategoryId, ...subCategoryIds] };
  }

  let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
  if (sort === "price_low") sortQuery = { price: 1 };
  if (sort === "price_high") sortQuery = { price: -1 };
  if (sort === "oldest") sortQuery = { createdAt: 1 };

  const totalProducts = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("category")
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    products: JSON.parse(JSON.stringify(products)),
    categories: JSON.parse(JSON.stringify(categories)),
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    totalCount: totalProducts,
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

  // If the selected category is a subcategory, find its parent's siblings and its own siblings
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
      {/* Header Section */}
      <div className="space-y-4">
        <ProductFilters categories={categories} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <ProductSidebarFilters
          categories={categories}
          categoryId={categoryId}
          minPrice={minPrice}
          maxPrice={maxPrice}
          mainCategories={mainCategories}
          parentCategory={parentCategory}
        />

        {/* Product Grid */}
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
