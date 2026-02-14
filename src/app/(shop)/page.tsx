import dynamic from "next/dynamic";
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
const CategorySection = dynamic(
  () => import("@/components/shop/CategorySection"),
);
const SubCategorySpotlight = dynamic(
  () => import("@/components/shop/SubCategorySpotlight"),
);
const SpecialOfferBanners = dynamic(
  () => import("@/components/shop/SpecialOfferBanners"),
);
const ProductSection = dynamic(
  () => import("@/components/shop/ProductSection"),
);
const Newsletter = dynamic(() => import("@/components/shop/Newsletter"));
const Testimonials = dynamic(() => import("@/components/shop/Testimonials"));
const FlashDeals = dynamic(() => import("@/components/shop/FlashDeals"));
const AppDownload = dynamic(() => import("@/components/shop/AppDownload"));
const ComboOffers = dynamic(() => import("@/components/shop/ComboOffers"));
const FeaturedProducts = dynamic(
  () => import("@/components/shop/FeaturedProducts"),
);
const RecentlyViewedSection = dynamic(
  () => import("@/components/shop/RecentlyViewedSection"),
);
const AIRecommendationsSection = dynamic(
  () => import("@/components/shop/AIRecommendationsSection"),
);

// Marketing components
const DailyDealsBanner = dynamic(
  () => import("@/components/shop/marketing/DailyDealsBanner"),
);
const RamadanOffers = dynamic(
  () => import("@/components/shop/marketing/RamadanOffers"),
);
const EidSpecialDeals = dynamic(
  () => import("@/components/shop/marketing/EidSpecialDeals"),
);
const ComboPacks = dynamic(
  () => import("@/components/shop/marketing/ComboPacks"),
);
const BuyMoreSaveMore = dynamic(
  () => import("@/components/shop/marketing/BuyMoreSaveMore"),
);

async function getHomeData(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
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
    categories: JSON.parse(JSON.stringify(mainCategories)),
    products: JSON.parse(JSON.stringify(products)),
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    totalCount: totalProducts,
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const { categories, products, totalPages, currentPage, totalCount } =
    await getHomeData(resolvedSearchParams);

  const features = [
    { icon: Truck, title: "দ্রুত ডেলিভারি", desc: "২৪ ঘন্টার মধ্যে ডেলিভারি" },
    { icon: ShieldCheck, title: "নিরাপদ পেমেন্ট", desc: "১০০% নিরাপদ লেনদেন" },
    { icon: Clock, title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় সহায়তা" },
    { icon: Star, title: "সেরা মান", desc: "বাছাইকৃত তাজা পণ্য" },
  ];

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

      {/* AI Recommendations Section */}
      <AIRecommendationsSection />

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />
    </div>
  );
}
