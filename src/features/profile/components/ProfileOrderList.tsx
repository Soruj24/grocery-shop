"use client";

import { Package } from "lucide-react";
import ProfileOrderCard from "./ProfileOrderCard";
import { Order } from "@/types/order";
import { useLanguage } from "@/contexts/LanguageContext";
import { EmptyState, LoadingState } from "@/components/ui";

interface ProfileOrderListProps {
  orders: Order[];
  loading: boolean;
}

export default function ProfileOrderList({ orders, loading }: ProfileOrderListProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground flex items-center">
        <Package className="w-6 h-6 mr-2 text-primary" />
        {t('my_orders')}
      </h2>

      <div className="space-y-4">
        {loading ? (
          <LoadingState label={t('loading_orders')} />
        ) : orders.length === 0 ? (
          <EmptyState
            icon={<Package className="w-8 h-8" />}
            title={t('no_orders')}
          />
        ) : (
          orders.map((order: Order) => (
            <ProfileOrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
