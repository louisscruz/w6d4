/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Router = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);