"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Plus,
  Search,
  RefreshCw,
  Edit3,
  Trash2,
  Star,
  ExternalLink,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  Layers,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
  Calendar,
  IndianRupee,
  Home,
  Check,
  Copy,
  Info,
} from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";
import { useAdminTheme } from "../AdminThemeContext";
import { Property, PropertyType } from "@/data/properties";

// Image Presets for rapid one-click selection
const IMAGE_PRESETS = [
  { label: "Raymond Ten X", path: "/images/properties/raymond-ten-x-thane.webp" },
  { label: "Godrej Ascend", path: "/images/properties/godrej-ascend-thane.webp" },
  { label: "Rustomjee Urbania", path: "/images/properties/rustomjee-urbania-thane.webp" },
  { label: "Balaji Olympia", path: "/images/properties/balaji-olympia.webp" },
  { label: "Regency Luxuria", path: "/images/properties/regency-luxuria.webp" },
  { label: "Shelar Supremus", path: "/images/properties/shelar-supremus.webp" },
];

const BHK_OPTIONS = [
  "1 BHK",
  "1.5 BHK",
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "3.5 BHK",
  "4 BHK",
  "5 BHK",
  "Studio",
  "Duplex",
  "Penthouse",
  "Commercial Office",
  "Retail Shop",
  "Industrial Plot",
];

const AMENITIES_SUGGESTIONS = [
  "Infinity Swimming Pool",
  "Clubhouse & Gymnasium",
  "High-Speed Elevators",
  "24/7 Multi-tier Security",
  "Children's Play Area",
  "Jogging & Cycling Track",
  "Landscaped Podium Gardens",
  "EV Charging Stations",
  "Ample Covered Car Parking",
  "Power Backup 100%",
  "Banquet Hall",
  "Rooftop Lounge",
  "Indoor Games Room",
  "RERA Approved",
];

const EMPTY_PROPERTY_FORM: Omit<Property, "id"> = {
  title: "",
  slug: "",
  developer: "",
  location: "Thane West",
  subLocation: "",
  priceStartingFrom: "₹",
  pricing: "₹",
  priceNumeric: 100,
  bhks: ["2 BHK"],
  bhkNumeric: [2],
  area: "",
  status: "Under Construction",
  propertyType: "residential",
  propertyTypeLabel: "Residential High-Rise",
  possession: "Dec-2027",
  possessionYear: 2027,
  image: "/images/properties/raymond-ten-x-thane.webp",
  rera: "",
  isFeatured: false,
  overview: "",
  keyHighlights: [],
  amenities: [],
};

