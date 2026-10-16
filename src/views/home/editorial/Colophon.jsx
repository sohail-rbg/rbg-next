"use client";

import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { Rule } from "./Ornaments";
import { colophon } from "./story";

export default function Colophon() {
  const { title, body, primaryCta, secondaryCta, contact, colophonLines } = colophon;

  return (
    <section className="ed-colophon" id="colophon" aria-labelledby="colophon-title">
      <Reveal>
        <Rule symbol="❧" />
        <h2 className="ed-colophon__title" id="colophon-title">
          {title}
        </h2>
        <p className="ed-colophon__body">{body}</p>

        <div className="ed-colophon__actions">
          <Link to={primaryCta.href} className="ed-btn ed-btn--solid">
            {primaryCta.label}
          </Link>
          <Link to={secondaryCta.href} className="ed-btn">
            {secondaryCta.label}
          </Link>
        </div>

        <p className="ed-colophon__contact">
          <a href={contact.phoneHref} className="ed-link">
            {contact.phone}
          </a>
          <span className="ed-dot" aria-hidden="true">
            ·
          </span>
          {contact.place}
        </p>

        <ul className="ed-colophon__lines">
          {colophonLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
