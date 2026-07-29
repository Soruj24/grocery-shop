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
    const products = await Product.find({ isActive: true })
      .select("name stock price category image unit")
      .populate("category", "name")
      .sort({ stock: 1 })
      .lean();
    const data = products.map((p) => {
      const typed = p as unknown as Record<string, unknown>;
      return {
        _id: typed._id?.toString(),
        name: typed.name,
        stock: typed.stock,
        price: typed.price,
        unit: typed.unit,
        image: typed.image,
        category: (typed.category as Record<string, unknown>)?.name || "N/A",
        status: (typed.stock as number) <= 0 ? "out_of_stock" : (typed.stock as number) <= 10 ? "low_stock" : "in_stock",
      };
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
