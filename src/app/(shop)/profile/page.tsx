"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ProfileSidebar from "@/components/shop/profile/ProfileSidebar";
import ProfileOrderList from "@/components/shop/profile/ProfileOrderList";
import ProfileEditForm from "@/components/shop/profile/ProfileEditForm";
import WishlistSection from "@/components/shop/profile/WishlistSection";
import AddressManager from "@/components/shop/profile/AddressManager";
import PaymentMethods from "@/components/shop/profile/PaymentMethods";
import LoyaltyPoints from "@/components/shop/profile/LoyaltyPoints";
import SubscriptionManager from "@/components/shop/profile/SubscriptionManager";
import PageBackground from "@/components/ui/PageBackground";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

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

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileEditForm session={session} />;
      case "orders":
        return <ProfileOrderList orders={orders} loading={loading} />;
      case "wishlist":
        return <WishlistSection />;
      case "addresses":
        return <AddressManager />;
      case "payments":
        return <PaymentMethods />;
      case "loyalty":
        return <LoyaltyPoints />;
      case "subscription":
        return <SubscriptionManager />;
      default:
        return <ProfileEditForm session={session} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative overflow-hidden">
      <PageBackground
        color1="bg-green-500/5"
        color2="bg-emerald-500/5"
        color3="bg-blue-500/5"
      />
      
      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[48px] border border-gray-100 dark:border-white/5 shadow-xl min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
