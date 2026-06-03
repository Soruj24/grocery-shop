import RefreshButton from "@/components/ui/RefreshButton";

export default function HomeErrorState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold text-red-600">
        Something went wrong
      </h2>
      <p className="text-gray-600">
        Failed to load data due to database connection or technical issues.
      </p>
      <RefreshButton className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition-colors">
        Try Again
      </RefreshButton>
    </div>
  );
}
