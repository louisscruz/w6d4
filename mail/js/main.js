const Router = require('./router');

document.addEventListener('DOMContentLoaded', function() {
  let content = document.getElementsByClassName('content')[0];
  let router = new Router(content);
  router.start();
  let sidebar = document.getElementsByClassName('sidebar-nav')[0].children;
  for (let i = 0; i < sidebar.length; i++) {
    sidebar[i].addEventListener('click', function(event) {
      let text = sidebar[i].children[0].innerHTML.toLowerCase();
      window.location.hash = text;
    });
  }
});
