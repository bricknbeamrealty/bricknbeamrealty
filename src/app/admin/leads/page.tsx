"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Download,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons/BrandIcons";
import { useAdminAuth } from "../AdminAuthContext";
import { useAdminTheme, AdminThemeIconButton } from "../AdminThemeContext";
import { AdminNotificationCenter } from "../AdminPwaComponents";
import { Lead, LeadStatus } from "@/lib/supabaseServer";

const ALL_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "site_visit",
  "negotiation",
  "converted",
  "lost",
];

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  site_visit: "Site Visit",
  negotiation: "Negotiation",
  converted: "Converted",
  lost: "Lost",
};

export default function AdminLeadsPage() {
  const { passcode } = useAdminAuth();
  const { isDark } = useAdminTheme();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [transactionFilter, setTransactionFilter] = useState<string>("all");

  // Notifications
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3500);
    },
    []
  );

  // Fetch leads from Supabase via admin API
  const fetchLeads = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh) {
        setIsRefreshing(true);
      }

      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (transactionFilter !== "all")
          params.set("transaction", transactionFilter);
        if (searchTerm.trim()) params.set("search", searchTerm.trim());

        const res = await fetch(`/api/admin/leads?${params.toString()}`, {
          headers: { "x-admin-passcode": passcode },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setLeads(data.leads || []);
          setTotalCount(data.totalCount || 0);
          setIsConfigured(data.isConfigured !== false);
        } else {
          showToast(
            "error",
            data.error || "Failed to load leads from Supabase."
          );
        }
      } catch (err) {
        console.error("Fetch leads error:", err);
        showToast("error", "Network error contacting leads API.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [
      passcode,
      statusFilter,
      categoryFilter,
      transactionFilter,
      searchTerm,
      showToast,
    ]
  );

  useEffect(() => {
    let ignore = false;
    void (async () => {
      await Promise.resolve();
      if (!ignore) {
        await fetchLeads();
      }
    })();
    return () => {
      ignore = true;
    };
  }, [fetchLeads]);

  // Handle inline status change writing directly back to Supabase
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );

    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          "success",
          `Lead status updated to "${STATUS_LABELS[newStatus]}"`
        );
      } else {
        showToast("error", data.error || "Failed to persist status change.");
        // Revert on failure
        fetchLeads();
      }
    } catch (err) {
      console.error("Status update error:", err);
      showToast("error", "Network error updating status.");
      fetchLeads();
    } finally {
      setUpdatingId(null);
    }
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (leads.length === 0) {
      showToast("error", "No leads available to export.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "Requirement",
      "Budget / Price",
      "Property Stage",
      "Category",
      "Transaction",
      "Status",
      "Source",
      "Notes",
      "Created At",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.full_name || ""}"`,
      `"${l.phone || ""}"`,
      `"${l.email || ""}"`,
      `"${l.requirement || ""}"`,
      `"${l.price_range || ""}"`,
      `"${l.property_stage || ""}"`,
      `"${l.property_category || "residential"}"`,
      `"${l.transaction_type || "buy"}"`,
      `"${l.status || "new"}"`,
      `"${l.source || "modal"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(l.created_at).toLocaleString("en-IN")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `brick_n_beams_leads_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("success", "Exported leads to CSV.");
  };

  // Theme-aware status badge classes
  const getStatusBadgeClass = (status: LeadStatus) => {
    if (isDark) {
      switch (status) {
        case "new":
          return "bg-rose-950/80 text-rose-300 border-rose-800/60";
        case "contacted":
          return "bg-amber-950/80 text-amber-300 border-amber-800/60";
        case "site_visit":
          return "bg-blue-950/80 text-blue-300 border-blue-800/60";
        case "negotiation":
          return "bg-purple-950/80 text-purple-300 border-purple-800/60";
        case "converted":
          return "bg-emerald-950/80 text-emerald-300 border-emerald-800/60";
        case "lost":
        default:
          return "bg-zinc-800/90 text-zinc-400 border-zinc-700/60";
      }
    } else {
      switch (status) {
        case "new":
          return "bg-rose-50 text-rose-700 border-rose-200";
        case "contacted":
          return "bg-amber-50 text-amber-700 border-amber-200";
        case "site_visit":
          return "bg-blue-50 text-blue-700 border-blue-200";
        case "negotiation":
          return "bg-purple-50 text-purple-700 border-purple-200";
        case "converted":
          return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "lost":
        default:
          return "bg-zinc-100 text-zinc-600 border-zinc-300";
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full transition-colors duration-200">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-md transition-all ${
            toast.type === "success"
              ? isDark
                ? "bg-emerald-950/90 text-emerald-200 border border-emerald-700/60"
                : "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-md"
              : isDark
              ? "bg-rose-950/90 text-rose-200 border border-rose-700/60"
              : "bg-rose-50 text-rose-800 border border-rose-300 shadow-md"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b transition-colors duration-200 ${
          isDark ? "border-white/10" : "border-zinc-200"
        }`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Leads
          </h1>
          <p
            className={`text-xs mt-1 transition-colors ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            View, search, and update client enquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <AdminNotificationCenter />

          <button
            type="button"
            onClick={() => fetchLeads(true)}
            disabled={isRefreshing}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all disabled:opacity-50 cursor-pointer ${
              isDark
                ? "bg-white/5 border-white/10 text-zinc-200 hover:text-white hover:bg-white/10"
                : "bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 shadow-xs"
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${
                isRefreshing ? "animate-spin text-[#a01115]" : ""
              }`}
            />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#a01115] hover:bg-[#850e11] text-white text-xs font-medium shadow-md shadow-[#a01115]/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Theme Quick Switcher in Header */}
          <AdminThemeIconButton />
        </div>
      </div>

      {/* Environment Setup Banner if Supabase not configured */}
      {!isConfigured && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            isDark
              ? "bg-amber-950/40 border-amber-800/50 text-amber-200"
              : "bg-amber-50 border-amber-200 text-amber-900"
          }`}
        >
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-500">
              Supabase Connection Required
            </p>
            <p className="opacity-90">
              Please paste your{" "}
              <code className="bg-black/10 px-1 py-0.5 rounded">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and{" "}
              <code className="bg-black/10 px-1 py-0.5 rounded">
                SUPABASE_SERVICE_ROLE_KEY
              </code>{" "}
              into{" "}
              <code className="bg-black/10 px-1 py-0.5 rounded">.env.local</code>{" "}
              to activate live database reads.
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3.5 rounded-2xl border transition-colors duration-200 ${
          isDark
            ? "bg-[#131519] border-white/10"
            : "bg-white border-zinc-200 shadow-xs"
        }`}
      >
        {/* Search */}
        <div className="relative">
          <Search
            className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-[#a01115] focus:ring-1 focus:ring-[#a01115] transition-all ${
              isDark
                ? "bg-zinc-900 border border-white/10 text-white placeholder-zinc-500"
                : "bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:bg-white"
            }`}
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`w-full rounded-xl px-3 py-2 text-xs outline-none focus:border-[#a01115] appearance-none cursor-pointer transition-all ${
              isDark
                ? "bg-zinc-900 border border-white/10 text-zinc-200"
                : "bg-zinc-50 border border-zinc-200 text-zinc-800 focus:bg-white"
            }`}
          >
            <option value="all">All Statuses ({totalCount})</option>
            {ALL_STATUSES.map((st) => (
              <option key={st} value={st}>
                Status: {STATUS_LABELS[st]}
              </option>
            ))}
          </select>
          <ChevronDown
            className={`w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`w-full rounded-xl px-3 py-2 text-xs outline-none focus:border-[#a01115] appearance-none cursor-pointer transition-all ${
              isDark
                ? "bg-zinc-900 border border-white/10 text-zinc-200"
                : "bg-zinc-50 border border-zinc-200 text-zinc-800 focus:bg-white"
            }`}
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential Only</option>
            <option value="commercial">Commercial Only</option>
          </select>
          <ChevronDown
            className={`w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          />
        </div>

        {/* Transaction Filter */}
        <div className="relative">
          <select
            value={transactionFilter}
            onChange={(e) => setTransactionFilter(e.target.value)}
            className={`w-full rounded-xl px-3 py-2 text-xs outline-none focus:border-[#a01115] appearance-none cursor-pointer transition-all ${
              isDark
                ? "bg-zinc-900 border border-white/10 text-zinc-200"
                : "bg-zinc-50 border border-zinc-200 text-zinc-800 focus:bg-white"
            }`}
          >
            <option value="all">All Transaction Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
          <ChevronDown
            className={`w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          />
        </div>
      </div>

      {/* Leads Table Container */}
      <div
        className={`border rounded-2xl overflow-hidden transition-all ${
          isDark
            ? "bg-[#131519] border-white/10 shadow-2xl"
            : "bg-white border-zinc-200 shadow-xs"
        }`}
      >
        <div
          className={`overflow-x-auto ${
            isDark ? "custom-scrollbar-dark" : "custom-scrollbar-admin-light"
          }`}
        >
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead
              className={`border-b uppercase tracking-wider font-semibold text-[10px] transition-colors ${
                isDark
                  ? "bg-[#17191e] border-white/10 text-zinc-400"
                  : "bg-zinc-50/90 border-zinc-200 text-zinc-600"
              }`}
            >
              <tr>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Category &amp; Type</th>
                <th className="py-3.5 px-4">Requirement</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody
              className={`divide-y transition-colors ${
                isDark
                  ? "divide-white/5 text-zinc-200"
                  : "divide-zinc-100 text-zinc-800"
              }`}
            >
              {isLoading ? (
                // Loading Skeleton Rows
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-4">
                      <div
                        className={`h-4 rounded w-28 mb-1.5 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                      <div
                        className={`h-3 rounded w-16 ${
                          isDark ? "bg-white/5" : "bg-zinc-100"
                        }`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`h-4 rounded w-24 mb-1.5 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                      <div
                        className={`h-3 rounded w-32 ${
                          isDark ? "bg-white/5" : "bg-zinc-100"
                        }`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`h-5 rounded-full w-20 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`h-4 rounded w-32 mb-1 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                      <div
                        className={`h-3 rounded w-20 ${
                          isDark ? "bg-white/5" : "bg-zinc-100"
                        }`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`h-7 rounded-xl w-28 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`h-3 rounded w-20 ${
                          isDark ? "bg-white/10" : "bg-zinc-200"
                        }`}
                      />
                    </td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                          isDark
                            ? "bg-white/5 border-white/10 text-zinc-500"
                            : "bg-zinc-100 border-zinc-200 text-zinc-400"
                        }`}
                      >
                        <Users className="w-6 h-6" />
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          isDark ? "text-zinc-200" : "text-zinc-800"
                        }`}
                      >
                        No leads found
                      </p>
                      <p
                        className={`text-xs max-w-sm ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        {searchTerm ||
                        statusFilter !== "all" ||
                        categoryFilter !== "all"
                          ? "No enquiries match your active search or filters."
                          : "New enquiries submitted on your website will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Populated Rows
                leads.map((lead) => {
                  const badgeClass = getStatusBadgeClass(lead.status || "new");
                  const isUpdating = updatingId === lead.id;

                  // Direct WhatsApp Link generator
                  const cleanPhone = (lead.phone || "").replace(/\D/g, "");
                  const waNumber = cleanPhone.startsWith("91")
                    ? cleanPhone
                    : cleanPhone.length === 10
                    ? `91${cleanPhone}`
                    : cleanPhone;

                  const waMessage = encodeURIComponent(
                    `Hello ${lead.full_name}, thank you for contacting Brick & Beams regarding property requirements in MMR. I am following up on your inquiry.`
                  );

                  return (
                    <tr
                      key={lead.id}
                      className={`transition-colors group ${
                        isDark
                          ? "hover:bg-white/[0.02]"
                          : "hover:bg-zinc-50/80"
                      }`}
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 font-medium">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-semibold ${
                              isDark ? "text-zinc-100" : "text-zinc-900"
                            }`}
                          >
                            {lead.full_name}
                          </span>
                        </div>
                        {lead.notes && (
                          <p
                            className={`text-[11px] line-clamp-1 italic mt-0.5 ${
                              isDark ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            &quot;{lead.notes}&quot;
                          </p>
                        )}
                      </td>

                      {/* Phone & Direct Actions */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`font-mono text-xs font-medium ${
                              isDark ? "text-zinc-200" : "text-zinc-800"
                            }`}
                          >
                            {lead.phone}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Click to Call */}
                            <a
                              href={`tel:${lead.phone}`}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 border cursor-pointer active:scale-95 ${
                                isDark
                                  ? "bg-white/[0.06] hover:bg-white/[0.14] text-zinc-300 hover:text-white border-white/10 hover:border-white/20 shadow-xs"
                                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 border-zinc-200/80 hover:border-zinc-300 shadow-2xs"
                              }`}
                              title="Call Lead"
                              aria-label={`Call ${lead.phone}`}
                            >
                              <PhoneIcon className="w-4 h-4 sm:w-[17px] sm:h-[17px] fill-current" />
                            </a>
                            {/* Click to WhatsApp */}
                            {waNumber && (
                              <a
                                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all duration-200 border cursor-pointer active:scale-95 ${
                                  isDark
                                    ? "bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border-[#25D366]/30 hover:border-[#25D366]/50 shadow-xs"
                                    : "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] hover:text-[#0b6358] border-[#25D366]/30 hover:border-[#25D366]/40 shadow-2xs"
                                }`}
                                title="Chat on WhatsApp"
                                aria-label={`WhatsApp chat with ${lead.full_name || lead.phone}`}
                              >
                                <WhatsAppIcon className="w-4 h-4 sm:w-[17px] sm:h-[17px] fill-current" />
                              </a>
                            )}
                          </div>
                        </div>
                        {lead.email && (
                          <div
                            className={`flex items-center gap-1 text-[11px] mt-1 ${
                              isDark ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            <Mail className="w-2.5 h-2.5 shrink-0" />
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:underline truncate max-w-[180px]"
                            >
                              {lead.email}
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Category & Transaction */}
                      <td className="py-3.5 px-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            isDark
                              ? "bg-white/5 border-white/10 text-zinc-200"
                              : "bg-zinc-100 border-zinc-200 text-zinc-800"
                          }`}
                        >
                          <span className="capitalize">
                            {lead.property_category || "Residential"}
                          </span>
                          <span className="opacity-40">•</span>
                          <span className="uppercase text-[#a01115]">
                            {lead.transaction_type || "BUY"}
                          </span>
                        </div>
                      </td>

                      {/* Requirement Details */}
                      <td className="py-3.5 px-4">
                        <div
                          className={`font-medium ${
                            isDark ? "text-zinc-200" : "text-zinc-900"
                          }`}
                        >
                          {lead.requirement}
                        </div>
                        {(lead.price_range || lead.property_stage) && (
                          <div
                            className={`text-[11px] flex items-center gap-1.5 mt-0.5 ${
                              isDark ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            {lead.price_range && (
                              <span>₹ {lead.price_range}</span>
                            )}
                            {lead.price_range && lead.property_stage && (
                              <span>•</span>
                            )}
                            {lead.property_stage && (
                              <span>{lead.property_stage}</span>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Status Dropdown with live write-back */}
                      <td className="py-3.5 px-4">
                        <div className="relative inline-block">
                          <select
                            value={lead.status || "new"}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusChange(
                                lead.id,
                                e.target.value as LeadStatus
                              )
                            }
                            className={`border rounded-xl px-2.5 py-1.5 text-xs font-semibold appearance-none pr-7 cursor-pointer outline-none transition-all ${badgeClass} ${
                              isUpdating ? "opacity-50 animate-pulse" : ""
                            }`}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option
                                key={st}
                                value={st}
                                className={
                                  isDark
                                    ? "bg-[#14161a] text-zinc-200 font-normal"
                                    : "bg-white text-zinc-900 font-normal"
                                }
                              >
                                {STATUS_LABELS[st]}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-current opacity-70 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Created At & Source */}
                      <td
                        className={`py-3.5 px-4 ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        <div className="font-mono text-[11px]">
                          {new Date(lead.created_at).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div
                          className={`text-[10px] uppercase tracking-wider mt-0.5 ${
                            isDark ? "text-zinc-500" : "text-zinc-400"
                          }`}
                        >
                          {lead.source === "modal" ? "Modal" : "Contact Page"}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Count */}
        <div
          className={`px-5 py-3 border-t flex items-center justify-between text-xs transition-colors ${
            isDark
              ? "border-white/10 bg-[#121418] text-zinc-400"
              : "border-zinc-200 bg-zinc-50 text-zinc-600"
          }`}
        >
          <span>
            Showing{" "}
            <strong className={isDark ? "text-white" : "text-zinc-900"}>
              {leads.length}
            </strong>{" "}
            of{" "}
            <strong className={isDark ? "text-white" : "text-zinc-900"}>
              {totalCount}
            </strong>{" "}
            leads
          </span>
          <span
            className={`text-[10px] ${
              isDark ? "text-zinc-500" : "text-zinc-400"
            }`}
          >
            Brick &amp; Beams Admin
          </span>
        </div>
      </div>
    </div>
  );
}
