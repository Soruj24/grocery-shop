import { Edit2, Trash2, Package } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import { AdminProduct } from "@/types/admin";

interface ProductTableRowProps {
  product: AdminProduct;
  onEdit: (product: AdminProduct) => void;
  onDelete: (id: string) => void;
}

export default function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  return (
    <tr className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-800 group-hover:scale-105 transition-transform duration-500">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Package className="w-6 h-6 text-gray-300" />
            )}
          </div>
          <div className="space-y-1">
            <p className="font-black text-gray-800 dark:text-white text-base">
              {product.name}
            </p>
            <p className="text-xs text-gray-400 font-bold line-clamp-1 max-w-[200px]">
              {product.description || "কোন বর্ণনা নেই"}
            </p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-xl text-[10px] font-black border border-blue-100 dark:border-blue-800/50">
          {typeof product.category === "object" ? product.category.name : "N/A"}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="space-y-1.5">
          <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            ৳{product.price}
          </p>
          <p
            className={`text-[10px] font-black uppercase tracking-wider ${
              product.stock > 10 ? "text-gray-400" : "text-rose-500 animate-pulse"
            }`}
          >
            স্টক: {product.stock} {unitLabels[product.unit || 'pcs'] || product.unit}
          </p>
        </div>
      </td>
      <td className="px-8 py-6">
        <StatusBadge
          status={product.isActive}
          label={product.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
        />
      </td>
      <td className="px-8 py-6">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-3 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all duration-300"
            title="এডিট করুন"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(product._id)}
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
