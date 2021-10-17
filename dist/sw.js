const cacheName="particles",staticAssets=["./","./index.html","./styles.css","./script.js","../static"];async function cacheFirst(t){const e=await caches.open(cacheName);return await e.match(t)||fetch(t)}async function networkAndCache(t){const e=await caches.open(cacheName);try{const a=await fetch(t);return await e.put(t,a.clone()),a}catch(a){return await e.match(t)}}self.addEventListener("install",(async t=>{const e=await caches.open(cacheName);return await e.addAll(staticAssets),self.skipWaiting()})),self.addEventListener("activate",(t=>{self.clients.claim()})),self.addEventListener("fetch",(async t=>{const e=t.request;new URL(e.url).origin===location.origin?t.respondWith(cacheFirst(e)):t.respondWith(networkAndCache(e))}));