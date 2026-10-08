"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BellRing,
  BellOff,
  Download,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  X,
  Share2,
  PlusSquare,
  Send,
  Loader2,
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ShieldAlert,
} from "lucide-react";
import { useAdminPwa } from "./AdminPwaContext";
import { useAdminTheme } from "./AdminThemeContext";

// =========================================================================
// 1. NOTIFICATION CENTER BUTTON & MODAL
// =========================================================================
export function AdminNotificationCenter() {
  const {
    permission,
    isPushSupported,
    isSubscribed,
    isSubscribing,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestPush,
    isIOS,
    isStandalone,
  } = useAdminPwa();
  const { isDark } = useAdminTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTogglePush = async () => {
    if (isSubscribed) {
      await unsubscribeFromPush();
    } else {
      await subscribeToPush();
    }
  };

  const handleSendTest = async () => {
    setIsTesting(true);
    setTestStatus(null);
    const res = await sendTestPush();
    setIsTesting(false);
    setTestStatus(res.message);
    setTimeout(() => setTestStatus(null), 5000);
  };

  return (
    <>
      {/* Trigger Button in Header/Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`relative p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
          isDark
            ? "bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white"
            : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900"
        }`}
        title="Admin Push Notification Alerts"
        aria-label="Admin Notifications"
      >
        {isSubscribed ? (
          <BellRing className="w-5 h-5 text-emerald-500 animate-pulse" />
        ) : permission === "denied" ? (
          <BellOff className="w-5 h-5 text-rose-500" />
        ) : (
          <Bell className="w-5 h-5" />
        )}

        {/* Status Indicator Dot */}
        <span
          className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
            isSubscribed
              ? "bg-emerald-500 ring-2 ring-[#a01115]"
              : permission === "denied"
              ? "bg-rose-500"
              : "bg-amber-400"
          }`}
        />
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border transition-all ${
              isDark
                ? "bg-[#14161b] border-white/10 text-white"
                : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#a01115]/10 text-[#a01115] flex items-center justify-center">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Lead Push Notifications</h3>
                  <p className="text-xs text-zinc-400">Mobile &amp; Desktop Live Alerts</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Section */}
            <div className="py-5 space-y-4">
              <div
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  isSubscribed
                    ? isDark
                      ? "bg-emerald-950/20 border-emerald-800/30 text-emerald-300"
                      : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : permission === "denied"
                    ? isDark
                      ? "bg-rose-950/20 border-rose-800/30 text-rose-300"
                      : "bg-rose-50 border-rose-200 text-rose-800"
                    : isDark
                    ? "bg-amber-950/20 border-amber-800/30 text-amber-300"
                    : "bg-amber-50 border-amber-200 text-amber-800"
                }`}
              >
                {isSubscribed ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
                ) : permission === "denied" ? (
                  <ShieldAlert className="w-5 h-5 shrink-0 text-rose-500 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-sm">
                    {isSubscribed
                      ? "Active: Push Notifications Enabled"
                      : permission === "denied"
                      ? "Notifications Blocked in Browser"
                      : "Notifications Not Enabled Yet"}
                  </p>
                  <p className="text-xs mt-1 opacity-90 leading-relaxed">
                    {isSubscribed
                      ? "This device will instantly receive high-priority push alerts when a client submits an inquiry."
                      : permission === "denied"
                      ? "You previously blocked notifications for this site. Click the site settings icon next to your URL bar to allow notifications."
                      : "Turn on push alerts so you never miss a high-ticket client lead even when your phone is locked."}
                  </p>
                </div>
              </div>

              {/* iOS Specific Guidance */}
              {isIOS && !isStandalone && (
                <div
                  className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
                    isDark
                      ? "bg-blue-950/20 border-blue-800/30 text-blue-200"
                      : "bg-blue-50 border-blue-200 text-blue-800"
                  }`}
                >
                  <div className="font-semibold flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>iOS iPhone / iPad Setup Note:</span>
                  </div>
                  <p className="opacity-90 leading-relaxed">
                    Apple requires adding this admin app to your Home Screen to deliver background push alerts. Tap the <strong>Share</strong> button in Safari, then tap <strong>&quot;Add to Home Screen&quot;</strong>.
                  </p>
                </div>
              )}

              {/* Main Actions */}
              <div className="space-y-2.5 pt-2">
                {!isPushSupported ? (
                  <div className="text-xs text-rose-400 text-center py-2">
                    Push notifications are not supported on this browser version.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleTogglePush}
                    disabled={isSubscribing}
                    className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isSubscribed
                        ? isDark
                          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                          : "bg-zinc-200 hover:bg-zinc-300 text-zinc-800"
                        : "bg-[#a01115] hover:bg-[#850e12] text-white shadow-[#a01115]/30"
                    }`}
                  >
                    {isSubscribing ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Configuring Device...</span>
                      </>
                    ) : isSubscribed ? (
                      <>
                        <BellOff className="w-4 h-4 text-zinc-400" />
                        <span>Turn Off Push Alerts</span>
                      </>
                    ) : (
                      <>
                        <BellRing className="w-4 h-4" />
                        <span>Enable Instant Push Alerts</span>
                      </>
                    )}
                  </button>
                )}

                {/* Send Test Notification Button */}
                <button
                  type="button"
                  onClick={handleSendTest}
                  disabled={isTesting}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isDark
                      ? "border-white/10 hover:bg-white/5 text-zinc-300"
                      : "border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                  }`}
                >
                  {isTesting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-[#a01115]" />
                  )}
                  <span>Send Test Notification to This Device</span>
                </button>

                {testStatus && (
                  <p
                    className={`text-xs text-center font-medium mt-1 animate-in fade-in ${
                      testStatus.toLowerCase().includes("failed") || testStatus.toLowerCase().includes("no")
                        ? "text-rose-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {testStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Scope Details Footer */}
            <div
              className={`pt-3 border-t text-[11px] flex items-center justify-between opacity-75 ${
                isDark ? "border-white/10 text-zinc-400" : "border-zinc-200 text-zinc-500"
              }`}
            >
              <span>Scope: Dedicated Admin PWA</span>
              <span>VAPID Web Push (RFC 8292)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// =========================================================================
// 2. PWA INSTALL BANNER / PROMPT
// =========================================================================
export function AdminPwaInstallBanner() {
  const { isInstallable, isStandalone, isIOS, promptInstall } = useAdminPwa();
  const { isDark } = useAdminTheme();
  const [dismissed, setDismissed] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  // If already standalone or user dismissed, don't show
  if (isStandalone || dismissed) {
    return null;
  }

  // Only show if installable on Android/Desktop or on iOS
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <>
      <div
        className={`w-full px-4 py-2.5 border-b flex items-center justify-between text-xs z-30 transition-colors ${
          isDark
            ? "bg-[#17191e] border-white/10 text-zinc-200"
            : "bg-[#fff7ed] border-amber-200 text-amber-950"
        }`}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
          <div className="w-7 h-7 rounded-lg bg-[#a01115] text-white flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="truncate">
            <span className="font-semibold block truncate">
              Install Brick &amp; Beams Admin App
            </span>
            <span className="text-[11px] opacity-80 block truncate">
              {isIOS
                ? "Add to Home Screen for native experience & push alerts"
                : "Full-screen app with real-time lead push notifications"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isIOS ? (
            <button
              type="button"
              onClick={() => setShowIosGuide(true)}
              className="px-3 py-1.5 rounded-lg bg-[#a01115] text-white font-medium text-xs hover:bg-[#850e12] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>How to Install</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={promptInstall}
              className="px-3 py-1.5 rounded-lg bg-[#a01115] text-white font-medium text-xs hover:bg-[#850e12] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm shadow-[#a01115]/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* iOS Install Instructions Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border space-y-4 ${
              isDark
                ? "bg-[#14161b] border-white/10 text-white"
                : "bg-white border-zinc-200 text-zinc-900"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/10">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#a01115]" />
                Install on iPhone / iPad
              </h3>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="space-y-3.5 text-xs">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#a01115]/15 text-[#a01115] font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  Tap the <strong>Share</strong> button <Share2 className="inline w-3.5 h-3.5 text-blue-400 ml-1" /> at the bottom or top of Safari.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#a01115]/15 text-[#a01115] font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  Scroll down the menu and tap <strong>Add to Home Screen</strong> <PlusSquare className="inline w-3.5 h-3.5 text-[#a01115] ml-1" />.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#a01115]/15 text-[#a01115] font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <span>
                  Open <strong>Brick &amp; Beams Admin</strong> from your home screen and turn on push alerts.
                </span>
              </li>
            </ol>

            <button
              type="button"
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#a01115] text-white font-medium text-xs mt-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// =========================================================================
// 3. MOBILE BOTTOM NAVIGATION APP BAR
// =========================================================================
export function AdminMobileBottomBar() {
  const pathname = usePathname();
  const { isDark } = useAdminTheme();
  const { isSubscribed } = useAdminPwa();

  const tabs = [
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
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: pathname === "/admin/settings" || pathname.startsWith("/admin/settings/"),
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className={`lg:hidden shrink-0 w-full border-t z-40 px-3 py-2 flex items-center justify-around backdrop-blur-lg transition-colors pb-[max(env(safe-area-inset-bottom),8px)] ${
        isDark
          ? "bg-[#121418]/95 border-white/10 text-zinc-400"
          : "bg-white/95 border-zinc-200 text-zinc-600 shadow-lg"
      }`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all ${
              tab.active
                ? isDark
                  ? "text-[#ff4a4f] font-semibold"
                  : "text-[#a01115] font-semibold"
                : "hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            <Icon className={`w-5 h-5 ${tab.active ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            <span className="text-[10px] leading-tight">{tab.label}</span>
          </Link>
        );
      })}

      {/* Push Notification Quick Bell */}
      <div className="flex flex-col items-center justify-center gap-1 py-1 px-3">
        <AdminNotificationCenter />
        <span className="text-[10px] leading-tight">
          {isSubscribed ? "Alerts On" : "Alerts"}
        </span>
      </div>
    </nav>
  );
}

// =========================================================================
// 4. FOREGROUND LEAD ALERT TOAST
// =========================================================================
export function AdminForegroundLeadToast() {
  const { latestForegroundLead, clearLatestLead } = useAdminPwa();
  const { isDark } = useAdminTheme();

  if (!latestForegroundLead) return null;

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-96 z-50 animate-in slide-in-from-top-4 duration-300">
      <div
        className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
          isDark
            ? "bg-[#16181f]/95 border-emerald-500/40 text-white shadow-emerald-950/40"
            : "bg-white/95 border-emerald-500/30 text-zinc-900 shadow-xl"
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
          <BellRing className="w-5 h-5 animate-bounce" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-emerald-500">
              {latestForegroundLead.title}
            </span>
            <button
              type="button"
              onClick={clearLatestLead}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
            {latestForegroundLead.body}
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Link
              href="/admin/leads"
              onClick={clearLatestLead}
              className="px-3 py-1 rounded-lg bg-[#a01115] text-white text-xs font-medium hover:bg-[#850e12] transition-colors"
            >
              View In Leads
            </Link>
            {latestForegroundLead.phone && (
              <a
                href={`tel:${latestForegroundLead.phone}`}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
              >
                Call Client
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
