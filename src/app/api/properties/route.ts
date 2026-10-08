import { NextRequest, NextResponse } from "next/server";
import { getAllProperties } from "@/lib/propertiesStorage";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get("featured") === "true";
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();

    let properties = await getAllProperties();

    if (featuredOnly) {
      properties = properties.filter((p) => p.isFeatured);
    }

    if (category && category !== "all") {
      properties = properties.filter((p) => p.propertyType === category);
    }

    if (status && status !== "all") {
      properties = properties.filter((p) => p.status === status);
    }

    if (search) {
      properties = properties.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.developer.toLowerCase().includes(search) ||
          p.location.toLowerCase().includes(search) ||
          p.subLocation.toLowerCase().includes(search) ||
          p.rera.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("GET /api/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
