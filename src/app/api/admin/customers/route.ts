import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import User from "@/schemas/User";
import Order from "@/schemas/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "createdAt";
    const sortDir = url.searchParams.get("sortDir") === "asc" ? 1 : -1;
    const status = url.searchParams.get("status"); // "active" | "inactive"

    await dbConnect();
    const filter: Record<string, unknown> = { role: "customer" };
    if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }, { phone: { $regex: search, $options: "i" } }];

    // For active/inactive filter, we need to find customers with recent orders
    if (status) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentOrderUserIds = await Order.distinct("user", { createdAt: { $gte: thirtyDaysAgo } });
      if (status === "active") {
        filter._id = { $in: recentOrderUserIds };
      } else {
        filter._id = { $nin: recentOrderUserIds };
      }
    }

    const sortObj: Record<string, 1 | -1> = {};
    if (["name", "createdAt"].includes(sort)) {
      sortObj[sort] = sortDir;
    } else {
      sortObj.createdAt = -1;
    }

    const customers = await User.find(filter).sort(sortObj).skip((page - 1) * limit).limit(limit).lean();
    const totalCount = await User.countDocuments(filter);
    const data = await Promise.all(
      customers.map(async (c) => {
        const orderAgg = await Order.aggregate([
          { $match: { user: c._id } },
          { $group: {
            _id: null,
            orderCount: { $sum: 1 },
            totalSpent: { $sum: "$total" },
            lastOrderDate: { $max: "$createdAt" },
          }},
        ]);
        const stats = orderAgg[0] || { orderCount: 0, totalSpent: 0, lastOrderDate: null };
        return {
          _id: c._id.toString(),
          name: c.name,
          email: c.email,
          phone: c.phone,
          address: c.address,
          createdAt: c.createdAt,
          loyaltyPoints: c.loyaltyPoints || 0,
          orderCount: stats.orderCount,
          totalSpent: stats.totalSpent,
          lastOrderDate: stats.lastOrderDate?.toISOString() || null,
        };
      })
    );
    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
