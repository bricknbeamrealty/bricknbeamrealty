"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  Calendar,
  RefreshCw,
  ArrowRight,
  PieChart as PieIcon,
  BarChart3,
  LineChart as LineIcon,
  AlertCircle,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useAdminAuth } from "./AdminAuthContext";

interface AnalyticsResponse {
  success: boolean;
  isConfigured: boolean;
  stats: {
    totalLeads: number;
    newThisWeek: number;
    conversionRate: number;
    convertedCount: number;
  };
  timeSeries: Array<{
    date: string;
    fullDate: string;
    leads: number;
  }>;
  statusBreakdown: Array<{
    key: string;
    name: string;
    value: number;
    percentage: number;
    color: string;
  }>;
  segmentMatrix: Array<{
    segment: string;
    category: string;
    transaction: string;
    count: number;
  }>;
}

export default function AdminDashboardPage() {
  const { passcode } = useAdminAuth();

  const [daysToggle, setDaysToggle] = useState<30 | 90>(30);
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAnalytics = useCallback(
    async (isManual = false) => {
      if (isManual) setIsRefreshing(true);
      else setIsLoading(true);
      setErrorMsg(null);

      try {
        const res = await fetch(`/api/admin/analytics?days=${daysToggle}`, {
          headers: {
            "x-admin-passcode": passcode,
          },
        });
        const result = await res.json();
        if (res.ok && result.success) {
          setData(result);
        } else {
          setErrorMsg(result.error || "Failed to load analytics data.");
        }
      } catch (err) {
        console.error("Failed to load analytics:", err);
        setErrorMsg("Network error contacting analytics API.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [passcode, daysToggle]
  );

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const stats = data?.stats || {
    totalLeads: 0,
    newThisWeek: 0,
    conversionRate: 0,
    convertedCount: 0,
  };

  const hasData = (data?.stats.totalLeads || 0) > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
      {/* =========================================================================
          TOP HEADER & RANGE CONTROLS
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Track your website leads and performance in real time.
          </p>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Days Toggle (30 vs 90 days) */}
          <div className="inline-flex rounded-xl bg-[#14161a] p-1 border border-white/10 text-xs">
            <button
              type="button"
              onClick={() => setDaysToggle(30)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                daysToggle === 30
                  ? "bg-[#a01115] text-white shadow-md shadow-[#a01115]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              onClick={() => setDaysToggle(90)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                daysToggle === 90
                  ? "bg-[#a01115] text-white shadow-md shadow-[#a01115]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Last 90 Days
            </button>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={() => fetchAnalytics(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
            title="Refresh analytics data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#a01115]" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error / Warning Alert */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Database Setup Callout if not configured */}
      {data && !data.isConfigured && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-amber-200 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Supabase database keys not yet configured in <code className="bg-black/30 px-1 py-0.5 rounded">.env.local</code>. Run the SQL schema in your Supabase dashboard to start live data aggregation.
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="text-amber-300 underline font-semibold hover:text-white shrink-0"
          >
            Go to Leads &rarr;
          </Link>
        </div>
      )}

      {/* =========================================================================
          ROW 1: 4 TOP STAT CARDS
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat Card 1: Total Leads */}
        <div className="bg-[#131519] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#a01115]/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Total Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#a01115] transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {isLoading ? "..." : stats.totalLeads}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            All enquiries received
          </p>
        </div>

        {/* Stat Card 2: New This Week */}
        <div className="bg-[#131519] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#a01115]/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              New This Week
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-[#a01115] transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {isLoading ? "..." : stats.newThisWeek}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            Received in the last 7 days
          </p>
        </div>

        {/* Stat Card 3: Conversion Rate */}
        <div className="bg-[#131519] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#a01115]/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 transition-colors">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {isLoading ? "..." : `${stats.conversionRate}%`}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            {stats.convertedCount} of {stats.totalLeads} leads converted
          </p>
        </div>

        {/* Stat Card 4: Converted Count */}
        <div className="bg-[#131519] border border-white/10 rounded-2xl p-5 shadow-xl relative overflow-hidden group hover:border-[#a01115]/30 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Converted Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-emerald-400 tracking-tight">
            {isLoading ? "..." : stats.convertedCount}
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            Successfully closed deals
          </p>
        </div>
      </div>

      {/* =========================================================================
          THE THREE CHARTS
          1. Line Chart: Leads Over Time
          2. Pie Chart: Leads by Status
          3. Bar Chart: Leads by Property & Type
          ========================================================================= */}

      {/* CHART 1: LINE CHART (Leads Over Time) */}
      <div className="bg-[#131519] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <LineIcon className="w-4 h-4 text-[#a01115]" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Leads Over Time
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Daily enquiries over the last {daysToggle} days.
            </p>
          </div>
        </div>

        <div className="h-[280px] sm:h-[320px] w-full pt-4">
          {!hasData && !isLoading ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
              <LineIcon className="w-8 h-8 mb-2 opacity-40 text-[#a01115]" />
              <p className="text-sm font-semibold text-zinc-300">No leads yet</p>
              <p className="text-xs text-zinc-500 max-w-xs mt-1">
                Your daily enquiries will appear here as visitors submit forms.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data?.timeSeries || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#22252a" vertical={false} />
                <XAxis
                  dataKey="date"
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#27272a" }}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: "#27272a" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181a20",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    fontSize: "12px",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#a1a1aa", fontWeight: 600 }}
                  formatter={(value) => [`${value} Leads`, "Enquiries"]}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#a01115"
                  strokeWidth={2.8}
                  dot={{ r: 3, fill: "#a01115", strokeWidth: 1.5, stroke: "#fff" }}
                  activeDot={{ r: 6, fill: "#fff", stroke: "#a01115", strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* GRID FOR CHARTS 2 & 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CHART 2: PIE CHART (Lead Status Breakdown) - 5 Cols */}
        <div className="lg:col-span-5 bg-[#131519] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <PieIcon className="w-4 h-4 text-[#a01115]" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Leads by Status
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Breakdown of leads by their current status.
            </p>
          </div>

          <div className="h-[270px] sm:h-[300px] w-full flex items-center justify-center my-2">
            {!hasData && !isLoading ? (
              <div className="h-full w-full flex flex-col items-center justify-center text-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
                <PieIcon className="w-8 h-8 mb-2 opacity-40 text-amber-500" />
                <p className="text-sm font-semibold text-zinc-300">No leads yet</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Status distribution will appear here once leads are received.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.statusBreakdown || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {(data?.statusBreakdown || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#181a20",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    formatter={(value, name, props) => [
                      `${value} (${props.payload?.percentage || 0}%)`,
                      name,
                    ]}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    formatter={(val) => (
                      <span className="text-xs text-zinc-300">{val}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <span>6 Stages</span>
            <Link
              href="/admin/leads"
              className="text-[#a01115] hover:text-rose-400 inline-flex items-center gap-1 font-semibold"
            >
              <span>View All Leads</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* CHART 3: BAR CHART (Category x Transaction Type) - 7 Cols */}
        <div className="lg:col-span-7 bg-[#131519] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-[#a01115]" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Leads by Property &amp; Type
              </h2>
            </div>
            <p className="text-xs text-zinc-400">
              Residential and Commercial leads for Buy, Sell, and Rent.
            </p>
          </div>

          <div className="h-[270px] sm:h-[300px] w-full pt-4">
            {!hasData && !isLoading ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
                <BarChart3 className="w-8 h-8 mb-2 opacity-40 text-blue-500" />
                <p className="text-sm font-semibold text-zinc-300">No leads yet</p>
                <p className="text-xs text-zinc-500 max-w-xs mt-1">
                  Property category and type breakdown will appear here.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.segmentMatrix || []}
                  margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#22252a" vertical={false} />
                  <XAxis
                    dataKey="segment"
                    stroke="#71717a"
                    fontSize={10}
                    tickLine={false}
                    axisLine={{ stroke: "#27272a" }}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "#27272a" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#181a20",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`${value} Enquiries`, "Count"]}
                  />
                  <Bar
                    dataKey="count"
                    name="Leads"
                    fill="#a01115"
                    radius={[6, 6, 0, 0]}
                  >
                    {(data?.segmentMatrix || []).map((entry, index) => {
                      // Alternate bar colors between brand maroon and rich stone for grouped aesthetics
                      const isResidential = entry.category === "Residential";
                      const fill = isResidential ? "#a01115" : "#44403c";
                      return <Cell key={`bar-${index}`} fill={fill} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#a01115] inline-block" />
                <span>Residential</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#44403c] inline-block" />
                <span>Commercial</span>
              </span>
            </div>
            <span className="text-[10px] text-zinc-500">Thane &amp; MMR</span>
          </div>
        </div>
      </div>
    </div>
  );
}
