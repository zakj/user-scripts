// ==UserScript==
// @name         Daring Fireball Readability
// @description  Improve the readability of daringfireball.net.
// @include      https://daringfireball.net/*
// @version      1.0.0
// ==/UserScript==

(() => {
  const style = [
    "#Main {",
    "  -webkit-font-smoothing: antialiased;",
    "  font-size: 14px;",
    "  width: 40em;",
    "}",
  ].join("\n");
  const node = document.createElement("style");
  node.appendChild(document.createTextNode(style));
  document.head.appendChild(node);
})();
