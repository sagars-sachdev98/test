importScripts("/precache-manifest.849c2f73143b82993cb15c594ecdeb57.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
  if (e.data) {
    if (e.data === 'skipWaiting') {
      self.skipWaiting()
    }
  }
})
var workbox = window.workbox
workbox.clientsClaim()

// The precaching code provided by Workbox. You don't need to change this part.
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

