"use client";

import React from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { masthead } from "./story";

export default function Masthead() {
  return (
    <header className="ed-masthead" id="masthead">
      <div className="ed-masthead__imprint">
        <span>{masthead.eyebrow}</span>
        <span className="ed-masthead__imprint-meta">
          {masthead.imprint.map((item) => (
            <React.Fragment key={item}>
              <span className="ed-dot" aria-hidden="true">
                ·
              </span>
              <span>{item}</span>
            </React.Fragment>
          ))}
        </span>
      </div>

      <hr className="ed-rule ed-rule--thick" />

      <Reveal className="ed-masthead__body" y={26}>
        <h1 className="ed-masthead__title">{masthead.title}</h1>
        <p className="ed-masthead__deck">{masthead.deck}</p>
      </Reveal>

      <Reveal className="ed-masthead__cta" delay={0.15}>
        <Link to={masthead.ctaHref} className="ed-btn">
          {masthead.ctaLabel}
        </Link>
        <span className="ed-masthead__ornament" aria-hidden="true">
          ❧
        </span>
      </Reveal>
    </header>
  );
}
