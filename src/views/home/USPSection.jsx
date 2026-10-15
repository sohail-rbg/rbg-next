"use client";

import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Kinetic type wall — the capability band that sits under the hero.
 *
 * Two opposing rows of keywords are set as a moving type specimen: filled,
 * outlined, script, accent and "sticker" words, each revealed letter by letter
 * as the band scrolls into view. Hovering a word dims the rest of the wall and
 * lifts that word's letters in sequence; the whole wall skews with pointer
 * velocity, and a rotating brand badge straddles the seam between the rows.
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

/** Letter treatments rotate through the row so the specimen never repeats. */
const variantFor = (index, tone) => {
  if (index % 7 === 3) return "sticker";
  if (index % 5 === 2) return "script";
  if (tone === "dark" && index % 4 === 1) return "accent";
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

const RollRow = ({ words, tone, direction, duration, label, meta }) => (
  <div className={`rbg-roll__row rbg-roll__row--${tone}`}>
    <span className="rbg-roll__pill">{label}</span>
    <span className="rbg-roll__meta">{meta}</span>

    <div className="rbg-roll__viewport" aria-hidden="true">
      <div
        className="rbg-roll__track"
        style={{
          "--dur": duration,
          "--dir": direction === "right" ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div className="rbg-roll__group" key={copy}>
            {words.map((word, index) => (
              <React.Fragment key={`${copy}-${word}-${index}`}>
                <Word word={word} variant={variantFor(index, tone)} />
                <span
                  className="rbg-roll__sep"
                  style={{ "--spin-delay": `${(index % 5) * -3.2}s` }}
                >
                  ✳
                </span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const USPSection = () => {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* pointer-velocity skew: the wall leans into fast horizontal movement -- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    let target = 0;
    let current = 0;
    let lastX = null;
    let lastT = 0;

    const loop = () => {
      current += (target - current) * 0.14;
      target *= 0.9;

      if (Math.abs(current) < 0.05 && Math.abs(target) < 0.05) {
        node.style.setProperty("--rbg-roll-skew", "0deg");
        rafRef.current = null;
        return;
      }

      node.style.setProperty("--rbg-roll-skew", `${current.toFixed(2)}deg`);
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(loop);
    };

    const handleMove = (event) => {
      const now = performance.now();

      if (lastX !== null) {
        const delta = Math.max(now - lastT, 8);
        const velocity = (event.clientX - lastX) / delta; // px per ms
        target = Math.max(-6, Math.min(6, velocity * 9));
      }

      lastX = event.clientX;
      lastT = now;
      start();
    };

    const handleLeave = () => {
      lastX = null;
      target = 0;
      start();
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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

      <RollRow
        words={disciplines}
        tone="light"
        direction="left"
        duration="52s"
        label="What we do"
        meta={`${String(disciplines.length).padStart(2, "0")} disciplines`}
      />
      <RollRow
        words={crafts}
        tone="dark"
        direction="right"
        duration="44s"
        label="How we think"
        meta={`${String(crafts.length).padStart(2, "0")} crafts`}
      />

      <div className="rbg-roll__seam">
        <RotatingBadge text={badgeText} />
      </div>
    </section>
  );
};

export default USPSection;
