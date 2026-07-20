"use client";

import { ChevronRight, ShoppingBag } from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderCardInfoGrid from "./OrderCardInfoGrid";

interface OrderCardProps { order: Order; }

export default function OrderCard({ order }: OrderCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden group">
      <OrderCardHeader orderId={order._id} status={order.status} t={t} />
      <div className="p-6 sm:p-8 space-y-8">
        <OrderItemsList items={order.items} t={t} />
        <OrderCardInfoGrid address={order.address} phone={order.phone} paymentMethod={order.paymentMethod}
          transactionId={order.transactionId} createdAt={order.createdAt} total={order.total} t={t} />
      </div>
      <div className="px-6 py-4 bg-subtle border-t border-border flex justify-end">
        <button className="flex items-center gap-2 text-xs font-black text-primary hover:text-primary-hover transition-colors uppercase tracking-widest">
          {t("view_details")} <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
