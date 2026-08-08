"use client";

import { ChevronRight, ShoppingBag } from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderCardHeader from "./OrderCardHeader";
import OrderItemsList from "./OrderItemsList";
import OrderCardInfoGrid from "./OrderCardInfoGrid";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({
  order,
}: OrderCardProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-[#09090b] rounded-xl border border-black/[0.04] dark:border-white/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
      <OrderCardHeader
        orderId={order._id}
        status={order.status}
        t={t}
      />
      <div className="p-5 sm:p-6 space-y-6">
        <OrderItemsList
          items={order.items}
          t={t}
        />
        <OrderCardInfoGrid
          address={order.address}
          phone={order.phone}
          paymentMethod={order.paymentMethod}
          transactionId={order.transactionId}
          createdAt={order.createdAt}
          total={order.total}
          t={t}
        />
      </div>
      <div className="px-5 py-3 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.04] dark:border-white/[0.04] flex justify-end">
        <button className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider">
          {t("view_details")}{" "}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
