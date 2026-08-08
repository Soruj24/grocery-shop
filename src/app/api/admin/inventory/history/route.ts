import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import StockLog from "@/schemas/StockLog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const productId = url.searchParams.get("productId");

    await dbConnect();
    const filter: Record<string, unknown> = {};
    if (productId) filter.product = productId;

    const logs = await StockLog.find(filter)
      .populate("product", "name sku")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalCount = await StockLog.countDocuments(filter);

    const data = logs.map((log) => ({
      _id: log._id.toString(),
      product: {
        _id: (log.product as Record<string, unknown>)?._id?.toString?.() || "",
        name: (log.product as Record<string, unknown>)?.name || "Deleted",
        sku: (log.product as Record<string, unknown>)?.sku || "",
      },
      type: log.type,
      quantity: log.quantity,
      previousStock: log.previousStock,
      newStock: log.newStock,
      reason: log.reason,
      note: log.note,
      createdAt: log.createdAt,
    }));

    return NextResponse.json({ data, totalPages: Math.ceil(totalCount / limit), currentPage: page, totalCount });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
