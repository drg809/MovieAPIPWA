const CACHE_NAME = "v1_cache_api_movies";
const URLSTOCACHE = [
   "./",
   "./?umt_source=web_app_manifest",
   "https://www.omdbapi.com/?i=tt3896198&apikey=d07f9626",
   "./assets/img/favicon.png",
   "./assets/img/icon32.png",
   "./assets/img/icon64.png",
   "./assets/img/icon128.png",
   "./assets/img/icon256.png",
   "./assets/img/icon512.png",
   "https://unpkg.com/vue@next",
   "./js/main.js",
   "./js/mountApp.js",
   "./css/style.css",  
];

self.addEventListener("install", e => {
   e.waitUntil(
      caches.open(CACHE_NAME).then(
         cache => cache.addAll(URLSTOCACHE).then(
            () => self.skipWaiting()
         ).catch(
            err => console.log(err)
         )
      )
   )
})

self.addEventListener("activate", e => {
   const cacheWhiteList = [CACHE_NAME];

   e.waitUntil(
      caches.keys().then(
         cacheNames => {
            return Promise.all(
               cacheNames.map(
                  cacheName => {
                     if(cacheWhiteList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                     }
                  }
               )
            )
         }
      ).then(
         () => self.clients.clain()
      )
   );
});

self.addEventListener("fetch", (e) => {
   e.respondWith(
      caches.match(e.request).then((res) => {
         if(res) {
            return res;
         }
         return fetch(e.request);
      })
   );
});