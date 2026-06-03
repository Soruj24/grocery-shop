"use client";

import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import AdminTable from "@/components/admin/AdminTable";
import RecentOrderRow from "@/components/admin/dashboard/RecentOrderRow";
import DashboardSectionHeader from "@/components/admin/dashboard/DashboardSectionHeader";
import LoadingState from "@/components/ui/LoadingState";
import ChartCard from "@/components/admin/dashboard/ChartCard";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { getStatusLabel } from "@/lib/admin-utils";
import { AdminOrder } from "@/types/admin";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AdminDashboard() {
  const { stats, analytics, loading } = useAdminDashboard();

  if (loading) return <LoadingState />;

  const statCards = [
    { name: "মোট কাস্টমার", value: stats?.customerCount || 0, icon: Users, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-100", label: "কাস্টমার" },
    { name: "মোট প্রোডাক্ট", value: stats?.productCount || 0, icon: Package, color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-100", label: "আইটেম" },
    { name: "আজকের অর্ডার", value: stats?.todayOrderCount || 0, icon: ShoppingCart, color: "from-orange-500 to-orange-600", shadow: "shadow-orange-100", label: "অর্ডার" },
    { name: "আজকের বিক্রি", value: `৳ ${stats?.todayRevenue || 0}`, icon: TrendingUp, color: "from-rose-500 to-rose-600", shadow: "shadow-rose-100", label: "টাকা" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      <AdminHeader title="ড্যাশবোর্ড ওভারভিউ" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat) => (
          <StatCard key={stat.name} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard icon={BarChart3} iconColor="text-blue-600" iconBg="bg-blue-50 dark:bg-blue-900/20" title="দৈনিক বিক্রি" subtitle="গত ৭ দিনের রিপোর্ট">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.dailySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="totalSales" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard icon={Activity} iconColor="text-emerald-600" iconBg="bg-emerald-50 dark:bg-emerald-900/20" title="ইউজার বৃদ্ধি" subtitle="নতুন কাস্টমার জয়েনিং">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={4} dot={{ r: 6, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard icon={Package} iconColor="text-orange-600" iconBg="bg-orange-50 dark:bg-orange-900/20" title="শীর্ষ বিক্রিত পণ্য" subtitle="সবচেয়ে বেশি অর্ডার হওয়া আইটেম">
          <div className="space-y-6">
            {analytics?.topProducts?.map((product, index) => (
              <div key={product._id} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center font-black text-gray-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{product.name}</h4>
                    <p className="text-xs font-bold text-gray-400">{product.totalSold} টি বিক্রি হয়েছে</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900 dark:text-white">৳{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard icon={PieChartIcon} iconColor="text-purple-600" iconBg="bg-purple-50 dark:bg-purple-900/20" title="অর্ডার স্ট্যাটাস" subtitle="বর্তমান অর্ডারগুলোর অবস্থা">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics?.orderStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="count" nameKey="_id">
                  {analytics?.orderStatus?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <DashboardSectionHeader title="সাম্প্রতিক অর্ডার" subtitle="সর্বশেষ ১০টি অর্ডার" icon={ShoppingCart} linkHref="/admin/orders" linkText="সব দেখুন" />
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
            <RecentOrderRow key={order._id} order={order} getStatusLabel={getStatusLabel} />
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
