import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const products = await Product.find({ "reviewItems.0": { $exists: true } })
      .select("name reviewItems")
      .lean();
    const data = products.flatMap((p) =>
      (p.reviewItems || []).map((r: Record<string, unknown>) => ({
        id: r._id?.toString() || Math.random().toString(36),
        customer: r.name,
        product: p.name,
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt,
        status: r.status || "pending",
        productId: p._id.toString(),
      }))
    );
    data.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
