import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseServerClient,
  isSupabaseConfigured,
  LeadStatus,
} from "@/lib/supabaseServer";

function verifyAdminAuth(req: NextRequest): boolean {
  const passcode = req.headers.get("x-admin-passcode");
  const expectedPasscode = process.env.ADMIN_PASSCODE || "bnbadmin2026";
  return Boolean(passcode && passcode === expectedPasscode);
}

const ALL_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "site_visit",
  "negotiation",
  "converted",
  "lost",
];

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Invalid admin passcode." },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      success: true,
      isConfigured: false,
      stats: {
        totalLeads: 0,
        newThisWeek: 0,
        conversionRate: 0,
        convertedCount: 0,
      },
      timeSeries: [],
      statusBreakdown: [],
      segmentMatrix: [],
    });
  }

  try {
    const { searchParams } = new URL(req.url);
    const rangeDays = parseInt(searchParams.get("days") || "30", 10);

    const supabase = getSupabaseServerClient();

    // Fetch all leads (or within extended window) for accurate aggregation
    const { data: leads, error } = await supabase
      .from("leads")
      .select("id, created_at, status, property_category, transaction_type")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase analytics fetch error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const allLeads = leads || [];
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const windowStart = new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000);

    // 1. Top Stat Cards
    const totalLeads = allLeads.length;
    const newThisWeek = allLeads.filter(
      (l) => new Date(l.created_at) >= sevenDaysAgo
    ).length;
    const convertedCount = allLeads.filter((l) => l.status === "converted").length;
    const conversionRate = totalLeads > 0
      ? parseFloat(((convertedCount / totalLeads) * 100).toFixed(1))
      : 0;

    // 2. Line Chart: Leads Over Time (Daily buckets for rangeDays)
    const dateBucketMap = new Map<string, number>();

    // Pre-populate everyday within range to ensure continuous unbroken line
    for (let i = rangeDays - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0]; // YYYY-MM-DD
      dateBucketMap.set(key, 0);
    }

    allLeads.forEach((l) => {
      const leadDate = new Date(l.created_at);
      if (leadDate >= windowStart) {
        const key = leadDate.toISOString().split("T")[0];
        if (dateBucketMap.has(key)) {
          dateBucketMap.set(key, (dateBucketMap.get(key) || 0) + 1);
        }
      }
    });

    const timeSeries = Array.from(dateBucketMap.entries()).map(([dateStr, count]) => {
      const d = new Date(dateStr);
      const displayDate = d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });
      return {
        date: displayDate,
        fullDate: dateStr,
        leads: count,
      };
    });

    // 3. Pie Chart: Status Breakdown
    const statusCounts: Record<string, number> = {};
    ALL_STATUSES.forEach((st) => {
      statusCounts[st] = 0;
    });

    allLeads.forEach((l) => {
      const st = l.status || "new";
      statusCounts[st] = (statusCounts[st] || 0) + 1;
    });

    const statusLabels: Record<LeadStatus, string> = {
      new: "New",
      contacted: "Contacted",
      site_visit: "Site Visit",
      negotiation: "Negotiation",
      converted: "Converted",
      lost: "Lost",
    };

    // Palette matched to Brick & Beams luxury system
    const statusColors: Record<LeadStatus, string> = {
      new: "#a01115",          // Brand Maroon
      contacted: "#d97706",    // Warm Amber
      site_visit: "#2563eb",   // Royal Blue
      negotiation: "#7c3aed",  // Deep Purple
      converted: "#16a34a",    // Emerald Green
      lost: "#78716c",         // Neutral Stone Grey
    };

    const statusBreakdown = ALL_STATUSES.map((st) => {
      const count = statusCounts[st] || 0;
      const percentage = totalLeads > 0
        ? parseFloat(((count / totalLeads) * 100).toFixed(1))
        : 0;
      return {
        key: st,
        name: statusLabels[st],
        value: count,
        percentage,
        color: statusColors[st],
      };
    }).filter((item) => totalLeads === 0 || item.value > 0);

    // 4. Bar Chart: Property Category x Transaction Type
    // Segments: Residential-Buy, Residential-Sell, Residential-Rent, Commercial-Buy, Commercial-Sell, Commercial-Rent
    const segments = [
      { key: "Residential-Buy", category: "residential", transaction: "buy" },
      { key: "Residential-Sell", category: "residential", transaction: "sell" },
      { key: "Residential-Rent", category: "residential", transaction: "rent" },
      { key: "Commercial-Buy", category: "commercial", transaction: "buy" },
      { key: "Commercial-Sell", category: "commercial", transaction: "sell" },
      { key: "Commercial-Rent", category: "commercial", transaction: "rent" },
    ];

    const segmentMatrix = segments.map((seg) => {
      const count = allLeads.filter(
        (l) =>
          (l.property_category || "residential").toLowerCase() === seg.category &&
          (l.transaction_type || "buy").toLowerCase() === seg.transaction
      ).length;

      return {
        segment: seg.key,
        category: seg.category === "residential" ? "Residential" : "Commercial",
        transaction: seg.transaction.toUpperCase(),
        count,
      };
    });

    return NextResponse.json({
      success: true,
      isConfigured: true,
      stats: {
        totalLeads,
        newThisWeek,
        conversionRate,
        convertedCount,
      },
      timeSeries,
      statusBreakdown,
      segmentMatrix,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    console.error("GET /api/admin/analytics error:", err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
