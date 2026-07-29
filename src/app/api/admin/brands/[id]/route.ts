import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Brand from "@/schemas/Brand";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const brand = await Brand.findByIdAndUpdate(id, body, { new: true });
    if (!brand) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(brand);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const { id } = await params;
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
