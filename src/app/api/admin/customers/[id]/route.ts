import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import User from "@/schemas/User";
import Order from "@/schemas/Order";
import Product from "@/schemas/Product";
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

    const [recentOrders, orderStats, monthlySpending, reviews] = await Promise.all([
      Order.find({ user: id }).sort({ createdAt: -1 }).limit(20).lean(),
      Order.aggregate([
        { $match: { user: customer._id } },
        { $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$total" },
          avgOrderValue: { $avg: "$total" },
          firstOrderDate: { $min: "$createdAt" },
          lastOrderDate: { $max: "$createdAt" },
        }},
      ]),
      Order.aggregate([
        { $match: { user: customer._id, status: { $ne: "cancelled" } } },
        { $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          spent: { $sum: "$total" },
          orders: { $sum: 1 },
        }},
        { $sort: { _id: 1 } },
        { $limit: 12 },
      ]),
      (async () => {
        const products = await Product.find({ "reviewItems.0": { $exists: true } }).select("name reviewItems").lean();
        return products.flatMap((p) =>
          (p.reviewItems || [])
            .filter((r: Record<string, unknown>) => r.user?.toString() === id || r.userId?.toString() === id)
            .map((r: Record<string, unknown>) => ({
              _id: r._id?.toString(),
              product: p.name,
              productId: p._id.toString(),
              rating: r.rating,
              comment: r.comment,
              createdAt: r.createdAt,
              status: r.status || "pending",
            }))
        );
      })(),
    ]);

    const stats = orderStats[0] || { totalOrders: 0, totalSpent: 0, avgOrderValue: 0, firstOrderDate: null, lastOrderDate: null };

    // Determine customer status
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const isActive = stats.lastOrderDate && new Date(stats.lastOrderDate) >= thirtyDaysAgo;

    return NextResponse.json({
      ...customer, _id: customer._id.toString(),
      orders: recentOrders,
      stats: {
        ...stats,
        isActive: !!isActive,
        memberDays: stats.firstOrderDate
          ? Math.floor((Date.now() - new Date(stats.firstOrderDate).getTime()) / (1000 * 60 * 60 * 24))
          : 0,
      },
      monthlySpending,
      reviews,
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
