export default function Loading() {
  return (
    <div className="space-y-24 pb-20 relative overflow-hidden px-4">
      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto h-[600px] bg-gray-100 dark:bg-gray-800 rounded-[64px] animate-pulse" />
      
      {/* Features Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-[32px] animate-pulse" />
        ))}
      </div>

      {/* Category Section Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="h-12 w-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-[40px] animate-pulse" />
          ))}
        </div>
      </div>

      {/* Product Section Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div className="h-12 w-72 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            <div className="h-6 w-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse hidden md:block" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-[48px] h-[450px] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
