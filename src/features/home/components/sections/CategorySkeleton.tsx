import { Skeleton } from "@/components/ui";

export default function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[400px] rounded-2xl bg-card border border-border p-10 flex flex-col items-center">
          <Skeleton className="w-28 h-28 rounded-full mb-8" />
          <Skeleton className="w-24 h-6 rounded-md mb-4" />
          <Skeleton className="w-16 h-4 rounded-md mb-auto" />
          <Skeleton className="w-20 h-4 rounded-md" />
        </div>
      ))}
    </div>
  );
}
