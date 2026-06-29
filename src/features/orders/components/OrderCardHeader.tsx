import { Package } from "lucide-react";
import { TranslationKey } from "@/constants/translations";
import { getStatusColor, getStatusLabel, getStatusIcon } from "@/utils/order-utils";

interface OrderCardHeaderProps {
  orderId: string;
  status: string;
  t: (key: TranslationKey) => string;
}

export default function OrderCardHeader({ orderId, status, t }: OrderCardHeaderProps) {
  return (
    <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 bg-gray-50/30 dark:bg-gray-800/30">
      <div className="flex items-center gap-4">
        <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <Package className="w-6 h-6 text-green-600 dark:text-green-500" />
        </div>
        <div>
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t("order_id_label")}</p>
          <p className="text-sm font-black text-gray-800 dark:text-gray-100">#{orderId.slice(-8).toUpperCase()}</p>
        </div>
      </div>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-black text-xs ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        {getStatusLabel(status, t)}
      </div>
    </div>
  );
}
