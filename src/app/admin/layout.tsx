"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Layers,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuthContext";
import {
  AdminThemeProvider,
  useAdminTheme,
  AdminThemeToggle,
  AdminThemeIconButton,
} from "./AdminThemeContext";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const { isDark } = useAdminTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Properties",
      href: "/admin/properties",
      icon: Building2,
      active: pathname === "/admin/properties" || pathname.startsWith("/admin/properties/"),
    },
    {
      label: "Leads",
      href: "/admin/leads",
      icon: Users,
      active: pathname === "/admin/leads" || pathname.startsWith("/admin/leads/"),
    },
  ];

  return (
    <div
      className={`h-screen max-h-screen w-full flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-[#a01115] selection:text-white transition-colors duration-200 ${
        isDark ? "bg-[#0e0f12] text-zinc-100" : "bg-[#f8f9fa] text-zinc-900"
      }`}
    >
      {/* =========================================================================
          DESKTOP FIXED SIDEBAR (PINNED)
          ========================================================================= */}
      <aside
        data-lenis-prevent
        className={`hidden lg:flex w-72 shrink-0 h-screen max-h-screen flex-col justify-between border-r p-6 z-30 select-none overflow-y-auto overscroll-contain transition-colors duration-200 ${
          isDark
            ? "bg-[#121418] border-white/10 custom-scrollbar-slim"
            : "bg-white border-zinc-200 shadow-xs custom-scrollbar-admin-light"
        }`}
      >
        <div className="space-y-7">
          {/* Brand Header */}
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a01115] to-[#780d10] flex items-center justify-center text-white shadow-md shadow-[#a01115]/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span
                  className={`font-bold text-lg tracking-tight block ${
                    isDark ? "text-white" : "text-zinc-900"
                  }`}
                >
                  Brick &amp; Beams
                </span>
                <span
                  className={`text-[11px] font-medium block ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Admin Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    item.active
                      ? "bg-[#a01115] text-white shadow-lg shadow-[#a01115]/25"
                      : isDark
                      ? "text-zinc-400 hover:text-white hover:bg-white/5"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility Controls */}
        <div
          className={`pt-6 border-t space-y-3 ${
            isDark ? "border-white/10" : "border-zinc-200"
          }`}
        >
          {/* Theme Switcher Segmented Pill in Sidebar */}
          <div className="space-y-1.5">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider block px-1 ${
                isDark ? "text-zinc-500" : "text-zinc-400"
              }`}
            >
              Appearance
            </span>
            <AdminThemeToggle className="w-full" />
          </div>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs transition-all ${
              isDark
                ? "text-zinc-400 hover:text-white hover:bg-white/5"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Website</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer ${
              isDark
                ? "text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
                : "text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP NAVBAR
          ========================================================================= */}
      <header
        className={`lg:hidden shrink-0 flex items-center justify-between px-5 py-4 border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 ${
          isDark
            ? "border-white/10 bg-[#121418]/95 text-white"
            : "border-zinc-200 bg-white/95 text-zinc-900 shadow-xs"
        }`}
      >
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#a01115] flex items-center justify-center text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-base tracking-tight">
            Brick &amp; Beams
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Quick theme button for mobile header */}
          <AdminThemeIconButton />

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark
                ? "bg-white/5 text-zinc-300 hover:text-white hover:bg-white/10"
                : "bg-zinc-100 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileSidebarOpen && (
        <div
          className={`lg:hidden fixed inset-0 z-50 flex flex-col justify-between p-6 transition-colors duration-200 ${
            isDark
              ? "bg-[#121418] text-white"
              : "bg-white text-zinc-900"
          }`}
        >
          <div className="space-y-6">
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                isDark ? "border-white/10" : "border-zinc-200"
              }`}
            >
              <span className="font-serif font-bold text-lg">Admin Menu</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className={`p-2 transition-colors cursor-pointer ${
                  isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      item.active
                        ? "bg-[#a01115] text-white shadow-md shadow-[#a01115]/30"
                        : isDark
                        ? "text-zinc-300 hover:bg-white/5"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div
            className={`pt-6 border-t space-y-3.5 ${
              isDark ? "border-white/10" : "border-zinc-200"
            }`}
          >
            {/* Theme switcher in mobile drawer */}
            <div className="flex items-center justify-between px-1">
              <span className={`text-xs font-medium ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Theme
              </span>
              <AdminThemeToggle className="w-44" />
            </div>

            <Link
              href="/"
              target="_blank"
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-colors ${
                isDark ? "bg-white/5 text-zinc-300" : "bg-zinc-100 text-zinc-800"
              }`}
            >
              <span>View Website</span>
              <ExternalLink className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setMobileSidebarOpen(false);
                logout();
              }}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                isDark
                  ? "bg-rose-950/40 text-rose-300 hover:bg-rose-950/60"
                  : "bg-rose-50 text-rose-700 hover:bg-rose-100"
              }`}
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MAIN CONTENT AREA (INDEPENDENTLY SCROLLING)
          ========================================================================= */}
      <main
        data-lenis-prevent
        className={`flex-1 h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain transition-colors duration-200 ${
          isDark
            ? "custom-scrollbar-dark bg-[#0e0f12]"
            : "custom-scrollbar-admin-light bg-[#f8f9fa]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminThemeProvider>
      <AdminAuthProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </AdminAuthProvider>
    </AdminThemeProvider>
  );
}
