"use client";

import React, { useEffect, useId, useRef, useState } from "react";

/**
 * Capability type block — the band that sits under the hero.
 *
 * Static, editorial composition (no scrolling marquee): the disciplines and
 * crafts are laid out as a wrapped type specimen with filled / outlined /
 * script / accent / sticker treatments. Letters rise into place one by one as
 * the band enters the viewport, hovering a word dims the rest of the line, and
 * a rotating brand badge straddles the seam between the two lines.
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

const TypeLine = ({ words, tone, label, meta }) => (
  <div className={`rbg-roll__row rbg-roll__row--${tone}`}>
    <span className="rbg-roll__pill">{label}</span>
    <span className="rbg-roll__meta">{meta}</span>

    <div className="rbg-roll__line" aria-hidden="true">
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <Word word={word} variant={variantFor(index, tone)} />
          {index < words.length - 1 && (
            <span className="rbg-roll__sep">✳</span>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const USPSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

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

      <TypeLine
        words={disciplines}
        tone="light"
        label="What we do"
        meta={`${String(disciplines.length).padStart(2, "0")} disciplines`}
      />

      <div className="rbg-roll__seam">
        <RotatingBadge text={badgeText} />
      </div>

      <TypeLine
        words={crafts}
        tone="dark"
        label="How we think"
        meta={`${String(crafts.length).padStart(2, "0")} crafts`}
      />
    </section>
  );
};

export default USPSection;
