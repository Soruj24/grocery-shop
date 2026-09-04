import {
  MapPin,
  Phone,
  Calendar,
  CreditCard,
} from "lucide-react";
import { TranslationKey } from "@/constants/translations";

interface OrderInfoGridProps {
  address: string;
  phone: string;
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
  total: number;
  t: (key: TranslationKey) => string;
}

const payLabel = (
  method: string | undefined,
  t: (key: TranslationKey) => string
) => {
  if (method === "cod" || !method)
    return t("cod_payment");
  if (method === "bkash") return t("bkash");
  if (method === "nagad") return t("nagad");
  return t("cod_payment");
};

export default function OrderInfoGrid({
  address,
  phone,
  paymentMethod,
  transactionId,
  createdAt,
  total,
  t,
}: OrderInfoGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-5 pt-5 border-t border-border">
      <div className="space-y-3.5">
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-muted-foreground/40 mt-0.5" />
          <div>
            <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
              {t(
                "delivery_address_label"
              )}
            </p>
            <p className="text-xs font-medium text-foreground leading-relaxed">
              {address}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="w-4 h-4 text-muted-foreground/40" />
          <div>
            <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
              {t("phone_number")}
            </p>
            <p className="text-xs font-medium text-foreground">
              {phone}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <CreditCard className="w-4 h-4 text-muted-foreground/40 mt-0.5" />
          <div>
            <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
              {t("payment_method")}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium text-foreground">
                {payLabel(
                  paymentMethod,
                  t
                )}
              </p>
              {transactionId && (
                <p className="text-[9px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded w-fit">
                  {t(
                    "transaction_id_label"
                  )}
                  : {transactionId}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3.5">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-muted-foreground/40" />
          <div>
            <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
              {t("order_date")}
            </p>
            <p className="text-xs font-medium text-foreground">
              {new Date(
                createdAt
              ).toLocaleDateString(
                "bn-BD",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-subtle p-3.5 rounded-lg border border-border">
          <span className="text-xs font-medium text-muted-foreground/60">
            {t(
              "total_with_delivery"
            )}
          </span>
          <span className="text-base font-bold text-foreground">
            {t("currency_symbol")}
            {total.toLocaleString(
              "bn-BD"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
