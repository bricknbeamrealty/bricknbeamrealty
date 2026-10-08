import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabaseServer";

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionRecord {
  id: string;
  endpoint: string;
  keys: PushSubscriptionKeys;
  user_agent?: string | null;
  device_label?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PushSubscriptionInput {
  endpoint: string;
  keys: PushSubscriptionKeys;
  userAgent?: string | null;
  deviceLabel?: string | null;
}

const LOCAL_STORAGE_PATH = path.join(process.cwd(), "src", "data", "push-subscriptions.json");

/**
 * Ensures the dynamic local push subscriptions JSON file exists
 */
function readLocalSubscriptions(): PushSubscriptionRecord[] {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_PATH)) {
      const dir = path.dirname(LOCAL_STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const raw = fs.readFileSync(LOCAL_STORAGE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn("[PushStorage] Local file read fallback error:", err);
    return [];
  }
}

/**
 * Writes subscriptions array to local JSON file
 */
function writeLocalSubscriptions(subscriptions: PushSubscriptionRecord[]) {
  try {
    const dir = path.dirname(LOCAL_STORAGE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(subscriptions, null, 2), "utf8");
  } catch (err) {
    console.error("[PushStorage] Failed to write local subscriptions file:", err);
  }
}

/**
 * Generates deterministic ID for an endpoint
 */
function hashEndpoint(endpoint: string): string {
  return crypto.createHash("sha256").update(endpoint).digest("hex").slice(0, 32);
}

/**
 * Saves or updates a push subscription in Supabase (if available) and local JSON storage
 */
export async function savePushSubscription(input: PushSubscriptionInput): Promise<PushSubscriptionRecord> {
  const now = new Date().toISOString();
  const id = hashEndpoint(input.endpoint);

  const record: PushSubscriptionRecord = {
    id,
    endpoint: input.endpoint,
    keys: input.keys,
    user_agent: input.userAgent || null,
    device_label: input.deviceLabel || "Mobile / Browser Device",
    created_at: now,
    updated_at: now,
  };

  // 1. Always update local storage for guaranteed persistence
  const localList = readLocalSubscriptions();
  const existingIndex = localList.findIndex((s) => s.endpoint === input.endpoint);
  if (existingIndex >= 0) {
    localList[existingIndex] = {
      ...localList[existingIndex],
      ...record,
      created_at: localList[existingIndex].created_at,
    };
  } else {
    localList.push(record);
  }
  writeLocalSubscriptions(localList);

  // 2. Attempt Supabase upsert if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase.from("admin_push_subscriptions").upsert({
        id: record.id,
        endpoint: record.endpoint,
        p256dh: record.keys.p256dh,
        auth: record.keys.auth,
        user_agent: record.user_agent,
        device_label: record.device_label,
        updated_at: record.updated_at,
      });
    } catch {
      // Supabase table may not exist yet, local storage is active
    }
  }

  return record;
}

/**
 * Retrieves all registered push subscriptions
 */
export async function getAllPushSubscriptions(): Promise<PushSubscriptionRecord[]> {
  // If Supabase is configured, try to fetch from it
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      const { data, error } = await supabase
        .from("admin_push_subscriptions")
        .select("*");

      if (!error && Array.isArray(data)) {
        return data.map((row: {
          id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          user_agent?: string | null;
          device_label?: string | null;
          created_at?: string;
          updated_at?: string;
        }) => ({
          id: row.id,
          endpoint: row.endpoint,
          keys: {
            p256dh: row.p256dh,
            auth: row.auth,
          },
          user_agent: row.user_agent || null,
          device_label: row.device_label || null,
          created_at: row.created_at || new Date().toISOString(),
          updated_at: row.updated_at || new Date().toISOString(),
        }));
      }
    } catch {
      // Fallback to local
    }
  }

  return readLocalSubscriptions();
}

/**
 * Removes a subscription (e.g., when unsubscribing or expired 410 Gone)
 */
export async function removePushSubscription(endpoint: string): Promise<void> {
  const id = hashEndpoint(endpoint);

  // 1. Remove from local storage
  const localList = readLocalSubscriptions().filter(
    (s) => s.endpoint !== endpoint && s.id !== id
  );
  writeLocalSubscriptions(localList);

  // 2. Remove from Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseServerClient();
      await supabase
        .from("admin_push_subscriptions")
        .delete()
        .or(`endpoint.eq.${endpoint},id.eq.${id}`);
    } catch {
      // Ignore
    }
  }
}
