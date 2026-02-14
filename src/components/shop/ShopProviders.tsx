"use client";

import { Providers as BaseProviders } from "@/components/Providers";
import { RecentlyViewedProvider } from "@/components/RecentlyViewedContext";

export function ShopProviders({ 
  children, 
}: { 
  children: React.ReactNode, 
}) {
  return (
    <RecentlyViewedProvider>
      {children}
    </RecentlyViewedProvider>
  );
}
