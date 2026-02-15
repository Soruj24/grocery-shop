import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const { categoryIds } = await req.json();
    await dbConnect();

    // Get products from same categories but not in recently viewed
    // For a real AI, we would use a more complex algorithm or a service
    const products = await Product.find({
      category: { $in: categoryIds },
      isActive: true,
    })
      .limit(5)
      .populate("category")
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fallback = searchParams.get("fallback");

    if (fallback) {
      await dbConnect();
      const products = await Product.find({ isActive: true })
        .sort({ rating: -1, createdAt: -1 })
        .limit(5)
        .populate("category")
        .lean();
      return NextResponse.json(products);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}
