import { AdminCategory, GroupedCategory } from "@/types/admin";

interface ProductFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  groupedCategories: Record<string, GroupedCategory>;
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  groupedCategories,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-2 rounded-[2.5rem] border border-gray-100/50 dark:border-gray-800 shadow-sm">
      <div className="flex flex-wrap gap-4">
        <select
          className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/50 border border-transparent dark:border-gray-700 rounded-[2rem] focus:bg-white dark:focus:bg-gray-900 focus:border-emerald-500/20 outline-none transition-all duration-300 font-bold text-sm cursor-pointer min-w-[220px] text-gray-500 dark:text-gray-400 focus:text-gray-900 dark:focus:text-white appearance-none"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">সব ক্যাটাগরি</option>
          {Object.values(groupedCategories).map((parent) => (
            <optgroup
              key={parent._id}
              label={parent.name}
              className="font-black text-gray-400 dark:text-gray-500"
            >
              <option value={parent._id}>{parent.name} (Main)</option>
              {parent.subCategories?.map((sub: AdminCategory) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
