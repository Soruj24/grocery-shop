import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET() {
  try {
    await dbConnect();
    // Use lean() for faster read and select specific public fields if necessary
    // For now, we return all settings as none seem sensitive (admin settings are public shop info)
    let settings = await Settings.findOne({}).lean();
    
    if (!settings) {
      // Return defaults if no settings exist yet
      return NextResponse.json({});
    }
    
    return NextResponse.json(settings);
  } catch (error: unknown) {
    console.error("Settings API Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}
