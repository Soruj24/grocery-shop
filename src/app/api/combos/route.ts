import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Combo from "@/schemas/Combo";

export async function GET() {
  try {
    await dbConnect();
    const combos = await Combo.find({ isActive: true }).lean();
    return NextResponse.json({ combos: JSON.parse(JSON.stringify(combos)) });
  } catch (error) {
    console.error("Combos API Error:", error);
    return NextResponse.json({ combos: [] }, { status: 200 });
  }
}
