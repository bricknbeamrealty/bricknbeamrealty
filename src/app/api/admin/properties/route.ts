import { NextRequest, NextResponse } from "next/server";
import {
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/propertiesStorage";
import { Property } from "@/data/properties";

export const dynamic = "force-dynamic";

function verifyAdminAuth(req: NextRequest): boolean {
  const passcode = req.headers.get("x-admin-passcode");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "bnbadmin2026";
  return Boolean(passcode && passcode === expectedPasscode);
}

// GET /api/admin/properties - Fetch all properties with stats
export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const properties = await getAllProperties();

    const stats = {
      total: properties.length,
      featured: properties.filter((p) => p.isFeatured).length,
      underConstruction: properties.filter((p) => p.status === "Under Construction").length,
      readyToMove: properties.filter((p) => p.status === "Ready to Move").length,
      residential: properties.filter((p) => p.propertyType === "residential").length,
      commercial: properties.filter((p) => p.propertyType === "commercial").length,
    };

    return NextResponse.json({
      success: true,
      properties,
      stats,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("GET /api/admin/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// POST /api/admin/properties - Create a new property
export async function POST(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    if (!body.title || !body.developer) {
      return NextResponse.json(
        { success: false, error: "Property title and developer are required." },
        { status: 400 }
      );
    }

    const created = await createProperty(body);

    return NextResponse.json({
      success: true,
      property: created,
      message: `Property "${created.title}" successfully created.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("POST /api/admin/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// PUT /api/admin/properties - Full update of an existing property
export async function PUT(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Property id is required for update." },
        { status: 400 }
      );
    }

    const updated = await updateProperty(id, body as Partial<Property>);

    return NextResponse.json({
      success: true,
      property: updated,
      message: `Property "${updated.title}" updated successfully.`,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("PUT /api/admin/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// PATCH /api/admin/properties - Quick partial updates (toggle featured, toggle status)
export async function PATCH(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Property id is required." },
        { status: 400 }
      );
    }

    const updated = await updateProperty(id, updates);

    return NextResponse.json({
      success: true,
      property: updated,
      message: "Property updated.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("PATCH /api/admin/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

// DELETE /api/admin/properties?id=... - Delete a property
export async function DELETE(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing property id parameter." },
        { status: 400 }
      );
    }

    const deleted = await deleteProperty(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Property with id "${id}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Property successfully deleted.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Error";
    console.error("DELETE /api/admin/properties error:", err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
