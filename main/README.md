# THEA KAKDA — Portfolio V3

A merged, modular developer portfolio combining the verified content of two source
projects (`E:\zip\Posfolio` CV site + `E:\zip\postfolio` Tailwind single-page site)
into one professional, SaaS-grade architecture — **without** the Tailwind CDN.

> Modern static front-end + a modular Python **FastAPI** **Gemini** assistant (Khmer/English).
> Visual identity: dark navy + cyan accent, Orbitron headings, Plus Jakarta Sans body,
> Noto Sans Khmer for Khmer.

---

## ✨ Features

| # | Feature | Where |
|---|---------|-------|
| 1 | Developer Dashboard (4 charts) | `#dashboard` · `js/dashboard.js` |
| 2 | Gemini AI Assistant (EN/KM) | `#ai`, chat widget · `js/chatbot.js` + `backend/app` |
| 3 | Khmer / English i18n | `js/i18n.js` (auto-detect + `localStorage`) |
| 4 | Accessible mobile navigation | `#menu-toggle` · `js/navigation.js` |
| 5 | Certificate modal gallery + filters | `#certificates` · `js/app.js` |
| 6 | Technology showcase | `#tech` |
| 7 | Project case-study cards | `#projects` |
| 8 | SEO layer (meta, OG, Twitter, JSON-LD, sitemap) | `<head>`, `sitemap.xml`, `robots.txt` |
| 9 | Accessibility layer (WCAG 2.2 AA) | `css/base.css`, `css/animations.css` |
| 10 | Performance (lazy Chart.js, WebP-ready images) | `js/dashboard.js`, image attrs |

## 📄 Page flow
Hero → About → Stats → Skills → **Developer Dashboard** → Experience → Education →
Certificate Gallery → Projects → Tech Stack → AI Assistant → Contact → Footer.

---

## 🗂 Structure
```
New-Portfolio/
├── index.html
├── css/        tokens · base · components · animations · responsive
├── js/         app · navigation · chatbot · dashboard · i18n · particles · contact
├── assets/     profile · projects · certificates · icons · logos
├── backend/    FastAPI + Gemini (key server-side only) — see backend/README.md
└── robots.txt · sitemap.xml · README.md
```

## 🧱 Design tokens
All colors, type scale, spacing, radius, elevation and motion live in
`css/tokens.css` as CSS custom properties. No stylesheet hard-codes brand values.

---

## 🤖 Gemini assistant
- FastAPI backend under `backend/app/llm/` (Gemini client, scoped prompt, trusted
  portfolio context, service). API key is read **only** from the environment
  (`GEMINI_API_KEY`) server-side; it is never shipped to the browser.
- Enforces input validation, per-client rate limiting, outbound timeout, CORS
  allow-list, and a system prompt restricted to portfolio facts (skills / projects /
  experience / education / certificates / contact). Unknown → "I don't have verified
  information about that." Responses are grounded and language-matched (Khmer/English).
- Frontend falls back to on-page facts if the endpoint is unreachable, and shows a
  localized error + Retry if the server returns an error status.

```bash
cd New-Portfolio/backend
python -m venv .venv && .venv\Scripts\activate      # Windows
pip install -r requirements.txt
copy .env.example .env                               # then edit GEMINI_API_KEY + GEMINI_MODEL
uvicorn app.main:app --reload --port 8000            # API + Swagger at :8000/docs
```

See **`backend/README.md`** for the full architecture, tests, and deployment notes.

## 🔎 Data integrity
Nothing was invented. Certificates, projects, education, dates and contact values come
only from the source repositories. Anything unverifiable is explicitly marked
**`NEEDS USER INPUT`** in the markup (see below).

## ⚠️ Remaining user inputs (search the repo for `NEEDS USER INPUT`)
- **Canonical domain** — currently the real repo value `https://thea-kakda.github.io/`;
  update `<head>` OG/canonical, `sitemap.xml` and `robots.txt` if it changes.
- **CV file URL** — installed at `assets/CV/TheaKakda_CV.pdf.pdf`; hero and contact
  "Download CV" links point to it. Replace the file to update the CV.
- **Telegram / GitHub / LinkedIn** URLs — personal profile links are still placeholders
  in Contact/Footer. The **contact form** now delivers messages to you via a Telegram
  bot (server-side; see `backend/README.md` → *Contact endpoint*). Set `TELEGRAM_CHAT_ID`
  in `backend/.env` to activate delivery.
- **Certificate verification links** — all `NEEDS USER INPUT` (source used `#`).
- **Project links** — Hanuman uses the GitHub URL; the `laravel-10-dashboard` /
  `v0-e-commerce` Vercel links from the source looked mismatched and were not used.
- **WebP images** — no encoder was available here, so originals were copied with their
  true `.jpg/.png` extensions. Convert `assets/` to WebP for delivery.
- **Skill radar values** are illustrative (labelled "not measured" in the UI).
- Source `ai.png`, `me.jpg`, `hunuman.png` were unused / duplicated and not copied.

## ♿ Accessibility
Single `<h1>`, `<main id="main">`, skip link, visible `:focus-visible`, ARIA labels +
`aria-expanded`/`aria-controls`, `role="dialog"`+`role="log"`, focus return/trap in modal,
44px touch targets, Escape/backdrop close, and full `prefers-reduced-motion` support.
