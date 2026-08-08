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
    const sort = url.searchParams.get("sort") || "createdAt";
    const sortDir = url.searchParams.get("sortDir") === "asc" ? 1 : -1;
    const status = url.searchParams.get("status"); // "active" | "inactive"
    const stockStatus = url.searchParams.get("stockStatus"); // "in_stock" | "low_stock" | "out_of_stock"
    const category = url.searchParams.get("category");

    await dbConnect();
    const filter: Record<string, unknown> = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (status === "active") filter.isActive = true;
    else if (status === "inactive") filter.isActive = false;
    if (category) filter.category = category;
    if (stockStatus === "out_of_stock") filter.stock = 0;
    else if (stockStatus === "low_stock") filter.stock = { $gt: 0, $lte: 10 };
    else if (stockStatus === "in_stock") filter.stock = { $gt: 10 };

    const sortObj: Record<string, 1 | -1> = {};
    if (sort === "price" || sort === "stock" || sort === "name" || sort === "createdAt") {
      sortObj[sort] = sortDir;
    } else {
      sortObj.createdAt = -1;
    }

    const products = await Product.find(filter).populate("category").sort(sortObj).skip((page - 1) * limit).limit(limit).lean();
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

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { action, ids, data } = body as { action: string; ids: string[]; data?: Record<string, unknown> };
    if (!action || !ids?.length) {
      return NextResponse.json({ message: "Missing action or ids" }, { status: 400 });
    }
    await dbConnect();
    if (action === "bulkDelete") {
      await Product.deleteMany({ _id: { $in: ids } });
      return NextResponse.json({ message: "Deleted", deleted: ids.length });
    }
    if (action === "bulkUpdate" && data) {
      await Product.updateMany({ _id: { $in: ids } }, { $set: data });
      return NextResponse.json({ message: "Updated", updated: ids.length });
    }
    return NextResponse.json({ message: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
