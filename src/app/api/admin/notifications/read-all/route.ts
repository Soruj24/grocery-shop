import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Notification from "@/schemas/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const adminUser = await import("@/schemas/User").then((m) => m.default.findOne({ email: session.user?.email }));
    const userId = adminUser?._id || session.user?.id;
    await Notification.updateMany({ user: userId, read: false }, { read: true });
    return NextResponse.json({ message: "All marked as read" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
