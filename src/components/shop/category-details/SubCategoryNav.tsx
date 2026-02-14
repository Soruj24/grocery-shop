import Link from "next/link";

interface SubCategoryNavProps {
  subCategories: any[];
  currentId: string;
}

export default function SubCategoryNav({ subCategories, currentId }: SubCategoryNavProps) {
  if (subCategories.length === 0) return null;

  return (
    <section className="bg-white dark:bg-gray-900 p-4 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-3 whitespace-nowrap px-2">
        <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mr-2">
          সাব-ক্যাটাগরি:
        </span>
        {subCategories.map((sub: any) => (
          <Link
            key={sub._id}
            href={`/category/${sub._id}`}
            className={`px-6 py-3 rounded-2xl font-black text-sm transition-all ${
              sub._id.toString() === currentId
                ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-500"
            }`}
          >
            {sub.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
