import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    // Filter by user ID if available, otherwise fallback to phone
    const userId = (session.user as { id?: string }).id;
    const userPhone = (session.user as { phone?: string }).phone;

    const query = userId 
      ? { user: userId } 
      : { phone: userPhone };

    const orders = await Order.find(query)
      .populate("items.product")
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
