"use client";

import React, { useEffect, useRef, useState } from "react";

import EastIcon from "@mui/icons-material/East";
import aboutImageLeft from "../../images/utah2.jpg";
import aboutImageRight from "../../images/skyline.webp";
import { HomePageData } from "../../Data";
import CustomButton from "../../components/CustomButton";
import NextImage from "../../components/NextImage";

const { aboutus } = HomePageData;

/* Art direction only — not one word of the copy changes.
   The heading is set as a computed three-line masthead; the closing two words
   are lifted into italic sage. Line breaks are derived, not hardcoded, so the
   block survives an edit to the title. */
const titleWords = aboutus.title.trim().split(/\s+/);
const accentWords = titleWords.slice(-2);
const leadWords = titleWords.slice(0, -2);

const balance = (words) => {
  const total = words.join(" ").length;
  let best = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i += 1) {
    const head = words.slice(0, i).join(" ").length;
    const diff = Math.abs(head - (total - head - 1));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
};

const titleLines = [...balance(leadWords), accentWords.join(" ")];

/* The paragraph's opening sentence becomes a standfirst — scale contrast with
   no new copy. */
const descriptionText = aboutus.description.trim();
const firstStop = descriptionText.indexOf(". ");
const standfirst = firstStop > 0 ? descriptionText.slice(0, firstStop + 1) : descriptionText;
const bodyText = firstStop > 0 ? descriptionText.slice(firstStop + 1).trim() : "";

/**
 * Liquid-glass lens, powered by liquidGL (WebGPU → WebGL2 → WebGL1 → CSS).
 *
 * The panel is a real refracting pane: it samples the photography behind it and
 * bends it, with a bevelled edge, chromatic dispersion, a live specular sweep
 * and a viscous surface that follows the cursor.
 *
 * Deliberate choices:
 *  - the snapshot is scoped to this section, not <body>, so the library
 *    rasterises one band of the page instead of the whole document
 *  - it boots on idle, after first paint, so it can never delay the page
 *  - it is guarded by the reduced-transparency preference and the site-wide
 *    data-glass="off" switch, both of which leave the CSS glass in place
 *  - any failure (no WebGPU, no WebGL, blocked import) is swallowed and the CSS
 *    glass fallback simply stays on screen
 */
const useLiquidLens = (lensRef, onReady) => {
  useEffect(() => {
    const el = lensRef.current;
    if (!el || typeof window === "undefined") return undefined;

    const html = document.documentElement;
    const reducedTransparency =
      window.matchMedia?.("(prefers-reduced-transparency: reduce)")?.matches === true;
    if (html.dataset.glass === "off" || reducedTransparency) return undefined;

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;

    let lens = null;
    let cancelled = false;
    let cancelPending = null;

    const boot = async () => {
      if (cancelled) return;
      try {
        const mod = await import("liquid-gl");
        const liquidGL = mod?.default ?? mod;
        if (cancelled || typeof liquidGL !== "function") return;

        lens = liquidGL({
          engine: "auto",
          target: ".rbg-about__lens",
          // scoped: one band of the page, not the whole document
          snapshot: ".rbg-about",
          content: ".rbg-about__lensInner",
          resolution: 1.6,
          refraction: 0.022,
          aberration: reducedMotion ? 0 : 0.014,
          bevelDepth: 0.1,
          bevelWidth: 0.2,
          frost: 0.5,
          shadow: true,
          specular: !reducedMotion,
          reveal: "fade",
          tint: "rgba(8, 26, 21, 0.24)",
          magnify: 1.03,
          tilt: !coarsePointer && !reducedMotion,
          tiltFactor: 4,
          tiltEase: 620,
          interaction: coarsePointer || reducedMotion ? "none" : "fluid",
          interactionStrength: 0.42,
          interactionRadius: 0.42,
          interactionViscosity: 0.62,
          on: {
            init: () => {
              if (!cancelled) onReady(true);
            },
          },
        });
      } catch (err) {
        // no WebGPU/WebGL, or the import was blocked — the CSS glass stays
        onReady(false);
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(boot, { timeout: 2000 });
      cancelPending = () => window.cancelIdleCallback(id);
    } else {
      const id = window.setTimeout(boot, 900);
      cancelPending = () => window.clearTimeout(id);
    }

    return () => {
      cancelled = true;
      if (cancelPending) cancelPending();
      try {
        lens?.destroy?.();
      } catch (err) {
        /* teardown must never throw */
      }
    };
  }, [lensRef, onReady]);
};

const HomeAbout = () => {
  const lensRef = useRef(null);
  const [liquidOn, setLiquidOn] = useState(false);

  useLiquidLens(lensRef, setLiquidOn);

  return (
    <section className="sectionWrp rbg-about">
      {/* ---- the scene: two photographs composed into one immersive band --- */}
      <div className="rbg-about__scene" aria-hidden="true">
        <div className="rbg-about__plate rbg-about__plate--utah">
          <NextImage
            src={aboutImageLeft}
            fill
            alt=""
            className="rbg-about__photo"
            sizes="(max-width: 1024px) 100vw, 70vw"
            quality={78}
            priority={false}
          />
        </div>

        <div className="rbg-about__plate rbg-about__plate--city">
          <NextImage
            src={aboutImageRight}
            fill
            alt=""
            className="rbg-about__photo"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
        </div>

        <div className="rbg-about__veil" />
      </div>

      {/* ---- the stage ---------------------------------------------------- */}
      <div className="rbg-about__stage">
        <h2 className="rbg-about__masthead">
          {/* the explicit spaces matter: the lines are display:block, so without
              them the heading's text content runs together ("potentialof your
              business withcreative") for screen readers and crawlers. */}
          <span className="rbg-about__line">{titleLines[0]}</span>{" "}
          <span className="rbg-about__line">{titleLines[1]}</span>{" "}
          <em className="rbg-about__line rbg-about__line--accent">{titleLines[2]}</em>
        </h2>

        <span className="rbg-about__rail" aria-hidden="true">
          Salt Lake City — Utah
        </span>

        <div
          ref={lensRef}
          className={`rbg-about__lens${liquidOn ? " is-liquid" : " rbg-glass rbg-glass--squircle"}`}
        >
          <div className="rbg-about__lensInner">
            <p className="rbg-about__standfirst">{standfirst}</p>
            {bodyText ? <p className="rbg-about__body">{bodyText}</p> : null}

            <div className="rbg-about__cta">
              <CustomButton margin="0" link="/about-us" endIcon={<EastIcon />}>
                {aboutus.button.text}
              </CustomButton>
            </div>

            <div className="rbg-about__caption">
              <span className="rbg-about__captionTitle">
                <span className="rbg-about__dot" aria-hidden="true" />
                {aboutus.hoverBox.heading}
              </span>
              <span className="rbg-about__captionBody">{aboutus.hoverBox.description}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
