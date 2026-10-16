"use client";

import React from "react";
import Reveal from "./Reveal";
import { ChapterHead, Rule } from "./Ornaments";
import { letters } from "./story";

export default function ChapterLetters() {
  const { numeral, kicker, title, standfirst, items, footnote } = letters;

  return (
    <section className="ed-chapter" id="chapter-four" aria-labelledby="chapter-four-title">
      <Reveal>
        <ChapterHead
          numeral={numeral}
          kicker={kicker}
          title={title}
          standfirst={standfirst}
        />
      </Reveal>

      <div className="ed-letters">
        {items.map((letter, index) => (
          <Reveal as="figure" className="ed-letter" key={letter.signature} delay={index * 0.05}>
            <blockquote>
              <p>{letter.body}</p>
            </blockquote>
            <figcaption>
              <span className="ed-letter__closing" aria-hidden="true">
                Yours faithfully,
              </span>
              <span className="ed-letter__signature">{letter.signature}</span>
              <span className="ed-letter__role">{letter.role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <Reveal className="ed-chapter__footer" y={14}>
        <Rule />
        <p className="ed-footnote">{footnote}</p>
      </Reveal>
    </section>
  );
}
