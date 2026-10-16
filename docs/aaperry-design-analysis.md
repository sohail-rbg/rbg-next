# Design analysis — aaperry.com (reference) → ReBrand Gurus homepage

Reference: https://aaperry.com/ (Glenn Perry, Ph.D. — AstroPsychology)
Delivered: `src/views/home/editorial/` — vintage editorial homepage, live at `/`.

---

## 1. What aaperry.com is actually doing

It is an **old-school WordPress editorial site** — a personal-practice site that behaves like a printed booklet rather than a marketing funnel.

| Observed | Detail |
| --- | --- |
| **Structure** | Homepage is a content index: three stacked, self-contained blocks — *What Is…*, *Who Is…*, *Featured Product*. No hero banner, no slider, no video. |
| **Voice** | First person, long-form, authoritative. "For the past 35 years, I've worked as a licensed psychotherapist…" The copy *is* the design. |
| **Headings** | Plain section headings (`### What Is…`) with a small image above each; treated as chapter titles, not marketing headlines. |
| **Text** | Body copy runs long and uninterrupted. Inner pages open with a **drop cap** ("**A**stroPsychology is a brand of…") and are broken by small bold sub-heads. |
| **Imagery** | Small, modest, illustrative — portraits and book covers at native-ish size. Images *support* the paragraph; they never lead it. |
| **Layout** | Single readable centre column with wide margins; content sits inside generous side whitespace on both edges. |
| **Ornament** | Very little: rules, small caps, a sidebar utility ("Pin It on Pinterest"). No gradients, no glassmorphism, no motion to speak of. |
| **Feeling** | Dated in a deliberate way — 2015-era uploads, default-feeling type, persistent sidebar. It reads as *a person's life work*, not a campaign. |

**The lesson for our brief:** credibility on this kind of site comes from *typography, whitespace and the willingness to let prose carry the page* — not from decoration.

---

## 2. How that maps to the client's brief

| Client requirement | How the new homepage answers it |
| --- | --- |
| **Old-school feel** | Aged-paper ground (`#f4eee2`) with CSS-drawn grain, ink `#221d18`, oxblood accent `#8c3a1c`, Georgia/Palatino body serif, Recoleta display serif, 3px double rules, `❧ ❖` ornaments, sepia-tinted images, roman-numeral chapter heads. |
| **Side margin** | Sheet capped at 1320px with `clamp(124px, 12vw, 220px)` left and `clamp(28px, 6vw, 90px)` right padding — and it clears the fixed 100px logo rail on desktop. |
| **Text readable** | Single column capped at **66ch**, body ≈19px, line-height **1.78**, contrast ≈13:1 (ink on paper). Full stops, no text over imagery, no tracking tricks on body copy. |
| **Story-telling** | The page is literally a book: masthead → five chapters → colophon. Marginalia in the margin, a pull quote, framed "plates" with captions, testimonials presented as *letters*, figures as an *almanac*, closing CTA as *Begin Your Chapter*. A sticky **Contents** rail tracks the reader's position. |

---

## 3. Build notes

```
src/views/home/editorial/
  EditorialHome.jsx    page composition
  story.js             ALL copy (edit this, nothing else)
  Masthead.jsx         imprint line, title, deck, CTA
  ChapterOpening.jsx   drop cap + marginalia + pull quote + figure
  ChapterTrade.jsx     services, roman-numeral ledger
  ChapterPlates.jsx    portfolio plates (6, from src/images/portfolio/home)
  ChapterLetters.jsx   testimonials as letters
  ChapterAlmanac.jsx   figures
  Colophon.jsx         closing CTA + colophon lines
  ContentsRail.jsx     sticky contents, IntersectionObserver-driven
  Reveal.jsx           scroll reveal (respects prefers-reduced-motion)
  Ornaments.jsx        Rule / ChapterHead / Figure primitives
src/views/home/css/editorial.css
```

- **Fonts:** Recoleta (already bundled in `src/fonts`) for display, Georgia/Palatino stack for body — no new web-font requests.
- **Motion:** subtle fade-and-rise only; disabled under `prefers-reduced-motion`.
- **Responsive:** rail goes horizontal above the chapters at ≤1024px (where the site header becomes a top bar), plates and marginalia collapse to one column at ≤700px.
- **Print stylesheet included** — it is, after all, pretending to be a printed page.
- **Copy is draft.** Items marked `[VERIFY]` in `story.js` (testimonial names, ROI figure) need client sign-off before publication.

The previous homepage composition (Hero video, USP, Team, Portfolio marquee, Hygraph client logos) is unchanged in git history; only `src/views/Home.jsx` was repointed.
