"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckoutFormData, PaymentMethod } from "@/types/checkout";

export function useCheckout() {
  const { t } = useLanguage();
  const { cart, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon");

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({ name: "", phone: "", address: "" });
  const [deliverySlot, setDeliverySlot] = useState(t("delivery_slot_morning"));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const updateFormData = (data: Partial<CheckoutFormData>) => setFormData(prev => ({ ...prev, ...data }));
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login?callbackUrl=/checkout");
  }, [status, router]);

  useEffect(() => {
    if (!session?.user) return;
    setFormData({
      name: session.user.name || "",
      phone: (session.user as { phone?: string }).phone || "",
      address: (session.user as { address?: string }).address || "",
    });
  }, [session]);

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
        if (res.ok) setCouponDiscount(data.discount);
      } catch { /* ignore */ }
    })();
  }, [couponCode, totalPrice]);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess && !loading) router.push("/cart");
  }, [cart.length, orderSuccess, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const result = await Swal.fire({
      title: t("confirm_order_title"), text: t("confirm_order_text"), icon: "question",
      showCancelButton: true, confirmButtonColor: "#16a34a", cancelButtonColor: "#ef4444",
      confirmButtonText: t("yes_order"), cancelButtonText: t("no_go_back"),
      background: "#fff", color: "#000",
    });
    if (!result.isConfirmed) return;

    setLoading(true);
    setError("");

    const deliveryFee = totalPrice > 500 ? 0 : 50;
    const vat = Math.round(totalPrice * 0.05);
    const finalTotal = totalPrice + deliveryFee + vat - couponDiscount;

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({ product: item._id, name: item.name, price: item.price, quantity: item.quantity })),
          total: finalTotal, address: formData.address, phone: formData.phone,
          paymentMethod, transactionId: paymentMethod !== "cod" ? transactionId : undefined,
          paymentStatus: paymentMethod !== "cod" ? "paid" : "unpaid",
          coupon: couponCode || undefined, deliverySlot,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        addNotification({
          title: t("order_success_title"),
          message: `${t("order_success_desc")} ${t("order_id")}: #${data._id.slice(-8).toUpperCase()}`,
          type: "success",
        });
        setOrderSuccess(true);
        clearCart();
      } else setError(data.message || t("submit_error"));
    } catch { setError(t("server_issue")); }
    finally { setLoading(false); }
  };

  return {
    status, currentStep, formData, updateFormData, deliverySlot, setDeliverySlot,
    paymentMethod, setPaymentMethod, transactionId, setTransactionId,
    loading, orderSuccess, error, couponDiscount, setCouponDiscount,
    totalPrice, cart, nextStep, prevStep, handleSubmit, couponCode, router, t,
  };
}
