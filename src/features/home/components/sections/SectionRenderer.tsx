import nextDynamic from "next/dynamic";
import Hero from "@/features/home/components/hero/Hero";
import FeaturesSection from "@/features/home/components/sections/FeaturesSection";
import CategorySection from "@/features/home/components/sections/CategorySection";
import FlashDeals from "@/features/home/components/sections/FlashDeals";
import ComboOffers from "@/features/home/components/sections/ComboOffers";
import FeaturedProducts from "@/features/home/components/sections/FeaturedProducts";
import SpecialOfferBanners from "@/features/home/components/sections/SpecialOfferBanners";
import AppDownload from "@/features/home/components/sections/AppDownload";
import ProductSection from "@/features/home/components/sections/ProductSection";
import Testimonials from "@/features/home/components/sections/Testimonials";
import Newsletter from "@/features/home/components/sections/Newsletter";
import RecentlyViewedSection from "@/features/home/components/sections/RecentlyViewedSection";
import AIRecommendations from "@/features/home/components/sections/AIRecommendations";

const SubCategorySpotlight = nextDynamic(
  () => import("@/features/home/components/sections/SubCategorySpotlight"),
);
const DailyDealsBanner = nextDynamic(
  () => import("@/features/home/components/marketing/DailyDealsBanner"),
);
const RamadanOffers = nextDynamic(
  () => import("@/features/home/components/marketing/RamadanOffers"),
);
const EidSpecialDeals = nextDynamic(
  () => import("@/features/home/components/marketing/EidSpecialDeals"),
);
const ComboPacks = nextDynamic(
  () => import("@/features/home/components/marketing/ComboPacks"),
);
const BuyMoreSaveMore = nextDynamic(
  () => import("@/features/home/components/marketing/BuyMoreSaveMore"),
);

import { HomeSection } from "@/types/home";
import { Category } from "@/types/category";
import { Product } from "@/types/product";

const WRAPPED_COMPONENTS = new Set([
  "DailyDealsBanner",
  "RamadanOffers",
  "ComboPacks",
  "EidSpecialDeals",
  "BuyMoreSaveMore",
  "SubCategorySpotlight",
]);

interface Props {
  section: HomeSection & { component: string; props?: Record<string, unknown> };
  categories: Category[];
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalCount: number;
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="max-w-7xl mx-auto px-4">{children}</div>;
}

export default function SectionRenderer({
  section,
  categories,
  products,
  totalPages,
  currentPage,
  totalCount,
}: Props) {
  const render = () => {
    switch (section.component) {
      case "Hero":
        return <Hero data={section.props} />;
      case "Features":
        return <FeaturesSection />;
      case "CategorySection":
        return <CategorySection categories={categories} />;
      case "FlashDeals":
        return <FlashDeals products={products} data={section.props} />;
      case "ComboOffers":
        return <ComboOffers />;
      case "FeaturedProducts":
        return <FeaturedProducts products={products} />;
      case "SpecialOfferBanners":
        return <SpecialOfferBanners />;
      case "AppDownload":
        return <AppDownload />;
      case "ProductSection":
        return (
          <ProductSection
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            totalCount={totalCount}
          />
        );
      case "Testimonials":
        return <Testimonials />;
      case "Newsletter":
        return <Newsletter />;
      case "RecentlyViewedSection":
        return <RecentlyViewedSection />;
      case "AIRecommendations":
        return <AIRecommendations />;
      case "DailyDealsBanner":
        return <DailyDealsBanner data={section.props} />;
      case "RamadanOffers":
        return <RamadanOffers />;
      case "ComboPacks":
        return <ComboPacks />;
      case "EidSpecialDeals":
        return <EidSpecialDeals />;
      case "BuyMoreSaveMore":
        return <BuyMoreSaveMore />;
      case "SubCategorySpotlight":
        return <SubCategorySpotlight categories={categories} />;
      default:
        return null;
    }
  };

  const content = render();

  if (!content) return null;

  if (WRAPPED_COMPONENTS.has(section.component)) {
    return <Wrapper>{content}</Wrapper>;
  }

  return content;
}
