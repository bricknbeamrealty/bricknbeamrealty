import { NextRequest, NextResponse } from "next/server";
import {
  getAllPushSubscriptions,
  savePushSubscription,
} from "@/lib/pushSubscriptionsStorage";
import {
  sendNotificationToSubscription,
  PushNotificationPayload,
} from "@/lib/webPush";

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
    const body = await req.json().catch(() => ({}));
    const { endpoint, keys } = body;

    let targetSubs = await getAllPushSubscriptions();

    // If request included specific subscription keys, ensure it's saved/targeted
    if (endpoint && keys) {
      const saved = await savePushSubscription({
        endpoint,
        keys,
        deviceLabel: "Test Device",
      });
      targetSubs = [saved];
    }

    if (targetSubs.length === 0) {
      return NextResponse.json({
        success: false,
        error: "No push subscriptions found to test. Please enable notifications on this device first.",
      });
    }

    const payload: PushNotificationPayload = {
      title: "🔔 Test Lead: Rahul Sharma",
      body: "Residential (3 BHK) • 📞 +91 98200 12345 • 💰 ₹2.4 Cr",
      url: "/admin/leads",
      phone: "+919820012345",
      tag: `test-lead-${Date.now()}`,
      timestamp: Date.now(),
    };

    const results = await Promise.allSettled(
      targetSubs.map((sub) => sendNotificationToSubscription(sub, payload))
    );

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value === true
    ).length;

    return NextResponse.json({
      success: true,
      message: `Test notification sent to ${successful}/${targetSubs.length} device(s).`,
      attempted: targetSubs.length,
      successful,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    console.error("POST /api/admin/push/test error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
