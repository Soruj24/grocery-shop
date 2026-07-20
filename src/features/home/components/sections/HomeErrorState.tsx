import { ErrorState } from "@/components/ui";
import RefreshButton from "@/components/ui/RefreshButton";

export default function HomeErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <ErrorState
        title="Something went wrong"
        description="Failed to load data due to database connection or technical issues."
      />
      <RefreshButton className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary-hover transition-colors">
        Try Again
      </RefreshButton>
    </div>
  );
}
