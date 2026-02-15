import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { rateLimit } from "@/lib/rate-limit";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip);
    
    if (!success) {
      return NextResponse.json(
        { message: "Too many order attempts. Please try again later." },
        { status: 429 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { 
      items, 
      total, 
      address, 
      phone, 
      paymentMethod, 
      transactionId, 
      paymentStatus,
      coupon,
      deliveryMethod,
      deliverySlot
    } = await req.json();

    await dbConnect();

    for (const item of items) {
      if (mongoose.Types.ObjectId.isValid(item.product)) {
        const product = await Product.findById(item.product);
        if (!product) {
          return NextResponse.json({ message: `Product ${item.name} not found` }, { status: 404 });
        }
        if (product.stock < item.quantity) {
          return NextResponse.json({ 
            message: `Insufficient stock for ${item.name}. Available: ${product.stock}` 
          }, { status: 400 });
        }
      } else {
        const hardcodedIds = [
          "65cd123456789012345678a1",
          "65cd123456789012345678a2",
          "65cd123456789012345678a3",
          "65cd123456789012345678a4",
          "65cd123456789012345678b1",
          "65cd123456789012345678b2",
          "65cd123456789012345678b3"
        ];
        if (hardcodedIds.includes(item.product)) {
          continue;
        }
        const validName = typeof item.name === "string" && item.name.trim().length > 0;
        const validPrice = typeof item.price === "number" && item.price >= 0;
        const validQty = Number.isInteger(item.quantity) && item.quantity > 0;
        if (!validName || !validPrice || !validQty) {
          return NextResponse.json({ 
            message: "Invalid non-database item. Provide valid name, price, and quantity." 
          }, { status: 400 });
        }
      }
    }

    // Create the order
    const order = await Order.create({
      user: session.user.id,
      items,
      total,
      address,
      phone,
      paymentMethod,
      transactionId,
      paymentStatus,
      coupon,
      deliveryMethod,
      deliverySlot
    });

    // Reduce stock for database products
    for (const item of items) {
      if (mongoose.Types.ObjectId.isValid(item.product)) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : "Internal server error",
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
