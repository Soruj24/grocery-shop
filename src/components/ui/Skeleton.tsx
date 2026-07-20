import { Skeleton as SystemSkeleton } from "@/components/ui";

export { SystemSkeleton as Skeleton };

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl p-3 border border-border h-full flex flex-col">
      <SystemSkeleton className="aspect-[4/5] rounded-lg w-full" />
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <SystemSkeleton className="h-6 w-20 rounded-md" />
          <SystemSkeleton className="h-4 w-10 rounded-md" />
        </div>
        <SystemSkeleton className="h-8 w-3/4 rounded-md" />
        <div className="flex justify-between items-end pt-4 border-t border-border">
          <div className="space-y-2">
            <SystemSkeleton className="h-4 w-12 rounded-md" />
            <SystemSkeleton className="h-8 w-20 rounded-md" />
          </div>
          <SystemSkeleton className="h-12 w-12 rounded-md" />
        </div>
      </div>
    </div>
  );
}
