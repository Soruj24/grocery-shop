import { Skeleton } from "@/components/ui";

export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-card rounded-xl border border-border overflow-hidden flex flex-col h-full shadow-sm">
          <Skeleton className="aspect-[4/5] m-3 rounded-lg" />
          <div className="p-8 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="w-20 h-6 rounded-md" />
              <Skeleton className="w-10 h-4 rounded-md" />
            </div>
            <Skeleton className="w-full h-8 rounded-md mb-4" />
            <div className="mt-auto flex justify-between">
              <Skeleton className="w-24 h-10 rounded-md" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
