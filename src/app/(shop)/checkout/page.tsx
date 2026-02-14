"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";
import OrderSuccess from "@/components/shop/checkout/OrderSuccess";
import CheckoutForm from "@/components/shop/checkout/CheckoutForm";
import OrderSummary from "@/components/shop/checkout/OrderSummary";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        phone: (session.user as { phone?: string }).phone || "",
        address: (session.user as { address?: string }).address || "",
      });
    }
  }, [session]);

  useEffect(() => {
    if (cart.length === 0 && !orderSuccess && !loading) {
      router.push("/cart");
    }
  }, [cart.length, orderSuccess, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const result = await Swal.fire({
      title: 'অর্ডার নিশ্চিত করুন',
      text: "আপনি কি আপনার অর্ডারটি কনফার্ম করতে চান?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'হ্যাঁ, অর্ডার করুন',
      cancelButtonText: 'না, ফিরে যান',
      background: '#fff',
      color: '#000',
    });

    if (!result.isConfirmed) return;
    
    setLoading(true);
    setError("");

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
          total: totalPrice + 20,
          address: formData.address,
          phone: formData.phone,
          paymentMethod,
          transactionId: paymentMethod !== 'cod' ? transactionId : undefined,
          paymentStatus: paymentMethod !== 'cod' ? 'paid' : 'unpaid',
        }),
      });

      if (res.ok) {
        setOrderSuccess(true);
        clearCart();
      } else {
        const data = await res.json();
        setError(data.message || "অর্ডার সাবমিট করতে সমস্যা হয়েছে");
      }
    } catch (err) {
      setError("সার্ভারে সমস্যা হয়েছে, দয়া করে আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return <OrderSuccess />;
  }

  if (cart.length === 0 && !orderSuccess) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      <div className="flex items-center gap-4">
        <Link 
          href="/cart"
          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-400 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">চেকআউট</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold">নিচের তথ্যগুলো পূরণ করে অর্ডারটি নিশ্চিত করুন</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Checkout Form */}
        <div className="space-y-10">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
            handleSubmit={handleSubmit}
            loading={loading}
            totalPrice={totalPrice}
          />
        </div>

        {/* Order Summary */}
        <OrderSummary cart={cart} totalPrice={totalPrice} />
      </div>
    </div>
  );
}
