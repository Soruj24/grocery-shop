import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import SupportTicket from "@/schemas/SupportTicket";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    await dbConnect();
    const ticket = await SupportTicket.findByIdAndUpdate(id, body, { new: true });
    if (!ticket) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(ticket);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    await dbConnect();
    await SupportTicket.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
