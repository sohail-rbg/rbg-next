# Brand preloader

Premium full-screen intro for ReBrand Gurus: a live loading counter, brass
rail, rotating status copy — and once the page is ready, the two emerald
panels part like a camera shutter to reveal the site.

```
loading  →  complete  →  opening  →  done
 counter     100% hit     panels       component
 ramps       +sweep       split        unmounts
```

## Files

| File | Purpose |
| --- | --- |
| `Preloader.jsx` | Client component: counter animation, load detection, phase machine. |
| `preloader.css` | Lock-down rules, gate panels, stage, wordmark, keyframes. |
| `preloaderBoot.js` | Shared constants + the inline boot script injected in `<head>`. |

It is mounted once in `src/app-client/Providers.jsx` (inside the root layout),
so it plays on **full page loads only** — client-side route changes never
re-trigger it.

## How it behaves

- The inline boot script in `app/layout.jsx` runs before first paint: it locks
  the page (`html.rbg-preloading`) and records the visit, so there is no flash
  of the site behind the overlay.
- The counter eases up to `93%` while assets stream in, then pulls smoothly to
  `100%` once `window.load` fires (minimum on-screen time is still respected so
  the wordmark finish is never cut short).
- At `100%` the brass sweep fires, the wordmark lifts away, and the panels
  split; the page fades up underneath slightly before the panels finish
  travelling.
- A reload in the same session plays a shorter version
  (`sessionStorage["rbg:preloader-played"]`).

## Tuning

All timing lives in one block at the top of `Preloader.jsx`
(`FIRST_PLAY_MS`, `REPEAT_PLAY_MS`, `SNEAK_TO`, `FINISH_MS`,
`COMPLETE_HOLD_MS`, `SHUTTER_MS`, …). `SHUTTER_MS` must stay in sync with the
gate transition duration in `preloader.css`.

## Controls & safety nets

| Command | Result |
| --- | --- |
| `?preloader=0` (or `off`, `false`, `skip`, `none`) | Skip the intro for that load. |
| `?preloader=1` (or `on`, `true`, `force`) | Force the full intro, even on repeat visits. |
| `prefers-reduced-motion: reduce` | Shortened, non-animated pass. |
| JS disabled | `<noscript>` rules remove the overlay and unlock the page. |
| Bundle/runtime failure | Boot script failsafe unlocks the page after 6s. |
| Slow network | Hard finish at ~5.4s; the site is never held hostage. |
