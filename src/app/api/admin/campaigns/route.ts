import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Campaign from "@/schemas/Campaign";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const data = await Campaign.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    await dbConnect();
    const campaign = await Campaign.create(body);
    return NextResponse.json(campaign, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
