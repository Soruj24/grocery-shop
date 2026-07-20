"use client";

import { Category } from "@/types/category";
import { Product } from "@/types/product";

import PremiumHero from "./PremiumHero";
import TrendingTabs from "./TrendingTabs";
import ProductRow from "./ProductRow";
import CategoryTiles from "./CategoryTiles";
import BrandsStrip from "./BrandsStrip";
import TodaysDeals from "./TodaysDeals";
import FlashSaleSection from "./FlashSaleSection";
import RecentlyViewedRail from "./RecentlyViewedRail";
import RecommendedRail from "./RecommendedRail";
import PopularCollections from "./PopularCollections";
import TestimonialsRail from "./TestimonialsRail";
import TrustSection from "./TrustSection";
import InstagramGallery from "./InstagramGallery";

import FeaturesSection from "@/features/home/components/sections/FeaturesSection";
import Newsletter from "@/features/home/components/sections/Newsletter";
import Footer from "@/components/navigation/Footer";
import { Reveal } from "./SectionShell";

export interface HomepageRedesignProps {
  categories: Category[];
  products: Product[];
}

export default function HomepageRedesign({
  categories,
  products,
}: HomepageRedesignProps) {
  return (
    <div className="relative space-y-4 pb-10">
      {/* 1. Hero */}
      <PremiumHero />

      {/* 2. Brands (trust anchor below hero) */}
      <BrandsStrip />

      {/* 3. Categories */}
      <CategoryTiles categories={categories} />

      {/* 4. Featured Products (tabbed: Trending / Best Sellers / New) */}
      <TrendingTabs />

      {/* 5. Trending now */}
      <ProductRow sort="rating" limit={8} columns={4} />

      {/* 6. Today's Deals */}
      <TodaysDeals />

      {/* 7. Flash Sale */}
      <FlashSaleSection />

      {/* 8. Best Sellers */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-[2rem] border border-border bg-subtle p-2">
          <ProductRow sort="reviews" limit={8} columns={4} />
        </div>
      </section>

      {/* 9. Popular Collections */}
      <PopularCollections categories={categories} />

      {/* 10. Recently Viewed */}
      <RecentlyViewedRail />

      {/* 11. Recommended for you */}
      <RecommendedRail />

      {/* 12. Testimonials */}
      <TestimonialsRail />

      {/* 13. Trust Section */}
      <TrustSection />

      {/* 14. Features / Why us */}
      <Reveal>
        <FeaturesSection />
      </Reveal>

      {/* 15. Newsletter */}
      <Reveal>
        <Newsletter />
      </Reveal>

      {/* 16. Instagram Gallery */}
      <InstagramGallery />

      {/* 17. Footer */}
      <Footer />
    </div>
  );
}
