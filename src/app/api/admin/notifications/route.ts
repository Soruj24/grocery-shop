import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Notification from "@/schemas/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const adminUser = await import("@/schemas/User").then((m) => m.default.findOne({ email: session.user?.email }));
    const userId = adminUser?._id || session.user?.id;
    const data = await Notification.find({ user: userId }).sort({ createdAt: -1 }).limit(100).lean();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const body = await req.json();
    const notification = await Notification.create(body);
    return NextResponse.json(notification, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
