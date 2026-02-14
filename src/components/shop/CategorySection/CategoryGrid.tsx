import CategoryCard from "@/components/CategoryCard";
import { Category } from "@/types/category";

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
      {categories.map((cat) => (
        <CategoryCard key={cat._id} category={cat} />
      ))}
    </div>
  );
}
