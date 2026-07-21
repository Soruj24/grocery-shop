"use client";

import { useState, useEffect, useCallback } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  type CheckoutState,
  type GuestInfo,
  type SavedAddress,
  type ShippingMethod,
  type DeliverySlot,
  type PaymentMethod,
  type AppliedCoupon,
  type CheckoutCartItem,
  SHIPPING_METHODS,
  DELIVERY_SLOTS,
} from "@/types/checkout";

const initialState: CheckoutState = {
  currentStep: 1,
  isGuest: false,
  guestInfo: { name: "", phone: "", email: "" },
  selectedAddress: null,
  customAddress: "",
  customName: "",
  customPhone: "",
  shippingMethod: SHIPPING_METHODS[0],
  deliverySlot: DELIVERY_SLOTS[0],
  paymentMethod: "cod",
  transactionId: "",
  appliedCoupon: null,
  isSubmitting: false,
  isComplete: false,
  error: null,
  orderId: null,
};

export function useCheckout() {
  const { t } = useLanguage();
  const { cart, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon");

  const [state, setState] = useState<CheckoutState>(initialState);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [useCustomAddress, setUseCustomAddress] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0 && !state.isComplete && !state.isSubmitting) {
      router.push("/cart");
    }
  }, [cart.length, state.isComplete, state.isSubmitting, router]);

  // Pre-fill from session
  useEffect(() => {
    if (session?.user) {
      setState((prev) => ({
        ...prev,
        isGuest: false,
        guestInfo: {
          name: session.user.name || "",
          phone: (session.user as { phone?: string }).phone || "",
          email: session.user.email || "",
        },
        customName: session.user.name || "",
        customPhone: (session.user as { phone?: string }).phone || "",
        customAddress: (session.user as { address?: string }).address || "",
      }));
    }
  }, [session]);

  // Auto-apply coupon from URL
  useEffect(() => {
    if (!couponCode || totalPrice <= 0) return;
    (async () => {
      try {
        const res = await fetch("/api/coupons/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: couponCode, total: totalPrice }),
        });
        const data = await res.json();
        if (res.ok) {
          setState((prev) => ({
            ...prev,
            appliedCoupon: {
              code: data.code,
              discount: data.discount,
              discountType: data.discountType,
              discountValue: data.discountValue,
            },
          }));
        }
      } catch {
        /* ignore */
      }
    })();
  }, [couponCode, totalPrice]);

  const updateField = useCallback(
    <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => {
      setState((prev) => ({ ...prev, [field]: value }));
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    },
    []
  );

  const validateStep = useCallback(
    (step: number): boolean => {
      const errors: Record<string, string> = {};

      if (step === 1) {
        if (state.isGuest || !session) {
          if (!state.guestInfo.name.trim()) errors.name = t("name_required");
          if (!state.guestInfo.phone.trim()) {
            errors.phone = t("phone_required");
          } else if (state.guestInfo.phone.replace(/\D/g, "").length < 11) {
            errors.phone = t("phone_min_11");
          }
        }

        const hasSelectedAddress = state.selectedAddress && !useCustomAddress;
        const hasCustomAddress =
          useCustomAddress && state.customAddress.trim();
        if (!hasSelectedAddress && !hasCustomAddress) {
          errors.address = t("address_required");
        }
        if (useCustomAddress) {
          if (!state.customName.trim()) errors.customName = t("name_required");
          if (!state.customPhone.trim()) {
            errors.customPhone = t("phone_required");
          }
        }
      }

      if (step === 3) {
        const pm = state.paymentMethod;
        if (pm !== "cod") {
          if (!state.transactionId.trim()) {
            errors.transactionId = t("transaction_id_required");
          } else if (state.transactionId.trim().length < 8) {
            errors.transactionId = t("transaction_id_min");
          }
        }
      }

      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [state, session, useCustomAddress, t]
  );

  const nextStep = useCallback(() => {
    if (!validateStep(state.currentStep)) return;
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 4),
    }));
  }, [state.currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1),
    }));
  }, []);

  const goToStep = useCallback(
    (step: number) => {
      if (step < state.currentStep) {
        setState((prev) => ({ ...prev, currentStep: step }));
      }
    },
    [state.currentStep]
  );

  const toggleGuest = useCallback(() => {
    setState((prev) => ({ ...prev, isGuest: !prev.isGuest }));
  }, []);

  const selectAddress = useCallback((addr: SavedAddress) => {
    setState((prev) => ({ ...prev, selectedAddress: addr }));
    setUseCustomAddress(false);
  }, []);

  const addAddress = useCallback((addr: SavedAddress) => {
    setAddresses((prev) => [...prev, addr]);
    setState((prev) => ({ ...prev, selectedAddress: addr }));
  }, []);

  const deleteAddress = useCallback(
    (id: string) => {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      if (state.selectedAddress?.id === id) {
        setState((prev) => ({ ...prev, selectedAddress: null }));
      }
    },
    [state.selectedAddress]
  );

  const applyCoupon = useCallback((coupon: AppliedCoupon) => {
    setState((prev) => ({ ...prev, appliedCoupon: coupon }));
    router.replace(`/checkout?coupon=${coupon.code}`);
  }, [router]);

  const removeCoupon = useCallback(() => {
    setState((prev) => ({ ...prev, appliedCoupon: null }));
    router.replace("/checkout");
  }, [router]);

  const handleSubmit = useCallback(async () => {
    if (cart.length === 0) return;

    const result = await Swal.fire({
      title: t("confirm_order_question"),
      text: `${t("confirm_order_desc")} ৳${(
        totalPrice +
        state.shippingMethod.price -
        (state.appliedCoupon?.discount || 0)
      ).toLocaleString()}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: t("yes_confirm"),
      cancelButtonText: t("no_go_back"),
      background: document.documentElement.classList.contains("dark")
        ? "#111827"
        : "#fff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#111827",
    });

    if (!result.isConfirmed) return;

    setState((prev) => ({ ...prev, isSubmitting: true, error: null }));

    const finalTotal =
      totalPrice + state.shippingMethod.price - (state.appliedCoupon?.discount || 0);
    const deliveryAddress = useCustomAddress
      ? `${state.customName}, ${state.customPhone}, ${state.customAddress}`
      : state.selectedAddress
      ? `${state.selectedAddress.name}, ${state.selectedAddress.phone}, ${state.selectedAddress.address}`
      : "";

    const isGuest = state.isGuest || !session;
    const apiEndpoint = isGuest ? "/api/orders/guest" : "/api/orders";

    const body: Record<string, unknown> = {
      items: cart.map((item: CheckoutCartItem) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: finalTotal,
      address: deliveryAddress,
      phone: useCustomAddress
        ? state.customPhone
        : state.selectedAddress?.phone || state.guestInfo.phone,
      name: useCustomAddress
        ? state.customName
        : state.selectedAddress?.name || state.guestInfo.name,
      paymentMethod: state.paymentMethod,
      transactionId:
        state.paymentMethod !== "cod" ? state.transactionId : undefined,
      coupon: state.appliedCoupon
        ? { code: state.appliedCoupon.code, discount: state.appliedCoupon.discount }
        : undefined,
      deliveryMethod: state.shippingMethod.id,
      deliverySlot: state.deliverySlot.id,
    };

    if (isGuest) {
      body.email = state.guestInfo.email;
    }

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        addNotification({
          title: t("order_placed_successfully"),
          message: `${t("order_confirmation_sent")} #${data._id.slice(-8).toUpperCase()}`,
          type: "success",
        });
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          isComplete: true,
          orderId: data._id,
        }));
        clearCart();
      } else {
        setState((prev) => ({
          ...prev,
          isSubmitting: false,
          error: data.message || "Failed to place order",
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: "Server issue. Please try again.",
      }));
    }
  }, [
    cart,
    totalPrice,
    state.shippingMethod,
    state.appliedCoupon,
    state.paymentMethod,
    state.transactionId,
    state.selectedAddress,
    state.guestInfo,
    state.customName,
    state.customPhone,
    state.customAddress,
    state.isGuest,
    state.deliverySlot,
    useCustomAddress,
    session,
    t,
    addNotification,
    clearCart,
  ]);

  const shippingCost = state.shippingMethod.price;
  const discount = state.appliedCoupon?.discount || 0;
  const total = totalPrice + shippingCost - discount;

  return {
    ...state,
    addresses,
    useCustomAddress,
    validationErrors,
    totalPrice,
    cart,
    shippingCost,
    discount,
    total,
    status,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    toggleGuest,
    selectAddress,
    addAddress,
    deleteAddress,
    setUseCustomAddress,
    applyCoupon,
    removeCoupon,
    handleSubmit,
    router,
    t,
  };
}
