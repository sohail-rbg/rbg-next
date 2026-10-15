"use client";

import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Capability type block — full-bleed dark composition under the hero.
 *
 * No marquee, no labels: a huge outlined watermark drifts behind two lines of
 * keywords set in alternating filled / outlined / script / sticker / gradient
 * treatments, framed by ambient glows and film grain. Letters rise into place
 * once in view, hover dims the line and lifts a word, and (on fine pointers)
 * letters are magnetic — they lean away from the cursor. A rotating brand
 * badge straddles the seam between the two lines.
 *
 * Brand palette only — sage #8B9C8C, green #2E5E53, blush #faede9, ink #0e191d.
 */

const disciplines = [
  "Agency",
  "Studio",
  "Digital Solution",
  "Digital Magazine",
  "Strategy",
  "Branding",
  "Contemplative",
  "Forethought",
  "Development",
];

const crafts = [
  "Design",
  "Interaction",
  "Creative",
  "Typography",
  "Aesthetic",
  "Minimalistic",
];

const badgeText = "REBRAND GURUS • DIGITAL CRAFT • ";

/** Letter treatments rotate through the line so the specimen never repeats. */
const variantFor = (index) => {
  if (index % 7 === 3) return "sticker";
  if (index % 5 === 2) return "script";
  if (index % 4 === 1) return "gradient";
  if (index % 3 === 1) return "outline";
  return "filled";
};

const Letters = ({ text }) => (
  <>
    {Array.from(text).map((char, index) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={`${char}-${index}`}
        className="rbg-roll__ltr"
        style={{ "--i": index }}
        data-magnetic="1"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </>
);

const Word = ({ word, variant }) => (
  <span className={`rbg-roll__word is-${variant}`}>
    {variant === "script" ? word : <Letters text={word} />}
  </span>
);

const RotatingBadge = ({ text }) => {
  const rawId = useId();
  const pathId = `rbg-roll-circle-${rawId.replace(/[^a-zA-Z0-9-]/g, "")}`;

  return (
    <div className="rbg-roll__badge" aria-hidden="true">
      <svg className="rbg-roll__badge-svg" viewBox="0 0 200 200" focusable="false">
        <defs>
          <path
            id={pathId}
            d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
          />
        </defs>
        <text className="rbg-roll__badge-text">
          <textPath href={`#${pathId}`} startOffset="0">
            {text}
          </textPath>
        </text>
      </svg>
      <span className="rbg-roll__badge-mark">✳</span>
    </div>
  );
};

const TypeLine = ({ words, tone }) => (
  <div className={`rbg-roll__row rbg-roll__row--${tone}`}>
    <div className="rbg-roll__line" aria-hidden="true">
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <Word word={word} variant={variantFor(index)} />
          {index < words.length - 1 && <span className="rbg-roll__sep">✳</span>}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const USPSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  /* reveal the words once the band enters the viewport ------------------ */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* magnetic letters — words lean away from the cursor on fine pointers -- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !isInView) return undefined;
    if (typeof window.matchMedia !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const RADIUS = 120;
    const PUSH = 16;
    let letters = [];
    let frame = null;
    let pending = null;

    const measure = () => {
      const sectionBox = node.getBoundingClientRect();
      letters = Array.from(node.querySelectorAll('[data-magnetic="1"]')).map((el) => {
        const box = el.getBoundingClientRect();
        return {
          el,
          x: box.left - sectionBox.left + box.width / 2,
          y: box.top - sectionBox.top + box.height / 2,
        };
      });
    };

    const render = () => {
      frame = null;
      if (!pending) return;
      const sectionBox = node.getBoundingClientRect();
      const px = pending.x - sectionBox.left;
      const py = pending.y - sectionBox.top;

      letters.forEach(({ el, x, y }) => {
        const dx = x - px;
        const dy = y - py;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS && dist > 0.001) {
          const force = (1 - dist / RADIUS) * PUSH;
          el.style.transform = `translate3d(${((dx / dist) * force).toFixed(2)}px, ${(
            (dy / dist) * force
          ).toFixed(2)}px, 0)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      });
    };

    const handleMove = (event) => {
      pending = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    };

    const handleLeave = () => {
      pending = null;
      letters.forEach(({ el }) => {
        el.style.transform = "";
      });
    };

    measure();
    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", measure);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", measure);
      if (frame) cancelAnimationFrame(frame);
      letters.forEach(({ el }) => {
        el.style.transform = "";
      });
    };
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className={`rbg-roll${isInView ? " is-in" : ""}`}
      aria-labelledby="rbg-roll-heading"
    >
      <h2 className="rbg-roll__sr" id="rbg-roll-heading">
        Capabilities and craft
      </h2>
      <p className="rbg-roll__sr">Disciplines: {disciplines.join(", ")}.</p>
      <p className="rbg-roll__sr">Crafts: {crafts.join(", ")}.</p>

      <span className="rbg-roll__ghost" aria-hidden="true">
        REBRAND
      </span>
      <span className="rbg-roll__glow rbg-roll__glow--a" aria-hidden="true" />
      <span className="rbg-roll__glow rbg-roll__glow--b" aria-hidden="true" />
      <span className="rbg-roll__grain" aria-hidden="true" />

      <TypeLine words={disciplines} tone="cream" />

      <div className="rbg-roll__seam">
        <RotatingBadge text={badgeText} />
      </div>

      <TypeLine words={crafts} tone="blush" />
    </section>
  );
};

export default USPSection;
