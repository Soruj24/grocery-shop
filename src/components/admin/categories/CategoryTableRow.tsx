import { Edit2, Trash2 } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { AdminCategory } from "@/types/admin";

interface CategoryTableRowProps {
  category: AdminCategory;
  onEdit: (category: AdminCategory) => void;
  onDelete: (id: string) => void;
}

export default function CategoryTableRow({
  category,
  onEdit,
  onDelete,
}: CategoryTableRowProps) {
  return (
    <tr className="group hover:bg-green-50/30 dark:hover:bg-green-900/10 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:shadow-md transition-all duration-300">
            {category.name.charAt(0)}
          </div>
          <div>
            <div className="font-black text-gray-800 dark:text-white text-base">
              {category.name}
            </div>
            {category.parentId && (
              <div className="text-[11px] font-bold text-green-600 dark:text-green-500 uppercase tracking-wider mt-0.5">
                প্যারেন্ট:{" "}
                {typeof category.parentId === "object"
                  ? category.parentId.name
                  : ""}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span
          className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
            !category.parentId
              ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50"
              : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
          }`}
        >
          {!category.parentId ? "মেইন" : "সাব"}
        </span>
      </td>
      <td className="px-8 py-6">
        <StatusBadge
          status={category.isActive ?? false}
          label={category.isActive ? "অ্যাক্টিভ" : "ইনঅ্যাক্টিভ"}
        />
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button
            onClick={() => onEdit(category)}
            className="p-3 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
            title="এডিট করুন"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(category._id)}
            className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-2xl transition-all duration-300"
            title="ডিলিট করুন"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
