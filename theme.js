// Scheme switcher. No choice stored means the page follows the system (Paper by day, Midnight by night).
(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll("[data-pick]");

  function apply(name) {
    if (name) root.setAttribute("data-scheme", name);
    else root.removeAttribute("data-scheme");
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-pick") === (name || "auto")));
    });
  }

  var saved = null;
  try { saved = localStorage.getItem("kipple-scheme"); } catch (e) {}
  apply(saved);

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("data-pick");
      var pick = name === "auto" ? null : name;
      apply(pick);
      try {
        if (pick) localStorage.setItem("kipple-scheme", pick);
        else localStorage.removeItem("kipple-scheme");
      } catch (e) {}
    });
  });
})();
