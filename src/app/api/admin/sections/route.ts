import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Section from "@/models/Section";
import { seedSections } from "@/lib/seed-sections";

export async function GET() {
  await dbConnect();
  try {
    await seedSections();
    const sections = await Section.find({}).sort({ order: 1 });
    return NextResponse.json(sections);
  } catch (error) {
    console.error("Section fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch sections" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Check if it's a bulk update (for reordering)
    if (Array.isArray(body)) {
      const operations = body.map((section) => ({
        updateOne: {
          filter: { _id: section._id },
          update: { $set: { order: section.order } },
        },
      }));
      await Section.bulkWrite(operations);
      return NextResponse.json({ message: "Order updated successfully" });
    }

    // Single creation
    const section = await Section.create(body);
    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create/update section" }, { status: 500 });
  }
}
