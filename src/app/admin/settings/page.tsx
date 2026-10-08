"use client";

import React, { useState } from "react";
import {
  Bell,
  BellRing,
  BellOff,
  Smartphone,
  Share2,
  PlusSquare,
  CheckCircle2,
  AlertTriangle,
  Send,
  Loader2,
  Info,
  ShieldCheck,
  Volume2,
  VolumeX,
  Eye,
  Laptop,
} from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";
import { useAdminTheme, AdminThemeIconButton } from "../AdminThemeContext";
import { useAdminPwa } from "../AdminPwaContext";

type PlatformTab = "ios" | "android" | "desktop";

export default function AdminSettingsPage() {
  const { passcode } = useAdminAuth();
  const { isDark } = useAdminTheme();
  const {
    permission,
    isPushSupported,
    isSubscribed,
    isSubscribing,
    subscribeToPush,
    unsubscribeFromPush,
    sendTestPush,
    isStandalone,
    promptInstall,
    isInstallable,
  } = useAdminPwa();

  // Tab for the PWA Mobile App Setup Guide
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformTab>("ios");

  // Notification testing states
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Additional in-depth preferences (stored in localStorage)
  const [soundEnabled, setSoundEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bnb_admin_sound_enabled") !== "false";
    }
    return true;
  });

  const [showPhoneInPreview, setShowPhoneInPreview] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bnb_admin_show_phone_preview") !== "false";
    }
    return true;
  });

  const [showBudgetInPreview, setShowBudgetInPreview] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("bnb_admin_show_budget_preview") !== "false";
    }
    return true;
  });

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("bnb_admin_sound_enabled", String(next));
    }
  };

  const toggleShowPhone = () => {
    const next = !showPhoneInPreview;
    setShowPhoneInPreview(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("bnb_admin_show_phone_preview", String(next));
    }
  };

  const toggleShowBudget = () => {
    const next = !showBudgetInPreview;
    setShowBudgetInPreview(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("bnb_admin_show_budget_preview", String(next));
    }
  };

  const handleTogglePush = async () => {
    setTestResult(null);
    if (isSubscribed) {
      await unsubscribeFromPush();
    } else {
      await subscribeToPush();
    }
  };

  const handleSendTestPush = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await sendTestPush();
    setIsTesting(false);
    setTestResult(res);
    setTimeout(() => {
      setTestResult(null);
    }, 6000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      {/* =====================================================================
          PAGE HEADER
          ===================================================================== */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b transition-colors ${
          isDark ? "border-white/10" : "border-zinc-200"
        }`}
      >
        <div>
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? "text-white" : "text-zinc-900"
            }`}
          >
            Admin Settings
          </h1>
          <p
            className={`text-xs sm:text-sm mt-1 ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            Configure PWA mobile installation, instant lead notifications, and portal preferences.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <AdminThemeIconButton />
        </div>
      </div>

      {/* =====================================================================
          CARD 1: PWA PUSH NOTIFICATIONS & INSTANT ALERTS
          (Exact styling from pm properties screenshot)
          ===================================================================== */}
      <div
        className={`rounded-2xl border p-5 sm:p-7 shadow-xs transition-all ${
          isDark
            ? "bg-[#14161a] border-white/10 text-white"
            : "bg-white border-zinc-200/90 text-zinc-900"
        }`}
      >
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                isDark
                  ? "bg-[#a01115]/15 text-[#ff4a4f] border border-[#a01115]/30"
                  : "bg-rose-50 text-[#a01115] border border-rose-100"
              }`}
            >
              <BellRing className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                PWA Push Notifications &amp; Instant Alerts
              </h2>
              <p
                className={`text-xs sm:text-sm mt-0.5 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Get real-time alerts on your phone or computer the second a client requests a consultation.
              </p>
            </div>
          </div>

          {/* Status Badge Pill */}
          <div className="shrink-0 self-start sm:self-center">
            {isSubscribed ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active &amp; Subscribed
              </span>
            ) : permission === "denied" ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium border border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Permission Blocked
              </span>
            ) : !isPushSupported ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium border border-zinc-300 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                Unsupported Browser
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium border border-amber-300/80 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-300">
                Not Subscribed
              </span>
            )}
          </div>
        </div>

        {/* Middle Body / Description */}
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? "text-zinc-300" : "text-zinc-600"
              }`}
            >
              Push alerts display the client&apos;s name, property demand (1/2/3 BHK), and
              budget bracket with deep-links directly into the lead record.
            </p>
            <p
              className={`text-xs flex items-center gap-1.5 ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-zinc-400" />
              <span>Supports Android, Windows, Mac, and iOS 16.4+ (when added to Home Screen).</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            {isPushSupported && (
              <>
                <button
                  type="button"
                  onClick={handleTogglePush}
                  disabled={isSubscribing}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isSubscribed
                      ? isDark
                        ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10"
                        : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300"
                      : "bg-[#2b080b] hover:bg-[#3d0b0f] text-white shadow-[#2b080b]/30 border border-[#a01115]/40"
                  }`}
                >
                  {isSubscribing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Configuring...</span>
                    </>
                  ) : isSubscribed ? (
                    <>
                      <BellOff className="w-4 h-4 text-zinc-400" />
                      <span>Disable Notifications</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 text-rose-300" />
                      <span>Enable Push Notifications</span>
                    </>
                  )}
                </button>

                {/* Send Test Notification Button */}
                <button
                  type="button"
                  onClick={handleSendTestPush}
                  disabled={isTesting}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                    isDark
                      ? "border-white/15 hover:bg-white/5 text-zinc-200"
                      : "border-zinc-200 hover:bg-zinc-50 text-zinc-700 shadow-2xs"
                  }`}
                >
                  {isTesting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5 text-[#a01115]" />
                  )}
                  <span>Send Test Notification</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Test Result Message Banner */}
        {testResult && (
          <div
            className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2.5 border animate-in fade-in ${
              testResult.success
                ? isDark
                  ? "bg-emerald-950/20 border-emerald-800/30 text-emerald-300"
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
                : isDark
                ? "bg-rose-950/20 border-rose-800/30 text-rose-300"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>

      {/* =====================================================================
          CARD 2: PWA MOBILE APP SETUP GUIDE
          (Exact styling from pm properties screenshot with iPhone/Android/Desktop tabs)
          ===================================================================== */}
      <div
        className={`rounded-2xl border p-5 sm:p-7 shadow-xs transition-all ${
          isDark
            ? "bg-[#14161a] border-white/10 text-white"
            : "bg-white border-zinc-200/90 text-zinc-900"
        }`}
      >
        {/* Header Row with Platform Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                isDark
                  ? "bg-blue-950/40 text-blue-400 border border-blue-800/30"
                  : "bg-blue-50 text-blue-600 border border-blue-100"
              }`}
            >
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">
                PWA Mobile App Setup Guide
              </h2>
              <p
                className={`text-xs sm:text-sm mt-0.5 ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}
              >
                Step-by-step instructions to install Brick &amp; Beams Admin on your home screen and enable lockscreen push alerts.
              </p>
            </div>
          </div>

          {/* Segmented Platform Toggle */}
          <div
            className={`inline-flex items-center p-1 rounded-xl border text-xs font-medium self-start lg:self-center shrink-0 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-zinc-100 border-zinc-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setSelectedPlatform("ios")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === "ios"
                  ? isDark
                    ? "bg-white/15 text-white shadow-xs font-semibold"
                    : "bg-white text-zinc-900 shadow-xs font-semibold"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              iPhone (iOS)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlatform("android")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === "android"
                  ? isDark
                    ? "bg-white/15 text-white shadow-xs font-semibold"
                    : "bg-white text-zinc-900 shadow-xs font-semibold"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Android
            </button>
            <button
              type="button"
              onClick={() => setSelectedPlatform("desktop")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedPlatform === "desktop"
                  ? isDark
                    ? "bg-white/15 text-white shadow-xs font-semibold"
                    : "bg-white text-zinc-900 shadow-xs font-semibold"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              Windows / Mac
            </button>
          </div>
        </div>

        {/* Important Requirement Alert Box */}
        <div
          className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
            selectedPlatform === "ios"
              ? isDark
                ? "bg-amber-950/20 border-amber-800/35 text-amber-200"
                : "bg-[#fffbeb] border-amber-200 text-amber-900"
              : selectedPlatform === "android"
              ? isDark
                ? "bg-emerald-950/20 border-emerald-800/35 text-emerald-200"
                : "bg-emerald-50 border-emerald-200 text-emerald-900"
              : isDark
              ? "bg-blue-950/20 border-blue-800/35 text-blue-200"
              : "bg-blue-50 border-blue-200 text-blue-900"
          }`}
        >
          <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div>
            {selectedPlatform === "ios" && (
              <p>
                <strong>Important Apple iOS Requirement:</strong> Apple requires using{" "}
                <span className="underline font-semibold">Safari</span> to install PWAs. In addition, Apple iOS only allows Web Push notifications once the app has been added to your Home Screen (requires iOS 16.4 or newer).
              </p>
            )}
            {selectedPlatform === "android" && (
              <p>
                <strong>Android WebAPK Feature:</strong> Android Chrome and Edge allow 1-tap installation with full native icon placement in your app drawer, badges, and high-priority notification channels.
              </p>
            )}
            {selectedPlatform === "desktop" && (
              <p>
                <strong>Desktop Standalone Window:</strong> Chrome, Edge, and Brave support running Brick &amp; Beams Admin in an isolated window without browser tabs, with full OS dock and notification tray alerts.
              </p>
            )}
          </div>
        </div>

        {/* 4-Step Interactive Guide Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* STEP 1 */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                : "bg-zinc-50/70 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <div>
              <div
                className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center border ${
                  isDark
                    ? "bg-white/10 border-white/15 text-zinc-300"
                    : "bg-white border-zinc-200 text-zinc-700 shadow-2xs"
                }`}
              >
                1
              </div>
              <h3 className="font-bold text-sm mt-3.5 mb-1.5 flex items-center gap-1.5">
                {selectedPlatform === "ios"
                  ? "Open in Safari"
                  : selectedPlatform === "android"
                  ? "Open in Chrome / Edge"
                  : "Open in Chromium"}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "Open this admin portal in Apple Safari on your iPhone."
                  : selectedPlatform === "android"
                  ? "Open this admin portal in Google Chrome or Edge on your Android phone."
                  : "Open this admin portal in Chrome, Brave, or Edge on Windows or macOS."}
              </p>
            </div>
            <div className="mt-5">
              <span
                className={`inline-block font-mono text-[11px] px-2 py-0.5 rounded ${
                  isDark
                    ? "bg-white/5 text-zinc-400"
                    : "bg-zinc-200/60 text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "browser: Safari"
                  : selectedPlatform === "android"
                  ? "browser: Chrome/Edge"
                  : "browser: Chromium"}
              </span>
            </div>
          </div>

          {/* STEP 2 */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                : "bg-zinc-50/70 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <div>
              <div
                className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center border ${
                  isDark
                    ? "bg-white/10 border-white/15 text-zinc-300"
                    : "bg-white border-zinc-200 text-zinc-700 shadow-2xs"
                }`}
              >
                2
              </div>
              <h3 className="font-bold text-sm mt-3.5 mb-1.5 flex items-center gap-1.5">
                {selectedPlatform === "ios"
                  ? "Tap Share ⎋"
                  : selectedPlatform === "android"
                  ? "Tap Menu (⋮) or Banner"
                  : "Click Install Icon ⊕"}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "Tap the Share icon (the square with arrow pointing up) on the bottom toolbar."
                  : selectedPlatform === "android"
                  ? "Tap 'Install App' on the top banner or tap the three dots (⋮) in the top right."
                  : "Click the small computer/install icon located on the right side of the URL address bar."}
              </p>
            </div>
            <div className="mt-5">
              <span
                className={`inline-block font-mono text-[11px] px-2 py-0.5 rounded ${
                  isDark
                    ? "bg-white/5 text-zinc-400"
                    : "bg-zinc-200/60 text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "action: Share icon"
                  : selectedPlatform === "android"
                  ? "action: Install button"
                  : "action: Address bar"}
              </span>
            </div>
          </div>

          {/* STEP 3 */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                : "bg-zinc-50/70 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <div>
              <div
                className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center border ${
                  isDark
                    ? "bg-white/10 border-white/15 text-zinc-300"
                    : "bg-white border-zinc-200 text-zinc-700 shadow-2xs"
                }`}
              >
                3
              </div>
              <h3 className="font-bold text-sm mt-3.5 mb-1.5 flex items-center gap-1.5">
                {selectedPlatform === "ios"
                  ? "Add to Home Screen +"
                  : selectedPlatform === "android"
                  ? "Confirm 'Install'"
                  : "Pin to Dock / Taskbar"}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "Scroll down and select 'Add to Home Screen', then tap 'Add' in the top right."
                  : selectedPlatform === "android"
                  ? "Select 'Install' when prompted. An icon will appear on your home screen & app drawer."
                  : "Click 'Install'. You can right-click the open app icon and pin it to your taskbar."}
              </p>
            </div>
            <div className="mt-5">
              <span
                className={`inline-block font-mono text-[11px] px-2 py-0.5 rounded ${
                  isDark
                    ? "bg-white/5 text-zinc-400"
                    : "bg-zinc-200/60 text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "installs app icon"
                  : selectedPlatform === "android"
                  ? "creates WebAPK"
                  : "desktop shortcut"}
              </span>
            </div>
          </div>

          {/* STEP 4 */}
          <div
            className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
              isDark
                ? "bg-white/[0.02] border-white/10 hover:border-white/20"
                : "bg-zinc-50/70 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <div>
              <div
                className={`w-6 h-6 rounded-md font-bold text-xs flex items-center justify-center border ${
                  isDark
                    ? "bg-white/10 border-white/15 text-zinc-300"
                    : "bg-white border-zinc-200 text-zinc-700 shadow-2xs"
                }`}
              >
                4
              </div>
              <h3 className="font-bold text-sm mt-3.5 mb-1.5 flex items-center gap-1.5">
                Open &amp; Enable Push 🔔
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {selectedPlatform === "ios"
                  ? "Launch B&B Admin from your iPhone home screen, go to Settings, and tap 'Enable Push Notifications'."
                  : selectedPlatform === "android"
                  ? "Launch the app from your home screen and click 'Enable Push Notifications' to grant permissions."
                  : "Open B&B Admin and tap 'Enable Push Notifications' to receive Windows/Mac notification banners."}
              </p>
            </div>
            <div className="mt-5">
              <span
                className={`inline-block font-mono text-[11px] px-2 py-0.5 rounded ${
                  isDark
                    ? "bg-white/5 text-zinc-400"
                    : "bg-zinc-200/60 text-zinc-600"
                }`}
              >
                lockscreen alerts
              </span>
            </div>
          </div>
        </div>

        {/* Quick Install Action on supported Android/Desktop devices */}
        {isInstallable && (
          <div className="mt-6 pt-5 border-t border-zinc-200/60 dark:border-white/10 flex items-center justify-between">
            <span
              className={`text-xs ${
                isDark ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              This browser supports instant 1-tap installation right now:
            </span>
            <button
              type="button"
              onClick={promptInstall}
              className="px-4 py-2 rounded-xl bg-[#a01115] hover:bg-[#850e12] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              Install App on This Device
            </button>
          </div>
        )}
      </div>

      {/* =====================================================================
          CARD 3: IN-DEPTH NOTIFICATION & PORTAL PREFERENCES
          ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lead Notification Options */}
        <div
          className={`rounded-2xl border p-5 sm:p-6 shadow-xs space-y-4 ${
            isDark
              ? "bg-[#14161a] border-white/10 text-white"
              : "bg-white border-zinc-200/90 text-zinc-900"
          }`}
        >
          <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-100 dark:border-white/5">
            <div className="w-8 h-8 rounded-lg bg-[#a01115]/10 text-[#a01115] flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Lead Alert Preferences</h3>
              <p className="text-xs text-zinc-400">Customise notification display &amp; sound</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Sound toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <div>
                <span className="font-semibold block">Foreground Sound Chime</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                  Play sound when a new lead arrives while app is open
                </span>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  soundEnabled ? "bg-[#a01115]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    soundEnabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Show Phone Number toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <div>
                <span className="font-semibold block">Client Phone in Push Title</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                  Include phone number in notification body for quick dialing
                </span>
              </div>
              <button
                type="button"
                onClick={toggleShowPhone}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showPhoneInPreview ? "bg-[#a01115]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    showPhoneInPreview ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Show Budget toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/60 dark:border-white/5">
              <div>
                <span className="font-semibold block">Property Demand in Alert</span>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                  Include requirement (e.g. 2 BHK, 3 BHK) and budget
                </span>
              </div>
              <button
                type="button"
                onClick={toggleShowBudget}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  showBudgetInPreview ? "bg-[#a01115]" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    showBudgetInPreview ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
