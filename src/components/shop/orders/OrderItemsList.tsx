import Image from "next/image";
import { TranslationKey } from "@/lib/translations";
import { getProductFallbackImage } from "@/lib/category-utils";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  product: { image?: string };
}

interface OrderItemsListProps {
  items: OrderItem[];
  t: (key: TranslationKey) => string;
}

export default function OrderItemsList({ items, t }: OrderItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-4 group/item">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
            <Image src={item.product?.image || getProductFallbackImage(item.name)} alt={item.name} fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-800 dark:text-gray-100 truncate group-hover/item:text-green-600 dark:group-hover/item:text-green-500 transition-colors">{item.name}</p>
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500">{item.quantity.toLocaleString("bn-BD")} x {t("currency_symbol")}{item.price.toLocaleString("bn-BD")}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-gray-800 dark:text-gray-100">{t("currency_symbol")}{(item.quantity * item.price).toLocaleString("bn-BD")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
