import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Role from "@/schemas/Role";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    await dbConnect();
    if (body.name === "Admin" && body.isActive === false) {
      return NextResponse.json({ message: "Cannot deactivate Admin role" }, { status: 400 });
    }
    const role = await Role.findByIdAndUpdate(id, body, { new: true });
    if (!role) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(role);
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
