import webpush from "web-push";
import {
  getAllPushSubscriptions,
  removePushSubscription,
  PushSubscriptionRecord,
} from "./pushSubscriptionsStorage";
import { Lead, LeadInput } from "./supabaseServer";

const DEFAULT_VAPID_PUBLIC_KEY =
  "BBgJbD27mGFNGjt7B_NXLZN2DueA-Tzu2JqSkNB6zWb-sDFbUjcZHmQBtU2hOQ-zClcWSrhRMRb6aPOGHzwUWTU";
const DEFAULT_VAPID_PRIVATE_KEY =
  "zsGggS3FCcDlQ1n47D65rZs_kd52_9PtFCSzjbgRrcg";
const DEFAULT_VAPID_SUBJECT = "mailto:admin@bricknbeams.com";

export function getVapidPublicKey(): string {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || DEFAULT_VAPID_PUBLIC_KEY;
}

export function getVapidPrivateKey(): string {
  return process.env.VAPID_PRIVATE_KEY || DEFAULT_VAPID_PRIVATE_KEY;
}

export function getVapidSubject(): string {
  return process.env.VAPID_SUBJECT || DEFAULT_VAPID_SUBJECT;
}

let isVapidConfigured = false;
function ensureVapidConfig() {
  if (isVapidConfigured) return;
  const publicKey = getVapidPublicKey();
  const privateKey = getVapidPrivateKey();
  const subject = getVapidSubject();

  if (publicKey && privateKey) {
    webpush.setVapidDetails(subject, publicKey, privateKey);
    isVapidConfigured = true;
  }
}

export interface PushNotificationPayload {
  title: string;
  body: string;
  url?: string;
  leadId?: string;
  phone?: string;
  tag?: string;
  timestamp?: number;
  data?: Record<string, unknown>;
}

/**
 * Sends a notification payload to a single subscription
 */
export async function sendNotificationToSubscription(
  sub: PushSubscriptionRecord,
  payload: PushNotificationPayload
): Promise<boolean> {
  ensureVapidConfig();

  const pushSubscription = {
    endpoint: sub.endpoint,
    keys: {
      p256dh: sub.keys.p256dh,
      auth: sub.keys.auth,
    },
  };

  try {
    await webpush.sendNotification(
      pushSubscription,
      JSON.stringify(payload),
      {
        TTL: 60 * 60 * 24, // 24 hours retention on push server
        urgency: "high",
      }
    );
    return true;
  } catch (err: unknown) {
    const error = err as { statusCode?: number; message?: string };
    console.warn(`[WebPush] Failed sending push to ${sub.endpoint.slice(0, 30)}...:`, error.statusCode || error.message);

    // If subscription is expired or unsubscribed (404 Not Found or 410 Gone), automatically prune it
    if (error.statusCode === 404 || error.statusCode === 410) {
      console.info(`[WebPush] Pruning expired subscription: ${sub.id}`);
      await removePushSubscription(sub.endpoint);
    }
    return false;
  }
}

/**
 * Broadcasts a new lead notification to all registered admin devices
 */
export async function notifyAdminsOfNewLead(lead: Lead | LeadInput): Promise<{
  attempted: number;
  successful: number;
}> {
  try {
    const subscriptions = await getAllPushSubscriptions();
    if (!subscriptions || subscriptions.length === 0) {
      console.log("[WebPush] No admin push subscriptions registered yet.");
      return { attempted: 0, successful: 0 };
    }

    const leadName = lead.full_name || "New Client";
    const req = lead.requirement || "General Property Inquiry";
    const budget = lead.price_range ? ` • 💰 ${lead.price_range}` : "";
    const phone = lead.phone || "";

    const payload: PushNotificationPayload = {
      title: `🚨 New Lead: ${leadName}`,
      body: `${req} • 📞 ${phone}${budget}`,
      url: "/admin/leads",
      phone: lead.phone,
      leadId: "id" in lead ? lead.id : undefined,
      tag: `lead-${Date.now()}`,
      timestamp: Date.now(),
      data: {
        lead,
      },
    };

    console.log(`[WebPush] Broadcasting new lead notification to ${subscriptions.length} devices...`);

    const results = await Promise.allSettled(
      subscriptions.map((sub) => sendNotificationToSubscription(sub, payload))
    );

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value === true
    ).length;

    console.log(`[WebPush] Successfully pushed notification to ${successful}/${subscriptions.length} devices.`);

    return {
      attempted: subscriptions.length,
      successful,
    };
  } catch (err) {
    console.error("[WebPush] notifyAdminsOfNewLead error:", err);
    return { attempted: 0, successful: 0 };
  }
}

/**
 * Sends a test push notification to verify device connectivity
 */
export async function sendTestNotificationToDevice(
  subscription: PushSubscriptionRecord
): Promise<boolean> {
  const payload: PushNotificationPayload = {
    title: "🔔 B&B Admin Notifications Active!",
    body: "Push alerts are successfully configured. You will receive instant notifications whenever a new lead arrives.",
    url: "/admin/leads",
    tag: `test-${Date.now()}`,
    timestamp: Date.now(),
  };

  return sendNotificationToSubscription(subscription, payload);
}
