"use client";

import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Capability type collage — full-bleed black canvas under the hero.
 *
 * Not a tidy specimen: every word is set in one of six treatments (mega,
 * script, mini caps, sticker, gradient, warp) at wildly different scales, then
 * tilted, offset and scaled by a deterministic hash so the placement is stable
 * between server and client but never looks gridded. Letters carry their own
 * tilt, rise into place once in view, and lean away from the cursor. The two
 * lines drift in opposite directions as the section crosses the viewport, and
 * a rotating brand badge sits between them.
 *
 * Brand palette only — sage #8B9C8C, green #2E5E53, blush #faede9, ink #000.
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

/* Deterministic integer hash — identical on server and client, so inline
   styles stay hydration-safe. Returns -1 … 0.99 */
const hash = (value) => {
  let h = 0;
  const text = String(value);
  for (let i = 0; i < text.length; i += 1) {
    h = (h * 31 + text.charCodeAt(i)) | 0;
  }
  return ((h % 200) + 200) % 200 / 100 - 1;
};

const treatments = ["mega", "script", "mini", "sticker", "gradient", "warp"];

const variantFor = (index, offset) =>
  treatments[(index + offset) % treatments.length];

const Letters = ({ text, seed }) => (
  <>
    {Array.from(text).map((char, index) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={`${char}-${index}`}
        className="rbg-roll__ltr"
        style={{
          "--i": index,
          "--lr": `${(hash(`${seed}-${index}`) * 5).toFixed(2)}deg`,
        }}
        data-magnetic="1"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </>
);

const Word = ({ word, variant }) => {
  const style = {
    "--tilt": `${(hash(`${word}t`) * 5.5).toFixed(2)}deg`,
    "--dy": `${(hash(`${word}y`) * 13).toFixed(1)}px`,
    "--wscale": (1 + hash(`${word}s`) * 0.12).toFixed(3),
  };

  if (variant === "mini") {
    return (
      <span className={`rbg-roll__word is-mini`} style={style}>
        {word.toUpperCase()}
      </span>
    );
  }

  return (
    <span className={`rbg-roll__word is-${variant}`} style={style}>
      {variant === "script" ? word : <Letters text={word} seed={word} />}
    </span>
  );
};

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

const TypeLine = ({ words, tone, offset, driftSign }) => (
  <div className={`rbg-roll__row rbg-roll__row--${tone}`}>
    <div
      className="rbg-roll__line"
      aria-hidden="true"
      data-drift={driftSign}
    >
      {words.map((word, index) => (
        <Word key={`${word}-${index}`} word={word} variant={variantFor(index, offset)} />
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

  /* the two lines drift apart as the section crosses the viewport -------- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    if (typeof window.matchMedia !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lines = Array.from(node.querySelectorAll("[data-drift]"));
    if (!lines.length) return undefined;

    let frame = null;

    const update = () => {
      frame = null;
      const box = node.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 before the section is on screen … +1 after it has passed
      const progress = Math.max(
        -1,
        Math.min(1, ((vh - box.top) / (vh + box.height)) * 2 - 1)
      );

      lines.forEach((line) => {
        const sign = Number(line.dataset.drift) || 1;
        line.style.setProperty("--drift", `${(progress * 64 * sign).toFixed(1)}px`);
        line.style.setProperty("--line-tilt", `${(progress * 1.8 * sign).toFixed(2)}deg`);
      });
    };

    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);

    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* magnetic letters — words lean away from the cursor on fine pointers -- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !isInView) return undefined;
    if (typeof window.matchMedia !== "function") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const RADIUS = 130;
    const PUSH = 18;
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
          ).toFixed(2)}px, 0) rotate(var(--lr, 0deg))`;
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

      <span className="rbg-roll__glow rbg-roll__glow--a" aria-hidden="true" />
      <span className="rbg-roll__glow rbg-roll__glow--b" aria-hidden="true" />
      <span className="rbg-roll__grain" aria-hidden="true" />

      <TypeLine words={disciplines} tone="cream" offset={0} driftSign={-1} />

      <div className="rbg-roll__seam">
        <RotatingBadge text={badgeText} />
      </div>

      <TypeLine words={crafts} tone="blush" offset={3} driftSign={1} />
    </section>
  );
};

export default USPSection;