export default function AdminPropertiesPage() {
  const { passcode } = useAdminAuth();
  const { isDark } = useAdminTheme();

  // State
  const [properties, setProperties] = useState<Property[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    underConstruction: 0,
    readyToMove: 0,
    residential: 0,
    commercial: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Controls
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Notifications
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form & Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState<Omit<Property, "id">>(EMPTY_PROPERTY_FORM);
  const [formHighlightsText, setFormHighlightsText] = useState("");
  const [formAmenitiesText, setFormAmenitiesText] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Delete Confirmation Modal
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 3500);
    },
    []
  );

  // Fetch properties from Admin API
  const fetchProperties = useCallback(
    async (isManual = false) => {
      if (isManual) setIsRefreshing(true);
      else setIsLoading(true);

      try {
        const res = await fetch("/api/admin/properties", {
          headers: { "x-admin-passcode": passcode },
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProperties(data.properties || []);
          if (data.stats) setStats(data.stats);
        } else {
          showToast("error", data.error || "Failed to load properties.");
        }
      } catch (err) {
        console.error("Fetch properties error:", err);
        showToast("error", "Network error contacting properties CMS API.");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [passcode, showToast]
  );

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Filtered properties computed
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Search
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(term) ||
          p.developer.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term) ||
          p.subLocation.toLowerCase().includes(term) ||
          (p.rera && p.rera.toLowerCase().includes(term));
        if (!matches) return false;
      }
      // Category
      if (categoryFilter !== "all" && p.propertyType !== categoryFilter) {
        return false;
      }
      // Status
      if (statusFilter !== "all" && p.status !== statusFilter) {
        return false;
      }
      // Featured
      if (featuredFilter === "featured" && !p.isFeatured) return false;
      if (featuredFilter === "standard" && p.isFeatured) return false;

      return true;
    });
  }, [properties, searchTerm, categoryFilter, statusFilter, featuredFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProperty(null);
    setFormData(EMPTY_PROPERTY_FORM);
    setFormHighlightsText("");
    setFormAmenitiesText("");
    setIsFormOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      slug: prop.slug,
      developer: prop.developer,
      location: prop.location,
      subLocation: prop.subLocation,
      priceStartingFrom: prop.priceStartingFrom,
      pricing: prop.pricing,
      priceNumeric: prop.priceNumeric,
      bhks: prop.bhks || [],
      bhkNumeric: prop.bhkNumeric || [],
      area: prop.area,
      status: prop.status,
      propertyType: prop.propertyType,
      propertyTypeLabel: prop.propertyTypeLabel,
      possession: prop.possession,
      possessionYear: prop.possessionYear,
      image: prop.image,
      rera: prop.rera || "",
      isFeatured: prop.isFeatured || false,
      overview: prop.overview || "",
      keyHighlights: prop.keyHighlights || [],
      amenities: prop.amenities || [],
    });
    setFormHighlightsText((prop.keyHighlights || []).join("\n"));
    setFormAmenitiesText((prop.amenities || []).join(", "));
    setIsFormOpen(true);
  };

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!editingProperty || prev.slug === "") {
        updated.slug = val
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/--+/g, "-")
          .trim();
      }
      return updated;
    });
  };

  // BHK chip toggle
  const toggleBhkOption = (bhkVal: string) => {
    setFormData((prev) => {
      const current = prev.bhks || [];
      const updatedBhks = current.includes(bhkVal)
        ? current.filter((b: string) => b !== bhkVal)
        : [...current, bhkVal];

      const updatedNumeric: number[] = updatedBhks
        .map((b: string) => parseInt(b.replace(/[^0-9]/g, ""), 10))
        .filter((n: number) => !isNaN(n));

      return {
        ...prev,
        bhks: updatedBhks,
        bhkNumeric: updatedNumeric.length > 0 ? updatedNumeric : [2],
      };
    });
  };

  // Save Form (Create or Update)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showToast("error", "Property title is required.");
      return;
    }
    if (!formData.developer.trim()) {
      showToast("error", "Developer name is required.");
      return;
    }
    if (!formData.priceStartingFrom.trim()) {
      showToast("error", "Starting price is required.");
      return;
    }

    setIsSaving(true);

    const highlightsArray = formHighlightsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const amenitiesArray = formAmenitiesText
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      keyHighlights: highlightsArray,
      amenities: amenitiesArray,
    };

    try {
      if (editingProperty) {
        // UPDATE PUT
        const res = await fetch("/api/admin/properties", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-admin-passcode": passcode,
          },
          body: JSON.stringify({
            id: editingProperty.id,
            ...payload,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("success", `Updated "${payload.title}" successfully.`);
          setIsFormOpen(false);
          fetchProperties();
        } else {
          showToast("error", data.error || "Failed to update property.");
        }
      } else {
        // CREATE POST
        const res = await fetch("/api/admin/properties", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-passcode": passcode,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          showToast("success", `Published "${payload.title}" successfully.`);
          setIsFormOpen(false);
          fetchProperties();
        } else {
          showToast("error", data.error || "Failed to create property.");
        }
      }
    } catch (err) {
      console.error("Save property error:", err);
      showToast("error", "Network error saving property.");
    } finally {
      setIsSaving(false);
    }
  };

  // Quick 1-Click Toggle: Featured
  const handleToggleFeatured = async (property: Property, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextVal = !property.isFeatured;

    // Optimistic UI
    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? { ...p, isFeatured: nextVal } : p))
    );

    try {
      const res = await fetch("/api/admin/properties", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          id: property.id,
          isFeatured: nextVal,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(
          "success",
          nextVal
            ? `Starred "${property.title}" as Featured!`
            : `Removed "${property.title}" from Featured.`
        );
        fetchProperties();
      } else {
        showToast("error", data.error || "Failed to toggle featured status.");
        fetchProperties();
      }
    } catch {
      showToast("error", "Network error updating featured state.");
      fetchProperties();
    }
  };

  // Quick 1-Click Toggle: Status (Under Construction <-> Ready to Move)
  const handleToggleStatus = async (property: Property, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextStatus =
      property.status === "Ready to Move" ? "Under Construction" : "Ready to Move";

    // Optimistic UI
    setProperties((prev) =>
      prev.map((p) => (p.id === property.id ? { ...p, status: nextStatus } : p))
    );

    try {
      const res = await fetch("/api/admin/properties", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          id: property.id,
          status: nextStatus,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("success", `Updated status to "${nextStatus}".`);
        fetchProperties();
      } else {
        showToast("error", data.error || "Failed to toggle property status.");
        fetchProperties();
      }
    } catch {
      showToast("error", "Network error updating status.");
      fetchProperties();
    }
  };

  // Delete Action
  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/admin/properties?id=${propertyToDelete.id}`, {
        method: "DELETE",
        headers: { "x-admin-passcode": passcode },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("success", `Deleted "${propertyToDelete.title}".`);
        setPropertyToDelete(null);
        fetchProperties();
      } else {
        showToast("error", data.error || "Failed to delete property.");
      }
    } catch {
      showToast("error", "Network error deleting property.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Copy slug helper
  const copySlug = (slug: string, id: string) => {
    navigator.clipboard.writeText(`/properties#${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showToast("success", "Copied public link path to clipboard!");
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
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* =========================================================================
          PAGE HEADER WITH ACTIONS
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-inherit">
        <div>
          <div className="flex items-center gap-3">
            <h1
              className={`text-2xl sm:text-3xl font-bold tracking-tight font-sans ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              Property CMS
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                isDark
                  ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/40"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              Real-Time Sync
            </span>
          </div>
          <p
            className={`text-xs sm:text-sm mt-1 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Create, publish, edit, feature, and manage all Thane real estate listings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => fetchProperties(true)}
            disabled={isRefreshing}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              isDark
                ? "bg-[#181a20] border-white/10 text-zinc-300 hover:text-white hover:border-white/20"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-xs"
            }`}
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-[#a01115]" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/properties"
            target="_blank"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isDark
                ? "bg-[#181a20] border-white/10 text-zinc-300 hover:text-white"
                : "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-xs"
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live Site</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#a01115] to-[#820e11] hover:from-[#b01317] hover:to-[#911013] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#a01115]/30 hover:shadow-lg hover:shadow-[#a01115]/40 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          KEY PERFORMANCE METRIC CARDS
          ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Properties */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark
              ? "bg-[#14161b] border-white/10 shadow-xs"
              : "bg-white border-zinc-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              Total Listings
            </span>
            <div className="w-8 h-8 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-sans ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {stats.total}
            </span>
            <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              projects
            </span>
          </div>
          <div className="mt-2 flex gap-1.5 text-[11px]">
            <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
              {stats.residential} Resi
            </span>
            <span className={isDark ? "text-zinc-600" : "text-zinc-300"}>•</span>
            <span className={isDark ? "text-zinc-400" : "text-zinc-600"}>
              {stats.commercial} Comm
            </span>
          </div>
        </div>

        {/* Featured Projects */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark
              ? "bg-[#14161b] border-white/10 shadow-xs"
              : "bg-white border-zinc-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-amber-400" : "text-amber-600"
              }`}
            >
              Homepage Featured
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-sans ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {stats.featured}
            </span>
            <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              highlighted
            </span>
          </div>
          <span
            className={`text-[11px] block mt-2 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Displays in hero &amp; home section
          </span>
        </div>

        {/* Under Construction */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark
              ? "bg-[#14161b] border-white/10 shadow-xs"
              : "bg-white border-zinc-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-amber-400" : "text-amber-700"
              }`}
            >
              Under Construction
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-sans ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {stats.underConstruction}
            </span>
            <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              active builds
            </span>
          </div>
          <span
            className={`text-[11px] block mt-2 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Possession from 2026-2029
          </span>
        </div>

        {/* Ready to Move */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            isDark
              ? "bg-[#14161b] border-white/10 shadow-xs"
              : "bg-white border-zinc-200 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              Ready To Move
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Home className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-bold font-sans ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            >
              {stats.readyToMove}
            </span>
            <span className={`text-[11px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
              instant handover
            </span>
          </div>
          <span
            className={`text-[11px] block mt-2 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            OC received &amp; ready units
          </span>
        </div>
      </div>

      {/* =========================================================================
          FILTER & CONTROL TOOLBAR
          ========================================================================= */}
      <div
        className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 transition-colors ${
          isDark
            ? "bg-[#14161b] border-white/10 shadow-xs"
            : "bg-white border-zinc-200 shadow-xs"
        }`}
      >
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by project name, developer, location or RERA..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/40 ${
              isDark
                ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
            }`}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs p-1 rounded-full ${
                isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns & View Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border outline-none cursor-pointer ${
              isDark
                ? "bg-[#181a20] border-white/10 text-zinc-200"
                : "bg-zinc-50 border-zinc-200 text-zinc-700"
            }`}
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border outline-none cursor-pointer ${
              isDark
                ? "bg-[#181a20] border-white/10 text-zinc-200"
                : "bg-zinc-50 border-zinc-200 text-zinc-700"
            }`}
          >
            <option value="all">All Statuses</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Ready to Move">Ready to Move</option>
          </select>

          {/* Featured Filter */}
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-medium border outline-none cursor-pointer ${
              isDark
                ? "bg-[#181a20] border-white/10 text-zinc-200"
                : "bg-zinc-50 border-zinc-200 text-zinc-700"
            }`}
          >
            <option value="all">All Showcase</option>
            <option value="featured">Featured Only ★</option>
            <option value="standard">Standard Only</option>
          </select>

          {/* View Mode Toggle: Grid vs Table */}
          <div
            className={`flex items-center p-0.5 rounded-xl border ${
              isDark ? "bg-[#181a20] border-white/10" : "bg-zinc-100 border-zinc-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Card Grid View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#a01115] text-white shadow-xs"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              title="Table View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-[#a01115] text-white shadow-xs"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONTENT LISTINGS (GRID VIEW OR DATA TABLE)
          ========================================================================= */}
      {isLoading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-3 border-[#a01115] border-t-transparent rounded-full animate-spin mx-auto" />
          <p
            className={`text-sm mt-4 font-medium ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Loading properties inventory...
          </p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <div
          className={`py-16 text-center rounded-2xl border p-8 ${
            isDark
              ? "bg-[#14161b] border-white/10 text-zinc-400"
              : "bg-white border-zinc-200 text-zinc-500"
          }`}
        >
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#a01115]" />
          <h3
            className={`text-base font-semibold ${
              isDark ? "text-white" : "text-zinc-800"
            }`}
          >
            No properties found
          </h3>
          <p className="text-xs mt-1 max-w-sm mx-auto">
            {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
              ? "Try adjusting your search criteria or resetting filters."
              : "No properties currently in the inventory. Click Add Property above to publish your first listing."}
          </p>
          {(searchTerm || categoryFilter !== "all" || statusFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setStatusFilter("all");
                setFeaturedFilter("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#a01115] text-white cursor-pointer hover:bg-[#830e11]"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        /* =======================================================================
           VISUAL CARDS GRID
           ======================================================================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className={`group rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isDark
                  ? "bg-[#14161b] border-white/10 hover:border-[#a01115]/50 shadow-xs"
                  : "bg-white border-zinc-200 hover:border-[#a01115]/40 shadow-xs"
              }`}
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        property.propertyType === "commercial"
                          ? "bg-purple-600 text-white"
                          : property.propertyType === "industrial"
                          ? "bg-amber-600 text-white"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {property.propertyType}
                    </span>

                    {/* Quick Toggle Featured Star */}
                    <button
                      type="button"
                      onClick={(e) => handleToggleFeatured(property, e)}
                      title={property.isFeatured ? "Featured (Click to unfeature)" : "Mark as Featured"}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer shadow-sm ${
                        property.isFeatured
                          ? "bg-amber-400 text-zinc-950 hover:bg-amber-300"
                          : "bg-black/60 text-white/80 hover:bg-black/90 hover:text-white backdrop-blur-md"
                      }`}
                    >
                      <Star
                        className={`w-3 h-3 ${
                          property.isFeatured ? "fill-zinc-950 text-zinc-950" : "text-white"
                        }`}
                      />
                      <span>{property.isFeatured ? "Featured" : "Feature"}</span>
                    </button>
                  </div>

                  {/* Status Pill Toggle */}
                  <button
                    type="button"
                    onClick={(e) => handleToggleStatus(property, e)}
                    title="Click to toggle status"
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-md shadow-sm transition-all cursor-pointer ${
                      property.status === "Ready to Move"
                        ? "bg-emerald-500/90 text-white border-emerald-400 hover:bg-emerald-600"
                        : "bg-amber-500/90 text-white border-amber-400 hover:bg-amber-600"
                    }`}
                  >
                    {property.status}
                  </button>
                </div>

                {/* Bottom Overlay RERA */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between text-white/90 text-[11px]">
                  <span className="font-mono text-[10px] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
                    RERA: {property.rera || "Applied"}
                  </span>
                  <span className="font-medium text-white text-[11px] bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
                    {property.possession}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#a01115] uppercase tracking-wider">
                      {property.developer}
                    </span>
                    <button
                      type="button"
                      onClick={() => copySlug(property.slug, property.id)}
                      title="Copy Public Route Link"
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center gap-1 transition-colors cursor-pointer ${
                        copiedId === property.id
                          ? "bg-emerald-500/20 text-emerald-400"
                          : isDark
                          ? "bg-white/5 text-zinc-400 hover:text-white"
                          : "bg-zinc-100 text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      {copiedId === property.id ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>/{property.slug}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3
                    className={`font-bold text-base leading-snug line-clamp-1 ${
                      isDark ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {property.title}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-zinc-400 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span>{property.subLocation || property.location}</span>
                  </div>

                  {/* BHK Tags & Carpet Area */}
                  <div className="pt-1 flex flex-wrap items-center gap-1.5">
                    {(property.bhks || []).map((b: string) => (
                      <span
                        key={b}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                          isDark
                            ? "bg-[#181a20] border-white/10 text-zinc-300"
                            : "bg-zinc-100 border-zinc-200 text-zinc-700"
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                    {property.area && (
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${
                          isDark
                            ? "bg-white/5 border-white/5 text-zinc-400"
                            : "bg-stone-50 border-stone-200 text-stone-600"
                        }`}
                      >
                        {property.area}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Actions Row */}
                <div
                  className={`pt-3 border-t flex items-center justify-between gap-2 ${
                    isDark ? "border-white/10" : "border-zinc-100"
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] uppercase font-semibold block ${
                        isDark ? "text-zinc-500" : "text-zinc-400"
                      }`}
                    >
                      Starting At
                    </span>
                    <span
                      className={`font-bold text-sm sm:text-base font-sans leading-tight ${
                        isDark ? "text-white" : "text-zinc-900"
                      }`}
                    >
                      {property.priceStartingFrom}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(property)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-zinc-300 hover:text-white hover:border-[#a01115]/50"
                          : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                      title="Edit property details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setPropertyToDelete(property)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isDark
                          ? "bg-rose-950/20 border-rose-900/40 text-rose-400 hover:bg-rose-950/50 hover:text-rose-300"
                          : "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:text-rose-700"
                      }`}
                      title="Delete property"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* =======================================================================
           DATA TABLE VIEW
           ======================================================================= */
        <div
          className={`rounded-2xl border overflow-hidden ${
            isDark ? "bg-[#14161b] border-white/10" : "bg-white border-zinc-200"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b text-[11px] font-semibold uppercase tracking-wider ${
                  isDark
                    ? "bg-[#181a20] border-white/10 text-zinc-400"
                    : "bg-zinc-50 border-zinc-200 text-zinc-600"
                }`}
              >
                <tr>
                  <th className="py-3 px-4">Property / Developer</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Pricing</th>
                  <th className="py-3 px-4">BHK &amp; Area</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Featured</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDark ? "divide-white/5" : "divide-zinc-200"
                }`}
              >
                {filteredProperties.map((property) => (
                  <tr
                    key={property.id}
                    className={`transition-colors ${
                      isDark ? "hover:bg-white/5" : "hover:bg-zinc-50"
                    }`}
                  >
                    {/* Property & Developer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                          <Image
                            src={property.image}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span
                            className={`font-bold text-sm block leading-tight ${
                              isDark ? "text-white" : "text-zinc-900"
                            }`}
                          >
                            {property.title}
                          </span>
                          <span className="text-[11px] text-[#a01115] font-semibold block">
                            {property.developer}
                          </span>
                          <span
                            className={`text-[11px] flex items-center gap-1 ${
                              isDark ? "text-zinc-500" : "text-zinc-400"
                            }`}
                          >
                            <MapPin className="w-3 h-3 shrink-0" />
                            {property.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          property.propertyType === "commercial"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {property.propertyType}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`font-semibold text-xs block ${
                          isDark ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {property.priceStartingFrom}
                      </span>
                      <span
                        className={`text-[11px] block ${
                          isDark ? "text-zinc-500" : "text-zinc-400"
                        }`}
                      >
                        {property.pricing}
                      </span>
                    </td>

                    {/* BHK & Area */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {(property.bhks || []).map((b: string) => (
                          <span
                            key={b}
                            className={`px-1.5 py-0.5 rounded text-[10px] border ${
                              isDark
                                ? "bg-white/5 border-white/10 text-zinc-300"
                                : "bg-zinc-100 border-zinc-200 text-zinc-700"
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                      <span
                        className={`text-[10px] block mt-1 ${
                          isDark ? "text-zinc-500" : "text-zinc-400"
                        }`}
                      >
                        {property.area}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(property)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                          property.status === "Ready to Move"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                        }`}
                      >
                        {property.status}
                      </button>
                    </td>

                    {/* Featured Star */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(property)}
                        title="Toggle Featured"
                        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                          property.isFeatured
                            ? "bg-amber-400/20 text-amber-400"
                            : isDark
                            ? "text-zinc-600 hover:text-zinc-400"
                            : "text-zinc-300 hover:text-zinc-500"
                        }`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            property.isFeatured ? "fill-amber-400" : ""
                          }`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => copySlug(property.slug, property.id)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDark
                              ? "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                              : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900"
                          }`}
                          title="Copy Link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(property)}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            isDark
                              ? "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                              : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900"
                          }`}
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPropertyToDelete(property)}
                          className="p-1.5 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT PROPERTY MODAL DRAWER
          ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${
              isDark ? "bg-[#14161b] border-white/10 text-white" : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`p-5 sm:p-6 border-b flex items-center justify-between shrink-0 ${
                isDark ? "border-white/10 bg-[#181a20]" : "border-zinc-200 bg-zinc-50"
              }`}
            >
              <div>
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#a01115]" />
                  <span>
                    {editingProperty ? `Edit: ${editingProperty.title}` : "Create New Property Listing"}
                  </span>
                </h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Configure all details, specifications, pricing, and visual assets.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isDark ? "text-zinc-400 hover:text-white hover:bg-white/10" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form
              onSubmit={handleSubmitForm}
              className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 custom-scrollbar-slim"
            >
              {/* SECTION 1: CORE BASICS */}
              <div className="space-y-4">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-[#a01115]" />
                  <span>Core Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g., Raymond Ten X Era"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Developer */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Developer / Builder *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.developer}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, developer: e.target.value }))
                      }
                      placeholder="e.g., Raymond Realty"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      URL Slug * (SEO Path)
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, slug: e.target.value }))
                      }
                      placeholder="e.g., raymond-ten-x-era"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border font-mono transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Category *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          propertyType: e.target.value as PropertyType,
                        }))
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none cursor-pointer ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>

                  {/* Property Type label */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Property Type Tag
                    </label>
                    <input
                      type="text"
                      value={formData.propertyTypeLabel}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, propertyTypeLabel: e.target.value }))
                      }
                      placeholder="e.g., Luxury High-Rise / Grade-A Offices"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* RERA Number */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      RERA Registration No.
                    </label>
                    <input
                      type="text"
                      value={formData.rera || ""}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, rera: e.target.value }))
                      }
                      placeholder="e.g., P51700049533"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border font-mono transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: LOCATION */}
              <div className="space-y-4 pt-4 border-t border-inherit">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#a01115]" />
                  <span>Location &amp; Micro-Market</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Primary Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, location: e.target.value }))
                      }
                      placeholder="e.g., Thane West / Ghodbunder Road"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Sub-Location / Landmark Details
                    </label>
                    <input
                      type="text"
                      value={formData.subLocation}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, subLocation: e.target.value }))
                      }
                      placeholder="e.g., Pokhran Road 1 • Near Viviana Mall"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: PRICING & SPECIFICATIONS */}
              <div className="space-y-4 pt-4 border-t border-inherit">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <IndianRupee className="w-3.5 h-3.5 text-[#a01115]" />
                  <span>Pricing, Area &amp; Timeline</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Starting Price */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Starting Price *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.priceStartingFrom}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, priceStartingFrom: e.target.value }))
                      }
                      placeholder="e.g., ₹1.35 Cr"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Full Price Range
                    </label>
                    <input
                      type="text"
                      value={formData.pricing}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, pricing: e.target.value }))
                      }
                      placeholder="e.g., ₹1.35 Cr - ₹2.55 Cr"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Carpet Area */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Carpet Area Range
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, area: e.target.value }))
                      }
                      placeholder="e.g., 580 - 1150 sq.ft."
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Construction Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          status: e.target.value as "Under Construction" | "Ready to Move",
                        }))
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none cursor-pointer ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900"
                      }`}
                    >
                      <option value="Under Construction">Under Construction</option>
                      <option value="Ready to Move">Ready to Move</option>
                    </select>
                  </div>

                  {/* Possession Display */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Possession Date
                    </label>
                    <input
                      type="text"
                      value={formData.possession}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, possession: e.target.value }))
                      }
                      placeholder="e.g., Dec-2028 or Ready"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>

                  {/* Possession Year */}
                  <div>
                    <label className="text-xs font-semibold block mb-1.5">
                      Possession Year
                    </label>
                    <input
                      type="number"
                      value={formData.possessionYear}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          possessionYear: parseInt(e.target.value, 10) || 2026,
                        }))
                      }
                      placeholder="2027"
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                        isDark
                          ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                          : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                      }`}
                    />
                  </div>
                </div>

                {/* BHK Configurations multi-picker */}
                <div>
                  <label className="text-xs font-semibold block mb-2">
                    Available Configurations (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BHK_OPTIONS.map((opt: string) => {
                      const isSelected = (formData.bhks || []).includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleBhkOption(opt)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#a01115] text-white border-[#a01115] shadow-xs"
                              : isDark
                              ? "bg-[#181a20] border-white/10 text-zinc-300 hover:border-white/20"
                              : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Switch */}
                <div
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                    isDark ? "bg-[#181a20] border-white/10" : "bg-zinc-50 border-zinc-200"
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold block flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Promote to Homepage Featured</span>
                    </span>
                    <span
                      className={`text-[11px] block mt-0.5 ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Featured properties appear on the landing page showcase section.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, isFeatured: !p.isFeatured }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.isFeatured ? "bg-[#a01115]" : "bg-zinc-600"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formData.isFeatured ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* SECTION 4: MEDIA & PHOTO PRESETS */}
              <div className="space-y-4 pt-4 border-t border-inherit">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#a01115]" />
                  <span>Media &amp; Hero Photography</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  {/* Image URL input */}
                  <div className="md:col-span-2 space-y-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1.5">
                        Image URL / File Path *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.image}
                        onChange={(e) =>
                          setFormData((p) => ({ ...p, image: e.target.value }))
                        }
                        placeholder="e.g., /images/properties/raymond-ten-x-thane.webp"
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border font-mono transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                          isDark
                            ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                            : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                        }`}
                      />
                    </div>

                    {/* Presets Gallery Picker */}
                    <div>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wider block mb-2 ${
                          isDark ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        1-Click Photo Presets (From Thane Library):
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {IMAGE_PRESETS.map((preset) => {
                          const isSelected = formData.image === preset.path;
                          return (
                            <button
                              key={preset.path}
                              type="button"
                              onClick={() =>
                                setFormData((p) => ({ ...p, image: preset.path }))
                              }
                              className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#a01115]/20 border-[#a01115] text-[#a01115] font-semibold"
                                  : isDark
                                  ? "bg-[#181a20] border-white/10 text-zinc-300 hover:border-white/30"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                              }`}
                            >
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                                <Image
                                  src={preset.path}
                                  alt={preset.label}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-[11px] truncate">
                                {preset.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Live Thumbnail Preview */}
                  <div>
                    <label
                      className={`text-xs font-semibold block mb-1.5 ${
                        isDark ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                      Live Preview
                    </label>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-inherit bg-zinc-900">
                      {formData.image ? (
                        <Image
                          src={formData.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-zinc-500">
                          No image
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5: HIGHLIGHTS & AMENITIES */}
              <div className="space-y-4 pt-4 border-t border-inherit">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-[#a01115]" />
                  <span>Highlights, Narrative &amp; Amenities</span>
                </h3>

                {/* Overview narrative */}
                <div>
                  <label className="text-xs font-semibold block mb-1.5">
                    Project Overview / Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.overview || ""}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, overview: e.target.value }))
                    }
                    placeholder="Enter marketing description, architecture highlights, connectivity, or lifestyle pitch..."
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                      isDark
                        ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                        : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                </div>

                {/* Highlights (newline separated) */}
                <div>
                  <label className="text-xs font-semibold block mb-1.5">
                    Key Highlights (One bullet per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formHighlightsText}
                    onChange={(e) => setFormHighlightsText(e.target.value)}
                    placeholder="e.g.&#10;5 mins from Viviana Mall &amp; Cadbury Junction&#10;Podium landscape with 40+ clubhouse amenities&#10;Vaastu compliant master layouts"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                      isDark
                        ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                        : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                </div>

                {/* Amenities (comma separated or chip adder) */}
                <div>
                  <label className="text-xs font-semibold block mb-1.5">
                    Amenities (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formAmenitiesText}
                    onChange={(e) => setFormAmenitiesText(e.target.value)}
                    placeholder="Infinity Pool, Gymnasium, 24/7 Security, Children Play Area, EV Charging"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors outline-none focus:ring-2 focus:ring-[#a01115]/50 ${
                      isDark
                        ? "bg-[#181a20] border-white/10 text-white placeholder-zinc-500"
                        : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
                    }`}
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {AMENITIES_SUGGESTIONS.slice(0, 6).map((amenity: string) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => {
                          const current = formAmenitiesText
                            .split(",")
                            .map((a: string) => a.trim())
                            .filter(Boolean);
                          if (!current.includes(amenity)) {
                            setFormAmenitiesText([...current, amenity].join(", "));
                          }
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                          isDark
                            ? "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                            : "bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900"
                        }`}
                      >
                        + {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Modal Actions */}
              <div
                className={`pt-5 border-t flex items-center justify-end gap-3 sticky bottom-0 -mx-5 -mb-5 p-5 ${
                  isDark ? "bg-[#14161b] border-white/10" : "bg-white border-zinc-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    isDark
                      ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                      : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#a01115] to-[#820e11] hover:from-[#b01317] hover:to-[#911013] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#a01115]/30 hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving Listing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingProperty ? "Save Changes" : "Publish Property"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          DELETE CONFIRMATION MODAL
          ========================================================================= */}
      {propertyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl transition-all ${
              isDark ? "bg-[#14161b] border-white/10 text-white" : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold">Delete Property Listing?</h3>
            <p
              className={`text-xs mt-2 leading-relaxed ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Are you sure you want to delete{" "}
              <strong className={isDark ? "text-white" : "text-zinc-900"}>
                &quot;{propertyToDelete.title}&quot;
              </strong>
              ? This action will remove it from both the CMS and website listings.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPropertyToDelete(null)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark
                    ? "bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10"
                    : "bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteProperty}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
