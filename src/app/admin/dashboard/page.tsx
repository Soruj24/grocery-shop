"use client";

import { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import AdminTable from "@/components/admin/AdminTable";
import RecentOrderRow from "@/components/admin/dashboard/RecentOrderRow";
import DashboardSectionHeader from "@/components/admin/dashboard/DashboardSectionHeader";
import LoadingState from "@/components/ui/LoadingState";
import { AdminStats, AdminOrder } from "@/types/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingState />;

  const statCards = [
    {
      name: "মোট কাস্টমার",
      value: stats?.customerCount || 0,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-100",
      label: "কাস্টমার",
    },
    {
      name: "মোট প্রোডাক্ট",
      value: stats?.productCount || 0,
      icon: Package,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-100",
      label: "আইটেম",
    },
    {
      name: "আজকের অর্ডার",
      value: stats?.todayOrderCount || 0,
      icon: ShoppingCart,
      color: "from-orange-500 to-orange-600",
      shadow: "shadow-orange-100",
      label: "অর্ডার",
    },
    {
      name: "আজকের বিক্রি",
      value: `৳ ${stats?.todayRevenue || 0}`,
      icon: TrendingUp,
      color: "from-rose-500 to-rose-600",
      shadow: "shadow-rose-100",
      label: "টাকা",
    },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "পেন্ডিং";
      case "processing":
        return "প্রসেসিং";
      case "shipped":
        return "শিফড";
      case "delivered":
        return "ডেলিভারড";
      case "cancelled":
        return "ক্যান্সেল";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      <AdminHeader title="ড্যাশবোর্ড ওভারভিউ" />
      <p className="text-sm font-bold text-gray-400 dark:text-gray-500 -mt-8 ml-1">
        আপনার শপের বর্তমান অবস্থা একনজরে দেখুন
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat) => (
          <StatCard
            key={stat.name}
            name={stat.name}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            shadow={stat.shadow}
            label={stat.label}
          />
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DashboardSectionHeader
          title="সাম্প্রতিক অর্ডার"
          subtitle="সর্বশেষ ১০টি অর্ডার"
          icon={ShoppingCart}
          linkHref="/admin/orders"
          linkText="সব দেখুন"
        />

        <AdminTable
          columns={[
            { header: "অর্ডার আইডি" },
            { header: "কাস্টমার" },
            { header: "পরিমাণ" },
            { header: "স্ট্যাটাস" },
            { header: "তারিখ" },
            { header: "অ্যাকশন", className: "text-right" },
          ]}
          emptyMessage="কোন সাম্প্রতিক অর্ডার নেই"
        >
          {stats?.recentOrders?.map((order: AdminOrder) => (
            <RecentOrderRow
              key={order._id}
              order={order}
              getStatusLabel={getStatusLabel}
            />
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
