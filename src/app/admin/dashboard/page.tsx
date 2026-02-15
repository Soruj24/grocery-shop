"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
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
  Legend
} from "recharts";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import AdminTable from "@/components/admin/AdminTable";
import RecentOrderRow from "@/components/admin/dashboard/RecentOrderRow";
import DashboardSectionHeader from "@/components/admin/dashboard/DashboardSectionHeader";
import LoadingState from "@/components/ui/LoadingState";
import { AdminStats, AdminOrder } from "@/types/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.all([
          fetch("/api/admin/stats"),
          fetch("/api/admin/analytics")
        ]);
        
        const statsData = await statsRes.json();
        const analyticsData = await analyticsRes.json();
        
        setStats(statsData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return "পেন্ডিং";
      case "confirmed": return "নিশ্চিত";
      case "processing": return "প্রসেসিং";
      case "shipped": return "শিফড";
      case "delivered": return "ডেলিভারড";
      case "cancelled": return "ক্যান্সেল";
      default: return status;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      <AdminHeader title="ড্যাশবোর্ড ওভারভিউ" />
      
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Sales Chart */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600">
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">দৈনিক বিক্রি</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">গত ৭ দিনের রিপোর্ট</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.dailySales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{fill: '#f8fafc'}}
                />
                <Bar dataKey="totalSales" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-600">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">ইউজার বৃদ্ধি</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">নতুন কাস্টমার জয়েনিং</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={4} dot={{r: 6, fill: '#10B981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-2xl text-orange-600">
              <Package size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">শীর্ষ বিক্রিত পণ্য</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">সবচেয়ে বেশি অর্ডার হওয়া আইটেম</p>
            </div>
          </div>
          <div className="space-y-6">
            {analytics?.topProducts?.map((product: any, index: number) => (
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
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600">
              <PieChartIcon size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 dark:text-white">অর্ডার স্ট্যাটাস</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">বর্তমান অর্ডারগুলোর অবস্থা</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics?.orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="_id"
                >
                  {analytics?.orderStatus?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
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
