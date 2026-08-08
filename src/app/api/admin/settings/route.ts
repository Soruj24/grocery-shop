import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import dbConnect from "@/config/mongodb";
import Settings from "@/schemas/Settings";

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if ((session?.user as { role?: string })?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
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
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await checkAdmin();
    const body = await req.json();
    await dbConnect();

    const allowedGroups = [
      "general", "store", "profile", "security", "notifications",
      "payments", "shipping", "tax", "email", "integrations", "appearance",
    ];

    const setOps: Record<string, unknown> = {};
    let hasGroups = false;

    for (const key of allowedGroups) {
      if (body[key] && typeof body[key] === "object") {
        hasGroups = true;
        for (const [field, value] of Object.entries(body[key])) {
          const path = key + "." + field;
          setOps[path] = value;
        }
      }
    }

    // Backward compatibility: flat updates
    if (!hasGroups) {
      for (const [key, value] of Object.entries(body)) {
        setOps[key] = value;
      }
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: setOps },
      { new: true, upsert: true }
    );
    return NextResponse.json(settings);
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
    );
  }
}
