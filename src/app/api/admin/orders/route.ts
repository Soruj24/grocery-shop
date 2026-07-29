import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Order from "@/schemas/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { rateLimit } from "@/utils/rate-limit";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search") || "";
    await dbConnect();
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) filter.$or = [{ phone: { $regex: search, $options: "i" } }, { name: { $regex: search, $options: "i" } }];
    const orders = await Order.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean();
    const totalCount = await Order.countDocuments(filter);
    const data = orders.map((o) => ({
      ...o, _id: o._id.toString(), createdAt: o.createdAt?.toISOString(),
    }));
    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    rateLimit(ip);
    const { id, status, deliveryStatus, trackingId, deliveryBoy } = await req.json();
    await dbConnect();
    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (deliveryStatus) updateData.deliveryStatus = deliveryStatus;
    if (trackingId) updateData.trackingId = trackingId;
    if (deliveryBoy) updateData.deliveryBoy = deliveryBoy;
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
