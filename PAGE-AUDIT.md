# Page & Link Audit — ReBrand Gurus

**Run:** 2026-10-15 · against a **production build** (`next build` + `next start`) · 30 URLs crawled, all HTML inspected

**How it was run:** every static route, every service slug found in `src/Data.jsx`, the footer/menu link set, and a set of deliberately bogus slugs were requested and compared (status code, `<title>`, byte size, rendered text, duplicate-content fingerprint).

---

## 1. Pages that work correctly

| URL | Status | Title | HTML |
|---|---|---|---|
| `/` | 200 | Digital Branding and Creative Agency in Utah… | 126 KB |
| `/about-us` | 200 | About ReBrand Gurus | 42 KB |
| `/pricing` | 200 | Pricing | 160 KB |
| `/services` | 200 | Our Comprehensive Services… | 142 KB |
| `/portfolio` | 200 | Portfolio Showcase… | 26 KB |
| `/contact-us` | 200 | Contact Us for Assistance and Inquiries | 37 KB |
| `/consultation` | 200 | Book a Consultation | 27 KB |
| `/new-seo` | 200 | New SEO / AI Visibility Audit | 29 KB |
| `/service/web-design` | 200 | Web Design | 103 KB |
| `/service/seo` | 200 | SEO | 102 KB |
| `/service/seo-aeo-geo` | 200 | SEO, AEO and GEO Strategy | 66 KB |
| `/seo-aeo-geo` | 308 → `/service/seo-aeo-geo` | (redirect works correctly) | — |
| `/404` | **404** | Page Not Found | 22 KB |
| `/blog` | 200 | Blog | 25 KB — but see #6 |

**12 of 16 routes render real content.** No page returns a 5xx. Nothing crashes.

---

## 2. Dead, broken or fake pages (14 URLs)

### 2.1 Four service cards on `/services` are dead links ⛔
`src/views/services/servicePage/ServiceCard.jsx:44` builds `link={() => `/service/${data.slug}`}`, and four services in `src/Data.jsx` have `slug: "#"`:
- **Mobile App Development** (`Data.jsx:1018`)
- **Social Media Optimization** (`Data.jsx:1078`)
- **Dedicated Resource** (`Data.jsx:1138`)
- **Virtual Assistant** (`Data.jsx:1198`)

Rendered HTML on `/services`: `href="/service#"` ×4. Clicking any of these four cards lands on `/service`, which renders a generic 200 page (see 2.2). **Four of the six service cards on your main services page go nowhere.**

**Fix:** give each a real slug + page (or point them at `/services` until the pages exist); ideally drive service cards from a single `services` map so this can't drift.

### 2.2 Unknown service slugs silently render the Web Design page ⛔
`app/service/[slug]/page.jsx:73`
```js
const service = services[slug] || services["web-design"];
```
Any unrecognised slug is served as Web Design with HTTP 200 and the title `Web Design | ReBrand Gurus`. Verified — all six of these returned **byte-identical** content:
`/service/does-not-exist`, `/service/mobile-app-development`, `/service/social-media-optimization`, `/service/dedicated-resource`, `/service/virtual-assistant`, `/service/web-design`

**Impact:** unlimited duplicate-content URLs, each claiming to be the Web Design page; visitors following a stale link see the wrong service with no indication anything is wrong.
**Fix:** `if (!services[slug]) notFound();` and add `generateStaticParams` + `dynamicParams = false`.

### 2.3 `/service` and `/service/` return 200 instead of 404
`/service`, `/service/`, `/service/#`, `/service#` all return **200** with the generic catch-all shell (`<title>ReBrand Gurus | ReBrand Gurus</title>`).
**Fix:** as above — real 404 when the slug is missing.

### 2.4 Every unknown top-level URL returns a soft 200 ✅ *(confirms ISSUES.md #3)*
`/definitely-not-a-page`, `/about`, and anything else reach `/app/[slug]/page.jsx`, which returns **200** with body `Loading...` and title `ReBrand Gurus | ReBrand Gurus` (identical fingerprint for all three).
**Fix:** `notFound()` when Hygraph has no such page.

