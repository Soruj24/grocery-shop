import { EmptyState } from "@/components/ui";

export default function HomeEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <EmptyState
        title="No data found"
        description="There are no products or categories to display at the moment."
      />
    </div>
  );
}
