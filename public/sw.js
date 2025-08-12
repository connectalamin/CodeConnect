/* Basic Service Worker for CodeConnect */
const CACHE_VERSION = 'v4';
const APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/CodeConnect.svg',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Network-first for API, cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for unsupported schemes
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle external API calls (different origin) or API/auth routes
  if (url.origin !== location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/auth/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }

  // Static assets & navigation
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(resp => {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then(cache => {
            // Only cache http/https requests
            if (request.url.startsWith('http')) {
              cache.put(request, copy).catch(console.warn);
            }
          });
          return resp;
        })
        .catch(() => caches.match('/offline.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(resp => {
        // Opportunistically cache static assets (js/css/png/svg)
        if (['style', 'script', 'image'].includes(request.destination) && request.url.startsWith('http')) {
          const copy = resp.clone();
          caches.open(CACHE_VERSION).then(cache => {
            cache.put(request, copy).catch(console.warn);
          });
        }
        return resp;
      }).catch(() => {
        if (request.destination === 'document') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});
