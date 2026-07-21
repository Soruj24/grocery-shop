import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import Category from "@/schemas/Category";
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
  const rating =
    typeof searchParams.rating === "string" ? parseInt(searchParams.rating) : 0;
  const inStock = searchParams.inStock === "true";
  const discount = searchParams.discount === "true";
  const brandParam = searchParams.brand;
  const brandValue =
    typeof brandParam === "string"
      ? brandParam
      : Array.isArray(brandParam)
        ? brandParam.join(",")
        : "";
  const brands = brandValue
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);
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
  if (rating > 0) query.rating = { $gte: rating };
  if (discount) query.discountPrice = { $exists: true, $ne: null };
  if (inStock) query.stock = { $gt: 0 };
  if (brands.length) {
    const escaped = brands.map((b) => b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    query.brand = { $in: escaped.map((b) => new RegExp(b, "i")) };
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const categories = await Category.find({ isActive: true }).lean();

  const brandList = (await Product.distinct("brand", { isActive: true }))
    .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
    .sort((a, b) => a.localeCompare(b));

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
    brands: brandList,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    totalCount: totalProducts,
  };
}
