"use client";

import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { ChapterHead, Rule } from "./Ornaments";
import { trade } from "./story";

export default function ChapterTrade() {
  const { numeral, kicker, title, standfirst, entries, footerNote, footerHref } =
    trade;

  return (
    <section className="ed-chapter" id="chapter-two" aria-labelledby="chapter-two-title">
      <Reveal>
        <ChapterHead
          numeral={numeral}
          kicker={kicker}
          title={title}
          standfirst={standfirst}
        />
      </Reveal>

      <ol className="ed-trade">
        {entries.map((entry, index) => (
          <Reveal as="li" className="ed-trade__item" key={entry.title} delay={index * 0.04}>
            <span className="ed-trade__num" aria-hidden="true">
              {entry.numeral}
            </span>
            <div className="ed-trade__body">
              <h3 className="ed-trade__title">{entry.title}</h3>
              <p>{entry.body}</p>
            </div>
            <Link to={entry.href} className="ed-link">
              Read more <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        ))}
      </ol>

      <Reveal className="ed-chapter__footer" y={14}>
        <Rule />
        <p>
          {footerNote}{" "}
          <Link to={footerHref} className="ed-link">
            See the particulars <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
