import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from "@/database/user.model";

export async function GET() {
  try {
    await connectDB();
    
    const users = await User.find({}).limit(10);
    
    return NextResponse.json({
      message: "Database connected successfully",
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
