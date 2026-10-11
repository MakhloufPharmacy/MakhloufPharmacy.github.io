/**
 * ====================================================================
 * Service Worker — Makhlouf Pharmacy PWA Cache
 * ====================================================================
 */

const CACHE_NAME = 'makhlouf-v5';

// الملفات الأساسية المطلوب حفظها للعمل بدون إنترنت
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './custom-settings.css',
  './config.js',
  './script.js',
  './manifest.json',
  './assets/logo/makhlouf-logo.webp',
  './assets/logo/makhlouf-logo.png',
  './assets/hero/pharmacy-exterior.webp',
  './assets/fonts/Almarai-Regular.ttf',
  './assets/fonts/DG-Sahabah-Reg-font.ttf',
  './assets/fonts/GE_SS_TWO_MEDIUM_5.otf',
  './assets/fonts/DroidKufi-Regular.ttf'
];

// تثبيت الـ Service Worker وحفظ الملفات في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// تفعيل وتحديث الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// التعامل مع طلبات الشبكة (Network First with Cache Fallback)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).then(networkResponse => {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return networkResponse;
      }).catch(() => cachedResponse);
    })
  );
});
