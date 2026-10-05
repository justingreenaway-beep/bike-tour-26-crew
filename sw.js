// Bike Tour 26 crew edition service worker.
// Bump VERSION if you change fonts, icons or firebase-bundle.js. index.html and config.js update themselves.
const VERSION = 'tour26-crew-v1';
const SHELL = ['./', './index.html', './config.js', './firebase-bundle.js', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './fonts/Barlow-Regular.ttf', './fonts/Barlow-Medium.ttf', './fonts/Barlow-SemiBold.ttf',
  './fonts/BarlowCondensed-SemiBold.ttf', './fonts/BarlowCondensed-Bold.ttf', './fonts/BarlowCondensed-ExtraBold.ttf'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
const networkFirst = (req, key) => fetch(req).then(res => {
  if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(key || req, copy)); }
  return res;
}).catch(() => caches.match(key || req));

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  // Firebase traffic (sign-in, database) and map links go straight to the network; Firebase keeps its own offline copy.
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (req.mode === 'navigate') return e.respondWith(networkFirst(req, './index.html'));
  if (url.pathname.endsWith('/config.js')) return e.respondWith(networkFirst(req));
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
