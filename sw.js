const CACHE='english-platform-v2';
const ASSETS=['./','./index.html','./assets/css/base.css','./assets/css/themes.css','./assets/js/app.js','./assets/js/tts.js','./assets/js/match-game.js','./assets/js/exam.js','./assets/audio/sfx-correct.mp3','./assets/audio/sfx-click.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;}).catch(()=>caches.match('./index.html'))));});
