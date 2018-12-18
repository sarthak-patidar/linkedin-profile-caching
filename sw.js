// const staticAssets = [
//     '/',
//     './app.js',
//     './style.css',
//     './fallback.json',
//     './images/fetch-dog.jpg',
// ];

// const linkedinProfile = [
//     'https://linkedin.com/mwlite/me'
// ];


// self.addEventListener('install', async event => {
//     event.waitUntil(
//         caches.open('static-cache').then(function (cache) {
//             console.log('Static Caches Created');
//             cache.addAll(staticAssets.map(function (urlToPrefetch) {
//                 console.log(urlToPrefetch + ' Cached');
//                 return new Request(urlToPrefetch, {mode: "same-origin"});
//             })).then(function () {
//                 console.log('Static Files Cached');
//             })
//         })
//     );
//
//     event.waitUntil(
//         caches.open('lnkdin-profile').then(function (cache) {
//             console.log('Profile Cache Created');
//             cache.addAll(linkedinProfile.map(function (urlToPrefetch) {
//                 console.log('Trying to fetch '+ urlToPrefetch);
//                 return new Request(urlToPrefetch, {mode: "navigate"});
//             })).then(function () {
//                 console.log('Profile Cached');
//             })
//         })
//     );
// });


// self.addEventListener('install', );
//
// self.addEventListener('fetch', event => {
//     const req = event.request;
//     const url = new URL(req.url);
//     cache.addAll([url.orgin]);
//
//     if(url.origin === location.origin){
//         event.respondWith(cacheFirst(req));
//     } else{
//         event.respondWith(networkFirst(req));
//     }
// });
//
//
// async function cacheFirst(req){
//     const cacheResponse = await caches.match(req);
//     return cacheResponse || fetch(req);
// }
//
//
// async function networkFirst(req){
//     const cache = await caches.open('news-dynamics');
//
//     try {
//         const res = await fetch(req);
//         cache.put(req, res.clone());
//         return res;
//     } catch (e) {
//         const cachedResponse = await cache.match(req);
//         return cachedResponse || await caches.match('./fallback.json');
//     }
// }
