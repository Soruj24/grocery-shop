import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Order from "@/schemas/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    await dbConnect();
    if (body.orderId) {
      const order = await Order.findById(body.orderId);
      if (order) {
        order.status = body.status === "approved" ? "cancelled" : order.status;
        await order.save();
      }
    }
    return NextResponse.json({ message: "Updated" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
