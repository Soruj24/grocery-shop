export default function CategorySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[400px] rounded-[60px] bg-white/5 border border-white/5 p-10 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white/10 mb-8" />
          <div className="w-24 h-6 bg-white/10 rounded-lg mb-4" />
          <div className="w-16 h-4 bg-white/10 rounded-lg mb-auto" />
          <div className="w-20 h-4 bg-white/10 rounded-lg" />
        </div>
      ))}
    </div>
  );
}
