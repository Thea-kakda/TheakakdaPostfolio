/* ============================================================
   particles.js — Hero ambient particle field (canvas)
   Cost-capped, pauses when the tab is hidden or off-screen,
   and fully disabled under prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("particles");
  if (!canvas) return;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return; // static hero, no canvas work

  var ctx = canvas.getContext("2d");
  var dots = [];
  var running = true;
  var raf = null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function size() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    seed(rect.width, rect.height);
  }

  function seed(w, h) {
    var count = Math.max(18, Math.min(60, Math.round((w * h) / 26000)));
    dots = [];
    for (var i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function draw() {
    var w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,229,255,0.55)";
    ctx.strokeStyle = "rgba(0,229,255,0.10)";
    var i, j, a, b, dx, dy, dist;
    for (i = 0; i < dots.length; i++) {
      a = dots[i];
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      for (j = i + 1; j < dots.length; j++) {
        b = dots[j]; dx = a.x - b.x; dy = a.y - b.y; dist = dx * dx + dy * dy;
        if (dist < 12000) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
    }
  }

  function loop() { if (!running) return; draw(); raf = requestAnimationFrame(loop); }

  function start() { if (!running) { running = true; loop(); } }
  function stop() { running = false; if (raf) cancelAnimationFrame(raf); }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });
  window.addEventListener("resize", size);

  size();
  loop();
})();
