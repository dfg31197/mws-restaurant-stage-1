const version = 'potato-cache-v1';
self.addEventListener('install', (event) => {
    const filesToCache = [
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/index.html',
        '/restaurant.html'
    ];
    event.waitUntil(
        caches.open(version).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
})
self.addEventListener('fetch', (event) => {

event.respondWith(
    // Had to see the order of operations from https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
caches.open(version).then((cache) => {
   return cache.match(event.request).then((response) => {
        if(response) {
            return response;
        }
        
        return fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
        }).catch(() => {
            return new Response(
                '<h1>ur offline lol</h1>',
                {
                    headers: {
                        'content-type': 'text/html',
                    }
                }
            );
        })
    })
})
);

});