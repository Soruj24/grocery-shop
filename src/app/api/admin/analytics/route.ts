import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Order from "@/schemas/Order";
import User from "@/schemas/User";
import Product from "@/schemas/Product";
import Category from "@/schemas/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

function parseRange(range: string, from?: string, to?: string) {
  const now = new Date();
  let startDate: Date;

  switch (range) {
    case "7d":
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "30d":
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
      break;
    case "90d":
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 90);
      break;
    case "1y":
      startDate = new Date(now);
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    case "custom":
      startDate = from ? new Date(from) : new Date(now.getTime() - 7 * 86400000);
      if (to) now.setTime(new Date(to).getTime());
      break;
    default:
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 30);
  }

  return { startDate, endDate: now };
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const range = searchParams.get("range") || "30d";
    const from = searchParams.get("from") || undefined;
    const to = searchParams.get("to") || undefined;
    const { startDate, endDate } = parseRange(range, from, to);

    // ─── Previous period for comparison ───
    const periodMs = endDate.getTime() - startDate.getTime();
    const prevStart = new Date(startDate.getTime() - periodMs);
    const prevEnd = new Date(startDate);

    // ─── 1. Revenue Trend ───
    const revenueTrend = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, revenue: { $sum: "$total" }, orders: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // ─── 2. Revenue KPI ───
    const [revenueAgg, prevRevenueAgg] = await Promise.all([
      Order.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } },
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: prevStart, $lt: prevEnd }, status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } },
      ]),
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;
    const totalOrders = revenueAgg[0]?.count || 0;
    const prevRevenue = prevRevenueAgg[0]?.total || 0;
    const prevOrders = prevRevenueAgg[0]?.count || 0;
    const revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
    const ordersChange = prevOrders > 0 ? ((totalOrders - prevOrders) / prevOrders) * 100 : 0;

    // ─── 3. Average Order Value ───
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const prevAov = prevOrders > 0 ? prevRevenue / prevOrders : 0;
    const aovChange = prevAov > 0 ? ((aov - prevAov) / prevAov) * 100 : 0;

    // ─── 4. Customer Metrics ───
    const [customerAgg, prevCustomerAgg] = await Promise.all([
      User.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate }, role: "customer" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
      User.aggregate([
        { $match: { createdAt: { $gte: prevStart, $lt: prevEnd }, role: "customer" } },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
    ]);

    const newCustomers = customerAgg[0]?.count || 0;
    const prevNewCustomers = prevCustomerAgg[0]?.count || 0;
    const customerChange = prevNewCustomers > 0 ? ((newCustomers - prevNewCustomers) / prevNewCustomers) * 100 : 0;

    // ─── 5. Unique Customers (buyers in period) ───
    const uniqueBuyers = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: "$user" } },
      { $count: "total" },
    ]);
    const totalUniqueBuyers = uniqueBuyers[0]?.total || 0;

    // ─── 6. Conversion Rate (orders / unique visitors — approximate using users) ───
    const totalUsers = await User.countDocuments({ role: "customer" });
    const conversionRate = totalUsers > 0 ? (totalUniqueBuyers / totalUsers) * 100 : 0;

    // ─── 7. Customer Retention (repeat buyers in period) ───
    const repeatBuyers = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: "$user", orderCount: { $sum: 1 } } },
      { $match: { orderCount: { $gte: 2 } } },
      { $count: "total" },
    ]);
    const repeatBuyerCount = repeatBuyers[0]?.total || 0;
    const retentionRate = totalUniqueBuyers > 0 ? (repeatBuyerCount / totalUniqueBuyers) * 100 : 0;

    // ─── 8. Products Active ───
    const activeProducts = await Product.countDocuments({ isActive: true });

    // ─── 9. Top Products ───
    const topProducts = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          name: { $first: "$items.name" },
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 },
    ]);

    // ─── 10. Top Categories ───
    const topCategoriesRaw = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "categories",
          localField: "productInfo.category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$categoryInfo._id",
          name: { $first: "$categoryInfo.name" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 },
    ]);

    // ─── 11. Order Status Distribution ───
    const orderStatus = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // ─── 12. Payment Method Distribution ───
    const paymentMethods = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: "$paymentMethod", count: { $sum: 1 }, revenue: { $sum: "$total" } } },
      { $sort: { revenue: -1 } },
    ]);

    // ─── 13. Customer Growth Trend ───
    const customerGrowth = await User.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, role: "customer" } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    // ─── 14. Orders per day (for order trend chart) ───
    const orderTrend = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 }, revenue: { $sum: "$total" } } },
      { $sort: { _id: 1 } },
    ]);

    return NextResponse.json({
      range,
      period: { from: startDate.toISOString(), to: endDate.toISOString() },
      kpi: {
        revenue: { total: totalRevenue, change: revenueChange },
        orders: { total: totalOrders, change: ordersChange },
        aov: { total: aov, change: aovChange },
        customers: { total: newCustomers, change: customerChange },
        uniqueBuyers: totalUniqueBuyers,
        conversionRate,
        retentionRate,
        activeProducts,
      },
      revenueTrend,
      orderTrend,
      customerGrowth,
      topProducts,
      topCategories: topCategoriesRaw,
      orderStatus,
      paymentMethods,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
