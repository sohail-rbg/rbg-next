"use client";

import React, { useEffect, useRef } from "react";

/**
 * Kinetic type band — the capability marquees that sit under the hero.
 *
 * Two opposing rows of keywords act as a type specimen: filled, outlined and
 * script words alternate, separated by coral marks. The band reacts to the
 * pointer — words dim until hovered, hovering a word pauses the row, and the
 * whole band skews with horizontal pointer velocity.
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

const variantFor = (index, tone) => {
  if (index % 5 === 2) return "script";
  if (tone === "dark" && index % 4 === 1) return "accent";
  if (index % 3 === 1) return "outline";
  return "filled";
};

const RollRow = ({ words, tone, direction = "left", duration = "44s", label, meta }) => (
  <div className={`rbg-roll__row rbg-roll__row--${tone}`}>
    <span className="rbg-roll__pill">{label}</span>
    <span className="rbg-roll__meta">{meta}</span>

    <div className="rbg-roll__viewport">
      <div
        className="rbg-roll__track"
        style={{ "--dur": duration, "--dir": direction === "right" ? "reverse" : "normal" }}
      >
        {[0, 1].map((copy) => (
          <div className="rbg-roll__group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
            {words.map((word, index) => (
              <React.Fragment key={`${copy}-${word}`}>
                <span className={`rbg-roll__word is-${variantFor(index, tone)}`}>{word}</span>
                <span className="rbg-roll__sep" aria-hidden="true">
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

  // Pointer-velocity skew: the band leans into fast horizontal movement.
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
        target = Math.max(-7, Math.min(7, velocity * 9));
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
      className="rbg-roll"
      aria-label="Capabilities and craft"
    >
      <RollRow
        words={disciplines}
        tone="light"
        direction="left"
        duration="46s"
        label="What we do"
        meta={`${String(disciplines.length).padStart(2, "0")} disciplines`}
      />
      <RollRow
        words={crafts}
        tone="dark"
        direction="right"
        duration="38s"
        label="How we think"
        meta={`${String(crafts.length).padStart(2, "0")} crafts`}
      />
    </section>
  );
};

export default USPSection;
