import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Order from "@/schemas/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const orders = await Order.find({ status: "cancelled" })
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();
    const data = orders.map((o, i) => ({
      id: `RET-${String(i + 1).padStart(3, "0")}`,
      orderId: o._id.toString().slice(-6).toUpperCase(),
      customer: (o as Record<string, unknown>).name || o.guestInfo?.name || "Unknown",
      item: o.items?.[0]?.name || "N/A",
      reason: "Customer requested",
      status: o.status === "cancelled" ? "approved" : "pending",
      date: o.updatedAt?.toString().split("T")[0] || "",
      refund: o.total,
    }));
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
