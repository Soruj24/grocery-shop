import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import CategoryModel from "@/models/Category";

import CategoryHeader from "@/components/shop/category-details/CategoryHeader";
import SubCategoryNav from "@/components/shop/category-details/SubCategoryNav";
import CategorySidebar from "@/components/shop/category-details/CategorySidebar";
import CategoryProductGrid from "@/components/shop/category-details/CategoryProductGrid";
import { Category as ICategory } from "@/types/category";
import CategoryNotFound from "@/components/shop/category-details/CategoryNotFound";

async function getCategoryData(
  id: string,
  searchParams: { [key: string]: string | string[] | undefined },
) {
  await dbConnect();
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const category = await CategoryModel.findById(id).lean();
  if (!category)
    return {
      category: null,
      products: [],
      totalPages: 0,
      currentPage: 1,
      allCategories: [],
    };

  // Fetch all active categories for the sidebar
  const allCategories = await CategoryModel.find({ isActive: true }).lean();

  // Find all sub-categories if this is a parent category
  const subCategoryIds = (allCategories as unknown as ICategory[])
    .filter((c: ICategory) => c.parentId && c.parentId.toString() === id)
    .map((c: ICategory) => c._id);

  const query = {
    category: { $in: [id, ...subCategoryIds] },
    isActive: true,
  };

  const totalProducts = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate("category")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    category: JSON.parse(JSON.stringify(category)),
    products: JSON.parse(JSON.stringify(products)),
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    allCategories: JSON.parse(JSON.stringify(allCategories)),
    totalCount: totalProducts,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const {
    category,
    products,
    totalPages,
    currentPage,
    allCategories,
    totalCount,
  } = await getCategoryData(id, resolvedSearchParams);

  if (!category) {
    return <CategoryNotFound />;
  }

  const subCategories = (allCategories as unknown as ICategory[]).filter(
    (c: ICategory) =>
      c.parentId &&
      c.parentId.toString() === (category.parentId || category._id).toString(),
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-24 relative">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-green-100/30 dark:bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />

      <CategoryHeader category={category} totalCount={totalCount as number} />

      <SubCategoryNav subCategories={subCategories} currentId={id} />

      <div className="flex flex-col lg:flex-row gap-12">
        <CategorySidebar allCategories={allCategories} currentId={id} />

        <CategoryProductGrid
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
