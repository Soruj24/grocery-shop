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
    await dbConnect();
    const filter: Record<string, unknown> = { role: "customer" };
    if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }, { phone: { $regex: search, $options: "i" } }];
    const customers = await User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const totalCount = await User.countDocuments(filter);
    const data = await Promise.all(
      customers.map(async (c) => {
        const orderAgg = await Order.aggregate([
          { $match: { user: c._id } },
          { $group: { _id: null, orderCount: { $sum: 1 }, totalSpent: { $sum: "$total" } } },
        ]);
        return {
          _id: c._id.toString(), name: c.name, email: c.email, phone: c.phone, address: c.address,
          createdAt: c.createdAt, orderCount: orderAgg[0]?.orderCount || 0,
          totalSpent: orderAgg[0]?.totalSpent || 0,
        };
      })
    );
    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
