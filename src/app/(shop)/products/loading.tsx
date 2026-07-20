import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-10 px-4">
      {/* Header Skeleton */}
      <div className="space-y-8">
        <div className="h-16 w-full bg-card rounded-xl shadow-sm">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-64 space-y-6 hidden lg:block">
            <div className="h-12 w-full bg-card rounded-xl shadow-sm">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-6 w-3/4 bg-card rounded-md shadow-sm">
                  <Skeleton className="h-full w-full rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
