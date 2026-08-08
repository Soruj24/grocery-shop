import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import StockLog from "@/schemas/StockLog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "stock";
    const sortDir = url.searchParams.get("sortDir") === "asc" ? 1 : -1;
    const status = url.searchParams.get("status"); // "in_stock" | "low_stock" | "out_of_stock"

    await dbConnect();

    const filter: Record<string, unknown> = { isActive: true };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (status === "out_of_stock") filter.stock = 0;
    else if (status === "low_stock") filter.stock = { $gt: 0, $lte: 10 };
    else if (status === "in_stock") filter.stock = { $gt: 10 };

    const sortObj: Record<string, 1 | -1> = {};
    if (["stock", "price", "name", "createdAt"].includes(sort)) {
      sortObj[sort] = sortDir;
    } else {
      sortObj.stock = 1;
    }

    const products = await Product.find(filter)
      .select("name sku stock price category image unit")
      .populate("category", "name")
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalCount = await Product.countDocuments(filter);

    const data = products.map((p) => {
      const typed = p as unknown as Record<string, unknown>;
      const stock = typed.stock as number;
      return {
        _id: typed._id?.toString(),
        name: typed.name,
        sku: typed.sku || `PRD-${String(typed._id).slice(-6).toUpperCase()}`,
        stock,
        price: typed.price,
        unit: typed.unit,
        image: typed.image,
        category: (typed.category as Record<string, unknown>)?.name || "N/A",
        status: stock <= 0 ? "out_of_stock" : stock <= 10 ? "low_stock" : "in_stock",
        inventoryValue: stock * (typed.price as number),
      };
    });

    // Aggregate stats (from all active products, not filtered)
    const allProducts = await Product.find({ isActive: true }).select("stock price").lean();
    const totalProducts = allProducts.length;
    const totalStock = allProducts.reduce((sum, p) => sum + ((p as unknown as Record<string, unknown>).stock as number || 0), 0);
    const totalValue = allProducts.reduce((sum, p) => {
      const typed = p as unknown as Record<string, unknown>;
      return sum + ((typed.stock as number || 0) * (typed.price as number || 0));
    }, 0);
    const outOfStockCount = allProducts.filter((p) => ((p as unknown as Record<string, unknown>).stock as number) <= 0).length;
    const lowStockCount = allProducts.filter((p) => {
      const s = (p as unknown as Record<string, unknown>).stock as number;
      return s > 0 && s <= 10;
    }).length;

    return NextResponse.json({
      data,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount,
      stats: { totalProducts, totalStock, totalValue, outOfStockCount, lowStockCount },
    });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Stock adjustment
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { action } = body;

    await dbConnect();

    // Single stock adjustment
    if (action === "adjust" && body.productId) {
      const product = await Product.findById(body.productId);
      if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

      const previousStock = product.stock;
      const newStock = body.newStock;

      if (typeof newStock !== "number" || newStock < 0) {
        return NextResponse.json({ message: "Invalid stock value" }, { status: 400 });
      }

      product.stock = newStock;
      await product.save();

      await StockLog.create({
        product: product._id,
        type: body.type || "adjustment",
        quantity: newStock - previousStock,
        previousStock,
        newStock,
        reason: body.reason || "",
        note: body.note || "",
      });

      return NextResponse.json({ message: "Stock updated", product: { _id: product._id, stock: product.stock } });
    }

    // Bulk stock update
    if (action === "bulkUpdate" && body.updates?.length) {
      const results = [];
      for (const update of body.updates) {
        const product = await Product.findById(update.productId);
        if (!product) continue;
        const previousStock = product.stock;
        product.stock = update.stock;
        await product.save();
        await StockLog.create({
          product: product._id,
          type: "adjustment",
          quantity: update.stock - previousStock,
          previousStock,
          newStock: update.stock,
          reason: body.reason || "Bulk update",
        });
        results.push({ _id: product._id, stock: product.stock });
      }
      return NextResponse.json({ message: "Bulk updated", updated: results.length });
    }

    return NextResponse.json({ message: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
