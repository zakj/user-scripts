// ==UserScript==
// @name         MetaFilter Favorites Bar
// @description  Display a visual indicator of heavily-favorited comments.
// @include      https://www.metafilter.com/*
// @include      https://*.metafilter.com/*
// @version      1.0.0
// ==/UserScript==

(() => {
  // Highlight comments with at least this many favorites.
  const threshold = 2;

  // Choose the color based on the sub-site.
  const host = location.hostname.split(".")[0];
  const color =
    {
      ask: "#47cf4a",
      metatalk: "#888888",
      www: "#337dc3",
    }[host] ?? "#337dc3";

  function findParentWithClass(node, cls) {
    const parent = node.parentNode;
    if (parent.classList.contains(cls)) return parent;
    return findParentWithClass(parent, cls);
  }

  // Each time node.style.foo is assigned to, the browser must repaint. That
  // means 3 * (number of faved comments) repaints to apply the prior
  // implementation. Instead, traverse the comments adding classes for each
  // distinct fave count, then create a style element and apply it all at
  // once, for a single repaint.
  const seenFaves = {};

  const links = document.querySelectorAll('.comments a[href^="/favorited/"]');
  for (let i = 0; i < links.length; ++i) {
    const el = links[i];
    const faves = Number(el.textContent.split(" ")[0]);
    if (faves < threshold) continue;
    seenFaves[faves] = true;
    findParentWithClass(el, "comments").classList.add(
      "has-faves",
      `has-faves--${faves}`,
    );
  }

  const style = [".has-faves {", "  padding-left: 5px;", "}"];
  for (const faves in seenFaves) {
    const width = Math.floor(faves / 2) + 1;
    style.push(`.has-faves--${faves} {`);
    style.push(`  border-left: ${width}px solid ${color};`);
    style.push(`  margin-left: ${70 - width}px;`);
    style.push("}");
  }
  const node = document.createElement("style");
  node.appendChild(document.createTextNode(style.join("\n")));
  document.head.appendChild(node);
})();
