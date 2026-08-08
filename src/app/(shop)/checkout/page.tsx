"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useCheckout } from "@/features/checkout/hooks/useCheckout";
import CheckoutStepper from "@/features/checkout/components/CheckoutStepper";
import CheckoutSkeleton from "@/features/checkout/components/CheckoutSkeleton";
import MobileCheckoutBar from "@/features/checkout/components/MobileCheckoutBar";
import ShippingStep from "@/features/checkout/components/steps/ShippingStep";
import DeliveryStep from "@/features/checkout/components/steps/DeliveryStep";
import PaymentStep from "@/features/checkout/components/steps/PaymentStep";
import ReviewStep from "@/features/checkout/components/steps/ReviewStep";
import OrderSummary from "@/features/checkout/components/steps/OrderSummary";
import OrderSuccess from "@/features/checkout/components/steps/OrderSuccess";

export default function CheckoutPage() {
  const checkout = useCheckout();

  if (checkout.status === "loading")
    return <CheckoutSkeleton />;
  if (checkout.isComplete && checkout.orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <OrderSuccess
            orderId={checkout.orderId}
            guestName={
              checkout.guestInfo.name ||
              checkout.customName
            }
            total={checkout.total}
          />
        </div>
      </div>
    );
  }
  if (
    checkout.cart.length === 0 &&
    !checkout.isComplete
  )
    return null;

  const steps = [
    {
      number: 1,
      label: checkout.t("step_information"),
    },
    {
      number: 2,
      label: checkout.t("step_delivery"),
    },
    {
      number: 3,
      label: checkout.t("step_payment"),
    },
    {
      number: 4,
      label: checkout.t("step_review"),
    },
  ];

  const getDeliveryAddress = () => {
    if (checkout.useCustomAddress) {
      return checkout.customAddress;
    }
    if (checkout.selectedAddress) {
      return checkout.selectedAddress.address;
    }
    return "";
  };

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() =>
              checkout.currentStep === 1
                ? checkout.router.push("/cart")
                : checkout.prevStep()
            }
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.04] text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              {checkout.t("checkout")}
            </h1>
            <p className="text-xs font-medium text-muted-foreground/50">
              {checkout.t("step_text")}{" "}
              {checkout.currentStep}:{" "}
              {steps[checkout.currentStep - 1]
                ?.label}
            </p>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <CheckoutStepper
            steps={steps}
            currentStep={checkout.currentStep}
            onStepClick={checkout.goToStep}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 items-start">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {checkout.currentStep === 1 && (
                <ShippingStep
                  key="shipping"
                  isGuest={checkout.isGuest}
                  guestInfo={checkout.guestInfo}
                  onGuestInfoChange={(info) =>
                    checkout.updateField(
                      "guestInfo",
                      info
                    )
                  }
                  onToggleGuest={
                    checkout.toggleGuest
                  }
                  addresses={checkout.addresses}
                  selectedAddressId={
                    checkout.selectedAddress?.id ||
                    null
                  }
                  onSelectAddress={
                    checkout.selectAddress
                  }
                  onAddAddress={
                    checkout.addAddress
                  }
                  onDeleteAddress={
                    checkout.deleteAddress
                  }
                  customAddress={
                    checkout.customAddress
                  }
                  customName={
                    checkout.customName
                  }
                  customPhone={
                    checkout.customPhone
                  }
                  onCustomChange={(
                    field,
                    value
                  ) => {
                    if (field === "name")
                      checkout.updateField(
                        "customName",
                        value
                      );
                    else if (
                      field === "phone"
                    )
                      checkout.updateField(
                        "customPhone",
                        value
                      );
                    else if (
                      field === "address"
                    )
                      checkout.updateField(
                        "customAddress",
                        value
                      );
                  }}
                  useCustomAddress={
                    checkout.useCustomAddress
                  }
                  onToggleCustomAddress={() =>
                    checkout.setUseCustomAddress(
                      !checkout.useCustomAddress
                    )
                  }
                  errors={
                    checkout.validationErrors
                  }
                />
              )}

              {checkout.currentStep === 2 && (
                <DeliveryStep
                  key="delivery"
                  selectedShipping={
                    checkout.shippingMethod
                  }
                  onSelectShipping={(m) =>
                    checkout.updateField(
                      "shippingMethod",
                      m
                    )
                  }
                  selectedSlot={
                    checkout.deliverySlot
                  }
                  onSelectSlot={(s) =>
                    checkout.updateField(
                      "deliverySlot",
                      s
                    )
                  }
                  cartTotal={
                    checkout.totalPrice
                  }
                />
              )}

              {checkout.currentStep === 3 && (
                <PaymentStep
                  key="payment"
                  selectedMethod={
                    checkout.paymentMethod
                  }
                  onSelectMethod={(m) =>
                    checkout.updateField(
                      "paymentMethod",
                      m
                    )
                  }
                  transactionId={
                    checkout.transactionId
                  }
                  onTransactionIdChange={(id) =>
                    checkout.updateField(
                      "transactionId",
                      id
                    )
                  }
                  error={
                    checkout.validationErrors
                      .transactionId
                  }
                />
              )}

              {checkout.currentStep === 4 && (
                <ReviewStep
                  key="review"
                  guestInfo={
                    checkout.useCustomAddress
                      ? {
                          name: checkout.customName,
                          phone: checkout.customPhone,
                          email: checkout.guestInfo.email,
                        }
                      : checkout.selectedAddress
                      ? {
                          name: checkout.selectedAddress.name,
                          phone: checkout.selectedAddress.phone,
                          email: "",
                        }
                      : checkout.guestInfo
                  }
                  deliveryAddress={getDeliveryAddress()}
                  shipping={checkout.shippingMethod}
                  deliverySlot={checkout.deliverySlot}
                  paymentMethod={checkout.paymentMethod}
                  transactionId={checkout.transactionId}
                  coupon={checkout.appliedCoupon}
                  items={checkout.cart}
                  subtotal={checkout.totalPrice}
                />
              )}
            </AnimatePresence>

            {checkout.error && (
              <div className="mt-4 rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-500/[0.04] p-3 text-sm text-rose-600 dark:text-rose-400">
                {checkout.error}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-12">
              <OrderSummary
                items={checkout.cart}
                subtotal={checkout.totalPrice}
                shippingCost={checkout.shippingCost}
                discount={checkout.discount}
                coupon={checkout.appliedCoupon}
                onCouponApply={checkout.applyCoupon}
                onCouponRemove={
                  checkout.removeCoupon
                }
                total={checkout.total}
                currentStep={checkout.currentStep}
                isSubmitting={checkout.isSubmitting}
                onNext={checkout.nextStep}
                onPlaceOrder={checkout.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      <MobileCheckoutBar
        total={checkout.totalPrice}
        shippingCost={checkout.shippingCost}
        discount={checkout.discount}
        isSubmitting={checkout.isSubmitting}
        onPlaceOrder={checkout.handleSubmit}
        currentStep={checkout.currentStep}
        onNext={checkout.nextStep}
        nextLabel={
          checkout.currentStep === 1
            ? checkout.t("continue_to_shipping")
            : checkout.currentStep === 2
            ? checkout.t("continue_to_payment")
            : checkout.currentStep === 3
            ? checkout.t("continue_to_review")
            : checkout.t("place_order")
        }
      />
    </div>
  );
}
