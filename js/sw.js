console.log('potato')
self.addEventListener('fetch', (event) => {
    console.log('fetch')
    event.respondWith("niglet")
})