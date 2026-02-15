import nextDynamic from "next/dynamic";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { Truck, ShieldCheck, Clock, Star } from "lucide-react";
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
const Testimonials = nextDynamic(() => import("@/components/shop/Testimonials"));
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

export const dynamic = "force-dynamic";

async function getHomeData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    await dbConnect();
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

    return {
      categories: JSON.parse(JSON.stringify(mainCategories)) || [],
      products: JSON.parse(JSON.stringify(products)) || [],
      totalPages: Math.ceil(totalProducts / limit) || 0,
      currentPage: page,
      totalCount: totalProducts || 0,
    };
  } catch (error) {
    console.error("Home Data Fetch Error:", error);
    return {
      categories: [],
      products: [],
      totalPages: 0,
      currentPage: 1,
      totalCount: 0,
      error: true
    };
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { categories, products, totalPages, currentPage, totalCount, error } =
    await getHomeData(resolvedSearchParams);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600">Failed to load data due to database connection or technical issues.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">No data found</h2>
        <p className="text-gray-600">There are no products or categories to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-20 relative overflow-hidden">
      <PageBackground />

      <Hero />

      {/* Modern Marketing: Daily Deals */}
      <div className="max-w-7xl mx-auto px-4">
        <DailyDealsBanner />
      </div>

      <Features />

      {/* Ramadan Special UI */}
      <div className="max-w-7xl mx-auto px-4">
        <RamadanOffers />
      </div>

      <CategorySection categories={categories} />
      <FlashDeals products={products} />

      {/* Combo Packs Section */}
      <div className="max-w-7xl mx-auto px-4">
        <ComboPacks />
      </div>

      <ComboOffers />

      {/* Eid Special Deals */}
      <div className="max-w-7xl mx-auto px-4">
        <EidSpecialDeals />
      </div>

      <FeaturedProducts products={products} />

      {/* Buy More Save More Slider */}
      <div className="max-w-7xl mx-auto px-4">
        <BuyMoreSaveMore />
      </div>

      <SubCategorySpotlight categories={categories} />
      <SpecialOfferBanners />
      <AppDownload />
      <ProductSection
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
      />
      <Testimonials />
      <Newsletter />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />

      {/* AI Recommendations */}
      <AIRecommendations />
    </div>
  );
}
