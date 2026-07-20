import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <div className="space-y-24 pb-20 relative overflow-hidden px-4">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto h-[600px] bg-card rounded-2xl shadow-sm">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>

      {/* Features Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-card rounded-xl shadow-sm border border-border">
            <Skeleton className="h-full w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Category Section Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="h-12 w-64 bg-card rounded-xl shadow-sm">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-card rounded-xl shadow-sm border border-border">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Section Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="h-12 w-72 bg-card rounded-xl shadow-sm">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
            <div className="h-6 w-48 bg-card rounded-lg shadow-sm">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </div>
          <div className="h-10 w-32 bg-card rounded-md shadow-sm hidden md:block">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-card rounded-xl h-[450px] shadow-sm border border-border">
              <Skeleton className="h-full w-full rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
