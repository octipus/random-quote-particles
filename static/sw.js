const cacheName = 'particles';
const staticAssets = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './newsApi.js',
  './news-article.js'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
  console.log('[Service Worker] Install');
});
