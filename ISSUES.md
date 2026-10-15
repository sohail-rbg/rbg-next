# ReBrand Gurus — Complete Issue List

> **Addendum:** see `PAGE-AUDIT.md` for the live page/link crawl — it confirms and sharpens #3, #14, #18, #20 and adds 8 new broken-link findings (4 dead service cards, unknown slugs rendering Web Design, `href="#"` portfolio titles, LinkedIn admin URL, inconsistent social handles).

**Audited:** 2026-10-15 · **Commit:** `fe34a22` (+ `d70a6b1` dev-origin fix) · **Stack:** Next.js 15.5.20 (App Router), React 18, MUI 5

**Method:** static inspection of every file in `app/` and `src/`, `next build` (passes, 17 routes), `next lint`, `npm audit`, `npm outdated`, plus live route probing against a running dev server (status codes, SSR HTML inspection, header inspection, internal-link crawl).

**Legend:** ✅ = reproduced with a command · 🔍 = found by code inspection · P0/P1/P2/P3 = priority

**Totals:** 46 issues — 5 × P0, 11 × P1, 18 × P2, 12 × P3

---

## P0 — Critical (fix before launch)

### 1. `/api/hygraph` is an open, unauthenticated proxy to your privileged CMS token 🔍
`app/api/hygraph/route.js:1` accepts any `POST` body and forwards it to Hygraph with `Authorization: Bearer $HYGRAPH_TOKEN`. There is no auth, no origin check, no query allowlist, no rate limit.
**Impact:** anyone can run arbitrary GraphQL with your token — read unpublished content and any model the token can see, exhaust your Hygraph quota/billing, and if the token carries write scope, mutate or delete CMS content.
**Fix:** delete the route and fetch in Server Components with `next: { revalidate }`; if a browser-side proxy is unavoidable, allowlist operation names and add IP rate limiting + short server-side caching.

### 2. Next.js version carries critical advisories ✅
`npm audit` → `next 9.3.4-canary.0 – 16.3.0-preview.10` flagged **critical**, including DoS in App Router Server Actions (`GHSA-m99w-x7hq-7vfj`), SSRF in Server Actions on custom servers (`GHSA-89xv-2m56-2m9x`), and response-cache confusion (`GHSA-68g3-v927-f742`). Installed: `next@15.5.20`; patched lines are `15.5.28` / `16.4.1`.
**Fix:** upgrade Next (and `eslint-config-next`) to a patched release, then re-run the build.

### 3. Every unknown URL returns HTTP 200 — soft 404s ✅
`app/[slug]/page.jsx` fetches SEO data but never calls `notFound()`; `app/blog/[postId]/page.jsx` behaves the same.
Reproduced:
```
$ curl -o /dev/null -w "%{http_code}" localhost:3000/some-totally-bogus-page   → 200   body: "Loading..."
$ curl -o /dev/null -w "%{http_code}" localhost:3000/blog/bogus-post            → 200
```
The 404 only happens *client-side*, after hydration, via `navigate("*")` → `/404` (`src/next-shims/react-router-dom.js:52`).
**Impact:** unlimited crawlable 200-status junk URLs, each self-canonicalising; dilutes crawl budget and rankings.
**Fix:** call `notFound()` when the CMS returns nothing, set `export const dynamicParams = false` (plus `generateStaticParams`), and return real 404s.

### 4. Contact endpoint: unbounded attachment, no abuse controls 🔍
`app/api/contact-email/route.js:70` accepts `payload.attachment` (base64) with **no size limit and no content sniffing**, attaching it as `contact-sketch.png`.
**Impact:** a few MB of base64 per request balloons memory and mailbox size; the "image/png" label is unverified so arbitrary content can be relayed; no rate limit, no honeypot/Turnstile, no length caps on name/message.
**Fix:** cap decoded size (~2 MB) and request body size, verify the PNG magic bytes, set field max lengths, and add rate limiting + a bot challenge.

