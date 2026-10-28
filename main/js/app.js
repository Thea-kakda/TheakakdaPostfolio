/* ============================================================
   app.js — Core orchestration
   - Lucide icon init
   - Scroll reveal (IntersectionObserver)
   - Active nav link highlighting
   - Animated stats count-up
   - Certificate gallery: filter tabs + accessible modal
   No libraries required. Safe to run after DOMContentLoaded.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initIcons() {
    if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Active navigation link ---------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-desktop a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var sections = links.map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute("aria-current"); });
          var active = map[e.target.id];
          if (active) active.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ---------- Animated stats ---------- */
  function initCountUp() {
    var nums = document.querySelectorAll(".stat-num[data-count]");
    if (!nums.length) return;
    function run(el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      if (reduceMotion || isNaN(target)) { el.textContent = el.getAttribute("data-suffix") ? target + el.getAttribute("data-suffix") : String(target); return; }
      var start = null, dur = 1200;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = Math.floor(p * target);
        el.textContent = val + (p === 1 && el.getAttribute("data-suffix") ? el.getAttribute("data-suffix") : "");
        if (p < 1) requestAnimationFrame(step); else el.textContent = target + (el.getAttribute("data-suffix") || "");
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Certificate gallery: filter + modal ---------- */
  function initGallery() {
    var grid = document.getElementById("cert-grid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".cert-card"));
    var tabs = Array.prototype.slice.call(document.querySelectorAll(".filter-tab"));

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var f = tab.getAttribute("data-filter");
        tabs.forEach(function (t) { t.setAttribute("aria-pressed", String(t === tab)); });
        cards.forEach(function (c) {
          var show = f === "all" || c.getAttribute("data-domain") === f;
          c.classList.toggle("is-hidden", !show);
        });
      });
    });

    var modal = document.getElementById("cert-modal");
    if (!modal) return;
    var mImg = modal.querySelector("[data-modal-img]");
    var mTitle = modal.querySelector("[data-modal-title]");
    var mIssuer = modal.querySelector("[data-modal-issuer]");
    var mDate = modal.querySelector("[data-modal-date]");
    var mDesc = modal.querySelector("[data-modal-desc]");
    var mVerify = modal.querySelector("[data-modal-verify]");
    var closeBtn = modal.querySelector("[data-modal-close]");
    var lastFocused = null;

    function T(key, fb) {
      try { if (window.I18N && window.I18N.t) { var v = window.I18N.t(key); if (v != null) return v; } }
      catch (e) {}
      return fb;
    }

    // Populate modal fields from a card, preferring translated text via keys.
    function fill(card) {
      var tKey = card.getAttribute("data-title-key");
      var dKey = card.getAttribute("data-desc-key");
      mImg.src = card.getAttribute("data-full");
      mImg.alt = card.getAttribute("data-alt") || "Certificate preview";
      mTitle.textContent = tKey ? T(tKey, card.getAttribute("data-title") || "") : (card.getAttribute("data-title") || "");
      mIssuer.textContent = card.getAttribute("data-issuer") || "";
      mDate.textContent = card.getAttribute("data-date") || "";
      mDesc.textContent = dKey ? T(dKey, card.getAttribute("data-desc") || "") : (card.getAttribute("data-desc") || "");
      var v = card.getAttribute("data-verify");
      if (v && v !== "NEEDS USER INPUT") { mVerify.href = v; mVerify.textContent = T("certs.verify", "Verify certificate"); }
      else { mVerify.removeAttribute("href"); mVerify.textContent = T("certs.verifyMissing", "Verification link: NEEDS USER INPUT"); }
    }

    function open(card) {
      lastFocused = card;
      fill(card);
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-locked");
      closeBtn.focus();
      document.addEventListener("keydown", onKey);
    }
    function close() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-locked");
      document.removeEventListener("keydown", onKey);
      if (lastFocused) lastFocused.focus();
    }
    function onKey(e) {
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") { // simple focus trap inside dialog
        var focusables = modal.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])");
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }

    cards.forEach(function (card) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.addEventListener("click", function () { open(card); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(card); }
      });
    });
    closeBtn.addEventListener("click", close);
    modal.querySelector(".modal-backdrop").addEventListener("click", close);

    // Keep an open preview in sync with the selected language.
    window.addEventListener("langchange", function () {
      if (lastFocused && modal.classList.contains("open")) fill(lastFocused);
    });
  }

  function onReady() {
    initIcons();
    initReveal();
    initActiveNav();
    initCountUp();
    initGallery();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", onReady);
  else onReady();

  window.PORTFOLIO_APP = { refreshIcons: initIcons };
})();
