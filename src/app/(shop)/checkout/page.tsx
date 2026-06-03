"use client";

import { ArrowLeft, MapPin, Clock, CreditCard, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCheckout } from "@/hooks/useCheckout";
import CheckoutStepper from "@/components/shop/checkout/CheckoutStepper";
import OrderSuccess from "@/components/shop/checkout/OrderSuccess";
import CheckoutForm from "@/components/shop/checkout/CheckoutForm";
import OrderSummary from "@/components/shop/checkout/OrderSummary";
import CouponInput from "@/components/shop/checkout/CouponInput";

export default function CheckoutPage() {
  const {
    status, currentStep, formData, updateFormData, deliverySlot, setDeliverySlot,
    paymentMethod, setPaymentMethod, transactionId, setTransactionId,
    loading, orderSuccess, couponDiscount, setCouponDiscount,
    totalPrice, cart, nextStep, prevStep, handleSubmit, couponCode, router, t,
  } = useCheckout();

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" /></div>;
  if (orderSuccess) return <OrderSuccess />;
  if (cart.length === 0 && !orderSuccess) return null;

  const steps = [
    { id: 1, name: t("checkout_step_1"), icon: MapPin },
    { id: 2, name: t("checkout_step_2"), icon: Clock },
    { id: 3, name: t("checkout_step_3"), icon: CreditCard },
    { id: 4, name: t("checkout_step_4"), icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 space-y-12 relative z-10">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <button onClick={() => currentStep === 1 ? router.push("/cart") : prevStep()}
              className="p-3 bg-white dark:bg-gray-900 rounded-2xl text-gray-400 hover:text-green-600 shadow-sm transition-all">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t("checkout_title")}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-bold">{t("step_text")} {currentStep}: {steps[currentStep - 1].name}</p>
            </div>
          </div>
          <CheckoutStepper currentStep={currentStep} steps={steps} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <CheckoutForm currentStep={currentStep} nextStep={nextStep} prevStep={prevStep}
                  formData={formData} setFormData={updateFormData}
                  deliverySlot={deliverySlot} setDeliverySlot={setDeliverySlot}
                  paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                  transactionId={transactionId} setTransactionId={setTransactionId}
                  handleSubmit={handleSubmit} loading={loading} totalPrice={totalPrice} cart={cart} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:col-span-1 sticky top-12 space-y-6">
            <CouponInput total={totalPrice}
              onApply={(coupon) => { setCouponDiscount(coupon.discount); router.replace(`/checkout?coupon=${coupon.code}`); }}
              onRemove={() => { setCouponDiscount(0); router.replace("/checkout"); }} />
            <OrderSummary cart={cart} totalPrice={totalPrice} couponDiscount={couponDiscount} />
          </div>
        </div>
      </div>
    </div>
  );
}
