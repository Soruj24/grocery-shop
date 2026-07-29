import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import ActivityLog from "@/schemas/ActivityLog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const type = url.searchParams.get("type");
    await dbConnect();
    const filter: Record<string, unknown> = {};
    if (type) filter.type = type;
    const data = await ActivityLog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const totalCount = await ActivityLog.countDocuments(filter);
    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
