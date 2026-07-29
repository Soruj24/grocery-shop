import { NextResponse } from "next/server";
import dbConnect from "@/config/mongodb";
import Role from "@/schemas/Role";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";

const defaultRoles = [
  { name: "Admin", description: "Full access to all features", isSystem: true, permissions: [] },
  { name: "Manager", description: "Manage products, orders, customers", isSystem: false, permissions: [] },
  { name: "Support", description: "Handle support tickets and returns", isSystem: false, permissions: [] },
  { name: "Editor", description: "Manage content and products", isSystem: false, permissions: [] },
];

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    await dbConnect();
    const count = await Role.countDocuments();
    if (count === 0) await Role.insertMany(defaultRoles);
    const data = await Role.find({}).sort({ name: 1 }).lean();
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
    const role = await Role.create(body);
    return NextResponse.json(role, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
