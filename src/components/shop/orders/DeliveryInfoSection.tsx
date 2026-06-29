
import { MapPin, Phone, Package, Truck } from "lucide-react";
import { TranslationKey } from "@/lib/constants/translations";

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
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl space-y-6">
        <h3 className="text-xl font-black flex items-center gap-3">
          <MapPin className="text-rose-500" />
          {t("delivery_address")}
        </h3>
        <div className="space-y-2">
          <p className="font-bold text-gray-600 dark:text-gray-400">{address}</p>
          <p className="font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-600" /> {phone}
          </p>
        </div>
      </div>
      {deliveryBoy && (
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl space-y-6">
          <h3 className="text-xl font-black flex items-center gap-3">
            <Truck className="text-blue-500" />
            {t("delivery_boy")}
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="font-black text-lg text-gray-900 dark:text-white">{deliveryBoy.name}</p>
              <p className="font-bold text-blue-600 flex items-center gap-2">
                <Phone className="w-4 h-4" /> {deliveryBoy.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
