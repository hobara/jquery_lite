const DOMNodeCollection = require("./dom_node_collection");

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
