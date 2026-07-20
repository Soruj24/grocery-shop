
import { MapPin, Phone, Package, Truck } from "lucide-react";
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

export default function DeliveryInfoSection({ address, phone, deliveryBoy, t }: DeliveryInfoSectionProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl border border-border shadow-xl space-y-6">
        <h3 className="text-xl font-black flex items-center gap-3">
          <MapPin className="text-danger" />
          {t("delivery_address")}
        </h3>
        <div className="space-y-2">
          <p className="font-bold text-muted-foreground">{address}</p>
          <p className="font-black text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" /> {phone}
          </p>
        </div>
      </div>
      {deliveryBoy && (
        <div className="bg-card/80 backdrop-blur-xl p-8 rounded-2xl border border-border shadow-xl space-y-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <Truck className="text-info" />
            {t("delivery_boy")}
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-info-subtle flex items-center justify-center text-info">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="font-black text-lg text-foreground">{deliveryBoy.name}</p>
              <p className="font-bold text-info flex items-center gap-2">
                <Phone className="w-4 h-4" /> {deliveryBoy.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
