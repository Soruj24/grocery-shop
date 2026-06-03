import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import mongoose from "mongoose";
import { Category as ICategory } from "@/types/category";
import type { ProductsSearchParams, ProductsPageData } from "@/types/products-page";

export async function getProducts(
  searchParams: ProductsSearchParams,
): Promise<ProductsPageData> {
  await dbConnect();
  const search = typeof searchParams.q === "string" ? searchParams.q : "";
  const categoryId =
    typeof searchParams.category === "string" ? searchParams.category : "";
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  const filterTag =
    typeof searchParams.filter === "string" ? searchParams.filter : "";
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

  if (filterTag === "deals") {
    query.isDeal = true;
  } else if (filterTag === "popular") {
    query.isPopular = true;
  } else if (filterTag === "new") {
    query.isNewArrival = true;
  }
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
