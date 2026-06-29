import { MapPin, Phone, Calendar, CreditCard } from "lucide-react";
import { TranslationKey } from "@/lib/constants/translations";

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
    <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-50 dark:border-gray-800">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t("delivery_address_label")}</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">{address}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t("phone_number")}</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CreditCard className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t("payment_method")}</p>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{payLabel(paymentMethod, t)}</p>
              {transactionId && (
                <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded w-fit border border-gray-200 dark:border-gray-700">
                  {t("transaction_id_label")}: {transactionId}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t("order_date")}</p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {new Date(createdAt).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-800/50">
          <span className="text-sm font-black text-green-800 dark:text-green-400">{t("total_with_delivery")}</span>
          <span className="text-xl font-black text-green-600 dark:text-green-500">{t("currency_symbol")}{total.toLocaleString("bn-BD")}</span>
        </div>
      </div>
    </div>
  );
}
