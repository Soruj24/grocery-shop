import nextDynamic from "next/dynamic";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import Section from "@/models/Section";
import { seedSections } from "@/lib/seed-sections";
import Hero from "@/components/shop/Hero";
import Features from "@/components/shop/Features";
import PageBackground from "@/components/ui/PageBackground";
import { Category as ICategory } from "@/types/category";

// Lazy Load components that are below the fold
const CategorySection = nextDynamic(
  () => import("@/components/shop/CategorySection"),
);
const SubCategorySpotlight = nextDynamic(
  () => import("@/components/shop/SubCategorySpotlight"),
);
const SpecialOfferBanners = nextDynamic(
  () => import("@/components/shop/SpecialOfferBanners"),
);
const ProductSection = nextDynamic(
  () => import("@/components/shop/ProductSection"),
);
const Newsletter = nextDynamic(() => import("@/components/shop/Newsletter"));
const Testimonials = nextDynamic(
  () => import("@/components/shop/Testimonials"),
);
const FlashDeals = nextDynamic(() => import("@/components/shop/FlashDeals"));
const AppDownload = nextDynamic(() => import("@/components/shop/AppDownload"));
const ComboOffers = nextDynamic(() => import("@/components/shop/ComboOffers"));
const FeaturedProducts = nextDynamic(
  () => import("@/components/shop/FeaturedProducts"),
);
const RecentlyViewedSection = nextDynamic(
  () => import("@/components/shop/RecentlyViewedSection"),
);
const AIRecommendations = nextDynamic(
  () => import("@/components/shop/AIRecommendations"),
);

// Marketing components
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

import RefreshButton from "@/components/ui/RefreshButton";

export const dynamic = "force-dynamic";

async function getHomeData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    await dbConnect();

    // Seed sections if needed
    await seedSections();

    const page =
      typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    // Get only main categories and include subcategory count
    const allCategories = await Category.find({ isActive: true }).lean();
    const mainCategories = (allCategories as unknown as ICategory[])
      .filter((cat: ICategory) => !cat.parentId)
      .map((cat: ICategory) => ({
        ...cat,
        subCategories: (allCategories as unknown as ICategory[]).filter(
          (sub: ICategory) => sub.parentId?.toString() === cat._id.toString(),
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

    // Fetch active sections ordered by 'order'
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

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const {
    categories,
    products,
    sections,
    totalPages,
    currentPage,
    totalCount,
    error,
  } = await getHomeData(resolvedSearchParams);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="text-gray-600">
          Failed to load data due to database connection or technical issues.
        </p>
        <RefreshButton className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors">
          Try Again
        </RefreshButton>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">No data found</h2>
        <p className="text-gray-600">
          There are no products or categories to display at the moment.
        </p>
      </div>
    );
  }

  const renderSection = (section: any) => {
    switch (section.component) {
      case "Hero":
        return <Hero key={section._id} data={section.props} />;
      case "DailyDealsBanner":
        return (
          <div key={section._id} className="max-w-7xl mx-auto px-4">
            <DailyDealsBanner data={section.props} />
          </div>
        );
      case "Features":
        return <Features key={section._id} />;
      case "RamadanOffers":
        return (
          <div key={section._id} className="max-w-7xl mx-auto px-4">
            <RamadanOffers />
          </div>
        );
      case "CategorySection":
        return <CategorySection key={section._id} categories={categories} />;
      case "FlashDeals":
        return <FlashDeals key={section._id} products={products} />;
      case "ComboPacks":
        return (
          <div key={section._id} className="max-w-7xl mx-auto px-4">
            <ComboPacks />
          </div>
        );
      case "ComboOffers":
        return <ComboOffers key={section._id} />;
      case "EidSpecialDeals":
        return (
          <div key={section._id} className="max-w-7xl mx-auto px-4">
            <EidSpecialDeals />
          </div>
        );
      case "FeaturedProducts":
        return <FeaturedProducts key={section._id} products={products} />;
      case "BuyMoreSaveMore":
        return (
          <div key={section._id} className="max-w-7xl mx-auto px-4">
            <BuyMoreSaveMore />
          </div>
        );
      case "SubCategorySpotlight":
        return (
          <SubCategorySpotlight key={section._id} categories={categories} />
        );
      case "SpecialOfferBanners":
        return <SpecialOfferBanners key={section._id} />;
      case "AppDownload":
        return <AppDownload key={section._id} />;
      case "ProductSection":
        return (
          <ProductSection
            key={section._id}
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            totalCount={totalCount}
          />
        );
      case "Testimonials":
        return <Testimonials key={section._id} />;
      case "Newsletter":
        return <Newsletter key={section._id} />;
      case "RecentlyViewedSection":
        return <RecentlyViewedSection key={section._id} />;
      case "AIRecommendations":
        return <AIRecommendations key={section._id} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-12 pb-20 relative overflow-hidden">
      <PageBackground />
      {sections.length > 0 ? (
        sections.map((section: any) => renderSection(section))
      ) : (
        // Fallback if sections fail to load for some reason (though seed should handle it)
        <>
          <Hero />
          <Features />
          <CategorySection categories={categories} />
          <div className="max-w-7xl mx-auto px-4">
            <DailyDealsBanner />
          </div>
          <FlashDeals products={products} />
          <FeaturedProducts products={products} />
          <div className="max-w-7xl mx-auto px-4">
            <RamadanOffers />
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <ComboPacks />
          </div>
          <ComboOffers />
          <div className="max-w-7xl mx-auto px-4">
            <EidSpecialDeals />
          </div>
          <div className="max-w-7xl mx-auto px-4">
            <BuyMoreSaveMore />
          </div>
          <SubCategorySpotlight categories={categories} />
          <SpecialOfferBanners />
          <ProductSection
            products={products}
            totalPages={totalPages}
            currentPage={currentPage}
            totalCount={totalCount}
          />
          <AppDownload />
          <Testimonials />
          <Newsletter />
          <RecentlyViewedSection />
          <AIRecommendations />
        </>
      )}
    </div>
  );
}
