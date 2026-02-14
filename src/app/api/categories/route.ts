import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    // Fetch all active categories
    const categories = await Category.find({ isActive: true }).sort({ name: 1 }).lean();
    
    // Create a tree structure
    const categoryMap = new Map();
    const mainCategories: any[] = [];

    categories.forEach((cat: any) => {
      cat.subCategories = [];
      categoryMap.set(cat._id.toString(), cat);
    });

    categories.forEach((cat: any) => {
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId.toString());
        if (parent) {
          parent.subCategories.push(cat);
        }
      } else {
        mainCategories.push(cat);
      }
    });

    return NextResponse.json(mainCategories);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
