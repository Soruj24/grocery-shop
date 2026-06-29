"use client";

import type { CheckoutFormData, PaymentMethod, CheckoutCartItem } from "@/types/checkout";
import ShippingStep from "./ShippingStep";
import DeliveryStep from "./DeliveryStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";

interface CheckoutFormProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: CheckoutFormData;
  setFormData: (data: Partial<CheckoutFormData>) => void;
  deliverySlot: string;
  setDeliverySlot: (slot: string) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  transactionId: string;
  setTransactionId: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  totalPrice: number;
  cart: CheckoutCartItem[];
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
  return (
    <div className="space-y-8">
      {currentStep === 1 && (
        <ShippingStep
          formData={formData}
          onChange={setFormData}
          onNext={nextStep}
        />
      )}
      {currentStep === 2 && (
        <DeliveryStep
          deliverySlot={deliverySlot}
          onSlotChange={setDeliverySlot}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {currentStep === 3 && (
        <PaymentStep
          paymentMethod={paymentMethod}
          onMethodChange={setPaymentMethod}
          transactionId={transactionId}
          onTransactionIdChange={setTransactionId}
          onNext={nextStep}
          onPrev={prevStep}
        />
      )}
      {currentStep === 4 && (
        <ReviewStep
          formData={formData}
          deliverySlot={deliverySlot}
          paymentMethod={paymentMethod}
          onSubmit={handleSubmit}
          loading={loading}
          onPrev={prevStep}
        />
      )}
    </div>
  );
}
