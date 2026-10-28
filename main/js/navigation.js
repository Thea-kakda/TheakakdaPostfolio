/* ============================================================
   navigation.js — Mobile menu behaviour
   - Hamburger toggle (aria-expanded / aria-controls)
   - Body scroll lock while open
   - Escape + click-outside close
   - Close after choosing a link
   ============================================================ */
(function () {
  "use strict";

  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function label(open) {
    var key = open ? "menu.close" : "menu.open";
    var fb = open ? "Close navigation menu" : "Open navigation menu";
    try { if (window.I18N && window.I18N.t) { var v = window.I18N.t(key); if (v) return v; } } catch (e) {}
    return fb;
  }

  function setOpen(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", label(open));
    document.body.classList.toggle("nav-locked", open);
  }
  function isOpen() { return menu.classList.contains("open"); }

  // Keep the toggle's accessible label in the current language.
  window.addEventListener("langchange", function () { toggle.setAttribute("aria-label", label(isOpen())); });

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Click outside closes the panel.
  document.addEventListener("click", function (e) {
    if (!isOpen()) return;
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });

  // Escape closes and returns focus to the toggle.
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
  });

  // Close after navigating on mobile.
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setOpen(false); });
  });

  // Reset state when going back to desktop width.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && isOpen()) setOpen(false);
  });
})();
