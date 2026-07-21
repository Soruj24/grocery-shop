import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Coupon from "@/schemas/Coupon";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();
    const coupons = await Coupon.find({
      isActive: true,
      expiryDate: { $gte: now },
    })
      .select("code discountType discountValue minOrderAmount maxDiscountAmount expiryDate")
      .lean();
    return NextResponse.json({ coupons: JSON.parse(JSON.stringify(coupons)) });
  } catch (error) {
    console.error("Coupons API Error:", error);
    return NextResponse.json({ coupons: [] }, { status: 200 });
  }
}
