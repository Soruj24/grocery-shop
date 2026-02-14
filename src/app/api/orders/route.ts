import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items, total, address, phone, paymentMethod, transactionId, paymentStatus } = await req.json();

    await dbConnect();

    // Create the order
    const order = await Order.create({
      user: (session.user as { id: string }).id,
      items,
      total,
      address,
      phone,
      paymentMethod,
      transactionId,
      paymentStatus,
    });

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Internal server error" }, { status: 500 });
  }
}
