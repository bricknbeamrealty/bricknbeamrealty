"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuthContext";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      label: "Leads",
      href: "/admin/leads",
      icon: Users,
      active: pathname === "/admin/leads" || pathname.startsWith("/admin/leads/"),
    },
  ];

  return (
    <div className="h-screen max-h-screen w-full bg-[#0e0f12] text-zinc-100 flex flex-col lg:flex-row overflow-hidden font-sans selection:bg-[#a01115] selection:text-white">
      {/* =========================================================================
          DESKTOP FIXED SIDEBAR (PINNED)
          ========================================================================= */}
      <aside
        data-lenis-prevent
        className="hidden lg:flex w-72 shrink-0 h-screen max-h-screen flex-col justify-between border-r border-white/10 bg-[#121418] p-6 z-30 select-none overflow-y-auto overscroll-contain custom-scrollbar-slim"
      >
        <div className="space-y-8">
          {/* Brand Header */}
          <div className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a01115] to-[#780d10] flex items-center justify-center text-white shadow-md shadow-[#a01115]/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight block">
                  Brick &amp; Beams
                </span>
                <span className="text-[11px] font-medium text-zinc-400 block">
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
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
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
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Website</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP NAVBAR
          ========================================================================= */}
      <header className="lg:hidden shrink-0 flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#121418] sticky top-0 z-40 backdrop-blur-md">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#a01115] flex items-center justify-center text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-base text-white tracking-tight">
            Brick &amp; Beams
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl bg-white/5 text-zinc-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-between p-6 bg-[#121418]">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-serif font-bold text-lg text-white">
                Admin Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 text-zinc-400 hover:text-white"
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
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium ${
                      item.active
                        ? "bg-[#a01115] text-white"
                        : "text-zinc-300 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm text-zinc-300"
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
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-950/40 text-rose-300 text-sm font-medium"
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
        className="flex-1 h-full min-h-0 min-w-0 overflow-y-auto overflow-x-hidden overscroll-contain custom-scrollbar-dark"
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
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
