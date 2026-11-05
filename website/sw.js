// Retire the client worker from the temporarily shared website hostname.
// Preserve browser storage and drafts; this page does not install a new worker.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(self.registration.unregister());
});
