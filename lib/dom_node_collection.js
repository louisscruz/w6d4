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
}

module.exports = DOMNodeCollection;
