import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const product = await Product.findById(id).select("reviewItems rating reviews").lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({
      items: product.reviewItems || [],
      rating: product.rating || 0,
      count: product.reviews || 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, rating, comment } = body as { name: string; rating: number; comment: string };

    if (!name || !comment || typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    product.reviewItems = product.reviewItems || [];
    product.reviewItems.push({ name, rating, comment });
    const newCount = (product.reviews || 0) + 1;
    const totalRating = (product.rating || 0) * (product.reviews || 0) + rating;
    product.reviews = newCount;
    product.rating = parseFloat((totalRating / newCount).toFixed(1));

    await product.save();

    return NextResponse.json({
      success: true,
      item: { name, rating, comment, createdAt: new Date().toISOString() },
      rating: product.rating,
      count: product.reviews,
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
