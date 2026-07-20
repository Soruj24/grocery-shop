import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { HomeSection } from "@/types/home";
import SectionRenderer from "./SectionRenderer";

interface FallbackProps {
  categories: Category[];
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

export default function HomeFallbackSections({
  categories,
  products,
  totalPages,
  currentPage,
  totalCount,
}: FallbackProps) {
  return (
    <SectionRenderer
      section={{
        _id: "redesign",
        key: "redesign",
        label: "HomepageRedesign",
        order: 0,
        isActive: true,
        component: "HomepageRedesign",
        props: {},
      }}
      categories={categories}
      products={products}
      totalPages={totalPages}
      currentPage={currentPage}
      totalCount={totalCount}
    />
  );
}
