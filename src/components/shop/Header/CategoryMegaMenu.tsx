import Link from "next/link";

interface CategoryMegaMenuProps {
  categories: any[];
  onClose: () => void;
}

export default function CategoryMegaMenu({ categories, onClose }: CategoryMegaMenuProps) {
  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-[1100px] bg-white dark:bg-[#0B1120] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:shadow-black/90 border border-gray-100 dark:border-white/5 rounded-b-[40px] rounded-tr-[40px] p-12 z-50 grid grid-cols-3 gap-x-12 gap-y-16 animate-in fade-in slide-in-from-top-4 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar"
    >
      {categories.map((cat: any) => (
        <div key={cat._id} className="space-y-6 group/main">
          <Link
            href={`/products?category=${cat._id}`}
            onClick={onClose}
            className="flex items-center gap-5 group/item"
          >
            <div className="relative flex-shrink-0">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-xl ring-4 ring-gray-50 dark:ring-white/5 group-hover/item:ring-green-500/30 transition-all duration-500">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-green-600 dark:text-green-500 font-black bg-green-50 dark:bg-green-900/20 text-2xl">
                    {cat.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[19px] font-black text-gray-900 dark:text-white group-hover/item:text-green-600 dark:group-hover/item:text-green-400 transition-colors leading-tight">
                {cat.name}
              </span>
              <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                {cat.nameEn || "Collection"}
              </span>
            </div>
          </Link>

          {/* Sub Categories List */}
          {cat.subCategories && cat.subCategories.length > 0 && (
            <div className="flex flex-col space-y-2.5 pl-1">
              {cat.subCategories.map((sub: any) => (
                <Link
                  key={sub._id}
                  href={`/products?category=${sub._id}`}
                  onClick={onClose}
                  className="group/sub flex items-center gap-3 text-[14px] font-medium text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all"
                >
                  <span className="text-gray-300 dark:text-gray-700 group-hover/sub:text-green-500 transition-colors">
                    •
                  </span>
                  <span className="flex-1 leading-snug">
                    {sub.name}
                  </span>
                </Link>
              ))}

              <Link
                href={`/products?category=${cat._id}`}
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[11px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest pt-4 hover:gap-3 transition-all"
              >
                সবগুলো দেখুন
                <span className="text-lg">→</span>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
