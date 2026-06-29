import Section from "@/models/Section";

export const initialSections = [
  { key: "hero", label: "Hero Banner", component: "Hero", order: 1, isActive: true },
  { key: "daily-deals", label: "Daily Deals Banner", component: "DailyDealsBanner", order: 2, isActive: true },
  { key: "features", label: "Features", component: "Features", order: 3, isActive: true },
  { key: "ramadan-offers", label: "Ramadan Offers", component: "RamadanOffers", order: 4, isActive: true },
  { key: "categories", label: "Category Section", component: "CategorySection", order: 5, isActive: true },
  { key: "flash-deals", label: "Flash Deals", component: "FlashDeals", order: 6, isActive: true },
  { key: "combo-packs", label: "Combo Packs", component: "ComboPacks", order: 7, isActive: true },
  { key: "combo-offers", label: "Combo Offers", component: "ComboOffers", order: 8, isActive: true },
  { key: "eid-special", label: "Eid Special Deals", component: "EidSpecialDeals", order: 9, isActive: true },
  { key: "featured-products", label: "Featured Products", component: "FeaturedProducts", order: 10, isActive: true },
  { key: "buy-more-save-more", label: "Buy More Save More", component: "BuyMoreSaveMore", order: 11, isActive: true },
  { key: "subcategory-spotlight", label: "SubCategory Spotlight", component: "SubCategorySpotlight", order: 12, isActive: true },
  { key: "special-offer-banners", label: "Special Offer Banners", component: "SpecialOfferBanners", order: 13, isActive: true },
  { key: "app-download", label: "App Download", component: "AppDownload", order: 14, isActive: true },
  { key: "all-products", label: "All Products Grid", component: "ProductSection", order: 15, isActive: true },
  { key: "testimonials", label: "Testimonials", component: "Testimonials", order: 16, isActive: true },
  { key: "newsletter", label: "Newsletter", component: "Newsletter", order: 17, isActive: true },
  { key: "recently-viewed", label: "Recently Viewed", component: "RecentlyViewedSection", order: 18, isActive: true },
  { key: "ai-recommendations", label: "AI Recommendations", component: "AIRecommendations", order: 19, isActive: true },
];

export async function seedSections() {
  const count = await Section.countDocuments();
  if (count === 0) {
    console.log("Seeding sections...");
    await Section.insertMany(initialSections);
    console.log("Sections seeded successfully.");
  }
}
