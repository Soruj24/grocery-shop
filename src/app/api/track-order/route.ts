import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { orderId, phone } = await req.json();

    if (!orderId || !phone) {
      return NextResponse.json(
        { message: "Order ID and Phone Number are required" },
        { status: 400 }
      );
    }

    // Find order that matches ID and Phone
    // We use findOne to ensure both match
    const order = await Order.findOne({
      _id: orderId,
      phone: phone,
    }).select("status createdAt total items paymentMethod paymentStatus deliveryMethod address");

    if (!order) {
      return NextResponse.json(
        { message: "অর্ডার পাওয়া যায়নি। অনুগ্রহ করে অর্ডার আইডি এবং ফোন নম্বর চেক করুন।" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json(
      { message: "সার্ভারে সমস্যা হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
