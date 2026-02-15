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

  if (!categories || !products) {
    return <div>ডাটা লোড করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।</div>;
  }

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

      {/* Recently Viewed Section */}
      <RecentlyViewedSection />
    </div>
  );
}
