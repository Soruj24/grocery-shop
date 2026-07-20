"use client";

import { ShoppingBag, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  totalPrice: number;
  couponDiscount?: number;
}

export default function OrderSummary({ cart, totalPrice, couponDiscount = 0 }: OrderSummaryProps) {
  const { t } = useLanguage();
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const vat = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + vat - couponDiscount;

  return (
    <div className="lg:col-span-1">
    <div className="bg-card p-10 rounded-xl shadow-sm border border-border sticky top-24 space-y-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -mr-16 -mt-16" />

        <h3 className="text-3xl font-black text-foreground tracking-tight relative">
          {t('order_summary')}
        </h3>

        <div className="space-y-6 relative max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-border">
                <Image
                  src={item.image || getProductFallbackImage(item.name)}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  priority={false}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-foreground truncate">
                  {item.name}
                </h4>
                <p className="text-sm font-bold text-muted-foreground">
                  {t('currency_symbol')}{item.price.toLocaleString('bn-BD')} x {item.quantity.toLocaleString('bn-BD')}
                </p>
              </div>
              <span className="font-black text-foreground">
                {t('currency_symbol')}{(item.price * item.quantity).toLocaleString('bn-BD')}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6 relative pt-10 border-t border-border">
          <div className="flex justify-between items-center text-lg font-bold text-muted-foreground">
            <span>{t('subtotal')}</span>
            <span>{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-muted-foreground">
            <span>{t('delivery_charge')}</span>
            <span>{deliveryFee === 0 ? t('free') : `${t('currency_symbol')}${deliveryFee.toLocaleString('bn-BD')}`}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-muted-foreground">
            <span>{t('vat')}{t('vat_percentage')}</span>
            <span>{t('currency_symbol')}{vat.toLocaleString('bn-BD')}</span>
          </div>
          {couponDiscount > 0 && (
            <div className="flex justify-between items-center text-lg font-bold text-primary">
              <span>{t('discount')}</span>
              <span>-{t('currency_symbol')}{couponDiscount.toLocaleString('bn-BD')}</span>
            </div>
          )}
          <div className="flex justify-between items-end pt-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                {t('grand_total')}
              </span>
              <div className="text-5xl font-black text-foreground">
                {t('currency_symbol')}{finalTotal.toLocaleString('bn-BD')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-xl border border-border flex items-center gap-4 relative">
          <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center text-primary shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-xs font-black text-muted-foreground leading-relaxed">
            {t('secure_info_text')}
          </p>
        </div>
      </div>
    </div>
  );
}
