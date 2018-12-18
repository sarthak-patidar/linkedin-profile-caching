const cacheName = 'news-v1';

const staticAssets = [
    './',
    './app.js',
    './style.css',
    './fallback.json',
    './images/fetch-dog.jpg'
];

const lnkdinAssets = [
    'https://linkedin.com/mwlite/me'
];

// self.addEventListener('install', async function () {
//     console.log('Install Triggered');
//     const cache = await caches.open('lnkdinCache');
//     cache.addAll(lnkdinAssets.map(function (urlToFetch) {
//         console.log('Fetching '+ urlToFetch);
//         return new Request(urlToFetch, {mode: "no-cors"});
//     })).then(function () {
//         console.log('Linkedin Profile Cached');
//     });
// });

self.addEventListener('install', async function () {
    console.log('Install Triggered');
    const cache = await caches.open(cacheName);
    cache.addAll(staticAssets);
    console.log('Static Files Cached');
});

self.addEventListener('activate', event => {
    console.log('Activate Triggered');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // console.log('Fetch Triggered on '+event.request.url);
    const request = event.request;
    const url = new URL(request.url);
    if (url.origin === location.origin) {
        console.log('Cached First Response Triggered for '+ url);
        event.respondWith(cacheFirst(request));
    } else {
        console.log('Network First Response Triggered for '+ url);
        event.respondWith(networkFirst(request));
    }
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || fetch(request);
}

async function networkFirst(request) {
    const dynamicCache = await caches.open('news-dynamic');
    try {
        const networkResponse = await fetch(request);
        dynamicCache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        const cachedResponse = await dynamicCache.match(request);
        return cachedResponse || await caches.match('./fallback.json');
    }
}
