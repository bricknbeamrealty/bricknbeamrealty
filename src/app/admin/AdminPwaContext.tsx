"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useAdminAuth } from "./AdminAuthContext";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type PushPermissionState = "default" | "granted" | "denied" | "unsupported";

interface AdminPwaContextType {
  // PWA install states
  isInstallable: boolean;
  isStandalone: boolean;
  isIOS: boolean;
  promptInstall: () => Promise<boolean>;
  
  // Push notification states
  permission: PushPermissionState;
  isPushSupported: boolean;
  isSubscribed: boolean;
  isSubscribing: boolean;
  subscribeToPush: () => Promise<boolean>;
  unsubscribeFromPush: () => Promise<boolean>;
  sendTestPush: () => Promise<{ success: boolean; message: string }>;
  
  // In-app real-time lead notification
  latestForegroundLead: {
    title: string;
    body: string;
    leadId?: string;
    phone?: string;
  } | null;
  clearLatestLead: () => void;
}

const AdminPwaContext = createContext<AdminPwaContextType | undefined>(undefined);

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function AdminPwaProvider({ children }: { children: React.ReactNode }) {
  const { passcode, isAuthenticated } = useAdminAuth();

  // PWA Install states
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Push states
  const [permission, setPermission] = useState<PushPermissionState>("default");
  const [isPushSupported, setIsPushSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [latestForegroundLead, setLatestForegroundLead] = useState<{
    title: string;
    body: string;
    leadId?: string;
    phone?: string;
  } | null>(null);

  const swRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);

  // 1. Inject Admin PWA Manifest & Meta Tags dynamically
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Admin PWA Manifest Link
    let manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    if (!manifestLink) {
      manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = "/admin.webmanifest";

    // iOS Web App Tags
    const metaTags: Record<string, string> = {
      "apple-mobile-web-app-capable": "yes",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "B&B Admin",
      "theme-color": "#a01115",
    };

    const addedMetas: HTMLMetaElement[] = [];
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
        addedMetas.push(meta);
      } else {
        meta.content = content;
      }
    });

    // Detect Standalone mode & iOS
    const isRunningStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(Boolean(isRunningStandalone));

    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(ua);
    setIsIOS(isAppleDevice);

    // Listen for display-mode changes
    const mediaQuery = window.matchMedia("(display-mode: standalone)");
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
    };
    mediaQuery.addEventListener("change", handleDisplayModeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleDisplayModeChange);
    };
  }, []);

  // 2. Register Service Worker scoped to /admin/
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      setIsPushSupported(false);
      setPermission("unsupported");
      return;
    }

    const checkAndRegisterSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/admin-sw.js", {
          scope: "/admin/",
        });
        swRegistrationRef.current = reg;

        // Check PushManager support
        if ("PushManager" in window) {
          setIsPushSupported(true);
          const currentPerm = Notification.permission as PushPermissionState;
          setPermission(currentPerm);

          // Check if already subscribed
          const existingSub = await reg.pushManager.getSubscription();
          setIsSubscribed(Boolean(existingSub));
        } else {
          setIsPushSupported(false);
          setPermission("unsupported");
        }
      } catch (err) {
        console.warn("[Admin PWA] Service worker registration error:", err);
      }
    };

    checkAndRegisterSW();

    // Listen to messages from Service Worker (e.g. Foreground push notification)
    const handleSWMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "NEW_LEAD_PUSH") {
        const payload = event.data.payload || {};
        setLatestForegroundLead({
          title: payload.title || "🚨 New Lead Received",
          body: payload.body || "A new enquiry has arrived.",
          leadId: payload.leadId,
          phone: payload.phone,
        });

        // Play subtle gentle audio alert if available
        try {
          const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
          audio.volume = 0.6;
          audio.play().catch(() => {});
        } catch {
          // Audio autoplay might be blocked
        }
      }
    };

    navigator.serviceWorker.addEventListener("message", handleSWMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleSWMessage);
    };
  }, []);

  // 3. Listen for Android/Desktop PWA Install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setInstallPrompt(null);
      setIsStandalone(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // 4. Trigger Install Prompt
  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!installPrompt) return false;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstallable(false);
        setInstallPrompt(null);
        return true;
      }
      return false;
    } catch (err) {
      console.error("[Admin PWA] Install prompt failed:", err);
      return false;
    }
  }, [installPrompt]);

  // 5. Subscribe to Web Push Notifications
  const subscribeToPush = useCallback(async (): Promise<boolean> => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      alert("Push notifications are not supported on this browser.");
      return false;
    }

    setIsSubscribing(true);

    try {
      // 1. Request OS/Browser Notification Permission
      const requestedPermission = await Notification.requestPermission();
      setPermission(requestedPermission as PushPermissionState);

      if (requestedPermission !== "granted") {
        setIsSubscribing(false);
        return false;
      }

      // 2. Fetch VAPID Public Key
      const keyRes = await fetch("/api/admin/push/vapid-public-key");
      const keyData = await keyRes.json();
      if (!keyData.success || !keyData.publicKey) {
        throw new Error("Failed to retrieve push server VAPID key.");
      }

      // 3. Get or Wait for Service Worker Registration
      let reg = swRegistrationRef.current;
      if (!reg) {
        reg = await navigator.serviceWorker.ready;
        swRegistrationRef.current = reg;
      }

      // 4. Subscribe to Push Manager
      const convertedVapidKey = urlBase64ToUint8Array(keyData.publicKey);
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

      const subJson = subscription.toJSON();
      if (!subJson.endpoint || !subJson.keys) {
        throw new Error("Malformed push subscription returned by browser.");
      }

      // 5. Register with Server Backend
      const deviceLabel = `${
        /iPhone|iPad|iPod/.test(navigator.userAgent)
          ? "Apple Mobile"
          : /Android/.test(navigator.userAgent)
          ? "Android Mobile"
          : "Desktop Browser"
      } (${navigator.platform || "Device"})`;

      const saveRes = await fetch("/api/admin/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify({
          endpoint: subJson.endpoint,
          keys: subJson.keys,
          deviceLabel,
        }),
      });

      const saveData = await saveRes.json();
      if (saveRes.ok && saveData.success) {
        setIsSubscribed(true);
        setIsSubscribing(false);
        return true;
      } else {
        throw new Error(saveData.error || "Failed to save push subscription on server.");
      }
    } catch (err: unknown) {
      console.error("[Admin PWA] Push subscription failed:", err);
      setIsSubscribing(false);
      return false;
    }
  }, [passcode]);

  // 6. Unsubscribe from Push Notifications
  const unsubscribeFromPush = useCallback(async (): Promise<boolean> => {
    try {
      let reg = swRegistrationRef.current;
      if (!reg) {
        reg = await navigator.serviceWorker.ready;
      }

      const existingSub = await reg.pushManager.getSubscription();
      if (existingSub) {
        const endpoint = existingSub.endpoint;
        await existingSub.unsubscribe();

        // Inform backend
        await fetch("/api/admin/push/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-passcode": passcode,
          },
          body: JSON.stringify({ endpoint }),
        });
      }

      setIsSubscribed(false);
      return true;
    } catch (err) {
      console.error("[Admin PWA] Unsubscribe error:", err);
      return false;
    }
  }, [passcode]);

  // 7. Send Test Push Notification
  const sendTestPush = useCallback(async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      let reg = swRegistrationRef.current;
      if (!reg) {
        reg = await navigator.serviceWorker.ready;
      }
      const existingSub = await reg.pushManager.getSubscription();

      const res = await fetch("/api/admin/push/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-passcode": passcode,
        },
        body: JSON.stringify(
          existingSub ? { endpoint: existingSub.endpoint, keys: existingSub.toJSON().keys } : {}
        ),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message || "Test notification dispatched!" };
      }
      return { success: false, message: data.error || "Failed to send test push." };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Network error";
      return { success: false, message };
    }
  }, [passcode]);

  const clearLatestLead = useCallback(() => {
    setLatestForegroundLead(null);
  }, []);

  return (
    <AdminPwaContext.Provider
      value={{
        isInstallable,
        isStandalone,
        isIOS,
        promptInstall,
        permission,
        isPushSupported,
        isSubscribed,
        isSubscribing,
        subscribeToPush,
        unsubscribeFromPush,
        sendTestPush,
        latestForegroundLead,
        clearLatestLead,
      }}
    >
      {children}
    </AdminPwaContext.Provider>
  );
}

export function useAdminPwa() {
  const context = useContext(AdminPwaContext);
  if (!context) {
    throw new Error("useAdminPwa must be used within an AdminPwaProvider");
  }
  return context;
}