### 2.5 Blog post pages are empty shells that always return 200 ⛔
`/blog/1`, `/blog/999999`, `/blog/some-post-slug` → **byte-identical** 200 responses, title `Blog Post | ReBrand Gurus`, no article content in the HTML (the post is rendered client-side from WordPress by `src/views/blog/SinglePost.jsx`).
Two separate problems: (a) non-existent posts never 404, and (b) **real posts ship an empty document to crawlers** — only `generateMetadata` fetches server-side.
**Fix:** fetch the post server-side in `app/blog/[postId]/page.jsx`, `notFound()` when WP returns 404, and switch URLs to slugs (ISSUES.md #14).

### 2.6 `/blog` list is client-only
SSR HTML for `/blog` contains the heading and nothing else; categories and posts are fetched in the browser (`src/views/Blog.jsx`). With WordPress slow/unreachable the page is effectively blank (exactly what happened here, where the sandbox cannot reach `wp.rebrandgurus.com`).
**Fix:** server-side fetch with `revalidate` and render the first page of posts in HTML.

### 2.7 Every portfolio project title is `href="#"` ⛔
`src/views/work/WorkItem.jsx:65` → `<Link component="a" href="#">{item.title}</Link>`. Project titles on `/portfolio` are links that do nothing.
**Fix:** link to the project's live URL or a case-study page, or render plain text instead of an anchor.

### 2.8 `/coming-soon` is publicly reachable and indexable
Returns 200, has metadata, and is not `noindex`.
**Fix:** `noindex` it or move it behind a preview flag until you actually need it.

### 2.9 Duplicate indexable SEO pages
`/new-seo` (200) and `/service/seo-aeo-geo` (200) are near-duplicate AI-visibility landing pages, both indexable, both self-canonical. (`/seo-aeo-geo` handles this correctly by redirecting — do the same for one of these two.)
**Fix:** keep one, 301 the other.

### 2.10 LinkedIn menu link points to an admin dashboard ⛔
`src/components/header/HamburgerContent.jsx:79` → `https://www.linkedin.com/company/74515017/admin/dashboard/`
Visitors get a login/permission wall. Should be the public company page.
**Same file, worse:** the social links and the schema.org `sameAs` disagree:
| Network | Menu (`HamburgerContent.jsx`) | Schema (`src/seo/site.js:86`) |
|---|---|---|
| Instagram | `instagram.com/rebrandgurusofficial` | `instagram.com/rebrandgurus` |
| Facebook | `facebook.com/rebrandgurusmarketing` | `facebook.com/rebrandgurus` |
| LinkedIn | `.../74515017/admin/dashboard/` | `linkedin.com/company/rebrandgurus` |
| YouTube | `youtube.com/channel/UClS9V3u_…` | *(absent)* |

At least one set is wrong — either the menu sends customers to the wrong profiles or Google is being told about profiles you don't own.
**Fix:** pick the real handles once, use them in both places, and add YouTube to `sameAs`.

---

## 3. Not verifiable in this sandbox (needs an external checker)

This environment's outbound network only reaches GitHub/npm/PyPI, so these could not be tested — run a crawler (Screaming Frog, `lychee`, or a CI link-check job) against production:

- **~40 external client-site links** (e.g. `aaackpacks.com`, `atsk9detection.com`, `dronomy.io`, `branditpurple.com`, `copinaco.com`) — if any client site is dead, you're linking to a dead business.
- **`http://dglawnyc.com/`** — plain HTTP, not HTTPS (`src/views/about/ClientReviewVideos.jsx:63`).
- `mailto:info@rebrandgurus.com`, `tel:+1-4353950079`, the WhatsApp deep link (`api.whatsapp.com/...phone=15129523367`) — note the WhatsApp number (512-952-3367) differs from the phone number shown in the header (435-395-0079).
- Third-party hotlinked imagery (`66.media.tumblr.com`, `images.pexels.com`, GraphAssets URLs) — used as CSS backgrounds in `HeaderLocation.jsx` (currently unmounted/dead code) and `GalleryWork.jsx` (dead code), but they'd break if those hosts purge content.

**In-page anchors:** `#rbgEra`, `#ourvision`, `#testimonialSec`, `#buildwithrbg` (`AboutNavigation.jsx`) and `#ecosystem` (`SearchEvolution.jsx:619`) all have matching `id=` targets in the same page's source — these look fine, but confirm by clicking after hydration.

---

## 4. What to work on next — recommended order

**Step 1 — Kill the dead links (½ day, tiny diff, immediately visible to users)**
1. Fix the 4 `slug: "#"` services (`Data.jsx`) — either real pages or point to `/services` (#2.1).
2. Fix the portfolio `href="#"` titles (#2.7).
3. Fix the LinkedIn admin URL + reconcile social handles with `sameAs` (#2.10).

**Step 2 — Real 404s everywhere (½ day, protects SEO — this is the single highest-value fix)**
4. `notFound()` when the service slug is unknown (#2.2) + `dynamicParams = false`.
5. `notFound()` in `app/[slug]/page.jsx` (#2.4) and in `app/blog/[postId]/page.jsx` when WP says 404 (#2.5).

**Step 3 — Make the blog real**
6. Server-render the post list and post bodies with `revalidate` (#2.5, #2.6); switch to slug URLs.

**Step 4 — Then the rest of the backlog**
7. Follow `ISSUES.md` Sprint 1 (security: `/api/hygraph`, contact form limits, dependency CVEs) — the link fixes are cosmetic by comparison with an open CMS proxy.

---

*Raw crawl data: `/tmp/pages.json` from the run above (status, title, size, timing, duplicate fingerprints).*
