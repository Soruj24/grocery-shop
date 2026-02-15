import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import CategoryHero from "@/components/shop/categories/CategoryHero";
import CategoryCard from "@/components/shop/categories/CategoryCard";
import CategoryMap from "@/components/shop/categories/CategoryMap";
import { Category as ICategory } from "@/types/category";

export const dynamic = "force-dynamic";

async function getCategories() {
  await dbConnect();
  const allCategories = await Category.find({ isActive: true }).lean();

  // Transform to hierarchical structure
  const mainCategories = (allCategories as unknown as ICategory[])
    .filter((cat) => !cat.parentId)
    .map((cat) => ({
      ...cat,
      subCategories: (allCategories as unknown as ICategory[]).filter(
        (sub) => sub.parentId?.toString() === cat._id.toString(),
      ),
    }));

  return JSON.parse(JSON.stringify(mainCategories));
}

export default async function AllCategoriesPage() {
  const categories: ICategory[] = await getCategories();

  return (
    <div className="max-w-7xl mx-auto pb-24 space-y-20 relative overflow-hidden">
      {/* Background blobs for unique style */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-green-100/30 dark:bg-green-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100/30 dark:bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <CategoryHero />

      {/* Categories Grid - Unique Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {categories.map((cat: ICategory, index: number) => (
          <CategoryCard key={cat._id} cat={cat} index={index} />
        ))}
      </div>

      <CategoryMap categories={categories} />
    </div>
  );
}
