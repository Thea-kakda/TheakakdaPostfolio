/* ============================================================
   contact.js — Accessible client-side contact form
   - Inline validation with aria-invalid + described error text
   - Live status region (role=status, aria-live=polite)
   - On a valid submit it POSTs {name,email,message} to the backend
     (/api/contact), which delivers to Telegram server-side. The bot
     token NEVER appears here and is never sent from the browser.
   - Submit button is disabled while pending and restored on completion.
   - Inputs are preserved on failure; success resets the form.
   All user/translated text is set via textContent (never innerHTML).
   ============================================================ */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var CONTACT_ENDPOINT = window.CONTACT_API_URL || "/api/contact";

  // Client limits mirror the server contract (routes/contact.py).
  var LIMITS = { name: 100, email: 254, message: 3000 };

  var fields = {
    name:    { el: form.querySelector("#contact-name"),    err: form.querySelector("[data-error-for='name']") },
    email:   { el: form.querySelector("#contact-email"),   err: form.querySelector("[data-error-for='email']") },
    message: { el: form.querySelector("#contact-message"), err: form.querySelector("[data-error-for='message']") }
  };
  var status = document.getElementById("form-status");
  var submitBtn = form.querySelector('button[type="submit"]');

  function ui(key, fb) {
    if (window.I18N && window.I18N.t) { var m = window.I18N.t(key); if (m) return m; }
    return fb;
  }

  // Field-specific validation message (translated, with English fallback).
  var VALIDATION_KEYS = {
    name:    { key: "contact.validation.name",    fb: "Please enter your name." },
    email:   { key: "contact.validation.email",   fb: "Please enter a valid email address." },
    message: { key: "contact.validation.message", fb: "Please enter a message." }
  };

  // Remember the last live status so it can be re-rendered on language change.
  var lastStatus = null;

  function setStatus(cls, key, fb) {
    lastStatus = { cls: cls, key: key, fb: fb };
    if (status) { status.className = cls; status.textContent = ui(key, fb); }
  }

  function setError(f, bad) {
    if (!f.el || !f.err) return;
    var v = VALIDATION_KEYS[f.el.name];
    f.el.setAttribute("aria-invalid", bad ? "true" : "false");
    f.err.textContent = bad ? ui(v.key, v.fb) : "";
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function validate() {
    var n = fields.name.el.value.trim();
    var e = fields.email.el.value.trim();
    var m = fields.message.el.value.trim();
    var okName = n.length >= 1 && n.length <= LIMITS.name;
    var okEmail = validEmail(e) && e.length <= LIMITS.email;
    var okMsg = m.length >= 1 && m.length <= LIMITS.message;
    setError(fields.name, !okName);
    setError(fields.email, !okEmail);
    setError(fields.message, !okMsg);
    return okName && okEmail && okMsg;
  }

  function setPending(pending) {
    if (!submitBtn) return;
    submitBtn.disabled = pending;
    submitBtn.setAttribute("aria-busy", pending ? "true" : "false");
  }

  Object.keys(fields).forEach(function (k) {
    var f = fields[k];
    if (!f.el) return;
    f.el.setAttribute("aria-describedby", "err-" + k);
    f.el.addEventListener("input", function () { if (f.el.getAttribute("aria-invalid") === "true") validate(); });
  });

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (status) { status.className = "form-status"; status.textContent = ""; }
    if (!validate()) {
      setStatus("form-status err", "contact.error", "Please fix the highlighted fields and try again.");
      var firstBad = form.querySelector('[aria-invalid="true"]');
      if (firstBad) firstBad.focus();
      return;
    }

    var payload = {
      name: fields.name.el.value.trim(),
      email: fields.email.el.value.trim(),
      message: fields.message.el.value.trim()
    };

    setPending(true);
    setStatus("form-status", "contact.sending", "Sending…");

    fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return { ok: res.ok, status: res.status, data: data || {} };
        });
      })
      .then(function (r) {
        setPending(false);
        if (r.ok && r.data.ok !== false) {
          setStatus("form-status ok", "contact.success", "Thanks! Your message has been sent.");
          form.reset();
          Object.keys(fields).forEach(function (k) { setError(fields[k], false); });
          return;
        }
        // Failure: keep the visitor's text so they can correct and retry.
        var code = r.data && r.data.code;
        if (code === "rate_limited") {
          setStatus("form-status err", "contact.rateLimit", "Too many messages. Please wait a moment and try again.");
        } else {
          setStatus("form-status err", "contact.error", "Sorry, your message couldn't be sent. Please try again.");
        }
      })
      .catch(function () {
        // Network error / endpoint unreachable: preserve inputs, show error.
        setPending(false);
        setStatus("form-status err", "contact.error", "Sorry, your message couldn't be sent. Please try again.");
      });
  });

  // Re-render live status and any visible field errors in the new language.
  window.addEventListener("langchange", function () {
    if (status && lastStatus) { status.className = lastStatus.cls; status.textContent = ui(lastStatus.key, lastStatus.fb); }
    Object.keys(fields).forEach(function (k) {
      var f = fields[k];
      if (f.el && f.el.getAttribute("aria-invalid") === "true") setError(f, true);
    });
  });
})();
