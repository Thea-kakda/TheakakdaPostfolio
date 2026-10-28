/* ============================================================
   chatbot.js — KAKDA AI Assistant (Gemini via /api/assistant/chat)
   - Primary: POST user message to the FastAPI backend; key stays server-side.
   - Graceful: offline keyword fallback if the endpoint is unreachable.
   - Localized loading/error states with an inline Retry action (EN/KM).
   - Safe Markdown: input is escaped, then a tiny markup subset is
     re-added (bold / inline code / bullets / line breaks).
   - Session-only analytics. No cookies, no tracking, no storage.
   ============================================================ */
(function () {
  "use strict";

  var CHAT_ENDPOINT = window.CHAT_API_URL || "/api/assistant/chat";

  var toggle = document.getElementById("chat-toggle");
  var win = document.getElementById("chat-window");
  var closeBtn = document.getElementById("chat-close");
  var clearBtn = document.getElementById("chat-clear");
  var body = document.getElementById("chat-body");
  var form = document.getElementById("chat-form");
  var input = document.getElementById("chat-input");
  var icon = document.getElementById("chat-icon");
  var analyticsEl = document.getElementById("chat-analytics");

  if (!toggle || !win || !body) return;

  var analytics = { questions: 0, topics: {} };

  // English defaults, used only if i18n is unavailable. Rendered responses are
  // resolved through window.I18N (chat.fb.*) so they follow the active language.
  // Experience text reflects the verified on-page entries (no unverified claims).
  var FB_DEFAULTS = {
    skills: "Kakda works across **Frontend** (Next.js, Vue, JavaScript, TypeScript), **Backend** (PHP, Laravel, Java, Spring Boot, REST), **Database** (PostgreSQL, MySQL, SQL Server, DBML/ERD), **Networking** (Cisco, MikroTik, Linux, Wireshark, EVE-NG) and **Design** (Figma, Adobe XD, Photoshop).",
    projects: "Featured work includes the **Hanuman** web concept, an **interactive UI/UX design workspace**, and a **portfolio website design**. Details are in the Projects section.",
    certificates: "Certificates cover OOP, Cisco Packet Tracer, Hardware, MikroTik MTCNA, UI/UX, Web Frontend, CCNA and Data Modeling. Open the Certificate Gallery to preview them.",
    experience: "Experience includes the **Smart Coffee & Bakery ERP** (full-stack), a **Java Inventory Management System**, a **RUPP team Mobile Cafe app** (Team Lead / UI-UX), **ETEC** IT training, and **JomNumTech** database, Java and Python training.",
    contact: "Please use the contact form in the Contact section, or the email / Telegram links there.",
    freelance: "Yes — Kakda is open to freelance, junior roles and internships. Use the contact form to reach out.",
    "default": "I don't have verified information about that. You can ask about skills, projects, certificates, experience, or contact."
  };

  function T(key, fb) {
    try { if (window.I18N && window.I18N.t) { var v = window.I18N.t(key); if (v != null) return v; } }
    catch (e) {}
    return fb;
  }

  function classify(t) {
    t = t.toLowerCase();
    if (t.includes("skill") || t.includes("tech") || t.includes("framework") || t.includes("stack")) return "skills";
    if (t.includes("project") || t.includes("portfolio") || t.includes("hanuman") || t.includes("work ")) return "projects";
    if (t.includes("cert") || t.includes("ccna") || t.includes("mikrotik") || t.includes("diploma")) return "certificates";
    if (t.includes("experience") || t.includes("job") || t.includes("internship")) return "experience";
    if (t.includes("contact") || t.includes("email") || t.includes("telegram") || t.includes("reach")) return "contact";
    if (t.includes("freelance") || t.includes("hire") || t.includes("available")) return "freelance";
    return null;
  }

  function nowTime() {
    try { return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }
    catch (e) { return ""; }
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Safe limited Markdown on already-escaped text.
  function renderRich(text) {
    var safe = esc(text);
    safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");
    var lines = safe.split(/\r?\n/);
    var html = "", inList = false;
    lines.forEach(function (ln) {
      var m = ln.match(/^\s*[-*]\s+(.*)$/);
      if (m) { if (!inList) { html += "<ul>"; inList = true; } html += "<li>" + m[1] + "</li>"; }
      else { if (inList) { html += "</ul>"; inList = false; } if (ln.trim()) html += "<div>" + ln + "</div>"; }
    });
    if (inList) html += "</ul>";
    return html;
  }

  function scrollDown() { body.scrollTop = body.scrollHeight; }

  function addUser(text) {
    var row = document.createElement("div");
    row.className = "msg-row user";
    var b = document.createElement("div");
    b.className = "bubble-user";
    b.textContent = text; // safe
    row.appendChild(b);
    body.appendChild(row);
    scrollDown();
  }

  function addBot(text) {
    var wrap = document.createElement("div");
    wrap.className = "msg-row bot";
    var avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = '<i data-lucide="bot" style="width:18px;height:18px"></i>';
    var col = document.createElement("div");
    var b = document.createElement("div");
    b.className = "bubble-bot";
    b.innerHTML = renderRich(text); // escaped + whitelisted
    var meta = document.createElement("div");
    meta.className = "msg-meta";
    var time = document.createElement("span");
    time.className = "msg-time"; time.textContent = nowTime();
    var copy = document.createElement("button");
    copy.type = "button"; copy.className = "msg-copy"; copy.textContent = T("chat.copy", "Copy");
    copy.setAttribute("aria-label", T("chat.copy", "Copy"));
    copy.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copy.textContent = T("chat.copied", "Copied"); setTimeout(function () { copy.textContent = T("chat.copy", "Copy"); }, 1500);
        }).catch(function () {});
      }
    });
    meta.appendChild(time); meta.appendChild(copy);
    col.appendChild(b); col.appendChild(meta);
    wrap.appendChild(avatar); wrap.appendChild(col);
    body.appendChild(wrap);
    if (window.lucide) lucide.createIcons();
    scrollDown();
  }

  var typingEl = null;
  function typing(on) {
    if (on && !typingEl) {
      typingEl = document.createElement("div");
      typingEl.className = "msg-row bot";
      typingEl.setAttribute("role", "status");
      typingEl.setAttribute("aria-live", "polite");
      typingEl.innerHTML = '<div class="avatar"><i data-lucide="bot" style="width:18px;height:18px"></i></div>' +
        '<div class="typing"><span></span><span></span><span></span></div>' +
        '<span class="sr-only">' + esc(T("chat.loading", "Preparing an answer...")) + '</span>';
      body.appendChild(typingEl);
      if (window.lucide) lucide.createIcons();
      scrollDown();
    } else if (!on && typingEl) { typingEl.remove(); typingEl = null; }
  }

  // Error bubble with an inline Retry action (keeps the user's message in place).
  function addError(text, retry) {
    var wrap = document.createElement("div");
    wrap.className = "msg-row bot";
    wrap.setAttribute("role", "alert");
    var avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.innerHTML = '<i data-lucide="bot" style="width:18px;height:18px"></i>';
    var col = document.createElement("div");
    var b = document.createElement("div");
    b.className = "bubble-bot";
    b.textContent = text; // safe: never raw HTML
    var meta = document.createElement("div");
    meta.className = "msg-meta";
    var time = document.createElement("span");
    time.className = "msg-time"; time.textContent = nowTime();
    var rbtn = document.createElement("button");
    rbtn.type = "button"; rbtn.className = "msg-copy";
    var label = T("chat.retry", "Retry");
    rbtn.textContent = label; rbtn.setAttribute("aria-label", label);
    rbtn.addEventListener("click", function () { if (retry) retry(); });
    meta.appendChild(time); meta.appendChild(rbtn);
    col.appendChild(b); col.appendChild(meta);
    wrap.appendChild(avatar); wrap.appendChild(col);
    body.appendChild(wrap);
    if (window.lucide) lucide.createIcons();
    scrollDown();
  }

  // Map a server error status to a localized UI message.
  function errorForStatus(status) {
    if (status === 429) return T("chat.rateLimited", "You're sending too many messages. Please wait a moment.");
    if (status === 503) return T("chat.notConfigured", "The assistant isn't available right now.");
    if (status === 504) return T("chat.timeout", "The assistant took too long to answer. Please try again.");
    return T("chat.error", "Sorry, I couldn't get a response right now. Please try again.");
  }

  function renderAnalytics() {
    if (!analyticsEl) return;
    var q = analyticsEl.querySelector("[data-analytics-questions]");
    var t = analyticsEl.querySelector("[data-analytics-topics]");
    if (q) q.textContent = String(analytics.questions);
    if (t) {
      var sorted = Object.keys(analytics.topics).sort(function (a, b) { return analytics.topics[b] - analytics.topics[a]; });
      t.textContent = sorted.length ? sorted.slice(0, 3).join(", ") : "—";
    }
  }
  function record(text) {
    analytics.questions += 1;
    var topic = classify(text);
    if (topic) analytics.topics[topic] = (analytics.topics[topic] || 0) + 1;
    renderAnalytics();
  }
  function replyLocally(text) {
    var key = classify(text) || "default";
    addBot(T("chat.fb." + key, FB_DEFAULTS[key] || FB_DEFAULTS["default"]));
  }

  function ask(text) {
    text = (text || "").trim();
    if (!text) return;
    addUser(text);
    record(text);
    send(text);
  }

  function send(text) {
    typing(true);

    var controller = ("AbortController" in window) ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, 22000) : null;

    fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, lang: (window.I18N && window.I18N.get()) || "en" }),
      signal: controller ? controller.signal : undefined
    })
      .then(function (r) {
        return r.json().then(
          function (d) { return { httpOk: r.ok, status: r.status, d: d }; },
          function () { return { httpOk: r.ok, status: r.status, d: null }; }
        );
      })
      .then(function (res) {
        typing(false);
        if (res.httpOk && res.d && res.d.ok && res.d.reply) { addBot(res.d.reply); return; }
        // Server returned an error status/payload: localized message + Retry.
        addError(errorForStatus(res.status), function () { send(text); });
      })
      .catch(function () {
        // Network unreachable (offline): fall back to verified on-page facts.
        typing(false);
        replyLocally(text);
      })
      .finally(function () { if (timer) clearTimeout(timer); });
  }

  window.sendQuickMessage = function (text) { ask(text); };

  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    input.value = "";
    ask(text);
  });

  function open() {
    win.classList.add("open");
    win.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    if (icon) icon.setAttribute("data-lucide", "x");
    if (window.lucide) lucide.createIcons();
    if (input) setTimeout(function () { input.focus(); }, 200);
  }
  function close() {
    win.classList.remove("open");
    win.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    if (icon) icon.setAttribute("data-lucide", "message-square");
    if (window.lucide) lucide.createIcons();
    toggle.focus();
  }
  toggle.addEventListener("click", function () {
    if (win.classList.contains("open")) close(); else open();
  });
  if (closeBtn) closeBtn.addEventListener("click", close);

  if (clearBtn) clearBtn.addEventListener("click", function () {
    body.innerHTML = "";
    analytics = { questions: 0, topics: {} };
    renderAnalytics();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && win.classList.contains("open")) close();
  });

  // "Open Assistant" launcher buttons elsewhere on the page.
  document.querySelectorAll("[data-open-chat]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!win.classList.contains("open")) open();
      else win.scrollIntoView({ behavior: reduceScroll(), block: "end" });
    });
  });
  function reduceScroll() { return (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth"; }

  renderAnalytics();
})();
