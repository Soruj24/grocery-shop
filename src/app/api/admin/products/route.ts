import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import Category from "@/schemas/Category";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const search = url.searchParams.get("search") || "";
    await dbConnect();
    const filter: Record<string, unknown> = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    const products = await Product.find(filter).populate("category").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const totalCount = await Product.countDocuments(filter);
    const data = JSON.parse(JSON.stringify(products));
    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    await dbConnect();
    if (body.category) {
      const cat = await Category.findById(body.category);
      if (!cat) return NextResponse.json({ message: "Category not found" }, { status: 400 });
    }
    const product = await Product.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
