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

export default function OrderItemsList({
  items,
  t,
}: OrderItemsListProps) {
  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3"
        >
          <div className="w-14 h-14 bg-muted rounded-lg border border-border overflow-hidden shrink-0 relative">
            <Image
              src={
                item.product?.image ||
                getProductFallbackImage(
                  item.name
                )
              }
              alt={item.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {item.name}
            </p>
            <p className="text-[10px] font-medium text-muted-foreground/50">
              {item.quantity.toLocaleString(
                "bn-BD"
              )}{" "}
              x{" "}
              {t("currency_symbol")}
              {item.price.toLocaleString(
                "bn-BD"
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-foreground">
              {t("currency_symbol")}
              {(
                item.quantity * item.price
              ).toLocaleString("bn-BD")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
