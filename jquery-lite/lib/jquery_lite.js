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

	const DOMNodeCollection = __webpack_require__(1);

	function $l ( selector ) {
	  let res = null;
	  console.log('hello');

	  if (typeof selector === 'string') {
	    let list = document.querySelectorAll(selector);
	    res = Array.from(list);
	  } else if (selector instanceof HTMLElement) {
	    let htmlElements = Array.from(arguments);
	    res = new DOMNodeCollection(htmlElements);
	  } else if (selector instanceof Array) {
	    res = new DOMNodeCollection(selector);
	  }

	  return res;
	}

	function isDOMLoaded(){
	 return document.readyState == 'complete';
	}

	window.$l = $l;

	  // let a = window.$l('div');
	  // let b = window.$l(a[0]);
	  // console.log(a);
	  // console.log(b);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(htmlEls) {
	    this.collection = htmlEls;
	  }

	  html(arg) {
	    if (typeof arg !== 'string') {
	      return this.collection[0].innerHTML;
	    } else {
	      this.collection[0].innerHTML = arg;
	    }
	  }

	  empty() {
	    this.collection.forEach((el) => {
	      el.innerHTML = '';
	    });
	  }

	  append(arg) {
	    if (typeof arg === 'string') {
	      this.collection.forEach((el) => {
	        el.insertAdjacentHTML('beforeend', arg);
	      });
	    } else if (arg instanceof HTMLElement) {
	      this.collection.forEach((el) => {
	        el.insertAdjacentHTML('beforeend', arg.outerHTML);
	      });
	    } else if (arg instanceof DOMNodeCollection) {
	      this.collection.forEach(el => {
	        arg.collection.forEach(node => {
	          el.insertAdjacentHTML('beforeend', node.outerHTML);
	        });
	      });
	    }
	  }

	  attr(arg) {
	    if (arguments.length === 1) {
	      let attributes = [];
	      this.collection.forEach(el => {
	        attributes.push(el.getAttribute(arg));
	      });
	      return attributes;
	    } else {
	      this.collection.forEach(el => {
	        el.setAttribute(arg, arguments[1]);
	      });
	    }
	  }

	  addClass(...args) {
	    this.collection.forEach(el => {
	      if (!el.getAttribute('class')) {
	        el.setAttribute('class', '');
	      }
	      let classValues = el.getAttribute('class').split(' ');
	      for (let i = 0; i < args.length; i++) {
	        if (!classValues.includes(args[i])) {
	          classValues.push(args[i]);
	        }
	      }
	      el.setAttribute('class', classValues.join(' '));
	    });
	  }

	  removeClass(...args) {
	    this.collection.forEach( el => {
	      let classValues = el.getAttribute('class').split(' ');
	      for (let i = 0; i < args.length; i++) {
	        if (classValues.includes(args[i])) {
	          let spliceIndex = classValues.indexOf(args[i]);
	          classValues.splice(spliceIndex, 1);
	        }
	      }
	      if (classValues.length === 0) {
	        el.removeAttribute('class');
	      } else {
	        el.setAttribute('class', classValues.join(' '));
	      }
	    });
	  }

	  children() {
	    let allKiddies = [];

	    this.collection.forEach(el => {
	      for (let i = 0; i < el.children.length; i++) {
	        allKiddies.push(el.children[i]);
	      }
	    });

	    return new DOMNodeCollection(allKiddies);
	  }

	  parent() {
	    let parents = [];

	    this.collection.forEach(el => {
	      if (!parents.includes(el.parentElement)) {
	        parents.push(el.parentElement);
	      }
	    });

	    return parents;
	  }

	  find(selector) {
	    let els = [];
	    this.collection.forEach( el => {
	      let found = el.querySelectorAll(selector);
	      for (let i = 0; i < found.length; i++) {
	        els.push(found[i]);
	      }
	    });
	    return new DOMNodeCollection(els);
	  }

	  remove() {
	    this.collection.forEach( (el) => {
	      let parent = el.parentElement;
	      parent.removeChild(el);
	    });
	    this.collection = [];
	  }

	  on(event, cb) {
	    this.collection.forEach(el => {
	      el.addEventListener(event, cb);
	    });
	  }

	  off(event, cb) {
	    this.collection.forEach(el => {
	      el.removeEventListener(event, cb);
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);