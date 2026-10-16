"use client";

import React, { useEffect, useState } from "react";
import { chapters } from "./story";

/**
 * Sticky "Contents" rail (the old book's table of contents).
 * Highlights whichever chapter is currently in view.
 */
export default function ContentsRail() {
  const [active, setActive] = useState(chapters[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="ed-contents" aria-label="Contents">
      <p className="ed-contents__title">Contents</p>
      <ol className="ed-contents__list">
        {chapters.map((chapter) => (
          <li
            key={chapter.id}
            className={`ed-contents__item ${
              active === chapter.id ? "is-active" : ""
            }`}
          >
            <a href={`#${chapter.id}`}>
              <span className="ed-contents__num">{chapter.numeral}</span>
              <span className="ed-contents__label">{chapter.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="ed-contents__note">
        Read straight through, or skip to the part that concerns you.
      </p>
    </aside>
  );
}
