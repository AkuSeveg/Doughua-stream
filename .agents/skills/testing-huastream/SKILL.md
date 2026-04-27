# Testing HuaStream

HuaStream is an Astro SSR donghua streaming UI. This skill captures the testing path that has worked across multiple PRs.

## Quick start

```bash
npm install
npm run dev   # http://localhost:4321
```

Then exercise the app in Chrome at `http://localhost:4321/`.

## Known blockers (don't waste time retrying)

- **Vercel preview deployments are auth-gated** — `https://doughua-stream-…vercel.app` consistently returns **HTTP 401** (Vercel deployment protection). Test against the local dev server unless the user disables protection or shares auth.
- **Upstream API IP ban** — `https://www.sankavollerei.com/anime/donghua/...` returns **HTTP 403 "IP permanently banned"** from Devin VMs. As a result `/`, `/ongoing`, `/completed`, `/genres`, `/recent`, `/batch` all render the `Error` component during local testing. This is **not a regression** — verify branding/theme assertions through the chrome (navbar, footer, watermarks, error page itself).
- **API-independent pages for theme/widget verification**: `/history` is the simplest data-independent page that still uses `WidgetTitle`, `Sesepuh`, `Content`, `Sidebar`, `Breadcrumb`. Use it to verify chrome changes that should apply on data-bound pages.

## Verification commands

### Shell — proves rebrand/typography tokens are present in rendered HTML

```bash
curl -s -o /tmp/home.html -w "HTTP %{http_code} bytes=%{size_download}\n" http://localhost:4321/

grep -c "<expected-string>" /tmp/home.html             # exact string count
grep -o "<pattern>" /tmp/home.html | wc -l             # total occurrences (use this, not `grep -oc`)
grep -ciE "<old|brand|names>" /tmp/home.html           # case-insensitive count for cleanup checks
```

Note: `grep -c` counts matching **lines**, not matches. For total counts, pipe through `grep -o ... | wc -l`.

### Browser console — proves CSS actually applied (not just declared)

The difference between "the class is in the HTML" and "the font/color actually rendered" is the difference between a passing visual test and one that silently falls back. Always check `getComputedStyle` for theme/font changes:

```js
console.log(JSON.stringify({
  navbarH1Font: getComputedStyle(document.querySelector('#navbar h1')).fontFamily,
  bodyFont: getComputedStyle(document.body).fontFamily,
  theme: document.documentElement.dataset.theme,
  storedTheme: localStorage.theme,
  bodyBg: getComputedStyle(document.body).backgroundColor,
}, null, 2));
```

IMPORTANT: when running JS in the computer-use browser console, use `console.log(JSON.stringify(...))` and then read it back. Returning the value as the last expression often shows `undefined`. The console tool's docs explicitly note: "the result does not contain the browser's console log output".

### Theme toggle

- Default theme is forced to dark on first load (see `Layout.astro` `getTheme()`).
- Toggle button id is `#button-theme` (top-right of navbar).
- After click: check `document.documentElement.dataset.theme`, `localStorage.theme`, and `getComputedStyle(document.body).backgroundColor`.
- Click via native computer use (`left_click` on the button), not via devtools — the user is watching a recording.

## Useful files

- `src/configs/animeConfig.ts` — branding (siteName, logo, favicon) under the `huastream` key, plus API URL under `huastreamApi`.
- `src/layouts/Layout.astro` — Google Fonts links, theme bootstrap script, navbar/footer mounting, body background tokens, faded `华`/`流` watermarks.
- `src/styles/global.css` — Tailwind component layer for `.navbar-link-item`, `.widget-title`, `.carousel-item-*`, `.anime[0-3]-item-*`.
- `tailwind.config.mjs` — custom font families (`font-hanzi`, `font-display`), colors (`ink-*`, `vermilion-*`), `bg-lantern-red`, `bg-ink-wash`.
- `src/components/Error.astro` — what renders when the API 403s.

## CI

- 3 Vercel checks (`Vercel Preview Comments`, `Vercel – doughua-stream`, `Vercel – doughua-stream-1tu1`).
- Local pre-PR verification: `npx astro check` (must be 0 errors / 0 warnings) and `npm run build` (must succeed).
- No GitHub Actions workflow as of 2026-04 — Vercel is the only CI.

## Recording etiquette

- Maximize the browser window before starting (`xdotool getactivewindow windowsize 100% 100%` if `wmctrl` isn't installed).
- Use `annotate_recording` setup → test_start → assertion patterns. Group related checks into one consolidated assertion ("Navbar uses ZCOOL XiaoWei + 华流 hanzi accent" — not three tiny ones).
- Avoid devtools for native interactions (clicks, navigation). Use devtools only for runtime computed-style verification.

## Devin Secrets Needed

None for branding/theme verification. If you're asked to test the data feeds end-to-end, you'd need either:
- Access to a non-banned IP/proxy for `sankavollerei.com`, OR
- A self-hosted backend URL to set as `huastreamApi.apiUrl` in `src/configs/animeConfig.ts`.
