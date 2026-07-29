import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Brand from "@/schemas/Brand";
import Product from "@/schemas/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const brands = await Brand.find({}).sort({ name: 1 }).lean();
    const data = await Promise.all(
      brands.map(async (b) => ({
        _id: b._id.toString(),
        name: b.name,
        slug: b.slug,
        image: b.image,
        description: b.description,
        isActive: b.isActive,
        productCount: await Product.countDocuments({ brand: b.name, isActive: true }),
      }))
    );
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const body = await req.json();
    const brand = await Brand.create({
      name: body.name,
      slug: body.slug?.toLowerCase().replace(/\s+/g, "-") || body.name.toLowerCase().replace(/\s+/g, "-"),
      image: body.image,
      description: body.description,
    });
    return NextResponse.json(brand, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
