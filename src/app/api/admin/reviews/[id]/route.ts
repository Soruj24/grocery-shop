import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const { id } = await params;
    const body = await req.json();
    await dbConnect();
    const product = await Product.findOne({ "reviewItems._id": new mongoose.Types.ObjectId(id) });
    if (!product) return NextResponse.json({ message: "Review not found" }, { status: 404 });
    const review = (product.reviewItems as mongoose.Types.Subdocument[]).find(
      (r) => r._id?.toString() === id
    );
    if (!review) return NextResponse.json({ message: "Review not found" }, { status: 404 });
    review.set({ status: body.status });
    await product.save();
    return NextResponse.json({ message: "Updated" });
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
    const product = await Product.findOne({ "reviewItems._id": new mongoose.Types.ObjectId(id) });
    if (!product) return NextResponse.json({ message: "Review not found" }, { status: 404 });
    product.reviewItems = (product.reviewItems as mongoose.Types.Subdocument[]).filter(
      (r) => r._id?.toString() !== id
    );
    await product.save();
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
