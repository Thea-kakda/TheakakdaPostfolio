# Contact Form → Telegram Setup

The portfolio "Get in Touch" form delivers visitor messages to your Telegram chat.
The browser only ever calls your own server (`POST /api/contact`); **only the
server calls Telegram**, so the bot token never reaches the browser.

```
Visitor form (js/contact.js)  ──POST {name,email,message}──▶  /api/contact  ──sendMessage──▶  Your Telegram chat
                                                             (token + chat id live only here, in .env)
```

---

## 1. Create / rotate the bot token (private!)

1. Open Telegram and message **@BotFather**.
2. New bot: `/newbot` → follow prompts → copy the HTTP API token.
   Existing/compromised bot: `/revoke` (or "Rotate token") to invalidate the old one.
3. Treat the token like a password. **Anyone with it can control your bot.**
   - If a token is ever pasted into a chat, screenshot, commit, or log — rotate it immediately.
4. You will place it only in `backend/.env` (gitignored) or your host's secret store.

## 2. Find your destination chat id (`TELEGRAM_CHAT_ID`)

Do **not** ask site visitors for this — it is where *you* receive messages.

1. Make sure `TELEGRAM_BOT_TOKEN` is set in `backend/.env`.
2. In Telegram, press **Start** on your bot and send it any message. This opens a
   chat and registers an update the bot can read.
3. Run the helper (from `backend/`):
   ```powershell
   .\.venv\Scripts\python.exe scripts\telegram_chat_id.py
   ```
4. It prints the numeric chat id(s). Copy yours into `TELEGRAM_CHAT_ID`.

> For a group/channel: add the bot to it and send a message there, then read the
> id the same way. Channel ids are negative and may start with `-100`.

## 3. Set the environment variables

Locally — `backend/.env` (copy from `backend/.env.example` if needed):

```dotenv
TELEGRAM_BOT_TOKEN=123456:your_new_token_here
TELEGRAM_CHAT_ID=your_numeric_chat_id
```

Production — set both in your host's environment / secret manager
(Railway, Render, Fly, Railway, a `.env` on a VPS, etc.). Never commit real values.

`.env.example` contains **placeholders only** and is a template; it must never
hold a real token or chat id.

## 4. Install & run locally

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Open **http://localhost:8000/** (the API also serves the portfolio), submit the
form, and confirm the message arrives in your Telegram chat.

Run the automated tests at any time (Telegram is always mocked — no real messages
are sent, no token needed):

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

## 5. Static hosting note (important)

A client-only static site (GitHub Pages, Netlify *static*, plain hosting) **cannot
keep the token private** — anything shipped to the browser is public. You must
deploy the `backend/` FastAPI app somewhere that runs server code (or port
`POST /api/contact` to a serverless function on your host). Point the front-end at
it by setting `window.CONTACT_API_URL` before `js/contact.js` loads, e.g.:

```html
<script>window.CONTACT_API_URL = "https://your-api.example.com/api/contact";</script>
<script src="js/contact.js"></script>
```

If the API is on a different origin, add that origin to `ALLOWED_ORIGINS` in the
backend environment (CORS is narrow on purpose — no wildcard).

## Response contract

| Status | `code` | Meaning (browser shows) |
|-------:|------------------|--------------------------|
| 200 | — | Delivered → `contact.success` |
| 400 | `invalid_input` | Bad/empty/unexpected fields → `contact.error` |
| 405 | — | Wrong HTTP method (only POST allowed) |
| 413 | `too_long` | Field/body exceeds limits → `contact.error` |
| 429 | `rate_limited` | Too many attempts → `contact.rateLimit` |
| 502 | `delivery_failed` | Telegram error / `ok:false` → `contact.error` |
| 503 | `not_configured` | Missing token or chat id → `contact.error` |
| 504 | `delivery_timeout` | Telegram timed out → `contact.error` |

Limits (client and server identical): name 1–100, email 3–254, message 1–3000.

## Security guarantees

- Bot token and chat id are read only in `app/notify/telegram.py` from the
  environment; they are never sent to the browser, logged, or returned in any
  response or error.
- The client cannot supply `chat_id`, a token, or a Telegram URL — the server uses
  its own configuration and rejects unexpected request fields.
- Messages are sent as plain text (no HTML/Markdown parse mode), so untrusted form
  content cannot inject Telegram formatting.
- Per-IP rate limiting (proxy-aware via `X-Forwarded-For`) deters form spam.
