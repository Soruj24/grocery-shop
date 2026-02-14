import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await checkAdmin();
    const { id } = await params;
    const data = await req.json();
    await dbConnect();
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(category);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: (error as Error).message === "Unauthorized" ? 401 : 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await checkAdmin();
    const { id } = await params;
    await dbConnect();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Category deleted" });
  } catch (error: unknown) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: (error as Error).message === "Unauthorized" ? 401 : 500 },
    );
  }
}
