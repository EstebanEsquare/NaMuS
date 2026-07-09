/**
 * Service Worker
 * 
 * PWA için offline desteği ve cache yönetimi
 */

const CACHE_NAME = 'sohbet-cache-v1';
const OFFLINE_PAGE = 'offline.html';

// Cache'lenecek dosyalar
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './firebase.js',
    './auth.js',
    './chat.js',
    './app.js',
    './manifest.json',
    './offline.html',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-database-compat.js'
];

/**
 * Service Worker yüklendiğinde çalışır
 * Statik dosyaları cache'e ekler
 */
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => {
                console.log('Service Worker installed');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Cache failed:', error);
            })
    );
});

/**
 * Service Worker aktif olduğunda çalışır
 * Eski cache'leri temizler
 */
self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                return self.clients.claim();
            })
    );
});

/**
 * Fetch olayını yakala
 * Network first, cache fallback stratejisi kullanır
 */
self.addEventListener('fetch', (event) => {
    // Firebase isteklerini cache'leme
    if (event.request.url.includes('firebase')) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    return fetch(event.request).then((response) => {
                        // Başarılı yanıtı cache'e ekle
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, responseClone);
                            });
                        }
                        return response;
                    });
                })
                .catch(() => {
                    // Network başarısız, cache'ten dene
                    return caches.match(event.request);
                })
        );
        return;
    }
    
    // HTML ve diğer statik dosyalar için network first
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Başarılı yanıtı cache'e ekle
                if (response.ok) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Network başarısız, cache'ten dene
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        
                        // Eğer bir sayfa isteği ise offline sayfasını göster
                        if (event.request.mode === 'navigate') {
                            return caches.match(OFFLINE_PAGE);
                        }
                        
                        // Boş yanıt dön
                        return new Response('Offline', { status: 503 });
                    });
            })
    );
});

/**
 * Arka plan senkronizasyonu (opsiyonel)
 * Kullanılabilir ancak bu uygulamada aktif değil
 */
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
});

/**
 * Push notification (opsiyonel)
 * Kullanılabilir ancak bu uygulamada aktif değil
 */
self.addEventListener('push', (event) => {
    console.log('Push received:', event);
});