### 5. 19 known dependency vulnerabilities (3 critical, 13 high, 3 moderate) ✅
`npm audit` highlights: `swiper` **critical** prototype pollution (`GHSA-hmx5-qpq5-p643` — and swiper is unused, see #24), `form-data` **critical** unsafe boundary + CRLF injection, `lodash`, `minimatch`, `braces`, `micromatch`, `postcss`, `sharp`, `js-yaml`, `yaml`, `nanoid`, `picomatch`, `source-map-js`, `follow-redirects`, plus `axios@1.7.7` (SSRF via absolute URL, DoS) and `nodemailer@9.0.3` (auth-header leak on redirects, unsafe boundary).
**Fix:** `npm audit fix` for the safe subset, remove unused packages, force-upgrade swiper/axios/nodemailer, and add Dependabot (#29).

---

## P1 — High

### 6. Analytics was lost in the CRA→Next migration ✅
The only Google Analytics snippet (`gtag`, `G-SWH250GETJ`) lives in `public/index.html` — the dead CRA shell (#7). Nothing in `app/` or `src/` loads GA or any analytics.
**Impact:** you have had no traffic/behaviour data since the migration.
**Fix:** add GA4 (or the new stack) via `next/script` in `app/layout.jsx`, ideally behind a consent gate.

### 7. A stale CRA `index.html` is publicly served at `/index.html` ✅
`public/index.html` (53 lines) is a Create-React-App shell with `%PUBLIC_URL%/favicon.ico` placeholders and the GA snippet. Because it sits in `public/`, it is served verbatim.
**Impact:** a second, broken HTML document on your production domain (dead asset paths, different meta tags, duplicate description) — a duplicate-content and brand-consistency problem, and a hook for scanner noise.
**Fix:** delete the file (and check the CDN/edge cache for it).

### 8. No sitemap, and robots.txt has no `Sitemap:` directive ✅
No `app/sitemap.js` anywhere. `public/robots.txt` is the untouched CRA default (`User-agent: * / Disallow:`).
**Fix:** add `app/sitemap.js` (generate from routes + CMS slugs) and reference it from `robots.txt` (`app/robots.js`).

### 9. 80 MB of video + 34 MB of images are committed to Git ✅
`git ls-files src/videos` → 8 files, 80 MB, largest `builtwith.mp4` = **30.6 MB**; `src/images` = 34 MB / 286 files. Working tree (excluding `node_modules`) is **462 MB**. Stray media also live inside `src/images/` (`video-main-bg.mp4` 10 MB, `about.mp4` 6 MB, `clients_logo.zip` 229 KB).
**Impact:** slow clones/CI, bloated history forever, media served from your app origin with no CDN, no adaptive bitrate, no range tuning.
**Fix:** move media to object storage/CDN (S3+CloudFront, Cloudflare R2/Stream, bunny.net), reference by URL, and add a `git-filter-repo`/LFS decision if history must shrink.

### 10. Autoplay videos with no `preload`, `poster`, or `playsInline` ✅
All three `<video>` tags (`src/views/work/HeroSection.jsx:19` and `:33`, plus `src/views/about/BuiltWithUs.jsx`) use `autoPlay muted loop` only.
**Impact:** `/portfolio` autoplays `portfolio.mp4` (3.5 MB) **and** `intro-video.mp4` (12.7 MB) — ~16 MB of eager download, on mobile too; iOS Safari may refuse inline autoplay without `playsInline`; no poster means blank frames until enough data arrives.
**Fix:** `preload="metadata"`, `playsInline`, `poster` (a small WebP), lazy-mount below-the-fold videos, `<source>` WebM/AV1 alternatives.

### 11. Blog does N+1 client-side fetches to WordPress, with no cache 🔍
`src/views/Blog.jsx:25-110` calls `wp.rebrandgurus.com` directly from the browser: 1 request for categories, then **one request per category just to read the `x-wp-total` header**, then a media request per post. No caching, CORS-dependent, nothing in the SSR HTML.
**Impact:** slow blog list, wasted WP resources, fragile (a CORS or WP hiccup blanks the page), and crawlers see an empty feed.
**Fix:** fetch server-side (`app/blog/page.jsx`) with `revalidate`, request `_fields` to trim payloads, use `X-WP-Total` once per query, and cache per category.

### 12. An unused open proxy to WordPress 🔍
`app/api/wordpress/[...path]/route.js` forwards any path under `/wp-json/*` to the WP host with `cache: "no-store"`; no code in the app calls it.
**Impact:** an unauthenticated surface that can be used to hammer your WordPress install or probe its REST API through your domain, with zero caching benefit.
**Fix:** delete it (and `Blog.jsx`'s direct calls) in favour of server-side fetches, or lock it to an allowlist of endpoints with caching.

### 13. No error or loading boundaries anywhere ✅
`app/loading.jsx`, `app/error.jsx`, `app/global-error.jsx` are all absent. `src/views/PageLayout.jsx:60` has an empty `if (loading) {}` branch and renders raw `Failed to load page: {error}` on failure.
**Impact:** a Hygraph/WordPress outage shows users a blank page or an internal error string (mild information disclosure), with no recovery path.
**Fix:** add `loading.jsx`/`error.jsx`/`global-error.jsx` with branded states and a retry.

### 14. Blog URLs use WordPress numeric IDs, not slugs 🔍
`src/views/blog/PostItem.jsx:24` → `/blog/${post.id}` (same in `NavigationPost.jsx:63,116`).
**Impact:** `/blog/4821` ranks and reads far worse than `/blog/local-seo-checklist`; any WP re-migration that renumbers IDs breaks every indexed URL.
**Fix:** switch to `post.slug`, redirect old `/blog/{id}` URLs with `next.config.js` redirects or a lookup.

### 15. The homepage, `/services`, `/pricing` and `/contact-us` have no `<h1>` ✅
```
/          → 0 h1      /services  → 0 h1
/pricing   → 0 h1      /contact-us → 0 h1
```
The homepage hero heading is an `<h3>` (`src/views/home/HeroSection.jsx:27`).
**Impact:** weakest possible signal for the page's topic; a WCAG/SEO check fails immediately.
**Fix:** one `<h1>` per page (hero/pricing/section heading), then order `h2`→`h3` beneath it.

### 16. Navigation and footer links are missing from server-rendered HTML ✅
Only **8** `<a href>` elements exist in the homepage's SSR HTML (and 2 on `/blog`), because `Footer` is declared `dynamic(..., { ssr: false })` in `src/app-client/Providers.jsx:12`.
**Impact:** crawlers receive almost no internal links — the site's link graph depends entirely on JS execution; also hurts LCP/text render.
**Fix:** render `Footer` on the server (drop `ssr: false`), and make sure header nav renders server-side too.

---

## P2 — Medium

### 17. Title-tag and social-preview problems ✅
Observed titles: `About ReBrand Gurus | ReBrand Gurus`, `Blog | ReBrandGurus | ReBrand Gurus` (brand duplicated, and spelled two ways), `Digital Branding and Creative Agency in Utah, Best Website Revamp Agency in Utah` (83 chars, no brand suffix). Every route shares `og:image = /logo512.png` (512×512 square) with a `summary_large_image` Twitter card (`src/seo/site.js:19-68`).
**Fix:** single-source titles without the brand repeated, trim to ≤60 chars, and ship a 1200×630 OG image per section.

### 18. Duplicate / competing indexable content 🔍
- `/new-seo` and `/service/seo-aeo-geo` are near-duplicate SEO landing pages, both indexable.
- `/coming-soon` is live and indexable in production.
- Both an `app/404/page.jsx` route and `app/not-found.jsx` exist.
- The `/[slug]` catch-all answers 200 for anything (#3).
**Fix:** pick one canonical SEO page and 301 the other (as `/seo-aeo-geo` already does correctly), `noindex` the placeholder pages, and drop the duplicate 404 surface.

### 19. Everything is client-rendered ✅
**106** files carry `"use client"`, and each route is a thin server wrapper around `PageClient` → a client view that fetches its own data in `useEffect`. First Load JS: `/` 275 kB, `/services` 251 kB, `/service/[slug]` 316 kB.
**Fix:** move data fetching into the server components, render static content server-side, and keep `"use client"` only for the interactive islands.

### 20. No data-caching layer 🔍
CMS data is fetched per mount through `/api/hygraph` with no SWR/react-query/RTK, and only two routes (`/[slug]`, `/blog/[postId]`) use `next: { revalidate: 3600 }`.
**Fix:** server-side fetches with `revalidate` + `unstable_cache` tags, or add SWR on the client for the interactive parts.

### 21. Image pipeline is under-used and mis-sized ✅
- 35 of 50 `<NextImage>` usages omit `sizes`; the fallback is `100vw`, so the browser can pick **3840 px** candidates for small assets (observed `w=3840` in generated `srcset`s).
- Only 2 images set `priority` (`PageHeader`, home hero).
- Asset library is 159 PNG + 110 JPG vs 3 WebP; CSS background images (`body-bg.png` 552 KB, `skyline.webp` 747 KB) bypass the optimizer entirely.
**Fix:** meaningful `sizes`/`quality` per usage, `priority` for the real LCP image, convert the library to AVIF/WebP, and move CSS backgrounds to `<Image fill>` or pre-optimized files.

### 22. One 272 KB global stylesheet, 153 `!important` ✅
All 54 CSS files are imported in `app/layout.jsx`, producing `layout.css` = **272 KB** (dev, unminified) loaded on every page; `responsive.css` alone is 33 KB / 1 982 lines and `searchEvolution.css` 53 KB; 153 `!important` declarations.
**Fix:** per-route CSS imports or CSS Modules, strip `!important`, split responsive rules, and check the production CSS size in CI.

### 23. Fonts load through CSS `@import` with no preload ✅
`src/App.css:1` → `@import url(./fonts/stylesheet.css)`, which `@font-face`s 920 KB of woff **and** woff2 files.
**Impact:** an `@import` inside a stylesheet serialises the font request after CSS parse; no preload = late text paint (FOIT/FOUT).
**Fix:** `next/font/local` (self-hosted, auto-preload, size-adjusted fallback) and drop the `.woff` duplicates.

### 24. Dead and duplicated dependencies ✅
Unused or effectively unused: `gsap-trial` (0 references — *and it is a trial-licensed package*), `swiper` (0 references, still ships because `slick-carousel` CSS is; note swiper also carries the critical CVE), `pdfjs-dist` (only a commented-out import), `web-vitals` (0), `react-tsparticles` + `partycles` + `react-countdown` (used only by dead components, #26), and the three `@testing-library/*` packages with no tests.
Also `gh-pages` (devDep) with CRA-era scripts: `"predeploy": "npm run build"`, `"deploy": "gh-pages -d build"` — the Next build never emits `build/`, so `npm run deploy` publishes nothing/stale output.
**Fix:** delete unused deps and the CRA scripts; keep one carousel stack.

### 25. Dead code imports a package that isn't installed ✅
`src/components/ConfettiEffect.jsx:5` → `import { loadConfettiPreset } from "tsparticles-preset-confetti"` — that package is **not in `package.json` or `node_modules`**. It is unreachable today, but importing the component breaks the build.
**Fix:** delete the component (or install the dependency if it is meant to be used).

### 26. ~12 unreferenced modules and lots of commented-out seasonal code ✅
Unreferenced: `ConfettiEffect.jsx`, `Countdown.jsx`, `PageLoadModal.jsx`, `WinterSnow.jsx` (14 KB), `header/Intro.jsx`, `header/IntroSVGText.jsx`, `visitButton.jsx`, `views/FetchPages.jsx`, `home/GalleryWork.jsx`, `home/sasHomeBanner.jsx`, `services/ScrollText.jsx`. Seasonal/event code (Snowfall, HeartEffect, `valentine-email.jsx`, RightClick) survives as commented-out imports (`src/views/Home.jsx:18,25`, `src/components/header/Header.jsx:10`).
**Fix:** delete, or move to a proper feature-flag module.

### 27. 24 `dangerouslySetInnerHTML` sinks with no sanitisation 🔍
CMS/WordPress HTML is injected raw in `PageLayout.jsx:81`, `blog/SinglePost.jsx:104`, `services/ServiceFAQS.jsx:48`, `webdesign/WebServiceTab.jsx:97`, `home/HomeTeam.jsx:184`, `blog/PostCatList.jsx:15`, `PackageBox.jsx:31`, and others.
**Impact:** any compromised CMS account/token (see #1) becomes stored XSS on your domain.
**Fix:** sanitise (DOMPurify / `sanitize-html`) at the boundary, or render a known-safe rich-text subset.

### 28. Placeholder and third-party demo data in production code 🔍
`src/components/AddressCrousel.jsx:7-15` ships `https://picsum.photos/seed/...` placeholder images; `next.config.js` still allowlists `picsum.photos` and `placekitten.com` in `images.remotePatterns`.
**Fix:** replace with real assets and remove the demo hosts from the image allowlist.

### 29. No CI, no tests, no type checking ✅
No `.github/` directory: no workflow, no Dependabot. Zero test files despite `@testing-library/*` being installed. `jsconfig.json` only sets a path alias — no `checkJs`/TS, so a broken import (like #25) or a typo only surfaces at runtime.
**Fix:** a small GitHub Actions workflow (`npm ci && npx next lint && npx next build`) on every PR, add Dependabot, and either migrate incrementally to TS or enable `checkJs` with `// @ts-check`.

### 30. The web manifest still says "React App" ✅
`public/manifest.json`: `"short_name": "React App"`, `"name": "Create React App Sample"`.
**Impact:** anyone installing the PWA gets a CRA-labelled app.
**Fix:** real name/icons (or an `app/manifest.js` generated from the same site config).

### 31. Fragile Next-specific shims and deprecated image config 🔍
- `next.config.js` sets `images.disableStaticImages: true` **and** pushes a custom `asset/resource` webpack rule for `png|jpe?g|gif|webp|svg|mp4|woff?|ttf|eot` — duplicating Next's built-in handling and coupling the build to webpack internals.
- `react-router-dom` is webpack-aliased to the hand-written `src/next-shims/react-router-dom.js` (implements `Link`, `NavLink`, `useNavigate`, `useParams`; the codebase only uses those three, so it works today).
**Fix:** replace `Link`/`useNavigate` with `next/link` + `next/navigation` over time, drop the alias and the custom asset rule, verify image/media handling on the next major upgrade.

### 32. No security headers at all ✅
```
$ curl -sD - -o /dev/null localhost:3000 | grep -icE "content-security-policy|strict-transport|x-frame|x-content-type|referrer-policy|permissions-policy"  → 0
X-Powered-By: Next.js
```
**Fix:** add `headers()` (or `poweredByHeader: false` + platform config) with CSP, HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, and frame-ancestors.

### 33. Blog posts have no article structured data 🔍
`app/blog/[postId]/page.jsx:43` sets `og:type=article` but emits only `webPageSchema` — no `Article`/`BlogPosting` with `author`, `datePublished`, `dateModified`, `image`.
**Fix:** add an `articleSchema()` helper in `src/seo/site.js` and emit it alongside the WebPage schema.

### 34. Duplicated content strings across the CMS page and a component ✅
The identical FAQ answer (keyword research, on-page optimisation, technical SEO…) appears in both `app/service/[slug]/page.jsx:44` and `src/views/services/SeoContent.jsx:72`.
**Impact:** edits diverge silently; SEO copy drifts between two sources of truth.
**Fix:** keep one source (CMS or a single constants module).

---

## P3 — Low / polish

### 35. Accessibility gaps 🔍
Unlabelled `<textarea id="contact-message">` **with `autoFocus`** (`src/views/contact/ContactForm.jsx:164`) — screen readers announce an unnamed field and mobile users get a surprise keyboard; page headings replaced by `h3` (#15); decorative background videos are not `aria-hidden` and have no `poster`; the sketch-canvas drawing sent with the form has no text alternative; carousel `useCallback/useEffect` deps are incomplete (#36). Only 22 `aria-label`s across ~106 client components.
**Fix:** label every control, move `autoFocus` off the mount, `aria-hidden` decorative media, and run axe/Lighthouse accessibility on the main templates.

### 36. 9 ESLint warnings, all `react-hooks/exhaustive-deps` ✅
`AddressCrousel.jsx` (3), `Countdown.jsx` (2), `HeartEffect.jsx`, `RightClick.jsx` (2), `Snowfall.jsx`. The `AddressCrousel` ones are the risky set — the autoplay slide logic can capture stale `moveNext`/`movePrev`/`flip`.
**Fix:** include the deps (or wrap in `useCallback`) per the warnings.

### 37. README and env docs do not match the project ✅
`README.md` is CRA boilerplate (mentions `npm start`, `eject`, CRA docs) with a stray UTF-16 line at the end; nothing documents env vars, deployment, or the migration. `.env.example` omits `WORDPRESS_API_BASE_URL`, which the code actually reads (`app/api/wordpress/[...path]/route.js:3`, defaulting silently to the production WP host).
**Fix:** rewrite the README (Next commands, env table, deploy target, architecture map) and complete `.env.example`.

### 38. Direct DOM manipulation and stray logging 🔍
`src/components/visitButton.jsx:12` and `src/views/home/weekly.jsx:57` assign to `innerHTML` for text effects (breaks with React re-renders); 3 leftover `console.log`s.
**Fix:** move text effects into React state/CSS.

### 39. No monitoring, no health checks 🔍
Failures are only `console.error` (`ContactForm`, `PageLayout`, API routes). There is no error tracker (Sentry/Rollbar), no uptime check on the WP/Hygraph dependencies, and no `/api/health` endpoint.
**Fix:** add an error boundary that reports, plus a health route that pings both upstreams.

### 40. Very large monolithic files 🔍
`src/Data.jsx` 50 KB, `src/views/SearchEvolution.jsx` 41 KB, `src/views/searchEvolution.css` 53 KB, `src/responsive.css` 33 KB, `src/views/pricing/SeoPricingData.js` 16 KB. Content that belongs in the CMS lives in code.
**Fix:** split by feature, move editorial content (services, pricing, FA/staff bios) to Hygraph.

### 41. Three overlapping 404 mechanisms 🔍
`app/404/page.jsx`, `app/not-found.jsx`, and runtime client redirects to `/404` via the shim's `navigate("*")` convention (`src/next-shims/react-router-dom.js:52`).
**Fix:** keep `notFound()` + `not-found.jsx`, delete the `/404` route and the `"*"` convention.

### 42. Public/asset layout is inconsistent 🔍
`public/` has 6 files while the real library lives in `src/images` + `src/videos`; two stray MP4s and a ZIP sit inside `src/images`.
**Fix:** one media strategy: `public/media/**` (or CDN) with a documented convention.

### 43. No `.nvmrc`, `.editorconfig`, or formatter config 🔍
`package.json` sets `engines.node >= 18.18` but nothing pins the local/CI version; no Prettier/ESLint-format config, so style drifts (the codebase mixes 2-space, quotes, and JSX spacing conventions inconsistently).
**Fix:** add `.nvmrc` + Prettier config and run it once.

### 44. Deployment story is unstated 🔍
Scripts still target `gh-pages` (#24) even though the app now has Node-only API routes and image optimisation, which a static host cannot serve.
**Fix:** declare the real target (Vercel/Fly/Node container), add `output: "standalone"` if containerised, and delete the CRA scripts.

### 45. Brand naming is inconsistent in titles and schema ✅
`ReBrand Gurus` (schema, most titles) vs `ReBrandGurus` (`Blog | ReBrandGurus | ReBrand Gurus`, `public/index.html`). `src/seo/site.js` hardcodes the name in several places.
**Fix:** one `siteName` constant used by titles, schema, OG, and the manifest.

### 46. Media weight on first paint 🔍
`body-bg.png` (552 KB) is used as a fixed-attachment page background, and `whyChoose_bg*.png` are CSS backgrounds — all full-size, unoptimised, and on mobile `background-attachment: fixed` is a well-known jank source.
**Fix:** pre-optimise to WebP/AVIF at 2× max, drop `background-attachment: fixed` on small screens, and lazy-load below-the-fold backgrounds.

---

## Suggested roadmap

**Sprint 1 — stop the bleeding (P0, ~1 day):** #1 lock down `/api/hygraph` · #3 real 404s · #4 contact-form limits · #2 + #5 dependency upgrades/audit fix.
**Sprint 2 — SEO & crawlability (~1 day):** #6 restore analytics · #7 delete `public/index.html` · #8 sitemap + robots · #14 slug URLs · #15 `<h1>`s · #16 server-render the footer · #17 titles/OG images.
**Sprint 3 — performance (~2 days):** #9 + #10 media to CDN with `preload`/`poster`/`playsInline` · #11 + #20 server-side cached blog/data · #19 move pages to Server Components · #21–#23 images, CSS, fonts.
**Sprint 4 — hygiene & safety net (~1 day):** #24–#26 dependency/dead-code purge · #29 CI + Dependabot · #13 error boundaries · #27 sanitisation · #32 security headers · #37 README/docs.

*Every P0/P1 item above is independently reproducible with the commands quoted in its entry.*
