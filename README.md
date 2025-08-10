# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Progressive Web App (PWA)

The application has been upgraded with baseline PWA capabilities:

Features:
- Web App Manifest (`public/manifest.webmanifest`)
- Service Worker (`public/sw.js`) with:
	- App shell & offline fallback (`public/offline.html`)
	- Network-first strategy for API calls
	- Cache-first with runtime caching for static assets
- Custom install prompt UI (in `index.html`)
- Theme & Apple meta tags for better mobile integration

How to test:
1. Build & preview: `npm run build && npm run preview`.
2. Open Chrome DevTools > Application > Manifest – verify installable.
3. Run Lighthouse (PWA category) – should report installable & offline capable.
4. Toggle offline and reload: offline page should appear.

Cache busting:
- Increment `CACHE_VERSION` in `public/sw.js` after changing caching logic.

Next enhancements (not yet implemented):
- Add `vite-plugin-pwa` for automatic precache of hashed bundles.
- Push notifications with Web Push & a backend subscription endpoint.
- Background sync for queued outbound actions while offline.
- Periodic background sync for refreshing data quietly.

Icons:
- Replace placeholder PNGs in `public/icons` with exported versions from `CodeConnect.svg` (sizes: 192, 512, and maskable variants).

If you migrate to `vite-plugin-pwa`, remove manual `sw.js` registration and let the plugin inject the service worker & manifest.

