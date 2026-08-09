// Henotic Diagnostics — Service Worker v4 (Purges all stale v1/v2/v3 caches)
// Direct Network-First for Navigation, Cache-first for Static Assets

const CACHE_NAME = 'henotic-v4';
const APP_SHELL = ['/contact', '/about-us'];

const OFFLINE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offline — Henotic Diagnostics</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #0f172a, #1e3a5f); color: white; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; }
    .card { background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border-radius: 24px; padding: 3rem; text-align: center; max-width: 480px; border: 1px solid rgba(255,255,255,0.15); }
    h1 { font-size: 1.75rem; font-weight: 900; margin-bottom: 1rem; }
    p { color: rgba(255,255,255,0.7); line-height: 1.6; margin-bottom: 1.5rem; }
    .icon { font-size: 3rem; margin-bottom: 1rem; }
    button { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">📡</div>
    <h1>You're Offline</h1>
    <p>Please check your internet connection and try again.</p>
    <button onclick="window.location.reload()">Try Again</button>
  </div>
</body>
</html>`;

// Install — pre-cache offline fallback shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW v4] Pre-caching offline shell');
      return cache.addAll(APP_SHELL).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate — aggressively purge all legacy caches (v1, v2, v3, etc.)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW v4] Purging old stale cache:', name);
            return caches.delete(name);
          })
      )
    )
  );
  self.clients.claim();
});

// Message listener to trigger skipWaiting on demand
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch — strategy based on request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip API routes, booking-system, & seo-image-optimizer — always network
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/booking-system') ||
    url.pathname.startsWith('/seo-image-optimizer')
  ) {
    return;
  }

  // Navigation requests — ALWAYS fetch fresh from Network when online. Never serve stale HTML.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => response)
        .catch(() =>
          caches.match(request).then(
            (cached) =>
              cached ||
              new Response(OFFLINE_HTML, {
                headers: { 'Content-Type': 'text/html' },
              })
          )
        )
    );
    return;
  }

  // Static assets — cache-first with network fallback
  const isStaticAsset =
    url.pathname.match(/\.(js|css|webp|png|jpg|jpeg|svg|woff2|woff|ico)$/) ||
    url.pathname.startsWith('/_next/static/');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok || response.type === 'opaque') {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // Everything else — network-first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
