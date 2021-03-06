/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(2);

// Selector function
window.$l = function(el) {
  if (typeof el === "string") {
    const elementList = Array.from(document.querySelectorAll(el));
    const nodeCollection = new DOMNodeCollection(elementList);
    return nodeCollection;
  } else if (typeof el === HTMLElement) {
    const nodeCollection = new DOMNodeCollection([el]);
    return nodeCollection;
  }
};


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElems) {
    this.elements = htmlElems;
  }

  html(string) {
    if (string) {
      this.elements.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    this.elements.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(htmlEl) {
    if (htmlEl instanceof DOMNodeCollection) {
      htmlEl.elements.forEach((el) => {
        this.elements.forEach((e) => {
          e.innerHTML += el.outerHTML;
        });
      });
    } else if (htmlEl instanceof HTMLElement) {
      this.elements.forEach((el) => {
        el.innerHTML += htmlEl.outerHTML;
      });
    } else if (typeof htmlEl === "string") {
      this.elements.forEach((el) => {
        el.innerHTML += htmlEl;
      });
    }
  }

  attr(attribute, value) {
    if (!value) {
      this.elements[0].getAttribute(attribute);
    } else {
      this.elements.forEach( (el) => {
        el.setAttribute(attribute, value);
      });
    }
  }

  addClass(className) {
    this.elements.forEach( (el) => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    if (className) {
      this.elements.forEach( (el) => {
        el.classList.remove(className);
      });
    } else {
      this.elements.forEach( (el) => {
        el.removeAttribute("class");
      });
    }
  }

  children() {
    const children = [];

    this.elements.forEach((el) => {
      children.push(Array.from(el.children));
    });
    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];

    this.elements.forEach((el) => {
      parents.push(el.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let selected = [];
    this.elements.forEach((el) => {
      let nodes = Array.from(el.querySelectorAll(selector));
      console.log(nodes);
      selected = selected.concat(nodes);
      console.log(selected);
    });
    return new DOMNodeCollection(selected);
  }

  remove() {
    this.elements.forEach((el) => {
      el.outerHTML = "";
    });
  }


}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);