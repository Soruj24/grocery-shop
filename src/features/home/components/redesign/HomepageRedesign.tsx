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

import { SectionShell, Reveal } from "./SectionShell";
import FeaturesSection from "@/features/home/components/sections/FeaturesSection";
import Newsletter from "@/features/home/components/sections/Newsletter";
import { useLanguage } from "@/contexts/LanguageContext";

export interface HomepageRedesignProps {
  categories: Category[];
}

export default function HomepageRedesign({ categories }: HomepageRedesignProps) {
  const { t } = useLanguage();

  return (
    <div className="relative space-y-2 pb-10">
      {/* 1. Hero */}
      <PremiumHero categories={categories} />

      {/* 2. Brands (trust anchor below hero) */}
      <BrandsStrip />

      {/* 3. Categories */}
      <CategoryTiles categories={categories} />

      {/* 4. Featured Products (tabbed: Trending / Best Sellers / New) */}
      <TrendingTabs />

      {/* 5. Today's Deals */}
      <TodaysDeals />

      {/* 6. Flash Sale */}
      <FlashSaleSection />

      {/* 7. Trending now */}
      <SectionShell
        eyebrow={t("trending_now") ?? t("featured_products_tab_trending")}
        title={
          <>
            {t("trending_now_title_1") ?? t("featured_products_title_1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-500">
              {t("trending_now_title_2") ?? t("featured_products_title_2")}
            </span>
          </>
        }
        subtitle={t("trending_now_desc") ?? t("featured_products_desc")}
        viewAllHref="/products?sort=rating"
        viewAllLabel={t("see_all")}
      >
        <ProductRow sort="rating" limit={5} columns={5} />
      </SectionShell>

      {/* 8. Best Sellers */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-[2rem] border border-border bg-subtle p-2">
          <SectionShell
            eyebrow={t("best_sellers") ?? t("featured_products_tab_bestsellers")}
            eyebrowTone="warning"
            title={
              <>
                {t("best_sellers_title_1") ?? t("featured_products_title_1")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  {t("best_sellers_title_2") ?? t("featured_products_title_2")}
                </span>
              </>
            }
            subtitle={t("best_sellers_desc") ?? t("featured_products_desc")}
            viewAllHref="/products?sort=reviews"
            viewAllLabel={t("see_all")}
            className="!py-10"
          >
            <ProductRow sort="reviews" limit={8} columns={4} />
          </SectionShell>
        </div>
      </section>

      {/* 9. Popular Collections */}
      <PopularCollections categories={categories} />

      {/* 10. Recommended for you */}
      <RecommendedRail />

      {/* 11. Recently Viewed */}
      <RecentlyViewedRail />

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
    </div>
  );
}
