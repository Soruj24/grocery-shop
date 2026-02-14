import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CategoryModel from "@/models/Category";
import { Category as ICategory } from "@/types/category";

export async function GET() {
  try {
    await dbConnect();
    // Fetch all active categories
    const categories = await CategoryModel.find({ isActive: true }).sort({ name: 1 }).lean();
    
    // Create a tree structure
    const categoryMap = new Map<string, ICategory>();
    const mainCategories: ICategory[] = [];

    (categories as unknown as ICategory[]).forEach((cat) => {
      cat.subCategories = [];
      categoryMap.set(cat._id.toString(), cat);
    });

    (categories as unknown as ICategory[]).forEach((cat) => {
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId.toString());
        if (parent) {
          if (!parent.subCategories) parent.subCategories = [];
          parent.subCategories.push(cat);
        }
      } else {
        mainCategories.push(cat);
      }
    });

    return NextResponse.json(mainCategories);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
