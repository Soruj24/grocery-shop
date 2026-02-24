import {
  MapPin,
  User,
  Phone,
  CreditCard,
  ShoppingBag,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Clock,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CheckoutFormProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    name: string;
    phone: string;
    address: string;
  };
  setFormData: (data: Partial<CheckoutFormProps["formData"]>) => void;
  deliverySlot: string;
  setDeliverySlot: (slot: string) => void;
  paymentMethod: "cod" | "bkash" | "nagad" | "card";
  setPaymentMethod: (method: "cod" | "bkash" | "nagad" | "card") => void;
  transactionId: string;
  setTransactionId: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  totalPrice: number;
  cart: CartItem[];
}

export default function CheckoutForm({
  currentStep,
  nextStep,
  prevStep,
  formData,
  setFormData,
  deliverySlot,
  setDeliverySlot,
  paymentMethod,
  setPaymentMethod,
  transactionId,
  setTransactionId,
  handleSubmit,
  loading,
  totalPrice,
  cart,
}: CheckoutFormProps) {
  const { t } = useLanguage();

  const timeSlots = [
    t('delivery_slot_morning'),
    t('delivery_slot_afternoon'),
    t('delivery_slot_evening'),
    t('delivery_slot_night'),
  ];

  const isStep1Valid =
    formData.name.trim() !== "" && 
    formData.phone.trim().length >= 11 && 
    formData.address.trim() !== "";
  const isStep2Valid = !!deliverySlot;
  const isStep3Valid =
    paymentMethod === "cod" || transactionId.trim().length >= 8;

  return (
    <div className="space-y-8">
      {/* Step 1: Shipping Info */}
      {currentStep === 1 && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t('checkout_step_1')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                {t('full_name')}
              </label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="text"
                  required
                  placeholder={t('name_placeholder')}
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                {t('phone_number')}
              </label>
              <div className="relative group">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="tel"
                  required
                  placeholder={t('phone_placeholder')}
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>



            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                {t('detailed_address')}
              </label>
              <div className="relative group">
                <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <textarea
                  required
                  placeholder={t('address_placeholder')}
                  className="w-full pl-16 pr-6 py-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all h-32 font-bold"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!isStep1Valid}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 disabled:opacity-50 active:scale-95"
          >
            {t('continue')}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Step 2: Delivery Slot */}
      {currentStep === 2 && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
              <Clock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t('delivery_time_label')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setDeliverySlot(slot)}
                className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 text-center ${
                  deliverySlot === slot
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    deliverySlot === slot
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-300"
                  }`}
                >
                  <Clock className="w-6 h-6" />
                </div>
                <span className="font-black text-sm">{slot}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-6 h-6" />
              {t('back_to_prev')}
            </button>
            <button
              onClick={nextStep}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20"
            >
              {t('next_step')}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {currentStep === 3 && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600">
              <CreditCard className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t('payment_method')}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "cod", name: t('cod_payment'), icon: ShoppingBag },
              { id: "bkash", name: t('bkash_payment'), icon: Smartphone },
              { id: "nagad", name: t('nagad_payment'), icon: Smartphone },
              { id: "card", name: t('card_payment'), icon: CreditCard },
            ].map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as "cod" | "bkash" | "nagad" | "card")}
                className={`p-4 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                  paymentMethod === method.id
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    paymentMethod === method.id
                      ? "bg-green-600 text-white"
                      : "bg-white dark:bg-gray-900 text-gray-300"
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                </div>
                <span className="font-black text-[10px] uppercase tracking-wider">
                  {method.name}
                </span>
              </button>
            ))}
          </div>

          {paymentMethod !== "cod" && (
            <div className="p-6 bg-gray-900 text-white rounded-[32px] space-y-4">
              <p className="text-xs font-bold opacity-70 italic text-center">
                {t('payment_instruction')}
              </p>
              <input
                type="text"
                placeholder={t('transaction_id_placeholder')}
                className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all font-bold text-center"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-6 h-6" />
              {t('back_to_prev')}
            </button>
            <button
              onClick={nextStep}
              disabled={!isStep3Valid}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 disabled:opacity-50"
            >
              {t('next_step')}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Order Review */}
      {currentStep === 4 && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
              <ClipboardList className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t('order_review')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                {t('delivery_address_label')}
              </h4>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {formData.name}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {formData.phone}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-2">
                {formData.address}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                {t('time_and_payment')}
              </h4>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold">{deliverySlot}</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold uppercase">
                  {t(`${paymentMethod}_payment`)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevStep}
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-6 h-6" />
              {t('back_to_prev')}
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? t('ordering_status') : t('confirm_order')}
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
