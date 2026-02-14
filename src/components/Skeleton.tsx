import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-gray-800", className)}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-[48px] p-3 border border-gray-100 dark:border-gray-800 h-full flex flex-col">
      <Skeleton className="aspect-[4/5] rounded-[40px] w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-4 w-10 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-3/4 rounded-xl" />
        <div className="flex justify-between items-end pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-xl" />
          </div>
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
