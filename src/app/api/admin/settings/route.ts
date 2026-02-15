import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function GET() {
  try {
    await checkAdmin();
    await dbConnect();
    let settings = await Settings.findOne({});
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    await checkAdmin();
    const data = await req.json();
    await dbConnect();
    const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 },
    );
  }
}
