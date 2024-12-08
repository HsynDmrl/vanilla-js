import { Router } from './router/router.js';
import { homeViewWithListeners } from './components/homeView.js';
import { aboutViewWithListeners } from './components/aboutView.js';
import { layout } from './components/layout.js';
import { store } from './store/store.js';
import { loginViewWithListeners } from './components/login.js';
import { profileViewWithListeners } from './components/profileView.js';
import { registerViewWithListeners } from './components/register.js';  // Register sayfası için import

// Tüm rotalar
const routes = {
  '/': homeViewWithListeners,
  '/about': aboutViewWithListeners,
  '/login' : loginViewWithListeners,
  '/register': registerViewWithListeners,  // Register sayfası için rota ekledik
  '/profile': profileViewWithListeners,
  '/404': () => '404 Not Found',
};

// Router'ı başlat
const router = new Router(routes, layout);

function navigate(path) {
  router.navigate(path);
}

// `navigate` fonksiyonunu global bağlama
window.navigate = navigate;

function startApp() {
  // İlk olarak layout'u oluştur
  router.handleRouteChange();

  // Store değişikliklerini dinle
  store.subscribe(() => router.handleRouteChange());
}

export { startApp };
