class Router {
  constructor(node, routes) {
    this.node = node;
    this.routes = routes;
  }

  start() {
    window.location.hash = 'inbox';
    this.render();
    window.addEventListener('hashchange', event => {
      this.render();
    });
  }

  activeRoute() {
    const route = window.location.hash.slice(1);
    return this.routes[route];
  }

  render() {
    this.node.innerHTML = "";
    let component = this.activeRoute();
    if (typeof component !== 'undefined') {
      // let el = document.createElement('p');
      // el.innerHTML = component.render();
      this.node.appendChild(component.render());
    }
  }

}

module.exports = Router;
