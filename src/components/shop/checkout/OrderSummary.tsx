import { ShoppingBag, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";

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
  const { t, language } = useLanguage();
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const vat = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + vat - couponDiscount;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-[48px] shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24 space-y-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full -mr-16 -mt-16" />

        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight relative">
          {t('order_summary')}
        </h3>

        <div className="space-y-6 relative max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 group">
              <div className="relative w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700">
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
                <h4 className="font-black text-gray-900 dark:text-white truncate">
                  {item.name}
                </h4>
                <p className="text-sm font-bold text-gray-400">
                  {t('currency_symbol')}{item.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} x {item.quantity.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </p>
              </div>
              <span className="font-black text-gray-900 dark:text-white">
                {t('currency_symbol')}{(item.price * item.quantity).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-6 relative pt-10 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center text-lg font-bold text-gray-500 dark:text-gray-400">
            <span>{t('subtotal')}</span>
            <span>{t('currency_symbol')}{totalPrice.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-gray-500 dark:text-gray-400">
            <span>{t('delivery_charge')}</span>
            <span>{deliveryFee === 0 ? t('free') : `${t('currency_symbol')}${deliveryFee.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}`}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold text-gray-500 dark:text-gray-400">
            <span>{t('vat')}{t('vat_percentage')}</span>
            <span>{t('currency_symbol')}{vat.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
          </div>
          {couponDiscount > 0 && (
            <div className="flex justify-between items-center text-lg font-bold text-green-600">
              <span>{t('discount')}</span>
              <span>-{t('currency_symbol')}{couponDiscount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
            </div>
          )}
          <div className="flex justify-between items-end pt-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                {t('grand_total')}
              </span>
              <div className="text-5xl font-black text-gray-900 dark:text-white">
                {t('currency_symbol')}{finalTotal.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 flex items-center gap-4 relative">
          <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-green-600 shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <p className="text-xs font-black text-gray-500 dark:text-gray-400 leading-relaxed">
            {t('secure_info_text')}
          </p>
        </div>
      </div>
    </div>
  );
}
