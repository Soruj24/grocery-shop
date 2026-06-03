import nextDynamic from "next/dynamic";
import Hero from "@/components/shop/Hero";
import Features from "@/components/shop/Features";
import CategorySection from "@/components/shop/CategorySection";
import FlashDeals from "@/components/shop/FlashDeals";
import ComboOffers from "@/components/shop/ComboOffers";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import SpecialOfferBanners from "@/components/shop/SpecialOfferBanners";
import AppDownload from "@/components/shop/AppDownload";
import ProductSection from "@/components/shop/ProductSection";
import Testimonials from "@/components/shop/Testimonials";
import Newsletter from "@/components/shop/Newsletter";
import RecentlyViewedSection from "@/components/shop/RecentlyViewedSection";
import AIRecommendations from "@/components/shop/AIRecommendations";

const SubCategorySpotlight = nextDynamic(
  () => import("@/components/shop/SubCategorySpotlight"),
);
const DailyDealsBanner = nextDynamic(
  () => import("@/components/shop/marketing/DailyDealsBanner"),
);
const RamadanOffers = nextDynamic(
  () => import("@/components/shop/marketing/RamadanOffers"),
);
const EidSpecialDeals = nextDynamic(
  () => import("@/components/shop/marketing/EidSpecialDeals"),
);
const ComboPacks = nextDynamic(
  () => import("@/components/shop/marketing/ComboPacks"),
);
const BuyMoreSaveMore = nextDynamic(
  () => import("@/components/shop/marketing/BuyMoreSaveMore"),
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
        return <Features />;
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
