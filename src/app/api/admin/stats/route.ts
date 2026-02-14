import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const [customerCount, productCount, recentOrders] = await Promise.all([
      User.countDocuments({ role: "customer" }),
      Product.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5)
    ]);

    // Calculate today's orders and revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayOrders = await Order.find({
      createdAt: { $gte: today }
    });

    const todayOrderCount = todayOrders.length;
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      customerCount,
      productCount,
      todayOrderCount,
      todayRevenue,
      recentOrders
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
