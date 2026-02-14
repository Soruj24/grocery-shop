import { Skeleton, ProductCardSkeleton } from "@/components/Skeleton";
import { ChevronRight, Info } from "lucide-react";

export default function ProductLoading() {
  return (
    <div className="relative max-w-7xl mx-auto pb-20 space-y-16">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      {/* Breadcrumb Skeleton */}
      <nav className="flex items-center gap-2 text-sm">
        <Skeleton className="w-12 h-4" />
        <ChevronRight className="w-4 h-4 text-gray-200 dark:text-gray-800" />
        <Skeleton className="w-20 h-4" />
        <ChevronRight className="w-4 h-4 text-gray-200 dark:text-gray-800" />
        <Skeleton className="w-32 h-4" />
      </nav>

      {/* Main Product Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Product Image Skeleton */}
        <div className="w-full lg:w-1/2">
          <Skeleton className="aspect-square rounded-[48px]" />
        </div>

        {/* Product Info Skeleton */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-24 h-7 rounded-2xl" />
              <Skeleton className="w-32 h-5 rounded-lg" />
            </div>

            <div className="space-y-3">
              <Skeleton className="w-full h-12 rounded-2xl" />
              <Skeleton className="w-3/4 h-12 rounded-2xl" />
            </div>

            <div className="flex items-baseline gap-4">
              <Skeleton className="w-32 h-10 rounded-xl" />
              <Skeleton className="w-24 h-7 rounded-lg" />
              <Skeleton className="w-20 h-6 rounded-lg" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-2/3 h-4 rounded" />
          </div>

          {/* Add to Cart Skeleton */}
          <div className="p-8 rounded-[40px] bg-gray-50/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 space-y-8">
            <div className="flex items-center justify-between">
              <Skeleton className="w-32 h-10 rounded-xl" />
              <Skeleton className="w-12 h-12 rounded-xl" />
            </div>
            <Skeleton className="w-full h-16 rounded-2xl" />
          </div>

          {/* Highlights Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-gray-100 dark:border-gray-800">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="w-11 h-11 rounded-2xl" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-24 h-4 rounded" />
                  <Skeleton className="w-32 h-3 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Additional Actions Skeleton */}
          <div className="flex items-center gap-8">
            <Skeleton className="w-32 h-10 rounded-xl" />
            <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
            <Skeleton className="w-32 h-10 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Product Details Tabs Skeleton */}
      <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="w-48 h-8 rounded-lg" />
        </div>
        <div className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-full h-5 rounded" />
            <Skeleton className="w-3/4 h-5 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48 rounded-[32px]" />
            <Skeleton className="h-48 rounded-[32px]" />
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="w-48 h-10 rounded-xl" />
          <Skeleton className="w-32 h-6 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

