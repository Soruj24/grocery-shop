import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Combo from "@/models/Combo";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAdmin();
    const { id } = await params;
    const data = await req.json();
    await dbConnect();
    const combo = await Combo.findByIdAndUpdate(id, data, { new: true });
    if (!combo) {
      return NextResponse.json({ message: "Combo not found" }, { status: 404 });
    }
    return NextResponse.json(combo);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await checkAdmin();
    const { id } = await params;
    await dbConnect();
    const combo = await Combo.findByIdAndDelete(id);
    if (!combo) {
      return NextResponse.json({ message: "Combo not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Combo deleted successfully" });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
