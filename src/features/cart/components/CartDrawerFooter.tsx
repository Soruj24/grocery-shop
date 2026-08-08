"use client";

import {
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerFooterProps {
  totalPrice: number;
  onClose: () => void;
}

export default function CartDrawerFooter({
  totalPrice,
  onClose,
}: CartDrawerFooterProps) {
  const { t } = useLanguage();
  const shippingFee = totalPrice >= 500 ? 0 : 60;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="p-5 border-t border-black/[0.04] dark:border-white/[0.04] space-y-4">
      {/* Shipping Notice */}
      {totalPrice < 500 && (
        <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground/50">
          <Truck className="w-3 h-3" />
          <span>
            {t("free_delivery_remaining")}{" "}
            <span className="text-foreground font-semibold">
              {t("currency_symbol")}
              {(500 - totalPrice).toLocaleString("bn-BD")}
            </span>
          </span>
        </div>
      )}

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-muted-foreground/60">
          <span>{t("subtotal")}</span>
          <span className="text-foreground">
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="flex justify-between text-xs font-medium text-muted-foreground/60">
          <span>{t("delivery_charge")}</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {shippingFee === 0
              ? t("free")
              : `${t("currency_symbol")}${shippingFee.toLocaleString("bn-BD")}`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
          <span>{t("grand_total")}</span>
          <span>
            {t("currency_symbol")}
            {grandTotal.toLocaleString("bn-BD")}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/cart"
          onClick={onClose}
          className="flex items-center justify-center px-4 py-3 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.04] rounded-xl font-semibold text-xs text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-all"
        >
          {t("view_cart")}
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold text-xs transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          {t("checkout_button")}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Trust */}
      <div className="flex items-center justify-center gap-2 text-muted-foreground/30">
        <ShieldCheck className="w-3 h-3" />
        <span className="text-[9px] font-medium">
          SSL Encrypted · bKash / Nagad
        </span>
      </div>
    </div>
  );
}
