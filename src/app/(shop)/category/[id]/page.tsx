import mongoose from "mongoose";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import CategoryModel from "@/schemas/Category";

import CategoryHeader from "@/features/categories/components/details/CategoryHeader";
import SubCategoryNav from "@/features/categories/components/details/SubCategoryNav";
import CategorySidebar from "@/features/categories/components/details/CategorySidebar";
import CategoryProductGrid from "@/features/categories/components/details/CategoryProductGrid";
import { Category as ICategory } from "@/types/category";
import CategoryNotFound from "@/features/categories/components/details/CategoryNotFound";

export const dynamic = "force-dynamic";

async function findCategory(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return CategoryModel.findById(id).lean();
  }
  return CategoryModel.findOne({
    name: {
      $regex: new RegExp(`^${escapeRegex(id)}$`, "i"),
    },
  }).lean();
}

function escapeRegex(str: string) {
  return str.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

async function getCategoryData(
  id: string,
  searchParams: {
    [key: string]: string | string[] | undefined;
  }
) {
  await dbConnect();
  const page =
    typeof searchParams.page === "string"
      ? parseInt(searchParams.page)
      : 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const category = await findCategory(id);
  if (!category)
    return {
      category: null,
      products: [],
      totalPages: 0,
      currentPage: 1,
      allCategories: [],
    };

  const categoryId = (
    category as unknown as ICategory
  )._id.toString();

  // Fetch all active categories for the sidebar
  const allCategories = await CategoryModel.find({
    isActive: true,
  }).lean();

  const subCategoryIds = (
    allCategories as unknown as ICategory[]
  )
    .filter(
      (c: ICategory) =>
        c.parentId &&
        c.parentId.toString() === categoryId
    )
    .map((c: ICategory) => c._id);

  const query: Record<string, any> = {
    category: {
      $in: [categoryId, ...subCategoryIds],
    },
    isActive: true,
  };

  // Apply filters from searchParams
  const brand = searchParams.brand;
  if (typeof brand === "string" && brand) {
    query.brand = brand;
  }

  const priceMin = searchParams.priceMin;
  const priceMax = searchParams.priceMax;
  if (typeof priceMin === "string" || typeof priceMax === "string") {
    query.price = {};
    if (typeof priceMin === "string" && priceMin)
      query.price.$gte = parseFloat(priceMin);
    if (typeof priceMax === "string" && priceMax)
      query.price.$lte = parseFloat(priceMax);
  }

  const inStock = searchParams.inStock;
  if (inStock === "true") {
    query.stock = { $gt: 0 };
  }

  // Sort
  const sort = searchParams.sort || "newest";
  let sortQuery: Record<string, 1 | -1> = {
    createdAt: -1,
  };
  if (sort === "price_low")
    sortQuery = { price: 1 };
  else if (sort === "price_high")
    sortQuery = { price: -1 };
  else if (sort === "rating")
    sortQuery = { rating: -1 };

  const totalProducts = await Product.countDocuments(
    query
  );
  const products = await Product.find(query)
    .populate("category")
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .lean();

  // Extract unique brands and colors from all products in this category
  const allCategoryProducts = await Product.find({
    category: {
      $in: [categoryId, ...subCategoryIds],
    },
    isActive: true,
  })
    .select("brand")
    .lean();

  const uniqueBrands = [
    ...new Set(
      allCategoryProducts
        .map((p: any) => p.brand)
        .filter(
          (b: any) =>
            b && typeof b === "string" && b.trim()
        )
    ),
  ].sort() as string[];

  // Price range
  const priceStats = await Product.aggregate([
    {
      $match: {
        category: {
          $in: subCategoryIds.length > 0
            ? [
                new mongoose.Types.ObjectId(
                  categoryId
                ),
                ...subCategoryIds.map(
                  (id) =>
                    new mongoose.Types.ObjectId(
                      id.toString()
                    )
                ),
              ]
            : [
                new mongoose.Types.ObjectId(
                  categoryId
                ),
              ],
        },
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
  ]);

  const minPrice =
    priceStats.length > 0
      ? priceStats[0].minPrice
      : 0;
  const maxPrice =
    priceStats.length > 0
      ? priceStats[0].maxPrice
      : 10000;

  return {
    category: JSON.parse(
      JSON.stringify(category)
    ),
    products: JSON.parse(
      JSON.stringify(products)
    ),
    totalPages: Math.ceil(
      totalProducts / limit
    ),
    currentPage: page,
    allCategories: JSON.parse(
      JSON.stringify(allCategories)
    ),
    totalCount: totalProducts,
    brands: uniqueBrands,
    minPrice,
    maxPrice,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
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
    brands,
    minPrice,
    maxPrice,
  } = await getCategoryData(id, resolvedSearchParams);

  if (!category) {
    return <CategoryNotFound />;
  }

  const subCategories = (
    allCategories as unknown as ICategory[]
  ).filter(
    (c: ICategory) =>
      c.parentId &&
      c.parentId.toString() ===
        (
          category.parentId || category._id
        ).toString()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 pb-24">
      <CategoryHeader
        category={category}
        totalCount={totalCount as number}
      />

      <SubCategoryNav
        subCategories={subCategories}
        currentId={id}
      />

      <div className="flex gap-8 items-start">
        <CategorySidebar
          allCategories={allCategories}
          currentId={id}
          brands={brands || []}
          colors={[]}
          minPrice={minPrice || 0}
          maxPrice={maxPrice || 10000}
        />

        <CategoryProductGrid
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
