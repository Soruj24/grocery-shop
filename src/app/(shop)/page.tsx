import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { Truck, ShieldCheck, Clock, Star } from "lucide-react";
import Hero from "@/components/shop/Hero";
import Features from "@/components/shop/Features";
import CategorySection from "@/components/shop/CategorySection";
import SubCategorySpotlight from "@/components/shop/SubCategorySpotlight";
import SpecialOfferBanners from "@/components/shop/SpecialOfferBanners";
import ProductSection from "@/components/shop/ProductSection";
import TrustSection from "@/components/shop/TrustSection";
import Testimonials from "@/components/shop/Testimonials";
import Newsletter from "@/components/shop/Newsletter";
import PageBackground from "@/components/ui/PageBackground";

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
  const mainCategories = allCategories
    .filter((cat: { parentId?: string | null }) => !cat.parentId)
    .map((cat) => ({
      ...cat,
      subCategories: allCategories.filter(
        (sub: any) => sub.parentId?.toString() === cat._id.toString(),
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
      <Features />
      <CategorySection categories={categories} />
      <SubCategorySpotlight categories={categories} />
      <SpecialOfferBanners />

      <ProductSection
        products={products}
        totalPages={totalPages}
        currentPage={currentPage}
        totalCount={totalCount}
      />

      <TrustSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
