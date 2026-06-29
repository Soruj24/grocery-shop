import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import User from "@/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as { role?: string }).role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 });
    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
