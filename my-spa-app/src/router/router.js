export class Router {
    constructor(routes) {
      this.routes = routes;
      this.currentPath = '';
      this.init();
    }

    init() {
      window.addEventListener('popstate', this.handleRouteChange.bind(this));  // Sayfa geçişleri için
      this.handleRouteChange();  // Sayfa ilk yüklendiğinde yönlendirme yapılacak
    }

    handleRouteChange() {
      const path = window.location.pathname;
      this.currentPath = path;

      const component = this.routes[path] || this.routes['/'];  // Varsayılan olarak ana sayfa gösterilebilir
      this.renderComponent(component);
    }

    navigate(path) {
      window.history.pushState({}, '', path);  // URL'yi güncelle
      this.handleRouteChange();  // Yeni yolu işleyip render et
    }

    renderComponent(component) {
      const contentDiv = document.getElementById('app');
      if (!contentDiv) {
        console.error('content div not found');
        return;
      }
      contentDiv.innerHTML = component();  // Component'i render et
    }
}
