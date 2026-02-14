export default function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 animate-pulse">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-[#0F172A]/40 rounded-[48px] border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col h-full">
          <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-950/50 m-3 rounded-[40px]" />
          <div className="p-8 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-4">
              <div className="w-20 h-6 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
              <div className="w-10 h-4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>
            <div className="w-full h-8 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4" />
            <div className="mt-auto flex justify-between">
              <div className="w-24 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
