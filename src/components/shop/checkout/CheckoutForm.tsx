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
    area: string;
    division: string;
    district: string;
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

const locations = {
  Dhaka: {
    districts: ["Dhaka", "Gazipur", "Narayanganj"],
    areas: ["Dhanmondi", "Gulshan", "Banani", "Uttara", "Mirpur", "Mohammadpur", "Badda", "Bashundhara"]
  },
  Chittagong: {
    districts: ["Chittagong", "Cox's Bazar", "Comilla"],
    areas: ["Agrabad", "Nasirabad", "Panchlaish", "Halishahar"]
  },
  Sylhet: {
    districts: ["Sylhet", "Moulvibazar", "Habiganj"],
    areas: ["Zindabazar", "Ambarkhana", "Uposhahar"]
  }
};

const timeSlots = [
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 3 PM)",
  "Evening (3 PM - 6 PM)",
  "Night (6 PM - 9 PM)",
];

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
  const isStep1Valid =
    formData.name.trim() !== "" && 
    formData.phone.trim().length >= 11 && 
    formData.address.trim() !== "" && 
    formData.division !== "" &&
    formData.district !== "" &&
    formData.area !== "";
  const isStep2Valid = !!deliverySlot;
  const isStep3Valid =
    paymentMethod === "cod" || transactionId.trim().length >= 8;

  const divisions = Object.keys(locations);
  const selectedDivision = formData.division as keyof typeof locations;
  const districts = selectedDivision ? locations[selectedDivision].districts : [];
  const areas = selectedDivision ? locations[selectedDivision].areas : [];

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
              ডেলিভারি তথ্য
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                পুরো নাম
              </label>
              <div className="relative group">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম লিখুন"
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
                ফোন নম্বর
              </label>
              <div className="relative group">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <input
                  type="tel"
                  required
                  placeholder="০১XXXXXXXXX"
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                বিভাগ
              </label>
              <select
                className="w-full px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold appearance-none cursor-pointer"
                value={formData.division}
                onChange={(e) =>
                  setFormData({ ...formData, division: e.target.value, district: "", area: "" })
                }
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {divisions.map((division) => (
                  <option key={division} value={division}>
                    {division}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                জেলা
              </label>
              <select
                className="w-full px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold appearance-none cursor-pointer disabled:opacity-50"
                value={formData.district}
                disabled={!formData.division}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
              >
                <option value="">জেলা নির্বাচন করুন</option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                এলাকা
              </label>
              <select
                className="w-full px-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold appearance-none cursor-pointer disabled:opacity-50"
                value={formData.area}
                disabled={!formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
              >
                <option value="">এলাকা নির্বাচন করুন</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                বিস্তারিত ঠিকানা
              </label>
              <div className="relative group">
                <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
                <textarea
                  required
                  placeholder="বাসা নম্বর, রোড নম্বর, ল্যান্ডমার্ক ইত্যাদি"
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
            পরবর্তী ধাপ
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
              ডেলিভারি সময়
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
              ফিরে যান
            </button>
            <button
              onClick={nextStep}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20"
            >
              পরবর্তী ধাপ
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
              পেমেন্ট পদ্ধতি
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { id: "cod", name: "Cash on Delivery", icon: ShoppingBag },
              { id: "bkash", name: "bKash", icon: Smartphone },
              { id: "nagad", name: "Nagad", icon: Smartphone },
              { id: "card", name: "Card", icon: CreditCard },
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
                অনুগ্রহ করে পেমেন্ট করার পর ট্রানজেকশন আইডি দিন
              </p>
              <input
                type="text"
                placeholder="Transaction ID (e.g. 8N7A6D5C)"
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
              ফিরে যান
            </button>
            <button
              onClick={nextStep}
              disabled={!isStep3Valid}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 disabled:opacity-50"
            >
              পরবর্তী ধাপ
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
              অর্ডার রিভিউ
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                ডেলিভারি ঠিকানা
              </h4>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {formData.name}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {formData.phone}
              </p>
              <p className="text-sm text-gray-500 font-medium mt-2">
                {formData.address}, {formData.area}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                সময় ও পেমেন্ট
              </h4>
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold">{deliverySlot}</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-green-500" />
                <span className="text-sm font-bold uppercase">
                  {paymentMethod}
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
              ফিরে যান
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? "অর্ডার হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
              <CheckCircle2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
