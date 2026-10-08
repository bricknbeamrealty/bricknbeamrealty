import { NextRequest, NextResponse } from "next/server";
import { removePushSubscription } from "@/lib/pushSubscriptionsStorage";

function verifyAdminAuth(req: NextRequest): boolean {
  const passcode = req.headers.get("x-admin-passcode");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "bnbadmin2026";
  return Boolean(passcode && passcode === expectedPasscode);
}

export async function POST(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { endpoint } = body;

    if (!endpoint) {
      return NextResponse.json(
        { success: false, error: "Endpoint is required." },
        { status: 400 }
      );
    }

    await removePushSubscription(endpoint);

    return NextResponse.json({
      success: true,
      message: "Push subscription removed successfully.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("POST /api/admin/push/unsubscribe error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
