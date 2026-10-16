"use client";

import React from "react";
import Reveal from "./Reveal";
import { ChapterHead, Rule } from "./Ornaments";
import { almanac } from "./story";

export default function ChapterAlmanac() {
  const { numeral, kicker, title, standfirst, items, footnote } = almanac;

  return (
    <section className="ed-chapter" id="chapter-five" aria-labelledby="chapter-five-title">
      <Reveal>
        <ChapterHead
          numeral={numeral}
          kicker={kicker}
          title={title}
          standfirst={standfirst}
        />
      </Reveal>

      <div className="ed-almanac">
        {items.map((item, index) => (
          <Reveal className="ed-almanac__item" key={item.label} delay={index * 0.05}>
            <span className="ed-almanac__number">
              {item.number}
              <span className="ed-almanac__suffix">{item.suffix}</span>
            </span>
            <span className="ed-almanac__label">{item.label}</span>
            <span className="ed-almanac__note">{item.note}</span>
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
