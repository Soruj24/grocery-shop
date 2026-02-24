import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip);
    
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "newest";
    const limit = parseInt(searchParams.get("limit") || "8");
    const category = searchParams.get("category");

    await dbConnect();

    const filter: Record<string, unknown> = { isActive: true };
    if (category && category !== "all") {
      filter.category = category;
    }

    let sortOption: any = { createdAt: -1 };
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
      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(limit)
      .select("name image price discountPrice stock unit _id rating reviews description")
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products List API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
