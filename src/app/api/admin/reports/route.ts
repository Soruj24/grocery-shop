import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Order from "@/schemas/Order";
import Product from "@/schemas/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const period = url.searchParams.get("period") || "monthly";
    await dbConnect();
    const now = new Date();
    let startDate: Date;
    if (period === "weekly") startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    else if (period === "yearly") startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
    else startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    const format = period === "yearly" ? "%Y" : period === "weekly" ? "%Y-%m-%d" : "%Y-%m";
    const salesData = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate }, status: { $ne: "cancelled" } } },
      { $group: { _id: { $dateToString: { format, date: "$createdAt" } }, revenue: { $sum: "$total" }, orders: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", quantity: { $sum: "$items.quantity" }, revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
      { $sort: { quantity: -1 } },
      { $limit: 10 },
    ]);
    const categoryRevenue = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: "$items.name", value: { $sum: { $multiply: ["$items.price", "$items.quantity"] } } } },
      { $sort: { value: -1 } },
      { $limit: 10 },
    ]);
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$total" }, count: { $sum: 1 } } },
    ]);
    const productCount = await Product.countDocuments({ isActive: true });
    return NextResponse.json({
      salesData, topProducts, categoryRevenue,
      summary: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders: totalRevenue[0]?.count || 0,
        productCount,
      },
      period,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
