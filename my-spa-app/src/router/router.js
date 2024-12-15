export class Router {
  constructor(routes, layoutFunction) {
    this.routes = routes;
    this.layoutFunction = layoutFunction; 
    this.currentPath = '';
    this.init();
  }

  init() {
    window.addEventListener('popstate', this.handleRouteChange.bind(this));
  }

  handleRouteChange() {
    const path = window.location.pathname;
    this.currentPath = path;

    const component = this.routes[path] || this.routes['/'];
    if (!component) {
      console.error(`No route found for path: ${path}`);
      return;
    }

    const appDiv = document.getElementById('app');
    if (!appDiv) {
      console.error('App div not found');
      return;
    }

    const content = component();
    appDiv.innerHTML = this.layoutFunction(content);
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRouteChange();
  }
}
