class DOMNodeCollection {
  constructor(htmlElems) {
    this.elements = htmlElems;
  }

  html(string) {
    if (string) {
      this.elements.forEach((el) => {
        console.log(el);
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
    if (typeof htmlEl === DOMNodeCollection) {
      htmlEl.forEach((el) => {
        this.elements.forEach((e) => {
          e.innerHTML += el.outerHTML;
        });
      });
    } else if (typeof htmlEl === HTMLElement) {
      this.elements.forEach((el) => {
        el.innerHTML += htmlEl.outerHTML;
      });
    } else if (typeof htmlEl === "string") {
      this.elements.forEach((el) => {
        el.innerHTML += htmlEl;
      });
    }
  }

}

module.exports = DOMNodeCollection;
