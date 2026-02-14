import { Edit2, Trash2, Layers, Tag } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { AdminCombo } from "@/types/admin";

interface ComboTableRowProps {
  combo: AdminCombo;
  onEdit: (combo: AdminCombo) => void;
  onDelete: (id: string) => void;
}

export default function ComboTableRow({
  combo,
  onEdit,
  onDelete,
}: ComboTableRowProps) {
  return (
    <tr className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-500">
            <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-gray-800 dark:text-white text-base">
              {combo.name}
            </p>
            <div className="flex items-center gap-2">
              <Tag className="w-3 h-3 text-emerald-500" />
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-wider">
                {combo.tag || "নতুন অফার"}
              </p>
            </div>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-wrap gap-1.5 max-w-[300px]">
          {combo.items.map((item, index) => (
            <span
              key={index}
              className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-lg text-[10px] font-black border border-gray-100 dark:border-gray-700"
            >
              {item}
            </span>
          ))}
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="space-y-1.5">
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            ৳{combo.price}
          </p>
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-wider">
            সাশ্রয়: ৳{combo.saveAmount}
          </p>
        </div>
      </td>
      <td className="px-8 py-6">
        <StatusBadge
          status={combo.isActive}
          label={combo.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
        />
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(combo)}
            className="p-3 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
            title="এডিট করুন"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(combo._id)}
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
