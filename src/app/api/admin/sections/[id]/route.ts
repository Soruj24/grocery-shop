import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Section from "@/models/Section";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await req.json();
    const section = await Section.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(section);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update section" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;
  try {
    await Section.findByIdAndDelete(id);
    return NextResponse.json({ message: "Section deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete section" }, { status: 500 });
  }
}
