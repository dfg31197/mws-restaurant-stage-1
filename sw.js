console.log('potato')
self.addEventListener('fetch', (event) => {
    console.log(event.request.url)
return fetch(event.request)
})