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
    <div className="p-6 sm:p-8 border-b border-border flex flex-wrap items-center justify-between gap-4 bg-subtle">
      <div className="flex items-center gap-4">
        <div className="bg-card p-3 rounded-2xl shadow-sm border border-border">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("order_id_label")}</p>
          <p className="text-sm font-black text-foreground">#{orderId.slice(-8).toUpperCase()}</p>
        </div>
      </div>
      <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-black text-xs ${getStatusColor(status)}`}>
        {getStatusIcon(status)}
        {getStatusLabel(status, t)}
      </div>
    </div>
  );
}
