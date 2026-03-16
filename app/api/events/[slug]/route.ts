import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";

/** Matches valid URL-friendly slugs: lowercase alphanumeric with hyphens */
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _req: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;

    // Validate slug presence and format
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 },
      );
    }

    const trimmedSlug = slug.trim().toLowerCase();

    if (!SLUG_PATTERN.test(trimmedSlug)) {
      return NextResponse.json(
        { message: "Invalid slug format. Use lowercase alphanumeric characters and hyphens only" },
        { status: 400 },
      );
    }

    await connectDB();

    const event: IEvent | null = await Event.findOne({ slug: trimmedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event not found for slug: ${trimmedSlug}` },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
