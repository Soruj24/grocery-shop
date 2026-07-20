import Image from "next/image";
import { TranslationKey } from "@/constants/translations";
import { getProductFallbackImage } from "@/constants/fallback-images";

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
          <div className="w-16 h-16 bg-muted rounded-2xl border border-border overflow-hidden flex-shrink-0 flex items-center justify-center relative">
            <Image src={item.product?.image || getProductFallbackImage(item.name)} alt={item.name} fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-foreground truncate group-hover/item:text-primary transition-colors">{item.name}</p>
            <p className="text-xs font-bold text-muted-foreground">{item.quantity.toLocaleString("bn-BD")} x {t("currency_symbol")}{item.price.toLocaleString("bn-BD")}</p>
          </div>
          <div className="text-right">
            <p className="font-black text-foreground">{t("currency_symbol")}{(item.quantity * item.price).toLocaleString("bn-BD")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
