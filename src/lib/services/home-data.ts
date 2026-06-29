import dbConnect from "@/lib/config/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Section from "@/models/Section";
import { seedSections } from "@/lib/constants/seed-sections";
import { Category as ICategory } from "@/types/category";
import { HomeData, SearchParams } from "@/types/home";

export async function getHomeData(
  searchParams: SearchParams
): Promise<HomeData> {
  try {
    await dbConnect();
    await seedSections();

    const page =
      typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const allCategories = await Category.find({ isActive: true }).lean();
    const mainCategories = (allCategories as unknown as ICategory[])
      .filter((cat: ICategory) => !cat.parentId)
      .map((cat: ICategory) => ({
        ...cat,
        subCategories: (allCategories as unknown as ICategory[]).filter(
          (sub: ICategory) =>
            sub.parentId?.toString() === cat._id.toString()
        ),
      }));

    const query = { isActive: true };
    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const sections = await Section.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    return {
      categories: JSON.parse(JSON.stringify(mainCategories)) || [],
      products: JSON.parse(JSON.stringify(products)) || [],
      sections: JSON.parse(JSON.stringify(sections)) || [],
      totalPages: Math.ceil(totalProducts / limit) || 0,
      currentPage: page,
      totalCount: totalProducts || 0,
    };
  } catch (error) {
    console.error("Home Data Fetch Error:", error);
    return {
      categories: [],
      products: [],
      sections: [],
      totalPages: 0,
      currentPage: 1,
      totalCount: 0,
      error: true,
    };
  }
}
