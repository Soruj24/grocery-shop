"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import EmptyOrdersState from "@/features/orders/components/EmptyOrdersState";
import OrderCard from "@/features/orders/components/OrderCard";
import { AdminOrder as Order } from "@/types/admin";
import { LoadingState } from "@/components/ui";

export default function AccountOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account/orders");
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
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <LoadingState />
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrdersState />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-foreground tracking-tight">
          আমার অর্ডারসমূহ
        </h1>
        <p className="text-muted-foreground font-bold">
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
