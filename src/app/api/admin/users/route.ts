import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import User from "@/schemas/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const users = await User.find({ role: { $ne: "customer" } })
      .select("-password")
      .sort({ createdAt: -1 })
      .lean();
    const data = users.map((u) => ({
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      status: u.role === "admin" ? "active" : "active",
      lastLogin: u.updatedAt
        ? `${Math.floor((Date.now() - new Date(u.updatedAt).getTime()) / 3600000)}h ago`
        : "Never",
    }));
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
