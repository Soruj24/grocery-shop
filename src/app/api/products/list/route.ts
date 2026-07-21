import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import { rateLimit } from "@/utils/rate-limit";

export async function GET(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip);

    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "newest";
    const limit = parseInt(searchParams.get("limit") || "8");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag"); // deals | popular | new
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");
    const discount = searchParams.get("discount");
    const brand = searchParams.get("brand");
    const inStock = searchParams.get("inStock");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = Math.min(Math.max(limit, 1), 60);

    await dbConnect();

    const filter: Record<string, unknown> = { isActive: true };
    if (category && category !== "all") {
      filter.category = category;
    }
    if (tag === "deals") filter.isDeal = true;
    if (tag === "popular") filter.isPopular = true;
    if (tag === "new") filter.isNewArrival = true;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) (filter.price as Record<string, number>).$gte = parseInt(minPrice);
      if (maxPrice) (filter.price as Record<string, number>).$lte = parseInt(maxPrice);
    }
    if (rating) filter.rating = { $gte: parseInt(rating) };
    if (discount === "true") filter.discountPrice = { $exists: true, $ne: null };
    if (inStock === "true") filter.stock = { $gt: 0 };
    if (brand) {
      const brands = brand
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);
      if (brands.length) {
        const escaped = brands.map((b) =>
          b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        );
        filter.brand = { $in: escaped.map((b) => new RegExp(b, "i")) };
      }
    }

    let sortOption: Record<string, number> = { createdAt: -1 };
    switch (sort) {
      case "rating":
        sortOption = { rating: -1, reviews: -1 };
        break;
      case "reviews":
        sortOption = { reviews: -1, rating: -1 };
        break;
      case "price_low":
        sortOption = { price: 1 };
        break;
      case "price_high":
        sortOption = { price: -1 };
        break;
      case "oldest":
        sortOption = { createdAt: 1 };
        break;
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const totalCount = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sortOption as Record<string, 1 | -1>)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .select(
        "name image price discountPrice stock unit _id rating reviews description category",
      )
      .lean();

    return NextResponse.json({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (error) {
    console.error("Products List API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
