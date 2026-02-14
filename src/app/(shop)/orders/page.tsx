"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmptyOrdersState from "@/components/shop/orders/EmptyOrdersState";
import OrderCard from "@/components/shop/orders/OrderCard";
import { AdminOrder as Order } from "@/types/admin";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/user");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-black/5">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrdersState />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          আমার অর্ডারসমূহ
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-bold">
          আপনার সব অর্ডারের স্ট্যাটাস এবং ডিটেইলস এখানে দেখুন
        </p>
      </div>

      <div className="grid gap-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order as Order} />
        ))}
      </div>
    </div>
  );
}
