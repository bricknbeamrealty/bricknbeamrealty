import { NextRequest, NextResponse } from "next/server";
import { savePushSubscription } from "@/lib/pushSubscriptionsStorage";

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
    const { endpoint, keys, deviceLabel } = body;

    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      return NextResponse.json(
        { success: false, error: "Invalid subscription payload." },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || undefined;

    const record = await savePushSubscription({
      endpoint,
      keys: {
        p256dh: keys.p256dh,
        auth: keys.auth,
      },
      userAgent,
      deviceLabel: deviceLabel || "Admin Device",
    });

    return NextResponse.json({
      success: true,
      message: "Push subscription registered successfully.",
      subscriptionId: record.id,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("POST /api/admin/push/subscribe error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
