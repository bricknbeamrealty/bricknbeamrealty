// Brick & Beams Admin Service Worker (Scoped exclusively to /admin)
const SW_VERSION = "bnb-admin-sw-v1.0.0";
const CACHE_NAME = `bnb-admin-cache-${SW_VERSION}`;

const STATIC_ASSETS = [
  "/admin",
  "/admin.webmanifest",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
  "/favicon.ico"
];

// 1. Install Event: Pre-cache core shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn("[Admin SW] Pre-caching warning:", err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Clean old caches and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith("bnb-admin-cache-")) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Push Event: Receive incoming lead notifications from server
self.addEventListener("push", (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = {
        title: "🚨 New Lead Received",
        body: event.data.text() || "A new client enquiry has arrived."
      };
    }
  } else {
    data = {
      title: "🚨 New Lead Received",
      body: "A new client enquiry has arrived on Brick & Beams."
    };
  }

  const title = data.title || "🚨 New Lead: Brick & Beams";
  const body = data.body || "A new property enquiry has arrived. Tap to view.";
  const url = data.url || "/admin/leads";
  const phone = data.phone || null;
  const leadId = data.leadId || null;

  const notificationOptions = {
    body,
    icon: "/android-chrome-192x192.png",
    badge: "/android-chrome-192x192.png",
    image: data.image || undefined,
    tag: data.tag || `lead-${Date.now()}`,
    renotify: true,
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 300],
    timestamp: data.timestamp || Date.now(),
    data: {
      url,
      phone,
      leadId,
      fullData: data
    },
    actions: phone
      ? [
          { action: "view", title: "👁️ View Lead" },
          { action: "call", title: `📞 Call (${phone})` }
        ]
      : [
          { action: "view", title: "👁️ View Lead" }
        ]
  };

  event.waitUntil(
    Promise.all([
      self.registration.showNotification(title, notificationOptions),
      // Also broadcast to any open Admin windows
      self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
        clientList.forEach((client) => {
          if (client.url && client.url.includes("/admin")) {
            client.postMessage({
              type: "NEW_LEAD_PUSH",
              payload: data
            });
          }
        });
      })
    ])
  );
});

// 4. Notification Click Event: Handle tap on notification or actions
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const targetUrl = data.url || "/admin/leads";
  const action = event.action;

  // Handle "call" action
  if (action === "call" && data.phone) {
    const cleanPhone = String(data.phone).replace(/[^0-9+]/g, "");
    event.waitUntil(
      self.clients.openWindow(`tel:${cleanPhone}`)
    );
    return;
  }

  // Handle default tap or "view" action: focus existing admin tab or open new one
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Find an open admin tab
      for (const client of clientList) {
        if (client.url && client.url.includes("/admin")) {
          if ("focus" in client) {
            client.focus();
            if (client.navigate) {
              client.navigate(targetUrl);
            }
            return client;
          }
        }
      }
      // If no admin tab is open, open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// 5. Fetch Event: Network-first caching for admin pages and assets
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Only handle GET requests within same origin
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Do not cache API endpoints or Supabase calls
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Only handle /admin routes or admin static assets
  if (url.pathname.startsWith("/admin") || STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cache on network drop
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Offline fallback for admin HTML pages
            if (request.headers.get("accept")?.includes("text/html")) {
              return caches.match("/admin");
            }
            return new Response("Offline", { status: 503, statusText: "Offline" });
          });
        })
    );
  }
});
