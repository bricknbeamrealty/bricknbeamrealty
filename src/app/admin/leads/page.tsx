"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Phone,
  MessageCircle,
  Mail,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";
import { Lead, LeadStatus, PropertyCategory, TransactionType } from "@/lib/supabaseServer";

const STATUS_CONFIG: Record<
  LeadStatus,
  { label: string; badgeClass: string; dotColor: string }
> = {
  new: {
    label: "New",
    badgeClass: "bg-rose-950/80 text-rose-300 border-rose-800/60",
    dotColor: "bg-rose-500",
  },
  contacted: {
    label: "Contacted",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-800/60",
    dotColor: "bg-amber-500",
  },
  site_visit: {
    label: "Site Visit",
    badgeClass: "bg-blue-950/80 text-blue-300 border-blue-800/60",
    dotColor: "bg-blue-500",
  },
  negotiation: {
    label: "Negotiation",
    badgeClass: "bg-purple-950/80 text-purple-300 border-purple-800/60",
    dotColor: "bg-purple-500",
  },
  converted: {
    label: "Converted",
    badgeClass: "bg-emerald-950/80 text-emerald-300 border-emerald-800/60",
    dotColor: "bg-emerald-500",
  },
  lost: {
    label: "Lost",
    badgeClass: "bg-zinc-800/90 text-zinc-400 border-zinc-700/60",
    dotColor: "bg-zinc-500",
  },
};

const ALL_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "site_visit",
  "negotiation",
  "converted",
  "lost",
];

