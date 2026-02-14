"use client";

import { Providers as BaseProviders } from "@/components/Providers";
import { AIRecommendationProvider } from "@/components/AIRecommendationContext";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedContext";
import { Product } from "@/types/product";

export function ShopProviders({ 
  children, 
  allProducts 
}: { 
  children: React.ReactNode, 
  allProducts: Product[] 
}) {
  return (
    <RecentlyViewedProvider>
      <AIRecommendationProvider allProducts={allProducts}>
        {children}
      </AIRecommendationProvider>
    </RecentlyViewedProvider>
  );
}
