const DOMNodeCollection = require('./dom_node_collection');

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
