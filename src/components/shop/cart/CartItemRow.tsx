import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
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

interface CartItemRowProps {
  item: CartItem;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function CartItemRow({
  item,
  removeFromCart,
  updateQuantity,
}: CartItemRowProps) {
  const { t } = useLanguage();
  return (
    <div className="group bg-white dark:bg-gray-900 p-6 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-8 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-500">
      <div className="w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-[32px] flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700 group-hover:scale-105 transition-transform duration-500">
        <Image
          src={item.image || getProductFallbackImage(item.name)}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 128px, 128px"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
          {item.name}
        </h3>
        <div className="flex items-center justify-center sm:justify-start gap-4">
          <span className="text-green-600 dark:text-green-400 font-black text-xl">
            {t('currency_symbol')}{item.price.toLocaleString('bn-BD')}
          </span>
          <span className="text-sm font-bold text-gray-400">{t('unit_kg')}</span>
        </div>
      </div>

      <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-800 p-2 rounded-[24px] border border-gray-100 dark:border-gray-700">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-90"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="w-8 text-center font-black text-gray-900 dark:text-white text-xl animate-in fade-in zoom-in duration-300">
          {item.quantity.toLocaleString('bn-BD')}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-900 rounded-2xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-green-600 transition-all active:scale-90"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="font-black text-2xl text-gray-900 dark:text-white">
          {t('currency_symbol')}{(item.price * item.quantity).toLocaleString('bn-BD')}
        </span>
        <button
          onClick={() => removeFromCart(item._id)}
          className="p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
