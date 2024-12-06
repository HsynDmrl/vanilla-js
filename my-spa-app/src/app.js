import { Router } from './router/router.js';
import { store } from './store/store.js';
import { homeViewWithListeners } from './components/homeView.js';
import { aboutViewWithListeners } from './components/aboutView.js';
import { loader } from './components/loader.js';
import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';

// Routing yapılandırması
const routes = {
  '/': homeViewWithListeners,
  '/about': aboutViewWithListeners,
};

// Router'ı başlat
const router = new Router(routes);

// Store'a dinleyici ekle
store.subscribe(() => {
  renderLoader();  // Loader'ı render et
});

// Loader'ı render et
function renderLoader() {
  const state = store.getState();
  const appDiv = document.getElementById('app');
  
  if (state.loading) {
    appDiv.innerHTML = loader();  // Tam ekran loader ekleyin
  } else {
    renderLayout();  // Loader tamamlandığında layout'u render et
  }
}

// Sayfa düzenini ve içeriklerini render et
function renderLayout() {
  const appDiv = document.getElementById('app');
  
  // HTML yapısını dinamik olarak oluştur
  const navbarHtml = navbar();
  console.log('Navbar HTML:', navbarHtml); // Debugging log
  appDiv.innerHTML = `
    ${navbarHtml}  <!-- Navbar'ı ekle -->
    <div id="api"></div>  <!-- Sayfa içeriği buraya gelecek -->
    ${footer()}  <!-- Footer'ı ekle -->
  `;
  
  // Sayfa yönlendirmesini yap ve içerikleri render et
  router.handleRouteChange();  // Sayfa içeriğini render et
}

// Navigate function to handle navigation
function navigate(path) {
  router.navigate(path);
}

// Make navigate function globally accessible
window.navigate = navigate;

// Uygulamayı başlat
export function startApp() {
  renderLoader();  // İlk render işlemi
  router.handleRouteChange();  // Sayfa yönlendirmesini gerçekleştir
}