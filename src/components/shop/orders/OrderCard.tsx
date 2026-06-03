import { ChevronRight, ShoppingBag } from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { useLanguage } from "@/components/LanguageContext";
import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderCardInfoGrid from "./OrderCardInfoGrid";

interface OrderCardProps { order: Order; }

export default function OrderCard({ order }: OrderCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 overflow-hidden group">
      <OrderCardHeader orderId={order._id} status={order.status} t={t} />
      <div className="p-6 sm:p-8 space-y-8">
        <OrderItemsList items={order.items} t={t} />
        <OrderCardInfoGrid address={order.address} phone={order.phone} paymentMethod={order.paymentMethod}
          transactionId={order.transactionId} createdAt={order.createdAt} total={order.total} t={t} />
      </div>
      <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800 flex justify-end">
        <button className="flex items-center gap-2 text-xs font-black text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors uppercase tracking-widest">
          {t("view_details")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
