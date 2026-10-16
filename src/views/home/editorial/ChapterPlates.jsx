"use client";

import React from "react";
import { Link } from "react-router-dom";
import NextImage from "../../../components/NextImage";
import Reveal from "./Reveal";
import { ChapterHead, Rule } from "./Ornaments";
import { plates } from "./story";

import beautiLondge from "../../../images/portfolio/home/beautiLondge.jpg";
import gaiaspa from "../../../images/portfolio/home/gaiaspa.jpg";
import obx from "../../../images/portfolio/home/obx.jpg";
import simply from "../../../images/portfolio/home/simply.jpg";
import tbt from "../../../images/portfolio/home/tbt.jpg";
import yachlife from "../../../images/portfolio/home/yachlife.jpg";

const images = [beautiLondge, gaiaspa, obx, simply, tbt, yachlife];

export default function ChapterPlates() {
  const { numeral, kicker, title, standfirst, items, footerNote, footerHref } = plates;

  return (
    <section className="ed-chapter" id="chapter-three" aria-labelledby="chapter-three-title">
      <Reveal>
        <ChapterHead
          numeral={numeral}
          kicker={kicker}
          title={title}
          standfirst={standfirst}
        />
      </Reveal>

      <div className="ed-plates">
        {items.map((item, index) => (
          <Reveal
            as="figure"
            className="ed-plate"
            key={item.title}
            delay={(index % 2) * 0.06}
          >
            <div className="ed-plate__frame">
              <NextImage
                src={images[index]}
                alt={`${item.title} — selected work by ReBrand Gurus`}
                fill
                sizes="(max-width: 700px) 90vw, (max-width: 1200px) 45vw, 380px"
                className="ed-plate__img"
              />
            </div>
            <figcaption>
              <span className="ed-plate__no">Plate {item.plate}</span>
              <h3 className="ed-plate__title">{item.title}</h3>
              <p>{item.caption}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>

      <Reveal className="ed-chapter__footer" y={14}>
        <Rule />
        <p>
          {footerNote}{" "}
          <Link to={footerHref} className="ed-link">
            Open the portfolio <span aria-hidden="true">→</span>
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
