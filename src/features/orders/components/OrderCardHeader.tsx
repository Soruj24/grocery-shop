import { Package } from "lucide-react";
import { TranslationKey } from "@/constants/translations";
import {
  getStatusColor,
  getStatusLabel,
  getStatusIcon,
} from "@/utils/order-utils";

interface OrderCardHeaderProps {
  orderId: string;
  status: string;
  t: (key: TranslationKey) => string;
}

export default function OrderCardHeader({
  orderId,
  status,
  t,
}: OrderCardHeaderProps) {
  return (
    <div className="p-5 sm:p-6 border-b border-border flex flex-wrap items-center justify-between gap-3 bg-subtle">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <Package className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <div>
          <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
            {t("order_id_label")}
          </p>
          <p className="text-sm font-bold text-foreground">
            #
            {orderId
              .slice(-8)
              .toUpperCase()}
          </p>
        </div>
      </div>
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-[11px] ${getStatusColor(status)}`}
      >
        {getStatusIcon(status)}
        {getStatusLabel(status, t)}
      </div>
    </div>
  );
}
