import {
  MapPin,
  Phone,
  Package,
  Truck,
} from "lucide-react";
import { TranslationKey } from "@/constants/translations";

interface DeliveryBoy {
  name: string;
  phone: string;
}

interface DeliveryInfoSectionProps {
  address: string;
  phone: string;
  deliveryBoy?: DeliveryBoy;
  t: (key: TranslationKey) => string;
}

export default function DeliveryInfoSection({
  address,
  phone,
  deliveryBoy,
  t,
}: DeliveryInfoSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card p-6 rounded-xl border border-border shadow-xs space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2.5">
          <MapPin className="w-4 h-4 text-muted-foreground/50" />
          {t("delivery_address")}
        </h3>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-muted-foreground/60">
            {address}
          </p>
          <p className="text-sm font-bold text-foreground flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-muted-foreground/40" />{" "}
            {phone}
          </p>
        </div>
      </div>
      {deliveryBoy && (
        <div className="bg-card p-6 rounded-xl border border-border shadow-xs space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-muted-foreground/50" />
            {t("delivery_boy")}
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-muted-foreground/50">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                {deliveryBoy.name}
              </p>
              <p className="text-xs font-medium text-muted-foreground/60 flex items-center gap-1.5">
                <Phone className="w-3 h-3" />{" "}
                {deliveryBoy.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
