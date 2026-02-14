import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const categoryId = searchParams.get("category");

    if (!query && !categoryId) {
      return NextResponse.json([]);
    }

    await dbConnect();

    let filter: any = { isActive: true };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ];
    }

    if (categoryId && categoryId !== "all") {
      // Try to find category by ID or Name
      const foundCategory = await Category.findOne({
        $or: [
          { _id: categoryId.match(/^[0-9a-fA-F]{24}$/) ? categoryId : null },
          { name: { $regex: new RegExp(`^${categoryId}$`, "i") } },
        ],
      }).lean();

      if (foundCategory) {
        filter.category = foundCategory._id;
      } else if (categoryId.match(/^[0-9a-fA-F]{24}$/)) {
        filter.category = categoryId;
      }
    }

    const products = await Product.find(filter)
      .limit(5)
      .select("name image price unit _id")
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
