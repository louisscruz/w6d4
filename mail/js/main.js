const Router = require('./router');
const Inbox = require('./inbox');
const Sent = require('./sent');

const routes = {
  inbox: Inbox,
  sent: Sent
};

document.addEventListener('DOMContentLoaded', function() {
  let content = document.getElementsByClassName('content')[0];
  let router = new Router(content, routes);
  router.start();
  let sidebar = document.getElementsByClassName('sidebar-nav')[0].children;
  for (let i = 0; i < sidebar.length; i++) {
    sidebar[i].addEventListener('click', function(event) {
      let text = sidebar[i].children[0].innerHTML.toLowerCase();
      window.location.hash = text;
    });
  }
});
