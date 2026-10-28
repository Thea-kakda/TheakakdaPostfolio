/* ============================================================
   dashboard.js — Developer Dashboard (Chart.js, lazy-loaded)
   Performance: Chart.js is injected only when #dashboard first
   enters the viewport. Charts are built once.

   i18n: chart labels / dataset labels are resolved through
   window.I18N and refreshed on the "langchange" event via
   chart.update() — charts are never rebuilt or duplicated.

   Data integrity:
    - Certificate doughnut counts are DERIVED from the gallery
      cards' data-domain attributes (actual repository data).
    - Technology bars count page mentions, NOT proficiency.
    - Skill radar values are ILLUSTRATIVE (labelled in the UI).
    - Timeline uses only years already present in the source.
   ============================================================ */
(function () {
  "use strict";

  var CHART_CDN = "https://cdn.jsdelivr.net/npm/chart.js";
  var section = document.getElementById("dashboard");
  if (!section) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var built = false;
  var charts = {};

  // Illustrative values — labelled "not measured" in the UI.
  var RADAR = [
    ["skills.frontend", "Frontend"], ["skills.backend", "Backend"],
    ["skills.database", "Database"], ["skills.networking", "Networking"],
    ["gallery.uiux", "UI/UX"], ["chart.radar.ai", "AI"]
  ];
  var RADAR_VALUES = [80, 74, 78, 76, 70, 58];
  // Internal gallery key -> i18n key (order matches certDomainCounts).
  var DOUGH = [
    ["Programming", "gallery.programming"], ["Networking", "gallery.networking"],
    ["Database", "gallery.database"], ["UI/UX", "gallery.uiux"], ["Other", "chart.certs.other"]
  ];
  // Only technologies confirmed present in the repository skills.
  var TECH = ["Laravel", "Next.js", "PHP", "PostgreSQL", "Java", "Cisco", "MikroTik"];
  var TIMELINE_OTHER = ["RUPP (BSc)", "ETEC", "JomNum Tech"]; // institution names, untranslated

  function T(key, fb) {
    try { if (window.I18N && window.I18N.t) { var v = window.I18N.t(key); if (v != null) return v; } }
    catch (e) {}
    return fb;
  }
  function radarLabels() { return RADAR.map(function (r) { return T(r[0], r[1]); }); }
  function doughLabels() { return DOUGH.map(function (d) { return T(d[1], d[0]); }); }
  function timelineLabels() { return [T("chart.timeline.hs", "High School")].concat(TIMELINE_OTHER); }

  function pageText() { return (document.body && document.body.innerText) || ""; }
  function countMentions(term) {
    var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    return (pageText().match(re) || []).length;
  }

  function certDomainCounts() {
    var counts = { Programming: 0, Networking: 0, Database: 0, "UI/UX": 0, Other: 0 };
    var cards = document.querySelectorAll("#cert-grid .cert-card");
    cards.forEach(function (c) {
      var d = (c.getAttribute("data-domain") || "other").toLowerCase();
      if (d === "programming") counts.Programming++;
      else if (d === "networking") counts.Networking++;
      else if (d === "database") counts.Database++;
      else if (d === "uiux") counts["UI/UX"]++;
      else counts.Other++;
    });
    return counts;
  }

  function injectChartJs(cb) {
    var s = document.createElement("script");
    s.src = CHART_CDN; s.async = true;
    s.onload = cb;
    s.onerror = function () { /* canvases stay empty; page still works */ };
    document.head.appendChild(s);
  }

  function opts(extra) {
    var o = {
      responsive: true, maintainAspectRatio: false,
      animation: reduceMotion ? false : undefined,
      plugins: { legend: { labels: { color: "#94A3B8", font: { family: "Plus Jakarta Sans" } } } }
    };
    for (var k in (extra || {})) o[k] = extra[k];
    return o;
  }

  function build() {
    if (built || !window.Chart) return;
    built = true;
    Chart.defaults.color = "#94A3B8";
    Chart.defaults.borderColor = "rgba(148,163,184,0.15)";

    var cc = certDomainCounts();

    var radar = document.getElementById("chart-skills");
    if (radar) charts.radar = new Chart(radar, {
      type: "radar",
      data: { labels: radarLabels(), datasets: [{
        label: T("chart.radar.dataset", "Illustrative"), data: RADAR_VALUES,
        backgroundColor: "rgba(0,229,255,0.15)", borderColor: "#00E5FF", pointBackgroundColor: "#00E5FF"
      }] },
      options: opts({ scales: { r: { min: 0, max: 100,
        ticks: { display: false }, grid: { color: "rgba(148,163,184,0.2)" },
        angleLines: { color: "rgba(148,163,184,0.2)" }, pointLabels: { color: "#cbd5e1" } } } })
    });

    var dough = document.getElementById("chart-certs");
    if (dough) charts.dough = new Chart(dough, {
      type: "doughnut",
      data: { labels: doughLabels(), datasets: [{
        data: DOUGH.map(function (d) { return cc[d[0]] || 0; }),
        backgroundColor: ["#00E5FF", "#f97316", "#a855f7", "#ec4899", "#64748b"],
        borderColor: "#0b0f19", borderWidth: 2
      }] }
    });

    var bar = document.getElementById("chart-tech");
    if (bar) charts.bar = new Chart(bar, {
      type: "bar",
      data: { labels: TECH, datasets: [{
        label: T("chart.tech.dataset", "Portfolio mentions (not proficiency)"), data: TECH.map(countMentions),
        backgroundColor: "rgba(0,229,255,0.5)", borderColor: "#00E5FF", borderWidth: 1
      }] },
      options: opts({ indexAxis: "y", scales: { x: { beginAtZero: true, ticks: { precision: 0 } } } })
    });

    // Verified-only timeline (floating [start, end] bars).
    var tl = document.getElementById("chart-timeline");
    if (tl) charts.tl = new Chart(tl, {
      type: "bar",
      data: {
        labels: timelineLabels(),
        datasets: [{ data: [[2015, 2022], [2022, 2026], [2023, 2025], [2025, 2026]],
          backgroundColor: ["#ffffffff", "#ff4800ff", "#0800ffff", "#22c55e"], borderRadius: 4 }]
      },
      options: opts({ indexAxis: "y",
        scales: { x: { min: 2015, max: 2026, ticks: { stepSize: 1 } } },
        plugins: { legend: { display: false } } })
    });
  }

  // Re-label existing charts on language change (no rebuild, no duplicates).
  function refresh() {
    if (!built || !window.Chart) return;
    if (charts.radar) {
      charts.radar.data.labels = radarLabels();
      charts.radar.data.datasets[0].label = T("chart.radar.dataset", "Illustrative");
      charts.radar.update();
    }
    if (charts.dough) { charts.dough.data.labels = doughLabels(); charts.dough.update(); }
    if (charts.bar) {
      charts.bar.data.datasets[0].label = T("chart.tech.dataset", "Portfolio mentions (not proficiency)");
      charts.bar.data.datasets[0].data = TECH.map(countMentions);
      charts.bar.update();
    }
    if (charts.tl) { charts.tl.data.labels = timelineLabels(); charts.tl.update(); }
  }

  window.addEventListener("langchange", refresh);

  function whenVisible() {
    if (!("IntersectionObserver" in window)) { injectChartJs(build); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); injectChartJs(build); } });
    }, { rootMargin: "200px" });
    io.observe(section);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", whenVisible);
  else whenVisible();
})();
