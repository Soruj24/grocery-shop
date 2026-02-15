import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Stricter rate limiting for signup
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const { success } = rateLimit(ip);
    
    if (!success) {
      return NextResponse.json(
        { message: "Too many signup attempts. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // First user is admin (optional, for setup convenience)
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "customer";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(
      { message: "User created successfully", user: { id: user._id, name: user.name, role: user.role } },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
