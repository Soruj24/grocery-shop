"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { useRecentlyViewed } from './RecentlyViewedContext';

interface AIRecommendationContextType {
  recommendations: Product[];
  isLoading: boolean;
  getSmartSuggestions: (cartItems: any[]) => Product[];
}

const AIRecommendationContext = createContext<AIRecommendationContextType | undefined>(undefined);

export const AIRecommendationProvider: React.FC<{ children: React.ReactNode, allProducts: Product[] }> = ({ children, allProducts }) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { recentlyViewed } = useRecentlyViewed();
  const [isLoading, setIsLoading] = useState(false);

  // Simple Content-Based Filtering Simulation
  useEffect(() => {
    if (recentlyViewed.length > 0 && allProducts.length > 0) {
      setIsLoading(true);
      
      // Get categories from recently viewed
      const viewedCategories = Array.from(new Set(recentlyViewed.map(p => p.category?._id)));
      
      // Find products in same categories but not already viewed
      const suggested = allProducts.filter(p => 
        viewedCategories.includes(p.category?._id) && 
        !recentlyViewed.find(rv => rv._id === p._id)
      ).slice(0, 5);

      setRecommendations(suggested);
      setIsLoading(false);
    }
  }, [recentlyViewed, allProducts]);

  const getSmartSuggestions = (cartItems: any[]) => {
    if (cartItems.length === 0) return [];
    
    const cartCategoryIds = cartItems.map(item => item.category?._id);
    
    // Suggest items from different categories (cross-selling) 
    // or complementary items (logic can be expanded)
    return allProducts.filter(p => 
      !cartItems.find(item => item._id === p._id) && 
      !cartCategoryIds.includes(p.category?._id)
    ).slice(0, 3);
  };

  return (
    <AIRecommendationContext.Provider value={{ recommendations, isLoading, getSmartSuggestions }}>
      {children}
    </AIRecommendationContext.Provider>
  );
};

export const useAIRecommendations = () => {
  const context = useContext(AIRecommendationContext);
  if (context === undefined) {
    throw new Error('useAIRecommendations must be used within an AIRecommendationProvider');
  }
  return context;
};
