importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: 'index.html', revision: '1' },
    { url: 'nav.html', revision: '1' },
    { url: 'bundle.js', revision: '1' },
    { url: 'styles/preloader-only.css', revision: '1' },
    { url: 'fonts/MaterialIcons-Regular.eot', revision: '1' },
    { url: 'fonts/MaterialIcons-Regular.ttf', revision: '1' },
    { url: 'fonts/MaterialIcons-Regular.woff', revision: '1' },
    { url: 'fonts/MaterialIcons-Regular.woff2', revision: '1' },
    { url: 'img/no-img.png', revision: '1' },
    { url: 'img/icon-72.png', revision: '1' },
    { url: 'img/icon-128.png', revision: '1' },
    { url: 'img/icon-192.png', revision: '1' },
    { url: 'img/icon-384.png', revision: '1' },
    { url: 'img/icon-512.png', revision: '1' },
    { url: 'img/icon-apple-192.png', revision: '1' },
    { url: 'manifest.json', revision: '1' },
]);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org\/v2/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-data',
    })
);
workbox.routing.registerRoute(
    /^https:\/\/upload\.wikimedia\.org\/wikipedia/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'flags',
    })
);

self.addEventListener('push', (event) => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    const options = {
        body: body,
        icon: 'img/icon-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('InfoBola v2 is coming', options)
    );
});
