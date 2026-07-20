import { MapPin, Phone, Calendar, CreditCard } from "lucide-react";
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

const payLabel = (method: string | undefined, t: (key: TranslationKey) => string) => {
  if (method === "cod" || !method) return t("cod_payment");
  if (method === "bkash") return t("bkash");
  if (method === "nagad") return t("nagad");
  return t("cod_payment");
};

export default function OrderInfoGrid({ address, phone, paymentMethod, transactionId, createdAt, total, t }: OrderInfoGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("delivery_address_label")}</p>
            <p className="text-sm font-bold text-foreground leading-relaxed">{address}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("phone_number")}</p>
            <p className="text-sm font-bold text-foreground">{phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("payment_method")}</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-foreground">{payLabel(paymentMethod, t)}</p>
              {transactionId && (
                <p className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-xs w-fit border border-border">
                  {t("transaction_id_label")}: {transactionId}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t("order_date")}</p>
            <p className="text-sm font-bold text-foreground">
              {new Date(createdAt).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-primary-subtle p-4 rounded-2xl border border-primary/20">
          <span className="text-sm font-black text-primary-subtle-foreground">{t("total_with_delivery")}</span>
          <span className="text-xl font-black text-primary">{t("currency_symbol")}{total.toLocaleString("bn-BD")}</span>
        </div>
      </div>
    </div>
  );
}
