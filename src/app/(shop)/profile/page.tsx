"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProfileHeader from "@/components/shop/profile/ProfileHeader";
import ProfileOrderList from "@/components/shop/profile/ProfileOrderList";
import PageBackground from "@/components/ui/PageBackground";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/user");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    if (session) fetchOrders();
  }, [session]);

  if (!session) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 relative overflow-hidden py-12 px-4">
      <PageBackground
        color1="bg-blue-500/5"
        color2="bg-purple-500/5"
        color3="bg-pink-500/5"
      />
      <div className="relative z-10 space-y-8">
        <ProfileHeader session={session} />
        <ProfileOrderList orders={orders} loading={loading} />
      </div>
    </div>
  );
}