export default function AdminLeadsPage() {
  const { passcode } = useAdminAuth();

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
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }, []);

  // Fetch leads from Supabase via admin API
  const fetchLeads = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.set("status", statusFilter);
        if (categoryFilter !== "all") params.set("category", categoryFilter);
        if (transactionFilter !== "all") params.set("transaction", transactionFilter);
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
          showToast("error", data.error || "Failed to load leads from Supabase.");
        }
      } catch (err) {
        console.error("Fetch leads error:", err);
        showToast("error", "Network error contacting leads API.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [passcode, statusFilter, categoryFilter, transactionFilter, searchTerm, showToast]
  );

  useEffect(() => {
    fetchLeads();
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
        showToast("success", `Lead status updated to "${STATUS_CONFIG[newStatus].label}"`);
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

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `brick_n_beams_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("success", "Exported leads to CSV.");
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold backdrop-blur-md transition-all ${
            toast.type === "success"
              ? "bg-emerald-950/90 text-emerald-200 border border-emerald-700/60"
              : "bg-rose-950/90 text-rose-200 border border-rose-700/60"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Leads
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            View, search, and update client enquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchLeads(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 hover:text-white hover:bg-white/10 text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#a01115]" : ""}`} />
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
        </div>
      </div>

      {/* Environment Setup Banner if Supabase not configured */}
      {!isConfigured && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-200 text-xs flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-300">Supabase Connection Required</p>
            <p className="text-amber-200/80">
              Please paste your <code className="bg-black/30 px-1 py-0.5 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="bg-black/30 px-1 py-0.5 rounded">SUPABASE_SERVICE_ROLE_KEY</code> into{" "}
              <code className="bg-black/30 px-1 py-0.5 rounded">.env.local</code> to activate live database reads.
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#131519] p-3.5 rounded-2xl border border-white/10">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#a01115] focus:ring-1 focus:ring-[#a01115]"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#a01115] appearance-none cursor-pointer"
          >
            <option value="all">All Statuses ({totalCount})</option>
            {ALL_STATUSES.map((st) => (
              <option key={st} value={st}>
                Status: {STATUS_CONFIG[st].label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#a01115] appearance-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential Only</option>
            <option value="commercial">Commercial Only</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Transaction Filter */}
        <div className="relative">
          <select
            value={transactionFilter}
            onChange={(e) => setTransactionFilter(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 outline-none focus:border-[#a01115] appearance-none cursor-pointer"
          >
            <option value="all">All Transaction Types</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Leads Table Container */}
      <div className="bg-[#131519] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar-dark">
          <table className="w-full text-left text-xs">
            {/* Table Header */}
            <thead className="bg-[#17191e] border-b border-white/10 text-zinc-400 uppercase tracking-wider font-semibold text-[10px]">
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
            <tbody className="divide-y divide-white/5 text-zinc-200">
              {isLoading ? (
                // Loading Skeleton Rows
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-4">
                      <div className="h-4 bg-white/10 rounded w-28 mb-1.5" />
                      <div className="h-3 bg-white/5 rounded w-16" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-white/10 rounded w-24 mb-1.5" />
                      <div className="h-3 bg-white/5 rounded w-32" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-5 bg-white/10 rounded-full w-20" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-white/10 rounded w-32 mb-1" />
                      <div className="h-3 bg-white/5 rounded w-20" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-7 bg-white/10 rounded-xl w-28" />
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-3 bg-white/10 rounded w-20" />
                    </td>
                  </tr>
                ))
              ) : leads.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500">
                        <Users className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-zinc-200">
                        No leads found
                      </p>
                      <p className="text-xs text-zinc-400 max-w-sm">
                        {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                          ? "No enquiries match your active search or filters."
                          : "New enquiries submitted on your website will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Populated Rows
                leads.map((lead) => {
                  const statusInfo = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
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
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Name */}
                      <td className="py-3.5 px-4 font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-100">{lead.full_name}</span>
                        </div>
                        {lead.notes && (
                          <p className="text-[11px] text-zinc-400 line-clamp-1 italic mt-0.5">
                            &quot;{lead.notes}&quot;
                          </p>
                        )}
                      </td>

                      {/* Phone & Direct Actions */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-zinc-300">{lead.phone}</span>
                          {/* Click to Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1 rounded-md bg-white/5 hover:bg-[#a01115]/20 hover:text-[#a01115] text-zinc-400 transition-colors"
                            title="Call Lead"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                          {/* Click to WhatsApp */}
                          {waNumber && (
                            <a
                              href={`https://wa.me/${waNumber}?text=${waMessage}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
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
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-zinc-200">
                          <span className="capitalize">{lead.property_category || "Residential"}</span>
                          <span className="text-zinc-500">•</span>
                          <span className="uppercase text-[#a01115]">
                            {lead.transaction_type || "BUY"}
                          </span>
                        </div>
                      </td>

                      {/* Requirement Details */}
                      <td className="py-3.5 px-4">
                        <div className="text-zinc-200 font-medium">{lead.requirement}</div>
                        {(lead.price_range || lead.property_stage) && (
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                            {lead.price_range && <span>₹ {lead.price_range}</span>}
                            {lead.price_range && lead.property_stage && <span>•</span>}
                            {lead.property_stage && <span>{lead.property_stage}</span>}
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
                              handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            className={`border rounded-xl px-2.5 py-1.5 text-xs font-semibold appearance-none pr-7 cursor-pointer outline-none transition-all ${
                              statusInfo.badgeClass
                            } ${isUpdating ? "opacity-50 animate-pulse" : ""}`}
                          >
                            {ALL_STATUSES.map((st) => (
                              <option
                                key={st}
                                value={st}
                                className="bg-[#14161a] text-zinc-200 font-normal"
                              >
                                {STATUS_CONFIG[st].label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-3 h-3 text-current opacity-70 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </td>

                      {/* Created At & Source */}
                      <td className="py-3.5 px-4 text-zinc-400">
                        <div className="font-mono text-[11px]">
                          {new Date(lead.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
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
        <div className="px-5 py-3 border-t border-white/10 bg-[#121418] flex items-center justify-between text-xs text-zinc-400">
          <span>
            Showing <strong className="text-white">{leads.length}</strong> of{" "}
            <strong className="text-white">{totalCount}</strong> leads
          </span>
          <span className="text-[10px] text-zinc-500">
            Brick &amp; Beams Admin
          </span>
        </div>
      </div>
    </div>
  );
}
