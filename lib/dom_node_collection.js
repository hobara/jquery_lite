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
