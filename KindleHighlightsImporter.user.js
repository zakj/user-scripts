const el = document.createElement("button");
el.id = "import-highlights";
el.onclick = () => {
  navigator.clipboard.writeText(
    [...document.querySelectorAll("#highlight")]
      .map((x) => `> ${x.textContent}`)
      .join("\n\n"),
  );
};

el.appendChild(document.createTextNode("Import"));

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(el);
});
