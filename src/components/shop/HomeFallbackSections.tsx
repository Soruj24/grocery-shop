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
  const fallbackSections = [
    { component: "Hero" },
    { component: "Features" },
    { component: "CategorySection" },
    { component: "DailyDealsBanner" },
    { component: "FlashDeals" },
    { component: "FeaturedProducts" },
    { component: "RamadanOffers" },
    { component: "ComboPacks" },
    { component: "ComboOffers" },
    { component: "EidSpecialDeals" },
    { component: "BuyMoreSaveMore" },
    { component: "SubCategorySpotlight" },
    { component: "SpecialOfferBanners" },
    { component: "ProductSection" },
    { component: "AppDownload" },
    { component: "Testimonials" },
    { component: "Newsletter" },
    { component: "RecentlyViewedSection" },
    { component: "AIRecommendations" },
  ];

  return (
    <>
      {fallbackSections.map((sec, i) => (
        <SectionRenderer
          key={i}
          section={{ _id: String(i), key: `fallback-${i}`, label: sec.component, order: i, isActive: true, component: sec.component, props: {} }}
          categories={categories}
          products={products}
          totalPages={totalPages}
          currentPage={currentPage}
          totalCount={totalCount}
        />
      ))}
    </>
  );
}
