"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { ArrowLeft, CheckCircle2, MapPin, Clock, CreditCard, ClipboardList } from "lucide-react";
import Swal from "sweetalert2";
import OrderSuccess from "@/components/shop/checkout/OrderSuccess";
import CheckoutForm from "@/components/shop/checkout/CheckoutForm";
import OrderSummary from "@/components/shop/checkout/OrderSummary";
import CouponInput from "@/components/shop/checkout/CouponInput";
import { useNotifications } from "@/components/NotificationContext";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const { t } = useLanguage();
  
  const steps = [
    { id: 1, name: t('checkout_step_1'), icon: MapPin },
    { id: 2, name: t('checkout_step_2'), icon: Clock },
    { id: 3, name: t('checkout_step_3'), icon: CreditCard },
    { id: 4, name: t('checkout_step_4'), icon: ClipboardList },
  ];
  const { cart, totalPrice, clearCart } = useCart();
  const { addNotification } = useNotifications();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon");
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [deliverySlot, setDeliverySlot] = useState(t('delivery_slot_morning'));
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/checkout`);
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || "",
        phone: (session.user as { phone?: string }).phone || "",
        address: (session.user as { address?: string }).address || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    const validateCoupon = async () => {
      if (couponCode && totalPrice > 0) {
        try {
          const res = await fetch("/api/coupons/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: couponCode, total: totalPrice }),
          });
          const data = await res.json();
          if (res.ok) {
            setCouponDiscount(data.discount);
          }
        } catch (error) {
          console.error("Coupon validation failed", error);
        }
      }
    };
    validateCoupon();
  }, [couponCode, totalPrice]);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess && !loading) {
      router.push("/cart");
    }
  }, [cart.length, orderSuccess, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const result = await Swal.fire({
      title: t('confirm_order_title'),
      text: t('confirm_order_text'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#ef4444',
      confirmButtonText: t('yes_order'),
      cancelButtonText: t('no_go_back'),
      background: '#fff',
      color: '#000',
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
          items: cart.map(item => ({
            product: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: finalTotal,
          address: formData.address,
          phone: formData.phone,
          paymentMethod,
          transactionId: paymentMethod !== 'cod' ? transactionId : undefined,
          paymentStatus: paymentMethod !== 'cod' ? 'paid' : 'unpaid',
          coupon: couponCode || undefined,
          deliverySlot,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        addNotification({
          title: t('order_success_title'),
          message: `${t('order_success_desc')} ${t('order_id')}: #${data._id.slice(-8).toUpperCase()}`,
          type: "success"
        });
        setOrderSuccess(true);
        clearCart();
      } else {
        setError(data.message || t('submit_error'));
      }
    } catch (err) {
      setError(t('server_issue'));
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (orderSuccess) {
    return <OrderSuccess />;
  }

  if (cart.length === 0 && !orderSuccess) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 space-y-12 relative z-10">
        {/* Header and Progress */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => currentStep === 1 ? router.push("/cart") : prevStep()}
              className="p-3 bg-white dark:bg-gray-900 rounded-2xl text-gray-400 hover:text-green-600 shadow-sm transition-all"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="space-y-1">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t('checkout_title')}</h1>
              <p className="text-gray-500 dark:text-gray-400 font-bold">{t('step_text')} {currentStep}: {steps[currentStep-1].name}</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-between max-w-4xl mx-auto relative px-4">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0 rounded-full" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <motion.div 
                  animate={{ 
                    scale: currentStep === step.id ? 1.2 : 1,
                    backgroundColor: currentStep >= step.id ? "#16a34a" : "#fff",
                    color: currentStep >= step.id ? "#fff" : "#94a3b8"
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors border-4 ${
                    currentStep >= step.id ? "border-green-100 dark:border-green-900/30" : "border-white dark:border-gray-900"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                </motion.div>
                <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${
                  currentStep >= step.id ? "text-green-600 dark:text-green-500" : "text-gray-400"
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CheckoutForm
                  currentStep={currentStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  formData={formData}
                  setFormData={updateFormData}
                  deliverySlot={deliverySlot}
                  setDeliverySlot={setDeliverySlot}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  transactionId={transactionId}
                  setTransactionId={setTransactionId}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  totalPrice={totalPrice}
                  cart={cart}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 sticky top-12 space-y-6">
            <CouponInput 
              total={totalPrice} 
              onApply={(coupon) => {
                setCouponDiscount(coupon.discount);
                router.replace(`/checkout?coupon=${coupon.code}`);
              }}
              onRemove={() => {
                setCouponDiscount(0);
                router.replace(`/checkout`);
              }}
            />
            <OrderSummary cart={cart} totalPrice={totalPrice} couponDiscount={couponDiscount} />
          </div>
        </div>
      </div>
    </div>
  );
}
