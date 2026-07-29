import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import User from "@/schemas/User";
import Order from "@/schemas/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await dbConnect();
    const customer = await User.findById(id).select("-password").lean();
    if (!customer) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const recentOrders = await Order.find({ user: id }).sort({ createdAt: -1 }).limit(10).lean();
    const orderStats = await Order.aggregate([
      { $match: { user: customer._id } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalSpent: { $sum: "$total" } } },
    ]);
    return NextResponse.json({
      ...customer, _id: customer._id.toString(),
      orders: recentOrders, stats: orderStats[0] || { totalOrders: 0, totalSpent: 0 },
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
