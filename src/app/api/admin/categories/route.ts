import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    const pagination = searchParams.get("pagination") === "true";

    if (pagination) {
      const categories = await Category.find({})
        .populate("parentId", "name")
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Category.countDocuments({});

      return NextResponse.json({
        categories,
        total,
        pages: Math.ceil(total / limit),
      });
    }

    const categories = await Category.find({}).populate("parentId", "name").sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await checkAdmin();
    const data = await req.json();
    await dbConnect();
    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 500 });
  }
}
