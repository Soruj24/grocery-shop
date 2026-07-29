import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Notification from "@/schemas/Notification";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PATCH(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    const n = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!n) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(n);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
