"use client";

import React from "react";
import NextImage from "../../../components/NextImage";
import skyline from "../../../images/skyline.webp";
import Reveal from "./Reveal";
import { ChapterHead, Rule, Figure } from "./Ornaments";
import { opening } from "./story";

export default function ChapterOpening() {
  const { numeral, kicker, title, lede, paragraphs, marginalia, pullQuote, figure } =
    opening;

  return (
    <section className="ed-chapter" id="chapter-one" aria-labelledby="chapter-one-title">
      <Reveal>
        <ChapterHead numeral={numeral} kicker={kicker} title={title} />
      </Reveal>

      <div className="ed-prose-grid">
        <Reveal className="ed-prose" delay={0.05}>
          <p className="ed-lede">{lede}</p>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "ed-dropcap" : undefined}>
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal className="ed-marginalia" delay={0.12} y={16}>
          {marginalia.map((note) => (
            <div className="ed-marginalia__note" key={note.heading}>
              <h3>{note.heading}</h3>
              <p>{note.body}</p>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal className="ed-pullquote" y={18}>
        <Rule symbol="❖" />
        <blockquote>
          <p>{pullQuote.text}</p>
          <cite>{pullQuote.cite}</cite>
        </blockquote>
        <Rule symbol="❖" />
      </Reveal>

      <Reveal delay={0.05}>
        <Figure
          ratio="16 / 9"
          caption={figure.caption}
          image={
            <NextImage
              src={skyline}
              alt="Salt Lake City skyline at dusk"
              fill
              sizes="(max-width: 900px) 100vw, 860px"
              className="ed-figure__img"
            />
          }
        />
      </Reveal>
    </section>
  );
}
