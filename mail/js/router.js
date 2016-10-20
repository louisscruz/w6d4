class Router {
  constructor(node) {
    this.node = node;
  }

  start() {
    this.render();
    console.log(this.node);
    console.log('here');
    window.addEventListener('hashchange', event => {
      console.log('m in the event');
      this.render();
    });
  }

  activeRoute() {
    return window.location.hash.slice(1);
  }

  render() {
    this.node.innerHTML = "";
    let currentRoute = this.activeRoute();
    let el = document.createElement('p');
    el.innerHTML = currentRoute;
    this.node.appendChild(el);
  }

}

module.exports = Router;
