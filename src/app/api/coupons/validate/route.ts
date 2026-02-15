import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Coupon from "@/models/Coupon";

export async function POST(req: Request) {
  try {
    const { code, total } = await req.json();
    await dbConnect();

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
      expiryDate: { $gt: new Date() },
    });

    if (!coupon) {
      return NextResponse.json({ message: "Invalid or expired coupon" }, { status: 400 });
    }

    if (total < coupon.minOrderAmount) {
      return NextResponse.json(
        { message: `Minimum order amount for this coupon is ৳${coupon.minOrderAmount}` },
        { status: 400 }
      );
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json({ message: "Coupon usage limit reached" }, { status: 400 });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = Math.round((total * coupon.discountValue) / 100);
      if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
        discount = coupon.maxDiscountAmount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return NextResponse.json({
      code: coupon.code,
      discount,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
